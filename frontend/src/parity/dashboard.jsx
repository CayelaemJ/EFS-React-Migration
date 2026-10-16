// Ported from New Changes dashboard.html; keep source structure and CSS selectors intact.
import React from 'react';
import {ExecSummary,EmployerKpis,EngagementFunnel,ValueStrip,updateEmployerOverview} from '../native/EmployerOverview.jsx';
import {Wellness,updateWellness} from '../native/Wellness.jsx';
import {ExecutiveInsight,DataTrust,EmployeeChat,Outcomes,OutcomesNote,SavingsChart,EwaChart,EwaKpis,DebtProfile,Regions,StressMap,Income,Ratings,DebtStates,Prescription,RiskSignals,Opportunities,updateEmployerCharts} from '../native/EmployerCharts.jsx';
import {Portfolio,updatePortfolio} from '../native/Portfolio.jsx';
import {showQuickActions,showScheduleReport} from '../native/DashboardDialogs.jsx';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n\n")}

{siteText("\n")}
<div id={siteText("welcome-splash")}>{siteText("\n  ")}<div className={siteText("welcome-splash-inner")}>{siteText("\n    ")}<img id={siteText("welcome-splash-logo")} className={siteText("welcome-splash-logo efs-brand-logo")} src={siteText("/static/the-fixer-logo.svg?v=6")} alt={siteText("The Fixer logo")}/>{siteText("\n    ")}<div className={siteText("welcome-splash-spinner")}/>{siteText("\n    ")}<div className={siteText("welcome-splash-greeting")} id={siteText("welcome-splash-greeting")}>{siteText("Welcome")}</div>{siteText("\n    ")}<div className={siteText("welcome-splash-sub")} id={siteText("welcome-splash-sub")}>{siteText("The Fixer is getting things ready…")}</div>{siteText("\n  ")}</div>{siteText("\n")}</div>
{siteText("\n")}

{siteText("\n\n")}

{siteText("\n")}
<div className={siteText("topbar")}>{siteText("\n  ")}<div className={siteText("topbar-inner")}>{siteText("\n    ")}<div className={siteText("logo portal-brand-lockup")} id={siteText("portal-brand-lockup")}>{siteText("\n      ")}<div className={siteText("portal-brand-default")} id={siteText("portal-brand-default")}>{siteText("\n        ")}<img src={siteText("/static/the-fixer-logo.svg?v=6")} className={siteText("efs-brand-logo")} alt={siteText("The Fixer")}/>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("portal-brand-partner")} id={siteText("portal-brand-partner")} hidden={true}>{siteText("\n        ")}<div className={siteText("portal-partner-mark")}>{siteText("\n          ")}<img id={siteText("portal-partner-logo")} alt={siteText("")}/>{siteText("\n          ")}<span id={siteText("channel-brand-name")} className={siteText("portal-partner-name")}/>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("topbar-divider")}/>{siteText("\n    ")}<div className={siteText("audience-switch")} id={siteText("audience-switch")}>{siteText("\n      ")}<button className={siteText("on")} data-a={siteText("employer")}>{siteText("Employer view")}</button>{siteText("\n      ")}<button data-a={siteText("portfolio")}>{siteText("Portfolio view")}</button>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("topbar-spacer")}/>{siteText("\n    ")}<div className={siteText("topbar-meta")}>{siteText("\n      ")}<div className={siteText("data-fresh")}><span className={siteText("dot")}/>{siteText(" ")}<span id={siteText("data-fresh-label")}>{siteText("Loading…")}</span></div>{siteText("\n      ")}<div id={siteText("role-indicator")} className={siteText("role-indicator")} aria-label={siteText("Current access role")}/>{siteText("\n      ")}<div id={siteText("portal-account")}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n")}</div>
{siteText("\n\n")}
<div className={siteText("wrap")}>{siteText("\n\n  ")}<div className={siteText("pdf-print-header")} aria-hidden={siteText("true")}>{siteText("\n    ")}<div className={siteText("pdf-brand")}>{siteText("\n      ")}<img src={siteText("/static/the-fixer-logo.svg?v=6")} className={siteText("efs-brand-logo")} alt={siteText("The Fixer logo")}/>{siteText("\n      ")}<div>{siteText("\n        ")}<div className={siteText("pdf-kicker")}>{siteText("empower-fin · Workforce Financial Wellbeing")}</div>{siteText("\n        ")}<div className={siteText("pdf-title")} id={siteText("pdf-report-title")}>{siteText("Employer Insights")}</div>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("pdf-meta")}>{siteText("\n      ")}<div id={siteText("pdf-report-period")}>{siteText("Reporting period")}</div>{siteText("\n      ")}<div id={siteText("pdf-report-generated")}/>{siteText("\n      ")}<span className={siteText("pdf-score")} id={siteText("pdf-report-score")}>{siteText("Workforce Financial Wellness Score Not available")}</span>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div id={siteText("employer-view")}>{siteText("\n\n  ")}{siteText("\n  ")}<div className={siteText("head")}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("Employer Insights · Financial Wellbeing Programme")}</div>{siteText("\n      ")}<h1>{siteText("Your workforce ")}<span className={siteText("emp")}/></h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("How the financial wellbeing programme is landing across your workforce Not available who is using it, the outcomes achieved, and how employees rate the service.")}</div>{siteText("\n      ")}<div id={siteText("ctx-sub")} style={{"fontSize":"12px","fontWeight":"700","color":"var(--blue-d)","marginTop":"10px","letterSpacing":".01em"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:var(--blue-d);margin-top:10px;letter-spacing:.01em;"); }}>{siteText("Programme to date")}</div>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("head-actions")}>{siteText("\n      ")}<button className={siteText("btn")} id={siteText("btn-schedule")}>{siteText("Schedule report")}</button>{siteText("\n      ")}<button className={siteText("btn btn-primary")} id={siteText("btn-export")}>{siteText("Export PDF")}</button>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}{siteText("\n  ")}<div className={siteText("filters")}>{siteText("\n    ")}<select className={siteText("filter-emp")} id={siteText("employer-select")} style={{"display":"none"}} ref={node => { if(node) node.setAttribute("style", "display:none;"); }} onChange={event => actions[0]?.(event)}/>{siteText("\n    ")}<label className={siteText("period-picker-label")} htmlFor={siteText("month-select")}>{siteText("Reporting period")}</label>{siteText("\n    ")}<select className={siteText("filter-month")} id={siteText("month-select")} aria-label={siteText("Reporting period")} onChange={event => actions[1]?.(event)}>{siteText("\n      ")}<option value={siteText("")}>{siteText("Latest available period")}</option>{siteText("\n      ")}<option value={siteText("30d")}>{siteText("Last 30 days")}</option>{siteText("\n      ")}<option value={siteText("qtd")}>{siteText("Quarter to date")}</option>{siteText("\n      ")}<option value={siteText("all")}>{siteText("Programme to date")}</option>{siteText("\n    ")}</select>{siteText("\n    ")}<span className={siteText("filter-tag interactive")} id={siteText("region-filter")}>{siteText("\n      ")}<svg width={siteText("13")} height={siteText("13")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M3 6h18M6 12h12M10 18h4")} stroke={siteText("currentColor")} strokeWidth={siteText("2")} strokeLinecap={siteText("round")}/></svg>{siteText("\n      ")}<span className={siteText("tag-label")}>{siteText("All regions")}</span>{siteText("\n      ")}<svg className={siteText("caret")} width={siteText("11")} height={siteText("11")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M6 9l6 6 6-6")} stroke={siteText("currentColor")} strokeWidth={siteText("2.4")} strokeLinecap={siteText("round")} strokeLinejoin={siteText("round")}/></svg>{siteText("\n    ")}</span>{siteText("\n    ")}<span className={siteText("filter-tag interactive")} id={siteText("income-filter")}>{siteText("\n      ")}<svg width={siteText("13")} height={siteText("13")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M3 6h18M6 12h12M10 18h4")} stroke={siteText("currentColor")} strokeWidth={siteText("2")} strokeLinecap={siteText("round")}/></svg>{siteText("\n      ")}<span className={siteText("tag-label")}>{siteText("All income bands")}</span>{siteText("\n      ")}<svg className={siteText("caret")} width={siteText("11")} height={siteText("11")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M6 9l6 6 6-6")} stroke={siteText("currentColor")} strokeWidth={siteText("2.4")} strokeLinecap={siteText("round")} strokeLinejoin={siteText("round")}/></svg>{siteText("\n    ")}</span>{siteText("\n    ")}<span className={siteText("filter-tag")} id={siteText("emp-tag")}>{siteText("\n      ")}<svg width={siteText("13")} height={siteText("13")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><circle cx={siteText("12")} cy={siteText("8")} r={siteText("4")} stroke={siteText("currentColor")} strokeWidth={siteText("2")}/><path d={siteText("M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6")} stroke={siteText("currentColor")} strokeWidth={siteText("2")} strokeLinecap={siteText("round")}/></svg>{siteText("\n      Not available enrolled\n    ")}</span>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div className={siteText("enterprise-toolbar")} aria-label={siteText("Dashboard tools")}>{siteText("\n    ")}<div id="executive-insight"><ExecutiveInsight/></div>{siteText("\n    ")}<div className={siteText("enterprise-toolbar-actions")}>{siteText("\n      ")}<button className={siteText("btn")} id={siteText("btn-save-view")} type={siteText("button")}>{siteText("Save view")}</button>{siteText("\n      ")}<button className={siteText("btn")} id={siteText("btn-command")} type={siteText("button")}>{siteText("Quick actions ")}<span className={siteText("kbd")}>{siteText("Ctrl K")}</span></button>{siteText("\n    ")}</div>{siteText("\n    ")}<div id="data-trust"><DataTrust/></div>{siteText("\n  ")}</div>{siteText("\n  ")}{siteText("\n  ")}<div id="exec-summary"><ExecSummary/></div>{siteText("\n\n  ")}{siteText("\n  ")}<div className={siteText("card reveal wellness-card section-gap")} style={{"animationDelay":".04s"}} ref={node => { if(node) node.setAttribute("style", "animation-delay:.04s"); }}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div>{siteText("\n        ")}<div className={siteText("card-title")}>{siteText("Workforce Financial Wellness Score ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("wellness")} aria-label={siteText("What is the Workforce Financial Wellness Score?")}>{siteText("i")}</button></div>{siteText("\n        ")}<div className={siteText("card-note")}>{siteText("The single number that tracks your people's financial health Not available and its trajectory")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<span className={siteText("card-tag")}>{siteText("Index · modelled")}</span>{siteText("\n    ")}</div>{siteText("\n    ")}<div id="wellness"><Wellness/></div>{siteText("\n  ")}</div>{siteText("\n\n  ")}{siteText("\n  ")}<div id="kpis" className="grid g-4"><EmployerKpis/></div>{siteText("\n\n  ")}{siteText("\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 7","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 7;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("From enrolled to better off ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("funnel")} aria-label={siteText("What is the engagement funnel?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("The journey every employee can take Not available and where they are on it")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Engagement funnel")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="funnel" className="funnel"><EngagementFunnel/></div>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 5","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 5;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Financial problems resolved ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("outcomes")} aria-label={siteText("What are financial problems resolved?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className="card-note" id="outcomes-note"><OutcomesNote/></div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Outcomes")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="outcomes"><Outcomes/></div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("valueDelivered")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("The bottom line")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("Value delivered to your people")}</h1>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}<div id="value-strip"><ValueStrip/></div>{siteText("\n\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 5","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 5;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Monthly cash freed up ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("saving")} aria-label={siteText("What is monthly cash freed up?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Recurring savings unlocked, cumulative run-rate")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Run-rate")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="savings-chart"><SavingsChart/></div>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 7","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 7;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Debt Pressure Profile ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("debtProfile")} aria-label={siteText("What is the Debt Pressure Profile?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Where your people's arrears sit Not available by credit type, then by creditor")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Arrears journey")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<DebtProfile/>{siteText("\n      ")}{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("earlyWageAccess")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("eyebrow")}>{siteText("ON-DEMAND PAY")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("Early Wage Access")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("How many employees are drawing earned wages early, and how much Not available a live read on cashflow pressure between paydays.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}<div id="ewa-kpis" className="grid g-4"><EwaKpis/></div>{siteText("\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 12"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 12;"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Total advanced per month ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("ewaTrend")} aria-label={siteText("What is total advanced per month?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Finalised advances only · monthly run-rate")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Trend")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="ewa-chart"><EwaChart/></div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}<section className={siteText("dash-section")} data-section={siteText("stressMap")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("Where the pressure sits")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("Workforce Financial Stress Map")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("Financial pressure is not evenly spread. This is where it concentrates Not available so you and your broker can direct the programme to the people and sites that need it most.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div id="stress-strip" className="section-gap"><StressMap/></div>{siteText("\n\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 4","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 4;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div><div className={siteText("card-title")}>{siteText("Stress index by site ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("stressBySite")} aria-label={siteText("What is the stress index by site?")}>{siteText("i")}</button></div><div className={siteText("card-note")}>{siteText("Higher = more financial pressure (arrears, debt load, low resilience)")}</div></div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("By site")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="region-bars" className="hbar"><Regions/></div>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 4","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 4;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div><div className={siteText("card-title")}>{siteText("Who the programme is reaching ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("incomeReach")} aria-label={siteText("What is reach by income band?")}>{siteText("i")}</button></div><div className={siteText("card-note")}>{siteText("Activated employees by income band")}</div></div>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="income-donut"><Income/></div>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 4","animationDelay":".15s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 4;animation-delay:.15s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div><div className={siteText("card-title")}>{siteText("How employees rate us ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("rating")} aria-label={siteText("What is the employee experience rating?")}>{siteText("i")}</button></div><div className={siteText("card-note")}>{siteText("From end-of-journey ratings")}</div></div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Experience")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="ratings"><Ratings/></div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("problemDebt")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("Tackling problem debt")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("How problem debt is being handled")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("Not all distressed debt is dealt with the same way. Here is exactly what is happening to each rand Not available and we are precise about which debt is under active arrangement versus self-managed with our guidance.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}<div className={siteText("card reveal section-gap")} style={{"marginTop":"0","animationDelay":".04s"}} ref={node => { if(node) node.setAttribute("style", "margin-top:0;animation-delay:.04s"); }}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div>{siteText("\n        ")}<div className={siteText("card-title")}>{siteText("Problem debt by how it's being handled ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("debtStates")} aria-label={siteText("How is problem debt being handled?")}>{siteText("i")}</button></div>{siteText("\n        ")}<div className={siteText("card-note")}>{siteText("Three honest states Not available only the first is an active arrangement")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<span className={siteText("card-tag")}>{siteText("Debt intervention")}</span>{siteText("\n    ")}</div>{siteText("\n    ")}<div id="debt-states"><DebtStates/></div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 7","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 7;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Potentially prescribed debt challenged ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("prescription")} aria-label={siteText("What is prescribed debt recovery?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Old debt employees may no longer legally owe Not available identified and contested")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Recovery")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="prescription"><Prescription/></div>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 5","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 5;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Financial Risk Signals ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("riskSignals")} aria-label={siteText("What are Financial Risk Signals?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Exposure detected across your workforce Not available your early-warning list")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Diagnostic")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id="risk-signals"><RiskSignals/></div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("opportunities")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("What to do next")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("Opportunities identified")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("The programme has already mapped the next wave of value sitting in your workforce Not available eligible employees who haven't yet been helped.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}<div id="opportunities"><Opportunities/></div>{siteText("\n  ")}</section>{siteText("\n\n  ")}{siteText("\n  ")}<EmployeeChat/>{siteText("\n\n  ")}<div className={siteText("footnote")} id={siteText("footnote")}/>{siteText("\n\n ")}</div>{siteText("\n\n  ")}<div className={siteText("pdf-print-footer")} aria-hidden={siteText("true")}>{siteText("\n    empower-fin · Workforce Financial Wellbeing · Confidential employer report · Generated ")}<span id={siteText("pdf-footer-date")}/>{siteText("\n  ")}</div>{siteText("\n\n  ")}{siteText("\n  ")}<div id="portfolio-view" style={{display:"none"}}><Portfolio/></div>{siteText("\n\n")}</div>
{siteText("\n\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n\n\n")}</>;}
let started=false;
export function start(){if(started)return;started=true;
actions=[event => {
  switchEmployer(event.currentTarget.value);
},
event => {
  switchPeriod(event.currentTarget.value);
}];
/* Shared HTML-escaping helper. Every value that originates from the API or the
   user (names, e-mails, filenames, error text) must pass through esc() before
   it is interpolated into an innerHTML template. */
(function (w) {
  var MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };
  w.esc = function (v) {
    return String(v == null ? '' : v).replace(/[&<>"'`]/g, function (c) {
      return MAP[c];
    });
  };
})(window);
;
window.BrandEngine = BrandEngine;
;
setTimeout(function () {
  var e = document.getElementById('welcome-splash');
  if (e) e.classList.add('hide');
}, 4500);
;
// ════════════════════════════════════════════════════════════════════
//  ENGAGEMENT BEACON
//  Minimal, best-effort client-reach tracking used by Administration >
//  Client Reach & Engagement. No third-party tracking — everything goes to
//  our own /api/analytics/event endpoint and is tied to the signed-in user.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var ENDPOINT = '/api/analytics/event';
  var path = location.pathname;
  var startedAt = Date.now();
  var thresholdsSent = {};
  function send(type, value) {
    var body = JSON.stringify({
      type: type,
      path: path,
      value: value
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([body], {
          type: 'application/json'
        }));
        return;
      }
    } catch (_) {}
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
        keepalive: true
      });
    } catch (_) {}
  }
  function labelFor(el) {
    if (!el) return '';
    return (el.getAttribute('aria-label') || el.getAttribute('name') || el.textContent || el.href || '').replace(/\s+/g, ' ').trim().slice(0, 180);
  }
  document.addEventListener('click', function (event) {
    var target = event.target && event.target.closest ? event.target.closest('button, [role="button"], a') : null;
    if (!target) return;
    if (target.tagName === 'A' && target.hostname && target.hostname !== location.hostname) send('OUTBOUND_CLICK', null);else if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') send('CTA_CLICK', null);
  }, true);
  document.addEventListener('submit', function () {
    send('FORM_SUBMIT', null);
  }, true);
  window.addEventListener('error', function () {
    send('CLIENT_ERROR', null);
  });
  function scrollDepthPct() {
    var doc = document.documentElement;
    var scrollable = Math.max(1, (doc.scrollHeight || 0) - (window.innerHeight || 0));
    var pct = (window.scrollY || doc.scrollTop || 0) / scrollable * 100;
    return Math.max(0, Math.min(100, Math.round(pct)));
  }
  function checkScroll() {
    var pct = scrollDepthPct();
    [25, 50, 75, 100].forEach(function (t) {
      if (pct >= t && !thresholdsSent[t]) {
        thresholdsSent[t] = true;
        send('SCROLL_DEPTH', t);
      }
    });
  }
  var scrollTimer = null;
  window.addEventListener('scroll', function () {
    if (scrollTimer) return;
    scrollTimer = setTimeout(function () {
      scrollTimer = null;
      checkScroll();
    }, 400);
  }, {
    passive: true
  });
  function endSession() {
    send('SESSION_END', Math.round((Date.now() - startedAt) / 1000));
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') endSession();
  });
  window.addEventListener('pagehide', endSession);

  // initial pageview beacon
  send('PAGEVIEW', null);
})();
;
;

