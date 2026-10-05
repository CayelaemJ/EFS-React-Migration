import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type Props = {
  me:any;
  data:any;
  period:string;
  range:string;
  site:string;
  income:string;
};

const days=["","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function frequencyLabel(s:any){
  if(s.frequency==="ONCE") return "Once";
  if(s.frequency==="DAILY") return "Daily at "+s.sendTime;
  if(s.frequency==="WEEKLY") return "Weekly · "+(days[s.dayOfWeek]||"")+" "+s.sendTime;
  if(s.frequency==="MONTHLY") return "Monthly · day "+s.dayOfMonth+" · "+s.sendTime;
  return s.frequency||"";
}
function when(v:any){ return v ? new Date(v).toLocaleString("en-ZA",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}) : "—"; }

export function DashboardReporting({me,data,period,range,site,income}:Props){
  const [open,setOpen]=useState(false);
  const [schedules,setSchedules]=useState<any[]>([]);
  const [configured,setConfigured]=useState(true);
  const [busy,setBusy]=useState("");
  const [message,setMessage]=useState("");
  const [form,setForm]=useState<any>({
    name:(data?.employer||"Employer")+" financial wellbeing report",
    employerId:me?.employers?.[0]?.id||"",
    frequency:"WEEKLY",
    sendTime:"08:00",
    timezone:"Africa/Johannesburg",
    dayOfWeek:"1",
    dayOfMonth:"1",
    onceDate:"",
    recipients:"",
  });

  const load=async()=>{
    try{
      const [rows,cfg]=await Promise.all([
        fetch("/api/report-schedules",{credentials:"same-origin",cache:"no-store"}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not load schedules");return Array.isArray(d)?d:[];}),
        fetch("/api/report-schedules/config",{credentials:"same-origin",cache:"no-store"}).then(async r=>r.ok?r.json():({configured:false}))
      ]);
      setSchedules(rows);setConfigured(cfg.configured!==false);
    }catch(e:any){setMessage(e.message||"Could not load scheduled reports");}
  };
  useEffect(()=>{if(open)load();},[open]);

  const save=async()=>{
    try{
      setBusy("save");setMessage("");
      const filters:any={};
      if(period) filters.period=period; else filters.range=range||"all";
      if(site&&site!=="all") filters.site=site;
      if(income&&income!=="all") filters.income=income;
      const recipients=String(form.recipients||"").split(",").map((x:string)=>x.trim()).filter(Boolean);
      const body={...form,filters,employerId:form.employerId||me?.employers?.[0]?.id,recipients,dayOfWeek:form.frequency==="WEEKLY"?Number(form.dayOfWeek):null,dayOfMonth:form.frequency==="MONTHLY"?Number(form.dayOfMonth):null,onceDate:form.frequency==="ONCE"?form.onceDate:null};
      const r=await fetch("/api/report-schedules",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify(body)});
      const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not create schedule");
      setMessage("Report scheduled. Next send: "+when(d.nextRunAt));await load();
    }catch(e:any){setMessage(e.message||"Could not create schedule");}finally{setBusy("");}
  };
  const update=async(id:string,body:any)=>{
    try{setBusy(id);const r=await fetch("/api/report-schedules/"+id,{method:"PATCH",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify(body)});const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not update schedule");await load();}
    catch(e:any){setMessage(e.message||"Could not update schedule");}finally{setBusy("");}
  };
  const sendNow=async(id:string)=>{
    try{setBusy(id);const r=await fetch("/api/report-schedules/"+id+"/send-now",{method:"POST",credentials:"same-origin"});const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not send report");setMessage("Report sent successfully.");await load();}
    catch(e:any){setMessage(e.message||"Could not send report");}finally{setBusy("");}
  };
  const remove=async(id:string)=>{
    if(!window.confirm("Delete this scheduled report?"))return;
    try{setBusy(id);const r=await fetch("/api/report-schedules/"+id,{method:"DELETE",credentials:"same-origin"});const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not delete schedule");await load();}
    catch(e:any){setMessage(e.message||"Could not delete schedule");}finally{setBusy("");}
  };
  const exportPdf=()=>window.print();

  return <div className="mt-4">
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={exportPdf}>Export PDF</Button>
      <Button variant="outline" onClick={()=>setOpen(v=>!v)}>{open?"Close reporting":"Schedule report"}</Button>
    </div>
    {open&&<Card className="mt-4 border-[var(--brand-line)]">
      <CardHeader><CardTitle className="text-lg">Scheduled reports</CardTitle><CardDescription>Reports use the current dashboard filters and the existing Node scheduling/delivery services.</CardDescription></CardHeader>
      <CardContent>
        {!configured&&<div className="mb-4 border-l-4 border-amber-500 bg-amber-50 p-3 text-sm text-amber-900">System email is not configured yet. An administrator must complete System Email & Scheduled Reports before sends can succeed.</div>}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-semibold text-slate-600 lg:col-span-2">Report name<input value={form.name} onChange={e=>setForm((x:any)=>({...x,name:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"/></label>
          <label className="text-xs font-semibold text-slate-600">Employer<select value={form.employerId} onChange={e=>setForm((x:any)=>({...x,employerId:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm">{(me?.employers||[]).map((e:any)=><option key={e.id} value={e.id}>{e.name}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-600">Frequency<select value={form.frequency} onChange={e=>setForm((x:any)=>({...x,frequency:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"><option value="ONCE">Once</option><option value="DAILY">Daily</option><option value="WEEKLY">Weekly</option><option value="MONTHLY">Monthly</option></select></label>
          <label className="text-xs font-semibold text-slate-600">Send time<input type="time" value={form.sendTime} onChange={e=>setForm((x:any)=>({...x,sendTime:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"/></label>
          {form.frequency==="WEEKLY"&&<label className="text-xs font-semibold text-slate-600">Day<select value={form.dayOfWeek} onChange={e=>setForm((x:any)=>({...x,dayOfWeek:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm">{days.slice(1).map((d,i)=><option key={d} value={i+1}>{d}</option>)}</select></label>}
          {form.frequency==="MONTHLY"&&<label className="text-xs font-semibold text-slate-600">Day of month<input type="number" min="1" max="28" value={form.dayOfMonth} onChange={e=>setForm((x:any)=>({...x,dayOfMonth:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"/></label>}
          {form.frequency==="ONCE"&&<label className="text-xs font-semibold text-slate-600">Date<input type="date" value={form.onceDate} onChange={e=>setForm((x:any)=>({...x,onceDate:e.target.value}))} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"/></label>}
          <label className="text-xs font-semibold text-slate-600 sm:col-span-2 lg:col-span-4">Recipients<input value={form.recipients} onChange={e=>setForm((x:any)=>({...x,recipients:e.target.value}))} placeholder="name@company.com, another@company.com" className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"/></label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2"><Button disabled={!!busy||!form.employerId} onClick={save}>{busy==="save"?"Saving…":"Create schedule"}</Button><span className="self-center text-xs text-slate-500">Current filters: {period?"month "+period:range||"programme"}{site&&site!=="all"?" · site "+site:""}{income&&income!=="all"?" · income "+income:""}</span></div>
        {message&&<div className="mt-3 border-l-4 border-[var(--brand-accent)] bg-slate-50 p-3 text-sm">{message}</div>}
        <div className="mt-6 border-t border-slate-200 pt-4"><h3 className="text-sm font-bold">Your scheduled reports</h3>{!schedules.length?<p className="mt-2 text-xs text-slate-500">No scheduled reports yet.</p>:<div className="mt-2 space-y-2">{schedules.map(s=><div key={s.id} className="flex flex-col gap-3 border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between"><div><b className="text-sm">{s.name}</b><span className="ml-2 text-xs text-slate-500">{s.employer?.name||""}</span><small className="mt-1 block text-xs text-slate-500">{frequencyLabel(s)} · {s.active?"next "+when(s.nextRunAt):"paused"}{s.lastStatus==="FAILED"?" · last send failed":""}</small></div><div className="flex flex-wrap gap-1"><Button size="sm" variant="outline" disabled={!!busy} onClick={()=>sendNow(s.id)}>Send now</Button><Button size="sm" variant="outline" disabled={!!busy} onClick={()=>update(s.id,{active:!s.active})}>{s.active?"Pause":"Resume"}</Button><Button size="sm" variant="ghost" disabled={!!busy} onClick={()=>remove(s.id)}>Delete</Button></div></div>)}</div>}</div>
      </CardContent>
    </Card>}
  </div>;
}
