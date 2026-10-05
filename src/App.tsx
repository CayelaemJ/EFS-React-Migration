import { Component, type CSSProperties, type PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "./components/ui/progress";
import { Select } from "./components/ui/select";
import MuiTooltip from "@mui/material/Tooltip";
import "./enterprise.css";
import "./newchanges-dashboard.css";
import "./newchanges-nav.css";
import "./newchanges-dark.css";
import "./newchanges-brand-adapter.css";
import { NewChangesParitySections, PortfolioView } from "./components/NewChangesParitySections";
import { UsersView } from "./components/UsersView";
import { AdminView } from "./components/AdminView";
import { DashboardReporting } from "./components/DashboardReporting";
import { PortalShell } from "./components/PortalShell";
import "./react-portal-nav.css";
type Me = {
  name?: string; email?: string; role?: string;
  employers?: Array<{ id: string; name: string }>;
  sections?: Record<string, boolean>;
  theme?: { name?: string; primaryColor?: string; accentColor?: string; navyColor?: string; logoDataUrl?: string | null; tagline?: string | null };
  modules?: { admin?: boolean; dashboard?: boolean; portfolio?: boolean; users?: boolean };
};

type Dashboard = {
  employer?: string; headcount?: number;
  dataAsOf?: string;
  filterContext?: {
    label?: string; period?: string; range?: string; incomeLabel?: string;
    comparison?: { mode?: string; label?: string; current?: string; previous?: string | null };
  };
  portfolio?: Record<string, number | null>;
  wellness?: { score?: number | null; prior?: number | null; band?: string; complete?: boolean; drivers?: Array<{name:string;score:number|null;weight:number}> };
  exec?: { items?: Array<{l:string;v:string}> };
  kpis?: {
    takeUp?: {pct:number|null; enrolled:number|null; delta:number|null};
    activated?: {pct:number|null; count:number|null; delta:number|null};
    monthlySaving?: {rand:number|null; perHead:number|null; delta:number|null; trend:number[]};
    avgRating?: {val:number|null; responses:number|null; delta:number|null};
  };
  funnel?: Array<{label:string; sub:string; n:number|null; pct:number|null; available:boolean}>;
  valueStrip?: Array<{l:string;v:string;d:string;available:boolean}>;
  income?: Array<{name:string;count:number;color:string}>;
  ratings?: {avg:number|null;fiveStarPct:number|null;responses:number|null};
  comparison?: {current?:{label:string;savings:number[];savingsLabels:string[];monthlySavingRand?:number;totalAdvancedRaw?:number;ewa?:number[];ewaLabels?:string[]};previous?:{label:string;savings:number[];savingsLabels:string[];monthlySavingRand:number;totalAdvancedRaw:number;ewa?:number[];ewaLabels?:string[]}};
  filterOptions?: { sites?:Array<{value:string;label:string}>; incomes?:Array<{value:string;label:string}> };
  outcomes?: Array<{key:string;name:string;count:number;stat:string;statL:string;avgPerEmployee:string;trend?:number[];delta?:number|null}>;
  creditors?: Array<{name:string;accounts:number;balance:string;avg:string;stateBreakdown?:Array<{label:string;count:number;pct:number}>}>;
  creditorsTotal?: {accounts:number;balance:string};
  debtStates?: {active?:{rand:number;employees:number};challenged?:{rand:number;employees:number};guided?:{rand:number;employees:number}};
  ewa?: {totalRaw?:number; total?:string; trend?:number[]; trendLabels?:string[]; advances?:number; clients?:number; avg?:string; perClient?:number};
  referral?: {shares?:number; shareRate?:number; channel?:string; impliedReach?:string};
  riskSignals?: Array<{sig:string;n:number;sev:string;note:string}>;
  opportunities?: {cards?:Array<{name:string;eligible:number;saving:string;extra?:string;icon?:string}>;estMonthly?:string;estAnnual?:string;valueLabel?:string;valueNote?:string};
  savings?: number[];
  savingsLabels?: string[];
  dataQuality?: {scoreReady:boolean;warnings?:string[]};
};

const roleLabels: Record<string,string> = {
  SUPERADMIN:"Super Admin", ADMIN:"Admin", EMPLOYER_MANAGER:"Employer Manager",
  PORTFOLIO_MANAGER:"Portfolio Manager", VIEWER:"Viewer"
};
const money = (n:number|null|undefined) => n == null ? "Not available" : new Intl.NumberFormat("en-ZA",{style:"currency",currency:"ZAR",maximumFractionDigits:0}).format(n);
const number = (n:number|null|undefined) => n == null ? "Not available" : new Intl.NumberFormat("en-ZA").format(n);
const pct = (n:number|null|undefined) => n == null ? "Not available" : `${n.toFixed(1)}%`;
const api = async <T,>(url:string, init:RequestInit = {}):Promise<T> => {
  const r=await fetch(url,{credentials:"same-origin",cache:"no-store",signal:init.signal ?? AbortSignal.timeout(15_000),...init});
  if(!r.ok) throw new Error((await r.json().catch(()=>({}))).error || "Request failed");
  return r.json();
};

function normaliseHex(value?: string | null, fallback = "#5f756d") {
  if (!value) return fallback;
  const hex = value.startsWith("#") ? value : "#" + value;
  return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : fallback;
}

function deriveChartPalette(accentColor:string,primaryColor:string):Record<string,string> {
  const defs:Record<string,[number,number,number]>={engagement:[150,.50,.78],cashflow:[175,.58,.70],debt:[25,.50,.62],insurance:[285,.48,.78],workforce:[205,.54,.72],low:[150,.58,.68],mid:[65,.58,.62],high:[5,.55,.62]};
  const a=parseInt(accentColor.replace(/^#/,""),16)||0;
  const r=(a>>16)&255,g=(a>>8)&255,b=a&255;
  const hue=((r-b+360)%360); const base=Math.min(Math.max((Math.max(r,g,b)-Math.min(r,g,b))/255,.055),.16);
  const out:Record<string,string>={};
  Object.entries(defs).forEach(([key,[offset,,scale]])=>{
    const c=base*scale, light=.50, h=((hue+offset)%360)/60, x=c*(1-Math.abs(h%2-1)), m=light-c/2;
    const rgb=h<1?[c,x,0]:h<2?[x,c,0]:h<3?[0,c,x]:h<4?[0,x,c]:h<5?[x,0,c]:[c,0,x];
    const to=(v:number)=>Math.round((v+m)*255).toString(16).padStart(2,"0"); out[key]="#"+to(rgb[0])+to(rgb[1])+to(rgb[2]);
  }); return out;
}
function LineChart({values,labels,previous=[],previousLabels=[],currentLabel="Selected period",previousLabel="Previous period",prefix="R "}:{values:number[];labels:string[];previous?:number[];previousLabels?:string[];currentLabel?:string;previousLabel?:string;prefix?:string}) {
  const current=values.map(Number).filter(Number.isFinite);
  const prior=previous.map(Number).filter(Number.isFinite);
  if(!current.length&&!prior.length) return <div className="muted comparison-empty">No data is available for this period.</div>;
  const n=Math.max(current.length,prior.length,1);
  const align=(arr:number[])=>Array.from({length:n},(_,i)=>arr[i-(n-arr.length)]??null);
  const a=align(current), b=align(prior);
  const all=[...a,...b].filter((v):v is number=>v!==null);
  const min=Math.min(...all,0), max=Math.max(...all,1), span=Math.max(max-min,1);
  const w=720,h=230,left=42,right=16,top=18,bottom=38;
  const point=(v:number|null,i:number)=>v===null?null:[left+(n===1?(w-left-right)/2:i/(n-1)*(w-left-right)),top+(1-(v-min)/span)*(h-top-bottom)];
  const path=(arr:Array<number|null>)=>arr.map((v,i)=>{const p=point(v,i);return p ? `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}` : null}).filter(Boolean).join(" ");
  const currentPath=path(a), priorPath=path(b);
  const labelsForChart=labels.length?labels:previousLabels;
  const latest=current.at(-1);
  const priorLatest=prior.at(-1);
  const delta=latest!=null&&priorLatest!=null?latest-priorLatest:null;
  const deltaPct=delta!=null&&priorLatest!==0?(delta/Math.abs(priorLatest))*100:null;
  const latestPoint=latest==null?null:point(a.at(-1)??null,n-1);
  const trendDirection=delta==null?"No prior comparison":delta>0?"Up vs prior":delta<0?"Down vs prior":"Flat vs prior";
  return <div className="comparison-chart">
    <div className="chart-headline">
      <div><span className="chart-kicker">Trend</span><strong>{latest!=null?prefix+number(latest):"Not available"}</strong></div>
      <div className={`chart-change ${delta==null?"neutral":delta>0?"positive":"negative"}`}><span>{trendDirection}</span>{deltaPct!=null&&<b>{deltaPct>0?"+":""}{deltaPct.toFixed(1)}%</b>}</div>
    </div>
    <div className="comparison-value-row">
      <div className="comparison-value-card previous"><span className="comparison-value-period">{previousLabel}</span><strong>{prior.length?prefix+number(prior[prior.length-1]):"Not available"}</strong></div>
      <div className="comparison-value-card current"><span className="comparison-value-period">{currentLabel}</span><strong>{current.length?prefix+number(current[current.length-1]):"Not available"}</strong></div>
    </div>
    <div className="comparison-legend"><span><i className="comparison-dot current"></i>{currentLabel}</span><span><i className="comparison-dot previous"></i>{previousLabel}</span></div>
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${currentLabel} compared with ${previousLabel}`} className="w-full" preserveAspectRatio="none">
      <line x1={left} x2={w-right} y1={h-bottom} y2={h-bottom} stroke="var(--line)" />
      <line x1={left} x2={w-right} y1={top+(h-top-bottom)/2} y2={top+(h-top-bottom)/2} stroke="var(--line-soft)" />
      {priorPath&&<path d={priorPath} fill="none" stroke="var(--grey-l)" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" strokeLinejoin="round" />}
      {currentPath&&<path d={currentPath} fill="none" stroke="var(--chart-cashflow,var(--brand-accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
      {a.map((v,i)=>{const p=point(v,i);return p?<circle key={`c${i}`} cx={p[0]} cy={p[1]} r={i===a.length-1?5:3.5} fill="var(--chart-cashflow,var(--brand-accent))" />:null})}
      {b.map((v,i)=>{const p=point(v,i);return p?<circle key={`p${i}`} cx={p[0]} cy={p[1]} r="3" fill="var(--grey-l)" />:null})}
      {latestPoint&&<text className="comparison-last-value" x={Math.min(latestPoint[0],w-right)} y={Math.max(top+10,latestPoint[1]-10)} textAnchor={latestPoint[0]>w-100?"end":"middle"} fontSize="11" fontWeight="800" fill="var(--brand-primary)">{prefix}{number(latest)}</text>}
      {labelsForChart.map((label,i)=>{const x=n===1?(w-left-right)/2+left:left+i/(Math.max(labelsForChart.length-1,1))*(w-left-right);return <text key={i} x={x} y={h-12} textAnchor={i===0?"start":i===labelsForChart.length-1?"end":"middle"} fontSize="10" fontWeight="800" fill={i===labelsForChart.length-1?"var(--brand-primary)":"var(--grey-l)"}>{label}</text>})}
    </svg>
  </div>;
}
function SectionHeading({title,description}:{title:string;description?:string}) {
  return <div className="mb-4 border-b border-slate-200 pb-3"><CardTitle>{title}</CardTitle>{description&&<CardDescription className="mt-1">{description}</CardDescription>}</div>;
}

function WellnessGauge({score}:{score:number|null|undefined}) {
  if(score==null || !Number.isFinite(Number(score))) return <div className="wellness-gauge-empty">Not available</div>;
  const value=Math.max(0,Math.min(100,Number(score)));
  return <svg viewBox="0 0 160 96" width="180" className="wellness-gauge" role="img" aria-label={`Workforce Financial Wellness Score ${value} out of 100`}>
    <path d="M16 88 A64 64 0 0 1 144 88" fill="none" stroke="var(--ice-2)" strokeWidth="13" strokeLinecap="round"/>
    <path d="M16 88 A64 64 0 0 1 144 88" fill="none" stroke="var(--chart-engagement,var(--brand-accent))" strokeWidth="13" strokeLinecap="round" pathLength="100" strokeDasharray={`${value} ${100-value}`} strokeDashoffset="0"/>
    <text x="80" y="74" textAnchor="middle" fontFamily="Fraunces,serif" fontSize="34" fontWeight="600" fill="var(--brand-primary)">{value.toFixed(0)}</text>
    <text x="80" y="90" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--grey-l)">/ 100</text>
  </svg>;
}

function DashboardView({me}:{me:Me}) {
  const [data,setData]=useState<Dashboard|null>(null);
  const [period,setPeriod]=useState("");
  const [darkMode,setDarkMode]=useState(false); const [range,setRange]=useState<"latest"|"quarter"|"all">("latest");
  const [income,setIncome]=useState("all"); const [site,setSite]=useState("all"); const [periodOptions,setPeriodOptions]=useState<string[]>([]);
  const [selectedEmployerId,setSelectedEmployerId]=useState(me.employers?.[0]?.id??""); const [showPortfolio,setShowPortfolio]=useState(false); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
  const employer=me.employers?.find(e=>e.id===selectedEmployerId)??me.employers?.[0];
  const brandPrimary = normaliseHex(me.theme?.primaryColor, "#214b45");
  const brandNavy = normaliseHex(me.theme?.navyColor, "#173a36");
  const brandAccent = normaliseHex(me.theme?.accentColor, "#8a6f3d");
  const chartPalette = useMemo(() => deriveChartPalette(brandAccent,brandPrimary), [brandAccent,brandPrimary]);
  const themeStyle: CSSProperties = {
    "--brand-primary": brandPrimary,
    "--brand-primary-deep": brandNavy,
    "--brand-navy": brandNavy,
    "--brand-accent": brandAccent,
    "--brand-accent-soft": "color-mix(in srgb, " + brandAccent + " 10%, transparent)",
    "--brand-soft": "color-mix(in srgb, " + brandPrimary + " 7%, transparent)",
    "--blue": brandAccent,
    "--blue-d": brandAccent,
    ...Object.fromEntries(Object.entries(chartPalette).map(([key,value]) => [`--chart-${key.replace(/^--chart-/,"")}`, value]))
  } as CSSProperties;

  const query=useMemo(()=>{const p=new URLSearchParams();if(period)p.set("period",period);else p.set("range",range);if(income!=="all")p.set("income",income);if(site!=="all")p.set("site",site);return p.toString()},[period,range,income,site]);

  useEffect(()=>{
    if(!employer) return;
    const controller=new AbortController();
    setLoading(true); setError("");
    const url="/api/employers/"+encodeURIComponent(employer.id)+"/dashboard?"+query;
    api<Dashboard>(url,{signal:controller.signal}).then(setData).catch(e=>{
      if(e?.name !== "AbortError") setError(e.message);
    }).finally(()=>{ if(!controller.signal.aborted) setLoading(false); });
    return ()=>controller.abort();
  },[query,employer?.id]);
  useEffect(()=>{if(!employer?.id)return;api<string[]>(`/api/employers/${encodeURIComponent(employer.id)}/periods`).then(rows=>setPeriodOptions(Array.isArray(rows)?rows:[])).catch(()=>setPeriodOptions([]));},[employer?.id]);

  if(!employer)return <Card className="mx-auto mt-20 max-w-2xl"><CardHeader><CardTitle>No employer data available</CardTitle><CardDescription>Your authenticated role has no employer assignment.</CardDescription></CardHeader></Card>;
  if(loading)return <Card className="mx-auto mt-20 max-w-2xl"><CardContent className="py-12 text-center text-sm text-slate-500">Loading governed dashboard data...</CardContent></Card>;
  if(error)return <Card className="mx-auto mt-20 max-w-2xl border-red-200"><CardContent className="py-10"><div className="flex gap-3"><span className="text-xs font-bold uppercase tracking-widest text-red-700">Error</span><div><p className="font-semibold text-red-700">Dashboard unavailable</p><p className="mt-1 text-sm text-slate-600">{error}</p></div></div></CardContent></Card>;
  if(!data)return null;
  if(showPortfolio) return <PortfolioView employers={me.employers||[]} theme={{primary:brandPrimary,accent:brandAccent,navy:brandNavy}} onBack={()=>setShowPortfolio(false)}/>;

  const comparison=data.filterContext?.comparison;
  const currentSaving=data.comparison?.current?.monthlySavingRand??data.kpis?.monthlySaving?.rand??0;
  const previousSaving=data.comparison?.previous?.monthlySavingRand??0;
  const savingDelta=currentSaving-previousSaving;
  const trend=data.comparison?.current?.savings??data.kpis?.monthlySaving?.trend??data.savings??[];
  const trendLabels=data.comparison?.current?.savingsLabels??data.savingsLabels??[];
  const advancedTrend=data.comparison?.current?.ewa??data.ewa?.trend??[];
  const advancedLabels=data.comparison?.current?.ewaLabels??data.ewa?.trendLabels??[];
  const incomeOptions=data.filterOptions?.incomes??[];
  const role=roleLabels[me.role??""]??me.role??"User";
  const maxIncome=Math.max(1,...(data.income??[]).map(x=>x.count));

  return <main className={darkMode?"dashboard-shell portal-dark":"dashboard-shell"} style={themeStyle}>
    <div className="topbar">
      <div className="topbar-inner">
        <div className="logo"><span className="logo-mark" aria-hidden="true">EF</span><span className="logo-text">{me.theme?.name||"empower-fin"}</span></div>
        <div className="topbar-divider" />
        <div className="audience-switch"><button className="on" type="button" onClick={()=>setShowPortfolio(false)}>Employer view</button>{me.employers&&me.employers.length>1&&<button type="button" onClick={()=>setShowPortfolio(true)}>Portfolio view</button>}</div>
        <div className="topbar-spacer" />
        <div className="topbar-meta">
          <div className="data-fresh"><span className="dot" /><span>Live dashboard</span></div>
          <MuiTooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"} arrow><button type="button" className="portal-theme-quick" aria-label={darkMode?"Switch to light mode":"Switch to dark mode"} onClick={()=>setDarkMode(v=>!v)}>{darkMode?"☀":"☾"}</button></MuiTooltip>
          <div className="nav-who"><span className="nav-emp">{me.name||me.email||"User"}</span><span className="avatar">{(me.name||me.email||"U").slice(0,1).toUpperCase()}</span></div>
        </div>
      </div>
    </div>
    <div className="wrap">
      <header className="portal-header flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div><div className="head-eyebrow">Employer Insights · Financial Wellbeing Programme</div><h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-[var(--brand-primary)] sm:text-4xl">Your workforce <span className="emp">{data.employer}</span></h1></div>
        <div className="brand-context" aria-label="Active brand theme"><div className="brand-context-copy"><span className="brand-context-kicker">Brand Engine</span><strong>{me.theme?.name||"empower-fin"}</strong><small>{me.theme?.tagline||"Tenant theme active"}</small></div><div className="brand-swatches" aria-hidden="true"><i style={{background:brandPrimary}}/><i style={{background:brandAccent}}/><i style={{background:brandNavy}}/></div><div className="brand-context-user"><span className="avatar">{(me.name||me.email||"U").slice(0,1).toUpperCase()}</span><span><b>{me.name||me.email}</b><small>{role}</small></span></div></div>
      </header>

      <section className="filters">
        <div className="flex flex-wrap gap-1 rounded-md bg-slate-100 p-1">
          {([["latest","Latest"],["quarter","Quarter"],["all","Programme"]] as const).map(([key,label])=><Button key={key} size="sm" variant={!period&&range===key?"default":"ghost"} onClick={()=>{setPeriod("");setRange(key)}}>{label}</Button>)}
        </div>
        <Select label="Month" value={period} onChange={e=>{setPeriod(e.target.value);if(e.target.value)setRange("latest")}}><option value="">Select month</option>{periodOptions.map(m=><option key={m} value={m}>{new Date(m+"-01T00:00:00Z").toLocaleDateString("en-ZA",{month:"long",year:"numeric",timeZone:"UTC"})}</option>)}</Select>
        {data.filterOptions?.sites?.length?<Select label="Site" value={site} onChange={e=>setSite(e.target.value)}><option value="all">All sites</option>{data.filterOptions.sites.map(v=><option key={v.value} value={v.value}>{v.label}</option>)}</Select>:null}
        <Select label="Income band" value={income} onChange={e=>setIncome(e.target.value)}><option value="all">All income bands</option>{incomeOptions.map(v=><option key={v.value} value={v.value}>{v.label}</option>)}</Select>
        {comparison?.current&&<div className="text-xs text-slate-500 lg:ml-auto">Comparing <span className="font-bold text-[var(--brand-accent)]">{comparison.current}</span>{comparison.previous&&<> with <span className="font-bold text-[var(--brand-accent)]">{comparison.previous}</span></>}</div>}
      </section>

      <section className="executive-story" aria-label="Executive insight">
        {(() => {
          const score=Number(data.wellness?.score), prior=Number(data.wellness?.prior);
          const delta=Number.isFinite(score)&&Number.isFinite(prior)?score-prior:null;
          const saving=Number(data.comparison?.current?.monthlySavingRand??data.kpis?.monthlySaving?.rand);
          const ewa=Number(data.comparison?.current?.totalAdvancedRaw??data.ewa?.totalRaw);
          const lead=[...(data.wellness?.drivers??[])].filter(d=>Number.isFinite(Number(d.score))).sort((a,b)=>Number(a.score)-Number(b.score))[0];
          const verdict=data.wellness?.complete===false||!Number.isFinite(score)?"Data incomplete":score>=75?"Strong position":score>=60?"On track":"Needs attention";
          const deltaText=delta===null?"No prior score":`${delta>0?"+":""}${delta.toFixed(0)} pts vs ${comparison?.previous||"prior period"}`;
          const narrative=Number.isFinite(score)
            ? `The workforce is currently at ${score}/100. ${Number.isFinite(saving)?money(saving)+" in monthly cashflow is being restored. ":""}${Number.isFinite(ewa)?money(ewa)+" was advanced through early wage access. ":""}${lead?.name?"The clearest opportunity is "+lead.name.toLowerCase()+".":""}`
            : "More governed data is required to produce a reliable executive view.";
          const weakest=lead?.name||"No clear priority";
          const cashText=Number.isFinite(saving)?money(saving):"Not available";
          const ewaText=Number.isFinite(ewa)?money(ewa):"Not available";
          const nextText=verdict==="Needs attention"?weakest:verdict==="Data incomplete"?"Review data quality":"Maintain momentum";
          return <div className="executive-story-grid">
            <div className="executive-story-label"><span>Executive insight</span><small>{data.filterContext?.label||"Programme to date"}</small></div>
            <div className="executive-score"><strong>{Number.isFinite(score)?score:"—"}</strong><span>/100</span><small>{deltaText}</small></div>
            <div className="executive-narrative">
              <div className="executive-narrative-copy">
                <p>{narrative}</p>
                <div className="executive-detail-row">
                  <div className="executive-detail"><span>Cashflow restored</span><strong>{cashText}</strong></div>
                  <div className="executive-detail"><span>EWA advanced</span><strong>{ewaText}</strong></div>
                  <div className="executive-detail"><span>Next focus</span><strong>{nextText}</strong></div>
                </div>
              </div>
              <div className={`executive-verdict ${verdict==="Needs attention"?"attention":verdict==="Data incomplete"?"incomplete":""}`}>{verdict}</div>
            </div>
          </div>;
        })()}
      </section>
      <div className="exec-band reveal">
        <div className="exec-head">
          <div className="exec-marker" aria-hidden="true">01</div>
          <div><div className="exec-title">Financial wellbeing impact summary</div><div className="exec-sub">{data.filterContext?.label||"Programme to date"} · at a glance</div></div>
          <div className={`exec-verdict ${data.wellness?.complete===false||data.wellness?.score==null?"is-incomplete":""}`}>
            {data.wellness?.complete===false||data.wellness?.score==null?"Data incomplete":Number(data.wellness.score)>=75?"Strong":Number(data.wellness.score)>=60?"On track":"Needs attention"}
          </div>
        </div>
        <div className="exec-grid">
          {(data.exec?.items?.length ? data.exec.items : [
            {l:"Employees enrolled",v:number(data.kpis?.takeUp?.enrolled)},
            {l:"Monthly cashflow restored",v:money(data.kpis?.monthlySaving?.rand)},
            {l:"Employees better off",v:number(data.outcomes?.reduce((n,o)=>n+(Number(o.count)||0),0))},
            {l:"Employee satisfaction",v:data.ratings?.avg==null?"Not available":`${data.ratings.avg.toFixed(1)}/5`},
            {l:"Financial wellbeing score",v:data.wellness?.score==null?"Not available":`${data.wellness.score}/100`},
            {l:"Data quality",v:data.dataQuality?.scoreReady?"Score ready":"Review required"}
          ]).slice(0,6).map((item,i)=><div className="exec-item" key={item.l+i}><span aria-hidden="true" className="exec-check">✓</span><div><div className="exec-v">{item.v}</div><div className="exec-l">{item.l}</div></div></div>)}
        </div>
      </div>

      <section className="card reveal wellness-card section-gap" style={{animationDelay:".04s"}}>
        <div className="card-hd"><div><div className="card-title">Workforce Financial Wellness Score</div><div className="card-note">The single number that tracks your people's financial health and its trajectory</div></div><span className="card-tag">Index · modelled</span></div>
        <div className="wellness-inner">
          <div className="wellness-left">
            <WellnessGauge score={data.wellness?.score}/>
            <div className="wellness-band">{data.wellness?.band||"Unavailable"}</div>
            <div className="wellness-delta">{data.wellness?.prior==null||data.wellness?.score==null?"No prior period":`${data.wellness.score-data.wellness.prior>0?"+":""}${(data.wellness.score-data.wellness.prior).toFixed(0)} pts vs ${comparison?.previous||"previous period"}`}</div>
            <div className="wellness-note">A composite of four weighted drivers. Use it to track workforce financial health over time.</div>
          </div>
          <div className="wellness-right">{(data.wellness?.drivers||[]).map(d=><div className="wd-row" key={d.name}><div className="wd-name">{d.name}<small>{Math.round(d.weight*100)}% weight</small></div><div className="wd-track"><div className="wd-fill" style={{width:`${Math.max(0,Math.min(100,d.score??0))}%`,background:d.score==null?"var(--brand-soft)":"var(--chart-low)"}}/></div><div className="wd-val">{d.score==null?"Not available":d.score.toFixed(0)}</div></div>)}</div>
        </div>
      </section>
      <section className="grid g-4 section-gap">
        {[
          ["Employees enrolled",number(data.kpis?.takeUp?.enrolled),`${pct(data.kpis?.takeUp?.pct)} take-up`],
          ["Employees activated",number(data.kpis?.activated?.count),`${pct(data.kpis?.activated?.pct)} of workforce`],
          ["Monthly cash freed up",money(data.kpis?.monthlySaving?.rand),savingDelta===0?"No prior comparison":`${savingDelta>=0?"+":""}${money(savingDelta)} vs prior`],
          ["Employee rating",data.kpis?.avgRating?.val==null?"Not available":`${data.kpis.avgRating.val.toFixed(1)}/5`,`${number(data.kpis?.avgRating?.responses)} responses`]
        ] .map(([label,value,sub], index)=><Card key={label as string} className="portal-kpi"><CardContent className="p-5"><div className="flex items-center justify-between"><span className="portal-kpi-label text-xs font-semibold text-slate-500">{label as string}</span><span className="portal-kpi-index">0{index + 1}</span></div><p className="portal-number portal-kpi-value mt-3 break-words text-2xl font-bold tracking-tight text-[var(--brand-ink-strong)] sm:text-3xl">{value as string}</p><p className="mt-1 text-[11px] text-slate-500">{sub as string}</p></CardContent></Card>)}
      </section>

      <section className="grid g-12 section-gap">
        <Card style={{gridColumn:"span 7"}}><CardHeader><SectionHeading title="From enrolled to better off" description="The journey every employee can take and where they are on it."/></CardHeader><CardContent><div className="funnel">{(data.funnel||[]).map(row=><div className="funnel-row" key={row.label}><div className="funnel-lbl">{row.label}<small>{row.sub}</small></div><div className="funnel-bar-bg"><div className="funnel-bar" style={{width:`${row.pct??0}%`,background:"var(--brand-accent)"}}>{row.pct!=null?`${row.pct}%`:""}</div></div><div className="funnel-val">{number(row.n)}</div></div>)}</div></CardContent></Card>
        <Card style={{gridColumn:"span 5"}}><CardHeader><SectionHeading title="Financial problems resolved" description="Completed fixes and the value created."/></CardHeader><CardContent><div>{(data.outcomes||[]).slice(0,6).map(row=><div className="outcome" key={row.key}><div className="outcome-ico">{row.name.slice(0,1)}</div><div><div className="outcome-name">{row.name}</div><div className="outcome-meta">{row.avgPerEmployee||row.statL}</div></div><div className="outcome-stat"><div className="v">{number(row.count)}</div><div className="l">{row.statL}</div></div></div>)}</div></CardContent></Card>
      </section>

      <section className="dash-section" data-section="valueDelivered">
        <div className="head" style={{padding:"36px 0 14px"}}>
          <div><div className="head-eyebrow">The bottom line</div><h1 style={{fontSize:27}}>Value delivered to your people</h1></div>
        </div>
        <div className="stat-strip">
          {(data.valueStrip||[]).map(row=><div className="stat-cell" key={row.l}><div className="l">{row.l}</div><div className="v">{row.v}</div><div className="d">{row.d}</div></div>)}
        </div>
        <div className="grid g-12 section-gap">
          <Card style={{gridColumn:"span 5"}} className="value-card"><CardHeader><SectionHeading title="Monthly cash freed up" description="Recurring savings unlocked, cumulative run-rate."/></CardHeader><CardContent><div className="metric-deck"><div className="metric-primary"><span>Current run-rate</span><strong>{money(currentSaving)}</strong><small>{savingDelta===0?"No prior comparison":(savingDelta>=0?"+":"")+money(savingDelta)+" vs prior"}</small></div><div className="metric-secondary"><span>Per employee</span><strong>{money(data.kpis?.monthlySaving?.perHead)}</strong><small>monthly saving</small></div></div><LineChart values={trend} labels={trendLabels} previous={data.comparison?.previous?.savings??[]} previousLabels={data.comparison?.previous?.savingsLabels??[]} currentLabel={data.comparison?.current?.label||comparison?.current||"Selected period"} previousLabel={data.comparison?.previous?.label||comparison?.previous||"Previous period"}/></CardContent></Card>
          <Card style={{gridColumn:"span 7"}}><CardHeader><SectionHeading title="Debt Pressure Profile" description="Where your people's arrears sit by intervention state, then by creditor."/></CardHeader><CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {[["Active intervention",data.debtStates?.active],["Prescription challenged",data.debtStates?.challenged],["Self-guided",data.debtStates?.guided]].map(([label,row])=><div className="stat-cell" key={label as string}><div className="l">{label as string}</div><div className="v">{money((row as any)?.rand)}</div><div className="d">{number((row as any)?.employees)} employees</div></div>)}
            </div>
            <div className="mt-4">{(data.creditors||[]).slice(0,6).map(row=><div className="outcome" key={row.name}><div className="outcome-ico">{row.name.slice(0,1)}</div><div><div className="outcome-name">{row.name}</div><div className="outcome-meta">{number(row.accounts)} accounts · {row.avg} average</div></div><div className="outcome-stat"><div className="v">{row.balance}</div><div className="l">Balance</div></div></div>)}</div>
          </CardContent></Card>
        </div>
      </section>

      <section className="dash-section" data-section="earlyWageAccess">
        <div className="head" style={{padding:"36px 0 14px"}}>
          <div><div className="head-eyebrow">On-demand pay</div><h1 style={{fontSize:27}}>Early Wage Access</h1><div className="head-sub">How many employees are drawing earned wages early, and how much.</div></div>
        </div>
        <div className="grid g-12 section-gap">
          <Card style={{gridColumn:"span 12"}} className="ewa-card"><CardHeader><SectionHeading title="Total advanced per month" description="Finalised advances only · monthly run-rate."/></CardHeader><CardContent><div className="metric-deck ewa-metric-deck"><div className="metric-primary"><span>Current advance volume</span><strong>{money(data.comparison?.current?.totalAdvancedRaw??data.ewa?.totalRaw)}</strong><small>{data.ewa?.advances==null?"Not available":number(data.ewa.advances)+" advances in the period"}</small></div><div className="metric-secondary"><span>Employees using EWA</span><strong>{number(data.ewa?.clients)}</strong><small>{data.ewa?.avg||"Not available"} average advance</small></div><div className="metric-secondary"><span>Average per client</span><strong>{money(data.ewa?.perClient)}</strong><small>earned wage access</small></div></div><LineChart values={advancedTrend} labels={advancedLabels} previous={data.comparison?.previous?.ewa??[]} previousLabels={data.comparison?.previous?.ewaLabels??[]} currentLabel={data.comparison?.current?.label||comparison?.current||"Selected period"} previousLabel={data.comparison?.previous?.label||comparison?.previous||"Previous period"}/></CardContent></Card>
        </div>
      </section>
      <DashboardReporting me={me} data={data} period={period} range={range} site={site} income={income}/>
      <NewChangesParitySections data={data}/>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><SectionHeading title="Workforce funnel"/></CardHeader><CardContent><div className="grid gap-4">{(data.funnel||[]).map(row=><div className="grid grid-cols-[minmax(105px,1fr)_minmax(70px,2fr)_55px] items-center gap-3" key={row.label}><div><b className="text-xs">{row.label}</b><small className="mt-1 block text-[9px] text-slate-500">{row.sub}</small></div><Progress value={row.pct??0}/><strong className="text-right text-xs text-[var(--brand-ink-strong)]">{number(row.n)}</strong></div>)}</div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Activated employees by income band"/></CardHeader><CardContent><div className="grid gap-4">{(data.income||[]).map(row=><div className="grid grid-cols-[minmax(100px,1fr)_minmax(70px,2fr)_45px] items-center gap-3" key={row.name}><span className="text-xs">{row.name}</span><Progress value={row.count/maxIncome*100}/><strong className="text-right text-xs text-[var(--brand-ink-strong)]">{number(row.count)}</strong></div>)}</div></CardContent></Card>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><SectionHeading title="Financial problems resolved by creditor"/></CardHeader><CardContent><div className="divide-y divide-slate-100">{(data.creditors||[]).slice(0,8).map(row=><div className="grid grid-cols-[1fr_auto] gap-2 py-3" key={row.name}><div><b className="text-xs">{row.name}</b><small className="mt-1 block text-[10px] text-slate-500">{number(row.accounts)} accounts · {row.avg} average</small></div><strong className="break-words text-right text-sm text-[var(--brand-ink-strong)]">{row.balance}</strong><span className="col-span-2 text-[9px] text-slate-400">{(row.stateBreakdown||[]).map(s=>`${s.label}: ${number(s.count)}`).join(" · ")||"No state detail"}</span></div>)}</div>{data.creditorsTotal&&<div className="mt-3 flex justify-between gap-3 border-t border-slate-200 pt-3 text-xs"><span>Total in arrears journey</span><strong className="text-[var(--brand-ink-strong)]">{data.creditorsTotal.balance}</strong></div>}</CardContent></Card>
        <Card><CardHeader><SectionHeading title="Intervention states"/></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-3">{[["Active intervention",data.debtStates?.active],["Prescription challenged",data.debtStates?.challenged],["Self-guided",data.debtStates?.guided]].map(([label,row])=><div className="rounded-md border border-slate-200 bg-slate-50 p-4" key={label as string}><strong className="block break-words text-lg text-[var(--brand-ink-strong)]">{money((row as any)?.rand)}</strong><span className="mt-1 block text-[10px] font-bold">{label as string}</span><small className="mt-1 block text-[9px] text-slate-500">{number((row as any)?.employees)} employees</small></div>)}</div></CardContent></Card>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card><CardHeader><SectionHeading title="Employee referrals" description="Organic sharing generated by completed journeys."/></CardHeader><CardContent><div className="grid grid-cols-2 gap-3"><div className="rounded-md bg-slate-50 p-4"><span className="text-[10px] text-slate-500">Shares</span><strong className="mt-1 block text-2xl text-[var(--brand-ink-strong)]">{number(data.referral?.shares)}</strong></div><div className="rounded-md bg-slate-50 p-4"><span className="text-[10px] text-slate-500">Share rate</span><strong className="mt-1 block text-2xl text-[var(--brand-ink-strong)]">{pct(data.referral?.shareRate)}</strong></div></div><div className="mt-3 flex flex-wrap gap-2 text-xs"><Badge>Top channel: {data.referral?.channel && data.referral.channel !== "—" ? data.referral.channel : "Not available"}</Badge><Badge>Reach: {data.referral?.impliedReach ?? "Not available"}</Badge></div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Early Wage Access" description="Usage and advance activity in the selected reporting view."/></CardHeader><CardContent><div className="grid grid-cols-2 gap-3"><div className="rounded-md bg-slate-50 p-4"><span className="text-[10px] text-slate-500">Advances</span><strong className="mt-1 block text-2xl text-[var(--brand-ink-strong)]">{number(data.ewa?.advances)}</strong></div><div className="rounded-md bg-slate-50 p-4"><span className="text-[10px] text-slate-500">Employees</span><strong className="mt-1 block text-2xl text-[var(--brand-ink-strong)]">{number(data.ewa?.clients)}</strong></div></div><div className="mt-3 text-xs text-slate-600">Average advance <strong className="text-[var(--brand-ink-strong)]">{data.ewa?.avg ?? "Not available"}</strong> · {data.ewa?.perClient == null ? "Not available" : data.ewa.perClient.toFixed(1) + " advances per employee"}</div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Financial risk signals" description="Observed exposures requiring review."/></CardHeader><CardContent><div className="space-y-2">{(data.riskSignals||[]).slice(0,5).map(signal=><div key={signal.sig} className="flex items-start justify-between gap-3 rounded-md border border-slate-200 p-3"><div className="min-w-0"><b className="block break-words text-xs">{signal.sig}</b><span className="mt-1 block text-[10px] leading-4 text-slate-500">{signal.note}</span></div><div className="shrink-0 text-right"><strong className="text-sm text-[var(--brand-ink-strong)]">{number(signal.n)}</strong><Badge className="mt-1">{signal.sev}</Badge></div></div>)}{!data.riskSignals?.length && <p className="text-xs text-slate-500">No active signals in this view.</p>}</div></CardContent></Card>
      </section>
      <section className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <Card><CardHeader><SectionHeading title="Opportunities identified" description="Employees and value associated with the next wave of action."/></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2">{(data.opportunities?.cards||[]).map(card=><div key={card.name} className="rounded-md border border-slate-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><b className="text-xs leading-5">{card.name}</b><Badge>{number(card.eligible)} eligible</Badge></div><p className="mt-2 text-[10px] leading-4 text-slate-500">{card.extra || card.saving}</p></div>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-md bg-[var(--brand-accent-soft)] p-4"><span className="text-[10px] font-semibold text-[var(--brand-accent)]">{data.opportunities?.valueLabel || "Estimated additional value"}</span><strong className="mt-1 block break-words text-xl text-slate-900">{data.opportunities?.estMonthly || "Not available"}</strong><span className="text-[10px] text-[var(--brand-accent)]">monthly observed value under review</span></div><div className="rounded-md bg-slate-50 p-4"><span className="text-[10px] font-semibold text-slate-600">Annualised</span><strong className="mt-1 block break-words text-xl text-[var(--brand-ink-strong)]">{data.opportunities?.estAnnual || "Not available"}</strong></div></div><p className="mt-3 text-[10px] leading-4 text-slate-500">{data.opportunities?.valueNote || "No opportunity estimate available."}</p></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Governance status" description="Data availability and calculation readiness."/></CardHeader><CardContent><div className="rounded-md border border-slate-200 p-4"><strong className="text-lg text-emerald-700">{data.dataQuality?.scoreReady ? "Score ready" : "Review required"}</strong><p className="mt-2 text-xs text-slate-600">{number(data.dataQuality?.warnings?.length || 0)} data-quality warnings are currently surfaced for this view.</p><div className="mt-4 h-px bg-slate-200"></div><p className="mt-3 text-[10px] leading-4 text-slate-500">Calculations remain tied to the governed Node and Prisma data layer. Unavailable source data is not presented as a confirmed zero.</p></div></CardContent></Card>
      </section>
      <section className="mt-4 grid gap-4 pb-8 lg:grid-cols-2">
        <Card><CardHeader><SectionHeading title="Value delivered"/></CardHeader><CardContent><div className="grid gap-px overflow-hidden rounded-md border border-slate-200 sm:grid-cols-2">{(data.valueStrip||[]).map(row=><div className="min-w-0 bg-slate-50 p-4" key={row.l}><span className="block text-[10px] text-slate-500">{row.l}</span><strong className="mt-1 block break-words text-xl text-[var(--brand-ink-strong)]">{row.v}</strong><small className="mt-1 block text-[10px] text-slate-500">{row.d}</small></div>)}</div></CardContent></Card>
        <Card><CardHeader><SectionHeading title="Reporting integrity"/></CardHeader><CardContent><div className="grid gap-2"><strong className="text-2xl text-emerald-700">{data.dataQuality?.scoreReady?"Score ready":"Review required"}</strong><span className="text-xs text-slate-600">{data.dataQuality?.warnings?.length||0} data-quality warnings</span><small className="leading-5 text-slate-500">Source calculations remain governed by the existing Node/Prisma data layer.</small></div></CardContent></Card>
      </section>
    </div>
  </main>;
}

function App() {
  const [me,setMe]=useState<Me|null>(null); const [loading,setLoading]=useState(true);
  useEffect(()=>{api<Me>("/api/auth/me").then(setMe).catch(()=>setMe(null)).finally(()=>setLoading(false));},[]);
  if(loading)return <div className="min-h-screen bg-[var(--brand-paper)] px-4 py-20"><Card className="mx-auto max-w-2xl"><CardContent className="py-12 text-center text-sm text-slate-500">Loading your workspace...</CardContent></Card></div>;
  if(!me)return <div className="min-h-screen bg-[var(--brand-paper)] px-4 py-20"><Card className="mx-auto max-w-lg"><CardHeader><div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[var(--brand-accent)]">EFS Optimise</div><CardTitle className="mt-2 text-2xl">Sign in to continue</CardTitle><CardDescription>Your existing secure Fastify session remains the authentication authority.</CardDescription></CardHeader><CardContent><Button onClick={()=>window.location.assign("/login")}>Sign in</Button></CardContent></Card></div>;
  const path=window.location.pathname.replace(/\/+$/, "") || "/";
  const isAdminRoute=path==="/react/admin";
  const isUsersRoute=path==="/react/users" || path==="/users";
  const canAdmin=me.role==="ADMIN" || me.role==="SUPERADMIN";
  if(isAdminRoute) return canAdmin ? <PortalShell me={me} active="admin"><AdminView me={me}/></PortalShell> : <PortalShell me={me} active="dashboard"><DashboardView me={me}/></PortalShell>;
  if(isUsersRoute) return me.modules?.users || canAdmin ? <PortalShell me={me} active="users"><UsersView me={me} onDashboard={()=>window.location.assign("/react/dashboard")} onAdmin={()=>window.location.assign("/react/admin")}/></PortalShell> : <PortalShell me={me} active="dashboard"><DashboardView me={me}/></PortalShell>;
  return <PortalShell me={me} active="dashboard"><DashboardView me={me}/></PortalShell>;
}
class AppErrorBoundary extends Component<PropsWithChildren, {hasError:boolean}> {
  state={hasError:false};
  static getDerivedStateFromError(){ return {hasError:true}; }
  render(){
    if(this.state.hasError) return <main className="min-h-screen bg-[var(--brand-paper)] px-4 py-20"><Card className="mx-auto max-w-lg"><CardHeader><div className="portal-kicker">EFS Optimise</div><CardTitle className="mt-2 text-2xl">Something went wrong</CardTitle><CardDescription>The dashboard could not render this view. Reload the page to restore the session.</CardDescription></CardHeader><CardContent><Button onClick={()=>window.location.reload()}>Reload dashboard</Button></CardContent></Card></main>;
    return this.props.children;
  }
}

export default function AppRoot(){ return <AppErrorBoundary><App /></AppErrorBoundary>; }
