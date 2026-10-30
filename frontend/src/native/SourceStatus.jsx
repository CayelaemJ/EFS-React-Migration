import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./source-status.css";
const ENDPOINT = "/api/admin/integration";
function when(value) {
  if (!value) return "Never";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown"
    : date.toLocaleString("en-ZA");
}
function sourceLabel(config) {
  const mode = String(
    config.effectiveSourceMode || config.sourceMode || "API",
  ).toUpperCase();
  if (mode === "SQL")
    return `${String(config.effectiveSqlDialect || config.sqlDialect || "SQL").toUpperCase()} · ${config.effectiveSqlDatabase || config.sqlDatabase || "database not selected"}`;
  try {
    const url = new URL(
      config.effectiveApiBaseUrl || config.baseUrl || "",
      location.origin,
    );
    return `API · ${url.host || "configured endpoint"}`;
  } catch {
    return "API";
  }
}
function state(config) {
  const raw = String(
    config.lastSyncStatus || (config.configured ? "READY" : "INCOMPLETE"),
  ).toUpperCase();
  if (raw === "OK") return { label: "COMPLETE", tone: "ok" };
  if (["PROCESSING", "RUNNING", "REBUILDING"].includes(raw))
    return {
      label: raw === "REBUILDING" ? "REBUILDING" : "IN PROGRESS",
      tone: "busy",
    };
  if (
    [
      "FAILED",
      "PARTIAL",
      "FULL_REFRESH_FAILED",
      "FULL_REFRESH_PRECHECK_FAILED",
    ].includes(raw)
  )
    return { label: raw, tone: "err" };
  return { label: raw, tone: config.configured ? "ready" : "err" };
}
export function SourceStatus() {
  const [config, setConfig] = useState(null),
    [database, setDatabase] = useState(null),
    [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    const abort = new AbortController();
    let pending = false,
      denied = false;
    async function refresh() {
      if (pending || denied || abort.signal.aborted) return;
      pending = true;
      try {
        const response = await fetch(ENDPOINT, {
          credentials: "same-origin",
          cache: "no-store",
          signal: abort.signal,
        });
        if (response.status === 401 || response.status === 403) {
          denied = true;
          setConfig(null);
          clearInterval(timer);
          return;
        }
        if (response.ok) {
          const data = await response.json();
          if (!abort.signal.aborted) setConfig(data);
          try {
            const health = await fetch("/api/admin/database-status", {
              credentials: "same-origin",
              cache: "no-store",
              signal: abort.signal,
            });
            if (health.status === 401 || health.status === 403) {
              if (!abort.signal.aborted) setDatabase(null);
            } else {
              if (!health.ok) throw new Error("Health endpoint unavailable");
              const value = await health.json();
              if (!abort.signal.aborted) setDatabase(value);
            }
          } catch (error) {
            if (!abort.signal.aborted)
              setDatabase({
                status: "red",
                provider: "Unknown",
                database: "Unverified",
                message: "Status check unavailable",
              });
          }
        }
      } catch {
      } finally {
        pending = false;
      }
    }
    const timer = setInterval(refresh, 60000),
      visible = () => {
        if (!document.hidden) refresh();
      };
    document.addEventListener("visibilitychange", visible);
    window.addEventListener("efs:source-status-refresh", refresh);
    refresh();
    return () => {
      abort.abort();
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visible);
      window.removeEventListener("efs:source-status-refresh", refresh);
    };
  }, []);
  if (!config) return null;
  const current = state(config);
  return createPortal(
    <aside
      id="efs-admin-source-status"
      aria-live="polite"
      aria-label="Admin connected data source status"
      data-tone={current.tone}
    >
      <div className="efs-source-row">
        <span className="efs-source-dot" aria-hidden="true" />
        <strong>Connected source: {sourceLabel(config)}</strong>
        <span className="efs-source-state">{current.label}</span>
        <button
          className="efs-toggle"
          type="button"
          aria-expanded={!collapsed}
          aria-controls="efs-status-detail"
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? "Details ▾" : "Collapse ▴"}
        </button>
      </div>
      <div id="efs-status-detail" hidden={collapsed}>
        <div className="efs-source-meta">
          Last successful: {when(config.lastSuccessfulSyncAt)}
          {!config.configured ? " · incomplete" : ""}
          {config.environmentLocked ? " · Railway env locked" : ""}
          {config.lastSyncNote ? " · " + config.lastSyncNote : ""}
        </div>
        <div className="efs-help">
          Source = external SQL/API reporting data. COMPLETE = last import
          succeeded, not proof that the source is up to date. PostgreSQL = the
          shared Neon application database that stores dashboards and users;
          HEALTHY means its connection check succeeded. A healthy database does
          not guarantee successful source sync.
        </div>
        <DatabaseStatus value={database} />
      </div>
    </aside>,
    document.body,
  );
}

function DatabaseStatus({ value }) {
  const tone = value
    ? ["green", "yellow", "red"].includes(value.status)
      ? value.status
      : "red"
    : "yellow";
  return (
    <div className="efs-db-panel" data-db-status={tone} id="efs-db-status">
      <div className="efs-source-row">
        <span className="efs-db-dot" aria-hidden="true" />
        <strong>
          PostgreSQL:{" "}
          {value
            ? (value.provider || "Unknown") +
              " · " +
              (value.database || "Unknown")
            : "Checking connection…"}
        </strong>
        <span className="efs-source-state">
          {!value
            ? "CHECKING"
            : tone === "green"
              ? "HEALTHY"
              : tone === "yellow"
                ? "DEGRADED"
                : "ERROR"}
        </span>
      </div>
      {value && (
        <div className="efs-source-meta">
          {value.message || "Unknown"}
          {Number.isFinite(value.latencyMs)
            ? " · " + value.latencyMs + " ms"
            : ""}{" "}
          · Checked: {value.checkedAt ? when(value.checkedAt) : "Unavailable"}
        </div>
      )}
    </div>
  );
}