/* ════════════════════════════════════════════════════════════════════
   EMPOWER-FIN DASHBOARD PORTAL Not available EMPLOYER DASHBOARD
   The static DATA object below is an explicit visual-demonstration fixture.
   Production mode replaces it with the complete API payload and never merges
   missing live fields into these values. Open with ?demo=1 to use the fixture.
   ════════════════════════════════════════════════════════════════════ */
let DATA = {
  employer: "Vaalwater Industrial Group",
  headcount: 1575,
  // ── Executive summary (one-glance) ──
  exec: {
    items: [{
      v: "1,182",
      l: "employees enrolled"
    }, {
      v: "R 384,900",
      l: "monthly cashflow restored"
    }, {
      v: "R 6.4m",
      l: "debt under active intervention"
    }, {
      v: "274",
      l: "prescribed debts challenged"
    }, {
      v: "812",
      l: "employees better off"
    }, {
      v: "4.6/5",
      l: "employee satisfaction"
    }]
  },
  // ── Debt intervention, split into three honest states ──
  // active = arrangements/reductions actually sent; challenged = prescribed debt contested;
  // guided = couldn't afford an arrangement, so educated on prescription to self-manage.
  debtStates: {
    active: {
      rand: 6_390_000,
      employees: 214,
      label: "Under active intervention",
      note: "settlement or reduced-instalment arrangements sent"
    },
    challenged: {
      rand: 2_740_000,
      employees: 274,
      label: "Being challenged",
      note: "potentially prescribed debt contested"
    },
    guided: {
      rand: 2_790_000,
      employees: 133,
      label: "Self-managed via guidance",
      note: "couldn't afford an arrangement Not available educated on prescription to manage it themselves"
    }
  },
  // ── Workforce Financial Wellness Score (pass 6) ──
  wellness: {
    score: 70,
    prior: 64,
    // last period, for progression story
    band: "Improving",
    drivers: [{
      name: "Engagement",
      score: 60,
      weight: 0.20,
      note: "started a journey vs. eligible"
    }, {
      name: "Cashflow relief",
      score: 76,
      weight: 0.30,
      note: "savings unlocked vs. potential"
    }, {
      name: "Debt risk",
      score: 63,
      weight: 0.30,
      note: "users in arrears (lower = riskier)"
    }, {
      name: "Insurance efficiency",
      score: 80,
      weight: 0.20,
      note: "duplicate / overpriced cover removed"
    }]
  },
  // ── Act 1: reach KPIs ──
  kpis: {
    takeUp: {
      pct: 75,
      enrolled: 1182,
      delta: "+6 pts"
    },
    activated: {
      pct: 59,
      count: 938,
      delta: "+11 pts"
    },
    monthlySaving: {
      rand: 384900,
      perHead: 326,
      delta: "+R41k"
    },
    avgRating: {
      val: 4.6,
      responses: 1640,
      delta: "stable"
    }
  },
  // ── Act 2: engagement funnel ──
  funnel: [{
    label: "Eligible workforce",
    sub: "all employees",
    n: 1575,
    pct: 100
  }, {
    label: "Enrolled",
    sub: "joined the programme",
    n: 1182,
    pct: 75
  }, {
    label: "Activated",
    sub: "started a fix",
    n: 938,
    pct: 60
  }, {
    label: "Completed a fix",
    sub: "at least one resolved",
    n: 812,
    pct: 52
  }, {
    label: "Multiple fixes",
    sub: "two or more resolved",
    n: 503,
    pct: 32
  }],
  // ── Act 2: outcomes by fix type ──  (count = fixes completed)
  outcomes: [{
    key: "credit",
    name: "Credit Life Replacement",
    meta: "avg R298/mo saved",
    count: 744,
    ico: "shield",
    stat: "R 222k",
    statL: "saved / mo"
  }, {
    key: "funeral",
    name: "Funeral Consolidation",
    meta: "duplicate cover removed",
    count: 486,
    ico: "umbrella",
    stat: "R 71k",
    statL: "saved / mo"
  }, {
    key: "arrears",
    name: "Arrears Resolution",
    meta: "settlement plans live",
    count: 318,
    ico: "scale",
    stat: "R 9.2m",
    statL: "in resolution"
  }, {
    key: "prescribed",
    name: "Prescribed Debt Challenge",
    meta: "accounts contested",
    count: 274,
    ico: "scroll",
    stat: "R 2.74m",
    statL: "challenged"
  }, {
    key: "emergency",
    name: "Emergency Cash Assistance",
    meta: "interest-free advances drawn",
    count: 206,
    ico: "wallet",
    stat: "206",
    statL: "advances set up"
  }, {
    key: "sti",
    name: "Short-Term Insurance Audit",
    meta: "policies reviewed",
    count: 86,
    ico: "car",
    statL: "audited",
    stat: "86"
  }],
  // ── Act 3: value strip ──
  valueStrip: [{
    l: "Monthly cash freed up",
    v: "R 384,900",
    d: "R 4.62m annualised"
  }, {
    l: "Prescribed debt challenged",
    v: "R 2.74m",
    d: "274 accounts"
  }, {
    l: "Arrears under active intervention",
    v: "R 6.4m",
    d: "214 employees"
  }, {
    l: "Avg saving per active employee",
    v: "R 326/mo",
    d: "R 3,912 / year"
  }],
  // ── Act 3: cumulative monthly savings run-rate (R000s) ──
  savings: [42, 78, 121, 168, 214, 258, 297, 331, 358, 384],
  savingsLabels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
  // ── Act 3: creditor breakdown (arrears journey) ──
  creditors: [{
    name: "African Bank",
    color: "var(--chart-high)",
    accounts: 128,
    balance: "R 2.41m",
    avg: "R 18,830",
    status: "elig",
    statusL: "In journey"
  }, {
    name: "Capitec",
    color: "var(--blue)",
    accounts: 96,
    balance: "R 1.88m",
    avg: "R 19,580",
    status: "elig",
    statusL: "In journey"
  }, {
    name: "Standard Bank",
    color: "var(--blue-d)",
    accounts: 74,
    balance: "R 1.62m",
    avg: "R 21,890",
    status: "elig",
    statusL: "In journey"
  }, {
    name: "FNB",
    color: "var(--chart-cashflow)",
    accounts: 61,
    balance: "R 1.39m",
    avg: "R 22,790",
    status: "prog",
    statusL: "Negotiating"
  }, {
    name: "Truworths",
    color: "var(--chart-insurance)",
    accounts: 88,
    balance: "R 1.04m",
    avg: "R 11,820",
    status: "prog",
    statusL: "Negotiating"
  }, {
    name: "Other retailers",
    color: "var(--chart-debt)",
    accounts: 142,
    balance: "R 0.84m",
    avg: "R 5,915",
    status: "prog",
    statusL: "Negotiating"
  }],
  creditorsTotal: {
    accounts: 589,
    balance: "R 9.18m"
  },
  // debt pressure by credit TYPE (the employer-legible cut; creditors are the drill-down)
  debtProfile: [{
    type: "Bank personal loans",
    balance: "R 5.91m",
    pct: 64,
    col: "var(--brand-primary)"
  }, {
    type: "Retail / store credit",
    balance: "R 1.88m",
    pct: 20,
    col: "var(--blue)"
  }, {
    type: "Microloans",
    balance: "R 0.92m",
    pct: 10,
    col: "var(--chart-mid)"
  }, {
    type: "Other unsecured",
    balance: "R 0.47m",
    pct: 6,
    col: "var(--chart-debt)"
  }],
  // ── Act 4: stress map (by site) ──
  // stress = composite financial-pressure index (arrears load, debt exposure, low resilience). Higher = more pressure.
  regions: [{
    name: "Secunda Site",
    pct: 71,
    stress: 74,
    indebted: "R 31,200"
  }, {
    name: "Field / Remote",
    pct: 49,
    stress: 68,
    indebted: "R 27,800"
  }, {
    name: "Sasolburg",
    pct: 68,
    stress: 61,
    indebted: "R 24,100"
  }, {
    name: "Vaalwater Plant",
    pct: 84,
    stress: 52,
    indebted: "R 19,600"
  }, {
    name: "Head Office",
    pct: 62,
    stress: 38,
    indebted: "R 14,300"
  }],
  stressMap: [{
    l: "Highest stress site",
    v: "Secunda Site",
    d: "index 74 · avg debt R31,200",
    tone: "red"
  }, {
    l: "Lowest stress site",
    v: "Head Office",
    d: "index 38 · most resilient",
    tone: "green"
  }, {
    l: "Most engaged site",
    v: "Vaalwater Plant",
    d: "84% enrolled",
    tone: "blue"
  }, {
    l: "Most indebted site",
    v: "Secunda Site",
    d: "R31,200 avg unsecured debt",
    tone: "amber"
  }],
  // ── Act 4: income bands (activated employees) ──
  income: [{
    name: "Under R8k/mo",
    count: 281,
    color: "var(--brand-primary)"
  }, {
    name: "R8k–R15k/mo",
    count: 392,
    color: "var(--blue)"
  }, {
    name: "R15k–R25k/mo",
    count: 178,
    color: "var(--chart-engagement)"
  }, {
    name: "Over R25k/mo",
    count: 87,
    color: "var(--chart-workforce)"
  }],
  // ── Act 4: ratings ──
  ratings: {
    avg: 4.6,
    dist: {
      5: 71,
      4: 19,
      3: 6,
      2: 3,
      1: 1
    },
    // % distribution
    fiveStarPct: 71,
    responses: 1640
  },
  // ── Act 5: prescription ──
  prescription: {
    total: "R 2.74m",
    accounts: 274,
    avgPerAccount: "R 10,000",
    statusBars: [{
      l: "Identified",
      n: 274,
      pct: 100,
      c: "var(--chart-workforce)"
    }, {
      l: "Letter dispatched",
      n: 241,
      pct: 88,
      c: "var(--chart-engagement)"
    }, {
      l: "Creditor conceded",
      n: 163,
      pct: 59,
      c: "var(--blue)"
    }, {
      l: "Written off",
      n: 118,
      pct: 43,
      c: "var(--chart-cashflow)"
    }],
    writtenOff: "R 1.18m"
  },
  // ── Act 5: referral ──
  referral: {
    shares: 1284,
    shareRate: 47,
    // % of completers who shared
    channel: "WhatsApp",
    impliedReach: "≈ 3,900"
  },
  // ── Financial Risk Signals (diagnostic of exposure) ──
  riskSignals: [{
    sig: "Paying duplicate credit life",
    n: 438,
    sev: "high",
    note: "insurance on loans they could replace cheaper"
  }, {
    sig: "Excessive / duplicate funeral cover",
    n: 512,
    sev: "high",
    note: "two or more overlapping policies"
  }, {
    sig: "Unsecured arrears",
    n: 347,
    sev: "high",
    note: "behind on one or more accounts"
  }, {
    sig: "Possible prescribed debt",
    n: 291,
    sev: "med",
    note: "old debt that may no longer be owed"
  }, {
    sig: "No access to emergency cash",
    n: 684,
    sev: "med",
    note: "would turn to expensive credit in a cash crunch"
  }, {
    sig: "Over-insured short-term",
    n: 156,
    sev: "low",
    note: "paying more than cover requires"
  }],
  // ── Opportunities Identified (next-wave sales engine) ──
  opportunities: {
    cards: [{
      name: "Credit life replacement",
      eligible: 412,
      saving: "R 122,800",
      icon: "shield"
    }, {
      name: "Funeral consolidation",
      eligible: 278,
      saving: "R 40,900",
      icon: "umbrella"
    }, {
      name: "Short-term insurance audit",
      eligible: 236,
      saving: "R 31,400",
      icon: "car"
    }, {
      name: "Prescription review",
      eligible: 183,
      saving: "Not available",
      extra: "R 1.6m challengeable",
      icon: "scroll"
    }, {
      name: "Emergency cash access",
      eligible: 341,
      saving: "Not available",
      extra: "alternative to costly credit",
      icon: "wallet"
    }],
    estMonthly: "R 241,000",
    estAnnual: "R 2.89m"
  },
  // ── Act 6: webchat engagement (categorised) ──
  chat: {
    // Explicit demonstration data. This object is only used when ?demo=1.
    // Live mode always replaces DATA with the server payload before rendering.
    available: true,
    conversations: 3247,
    resolvedInChat: 81,
    // % resolved without escalation
    escalated: 19,
    // % handed to a human/agent
    avgFirstReply: "12s",
    csat: 4.5,
    // per product-journey breakdown
    byJourney: [{
      key: "credit",
      name: "Credit Life Replacement",
      convos: 1042,
      pct: 32,
      sentiment: 71,
      themes: [{
        t: "Is this legitimate / a scam?",
        n: 286
      }, {
        t: "Will it affect my credit score?",
        n: 241
      }, {
        t: "What happens to my existing cover?",
        n: 198
      }, {
        t: "How long until I see the saving?",
        n: 154
      }, {
        t: "Can the bank refuse?",
        n: 163
      }]
    }, {
      key: "funeral",
      name: "Funeral Consolidation",
      convos: 638,
      pct: 20,
      sentiment: 78,
      themes: [{
        t: "Will I lose my waiting period?",
        n: 212
      }, {
        t: "Are all my family still covered?",
        n: 188
      }, {
        t: "Which policies are being cancelled?",
        n: 131
      }, {
        t: "What if someone passes during switch?",
        n: 107
      }]
    }, {
      key: "arrears",
      name: "Arrears Resolution",
      convos: 561,
      pct: 17,
      sentiment: 62,
      themes: [{
        t: "Will this flag me at the bureau?",
        n: 204
      }, {
        t: "Is this debt review?",
        n: 178
      }, {
        t: "What do I say to the creditor?",
        n: 96
      }, {
        t: "Can they still take legal action?",
        n: 83
      }]
    }, {
      key: "prescribed",
      name: "Prescribed Debt Challenge",
      convos: 489,
      pct: 15,
      sentiment: 66,
      themes: [{
        t: "Is it legal to not pay?",
        n: 171
      }, {
        t: "Will they come after me?",
        n: 148
      }, {
        t: "How do you know it's prescribed?",
        n: 97
      }, {
        t: "What if I paid recently?",
        n: 73
      }]
    }, {
      key: "emergency",
      name: "Emergency Cash Assistance",
      convos: 312,
      pct: 10,
      sentiment: 74,
      themes: [{
        t: "Is this a loan?",
        n: 128
      }, {
        t: "When can I claim?",
        n: 92
      }, {
        t: "Who gets the payout?",
        n: 92
      }]
    }, {
      key: "general",
      name: "General / account & login",
      convos: 205,
      pct: 6,
      sentiment: 69,
      themes: [{
        t: "Can't log in / reset password",
        n: 88
      }, {
        t: "Is my data safe (POPIA)?",
        n: 67
      }, {
        t: "How is this free to me?",
        n: 50
      }]
    }],
    // top trending questions across all journeys
    trending: [{
      q: "Will any of this affect my credit score?",
      n: 445,
      trend: "+18%",
      journey: "Credit Life · Arrears"
    }, {
      q: "Is empower-fin Dashboard Portal legitimate / safe?",
      n: 353,
      trend: "+9%",
      journey: "Credit Life · General"
    }, {
      q: "Is this debt review or a loan?",
      n: 306,
      trend: "+22%",
      journey: "Arrears · Emergency"
    }, {
      q: "Will I keep my funeral waiting period?",
      n: 212,
      trend: "flat",
      journey: "Funeral"
    }, {
      q: "Is it legal not to pay prescribed debt?",
      n: 171,
      trend: "+14%",
      journey: "Prescribed Debt"
    }],
    // weekly volume sparkline
    volume: [180, 214, 248, 263, 291, 318, 342, 360, 351, 374]
  }
};

