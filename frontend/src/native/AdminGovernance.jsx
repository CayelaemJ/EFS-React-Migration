import React, { useState } from "react";
import { useAdminRead } from "./AdminInsights.jsx";
import {
  ComplianceLayout,
  AdminSecurityLayout,
  MLOpsLayout,
} from "../parity/admin-governance-layout.jsx";
export function refreshGovernance() {
  window.dispatchEvent(new Event("admin-governance-refresh"));
}
const date = (value) =>
  value
    ? new Date(value).toLocaleString("en-ZA", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
function Retry({ message, retry }) {
  return (
    <span role="alert">
      {message}{" "}
      <button className="btn btn-sm" type="button" onClick={retry}>
        Retry
      </button>
    </span>
  );
}
export function AdminSecurity() {
  const {
    data: d,
    loading,
    error,
    retry,
  } = useAdminRead("/api/admin/security/overview", { interval: 30000 });
  const state = {
    live: d?.activeSessions ?? 0,
    failed: d?.failedLogins24h || 0,
    alerts: d?.openAlerts || 0,
    success: d?.successfulLogins24h || 0,
    copy: error ? (
      <Retry message="Unable to load security posture." retry={retry} />
    ) : loading ? (
      "Loading security posture..."
    ) : d?.riskState === "Good" ? (
      "Security posture is clear. Open the Security & identity centre for active sessions and recent sign-ins."
    ) : (
      "Attention is required. Review open alerts and recent sign-ins before making further access changes."
    ),
  };
  return <AdminSecurityLayout state={state} />;
}
function DetailList({ resource, open, empty, render }) {
  const { data, loading, error, retry } = useAdminRead(
    "/api/admin/compliance/" + resource,
    { enabled: open },
  );
  if (loading) return <div className="compliance-item">Loading…</div>;
  if (error)
    return (
      <div className="compliance-item">
        <Retry message="Could not load this register." retry={retry} />
      </div>
    );
  const rows = Array.isArray(data) ? data : [];
  return rows.length ? (
    rows.slice(0, 8).map((x, i) => (
      <div className="compliance-item" key={x.id || i}>
        {render(x)}
      </div>
    ))
  ) : (
    <div className="compliance-item">{empty}</div>
  );
}
export function Compliance() {
  const [open, setOpen] = useState(false),
    {
      data: d,
      loading,
      error,
      retry,
    } = useAdminRead("/api/admin/compliance/overview", { interval: 30000 });
  const state = {
    open,
    activities: d?.processingActivities || 0,
    crossborder: d?.crossBorderActivities || 0,
    requests: d?.openDataSubjectRequests || 0,
    incidents: d?.openSecurityIncidents || 0,
    gaps: d?.governanceGaps || 0,
    colour: d?.status === "ACTION_REQUIRED" ? "#b5391f" : "#617486",
    status: error ? (
      <Retry message="Unable to load compliance controls." retry={retry} />
    ) : loading ? (
      "Loading compliance controls..."
    ) : d?.status === "ACTION_REQUIRED" ? (
      "Action required: review governance gaps, overdue data-subject requests and/or open security incidents."
    ) : (
      "Governance controls are being monitored. Keep the processing register, vendor register and retention schedule current."
    ),
    activitiesList: (
      <DetailList
        resource="processing-activities"
        open={open}
        empty="No processing activities recorded yet."
        render={(x) => (
          <>
            <strong>{x.name}</strong>
            <small>
              {x.partyRole} · {x.lawfulBasis} · PIA: {x.piaStatus}
              {x.crossBorder ? " · cross-border" : ""}
            </small>
          </>
        )}
      />
    ),
    vendorsList: (
      <DetailList
        resource="vendors"
        open={open}
        empty="No vendors recorded yet."
        render={(x) => (
          <>
            <strong>{x.name}</strong>
            <small>
              {x.country} · {x.crossBorder ? "cross-border" : "local"} ·
              approved: {x.approved ? "yes" : "no"} · operator agreement:{" "}
              {x.operatorAgreement ? "yes" : "no"}
            </small>
          </>
        )}
      />
    ),
    requestsList: (
      <DetailList
        resource="requests"
        open={open}
        empty="No data-subject requests recorded."
        render={(x) => (
          <>
            <strong>{x.requestType}</strong>
            <small>
              {x.requesterEmail} · {x.status} · due:{" "}
              {x.dueAt ? date(x.dueAt) : "not set"}
            </small>
          </>
        )}
      />
    ),
    retentionList: (
      <DetailList
        resource="retention"
        open={open}
        empty="No retention policies recorded."
        render={(x) => (
          <>
            <strong>{x.dataClass}</strong>
            <small>
              {x.retentionDays
                ? x.retentionDays + " days"
                : "event/purpose based"}{" "}
              · {x.deletionMethod} · legal hold: {x.legalHold ? "yes" : "no"}
            </small>
          </>
        )}
      />
    ),
    incidentsList: (
      <DetailList
        resource="incidents"
        open={open}
        empty="No open security incidents."
        render={(x) => (
          <>
            <strong>{x.title}</strong>
            <small>
              {x.severity} · {x.status} · discovered: {date(x.discoveredAt)}
            </small>
          </>
        )}
      />
    ),
  };
  return (
    <ComplianceLayout
      state={state}
      actions={{ toggle: () => setOpen((v) => !v) }}
    />
  );
}
export function MLOpsAlert() {
  const [open, setOpen] = useState(false),
    { data, error, retry } = useAdminRead("/api/admin/mlops/events?limit=50");
  const latest = new Map();
  for (const event of Array.isArray(data) ? data : []) {
    const key = event.metadata?.reportKey || "dataset";
    if (event.eventType === "DATA_QUALITY_GATE" && !latest.has(key))
      latest.set(key, event);
  }
  const rows = [...latest.values()],
    issue =
      rows.find((e) => e.status === "QUARANTINE") ||
      rows.find((e) => e.status === "REVIEW"),
    meta = issue?.metadata || {},
    findings = Array.isArray(meta.findings) ? meta.findings : [],
    blocking = issue?.status === "QUARANTINE";
  const state = {
    shown: !!issue || !!error,
    open,
    badge: error ? "UNAVAILABLE" : blocking ? "ACTION REQUIRED" : "REVIEW ONLY",
    badgeStyle: {
      color: blocking ? "#b5391f" : "#8a5a10",
      background: blocking ? "#fdecea" : "#fff8e8",
      borderColor: blocking ? "#f3c9c1" : "#efd49b",
    },
    summary: error ? (
      <Retry
        message="Could not load MLOps data-quality status."
        retry={retry}
      />
    ) : blocking ? (
      `QUARANTINE: ${meta.reportKey || "incoming dataset"} was blocked before live-table commit. ${meta.findingCount || findings.length || 0} issue(s) require action.`
    ) : (
      `REVIEW: ${meta.reportKey || "incoming dataset"} loaded successfully with ${meta.findingCount || findings.length || 0} advisory warning(s). No rows were blocked.`
    ),
    detail: issue ? (
      <>
        <div className="mlops-summary">
          <strong>What is off:</strong> {issue.modelKey || "data-quality"}{" "}
          detected abnormal incoming data.
        </div>
        {findings.length ? (
          findings.slice(0, 8).map((f, i) => (
            <div className="mlops-finding" key={i}>
              <strong>{f.code || "DATA_QUALITY"}</strong> ·{" "}
              {f.field || "dataset"} — {f.message || "Review this finding."}
              <br />
              <span className="muted">
                <strong>Fix:</strong>{" "}
                {f.action || "Correct the source data and retry the load."}
              </span>
            </div>
          ))
        ) : (
          <div className="mlops-finding">
            Review the MLOps event metadata for the full diagnostic record.
          </div>
        )}
      </>
    ) : null,
  };
  return (
    <MLOpsLayout state={state} actions={{ toggle: () => setOpen((v) => !v) }} />
  );
}
