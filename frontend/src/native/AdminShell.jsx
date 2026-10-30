import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import BrandEngine from "../lib/brand-engine.js";
import { initializeReports } from "./AdminReports.jsx";
import { configureResetRefresh } from "./AdminReset.jsx";
import { refreshIntegration, setIntegrationMode } from "./AdminIntegration.jsx";
const Session = createContext(null);
export const useAdminSession = () => useContext(Session);
const defaultBrand = {
  accentColor: "0FC79B",
  primaryColor: "0FC79B",
  navyColor: "2B1D73",
};
function useAdminBrand() {
  useLayoutEffect(() => {
    const root = document.documentElement,
      previous = new Map(),
      applied = new Set();
    function render() {
      const tokens = root.classList.contains("portal-dark")
        ? BrandEngine.themeTokens(defaultBrand, "dark")
        : {};
      for (const key of applied)
        if (!(key in tokens)) root.style.removeProperty(key);
      applied.clear();
      for (const [key, value] of Object.entries(tokens)) {
        if (!previous.has(key))
          previous.set(key, {
            value: root.style.getPropertyValue(key),
            priority: root.style.getPropertyPriority(key),
          });
        root.style.setProperty(key, value);
        applied.add(key);
      }
    }
    render();
    const observer = new MutationObserver(render);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      observer.disconnect();
      for (const [key, original] of previous) {
        if (original.value)
          root.style.setProperty(key, original.value, original.priority);
        else root.style.removeProperty(key);
      }
    };
  }, []);
}
export function AdminSession({ children }) {
  const [me, setMe] = useState(null);
  useAdminBrand();
  useEffect(() => {
    const abort = new AbortController();
    (async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          signal: abort.signal,
        });
        if (!response.ok) {
          if (!abort.signal.aborted) location.replace("/login");
          return;
        }
        const value = await response.json();
        if (abort.signal.aborted) return;
        if (
          !value ||
          !value.modules ||
          typeof value.modules.admin !== "boolean"
        ) {
          location.replace("/login");
          return;
        }
        if (
          !value.modules.admin ||
          !["ADMIN", "SUPERADMIN"].includes(value.role)
        ) {
          location.replace("/dashboard");
          return;
        }
        setMe(value);
      } catch (error) {
        if (!abort.signal.aborted) location.replace("/login");
      }
    })();
    return () => abort.abort();
  }, []);
  return (
    <Session.Provider value={me}>
      {me ? children : <LoadingSplash />}
    </Session.Provider>
  );
}
function LoadingSplash() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 4500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div id="welcome-splash" className={hidden ? "hide" : undefined}>
      <div className="welcome-splash-inner">
        <img
          id="welcome-splash-logo"
          className="welcome-splash-logo efs-brand-logo"
          src="/static/the-fixer-logo.svg?v=6"
          alt="The Fixer logo"
        />
        <div className="welcome-splash-spinner" />
        <div className="welcome-splash-greeting" id="welcome-splash-greeting">
          Welcome
        </div>
        <div className="welcome-splash-sub" id="welcome-splash-sub">
          The Fixer is getting things ready…
        </div>
      </div>
    </div>
  );
}
export function PrivilegedAdmin({ children }) {
  return useAdminSession()?.role === "SUPERADMIN" ? children : null;
}
export function WelcomeSplash() {
  const me = useAdminSession(),
    [hidden, setHidden] = useState(() => {
      try {
        return sessionStorage.getItem("ef_splash_shown") === "1";
      } catch {
        return false;
      }
    }),
    [dark, setDark] = useState(() =>
      document.documentElement.classList.contains("portal-dark"),
    );
  useEffect(() => {
    setDark(document.documentElement.classList.contains("portal-dark"));
    try {
      sessionStorage.setItem("ef_splash_shown", "1");
      sessionStorage.removeItem("ef_fresh_login");
    } catch {}
    const timer = setTimeout(() => setHidden(true), 1400),
      observer = new MutationObserver(() =>
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
  const first =
      String(me?.name || "")
        .trim()
        .split(/\s+/)[0] || "there",
    hour = new Date().getHours(),
    daypart =
      hour < 12
        ? "Good morning"
        : hour < 18
          ? "Good afternoon"
          : "Good evening";
  return (
    <div id="welcome-splash" className={hidden ? "hide" : undefined}>
      <div className="welcome-splash-inner">
        <img
          id="welcome-splash-logo"
          className="welcome-splash-logo efs-brand-logo"
          src={
            dark
              ? "/static/the-fixer-logo-reversed.svg?v=1"
              : "/static/the-fixer-logo.svg?v=6"
          }
          alt="The Fixer logo"
        />
        <div className="welcome-splash-spinner" />
        <div className="welcome-splash-greeting" id="welcome-splash-greeting">
          {daypart}, {first} 👋
        </div>
        <div className="welcome-splash-sub" id="welcome-splash-sub">
          The Fixer hopes you have a good day.
        </div>
      </div>
    </div>
  );
}
export function AdminBootstrap() {
  const me = useAdminSession();
  useLayoutEffect(() => {
    configureResetRefresh(refreshIntegration);
    window.EmpowerPortalNav?.render({
      me,
      navSelector: "#portal-nav",
      accountSelector: "#portal-account",
      active: "admin",
    });
  }, [me]);
  useEffect(() => {
    const abort = new AbortController();
    initializeReports(undefined, { signal: abort.signal }).catch(() => {});
    return () => abort.abort();
  }, []);
  return null;
}
export function chooseIngestion(mode) {
  document
    .querySelector(mode === "FILE" ? "#file-ingestion" : "#live-integration")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (mode !== "FILE") setIntegrationMode(mode);
}
