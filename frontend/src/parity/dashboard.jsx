// Ported from New Changes dashboard.html; keep source structure and CSS selectors intact.
import React from 'react';
import {showQuickActions,showScheduleReport} from '../native/DashboardDialogs.jsx';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n\n")}

{siteText("\n")}
<div id={siteText("welcome-splash")}>{siteText("\n  ")}<div className={siteText("welcome-splash-inner")}>{siteText("\n    ")}<img id={siteText("welcome-splash-logo")} className={siteText("welcome-splash-logo")} src={siteText("/static/logo-large.png")} alt={siteText("empower-fin logo")}/>{siteText("\n    ")}<div className={siteText("welcome-splash-spinner")}/>{siteText("\n    ")}<div className={siteText("welcome-splash-greeting")} id={siteText("welcome-splash-greeting")}>{siteText("Welcome")}</div>{siteText("\n    ")}<div className={siteText("welcome-splash-sub")}>{siteText("Loading your dashboard…")}</div>{siteText("\n  ")}</div>{siteText("\n")}</div>
{siteText("\n")}

{siteText("\n\n")}

{siteText("\n")}
<div className={siteText("topbar")}>{siteText("\n  ")}<div className={siteText("topbar-inner")}>{siteText("\n    ")}<div className={siteText("logo")}>{siteText("\n      ")}<img src={siteText("/static/logo.png")} alt={siteText("empower-fin Dashboard Portal")} style={{"height":"32px","width":"auto"}} ref={node => { if(node) node.setAttribute("style", "height:32px;width:auto;"); }}/><span id={siteText("channel-brand-name")} style={{"font":"800 13px Manrope,sans-serif","color":"var(--brand-primary)","whiteSpace":"nowrap"}} ref={node => { if(node) node.setAttribute("style", "font:800 13px Manrope,sans-serif;color:var(--brand-primary);white-space:nowrap;"); }}/>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("topbar-divider")}/>{siteText("\n    ")}<div className={siteText("audience-switch")} id={siteText("audience-switch")}>{siteText("\n      ")}<button className={siteText("on")} data-a={siteText("employer")}>{siteText("Employer view")}</button>{siteText("\n      ")}<button data-a={siteText("portfolio")}>{siteText("Portfolio view")}</button>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("topbar-spacer")}/>{siteText("\n    ")}<div className={siteText("topbar-meta")}>{siteText("\n      ")}<div className={siteText("data-fresh")}><span className={siteText("dot")}/>{siteText(" ")}<span id={siteText("data-fresh-label")}>{siteText("Loading…")}</span></div>{siteText("\n      ")}<div id={siteText("role-indicator")} className={siteText("role-indicator")} aria-label={siteText("Current access role")}/>{siteText("\n      ")}<div id={siteText("portal-account")}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n")}</div>
{siteText("\n\n")}
<div className={siteText("wrap")}>{siteText("\n\n  ")}<div className={siteText("pdf-print-header")} aria-hidden={siteText("true")}>{siteText("\n    ")}<div className={siteText("pdf-brand")}>{siteText("\n      ")}<img src={siteText("/static/logo.png")} alt={siteText("empower-fin logo")}/>{siteText("\n      ")}<div>{siteText("\n        ")}<div className={siteText("pdf-kicker")}>{siteText("empower-fin · Workforce Financial Wellbeing")}</div>{siteText("\n        ")}<div className={siteText("pdf-title")} id={siteText("pdf-report-title")}>{siteText("Employer Insights")}</div>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("pdf-meta")}>{siteText("\n      ")}<div id={siteText("pdf-report-period")}>{siteText("Reporting period")}</div>{siteText("\n      ")}<div id={siteText("pdf-report-generated")}/>{siteText("\n      ")}<span className={siteText("pdf-score")} id={siteText("pdf-report-score")}>{siteText("Workforce Financial Wellness Score Not available")}</span>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div id={siteText("employer-view")}>{siteText("\n\n  ")}{siteText("\n  ")}<div className={siteText("head")}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("Employer Insights · Financial Wellbeing Programme")}</div>{siteText("\n      ")}<h1>{siteText("Your workforce ")}<span className={siteText("emp")}/></h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("How the financial wellbeing programme is landing across your workforce Not available who is using it, the outcomes achieved, and how employees rate the service.")}</div>{siteText("\n      ")}<div id={siteText("ctx-sub")} style={{"fontSize":"12px","fontWeight":"700","color":"var(--blue-d)","marginTop":"10px","letterSpacing":".01em"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:var(--blue-d);margin-top:10px;letter-spacing:.01em;"); }}>{siteText("Programme to date")}</div>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("head-actions")}>{siteText("\n      ")}<button className={siteText("btn")} id={siteText("btn-schedule")}>{siteText("Schedule report")}</button>{siteText("\n      ")}<button className={siteText("btn btn-primary")} id={siteText("btn-export")}>{siteText("Export PDF")}</button>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}{siteText("\n  ")}<div className={siteText("filters")}>{siteText("\n    ")}<select className={siteText("filter-emp")} id={siteText("employer-select")} style={{"display":"none"}} ref={node => { if(node) node.setAttribute("style", "display:none;"); }} onChange={event => actions[0]?.(event)}/>{siteText("\n    ")}<label className={siteText("period-picker-label")} htmlFor={siteText("month-select")}>{siteText("Reporting period")}</label>{siteText("\n    ")}<select className={siteText("filter-month")} id={siteText("month-select")} aria-label={siteText("Reporting period")} onChange={event => actions[1]?.(event)}>{siteText("\n      ")}<option value={siteText("")}>{siteText("Latest available period")}</option>{siteText("\n      ")}<option value={siteText("30d")}>{siteText("Last 30 days")}</option>{siteText("\n      ")}<option value={siteText("qtd")}>{siteText("Quarter to date")}</option>{siteText("\n      ")}<option value={siteText("all")}>{siteText("Programme to date")}</option>{siteText("\n    ")}</select>{siteText("\n    ")}<span className={siteText("filter-tag interactive")} id={siteText("region-filter")}>{siteText("\n      ")}<svg width={siteText("13")} height={siteText("13")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M3 6h18M6 12h12M10 18h4")} stroke={siteText("currentColor")} strokeWidth={siteText("2")} strokeLinecap={siteText("round")}/></svg>{siteText("\n      ")}<span className={siteText("tag-label")}>{siteText("All regions")}</span>{siteText("\n      ")}<svg className={siteText("caret")} width={siteText("11")} height={siteText("11")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M6 9l6 6 6-6")} stroke={siteText("currentColor")} strokeWidth={siteText("2.4")} strokeLinecap={siteText("round")} strokeLinejoin={siteText("round")}/></svg>{siteText("\n    ")}</span>{siteText("\n    ")}<span className={siteText("filter-tag interactive")} id={siteText("income-filter")}>{siteText("\n      ")}<svg width={siteText("13")} height={siteText("13")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M3 6h18M6 12h12M10 18h4")} stroke={siteText("currentColor")} strokeWidth={siteText("2")} strokeLinecap={siteText("round")}/></svg>{siteText("\n      ")}<span className={siteText("tag-label")}>{siteText("All income bands")}</span>{siteText("\n      ")}<svg className={siteText("caret")} width={siteText("11")} height={siteText("11")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M6 9l6 6 6-6")} stroke={siteText("currentColor")} strokeWidth={siteText("2.4")} strokeLinecap={siteText("round")} strokeLinejoin={siteText("round")}/></svg>{siteText("\n    ")}</span>{siteText("\n    ")}<span className={siteText("filter-tag")} id={siteText("emp-tag")}>{siteText("\n      ")}<svg width={siteText("13")} height={siteText("13")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><circle cx={siteText("12")} cy={siteText("8")} r={siteText("4")} stroke={siteText("currentColor")} strokeWidth={siteText("2")}/><path d={siteText("M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6")} stroke={siteText("currentColor")} strokeWidth={siteText("2")} strokeLinecap={siteText("round")}/></svg>{siteText("\n      Not available enrolled\n    ")}</span>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div className={siteText("enterprise-toolbar")} aria-label={siteText("Dashboard tools")}>{siteText("\n    ")}<div id={siteText("executive-insight")}/>{siteText("\n    ")}<div className={siteText("enterprise-toolbar-actions")}>{siteText("\n      ")}<button className={siteText("btn")} id={siteText("btn-save-view")} type={siteText("button")}>{siteText("Save view")}</button>{siteText("\n      ")}<button className={siteText("btn")} id={siteText("btn-command")} type={siteText("button")}>{siteText("Quick actions ")}<span className={siteText("kbd")}>{siteText("Ctrl K")}</span></button>{siteText("\n    ")}</div>{siteText("\n    ")}<div id={siteText("data-trust")}/>{siteText("\n  ")}</div>{siteText("\n  ")}{siteText("\n  ")}<div id={siteText("exec-summary")}/>{siteText("\n\n  ")}{siteText("\n  ")}<div className={siteText("card reveal wellness-card section-gap")} style={{"animationDelay":".04s"}} ref={node => { if(node) node.setAttribute("style", "animation-delay:.04s"); }}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div>{siteText("\n        ")}<div className={siteText("card-title")}>{siteText("Workforce Financial Wellness Score ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("wellness")} aria-label={siteText("What is the Workforce Financial Wellness Score?")}>{siteText("i")}</button></div>{siteText("\n        ")}<div className={siteText("card-note")}>{siteText("The single number that tracks your people's financial health Not available and its trajectory")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<span className={siteText("card-tag")}>{siteText("Index · modelled")}</span>{siteText("\n    ")}</div>{siteText("\n    ")}<div id={siteText("wellness")}/>{siteText("\n  ")}</div>{siteText("\n\n  ")}{siteText("\n  ")}<div id={siteText("kpis")} className={siteText("grid g-4")}/>{siteText("\n\n  ")}{siteText("\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 7","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 7;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("From enrolled to better off ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("funnel")} aria-label={siteText("What is the engagement funnel?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("The journey every employee can take Not available and where they are on it")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Engagement funnel")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("funnel")} className={siteText("funnel")}/>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 5","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 5;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Financial problems resolved ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("outcomes")} aria-label={siteText("What are financial problems resolved?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")} id={siteText("outcomes-note")}>{siteText("Financial problems resolved Not available and the value created")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Outcomes")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("outcomes")}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("valueDelivered")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("The bottom line")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("Value delivered to your people")}</h1>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}<div id={siteText("value-strip")}/>{siteText("\n\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 5","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 5;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Monthly cash freed up ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("saving")} aria-label={siteText("What is monthly cash freed up?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Recurring savings unlocked, cumulative run-rate")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Run-rate")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("savings-chart")}/>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 7","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 7;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Debt Pressure Profile ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("debtProfile")} aria-label={siteText("What is the Debt Pressure Profile?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Where your people's arrears sit Not available by credit type, then by creditor")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Arrears journey")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("debt-profile")}/>{siteText("\n      ")}<div id={siteText("creditor-table")} style={{"marginTop":"18px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:18px"); }}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("earlyWageAccess")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("eyebrow")}>{siteText("ON-DEMAND PAY")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("Early Wage Access")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("How many employees are drawing earned wages early, and how much Not available a live read on cashflow pressure between paydays.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}<div id={siteText("ewa-kpis")} className={siteText("grid g-4")}/>{siteText("\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 12"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 12;"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Total advanced per month ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("ewaTrend")} aria-label={siteText("What is total advanced per month?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Finalised advances only · monthly run-rate")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Trend")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("ewa-chart")}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}<section className={siteText("dash-section")} data-section={siteText("stressMap")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("Where the pressure sits")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("Workforce Financial Stress Map")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("Financial pressure is not evenly spread. This is where it concentrates Not available so you and your broker can direct the programme to the people and sites that need it most.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div id={siteText("stress-strip")} className={siteText("section-gap")} style={{"marginTop":"0"}} ref={node => { if(node) node.setAttribute("style", "margin-top:0"); }}/>{siteText("\n\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 4","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 4;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div><div className={siteText("card-title")}>{siteText("Stress index by site ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("stressBySite")} aria-label={siteText("What is the stress index by site?")}>{siteText("i")}</button></div><div className={siteText("card-note")}>{siteText("Higher = more financial pressure (arrears, debt load, low resilience)")}</div></div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("By site")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("region-bars")} className={siteText("hbar")}/>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 4","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 4;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div><div className={siteText("card-title")}>{siteText("Who the programme is reaching ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("incomeReach")} aria-label={siteText("What is reach by income band?")}>{siteText("i")}</button></div><div className={siteText("card-note")}>{siteText("Activated employees by income band")}</div></div>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("income-donut")}/>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 4","animationDelay":".15s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 4;animation-delay:.15s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div><div className={siteText("card-title")}>{siteText("How employees rate us ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("rating")} aria-label={siteText("What is the employee experience rating?")}>{siteText("i")}</button></div><div className={siteText("card-note")}>{siteText("From end-of-journey ratings")}</div></div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Experience")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("ratings")}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("problemDebt")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("Tackling problem debt")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("How problem debt is being handled")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("Not all distressed debt is dealt with the same way. Here is exactly what is happening to each rand Not available and we are precise about which debt is under active arrangement versus self-managed with our guidance.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}<div className={siteText("card reveal section-gap")} style={{"marginTop":"0","animationDelay":".04s"}} ref={node => { if(node) node.setAttribute("style", "margin-top:0;animation-delay:.04s"); }}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div>{siteText("\n        ")}<div className={siteText("card-title")}>{siteText("Problem debt by how it's being handled ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("debtStates")} aria-label={siteText("How is problem debt being handled?")}>{siteText("i")}</button></div>{siteText("\n        ")}<div className={siteText("card-note")}>{siteText("Three honest states Not available only the first is an active arrangement")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<span className={siteText("card-tag")}>{siteText("Debt intervention")}</span>{siteText("\n    ")}</div>{siteText("\n    ")}<div id={siteText("debt-states")}/>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 7","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 7;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Potentially prescribed debt challenged ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("prescription")} aria-label={siteText("What is prescribed debt recovery?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Old debt employees may no longer legally owe Not available identified and contested")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Recovery")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("prescription")}/>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 5","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 5;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Financial Risk Signals ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("riskSignals")} aria-label={siteText("What are Financial Risk Signals?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Exposure detected across your workforce Not available your early-warning list")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Diagnostic")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("risk-signals")}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("opportunities")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("What to do next")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("Opportunities identified")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("The programme has already mapped the next wave of value sitting in your workforce Not available eligible employees who haven't yet been helped.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n  ")}<div id={siteText("opportunities")}/>{siteText("\n  ")}</section>{siteText("\n\n  ")}{siteText("\n  ")}<section className={siteText("dash-section")} data-section={siteText("voiceOfEmployee")}>{siteText("\n  ")}<div className={siteText("head")} style={{"padding":"36px 0 14px"}} ref={node => { if(node) node.setAttribute("style", "padding:36px 0 14px;"); }}>{siteText("\n    ")}<div>{siteText("\n      ")}<div className={siteText("head-eyebrow")}>{siteText("Voice of the employee")}</div>{siteText("\n      ")}<h1 style={{"fontSize":"27px"}} ref={node => { if(node) node.setAttribute("style", "font-size:27px;"); }}>{siteText("What your people are asking")}</h1>{siteText("\n      ")}<div className={siteText("head-sub")}>{siteText("Every question asked in the in-app chat, categorised by journey. This is your early-warning system for where employees hesitate, what reassurance they need, and which objections to pre-empt.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div id={siteText("chat-kpis")} className={siteText("grid g-4")}/>{siteText("\n\n  ")}<div className={siteText("grid g-12 section-gap")}>{siteText("\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 7","animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 7;animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Conversations by journey ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("chatByJourney")} aria-label={siteText("What are conversations by journey?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Where the questions are coming from Not available click a journey for its top themes")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")} id={siteText("chat-count-tag")}>{siteText("Chat data")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("chat-journeys")}/>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal")} style={{"gridColumn":"span 5","animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 5;animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Trending questions ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("chatTrending")} aria-label={siteText("What are trending questions?")}>{siteText("i")}</button></div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Rising across the workforce this period")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")}>{siteText("Themes")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("chat-trending")}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div className={siteText("card reveal section-gap")} style={{"animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "animation-delay:.05s"); }}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div>{siteText("\n        ")}<div className={siteText("card-title")} id={siteText("chat-theme-title")}>{siteText("Chat themes ")}<button type={siteText("button")} className={siteText("metric-info")} data-metric={siteText("chatThemes")} aria-label={siteText("What are chat themes?")}>{siteText("i")}</button></div>{siteText("\n        ")}<div className={siteText("card-note")} id={siteText("chat-theme-note")}>{siteText("Themes from the separate chat data source.")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<span className={siteText("card-tag")}>{siteText("Drill-down")}</span>{siteText("\n    ")}</div>{siteText("\n    ")}<div id={siteText("chat-themes")}/>{siteText("\n  ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}<div className={siteText("footnote")} id={siteText("footnote")}/>{siteText("\n\n ")}</div>{siteText("\n\n  ")}<div className={siteText("pdf-print-footer")} aria-hidden={siteText("true")}>{siteText("\n    empower-fin · Workforce Financial Wellbeing · Confidential employer report · Generated ")}<span id={siteText("pdf-footer-date")}/>{siteText("\n  ")}</div>{siteText("\n\n  ")}{siteText("\n  ")}<div id={siteText("portfolio-view")} style={{"display":"none"}} ref={node => { if(node) node.setAttribute("style", "display:none"); }}>{siteText("\n\n    ")}<div className={siteText("pf-banner")}>{siteText("\n      ")}<svg width={siteText("15")} height={siteText("15")} viewBox={siteText("0 0 24 24")} fill={siteText("none")}><path d={siteText("M12 3l7 3v5c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3z")} stroke={siteText("#fff")} strokeWidth={siteText("1.8")}/></svg>{siteText("\n      Internal portfolio view Not available authorised empower-fin and channel partner users only. Not shared with employers.\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("head")} style={{"padding":"26px 0 18px"}} ref={node => { if(node) node.setAttribute("style", "padding:26px 0 18px;"); }}>{siteText("\n      ")}<div>{siteText("\n        ")}<div className={siteText("head-eyebrow")}>{siteText("Across all employer clients")}</div>{siteText("\n        ")}<h1 style={{"fontSize":"34px"}} ref={node => { if(node) node.setAttribute("style", "font-size:34px;"); }}>{siteText("Portfolio insights")}</h1>{siteText("\n        ")}<div className={siteText("head-sub")}>{siteText("Every reportable metric, across your whole book of employers. Spot where opportunity is highest, where satisfaction is slipping, and where financial stress is concentrated Not available at a glance.")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("head-actions")}>{siteText("\n        ")}<button className={siteText("btn")} id={siteText("btn-pf-export")}>{siteText("Export book")}</button>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("pf-toolbar")} id={siteText("pf-toolbar")}>{siteText("\n      ")}<div className={siteText("pf-toolbar-left")}>{siteText("\n        ")}<div className={siteText("pf-filter-block")} id={siteText("pf-employer-filter")}>{siteText("\n          ")}<div className={siteText("pf-filter-label")}>{siteText("Employers")}</div>{siteText("\n          ")}<button className={siteText("pf-filter-btn")} id={siteText("pf-employer-filter-btn")} type={siteText("button")} aria-haspopup={siteText("true")} aria-expanded={siteText("false")}><span id={siteText("pf-employer-filter-label")}>{siteText("All employers")}</span><span>{siteText("⌄")}</span></button>{siteText("\n          ")}<div className={siteText("pf-filter-menu")} id={siteText("pf-employer-filter-menu")}>{siteText("\n            ")}<div className={siteText("pf-filter-actions")}><button type={siteText("button")} className={siteText("pf-filter-action")} id={siteText("pf-select-all")}>{siteText("Select all")}</button><button type={siteText("button")} className={siteText("pf-filter-action")} id={siteText("pf-clear-all")}>{siteText("Clear all")}</button></div>{siteText("\n            ")}<input className={siteText("pf-filter-search")} id={siteText("pf-employer-search")} type={siteText("search")} placeholder={siteText("Search employers…")} autoComplete={siteText("off")}/>{siteText("\n            ")}<div className={siteText("pf-filter-options")} id={siteText("pf-employer-options")}/>{siteText("\n          ")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<div className={siteText("pf-scope-note")} id={siteText("pf-scope-note")}>{siteText("All authorised employers are included.")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("pf-toolbar-right")}>{siteText("\n        ")}<span className={siteText("pf-window-pill")} id={siteText("pf-window-pill")}>{siteText("Reporting window: Not available")}</span>{siteText("\n        ")}<span className={siteText("pf-window-pill")}>{siteText("Hover ")}<span className={siteText("metric-info")} data-metric={siteText("measureGuide")} tabIndex={siteText("0")} aria-label={siteText("What do these measures mean?")}>{siteText("i")}</span>{siteText(" for measure definitions")}</span>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div id={siteText("pf-kpis")} className={siteText("grid g-4")}/>{siteText("\n\n    ")}<div className={siteText("card reveal section-gap")} style={{"animationDelay":".05s"}} ref={node => { if(node) node.setAttribute("style", "animation-delay:.05s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("Portfolio heatmap")}</div>{siteText("\n          ")}<div className={siteText("card-note")}>{siteText("Every employer, every metric. Greener = stronger, redder = needs attention. Click a column header to rank by it below.")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<span className={siteText("card-tag")} id={siteText("pf-employer-count")}>{siteText("Not available employers")}</span>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("pf-heatmap")} style={{"overflowX":"auto"}} ref={node => { if(node) node.setAttribute("style", "overflow-x:auto"); }}/>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("card reveal section-gap")} style={{"animationDelay":".1s"}} ref={node => { if(node) node.setAttribute("style", "animation-delay:.1s"); }}>{siteText("\n      ")}<div className={siteText("card-hd")}>{siteText("\n        ")}<div>{siteText("\n          ")}<div className={siteText("card-title")}>{siteText("League table")}</div>{siteText("\n          ")}<div className={siteText("card-note")} id={siteText("pf-league-note")}>{siteText("Employers ranked by the selected metric")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<div id={siteText("pf-metric-picker")} className={siteText("pf-picker")}/>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("pf-league")}/>{siteText("\n    ")}</div>{siteText("\n\n    ")}<div className={siteText("footnote")} id={siteText("pf-footnote")}/>{siteText("\n\n  ")}</div>{siteText("\n\n")}</div>
{siteText("\n\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n\n")}</>;}
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
function renderExec() {
  const wrap = document.getElementById('exec-summary');
  const tick = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="var(--chart-cashflow)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const items = DATA.exec.items.map(it => {
    const mk = employerMetricKey(it.l);
    return `<div class="exec-item">${tick}<div><div class="exec-v">${it.v}</div><div class="exec-l">${it.l} ${employerInfoButton(mk)}</div></div></div>`;
  }).join('');
  const incomplete = window.__LIVE__ && (DATA.wellness?.complete === false || !hasValue(DATA.wellness?.score));
  const verdict = incomplete ? 'Data incomplete' : window.__LIVE__ ? DATA.wellness.score >= 75 ? 'Strong' : DATA.wellness.score >= 60 ? 'On track' : 'Needs attention' : 'On track';
  const verdictClass = incomplete ? 'is-incomplete' : verdict === 'Needs attention' ? 'is-needs-attention' : '';
  wrap.appendChild(el(`<div class="exec-band reveal">
    <div class="exec-head">
      <div class="exec-pulse"></div>
      <div><div class="exec-title">Financial wellbeing impact summary</div><div class="exec-sub" id="exec-period">Programme to date · at a glance</div></div>
      <div class="exec-verdict ${verdictClass}">${verdict}</div>
    </div>
    <div class="exec-grid">${items}</div>
  </div>`));
}

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
  const wrap = document.getElementById('wellness');
  if (!wrap) return;
  const w = DATA.wellness || {};
  if (window.__LIVE__ && (w.complete === false || !hasValue(w.score))) {
    const drivers = (w.drivers || []).map(d => {
      const available = d.available !== false && hasValue(d.score);
      const score = available ? Number(d.score) : null;
      const col = available ? bandTone(score).c : 'var(--chart-mid)';
      const mk = employerMetricKey(d.name);
      return `<div class="wd-row"><div class="wd-name">${esc(d.name)} ${employerInfoButton(mk)}<small>${d.note || ''}</small></div><div class="wd-track"><div class="wd-fill" style="width:${available ? score : 0}%;background:${available ? col : 'var(--brand-soft)'}"></div></div><div class="wd-val">${available ? score : 'Not available'}</div></div>`;
    }).join('');
    wrap.appendChild(el(`<div class="wellness-inner"><div class="wellness-left"><div style="font-family:'Fraunces',serif;font-size:46px;color:var(--brand-primary);line-height:1">Not available</div><div style="font-size:11px;color:#8497a7;font-weight:800;margin-top:4px">/ 100</div><div class="wellness-band" style="color:#8a6610;background:#fff8e8;border-color:#efd49b">${ragLights('amber')}Data incomplete</div><div class="wellness-note">The score is calculated only when all required driver feeds are available. Missing data is never treated as zero.</div></div><div class="wellness-right">${drivers || '<div class="muted">Required score drivers have not been loaded.</div>'}</div></div>`));
    return;
  }
  const delta = hasValue(w.prior) ? w.score - w.prior : null;
  const value = Math.max(0, Math.min(100, Number(w.score) || 0));
  const gauge = `<svg viewBox="0 0 160 96" width="180" style="display:block;margin:0 auto" role="img" aria-label="Workforce Financial Wellness Score ${value} out of 100">
    <defs><linearGradient id="wellnessGaugeGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="var(--brand-grad-1)"/><stop offset=".5" stop-color="var(--brand-grad-3)"/><stop offset="1" stop-color="var(--brand-grad-5)"/></linearGradient></defs>
    <path d="M16 88 A64 64 0 0 1 144 88" fill="none" stroke="var(--ice-2)" stroke-width="13" stroke-linecap="round"/>
    <path d="M16 88 A64 64 0 0 1 144 88" fill="none" stroke="url(#wellnessGaugeGradient)" stroke-width="13" stroke-linecap="round" pathLength="100" stroke-dasharray="${value} ${100 - value}" stroke-dashoffset="0"/>
    <text x="80" y="74" text-anchor="middle" font-family="Fraunces,serif" font-size="34" font-weight="600" fill="var(--brand-primary)">${value.toFixed(0)}</text><text x="80" y="90" text-anchor="middle" font-size="9.5" font-weight="700" fill="#8497a7">/ 100</text></svg>`;
  const drivers = (w.drivers || []).map(d => {
    const available = d.available !== false && hasValue(d.score);
    const score = available ? Number(d.score) : 0;
    const col = available ? bandTone(score).c : 'var(--chart-mid)';
    const mk = employerMetricKey(d.name);
    return `<div class="wd-row"><div class="wd-name">${esc(d.name)} ${employerInfoButton(mk)}<small>${d.note || ''}</small></div><div class="wd-track"><div class="wd-fill" style="width:0;background:${available ? col : 'var(--brand-soft)'}" data-w="${available ? score : 0}"></div></div><div class="wd-val">${available ? score : 'Not available'}</div></div>`;
  }).join('');
  const bt = bandTone(Number(w.score) || 0);
  wrap.appendChild(el(`<div class="wellness-inner"><div class="wellness-left">${gauge}<div class="wellness-band" style="color:${bt.c};background:${bt.bg};border-color:${bt.border}">${ragLights(bt.rag)}${w.band || 'Index'}</div><div class="wellness-delta">${delta === null ? 'No prior period' : (delta > 0 ? '▲ +' + delta : '▼ ' + delta) + ' pts vs. ' + (DATA.filterContext?.comparison?.label || 'previous period')}</div><div class="wellness-note">A composite of four weighted drivers. Use it to track workforce financial health over time.</div></div><div class="wellness-right">${drivers}</div></div>`));
  setTimeout(() => wrap.querySelectorAll('.wd-fill').forEach(f => f.style.width = f.dataset.w + '%'), 150);
}
function renderKPIs() {
  const k = DATA.kpis || {};
  const safeSpark = (pts, col) => Array.isArray(pts) && pts.length >= 2 ? sparkline(pts, col) : '';
  const cards = [{
    label: 'Programme take-up',
    infoKey: 'takeUp',
    ico: KPI_ICONS.takeUp,
    data: k.takeUp,
    num: k.takeUp?.pct,
    suffix: '%',
    sub: k.takeUp?.available === false ? 'Data not loaded' : `${fmtCount(k.takeUp?.enrolled)} of ${fmtCount(DATA.headcount)} enrolled`,
    spark: safeSpark(k.takeUp?.trend, brandSeries(2))
  }, {
    label: 'Actively engaged',
    infoKey: 'engaged',
    ico: KPI_ICONS.activated,
    data: k.activated,
    num: k.activated?.pct,
    suffix: '%',
    sub: k.activated?.available === false ? 'Data not loaded' : `${fmtCount(k.activated?.count)} started a fix`,
    spark: safeSpark(k.activated?.trend, brandSeries(1))
  }, {
    label: 'Cash freed up / month',
    infoKey: 'saving',
    ico: KPI_ICONS.saving,
    data: k.monthlySaving,
    num: k.monthlySaving?.rand,
    prefix: 'R',
    money: true,
    sub: k.monthlySaving?.available === false ? 'Data not loaded' : `R ${fmtCount(k.monthlySaving?.perHead)} avg per active employee`,
    spark: safeSpark(k.monthlySaving?.trend, 'var(--chart-cashflow)')
  }, {
    label: 'Avg experience rating',
    infoKey: 'rating',
    ico: KPI_ICONS.rating,
    data: k.avgRating,
    num: k.avgRating?.val,
    suffix: '/5',
    decimals: 1,
    sub: k.avgRating?.available === false ? 'Data not loaded' : `${fmtCount(DATA.ratings?.responses)} ratings collected`,
    spark: safeSpark(k.avgRating?.trend, 'var(--chart-engagement)')
  }];
  const wrap = document.getElementById('kpis');
  cards.forEach((c, i) => {
    const available = c.data?.available !== false && hasValue(c.num);
    const delta = hasValue(c.data?.delta) ? (() => {
      const n = Number(c.data.delta);
      if (!Number.isFinite(n)) return String(c.data.delta) + ' vs. ' + (DATA.filterContext?.comparison?.label || 'previous period');
      const sign = n > 0 ? '▲' : n < 0 ? '▼' : '•';
      const abs = Math.abs(n);
      const value = c.money ? formatRand(abs) : c.decimals ? abs.toFixed(c.decimals) + ' pts' : Math.round(abs) + ' pts';
      return sign + ' ' + (n > 0 ? '+' : n < 0 ? '-' : '') + value + ' vs. ' + (DATA.filterContext?.comparison?.label || 'previous period');
    })() : 'No comparison available';
    const card = el(`<div class="card kpi reveal" style="animation-delay:${i * .06}s"><div class="kpi-label"><span class="kpi-ico" style="background:${c.ico.bg}"><svg width="18" height="18" viewBox="0 0 24 24">${c.ico.path}</svg></span>${c.label}${employerInfoButton(c.infoKey)}</div><div class="kpi-value">${available && c.prefix ? '<span class="cur">' + c.prefix + '</span>' : ''}<span class="kpi-num">${available ? '0' : 'Not available'}</span>${available && c.suffix ? '<span style="font-size:18px">' + c.suffix + '</span>' : ''}</div><div class="kpi-sub">${available ? `<span class="delta">${delta}</span>` : '<span style="color:#8497a7">Data not loaded</span>'}</div>${available ? c.spark : ''}</div>`);
    wrap.appendChild(card);
    if (available) countUp(card.querySelector('.kpi-num'), Number(c.num), {
      money: c.money,
      decimals: c.decimals || 0,
      delay: 120 + i * 60
    });
  });
}
function countUp(el, target, opts = {}) {
  const dur = 750,
    dec = opts.decimals || 0,
    start = performance.now() + (opts.delay || 0);
  function fmt(v) {
    if (opts.money) return Math.round(v).toLocaleString();
    return dec ? v.toFixed(dec) : Math.round(v).toLocaleString();
  }
  function tick(now) {
    if (now < start) {
      requestAnimationFrame(tick);
      return;
    }
    const t = Math.min(1, (now - start) / dur),
      e = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(target * e);
    if (t < 1) requestAnimationFrame(tick);else el.textContent = fmt(target);
  }
  requestAnimationFrame(tick);
}

