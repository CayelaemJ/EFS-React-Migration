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
  const [config, setConfig] = useState(null);
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
        }
      } catch {
      } finally {
        pending = false;
      }
    }
    const timer = setInterval(refresh, 5000),
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
      </div>
      <div className="efs-source-meta">
        Last successful: {when(config.lastSuccessfulSyncAt)}
        {!config.configured ? " · incomplete" : ""}
        {config.environmentLocked ? " · Railway env locked" : ""}
        {config.lastSyncNote ? " · " + config.lastSyncNote : ""}
      </div>
    </aside>,
    document.body,
  );
}
