import { useEffect, useState } from "react";

type Me = {
  name?: string;
  email?: string;
  role?: string;
  modules?: { dashboard?: boolean; admin?: boolean; portfolio?: boolean; users?: boolean };
  theme?: { primaryColor?: string; accentColor?: string };
};

const roleLabel = (role?: string) => ({
  ADMIN: "Administrator",
  EMPLOYER_VIEW: "Employer access",
  PORTFOLIO_VIEW: "Portfolio access",
}[role || ""] || "User");

export function PortalNav({ me, active }: { me: Me; active: "dashboard" | "admin" | "users" }) {
  const [open, setOpen] = useState(false);
  // Match NewChanges exactly: module flags are the source of truth.
  const destinations = [
    { key: "dashboard" as const, label: "Dashboard", href: "/react/dashboard", show: me.modules?.dashboard === true },
    { key: "admin" as const, label: "Administration", href: "/react/admin", show: me.modules?.admin === true },
    { key: "users" as const, label: "Users", href: "/react/users", show: me.modules?.users === true },
  ].filter(item => item.show);

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const signOut = async () => {
    try { await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }); }
    finally { window.location.assign("/login"); }
  };

  return <header className="react-portal-nav" style={{
    ["--nav-primary" as string]: me.theme?.primaryColor || "#32217c",
    ["--nav-accent" as string]: me.theme?.accentColor || "#b15be8",
  }}>
    <div className="react-portal-nav-inner">
      <a className="react-portal-brand" href="/react/dashboard" aria-label="Dashboard">
        <img src="/static/logo.png" alt="empower-fin Dashboard Portal" />
      </a>
      <nav className="react-portal-links" aria-label="Primary navigation">
        {destinations.map(item =>
          <a key={item.key} className={active === item.key ? "is-active" : ""} href={item.href}>{item.label}</a>
        )}
      </nav>
      <div className="react-portal-account" onClick={e => e.stopPropagation()}>
        <button type="button" className="react-portal-account-trigger" aria-expanded={open} onClick={() => setOpen(v => !v)}>
          <span className="react-portal-avatar">{(me.name || me.email || "U").trim().split(/\s+/).map(x => x[0]).slice(0,2).join("").toUpperCase()}</span>
          <span className="react-portal-account-copy"><strong>{me.name || me.email || "User"}</strong><small>{roleLabel(me.role)}</small></span>
          <span className="react-portal-chevron" aria-hidden="true">⌄</span>
        </button>
        {open && <div className="react-portal-menu">
          <div className="react-portal-menu-head"><strong>{me.name || me.email || "User"}</strong><span>{me.email || ""}</span><small>{roleLabel(me.role)}</small></div>
          {destinations.map(item => <a key={item.key} href={item.href}>{item.label}</a>)}
          <button type="button" onClick={signOut}>Sign out</button>
        </div>}
      </div>
    </div>
  </header>;
}