/* ─────────────────── ACT 2: funnel ─────────────────── */
function renderFunnel() {
  const wrap = document.getElementById('funnel');
  const colors = [brandSeries(0), brandSeries(1), brandSeries(2), brandSeries(3), brandSeries(4)];
  (DATA.funnel || []).forEach((f, i) => {
    const available = f.available !== false && hasValue(f.n) && hasValue(f.pct);
    const mk = employerMetricKey(f.label);
    const row = el(`<div class="funnel-row"><div class="funnel-lbl">${f.label} ${employerInfoButton(mk)}<small>${available ? f.sub : 'Data not loaded'}</small></div><div class="funnel-bar-bg"><div class="funnel-bar" style="width:0;background:${available ? colors[i] : 'var(--brand-soft)'}">${available ? f.pct + '%' : 'Not available'}</div></div><div class="funnel-val">${available ? fmtCount(f.n) : 'Not available'}</div></div>`);
    wrap.appendChild(row);
    if (available) setTimeout(() => {
      row.querySelector('.funnel-bar').style.width = f.pct + '%';
    }, 120 + i * 90);
  });
}

/* ─────────────────── ACT 2: outcomes ─────────────────── */
function renderOutcomes() {
  const wrap = document.getElementById('outcomes');
  const note = document.getElementById('outcomes-note');
  const available = DATA.availability?.journeys !== false;
  const rows = Array.isArray(DATA.outcomes) ? DATA.outcomes : [];
  const total = rows.reduce((sum, o) => sum + (Number(o.count) || 0), 0);
  if (note) note.textContent = available ? `${total.toLocaleString('en-ZA')} financial ${total === 1 ? 'problem' : 'problems'} resolved Not available and the value created` : 'Journey data not loaded.';
  if (!available) {
    renderMarkup(wrap, '<div class="muted" style="padding:22px 8px">Journey data has not been loaded for this employer.</div>');
    return;
  }
  if (!rows.length) {
    renderMarkup(wrap, '<div class="muted" style="padding:22px 8px">No completed outcomes in the selected reporting window.</div>');
    return;
  }
  rows.forEach(o => {
    const row = el(`<div class="outcome clickable"><div class="outcome-ico">${svgIco(o.ico)}</div><div><div class="outcome-name">${esc(o.name)}</div><div class="outcome-meta">${fmtCount(o.count)} completed · ${o.meta}</div></div><div class="outcome-stat"><div class="v">${displayMoney(o.stat)}</div><div class="l">${esc(o.statL)}</div></div><div class="row-chevron">›</div></div>`);
    row.addEventListener('click', () => outcomeDrill(o));
    wrap.appendChild(row);
  });
}

