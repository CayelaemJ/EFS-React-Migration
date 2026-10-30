import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import BrandEngine from "../lib/brand-engine.js";
const Context = createContext(null);
export async function userRequest(path, options = {}) {
  const response = await fetch(path, { cache: "no-store", ...options });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    location.href = "/login";
    throw new Error("Session expired");
  }
  if (!response.ok)
    throw new Error(data?.error || `Request failed (${response.status})`);
  return data;
}
const mutation = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
const privileged = (role) => role === "ADMIN" || role === "SUPERADMIN";
const roles = [
  "EMPLOYER_MANAGER",
  "PORTFOLIO_MANAGER",
  "VIEWER",
  "ADMIN",
  "SUPERADMIN",
];
const roleLabel = (role) => String(role || "").replace("_", " ");
export function useUsers() {
  return useContext(Context);
}
export function UsersProvider({ children }) {
  const [me, setMe] = useState(null),
    [users, setUsers] = useState([]),
    [partners, setPartners] = useState([]),
    [revoked, setRevoked] = useState([]);
  const [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [pastError, setPastError] = useState("");
  const [securityUser, setSecurityUser] = useState(null);
  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await userRequest("/api/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);
  const reloadPast = useCallback(async () => {
    setPastError("");
    try {
      const data = await userRequest("/api/admin/users/revoked");
      setRevoked(Array.isArray(data) ? data : []);
    } catch (e) {
      setPastError(e.message);
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const current = await userRequest("/api/auth/me");
        if (!mounted) return;
        if (!privileged(current?.role)) {
          location.href = "/login";
          return;
        }
        setMe(current);
        BrandEngine.themeController().set({
          brand: {
            accentColor: "0FC79B",
            primaryColor: "0FC79B",
            navyColor: "2B1D73",
          },
          light: null,
        });
        window.EmpowerPortalNav?.render({
          me: current,
          navSelector: "#portal-nav",
          accountSelector: "#portal-account",
          active: "users",
        });
        await Promise.allSettled([
          reload(),
          reloadPast(),
          userRequest("/api/admin/partners").then((data) => {
            if (mounted) setPartners(Array.isArray(data) ? data : []);
          }),
        ]);
      } catch (e) {
        if (mounted) {
          setError(e.message);
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [reload, reloadPast]);
  return (
    <Context.Provider
      value={{
        me,
        users,
        partners,
        revoked,
        loading,
        error,
        pastError,
        reload,
        reloadPast,
        securityUser,
        setSecurityUser,
        employers: me?.employers || [],
      }}
    >
      {children}
    </Context.Provider>
  );
}
function Message({ value, id }) {
  return (
    <div
      id={id}
      className={"msg " + (value?.type || "")}
      style={{ display: value ? "block" : "none" }}
      role={value?.type === "err" ? "alert" : "status"}
    >
      {value?.text}
    </div>
  );
}
function EmployerChoices({ employers, selected, onChange, editor = false }) {
  if (!employers.length)
    return (
      <span className="muted">
        {editor ? "No employers yet." : "No employers are available yet."}
      </span>
    );
  return employers.map((e) => (
    <label
      key={e.id}
      style={
        editor
          ? {
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              margin: "3px 12px 3px 0",
              fontWeight: 600,
            }
          : undefined
      }
    >
      <input
        type="checkbox"
        value={e.id}
        checked={selected.includes(e.id)}
        style={editor ? { width: "auto" } : undefined}
        onChange={(event) =>
          onChange(
            event.target.checked
              ? [...selected, e.id]
              : selected.filter((id) => id !== e.id),
          )
        }
      />
      {editor ? " " : null}
      <span>{e.name}</span>
    </label>
  ));
}
export function AddUser() {
  const { me, employers, partners, reload } = useContext(Context);
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [role, setRole] = useState("EMPLOYER_MANAGER"),
    [access, setAccess] = useState("temp"),
    [password, setPassword] = useState(""),
    [partner, setPartner] = useState(""),
    [selected, setSelected] = useState([]),
    [message, setMessage] = useState(null),
    [link, setLink] = useState(""),
    [busy, setBusy] = useState(false);
  async function create() {
    if (busy) return;
    setMessage(null);
    setLink("");
    setBusy(true);
    const body = {
      name,
      email,
      role,
      employerIds: privileged(role) ? [] : selected,
      ...(partner ? { partnerId: partner } : {}),
      ...(access === "temp"
        ? { tempPassword: password }
        : { sendSetupLink: true }),
    };
    try {
      const data = await userRequest("/api/users", mutation("POST", body));
      let text = "User created.";
      if (data.setupPath && data.emailSent)
        text = "User created — a set-password email was sent to " + email + ".";
      else if (data.setupPath) {
        text =
          "User created, but the email could not be sent" +
          (data.emailError ? " (" + data.emailError + ")" : "") +
          ". Share this link with them manually:";
        setLink(location.origin + data.setupPath);
      }
      setMessage({ type: "ok", text });
      setName("");
      setEmail("");
      setPassword("");
      setPartner("");
      setSelected([]);
      await reload();
    } catch (e) {
      setMessage({ type: "err", text: e.message });
    } finally {
      setBusy(false);
    }
  }
  const choice = (value, label, id) => (
    <label>
      <input
        type="radio"
        name="n-role-choice"
        id={id}
        value={value}
        checked={role === value}
        onChange={() => setRole(value)}
      />
      {" " + label}
    </label>
  );
  return (
    <div className="card">
      <div className="card-hd">
        <h2>Add a user</h2>
      </div>
      <div className="card-bd">
        <div className="row2">
          <div>
            <label htmlFor="n-name">Full name</label>
            <input
              id="n-name"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="n-email">Email</label>
            <input
              id="n-email"
              type="email"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row2">
          <div>
            <label>Access</label>
            <div
              className="radio-row"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                gap: 8,
              }}
            >
              {choice(
                "EMPLOYER_MANAGER",
                "Employer Manager",
                "n-access-employer",
              )}
              {choice(
                "PORTFOLIO_MANAGER",
                "Portfolio Manager",
                "n-access-portfolio",
              )}
              {choice("VIEWER", "Viewer", "n-access-viewer")}
              <span id="n-admin-access">
                {me?.role === "SUPERADMIN" &&
                  choice("ADMIN", "Admin", "n-access-admin")}
              </span>
              <span id="n-superadmin-access">
                {me?.role === "SUPERADMIN" &&
                  choice("SUPERADMIN", "Superadmin", "n-access-superadmin")}
              </span>
            </div>
            <select
              id="n-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ display: "none" }}
              aria-hidden="true"
            >
              {roles.map((value) => (
                <option key={value} value={value}>
                  {roleLabel(value)}
                </option>
              ))}
            </select>
            <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>
              Admin includes the operational access above. Portfolio access
              includes employer dashboard access.
            </div>
          </div>
          <div>
            <label>How they get access</label>
            <div className="radio-row">
              <label>
                <input
                  type="radio"
                  name="access"
                  value="temp"
                  checked={access === "temp"}
                  onChange={() => setAccess("temp")}
                />{" "}
                Set a temp password
              </label>
              <label>
                <input
                  type="radio"
                  name="access"
                  value="link"
                  checked={access === "link"}
                  onChange={() => setAccess("link")}
                />{" "}
                Send a set-password link
              </label>
            </div>
            <input
              id="n-pass"
              type="text"
              placeholder="temporary password"
              style={{
                marginTop: 8,
                display: access === "temp" ? "block" : "none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div
          id="emp-wrap"
          style={{ display: privileged(role) ? "none" : "block" }}
        >
          <label>
            Linked employers{" "}
            <span className="muted" id="emp-hint">
              (which employers this user may see)
            </span>
          </label>
          <div className="emp-pick" id="emp-pick">
            {me ? (
              <EmployerChoices
                employers={employers}
                selected={selected}
                onChange={setSelected}
              />
            ) : (
              <span className="muted">Loading employers…</span>
            )}
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <label htmlFor="n-partner">
            Channel partner{" "}
            <span className="muted">(applies their branding — optional)</span>
          </label>
          <select
            id="n-partner"
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
          >
            <option value="">None (standard empower-fin branding)</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.displayName || p.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-primary"
          style={{ marginTop: 18 }}
          onClick={create}
          disabled={busy || !me}
        >
          {busy ? "Creating…" : "Create user"}
        </button>
        <Message id="add-msg" value={message} />
        <div
          className="link-box"
          id="link-box"
          style={{ display: link ? "block" : "none" }}
        >
          <b>Set-password link</b> (copy &amp; send to the user):
          <br />
          {link}
        </div>
      </div>
    </div>
  );
}
function CollapsibleCard({ id, title, children, past = false }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      id={id}
      className={"card" + (collapsed ? " compact-collapsed" : "")}
      style={past ? { borderColor: "#f3c9c0" } : undefined}
    >
      <div
        className="card-hd"
        style={past ? { borderBottomColor: "#fbe4df" } : undefined}
      >
        <h2 style={past ? { color: "#b5391f" } : undefined}>{title}</h2>
        {past && (
          <div
            className="note"
            style={{ marginLeft: 10, color: "#8497a7", fontSize: 12 }}
          >
            Who once had access, and why it ended · admin-only
          </div>
        )}
        <button
          type="button"
          className="btn btn-sm compact-toggle"
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
      <div className="card-bd" style={{ padding: "6px 10px 12px" }}>
        {children}
      </div>
    </div>
  );
}
function Role({ role }) {
  return <span className={"role " + role}>{roleLabel(role)}</span>;
}
const fieldStyle = {
  display: "block",
  width: "100%",
  marginTop: 4,
  padding: "8px 11px",
  border: "1px solid #e8e1f7",
  borderRadius: 8,
  font: "inherit",
};
const labelStyle = { fontSize: 12, fontWeight: 700, color: "#5b6b7a" };
function UserEditor({ user, onClose }) {
  const { me, employers, partners, reload } = useContext(Context);
  const [name, setName] = useState(user.name),
    [role, setRole] = useState(user.role),
    [partner, setPartner] = useState(user.partner?.id || ""),
    [selected, setSelected] = useState((user.employers || []).map((e) => e.id)),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  async function save() {
    setBusy(true);
    setMessage("Saving…");
    try {
      await userRequest(
        "/api/users/" + encodeURIComponent(user.id),
        mutation("PATCH", {
          name: name.trim(),
          role,
          partnerId: partner || null,
          employerIds: privileged(role) ? [] : selected,
        }),
      );
      await reload();
      onClose();
    } catch (e) {
      setMessage("✕ " + e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <tr id={"editor-" + user.id}>
      <td colSpan={7} style={{ background: "#eef3f8", padding: "16px 14px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            maxWidth: 760,
          }}
        >
          <label style={labelStyle}>
            Full name
            <input
              id={"e-name-" + user.id}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={fieldStyle}
            />
          </label>
          <label style={labelStyle}>
            Role
            <select
              id={"e-role-" + user.id}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={fieldStyle}
            >
              {(me?.role === "SUPERADMIN" ? roles : roles.slice(0, 3)).map(
                (r) => (
                  <option key={r} value={r}>
                    {roleLabel(r)}
                  </option>
                ),
              )}
            </select>
          </label>
          <label style={{ ...labelStyle, gridColumn: "span 2" }}>
            Channel partner
            <select
              id={"e-partner-" + user.id}
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              style={fieldStyle}
            >
              <option value="">None (standard branding)</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.displayName || p.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div
          id={"e-emp-wrap-" + user.id}
          style={{
            marginTop: 12,
            display: privileged(role) ? "none" : "block",
          }}
        >
          <div style={{ ...labelStyle, marginBottom: 5 }}>
            Linked employers (which employers this user may see)
          </div>
          <div
            style={{
              border: "1px solid #e8e1f7",
              borderRadius: 9,
              padding: 10,
              background: "#fff",
            }}
          >
            <EmployerChoices
              employers={employers}
              selected={selected}
              onChange={setSelected}
              editor
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-primary btn-sm"
            disabled={busy}
            onClick={save}
          >
            Save changes
          </button>
          <button className="btn btn-sm" onClick={onClose}>
            Cancel
          </button>
          <span
            id={"e-msg-" + user.id}
            style={{
              fontSize: 12.5,
              color: message.startsWith("✕") ? "#b5391f" : "#5b6b7a",
            }}
            role="status"
          >
            {message}
          </span>
        </div>
      </td>
    </tr>
  );
}
function useActivation() {
  const { reload, reloadPast } = useContext(Context);
  const [busy, setBusy] = useState(""),
    [error, setError] = useState("");
  async function activate(user, active) {
    const body = { active };
    if (!active) {
      const reason = prompt(
        "Reason for deactivating this account? (shown to other admins in Past users)",
        "",
      );
      if (reason === null) return;
      body.reason = reason.trim();
    }
    setBusy(user.id);
    setError("");
    try {
      await userRequest(
        "/api/users/" + encodeURIComponent(user.id),
        mutation("PATCH", body),
      );
      await Promise.all([reload(), reloadPast()]);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }
  return { activate, busy, error };
}
export function UsersList() {
  const { users, loading, error, reload, setSecurityUser } =
    useContext(Context);
  const [editing, setEditing] = useState([]),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState("");
  const activation = useActivation();
  const state = (u) =>
    !u.active ? "disabled" : u.pendingSetup ? "pending" : "active";
  const filtered = users.filter(
    (u) =>
      (!search ||
        [u.name, u.email, roleLabel(u.role)]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase().trim())) &&
      (!status || state(u) === status),
  );
  return (
    <CollapsibleCard id="user-list-card" title="Existing users">
      <div className="security-tools" style={{ margin: "8px 0" }}>
        <input
          id="user-admin-search"
          placeholder="Search users by name, email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          id="user-admin-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All status</option>
          <option value="active">Active</option>
          <option value="pending">Pending setup</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>
      {activation.error && (
        <div role="alert" style={{ color: "#b5391f" }}>
          {activation.error}
        </div>
      )}
      <table>
        <thead>
          <tr>
            {[
              "Name",
              "Email",
              "Role",
              "Employers",
              "Partner",
              "Status",
              "",
            ].map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody id="user-rows">
          {error ? (
            <tr>
              <td colSpan={7} style={{ padding: 16 }}>
                <span style={{ color: "#b5391f", fontWeight: 700 }}>
                  Could not load users.
                </span>{" "}
                <span className="muted">{error}</span>{" "}
                <button
                  className="btn btn-sm"
                  style={{ marginLeft: 8 }}
                  onClick={reload}
                >
                  Retry
                </button>
              </td>
            </tr>
          ) : loading ? (
            <tr>
              <td colSpan={7} className="muted" style={{ padding: 16 }}>
                Loading users…
              </td>
            </tr>
          ) : !filtered.length ? (
            <tr>
              <td colSpan={7} className="muted" style={{ padding: 16 }}>
                {users.length ? "No matching users." : "No users yet."}
              </td>
            </tr>
          ) : (
            filtered.map((u) => (
              <React.Fragment key={u.id}>
                <tr id={"row-" + u.id}>
                  <td>
                    <b>{u.name}</b>
                  </td>
                  <td className="muted">{u.email}</td>
                  <td>
                    <Role role={u.role} />
                  </td>
                  <td>
                    {privileged(u.role) ? (
                      <span className="muted">All</span>
                    ) : u.employers?.length ? (
                      u.employers.map((e) => (
                        <span key={e.id} className="chip">
                          {e.name}
                        </span>
                      ))
                    ) : (
                      <span className="muted">none</span>
                    )}
                  </td>
                  <td>
                    {u.partner ? (
                      <span className="chip">{u.partner.name}</span>
                    ) : (
                      <span className="muted">—</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={
                        "tag " +
                        (!u.active ? "off" : u.pendingSetup ? "pend" : "live")
                      }
                    >
                      {!u.active
                        ? "disabled"
                        : u.pendingSetup
                          ? "pending setup"
                          : "active"}
                    </span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button
                      className="btn btn-sm"
                      type="button"
                      onClick={() => setSecurityUser(u)}
                    >
                      Security
                    </button>{" "}
                    <button
                      className="btn btn-sm"
                      type="button"
                      onClick={() =>
                        setEditing((ids) => [
                          ...ids.filter((id) => id !== u.id),
                          u.id,
                        ])
                      }
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-sm"
                      type="button"
                      disabled={activation.busy === u.id}
                      onClick={() => activation.activate(u, !u.active)}
                    >
                      {u.active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
                {editing.includes(u.id) && (
                  <UserEditor
                    user={u}
                    onClose={() =>
                      setEditing((ids) => ids.filter((id) => id !== u.id))
                    }
                  />
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </CollapsibleCard>
  );
}
export function RevokedUsers() {
  const { revoked, pastError, reloadPast, reload } = useContext(Context);
  const activation = useActivation();
  const [error, setError] = useState(""),
    [busy, setBusy] = useState("");
  async function remove(user) {
    if (
      !confirm(
        `Permanently delete "${user.name}"? This removes their account entirely and cannot be undone.`,
      )
    )
      return;
    setBusy(user.id);
    setError("");
    try {
      await userRequest("/api/users/" + encodeURIComponent(user.id), {
        method: "DELETE",
      });
      await Promise.all([reloadPast(), reload()]);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }
  return (
    <CollapsibleCard id="revoked-users-card" title="Past users" past>
      {(error || activation.error) && (
        <div role="alert" style={{ color: "#b5391f" }}>
          {error || activation.error}
        </div>
      )}
      <table>
        <thead>
          <tr>
            {["User", "Role", "Reason", "Revoked by", "Date", ""].map(
              (h, i) => (
                <th key={i}>{h}</th>
              ),
            )}
          </tr>
        </thead>
        <tbody id="revoked-rows">
          {pastError ? (
            <tr>
              <td colSpan={6} style={{ padding: 16, color: "#b5391f" }}>
                Could not load past users. {pastError}{" "}
                <button className="btn btn-sm" onClick={reloadPast}>
                  Retry
                </button>
              </td>
            </tr>
          ) : !revoked.length ? (
            <tr>
              <td colSpan={6} className="muted" style={{ padding: 16 }}>
                No past users — nobody has been deactivated yet.
              </td>
            </tr>
          ) : (
            revoked.map((u) => (
              <tr key={u.id}>
                <td>
                  <b>{u.name}</b>
                  <div className="muted">{u.email}</div>
                </td>
                <td>
                  <Role role={u.role} />
                </td>
                <td>{u.revokedReason || "—"}</td>
                <td>
                  {u.revokedBy === "self" ? (
                    <span className="chip">Self-deactivated</span>
                  ) : (
                    u.revokedBy || "—"
                  )}
                </td>
                <td className="muted">
                  {u.revokedAt
                    ? new Date(u.revokedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button
                    className="btn btn-sm"
                    disabled={activation.busy === u.id}
                    onClick={() => activation.activate(u, true)}
                  >
                    Reactivate
                  </button>{" "}
                  <button
                    className="btn btn-sm"
                    style={{ color: "#b5391f" }}
                    disabled={busy === u.id}
                    onClick={() => remove(u)}
                  >
                    Delete permanently
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </CollapsibleCard>
  );
}
