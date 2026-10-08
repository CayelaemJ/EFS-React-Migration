import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

// The remaining dashboard controller only supplies its current data snapshot.
// Dialog inputs, request state, lists and lifecycle are entirely React-owned.
let snapshot = null;
const listeners = new Set();
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const publish = (value) => {
  snapshot = value;
  listeners.forEach((listener) => listener());
};
export const showQuickActions = () => publish({ type: "quick" });
export const showScheduleReport = (context) =>
  publish({ type: "schedule", ...context });
const close = () => publish(null);
function useDialogFocus(ref) {
  useEffect(() => {
    const previous = document.activeElement;
    const host = ref.current;
    host?.querySelector('input:not([type="hidden"]),button')?.focus();
    const keydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = [
        ...host.querySelectorAll("button,input,select,textarea,a[href]"),
      ].filter((el) => !el.disabled && el.getClientRects().length);
      const first = items[0],
        last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      previous?.focus?.();
    };
  }, [ref]);
}
const commands = [
  ["Executive summary", "#exec-summary"],
  ["Wellness score", "#wellness"],
  ["Financial problems resolved", "#outcomes"],
  ["Value delivered to your people", "#value-strip"],
  ["Monthly cash freed up", "#savings-chart"],
  ["Total advanced per month", "#ewa-chart"],
  ["Debt pressure profile", "#debt-profile"],
  ["Who the programme is reaching", "#income-donut"],
  ["Employee ratings", "#ratings"],
];
function QuickActions() {
  const [term, setTerm] = useState("");
  const ref = useRef(null);
  useDialogFocus(ref);
  const rows = commands.filter(([name]) =>
    name.toLowerCase().includes(term.toLowerCase()),
  );
  return (
    <div
      className="command-backdrop"
      id="quick-actions"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={ref}
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Quick actions"
      >
        <input
          className="command-search"
          type="search"
          placeholder="Search dashboard sections"
          autoComplete="off"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
        <div className="command-results">
          {rows.length ? (
            rows.map(([name, target]) => (
              <button
                key={target}
                type="button"
                className="command-item"
                data-target={target}
                onClick={() => {
                  close();
                  document
                    .querySelector(target)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {name}
                <span>Open</span>
              </button>
            ))
          ) : (
            <div className="command-empty">No matching section</div>
          )}
        </div>
      </div>
    </div>
  );
}
async function request(url, options) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(data.error || "The request failed. Please try again.");
  return data;
}
function localWhen(value) {
  if (!value) return "Not available";
  return new Date(value).toLocaleString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function frequencyLabel(schedule) {
  if (schedule.frequency === "ONCE") return "Once";
  if (schedule.frequency === "DAILY") return `Daily at ${schedule.sendTime}`;
  if (schedule.frequency === "WEEKLY")
    return `Weekly · ${["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][schedule.dayOfWeek] || ""} ${schedule.sendTime}`;
  if (schedule.frequency === "MONTHLY")
    return `Monthly · day ${schedule.dayOfMonth} · ${schedule.sendTime}`;
  return schedule.frequency || "";
}
function initialForm({ data, me, period }) {
  const query = new URLSearchParams(location.search),
    tomorrow = new Date(Date.now() + 86400000);
  return {
    name: `${data.employer || "Employer"} financial wellbeing report`,
    window: period ? `period:${period}` : query.get("range") || "all",
    site: query.get("site") || "all",
    income: query.get("income") || "all",
    frequency: "MONTHLY",
    sendTime: "08:00",
    onceDate: `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`,
    dayOfWeek: "1",
    dayOfMonth: "1",
    timezone: "Africa/Johannesburg",
    recipients: me.email || "",
  };
}
function ScheduleReport({ context }) {
  const { me, data, period } = context;
  const employerId = context.employerId || me.employers?.[0]?.id || "";
  const employerName =
    me.employers?.find((item) => item.id === employerId)?.name ||
    data.employer ||
    "Employer";
  const admin = ["ADMIN", "SUPERADMIN"].includes(me.role);
  const [form, setForm] = useState(() => initialForm(context));
  const [config, setConfig] = useState(null),
    [rows, setRows] = useState(null),
    [listError, setListError] = useState(""),
    [result, setResult] = useState(null),
    [saving, setSaving] = useState(false),
    [pending, setPending] = useState(null);
  const ref = useRef(null),
    alive = useRef(true);
  useDialogFocus(ref);
  useEffect(() => {
    alive.current = true;
    const abort = new AbortController();
    request("/api/report-schedules/config", { signal: abort.signal })
      .then((value) => {
        if (alive.current) {
          setConfig(value);
          setForm((old) => ({
            ...old,
            timezone: value.defaultTimezone || old.timezone,
          }));
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError" && alive.current) {
          setConfig({ configured: false });
          setResult({ error: true, text: error.message });
        }
      });
    loadSchedules(abort.signal);
    return () => {
      alive.current = false;
      abort.abort();
    };
  }, []);
  async function loadSchedules(signal) {
    try {
      const value = await request("/api/report-schedules", { signal });
      if (!Array.isArray(value)) throw new Error("Could not load schedules");
      if (alive.current) {
        setRows(value);
        setListError("");
      }
    } catch (error) {
      if (error.name !== "AbortError" && alive.current)
        setListError(error.message);
    }
  }
  const field = (name) => ({
    value: form[name],
    onChange: (event) =>
      setForm((old) => ({ ...old, [name]: event.target.value })),
  });
  async function save() {
    if (saving) return;
    const filters = form.window.startsWith("period:")
      ? { period: form.window.slice(7) }
      : { range: form.window };
    if (form.site !== "all") filters.site = form.site;
    if (form.income !== "all") filters.income = form.income;
    const payload = {
      name: form.name.trim(),
      employerId,
      filters,
      frequency: form.frequency,
      timezone: form.timezone.trim(),
      sendTime: form.sendTime,
      onceDate: form.frequency === "ONCE" ? form.onceDate : null,
      dayOfWeek: form.frequency === "WEEKLY" ? Number(form.dayOfWeek) : null,
      dayOfMonth: form.frequency === "MONTHLY" ? Number(form.dayOfMonth) : null,
      recipients: form.recipients
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    };
    setSaving(true);
    setResult({ text: "Saving schedule…" });
    try {
      const saved = await request("/api/report-schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (alive.current) {
        setResult({
          success: true,
          text: `✓ Report scheduled. Next send: ${localWhen(saved.nextRunAt)}`,
        });
        await loadSchedules();
      }
    } catch (error) {
      if (alive.current) setResult({ error: true, text: `✕ ${error.message}` });
    } finally {
      if (alive.current) setSaving(false);
    }
  }
  async function changeSchedule(schedule, action) {
    if (pending) return;
    if (action === "delete" && !confirm("Delete this scheduled report?"))
      return;
    setPending(schedule.id);
    setResult({
      text: action === "send" ? "Sending report…" : "Updating schedule…",
    });
    const path =
      "/api/report-schedules/" +
      encodeURIComponent(schedule.id) +
      (action === "send" ? "/send-now" : "");
    const options =
      action === "toggle"
        ? {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ active: !schedule.active }),
          }
        : { method: action === "delete" ? "DELETE" : "POST" };
    try {
      await request(path, options);
      if (alive.current) {
        setResult({
          success: true,
          text:
            action === "send"
              ? "Report sent successfully."
              : action === "delete"
                ? "Schedule deleted."
                : "Schedule updated.",
        });
        await loadSchedules();
      }
    } catch (error) {
      if (alive.current) setResult({ error: true, text: error.message });
    } finally {
      if (alive.current) setPending(null);
    }
  }
  return (
    <div
      className="schedule-backdrop"
      id="schedule-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="schedule-modal"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Schedule report"
      >
        <div className="schedule-hd">
          <div>
            <div className="schedule-title">Schedule report</div>
            <div className="schedule-sub">
              Choose when the report should be emailed and which dashboard
              filters it should use.
            </div>
          </div>
          <button
            className="schedule-close"
            aria-label="Close schedule report"
            onClick={close}
          >
            ×
          </button>
        </div>
        <div className="schedule-body">
          {!config ? (
            <div className="schedule-note">Loading email configuration…</div>
          ) : (
            !config.configured && (
              <div className="schedule-note err">
                System email is not configured yet. An administrator must
                complete{" "}
                <strong>
                  Administration → System Email &amp; Scheduled Reports
                </strong>{" "}
                before schedules can send.
              </div>
            )
          )}
          <div className="schedule-grid">
            <label className="schedule-field full">
              Report name
              <input id="schedule-name" {...field("name")} />
            </label>
            <label className="schedule-field">
              Employer
              <div
                style={{
                  marginTop: 6,
                  padding: "10px 11px",
                  border: "1px solid var(--line)",
                  borderRadius: 9,
                  background: "#f7f6fb",
                  fontWeight: 700,
                  color: "var(--brand-primary)",
                }}
              >
                {employerName}
              </div>
              <input id="schedule-employer" type="hidden" value={employerId} />
            </label>
            <label className="schedule-field">
              Reporting window
              <select id="schedule-window" {...field("window")}>
                {period && (
                  <option value={`period:${period}`}>
                    {data.filterContext?.label || period} (fixed month)
                  </option>
                )}
                <option value="all">Programme to date</option>
                <option value="30d">Last 30 days</option>
                <option value="quarter">Current quarter</option>
              </select>
            </label>
            <label className="schedule-field">
              Region / site
              <select id="schedule-site" {...field("site")}>
                <option value="all">All regions</option>
                {(data.filterOptions?.sites || [])
                  .filter((item) => item.value !== "all")
                  .map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </label>
            <label className="schedule-field">
              Income band
              <select id="schedule-income" {...field("income")}>
                <option value="all">All income bands</option>
                {(data.filterOptions?.incomes || [])
                  .filter((item) => item.value !== "all")
                  .map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </select>
            </label>
            <label className="schedule-field">
              Frequency
              <select id="schedule-frequency" {...field("frequency")}>
                <option value="ONCE">Once</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </label>
            <label className="schedule-field">
              Send time
              <input id="schedule-time" type="time" {...field("sendTime")} />
            </label>
            <label
              className="schedule-field"
              id="schedule-once-wrap"
              style={{ display: form.frequency === "ONCE" ? "block" : "none" }}
            >
              Send date
              <input
                id="schedule-once-date"
                type="date"
                {...field("onceDate")}
              />
            </label>
            <label
              className="schedule-field"
              id="schedule-weekly-wrap"
              style={{
                display: form.frequency === "WEEKLY" ? "block" : "none",
              }}
            >
              Day of week
              <select id="schedule-weekday" {...field("dayOfWeek")}>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day, index) => (
                  <option key={day} value={index + 1}>
                    {day}
                  </option>
                ))}
              </select>
            </label>
            <label
              className="schedule-field"
              id="schedule-monthly-wrap"
              style={{
                display: form.frequency === "MONTHLY" ? "block" : "none",
              }}
            >
              Day of month
              <input
                id="schedule-monthday"
                type="number"
                min="1"
                max="31"
                {...field("dayOfMonth")}
              />
            </label>
            <label className="schedule-field">
              Timezone
              <input id="schedule-timezone" {...field("timezone")} />
            </label>
            <label className="schedule-field full">
              Recipients
              <input
                id="schedule-recipients"
                type="email"
                multiple={admin}
                readOnly={!admin}
                {...field("recipients")}
              />
              <span
                style={{
                  display: "block",
                  marginTop: 5,
                  fontWeight: 600,
                  color: "var(--grey-l)",
                  fontSize: 11,
                }}
              >
                {admin
                  ? "Administrators may enter multiple addresses separated by commas."
                  : "Reports are sent to your signed-in email address."}
              </span>
            </label>
          </div>
          <div id="schedule-result" aria-live="polite">
            {result && (
              <div
                className={`schedule-note${result.error ? " err" : ""}`}
                style={
                  result.success
                    ? { background: "var(--green-soft)", color: "#137a47" }
                    : undefined
                }
              >
                {result.text}
              </div>
            )}
          </div>
          <div className="schedule-actions">
            <button className="btn" onClick={close}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              disabled={!config?.configured || saving}
              onClick={save}
            >
              {saving ? "Saving…" : "Save schedule"}
            </button>
          </div>
          <div className="schedule-list">
            <div className="schedule-list-title">Your scheduled reports</div>
            <div id="schedule-list-body">
              {listError ? (
                <div className="schedule-note err">{listError}</div>
              ) : !rows ? (
                <div className="muted">Loading schedules…</div>
              ) : !rows.length ? (
                <div className="muted">No scheduled reports yet.</div>
              ) : (
                rows.map((schedule) => (
                  <div className="schedule-row" key={schedule.id}>
                    <div>
                      <strong>{schedule.name}</strong>
                      <small>
                        {schedule.employer?.name || ""} ·{" "}
                        {frequencyLabel(schedule)} ·{" "}
                        {schedule.active
                          ? "next " + localWhen(schedule.nextRunAt)
                          : "paused"}
                      </small>
                      {schedule.lastStatus === "FAILED" && (
                        <small style={{ color: "#b5391f" }}>
                          Last send failed: {schedule.lastError || ""}
                        </small>
                      )}
                    </div>
                    <div className="schedule-row-actions">
                      <button
                        className="schedule-mini"
                        disabled={pending === schedule.id}
                        onClick={() => changeSchedule(schedule, "send")}
                      >
                        Send now
                      </button>
                      <button
                        className="schedule-mini"
                        disabled={pending === schedule.id}
                        onClick={() => changeSchedule(schedule, "toggle")}
                      >
                        {schedule.active ? "Pause" : "Resume"}
                      </button>
                      <button
                        className="schedule-mini danger"
                        disabled={pending === schedule.id}
                        onClick={() => changeSchedule(schedule, "delete")}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function DashboardDialogs() {
  const dialog = useSyncExternalStore(subscribe, () => snapshot);
  useEffect(() => {
    const keydown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!snapshot) showQuickActions();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);
  return (
    dialog &&
    createPortal(
      dialog.type === "quick" ? (
        <QuickActions />
      ) : (
        <ScheduleReport context={dialog} />
      ),
      document.body,
    )
  );
}