/* ─────────────────── ACT 3: value strip ─────────────────── */
function renderValueStrip() {
  const wrap = document.getElementById('value-strip');
  const strip = el('<div class="stat-strip reveal"></div>');
  DATA.valueStrip.forEach(s => {
    const mk = employerMetricKey(s.l);
    strip.appendChild(el(`<div class="stat-cell"><div class="l">${s.l} ${employerInfoButton(mk)}</div><div class="v">${s.v}</div><div class="d">${s.d}</div></div>`));
  });
  wrap.appendChild(strip);
}

/* ─────────────────── ACT 3: savings area chart ─────────────────── */
function renderPeriodLineChart(current = [], previous = [], currentLabel = 'Selected period', previousLabel = 'Previous period', valueFormatter = formatRandThousands, colour = 'var(--chart-cashflow)') {
  const a = Array.isArray(current) ? current.map(Number).filter(Number.isFinite) : [];
  const b = Array.isArray(previous) ? previous.map(Number).filter(Number.isFinite) : [];
  if (!a.length && !b.length) return '<div class="muted comparison-empty">No data is available for this period.</div>';
  if (a.length === 1 && b.length === 1) {
    const vals = [b[0], a[0]],
      labels = [previousLabel, currentLabel];
    const w = 760,
      h = 240,
      axisLeft = 112,
      plotLeft = 132,
      right = 22,
      top = 22,
      bottom = 46,
      plotRight = w - right;
    const ticks = niceTicks(vals, 4),
      max = ticks[ticks.length - 1] || 1;
    const px = i => plotLeft + i * (plotRight - plotLeft),
      py = v => h - bottom - v / max * (h - bottom - top);
    const line = `M${px(0).toFixed(1)} ${py(vals[0]).toFixed(1)} L${px(1).toFixed(1)} ${py(vals[1]).toFixed(1)}`;
    const yaxis = ticks.map(v => {
      const y = py(v);
      return `<line x1="${plotLeft}" x2="${plotRight}" y1="${y}" y2="${y}" stroke="var(--line-soft)"/><text x="${axisLeft}" y="${y + 3}" text-anchor="end" font-size="9.5" font-weight="700" fill="#8497a7">${valueFormatter(v)}</text>`;
    }).join('');
    const points = vals.map((v, i) => `<circle cx="${px(i)}" cy="${py(v)}" r="${i === 1 ? 5.5 : 4.5}" fill="${i === 1 ? colour : 'var(--chart-engagement)'}" stroke="#fff" stroke-width="2"><title>${esc(labels[i])}: ${valueFormatter(v)}</title></circle>`).join('');
    const xlabels = labels.map((label, i) => {
      // Anchor edge labels inward so long period names never escape the SVG/card boundary.
      const anchor = i === 0 ? 'start' : 'end';
      const x = i === 0 ? plotLeft : plotRight;
      return `<text x="${x}" y="${h - 13}" text-anchor="${anchor}" font-size="10" font-weight="800" fill="${i === 1 ? 'var(--brand-primary)' : '#8497a7'}">${esc(label)}</text>`;
    }).join('');
    const valueCards = vals.map((v, i) => `<div class="comparison-value-card ${i === 1 ? 'current' : 'previous'}"><span class="comparison-value-period">${esc(labels[i])}</span><strong>${valueFormatter(v)}</strong></div>`).join('');
    return `<div class="comparison-chart"><div class="comparison-value-row">${valueCards}</div><div class="comparison-legend"><span><i class="comparison-dot current"></i>${esc(currentLabel)}</span><span><i class="comparison-dot previous"></i>${esc(previousLabel)}</span></div><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(currentLabel)} compared with ${esc(previousLabel)}"><line x1="${plotLeft}" x2="${plotRight}" y1="${h - bottom}" y2="${h - bottom}" stroke="var(--line)"/>${yaxis}<path d="${line}" fill="none" stroke="${colour}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${points}${xlabels}</svg></div>`;
  }
  const n = Math.max(a.length, b.length);
  const currentAligned = Array.from({
    length: n
  }, (_, i) => a[i - (n - a.length)] ?? null);
  const previousAligned = Array.from({
    length: n
  }, (_, i) => b[i - (n - b.length)] ?? null);
  const values = [...a, ...b];
  const w = 760,
    h = 240,
    axisLeft = 112,
    plotLeft = 132,
    right = 22,
    top = 22,
    bottom = 46,
    plotRight = w - right;
  const ticks = niceTicks(values, 5),
    max = ticks[ticks.length - 1] || 1;
  const px = i => plotLeft + i * (plotRight - plotLeft) / Math.max(1, n - 1),
    py = v => h - bottom - v / max * (h - bottom - top);
  const lineOf = series => series.map((v, i) => v == null ? '' : (i ? 'L' : 'M') + px(i).toFixed(1) + ' ' + py(v).toFixed(1)).filter(Boolean).join(' ');
  const currentLine = lineOf(currentAligned),
    previousLine = lineOf(previousAligned);
  const yaxis = ticks.map(v => {
    const y = py(v);
    return `<line x1="${plotLeft}" x2="${plotRight}" y1="${y}" y2="${y}" stroke="var(--line-soft)"/><text x="${axisLeft}" y="${y + 3}" text-anchor="end" font-size="9.5" font-weight="700" fill="#8497a7">${valueFormatter(v)}</text>`;
  }).join('');
  return `<div class="comparison-chart"><div class="comparison-legend"><span><i class="comparison-dot current"></i>${esc(currentLabel)}</span><span><i class="comparison-dot previous"></i>${esc(previousLabel)}</span></div><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(currentLabel)} and ${esc(previousLabel)} trend"><path d="${currentLine}" fill="none" stroke="${colour}" stroke-width="3" stroke-linecap="round"/><path d="${previousLine}" fill="none" stroke="var(--chart-engagement)" stroke-width="2.2" stroke-dasharray="6 5" stroke-linecap="round"/>${yaxis}</svg></div>`;
}
function getMonthFinancialComparison(kind) {
  const period = DATA.filterContext?.period;
  if (!period) return null;
  const pc = DATA.periodComparison;
  if (!pc || !pc.current || !pc.previous) return null;
  const currentLabel = pc.current.label || DATA.filterContext?.label || period;
  const previousLabel = pc.previous.label || 'Previous month';
  if (kind === 'savings') {
    const current = Number(pc.current.monthlyCashFreedUp);
    const previous = Number(pc.previous.monthlyCashFreedUp);
    if (Number.isFinite(current) && Number.isFinite(previous)) return {
      current,
      previous,
      currentLabel,
      previousLabel
    };
  }
  if (kind === 'ewa') {
    const current = Number(pc.current.totalAdvanced);
    const previous = Number(pc.previous.totalAdvanced);
    if (Number.isFinite(current) && Number.isFinite(previous)) return {
      current,
      previous,
      currentLabel,
      previousLabel
    };
  }
  return null;
}
function renderEwa() {
  const e = DATA.ewa,
    wrap = document.getElementById('ewa-chart'),
    kpiWrap = document.getElementById('ewa-kpis');
  if (kpiWrap) {
    renderMarkup(kpiWrap, '');
    if (!e || !e.advances) kpiWrap.appendChild(el('<div class="muted" style="padding:8px 2px;font-size:13.5px;">No early wage access activity recorded yet.</div>'));else [{
      v: e.clients.toLocaleString('en-ZA'),
      l: 'Employees took up',
      k: 'ewaEmployees',
      s: e.advances.toLocaleString('en-ZA') + ' advances total',
      bg: 'var(--brand-soft)'
    }, {
      v: e.total,
      l: 'Total advanced',
      k: 'ewaTotal',
      s: 'All finalised advances',
      bg: '#e7f7ef'
    }, {
      v: e.avg,
      l: 'Average advance',
      k: 'ewaAverage',
      s: 'Per drawdown',
      bg: 'var(--brand-soft)'
    }, {
      v: e.perClient.toFixed(1),
      l: 'Advances per employee',
      k: 'ewaFrequency',
      s: 'Average frequency',
      bg: '#fdf3e2'
    }].forEach((x, i) => kpiWrap.appendChild(el(`<div class="card kpi reveal" style="animation-delay:${i * .06}s"><div class="kpi-label"><span class="kpi-ico" style="background:${x.bg}"></span>${x.l}${employerInfoButton(x.k)}</div><div class="kpi-value">${x.v}</div><div class="kpi-sub">${x.s}</div></div>`)));
  }
  if (!wrap) return;
  const comparison = getMonthFinancialComparison('ewa');
  if (comparison) {
    renderMarkup(wrap, renderPeriodLineChart([comparison.current], [comparison.previous], comparison.currentLabel, comparison.previousLabel, formatRand, 'var(--chart-cashflow)'));
    return;
  }
  const current = e?.trend || [],
    prior = DATA.comparison?.previous?.ewa || [];
  renderMarkup(wrap, renderPeriodLineChart(current, prior, DATA.filterContext?.label || 'Selected period', DATA.comparison?.label || 'Previous period', formatRandThousands, 'var(--chart-cashflow)'));
}
function renderSavings() {
  const wrap = document.getElementById('savings-chart');
  const comparison = getMonthFinancialComparison('savings');
  if (comparison) {
    renderMarkup(wrap, renderPeriodLineChart([comparison.current], [comparison.previous], comparison.currentLabel, comparison.previousLabel, formatRand, 'var(--chart-cashflow)'));
    return;
  }
  const current = DATA.savings || [],
    prior = DATA.comparison?.previous?.savings || [];
  renderMarkup(wrap, renderPeriodLineChart(current, prior, DATA.filterContext?.label || 'Selected period', DATA.comparison?.label || 'Previous period', formatRandThousands, 'var(--chart-cashflow)'));
}