/* ════════════════════════════════════════════════════════════════════
   PORTFOLIO (internal) Not available every employer across the key reportable metrics.
   Static rows below are used only when the page is opened with ?demo=1.
   Metric directions: higher-is-better for most; for stress & arrears,
   higher-is-worse (handled in the heatmap colouring).
   ════════════════════════════════════════════════════════════════════ */
const PORTFOLIO = {
  // metric definitions: key, label, unit, format, goodHigh (true = higher is better)
  metrics: [{
    key: "takeUp",
    label: "Take-up",
    unit: "%",
    goodHigh: true
  }, {
    key: "engaged",
    label: "Active engagement",
    unit: "%",
    goodHigh: true
  }, {
    key: "wellness",
    label: "Financial Wellness Score",
    unit: "",
    goodHigh: true
  }, {
    key: "saving",
    label: "Cashflow / mo",
    unit: "R",
    goodHigh: true
  }, {
    key: "betterOff",
    label: "Better off",
    unit: "n",
    goodHigh: true
  }, {
    key: "oppValue",
    label: "Opportunity / mo",
    unit: "R",
    goodHigh: true
  }, {
    key: "stress",
    label: "Stress index",
    unit: "",
    goodHigh: false
  }, {
    key: "arrears",
    label: "Arrears %",
    unit: "%",
    goodHigh: false
  }, {
    key: "rating",
    label: "Rating",
    unit: "/5",
    goodHigh: true
  }, {
    key: "fiveStarPct",
    label: "5-star share",
    unit: "%",
    goodHigh: true
  }],
  live: false,
  explicitDemo: new URLSearchParams(location.search).get('demo') === '1',
  error: false,
  employers: [{
    name: "Vaalwater Industrial Group",
    heads: 1575,
    takeUp: 75,
    engaged: 60,
    wellness: 70,
    saving: 384900,
    betterOff: 812,
    oppValue: 241000,
    stress: 62,
    arrears: 30,
    rating: 4.6,
    fiveStarPct: 71
  }, {
    name: "Sasol Downstream",
    heads: 2840,
    takeUp: 68,
    engaged: 54,
    wellness: 66,
    saving: 612400,
    betterOff: 1240,
    oppValue: 398000,
    stress: 71,
    arrears: 37,
    rating: 4.4,
    fiveStarPct: 64
  }, {
    name: "Vantage Benefits",
    heads: 980,
    takeUp: 82,
    engaged: 71,
    wellness: 78,
    saving: 301500,
    betterOff: 602,
    oppValue: 128000,
    stress: 44,
    arrears: 21,
    rating: 4.7,
    fiveStarPct: 76
  }, {
    name: "Midrand Logistics",
    heads: 1210,
    takeUp: 58,
    engaged: 41,
    wellness: 59,
    saving: 214800,
    betterOff: 418,
    oppValue: 286000,
    stress: 78,
    arrears: 43,
    rating: 4.1,
    fiveStarPct: 49
  }, {
    name: "Cape Mutual Services",
    heads: 1660,
    takeUp: 79,
    engaged: 66,
    wellness: 74,
    saving: 451200,
    betterOff: 902,
    oppValue: 174000,
    stress: 51,
    arrears: 25,
    rating: 4.6,
    fiveStarPct: 70
  }, {
    name: "Highveld Steel",
    heads: 3120,
    takeUp: 63,
    engaged: 49,
    wellness: 61,
    saving: 548900,
    betterOff: 1080,
    oppValue: 472000,
    stress: 74,
    arrears: 39,
    rating: 4.2,
    fiveStarPct: 54
  }, {
    name: "Tshwane Retail Group",
    heads: 740,
    takeUp: 71,
    engaged: 58,
    wellness: 68,
    saving: 188300,
    betterOff: 392,
    oppValue: 96000,
    stress: 57,
    arrears: 33,
    rating: 4.5,
    fiveStarPct: 67
  }, {
    name: "Boland Agri Co-op",
    heads: 520,
    takeUp: 86,
    engaged: 74,
    wellness: 80,
    saving: 142600,
    betterOff: 318,
    oppValue: 61000,
    stress: 39,
    arrears: 18,
    rating: 4.8,
    fiveStarPct: 82
  }]
};

/* Portfolio measure glossary. Plain-language definitions are based on the
   approved financial-wellbeing measure dictionary supplied for the build. */
const EMPLOYER_METRIC_INFO = {
  execEmployeesEnrolled: {
    title: 'Employees enrolled',
    text: 'Headcount who have created an account on the platform.',
    formula: 'Count of registered user accounts for this employer.'
  },
  execCashflow: {
    title: 'Monthly cashflow restored',
    text: 'Total recurring rand saved per month across completed fixes.',
    formula: 'Sum of monthly premium or instalment reductions from completed credit-life, funeral and short-term fixes.'
  },
  execDebtIntervention: {
    title: 'Debt under active intervention',
    text: 'Arrears where a settlement or reduced-instalment arrangement has actually been sent. Prescribed-debt challenges and guidance-only cases are excluded.',
    formula: 'Sum of balances on accounts with a dispatched arrangement in the arrears journey.'
  },
  execPrescribed: {
    title: 'Prescribed debts challenged',
    text: 'Rand value or account count of debt flagged as potentially prescribed and formally contested.',
    formula: 'Sum of balances, or count of accounts, where a prescription challenge has been lodged.'
  },
  execBetterOff: {
    title: 'Employees better off',
    text: 'Unique employees who completed at least one fix with a concrete result. A person is counted once even if they completed more than one fix.',
    formula: 'Distinct employees with at least one completed outcome; guidance-only journeys are excluded.'
  },
  execSatisfaction: {
    title: 'Employee satisfaction',
    text: 'Average end-of-journey star rating given by employees.',
    formula: 'Mean of all post-journey ratings from 1 to 5.'
  },
  wellness: {
    title: 'Workforce Financial Wellness Score',
    text: 'A single score out of 100 that tracks workforce financial health and movement over time. It combines engagement, cashflow relief, debt risk and insurance efficiency.',
    formula: 'Engagement 20% + Cashflow relief 30% + Debt risk 30% + Insurance efficiency 20%.'
  },
  wellnessEngagement: {
    title: 'Engagement driver',
    text: 'Measures whether eligible employees are actually using the programme by starting a journey.',
    formula: 'Users who started a journey ÷ eligible employees × 100. Weight: 20%.'
  },
  wellnessCashflow: {
    title: 'Cashflow relief driver',
    text: 'Measures how much recurring monthly saving has already been unlocked against the monthly saving still achievable.',
    formula: 'Monthly savings unlocked ÷ monthly savings achievable × 100. Weight: 30%.'
  },
  wellnessDebt: {
    title: 'Debt risk driver',
    text: 'Measures the share of platform users in arrears, inverted so lower arrears produces a higher score.',
    formula: '100 − (platform users in arrears ÷ platform users × 100). Weight: 30%.'
  },
  wellnessInsurance: {
    title: 'Insurance efficiency driver',
    text: 'Measures how much identified wasteful or duplicate cover has already been fixed.',
    formula: 'Wasteful or duplicate cover fixed ÷ total wasteful or duplicate cover found × 100. Weight: 20%.'
  },
  takeUp: {
    title: 'Programme take-up',
    text: 'Share of the eligible workforce who have enrolled by creating an account on the platform.',
    formula: 'Enrolled employees ÷ eligible workforce × 100.'
  },
  engaged: {
    title: 'Actively engaged',
    text: 'Share of the eligible workforce who have started at least one product journey.',
    formula: 'Activated users ÷ eligible workforce × 100.'
  },
  saving: {
    title: 'Cash freed up / month',
    text: 'Total recurring monthly saving created by completed fixes.',
    formula: 'Sum of monthly reductions from completed credit-life, funeral and short-term fixes.'
  },
  rating: {
    title: 'Average experience rating',
    text: 'Average end-of-journey star rating, together with the number of ratings collected.',
    formula: 'Mean of post-journey ratings from 1 to 5.'
  },
  funnel: {
    title: 'Engagement funnel',
    text: 'Shows how employees move from eligibility through enrolment and activation to completing one or more fixes.',
    formula: 'Each stage is a distinct employee count; percentages are shown against the eligible workforce.'
  },
  funnelEligible: {
    title: 'Eligible',
    text: 'Everyone in the workforce the employer has switched on for the programme.',
    formula: 'Employer eligible headcount for the selected as-at date.'
  },
  funnelEnrolled: {
    title: 'Enrolled',
    text: 'Employees who joined the programme by creating an account.',
    formula: 'Count of registered user accounts.'
  },
  funnelActivated: {
    title: 'Activated',
    text: 'Employees who started at least one product journey.',
    formula: 'Distinct employees who began one or more journeys.'
  },
  funnelCompleted: {
    title: 'Completed a fix',
    text: 'Employees who finished at least one journey with a concrete result.',
    formula: 'Distinct employees with at least one completed journey.'
  },
  funnelMultiple: {
    title: 'Multiple fixes',
    text: 'Employees who completed two or more journeys.',
    formula: 'Distinct employees with at least two completed journeys.'
  },
  outcomes: {
    title: 'Financial problems resolved',
    text: 'Shows the number of completed fixes by journey type and the rand impact created by each type.',
    formula: 'Count completed journeys by type; value is the relevant monthly saving or balance challenged/under arrangement.'
  },
  valueMonthly: {
    title: 'Monthly cash freed up',
    text: 'Recurring monthly saving delivered by completed fixes, with the annualised equivalent.',
    formula: 'Sum of monthly reductions; annualised value = monthly amount × 12.'
  },
  valuePrescribed: {
    title: 'Prescribed debt challenged',
    text: 'Value and number of potentially prescribed debt accounts being contested.',
    formula: 'Sum of challenged balances and count of accounts with a lodged challenge.'
  },
  valueArrears: {
    title: 'Arrears under active intervention',
    text: 'Value and employee count where settlement or reduced-instalment arrangements have actually been sent.',
    formula: 'Sum of balances and distinct employees with a dispatched arrangement.'
  },
  valueAvgSaving: {
    title: 'Average saving per active employee',
    text: 'Average recurring monthly cashflow restored for each activated employee.',
    formula: 'Monthly cashflow restored ÷ activated employees.'
  },
  debtProfile: {
    title: 'Debt Pressure Profile',
    text: 'Shows arrears balances by credit type, with an optional drill-down by named creditor, account count, average balance and current status.',
    formula: 'Sum arrears balances by credit type; creditor view aggregates the same balances by creditor.'
  },
  stressBySite: {
    title: 'Stress index by site',
    text: 'A pressure score by site. Higher values mean greater financial stress, reflecting arrears incidence and debt load.',
    formula: 'Composite of arrears rate and average debt load among users at each site. Higher = more pressure.'
  },
  stressHighest: {
    title: 'Highest stress site',
    text: 'The site with the greatest financial pressure in the selected view.',
    formula: 'Site with the highest stress index.'
  },
  stressLowest: {
    title: 'Lowest stress site',
    text: 'The site with the lowest financial pressure in the selected view.',
    formula: 'Site with the lowest stress index.'
  },
  stressEngaged: {
    title: 'Most engaged site',
    text: 'The site with the strongest programme take-up.',
    formula: 'Site with the highest enrolled ÷ eligible headcount.'
  },
  stressIndebted: {
    title: 'Most indebted site',
    text: 'The site with the highest average unsecured debt exposure per user.',
    formula: 'Site with the highest average arrears balance per user.'
  },
  incomeReach: {
    title: 'Reach by income band',
    text: 'Shows which income bands the programme is reaching among activated employees.',
    formula: 'Activated employees grouped by payroll income band.'
  },
  ratingDistribution: {
    title: 'Average rating & distribution',
    text: 'Shows the mean employee rating and the spread of 1 to 5 star responses.',
    formula: 'Mean and frequency distribution of post-journey star ratings.'
  },
  fiveStarPct: {
    title: '5-star share',
    text: 'Share of post-journey ratings that received the highest 5-star rating.',
    formula: '5-star ratings ÷ all ratings × 100.'
  },
  nps: {
    title: 'Net Promoter Score',
    text: 'The balance between employees giving the highest rating and those giving a 1–3 rating.',
    formula: '% rating 5 − % ratings 1–3.'
  },
  debtStates: {
    title: 'How problem debt is being handled',
    text: 'Separates problem debt into active intervention, debt being challenged and guidance-only cases so the states are not overstated.',
    formula: 'Balances and employee counts are grouped by the current intervention state.'
  },
  debtActive: {
    title: 'Under active intervention',
    text: 'Arrears where a settlement or reduced-instalment arrangement has actually been sent.',
    formula: 'Balances and distinct employees where an arrangement has been dispatched.'
  },
  debtChallenged: {
    title: 'Being challenged',
    text: 'Potentially prescribed debt that is being formally contested.',
    formula: 'Balances and distinct employees with a lodged prescription challenge.'
  },
  debtGuided: {
    title: 'Self-managed via guidance',
    text: 'Employees who could not afford an arrangement and were educated on prescription so they can manage the account themselves. This is not counted as active intervention.',
    formula: 'Balances and distinct employees in the guidance-only state.'
  },
  prescription: {
    title: 'Prescribed debt recovery',
    text: 'Tracks potentially prescribed debt from identification through challenge and creditor outcome.',
    formula: 'Value challenged and status counts across identified → letter sent → creditor conceded → written off.'
  },
  prescriptionValue: {
    title: 'Value challenged',
    text: 'Total rand value of potentially prescribed debt that has been contested.',
    formula: 'Sum of challenged account balances.'
  },
  prescriptionWrittenOff: {
    title: 'Already written off',
    text: 'Value creditors have already conceded or confirmed as written off.',
    formula: 'Sum of balances confirmed written off.'
  },
  prescriptionAccounts: {
    title: 'Challenge accounts',
    text: 'Number of accounts included in the prescribed-debt challenge process.',
    formula: 'Count of challenge accounts in the selected view.'
  },
  riskSignals: {
    title: 'Financial Risk Signals',
    text: 'Counts employees showing specific exposures such as duplicate cover, arrears, possible prescribed debt, limited emergency resilience or over-insurance.',
    formula: 'Per signal: distinct users flagged by the diagnostic scan of their accounts or cover.'
  },
  opportunities: {
    title: 'Opportunities identified',
    text: 'Shows employees who appear eligible for a fix they have not yet completed, and the potential value associated with the next wave of action.',
    formula: 'Eligibility is based on diagnostic flags with no completed fix. Value is shown using the portal\'s configured opportunity method.'
  },
  opportunityValue: {
    title: 'Estimated additional value',
    text: 'Projected additional monthly and annual value associated with the identified next-wave opportunities.',
    formula: 'The displayed value follows the portal\'s current opportunity calculation for the selected employer and filters.'
  },
  referralRate: {
    title: 'Organic referral rate',
    text: 'Share of employees who completed a journey and then shared or referred the programme.',
    formula: 'Referral/share events relative to the relevant completed-user population.'
  },
  ewaEmployees: {
    title: 'Employees took up Early Wage Access',
    text: 'Number of unique employees who used Early Wage Access in the selected period.',
    formula: 'Distinct employees with finalised salary advances.'
  },
  ewaTotal: {
    title: 'Total advanced',
    text: 'Total rand value of finalised Early Wage Access drawdowns in the selected period.',
    formula: 'Sum of finalised advance amounts.'
  },
  ewaAverage: {
    title: 'Average advance',
    text: 'Average rand amount per finalised Early Wage Access drawdown.',
    formula: 'Total finalised advance value ÷ number of finalised advances.'
  },
  ewaFrequency: {
    title: 'Advances per employee',
    text: 'Average number of finalised Early Wage Access drawdowns per employee who used the service.',
    formula: 'Finalised advances ÷ unique employees with a finalised advance.'
  },
  ewaTrend: {
    title: 'Total advanced per month',
    text: 'Monthly trend in the total value of finalised Early Wage Access advances.',
    formula: 'Sum finalised advance amounts by advance month.'
  },
  chatTotal: {
    title: 'Total conversations',
    text: 'Number of chat conversations for this employer in the selected period.',
    formula: 'Count of chat sessions from the separate chat source.'
  },
  chatResolved: {
    title: 'Resolved in chat',
    text: 'Share of conversations closed without handing the employee to a person.',
    formula: 'Sessions resolved in chat ÷ all chat sessions × 100.'
  },
  chatFirstReply: {
    title: 'First reply time',
    text: 'Typical time to the first response across chat sessions.',
    formula: 'The source specification defines this as the median first-response time.'
  },
  chatSatisfaction: {
    title: 'Chat satisfaction',
    text: 'Average rating employees give after a chat.',
    formula: 'Mean post-chat rating from the separate chat source.'
  },
  chatByJourney: {
    title: 'Conversations by journey',
    text: 'Chat volume split across product journeys, with the available sentiment read.',
    formula: 'Chat sessions grouped by journey tag.'
  },
  chatTrending: {
    title: 'Trending questions',
    text: 'Specific employee questions that are appearing most often or rising in the selected period.',
    formula: 'Question text grouped/classified and compared period to period.'
  },
  chatThemes: {
    title: 'Chat themes',
    text: 'Groups employee questions into recurring themes so common concerns and objections are visible.',
    formula: 'Question/message text classified into themes by the separate chat system.'
  }
};
const PORTFOLIO_METRIC_INFO = {
  employerClients: {
    title: 'Employer clients',
    text: 'The number of authorised employer clients currently included in this portfolio selection.',
    formula: 'Employees covered = the eligible workforce across the selected employers.'
  },
  takeUp: {
    title: 'Programme take-up',
    text: 'Share of the eligible workforce who have enrolled by creating an account on the platform.',
    formula: 'Enrolled employees ÷ eligible workforce × 100.'
  },
  engaged: {
    title: 'Actively engaged',
    text: 'Share of the eligible workforce who have started at least one product journey.',
    formula: 'Activated users ÷ eligible workforce × 100.'
  },
  wellness: {
    title: 'Financial Wellness Score',
    text: 'A single score out of 100 that tracks workforce financial health. It combines engagement, cashflow relief, debt risk and insurance efficiency.',
    formula: 'Default model: Engagement 20% + Cashflow 30% + Debt risk 30% + Insurance 20%.'
  },
  saving: {
    title: 'Cashflow restored / month',
    text: 'Total recurring rand saved per month across completed fixes such as credit life, funeral and short-term insurance journeys.',
    formula: 'Sum of monthly saving amounts from completed fixes.'
  },
  betterOff: {
    title: 'Employees better off',
    text: 'Unique employees who completed at least one journey with a concrete result. People are counted once even if they completed multiple fixes.',
    formula: 'Distinct employees with at least one completed outcome.'
  },
  oppValue: {
    title: 'Open opportunity / month',
    text: 'The current portal value of unresolved monthly premium identified for further action. It is an observed exposure value, not an assumed saving percentage.',
    formula: 'Sum of monthly premium on unresolved wasteful or duplicate policies currently under review.'
  },
  stress: {
    title: 'Financial stress index',
    text: 'A composite pressure indicator. Higher values mean greater financial stress, driven by arrears incidence and debt load.',
    formula: 'Portfolio uses the same arrears/debt pressure model as the employer dashboard. Lower is better.'
  },
  arrears: {
    title: 'Arrears %',
    text: 'Share of platform users whose debt is visible and who are currently in arrears.',
    formula: 'Users in arrears ÷ users with visible debt × 100. Lower is better.'
  },
  rating: {
    title: 'Average experience rating',
    text: 'Average end-of-journey star rating received from employees.',
    formula: 'Mean of post-journey ratings from 1 to 5.'
  },
  fiveStarPct: {
    title: '5-star share',
    text: 'Share of all post-journey ratings that received the highest 5-star rating.',
    formula: '5-star ratings ÷ all ratings × 100.'
  },
  nps: {
    title: 'Net Promoter Score',
    text: 'The balance between employees giving the highest rating and those giving a 1–3 rating.',
    formula: '% rating 5 − % ratings 1–3.'
  },
  measureGuide: {
    title: 'What these measures mean',
    text: 'Portfolio measures use the same dated source records and calculation rules as the corresponding employer dashboard metrics. Select employers to recalculate the portfolio cards, heatmap and league table for that subset.',
    formula: 'Missing source data is shown as unavailable and is excluded from averages/rankings rather than treated as zero.'
  }
};
const PORTFOLIO_KPI_INFO = {
  employerClients: 'employerClients',
  saving: 'saving',
  oppValue: 'oppValue',
  wellness: 'wellness'
};

