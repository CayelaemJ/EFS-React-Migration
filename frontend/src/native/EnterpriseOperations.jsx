import React, { useState } from "react";
import { useAdminRead } from "./AdminInsights.jsx";
import { EnterpriseLayout } from "../parity/admin-governance-layout.jsx";
export function EnterpriseOperations() {
  const [collapsed, setCollapsed] = useState(false);
  const overview = useAdminRead("/api/admin/enterprise/overview"),
    quality = useAdminRead("/api/admin/enterprise/data-quality"),
    routes = useAdminRead("/api/admin/integration/routes"),
    replica = useAdminRead("/api/admin/integration/replica-health");
  const reads = [overview, quality, routes, replica],
    busy = reads.some((r) => r.loading),
    error = reads.find((r) => r.error)?.error,
    o = overview.data,
    q = quality.data,
    r = routes.data,
    p = replica.data,
    source = o?.integration,
    c = q?.checks || {};
  const refresh = () => reads.forEach((r) => r.retry());
  const state = {
    collapsed,
    busy,
    quality: q ? Number(q.score ?? 0).toFixed(1) + "%" : "-",
    source: source?.sourceMode || "-",
    store:
      source?.analyticsMode === "POSTGRES_READ_MODEL"
        ? "PostgreSQL"
        : source?.analyticsMode || "-",
    freshness: source
      ? source.freshnessState === "FRESH"
        ? "Fresh"
        : source.freshnessState === "STALE"
          ? "Stale"
          : "Unknown"
      : "-",
    imports: o ? String(o.imports?.open || 0) : "-",
    replica: p
      ? p.configured
        ? p.reachable
          ? p.readOnly && p.lagWithinThreshold !== false
            ? "Healthy"
            : "Attention"
          : "Unreachable"
        : "Not configured"
      : undefined,
    architecture: error ? (
      <span role="alert">Could not load enterprise operations: {error}</span>
    ) : busy ? (
      "Loading enterprise operations…"
    ) : source ? (
      <>
        <strong style={{ color: "var(--brand-primary)" }}>
          Recommended placement:
        </strong>{" "}
        {source.sourceMode} remains the source of truth. PostgreSQL serves the
        application read model and governed audit/history. Heavy analytics
        should run against approved source-side reporting views
        {source.sourceAnalyticsUseReplica ? " on a read replica" : ""} rather
        than the production source database.{" "}
        {source.sourceAnalyticsEnabled
          ? "Source-side analytics is enabled."
          : "Source-side analytics is currently disabled."}{" "}
        No raw SQL is exposed to administrators.
      </>
    ) : (
      <span role="alert">
        Could not load enterprise operations: invalid overview response.
      </span>
    ),
    routes: routes.error ? (
      <tr>
        <td colSpan={7} className="muted" role="alert">
          Could not load routes. Use Refresh to retry.
        </td>
      </tr>
    ) : routes.loading ? (
      <tr>
        <td colSpan={7} className="muted">
          Loading routes...
        </td>
      </tr>
    ) : Array.isArray(r) && r.length ? (
      r.map((x, i) => (
        <tr key={x.reportKey || i}>
          <td>
            <code>{x.reportKey}</code>
          </td>
          <td>{x.workloadClass || "POSTGRES_READ_MODEL"}</td>
          <td>{x.executionMode}</td>
          <td>{x.sourceView || "not configured"}</td>
          <td>{x.useReplica ? "Required" : "No"}</td>
          <td>{x.enabled ? "Yes" : "No"}</td>
          <td className="muted">{x.rationale || "No rationale recorded"}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={7} className="muted">
          No per-feed routes configured. PostgreSQL is used by default.
        </td>
      </tr>
    ),
    detail: q ? (
      <div className="compliance-grid">
        <div className="compliance-box">
          <h3>Completeness</h3>
          <p>
            {c.employeeRecordsChecked || 0} employee records checked. Missing
            income band: {c.employeesMissingIncomeBand || 0}. Missing site:{" "}
            {c.employeesMissingSite || 0}.
          </p>
        </div>
        <div className="compliance-box">
          <h3>Freshness</h3>
          <p>
            Employees older than 7 days: {c.staleEmployeesOver7Days || 0}.
            Salary advances older than 7 days:{" "}
            {c.staleSalaryAdvancesOver7Days || 0}.
          </p>
        </div>
      </div>
    ) : null,
  };
  return (
    <EnterpriseLayout
      state={state}
      actions={{ refresh, toggle: () => setCollapsed((v) => !v) }}
    />
  );
}
