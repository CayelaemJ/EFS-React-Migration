import { useEffect, useMemo, useState, type CSSProperties, type ChangeEvent } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select } from "./ui/select";

type Props = { me: any };

const roles = ["ADMIN","SUPERADMIN","EMPLOYER_MANAGER","PORTFOLIO_MANAGER","VIEWER"];
const roleLabels: Record<string,string> = {
  ADMIN:"Admin", SUPERADMIN:"Super Admin", EMPLOYER_MANAGER:"Employer Manager",
  PORTFOLIO_MANAGER:"Portfolio Manager", VIEWER:"Viewer"
};

async function api<T=any>(url:string, init:RequestInit = {}):Promise<T>{
  const headers = new Headers(init.headers);
  if(init.body && !headers.has("Content-Type") && !(init.body instanceof FormData)) headers.set("Content-Type","application/json");
  const res = await fetch(url,{...init,headers,credentials:"same-origin",cache:"no-store"});
  const text = await res.text();
  let data:any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if(!res.ok) throw new Error(data?.error || data?.message || ("Request failed ("+res.status+")"));
  return data as T;
}
function hex(v:any,fallback:string){ const s=String(v||"").trim().replace(/^#/,""); return /^[0-9a-f]{6}$/i.test(s) ? "#"+s : fallback; }
function n(v:any){ return v==null || v==="" ? "—" : Number.isFinite(Number(v)) ? Number(v).toLocaleString("en-ZA") : String(v); }
function dt(v:any){ return v ? new Date(v).toLocaleString("en-ZA") : "—"; }
function SectionHeading({title,description}:{title:string;description?:string}) {
  return <div><CardTitle className="text-lg">{title}</CardTitle>{description&&<CardDescription className="mt-1">{description}</CardDescription>}</div>;
}

export function AdminView({me}:Props){
  type Tab = "overview"|"users"|"reports"|"integration"|"email"|"automations"|"partners"|"sections"|"analytics"|"audit"|"compliance"|"mlops"|"danger";
  const [tab,setTab]=useState<Tab>("overview");
  const [users,setUsers]=useState<any[]>([]);
  const [batches,setBatches]=useState<any[]>([]);
  const [audit,setAudit]=useState<any[]>([]);
  const [mlops,setMlops]=useState<any[]>([]);
  const [partners,setPartners]=useState<any[]>([]);
  const [sections,setSections]=useState<any[]>([]);
  const [reports,setReports]=useState<any>(null);
  const [schedules,setSchedules]=useState<any[]>([]);
  const [deliveries,setDeliveries]=useState<any[]>([]);
  const [integration,setIntegration]=useState<any>(null);
  const [email,setEmail]=useState<any>({});
  const [security,setSecurity]=useState<any>(null);
  const [ops,setOps]=useState<any>(null);
  const [compliance,setCompliance]=useState<any>(null);
  const [processingActivities,setProcessingActivities]=useState<any[]>([]);
  const [complianceVendors,setComplianceVendors]=useState<any[]>([]);
  const [dataSubjectRequests,setDataSubjectRequests]=useState<any[]>([]);
  const [retentionPolicies,setRetentionPolicies]=useState<any[]>([]);
  const [securityIncidents,setSecurityIncidents]=useState<any[]>([]);
  const [analytics,setAnalytics]=useState<any>(null);
  const [busy,setBusy]=useState("");
  const [error,setError]=useState("");
  const [notice,setNotice]=useState("");
  const [days,setDays]=useState(30);
  const [selectedReport,setSelectedReport]=useState("");
  const [partnerName,setPartnerName]=useState("");
  const [newSchedule,setNewSchedule]=useState({name:"",employerId:"",userId:"",frequency:"WEEKLY",sendTime:"08:00",dayOfWeek:"1",dayOfMonth:"1"});
  const [emailForm,setEmailForm]=useState<any>({});
  const isSuper=me.role==="SUPERADMIN";

  const roleOptions=useMemo(()=>isSuper?roles:roles.filter(r=>r!=="ADMIN"&&r!=="SUPERADMIN"),[isSuper]);
  const themeStyle:CSSProperties={
    "--brand-ink":hex(me.theme?.primaryColor,"#17212b"),
    "--brand-ink-strong":hex(me.theme?.navyColor,"#0d141b"),
    "--brand-accent":hex(me.theme?.accentColor,"#5f756d")
  } as CSSProperties;

  const load = async()=>{
    try{
      setError("");
      const [u,b,a,m,p,s,i,e,sc,d,c,pa,v,q,rt,si,o] = await Promise.all([
        api<any[]>("/api/users"), api<any[]>("/api/admin/batches"), api<any[]>("/api/admin/audit-log?limit=50"),
        api<any[]>("/api/admin/mlops/events?limit=50"), api<any[]>("/api/admin/partners"), api<any[]>("/api/admin/sections"),
        api<any>("/api/admin/integration"), api<any>("/api/admin/email-settings"), api<any[]>("/api/admin/report-schedules"),
        api<any[]>("/api/admin/report-deliveries"), api<any>("/api/admin/compliance/overview"),
        api<any[]>("/api/admin/compliance/processing-activities"), api<any[]>("/api/admin/compliance/vendors"),
        api<any[]>("/api/admin/compliance/requests"), api<any[]>("/api/admin/compliance/retention"),
        api<any[]>("/api/admin/compliance/incidents"), api<any>("/api/admin/enterprise/overview")
      ]);
      setUsers(Array.isArray(u)?u:[]); setBatches(Array.isArray(b)?b:[]); setAudit(Array.isArray(a)?a:[]);
      setMlops(Array.isArray(m)?m:[]); setPartners(Array.isArray(p)?p:[]); setSections(Array.isArray(s)?s:[]);
      setIntegration(i||{}); setEmail(e||{}); setEmailForm(e||{}); setSchedules(Array.isArray(sc)?sc:[]);
      setDeliveries(Array.isArray(d)?d:[]); setCompliance(c||{});
      setProcessingActivities(Array.isArray(pa)?pa:[]); setComplianceVendors(Array.isArray(v)||Array.isArray(v?.items)?(Array.isArray(v)?v:v.items):[]);
      setDataSubjectRequests(Array.isArray(q)?q:[]); setRetentionPolicies(Array.isArray(rt)?rt:[]); setSecurityIncidents(Array.isArray(si)?si:[]); setOps(o||{});
      try{ setSecurity(await api<any>("/api/admin/security/overview")); }catch{}
      try{ setReports(await api<any>("/api/admin/reports")); }catch{}
    }catch(e:any){ setError(e?.message||"Could not load administration data"); }
  };
  useEffect(()=>{ load(); const id=window.setInterval(load,30000); return()=>window.clearInterval(id); },[]);

  const act=async(label:string,fn:()=>Promise<any>)=>{
    try{setBusy(label);setNotice("");setError("");await fn();setNotice("Completed successfully.");await load();}
    catch(e:any){setError(e?.message||"Action failed");}
    finally{setBusy("");}
  };
  const sync=()=>act("sync",async()=>{
    const r=await api<any>("/api/admin/integration/sync",{method:"POST",body:JSON.stringify({})});
    if(r?.jobId) for(let i=0;i<30;i++){await new Promise(x=>setTimeout(x,1000));const j=await api<any>("/api/admin/sync-jobs/"+r.jobId);if(j.status==="DONE")break;if(j.status==="FAILED")throw new Error(j.error||"Sync failed");}
  });
  const updateEmail=()=>act("email",()=>api("/api/admin/email-settings",{method:"POST",body:JSON.stringify(emailForm)}));
  const runAutomation=(kind:string)=>act(kind,()=>api("/api/admin/automations/run",{method:"POST",body:JSON.stringify({kind})}));
  const testEmail=()=>act("email-test",()=>api("/api/admin/email-settings/test",{method:"POST",body:JSON.stringify({...emailForm,recipient:emailForm.testRecipient||emailForm.fromEmail})}));
  const createPartner=()=>act("partner-create",async()=>{if(!partnerName.trim())throw new Error("Partner name is required");await api("/api/admin/partners",{method:"POST",body:JSON.stringify({name:partnerName.trim()})});setPartnerName("");});
  const patchPartner=(id:string,body:any)=>act("partner-"+id,()=>api("/api/admin/partners/"+id,{method:"PUT",body:JSON.stringify(body)}));
  const patchSection=(key:string,body:any)=>act("section-"+key,()=>api("/api/admin/sections/"+encodeURIComponent(key),{method:"PATCH",body:JSON.stringify(body)}));
  const grantSection=(key:string,userId:string)=>act("grant-"+key,()=>api("/api/admin/sections/"+encodeURIComponent(key)+"/grant",{method:"POST",body:JSON.stringify({userId})}));
  const revokeSection=(key:string,userId:string)=>act("revoke-"+key,()=>api("/api/admin/sections/"+encodeURIComponent(key)+"/revoke",{method:"POST",body:JSON.stringify({userId})}));
  const loadAnalytics=async()=>{try{setAnalytics(await api<any>("/api/admin/analytics/summary?days="+days));setError("");}catch(e:any){setError(e.message||"Analytics unavailable");}};
  useEffect(()=>{if(tab==="analytics")loadAnalytics();},[tab,days]);

  const nav:Array<[Tab,string]>=[
    ["overview","Overview"],["users","Users & roles"],["reports","Reports & imports"],["integration","Live integration"],
    ["email","Email & schedules"],["automations","Automations"],["partners","Channel Partners"],["sections","Dashboard sections"],
    ["analytics","Analytics"],["audit","Audit history"],["compliance","POPIA"],["mlops","MLOps"],["danger","Danger zone"]
  ];

  return <main className="min-h-screen bg-[var(--brand-paper)]" style={themeStyle}>
    <div className="mx-auto w-full max-w-[1480px] px-3 py-4 sm:px-5 lg:px-8">
      <header className="portal-header flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div><div className="portal-kicker">EFS Optimise</div><h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-[var(--brand-ink-strong)] sm:text-4xl">Administration</h1><p className="mt-1 text-sm text-slate-500">Governed control plane for identity, data, reporting, integrations and compliance.</p></div>
        <div className="flex items-center gap-3"><Badge>{roleLabels[me.role]||me.role||"User"}</Badge></div>
      </header>
      <nav className="admin-nav mt-5 overflow-x-auto border-b border-[var(--brand-line)]" aria-label="Administration sections"><div className="flex min-w-max">{nav.map(([key,label],i)=><Button key={key} size="sm" variant="ghost" className={tab===key?"admin-tab admin-tab-active":"admin-tab"} onClick={()=>setTab(key)}><span className="admin-tab-index">{String(i+1).padStart(2,"0")}</span>{label}</Button>)}</div></nav>
      {error&&<div className="admin-alert mt-4 border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
      {notice&&<div className="mt-4 border-l-4 border-emerald-600 bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</div>}

      {tab==="overview"&&<section className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><SectionHeading title="Security & identity" description="Live authentication and access posture."/></CardHeader><CardContent><div className="grid gap-4 sm:grid-cols-3">{[["Active sessions",security?.activeSessions],["Failed logins, 24h",security?.failedLogins24h],["Open alerts",security?.openAlerts]].map(x=><div key={x[0] as string} className="border-l-2 border-[var(--brand-accent)] bg-[var(--brand-accent-soft)] p-4"><span className="text-xs text-slate-500">{x[0] as string}</span><strong className="mt-1 block text-2xl text-[var(--brand-ink-strong)]">{n(x[1])}</strong></div>)}</div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Integration posture" description="Source and freshness remain governed by the existing Node services."/></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2">{[["Source",integration?.sourceType],["Enabled",integration?.enabled==null?"—":integration.enabled?"Yes":"No"],["Schedule",integration?.scheduleHours?integration.scheduleHours+" hours":"—"],["Last sync",dt(integration?.lastSuccessAt)]].map(x=><div key={x[0] as string} className="border border-slate-200 p-4"><span className="text-xs text-slate-500">{x[0] as string}</span><b className="mt-1 block text-sm">{String(x[1]??"—")}</b></div>)}</div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Data-quality gate" description="Problems are surfaced before governed data is used."/></CardHeader><CardContent>{mlops.filter(x=>x.eventType==="DATA_QUALITY_GATE"&&x.status!=="PASS").slice(0,5).map((x,i)=><div key={x.id||i} className="mb-2 flex justify-between border border-red-200 bg-red-50 p-3 text-sm"><span>{x.metadata?.reportKey||"Dataset"}</span><Badge>{x.status||"REVIEW"}</Badge></div>)}{!mlops.some(x=>x.eventType==="DATA_QUALITY_GATE"&&x.status!=="PASS")&&<p className="text-sm text-emerald-700">No unresolved data-quality gates returned.</p>}</CardContent></Card>
        <Card><CardHeader><SectionHeading title="Critical audit" description="Highest-priority events are shown first."/></CardHeader><CardContent>{audit.filter(x=>["user.delete","user.revoke","partner.delete","security.alert.resolve","user.update"].includes(x.action)).slice(0,5).map((x,i)=><div key={x.id||i} className="mb-2 border border-slate-200 p-3"><b className="text-xs">{x.action||"Event"}</b><span className="ml-3 text-[10px] text-slate-500">{dt(x.createdAt)}</span><p className="mt-1 text-xs text-slate-600">{x.message||x.summary||x.detail||"Recorded event"}</p></div>)}{!audit.length&&<p className="text-sm text-slate-500">No audit events returned.</p>}</CardContent></Card>
      </section>}

      {tab==="users"&&<section className="mt-5"><Card><CardHeader><SectionHeading title="Users & roles" description="Admins manage ordinary roles; Super Admin is deliberately not discoverable to ordinary Admins."/></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-xs"><thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500"><tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Status</th><th className="p-3">Employer scope</th><th className="p-3">Change role</th></tr></thead><tbody className="divide-y divide-slate-100">{users.map(u=><tr key={u.id}><td className="p-3"><b>{u.name||"Unnamed"}</b><span className="mt-1 block text-slate-500">{u.email}</span></td><td className="p-3"><Badge>{roleLabels[u.role]||u.role||"Unknown"}</Badge></td><td className="p-3">{u.active===false?"Inactive":"Active"}</td><td className="p-3">{n(Array.isArray(u.employers)?u.employers.length:u.employerIds?.length)}</td><td className="p-3"><Select value={u.role||""} aria-label={"Change role for "+(u.name||u.email)} onChange={e=>{const v=e.target.value;if(roleOptions.includes(v))act("role",()=>api("/api/users/"+u.id,{method:"PATCH",body:JSON.stringify({role:v,reason:"Role updated from React administration"})}))}}><option value={u.role}>{roleLabels[u.role]||u.role}</option>{roleOptions.filter(r=>r!==u.role).map(r=><option key={r} value={r}>{roleLabels[r]}</option>)}</Select></td></tr>)}</tbody></table></div></CardContent></Card></section>}

      {tab==="reports"&&<section className="mt-5 grid gap-4 lg:grid-cols-[300px_1fr]">
        <Card><CardHeader><SectionHeading title="Reports" description="Load order from the legacy NewChanges import workflow."/></CardHeader><CardContent><div className="space-y-1">{(reports?.loadOrder||reports?.reports?.map((r:any)=>r.key)||[]).map((key:string,i:number)=>{const r=(reports?.reports||[]).find((x:any)=>x.key===key);return <button key={key} type="button" onClick={()=>setSelectedReport(key)} className={"w-full border-b border-slate-100 p-3 text-left "+(selectedReport===key?"bg-slate-100":"")}><span className="block text-[10px] font-bold tracking-widest text-slate-500">STEP {i+1}</span><b className="text-sm">{r?.title||key}</b></button>})}</div></CardContent></Card>
        <div className="space-y-4"><Card><CardHeader><SectionHeading title={selectedReport||"Select a report"} description={(reports?.reports||[]).find((x:any)=>x.key===selectedReport)?.description||"Choose a report to inspect its governed format and upload workflow."}/></CardHeader><CardContent>{selectedReport?<ReportUpload report={(reports?.reports||[]).find((x:any)=>x.key===selectedReport)} onDone={load}/>:<p className="text-sm text-slate-500">Pick a report on the left to see fields, templates and upload controls.</p>}</CardContent></Card>
        <Card><CardHeader><SectionHeading title="Import history" description="Staged data stays reviewable until committed."/></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-xs"><thead className="bg-slate-50 text-[10px] uppercase text-slate-500"><tr><th className="p-3">Report</th><th className="p-3">File</th><th className="p-3">Rows</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{batches.map(b=><tr key={b.id}><td className="p-3 font-semibold">{b.reportKey}</td><td className="p-3">{b.filename}</td><td className="p-3">{n(b.rowCount)}</td><td className="p-3"><Badge>{b.status}</Badge></td><td className="p-3 flex gap-1">{b.status==="STAGED"&&<Button size="sm" onClick={()=>act("commit",()=>api("/api/admin/batches/"+b.id+"/commit",{method:"POST"}))}>Commit</Button>}{b.revertable&&<Button size="sm" variant="outline" onClick={()=>act("revert",()=>api("/api/admin/batches/"+b.id+"/revert",{method:"POST"}))}>Revert</Button>}</td></tr>)}</tbody></table></div></CardContent></Card></div>
      </section>}

      {tab==="integration"&&<section className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><SectionHeading title="Live Data Integration" description="API or approved read-only SQL source; file import remains available as fallback."/></CardHeader><CardContent><div className="space-y-3">{[["Source type",integration?.sourceType],["Enabled",integration?.enabled==null?"—":integration.enabled?"Enabled":"Disabled"],["Schedule",integration?.scheduleHours?integration.scheduleHours+" hours":"—"],["Last successful sync",dt(integration?.lastSuccessAt)],["Analytics mode",ops?.integration?.analyticsMode]].map(x=><div key={x[0] as string} className="flex justify-between gap-4 border border-slate-200 p-4"><span className="text-xs text-slate-500">{x[0] as string}</span><b className="text-sm">{String(x[1]??"Not available")}</b></div>)}</div><div className="mt-4 flex flex-wrap gap-2"><Button disabled={busy==="sync"} onClick={sync}>{busy==="sync"?"Syncing…":"Sync now"}</Button><Button variant="outline" onClick={()=>act("test-source",()=>api("/api/admin/integration/test",{method:"POST",body:JSON.stringify({})}))}>Test source</Button><Button variant="outline" onClick={()=>act("refresh-source",()=>api("/api/admin/integration/refresh",{method:"POST"}))}>Refresh health</Button></div></CardContent></Card>
        <IntegrationLogs/>
      </section>}

      {tab==="email"&&<section className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><SectionHeading title="System Email" description="SMTP or Resend delivery used by invites, resets, alerts and scheduled reports."/></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2">{[["emailProvider","Provider"],["smtpHost","SMTP host"],["smtpPort","SMTP port"],["smtpUsername","SMTP username"],["fromName","From name"],["fromEmail","From email"],["replyTo","Reply-to"],["defaultTimezone","Timezone"],["portalBaseUrl","Portal URL"],["resendFromEmail","Resend from"]].map(([k,l])=><label key={k} className="text-xs font-semibold text-slate-600">{l}<input value={emailForm[k]||""} onChange={e=>setEmailForm((x:any)=>({...x,[k]:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm" /></label>)}</div><label className="mt-3 block text-xs font-semibold text-slate-600">SMTP password<input type="password" value={emailForm.smtpPassword||""} onChange={e=>setEmailForm((x:any)=>({...x,smtpPassword:e.target.value}))} placeholder={email.hasPassword?"Leave blank to keep existing":""} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"/></label><label className="mt-3 block text-xs font-semibold text-slate-600">Test recipient<input value={emailForm.testRecipient||""} onChange={e=>setEmailForm((x:any)=>({...x,testRecipient:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"/></label><div className="mt-4 flex flex-wrap gap-2"><Button disabled={busy==="email"} onClick={updateEmail}>Save settings</Button><Button variant="outline" onClick={testEmail}>Test delivery</Button></div><p className="mt-3 text-xs text-slate-500">{email.configured?"Delivery is configured.":"Delivery configuration is incomplete."}</p></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Scheduled Reports & delivery history" description="Existing report-schedule service remains the scheduling authority."/></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-xs"><thead className="bg-slate-50 text-[10px] uppercase text-slate-500"><tr><th className="p-3">Schedule</th><th className="p-3">Recipient</th><th className="p-3">Frequency</th><th className="p-3">Next run</th><th className="p-3">State</th></tr></thead><tbody className="divide-y divide-slate-100">{schedules.map(s=><tr key={s.id}><td className="p-3">{s.name}<span className="block text-slate-500">{s.employer?.name||""}</span></td><td className="p-3">{s.user?.email||s.recipientEmail||"—"}</td><td className="p-3">{s.frequency}{s.sendTime?" · "+s.sendTime:""}</td><td className="p-3">{s.active?dt(s.nextRunAt):"Paused"}</td><td className="p-3"><Badge>{s.active?"ACTIVE":"PAUSED"}</Badge></td></tr>)}</tbody></table></div><h3 className="mt-6 text-sm font-bold">Recent deliveries</h3><div className="mt-2 space-y-2">{deliveries.slice(0,10).map((d,i)=><div key={d.id||i} className="border border-slate-200 p-3 text-xs"><b>{d.subject||d.schedule?.name||"Scheduled report"}</b><span className="ml-3 text-slate-500">{dt(d.sentAt)}</span><span className="ml-3">{d.status}</span>{d.error&&<p className="mt-1 text-red-700">{d.error}</p>}</div>)}</div></CardContent></Card>
      </section>}

      {tab==="automations"&&<section className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><SectionHeading title="Automations" description="Alerts, stale-account cleanup, digests and score-change notifications."/></CardHeader><CardContent><div className="space-y-3"><label className="block text-xs font-semibold text-slate-600">Admin alert emails<input value={emailForm.alertEmails||""} onChange={e=>setEmailForm((x:any)=>({...x,alertEmails:e.target.value}))} placeholder="admin1@company.com, admin2@company.com" className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"/></label><label className="block text-xs font-semibold text-slate-600">Slack webhook URL<input value={emailForm.alertSlackWebhookUrl||""} onChange={e=>setEmailForm((x:any)=>({...x,alertSlackWebhookUrl:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"/></label><label className="block text-xs font-semibold text-slate-600">Auto-deactivate inactive accounts after days<input type="number" min="7" max="3650" value={emailForm.staleDeactivateDays||""} onChange={e=>setEmailForm((x:any)=>({...x,staleDeactivateDays:e.target.value?Number(e.target.value):null}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"/></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!emailForm.digestEnabled} onChange={e=>setEmailForm((x:any)=>({...x,digestEnabled:e.target.checked}))}/> Weekly engagement digest</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={emailForm.scoreChangeAlertsEnabled!==false} onChange={e=>setEmailForm((x:any)=>({...x,scoreChangeAlertsEnabled:e.target.checked}))}/> Employer score-change alerts</label><Button onClick={updateEmail}>Save automation settings</Button></div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Run operational automations" description="These actions call the existing backend automation service; no duplicate React job runner is created."/></CardHeader><CardContent><div className="grid gap-2 sm:grid-cols-2"><Button variant="outline" disabled={!!busy} onClick={()=>runAutomation("stale")}>Run stale-account check</Button><Button variant="outline" disabled={!!busy} onClick={()=>runAutomation("digest")}>Send engagement digest</Button><Button variant="outline" disabled={!!busy} onClick={()=>runAutomation("test-alert")}>Send test alert</Button><Button variant="outline" disabled={!!busy} onClick={()=>runAutomation("score-alerts")}>Run score-change alerts</Button></div><p className="mt-4 text-xs leading-5 text-slate-500">Daily refresh, source sync, snapshots, score rebuilding, scheduled reports, deliveries and async jobs remain backend-owned and are not reimplemented in the browser.</p></CardContent></Card>
      </section>}

      {tab==="partners"&&<section className="mt-5 grid gap-4">
        <Card><CardHeader><SectionHeading title="Channel Partners" description="White-label branding, partner users and employer assignment."/></CardHeader><CardContent><div className="flex gap-2"><input value={partnerName} onChange={e=>setPartnerName(e.target.value)} placeholder="New partner name" className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"/><Button onClick={createPartner}>Add partner</Button></div><div className="mt-5 space-y-3">{partners.map(p=><PartnerRow key={p.id} partner={p} users={users} onSave={patchPartner} onRefresh={load}/>)}</div></CardContent></Card>
      </section>}

      {tab==="sections"&&<section className="mt-5"><Card><CardHeader><SectionHeading title="Dashboard Sections" description="Enable/disable sections, control role access and grant individual access."/></CardHeader><CardContent><div className="space-y-3">{sections.map(s=><SectionRow key={s.key} section={s} users={users} onPatch={patchSection} onGrant={grantSection} onRevoke={revokeSection}/>)}</div></CardContent></Card></section>}

      {tab==="analytics"&&<section className="mt-5"><Card><CardHeader><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><SectionHeading title="Engagement analytics" description="Login, page-view and user-engagement summary from the existing analytics service."/><label className="text-xs font-semibold">Days<select value={days} onChange={e=>setDays(Number(e.target.value))} className="ml-2 rounded border border-slate-200 p-2"><option value="7">7</option><option value="30">30</option><option value="90">90</option></select></label></div></CardHeader><CardContent><div className="grid gap-px border border-[var(--brand-line)] bg-[var(--brand-line)] sm:grid-cols-3">{[["Logins",analytics?.totalLogins],["Pageviews",analytics?.totalPageviews],["Users",analytics?.uniqueUsers]].map(x=><div key={x[0] as string} className="bg-[var(--brand-surface)] p-5"><span className="text-xs text-slate-500">{x[0] as string}</span><strong className="mt-2 block text-2xl">{n(x[1])}</strong></div>)}</div><div className="mt-5 overflow-x-auto"><pre className="rounded-md border border-slate-200 bg-slate-50 p-4 text-xs leading-5">{analytics?JSON.stringify(analytics,null,2):"No analytics summary returned."}</pre></div></CardContent></Card></section>}

      {tab==="audit"&&<section className="mt-5"><Card><CardHeader><SectionHeading title="Admin Audit Log" description="Latest events are visible here; the backend retains the full history."/></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-xs"><thead className="bg-slate-50 text-[10px] uppercase text-slate-500"><tr><th className="p-3">When</th><th className="p-3">Admin</th><th className="p-3">Action</th><th className="p-3">Details</th></tr></thead><tbody className="divide-y divide-slate-100">{audit.map((x,i)=><tr key={x.id||i}><td className="p-3 whitespace-nowrap">{dt(x.createdAt)}</td><td className="p-3">{x.actorName||x.actorEmail||"System"}</td><td className="p-3"><Badge>{x.action||"Event"}</Badge></td><td className="p-3 max-w-[500px] break-words">{typeof(x.summary||x.message||x.detail)==="string"?(x.summary||x.message||x.detail):JSON.stringify(x.detail||x.summary||x.message||{})}</td></tr>)}</tbody></table></div><Button className="mt-4" variant="outline" onClick={()=>window.location.assign("/api/admin/audit-log.csv")}>Download all logs (CSV)</Button></CardContent></Card></section>}

      {tab==="compliance"&&<section className="mt-5 grid gap-4 lg:grid-cols-2"><Card><CardHeader><SectionHeading title="POPIA governance" description="Live compliance-control overview."/></CardHeader><CardContent><div className="grid gap-px border border-[var(--brand-line)] bg-[var(--brand-line)] sm:grid-cols-2">{[["Processing activities",compliance?.processingActivities],["Cross-border activities",compliance?.crossBorderActivities],["Open data-subject requests",compliance?.openDataSubjectRequests],["Open incidents",compliance?.openSecurityIncidents]].map(x=><div key={x[0] as string} className="bg-[var(--brand-surface)] p-4"><span className="text-xs text-slate-500">{x[0] as string}</span><strong className="mt-1 block text-xl">{n(x[1])}</strong></div>)}</div><p className="mt-4 text-sm text-slate-600">{compliance?.status==="ACTION_REQUIRED"?"Governance action is required.":"Governance controls are currently being monitored."}</p></CardContent></Card><Card><CardHeader><SectionHeading title="Data governance registers" description="Live POPIA controls are rendered in React from the existing governed APIs."/></CardHeader><CardContent><div className="grid gap-4 lg:grid-cols-2">
<div className="border border-slate-200 p-4"><b className="text-sm">Processing register</b><div className="mt-3 space-y-2">{processingActivities.slice(0,5).map((x:any,i:number)=><div key={x.id||i} className="border-b border-slate-100 pb-2 text-xs"><strong>{x.name||"Processing activity"}</strong><span className="ml-2 text-slate-500">{x.lawfulBasis||x.purpose||"Governed activity"}</span></div>)}{!processingActivities.length&&<p className="text-xs text-slate-500">No processing activities returned.</p>}</div></div>
<div className="border border-slate-200 p-4"><b className="text-sm">Operators & cross-border vendors</b><div className="mt-3 space-y-2">{complianceVendors.slice(0,5).map((x:any,i:number)=><div key={x.id||i} className="border-b border-slate-100 pb-2 text-xs"><strong>{x.name||"Vendor"}</strong><span className="ml-2 text-slate-500">{x.country||x.transferBasis||"Review required"}</span></div>)}{!complianceVendors.length&&<p className="text-xs text-slate-500">No vendors returned.</p>}</div></div>
<div className="border border-slate-200 p-4"><b className="text-sm">Data-subject requests</b><div className="mt-3 space-y-2">{dataSubjectRequests.slice(0,5).map((x:any,i:number)=><div key={x.id||i} className="border-b border-slate-100 pb-2 text-xs"><strong>{x.requestType||"Request"}</strong><span className="ml-2 text-slate-500">{x.status||"OPEN"} · {x.createdAt?dt(x.createdAt):"—"}</span></div>)}{!dataSubjectRequests.length&&<p className="text-xs text-slate-500">No requests returned.</p>}</div></div>
<div className="border border-slate-200 p-4"><b className="text-sm">Retention & deletion</b><div className="mt-3 space-y-2">{retentionPolicies.slice(0,5).map((x:any,i:number)=><div key={x.id||i} className="border-b border-slate-100 pb-2 text-xs"><strong>{x.name||x.policyName||"Retention policy"}</strong><span className="ml-2 text-slate-500">{x.retentionDays!=null?x.retentionDays+" days":x.status||"Governed"}</span></div>)}{!retentionPolicies.length&&<p className="text-xs text-slate-500">No retention policies returned.</p>}</div></div>
<div className="border border-slate-200 p-4 lg:col-span-2"><b className="text-sm">Security compromise register</b><div className="mt-3 space-y-2">{securityIncidents.slice(0,5).map((x:any,i:number)=><div key={x.id||i} className="border-b border-slate-100 pb-2 text-xs"><strong>{x.title||x.type||"Security incident"}</strong><span className="ml-2 text-slate-500">{x.status||"OPEN"} · {x.createdAt?dt(x.createdAt):"—"}</span></div>)}{!securityIncidents.length&&<p className="text-xs text-slate-500">No security incidents returned.</p>}</div></div>
</div></CardContent></Card></section>}

      {tab==="mlops"&&<section className="mt-5 grid gap-4 lg:grid-cols-2"><Card><CardHeader><SectionHeading title="MLOps & data guardrails" description="Anomalies, data-quality gates and model-governance events."/></CardHeader><CardContent><div className="space-y-2">{mlops.slice(0,30).map((x,i)=><div key={x.id||i} className="border border-slate-200 p-3"><div className="flex justify-between gap-3"><b className="text-xs">{x.eventType||"Event"}</b><Badge>{x.status||"Recorded"}</Badge></div><p className="mt-1 text-[11px] text-slate-500">{x.metadata?.reportKey||x.modelKey||"Governed event"}{x.createdAt?" · "+dt(x.createdAt):""}</p></div>)}</div></CardContent></Card><Card><CardHeader><SectionHeading title="Guardrail policy" description="Production data is not silently learned from when validation fails."/></CardHeader><CardContent><p className="text-sm leading-6 text-slate-600">Incoming data should be validated, quarantined when abnormal, surfaced to administrators, and only admitted to score/model baselines after review. This React panel consumes the existing MLOps event stream rather than creating a second rules engine.</p></CardContent></Card></section>}

      {tab==="danger"&&<DangerZone onRun={act}/>}
    </div>
  </main>;
}

function ReportUpload({report,onDone}:{report:any;onDone:()=>Promise<void>}){
  const [file,setFile]=useState<File|null>(null); const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
  if(!report)return <p className="text-sm text-slate-500">Report metadata was not returned by the server.</p>;
  const upload=async()=>{if(!file)return;setBusy(true);setMessage("");try{const fd=new FormData();fd.append("file",file);const r=await fetch("/api/admin/reports/"+encodeURIComponent(report.key)+"/upload",{method:"POST",body:fd,credentials:"same-origin"});const d=await r.json();if(!r.ok)throw new Error(d.error||"Upload failed");setMessage("Upload staged successfully.");await onDone();}catch(e:any){setMessage(e.message||"Upload failed");}finally{setBusy(false);}};
  return <div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-xs"><thead className="bg-slate-50 text-[10px] uppercase text-slate-500"><tr><th className="p-3">Field</th><th className="p-3">Type</th><th className="p-3">Required</th><th className="p-3">Description</th></tr></thead><tbody className="divide-y divide-slate-100">{(report.fields||[]).map((f:any)=><tr key={f.name}><td className="p-3 font-semibold">{f.name}</td><td className="p-3">{f.type}</td><td className="p-3">{f.required?"Yes":"Optional"}</td><td className="p-3">{f.description||"—"}{f.allowed&&<div className="mt-1 text-slate-500">{f.allowed.join(" · ")}</div>}</td></tr>)}</tbody></table></div><div className="mt-5 flex flex-wrap items-center gap-3"><input type="file" accept=".csv,.xlsx,.xls" onChange={(e:ChangeEvent<HTMLInputElement>)=>setFile(e.target.files?.[0]||null)} /><Button disabled={!file||busy} onClick={upload}>{busy?"Uploading…":"Upload & stage"}</Button><Button variant="outline" onClick={()=>window.location.assign("/api/admin/reports/"+encodeURIComponent(report.key)+"/template")}>Download template</Button></div>{message&&<p className="mt-3 text-sm">{message}</p>}</div>;
}
function IntegrationLogs(){const [logs,setLogs]=useState<any[]>([]);useEffect(()=>{api<any[]>("/api/admin/integration/logs").then(x=>setLogs(Array.isArray(x)?x:[])).catch(()=>setLogs([]));},[]);return <Card><CardHeader><SectionHeading title="Integration logs" description="Recent source and sync activity."/></CardHeader><CardContent><div className="space-y-2">{logs.slice(0,20).map((x,i)=><div key={x.id||i} className="border border-slate-200 p-3"><div className="flex justify-between gap-3"><b className="text-xs">{x.status||"Sync"}</b><span className="text-[10px] text-slate-500">{dt(x.createdAt)}</span></div><p className="mt-1 text-[11px] text-slate-500">{x.message||x.mode||"Integration event"}</p></div>)}{!logs.length&&<p className="text-sm text-slate-500">No recent integration logs returned.</p>}</div></CardContent></Card>}

function PartnerRow({partner,users,onSave,onRefresh}:{partner:any;users:any[];onSave:(id:string,b:any)=>void;onRefresh:()=>Promise<void>}){
  const [open,setOpen]=useState(false); const [form,setForm]=useState<any>({displayName:partner.displayName||partner.name||"",primaryColor:partner.primaryColor||"",accentColor:partner.accentColor||"",navyColor:partner.navyColor||"",tagline:partner.tagline||""});
  const [assign,setAssign]=useState("");
  return <div className="border border-slate-200 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><b>{partner.displayName||partner.name}</b><p className="text-xs text-slate-500">{partner.slug||partner.id}</p></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={()=>setOpen(!open)}>{open?"Close":"Edit branding"}</Button></div></div>{open&&<div className="mt-4 grid gap-3 sm:grid-cols-2">{["displayName","primaryColor","accentColor","navyColor","tagline"].map(k=><label key={k} className="text-xs font-semibold text-slate-600">{k}<input value={form[k]||""} onChange={e=>setForm((x:any)=>({...x,[k]:e.target.value}))} className="mt-1 w-full rounded border border-slate-200 px-3 py-2"/></label>)}<div className="sm:col-span-2 flex flex-wrap gap-2"><Button onClick={()=>onSave(partner.id,{...form,primaryColor:String(form.primaryColor).replace(/^#/,""),accentColor:String(form.accentColor).replace(/^#/,""),navyColor:String(form.navyColor).replace(/^#/,"")})}>Save branding</Button><Select value={assign} onChange={e=>setAssign(e.target.value)}><option value="">Assign user…</option>{users.map(u=><option key={u.id} value={u.id}>{u.name||u.email}</option>)}</Select><Button variant="outline" disabled={!assign} onClick={()=>onSave(partner.id,{userId:assign,action:"assign"})}>Assign user</Button></div></div>}</div>;
}
function SectionRow({section,users,onPatch,onGrant,onRevoke}:{section:any;users:any[];onPatch:(k:string,b:any)=>void;onGrant:(k:string,u:string)=>void;onRevoke:(k:string,u:string)=>void}){
  const [user,setUser]=useState(""); const allowed=new Set(section.allowedRoles||[]);
  return <div className="border border-slate-200 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-2 font-semibold"><input type="checkbox" checked={!!section.enabled} onChange={e=>onPatch(section.key,{enabled:e.target.checked})}/>{section.label||section.key}</label><span className="text-xs text-slate-500">{section.enabled?"Visible":"Hidden except authorised grants"}</span></div><div className="mt-3 flex flex-wrap gap-4">{roles.map(r=><label key={r} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={allowed.has(r)} onChange={e=>{const next=new Set(allowed);e.target.checked?next.add(r):next.delete(r);onPatch(section.key,{allowedRoles:[...next]});}}/>{roleLabels[r]}</label>)}</div><div className="mt-3 flex flex-wrap items-center gap-2"><Select value={user} onChange={e=>setUser(e.target.value)}><option value="">Grant access to…</option>{users.map(u=><option key={u.id} value={u.id}>{u.name||u.email}</option>)}</Select><Button size="sm" variant="outline" disabled={!user} onClick={()=>onGrant(section.key,user)}>Grant</Button>{(section.overrides||[]).map((o:any)=><span key={o.userId} className="border border-slate-200 px-2 py-1 text-xs">{o.name||o.email}<button className="ml-2 text-red-700" onClick={()=>onRevoke(section.key,o.userId)} type="button">Remove</button></span>)}</div></div>;
}
function DangerZone({onRun}:{onRun:(label:string,fn:()=>Promise<any>)=>Promise<void>}){
  const [confirm,setConfirm]=useState("");
  return <section className="mt-5"><Card className="border-red-200"><CardHeader><SectionHeading title="Danger zone" description="Legacy reset remains available only behind an explicit confirmation. It does not delete user accounts."/></CardHeader><CardContent><p className="text-sm leading-6 text-slate-600">This operation clears imported/report data according to the backend reset policy. Do not use it against production data during migration testing.</p><input value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Type RESET to enable" className="mt-4 w-full max-w-md rounded border border-slate-200 px-3 py-2"/><div className="mt-3"><Button variant="outline" disabled={confirm!=="RESET"} onClick={()=>onRun("reset",()=>api("/api/admin/reset-all",{method:"POST",body:JSON.stringify({confirm:"RESET"})}))}>Reset imported data</Button></div></CardContent></Card></section>;
}
