import { useEffect, useState } from "react";

type Me = {
  name?: string;
  email?: string;
  role?: string;
  modules?: { dashboard?: boolean; admin?: boolean; users?: boolean };
  theme?: { primaryColor?: string; accentColor?: string };
};

const roleLabel = (role?: string) => ({
  SUPERADMIN: "Super Admin",
  ADMIN: "Administrator",
  EMPLOYER_MANAGER: "Employer access",
  PORTFOLIO_MANAGER: "Portfolio access",
  VIEWER: "Viewer",
}[role || ""] || "User");

export function PortalNav({ me, active }: { me: Me; active: "dashboard" | "admin" | "users" }) {
  const [open, setOpen] = useState(false);
  const canAdmin = me.role === "ADMIN" || me.role === "SUPERADMIN";
  const destinations = [
    { key: "dashboard" as const, label: "Dashboard", href: "/react/dashboard", show: me.modules?.dashboard !== false },
    { key: "admin" as const, label: "Administration", href: "/react/admin", show: me.modules?.admin || canAdmin },
    { key: "users" as const, label: "Users", href: "/react/users", show: me.modules?.users || canAdmin },
  ].filter(x => x.show);

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const signOut = async () => {
    try { await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }); } finally {
      window.location.assign("/login");
    }
  };

  return <header className="react-portal-nav" style={{
    ["--nav-primary" as string]: me.theme?.primaryColor || "#214b45",
    ["--nav-accent" as string]: me.theme?.accentColor || "#8a6f3d",
  }}>
    <div className="react-portal-nav-inner">
      <a className="react-portal-brand" href="/react/dashboard" aria-label="Dashboard">
        <img src="/static/logo.png" alt="empower-fin Dashboard Portal" />
      </a>
      <nav className="react-portal-links" aria-label="Primary navigation">
        {destinations.map(item => <a key={item.key} className={active === item.key ? "is-active" : ""} href={item.href}>{item.label}</a>)}
      </nav>
      <div className="react-portal-account" onClick={e => e.stopPropagation()}>
        <button type="button" className="react-portal-account-trigger" aria-expanded={open} onClick={() => setOpen(v => !v)}>
          <span className="react-portal-avatar">{(me.name || me.email || "U").slice(0,1).toUpperCase()}</span>
          <span className="react-portal-account-copy"><strong>{me.name || me.email || "User"}</strong><small>{roleLabel(me.role)}</small></span>
          <span className="react-portal-chevron">⌄</span>
        </button>
        {open && <div className="react-portal-menu">
          <div className="react-portal-menu-head"><strong>{me.name || me.email || "User"}</strong><span>{roleLabel(me.role)}</span></div>
          {destinations.map(item => <a key={item.key} href={item.href}>{item.label}</a>)}
          <button type="button" onClick={signOut}>Sign out</button>
        </div>}
      </div>
    </div>
  </header>;
}
