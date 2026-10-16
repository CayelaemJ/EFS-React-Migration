import React, { useLayoutEffect } from "react";
import BrandEngine from "../lib/brand-engine.js";
const defaultBrand = {
  accentColor: "0FC79B",
  primaryColor: "0FC79B",
  navyColor: "2B1D73",
};
const fixer = {
  accentColor: "#0FC79B",
  primaryColor: "#2B1D73",
  navyColor: "#2B1D73",
};
const charts = {
  "--chart-engagement": "#4C3C92",
  "--chart-cashflow": "#087F65",
  "--chart-debt": "#607486",
  "--chart-insurance": "#6D5BB0",
  "--chart-workforce": "#2B1D73",
  "--chart-low": "#187A4D",
  "--chart-mid": "#9A5B00",
  "--chart-high": "#B5391F",
};
const aliases = {
  "--engagement-color": "engagement",
  "--cashflow-color": "cashflow",
  "--debt-risk-color": "debt",
  "--insurance-color": "insurance",
  "--eligible-workforce-color": "workforce",
  "--stress-low-color": "low",
  "--stress-mid-color": "mid",
  "--stress-high-color": "high",
};
export function dashboardBrand(theme, user) {
  return theme?.branded !== false &&
    !["ADMIN", "SUPERADMIN"].includes(String(user?.role || "").toUpperCase())
    ? theme
    : null;
}
export function useDashboardBranding(theme, user) {
  const brand = dashboardBrand(theme, user);
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousEngine = window.BrandEngine;
    window.BrandEngine = BrandEngine;
    const previousTitle = document.title,
      previousClass = root.classList.contains("efs-default-brand");
    const previous = new Map();
    let applied = [];
    function render() {
      const dark = root.classList.contains("portal-dark");
      let tokens = {};
      if (brand) {
        const hex = (c) => (c ? "#" + String(c).replace(/^#/, "") : null);
        const accent = hex(brand.accentColor || brand.primaryColor || "0FC79B");
        const co = BrandEngine.coBrandSystem(
          {
            accentColor: accent,
            primaryColor: hex(brand.primaryColor) || accent,
            navyColor: hex(brand.navyColor || brand.primaryColor) || accent,
          },
          fixer,
          dark ? "dark" : "light",
        );
        tokens = { ...co.tokens };
        for (const [k, v] of Object.entries(co.charts))
          tokens["--chart-" + k] = dark
            ? BrandEngine.forDark(
                v,
                String(tokens["--surface-1"] || tokens["--white"]).replace(
                  /^#/,
                  "",
                ),
              )
            : v;
      } else {
        if (dark) tokens = BrandEngine.themeTokens(defaultBrand, "dark");
        for (const [k, v] of Object.entries(charts))
          tokens[k] = dark ? BrandEngine.forDark(v, tokens["--white"]) : v;
      }
      for (const [k, v] of Object.entries(aliases))
        tokens[k] = `var(--chart-${v})`;
      for (const key of applied)
        if (!(key in tokens)) {
          const old = previous.get(key);
          old
            ? root.style.setProperty(key, old)
            : root.style.removeProperty(key);
        }
      for (const [key, value] of Object.entries(tokens)) {
        if (!previous.has(key))
          previous.set(key, root.style.getPropertyValue(key));
        root.style.setProperty(key, String(value));
      }
      applied = Object.keys(tokens);
    }
    root.classList.toggle("efs-default-brand", !brand);
    document.title = brand
      ? (brand.name || "empower-fin Dashboard Portal") +
        " Not available Employer Insights"
      : "empower-fin Dashboard Portal";
    render();
    const observer = new MutationObserver(render);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      window.BrandEngine = previousEngine;
      observer.disconnect();
      for (const [key, value] of previous)
        value
          ? root.style.setProperty(key, value)
          : root.style.removeProperty(key);
      root.classList.toggle("efs-default-brand", previousClass);
      document.title = previousTitle;
    };
  }, [brand]);
  return brand;
}
function tone(theme) {
  const hex = String(
    theme?.navyColor || theme?.primaryColor || theme?.accentColor || "",
  ).replace(/^#/, "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return "mid";
  const rgb = [0, 2, 4]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
    );
  const light = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return light < 0.22 ? "dark" : light > 0.72 ? "light" : "mid";
}
export function DashboardBrandLockup({ theme }) {
  const custom = !!theme?.logoDataUrl;
  return (
    <div className="logo portal-brand-lockup" id="portal-brand-lockup">
      <div
        className="portal-brand-default"
        id="portal-brand-default"
        hidden={custom}
      >
        <img
          src="/static/the-fixer-logo.svg?v=6"
          className="efs-brand-logo"
          alt="The Fixer"
        />
      </div>
      <div
        className="portal-brand-partner"
        id="portal-brand-partner"
        hidden={!custom}
        data-partner-header-tone={custom ? tone(theme) : undefined}
      >
        <div className="portal-partner-mark">
          <img
            id="portal-partner-logo"
            src={custom ? theme.logoDataUrl : undefined}
            alt={custom ? (theme.name || "Partner") + " logo" : ""}
            data-custom-logo={custom ? "1" : undefined}
          />
          <span id="channel-brand-name" className="portal-partner-name">
            {!custom && theme?.name !== "empower-fin Dashboard Portal"
              ? theme?.name
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
