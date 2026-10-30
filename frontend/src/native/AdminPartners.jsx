import React, { useCallback, useEffect, useRef, useState } from "react";
import { PartnerPreview } from "./PartnerPreview.jsx";
import {
  BrandEngine,
  presets,
  dummyLogo,
  tileTheme,
  readLogo,
  detectLogo,
  learn,
  logoPayload,
  brandSummary,
} from "./PartnerBrand.js";
const labelStyle = { fontSize: 11.5, fontWeight: 700, color: "#5b6b7a" },
  inputStyle = {
    display: "block",
    width: "100%",
    padding: "7px 10px",
    border: "1px solid #e8e1f7",
    borderRadius: 7,
    marginTop: 4,
    font: "inherit",
  },
  selectStyle = {
    font: "inherit",
    padding: "7px 10px",
    border: "1px solid #e8e1f7",
    borderRadius: 7,
  };
const editable = [
  "primaryColor",
  "accentColor",
  "navyColor",
  "displayName",
  "tagline",
];
const defaults = (p) =>
  Object.fromEntries(
    editable.map((field) => [
      field,
      field.endsWith("Color")
        ? "#" + (p[field] || (field === "accentColor" ? "B15BE8" : "32217C"))
        : p[field] || "",
    ]),
  );
function PartnerCard({
  partner: p,
  users,
  employers,
  busy,
  update,
  upload,
  assign,
  remove,
  preview,
  choicesReady,
}) {
  const [draft, setDraft] = useState(() => defaults(p)),
    [user, setUser] = useState(""),
    [employer, setEmployer] = useState(""),
    [retryLogo, setRetryLogo] = useState(null),
    dirty = useRef(new Set());
  useEffect(() => {
    const fresh = defaults(p);
    setDraft((current) =>
      Object.fromEntries(
        editable.map((field) => [
          field,
          dirty.current.has(field) ? current[field] : fresh[field],
        ]),
      ),
    );
  }, [p]);
  function change(field, value) {
    dirty.current.add(field);
    setDraft((current) => ({ ...current, [field]: value }));
  }
  async function save(field, value) {
    if (!dirty.current.has(field)) return;
    if (await update(p.id, field, value)) dirty.current.delete(field);
  }
  async function link() {
    if (user && (await assign(p.id, { userId: user }))) setUser("");
    else if (user) return;
    if (employer && (await assign(p.id, { employerId: employer })))
      setEmployer("");
  }
  const primary = "#" + (p.primaryColor || "32217C"),
    accent = "#" + (p.accentColor || "B15BE8");
  return (
    <div
      className="card partner-card"
      data-partner={p.id}
      style={{ marginBottom: 16, padding: 20, border: "1px solid #e8e1f7" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: primary,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.35)",
          }}
        />
        <div
          className="settings-accent"
          style={{ fontWeight: 800, fontSize: 15, color: "#32217c", flex: 1 }}
        >
          {p.name}
        </div>
        <span className="muted" style={{ fontSize: 12 }}>
          {p._count?.users || 0} users · {p._count?.employers || 0} employers ·
          /p/{p.slug}
        </span>
      </div>
      <div className="partner-preview" style={tileTheme(p)}>
        {p.logoDataUrl ? (
          <img
            className="partner-preview-logo"
            src={p.logoDataUrl}
            alt={(p.displayName || p.name) + " logo"}
          />
        ) : (
          <div
            className="partner-preview-logo partner-preview-fallback"
            style={{ background: accent }}
          >
            {(p.displayName || p.name || "?").slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="partner-preview-copy">
          <strong>{p.displayName || p.name}</strong>
          <span>{p.tagline || "Your branded portal preview"}</span>
        </div>
        <span className="partner-preview-badge">Live preview</span>
      </div>
      <button
        className="btn partner-preview-open"
        type="button"
        onClick={() => preview(p.id)}
      >
        View client dashboard
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr) 2fr",
          gap: 12,
          alignItems: "end",
          marginTop: 16,
        }}
      >
        {["primaryColor", "accentColor", "navyColor"].map((field, i) => (
          <label className="settings-label" style={labelStyle} key={field}>
            {["Primary", "Accent", "Navy"][i]}
            <input
              type="color"
              aria-label={["Primary", "Accent", "Navy"][i]}
              value={draft[field]}
              disabled={busy}
              onChange={(event) => {
                change(field, event.target.value);
                saveColour(field, event.target.value);
              }}
              style={{
                display: "block",
                width: "100%",
                height: 34,
                border: "1px solid #e8e1f7",
                borderRadius: 7,
                marginTop: 4,
              }}
            />
          </label>
        ))}
        <label className="settings-label" style={labelStyle}>
          Display name
          <input
            value={draft.displayName}
            disabled={busy}
            onChange={(event) => change("displayName", event.target.value)}
            onBlur={(event) => save("displayName", event.target.value)}
            style={inputStyle}
          />
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 10,
          alignItems: "end",
        }}
      >
        <label className="settings-label" style={labelStyle}>
          Tagline (optional)
          <input
            value={draft.tagline}
            disabled={busy}
            onChange={(event) => change("tagline", event.target.value)}
            onBlur={(event) => save("tagline", event.target.value)}
            style={inputStyle}
          />
        </label>
        <label className="settings-label" style={labelStyle}>
          Logo (PNG)
          <input
            type="file"
            aria-label="Logo (PNG)"
            accept="image/png,image/jpeg"
            disabled={busy}
            onChange={(event) => saveLogo(event.target.files[0])}
            style={{ display: "block", marginTop: 4, fontSize: 12 }}
          />
          {retryLogo && (
            <button
              type="button"
              className="btn btn-ghost"
              disabled={busy}
              onClick={() => saveLogo(retryLogo)}
            >
              Retry logo upload
            </button>
          )}
        </label>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: 10,
          marginTop: 12,
          alignItems: "center",
        }}
      >
        <select
          id={"pt-u-" + p.id}
          aria-label={"Assign a user to " + p.name}
          value={user}
          disabled={busy || !choicesReady}
          onChange={(event) => setUser(event.target.value)}
          style={selectStyle}
        >
          <option value="">Assign a user…</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email}
            </option>
          ))}
        </select>
        <select
          id={"pt-e-" + p.id}
          aria-label={"Assign an employer to " + p.name}
          value={employer}
          disabled={busy || !choicesReady}
          onChange={(event) => setEmployer(event.target.value)}
          style={selectStyle}
        >
          <option value="">Assign an employer…</option>
          {employers.map((e) => (
            <option key={e.id || e.employerId} value={e.id || e.employerId}>
              {e.name || e.employer}
            </option>
          ))}
        </select>
        <button
          className="btn btn-ghost"
          disabled={busy || !choicesReady}
          onClick={link}
        >
          Assign
        </button>
      </div>
      <div style={{ marginTop: 10, textAlign: "right" }}>
        <button
          className="btn btn-ghost settings-error"
          style={{ color: "#b5391f", fontSize: 12 }}
          disabled={busy}
          onClick={() => remove(p.id, p.name)}
        >
          Delete partner
        </button>
      </div>
    </div>
  );
  async function saveLogo(file) {
    if (!file) return;
    setRetryLogo(null);
    if (!(await upload(p.id, file))) setRetryLogo(file);
  }
  async function saveColour(field, value) {
    if (await update(p.id, field, value)) dirty.current.delete(field);
  }
}
export function AdminPartners() {
  const [partners, setPartners] = useState([]),
    [users, setUsers] = useState([]),
    [employers, setEmployers] = useState([]),
    [loadError, setLoadError] = useState(""),
    [choicesError, setChoicesError] = useState(""),
    [choicesReady, setChoicesReady] = useState(false),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(null),
    [name, setName] = useState(""),
    [logo, setLogo] = useState(null),
    [logoName, setLogoName] = useState(""),
    [collapsed, setCollapsed] = useState(false),
    [selected, setSelected] = useState(null),
    [fileKey, setFileKey] = useState(0),
    [created, setCreated] = useState(null);
  const lifecycle = useRef(null),
    pending = useRef(false),
    presetIds = useRef(new Map());
  const close = useCallback(() => setSelected(null), []);
  const notify = (text, kind = "ok") => setMessage({ text, kind });
  async function request(path, options = {}) {
    const response = await fetch(path, {
      cache: "no-store",
      ...options,
      signal: lifecycle.current.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(data.error || `Request failed (${response.status})`);
    return data;
  }
  const write = (path, body, method = "PUT") =>
    request("/api/admin/partners" + path, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  async function load() {
    try {
      const rows = await request("/api/admin/partners");
      if (!Array.isArray(rows)) throw new Error("Invalid partner response");
      setPartners(rows);
      setLoadError("");
    } catch (error) {
      if (!lifecycle.current.signal.aborted) setLoadError(error.message);
    } finally {
      if (!lifecycle.current.signal.aborted) setLoading(false);
    }
  }
  async function loadChoices() {
    try {
      const [rows, me] = await Promise.all([
        request("/api/users"),
        request("/api/auth/me"),
      ]);
      if (!Array.isArray(rows) || !Array.isArray(me.employers))
        throw new Error("Assignment choices unavailable");
      setUsers(rows);
      setEmployers(me.employers);
      setChoicesReady(true);
      setChoicesError("");
    } catch (error) {
      if (!lifecycle.current.signal.aborted) {
        setChoicesReady(false);
        setChoicesError(error.message);
      }
    }
  }
  useEffect(() => {
    const abort = new AbortController();
    lifecycle.current = abort;
    (async () => {
      try {
        const me = await request("/api/auth/me");
        if (!me.modules?.admin || !["ADMIN", "SUPERADMIN"].includes(me.role))
          throw new Error("Admin access required");
        await Promise.allSettled([load(), loadChoices()]);
      } catch (error) {
        if (!abort.signal.aborted) {
          setLoadError(error.message);
          setLoading(false);
        }
      }
    })();
    return () => abort.abort();
  }, []);
  async function run(operation) {
    if (pending.current) return false;
    pending.current = true;
    setBusy(true);
    setMessage(null);
    try {
      await operation();
      return true;
    } catch (error) {
      if (!lifecycle.current.signal.aborted) notify(error.message, "err");
      return false;
    } finally {
      pending.current = false;
      if (!lifecycle.current.signal.aborted) setBusy(false);
    }
  }
  async function pick(file) {
    if (!file) return;
    await run(async () => {
      setLogo(await readLogo(file));
      setLogoName(file.name);
    });
  }
  async function create() {
    if (!name.trim()) {
      notify("Enter a partner name.", "err");
      return;
    }
    await run(async () => {
      let partner = created;
      if (!partner) {
        partner = await write("", { name: name.trim() }, "POST");
        if (!partner.id) throw new Error("Partner creation returned no ID");
        setCreated(partner);
      }
      if (logo) {
        const detected = await detectLogo(logo, lifecycle.current.signal);
        await write(
          "/" + encodeURIComponent(partner.id),
          logoPayload(logo, detected),
        );
        await learn(detected, lifecycle.current.signal);
        notify(name + " added. " + brandSummary(detected));
      } else notify(name + " added.");
      setName("");
      setLogo(null);
      setLogoName("");
      setCreated(null);
      setFileKey((value) => value + 1);
      await load();
    });
  }
  async function preset(p) {
    await run(async () => {
      let id = presetIds.current.get(p.name);
      if (!id) {
        const partner = await write("", { name: p.name }, "POST");
        if (!partner.id) throw new Error("Partner creation returned no ID");
        id = partner.id;
        presetIds.current.set(p.name, id);
      }
      await write("/" + encodeURIComponent(id), {
        primaryColor: p.primaryColor,
        accentColor: p.accentColor,
        navyColor: p.navyColor,
        tagline: p.tagline,
        logoDataUrl: dummyLogo(p),
      });
      presetIds.current.delete(p.name);
      await load();
    });
  }
  async function update(id, field, value) {
    return run(async () => {
      const saved = field.endsWith("Color") ? value.replace(/^#/, "") : value;
      await write("/" + encodeURIComponent(id), { [field]: saved });
      setPartners((current) =>
        current.map((p) => (p.id === id ? { ...p, [field]: saved } : p)),
      );
      if (field.endsWith("Color")) {
        try {
          await request("/api/admin/brand-learning/correction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              engineVersion: BrandEngine.VERSION,
              palette: [{ hex: saved, share: 1, role: "manual-correction" }],
            }),
          });
        } catch {}
      }
    });
  }
  async function upload(id, file) {
    if (!file) return false;
    return run(async () => {
      const data = await readLogo(file),
        detected = await detectLogo(data, lifecycle.current.signal),
        patch = logoPayload(data, detected);
      await write("/" + encodeURIComponent(id), patch);
      setPartners((current) =>
        current.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      );
      await learn(detected, lifecycle.current.signal);
      notify(
        detected
          ? "Logo saved. " +
              brandSummary(detected) +
              " The recognizer has learned from this upload."
          : "Logo saved. No colours could be detected from this image.",
      );
    });
  }
  async function assign(id, body) {
    return run(async () => {
      await write("/" + encodeURIComponent(id) + "/assign", body, "POST");
      await load();
    });
  }
  async function remove(id, partnerName) {
    if (
      !window.confirm(
        `Delete partner "${partnerName}"? Its users and employers stay, but lose this branding.`,
      )
    )
      return;
    await run(async () => {
      await write("/" + encodeURIComponent(id), null, "DELETE");
      setPartners((current) => current.filter((p) => p.id !== id));
    });
  }
  const selectedPartner = partners.find((p) => p.id === selected);
  return (
    <>
      <div className="card section-gap" id="channel-partners-card">
        <div className="card-hd">
          <h2>Channel Partners</h2>
          <button
            className="btn btn-sm"
            type="button"
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
          <div className="note">
            White-label branding · each partner's users see their colours, logo
            &amp; name
          </div>
        </div>
        <div
          className="card-bd"
          style={{ display: collapsed ? "none" : undefined }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 10,
              flexWrap: "wrap",
            }}
          >
            <input
              id="pt-new-name"
              placeholder="New partner name (e.g. Acme Financial)"
              value={name}
              disabled={busy || Boolean(created) || loading}
              onChange={(event) => setName(event.target.value)}
              style={{
                flex: 1,
                minWidth: 220,
                font: "inherit",
                padding: "9px 12px",
                border: "1px solid #e8e1f7",
                borderRadius: 9,
              }}
            />
            <label
              className="btn btn-ghost"
              style={{ fontSize: 12.5, padding: "9px 14px", cursor: "pointer" }}
              title="Optional — colours are auto-detected from it"
            >
              <span id="pt-new-logo-label">
                {logoName ? "✓ " + logoName : "+ Logo (optional)"}
              </span>
              <input
                key={fileKey}
                id="pt-new-logo"
                type="file"
                accept="image/png,image/jpeg"
                disabled={busy || loading}
                style={{ display: "none" }}
                onChange={(event) => pick(event.target.files[0])}
              />
            </label>
            <button
              className="btn"
              disabled={busy || loading || Boolean(loadError)}
              onClick={create}
            >
              Add partner
            </button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div
              className="note partner-muted"
              style={{ margin: "0 0 8px", fontSize: 12, color: "#8497a7" }}
            >
              Or start from a test client preset (dummy placeholder logo &amp;
              approximate brand colours, for demo/testing only):
            </div>
            <div
              id="pt-presets"
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
            >
              {presets.map((p) => (
                <button
                  type="button"
                  className="btn btn-ghost"
                  key={p.name}
                  disabled={busy || loading || Boolean(loadError)}
                  style={{
                    borderColor: "#" + p.accentColor,
                    color: "#" + p.primaryColor,
                    fontSize: 12,
                  }}
                  onClick={() => preset(p)}
                >
                  + {p.name}
                </button>
              ))}
            </div>
          </div>
          {message && (
            <div className={"banner " + message.kind} role="status">
              {message.text}
              {created && message.kind === "err"
                ? " The partner was created; retry Add partner to finish saving its logo."
                : ""}
            </div>
          )}
          {choicesError && (
            <div className="banner err">
              Assignment choices: {choicesError}{" "}
              <button className="btn btn-ghost" onClick={loadChoices}>
                Retry choices
              </button>
            </div>
          )}
          <div id="pt-list">
            {loadError && (
              <div className="banner err">
                {loadError}{" "}
                <button className="btn btn-ghost" onClick={load}>
                  Retry partners
                </button>
              </div>
            )}
            {loading ? (
              <p className="muted">Loading…</p>
            ) : partners.length ? (
              partners.map((p) => (
                <PartnerCard
                  key={p.id}
                  partner={p}
                  users={users}
                  employers={employers}
                  busy={busy}
                  update={update}
                  upload={upload}
                  assign={assign}
                  remove={remove}
                  preview={setSelected}
                  choicesReady={choicesReady}
                />
              ))
            ) : (
              <p className="muted">No partners yet. Add one above.</p>
            )}
          </div>
        </div>
      </div>
      {selectedPartner && (
        <PartnerPreview partner={selectedPartner} close={close} />
      )}
    </>
  );
}
