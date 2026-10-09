import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SecurityLayout } from "../parity/users-security-layout.jsx";
import { useUsers, userRequest } from "./UsersManagement.jsx";
const list = (value) => (Array.isArray(value) ? value : []);
const post = (body) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
function timeAgo(value) {
  if (!value) return "No activity";
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(value).getTime()) / 1000),
  );
  return seconds < 60
    ? "just now"
    : seconds < 3600
      ? Math.floor(seconds / 60) + "m ago"
      : seconds < 86400
        ? Math.floor(seconds / 3600) + "h ago"
        : Math.floor(seconds / 86400) + "d ago";
}
function age(value) {
  const seconds = Math.max(0, Number(value) || 0),
    d = Math.floor(seconds / 86400),
    h = Math.floor((seconds % 86400) / 3600),
    m = Math.floor((seconds % 3600) / 60);
  return d ? `${d}d ${h}h` : h ? `${h}h ${m}m` : `${m}m`;
}
const place = (value) =>
  [value.city, value.region, value.country].filter(Boolean).join(", ") ||
  "Location unavailable";
const date = (value) => new Date(value).toLocaleString();
function Empty({ columns, children }) {
  return (
    <tr>
      <td colSpan={columns} className="security-empty">
        {children}
      </td>
    </tr>
  );
}
function Result({ login }) {
  return (
    <>
      <span className={"tag " + (login.success ? "live" : "off")}>
        {login.success ? "Success" : "Failed"}
      </span>
      {login.failureReason && <div className="meta">{login.failureReason}</div>}
    </>
  );
}
function Device({ value, fallback = false }) {
  return (
    <>
      {value.deviceType || (fallback ? "Unknown" : "")}
      <div className="meta">
        {value.browser || (fallback ? "Unknown" : "")} ·{" "}
        {value.operatingSystem || (fallback ? "Unknown" : "")}
      </div>
    </>
  );
}
const securityPaths = [
  "overview",
  "sessions",
  "alerts",
  "logins",
  "devices",
  "data-access",
  "database",
];
export function SecurityCenter() {
  const { me, securityUser, setSecurityUser } = useUsers();
  const [data, setData] = useState(null),
    [error, setError] = useState(""),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState("active"),
    [collapsed, setCollapsed] = useState(false),
    [busy, setBusy] = useState("");
  const requestId = useRef(0);
  const closeDrawer = useCallback(
    () => setSecurityUser(null),
    [setSecurityUser],
  );
  const refresh = useCallback(async () => {
    const request = ++requestId.current;
    setError("");
    try {
      const results = await Promise.all(
        securityPaths.map((path) =>
          userRequest(
            "/api/admin/security/" +
              path +
              (path === "sessions"
                ? "?status=" + encodeURIComponent(status) + "&limit=100"
                : path === "alerts"
                  ? "?status=OPEN&limit=50"
                  : path === "logins"
                    ? "?limit=80"
                    : path === "devices"
                      ? "?limit=300"
                      : path === "data-access"
                        ? "?limit=50"
                        : ""),
          ),
        ),
      );
      if (request === requestId.current)
        setData(
          Object.fromEntries(
            securityPaths.map((path, i) => [path, results[i]]),
          ),
        );
    } catch (e) {
      if (request === requestId.current) setError(e.message);
    }
  }, [status]);
  useEffect(() => {
    if (me) refresh();
    return () => {
      requestId.current++;
    };
  }, [me, refresh]);
  async function revoke(id, name, all = false) {
    if (
      !confirm(
        "Log out " +
          name +
          (all ? " from every active session?" : " from this session?"),
      )
    )
      return false;
    setBusy(id);
    setError("");
    try {
      const response = await userRequest(
        all
          ? "/api/admin/users/" + encodeURIComponent(id) + "/revoke-sessions"
          : "/api/admin/security/sessions/" +
              encodeURIComponent(id) +
              "/revoke",
        post({ reason: "Revoked by admin from Security and Identity Centre" }),
      );
      await refresh();
      if (all)
        alert((response.revokedCount || 0) + " active session(s) logged out.");
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setBusy("");
    }
  }
  async function resolve(id) {
    setBusy(id);
    setError("");
    try {
      await userRequest(
        "/api/admin/security/alerts/" + encodeURIComponent(id) + "/resolve",
        { method: "POST" },
      );
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }
  const overview = data?.overview || {},
    sessions = list(data?.sessions),
    alerts = list(data?.alerts),
    logins = list(data?.logins),
    devices = list(data?.devices),
    database = data?.database || {};
  const rank = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
  const access = [...list(data?.["data-access"])]
    .sort(
      (a, b) =>
        (rank[String(a.severity || a.risk || "LOW").toUpperCase()] ?? 4) -
          (rank[String(b.severity || b.risk || "LOW").toUpperCase()] ?? 4) ||
        new Date(b.createdAt || b.at || 0) - new Date(a.createdAt || a.at || 0),
    )
    .slice(0, 5);
  const matching = sessions.filter((s) =>
    [
      s.user?.name,
      s.user?.email,
      s.ipAddress,
      s.location,
      s.browser,
      s.operatingSystem,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  const loading = !data;
  const risk = overview.riskState || "Good";
  const state = {
    collapsed,
    search,
    status,
    live: loading
      ? "-"
      : (overview.activeSessions ?? sessions.filter((s) => s.active).length),
    failed: loading ? "-" : (overview.failedLogins24h ?? 0),
    alertsCount: loading ? "-" : (overview.openAlerts ?? alerts.length),
    success: loading ? "-" : (overview.successfulLogins24h ?? 0),
    title: loading ? "Security posture" : "Security posture: " + risk,
    copy:
      error ||
      (loading
        ? "Loading security telemetry..."
        : risk === "Good"
          ? "No open security alerts and no unusual sign-in volume detected."
          : risk === "Watch"
            ? "Sign-in activity needs review. Check failed logins and recent sessions."
            : "One or more security alerts need attention. Review before making access changes."),
    sessions: loading ? (
      <Empty columns={6}>Loading...</Empty>
    ) : !matching.length ? (
      <Empty columns={6}>No matching sessions.</Empty>
    ) : (
      matching.map((s) => (
        <tr key={s.id}>
          <td>
            <b>{s.user?.name}</b>
            <div className="meta">{s.user?.email}</div>
          </td>
          <td>
            <span className="device">{s.deviceType}</span>
            <div className="meta">
              {s.browser} · {s.operatingSystem}
            </div>
          </td>
          <td className="security-location">
            {s.location}
            <div className="meta">{s.ipAddress || "IP unavailable"}</div>
          </td>
          <td className="muted">{timeAgo(s.lastSeenAt)}</td>
          <td className="muted">{age(s.durationSeconds)}</td>
          <td>
            <button
              className="btn btn-sm"
              type="button"
              disabled={busy === s.id}
              data-revoke-session={s.id}
              onClick={() => revoke(s.id, s.user?.name)}
            >
              Log out
            </button>
          </td>
        </tr>
      ))
    ),
    alerts: loading ? (
      <Empty columns={4}>Loading...</Empty>
    ) : !alerts.length ? (
      <Empty columns={4}>No open security alerts.</Empty>
    ) : (
      alerts.map((a) => (
        <tr key={a.id}>
          <td>
            <span
              className={
                "tag " +
                (["CRITICAL", "HIGH"].includes(a.severity) ? "off" : "pend")
              }
            >
              {a.severity}
            </span>
          </td>
          <td>
            <b>{a.title}</b>
            <div className="meta">{a.summary}</div>
          </td>
          <td className="muted">{timeAgo(a.createdAt)}</td>
          <td>
            <button
              className="btn btn-sm"
              type="button"
              disabled={busy === a.id}
              data-resolve-alert={a.id}
              onClick={() => resolve(a.id)}
            >
              Resolve
            </button>
          </td>
        </tr>
      ))
    ),
    logins: loading ? (
      <Empty columns={6}>Loading...</Empty>
    ) : !logins.length ? (
      <Empty columns={6}>No sign-in history yet.</Empty>
    ) : (
      logins.map((l, i) => (
        <tr key={l.id || i}>
          <td className="muted">{date(l.createdAt)}</td>
          <td>
            <b>{l.email}</b>
          </td>
          <td>
            <Result login={l} />
          </td>
          <td>
            <Device value={l} fallback />
          </td>
          <td>{place(l)}</td>
          <td className="muted">{l.ipAddress || "Unavailable"}</td>
        </tr>
      ))
    ),
    devices: loading ? (
      <Empty columns={6}>Loading...</Empty>
    ) : !devices.length ? (
      <Empty columns={6}>No grouped device history yet.</Empty>
    ) : (
      devices.slice(0, 100).map((d, i) => (
        <tr key={d.id || i}>
          <td>
            <b>{d.user?.name}</b>
            <div className="meta">{d.user?.email}</div>
          </td>
          <td>
            <Device value={d} />
          </td>
          <td>{place(d)}</td>
          <td className="muted">{d.ipAddress || "Unavailable"}</td>
          <td className="muted">{date(d.firstSeenAt)}</td>
          <td className="muted">{timeAgo(d.lastSeenAt)}</td>
        </tr>
      ))
    ),
    access: loading ? (
      <Empty columns={5}>Loading...</Empty>
    ) : !access.length ? (
      <Empty columns={5}>No sensitive data access events recorded yet.</Empty>
    ) : (
      access.map((a, i) => (
        <tr key={a.id || i}>
          <td className="muted">{date(a.createdAt)}</td>
          <td>
            <b>{a.actorEmail || "Unknown"}</b>
          </td>
          <td>{a.resource || "Protected data"}</td>
          <td className="muted">{a.method + " " + a.route}</td>
          <td>{String(a.statusCode || "")}</td>
        </tr>
      ))
    ),
    databaseStatus: loading
      ? "Checking"
      : database.status === "healthy"
        ? "Healthy"
        : "Attention",
    databaseClass:
      "tag " +
      (loading ? "pend" : database.status === "healthy" ? "live" : "off"),
    databaseCopy: loading
      ? "Checking application database controls..."
      : database.status === "healthy"
        ? `PostgreSQL is responding. ${Number(database.connections) || 0} total connection(s), ${Number(database.activeConnections) || 0} active. Database size: ${Math.round((Number(database.sizeBytes) || 0) / 1048576)} MB.`
        : database.error || "Database security telemetry is unavailable.",
    databaseControls:
      database.status === "healthy"
        ? [
            "Raw SQL from admin UI disabled",
            "Destructive database actions disabled",
            "Sensitive API access audited",
            "Session revocation enabled",
            "Security alerts enabled",
          ].map((text) => (
            <span className="chip" key={text}>
              ✓ {text}
            </span>
          ))
        : null,
  };
  return (
    <>
      <SecurityLayout
        state={state}
        actions={{
          refresh,
          search: (event) => setSearch(event.target.value),
          status: (event) => setStatus(event.target.value),
          toggle: () => setCollapsed((v) => !v),
          download: () => {
            location.href = "/api/admin/security/audit-log.csv";
          },
        }}
      />
      {securityUser && (
        <SecurityDrawer
          user={securityUser}
          onClose={closeDrawer}
          revoke={revoke}
        />
      )}
    </>
  );
}
function SecurityDrawer({ user, onClose, revoke }) {
  const [data, setData] = useState(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    let mounted = true;
    userRequest(
      "/api/admin/security/sessions?userId=" +
        encodeURIComponent(user.id) +
        "&limit=100",
    )
      .then(async (sessions) => {
        const logins = await userRequest(
          "/api/admin/security/logins?userId=" +
            encodeURIComponent(user.id) +
            "&limit=100",
        );
        if (mounted)
          setData({ sessions: list(sessions), logins: list(logins) });
      })
      .catch((e) => {
        if (mounted) setError(e.message);
      });
    const previous = document.activeElement;
    dialog.current?.querySelector("[data-close-security]")?.focus();
    const keyboard = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab") {
        const controls = [...dialog.current.querySelectorAll("button")].filter(
            (el) => !el.disabled,
          ),
          first = controls[0],
          last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => {
      mounted = false;
      document.removeEventListener("keydown", keyboard);
      previous?.focus?.();
    };
  }, [user.id, onClose]);
  async function logout(id, all) {
    setBusy(true);
    if (await revoke(id, user.name, all)) onClose();
    else
      setError(
        "The session was not revoked. Check the security centre for details and retry.",
      );
    setBusy(false);
  }
  const sessions = data?.sessions || [],
    logins = data?.logins || [];
  return createPortal(
    <div
      className="security-drawer-back"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="security-drawer"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="security-profile-name"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "flex-start",
            marginBottom: 18,
          }}
        >
          <div>
            <div className="muted">Security profile</div>
            <h2
              id="security-profile-name"
              style={{
                font: "600 24px Fraunces,serif",
                color: "var(--brand-primary)",
                margin: "2px 0 4px",
              }}
            >
              {user.name}
            </h2>
            <div className="muted">{user.email}</div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="btn btn-sm"
              type="button"
              data-revoke-all
              disabled={busy}
              onClick={() => logout(user.id, true)}
            >
              Log out all sessions
            </button>
            <button
              className="btn btn-sm"
              type="button"
              data-close-security
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        {error && <div role="alert">{error}</div>}
        {!data && !error && <div role="status">Loading security profile…</div>}
        <div className="security-detail-grid">
          {[
            ["Role", String(user.role || "").replace("_", " ")],
            ["Account", user.active ? "Active" : "Disabled"],
            ["Live sessions", sessions.filter((s) => s.active).length],
            [
              "Last login",
              logins[0] ? date(logins[0].createdAt) : "No login recorded",
            ],
          ].map(([key, value]) => (
            <div key={key} className="security-detail">
              <div className="k">{key}</div>
              <div className="v">{value}</div>
            </div>
          ))}
        </div>
        <h3
          style={{
            margin: "20px 0 8px",
            fontSize: 12,
            color: "var(--brand-primary)",
          }}
        >
          Sessions
        </h3>
        <div className="security-table-wrap">
          <table className="security-table">
            <thead>
              <tr>
                {[
                  "State",
                  "Device",
                  "Location",
                  "Started",
                  "Last seen",
                  "",
                ].map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className={"tag " + (s.active ? "live" : "off")}>
                      {s.active ? "live" : "ended"}
                    </span>
                  </td>
                  <td>
                    <Device value={s} />
                  </td>
                  <td>
                    {s.location}
                    <div className="meta">{s.ipAddress || ""}</div>
                  </td>
                  <td>{date(s.createdAt)}</td>
                  <td>{timeAgo(s.lastSeenAt)}</td>
                  <td>
                    {s.active && (
                      <button
                        className="btn btn-sm"
                        type="button"
                        data-drawer-revoke={s.id}
                        disabled={busy}
                        onClick={() => logout(s.id, false)}
                      >
                        Log out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3
          style={{
            margin: "20px 0 8px",
            fontSize: 12,
            color: "var(--brand-primary)",
          }}
        >
          Recent sign-ins
        </h3>
        <div className="security-table-wrap">
          <table className="security-table">
            <thead>
              <tr>
                {["Time", "Result", "Device", "Location", "IP"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logins.slice(0, 40).map((l, i) => (
                <tr key={l.id || i}>
                  <td>{date(l.createdAt)}</td>
                  <td>
                    <Result login={l} />
                  </td>
                  <td>
                    <Device value={l} />
                  </td>
                  <td>{place(l)}</td>
                  <td>{l.ipAddress || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body,
  );
}