/* ─────────────────── ACT 3: debt pressure profile ─────────────────── */
function renderDebtProfile() {
  const wrap = document.getElementById('debt-profile');
  if (!wrap) return;
  // stacked bar by type
  let seg = DATA.debtProfile.map((d, i) => `<div class="dp-seg" style="width:${d.pct}%;background:${brandSeries(i)}" title="${esc(d.type)}"></div>`).join('');
  let legend = DATA.debtProfile.map((d, i) => `<div class="dp-leg"><span class="dp-dot" style="background:${brandSeries(i)}"></span><span class="dp-type">${esc(d.type)}</span><span class="dp-bal">${displayMoney(d.balance)}</span><span class="dp-pct">${d.pct}%</span></div>`).join('');
  wrap.appendChild(el(`<div>
    <div class="dp-bar">${seg}</div>
    <div class="dp-legend">${legend}</div>
    <button class="dp-toggle" id="dp-toggle">View by creditor ▾</button>
  </div>`));
  const tbl = document.getElementById('creditor-table');
  tbl.style.display = 'none';
  document.getElementById('dp-toggle').addEventListener('click', function () {
    const open = tbl.style.display !== 'none';
    tbl.style.display = open ? 'none' : 'block';
    this.textContent = open ? 'View by creditor ▾' : 'Hide creditor detail ▴';
  });
}

