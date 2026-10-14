import React, { useRef, useState } from "react";
import { refreshImportHistory, useClearReportResult } from "./AdminReports.jsx";
import { refreshGovernance } from "./AdminGovernance.jsx";

// Temporary data-refresh bridge for the remaining integration controller.
let refreshIntegration = () => Promise.resolve();
export function configureResetRefresh(refresh) {
  refreshIntegration = refresh;
}

export function AdminReset() {
  const [open, setOpen] = useState(false),
    [confirmation, setConfirmation] = useState(""),
    [message, setMessage] = useState(null),
    [busy, setBusy] = useState(false);
  const pending = useRef(false),
    clearResult = useClearReportResult();
  function show() {
    setConfirmation("");
    setMessage(null);
    setOpen(true);
  }
  async function rebuild() {
    if (pending.current) return;
    if (confirmation.trim() !== "RESET") {
      setMessage({
        kind: "err",
        text: "Please type RESET exactly to confirm.",
      });
      return;
    }
    if (
      !window.confirm(
        "Reset the source-derived reporting model and rebuild it immediately from the connected source? The last successful dashboard remains published until all 10 feeds complete.",
      )
    )
      return;
    pending.current = true;
    setBusy(true);
    setMessage({
      kind: "ok",
      text: "Preflighting source, then resetting and rewriting all 10 feeds from the authoritative database…",
    });
    try {
      const response = await fetch("/api/admin/reset-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "RESET" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok)
        throw new Error(
          data.error ||
            data.note ||
            `Reset & rebuild failed (HTTP ${response.status})`,
        );
      const cleared = Object.values(data.cleared || {}).reduce(
        (sum, value) => sum + (Number(value) || 0),
        0,
      );
      const loaded = Number(data.overwrittenRows || 0);
      setConfirmation("");
      clearResult();
      setMessage({
        kind: "ok",
        text: `✓ Authoritative rebuild published. Cleared ${cleared.toLocaleString("en-ZA")} source-derived rows and accepted ${loaded.toLocaleString("en-ZA")} rows from the connected source. Previous cursors/MLOps/staleness did not gate this rebuild.`,
      });
      // Optional panel refresh errors must never turn a published rebuild into a failure.
      await Promise.allSettled([
        refreshImportHistory(),
        Promise.resolve().then(refreshIntegration),
        Promise.resolve().then(refreshGovernance),
      ]);
    } catch (error) {
      setMessage({
        kind: "err",
        text: `✕ Reset & rebuild did not publish. The last successful dashboard remains visible. Reason: ${error.message}`,
      });
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  return (
    <div className="card section-gap" style={{ borderColor: "#f3c9c0" }}>
      <div className="card-hd" style={{ borderBottomColor: "#fbe4df" }}>
        <h2 style={{ color: "#b5391f" }}>Danger zone</h2>
        <div className="note">
          Authoritative reset and rebuild from the connected source
        </div>
      </div>
      <div className="card-bd">
        <p className="muted" style={{ marginBottom: 14 }}>
          <b>Reset always reloads.</b> The connected API/SQL database becomes
          the source of truth: prior cursors, import history, MLOps decisions
          and stale-write comparisons are ignored for this rebuild. The current
          published dashboard stays visible until all 10 feeds have been rebuilt
          successfully. User logins, access, branding and separately sourced
          chat history are kept.
        </p>
        <button
          className="btn"
          id="reset-btn"
          style={{ borderColor: "#e0492f", color: "#b5391f" }}
          onClick={show}
          disabled={busy}
        >
          Reset &amp; rebuild from source…
        </button>
        {open && (
          <div
            id="reset-area"
            style={{
              marginTop: 16,
              padding: 16,
              border: "1px solid #f3c9c0",
              borderRadius: 11,
              background: "#fdf5f3",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#b5391f",
                fontSize: 13.5,
                marginBottom: 8,
              }}
            >
              Are you sure? This cannot be undone.
            </div>
            <div className="muted" style={{ marginBottom: 10 }}>
              Type <b>RESET</b> below to confirm.
            </div>
            <input
              id="reset-confirm"
              aria-label="Reset confirmation"
              autoFocus
              placeholder="type RESET"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              disabled={busy}
              style={{
                fontFamily: "inherit",
                fontSize: 13.5,
                padding: "9px 12px",
                border: "1px solid #e0492f",
                borderRadius: 9,
                width: 160,
              }}
            />
            <button
              className="btn"
              style={{
                background: "#e0492f",
                color: "#fff",
                borderColor: "#e0492f",
                marginLeft: 8,
              }}
              onClick={rebuild}
              disabled={busy}
            >
              Reset &amp; rebuild
            </button>
            <button
              className="btn btn-ghost"
              style={{ marginLeft: 4 }}
              onClick={() => setOpen(false)}
              disabled={busy}
            >
              Cancel
            </button>
            <div className="muted" style={{ marginTop: 12 }}>
              This cannot leave the portal as an intentionally empty dataset:
              the reset and source rewrite are one authoritative operation.
            </div>
            {message && (
              <div
                className={`banner ${message.kind}`}
                id="reset-msg"
                role="status"
                style={{ marginTop: 12 }}
              >
                {message.text}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
