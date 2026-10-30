import React, { useEffect, useRef, useState } from "react";
import { IntegrationLayout } from "../parity/admin-integration-layout.jsx";
import {
  JobProgress,
  monitorJob,
  refreshImportHistory,
  useReportManifest,
} from "./AdminReports.jsx";
const refreshers = new Set();
export function refreshIntegration() {
  return Promise.allSettled([...refreshers].map((refresh) => refresh()));
}
export function setIntegrationMode(mode) {
  window.dispatchEvent(
    new CustomEvent("admin-integration-mode", { detail: mode }),
  );
}
const fields = {
  "integ-mode": "sourceMode",
  "integ-url": "baseUrl",
  "integ-hours": "scheduleHours",
  "integ-enabled": "enabled",
  "integ-token": "authToken",
  "integ-sql-dialect": "sqlDialect",
  "integ-sql-host": "sqlHost",
  "integ-sql-port": "sqlPort",
  "integ-sql-database": "sqlDatabase",
  "integ-sql-schema": "sqlSchema",
  "integ-sql-user": "sqlUsername",
  "integ-sql-prefix": "sqlViewPrefix",
  "integ-sql-timeout": "sqlQueryTimeoutMs",
  "integ-sql-maxrows": "sqlMaxRowsPerReport",
  "integ-sql-ssl": "sqlSsl",
  "integ-sql-trust": "sqlTrustServerCertificate",
  "integ-sql-password": "sqlPassword",
  "integ-analytics-mode": "analyticsMode",
  "integ-source-analytics": "sourceAnalyticsEnabled",
  "integ-source-replica": "sourceAnalyticsUseReplica",
  "integ-replica-host": "sourceAnalyticsReplicaHost",
  "integ-replica-port": "sourceAnalyticsReplicaPort",
  "integ-replica-database": "sourceAnalyticsReplicaDatabase",
  "integ-replica-user": "sourceAnalyticsReplicaUsername",
  "integ-replica-lag": "sourceAnalyticsReplicaMaxLagSeconds",
  "integ-replica-ssl": "sourceAnalyticsReplicaSsl",
  "integ-replica-trust": "sourceAnalyticsReplicaTrustServerCertificate",
};
const checks = new Set([
  "integ-enabled",
  "integ-sql-ssl",
  "integ-sql-trust",
  "integ-source-analytics",
  "integ-source-replica",
  "integ-replica-ssl",
  "integ-replica-trust",
]);
const port = (dialect) =>
  dialect === "MSSQL" ? 1433 : dialect === "MYSQL" ? 3306 : 5432;