/* ─────────────────── ACT 3: creditor table ─────────────────── */
function initials(n) {
  return n.split(/\s|\//)[0].slice(0, 2).toUpperCase();
}
function renderCreditors() {
  const wrap = document.getElementById('creditor-table');
  let rows = DATA.creditors.map((c, i) => `<tr class="ct-row" data-i="${i}">
    <td data-label="Creditor"><div class="cred-name"><span class="cred-logo" style="background:${c.color}">${initials(c.name)}</span><span class="cred-name-text">${esc(c.name)}</span></div></td>
    <td data-label="Accounts" class="r num">${esc(c.accounts)}</td>
    <td data-label="Balance" class="r num">${displayMoney(c.balance)}</td>
    <td data-label="Average per account" class="r muted">${displayMoney(c.avg)}</td>
    <td data-label="Status" class="r"><span class="chip-mini ${c.status === 'elig' ? 'chip-elig' : 'chip-prog'}">${esc(c.statusL)}</span></td>
  </tr>`).join('');
  const tbl = el(`<table class="ct">
    <thead><tr><th>Creditor</th><th class="r">Accounts</th><th class="r">Balance</th><th class="r">Average per account</th><th class="r">Status</th></tr></thead>
    <tbody>${rows}
      <tr class="ct-total"><td data-label="Total"><strong>Total in arrears journey</strong></td><td data-label="Accounts" class="r num">${esc(DATA.creditorsTotal.accounts)}</td><td data-label="Balance" class="r num">${displayMoney(DATA.creditorsTotal.balance)}</td><td data-label="Average per account" class="r"></td><td data-label="Status" class="r"></td></tr>
    </tbody>
  </table>`);
  tbl.querySelectorAll('.ct-row').forEach(row => row.addEventListener('click', () => creditorDrill(DATA.creditors[+row.dataset.i])));
  wrap.appendChild(tbl);
}

/* ─────────────────── ACT 4: region bars ─────────────────── */
function renderRegions() {
  const wrap = document.getElementById('region-bars');
  DATA.regions.forEach((r, i) => {
    const col = r.stress >= 70 ? 'var(--chart-high)' : r.stress >= 55 ? 'var(--chart-mid)' : r.stress >= 45 ? 'var(--chart-debt)' : 'var(--chart-low)';
    const row = el(`<div class="hbar-row"><div class="hbar-lbl">${esc(r.name)}</div><div class="hbar-track"><div class="hbar-fill" style="width:0;background:${col}"></div></div><div class="hbar-val">${r.stress}</div></div>`);
    wrap.appendChild(row);
    setTimeout(() => row.querySelector('.hbar-fill').style.width = r.stress + '%', 150 + i * 80);
  });
}

/* ─────────────────── ACT 4: stress map summary strip ─────────────────── */
function renderStressMap() {
  const wrap = document.getElementById('stress-strip');
  if (!wrap) return;
  const tone = {
    red: 'var(--chart-high)',
    green: 'var(--chart-low)',
    blue: 'var(--chart-debt)',
    amber: 'var(--chart-mid)'
  };
  const strip = el('<div class="stress-grid reveal"></div>');
  DATA.stressMap.forEach(s => {
    strip.appendChild(el(`<div class="stress-cell" style="--t:${tone[s.tone]}">
      <div class="stress-l">${s.l} ${employerInfoButton(employerMetricKey(s.l))}</div>
      <div class="stress-v">${s.v}</div>
      <div class="stress-d">${s.d}</div>
    </div>`));
  });
  wrap.appendChild(strip);
}

/* ─────────────────── ACT 4: income donut ─────────────────── */
function renderIncome() {
  const wrap = document.getElementById('income-donut');
  if (!wrap) return;
  const rows = Array.isArray(DATA.income) ? DATA.income : [];
  if (!rows.length) {
    renderMarkup(wrap, '<div class="muted" style="padding:28px 8px;text-align:center;">Income-band data is not available for this period.</div>');
    return;
  }
  const total = rows.reduce((sum, row) => sum + (Number(row.count) || 0), 0);
  if (total <= 0) {
    renderMarkup(wrap, '<div class="muted" style="padding:28px 8px;text-align:center;">No activated employees with an income band are available in this view.</div>');
    return;
  }
  const r = 52,
    c = 2 * Math.PI * r;
  let off = 0;
  const segs = rows.map((b, i) => {
    const count = Number(b.count) || 0;
    const frac = count / total,
      len = frac * c;
    const s = `<circle cx="70" cy="70" r="${r}" fill="none" stroke="${brandSeries(i)}" stroke-width="20" stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-off}" transform="rotate(-90 70 70)" />`;
    off += len;
    return s;
  }).join('');
  const legend = rows.map((b, i) => `<div class="legend-row"><span class="legend-dot" style="background:${brandSeries(i)}"></span><span class="legend-name">${esc(b.name)}</span><span class="legend-val">${Number(b.count || 0).toLocaleString('en-ZA')}</span></div>`).join('');
  renderMarkup(wrap, `<div class="donut-wrap">
    <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label="Activated employees by income band">${segs}
      <text x="70" y="65" text-anchor="middle" font-size="22" font-weight="800" fill="var(--brand-primary)" font-family="Fraunces,serif">${total.toLocaleString('en-ZA')}</text>
      <text x="70" y="84" text-anchor="middle" font-size="9.5" font-weight="700" fill="#8497a7">ACTIVATED</text>
    </svg>
    <div class="legend">${legend}<div class="legend-sub" style="margin-top:4px">Income-band reach among activated employees in the selected view.</div></div>
  </div>`);
}

/* ─────────────────── ACT 4: ratings ─────────────────── */
function renderRatings() {
  const wrap = document.getElementById('ratings');
  const rt = DATA.ratings;
  const avg = Math.max(0, Math.min(5, Number(rt.avg) || 0));
  const rounded = Math.round(avg * 2) / 2;
  const stars = Array.from({
    length: 5
  }, (_, i) => {
    const fill = rounded - i;
    const state = fill >= 1 ? 'full' : fill >= 0.5 ? 'half' : 'empty';
    return `<span class="rating-star ${state}" aria-hidden="true">★</span>`;
  }).join('');
  let bars = [5, 4, 3, 2, 1].map(s => `<div class="rb-row"><div class="rb-lbl">${s} ★</div><div class="rb-track"><div class="rb-fill" style="width:${rt.dist[s]}%;${s <= 2 ? 'background:var(--chart-high)' : s === 3 ? 'background:var(--chart-mid)' : ''}"></div></div><div class="rb-val">${rt.dist[s]}%</div></div>`).join('');
  wrap.appendChild(el(`<div>
    <div class="rating-hero">
      <div class="rating-big">${avg.toFixed(1)}</div>
      <div class="rating-summary">
        <div class="rating-stars" role="img" aria-label="${avg.toFixed(1)} out of 5 stars">${stars}</div>
        <div class="rating-response-count">${rt.responses.toLocaleString()} ratings</div>
      </div>
    </div>
    <div class="rating-bars">${bars}</div>
    <div class="rating-share-pill"><div><div class="l">5-star ratings ${employerInfoButton('fiveStarPct')}</div></div><div class="v">${rt.fiveStarPct}%</div></div>
    <div class="rating-share-pill"><div><div class="l">Net Promoter Score ${employerInfoButton('nps')}</div></div><div class="v">${rt.nps == null ? 'Not available' : rt.nps}</div></div>
  </div>`));
}

/* ─────────────────── ACT 5: debt states (three honest buckets) ─────────────────── */
function renderDebtStates() {
  const wrap = document.getElementById('debt-states');
  if (!wrap) return;
  const d = DATA.debtStates;
  // Full number, not abbreviated Not available these three cards are the actual audited
  // rand amounts an employer/broker checks line by line, so "R 384k" vs
  // "R 384,231" is the difference between a rough vibe and a real figure.
  const fmtM = v => 'R ' + Math.round(v).toLocaleString('en-ZA');
  const total = d.active.rand + d.challenged.rand + d.guided.rand;
  const cols = [{
    ...d.active,
    c: "var(--blue)",
    tag: "ACTIVE ARRANGEMENT"
  }, {
    ...d.challenged,
    c: "var(--chart-insurance)",
    tag: "BEING CONTESTED"
  }, {
    ...d.guided,
    c: "var(--chart-mid)",
    tag: "GUIDANCE ONLY"
  }];
  // stacked bar
  let seg = cols.map(x => `<div style="width:${(x.rand / total * 100).toFixed(1)}%;background:${x.c};height:100%"></div>`).join('');
  // three cards
  let cards = cols.map(x => {
    const mk = x.tag === 'ACTIVE ARRANGEMENT' ? 'debtActive' : x.tag === 'BEING CONTESTED' ? 'debtChallenged' : 'debtGuided';
    return `<div class="ds-card" style="--c:${x.c}">
    <div class="ds-tag" style="color:${x.c}">${x.tag}</div>
    <div class="ds-v">${fmtM(x.rand)}</div>
    <div class="ds-name">${x.label} ${employerInfoButton(mk)}</div>
    <div class="ds-note">${x.note}</div>
    <div class="ds-emp">${x.employees} employees</div>
  </div>`;
  }).join('');
  wrap.appendChild(el(`<div>
    <div class="ds-bar">${seg}</div>
    <div class="ds-grid">${cards}</div>
    <div class="ds-foot">Only <strong>${fmtM(d.active.rand)}</strong> is counted as <strong>debt under active intervention</strong> in the summary above. The guidance-only amount is shown separately and honestly Not available we educated these employees on prescription so they can manage accounts they couldn't afford to arrange; we don't claim it as active intervention.</div>
  </div>`));
}

/* ─────────────────── ACT 5: prescription ─────────────────── */
function renderPrescription() {
  const wrap = document.getElementById('prescription');
  const p = DATA.prescription;
  let bars = p.statusBars.map((b, i) => {
    const row = el(`<div class="hbar-row" style="grid-template-columns:130px 1fr 96px"><div class="hbar-lbl">${b.l}</div><div class="hbar-track" style="height:26px"><div class="hbar-fill" style="width:0;background:${b.c}"></div></div><div class="hbar-val">${b.n} acct</div></div>`);
    setTimeout(() => row.querySelector('.hbar-fill').style.width = b.pct + '%', 150 + i * 100);
    return row;
  });
  const top = el(`<div style="display:flex;gap:26px;margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid #f7f4ff">
    <div><div style="font-size:11px;font-weight:700;color:#8497a7;text-transform:uppercase;letter-spacing:.05em">Value challenged ${employerInfoButton('prescriptionValue')}</div><div style="font-family:Fraunces,serif;font-size:30px;font-weight:600;color:var(--brand-primary);letter-spacing:-1px;margin-top:5px">${displayMoney(p.total)}</div></div>
    <div><div style="font-size:11px;font-weight:700;color:#8497a7;text-transform:uppercase;letter-spacing:.05em">Already written off ${employerInfoButton('prescriptionWrittenOff')}</div><div style="font-family:Fraunces,serif;font-size:30px;font-weight:600;color:var(--chart-cashflow);letter-spacing:-1px;margin-top:5px">${displayMoney(p.writtenOff)}</div></div>
    <div><div style="font-size:11px;font-weight:700;color:#8497a7;text-transform:uppercase;letter-spacing:.05em">Accounts ${employerInfoButton('prescriptionAccounts')}</div><div style="font-family:Fraunces,serif;font-size:30px;font-weight:600;color:var(--brand-primary);letter-spacing:-1px;margin-top:5px">${esc(p.accounts)}</div></div>
  </div>`);
  wrap.appendChild(top);
  const hb = el('<div class="hbar"></div>');
  bars.forEach(b => hb.appendChild(b));
  wrap.appendChild(hb);
}

/* ─────────────────── ACT 5: referral ─────────────────── */
function renderRiskSignals() {
  const wrap = document.getElementById('risk-signals');
  if (!wrap) return;
  const sev = {
    high: {
      c: 'var(--chart-high)',
      l: 'High'
    },
    med: {
      c: 'var(--chart-mid)',
      l: 'Medium'
    },
    low: {
      c: 'var(--chart-debt)',
      l: 'Low'
    }
  };
  DATA.riskSignals.forEach(s => {
    const sv = sev[s.sev];
    wrap.appendChild(el(`<div class="risk-row">
      <div class="risk-bar" style="background:${sv.c}"></div>
      <div class="risk-body"><div class="risk-sig">${s.sig} ${employerInfoButton('riskSignals')}</div><div class="risk-note">${s.note}</div></div>
      <div class="risk-stat"><div class="risk-n">${s.n.toLocaleString()}</div><div class="risk-sev" style="color:${sv.c}">${sv.l}</div></div>
    </div>`));
  });
}
function renderOpportunities() {
  const wrap = document.getElementById('opportunities');
  if (!wrap) return;
  const o = DATA.opportunities;
  const cards = o.cards.map(c => `<div class="opp-card">
    <div class="opp-ico">${svgIco(c.icon)}</div>
    <div class="opp-name">${esc(c.name)} ${employerInfoButton('opportunities')}</div>
    <div class="opp-elig"><span class="opp-n">${c.eligible}</span> employees eligible</div>
    <div class="opp-save">${c.saving !== 'Not available' ? '+ ' + c.saving + '/mo potential' : c.extra || ''}</div>
  </div>`).join('');
  const r = DATA.referral;
  wrap.appendChild(el(`<div class="opp-wrap reveal">
    <div class="opp-grid">${cards}</div>
    <div class="opp-foot">
      <div class="opp-foot-main">
        <div class="opp-foot-l">Estimated additional value in the next wave ${employerInfoButton('opportunityValue')}</div>
        <div class="opp-foot-v">${o.estMonthly}<span>/month</span> &nbsp;·&nbsp; ${o.estAnnual}<span>/year</span></div>
        <div class="opp-foot-note">Direct your broker to activate these segments Not available the diagnosis is already done.</div>
      </div>
      <div class="opp-foot-ref">
        <div class="opp-ref-v">${r.shareRate}%</div>
        <div class="opp-ref-l">organic referral rate ${employerInfoButton('referralRate')}<br><span>${r.shares.toLocaleString()} shares · reach ${r.impliedReach}</span></div>
      </div>
    </div>
  </div>`));
}

/* ─────────────────── ACT 6: webchat engagement ─────────────────── */
const JOURNEY_COLOR = {
  credit: 'var(--chart-debt)',
  funeral: 'var(--chart-insurance)',
  arrears: 'var(--chart-mid)',
  prescribed: 'var(--chart-workforce)',
  emergency: 'var(--chart-cashflow)',
  general: 'var(--chart-engagement)'
};
let CHAT_SELECTED = 'credit';
function sentBadge(pct) {
  const c = brandSeries(Math.round(pct / 20));
  const lbl = pct >= 72 ? 'Positive' : pct >= 64 ? 'Mixed' : 'Anxious';
  return `<span style="font-size:10.5px;font-weight:800;color:${c};background:${c}1a;padding:3px 8px;border-radius:6px">${lbl} · ${pct}%</span>`;
}
function chatUnavailableMessage() {
  return '<div class="muted" style="padding:34px 18px;text-align:center;color:#8497a7;font-size:13px;line-height:1.55;">Chat data is supplied by the separate chat integration and is not currently available.</div>';
}
function renderChatUnavailable() {
  const c = DATA.chat || {};
  const countTag = document.getElementById('chat-count-tag');
  if (countTag) countTag.textContent = 'Data unavailable';
  const kpis = document.getElementById('chat-kpis');
  if (kpis) renderMarkup(kpis, `<div class="card reveal" style="grid-column:1/-1;padding:10px 0;">${chatUnavailableMessage()}</div>`);
  ['chat-journeys', 'chat-trending', 'chat-themes'].forEach(id => {
    const node = document.getElementById(id);
    if (node) renderMarkup(node, chatUnavailableMessage());
  });
  const title = document.getElementById('chat-theme-title');
  if (title) title.textContent = 'Chat themes';
  const note = document.getElementById('chat-theme-note');
  if (note) note.textContent = 'Available when the separate chat integration is connected.';
}
function renderChatKPIs() {
  const c = DATA.chat || {};
  const cards = [{
    label: 'Total conversations',
    infoKey: 'chatTotal',
    ico: KPI_ICONS.activated,
    num: Number(c.conversations || 0),
    sub: 'selected period',
    spark: Array.isArray(c.volume) && c.volume.length ? sparkline(c.volume, 'var(--blue)') : ''
  }, {
    label: 'Resolved in chat',
    infoKey: 'chatResolved',
    ico: KPI_ICONS.takeUp,
    num: Number(c.resolvedInChat || 0),
    suffix: '%',
    sub: Number.isFinite(Number(c.escalated)) ? Number(c.escalated) + '% handed to an agent' : 'handoff rate unavailable'
  }, {
    label: 'Avg first reply',
    infoKey: 'chatFirstReply',
    ico: {
      bg: 'var(--brand-soft)',
      path: '<circle cx="12" cy="12" r="9" stroke="var(--chart-cashflow)" stroke-width="1.8" fill="none"/><path d="M12 7v5l3 2" stroke="var(--chart-cashflow)" stroke-width="1.8" stroke-linecap="round"/>'
    },
    raw: c.avgFirstReply || 'Not available',
    sub: 'median response time'
  }, {
    label: 'Chat satisfaction',
    infoKey: 'chatSatisfaction',
    ico: KPI_ICONS.rating,
    num: Number(c.csat || 0),
    suffix: '/5',
    decimals: 1,
    sub: 'rated after chat'
  }];
  const wrap = document.getElementById('chat-kpis');
  if (!wrap) return;
  cards.forEach((cardData, i) => {
    const card = el(`<div class="card kpi reveal" style="animation-delay:${i * .06}s">
      <div class="kpi-label"><span class="kpi-ico" style="background:${cardData.ico.bg}"><svg width="18" height="18" viewBox="0 0 24 24">${cardData.ico.path}</svg></span>${cardData.label}${employerInfoButton(cardData.infoKey)}</div>
      <div class="kpi-value">${cardData.raw ? cardData.raw : '<span class="kpi-num">0</span>'}${cardData.suffix ? '<span style="font-size:18px">' + cardData.suffix + '</span>' : ''}</div>
      <div class="kpi-sub">${cardData.sub || ''}</div>
      ${cardData.spark || ''}
    </div>`);
    wrap.appendChild(card);
    if (!cardData.raw) countUp(card.querySelector('.kpi-num'), cardData.num, {
      decimals: cardData.decimals || 0,
      delay: 120 + i * 60
    });
  });
}
function renderChatJourneys() {
  const wrap = document.getElementById('chat-journeys');
  if (!wrap) return;
  const rows = Array.isArray(DATA.chat?.byJourney) ? DATA.chat.byJourney : [];
  if (!rows.length) {
    renderMarkup(wrap, '<div class="muted" style="padding:28px 12px;text-align:center;color:#8497a7;font-size:13px;">No conversations in the selected period.</div>');
    return;
  }
  const max = Math.max(1, ...rows.map(j => Number(j.convos || 0)));
  rows.forEach((j, i) => {
    const col = JOURNEY_COLOR[j.key] || 'var(--blue)';
    const row = el(`<div class="chat-jrow${j.key === CHAT_SELECTED ? ' sel' : ''}" data-k="${esc(j.key)}">
      <div class="chat-jbar-lbl"><span class="chat-jdot" style="background:${col}"></span>${esc(j.name)}</div>
      <div class="chat-jbar-track"><div class="chat-jbar" style="width:0;background:${col}"></div></div>
      <div class="chat-jmeta">${j.convos.toLocaleString()}<small>${sentBadge(j.sentiment)}</small></div>
    </div>`);
    row.addEventListener('click', () => {
      CHAT_SELECTED = j.key;
      renderChatThemes();
      document.querySelectorAll('.chat-jrow').forEach(r => r.classList.toggle('sel', r.dataset.k === j.key));
    });
    wrap.appendChild(row);
    setTimeout(() => row.querySelector('.chat-jbar').style.width = j.convos / max * 100 + '%', 140 + i * 70);
  });
}
function renderChatTrending() {
  const wrap = document.getElementById('chat-trending');
  const rows = Array.isArray(DATA.chat?.trending) ? DATA.chat.trending : [];
  if (!rows.length) {
    renderMarkup(wrap, '<div class="muted" style="padding:28px 12px;text-align:center;color:#8497a7;font-size:13px;">No trending questions in the selected period.</div>');
    return;
  }
  rows.forEach((t, i) => {
    const tc = t.trend === 'flat' ? '#8497a7' : 'var(--chart-engagement)';
    wrap.appendChild(el(`<div class="trend-row">
      <div class="trend-rank">${i + 1}</div>
      <div class="trend-body"><div class="trend-q">"${t.q}"</div><div class="trend-meta">${t.journey}</div></div>
      <div class="trend-stat"><div class="trend-n">${t.n}</div><div class="trend-up" style="color:${tc}">${t.trend === 'flat' ? 'Not available' : '▲ ' + t.trend}</div></div>
    </div>`));
  });
}
function renderChatThemes() {
  const wrap = document.getElementById('chat-themes');
  if (!wrap) return;
  renderMarkup(wrap, '');
  const journeys = Array.isArray(DATA.chat?.byJourney) ? DATA.chat.byJourney : [];
  const j = journeys.find(x => x.key === CHAT_SELECTED) || journeys[0];
  if (!j) {
    const title = document.getElementById('chat-theme-title');
    if (title) title.textContent = 'Chat themes';
    const note = document.getElementById('chat-theme-note');
    if (note) note.textContent = 'No journey themes in the selected period.';
    renderMarkup(wrap, '<div class="muted" style="padding:28px 12px;text-align:center;color:#8497a7;font-size:13px;">No themes tagged in the selected period.</div>');
    return;
  }
  document.getElementById('chat-theme-title').textContent = 'Top themes Not available ' + j.name;
  document.getElementById('chat-theme-note').textContent = window.__LIVE__ ? 'Most frequent themes tagged for this journey in the selected period.' : 'Illustrative demonstration themes for this journey.';
  if (!j.themes || !j.themes.length) {
    wrap.appendChild(el('<div class="muted" style="padding:10px 0;color:#8497a7;font-size:13px;">No themes tagged for this journey yet.</div>'));
    return;
  }
  const max = Math.max(...j.themes.map(t => t.n));
  const grid = el('<div class="theme-grid"></div>');
  j.themes.forEach((t, i) => {
    const col = JOURNEY_COLOR[j.key];
    const row = el(`<div class="theme-row">
      <div class="theme-q">${t.t}</div>
      <div class="theme-track"><div class="theme-fill" style="width:0;background:${col}"></div></div>
      <div class="theme-n">${t.n}</div>
    </div>`);
    grid.appendChild(row);
    setTimeout(() => row.querySelector('.theme-fill').style.width = t.n / max * 100 + '%', 120 + i * 60);
  });
  wrap.appendChild(grid);
}
function renderChat() {
  const c = DATA.chat || {};
  if (c.available === false) {
    renderChatUnavailable();
    return;
  }
  const countTag = document.getElementById('chat-count-tag');
  if (countTag) countTag.textContent = Number(c.conversations || 0).toLocaleString() + ' chats';
  renderChatKPIs();
  renderChatJourneys();
  renderChatTrending();
  renderChatThemes();
}

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
  ['exec-summary', 'wellness', 'kpis', 'funnel', 'outcomes', 'value-strip', 'savings-chart', 'debt-profile', 'creditor-table', 'stress-strip', 'region-bars', 'income-donut', 'ratings', 'debt-states', 'prescription', 'risk-signals', 'opportunities', 'chat-kpis', 'chat-journeys', 'chat-trending', 'chat-themes', 'ewa-kpis', 'ewa-chart'].forEach(id => {
    const e = document.getElementById(id);
    if (e) renderMarkup(e, '');
  });
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
  const n = Number(v);
  if (!Number.isFinite(n)) return 'Not available';
  return 'R ' + Math.round(n * 1000).toLocaleString('en-ZA');
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
function renderExecutiveInsight() {
  const host = document.getElementById('executive-insight');
  if (!host) return;
  const w = DATA.wellness || {},
    pc = DATA.periodComparison;
  const score = Number(w.score),
    prior = Number(w.prior);
  const delta = Number.isFinite(score) && Number.isFinite(prior) ? score - prior : null;
  const statements = [];
  if (Number.isFinite(score)) statements.push('Financial wellbeing score is ' + score + '/100' + (delta === null ? '' : ', ' + (delta > 0 ? 'up ' : delta < 0 ? 'down ' : 'unchanged ') + Math.abs(delta) + ' points versus ' + (pc?.previous?.label || 'the comparison period')) + '.');
  if (Number.isFinite(Number(pc?.current?.monthlyCashFreedUp))) statements.push('Monthly cash freed up is ' + formatRandThousands(pc.current.monthlyCashFreedUp) + '.');
  if (Number.isFinite(Number(pc?.current?.totalAdvanced))) statements.push('Total advanced through early wage access is ' + formatRandThousands(pc.current.totalAdvanced) + ' in this period.');
  const box = el('<div class="enterprise-insight"><div class="enterprise-insight-eyebrow">Executive insight</div><div class="enterprise-insight-copy"></div></div>');
  box.querySelector('.enterprise-insight-copy').textContent = statements.join(' ') || 'More data is required to produce an executive insight for this view.';
  renderMarkup(host, '');
  host.appendChild(box);
}
function renderDataTrust() {
  const host = document.getElementById('data-trust');
  if (!host) return;
  const q = DATA.dataQuality || {},
    warnings = Array.isArray(q.warnings) ? q.warnings : [];
  const state = warnings.length === 0 ? 'Good' : warnings.length <= 2 ? 'Attention' : 'Incomplete';
  const btn = el('<button class="data-trust-pill ' + state.toLowerCase() + '" type="button"><span class="data-trust-dot"></span><span>Data quality: <strong>' + state + '</strong></span></button>');
  renderMarkup(host, '');
  host.appendChild(btn);
  btn.addEventListener('click', () => {
    const rows = warnings.length ? '<ul class="data-trust-list">' + warnings.map(w => '<li>' + esc(typeof w === 'string' ? w : w.message || JSON.stringify(w)) + '</li>').join('') + '</ul>' : '<p>No data-quality warnings were returned for this view.</p>';
    const body = '<div class="data-trust-grid"><div><strong>' + (q.loadedFeedCount ?? 0) + '</strong><span>feeds loaded</span></div><div><strong>' + (q.coreFeedCount ?? 0) + '</strong><span>core feeds</span></div><div><strong>' + (q.workforceObservationRows ?? 0) + '</strong><span>workforce observations</span></div><div><strong>' + (q.debtObservationRows ?? 0) + '</strong><span>debt observations</span></div></div>' + rows;
    openDrawer('Data quality', DATA.filterContext?.label || 'Selected view', body, 'outcome');
  });
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
    [renderExec, renderExecutiveInsight, renderDataTrust, renderWellness, renderKPIs, renderFunnel, renderOutcomes, renderValueStrip, renderSavings, renderEwa, renderDebtProfile, renderCreditors, renderRegions, renderIncome, renderRatings, renderDebtStates, renderPrescription, renderRiskSignals, renderOpportunities, renderChat, renderStressMap].forEach(safeRender);
    safeRender(() => wireMetricTips(document.getElementById('employer-view')));
    updateContextLine();
    const ep0 = document.getElementById('exec-period');
    if (ep0) ep0.textContent = (DATA.filterContext && DATA.filterContext.label || 'Latest') + ' · at a glance';
    const siteLabel = document.querySelector('#region-filter .tag-label');
    const incomeLabel = document.querySelector('#income-filter .tag-label');
    if (siteLabel) siteLabel.textContent = DATA.filterContext?.site || (STATE.region === 'all' ? 'All regions' : STATE.region);
    if (incomeLabel) incomeLabel.textContent = DATA.filterContext?.incomeLabel || (STATE.income === 'all' ? 'All income bands' : STATE.income);
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
  renderKPIs();
  renderFunnel();
  renderOutcomes();
  renderValueStrip();
  renderSavings();
  renderEwa();
  renderDebtProfile();
  renderCreditors();
  renderRegions();
  renderIncome();
  renderRatings();
  renderDebtStates();
  renderPrescription();
  renderRiskSignals();
  renderOpportunities();
  renderChat();
  renderStressMap();
  // Do not apply a queued demo-layout pass to newly loaded live API data.
  requestAnimationFrame(() => {
    if (!window.__LIVE__) fitResponsiveDataValues();
  });
  wireMetricTips(document.getElementById('employer-view'));
  updateContextLine();
  const ep = document.getElementById('exec-period');
  if (ep) ep.textContent = PERIOD[STATE.period].label + ' · at a glance';
}
function fitResponsiveDataValues(root = document) {
  const nodes = root.querySelectorAll?.('.kpi-value,.stat-value,.metric-value,.stat-cell .v,.rating-big,.stress-v,.hbar-val,.rb-val,.dp-pct') || [];
  nodes.forEach(node => {
    node.style.whiteSpace = 'nowrap';
    node.style.overflow = 'visible';
    const cs = getComputedStyle(node);
    const original = parseFloat(cs.fontSize);
    const min = node.matches('.rating-big') ? 28 : 14;
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
window.addEventListener('resize', () => requestAnimationFrame(() => fitResponsiveDataValues()), {
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
  if (tag) tag.lastChild.textContent = ' ' + DATA.kpis.takeUp.enrolled.toLocaleString() + ' enrolled';
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
let PF_SORT = 'oppValue';
let PF_SELECTED_IDS = new Set();
let PF_SELECTION_INITIALIZED = false;
let PF_FILTER_WIRED = false;
const pfEsc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;'
})[ch]);
function pfEmployerKey(e, i = 0) {
  return String(e?.id || e?.name || `employer-${i}`);
}
function pfFinite(v) {
  const n = Number(v);
  return v !== null && v !== undefined && v !== '' && Number.isFinite(n) ? n : null;
}
function pfAllEmployerKeys() {
  return PORTFOLIO.employers.map((e, i) => pfEmployerKey(e, i));
}
function pfEnsureSelection() {
  const keys = pfAllEmployerKeys();
  if (!PF_SELECTION_INITIALIZED) {
    PF_SELECTED_IDS = new Set(keys);
    PF_SELECTION_INITIALIZED = true;
    return;
  }
  const valid = new Set(keys);
  PF_SELECTED_IDS = new Set([...PF_SELECTED_IDS].filter(k => valid.has(k)));
}
function pfVisibleEmployers() {
  pfEnsureSelection();
  return PORTFOLIO.employers.filter((e, i) => PF_SELECTED_IDS.has(pfEmployerKey(e, i)));
}
function pfMoney(v) {
  const n = pfFinite(v);
  if (n === null) return 'Not available';
  return 'R ' + Math.round(n).toLocaleString('en-ZA');
}
function pfFmt(m, v) {
  const n = pfFinite(v);
  if (n === null) return 'Not available';
  if (m.unit === 'R') return pfMoney(n);
  if (m.unit === '%') return Math.round(n) + '%';
  if (m.unit === '/5') return n.toFixed(1);
  if (m.unit === 'n') return Math.round(n).toLocaleString('en-ZA');
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
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

// colour for heatmap cell: relative red->amber->green; missing/one-row columns stay neutral.
function pfHeat(m, v, vals) {
  const n = pfFinite(v);
  const clean = vals.map(pfFinite).filter(x => x !== null);
  if (n === null || clean.length < 2) return 'var(--brand-soft)';
  const min = Math.min(...clean),
    max = Math.max(...clean);
  let t = max === min ? 0.5 : (n - min) / (max - min);
  if (!m.goodHigh) t = 1 - t;
  const stops = [[224, 73, 47], [232, 145, 12], [31, 164, 99]];
  let c;
  if (t < 0.5) {
    const k = t / 0.5;
    c = stops[0].map((x, i) => Math.round(x + (stops[1][i] - x) * k));
  } else {
    const k = (t - 0.5) / 0.5;
    c = stops[1].map((x, i) => Math.round(x + (stops[2][i] - x) * k));
  }
  return `rgba(${c[0]},${c[1]},${c[2]},0.16)`;
}
function pfTextColor(m, v, vals) {
  const n = pfFinite(v);
  const clean = vals.map(pfFinite).filter(x => x !== null);
  if (n === null || clean.length < 2) return '#5d6570';
  const min = Math.min(...clean),
    max = Math.max(...clean);
  let t = max === min ? 0.5 : (n - min) / (max - min);
  if (!m.goodHigh) t = 1 - t;
  return t < 0.4 ? '#b5371f' : t > 0.7 ? '#137a47' : '#9a6206';
}
function pfSelectionLabel() {
  const total = PORTFOLIO.employers.length,
    selected = pfVisibleEmployers().length;
  if (selected === total && total) return `All employers (${total})`;
  if (!selected) return 'No employers selected';
  return `${selected} of ${total} employers`;
}
function updatePfSelectionSummary() {
  const total = PORTFOLIO.employers.length,
    selected = pfVisibleEmployers();
  const label = document.getElementById('pf-employer-filter-label');
  if (label) label.textContent = pfSelectionLabel();
  const note = document.getElementById('pf-scope-note');
  if (note) {
    const heads = selected.reduce((sum, e) => sum + (pfFinite(e.heads) || 0), 0);
    renderMarkup(note, selected.length ? `<strong>${selected.length}</strong> employer${selected.length === 1 ? '' : 's'} selected · ${heads.toLocaleString('en-ZA')} employees covered` : '<strong>No employers selected.</strong> Choose at least one employer to populate the portfolio.');
  }
  const tag = document.getElementById('pf-employer-count');
  if (tag) tag.textContent = `${selected.length} selected`;
}
function renderPfEmployerOptions(filter = '') {
  const wrap = document.getElementById('pf-employer-options');
  if (!wrap) return;
  const q = filter.trim().toLowerCase();
  renderMarkup(wrap, '');
  PORTFOLIO.employers.forEach((e, i) => {
    if (q && !String(e.name || '').toLowerCase().includes(q)) return;
    const key = pfEmployerKey(e, i);
    const checked = PF_SELECTED_IDS.has(key);
    const row = document.createElement('label');
    row.className = 'pf-filter-option';
    renderMarkup(row, `<input type="checkbox" ${checked ? 'checked' : ''} data-employer-key="${pfEsc(key)}"><span>${pfEsc(e.name)}</span>`);
    row.querySelector('input').addEventListener('change', ev => {
      if (ev.target.checked) PF_SELECTED_IDS.add(key);else PF_SELECTED_IDS.delete(key);
      updatePfSelectionSummary();
      renderPortfolioBody();
    });
    wrap.appendChild(row);
  });
  if (!wrap.children.length) renderMarkup(wrap, '<div class="muted" style="padding:12px">No matching employers.</div>');
}
function renderPfEmployerFilter() {
  pfEnsureSelection();
  updatePfSelectionSummary();
  renderPfEmployerOptions(document.getElementById('pf-employer-search')?.value || '');
  if (PF_FILTER_WIRED) return;
  PF_FILTER_WIRED = true;
  const btn = document.getElementById('pf-employer-filter-btn'),
    menu = document.getElementById('pf-employer-filter-menu');
  btn?.addEventListener('click', e => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu?.addEventListener('click', e => e.stopPropagation());
  document.getElementById('pf-select-all')?.addEventListener('click', () => {
    PF_SELECTED_IDS = new Set(pfAllEmployerKeys());
    renderPfEmployerOptions(document.getElementById('pf-employer-search')?.value || '');
    updatePfSelectionSummary();
    renderPortfolioBody();
  });
  document.getElementById('pf-clear-all')?.addEventListener('click', () => {
    PF_SELECTED_IDS.clear();
    renderPfEmployerOptions(document.getElementById('pf-employer-search')?.value || '');
    updatePfSelectionSummary();
    renderPortfolioBody();
  });
  document.getElementById('pf-employer-search')?.addEventListener('input', e => renderPfEmployerOptions(e.target.value));
  document.addEventListener('click', () => {
    menu?.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
  });
}
function renderPortfolio() {
  pfEnsureSelection();
  renderPfEmployerFilter();
  const wp = document.getElementById('pf-window-pill');
  if (wp) wp.textContent = 'Reporting window: ' + (PORTFOLIO.filterContext?.label || 'Programme to date');
  renderPortfolioBody();
  wireMetricTips(document.getElementById('portfolio-view'));
}
function renderPortfolioBody() {
  const E = pfVisibleEmployers();
  const count = E.length;
  updatePfSelectionSummary();
  if (!count) {
    renderMarkup(document.getElementById('pf-kpis'), '<div class="card" style="padding:28px;grid-column:1/-1"><b>No employers selected.</b><div class="muted" style="margin-top:8px">Use the Employers filter above or choose Select all.</div></div>');
    renderMarkup(document.getElementById('pf-heatmap'), '');
    renderMarkup(document.getElementById('pf-metric-picker'), '');
    renderMarkup(document.getElementById('pf-league'), '');
    document.getElementById('pf-league-note').textContent = '';
  } else {
    renderPfKpis(E);
    renderPfHeatmap(E);
    renderPfPicker();
    renderPfLeague(E);
  }
  const periodNote = PORTFOLIO.filterContext?.label ? ` Reporting window: ${PORTFOLIO.filterContext.label}.` : '';
  renderMarkup(document.getElementById('pf-footnote'), (PORTFOLIO.live ? `Internal portfolio view calculated from the same dated source records and score rules as each employer dashboard.${periodNote}` : PORTFOLIO.explicitDemo ? 'Internal portfolio view Not available explicit demonstration mode.' : 'Internal portfolio view is unavailable because the live portfolio feed could not be loaded. No demonstration values are shown.') + ` Currently showing ${count} of ${PORTFOLIO.employers.length} authorised employer${PORTFOLIO.employers.length === 1 ? '' : 's'}. Heatmap colouring is relative within each metric column; with only one employer the cell is intentionally neutral. Missing measures are shown as unavailable and are not ranked as zero. For stress index and arrears, higher values indicate greater risk. Not shared with employer clients.`);
  wireMetricTips(document.getElementById('portfolio-view'));
}
function renderPfKpis(E) {
  const sumAvailable = key => {
    const vals = E.map(e => pfFinite(e[key])).filter(v => v !== null);
    return {
      count: vals.length,
      total: vals.reduce((s, v) => s + v, 0)
    };
  };
  const heads = sumAvailable('heads'),
    saving = sumAvailable('saving'),
    opp = sumAvailable('oppValue');
  const scores = E.map(e => pfFinite(e.wellness)).filter(v => v !== null);
  const avgScore = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : null;
  const cards = [{
    key: 'employerClients',
    label: 'Employer clients',
    ico: KPI_ICONS.takeUp,
    raw: E.length,
    sub: heads.total.toLocaleString('en-ZA') + ' employees covered'
  }, {
    key: 'saving',
    label: 'Cashflow restored / mo',
    ico: KPI_ICONS.saving,
    raw: saving.count ? pfMoney(saving.total) : 'Not available',
    sub: saving.count === E.length ? 'across selected employers' : `${saving.count} of ${E.length} employers have cashflow data`
  }, {
    key: 'oppValue',
    label: 'Open opportunity / mo',
    ico: KPI_ICONS.activated,
    raw: opp.count ? pfMoney(opp.total) : 'Not available',
    sub: opp.count === E.length ? 'identified across selected employers' : `${opp.count} of ${E.length} employers have opportunity data`
  }, {
    key: 'wellness',
    label: 'Avg Financial Wellness Score',
    ico: KPI_ICONS.rating,
    raw: avgScore === null ? 'Not available' : avgScore,
    sub: scores.length === E.length ? 'selected-employer average' : `${scores.length} of ${E.length} employers have a complete score`
  }];
  const wrap = document.getElementById('pf-kpis');
  renderMarkup(wrap, '');
  cards.forEach((c, i) => wrap.appendChild(el(`<div class="card kpi reveal" style="animation-delay:${i * .05}s">
    <div class="kpi-label"><span class="kpi-ico" style="background:${c.ico.bg}"><svg width="18" height="18" viewBox="0 0 24 24">${c.ico.path}</svg></span><span>${c.label}</span>${pfInfoButton(c.key)}</div>
    <div class="kpi-value">${c.raw}</div><div class="kpi-sub">${c.sub}</div></div>`)));
}
function renderPfHeatmap(E) {
  const wrap = document.getElementById('pf-heatmap');
  renderMarkup(wrap, '');
  const M = PORTFOLIO.metrics;
  const colVals = {};
  M.forEach(m => colVals[m.key] = E.map(e => e[m.key]));
  const head = '<tr><th class="pf-emp-h">Employer</th>' + M.map(m => `<th class="pf-mh${m.key === PF_SORT ? ' sort' : ''}" data-k="${esc(m.key)}"><span>${m.label}</span>${pfInfoButton(m.key)}</th>`).join('') + '</tr>';
  const rows = E.map(e => {
    const cells = M.map(m => {
      const v = pfFinite(e[m.key]);
      return `<td class="${v === null ? 'pf-no-data' : ''}" style="background:${pfHeat(m, v, colVals[m.key])};color:${pfTextColor(m, v, colVals[m.key])};font-weight:700" title="${v === null ? 'Data not loaded for this measure' : ''}">${pfFmt(m, v)}</td>`;
    }).join('');
    return `<tr><td class="pf-emp">${pfEsc(e.name)}<small>${(pfFinite(e.heads) || 0).toLocaleString('en-ZA')} staff</small></td>${cells}</tr>`;
  }).join('');
  const tbl = el(`<table class="pf-heat"><thead>${head}</thead><tbody>${rows}</tbody></table>`);
  tbl.querySelectorAll('.pf-mh').forEach(th => th.addEventListener('click', ev => {
    if (ev.target.closest('.metric-info')) return;
    PF_SORT = th.dataset.k;
    renderPfPicker();
    renderPfLeague(pfVisibleEmployers());
    tbl.querySelectorAll('.pf-mh').forEach(x => x.classList.toggle('sort', x.dataset.k === PF_SORT));
    document.getElementById('pf-league').scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }));
  wrap.appendChild(tbl);
  wireMetricTips(tbl);
}
function renderPfPicker() {
  const wrap = document.getElementById('pf-metric-picker');
  renderMarkup(wrap, '');
  PORTFOLIO.metrics.forEach(m => {
    const b = el(`<button class="pf-chip${m.key === PF_SORT ? ' on' : ''}" data-k="${esc(m.key)}"><span>${m.label}</span>${pfInfoButton(m.key)}</button>`);
    b.addEventListener('click', ev => {
      if (ev.target.closest('.metric-info')) return;
      PF_SORT = m.key;
      renderPfPicker();
      renderPfLeague(pfVisibleEmployers());
      document.querySelectorAll('.pf-mh').forEach(x => x.classList.toggle('sort', x.dataset.k === PF_SORT));
    });
    wrap.appendChild(b);
  });
  wireMetricTips(wrap);
}
function renderPfLeague(E) {
  const wrap = document.getElementById('pf-league');
  renderMarkup(wrap, '');
  const m = PORTFOLIO.metrics.find(x => x.key === PF_SORT);
  const available = E.filter(e => pfFinite(e[m.key]) !== null);
  const missing = E.length - available.length;
  if (!available.length) {
    document.getElementById('pf-league-note').textContent = `No ${m.label} data is available for the selected employers.`;
    renderMarkup(wrap, '<div class="muted" style="padding:12px 0">Data not loaded for this measure.</div>');
    return;
  }
  // Higher-is-better measures rank best first. Risk measures rank highest-risk first so attention items rise to the top.
  const sorted = [...available].sort((a, b) => m.goodHigh ? pfFinite(b[m.key]) - pfFinite(a[m.key]) : pfFinite(b[m.key]) - pfFinite(a[m.key]));
  const vals = available.map(e => pfFinite(e[m.key]));
  const max = Math.max(...vals),
    min = Math.min(...vals);
  renderMarkup(document.getElementById('pf-league-note'), `Employers ranked by ${pfEsc(m.label)} ${pfInfoButton(m.key)} · ${m.goodHigh ? 'highest first' : 'highest risk first'}${missing ? ` · ${missing} unavailable` : ''}`);
  sorted.forEach((e, i) => {
    const v = pfFinite(e[m.key]);
    const rawPct = max === min ? 100 : (v - min) / (max - min) * 100;
    const goodness = m.goodHigh ? rawPct : 100 - rawPct;
    const col = pfTextColor(m, v, vals);
    const rankCol = i === 0 ? m.goodHigh ? '#137a47' : '#b5371f' : '#8497a7';
    wrap.appendChild(el(`<div class="pf-lg-row"><div class="pf-lg-rank" style="color:${rankCol}">${i + 1}</div><div class="pf-lg-name">${pfEsc(e.name)}<small>${(pfFinite(e.heads) || 0).toLocaleString('en-ZA')} staff</small></div><div class="pf-lg-track"><div class="pf-lg-fill" style="width:${Math.max(6, goodness)}%;background:${col}"></div></div><div class="pf-lg-val" style="color:${col}">${pfFmt(m, v)}</div></div>`));
  });
  wireMetricTips(document.getElementById('pf-league-note'));
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
/* ─────── drill-down drawer ─────── */
function openDrawer(title, sub, bodyHTML) {
  closeDrawer();
  const back = el('<div class="drawer-backdrop"></div>');
  const drawer = el(`<div class="drawer">
    <div class="drawer-hd">
      <div><div class="drawer-eyebrow">Drill-down</div><div class="drawer-title">${title}</div><div class="drawer-sub">${sub}</div></div>
      <button class="drawer-x" aria-label="Close">&times;</button>
    </div>
    <div class="drawer-body">${bodyHTML}</div>
  </div>`);
  back.addEventListener('click', closeDrawer);
  drawer.querySelector('.drawer-x').addEventListener('click', closeDrawer);
  document.body.appendChild(back);
  document.body.appendChild(drawer);
  requestAnimationFrame(() => {
    back.classList.add('show');
    drawer.classList.add('show');
  });
}
function closeDrawer() {
  document.querySelectorAll('.drawer,.drawer-backdrop').forEach(e => {
    e.classList.remove('show');
    setTimeout(() => e.remove(), 260);
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});
function outcomeDrill(o) {
  const prior = DATA.comparison?.previous?.outcomes?.[o.key] || [];
  const currentLabels = DATA.comparison?.current?.savingsLabels || [];
  const previousLabels = DATA.comparison?.previous?.savingsLabels || [];
  const body = `
    <div class="drawer-stat-grid">
      <div class="ds"><div class="dsl">Fixes completed</div><div class="dsv">${o.count.toLocaleString('en-ZA')}</div></div>
      <div class="ds"><div class="dsl">${esc(o.statL)}</div><div class="dsv">${displayMoney(o.stat)}</div></div>
      <div class="ds"><div class="dsl">Average per employee</div><div class="dsv">${o.avgPerEmployee || 'Not available'}</div></div>
      <div class="ds"><div class="dsl">Period change</div><div class="dsv">${hasValue(o.delta) ? (Number(o.delta) > 0 ? '+' : '') + Number(o.delta).toLocaleString('en-ZA') : 'Not available'}</div></div>
    </div>
    <div class="drawer-section-title">Completion trend</div>
    ${miniTrend(o.trend, prior, currentLabels, previousLabels, DATA.comparison?.label)}
    <div class="drawer-note">Employee-level detail is de-identified. The employer sees aggregated outcomes only. ${o.key === 'credit' ? 'Credit life replacement uses the applicable NCA substitution rules.' : ''}</div>`;
  openDrawer(o.name, o.meta, body, 'outcome');
}
function alignSeries(current, previous) {
  const a = Array.isArray(current) ? current.map(Number) : [];
  const b = Array.isArray(previous) ? previous.map(Number) : [];
  const n = Math.max(a.length, b.length);
  return {
    current: Array.from({
      length: n
    }, (_, i) => a[i - (n - a.length)] ?? null),
    previous: Array.from({
      length: n
    }, (_, i) => b[i - (n - b.length)] ?? null),
    count: n
  };
}
function miniTrend(trend, prior = [], labels = [], priorLabels = [], comparisonLabel = 'previous period') {
  const aligned = alignSeries(trend, prior);
  const values = [...aligned.current, ...aligned.previous].filter(v => Number.isFinite(v));
  if (!values.length) return '<div class="muted" style="padding:10px 0;font-size:12.5px;">No trend data is available for this period.</div>';
  const w = 620,
    h = 250,
    left = 74,
    right = 22,
    top = 24,
    bottom = 46,
    max = Math.max(1, ...values),
    ticks = niceTicks(values, 5).filter(v => v >= 0);
  const py = v => h - bottom - v / max * (h - bottom - top),
    px = i => left + i * (w - left - right) / Math.max(1, aligned.count - 1);
  const lineOf = series => series.map((v, i) => v == null ? '' : (i ? 'L' : 'M') + px(i).toFixed(1) + ' ' + py(v).toFixed(1)).filter(Boolean).join(' ');
  const line = lineOf(aligned.current),
    priorLine = lineOf(aligned.previous);
  const dots = aligned.current.map((v, i) => v == null ? '' : `<circle cx="${px(i)}" cy="${py(v)}" r="3.8" fill="var(--chart-cashflow)" stroke="var(--white)" stroke-width="2"><title>${v.toLocaleString('en-ZA')}</title></circle>`).join('');
  const priorDots = aligned.previous.map((v, i) => v == null ? '' : `<circle cx="${px(i)}" cy="${py(v)}" r="3.2" fill="var(--chart-engagement)" stroke="var(--white)" stroke-width="2"><title>${v.toLocaleString('en-ZA')}</title></circle>`).join('');
  const yaxis = ticks.map(v => `<line x1="${left}" x2="${w - right}" y1="${py(v)}" y2="${py(v)}" stroke="var(--line-soft)" stroke-width="1"/><text x="${left - 10}" y="${py(v) + 3}" text-anchor="end" font-size="10" font-weight="700" fill="var(--grey-l)">${Math.round(v).toLocaleString('en-ZA')}</text>`).join('');
  const xlabels = Array.from({
    length: aligned.count
  }, (_, i) => {
    const idx = labels.length ? i - (aligned.count - labels.length) : i;
    return idx >= 0 && labels[idx] ? `<text x="${px(i)}" y="${h - 14}" text-anchor="middle" font-size="9.5" font-weight="600" fill="var(--grey-l)">${labels[idx]}</text>` : '';
  }).join('');
  return `<div class="comparison-legend"><span><i class="comparison-dot current"></i>${esc(DATA.filterContext?.label || 'Selected period')}</span><span><i class="comparison-dot previous"></i>${esc(comparisonLabel || 'Previous period')}</span></div>
  <svg viewBox="0 0 ${w} ${h}" style="width:100%;height:auto" role="img" aria-label="Completion trend comparison"><line x1="${left}" x2="${left}" y1="${top}" y2="${h - bottom}" stroke="var(--line)"/>${yaxis}<path d="${line}" fill="none" stroke="var(--chart-cashflow)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="${priorLine}" fill="none" stroke="var(--chart-engagement)" stroke-width="2.2" stroke-dasharray="6 5" stroke-linecap="round" stroke-linejoin="round"/>${dots}${priorDots}${xlabels}</svg>`;
}
function creditorDrill(c) {
  const stages = Array.isArray(c.stateBreakdown) ? c.stateBreakdown : [];
  const body = `
    <div class="drawer-stats">
      <div class="ds"><div class="dsl">Accounts in journey</div><div class="dsv">${esc(c.accounts)}</div></div>
      <div class="ds"><div class="dsl">Total balance</div><div class="dsv">${c.balance}</div></div>
      <div class="ds"><div class="dsl">Avg per account</div><div class="dsv">${c.avg}</div></div>
    </div>
    <div class="drawer-section-title">Where accounts stand</div>
    <div class="hbar" style="margin-top:10px">
      ${stages.length ? stages.map(s => `<div class="hbar-row" style="grid-template-columns:190px 1fr 68px"><div class="hbar-lbl">${s.label}</div><div class="hbar-track"><div class="hbar-fill" style="width:${s.pct}%"></div></div><div class="hbar-val">${s.count} · ${s.pct}%</div></div>`).join('') : '<div class="muted" style="padding:10px 0;font-size:12.5px;">No status breakdown available for this creditor.</div>'}
    </div>
    <div class="drawer-note">Employees deal with ${esc(c.name)} directly through a guided, do-it-yourself settlement Not available no debt-review flag, no third party taking over their money. Figures aggregated across ${esc(c.accounts)} employees.</div>`;
  openDrawer(c.name, 'Unsecured arrears, settlement journey', body, 'creditor');
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
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'no data');
      return r.json();
    });
    const live = await dashboardPromise;
    if (requestSeq !== LIVE_REQUEST_SEQ) return;
    DATA = live;
    BASE = JSON.parse(JSON.stringify(DATA));
    window.__LIVE__ = true;
    if (live.employer) {
      const h1 = document.querySelector('.head h1');
      if (h1) h1.firstChild.textContent = live.employer + ' ';
    }
    const fl = document.getElementById('data-fresh-label');
    document.querySelector('.data-fresh')?.classList.remove('is-error');
    if (fl) {
      if (live.sourceDataUpdatedAt || live.dataAsOf) {
        const d = new Date(live.sourceDataUpdatedAt || live.dataAsOf);
        fl.textContent = 'Source updated ' + d.toLocaleDateString('en-ZA', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
      } else fl.textContent = 'Live data';
    }
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
      PF_SELECTION_INITIALIZED = false;
      PF_SELECTED_IDS.clear();
      PF_RENDERED = false;
    }
  } catch (_) {
    PORTFOLIO.live = false;
    PORTFOLIO.error = true;
    if (!PORTFOLIO.explicitDemo) PORTFOLIO.employers = [];
    PF_RENDERED = false;
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
function applyTheme(theme, user) {
  const root = document.documentElement.style;
  // Admins retain the portal's original dashboard palette. Employer branding is
  // applied only inside an authenticated employer session.
  if (user && ['ADMIN', 'SUPERADMIN'].includes(String(user.role || '').toUpperCase())) {
    // Super Admin and Admin use the standard empower-fin dashboard brand.
    // Partner/employer branding is intentionally not applied to privileged roles.
    const accent = '#B15BE8';
    const primary = '#32217C';
    const navy = '#2B1B68';
    const chartPalette = complementaryPalette(accent, navy);
    if (BrandTheme) {
      const charts = {};
      Object.entries(chartPalette).forEach(([k, v]) => {
        charts['--chart-' + k] = v;
      });
      BrandTheme.set({
        brand: {
          accentColor: accent,
          primaryColor: primary,
          navyColor: navy
        },
        light: 'engine',
        charts
      });
    } else {
      root.setProperty('--blue', accent);
      root.setProperty('--blue-d', shade(accent, -18));
      root.setProperty('--brand-primary', navy);
      root.setProperty('--brand-primary-deep', shade(navy, -22));
      root.setProperty('--ice', tint(accent, 92));
      root.setProperty('--brand-soft', tint(accent, 94));
      root.setProperty('--brand-grad-1', primary);
      root.setProperty('--brand-grad-2', mix(primary, accent, .45));
      root.setProperty('--brand-grad-3', accent);
      root.setProperty('--brand-grad-4', mix(accent, '#ffffff', .28));
      root.setProperty('--brand-grad-5', mix(accent, '#ffffff', .55));
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
    return;
  }
  if (!theme) return;
  const hex = c => c ? '#' + String(c).replace(/^#/, '') : null;
  const baseName = 'empower-fin Dashboard Portal';
  const accent = hex(theme.accentColor || theme.primaryColor || '#b15be8');
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
  // Employer-only chart palette: derive harmonious hues from the uploaded brand
  // colours rather than reusing the logo colours for every data series. Stable
  // semantic assignments keep each metric recognisable across all chart types.
  const chartPalette = complementaryPalette(accent, primary);
  if (BrandTheme) {
    const charts = {};
    Object.entries(chartPalette).forEach(([k, v]) => {
      charts['--chart-' + k] = v;
    });
    BrandTheme.set({
      brand: {
        accentColor: accent,
        primaryColor: hex(theme.primaryColor) || accent,
        navyColor: primary
      },
      light: 'engine',
      charts
    });
  } else {
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
  if (theme.logoDataUrl) {
    document.querySelectorAll('.logo img, .topbar .logo img, .pdf-brand img').forEach(img => {
      img.src = theme.logoDataUrl;
      img.setAttribute('data-custom-logo', '1');
    });
    if (brandName) brandName.textContent = '';
  } else if (brandName) {
    brandName.textContent = theme.name && theme.name !== baseName ? theme.name : '';
  }
  document.title = (theme.name || baseName) + ' Not available Employer Insights';
  if (theme.tagline) {
    const sub = document.querySelector('.head-sub');
    if (sub) sub.textContent = theme.tagline;
  }
}
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
  if (greet) greet.textContent = 'Hi ' + first + ' \uD83D\uDC4B';
  var logo = document.getElementById('welcome-splash-logo');
  if (logo && me.theme && me.theme.logoDataUrl) {
    logo.src = me.theme.logoDataUrl;
    logo.setAttribute('data-custom-logo', '1');
  }
  try {
    sessionStorage.setItem('ef_splash_shown', '1');
  } catch (_) {}
  setTimeout(function () {
    el.classList.add('hide');
  }, 700);
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
function showLiveError(error) {
  const view = document.getElementById('employer-view');
  if (view) renderMarkup(view, `<div class="card" style="max-width:760px;margin:48px auto;padding:34px">
    <div style="font:800 23px Manrope,sans-serif;color:var(--brand-primary)">Live dashboard data is unavailable</div>
    <p style="margin:12px 0 0;color:#5b6b7a;line-height:1.65">The portal has not substituted demonstration figures. Check the latest sync/import status in Administration, then reload this page.</p>
    <div style="margin-top:16px;padding:10px 12px;background:#f7f9fb;border-radius:8px;color:#7b8792;font:600 12px Manrope,sans-serif">${String(error?.message || error || 'Unknown data error').replace(/[<>&]/g, '')}</div>
  </div>`);
  const fl = document.getElementById('data-fresh-label');
  if (fl) fl.textContent = 'Data unavailable';
  document.querySelector('.data-fresh')?.classList.add('is-error');
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
setInterval(checkSourceVersion, 60000);
;

/* Employer chart recolouring pass: applies to all present and future chart marks,
   while deliberately leaving the admin dashboard's original palette untouched. */
(function () {
  const isAdmin = () => {
    let u = window.currentUser || window.me || window.currentUserData;
    try {
      u = u || JSON.parse(sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser') || 'null');
    } catch (e) {}
    return String(u?.role || u?.userRole || document.body?.dataset?.role || '').toUpperCase() === 'ADMIN';
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
}
