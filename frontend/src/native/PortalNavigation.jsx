import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  useId,
} from "react";
import { createPortal } from "react-dom";

// Temporary data boundary for the remaining page controllers. Menu rendering,
// theme state and account actions are owned by React, with no HTML templates.
let snapshot = null;
const listeners = new Set();
const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const publish = (value) => {
  snapshot = value;
  listeners.forEach((fn) => fn());
};
export function installPortalNavigation() {
  window.__EMPOWER_PORTAL_BUILD__ = "0.10.0";
  window.EmpowerPortalNav = {
    render: (options) => publish({ ...options, deactivate: false }),
    signOut,
    deactivateSelf: () => publish({ ...snapshot, deactivate: true }),
  };
}
async function signOut() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    /* redirect even if the session already expired */
  }
  location.href = "/login";
}
const themeKey = "empower-fin-theme";
function readTheme() {
  try {
    const saved = localStorage.getItem(themeKey);
    if (saved) return saved === "dark";
  } catch {}
  try {
    return sessionStorage.getItem(themeKey) === "dark";
  } catch {
    return false;
  }
}
function Sun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function DeactivateDialog({ onClose }) {
  const [reason, setReason] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const dialog = useRef(null),
    input = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    input.current?.focus();
    const keydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key !== "Tab") return;
      const controls = [
        ...dialog.current.querySelectorAll("button,textarea"),
      ].filter((el) => !el.disabled);
      const first = controls[0],
        last = controls.at(-1);
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
  }, [onClose]);
  async function deactivate() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/users/me/deactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: reason.trim() }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Could not deactivate the account");
      }
      location.href = "/login?deactivated=1";
    } catch (e) {
      setError(e.message);
      setBusy(false);
    }
  }
  return createPortal(
    <div
      className="portal-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="portal-modal"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portal-deactivate-title"
        tabIndex={-1}
      >
        <h3 id="portal-deactivate-title">Deactivate your account?</h3>
        <p>
          You'll be signed out immediately and won't be able to sign back in. An
          administrator can see this in Past users and reactivate it for you.
        </p>
        <label
          className="portal-modal-label"
          htmlFor="portal-deactivate-reason"
        >
          Reason (optional)
        </label>
        <textarea
          ref={input}
          id="portal-deactivate-reason"
          className="portal-modal-textarea"
          rows={3}
          placeholder="e.g. leaving the company, no longer need access…"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
        <div className="portal-modal-actions">
          <button
            type="button"
            className="portal-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="portal-modal-confirm"
            disabled={busy}
            onClick={deactivate}
          >
            {busy ? "Deactivating…" : "Deactivate my account"}
          </button>
        </div>
        <div className="portal-modal-error" hidden={!error} role="alert">
          {error}
        </div>
      </div>
    </div>,
    document.body,
  );
}
const closeDeactivate = () => publish({ ...snapshot, deactivate: false });
export function PortalNavigation() {
  const options = useSyncExternalStore(subscribe, () => snapshot);
  const [open, setOpen] = useState(false),
    [dark, setDark] = useState(readTheme);
  const accountRef = useRef(null),
    menuId = useId();
  const nav =
    options && document.querySelector(options.navSelector || "#portal-nav");
  const account =
    options &&
    document.querySelector(options.accountSelector || "#portal-account");
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("portal-dark", dark);
    document.body.classList.toggle("portal-dark", dark);
  }, [dark]);
  useLayoutEffect(() => {
    if (nav) nav.className = "portal-primary-nav";
    if (account) account.className = "portal-account";
    accountRef.current = account;
  }, [nav, account]);
  useEffect(() => {
    const click = (event) => {
      if (!accountRef.current?.contains(event.target)) setOpen(false);
    };
    const keydown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", click);
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("keydown", keydown);
    };
  }, []);
  function toggleTheme() {
    const value = !dark;
    try {
      localStorage.setItem(themeKey, value ? "dark" : "light");
    } catch {
      try {
        sessionStorage.setItem(themeKey, value ? "dark" : "light");
      } catch {}
    }
    setDark(value);
  }
  if (!options?.me) return null;
  const { me, active } = options;
  const destinations = [
    { key: "dashboard", href: "/dashboard", label: "Dashboard" },
    { key: "admin", href: "/admin", label: "Administration" },
    { key: "users", href: "/users", label: "Users" },
  ].filter(
    (item) =>
      me.modules?.[item.key] &&
      (item.key !== "dashboard" || options.includeDashboard !== false),
  );
  const initials =
    String(me.name || "User")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";
  const role =
    {
      ADMIN: "Administrator",
      EMPLOYER_MANAGER: "Employer Manager",
      PORTFOLIO_MANAGER: "Portfolio Manager",
      VIEWER: "Viewer",
    }[me.role] || String(me.role || "User").replaceAll("_", " ");
  const themeLabel = dark ? "Use light mode" : "Use dark mode";
  return (
    <>
      {nav &&
        createPortal(
          destinations.map((item) => (
            <a
              key={item.key}
              className={`portal-nav-link ${active === item.key ? "is-active" : ""}`}
              href={item.href}
            >
              {item.label}
            </a>
          )),
          nav,
        )}
      {account &&
        createPortal(
          <>
            <button
              className="portal-theme-quick"
              type="button"
              data-portal-theme-toggle=""
              aria-pressed={dark}
              title={themeLabel}
              aria-label={themeLabel}
              onClick={toggleTheme}
            >
              <Sun />
            </button>
            <button
              className="portal-account-trigger"
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={menuId}
              title="Account menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="portal-account-avatar" aria-hidden="true">
                {initials}
              </span>
              <svg
                className="portal-account-chevron"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5.5 7.5 10 12l4.5-4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`portal-account-menu${open ? " is-open" : ""}`}
              id={menuId}
              role="menu"
            >
              <div className="portal-account-header">
                <div className="portal-account-name">{me.name || "User"}</div>
                {me.email && (
                  <div className="portal-account-email">{me.email}</div>
                )}
                <div className="portal-account-role">{role}</div>
                <div className="portal-account-build">Portal v0.10.0</div>
              </div>
              <div className="portal-mobile-links">
                {destinations.map((item) => (
                  <a
                    key={item.key}
                    className={`portal-mobile-link ${active === item.key ? "is-active" : ""}`}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <button
                className="portal-menu-action portal-theme-toggle"
                type="button"
                role="menuitem"
                data-portal-theme-toggle=""
                aria-pressed={dark}
                onClick={toggleTheme}
              >
                <Sun />
                <span data-portal-theme-label="">
                  {dark ? "Light mode" : "Dark mode"}
                </span>
              </button>
              <button
                className="portal-menu-action portal-signout"
                type="button"
                role="menuitem"
                data-portal-signout=""
                onClick={signOut}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19H10M14.5 8 18.5 12l-4 4M18 12H9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sign out
              </button>
              <button
                className="portal-menu-action portal-deactivate"
                type="button"
                role="menuitem"
                data-portal-deactivate=""
                onClick={() => {
                  setOpen(false);
                  publish({ ...snapshot, deactivate: true });
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8.5 8.5l7 7M15.5 8.5l-7 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Deactivate my account
              </button>
            </div>
          </>,
          account,
        )}
      {options.deactivate && <DeactivateDialog onClose={closeDeactivate} />}
    </>
  );
}