function initial(config = {}) {
  const values = {
    ...config,
    sourceMode:
      String(
        config.effectiveSourceMode || config.sourceMode || "API",
      ).toUpperCase() === "SQL"
        ? "SQL"
        : "API",
    sqlDialect: String(config.sqlDialect || "POSTGRESQL").toUpperCase(),
    scheduleHours: config.scheduleHours || 1,
    sqlViewPrefix: config.sqlViewPrefix || "v_",
    sqlQueryTimeoutMs: config.sqlQueryTimeoutMs || 60000,
    sqlMaxRowsPerReport: config.sqlMaxRowsPerReport || 250000,
    analyticsMode: config.analyticsMode || "POSTGRES_READ_MODEL",
    sqlSsl: config.sqlSsl !== false,
    sourceAnalyticsReplicaSsl: config.sourceAnalyticsReplicaSsl !== false,
    sourceAnalyticsReplicaMaxLagSeconds:
      config.sourceAnalyticsReplicaMaxLagSeconds ?? 60,
    authToken: "",
    sqlPassword: "",
  };
  values.sqlPort = config.sqlPort || port(values.sqlDialect);
  values.sourceAnalyticsReplicaPort =
    config.sourceAnalyticsReplicaPort ||
    (config.sqlDialect === "MYSQL" ? 3306 : config.sqlPort || "");
  return Object.fromEntries(
    Object.entries(fields).map(([id, key]) => [
      id,
      checks.has(id) ? Boolean(values[key]) : String(values[key] ?? ""),
    ]),
  );
}
function payload(draft) {
  const result = Object.fromEntries(
    Object.entries(fields).map(([id, key]) => [
      key,
      checks.has(id) ? draft[id] : String(draft[id] || "").trim(),
    ]),
  );
  for (const [key, fallback] of Object.entries({
    scheduleHours: 1,
    sqlPort: null,
    sqlQueryTimeoutMs: 60000,
    sqlMaxRowsPerReport: 250000,
    sourceAnalyticsReplicaPort: null,
    sourceAnalyticsReplicaMaxLagSeconds: 60,
  })) {
    const value = parseInt(result[key], 10);
    result[key] = Number.isNaN(value) ? fallback : value;
  }
  result.sqlViewPrefix = result.sqlViewPrefix || "v_";
  result.sourceAnalyticsReadOnly = true;
  result.sourceAnalyticsReplicaEnabled = result.sourceAnalyticsUseReplica;
  if (!result.authToken) delete result.authToken;
  if (!result.sqlPassword) delete result.sqlPassword;
  return result;
}
const number = (value) => Number(value || 0).toLocaleString("en-ZA");
const when = (value) => new Date(value).toLocaleString("en-ZA");
function Banner({ kind = "ok", children }) {
  return <div className={"banner " + kind}>{children}</div>;
}
function failure(log, manifest) {
  for (const [i, key] of (manifest?.loadOrder || []).entries())
    if (log?.summary?.[key]?.error)
      return `STEP ${i + 1} ${manifest.reports?.find((r) => r.key === key)?.title || key}: ${log.summary[key].error}`;
  return log?.summary?.source?.error
    ? `Source connection: ${log.summary.source.error}`
    : "";
}
function SyncResult({ result }) {
  return (
    <>
      <Banner kind={result.status === "FAILED" ? "err" : "ok"}>
        {result.status}: {result.note}
      </Banner>
      <table className="hist" style={{ marginTop: 8 }}>
        <tbody>
          {Object.entries(result.summary || {}).map(([key, value]) => (
            <tr key={key}>
              <td style={{ fontWeight: 700 }}>{key}</td>
              <td>
                {value.error || value.errorCount ? (
                  <span className="settings-error" style={{ color: "#b5391f" }}>
                    {value.error || `${value.errorCount} validation error(s)`}
                  </span>
                ) : (
                  <>
                    {number(value.committed)} processed · +
                    {number(value.inserted)} new · ~{number(value.updated)}{" "}
                    updated · -{number(value.deleted)} deleted
                    {Number(value.historyRows) > 0
                      ? ` · ${number(value.historyRows)} dated history observation(s)`
                      : Number(value.staleSkipped) > 0
                        ? ` · ${number(value.staleSkipped)} stale skipped`
                        : ""}
                    {value.authoritativeOverwrite
                      ? " · authoritative overwrite"
                      : ""}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export function AdminIntegration() {
  const manifest = useReportManifest();
  const [draft, setDraft] = useState(() => initial()),
    [config, setConfig] = useState(null),
    [logs, setLogs] = useState([]),
    [loadError, setLoadError] = useState(""),
    [logError, setLogError] = useState(""),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(""),
    [result, setResult] = useState(null),
    [collapsed, setCollapsed] = useState(false);
  const lifecycle = useRef(null),
    pending = useRef(false),
    dirty = useRef(false),
    hydrated = useRef(false);
  async function request(path, options = {}) {
    const response = await fetch("/api/admin/" + path, {
      cache: "no-store",
      ...options,
      signal: lifecycle.current.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
    return data;
  }
  async function readLogs() {
    try {
      const rows = await request("integration/logs");
      if (!Array.isArray(rows))
        throw new Error("Sync history returned an invalid response");
      setLogs(rows);
      setLogError("");
    } catch (error) {
      if (!lifecycle.current.signal.aborted) setLogError(error.message);
    }
  }
  async function readConfig(hydrate = false) {
    try {
      const value = await request("integration");
      if (!value || typeof value !== "object" || Array.isArray(value))
        throw new Error("Integration returned an invalid response");
      setConfig(value);
      setLoadError("");
      if (hydrate && (!dirty.current || !hydrated.current)) {
        const preserveMode = dirty.current;
        setDraft((previous) => ({
          ...initial(value),
          ...(preserveMode ? { "integ-mode": previous["integ-mode"] } : {}),
        }));
        hydrated.current = true;
      }
    } catch (error) {
      if (!lifecycle.current.signal.aborted) setLoadError(error.message);
    } finally {
      if (!lifecycle.current.signal.aborted) setLoading(false);
    }
  }
  async function reload() {
    await Promise.allSettled([readConfig(true), readLogs()]);
  }
  useEffect(() => {
    const abort = new AbortController();
    lifecycle.current = abort;
    const refresh = () => Promise.allSettled([readConfig(false), readLogs()]);
    const mode = (event) => {
      if (pending.current) return;
      dirty.current = true;
      setDraft((value) => ({
        ...value,
        "integ-mode": event.detail === "SQL" ? "SQL" : "API",
      }));
      setCollapsed(false);
    };
    refreshers.add(refresh);
    window.addEventListener("admin-integration-mode", mode);
    (async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          signal: abort.signal,
        });
        if (!response.ok) throw new Error("Admin session unavailable");
        const me = await response.json();
        if (!me.modules?.admin || !["ADMIN", "SUPERADMIN"].includes(me.role))
          throw new Error("Admin access required");
        await reload();
      } catch (error) {
        if (!abort.signal.aborted) {
          setLoading(false);
          setLoadError(error.message);
        }
      }
    })();
    return () => {
      abort.abort();
      refreshers.delete(refresh);
      window.removeEventListener("admin-integration-mode", mode);
    };
  }, []);
  function change(id, value) {
    dirty.current = true;
    setDraft((current) => ({
      ...current,
      [id]: value,
      ...(id === "integ-sql-dialect" && !current["integ-sql-port"]
        ? { "integ-sql-port": String(port(value)) }
        : {}),
    }));
  }
  const message = (text, kind = "ok") =>
    setResult(<Banner kind={kind}>{text}</Banner>);
  const clearSecrets = () =>
    setDraft((value) => ({
      ...value,
      "integ-token": "",
      "integ-sql-password": "",
    }));
  async function run(kind) {
    if (pending.current || loading || !config) return;
    if (
      kind === "refresh" &&
      !window.confirm(
        "Run a safe incremental sync of the 10 canonical feeds? Only changes since the saved source cursors will be fetched. Existing dashboard records are not purged.",
      )
    )
      return;
    if (["save", "sync"].includes(kind)) {
      const hours = Number(draft["integ-hours"]);
      if (!Number.isInteger(hours) || hours < 1 || hours > 168) {
        message("Choose a heartbeat of 1–168 whole hours.", "err");
        return;
      }
    }
    pending.current = true;
    setBusy(kind);
    const body = payload(draft),
      label = body.sourceMode === "SQL" ? "database" : "API";
    try {
      if (kind === "test") {
        message(`Testing ${label} connection and contract…`);
        const data = await request("integration/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!data.ok) throw new Error(data.error || "Source test failed");
        message("✓ " + (data.note || "Source test passed."));
        return;
      }
      if (kind === "preview" || kind === "stage") {
        message(
          kind === "preview"
            ? "Validating candidate source without switching databases or rewriting facts…"
            : "Staging candidate source. Current dashboard and connection remain active…",
        );
        const data = await request(
          "integration/" +
            (kind === "preview" ? "preview-switch" : "stage-source"),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        );
        if (!data.ok)
          throw new Error(data.error || "Candidate validation failed");
        if (kind === "preview")
          message(
            `✓ ${data.note || "Source contract validated"} ${data.sourceChanged ? "A different source identity was detected. Existing cursors will NOT be reused." : "Current source identity is unchanged."} ${Number(data.testedFeeds || 0)} feed(s) checked.`,
          );
        else {
          message(
            `✓ Candidate generation ${data.generationId || "unknown"} validated. ${data.credentialsStaged ? "Encrypted credentials stored." : "Encrypted credential vault not configured; activation remains blocked."} No active database or dashboard data changed.`,
          );
          if (data.credentialsStaged) clearSecrets();
        }
        return;
      }
      if (kind !== "refresh") {
        message("Saving settings…");
        await request("integration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        clearSecrets();
        if (kind === "save") {
          message(
            `✓ ${body.sourceMode === "SQL" ? "Database" : "API"} integration settings saved.`,
          );
          await readConfig(false);
          return;
        }
      }
      if (kind === "sync") {
        const start = await request("integration/sync", { method: "POST" });
        if (start.error || !start.jobId)
          throw new Error(start.error || "Sync failed to start");
        const value = await monitorJob(
          "/api/admin/sync-jobs/" + encodeURIComponent(start.jobId),
          "Syncing all reports from " + body.sourceMode,
          (data) => {
            setResult(
              <JobProgress
                value={{
                  ...data,
                  message:
                    data.message ||
                    "Syncing all reports from " + body.sourceMode,
                }}
              />,
            );
            refreshImportHistory();
          },
          lifecycle.current.signal,
        );
        setResult(<SyncResult result={value} />);
      } else {
        message(
          "Synchronising changed records without resetting source cursors…",
        );
        const data = await request("integration/refresh", { method: "POST" });
        if (!data.ok)
          throw new Error(data.error || data.note || "Incremental sync failed");
        message(
          "✓ Incremental sync completed. " +
            (data.note ||
              "Changes processed without deleting existing dashboard records."),
        );
      }
    } catch (error) {
      if (!lifecycle.current.signal.aborted)
        message(
          kind === "refresh"
            ? `✕ Incremental sync failed. Existing dashboard data was not purged. Reason: ${error.message}`
            : "✕ " + error.message,
          "err",
        );
    } finally {
      if (!lifecycle.current.signal.aborted) {
        await Promise.allSettled([
          readConfig(false),
          readLogs(),
          refreshImportHistory(),
        ]);
        setBusy("");
      }
      pending.current = false;
    }
  }
  let status = "",
    statusClass = "banner " + (config?.configured ? "ok" : "");
  if (config) {
    const c = config,
      mode = c.effectiveSourceMode || c.sourceMode || "API",
      configured = c.configured ? "configured" : "incomplete";
    if (c.lastSyncAt) {
      statusClass =
        "banner " +
        (c.lastSyncStatus === "OK"
          ? "ok"
          : [
                "FAILED",
                "PARTIAL",
                "FULL_REFRESH_FAILED",
                "FULL_REFRESH_PRECHECK_FAILED",
              ].includes(c.lastSyncStatus)
            ? "err"
            : "");
      status = `${mode} source · ${configured}${c.changeDetectionEnabled ? ` · Change watch: every ${c.sourceChangePollSeconds || 30}s` : ""} · Last attempt: ${c.lastSyncStatus || "UNKNOWN"} · ${when(c.lastSyncAt)} · Last successful: ${c.lastSuccessfulSyncAt ? when(c.lastSuccessfulSyncAt) : "none yet"} · ${c.lastSyncStatus === "REBUILDING" ? "Refresh status" : "Refresh reason"}: ${c.lastSyncNote || "No refresh reason was recorded."}`;
    } else
      status = `${mode} source · ${configured}. No sync has run yet.${c.changeDetectionEnabled ? ` Change watch runs every ${c.sourceChangePollSeconds || 30}s.` : ""}`;
    const failed = failure(logs[0], manifest);
    if (failed && ["PARTIAL", "FAILED"].includes(logs[0]?.status))
      status += " · Failed feed: " + failed;
  }
  const state = {
    draft,
    busy: Boolean(busy) || loading || !config,
    collapsed,
    mode: draft["integ-mode"],
    statusClass,
    status: loadError ? (
      <>
        {loadError}{" "}
        <button className="btn btn-ghost" onClick={reload}>
          Retry
        </button>
      </>
    ) : (
      status
    ),
    statusVisible: Boolean(config || loadError),
    refreshLabel: busy === "refresh" ? "Syncing…" : "Refresh changes",
    result,
    tokenPlaceholder: config?.hasToken
      ? config.apiTokenFromEnvironment
        ? "•••••• (provided by SOURCE_API_TOKEN)"
        : "•••••• (saved — leave blank to keep)"
      : "leave blank to keep existing",
    passwordPlaceholder: config?.hasSqlPassword
      ? config.sqlPasswordFromEnvironment
        ? "•••••• (provided by SOURCE_SQL_PASSWORD)"
        : "•••••• (saved — leave blank to keep)"
      : "leave blank to keep existing",
    envVisible: Boolean(config?.envOverrides?.length),
    environment: config?.envOverrides?.length ? (
      <>
        ⚠ These fields are locked by environment variables on the app service
        and will always win over whatever is set below, no matter what you save
        here:{" "}
        {config.envOverrides.map((override, i) => (
          <React.Fragment key={i}>
            {i ? ", " : ""}
            <b>{override.label}</b> = "{override.value}" ({override.envName})
          </React.Fragment>
        ))}
        .
      </>
    ) : null,
    changeMode: config?.changeDetectionSupported
      ? `Live SQL change detection is active every ${number(config.sourceChangePollSeconds || 30)}s using indexed source_updated_at watermarks. Bulk writes process up to ${number(config.syncBulkChunkSize || 20000)} rows per database call. The hourly setting above remains a safety reconciliation.`
      : "This source does not expose a portable SQL watermark, so the heartbeat schedule above controls automatic reconciliation.",
    logs: logError ? (
      <tr>
        <td colSpan={4}>
          {logError}{" "}
          <button className="btn btn-ghost" onClick={readLogs}>
            Retry
          </button>
        </td>
      </tr>
    ) : logs.length ? (
      logs.map((log, i) => {
        const failed = failure(log, manifest);
        const blocked = (manifest?.loadOrder || [])
          .map((key, index) =>
            log.summary?.[key]?.status === "BLOCKED"
              ? `STEP ${index + 1} ${manifest.reports?.find((r) => r.key === key)?.title || key}`
              : null,
          )
          .filter(Boolean)
          .join(", ");
        return (
          <tr key={log.id || i}>
            <td>{when(log.startedAt)}</td>
            <td>{log.trigger}</td>
            <td>
              <span
                style={{
                  color:
                    log.status === "OK"
                      ? "#1fa463"
                      : log.status === "FAILED"
                        ? "#e0492f"
                        : "#e8910c",
                  fontWeight: 700,
                }}
              >
                {log.status}
              </span>
            </td>
            <td className="muted">
              {[
                log.note || "",
                failed ? "Failure: " + failed : "",
                blocked ? "Blocked downstream: " + blocked : "",
              ]
                .filter(Boolean)
                .join(" · ")}
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td className="muted" style={{ padding: 10 }}>
          No syncs yet.
        </td>
      </tr>
    ),
  };
  return (
    <IntegrationLayout
      state={state}
      actions={{
        change,
        api: () => change("integ-mode", "API"),
        sql: () => change("integ-mode", "SQL"),
        save: () => run("save"),
        test: () => run("test"),
        sync: () => run("sync"),
        refresh: () => run("refresh"),
        preview: () => run("preview"),
        stage: () => run("stage"),
        hourly: () => change("integ-hours", "1"),
        sixHours: () => change("integ-hours", "6"),
        daily: () => change("integ-hours", "24"),
        weekly: () => change("integ-hours", "168"),
        toggle: () => setCollapsed((value) => !value),
      }}
    />
  );
}
