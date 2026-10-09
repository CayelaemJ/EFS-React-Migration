import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EmailLayout,
  AutomationLayout,
} from "../parity/admin-email-layout.jsx";

const Settings = createContext(null);
const emailFields = {
  "mail-provider": "emailProvider",
  "mail-host": "smtpHost",
  "mail-port": "smtpPort",
  "mail-user": "smtpUsername",
  "mail-from-name": "fromName",
  "mail-from-email": "fromEmail",
  "mail-reply-to": "replyTo",
  "mail-timezone": "defaultTimezone",
  "mail-portal-url": "portalBaseUrl",
  "mail-resend-from": "resendFromEmail",
  "mail-secure": "smtpSecure",
  "mail-require-tls": "smtpRequireTls",
  "mail-reject-unauth": "smtpRejectUnauthorized",
};
const autoFields = {
  "auto-alert-emails": "alertEmails",
  "auto-slack-webhook": "alertSlackWebhookUrl",
  "auto-stale-days": "staleDeactivateDays",
  "auto-digest-enabled": "digestEnabled",
  "auto-score-enabled": "scoreChangeAlertsEnabled",
  "synthetic-data-mode": "syntheticDataMode",
};
const defaults = {
  "mail-provider": "smtp",
  "mail-host": "",
  "mail-port": 587,
  "mail-user": "",
  "mail-from-name": "empower-fin Dashboard Portal",
  "mail-from-email": "",
  "mail-reply-to": "",
  "mail-timezone": "Africa/Johannesburg",
  "mail-portal-url": "",
  "mail-resend-from": "",
  "mail-secure": false,
  "mail-require-tls": true,
  "mail-reject-unauth": true,
  "mail-password": "",
  "mail-resend-key": "",
  "mail-test-recipient": "",
  "auto-alert-emails": "",
  "auto-slack-webhook": "",
  "auto-stale-days": "",
  "auto-digest-enabled": false,
  "auto-score-enabled": true,
  "synthetic-data-mode": false,
};
const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString("en-ZA", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
async function request(path, signal, body) {
  const response = await fetch(path, {
    credentials: "include",
    cache: "no-store",
    signal,
    ...(body
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      : {}),
  });
  const value = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(value.error || `Request failed (${response.status})`);
  return value;
}
function configValues(config, fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([id, key]) => [
      id,
      typeof defaults[id] === "boolean"
        ? defaults[id]
          ? config[key] !== false
          : Boolean(config[key])
        : config[key] || defaults[id],
    ]),
  );
}
function validateConfig(config) {
  if (!config || typeof config !== "object" || Array.isArray(config))
    throw new Error("Settings API returned an invalid configuration");
  return config;
}
function frequency(schedule) {
  if (schedule.frequency === "ONCE") return "Once";
  if (schedule.frequency === "DAILY") return `Daily · ${schedule.sendTime}`;
  if (schedule.frequency === "WEEKLY")
    return `Weekly · ${["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][schedule.dayOfWeek] || ""} ${schedule.sendTime}`;
  if (schedule.frequency === "MONTHLY")
    return `Monthly · day ${schedule.dayOfMonth} · ${schedule.sendTime}`;
  return schedule.frequency;
}
function TableRows({ rows, error, columns, empty, children }) {
  if (error)
    return (
      <tr>
        <td
          colSpan={columns}
          className="muted settings-error"
          style={{ padding: 10, color: "#b5391f" }}
          role="alert"
        >
          {error}
        </td>
      </tr>
    );
  if (!rows.length)
    return (
      <tr>
        <td colSpan={columns} className="muted" style={{ padding: 10 }}>
          {empty}
        </td>
      </tr>
    );
  return rows.map(children);
}