/* ─────────────────── tiny SVG / icon helpers ─────────────────── */
const ICON = {
  shield: '<path d="M12 3l7 3v5c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3z" stroke="var(--chart-cashflow)" stroke-width="1.8" fill="none"/>',
  umbrella: '<path d="M12 3v2M3.5 11a8.5 8.5 0 0117 0H3.5zM12 11v7a2.5 2.5 0 01-5 0" stroke="var(--chart-cashflow)" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  scale: '<path d="M12 4v16M7 20h10M5 8l-2.5 5a2.5 2.5 0 005 0L5 8zm14 0l-2.5 5a2.5 2.5 0 005 0L19 8zM5 8l7-2 7 2" stroke="var(--chart-cashflow)" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  scroll: '<path d="M6 4h10a2 2 0 012 2v11a3 3 0 01-3 3H7a2 2 0 01-2-2V6M9 8h6M9 12h6M9 16h4" stroke="var(--chart-cashflow)" stroke-width="1.7" fill="none" stroke-linecap="round"/>',
  wallet: '<path d="M3 8a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm14 3h-3a2 2 0 000 4h3" stroke="var(--chart-cashflow)" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
  car: '<path d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4h2v-2m10 2h2v-4m-12 1h1m9 0h1" stroke="var(--chart-cashflow)" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
};
function svgIco(name) {
  return '<svg width="20" height="20" viewBox="0 0 24 24">' + (ICON[name] || '') + '</svg>';
}
const KPI_ICONS = {
  takeUp: {
    bg: 'var(--brand-soft)',
    path: '<circle cx="12" cy="8" r="3.5" stroke="var(--chart-cashflow)" stroke-width="1.8" fill="none"/><path d="M5 19c0-3 3.1-5 7-5s7 2 7 5" stroke="var(--chart-cashflow)" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
  },
  activated: {
    bg: 'var(--brand-soft)',
    path: '<path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" stroke="var(--chart-cashflow)" stroke-width="1.7" fill="none" stroke-linejoin="round"/>'
  },
  saving: {
    bg: '#e7f7ef',
    path: '<path d="M12 4v16m4-13H10a2.5 2.5 0 000 5h4a2.5 2.5 0 010 5H8" stroke="var(--chart-cashflow)" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
  },
  rating: {
    bg: '#fdf3e2',
    path: '<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" stroke="var(--chart-mid)" stroke-width="1.6" fill="none" stroke-linejoin="round"/>'
  }
};
function el(html) {
  return createMarkupElement(html);
}
const hasValue = v => v !== null && v !== undefined && v !== '' && !(typeof v === 'number' && Number.isNaN(v));
function fmtCount(v) {
  return hasValue(v) ? Number(v).toLocaleString('en-ZA') : 'Not available';
}
function employerMetricKey(label) {
  const k = String(label || '').trim().toLowerCase();
  const map = {
    'employees enrolled': 'execEmployeesEnrolled',
    'monthly cashflow restored': 'execCashflow',
    'debt under active intervention': 'execDebtIntervention',
    'prescribed debts challenged': 'execPrescribed',
    'employees better off': 'execBetterOff',
    'employee satisfaction': 'execSatisfaction',
    'eligible workforce': 'funnelEligible',
    'eligible': 'funnelEligible',
    'enrolled': 'funnelEnrolled',
    'activated': 'funnelActivated',
    'completed a fix': 'funnelCompleted',
    'multiple fixes': 'funnelMultiple',
    'monthly cash freed up': 'valueMonthly',
    'prescribed debt challenged': 'valuePrescribed',
    'arrears under active intervention': 'valueArrears',
    'avg saving per active employee': 'valueAvgSaving',
    'highest stress site': 'stressHighest',
    'lowest stress site': 'stressLowest',
    'most engaged site': 'stressEngaged',
    'most indebted site': 'stressIndebted',
    'engagement': 'wellnessEngagement',
    'cashflow relief': 'wellnessCashflow',
    'debt risk': 'wellnessDebt',
    'insurance efficiency': 'wellnessInsurance'
  };
  return map[k] || '';
}
function employerInfoButton(key) {
  return key ? pfInfoButton(key) : '';
}

