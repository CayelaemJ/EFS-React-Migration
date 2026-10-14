import React, { useEffect, useState } from "react";
import { EngagementLayout } from "../parity/admin-insights-layout.jsx";

export function useAdminRead(url, { enabled = true, interval = 0 } = {}) {
  const [state, setState] = useState({ loading: true, data: null, error: "" }),
    [attempt, retry] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    let active = true;
    setState({ loading: true, data: null, error: "" });
    async function read(path) {
      const r = await fetch(path, {
          signal: controller.signal,
          cache: "no-store",
        }),
        data = await r.json();
      if (!r.ok) throw new Error(data.error || `Request failed (${r.status})`);
      return data;
    }
    (async () => {
      try {
        const me = await read("/api/auth/me");
        if (!["ADMIN", "SUPERADMIN"].includes(me.role) || !me.modules?.admin) {
          if (active) setState({ loading: false, data: null, error: "" });
          return;
        }
        const data = await read(url);
        if (active) setState({ loading: false, data, error: "" });
      } catch (e) {
        if (active && e.name !== "AbortError")
          setState({ loading: false, data: null, error: e.message });
      }
    })();
    return () => {
      active = false;
      controller.abort();
    };
  }, [url, attempt, enabled]);
  useEffect(() => {
    if (!enabled || !interval) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") retry((n) => n + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [enabled, interval]);
  useEffect(() => {
    if (!enabled) return;
    const refresh = () => retry((n) => n + 1);
    window.addEventListener("admin-governance-refresh", refresh);
    return () =>
      window.removeEventListener("admin-governance-refresh", refresh);
  }, [enabled]);
  return { ...state, retry: () => retry((n) => n + 1) };
}
const criticalRank = {
  "user.delete": 0,
  "user.revoke": 0,
  "user.update": 1,
  "user.create": 2,
  "partner.delete": 0,
  "partner.update": 1,
  "partner.create": 2,
  "security.alert.resolve": 1,
  "section.update": 2,
};
const date = (value) =>
  value
    ? new Date(value).toLocaleString("en-ZA", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
export function AuditRows() {
  const { data, loading, error, retry } = useAdminRead(
    "/api/admin/audit-log?limit=200",
  );
  const rows = (Array.isArray(data) ? data : [])
    .slice()
    .sort(
      (a, b) =>
        (criticalRank[a.action] ?? 3) - (criticalRank[b.action] ?? 3) ||
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    )
    .slice(0, 5);
  return (
    <tbody id="audit-rows">
      {loading ? (
        <tr>
          <td colSpan={4} className="muted" style={{ padding: 10 }}>
            Loading…
          </td>
        </tr>
      ) : error ? (
        <tr>
          <td colSpan={4} style={{ padding: 10 }} role="alert">
            Could not load the audit log.{" "}
            <button type="button" className="btn btn-sm" onClick={retry}>
              Retry audit log
            </button>
          </td>
        </tr>
      ) : !rows.length ? (
        <tr>
          <td colSpan={4} className="muted" style={{ padding: 10 }}>
            No admin changes recorded yet.
          </td>
        </tr>
      ) : (
        rows.map((row, i) => (
          <tr key={row.id || i}>
            <td className="muted" style={{ whiteSpace: "nowrap" }}>
              {date(row.createdAt)}
            </td>
            <td>
              <b>{row.actorName}</b>
              <div className="muted">{row.actorEmail}</div>
            </td>
            <td>
              <span className="tag">{row.action}</span>
            </td>
            <td>{row.summary}</td>
          </tr>
        ))
      )}
    </tbody>
  );
}
export function Engagement() {
  const [days, setDays] = useState("30"),
    { data, loading, error, retry } = useAdminRead(
      `/api/admin/analytics/summary?days=${days}`,
    );
  const trend = Array.isArray(data?.trend) ? data.trend : [],
    pages = Array.isArray(data?.topPages) ? data.topPages : [],
    users = Array.isArray(data?.byUser) ? data.byUser : [];
  const duration = (s) =>
    s == null
      ? "—"
      : s < 60
        ? s + "s"
        : Math.round(s / 60) + "m " + (s % 60) + "s";
  const max = Math.max(1, ...trend.map((t) => Number(t.logins) || 0));
  const stats = data
    ? [
        ["Active accounts", data.activeAccountCount],
        ["Signed in this window", data.uniqueSignedInUsers],
        ["Total logins", data.totalLogins],
        ["Pageviews", data.totalPageviews],
        ["Tracked interactions", data.totalInteractions],
        [
          "Avg. scroll depth",
          data.avgScrollDepth == null ? "—" : data.avgScrollDepth + "%",
        ],
        ["Avg. time on page", duration(data.avgSessionSeconds)],
      ]
    : [];
  const state = {
    days,
    stats: loading ? (
      <div className="muted">Loading…</div>
    ) : error ? (
      <div className="muted" role="alert">
        Could not load engagement data.{" "}
        <button type="button" className="btn btn-sm" onClick={retry}>
          Retry engagement
        </button>
      </div>
    ) : (
      stats.map(([label, value]) => (
        <div
          key={label}
          style={{
            background: "#f7fafd",
            border: "1px solid #e8e1f7",
            borderRadius: 12,
            padding: "12px 14px",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 800, color: "#32217c" }}>
            {value ?? "—"}
          </div>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              color: "#8497a7",
              marginTop: 2,
            }}
          >
            {label}
          </div>
        </div>
      ))
    ),
    trend: trend.map((t, i) => (
      <div
        key={i}
        title={`${t.date}: ${t.logins} login(s)`}
        style={{
          flex: 1,
          minWidth: 2,
          background: "#b15be8",
          borderRadius: "3px 3px 0 0",
          height: `${Math.max(3, Math.round(((Number(t.logins) || 0) / max) * 100))}%`,
        }}
      />
    )),
    pages:
      loading || error ? null : pages.length ? (
        pages.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12.5,
              padding: "5px 0",
              borderBottom: "1px solid #f7f4ff",
            }}
          >
            <span className="muted">{p.path}</span>
            <b style={{ color: "#32217c" }}>{p.views}</b>
          </div>
        ))
      ) : (
        <div className="muted" style={{ fontSize: 12.5 }}>
          No pageviews recorded yet.
        </div>
      ),
    users:
      loading || error ? (
        <tr>
          <td colSpan={4} className="muted" style={{ padding: 10 }}>
            {loading ? "Loading…" : "Engagement data unavailable."}
          </td>
        </tr>
      ) : users.length ? (
        users.map((u, i) => (
          <tr key={u.id || i}>
            <td>
              <b>{u.name}</b>
              <div className="muted">{u.email}</div>
            </td>
            <td>{u.logins}</td>
            <td>{u.pageviews}</td>
            <td>{u.avgScrollDepth != null ? u.avgScrollDepth + "%" : "—"}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="muted" style={{ padding: 10 }}>
            No engagement recorded yet in this window.
          </td>
        </tr>
      ),
  };
  return <EngagementLayout state={state} actions={{ days: setDays }} />;
}