export function AdminSettingsProvider({ children }) {
  const [values, setValues] = useState(defaults),
    [config, setConfig] = useState(null);
  const [ready, setReady] = useState(false),
    [busy, setBusy] = useState("");
  const [loadError, setLoadError] = useState(""),
    [mailMessage, setMailMessage] = useState(null),
    [autoMessage, setAutoMessage] = useState(null);
  const [schedules, setSchedules] = useState([]),
    [deliveries, setDeliveries] = useState([]);
  const [scheduleError, setScheduleError] = useState(""),
    [deliveryError, setDeliveryError] = useState("");
  const controller = useRef(null),
    locked = useRef(false);
  async function loadHistory(signal) {
    await Promise.allSettled(
      [
        ["report-schedules", setSchedules, setScheduleError],
        ["report-deliveries", setDeliveries, setDeliveryError],
      ].map(async ([path, setRows, setError]) => {
        try {
          const rows = await request("/api/admin/" + path, signal);
          if (!Array.isArray(rows))
            throw new Error("History API returned an invalid list");
          setRows(rows);
          setError("");
        } catch (e) {
          if (!signal.aborted) setError(e.message);
        }
      }),
    );
  }
  async function refresh(signal, fields = null) {
    const latest = validateConfig(
      await request("/api/admin/email-settings", signal),
    );
    setConfig(latest);
    setLoadError("");
    if (fields)
      setValues((previous) => ({
        ...previous,
        ...configValues(latest, fields),
      }));
    await loadHistory(signal);
  }
  async function initialize(signal) {
    setLoadError("");
    try {
      const me = await request("/api/auth/me", signal);
      if (!["ADMIN", "SUPERADMIN"].includes(me.role) || !me.modules?.admin)
        return;
      await refresh(signal, { ...emailFields, ...autoFields });
      setReady(true);
    } catch (e) {
      if (!signal.aborted) setLoadError(e.message);
    }
  }
  useEffect(() => {
    const task = new AbortController();
    controller.current = task;
    initialize(task.signal);
    return () => task.abort();
  }, []);
  function emailDraft() {
    const body = Object.fromEntries(
      Object.entries(emailFields).map(([id, key]) => [
        key,
        typeof values[id] === "string" ? values[id].trim() : values[id],
      ]),
    );
    body.smtpPort = Number(body.smtpPort);
    if (
      !Number.isInteger(body.smtpPort) ||
      body.smtpPort < 1 ||
      body.smtpPort > 65535
    )
      throw new Error("SMTP port must be between 1 and 65535");
    body.defaultTimezone ||= "Africa/Johannesburg";
    if (values["mail-password"].trim())
      body.smtpPassword = values["mail-password"].trim();
    if (values["mail-resend-key"].trim())
      body.resendApiKey = values["mail-resend-key"].trim();
    return body;
  }
  async function execute(target, action) {
    if (locked.current || !ready || controller.current?.signal.aborted) return;
    locked.current = true;
    setBusy(target);
    const setMessage = target === "mail" ? setMailMessage : setAutoMessage;
    setMessage({
      text: target === "mail" ? "Processing email request…" : "Running…",
      error: false,
    });
    try {
      await action(controller.current.signal, setMessage);
    } catch (e) {
      if (!controller.current.signal.aborted)
        setMessage({ text: "✕ " + e.message, error: true });
    } finally {
      locked.current = false;
      if (!controller.current.signal.aborted) setBusy("");
    }
  }
  async function reloadAfterSuccess(signal, fields) {
    try {
      await refresh(signal, fields);
    } catch (e) {
      if (!signal.aborted)
        setLoadError(
          "The action completed, but settings could not be refreshed: " +
            e.message,
        );
    }
  }
  const actions = {
    change: (id, value) =>
      setValues((previous) => ({ ...previous, [id]: value })),
    saveEmail: () =>
      execute("mail", async (signal, setMessage) => {
        await request("/api/admin/email-settings", signal, emailDraft());
        setValues((previous) => ({
          ...previous,
          "mail-password": "",
          "mail-resend-key": "",
        }));
        setMessage({ text: "✓ Email settings saved.", error: false });
        await reloadAfterSuccess(signal, emailFields);
      }),
    testEmail: () =>
      execute("mail", async (signal, setMessage) => {
        const result = await request("/api/admin/email-settings/test", signal, {
          ...emailDraft(),
          recipient: values["mail-test-recipient"].trim(),
        });
        setMessage({
          text: `✓ Test email sent to ${result.recipient}.`,
          error: false,
        });
        await reloadAfterSuccess(signal, null);
      }),
    saveAutomation: () =>
      execute("auto", async (signal, setMessage) => {
        const days = values["auto-stale-days"];
        if (
          days !== "" &&
          (!Number.isInteger(Number(days)) ||
            Number(days) < 7 ||
            Number(days) > 3650)
        )
          throw new Error(
            "Inactive days must be between 7 and 3650, or blank to disable",
          );
        const body = Object.fromEntries(
          Object.entries(autoFields).map(([id, key]) => [
            key,
            typeof values[id] === "string" ? values[id].trim() : values[id],
          ]),
        );
        body.staleDeactivateDays = days === "" ? null : Number(days);
        await request("/api/admin/email-settings", signal, body);
        setMessage({ text: "✓ Automation settings saved.", error: false });
        await reloadAfterSuccess(signal, autoFields);
      }),
  };
  for (const [name, kind] of [
    ["runStale", "stale"],
    ["runDigest", "digest"],
    ["runTest", "test"],
  ])
    actions[name] = () =>
      execute("auto", async (signal, setMessage) => {
        const result = await request("/api/admin/automations/run", signal, {
          kind,
        });
        setMessage({ text: "✓ " + (result.message || "Done."), error: false });
        await reloadAfterSuccess(signal, null);
      });
  const provider = config?.emailProvider === "resend" ? "Resend API" : "SMTP";
  const mailStatus = config
    ? (config.configured
        ? `${provider} is configured for scheduled report delivery.`
        : `${provider} setup is incomplete. Scheduled reports cannot send until the required fields are configured.`) +
      (config.lastTestAt
        ? ` Last test: ${config.lastTestStatus || "—"} · ${formatDate(config.lastTestAt)}${config.lastTestNote ? " — " + config.lastTestNote : ""}`
        : "")
    : "";
  const autoStatus =
    `Automations use the ${provider} settings above to send.` +
    (config?.lastStaleCheckAt
      ? ` Last stale-account check: ${formatDate(config.lastStaleCheckAt)}.`
      : "") +
    (config?.lastDigestSentAt
      ? ` Last digest sent: ${formatDate(config.lastDigestSentAt)}.`
      : "");
  const message = (value) =>
    value ? (
      <div
        className={"banner " + (value.error ? "err" : "ok")}
        role={value.error ? "alert" : "status"}
      >
        {value.text}
      </div>
    ) : null;
  const retry = async () => {
    if (
      locked.current ||
      !controller.current ||
      controller.current.signal.aborted
    )
      return;
    locked.current = true;
    setBusy("reload");
    try {
      if (ready) await refresh(controller.current.signal, null);
      else await initialize(controller.current.signal);
    } catch (e) {
      if (!controller.current.signal.aborted) setLoadError(e.message);
    } finally {
      locked.current = false;
      if (!controller.current.signal.aborted) setBusy("");
    }
  };
  const state = {
    values,
    config,
    disabled: !ready || Boolean(busy),
    mailStatus,
    autoStatus,
    mailStatusClass: "banner " + (config?.configured ? "ok" : ""),
    autoStatusClass: "banner ok",
    passwordPlaceholder: config?.hasPassword
      ? config.passwordFromEnvironment
        ? "•••••• (provided by SMTP_PASSWORD)"
        : "•••••• (saved — leave blank to keep)"
      : "leave blank to keep existing",
    mailResult: (
      <>
        {loadError && (
          <div className="banner err" role="alert">
            ✕ {loadError}{" "}
            <button
              className="btn btn-ghost"
              type="button"
              disabled={Boolean(busy)}
              onClick={retry}
            >
              Retry
            </button>
          </div>
        )}
        {message(mailMessage)}
      </>
    ),
    autoResult: message(autoMessage),
    schedules: (
      <TableRows
        rows={schedules}
        error={scheduleError}
        columns={5}
        empty="No schedules yet."
      >
        {(row, i) => (
          <tr key={row.id || i}>
            <td>
              <strong>{row.name}</strong>
              <div className="muted">{row.employer?.name || ""}</div>
            </td>
            <td>
              {row.user?.name || ""}
              <div className="muted">{row.user?.email || ""}</div>
            </td>
            <td>{frequency(row)}</td>
            <td>{row.active ? formatDate(row.nextRunAt) : "Paused"}</td>
            <td>
              <span
                className={
                  row.lastStatus === "FAILED"
                    ? "settings-error"
                    : "settings-success"
                }
                style={{
                  fontWeight: 800,
                  color: row.lastStatus === "FAILED" ? "#b5391f" : "#137a47",
                }}
              >
                {row.active ? "ACTIVE" : "PAUSED"}
              </span>
              {row.lastStatus && (
                <div className="muted">last: {row.lastStatus}</div>
              )}
            </td>
          </tr>
        )}
      </TableRows>
    ),
    deliveries: (
      <TableRows
        rows={deliveries}
        error={deliveryError}
        columns={4}
        empty="No deliveries yet."
      >
        {(row, i) => (
          <tr key={row.id || i}>
            <td>{formatDate(row.sentAt)}</td>
            <td>
              {row.schedule?.name || row.subject || "Scheduled report"}
              <div className="muted">{row.schedule?.employer?.name || ""}</div>
            </td>
            <td
              className={
                row.status === "SENT" ? "settings-success" : "settings-error"
              }
              style={{
                fontWeight: 800,
                color: row.status === "SENT" ? "#137a47" : "#b5391f",
              }}
            >
              {row.status}
            </td>
            <td className="muted">
              {Array.isArray(row.recipients) ? row.recipients.join(", ") : ""}
              {row.error && (
                <div className="settings-error" style={{ color: "#b5391f" }}>
                  {row.error}
                </div>
              )}
            </td>
          </tr>
        )}
      </TableRows>
    ),
  };
  return (
    <Settings.Provider value={{ state, actions }}>{children}</Settings.Provider>
  );
}
export function AdminEmailPanel() {
  return <EmailLayout {...useContext(Settings)} />;
}
export function AdminAutomationPanel() {
  return <AutomationLayout {...useContext(Settings)} />;
}
