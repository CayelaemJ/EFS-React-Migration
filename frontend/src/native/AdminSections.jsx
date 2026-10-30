import React, { useEffect, useRef, useState } from "react";

const roles = {
  ADMIN: "Admin",
  EMPLOYER_MANAGER: "Employer Manager",
  PORTFOLIO_MANAGER: "Portfolio Manager",
  VIEWER: "Viewer",
};
async function request(path, signal, body, method = "GET") {
  const response = await fetch(path, {
    credentials: "include",
    cache: "no-store",
    signal,
    method,
    ...(body
      ? {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      : {}),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}
function rows(value) {
  if (!Array.isArray(value))
    throw new Error("Section API returned an invalid list");
  return value.map((section) => {
    if (
      typeof section.key !== "string" ||
      !Array.isArray(section.allowedRoles) ||
      !Array.isArray(section.overrides)
    )
      throw new Error("Section API returned an invalid section");
    return section;
  });
}

export function AdminSections() {
  const [authorized, setAuthorized] = useState(false),
    [sections, setSections] = useState(null);
  const [users, setUsers] = useState([]),
    [selected, setSelected] = useState({});
  const [error, setError] = useState(""),
    [userError, setUserError] = useState("");
  const [busy, setBusy] = useState(""),
    [revision, setRevision] = useState(0);
  const active = useRef(null),
    saving = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    active.current = controller;
    const signal = controller.signal;
    async function load() {
      setError("");
      try {
        const me = await request("/api/auth/me", signal);
        if (me.role !== "SUPERADMIN" || !me.modules?.admin) return;
        setAuthorized(true);
        const values = await request("/api/admin/sections", signal);
        setSections(rows(values));
        try {
          const list = await request("/api/users", signal);
          if (!Array.isArray(list))
            throw new Error("Users API returned an invalid list");
          setUsers(list);
          setUserError("");
        } catch (e) {
          if (!signal.aborted) setUserError(e.message);
        }
      } catch (e) {
        if (!signal.aborted) setError(e.message);
      }
    }
    load();
    return () => controller.abort();
  }, [revision]);

  async function save(section, suffix, body) {
    if (saving.current || !active.current || active.current.signal.aborted)
      return;
    saving.current = true;
    setBusy(section.key);
    setError("");
    const signal = active.current.signal;
    try {
      await request(
        "/api/admin/sections/" + encodeURIComponent(section.key) + suffix,
        signal,
        body,
        suffix ? "POST" : "PATCH",
      );
      const latest = rows(await request("/api/admin/sections", signal));
      setSections(latest);
      if (suffix === "/grant")
        setSelected((values) => ({ ...values, [section.key]: "" }));
    } catch (e) {
      if (!signal.aborted) setError(e.message);
    } finally {
      saving.current = false;
      if (!signal.aborted) setBusy("");
    }
  }
  if (!authorized) return <div id="sec-list" />;
  return (
    <div id="sec-list" aria-busy={Boolean(busy)}>
      {error && (
        <p className="muted" role="alert">
          Could not update dashboard sections: {error}{" "}
          <button
            className="btn btn-ghost"
            onClick={() => setRevision((n) => n + 1)}
            disabled={Boolean(busy)}
          >
            Retry
          </button>
        </p>
      )}
      {userError && (
        <p className="muted" role="alert">
          Could not load people for access grants: {userError}{" "}
          <button
            className="btn btn-ghost"
            onClick={() => setRevision((n) => n + 1)}
            disabled={Boolean(busy)}
          >
            Retry
          </button>
        </p>
      )}
      {sections?.length === 0 && (
        <p className="muted">No dashboard sections found.</p>
      )}
      {sections?.map((section) => (
        <div
          key={section.key}
          data-section-key={section.key}
          style={{
            border: "1px solid #e8e1f7",
            borderRadius: 11,
            padding: "14px 16px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 800,
                fontSize: 13.5,
                color: "#32217c",
                flex: 1,
              }}
            >
              <input
                type="checkbox"
                checked={section.enabled}
                disabled={Boolean(busy)}
                onChange={(event) =>
                  save(section, "", { enabled: event.target.checked })
                }
              />{" "}
              {section.label}
            </label>
            <span className="muted" style={{ fontSize: 11.5 }}>
              {section.enabled
                ? "Visible"
                : "Hidden from everyone (except admins and explicit grants below)"}
            </span>
          </div>
          <div style={{ margin: "8px 0" }}>
            {Object.entries(roles).map(([role, label]) => (
              <label
                key={role}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#5b6b7a",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  marginRight: 14,
                }}
              >
                <input
                  type="checkbox"
                  checked={section.allowedRoles.includes(role)}
                  disabled={Boolean(busy)}
                  onChange={(event) => {
                    const allowed = new Set(section.allowedRoles);
                    event.target.checked
                      ? allowed.add(role)
                      : allowed.delete(role);
                    save(section, "", { allowedRoles: [...allowed] });
                  }}
                />{" "}
                {label}
              </label>
            ))}
          </div>
          <div style={{ marginTop: 10 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#8497a7",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: 6,
              }}
            >
              Extra access for specific people
            </div>
            <div style={{ marginBottom: 8 }}>
              {section.overrides.length ? (
                section.overrides.map((person) => (
                  <span
                    key={person.userId}
                    className="tag opt"
                    style={{ margin: "2px 4px 2px 0" }}
                  >
                    {person.name || person.email}{" "}
                    <a
                      href="#"
                      aria-label={`Revoke access for ${person.name || person.email}`}
                      aria-disabled={Boolean(busy)}
                      onClick={(event) => {
                        event.preventDefault();
                        save(section, "/revoke", { userId: person.userId });
                      }}
                      style={{
                        color: "#b5391f",
                        textDecoration: "none",
                        marginLeft: 4,
                      }}
                    >
                      ✕
                    </a>
                  </span>
                ))
              ) : (
                <span className="muted">None</span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                id={"sec-u-" + section.key}
                aria-label={"Grant access to " + section.label}
                value={selected[section.key] || ""}
                disabled={Boolean(busy) || Boolean(userError)}
                onChange={(event) =>
                  setSelected((values) => ({
                    ...values,
                    [section.key]: event.target.value,
                  }))
                }
                style={{
                  font: "inherit",
                  padding: "7px 10px",
                  border: "1px solid #e8e1f7",
                  borderRadius: 7,
                  flex: 1,
                }}
              >
                <option value="">Grant access to…</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.email}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-ghost"
                disabled={Boolean(busy) || Boolean(userError)}
                onClick={() => {
                  if (selected[section.key])
                    save(section, "/grant", { userId: selected[section.key] });
                }}
              >
                Grant
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