/* ─────────────────── ACT 1: KPI cards ─────────────────── */
function sparkline(points, color) {
  const w = 180,
    h = 54,
    max = Math.max(...points),
    min = Math.min(...points);
  const norm = v => h - 6 - (v - min) / (max - min || 1) * (h - 14);
  const step = w / (points.length - 1);
  let d = points.map((p, i) => (i ? 'L' : 'M') + (i * step).toFixed(1) + ' ' + norm(p).toFixed(1)).join(' ');
  let area = d + ` L${w} ${h} L0 ${h} Z`;
  const id = 'sp' + Math.random().toString(36).slice(2, 7);
  return `<svg class="kpi-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <path d="${area}" fill="${color}" fill-opacity=".08"/>
    <path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

/* ─────────────────── Executive summary band ─────────────────── */

/* ─────────────────── Workforce Financial Wellness Score ─────────────────── */
// Shared with the driver bars below so a driver's colour always means the same
// thing as the score band's colour Not available improving/strong shines dark green, at
// risk is amber, critical is red. Thresholds match wellnessBand() server-side.
function brandSeries(i = 0) {
  const vars = ['--chart-engagement', '--chart-cashflow', '--chart-debt', '--chart-insurance', '--chart-workforce', '--chart-low', '--chart-mid', '--chart-high'];
  return `var(${vars[Math.abs(i) % vars.length]})`;
}
function ragLights(rag) {
  const state = rag === 'green' ? 'green' : rag === 'amber' ? 'amber' : 'red';
  return `<span class="rag-lights" aria-label="RAG status: ${state}"><i class="rag-dot red ${state === 'red' ? 'on' : ''}"></i><i class="rag-dot amber ${state === 'amber' ? 'on' : ''}"></i><i class="rag-dot green ${state === 'green' ? 'on' : ''}"></i></span>`;
}
function bandTone(score) {
  if (score >= 60) return {
    c: 'var(--chart-low)',
    bg: 'color-mix(in srgb, var(--chart-low) 12%, white)',
    border: 'color-mix(in srgb, var(--chart-low) 32%, white)',
    rag: 'green'
  }; // Strong / Improving
  if (score >= 40) return {
    c: 'var(--chart-mid)',
    bg: 'color-mix(in srgb, var(--chart-mid) 12%, white)',
    border: 'color-mix(in srgb, var(--chart-mid) 32%, white)',
    rag: 'amber'
  }; // At risk
  return {
    c: 'var(--chart-high)',
    bg: 'color-mix(in srgb, var(--chart-high) 12%, white)',
    border: 'color-mix(in srgb, var(--chart-high) 32%, white)',
    rag: 'red'
  }; // Critical
}
function renderWellness() {
  updateWellness({
    wellness: DATA.wellness,
    live: window.__LIVE__,
    comparisonLabel: DATA.filterContext?.comparison?.label,
    colours: (DATA.wellness?.drivers || []).map((d, i) => brandSeries(i)),
    metricKeys: (DATA.wellness?.drivers || []).map(d => employerMetricKey(d.name)),
    definitions: EMPLOYER_METRIC_INFO
  });
}

/* ─────────────────── ACT 2: funnel ─────────────────── */

/* ─────────────────── ACT 2: outcomes ─────────────────── */

/* ─────────────────── ACT 3: value strip ─────────────────── */

/* ─────────────────── ACT 3: savings area chart ─────────────────── */

/* ─────────────────── ACT 3: debt pressure profile ─────────────────── */

/* ─────────────────── ACT 3: creditor table ─────────────────── */
function initials(n) {
  return n.split(/\s|\//)[0].slice(0, 2).toUpperCase();
}

/* ─────────────────── ACT 4: region bars ─────────────────── */

/* ─────────────────── ACT 4: stress map summary strip ─────────────────── */

/* ─────────────────── ACT 4: income donut ─────────────────── */

/* ─────────────────── ACT 4: ratings ─────────────────── */

/* ─────────────────── ACT 5: debt states (three honest buckets) ─────────────────── */

/* ─────────────────── ACT 5: prescription ─────────────────── */

/* ─────────────────── ACT 5: referral ─────────────────── */

/* ─────────────────── ACT 6: webchat engagement ─────────────────── */
/* ─────────────────── footnote ─────────────────── */
renderMarkup(document.getElementById('footnote'), '<strong>How we define the headline numbers.</strong> &nbsp;<em>Employees better off</em> = unique employees who completed at least one journey with a concrete result: a lower monthly premium or instalment, a settlement or arrangement put in place, a prescribed-debt challenge lodged, or an interest-free emergency cash advance set up. It counts people, not actions (one person who fixed two things counts once). Employees who only received guidance, without a completed fix, are not included. &nbsp;<em>Debt under active intervention</em> = arrears where a settlement or reduced-instalment arrangement has actually been sent; it excludes prescribed debt being contested (shown separately) and debt the employee could not afford to arrange, where we instead educated them on prescription to self-manage (also shown separately).<br><br>' + 'Simulated demonstration data for the empower-fin Dashboard Portal. Figures are illustrative and reconciled to the consumer journey model. Employee-level data is aggregated and de-identified; individual financial information is never exposed to the employer. Underwriting by Guardrisk Life Insurance Company Limited. Intermediary services: EmpowerFS (Pty) Ltd, FSP 53395.');

/* ════════════════════════════════════════════════════════════════════
   INTERACTION LAYER
   ════════════════════════════════════════════════════════════════════ */

/* keep a pristine copy so filters can re-derive from source */
let BASE = JSON.parse(JSON.stringify(DATA));
let LIVE_REQUEST_SEQ = 0;

/* view state */
const STATE = {
  period: 'all',
  // '30' | 'q' | 'all'
  region: 'all',
  // region name or 'all'
  income: 'all',
  // income band name or 'all'
  audience: 'employer'
};

/* period scaling Not available figures shrink for shorter windows so the demo feels live */
const PERIOD = {
  '30': {
    f: 0.12,
    label: 'Last 30 days',
    ratings: 142,
    shares: 118
  },
  'q': {
    f: 0.34,
    label: 'This quarter',
    ratings: 486,
    shares: 402
  },
  'all': {
    f: 1.00,
    label: 'Programme to date',
    ratings: 1640,
    shares: 1284
  }
};
function clearAll() {
  updateWellness(null);
  updateEmployerOverview(null);
  updateEmployerCharts(null);
}

// A single optional visual must never prevent the rest of the dashboard from
// painting. This is especially important on mobile where a partial payload
// or browser-specific SVG edge case can otherwise leave the page looking blank.
function safeRender(fn) {
  try {
    fn();
  } catch (err) {
    console.warn('Dashboard visual failed:', err);
  }
}
function formatRand(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return 'Not available';
  return 'R ' + Math.round(n).toLocaleString('en-ZA');
}
function formatRandThousands(v) {
  // Historical helper name retained for compatibility. Dashboard comparison
  // payloads are already full rand values; multiplying by 1,000 corrupts
  // Executive Insight (e.g. R56,899 -> R56,899,000).
  const n = Number(v);
  if (!Number.isFinite(n)) return 'Not available';
  return 'R ' + Math.round(n).toLocaleString('en-ZA');
}
function niceTicks(values, count = 5) {
  const nums = values.map(Number).filter(Number.isFinite);
  if (!nums.length) return [0];
  const min = Math.min(0, ...nums),
    max = Math.max(...nums);
  if (max <= min) return [min];
  const raw = (max - min) / Math.max(1, count - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const unit = raw / mag;
  const step = (unit >= 5 ? 5 : unit >= 2 ? 2 : 1) * mag;
  const start = Math.floor(min / step) * step,
    end = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = start; v <= end + step * .001 && ticks.length < 12; v += step) ticks.push(Math.round(v * 1e6) / 1e6);
  return ticks.length >= 2 ? ticks : [min, max];
}
function displayMoney(v) {
  const s = String(v ?? '');
  return s.replace(/R\s*([0-9][0-9,]*(?:\.[0-9]+)?)\s*([kKmM])\b/g, (_, num, unit) => {
    const n = parseFloat(num.replace(/,/g, ''));
    const mult = unit.toLowerCase() === 'm' ? 1e6 : 1e3;
    return 'R ' + Math.round(n * mult).toLocaleString('en-ZA');
  });
}
function installMoneyFormatter() {
  const formatNode = node => {
    if (node.nodeType === 3 && /R\s*[0-9][0-9,]*(?:\.[0-9]+)?\s*[kKmM]\b/.test(node.nodeValue)) node.nodeValue = displayMoney(node.nodeValue);
  };
  const walk = root => {
    if (!root) return;
    if (root.nodeType === 3) formatNode(root);else root.childNodes?.forEach(walk);
  };
  walk(document.body);
  const mo = new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(walk)));
  mo.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/* helpers to scale numbers/strings */
function scaleNum(n, f) {
  return Math.round(n * f);
}
function randMoney(v, f) {
  const m = String(v).match(/R?\s*([\d.,]+)\s*([mk]?)/i);
  if (!m) return v;
  const num = parseFloat(m[1].replace(/,/g, ''));
  const unit = m[2].toLowerCase();
  let abs = unit === 'm' ? num * 1e6 : unit === 'k' ? num * 1e3 : num;
  abs *= f;
  return 'R ' + Math.round(abs).toLocaleString('en-ZA');
}
function saveCurrentView() {
  const key = 'empower-fin.savedViews';
  const views = JSON.parse(localStorage.getItem(key) || '[]');
  const name = window.prompt('Name this saved view', DATA.filterContext?.label || 'Saved view');
  if (!name) return;
  const item = {
    id: Date.now().toString(36),
    name: name.trim().slice(0, 80),
    url: location.pathname + location.search
  };
  localStorage.setItem(key, JSON.stringify([item, ...views].slice(0, 20)));
  showToast('Saved view', 'This view is saved on this browser.');
}
function openQuickActions() {
  showQuickActions();
}
/* rebuild DATA from BASE according to STATE, then re-render everything */
function applyState() {
  // When real data is loaded from the API, render it directly. The period /
  // region scaling below is demo-only machinery (it multiplies figures by
  // illustrative ratios); applying it to real snapshots would distort them.
  if (window.__LIVE__) {
    clearAll();
    [renderExec, renderWellness].forEach(safeRender);
    safeRender(() => wireMetricTips(document.getElementById('employer-view')));
    updateContextLine();
    const siteLabel = document.querySelector('#region-filter .tag-label');
    const incomeLabel = document.querySelector('#income-filter .tag-label');
    if (siteLabel) siteLabel.textContent = DATA.filterContext?.site || (STATE.region === 'all' ? 'All regions' : STATE.region);
    if (incomeLabel) incomeLabel.textContent = DATA.filterContext?.incomeLabel || (STATE.income === 'all' ? 'All income bands' : STATE.income);
    requestAnimationFrame(() => fitResponsiveDataValues());
    return;
  }
  const p = PERIOD[STATE.period],
    f = p.f;
  // region filter factor (relative share of that site) Not available illustrative
  const regionShare = {
    'all': 1,
    'Vaalwater Plant': 0.34,
    'Secunda Site': 0.22,
    'Sasolburg': 0.18,
    'Head Office': 0.14,
    'Field / Remote': 0.12
  };
  const incomeShare = {
    'all': 1,
    'Under R8k/mo': 0.30,
    'R8k–R15k/mo': 0.42,
    'R15k–R25k/mo': 0.19,
    'Over R25k/mo': 0.09
  };
  const segF = (regionShare[STATE.region] || 1) * (incomeShare[STATE.income] || 1);
  const F = f * segF;

  // KPIs
  DATA.kpis.takeUp.enrolled = scaleNum(BASE.kpis.takeUp.enrolled, segF);
  DATA.kpis.takeUp.pct = STATE.region === 'all' && STATE.income === 'all' ? BASE.kpis.takeUp.pct : Math.min(96, Math.round(BASE.kpis.takeUp.pct * (0.9 + segF * 0.3)));
  DATA.kpis.activated.count = scaleNum(BASE.kpis.activated.count, F);
  DATA.kpis.activated.pct = STATE.region === 'all' && STATE.income === 'all' ? BASE.kpis.activated.pct : Math.min(90, Math.round(BASE.kpis.activated.pct * (0.85 + segF * 0.35)));
  DATA.kpis.monthlySaving.rand = scaleNum(BASE.kpis.monthlySaving.rand, F);

  // funnel
  DATA.funnel = BASE.funnel.map(x => ({
    ...x,
    n: scaleNum(x.n, segF)
  }));

  // outcomes
  DATA.outcomes = BASE.outcomes.map(o => ({
    ...o,
    count: scaleNum(o.count, F),
    stat: o.key === 'sti' ? String(scaleNum(parseInt(o.stat), F)) : randMoney(o.stat, F)
  }));

  // value strip
  DATA.valueStrip = BASE.valueStrip.map((s, i) => {
    if (i === 3) return s; // per-employee avg unchanged by period
    return {
      ...s,
      v: randMoney(s.v, F),
      d: i === 0 ? randMoney('R 4.62m', F) + ' annualised' : s.d
    };
  });

  // savings series: take a tail proportional to period
  const keep = STATE.period === '30' ? 2 : STATE.period === 'q' ? 4 : BASE.savings.length;
  DATA.savings = BASE.savings.slice(-keep).map(v => Math.round(v * segF));
  DATA.savingsLabels = BASE.savingsLabels.slice(-keep);

  // creditors
  DATA.creditors = BASE.creditors.map(c => ({
    ...c,
    accounts: scaleNum(c.accounts, F),
    balance: randMoney(c.balance, F)
  }));
  DATA.creditorsTotal = {
    accounts: scaleNum(BASE.creditorsTotal.accounts, F),
    balance: randMoney(BASE.creditorsTotal.balance, F)
  };

  // income & regions stay structural (they ARE the breakdown); dim non-selected
  DATA.income = BASE.income.map(b => ({
    ...b,
    count: scaleNum(b.count, f)
  }));
  DATA.regions = BASE.regions.slice();

  // ratings & referral
  DATA.ratings = {
    ...BASE.ratings,
    responses: p.ratings
  };
  DATA.referral = {
    ...BASE.referral,
    shares: p.shares,
    impliedReach: '≈ ' + scaleNum(3900, f).toLocaleString()
  };

  // chat: scale conversation volumes by period (themes/structure stay)
  DATA.chat = JSON.parse(JSON.stringify(BASE.chat));
  DATA.chat.conversations = scaleNum(BASE.chat.conversations, f);
  DATA.chat.byJourney = BASE.chat.byJourney.map(j => ({
    ...j,
    convos: scaleNum(j.convos, f),
    themes: j.themes.map(t => ({
      ...t,
      n: scaleNum(t.n, f)
    }))
  }));
  DATA.chat.trending = BASE.chat.trending.map(t => ({
    ...t,
    n: scaleNum(t.n, f)
  }));
  const ck = STATE.period === '30' ? 2 : STATE.period === 'q' ? 4 : BASE.chat.volume.length;
  DATA.chat.volume = BASE.chat.volume.slice(-ck);

  // debt states scale by period/segment
  DATA.debtStates = {
    active: {
      ...BASE.debtStates.active,
      rand: scaleNum(BASE.debtStates.active.rand, F),
      employees: scaleNum(BASE.debtStates.active.employees, F)
    },
    challenged: {
      ...BASE.debtStates.challenged,
      rand: scaleNum(BASE.debtStates.challenged.rand, F),
      employees: scaleNum(BASE.debtStates.challenged.employees, F)
    },
    guided: {
      ...BASE.debtStates.guided,
      rand: scaleNum(BASE.debtStates.guided.rand, F),
      employees: scaleNum(BASE.debtStates.guided.employees, F)
    }
  };

  // exec summary: recompute headline figures from scaled data so the band always matches
  DATA.exec = {
    items: [{
      v: DATA.kpis.takeUp.enrolled.toLocaleString(),
      l: "employees enrolled"
    }, {
      v: 'R ' + DATA.kpis.monthlySaving.rand.toLocaleString(),
      l: "monthly cashflow restored"
    }, {
      v: randMoney('R 6.4m', F).replace('.00', ''),
      l: "debt under active intervention"
    }, {
      v: scaleNum(274, F).toLocaleString(),
      l: "prescribed debts challenged"
    }, {
      v: scaleNum(812, F).toLocaleString(),
      l: "employees better off"
    }, {
      v: BASE.kpis.avgRating.val.toFixed(1) + "/5",
      l: "employee satisfaction"
    }]
  };

  // wellness score stays structural (an index, not a volume); leave as BASE
  DATA.wellness = JSON.parse(JSON.stringify(BASE.wellness));
  clearAll();
  renderExec();
  renderWellness();

  // Fit the current render after both demo and live data updates. The callback
  // reads the current nodes, so a late demo callback cannot retain old metrics.
  requestAnimationFrame(() => fitResponsiveDataValues());
  wireMetricTips(document.getElementById('employer-view'));
  updateContextLine();
}
function fitResponsiveDataValues(root = document) {
  const nodes = root.querySelectorAll?.('.kpi-value,.stat-value,.metric-value,.stat-cell .v,.rating-big,.stress-v,.hbar-val,.rb-val,.dp-pct') || [];
  nodes.forEach(node => {
    node.style.whiteSpace = 'nowrap';
    node.style.overflow = 'visible';
    const cs = getComputedStyle(node);
    const original = parseFloat(cs.fontSize);
    // Fitting may shrink a value, but must never enlarge a smaller CSS label.
    const min = Math.min(original, node.matches('.rating-big') ? 28 : 14);
    const parent = node.parentElement;
    if (!parent || !Number.isFinite(original)) return;
    node.style.fontSize = original + 'px';
    let size = original;
    const maxWidth = Math.max(40, parent.clientWidth);
    while (size > min && node.scrollWidth > maxWidth + 1) {
      size = Math.max(min, size - 0.5);
      node.style.fontSize = size + 'px';
    }
    // If even the minimum would not fit, the parent must reflow; never clip
    // the financial value to make a grid appear narrower than its content.
    if (node.scrollWidth > maxWidth + 1) {
      // The containing layout must reflow rather than breaking a financial
      // number into individual characters. Keep the value atomic.
      node.style.fontSize = min + 'px';
    }
  });
}
// Number fitting depends on available width. A height-only resize (including
// a full-page capture) must not mutate typography after a settled render.
let lastFitViewportWidth = window.innerWidth;
window.addEventListener('resize', () => {
  if (window.innerWidth === lastFitViewportWidth) return;
  lastFitViewportWidth = window.innerWidth;
  requestAnimationFrame(() => fitResponsiveDataValues());
}, {
  passive: true
});
onReady(() => {
  document.getElementById('btn-save-view')?.addEventListener('click', saveCurrentView);
  document.getElementById('btn-command')?.addEventListener('click', openQuickActions);
});
function updateContextLine() {
  const parts = [];
  if (window.__LIVE__ && DATA.filterContext) {
    parts.push(DATA.filterContext.label || 'Programme to date');
    if (DATA.filterContext.site) parts.push(DATA.filterContext.site);
    if (DATA.filterContext.incomeLabel) parts.push(DATA.filterContext.incomeLabel);
  } else {
    parts.push(PERIOD[STATE.period].label);
    if (STATE.region !== 'all') parts.push(STATE.region);
    if (STATE.income !== 'all') parts.push(STATE.income);
  }
  const sub = document.getElementById('ctx-sub');
  if (sub) sub.textContent = parts.join(' · ');
  const tag = document.getElementById('emp-tag');
  if (tag) tag.lastChild.textContent = hasValue(DATA.kpis?.takeUp?.enrolled) ? ' ' + fmtCount(DATA.kpis.takeUp.enrolled) + ' enrolled' : ' Enrolment data not loaded';
}

/* ─────── wire: period segmented control ─────── */
/* ─────── sync: period selector reflects current state ─────── */
function syncPeriodControl() {
  const sel = document.getElementById('month-select');
  if (!sel) return;
  if (window.__LIVE__) {
    const quarter = quarterFromUrl(),
      period = periodFromUrl();
    const rangeParam = new URLSearchParams(location.search).get('range');
    if (quarter && sel.querySelector(`option[value="q:${quarter}"]`)) sel.value = 'q:' + quarter;else if (period && sel.querySelector(`option[value="${period}"]`)) sel.value = period;else if (rangeParam === '30d') sel.value = '30d';else if (rangeParam === 'quarter') sel.value = 'qtd';else if (rangeParam === 'all') sel.value = 'all';else sel.value = ''; // no params, or range=latest Not available both mean "Latest period"
  } else {
    sel.value = STATE.period === '30' ? '30d' : STATE.period === 'q' ? 'qtd' : 'all';
  }
  updatePeriodControlTone();
}

/* ─────── wire: filter dropdowns ─────── */
function buildDropdown(tagId, options, currentValue, onPick) {
  const tag = document.getElementById(tagId);
  if (!tag) return;
  // Rebuild the menu every time live data is refreshed (including when an
  // admin changes employer). The previous implementation appended a second
  // menu and left the old employer's region/income choices attached.
  tag.querySelector('.dropdown-menu')?.remove();
  const menu = el('<div class="dropdown-menu"></div>');
  options.forEach(o => {
    const item = el(`<button class="dropdown-item${o.value === currentValue ? ' on' : ''}" data-v="${o.value}">${o.label}</button>`);
    item.addEventListener('click', e => {
      e.stopPropagation();
      menu.querySelectorAll('.dropdown-item').forEach(x => x.classList.remove('on'));
      item.classList.add('on');
      tag.querySelector('.tag-label').textContent = o.label;
      menu.classList.remove('open');
      onPick(o.value);
    });
    menu.appendChild(item);
  });
  tag.appendChild(menu);
  tag.onclick = e => {
    e.stopPropagation();
    document.querySelectorAll('.dropdown-menu.open').forEach(m => {
      if (m !== menu) m.classList.remove('open');
    });
    menu.classList.toggle('open');
  };
}
function wireFilters() {
  const siteOptions = window.__LIVE__ && DATA.filterOptions ? DATA.filterOptions.sites || DATA.filterOptions.regions || [] : BASE.regions.map(r => ({
    value: r.name,
    label: r.name
  }));
  const incomeOptions = window.__LIVE__ && DATA.filterOptions ? DATA.filterOptions.incomes || [] : BASE.income.map(b => ({
    value: b.value || b.name,
    label: b.name
  }));
  buildDropdown('region-filter', [{
    value: 'all',
    label: 'All regions'
  }].concat(siteOptions), STATE.region, v => {
    if (window.__LIVE__) switchFilter('site', v);else {
      STATE.region = v;
      applyState();
    }
  });
  buildDropdown('income-filter', [{
    value: 'all',
    label: 'All income bands'
  }].concat(incomeOptions), STATE.income, v => {
    if (window.__LIVE__) switchFilter('income', v);else {
      STATE.income = v;
      applyState();
    }
  });
  const siteLabel = document.querySelector('#region-filter .tag-label');
  const incomeLabel = document.querySelector('#income-filter .tag-label');
  if (siteLabel && DATA.filterContext?.site) siteLabel.textContent = DATA.filterContext.site;
  if (incomeLabel && DATA.filterContext?.incomeLabel) incomeLabel.textContent = DATA.filterContext.incomeLabel;
  document.addEventListener('click', () => document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open')));
}

/* ─────── wire: view switch (employer / portfolio) ─────── */
let PF_RENDERED = false;
function wireAudience() {
  document.querySelectorAll('#audience-switch button').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#audience-switch button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      const portfolio = b.dataset.a === 'portfolio';
      const showEl = document.getElementById(portfolio ? 'portfolio-view' : 'employer-view');
      const hideEl = document.getElementById(portfolio ? 'employer-view' : 'portfolio-view');
      if (typeof window.__uiViewTransition === 'function') {
        window.__uiViewTransition(hideEl, showEl);
      } else {
        hideEl.style.display = 'none';
        showEl.style.display = '';
      }
      // hide employer-only filters in portfolio mode
      document.querySelector('.filters').style.display = portfolio ? 'none' : '';
      if (portfolio && !PF_RENDERED) {
        renderPortfolio();
        PF_RENDERED = true;
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
}

/* ─────── PORTFOLIO render ─────── */
const pfEsc = esc;
function pfMetricInfo(key) {
  return PORTFOLIO_METRIC_INFO[key] || EMPLOYER_METRIC_INFO[key] || {
    title: 'Measure',
    text: 'This measure uses the same calculation as the employer dashboard.',
    formula: ''
  };
}
function pfInfoButton(key) {
  const d = pfMetricInfo(key);
  return `<button type="button" class="metric-info" data-metric="${pfEsc(key)}" tabindex="0" aria-label="What is ${pfEsc(d.title)}?">i</button>`;
}
function pfMetricTooltip() {
  let tip = document.getElementById('metric-tooltip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'metric-tooltip';
    tip.className = 'metric-tooltip';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
  }
  return tip;
}
function pfShowMetricTip(btn) {
  const d = pfMetricInfo(btn.dataset.metric);
  const tip = pfMetricTooltip();
  renderMarkup(tip, `<b>${pfEsc(d.title)}</b>${pfEsc(d.text)}${d.formula ? `<span class="metric-formula">${pfEsc(d.formula)}</span>` : ''}`);
  tip.classList.add('open');
  const r = btn.getBoundingClientRect();
  const tr = tip.getBoundingClientRect();
  let left = Math.min(window.innerWidth - tr.width - 14, Math.max(14, r.left + r.width / 2 - tr.width / 2));
  let top = r.bottom + 9;
  if (top + tr.height > window.innerHeight - 10) top = Math.max(10, r.top - tr.height - 9);
  tip.style.left = left + 'px';
  tip.style.top = top + 'px';
}
function pfHideMetricTip() {
  document.getElementById('metric-tooltip')?.classList.remove('open');
}
function wireMetricTips(root = document) {
  root.querySelectorAll('.metric-info:not([data-tip-wired])').forEach(btn => {
    btn.dataset.tipWired = '1';
    btn.addEventListener('mouseenter', () => pfShowMetricTip(btn));
    btn.addEventListener('mouseleave', pfHideMetricTip);
    btn.addEventListener('focus', () => pfShowMetricTip(btn));
    btn.addEventListener('blur', pfHideMetricTip);
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      pfShowMetricTip(btn);
    });
  });
}
function renderPortfolio() {
  updatePortfolio(PORTFOLIO, {
    ...EMPLOYER_METRIC_INFO,
    ...PORTFOLIO_METRIC_INFO
  });
}

/* ─────── PDF export preparation ─────── */
function preparePdfPrint() {
  const title = document.getElementById('pdf-report-title');
  const period = document.getElementById('pdf-report-period');
  const generated = document.getElementById('pdf-report-generated');
  const score = document.getElementById('pdf-report-score');
  const footer = document.getElementById('pdf-footer-date');
  // The header markup is shared between employer-view and portfolio-view's
  // print output, so it has to be filled in differently depending on which
  // one is actually on screen Not available otherwise "Export book" prints a portfolio
  // report headed with a single employer's name and score.
  const portfolioActive = document.getElementById('portfolio-view')?.style.display !== 'none';
  if (portfolioActive) {
    const employerCount = document.getElementById('pf-employer-count')?.textContent?.trim() || '';
    const windowLabel = document.getElementById('pf-window-pill')?.textContent?.trim() || 'Reporting window: Not available';
    if (title) title.textContent = 'Portfolio Insights' + (employerCount ? ' · ' + employerCount : '');
    if (period) period.textContent = windowLabel;
    if (score) score.textContent = 'Across your whole book of employers';
  } else {
    const employer = document.querySelector('.emp')?.textContent?.trim() || 'Employer';
    const periodLabel = document.getElementById('month-select')?.selectedOptions?.[0]?.textContent?.trim() || 'Latest available period';
    const scoreValue = Number(DATA?.wellness?.score);
    if (title) title.textContent = employer + ' · Employer Insights';
    if (period) period.textContent = periodLabel;
    if (score) score.textContent = 'Workforce Financial Wellness Score ' + (Number.isFinite(scoreValue) ? scoreValue : 'Not available') + ' / 100';
  }
  if (generated) generated.textContent = 'Generated ' + new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  if (footer) footer.textContent = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
window.addEventListener('beforeprint', preparePdfPrint);

/* ─────── wire: header buttons ─────── */
function wireHeaderBtns() {
  const exp = document.getElementById('btn-export');
  if (exp) exp.addEventListener('click', () => {
    exp.classList.add('loading');
    exp.textContent = 'Preparing…';
    preparePdfPrint();
    requestAnimationFrame(() => setTimeout(() => {
      exp.textContent = 'Export PDF';
      exp.classList.remove('loading');
      window.print();
    }, 180));
  });
  const pfExp = document.getElementById('btn-pf-export');
  if (pfExp) pfExp.addEventListener('click', () => {
    pfExp.classList.add('loading');
    pfExp.textContent = 'Preparing…';
    preparePdfPrint();
    setTimeout(() => {
      pfExp.textContent = 'Export book';
      pfExp.classList.remove('loading');
      window.print();
    }, 500);
  });
  const sch = document.getElementById('btn-schedule');
  if (sch) sch.addEventListener('click', openScheduleReport);
}
function openScheduleReport() {
  showScheduleReport({
    me: window.__ME__ || {},
    data: DATA,
    employerId: employerIdFromUrl(),
    period: periodFromUrl()
  });
}
/* ─────── toast ─────── */
let toastT;
function openToast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = el(`<div class="toast">${msg}</div>`);
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toastT);
  toastT = setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 300);
  }, 3400);
}

/* ─────── boot: fetch real data from the API, then render ─────── */
// Which employer to show. Default to the first the user can see; allow ?employer=ID.
const API_BASE = "";
function employerIdFromUrl() {
  const p = new URLSearchParams(location.search);
  return p.get('employer');
}
function periodFromUrl() {
  return new URLSearchParams(location.search).get('period');
}
function quarterFromUrl() {
  return new URLSearchParams(location.search).get('quarter');
}
function rangeFromUrl() {
  return new URLSearchParams(location.search).get('range') || 'all';
}
function syncStateFromUrl() {
  const range = rangeFromUrl();
  STATE.period = range === '30d' ? '30' : range === 'quarter' ? 'q' : 'all';
  STATE.region = new URLSearchParams(location.search).get('site') || 'all';
  STATE.income = new URLSearchParams(location.search).get('income') || 'all';
}
function apiFilterQuery() {
  const page = new URLSearchParams(location.search);
  const api = new URLSearchParams();
  ['period', 'quarter', 'range', 'site', 'income'].forEach(k => {
    const v = page.get(k);
    if (v) api.set(k, v);
  });
  if (!api.has('period') && !api.has('quarter') && !api.has('range')) api.set('range', 'latest');
  const q = api.toString();
  return q ? '?' + q : '';
}
function switchFilter(name, value, opts = {}) {
  const params = new URLSearchParams(location.search);
  if (value && value !== 'all') params.set(name, value);else if (name === 'range') params.set(name, 'all');else params.delete(name);
  if (opts.clearPeriod) {
    params.delete('period');
    params.delete('quarter');
  }
  if (name === 'period' || name === 'quarter') params.delete('range');
  history.replaceState(null, '', '?' + params.toString());
  syncStateFromUrl();
  if (window.__LIVE__) loadLiveData({
    refreshOnly: true
  });
}
async function loadLiveData({
  refreshOnly = false
} = {}) {
  const requestSeq = ++LIVE_REQUEST_SEQ;
  let me = window.__ME__ || null;
  const view = document.getElementById('employer-view');
  const splash = document.getElementById('welcome-splash');
  if (refreshOnly && view) {
    view.setAttribute('aria-busy', 'true');
    view.classList.add('is-refreshing');
  }
  if (!refreshOnly) {
    try {
      const r = await fetch('/api/auth/me');
      if (!r.ok) {
        location.href = '/login';
        return;
      }
      me = await r.json();
    } catch (e) {
      location.href = '/login';
      return;
    }
    window.__ME__ = me;
    addAuthBar(me);
    applyTheme(me.theme, me);
    handleWelcomeSplash(me);
    applySectionVisibility(me);
    populateEmployerSelect(me);
    applySyntheticDataNotice(me);
  }
  try {
    let id = employerIdFromUrl();
    if (!id && me?.employers?.length) id = me.employers[0].id;
    const employerSelect = document.getElementById('employer-select');
    if (employerSelect && id) employerSelect.value = id;
    syncStateFromUrl();
    const period = periodFromUrl(),
      quarter = quarterFromUrl();
    const qs = apiFilterQuery();
    const url = id ? `${API_BASE}/api/employers/${id}/dashboard${qs}` : `${API_BASE}/api/dashboard/first${qs}`;
    // Do not make the dashboard wait for the period picker or portfolio.
    // Mobile users get the actual visual payload as soon as it arrives.
    const periodsPromise = id ? populateMonthSelect(id, period, quarter).catch(() => {}) : Promise.resolve();
    const dashboardPromise = fetch(url, {
      cache: 'no-store'
    }).then(async r => {
      const body = await r.json().catch(() => ({}));
      if (!r.ok) {
        const error = new Error(body.error || 'no data');
        error.syncStatus = body.syncStatus || null;
        throw error;
      }
      return body;
    });
    const live = await dashboardPromise;
    if (requestSeq !== LIVE_REQUEST_SEQ) return;
    // Employer branding applies to normal branded users. Admin/Superadmin
    // remain on the empower-fin control-plane palette even while viewing client data.
    applyTheme(live.theme, me);
    DATA = live;
    BASE = JSON.parse(JSON.stringify(DATA));
    window.__LIVE__ = true;
    if (live.employer) {
      const h1 = document.querySelector('.head h1');
      if (h1) h1.firstChild.textContent = live.employer + ' ';
    }
    const sourceAt = live.sourceDataUpdatedAt || live.dataAsOf;
    renderRefreshStatus(live.syncStatus, sourceAt);
    renderMonthActivity(live.monthActivity, live.filterContext);
    renderDataQuality(live.dataQuality);
    setLiveFootnote(live.filterContext);
    document.getElementById('demo-banner')?.remove();
    applyState();
    updatePeriodControlTone();
    syncPeriodControl();
    wireFilters();
    if (!refreshOnly) {
      wireAudience();
      wireHeaderBtns();
    }
    if (refreshOnly && view) {
      view.removeAttribute('aria-busy');
      view.classList.remove('is-refreshing');
    }
    // Secondary portfolio work happens after the dashboard has painted.
    if (me?.modules?.portfolio) fetchPortfolioInBackground(requestSeq);
    await periodsPromise;
    if (requestSeq === LIVE_REQUEST_SEQ) {
      syncPeriodControl();
      updatePeriodControlTone();
    }
  } catch (e) {
    const demoMode = new URLSearchParams(location.search).get('demo') === '1';
    if (demoMode) {
      showDemoBanner();
      const fl = document.getElementById('data-fresh-label');
      if (fl) fl.textContent = 'Demo data';
      window.__LIVE__ = false;
      applyState();
    } else {
      showLiveError(e);
      wireAudience();
      wireHeaderBtns();
    }
  } finally {
    if (splash && (window.__LIVE__ || new URLSearchParams(location.search).get('demo') === '1')) splash.classList.add('hide');
    if (refreshOnly && view) {
      view.removeAttribute('aria-busy');
      view.classList.remove('is-refreshing');
    }
  }
}
async function fetchPortfolioInBackground(requestSeq) {
  try {
    const pfParams = new URLSearchParams(),
      pageParams = new URLSearchParams(location.search);
    ['period', 'quarter', 'range'].forEach(k => {
      const v = pageParams.get(k);
      if (v) pfParams.set(k, v);
    });
    if (!pfParams.has('period') && !pfParams.has('quarter') && !pfParams.has('range')) pfParams.set('range', 'latest');
    const pf = await fetch(`${API_BASE}/api/portfolio?${pfParams.toString()}`).then(async r => {
      if (!r.ok) throw new Error('portfolio unavailable');
      return r.json();
    });
    if (requestSeq !== LIVE_REQUEST_SEQ) return;
    if (Array.isArray(pf.employers)) {
      PORTFOLIO.employers = pf.employers;
      PORTFOLIO.filterContext = pf.filterContext || null;
      PORTFOLIO.live = true;
      PF_RENDERED = false;
      renderPortfolio();
    }
  } catch (_) {
    PORTFOLIO.live = false;
    PORTFOLIO.error = true;
    if (!PORTFOLIO.explicitDemo) PORTFOLIO.employers = [];
    PF_RENDERED = false;
    renderPortfolio();
  }
}

// month picker Not available populated from the snapshots that actually exist
const PERIOD_SCORE_TONE = {
  strong: {
    c: '#137a47',
    bg: '#e3f6ec',
    border: '#b8e6cc'
  },
  risk: {
    c: '#8a5a10',
    bg: '#fff2df',
    border: '#f3cf98'
  },
  critical: {
    c: '#a3271c',
    bg: '#fdeceb',
    border: '#f3b8b1'
  }
};
function periodScoreTone(score) {
  const n = Number(score);
  if (!Number.isFinite(n)) return null;
  if (n >= 60) return PERIOD_SCORE_TONE.strong;
  if (n >= 40) return PERIOD_SCORE_TONE.risk;
  return PERIOD_SCORE_TONE.critical;
}
function updatePeriodControlTone() {
  const sel = document.getElementById('month-select');
  if (!sel) return;
  const opt = sel.options[sel.selectedIndex];
  let score = opt?.dataset?.score;
  if (!score && (!opt?.value || opt.value === '')) score = DATA?.wellness?.score;
  const tone = periodScoreTone(score);
  sel.style.color = tone?.c || '';
  sel.style.borderColor = tone?.border || '';
  sel.style.backgroundColor = tone?.bg || '';
}
async function populateMonthSelect(employerId, selected, selectedQuarter) {
  const sel = document.getElementById('month-select');
  if (!sel) return;
  sel.querySelectorAll('optgroup').forEach(g => g.remove());
  try {
    const qs = new URLSearchParams();
    const page = new URLSearchParams(location.search);
    if (page.get('site')) qs.set('site', page.get('site'));
    if (page.get('income')) qs.set('income', page.get('income'));
    const suffix = qs.toString() ? `?${qs.toString()}` : '';
    const periods = await fetch(`${API_BASE}/api/employers/${employerId}/periods${suffix}`, {
      cache: 'no-store'
    }).then(r => r.json());
    if (!Array.isArray(periods) || periods.length < 1) {
      updatePeriodControlTone();
      return;
    }
    const fmt = p => {
      const [y, m] = p.split('-');
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m - 1] + ' ' + y;
    };
    const scoreText = score => Number.isFinite(Number(score)) ? ` · Score ${Math.round(Number(score))}` : ' · Score unavailable';
    const quarters = new Map();
    periods.forEach(p => {
      const [y, m] = p.period.split('-').map(Number);
      const q = Math.floor((m - 1) / 3) + 1,
        key = `${y}-Q${q}`;
      const bucket = quarters.get(key) || {
        label: `Q${q} ${y}`,
        scores: []
      };
      if (Number.isFinite(Number(p.optimiseScore))) bucket.scores.push(Number(p.optimiseScore));
      quarters.set(key, bucket);
    });
    const quarterKeys = [...quarters.keys()].sort().reverse();
    const avg = arr => arr.length ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length) : null;
    let extra = '';
    if (quarterKeys.length) {
      extra += `<optgroup label="Quarters">` + quarterKeys.map(key => {
        const q = quarters.get(key),
          score = avg(q.scores);
        return `<option value="q:${key}" data-score="${score ?? ''}" ${key === selectedQuarter ? 'selected' : ''}>${q.label}${scoreText(score).replace(" · Score ", ": Score ")}</option>`;
      }).join('') + `</optgroup>`;
    }
    extra += `<optgroup label="Months / dates">` + periods.map(p => {
      const score = Number.isFinite(Number(p.optimiseScore)) ? Math.round(Number(p.optimiseScore)) : null;
      return `<option value="${esc(p.period)}" data-score="${score ?? ''}" ${p.period === selected ? 'selected' : ''}>${fmt(p.period)}${scoreText(score).replace(" · Score ", ": Score ")}</option>`;
    }).join('') + `</optgroup>`;
    insertMarkup(sel, 'beforeend', extra);
  } catch (e) {/* static options still work fine without a periods list */}
  updatePeriodControlTone();
}
function switchPeriod(value) {
  if (!window.__LIVE__) {
    // Demo/pre-load mode: no real quarter/month data yet, only the relative
    // buckets (which is all the static options offer) apply. "Latest" has no
    // distinct demo bucket of its own, so it reads as the all-time demo view.
    STATE.period = value === '30d' ? '30' : value === 'qtd' ? 'q' : 'all';
    applyState();
    return;
  }
  const id = employerIdFromUrl();
  const params = new URLSearchParams(location.search);
  params.delete('period');
  params.delete('quarter');
  params.delete('range');
  if (value === '30d') params.set('range', '30d');else if (value === 'qtd') params.set('range', 'quarter');else if (value === 'all') params.set('range', 'all');else if (value.startsWith('q:')) params.set('quarter', value.slice(2));else if (value) params.set('period', value);
  // else "" (Latest period): leave every filter param cleared Not available that's
  // exactly the state apiFilterQuery() resolves to range=latest itself, so
  // it always matches whatever the server considers the newest period.
  if (id) params.set('employer', id);
  history.replaceState(null, '', '?' + params.toString());
  loadLiveData({
    refreshOnly: true
  });
}

// activity strip for the selected flow window
function renderMonthActivity(a, context) {
  const host = document.querySelector('.head');
  if (!host) return;
  document.getElementById('month-activity')?.remove();
  if (!a) return;
  const label = a && a.label || context && context.label || 'selected period';
  const value = (v, fallback = 'Not available') => v === null || v === undefined || v === '' ? fallback : v;
  const enrolled = value(a.enrolled),
    completed = value(a.completed),
    savings = value(a.savingUnlocked);
  const advances = value(a.advancesCount),
    advanceTotal = value(a.advancesTotal);
  const strip = el(`<div id="month-activity" style="margin-top:14px;display:flex;flex-wrap:wrap;gap:22px;padding:13px 18px;background:#f7f4ff;border:1px solid var(--brand-soft);border-radius:12px;font:600 13px Manrope,sans-serif;color:var(--brand-primary);">
    <span style="color:#5b6b7a;font-weight:700;">${label}:</span>
    <span><b>${enrolled}</b> newly enrolled</span>
    <span><b>${completed}</b> fixes completed</span>
    <span><b>${savings}</b>${savings === 'Not available' ? '' : '/mo'} new savings</span>
    <span><b>${advances}</b> wage advances${advanceTotal === 'Not available' ? '' : ' · <b>' + advanceTotal + '</b>'}</span>
  </div>`);
  host.appendChild(strip);
}

// employer selector in the filter row
function populateEmployerSelect(me) {
  const sel = document.getElementById('employer-select');
  if (!sel || !me.employers || !me.employers.length) return;
  const cur = employerIdFromUrl() || me.employers[0].id;
  renderMarkup(sel, me.employers.map(e => `<option value="${esc(e.id)}" ${e.id === cur ? 'selected' : ''}>${esc(e.name)}</option>`).join(''));
  // always show the field (even with one employer) so it's clearly filterable
  sel.style.display = 'inline-block';
}
function switchEmployer(id) {
  const p = new URLSearchParams(location.search);
  p.set('employer', id);
  p.delete('period');
  p.delete('site');
  p.delete('income');
  history.replaceState(null, '', '?' + p.toString());
  if (window.__LIVE__) loadLiveData({
    refreshOnly: true
  });
}
function renderDataQuality(q) {
  document.getElementById('data-quality-note')?.remove();
  if (!q || !Array.isArray(q.warnings) || !q.warnings.length) return;
  const host = document.querySelector('.head');
  if (!host) return;
  const note = el(`<div id="data-quality-note" style="margin-top:12px;padding:10px 14px;border-radius:10px;background:#fff8e8;border:1px solid #efd49b;color:#7a5512;font:600 12px Manrope,sans-serif;">Data quality: ${q.warnings.join(' ')}</div>`);
  host.appendChild(note);
}
function setLiveFootnote(context) {
  const f = document.getElementById('footnote');
  if (!f) return;
  const stock = context?.semantics?.stock || 'Stock measures are measured as at the selected end date.';
  const flow = context?.semantics?.flow || 'Activity measures are measured inside the selected range.';
  renderMarkup(f, '<strong>How the dashboard filters.</strong> ' + stock + ' ' + flow + ' Employee-level data remains aggregated and de-identified; individual financial information is not exposed to the employer.');
}

// apply the channel partner's white-label theme (colours, logo, name)
// hide dashboard sections the signed-in user isn't permitted to see (server
// also redacts the underlying data for gated sections Not available this just matches
// the UI to it, and skips wasted rendering work for hidden sections).
function applySectionVisibility(me) {
  const sections = me.sections || {};
  document.querySelectorAll('.dash-section[data-section]').forEach(el => {
    const key = el.getAttribute('data-section');
    const visible = key in sections ? !!sections[key] : true; // unknown key -> fail open, don't hide
    el.style.display = visible ? '' : 'none';
  });
}
const BrandTheme = window.BrandEngine ? BrandEngine.themeController() : null; // owns light/dark brand tokens
const DEFAULT_PORTAL_BRAND = {
  accentColor: '0FC79B',
  primaryColor: '0FC79B',
  navyColor: '2B1D73'
};
const DEFAULT_PORTAL_CHARTS = {
  '--chart-engagement': '#4C3C92',
  '--chart-cashflow': '#087F65',
  '--chart-debt': '#607486',
  '--chart-insurance': '#6D5BB0',
  '--chart-workforce': '#2B1D73',
  '--chart-low': '#187A4D',
  '--chart-mid': '#9A5B00',
  '--chart-high': '#B5391F'
};
const DEFAULT_HEAD_SUB = 'How the financial wellbeing programme is landing across your workforce Not available who is using it, the outcomes achieved, and how employees rate the service.';
function restoreDefaultPortalIdentity() {
  const defaultBrand = document.getElementById('portal-brand-default');
  const partnerBrand = document.getElementById('portal-brand-partner');
  const partnerLogo = document.getElementById('portal-partner-logo');
  if (defaultBrand) defaultBrand.hidden = false;
  if (partnerBrand) {
    partnerBrand.hidden = true;
    partnerBrand.removeAttribute('data-partner-header-tone');
  }
  if (partnerLogo) {
    partnerLogo.removeAttribute('src');
    partnerLogo.removeAttribute('data-custom-logo');
    partnerLogo.alt = '';
  }
  const brandName = document.getElementById('channel-brand-name');
  if (brandName) brandName.textContent = '';
  document.querySelectorAll('.pdf-brand img').forEach(img => {
    img.src = '/static/the-fixer-logo.svg?v=6';
    img.removeAttribute('data-custom-logo');
  });
  const sub = document.querySelector('#employer-view > .head .head-sub');
  if (sub) sub.textContent = DEFAULT_HEAD_SUB;
  document.title = 'empower-fin Dashboard Portal';
}
function applyDefaultPortalTheme() {
  document.documentElement.classList.add('efs-default-brand');
  const root = document.documentElement.style;
  if (BrandTheme) {
    BrandTheme.set({
      brand: DEFAULT_PORTAL_BRAND,
      light: null,
      charts: DEFAULT_PORTAL_CHARTS
    });
  } else {
    ['--blue', '--blue-d', '--brand-primary', '--brand-primary-deep', '--ice', '--brand-soft', '--brand-grad-1', '--brand-grad-2', '--brand-grad-3', '--brand-grad-4', '--brand-grad-5', ...Object.keys(DEFAULT_PORTAL_CHARTS)].forEach(key => root.removeProperty(key));
  }
  root.setProperty('--engagement-color', 'var(--chart-engagement)');
  root.setProperty('--cashflow-color', 'var(--chart-cashflow)');
  root.setProperty('--debt-risk-color', 'var(--chart-debt)');
  root.setProperty('--insurance-color', 'var(--chart-insurance)');
  root.setProperty('--eligible-workforce-color', 'var(--chart-workforce)');
  root.setProperty('--stress-low-color', 'var(--chart-low)');
  root.setProperty('--stress-mid-color', 'var(--chart-mid)');
  root.setProperty('--stress-high-color', 'var(--chart-high)');
  restoreDefaultPortalIdentity();
}
function partnerHeaderTone(theme) {
  const raw = String(theme && (theme.navyColor || theme.primaryColor || theme.accentColor) || '').replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return 'mid';
  const r = parseInt(raw.slice(0, 2), 16) / 255,
    g = parseInt(raw.slice(2, 4), 16) / 255,
    b = parseInt(raw.slice(4, 6), 16) / 255;
  const lin = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const L = .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b);
  if (L < 0.22) return 'dark';
  if (L > 0.72) return 'light';
  return 'mid';
}
function applyPartnerHeaderLogoMode(theme) {
  const lockup = document.getElementById('portal-brand-partner');
  if (!lockup) return;
  lockup.setAttribute('data-partner-header-tone', partnerHeaderTone(theme));
}
function clearEmployerScopedTheme() {
  const target = document.getElementById('employer-view');
  if (!target) return;
  const keys = ['--blue', '--blue-d', '--brand-primary', '--brand-primary-raw', '--brand-primary-deep', '--brand-accent-raw', '--ice', '--ice-2', '--brand-soft', '--brand-vivid', '--bar-bg', '--brand-secondary', '--brand-bridge', '--brand-accent-soft', '--brand-primary-soft', '--surface-0', '--surface-1', '--surface-2', '--surface-3', '--surface-raised', '--surface-subtle', '--surface-mix-base', '--text-strong', '--text-muted', '--line-brand', '--partner-primary', '--partner-accent', '--partner-navy', '--product-primary', '--product-accent', '--system-focus', '--system-progress', '--cobrand-relation', '--brand-grad-1', '--brand-grad-2', '--brand-grad-3', '--brand-grad-4', '--brand-grad-5', '--chart-engagement', '--chart-cashflow', '--chart-debt', '--chart-insurance', '--chart-workforce', '--chart-low', '--chart-mid', '--chart-high', '--engagement-color', '--cashflow-color', '--debt-risk-color', '--insurance-color', '--eligible-workforce-color', '--stress-low-color', '--stress-mid-color', '--stress-high-color'];
  keys.forEach(k => target.style.removeProperty(k));
  target.removeAttribute('data-partner-theme');
}
function applyEmployerScopedTheme(theme) {
  const target = document.getElementById('employer-view');
  if (!target || !theme || theme.branded === false) {
    clearEmployerScopedTheme();
    return;
  }
  const hex = c => c ? '#' + String(c).replace(/^#/, '') : null;
  const accent = hex(theme.accentColor || theme.primaryColor || '#0FC79B');
  const primary = hex(theme.navyColor || theme.primaryColor || accent);
  const brand = {
    accentColor: accent,
    primaryColor: hex(theme.primaryColor) || accent,
    navyColor: primary
  };
  const scopedMode = document.documentElement.classList.contains('portal-dark') ? 'dark' : 'light';
  const fixerBrand = {
    accentColor: '#0FC79B',
    primaryColor: '#2B1D73',
    navyColor: '#2B1D73'
  };
  const coBrand = window.BrandEngine && BrandEngine.coBrandSystem ? BrandEngine.coBrandSystem(brand, fixerBrand, scopedMode) : null;
  const tokens = coBrand ? coBrand.tokens : window.BrandEngine && BrandEngine.themeTokens ? BrandEngine.themeTokens(brand, scopedMode) : {
    '--blue': accent,
    '--blue-d': shade(accent, -18),
    '--brand-primary': primary,
    '--brand-primary-deep': shade(primary, -22),
    '--ice': tint(accent, 92),
    '--brand-soft': tint(accent, 94),
    '--brand-vivid': accent,
    '--brand-grad-1': primary,
    '--brand-grad-2': mix(primary, accent, .45),
    '--brand-grad-3': accent,
    '--brand-grad-4': mix(accent, '#ffffff', .28),
    '--brand-grad-5': mix(accent, '#ffffff', .55)
  };
  Object.entries(tokens).forEach(([k, v]) => target.style.setProperty(k, String(v)));
  const chartPalette = coBrand ? coBrand.charts : complementaryPalette(accent, primary);
  if (coBrand && coBrand.diagnostics) {
    target.dataset.cobrandRelation = coBrand.diagnostics.relation || '';
  }
  Object.entries(chartPalette).forEach(([k, v]) => target.style.setProperty('--chart-' + k, v));
  target.style.setProperty('--engagement-color', 'var(--chart-engagement)');
  target.style.setProperty('--cashflow-color', 'var(--chart-cashflow)');
  target.style.setProperty('--debt-risk-color', 'var(--chart-debt)');
  target.style.setProperty('--insurance-color', 'var(--chart-insurance)');
  target.style.setProperty('--eligible-workforce-color', 'var(--chart-workforce)');
  target.style.setProperty('--stress-low-color', 'var(--chart-low)');
  target.style.setProperty('--stress-mid-color', 'var(--chart-mid)');
  target.style.setProperty('--stress-high-color', 'var(--chart-high)');
  target.setAttribute('data-partner-theme', '1');
}
function applyTheme(theme, user) {
  window.__dashboardActiveTheme = theme || null;
  window.__dashboardActiveUser = user || null;
  const root = document.documentElement.style;
  const privileged = user && ['ADMIN', 'SUPERADMIN'].includes(String(user.role || '').toUpperCase());
  // Admin/Superadmin must retain the original EFS/The Fixer interface
  // regardless of selected employer or channel-partner filters.
  if (privileged) {
    clearEmployerScopedTheme();
    applyDefaultPortalTheme();
    return;
  }
  if (!theme || theme.branded === false) {
    clearEmployerScopedTheme();
    applyDefaultPortalTheme();
    return;
  }
  clearEmployerScopedTheme();
  document.documentElement.classList.remove('efs-default-brand');
  const hex = c => c ? '#' + String(c).replace(/^#/, '') : null;
  const baseName = 'empower-fin Dashboard Portal';
  const accent = hex(theme.accentColor || theme.primaryColor || '#0FC79B');
  const primary = hex(theme.navyColor || theme.primaryColor || accent);
  if (!BrandTheme) {
    // legacy fallback (engine failed to load)
    root.setProperty('--blue', accent);
    root.setProperty('--blue-d', shade(accent, -18));
    root.setProperty('--brand-primary', primary);
    root.setProperty('--brand-primary-deep', shade(primary, -22));
    root.setProperty('--ice', tint(accent, 92));
    root.setProperty('--brand-soft', tint(accent, 94));
    root.setProperty('--brand-grad-1', shade(primary, 0));
    root.setProperty('--brand-grad-2', mix(primary, accent, .45));
    root.setProperty('--brand-grad-3', accent);
    root.setProperty('--brand-grad-4', mix(accent, '#ffffff', .28));
    root.setProperty('--brand-grad-5', mix(accent, '#ffffff', .55));
  }
  const partnerBrand = {
    accentColor: accent,
    primaryColor: hex(theme.primaryColor) || accent,
    navyColor: primary
  };
  const fixerBrand = {
    accentColor: '#0FC79B',
    primaryColor: '#2B1D73',
    navyColor: '#2B1D73'
  };
  const coBrand = window.BrandEngine && BrandEngine.coBrandSystem ? BrandEngine.coBrandSystem(partnerBrand, fixerBrand, document.documentElement.classList.contains('portal-dark') ? 'dark' : 'light') : null;
  const chartPalette = coBrand ? coBrand.charts : complementaryPalette(accent, primary);
  if (BrandTheme) {
    BrandTheme.set({
      brand: partnerBrand,
      endorser: fixerBrand,
      coBrand: true,
      light: 'engine',
      charts: {}
    });
  } else {
    if (coBrand) Object.entries(coBrand.tokens).forEach(([key, value]) => root.setProperty(key, String(value)));
    Object.entries(chartPalette).forEach(([key, value]) => root.setProperty('--chart-' + key, value));
  }
  root.setProperty('--engagement-color', 'var(--chart-engagement)');
  root.setProperty('--cashflow-color', 'var(--chart-cashflow)');
  root.setProperty('--debt-risk-color', 'var(--chart-debt)');
  root.setProperty('--insurance-color', 'var(--chart-insurance)');
  root.setProperty('--eligible-workforce-color', 'var(--chart-workforce)');
  root.setProperty('--stress-low-color', 'var(--chart-low)');
  root.setProperty('--stress-mid-color', 'var(--chart-mid)');
  root.setProperty('--stress-high-color', 'var(--chart-high)');
  const brandName = document.getElementById('channel-brand-name');
  const defaultBrand = document.getElementById('portal-brand-default');
  const partnerBrandEl = document.getElementById('portal-brand-partner');
  const partnerLogo = document.getElementById('portal-partner-logo');
  if (theme.logoDataUrl) {
    applyPartnerHeaderLogoMode(theme);
    if (defaultBrand) defaultBrand.hidden = true;
    if (partnerBrandEl) partnerBrandEl.hidden = false;
    if (partnerLogo) {
      partnerLogo.src = theme.logoDataUrl;
      partnerLogo.alt = (theme.name || 'Partner') + ' logo';
      partnerLogo.setAttribute('data-custom-logo', '1');
    }
    if (brandName) brandName.textContent = '';
    document.querySelectorAll('.pdf-brand img').forEach(img => {
      img.src = theme.logoDataUrl;
      img.setAttribute('data-custom-logo', '1');
    });
  } else {
    if (defaultBrand) defaultBrand.hidden = false;
    if (partnerBrandEl) partnerBrandEl.hidden = true;
    if (brandName) brandName.textContent = theme.name && theme.name !== baseName ? theme.name : '';
  }
  document.title = (theme.name || baseName) + ' Not available Employer Insights';
  if (theme.tagline) {
    const sub = document.querySelector('#employer-view > .head .head-sub');
    if (sub) sub.textContent = theme.tagline;
  }
}
window.addEventListener('portal-theme-change', () => {
  const t = window.__dashboardActiveTheme,
    u = window.__dashboardActiveUser;
  if (u && ['ADMIN', 'SUPERADMIN'].includes(String(u.role || '').toUpperCase())) {
    clearEmployerScopedTheme();
    applyDefaultPortalTheme();
  } else if (t && t.branded !== false) {
    applyTheme(t, u);
  } else {
    applyDefaultPortalTheme();
  }
});

// Create a full, repeatable chart palette from any valid employer brand hex.
// Hue rotation makes the charts complementary to (not copies of) the logo hues.
function complementaryPalette(accent, primary) {
  // Build a restrained, perceptually balanced enterprise chart system from the
  // extracted brand hues. OKLCH keeps perceived brightness more consistent than
  // the old HSL offsets, while contrast guards keep labels/marks readable.
  const BE = window.BrandEngine;
  if (BE && BE.deriveChartPalette) return BE.deriveChartPalette({
    accentColor: accent,
    primaryColor: primary
  });
  if (BE && BE.hexToLch && BE.lch && BE.ensureContrast) {
    const a = BE.hexToLch(accent),
      p = BE.hexToLch(primary || accent);
    const hue = a.C > .035 ? a.h : p.h;
    const chroma = Math.min(Math.max(a.C, .055), .16);
    const make = (offset, L, C = chroma) => BE.lch(clamp01(L), Math.min(C, .18), (hue + offset + 360) % 360);
    const safe = (hex, bg = '#ffffff') => BE.ensureContrast(hex, bg, 3.4);
    const colors = {
      engagement: safe(make(150, .50, chroma * .78)),
      cashflow: safe(make(175, .58, chroma * .70)),
      debt: safe(make(25, .50, chroma * .62)),
      insurance: safe(make(285, .48, chroma * .78)),
      workforce: safe(make(205, .54, chroma * .72)),
      low: safe(make(150, .58, chroma * .68)),
      mid: safe(make(65, .58, Math.max(.07, chroma * .62))),
      high: safe(make(5, .55, Math.max(.07, chroma * .62)))
    };
    // Guarantee a visually useful separation even when the source logo is
    // nearly monochromatic.
    const seen = new Set();
    for (const k of Object.keys(colors)) {
      if (seen.has(colors[k])) colors[k] = safe(make((Object.keys(colors).indexOf(k) + 1) * 43, .54, .075));
      seen.add(colors[k]);
    }
    return Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, '#' + v.replace(/^#/, '')]));
  }
  // Legacy fallback for an unavailable brand engine.
  const toHsl = hex => {
    const h = String(hex || '#777777').replace('#', '');
    const r = parseInt(h.slice(0, 2), 16) / 255,
      g = parseInt(h.slice(2, 4), 16) / 255,
      b = parseInt(h.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      d = max - min;
    let hue = 0;
    const l = (max + min) / 2;
    let sat = 0;
    if (d) {
      sat = d / (1 - Math.abs(2 * l - 1));
      if (max === r) hue = 60 * ((g - b) / d % 6);else if (max === g) hue = 60 * ((b - r) / d + 2);else hue = 60 * ((r - g) / d + 4);
    }
    return [(hue + 360) % 360, sat, l];
  };
  const fromHsl = (h, s, l) => {
    const c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(h / 60 % 2 - 1)),
      m = l - c / 2;
    let rgb = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return '#' + rgb.map(v => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('');
  };
  const [h, s] = toHsl(accent),
    [ph] = toHsl(primary);
  const make = (offset, light = .43, sat = Math.max(.42, s)) => fromHsl((h + offset + 360) % 360, sat, light);
  return {
    engagement: make(145, .43),
    cashflow: make(205, .43),
    debt: make(32, .48),
    insurance: make(265, .48),
    workforce: fromHsl((ph + 180) % 360, .42, .39),
    low: make(165, .43),
    mid: make(35, .49),
    high: make(0, .43, .66)
  };
}
function clamp01(v) {
  return Math.max(0.05, Math.min(0.95, v));
}
// darken a hex colour by pct (negative) for the hover/darker accent
function shade(hex, pct) {
  hex = String(hex).replace(/^#/, '');
  const n = parseInt(hex, 16);
  let r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  const f = (100 + pct) / 100;
  r = Math.max(0, Math.min(255, Math.round(r * f)));
  g = Math.max(0, Math.min(255, Math.round(g * f)));
  b = Math.max(0, Math.min(255, Math.round(b * f)));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}
function mix(a, b, weight) {
  const A = String(a).replace(/^#/, '');
  const B = String(b).replace(/^#/, '');
  const aw = Math.max(0, Math.min(1, Number(weight) || 0));
  const ar = parseInt(A.slice(0, 2), 16),
    ag = parseInt(A.slice(2, 4), 16),
    ab = parseInt(A.slice(4, 6), 16);
  const br = parseInt(B.slice(0, 2), 16),
    bg = parseInt(B.slice(2, 4), 16),
    bb = parseInt(B.slice(4, 6), 16);
  return '#' + [ar + (br - ar) * aw, ag + (bg - ag) * aw, ab + (bb - ab) * aw].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
}
// very light tint of a colour for surface backgrounds
function tint(hex, pct) {
  hex = String(hex).replace(/^#/, '');
  const n = parseInt(hex, 16);
  let r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  const f = pct / 100;
  r = Math.round(r + (255 - r) * f);
  g = Math.round(g + (255 - g) * f);
  b = Math.round(b + (255 - b) * f);
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// brief "Hi <name>" splash right after sign-in Not available shown once per browser tab
// session so repeat navigation within the dashboard doesn't keep re-showing it
function handleWelcomeSplash(me) {
  var el = document.getElementById('welcome-splash');
  if (!el) return;
  var already = false;
  try {
    already = sessionStorage.getItem('ef_splash_shown') === '1';
  } catch (_) {}
  if (already) {
    el.classList.add('hide');
    return;
  }
  var greet = document.getElementById('welcome-splash-greeting');
  var first = (me.name || '').trim().split(/\s+/)[0] || 'there';
  var hour = new Date().getHours();
  var daypart = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  if (greet) greet.textContent = daypart + ', ' + first + ' \uD83D\uDC4B';
  var sub = document.getElementById('welcome-splash-sub');
  if (sub) sub.textContent = 'The Fixer hopes you have a good day.';
  var logo = document.getElementById('welcome-splash-logo');
  var privileged = ['ADMIN', 'SUPERADMIN'].includes(String(me?.role || '').toUpperCase());
  if (logo) {
    if (privileged) {
      logo.src = document.documentElement.classList.contains('portal-dark') ? '/static/the-fixer-logo-reversed.svg?v=1' : '/static/the-fixer-logo.svg?v=6';
      logo.removeAttribute('data-custom-logo');
    } else if (me.theme && me.theme.logoDataUrl) {
      logo.src = me.theme.logoDataUrl;
      logo.setAttribute('data-custom-logo', '1');
    }
  }
  try {
    sessionStorage.setItem('ef_splash_shown', '1');
    sessionStorage.removeItem('ef_fresh_login');
  } catch (_) {}
  setTimeout(function () {
    el.classList.add('hide');
  }, 1400);
}
function addAuthBar(me) {
  const roleIndicator = document.getElementById('role-indicator');
  if (roleIndicator) {
    const role = String(me?.role || '').toUpperCase();
    if (role === 'SUPERADMIN') {
      roleIndicator.textContent = '★ SUPER ADMIN';
      roleIndicator.className = 'role-indicator superadmin';
    } else if (role === 'ADMIN') {
      roleIndicator.textContent = 'ADMIN';
      roleIndicator.className = 'role-indicator admin';
    } else {
      roleIndicator.remove();
    }
  }
  const meta = document.querySelector('.topbar-meta');
  if (!meta) return;
  if (!me.modules.portfolio) {
    // no portfolio access → there's nothing to switch between, so the whole
    // toggle (including "Employer view") is redundant, not just the
    // Portfolio button. Hide it entirely rather than leaving a one-option
    // switcher taking up space.
    const sw = document.querySelector('.audience-switch');
    if (sw) sw.style.display = 'none';
    const div = sw && sw.previousElementSibling;
    if (div && div.classList.contains('topbar-divider')) div.style.display = 'none';
  }
  let nav = document.getElementById('portal-nav');
  if (!nav) {
    nav = document.createElement('div');
    nav.id = 'portal-nav';
    meta.insertBefore(nav, meta.firstChild);
  }
  if (window.EmpowerPortalNav) {
    window.EmpowerPortalNav.render({
      me,
      navSelector: '#portal-nav',
      accountSelector: '#portal-account',
      active: 'dashboard',
      includeDashboard: false
    });
  }
}
function renderRefreshStatus(status, sourceAt) {
  document.getElementById('refresh-status-note')?.remove();
  const freshness = document.querySelector('.data-fresh');
  const fl = document.getElementById('data-fresh-label');
  if (!fl) return;
  const state = String(status?.lastSyncStatus || '');
  const syncAt = status?.lastSuccessfulSyncAt || status?.publishedDataAt || null;
  const syncNote = String(status?.lastSyncNote || '');
  const rebuilding = state === 'REBUILDING';
  const issue = ['FULL_REFRESH_FAILED', 'FULL_REFRESH_PRECHECK_FAILED', 'FAILED', 'PARTIAL'].includes(state);
  const showingPublished = Boolean(status?.servingLastSuccessful) || rebuilding || issue;
  const fmt = d => new Date(d).toLocaleString('en-ZA', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
  freshness?.classList.remove('is-error', 'is-rebuilding', 'is-stale');
  if (rebuilding) {
    freshness?.classList.add('is-rebuilding');
    fl.textContent = syncAt ? 'Purging & rebuilding · showing ' + fmt(syncAt) : 'Purging & rebuilding';
  } else if (issue) {
    freshness?.classList.add('is-stale');
    fl.textContent = syncAt ? 'Refresh issue · showing ' + fmt(syncAt) : 'Refresh issue';
  } else if (syncAt && syncNote.startsWith('Full refresh completed')) {
    fl.textContent = 'Purged & overwritten ' + fmt(syncAt);
  } else if (syncAt) {
    fl.textContent = 'Last synced ' + new Date(syncAt).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } else if (sourceAt) {
    fl.textContent = 'Source updated ' + new Date(sourceAt).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } else {
    fl.textContent = 'Live data';
  }
  const titleParts = [];
  if (syncNote) titleParts.push(syncNote);
  if (sourceAt) titleParts.push('Source data updated ' + new Date(sourceAt).toLocaleString('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }));
  fl.removeAttribute('title');
  if (titleParts.length) fl.title = titleParts.join(' ');
  if ((rebuilding || issue) && showingPublished) {
    const host = document.querySelector('.head');
    if (host) {
      const note = document.createElement('div');
      note.id = 'refresh-status-note';
      note.className = 'refresh-status-note';
      const reason = syncNote || 'No additional refresh detail was recorded.';
      note.textContent = rebuilding ? 'Refresh in progress. The dashboard is staying on the last successful data until the new dataset is fully rebuilt. ' + reason : 'Refresh did not complete. The dashboard is still showing the last successful data. Reason: ' + reason;
      host.insertAdjacentElement('afterend', note);
    }
  }
}
function showLiveError(error) {
  const status = error?.syncStatus?.lastSyncStatus || null;
  const rebuilding = status === 'REBUILDING';
  const failed = status === 'FULL_REFRESH_FAILED';
  const title = rebuilding ? 'Dashboard refresh in progress' : failed ? 'Full refresh failed — last published dashboard unavailable' : 'Live dashboard data is unavailable';
  const copy = rebuilding ? 'The refresh is rebuilding the source data. Normally the last successful dashboard remains visible; this fallback is shown only because no published snapshot could be loaded.' : failed ? 'The authoritative reload did not complete, and no last-successful published dashboard snapshot could be loaded for this request.' : 'The portal has not substituted demonstration figures. Check the latest sync/import status in Administration, then reload this page.';
  const view = document.getElementById('employer-view');
  if (view) renderMarkup(view, `<div class="card" style="max-width:760px;margin:48px auto;padding:34px">
    <div style="font:800 23px Manrope,sans-serif;color:var(--brand-primary)">${title}</div>
    <p style="margin:12px 0 0;color:#5b6b7a;line-height:1.65">${copy}</p>
    <div style="margin-top:16px;padding:10px 12px;background:#f7f9fb;border-radius:8px;color:#7b8792;font:600 12px Manrope,sans-serif">${String(error?.message || error || 'Unknown data error').replace(/[<>&]/g, '')}</div>
  </div>`);
  const fl = document.getElementById('data-fresh-label');
  const freshness = document.querySelector('.data-fresh');
  freshness?.classList.remove('is-error', 'is-rebuilding');
  if (rebuilding) {
    if (fl) fl.textContent = 'Purging & rebuilding';
    freshness?.classList.add('is-rebuilding');
  } else {
    if (fl) fl.textContent = failed ? 'Refresh failed — data withheld' : 'Data unavailable';
    freshness?.classList.add('is-error');
  }
}
function applySyntheticDataNotice(me) {
  document.getElementById('synthetic-data-notice')?.remove();
  if (!me?.syntheticDataMode) return;
  const host = document.querySelector('.head') || document.querySelector('.topbar') || document.body;
  if (!host) return;
  const notice = document.createElement('div');
  notice.id = 'synthetic-data-notice';
  notice.setAttribute('role', 'alert');
  notice.style.cssText = 'margin:12px 0;padding:13px 16px;border:1px solid #d6a94f;background:#fff8e8;color:#6b4b08;border-radius:10px;font:700 13px/1.5 Manrope,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.04);';
  renderMarkup(notice, '<strong>⚠ Synthetic test data</strong><br><span style="font-weight:500;">All figures and information shown in this portal are synthetic test data. They must not be treated as factual, financial, operational, customer, or other real-world information.</span>');
  host.parentNode?.insertBefore(notice, host.nextSibling);
}
function showDemoBanner() {
  if (document.getElementById('demo-banner')) return;
  const b = document.createElement('div');
  b.id = 'demo-banner';
  b.style.cssText = 'position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#fdf3e2;color:#8a5a00;border:1px solid #f0d8a8;padding:10px 18px;border-radius:12px;font:600 13px Manrope,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.12);z-index:999;';
  b.textContent = 'Explicit demonstration mode Not available these figures are not live source data.';
  document.body.appendChild(b);
}
loadLiveData();
let __SOURCE_VERSION__ = null;
let __SOURCE_REFRESH_BUSY__ = false;
async function checkSourceVersion() {
  if (document.visibilityState !== 'visible' || __SOURCE_REFRESH_BUSY__) return;
  try {
    const r = await fetch('/api/dashboard/version', {
      cache: 'no-store'
    });
    if (!r.ok) return;
    const d = await r.json();
    const status = d.syncStatus?.lastSyncStatus || null;
    renderRefreshStatus(d.syncStatus);
    if (status === 'REBUILDING' || status === 'FULL_REFRESH_FAILED') return;
    if (!__SOURCE_VERSION__) {
      __SOURCE_VERSION__ = d.version || null;
      return;
    }
    if (d.version && d.version !== __SOURCE_VERSION__) {
      __SOURCE_VERSION__ = d.version;
      __SOURCE_REFRESH_BUSY__ = true;
      try {
        await loadLiveData({
          refreshOnly: true
        });
      } finally {
        __SOURCE_REFRESH_BUSY__ = false;
      }
    }
  } catch (_) {}
}
setInterval(checkSourceVersion, 30000);
;

/* Employer chart recolouring pass: applies to all present and future chart marks,
   while deliberately leaving the admin dashboard's original palette untouched. */
(function () {
  const isAdmin = () => {
    let u = window.currentUser || window.me || window.currentUserData;
    try {
      u = u || JSON.parse(sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser') || 'null');
    } catch (e) {}
    return ['ADMIN', 'SUPERADMIN'].includes(String(u?.role || u?.userRole || document.body?.dataset?.role || '').toUpperCase());
  };
  const semantic = {
    '#1fa463': 'var(--chart-cashflow)',
    '#137a47': 'var(--chart-cashflow)',
    '#16a34a': 'var(--chart-cashflow)',
    '#e0492f': 'var(--chart-high)',
    '#e74c3c': 'var(--chart-high)',
    '#dc2626': 'var(--chart-high)',
    '#e8910c': 'var(--chart-mid)',
    '#f59e0b': 'var(--chart-mid)',
    '#f0a020': 'var(--chart-mid)',
    '#4ea3da': 'var(--chart-engagement)',
    '#3b82f6': 'var(--chart-engagement)',
    '#2563eb': 'var(--chart-engagement)',
    '#8a4fc4': 'var(--chart-insurance)',
    '#9333ea': 'var(--chart-insurance)',
    '#607486': 'var(--chart-debt)',
    '#6b9fc4': 'var(--chart-workforce)'
  };
  const norm = v => String(v || '').toLowerCase().replace(/\s+/g, '');
  function recolor(root) {
    if (isAdmin() || !document.documentElement.style.getPropertyValue('--chart-engagement')) return;
    const nodes = [];
    if (root.nodeType === 1) nodes.push(root);
    if (root.querySelectorAll) nodes.push(...root.querySelectorAll('[style],[fill],[stroke]'));
    for (const el of nodes) {
      if (!el.closest || !el.closest('.dash-section, .chart, .chart-area, .graph, .heatmap, .funnel, .stress, .risk, .trend, .bar, .donut, .legend, .wellness, .portfolio')) continue;
      for (const attr of ['fill', 'stroke']) {
        const v = el.getAttribute?.(attr);
        const rep = semantic[norm(v)];
        if (rep) el.setAttribute(attr, rep);
      }
      const st = el.getAttribute?.('style');
      if (st) {
        let out = st;
        for (const [hex, varval] of Object.entries(semantic)) {
          const re = new RegExp(hex.replace('#', '\\#'), 'ig');
          out = out.replace(re, varval);
        }
        if (out !== st) {
          el.setAttribute('style', out);
          el.dataset.themeRecolored = '1';
        }
      }
    }
  }
  const start = () => {
    recolor(document.body);
    new MutationObserver(ms => ms.forEach(m => {
      if (m.type === 'attributes') {
        if (m.target.dataset?.themeRecolored) {
          delete m.target.dataset.themeRecolored;
          return;
        }
        recolor(m.target);
      } else m.addedNodes.forEach(n => {
        if (n.nodeType === 1) recolor(n);
      });
    })).observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['style', 'fill', 'stroke']
    });
  };
  if (document.readyState === 'loading') onReady(start);else start();
})();
;
/* Shared shell: global loading indicator + cookie notice. No third parties. */
(function () {
  'use strict';

  // ── loading state: thin progress bar while any app API request is in flight ──
  var bar = document.createElement('div');
  bar.id = 'ent-progress';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-hidden', 'true');
  var pending = 0,
    tick = null,
    w = 0;
  function start() {
    if (pending++ > 0) return;
    w = 8;
    bar.classList.add('on');
    bar.style.width = w + '%';
    tick = setInterval(function () {
      w += (90 - w) * 0.12;
      bar.style.width = w + '%';
    }, 250);
  }
  function done() {
    if (--pending > 0) return;
    pending = 0;
    clearInterval(tick);
    bar.style.width = '100%';
    setTimeout(function () {
      bar.classList.remove('on');
      bar.style.width = '0';
    }, 250);
  }
  function mount() {
    if (!bar.parentNode && document.body) document.body.appendChild(bar);
  }
  if (document.body) mount();else onReady(mount);
  var nativeFetch = window.fetch;
  if (nativeFetch) window.fetch = function (input) {
    var url = typeof input === 'string' ? input : input && input.url || '';
    var track = url.indexOf('/api/') !== -1 && url.indexOf('/api/analytics/') === -1;
    if (track) start();
    var p = nativeFetch.apply(this, arguments);
    if (track) p.then(done, done);
    return p;
  };

  // ── cookie notice (only when the page has not rendered its own) ──
  var KEY = 'cookieNoticeDismissed';
  function dismissed() {
    try {
      return localStorage.getItem(KEY) === '1';
    } catch (_) {
      return false;
    }
  }
  function showCookie() {
    if (dismissed() || document.getElementById('cookie-banner') || document.getElementById('ent-cookie')) return;
    var el = document.createElement('div');
    el.id = 'ent-cookie';
    el.className = 'ent-cookie';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Cookie notice');
    renderMarkup(el, '<div class="inner"><p>We use one strictly necessary cookie to keep you signed in. There are no advertising or cross-site tracking cookies. See our <a href="/cookies">Cookie Notice</a>.</p><button type="button">Got it</button></div>');
    el.querySelector('button').addEventListener('click', function () {
      try {
        localStorage.setItem(KEY, '1');
      } catch (_) {}
      el.remove();
    });
    document.body.appendChild(el);
  }
  if (document.readyState === 'loading') onReady(showCookie);else showCookie();
})();
;
function renderExec() {
  updateEmployerCharts({
    ...DATA,
    live: window.__LIVE__,
    sentimentColours: Object.fromEntries((DATA.chat?.byJourney || []).map(j => [j.key, brandSeries(Math.round(j.sentiment / 20))])),
    definitions: EMPLOYER_METRIC_INFO,
    colours: Array.from({
      length: Math.max(DATA.debtProfile?.length || 0, DATA.income?.length || 0)
    }, (_, i) => brandSeries(i)),
    keys: {
      stress: (DATA.stressMap || []).map(item => employerMetricKey(item.l))
    },
    fit: () => requestAnimationFrame(() => fitResponsiveDataValues())
  });
  updateEmployerOverview({
    exec: DATA.exec,
    wellness: DATA.wellness,
    kpis: DATA.kpis,
    funnel: DATA.funnel,
    valueStrip: DATA.valueStrip,
    live: window.__LIVE__,
    period: window.__LIVE__ ? DATA.filterContext?.label || 'Latest' : PERIOD[STATE.period].label,
    comparison: DATA.filterContext?.comparison?.label,
    definitions: EMPLOYER_METRIC_INFO,
    keys: {
      exec: (DATA.exec?.items || []).map(item => employerMetricKey(item.l)),
      funnel: (DATA.funnel || []).map(item => employerMetricKey(item.label)),
      value: (DATA.valueStrip || []).map(item => employerMetricKey(item.l))
    },
    fit: () => requestAnimationFrame(() => fitResponsiveDataValues())
  });
}
}
