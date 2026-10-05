import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select } from "./ui/select";

type UserRecord = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  employer?: { id?: string; name?: string } | null;
  employerName?: string | null;
  active?: boolean;
};

type UsersViewProps = {
  me: { name?: string; email?: string; role?: string };
  onDashboard: () => void;
  onAdmin: () => void;
};

const roleLabels: Record<string,string> = {
  SUPERADMIN: "Super Admin",
  ADMIN: "Admin",
  EMPLOYER_MANAGER: "Employer Manager",
  PORTFOLIO_MANAGER: "Portfolio Manager",
  VIEWER: "Viewer",
};

export function UsersView({ me, onDashboard, onAdmin }: UsersViewProps) {
  const isSuper = me.role === "SUPERADMIN";
  const roleOptions = isSuper
    ? ["ADMIN","SUPERADMIN","EMPLOYER_MANAGER","PORTFOLIO_MANAGER","VIEWER"]
    : ["EMPLOYER_MANAGER","PORTFOLIO_MANAGER","VIEWER"];
  const [users,setUsers] = useState<UserRecord[]>([]);
  const [query,setQuery] = useState("");
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [busy,setBusy] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/users",{credentials:"same-origin",cache:"no-store"});
      if (!response.ok) throw new Error((await response.json().catch(()=>({}))).error || "Could not load users");
      const rows = await response.json();
      setUsers(Array.isArray(rows) ? rows : []);
    } catch (e: any) {
      setError(e?.message || "Could not load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(user =>
      [user.name,user.email,user.role,user.employer?.name,user.employerName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [users,query]);

  const updateRole = async (user: UserRecord, next: string) => {
    if (!roleOptions.includes(next) || next === user.role) return;
    try {
      setBusy(user.id);
      setError("");
      const response = await fetch("/api/users/"+encodeURIComponent(user.id),{
        method:"PATCH",
        credentials:"same-origin",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({role:next,reason:"Role updated from React Users"})
      });
      if (!response.ok) throw new Error((await response.json().catch(()=>({}))).error || "Could not update role");
      await load();
    } catch (e:any) {
      setError(e?.message || "Could not update role");
    } finally {
      setBusy("");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--brand-paper,#f6f7f5)]" style={{
      "--brand-ink-strong":"#173a36",
      "--brand-accent":"#8a6f3d",
    } as CSSProperties}>
      <div className="mx-auto w-full max-w-[1480px] px-3 py-4 sm:px-5 lg:px-8">
        <header className="portal-header flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="portal-kicker">EFS Optimise</div>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-[var(--brand-ink-strong)] sm:text-4xl">Users</h1>
            <p className="mt-1 text-sm text-slate-500">Identity, access and role administration for authorised users.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{roleLabels[me.role || ""] || me.role || "User"}</Badge>
            <Button variant="outline" onClick={onDashboard}>Dashboard</Button>
            <Button variant="outline" onClick={onAdmin}>Administration</Button>
          </div>
        </header>

        <section className="mt-5 border-y border-slate-200 bg-white">
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-[var(--brand-ink-strong)]">User directory</h2>
              <p className="mt-1 text-xs text-slate-500">Search the authorised identity set and update roles within your permission boundary.</p>
            </div>
            <label className="w-full sm:max-w-xs">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[.1em] text-slate-500">Search</span>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name, email, role or employer" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
            </label>
          </div>
        </section>

        {error && <div className="mt-4 border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</div>}

        <section className="mt-4 overflow-hidden border-y border-slate-200 bg-white">
          {loading ? (
            <div className="py-14 text-center text-sm text-slate-500">Loading governed user data...</div>
          ) : filtered.length === 0 ? (
            <div className="py-14 text-center">
              <p className="font-semibold text-slate-700">No users found</p>
              <p className="mt-1 text-xs text-slate-500">Try a different search.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Employer</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <strong className="block break-words text-slate-900">{user.name || "Unnamed user"}</strong>
                        <span className="mt-1 block break-words text-[11px] text-slate-500">{user.email || "No email"}</span>
                      </td>
                      <td className="p-3 break-words">{user.employer?.name || user.employerName || "Not assigned"}</td>
                      <td className="p-3">
                        <Select aria-label={"Change role for "+(user.name || user.email || user.id)} value={user.role || ""} disabled={busy===user.id} onChange={e=>void updateRole(user,e.target.value)}>
                          <option value={user.role || ""}>{roleLabels[user.role || ""] || user.role || "Not assigned"}</option>
                          {roleOptions.filter(role=>role!==user.role).map(role=><option key={role} value={role}>{roleLabels[role]}</option>)}
                        </Select>
                      </td>
                      <td className="p-3"><Badge>{user.active === false ? "Inactive" : "Active"}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="mt-4 pb-8 text-[10px] leading-5 text-slate-500">
          {isSuper
            ? "Super Admin permissions are available only within the Super Admin boundary."
            : "Privileged Super Admin accounts remain undiscoverable to ordinary Admins."}
        </div>
      </div>
    </main>
  );
}
