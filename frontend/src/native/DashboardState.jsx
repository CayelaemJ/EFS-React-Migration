import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { showQuickActions, showScheduleReport } from "./DashboardDialogs.jsx";
const Context = createContext(null);
const useDashboard = () => useContext(Context);
let controller;
let resolveController;
const controllerReady = new Promise((resolve) => {
  resolveController = resolve;
});
export function configureDashboard(value) {
  controller = value;
  resolveController(value);
}
const present = (value) =>
  value !== null &&
  value !== undefined &&
  value !== "" &&
  Number.isFinite(Number(value));
const isAbort = (error) => error?.name === "AbortError";
function readQuery() {
  return location.search.slice(1);
}
function apiQuery(query, portfolio = false) {
  const source = new URLSearchParams(query),
    params = new URLSearchParams();
  for (const key of portfolio
    ? ["period", "quarter", "range"]
    : ["period", "quarter", "range", "site", "income"])
    if (source.get(key)) params.set(key, source.get(key));
  if (!params.has("period") && !params.has("quarter") && !params.has("range"))
    params.set("range", "latest");
  return params.toString();
}
async function request(url, signal) {
  const response = await fetch(url, { cache: "no-store", signal });
  const value = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(value?.error || "no data");
    error.status = response.status;
    error.syncStatus = value?.syncStatus;
    throw error;
  }
  return value;
}
function redirectSession(me) {
  if (me?.modules?.admin) return "/admin";
  if (me?.modules?.users) return "/users";
  return "/login";
}
export function DashboardProvider({ children }) {
  const [query, setQuery] = useState(readQuery),
    [me, setMe] = useState(null),
    [data, setData] = useState(null),
    [live, setLive] = useState(false),
    [periods, setPeriods] = useState([]),
    [error, setError] = useState(null),
    [busy, setBusy] = useState(false),
    [retry, setRetry] = useState(0),
    [audience, setAudience] = useState("employer"),
    [syncStatus, setSyncStatus] = useState(null);
  const version = useRef(null),
    pollBusy = useRef(false),
    demoActive = useRef(false);
  useEffect(() => {
    const pop = () => setQuery(readQuery());
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    const abort = new AbortController();
    (async () => {
      try {
        const bridge = await controllerReady;
        if (abort.signal.aborted) return;
        const value = await request("/api/auth/me", abort.signal);
        if (!value?.modules || typeof value.modules.dashboard !== "boolean") {
          location.replace("/login");
          return;
        }
        if (!value.modules.dashboard) {
          location.replace(redirectSession(value));
          return;
        }
        if (abort.signal.aborted) return;
        bridge.session(value);
        setMe(value);
      } catch (error) {
        if (!isAbort(error) && !abort.signal.aborted)
          location.replace("/login");
      }
    })();
    return () => abort.abort();
  }, []);
  useEffect(() => {
    if (!me) return;
    const abort = new AbortController(),
      params = new URLSearchParams(query),
      id = params.get("employer") || me.employers?.[0]?.id;
    if (demoActive.current && params.get("demo") === "1") {
      setData(controller.publish(null, query, false));
      setLive(false);
      setError(null);
      setBusy(false);
      return;
    }
    setBusy(true);
    setPeriods([]);
    const suffix = apiQuery(query),
      dashboardUrl = id
        ? `/api/employers/${encodeURIComponent(id)}/dashboard?${suffix}`
        : `/api/dashboard/first?${suffix}`;
    // Periods and portfolio are independent secondary reads; neither blocks the visual payload.
    if (id) {
      const periodQuery = new URLSearchParams();
      for (const key of ["site", "income"])
        if (params.get(key)) periodQuery.set(key, params.get(key));
      request(
        `/api/employers/${encodeURIComponent(id)}/periods${periodQuery.size ? "?" + periodQuery : ""}`,
        abort.signal,
      )
        .then((value) => {
          if (!abort.signal.aborted)
            setPeriods(Array.isArray(value) ? value : []);
        })
        .catch(() => {});
    }
    if (me.modules.portfolio)
      request("/api/portfolio?" + apiQuery(query, true), abort.signal)
        .then((value) => {
          if (!abort.signal.aborted) controller.portfolio(value);
        })
        .catch((error) => {
          if (!abort.signal.aborted && !isAbort(error))
            controller.portfolio(null);
        });
    (async () => {
      try {
        const value = await request(dashboardUrl, abort.signal);
        if (abort.signal.aborted) return;
        if (!value || typeof value !== "object" || Array.isArray(value))
          throw new Error("Invalid dashboard response");
        demoActive.current = false;
        const next = controller.publish(value, query, true);
        setData(next);
        setSyncStatus(value.syncStatus || null);
        setLive(true);
        setError(null);
      } catch (error) {
        if (abort.signal.aborted || isAbort(error)) return;
        if (error.status === 401) {
          location.replace("/login");
          return;
        }
        if (params.get("demo") === "1") {
          demoActive.current = true;
          const next = controller.publish(null, query, false);
          setData(next);
          setLive(false);
          setError(null);
        } else setError(error);
      } finally {
        if (!abort.signal.aborted) setBusy(false);
      }
    })();
    return () => abort.abort();
  }, [me, query, retry]);
  useEffect(() => {
    if (!me) return;
    const abort = new AbortController();
    async function poll() {
      if (document.visibilityState !== "visible" || pollBusy.current) return;
      pollBusy.current = true;
      try {
        const value = await request("/api/dashboard/version", abort.signal);
        if (abort.signal.aborted) return;
        if ("syncStatus" in value) setSyncStatus(value.syncStatus || null);
        if (
          ["REBUILDING", "FULL_REFRESH_FAILED"].includes(
            value.syncStatus?.lastSyncStatus,
          )
        )
          return;
        if (!version.current) {
          version.current = value.version || null;
          return;
        }
        if (value.version && value.version !== version.current) {
          version.current = value.version;
          setRetry((n) => n + 1);
        }
      } catch {
      } finally {
        pollBusy.current = false;
      }
    }
    const timer = setInterval(poll, 30000);
    document.addEventListener("visibilitychange", poll);
    return () => {
      clearInterval(timer);
      abort.abort();
      document.removeEventListener("visibilitychange", poll);
    };
  }, [me]);
  const navigate = useCallback((next) => {
    const value = next.toString();
    history.replaceState(null, "", value ? "?" + value : location.pathname);
    setQuery(value);
  }, []);
  function pick(kind, value) {
    const params = new URLSearchParams(query);
    if (kind === "employer") {
      params.set("employer", value);
      for (const key of ["period", "site", "income"]) params.delete(key);
    } else if (kind === "period") {
      for (const key of ["period", "quarter", "range"]) params.delete(key);
      if (value === "qtd") params.set("range", "quarter");
      else if (value === "30d" || value === "all") params.set("range", value);
      else if (value.startsWith("q:")) params.set("quarter", value.slice(2));
      else if (value) params.set("period", value);
    } else if (value && value !== "all") params.set(kind, value);
    else params.delete(kind);
    navigate(params);
  }
  return (
    <Context.Provider
      value={{
        me,
        data,
        live,
        periods,
        error,
        busy,
        query,
        syncStatus,
        audience,
        pick,
        setAudience,
        reload: () => setRetry((n) => n + 1),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function DashboardAuthenticated({ children }) {
  return useDashboard()?.me ? children : null;
}
export function DashboardSection({ name, children }) {
  const { me } = useDashboard();
  const visible = !(name in (me?.sections || {})) || !!me.sections[name];
  return (
    <section
      className="dash-section"
      data-section={name}
      style={{ display: visible ? "" : "none" }}
    >
      {children}
    </section>
  );
}
export function DashboardViewport({ portfolio = false, children }) {
  const { audience, busy, error, reload } = useDashboard();
  return (
    <div
      id={portfolio ? "portfolio-view" : "employer-view"}
      style={{
        display: (audience === "portfolio") === portfolio ? "" : "none",
      }}
      className={!portfolio && busy ? "is-refreshing" : undefined}
      aria-busy={!portfolio && busy ? true : undefined}
    >
      {!portfolio && error ? (
        <LiveError error={error} retry={reload} busy={busy} />
      ) : (
        children
      )}
    </div>
  );
}
function LiveError({ error, retry, busy }) {
  const status = error.syncStatus?.lastSyncStatus,
    rebuilding = status === "REBUILDING",
    failed = status === "FULL_REFRESH_FAILED";
  return (
    <div
      className="card"
      style={{ maxWidth: 760, margin: "48px auto", padding: 34 }}
    >
      <div
        style={{
          font: "800 23px Manrope,sans-serif",
          color: "var(--brand-primary)",
        }}
      >
        {rebuilding
          ? "Dashboard refresh in progress"
          : failed
            ? "Full refresh failed — last published dashboard unavailable"
            : "Live dashboard data is unavailable"}
      </div>
      <p
        className="dashboard-secondary-copy"
        style={{ margin: "12px 0 0", color: "#5b6b7a", lineHeight: 1.65 }}
      >
        {rebuilding
          ? "The refresh is rebuilding the source data. Normally the last successful dashboard remains visible; this fallback is shown only because no published snapshot could be loaded."
          : failed
            ? "The authoritative reload did not complete, and no last-successful published dashboard snapshot could be loaded for this request."
            : "The portal has not substituted demonstration figures. Check the latest sync/import status in Administration, then reload this page."}
      </p>
      <div
        className="dashboard-error-detail"
        style={{
          marginTop: 16,
          padding: "10px 12px",
          background: "#f7f9fb",
          borderRadius: 8,
          color: "#7b8792",
          font: "600 12px Manrope,sans-serif",
        }}
      >
        {String(error.message || "Unknown data error")}
      </div>
      <button
        className="btn"
        type="button"
        style={{ marginTop: 16 }}
        onClick={retry}
        disabled={busy}
      >
        {busy ? "Retrying…" : "Retry dashboard"}
      </button>
    </div>
  );
}
export function DashboardAudience() {
  const { me, audience, setAudience } = useDashboard();
  if (me && !me.modules.portfolio) return null;
  return (
    <>
      <div className="topbar-divider" />
      <div className="audience-switch" id="audience-switch">
        {["employer", "portfolio"].map((value) => (
          <button
            type="button"
            key={value}
            className={audience === value ? "on" : undefined}
            data-a={value}
            aria-pressed={audience === value}
            onClick={() => {
              setAudience(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {value === "employer" ? "Employer view" : "Portfolio view"}
          </button>
        ))}
      </div>
    </>
  );
}
export function DashboardRole() {
  const { me } = useDashboard();
  const role = String(me?.role || "").toUpperCase();
  return !me || ["ADMIN", "SUPERADMIN"].includes(role) ? (
    <div
      id="role-indicator"
      className={
        "role-indicator" +
        (me ? (role === "SUPERADMIN" ? " superadmin" : " admin") : "")
      }
      aria-label="Current access role"
    >
      {me ? (role === "SUPERADMIN" ? "★ SUPER ADMIN" : "ADMIN") : ""}
    </div>
  ) : null;
}
function freshness({ syncStatus: status, data, error, live }) {
  const state = String((error?.syncStatus || status)?.lastSyncStatus || ""),
    syncAt = status?.lastSuccessfulSyncAt || status?.publishedDataAt,
    sourceAt = data?.sourceDataUpdatedAt || data?.dataAsOf,
    note = String(status?.lastSyncNote || ""),
    rebuilding = state === "REBUILDING",
    issue = [
      "FULL_REFRESH_FAILED",
      "FULL_REFRESH_PRECHECK_FAILED",
      "FAILED",
      "PARTIAL",
    ].includes(state);
  const short = (date) =>
      new Date(date).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    dateTime = (date) =>
      new Date(date).toLocaleString("en-ZA", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
  const text = error
    ? rebuilding
      ? "Purging & rebuilding"
      : state === "FULL_REFRESH_FAILED"
        ? "Refresh failed — data withheld"
        : "Data unavailable"
    : !data
      ? "Loading…"
      : !live
        ? "Demo data"
        : rebuilding
          ? syncAt
            ? "Purging & rebuilding · showing " + dateTime(syncAt)
            : "Purging & rebuilding"
          : issue
            ? syncAt
              ? "Refresh issue · showing " + dateTime(syncAt)
              : "Refresh issue"
            : syncAt
              ? note.startsWith("Full refresh completed")
                ? "Purged & overwritten " + dateTime(syncAt)
                : "Last synced " + short(syncAt)
              : sourceAt
                ? "Source updated " + short(sourceAt)
                : "Live data";
  const title = [
    note,
    sourceAt
      ? "Source data updated " +
        new Date(sourceAt).toLocaleString("en-ZA", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "",
  ]
    .filter(Boolean)
    .join(" ");
  return {
    text,
    title,
    kind: rebuilding
      ? "is-rebuilding"
      : error
        ? "is-error"
        : issue
          ? "is-stale"
          : "",
    message:
      (rebuilding || issue) && data
        ? (rebuilding
            ? "Refresh in progress. The dashboard is staying on the last successful data until the new dataset is fully rebuilt. "
            : "Refresh did not complete. The dashboard is still showing the last successful data. Reason: ") +
          (note || "No additional refresh detail was recorded.")
        : null,
  };
}
export function DashboardFreshness() {
  const f = freshness(useDashboard());
  return (
    <div className={"data-fresh" + (f.kind ? " " + f.kind : "")}>
      <span className="dot" />{" "}
      <span id="data-fresh-label" title={f.title || undefined}>
        {f.text}
      </span>
    </div>
  );
}
export function DashboardNotices() {
  const state = useDashboard(),
    f = freshness(state);
  return (
    <>
      {f.message ? (
        <div id="refresh-status-note" className="refresh-status-note">
          {f.message}
        </div>
      ) : null}
      {state.me?.syntheticDataMode ? (
        <div
          id="synthetic-data-notice"
          role="alert"
          className="dashboard-synthetic-notice"
        >
          <strong>⚠ Synthetic test data</strong>
          <br />
          <span style={{ fontWeight: 500 }}>
            All figures and information shown in this portal are synthetic test
            data. They must not be treated as factual, financial, operational,
            customer, or other real-world information.
          </span>
        </div>
      ) : null}
    </>
  );
}
const defaultSub =
  "How the financial wellbeing programme is landing across your workforce Not available who is using it, the outcomes achieved, and how employees rate the service.";
export function DashboardHeading() {
  const state = useDashboard(),
    { data, me, live, query } = state,
    params = new URLSearchParams(query),
    privileged = ["ADMIN", "SUPERADMIN"].includes(me?.role),
    theme = data ? data.theme : me?.theme,
    context = data?.filterContext;
  const label =
    live && context
      ? [
          context.label || "Programme to date",
          context.site,
          context.incomeLabel,
        ]
          .filter(Boolean)
          .join(" · ")
      : [
          params.get("range") === "30d"
            ? "Last 30 days"
            : params.get("range") === "quarter"
              ? "This quarter"
              : "Programme to date",
          params.get("site"),
          params.get("income"),
        ]
          .filter(Boolean)
          .join(" · ");
  return (
    <>
      <div>
        <div className="head-eyebrow">
          Employer Insights · Financial Wellbeing Programme
        </div>
        <h1>
          {live && data?.employer ? data.employer + " " : "Your workforce "}
          <span className="emp" />
        </h1>
        <div className="head-sub">
          {!privileged && theme?.branded !== false && theme?.tagline
            ? theme.tagline
            : defaultSub}
        </div>
        <div
          id="ctx-sub"
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--blue-d)",
            marginTop: 10,
            letterSpacing: ".01em",
          }}
        >
          {label}
        </div>
      </div>
      <div className="head-actions">
        <DashboardButton id="btn-schedule" />
        <DashboardButton id="btn-export" />
      </div>
      <DashboardActivity />
      <DashboardQuality />
    </>
  );
}
function DashboardActivity() {
  const { data } = useDashboard(),
    a = data?.monthActivity;
  if (!a) return null;
  const value = (v) =>
      v === null || v === undefined || v === "" ? "Not available" : v,
    saving = value(a.savingUnlocked),
    total = value(a.advancesTotal);
  return (
    <div id="month-activity" className="dashboard-activity">
      <span
        className="dashboard-secondary-copy"
        style={{ color: "#5b6b7a", fontWeight: 700 }}
      >
        {a.label || data.filterContext?.label || "selected period"}:
      </span>
      <span>
        <b>{value(a.enrolled)}</b> newly enrolled
      </span>
      <span>
        <b>{value(a.completed)}</b> fixes completed
      </span>
      <span>
        <b>{saving}</b>
        {saving === "Not available" ? "" : "/mo"} new savings
      </span>
      <span>
        <b>{value(a.advancesCount)}</b> wage advances
        {total === "Not available" ? null : (
          <>
            {" "}
            · <b>{total}</b>
          </>
        )}
      </span>
    </div>
  );
}
function DashboardQuality() {
  const { data } = useDashboard(),
    warnings = data?.dataQuality?.warnings;
  if (!Array.isArray(warnings) || !warnings.length) return null;
  return (
    <div id="data-quality-note" className="dashboard-quality">
      Data quality:{" "}
      {warnings
        .map((w) =>
          typeof w === "string" ? w : w?.message || JSON.stringify(w),
        )
        .join(" ")}
    </div>
  );
}
export function DashboardFootnote() {
  const { data, live } = useDashboard();
  return (
    <div className="footnote" id="footnote">
      {live ? (
        <>
          <strong>How the dashboard filters.</strong>{" "}
          {data?.filterContext?.semantics?.stock ||
            "Stock measures are measured as at the selected end date."}{" "}
          {data?.filterContext?.semantics?.flow ||
            "Activity measures are measured inside the selected range."}{" "}
          Employee-level data remains aggregated and de-identified; individual
          financial information is not exposed to the employer.
        </>
      ) : (
        <>
          <strong>How we define the headline numbers.</strong> &nbsp;
          <em>Employees better off</em> = unique employees who completed at
          least one journey with a concrete result: a lower monthly premium or
          instalment, a settlement or arrangement put in place, a
          prescribed-debt challenge lodged, or an interest-free emergency cash
          advance set up. It counts people, not actions (one person who fixed
          two things counts once). Employees who only received guidance, without
          a completed fix, are not included. &nbsp;
          <em>Debt under active intervention</em> = arrears where a settlement
          or reduced-instalment arrangement has actually been sent; it excludes
          prescribed debt being contested (shown separately) and debt the
          employee could not afford to arrange, where we instead educated them
          on prescription to self-manage (also shown separately).
          <br />
          <br />
          Simulated demonstration data for the empower-fin Dashboard Portal.
          Figures are illustrative and reconciled to the consumer journey model.
          Employee-level data is aggregated and de-identified; individual
          financial information is never exposed to the employer. Underwriting
          by Guardrisk Life Insurance Company Limited. Intermediary services:
          EmpowerFS (Pty) Ltd, FSP 53395.
        </>
      )}
    </div>
  );
}
export function DashboardButton({ id }) {
  const { data, me, query } = useDashboard(),
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState(null),
    timer = useRef(null),
    labels = {
      "btn-schedule": "Schedule report",
      "btn-export": "Export PDF",
      "btn-pf-export": "Export book",
      "btn-save-view": "Save view",
      "btn-command": "Quick actions",
    };
  useEffect(() => () => clearTimeout(timer.current), []);
  function inform(message) {
    clearTimeout(timer.current);
    setNotice(message);
    timer.current = setTimeout(() => setNotice(null), 3400);
  }
  function click() {
    if (busy) return;
    if (id === "btn-export" || id === "btn-pf-export") {
      setBusy(true);
      controller.preparePrint();
      timer.current = setTimeout(
        () => {
          setBusy(false);
          window.print();
        },
        id === "btn-export" ? 180 : 500,
      );
    } else if (id === "btn-command") showQuickActions();
    else if (id === "btn-schedule") {
      const params = new URLSearchParams(query);
      showScheduleReport({
        me: me || {},
        data: data || {},
        employerId: params.get("employer"),
        period: params.get("period"),
      });
    } else if (id === "btn-save-view") {
      const name = window.prompt(
        "Name this saved view",
        data?.filterContext?.label || "Saved view",
      );
      if (!name || !name.trim()) return;
      try {
        const views = JSON.parse(
          localStorage.getItem("empower-fin.savedViews") || "[]",
        );
        if (!Array.isArray(views)) throw new Error("Invalid saved views");
        const item = {
          id: Date.now().toString(36),
          name: name.trim().slice(0, 80),
          url: location.pathname + location.search,
        };
        localStorage.setItem(
          "empower-fin.savedViews",
          JSON.stringify([item, ...views].slice(0, 20)),
        );
        inform("This view is saved on this browser.");
      } catch {
        inform("Could not save this view on this browser.");
      }
    }
  }
  return (
    <>
      <button
        type="button"
        id={id}
        className={
          "btn" +
          (id === "btn-export" ? " btn-primary" : "") +
          (busy ? " loading" : "")
        }
        disabled={busy || !me || (id !== "btn-pf-export" && !data)}
        onClick={click}
      >
        {busy ? "Preparing…" : labels[id]}
        {id === "btn-command" ? (
          <>
            {" "}
            <span className="kbd">Ctrl K</span>
          </>
        ) : null}
      </button>
      {notice ? (
        <div className="toast show" role="status">
          {notice}
        </div>
      ) : null}
    </>
  );
}
export function DashboardDemoBanner() {
  const { data, live } = useDashboard();
  return data && !live ? (
    <div id="demo-banner" className="dashboard-demo-banner">
      Explicit demonstration mode Not available these figures are not live
      source data.
    </div>
  ) : null;
}
export function DashboardWelcome() {
  const { me, data, error } = useDashboard(),
    [timedOut, setTimedOut] = useState(false),
    [seen, setSeen] = useState(false),
    [dark, setDark] = useState(() =>
      document.documentElement.classList.contains("portal-dark"),
    );
  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 4500);
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("portal-dark")),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!me) return;
    try {
      setSeen(sessionStorage.getItem("ef_splash_shown") === "1");
      sessionStorage.setItem("ef_splash_shown", "1");
      sessionStorage.removeItem("ef_fresh_login");
    } catch {}
    const timer = setTimeout(() => setTimedOut(true), 1400);
    return () => clearTimeout(timer);
  }, [me]);
  const first =
      String(me?.name || "")
        .trim()
        .split(/\s+/)[0] || "there",
    hour = new Date().getHours(),
    privileged = ["ADMIN", "SUPERADMIN"].includes(me?.role),
    custom = !privileged && me?.theme?.logoDataUrl;
  return (
    <div
      id="welcome-splash"
      className={data || error || seen || timedOut ? "hide" : undefined}
    >
      <div className="welcome-splash-inner">
        <img
          id="welcome-splash-logo"
          className="welcome-splash-logo efs-brand-logo"
          src={
            custom ||
            "/static/" +
              (dark
                ? "the-fixer-logo-reversed.svg?v=1"
                : "the-fixer-logo.svg?v=6")
          }
          data-custom-logo={custom ? "1" : undefined}
          alt="The Fixer logo"
        />
        <div className="welcome-splash-spinner" />
        <div className="welcome-splash-greeting" id="welcome-splash-greeting">
          {me
            ? (hour < 12
                ? "Good morning"
                : hour < 18
                  ? "Good afternoon"
                  : "Good evening") +
              ", " +
              first +
              " 👋"
            : "Welcome"}
        </div>
        <div className="welcome-splash-sub" id="welcome-splash-sub">
          {me
            ? "The Fixer hopes you have a good day."
            : "The Fixer is getting things ready…"}
        </div>
      </div>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 6h18M6 12h12M10 18h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function FilterDropdown({ id, options, current, label, onPick }) {
  const [open, setOpen] = useState(false),
    host = useRef(null);
  useEffect(() => {
    const outside = (event) => {
      if (!host.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("click", outside);
    return () => document.removeEventListener("click", outside);
  }, []);
  return (
    <span
      ref={host}
      className="filter-tag interactive"
      id={id}
      tabIndex={0}
      role="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen((value) => !value)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget && event.key !== "Escape")
          return;
        if (["Enter", " ", "ArrowDown"].includes(event.key)) {
          event.preventDefault();
          setOpen((value) => !value);
        }
        if (event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
          host.current.focus();
        }
      }}
    >
      <FilterIcon />
      <span className="tag-label">{label}</span>
      <svg
        className="caret"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className={"dropdown-menu" + (open ? " open" : "")} role="menu">
        {options.map((option, i) => (
          <button
            type="button"
            role="menuitem"
            className={
              "dropdown-item" + (option.value === current ? " on" : "")
            }
            data-v={option.value}
            key={String(option.value) + "-" + i}
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
              onPick(option.value);
              host.current.focus();
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </span>
  );
}
function periodOptions(periods) {
  const months = [],
    quarters = new Map();
  for (const p of periods) {
    if (!/^\d{4}-\d{2}$/.test(String(p?.period))) continue;
    const [year, month] = p.period.split("-").map(Number);
    if (month < 1 || month > 12) continue;
    const score = present(p.optimiseScore)
        ? Math.round(Number(p.optimiseScore))
        : null,
      key = `${year}-Q${Math.floor((month - 1) / 3) + 1}`,
      bucket = quarters.get(key) || {
        label: `Q${Math.floor((month - 1) / 3) + 1} ${year}`,
        scores: [],
      };
    if (score !== null) bucket.scores.push(score);
    quarters.set(key, bucket);
    months.push({
      value: p.period,
      label:
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][month - 1] +
        " " +
        year,
      score,
    });
  }
  return {
    months,
    quarters: [...quarters.keys()]
      .sort()
      .reverse()
      .map((key) => {
        const q = quarters.get(key);
        return {
          value: "q:" + key,
          label: q.label,
          score: q.scores.length
            ? Math.round(
                q.scores.reduce((sum, n) => sum + n, 0) / q.scores.length,
              )
            : null,
        };
      }),
  };
}
export function DashboardFilters() {
  const { me, data, periods, query, live, audience, pick } = useDashboard(),
    params = new URLSearchParams(query),
    groups = periodOptions(periods),
    allOptions = [...groups.months, ...groups.quarters],
    requested = params.get("quarter")
      ? "q:" + params.get("quarter")
      : params.get("period"),
    range = params.get("range"),
    value =
      requested && allOptions.some((p) => p.value === requested)
        ? requested
        : range === "30d"
          ? "30d"
          : range === "quarter"
            ? "qtd"
            : range === "all"
              ? "all"
              : !live && data
                ? "all"
                : "";
  const selected = allOptions.find((p) => p.value === value),
    score = selected?.score ?? (!value ? data?.wellness?.score : undefined),
    tone = present(score)
      ? Number(score) >= 60
        ? {
            color: "#137a47",
            backgroundColor: "#e3f6ec",
            borderColor: "#b8e6cc",
          }
        : Number(score) >= 40
          ? {
              color: "#8a5a10",
              backgroundColor: "#fff2df",
              borderColor: "#f3cf98",
            }
          : {
              color: "#a3271c",
              backgroundColor: "#fdeceb",
              borderColor: "#f3b8b1",
            }
      : {};
  const sites =
      live && data?.filterOptions
        ? data.filterOptions.sites || data.filterOptions.regions || []
        : (data?.regions || []).map((r) => ({ value: r.name, label: r.name })),
    incomes =
      live && data?.filterOptions
        ? data.filterOptions.incomes || []
        : (data?.income || []).map((r) => ({
            value: r.value || r.name,
            label: r.name,
          }));
  const site = params.get("site") || "all",
    income = params.get("income") || "all",
    enrolled = data?.kpis?.takeUp?.enrolled;
  return (
    <div
      className="filters"
      style={{ display: audience === "portfolio" ? "none" : "" }}
    >
      <select
        className="filter-emp"
        id="employer-select"
        aria-label="Employer"
        style={{ display: me?.employers?.length ? "inline-block" : "none" }}
        value={params.get("employer") || me?.employers?.[0]?.id || ""}
        onChange={(event) => pick("employer", event.target.value)}
      >
        {(me?.employers || []).map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
      <label className="period-picker-label" htmlFor="month-select">
        Reporting period
      </label>
      <select
        className="filter-month"
        id="month-select"
        aria-label="Reporting period"
        value={value}
        onChange={(event) => pick("period", event.target.value)}
        style={tone}
      >
        <option value="">Latest available period</option>
        <option value="30d">Last 30 days</option>
        <option value="qtd">Quarter to date</option>
        <option value="all">Programme to date</option>
        {[
          ["Quarters", groups.quarters],
          ["Months / dates", groups.months],
        ].map(([label, options]) =>
          options.length ? (
            <optgroup label={label} key={label}>
              {options.map((p) => (
                <option
                  key={p.value}
                  value={p.value}
                  data-score={p.score ?? ""}
                >
                  {p.label}
                  {p.score === null
                    ? " · Score unavailable"
                    : ": Score " + p.score}
                </option>
              ))}
            </optgroup>
          ) : null,
        )}
      </select>
      <FilterDropdown
        id="region-filter"
        options={[{ value: "all", label: "All regions" }, ...sites]}
        current={site}
        label={
          data?.filterContext?.site || (site === "all" ? "All regions" : site)
        }
        onPick={(value) => pick("site", value)}
      />
      <FilterDropdown
        id="income-filter"
        options={[{ value: "all", label: "All income bands" }, ...incomes]}
        current={income}
        label={
          data?.filterContext?.incomeLabel ||
          (income === "all" ? "All income bands" : income)
        }
        onPick={(value) => pick("income", value)}
      />
      <span className="filter-tag" id="emp-tag">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {data
          ? present(enrolled)
            ? " " + Number(enrolled).toLocaleString("en-ZA") + " enrolled"
            : " Enrolment data not loaded"
          : " Not available enrolled"}
      </span>
    </div>
  );
}
