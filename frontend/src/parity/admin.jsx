// Ported from New Changes admin.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n")}
<div id={siteText("welcome-splash")}>{siteText("\n  ")}<div className={siteText("welcome-splash-inner")}>{siteText("\n    ")}<img id={siteText("welcome-splash-logo")} className={siteText("welcome-splash-logo efs-brand-logo")} src={siteText("/static/the-fixer-logo.svg?v=6")} alt={siteText("The Fixer logo")}/>{siteText("\n    ")}<div className={siteText("welcome-splash-spinner")}/>{siteText("\n    ")}<div className={siteText("welcome-splash-greeting")} id={siteText("welcome-splash-greeting")}>{siteText("Welcome")}</div>{siteText("\n    ")}<div className={siteText("welcome-splash-sub")} id={siteText("welcome-splash-sub")}>{siteText("The Fixer is getting things ready…")}</div>{siteText("\n  ")}</div>{siteText("\n")}</div>
{siteText("\n")}

{siteText("\n")}
<div className={siteText("topbar")}><div className={siteText("topbar-inner")}>{siteText("\n  ")}<img src={siteText("/static/the-fixer-logo.svg?v=6")} className={siteText("efs-brand-logo")} alt={siteText("The Fixer")} style={{"height":"30px","width":"auto"}} ref={node => { if(node) node.setAttribute("style", "height:30px;width:auto;"); }}/>{siteText("\n  ")}<span className={siteText("pill")}>{siteText("Administration")}</span>{siteText("\n  ")}<div id={siteText("portal-nav")} style={{"marginLeft":"auto"}} ref={node => { if(node) node.setAttribute("style", "margin-left:auto;"); }}/>{siteText("\n  ")}<div id={siteText("portal-account")}/>{siteText("\n")}</div></div>
{siteText("\n\n")}
<div className={siteText("wrap")}>{siteText("\n  ")}<div className={siteText("head")}>{siteText("\n    ")}<div className={siteText("eyebrow")}>{siteText("Feed the system")}</div>{siteText("\n    ")}<h1>{siteText("Data Centre")}</h1>{siteText("\n    ")}<p>{siteText("Bring approved data into EFS Optimise from files, APIs or SQL. File uploads support CSV, Excel and JSON. Every import is validated against a governed feed contract before it reaches the live reporting model.")}</p>{siteText("\n  ")}</div>{siteText("\n\n  ")}<section id={siteText("admin-security-strip")} className={siteText("card")} style={{"margin":"18px 0","borderColor":"#d7cde9"}} ref={node => { if(node) node.setAttribute("style", "margin:18px 0;border-color:#d7cde9;"); }}>{siteText("\n    ")}<div className={siteText("card-hd")}><div><h2>{siteText("Security centre")}</h2><div className={siteText("note")}>{siteText("Live access activity and high-impact admin changes")}</div></div><a className={siteText("btn btn-sm")} href={siteText("/users")}>{siteText("Open Users & Security")}</a></div>{siteText("\n    ")}<div className={siteText("card-bd")}>{siteText("\n      ")}<div id={siteText("admin-security-summary")} style={{"display":"grid","gridTemplateColumns":"repeat(4,minmax(0,1fr))","gap":"10px"}} ref={node => { if(node) node.setAttribute("style", "display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;"); }}>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Live sessions")}</div><div className={siteText("v")} id={siteText("admin-sec-live")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Failed logins 24h")}</div><div className={siteText("v")} id={siteText("admin-sec-failed")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Open alerts")}</div><div className={siteText("v")} id={siteText("admin-sec-alerts")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Successful logins 24h")}</div><div className={siteText("v")} id={siteText("admin-sec-success")}>{siteText("-")}</div></div>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("admin-sec-copy")} style={{"marginTop":"10px","fontSize":"12px","color":"#617486"}} ref={node => { if(node) node.setAttribute("style", "margin-top:10px;font-size:12px;color:#617486;"); }}>{siteText("Loading security posture...")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</section>{siteText("\n  ")}<section id={siteText("admin-compliance-strip")} className={siteText("card")} style={{"margin":"18px 0","borderColor":"#d7cde9"}} ref={node => { if(node) node.setAttribute("style", "margin:18px 0;border-color:#d7cde9;"); }}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div><h2>{siteText("POPIA & Data Governance")}</h2><div className={siteText("note")}>{siteText("Operational controls for South African privacy, access, retention, operators and security compromises")}</div></div>{siteText("\n      ")}<button className={siteText("btn btn-sm")} type={siteText("button")} onClick={event => actions[0]?.(event)}>{siteText("Open compliance controls")}</button>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("card-bd")}>{siteText("\n      ")}<div id={siteText("compliance-summary")} className={siteText("compliance-summary")}>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Processing activities")}</div><div className={siteText("v")} id={siteText("comp-activities")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Cross-border activities")}</div><div className={siteText("v")} id={siteText("comp-crossborder")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Open data requests")}</div><div className={siteText("v")} id={siteText("comp-requests")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Open security incidents")}</div><div className={siteText("v")} id={siteText("comp-incidents")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Governance gaps")}</div><div className={siteText("v")} id={siteText("comp-gaps")}>{siteText("-")}</div></div>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("comp-status")} style={{"marginTop":"10px","fontSize":"12px","color":"#617486"}} ref={node => { if(node) node.setAttribute("style", "margin-top:10px;font-size:12px;color:#617486;"); }}>{siteText("Loading compliance controls...")}</div>{siteText("\n      ")}<div id={siteText("compliance-panel")} style={{"display":"none","marginTop":"16px"}} ref={node => { if(node) node.setAttribute("style", "display:none;margin-top:16px;"); }}>{siteText("\n        ")}<div className={siteText("compliance-grid")}>{siteText("\n          ")}<div className={siteText("compliance-box")}><h3>{siteText("Processing register")}</h3><p>{siteText("Every material processing activity should have a purpose, lawful basis, party role, data categories, retention approach and privacy-impact review.")}</p><div id={siteText("comp-activities-list")} className={siteText("compliance-list")}/></div>{siteText("\n          ")}<div className={siteText("compliance-box")}><h3>{siteText("Operators & cross-border vendors")}</h3><p>{siteText("Foreign or outsourced processing must have an identified provider, transfer basis and contractual/security review before approval.")}</p><div id={siteText("comp-vendors-list")} className={siteText("compliance-list")}/></div>{siteText("\n          ")}<div className={siteText("compliance-box")}><h3>{siteText("Data subject requests")}</h3><p>{siteText("Record access, correction, deletion, objection and consent-withdrawal requests, verify identity and track the workflow to closure.")}</p><div id={siteText("comp-requests-list")} className={siteText("compliance-list")}/></div>{siteText("\n          ")}<div className={siteText("compliance-box")}><h3>{siteText("Retention & deletion")}</h3><p>{siteText("Retention is purpose-driven. Policies are recorded before automated deletion is enabled, with legal holds preventing disposal.")}</p><div id={siteText("comp-retention-list")} className={siteText("compliance-list")}/></div>{siteText("\n          ")}<div className={siteText("compliance-box compliance-box-wide")}><h3>{siteText("Security compromise register")}</h3><p>{siteText("Suspected compromises are recorded as incidents so investigation, containment, Information Officer escalation and POPIA notification steps are not lost in ordinary security alerts.")}</p><div id={siteText("comp-incidents-list")} className={siteText("compliance-list")}/></div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</section>{siteText("\n  ")}<section id={siteText("admin-mlops-alert")} className={siteText("card mlops-alert")} aria-live={siteText("assertive")}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div style={{"flex":"1"}} ref={node => { if(node) node.setAttribute("style", "flex:1"); }}><h2>{siteText("MLOps data-quality alert")}</h2><div className={siteText("note")} id={siteText("mlops-alert-summary")}>{siteText("An incoming dataset has been blocked before reaching live tables.")}</div></div>{siteText("\n      ")}<span className={siteText("mlops-badge")} id={siteText("mlops-alert-badge")}>{siteText("ACTION REQUIRED")}</span>{siteText("\n      ")}<button className={siteText("btn btn-sm")} type={siteText("button")} onClick={event => actions[1]?.(event)}>{siteText("Review")}</button>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("card-bd")}><div id={siteText("mlops-alert-detail")} className={siteText("mlops-detail")}/></div>{siteText("\n  ")}</section>{siteText("\n  ")}<section id={siteText("data-centre")} className={siteText("card section-gap")}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div><h2>{siteText("Data ingestion")}</h2><div className={siteText("note")}>{siteText("Choose how you want to bring data into EFS Optimise. These are complementary options, not fallbacks.")}</div></div>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("card-bd")}>{siteText("\n      ")}<div className={siteText("ingestion-method-grid")}>{siteText("\n        ")}<button className={siteText("ingestion-method on")} type={siteText("button")} onClick={event => actions[2]?.(event)}>{siteText("\n          ")}<span className={siteText("ingestion-method-icon")}>{siteText("FILE")}</span>{siteText("\n          ")}<span><strong>{siteText("Upload a file")}</strong><small>{siteText("CSV, Excel (.xlsx/.xls) or JSON, up to 50 MB. Preview, validate and import.")}</small></span>{siteText("\n        ")}</button>{siteText("\n        ")}<button className={siteText("ingestion-method")} type={siteText("button")} onClick={event => actions[3]?.(event)}>{siteText("\n          ")}<span className={siteText("ingestion-method-icon")}>{siteText("API")}</span>{siteText("\n          ")}<span><strong>{siteText("Connect an API")}</strong><small>{siteText("Pull the governed feeds from HTTPS endpoints using private bearer-token authentication.")}</small></span>{siteText("\n        ")}</button>{siteText("\n        ")}<button className={siteText("ingestion-method")} type={siteText("button")} onClick={event => actions[4]?.(event)}>{siteText("\n          ")}<span className={siteText("ingestion-method-icon")}>{siteText("SQL")}</span>{siteText("\n          ")}<span><strong>{siteText("Connect a database")}</strong><small>{siteText("Use approved read-only PostgreSQL, SQL Server, MySQL or MariaDB views.")}</small></span>{siteText("\n        ")}</button>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("ingestion-note")}><strong>{siteText("Governed by design:")}</strong>{siteText(" files, API records and SQL feeds enter the same validation and import pipeline. Heavy analytics can remain on an approved read replica without moving arbitrary source data into PostgreSQL.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}<div className={siteText("grid")}>{siteText("\n    ")}{siteText("\n    ")}<div className={siteText("card")}>{siteText("\n      ")}<div className={siteText("card-hd")}><h2>{siteText("Reports")}</h2><div className={siteText("note")}>{siteText("In load order")}</div></div>{siteText("\n      ")}<div className={siteText("card-bd")} id={siteText("rep-list")}/>{siteText("\n    ")}</div>{siteText("\n\n    ")}{siteText("\n    ")}<div id={siteText("file-ingestion")}>{siteText("\n\n    ")}<div id={siteText("client-preview-overlay")} className={siteText("client-preview-overlay")} role={siteText("dialog")} aria-modal={siteText("true")} aria-labelledby={siteText("client-preview-title")} onClick={event => actions[5]?.(event)}>{siteText("\n      ")}<div className={siteText("client-preview-dialog")} onClick={event => actions[6]?.(event)}>{siteText("\n        ")}<div className={siteText("client-preview-toolbar")}>{siteText("\n          ")}<strong id={siteText("client-preview-title")}>{siteText("Client dashboard preview")}</strong>{siteText("\n          ")}<span>{siteText("Preview only")}</span>{siteText("\n          ")}<button className={siteText("client-preview-close")} type={siteText("button")} aria-label={siteText("Close preview")} onClick={event => actions[7]?.(event)}>{siteText("×")}</button>{siteText("\n        ")}</div>{siteText("\n        ")}<div id={siteText("client-preview-app")} className={siteText("client-preview-app")}/>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n      ")}<div className={siteText("card")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2 id={siteText("rep-title")}>{siteText("Select a report")}</h2><div className={siteText("note")} id={siteText("rep-note")}>{siteText("Choose a report on the left to begin.")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")} id={siteText("work")}>{siteText("\n          ")}<p className={siteText("muted")}>{siteText("Pick a report to see its format, download a template, and upload a file.")}</p>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}<div className={siteText("card section-gap")} id={siteText("enterprise-operations-card")}>{siteText("\n        ")}<div className={siteText("card-hd")}><div><h2>{siteText("Enterprise Operations & Data Architecture")}</h2><div className={siteText("note")}>{siteText("See where data is processed, how fresh it is, and which analytics are allowed to run against the source database")}</div></div><button className={siteText("btn btn-sm")} type={siteText("button")} onClick={event => actions[8]?.(event)}>{siteText("Refresh")}</button></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div id={siteText("enterprise-ops-summary")} className={siteText("compliance-summary")}>{siteText("\n            ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Data quality")}</div><div className={siteText("v")} id={siteText("ops-quality")}>{siteText("-")}</div></div>{siteText("\n            ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Source")}</div><div className={siteText("v")} id={siteText("ops-source")} style={{"fontSize":"16px"}} ref={node => { if(node) node.setAttribute("style", "font-size:16px;"); }}>{siteText("-")}</div></div>{siteText("\n            ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Analytics store")}</div><div className={siteText("v")} id={siteText("ops-store")} style={{"fontSize":"16px"}} ref={node => { if(node) node.setAttribute("style", "font-size:16px;"); }}>{siteText("-")}</div></div>{siteText("\n            ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Data freshness")}</div><div className={siteText("v")} id={siteText("ops-freshness")} style={{"fontSize":"16px"}} ref={node => { if(node) node.setAttribute("style", "font-size:16px;"); }}>{siteText("-")}</div></div>{siteText("\n            ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Open imports")}</div><div className={siteText("v")} id={siteText("ops-imports")}>{siteText("-")}</div></div>{siteText("\n          ")}</div>{siteText("\n          ")}<div id={siteText("ops-architecture")} style={{"marginTop":"14px","padding":"14px","border":"1px solid var(--line)","borderRadius":"12px","background":"#fff","fontSize":"12px","color":"#617486","lineHeight":"1.55"}} ref={node => { if(node) node.setAttribute("style", "margin-top:14px;padding:14px;border:1px solid var(--line);border-radius:12px;background:#fff;font-size:12px;color:#617486;line-height:1.55;"); }}/>{siteText("\n          ")}<div style={{"marginTop":"14px","overflow":"auto"}} ref={node => { if(node) node.setAttribute("style", "margin-top:14px;overflow:auto;"); }}>{siteText("\n            ")}<table><thead><tr><th>{siteText("Feed")}</th><th>{siteText("Workload")}</th><th>{siteText("Execution")}</th><th>{siteText("Source view")}</th><th>{siteText("Replica")}</th><th>{siteText("Enabled")}</th><th>{siteText("Reason")}</th></tr></thead><tbody id={siteText("ops-routes")}><tr><td colSpan={siteText("7")} className={siteText("muted")}>{siteText("Loading routes...")}</td></tr></tbody></table>{siteText("\n          ")}</div>{siteText("\n          ")}<div id={siteText("ops-quality-detail")} style={{"marginTop":"14px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:14px;"); }}/>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Import history")}</h2><div className={siteText("note")}>{siteText("Live updates every 1.5s · Rows show validated totals and how many changes have actually reached live tables")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")} style={{"padding":"6px 8px 12px"}} ref={node => { if(node) node.setAttribute("style", "padding:6px 8px 12px;"); }}>{siteText("\n          ")}<table className={siteText("hist")}><thead><tr><th>{siteText("Report")}</th><th>{siteText("File")}</th><th>{siteText("Rows")}</th><th>{siteText("Status")}</th><th>{siteText("When")}</th><th>{siteText("Download")}</th><th/></tr></thead>{siteText("\n          ")}<tbody id={siteText("hist-body")}><tr><td colSpan={siteText("7")} className={siteText("muted")} style={{"padding":"14px"}} ref={node => { if(node) node.setAttribute("style", "padding:14px;"); }}>{siteText("No imports yet.")}</td></tr></tbody></table>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")} id={siteText("live-integration")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Live Data Integration")}</h2><div className={siteText("note")}>{siteText("Connect the same governed feeds through an API or approved read-only SQL views")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div id={siteText("integ-status")} className={siteText("banner ok")} style={{"display":"none","marginBottom":"14px"}} ref={node => { if(node) node.setAttribute("style", "display:none;margin-bottom:14px;"); }}/>{siteText("\n\n          ")}<input id={siteText("integ-mode")} type={siteText("hidden")} defaultValue={siteText("API")}/>{siteText("\n          ")}<div className={siteText("source-mode-grid")} role={siteText("tablist")} aria-label={siteText("Integration source")}>{siteText("\n            ")}<button className={siteText("source-mode-card on")} id={siteText("source-tab-api")} type={siteText("button")} role={siteText("tab")} aria-selected={siteText("true")} onClick={event => actions[9]?.(event)}>{siteText("\n              ")}<span className={siteText("source-mode-icon")}>{siteText("API")}</span>{siteText("\n              ")}<span><strong>{siteText("API integration")}</strong><small>{siteText("Pull the 10 contracted feeds from HTTPS endpoints using bearer-token authentication.")}</small></span>{siteText("\n            ")}</button>{siteText("\n            ")}<button className={siteText("source-mode-card")} id={siteText("source-tab-sql")} type={siteText("button")} role={siteText("tab")} aria-selected={siteText("false")} onClick={event => actions[10]?.(event)}>{siteText("\n              ")}<span className={siteText("source-mode-icon")}>{siteText("DB")}</span>{siteText("\n              ")}<span><strong>{siteText("Database integration")}</strong><small>{siteText("Connect directly to approved read-only PostgreSQL, SQL Server, MySQL or MariaDB views.")}</small></span>{siteText("\n            ")}</button>{siteText("\n          ")}</div>{siteText("\n          ")}<div style={{"maxWidth":"820px","marginBottom":"14px"}} ref={node => { if(node) node.setAttribute("style", "max-width:820px;margin-bottom:14px;"); }}>{siteText("\n            ")}<label style={{"display":"block","fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a","maxWidth":"390px"}} ref={node => { if(node) node.setAttribute("style", "display:block;font-size:12.5px;font-weight:700;color:#5b6b7a;max-width:390px;"); }}>{siteText("Heartbeat reconciliation every (hours)\n              ")}<input id={siteText("integ-hours")} type={siteText("number")} min={siteText("1")} defaultValue={siteText("24")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<div id={siteText("integ-change-mode")} className={siteText("muted")} style={{"marginTop":"7px","maxWidth":"820px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:7px;max-width:820px;"); }}>{siteText("SQL sources also use indexed change detection between heartbeat runs.")}</div>{siteText("\n          ")}</div>{siteText("\n\n          ")}<div id={siteText("integ-api-panel")} className={siteText("integration-two-col")} style={{"marginTop":"14px","display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px","maxWidth":"820px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:820px;"); }}>{siteText("\n            ")}<div className={siteText("integration-panel-title")}>{siteText("API connection")}</div>{siteText("\n            ")}<label style={{"gridColumn":"span 2","fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 2;font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Provider API base URL\n              ")}<input id={siteText("integ-url")} placeholder={siteText("https://your-provider.example.com")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"gridColumn":"span 2","fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 2;font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Bearer token (kept private)\n              ")}<input id={siteText("integ-token")} type={siteText("password")} placeholder={siteText("leave blank to keep existing")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n          ")}</div>{siteText("\n\n          ")}<div id={siteText("integ-env-override")} style={{"display":"none","marginBottom":"12px","padding":"10px 14px","borderRadius":"9px","background":"var(--amber-soft)","border":"1px solid var(--amber)","color":"#7a4a00","fontSize":"12.5px","fontWeight":"600","lineHeight":"1.5"}} ref={node => { if(node) node.setAttribute("style", "display:none;margin-bottom:12px;padding:10px 14px;border-radius:9px;background:var(--amber-soft);border:1px solid var(--amber);color:#7a4a00;font-size:12.5px;font-weight:600;line-height:1.5;"); }}/>{siteText("\n          ")}<div id={siteText("integ-sql-panel")} className={siteText("integration-two-col")} style={{"marginTop":"14px","display":"none","gridTemplateColumns":"1fr 1fr","gap":"14px","maxWidth":"820px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:14px;display:none;grid-template-columns:1fr 1fr;gap:14px;max-width:820px;"); }}>{siteText("\n            ")}<div className={siteText("integration-panel-title")}>{siteText("Database connection (Direct SQL)")}</div>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("SQL platform\n              ")}<select id={siteText("integ-sql-dialect")} onChange={event => actions[11]?.(event)} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px","background":"#fff"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;background:#fff;"); }}>{siteText("\n                ")}<option value={siteText("POSTGRESQL")}>{siteText("PostgreSQL")}</option>{siteText("\n                ")}<option value={siteText("MSSQL")}>{siteText("Microsoft SQL Server")}</option>{siteText("\n                ")}<option value={siteText("MYSQL")}>{siteText("MySQL / MariaDB")}</option>{siteText("\n              ")}</select>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Port\n              ")}<input id={siteText("integ-sql-port")} type={siteText("number")} min={siteText("1")} max={siteText("65535")} placeholder={siteText("5432")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Host\n              ")}<input id={siteText("integ-sql-host")} placeholder={siteText("db.example.internal")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Database / catalog\n              ")}<input id={siteText("integ-sql-database")} placeholder={siteText("empowerfin_source")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Schema (optional)\n              ")}<input id={siteText("integ-sql-schema")} placeholder={siteText("public or dbo")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Canonical view prefix\n              ")}<input id={siteText("integ-sql-prefix")} defaultValue={siteText("v_")} placeholder={siteText("v_")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Read-only username\n              ")}<input id={siteText("integ-sql-user")} autoComplete={siteText("off")} placeholder={siteText("empowerfin_reader")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Password (kept private)\n              ")}<input id={siteText("integ-sql-password")} type={siteText("password")} autoComplete={siteText("new-password")} placeholder={siteText("leave blank to keep existing")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Query timeout (ms)\n              ")}<input id={siteText("integ-sql-timeout")} type={siteText("number")} min={siteText("1000")} defaultValue={siteText("60000")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Max changed rows / feed / sync\n              ")}<input id={siteText("integ-sql-maxrows")} type={siteText("number")} min={siteText("1")} defaultValue={siteText("250000")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#32217c;cursor:pointer;"); }}>{siteText("\n              ")}<input id={siteText("integ-sql-ssl")} type={siteText("checkbox")} defaultChecked={true} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Require encrypted SQL connection\n            ")}</label>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#32217c;cursor:pointer;"); }}>{siteText("\n              ")}<input id={siteText("integ-sql-trust")} type={siteText("checkbox")} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Trust server certificate (only when approved)\n            ")}</label>{siteText("\n            ")}<div style={{"gridColumn":"span 2","marginTop":"4px","padding":"12px","border":"1px solid #e8e1f7","borderRadius":"10px","background":"#fff"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 2;margin-top:4px;padding:12px;border:1px solid #e8e1f7;border-radius:10px;background:#fff;"); }}>{siteText("\n              ")}<div style={{"fontSize":"12.5px","fontWeight":"800","color":"var(--brand-primary)","marginBottom":"8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:800;color:var(--brand-primary);margin-bottom:8px;"); }}>{siteText("Optional source analytics read replica")}</div>{siteText("\n              ")}<div className={siteText("integration-two-col")} style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}} ref={node => { if(node) node.setAttribute("style", "display:grid;grid-template-columns:1fr 1fr;gap:12px;"); }}>{siteText("\n                ")}<label style={{"fontSize":"12px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Replica host\n                  ")}<input id={siteText("integ-replica-host")} placeholder={siteText("mysql-replica.internal")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n                ")}</label>{siteText("\n                ")}<label style={{"fontSize":"12px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Replica port\n                  ")}<input id={siteText("integ-replica-port")} type={siteText("number")} min={siteText("1")} max={siteText("65535")} placeholder={siteText("3306")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n                ")}</label>{siteText("\n                ")}<label style={{"fontSize":"12px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Replica database\n                  ")}<input id={siteText("integ-replica-database")} placeholder={siteText("same database if blank")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n                ")}</label>{siteText("\n                ")}<label style={{"fontSize":"12px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Replica username\n                  ")}<input id={siteText("integ-replica-user")} autoComplete={siteText("off")} placeholder={siteText("analytics_reader")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n                ")}</label>{siteText("\n                ")}<label style={{"fontSize":"12px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Maximum replica lag (seconds)\n                  ")}<input id={siteText("integ-replica-lag")} type={siteText("number")} min={siteText("0")} max={siteText("86400")} defaultValue={siteText("60")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n                ")}</label>{siteText("\n              ")}</div>{siteText("\n              ")}<div style={{"display":"flex","gap":"18px","flexWrap":"wrap","marginTop":"10px"}} ref={node => { if(node) node.setAttribute("style", "display:flex;gap:18px;flex-wrap:wrap;margin-top:10px;"); }}>{siteText("\n                ")}<label style={{"display":"flex","alignItems":"center","gap":"8px","fontSize":"12px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:#32217c;cursor:pointer;"); }}><input id={siteText("integ-replica-ssl")} type={siteText("checkbox")} defaultChecked={true} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Require encrypted replica connection")}</label>{siteText("\n                ")}<label style={{"display":"flex","alignItems":"center","gap":"8px","fontSize":"12px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:#32217c;cursor:pointer;"); }}><input id={siteText("integ-replica-trust")} type={siteText("checkbox")} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Trust replica certificate")}</label>{siteText("\n              ")}</div>{siteText("\n              ")}<div style={{"fontSize":"11px","color":"#8497a7","marginTop":"8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:11px;color:#8497a7;margin-top:8px;"); }}>{siteText("Replica credentials stay in the server environment. Set SOURCE_SQL_REPLICA_PASSWORD for the read-only replica account. The portal never exposes that secret to the browser.")}</div>{siteText("\n            ")}</div>{siteText("\n            ")}<div style={{"gridColumn":"span 2","fontSize":"12px","color":"#8497a7","lineHeight":"1.5"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 2;font-size:12px;color:#8497a7;line-height:1.5;"); }}>{siteText("SQL mode expects 10 read-only canonical views named ")}<b>{siteText("v_employers")}</b>{siteText(", ")}<b>{siteText("v_workforce_snapshots")}</b>{siteText(", … ")}<b>{siteText("v_salary_advances")}</b>{siteText(" (or the configured prefix). The connection test checks every view and its contracted columns.")}</div>{siteText("\n          ")}</div>{siteText("\n\n          ")}<div style={{"marginTop":"16px","padding":"14px","border":"1px solid var(--line)","borderRadius":"12px","background":"#fbfaff","maxWidth":"820px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;padding:14px;border:1px solid var(--line);border-radius:12px;background:#fbfaff;max-width:820px;"); }}>{siteText("\n            ")}<div style={{"fontSize":"13px","fontWeight":"800","color":"var(--brand-primary)"}} ref={node => { if(node) node.setAttribute("style", "font-size:13px;font-weight:800;color:var(--brand-primary);"); }}>{siteText("Analytics query placement")}</div>{siteText("\n            ")}<div style={{"fontSize":"11.5px","color":"#617486","lineHeight":"1.5","marginTop":"4px"}} ref={node => { if(node) node.setAttribute("style", "font-size:11.5px;color:#617486;line-height:1.5;margin-top:4px;"); }}>{siteText("Do not run heavy dashboard workloads on a production MySQL primary. Use source-side reporting views or a read replica for approved aggregations, then keep the portal's governed read model in PostgreSQL.")}</div>{siteText("\n            ")}<div className={siteText("integration-two-col")} style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px","marginTop":"10px"}} ref={node => { if(node) node.setAttribute("style", "display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;"); }}>{siteText("\n              ")}<label style={{"fontSize":"12px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Default analytics mode\n                ")}<select id={siteText("integ-analytics-mode")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px","background":"#fff"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;background:#fff;"); }}>{siteText("\n                  ")}<option value={siteText("POSTGRES_READ_MODEL")}>{siteText("PostgreSQL read model")}</option>{siteText("\n                  ")}<option value={siteText("SOURCE_AGGREGATES")}>{siteText("Source-side aggregates")}</option>{siteText("\n                  ")}<option value={siteText("HYBRID")}>{siteText("Hybrid, per feed")}</option>{siteText("\n                ")}</select>{siteText("\n              ")}</label>{siteText("\n              ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"12px","fontWeight":"700","color":"#32217c","cursor":"pointer","paddingTop":"20px"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:12px;font-weight:700;color:#32217c;cursor:pointer;padding-top:20px;"); }}>{siteText("\n                ")}<input id={siteText("integ-source-analytics")} type={siteText("checkbox")} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Allow approved source analytics\n              ")}</label>{siteText("\n            ")}</div>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"12px","fontWeight":"700","color":"#32217c","cursor":"pointer","marginTop":"10px"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:12px;font-weight:700;color:#32217c;cursor:pointer;margin-top:10px;"); }}>{siteText("\n              ")}<input id={siteText("integ-source-replica")} type={siteText("checkbox")} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Source analytics must use a read replica\n            ")}</label>{siteText("\n            ")}<div id={siteText("integ-analytics-note")} style={{"fontSize":"11px","color":"#8497a7","marginTop":"8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:11px;color:#8497a7;margin-top:8px;"); }}>{siteText("Read-only is enforced by the server. Arbitrary SQL is never accepted from the browser.")}</div>{siteText("\n          ")}</div>{siteText("\n\n          ")}<label style={{"marginTop":"16px","display":"flex","alignItems":"center","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;display:flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#32217c;cursor:pointer;"); }}>{siteText("\n            ")}<input id={siteText("integ-enabled")} type={siteText("checkbox")} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Enable automatic scheduled sync\n          ")}</label>{siteText("\n\n          ")}<div style={{"marginTop":"16px","display":"flex","gap":"8px","flexWrap":"wrap"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;"); }}>{siteText("\n            ")}<button className={siteText("btn")} onClick={event => actions[12]?.(event)}>{siteText("Save settings")}</button>{siteText("\n            ")}<button className={siteText("btn btn-ghost")} onClick={event => actions[13]?.(event)}>{siteText("Test source")}</button>{siteText("\n            ")}<button className={siteText("btn")} style={{"background":"#2B1D73","color":"#fff","borderColor":"#2B1D73"}} ref={node => { if(node) node.setAttribute("style", "background:#2B1D73;color:#fff;border-color:#2B1D73;"); }} onClick={event => actions[14]?.(event)}>{siteText("Sync now")}</button>{siteText("\n            ")}<button id={siteText("btn-refresh-now")} className={siteText("btn btn-ghost")} onClick={event => actions[15]?.(event)} title={siteText("Run the full governed purge, authoritative reload, snapshot rebuild and publish cycle now")}>{siteText("Refresh now")}</button>{siteText("\n          ")}</div>{siteText("\n          ")}<div className={siteText("muted")} style={{"marginTop":"8px","maxWidth":"820px","lineHeight":"1.5"}} ref={node => { if(node) node.setAttribute("style", "margin-top:8px;max-width:820px;line-height:1.5;"); }}><b>{siteText("Sync now")}</b>{siteText(" applies incremental source changes. ")}<b>{siteText("Refresh now")}</b>{siteText(" runs the full purge-and-reload cycle; dashboard users keep seeing the last successful published data until the new refresh completes successfully.")}</div>{siteText("\n          ")}<div id={siteText("integ-result")} style={{"marginTop":"12px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:12px;"); }}/>{siteText("\n          ")}<div style={{"marginTop":"18px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:18px;"); }}>{siteText("\n            ")}<div style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a","marginBottom":"8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;margin-bottom:8px;"); }}>{siteText("Recent syncs")}</div>{siteText("\n            ")}<table className={siteText("hist")}><tbody id={siteText("integ-logs")}><tr><td className={siteText("muted")} style={{"padding":"10px"}} ref={node => { if(node) node.setAttribute("style", "padding:10px;"); }}>{siteText("No syncs yet.")}</td></tr></tbody></table>{siteText("\n          ")}</div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")} id={siteText("email-settings-card")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("System Email & Scheduled Reports")}</h2><div className={siteText("note")}>{siteText("SMTP or Resend delivery used by scheduled employer reports")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div id={siteText("mail-status")} className={siteText("banner ok")} style={{"display":"none","marginBottom":"14px"}} ref={node => { if(node) node.setAttribute("style", "display:none;margin-bottom:14px;"); }}/>{siteText("\n          ")}<div className={siteText("integration-two-col")} style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px","maxWidth":"820px"}} ref={node => { if(node) node.setAttribute("style", "display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:820px;"); }}>{siteText("\n            ")}<div className={siteText("integration-panel-title")}>{siteText("Delivery provider")}</div>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Provider\n              ")}<select id={siteText("mail-provider")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px","background":"#fff"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;background:#fff;"); }}>{siteText("\n                ")}<option value={siteText("smtp")}>{siteText("SMTP")}</option><option value={siteText("resend")}>{siteText("Resend API")}</option>{siteText("\n              ")}</select>{siteText("\n            ")}</label>{siteText("\n            ")}<div className={siteText("muted")} style={{"alignSelf":"end","paddingBottom":"9px"}} ref={node => { if(node) node.setAttribute("style", "align-self:end;padding-bottom:9px;"); }}>{siteText("Choose the delivery service used for invites, resets, alerts and scheduled reports.")}</div>{siteText("\n            ")}<div className={siteText("integration-panel-title")}>{siteText("SMTP connection ")}<span className={siteText("muted")} style={{"fontWeight":"500"}} ref={node => { if(node) node.setAttribute("style", "font-weight:500;"); }}>{siteText("(leave blank when using Resend)")}</span></div>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("SMTP host\n              ")}<input id={siteText("mail-host")} placeholder={siteText("smtp.office365.com")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Port\n              ")}<input id={siteText("mail-port")} type={siteText("number")} min={siteText("1")} max={siteText("65535")} defaultValue={siteText("587")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("SMTP username\n              ")}<input id={siteText("mail-user")} autoComplete={siteText("off")} placeholder={siteText("reports@company.com")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("SMTP password\n              ")}<input id={siteText("mail-password")} type={siteText("password")} autoComplete={siteText("new-password")} placeholder={siteText("leave blank to keep existing")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("From name\n              ")}<input id={siteText("mail-from-name")} defaultValue={siteText("empower-fin Dashboard Portal")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("From email\n              ")}<input id={siteText("mail-from-email")} type={siteText("email")} placeholder={siteText("reports@company.com")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Reply-to (optional)\n              ")}<input id={siteText("mail-reply-to")} type={siteText("email")} placeholder={siteText("support@company.com")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Default report timezone\n              ")}<input id={siteText("mail-timezone")} defaultValue={siteText("Africa/Johannesburg")} placeholder={siteText("Africa/Johannesburg")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"gridColumn":"span 2","fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 2;font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Portal public URL (optional)\n              ")}<input id={siteText("mail-portal-url")} placeholder={siteText("https://dashboard.example.com")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<div className={siteText("integration-panel-title")}>{siteText("Resend API ")}<span className={siteText("muted")} style={{"fontWeight":"500"}} ref={node => { if(node) node.setAttribute("style", "font-weight:500;"); }}>{siteText("(optional managed delivery)")}</span></div>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Resend API key\n              ")}<input id={siteText("mail-resend-key")} type={siteText("password")} autoComplete={siteText("new-password")} placeholder={siteText("leave blank to keep existing")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Resend From email\n              ")}<input id={siteText("mail-resend-from")} type={siteText("email")} placeholder={siteText("reports@verified-domain.com")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#32217c;cursor:pointer;"); }}><input id={siteText("mail-secure")} type={siteText("checkbox")} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" TLS from connection start (normally port 465)")}</label>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#32217c;cursor:pointer;"); }}><input id={siteText("mail-require-tls")} type={siteText("checkbox")} defaultChecked={true} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Require TLS / STARTTLS")}</label>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#32217c;cursor:pointer;"); }}><input id={siteText("mail-reject-unauth")} type={siteText("checkbox")} defaultChecked={true} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Validate SMTP certificate")}</label>{siteText("\n          ")}</div>{siteText("\n          ")}<div style={{"marginTop":"16px","display":"flex","gap":"8px","flexWrap":"wrap","alignItems":"end","maxWidth":"820px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;align-items:end;max-width:820px;"); }}>{siteText("\n            ")}<button className={siteText("btn")} onClick={event => actions[16]?.(event)}>{siteText("Save email settings")}</button>{siteText("\n            ")}<label style={{"fontSize":"12px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Test recipient\n              ")}<input id={siteText("mail-test-recipient")} type={siteText("email")} placeholder={siteText("you@company.com")} style={{"display":"block","width":"240px","marginTop":"4px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:240px;margin-top:4px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<button className={siteText("btn btn-ghost")} onClick={event => actions[17]?.(event)}>{siteText("Send test email")}</button>{siteText("\n          ")}</div>{siteText("\n          ")}<div id={siteText("mail-result")} style={{"marginTop":"12px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:12px;"); }}/>{siteText("\n\n          ")}<div style={{"marginTop":"24px","fontSize":"12.5px","fontWeight":"800","color":"#32217c"}} ref={node => { if(node) node.setAttribute("style", "margin-top:24px;font-size:12.5px;font-weight:800;color:#32217c;"); }}>{siteText("Scheduled reports")}</div>{siteText("\n          ")}<div style={{"overflow":"auto","marginTop":"8px"}} ref={node => { if(node) node.setAttribute("style", "overflow:auto;margin-top:8px;"); }}><table className={siteText("hist")}><thead><tr><th>{siteText("Report")}</th><th>{siteText("User")}</th><th>{siteText("Frequency")}</th><th>{siteText("Next send")}</th><th>{siteText("Status")}</th></tr></thead><tbody id={siteText("mail-schedules")}><tr><td colSpan={siteText("5")} className={siteText("muted")} style={{"padding":"10px"}} ref={node => { if(node) node.setAttribute("style", "padding:10px;"); }}>{siteText("No schedules yet.")}</td></tr></tbody></table></div>{siteText("\n          ")}<div style={{"marginTop":"20px","fontSize":"12.5px","fontWeight":"800","color":"#32217c"}} ref={node => { if(node) node.setAttribute("style", "margin-top:20px;font-size:12.5px;font-weight:800;color:#32217c;"); }}>{siteText("Recent email deliveries")}</div>{siteText("\n          ")}<div style={{"overflow":"auto","marginTop":"8px"}} ref={node => { if(node) node.setAttribute("style", "overflow:auto;margin-top:8px;"); }}><table className={siteText("hist")}><thead><tr><th>{siteText("When")}</th><th>{siteText("Report")}</th><th>{siteText("Status")}</th><th>{siteText("Recipients")}</th></tr></thead><tbody id={siteText("mail-deliveries")}><tr><td colSpan={siteText("4")} className={siteText("muted")} style={{"padding":"10px"}} ref={node => { if(node) node.setAttribute("style", "padding:10px;"); }}>{siteText("No deliveries yet.")}</td></tr></tbody></table></div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Admin Audit Log")}</h2><div className={siteText("note")}>{siteText("Top 5 most critical admin changes · full history remains available in the CSV export")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div style={{"overflow":"auto"}} ref={node => { if(node) node.setAttribute("style", "overflow:auto;"); }}><table className={siteText("hist")}><thead><tr><th>{siteText("When")}</th><th>{siteText("Admin")}</th><th>{siteText("Action")}</th><th>{siteText("Details")}</th></tr></thead><tbody id={siteText("audit-rows")}><tr><td colSpan={siteText("4")} className={siteText("muted")} style={{"padding":"10px"}} ref={node => { if(node) node.setAttribute("style", "padding:10px;"); }}>{siteText("Loading…")}</td></tr></tbody></table></div>{siteText("\n          ")}<div className={siteText("row")} style={{"justifyContent":"space-between","marginTop":"14px"}} ref={node => { if(node) node.setAttribute("style", "justify-content:space-between;margin-top:14px;"); }}>{siteText("\n            ")}<span className={siteText("muted")}>{siteText("Audit events continue recording without display limits.")}</span>{siteText("\n            ")}<a className={siteText("btn btn-primary")} href={siteText("/api/admin/audit-log.csv")} download={siteText("")}>{siteText("Download all logs (CSV)")}</a>{siteText("\n          ")}</div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Automations")}</h2><div className={siteText("note")}>{siteText("Alerts, auto-cleanup and digests — uses the SMTP settings above")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div id={siteText("auto-status")} className={siteText("banner ok")} style={{"display":"none","marginBottom":"14px"}} ref={node => { if(node) node.setAttribute("style", "display:none;margin-bottom:14px;"); }}/>{siteText("\n          ")}<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"14px","maxWidth":"820px"}} ref={node => { if(node) node.setAttribute("style", "display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:820px;"); }} className={siteText("integration-two-col")}>{siteText("\n            ")}<label style={{"gridColumn":"span 2","fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 2;font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Admin alert emails (comma-separated)\n              ")}<input id={siteText("auto-alert-emails")} placeholder={siteText("admin1@company.com, admin2@company.com")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"gridColumn":"span 2","fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "grid-column:span 2;font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Slack webhook URL (optional)\n              ")}<input id={siteText("auto-slack-webhook")} placeholder={siteText("https://hooks.slack.com/services/…")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<label style={{"fontSize":"12.5px","fontWeight":"700","color":"#5b6b7a"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:#5b6b7a;"); }}>{siteText("Auto-deactivate after inactive for (days, blank = off)\n              ")}<input id={siteText("auto-stale-days")} type={siteText("number")} min={siteText("7")} max={siteText("3650")} placeholder={siteText("e.g. 180")} style={{"display":"block","width":"100%","marginTop":"5px","font":"inherit","fontWeight":"500","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "display:block;width:100%;margin-top:5px;font:inherit;font-weight:500;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}</label>{siteText("\n            ")}<div/>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#32217c;cursor:pointer;"); }}><input id={siteText("auto-digest-enabled")} type={siteText("checkbox")} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Weekly engagement digest to admin alert emails")}</label>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"center","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#32217c","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#32217c;cursor:pointer;"); }}><input id={siteText("auto-score-enabled")} type={siteText("checkbox")} defaultChecked={true} style={{"width":"17px","height":"17px"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;"); }}/>{siteText(" Email employer users when their score changes")}</label>{siteText("\n            ")}<label style={{"display":"flex","alignItems":"flex-start","gap":"9px","fontSize":"13px","fontWeight":"700","color":"#7a5512","cursor":"pointer","background":"#fff8e8","border":"1px solid #efd49b","borderRadius":"9px","padding":"10px 12px"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:flex-start;gap:9px;font-size:13px;font-weight:700;color:#7a5512;cursor:pointer;background:#fff8e8;border:1px solid #efd49b;border-radius:9px;padding:10px 12px;"); }}><input id={siteText("synthetic-data-mode")} type={siteText("checkbox")} style={{"width":"17px","height":"17px","marginTop":"1px","flex":"0 0 auto"}} ref={node => { if(node) node.setAttribute("style", "width:17px;height:17px;margin-top:1px;flex:0 0 auto;"); }}/>{siteText(" ")}<span><strong>{siteText("Mark all portal data as synthetic test data")}</strong><br/><span style={{"fontWeight":"500"}} ref={node => { if(node) node.setAttribute("style", "font-weight:500;"); }}>{siteText("When enabled, dashboards and portal views display a persistent warning that the figures are synthetic test data and must not be treated as factual information.")}</span></span></label>{siteText("\n          ")}</div>{siteText("\n          ")}<div style={{"marginTop":"16px","display":"flex","gap":"8px","flexWrap":"wrap"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;"); }}>{siteText("\n            ")}<button className={siteText("btn")} onClick={event => actions[18]?.(event)}>{siteText("Save automation settings")}</button>{siteText("\n            ")}<button className={siteText("btn btn-ghost")} onClick={event => actions[19]?.(event)}>{siteText("Run stale-account check now")}</button>{siteText("\n            ")}<button className={siteText("btn btn-ghost")} onClick={event => actions[20]?.(event)}>{siteText("Send digest now")}</button>{siteText("\n            ")}<button className={siteText("btn btn-ghost")} onClick={event => actions[21]?.(event)}>{siteText("Send test alert")}</button>{siteText("\n          ")}</div>{siteText("\n          ")}<div id={siteText("auto-result")} style={{"marginTop":"12px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:12px;"); }}/>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Client Reach & Engagement")}</h2><div className={siteText("note")}>{siteText("How many people are signing in and using the portal · last ")}<span id={siteText("eng-window")}>{siteText("30")}</span>{siteText(" days")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div style={{"display":"flex","gap":"8px","marginBottom":"16px"}} ref={node => { if(node) node.setAttribute("style", "display:flex;gap:8px;margin-bottom:16px;"); }}>{siteText("\n            ")}<select id={siteText("eng-days")} onChange={event => actions[22]?.(event)} style={{"font":"inherit","padding":"8px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "font:inherit;padding:8px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }} defaultValue={"30"}>{siteText("\n              ")}<option value={siteText("7")}>{siteText("Last 7 days")}</option>{siteText("\n              ")}<option value={siteText("30")}>{siteText("Last 30 days")}</option>{siteText("\n              ")}<option value={siteText("90")}>{siteText("Last 90 days")}</option>{siteText("\n            ")}</select>{siteText("\n          ")}</div>{siteText("\n          ")}<div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(150px,1fr))","gap":"12px","marginBottom":"20px"}} ref={node => { if(node) node.setAttribute("style", "display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:20px;"); }} id={siteText("eng-stats")}>{siteText("\n            ")}<div className={siteText("muted")}>{siteText("Loading…")}</div>{siteText("\n          ")}</div>{siteText("\n          ")}<div style={{"display":"grid","gridTemplateColumns":"1.1fr .9fr","gap":"20px","alignItems":"start"}} ref={node => { if(node) node.setAttribute("style", "display:grid;grid-template-columns:1.1fr .9fr;gap:20px;align-items:start;"); }} className={siteText("eng-grid")}>{siteText("\n            ")}<div>{siteText("\n              ")}<div style={{"fontSize":"12.5px","fontWeight":"800","color":"#32217c","marginBottom":"8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:800;color:#32217c;margin-bottom:8px;"); }}>{siteText("Logins per day")}</div>{siteText("\n              ")}<div id={siteText("eng-trend")} style={{"display":"flex","alignItems":"flex-end","gap":"2px","height":"90px","borderBottom":"1px solid #e8e1f7","paddingBottom":"2px"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:flex-end;gap:2px;height:90px;border-bottom:1px solid #e8e1f7;padding-bottom:2px;"); }}/>{siteText("\n            ")}</div>{siteText("\n            ")}<div>{siteText("\n              ")}<div style={{"fontSize":"12.5px","fontWeight":"800","color":"#32217c","marginBottom":"8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:800;color:#32217c;margin-bottom:8px;"); }}>{siteText("Most-viewed pages")}</div>{siteText("\n              ")}<div id={siteText("eng-pages")}/>{siteText("\n            ")}</div>{siteText("\n          ")}</div>{siteText("\n          ")}<div style={{"marginTop":"22px","fontSize":"12.5px","fontWeight":"800","color":"#32217c"}} ref={node => { if(node) node.setAttribute("style", "margin-top:22px;font-size:12.5px;font-weight:800;color:#32217c;"); }}>{siteText("Most engaged users")}</div>{siteText("\n          ")}<div style={{"overflow":"auto","marginTop":"8px"}} ref={node => { if(node) node.setAttribute("style", "overflow:auto;margin-top:8px;"); }}><table className={siteText("hist")}><thead><tr><th>{siteText("User")}</th><th>{siteText("Logins")}</th><th>{siteText("Pageviews")}</th><th>{siteText("Avg. scroll depth")}</th></tr></thead><tbody id={siteText("eng-users")}><tr><td colSpan={siteText("4")} className={siteText("muted")} style={{"padding":"10px"}} ref={node => { if(node) node.setAttribute("style", "padding:10px;"); }}>{siteText("Loading…")}</td></tr></tbody></table></div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<style>{siteText("@media(max-width:820px){.eng-grid{grid-template-columns:1fr!important;}}")}</style>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")} id={siteText("channel-partners-card")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Channel Partners")}</h2><button className={siteText("btn btn-sm")} type={siteText("button")} onClick={event => actions[23]?.(event)}>{siteText("Collapse")}</button><div className={siteText("note")}>{siteText("White-label branding · each partner's users see their colours, logo & name")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div style={{"display":"flex","gap":"8px","marginBottom":"10px","flexWrap":"wrap"}} ref={node => { if(node) node.setAttribute("style", "display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;"); }}>{siteText("\n            ")}<input id={siteText("pt-new-name")} placeholder={siteText("New partner name (e.g. Acme Financial)")} style={{"flex":"1","minWidth":"220px","font":"inherit","padding":"9px 12px","border":"1px solid #e8e1f7","borderRadius":"9px"}} ref={node => { if(node) node.setAttribute("style", "flex:1;min-width:220px;font:inherit;padding:9px 12px;border:1px solid #e8e1f7;border-radius:9px;"); }}/>{siteText("\n            ")}<label className={siteText("btn btn-ghost")} style={{"fontSize":"12.5px","padding":"9px 14px","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;padding:9px 14px;cursor:pointer;"); }} title={siteText("Optional — colours are auto-detected from it")}>{siteText("\n              ")}<span id={siteText("pt-new-logo-label")}>{siteText("+ Logo (optional)")}</span>{siteText("\n              ")}<input id={siteText("pt-new-logo")} type={siteText("file")} accept={siteText("image/png,image/jpeg")} style={{"display":"none"}} ref={node => { if(node) node.setAttribute("style", "display:none;"); }} onChange={event => actions[24]?.(event)}/>{siteText("\n            ")}</label>{siteText("\n            ")}<button className={siteText("btn")} onClick={event => actions[25]?.(event)}>{siteText("Add partner")}</button>{siteText("\n          ")}</div>{siteText("\n          ")}<div style={{"marginBottom":"16px"}} ref={node => { if(node) node.setAttribute("style", "margin-bottom:16px;"); }}>{siteText("\n            ")}<div className={siteText("note")} style={{"margin":"0 0 8px","fontSize":"12px","color":"#8497a7"}} ref={node => { if(node) node.setAttribute("style", "margin:0 0 8px;font-size:12px;color:#8497a7;"); }}>{siteText("Or start from a test client preset (dummy placeholder logo & approximate brand colours, for demo/testing only):")}</div>{siteText("\n            ")}<div id={siteText("pt-presets")} style={{"display":"flex","gap":"8px","flexWrap":"wrap"}} ref={node => { if(node) node.setAttribute("style", "display:flex;gap:8px;flex-wrap:wrap;"); }}/>{siteText("\n          ")}</div>{siteText("\n          ")}<div id={siteText("pt-list")}/>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Dashboard Sections")}</h2><div className={siteText("note")}>{siteText("Hide sections that aren't ready yet, and control which roles (or specific people) can see each one")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div id={siteText("sec-list")}/>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")} style={{"borderColor":"#f3c9c0"}} ref={node => { if(node) node.setAttribute("style", "border-color:#f3c9c0;"); }}>{siteText("\n        ")}<div className={siteText("card-hd")} style={{"borderBottomColor":"#fbe4df"}} ref={node => { if(node) node.setAttribute("style", "border-bottom-color:#fbe4df;"); }}><h2 style={{"color":"#b5391f"}} ref={node => { if(node) node.setAttribute("style", "color:#b5391f;"); }}>{siteText("Danger zone")}</h2><div className={siteText("note")}>{siteText("Authoritative reset and rebuild from the connected source")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<p className={siteText("muted")} style={{"marginBottom":"14px"}} ref={node => { if(node) node.setAttribute("style", "margin-bottom:14px;"); }}><b>{siteText("Reset always reloads.")}</b>{siteText(" The connected API/SQL database becomes the source of truth: prior cursors, import history, MLOps decisions and stale-write comparisons are ignored for this rebuild. The current published dashboard stays visible until all 10 feeds have been rebuilt successfully. User logins, access, branding and separately sourced chat history are kept.")}</p>{siteText("\n          ")}<button className={siteText("btn")} id={siteText("reset-btn")} style={{"borderColor":"#e0492f","color":"#b5391f"}} ref={node => { if(node) node.setAttribute("style", "border-color:#e0492f;color:#b5391f;"); }} onClick={event => actions[26]?.(event)}>{siteText("Reset & rebuild from source…")}</button>{siteText("\n          ")}<div id={siteText("reset-area")} style={{"display":"none","marginTop":"16px","padding":"16px","border":"1px solid #f3c9c0","borderRadius":"11px","background":"#fdf5f3"}} ref={node => { if(node) node.setAttribute("style", "display:none;margin-top:16px;padding:16px;border:1px solid #f3c9c0;border-radius:11px;background:#fdf5f3;"); }}>{siteText("\n            ")}<div style={{"fontWeight":"700","color":"#b5391f","fontSize":"13.5px","marginBottom":"8px"}} ref={node => { if(node) node.setAttribute("style", "font-weight:700;color:#b5391f;font-size:13.5px;margin-bottom:8px;"); }}>{siteText("Are you sure? This cannot be undone.")}</div>{siteText("\n            ")}<div className={siteText("muted")} style={{"marginBottom":"10px"}} ref={node => { if(node) node.setAttribute("style", "margin-bottom:10px;"); }}>{siteText("Type ")}<b>{siteText("RESET")}</b>{siteText(" below to confirm.")}</div>{siteText("\n            ")}<input id={siteText("reset-confirm")} placeholder={siteText("type RESET")} style={{"fontFamily":"inherit","fontSize":"13.5px","padding":"9px 12px","border":"1px solid #e0492f","borderRadius":"9px","width":"160px"}} ref={node => { if(node) node.setAttribute("style", "font-family:inherit;font-size:13.5px;padding:9px 12px;border:1px solid #e0492f;border-radius:9px;width:160px;"); }}/>{siteText("\n            ")}<button className={siteText("btn")} style={{"background":"#e0492f","color":"#fff","borderColor":"#e0492f","marginLeft":"8px"}} ref={node => { if(node) node.setAttribute("style", "background:#e0492f;color:#fff;border-color:#e0492f;margin-left:8px;"); }} onClick={event => actions[27]?.(event)}>{siteText("Reset & rebuild")}</button>{siteText("\n            ")}<button className={siteText("btn btn-ghost")} style={{"marginLeft":"4px"}} ref={node => { if(node) node.setAttribute("style", "margin-left:4px;"); }} onClick={event => actions[28]?.(event)}>{siteText("Cancel")}</button>{siteText("\n            ")}<div className={siteText("muted")} style={{"marginTop":"12px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:12px;"); }}>{siteText("This cannot leave the portal as an intentionally empty dataset: the reset and source rewrite are one authoritative operation.")}</div>{siteText("\n            ")}<div className={siteText("banner")} id={siteText("reset-msg")} style={{"display":"none","marginTop":"12px"}} ref={node => { if(node) node.setAttribute("style", "display:none;margin-top:12px;"); }}/>{siteText("\n          ")}</div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n")}</div>
{siteText("\n\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n\n\n")}

{siteText("\n\n")}</>;}
let started=false;
export function start(){if(started)return;started=true;
actions=[event => {
  openCompliancePanel();
},
event => {
  toggleMLOpsAlert();
},
event => {
  document.getElementById('file-ingestion').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
},
event => {
  document.getElementById('live-integration').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  setIntegMode('API');
},
event => {
  document.getElementById('live-integration').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  setIntegMode('SQL');
},
event => {
  closeClientPreview(event);
},
event => {
  event.stopPropagation();
},
event => {
  closeClientPreview();
},
event => {
  loadEnterpriseOperations();
},
event => {
  setIntegMode('API');
},
event => {
  setIntegMode('SQL');
},
event => {
  setSqlPortDefault();
},
event => {
  saveInteg();
},
event => {
  testInteg();
},
event => {
  syncNow();
},
event => {
  refreshNow(event.currentTarget);
},
event => {
  saveEmailSettings();
},
event => {
  testEmailSettings();
},
event => {
  saveAutomations();
},
event => {
  runAutomationNow('stale');
},
event => {
  runAutomationNow('digest');
},
event => {
  runAutomationNow('test');
},
event => {
  loadEngagement();
},
event => {
  toggleChannelPartners();
},
event => {
  onNewPartnerLogoPicked(event.currentTarget);
},
event => {
  createPartner();
},
event => {
  openReset();
},
event => {
  doReset();
},
event => {
  $('#reset-area').style.display = 'none';
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

/* ── Admin console. Talks to the import API. Set API base if served elsewhere. ── */
const API = ""; // same origin
let MANIFEST = null,
  CURRENT = null,
  LAST_BATCH = null;
const AdminBrandTheme = window.BrandEngine ? BrandEngine.themeController() : null;
const DEFAULT_PORTAL_BRAND = {
  accentColor: '0FC79B',
  primaryColor: '0FC79B',
  navyColor: '2B1D73'
};
function applyAdminBrandTheme() {
  if (!AdminBrandTheme) return;
  // Administration always uses the canonical empower-fin palette. Partner
  // branding belongs in client previews and client dashboards, never the control plane.
  AdminBrandTheme.set({
    brand: DEFAULT_PORTAL_BRAND,
    light: null
  });
}
const $ = s => document.querySelector(s);
const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[ch]);
const fmtDate = d => d ? new Date(d).toLocaleString('en-ZA', {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit'
}) : '—';

// brief "Hi <name>" splash right after sign-in — once per browser tab session
function handleWelcomeSplash(me) {
  const el = document.getElementById('welcome-splash');
  if (!el) return;
  let already = false;
  try {
    already = sessionStorage.getItem('ef_splash_shown') === '1';
  } catch (_) {}
  if (already) {
    el.classList.add('hide');
    return;
  }
  const greet = document.getElementById('welcome-splash-greeting');
  const first = (me.name || '').trim().split(/\s+/)[0] || 'there';
  const hour = new Date().getHours();
  const daypart = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  if (greet) greet.textContent = daypart + ', ' + first + ' \uD83D\uDC4B';
  const sub = document.getElementById('welcome-splash-sub');
  if (sub) sub.textContent = 'The Fixer hopes you have a good day.';
  const logo = document.getElementById('welcome-splash-logo');
  const privileged = ['ADMIN', 'SUPERADMIN'].includes(String(me?.role || '').toUpperCase());
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
  setTimeout(() => el.classList.add('hide'), 1400);
}
function addNav(me) {
  if (window.EmpowerPortalNav) {
    window.EmpowerPortalNav.render({
      me,
      navSelector: '#portal-nav',
      accountSelector: '#portal-account',
      active: 'admin'
    });
  }
}
// ── live data integration (API or direct SQL) ──
function setIntegMode(mode) {
  mode = String(mode || 'API').toUpperCase() === 'SQL' ? 'SQL' : 'API';
  $('#integ-mode').value = mode;
  $('#integ-api-panel').style.display = mode === 'API' ? 'grid' : 'none';
  $('#integ-sql-panel').style.display = mode === 'SQL' ? 'grid' : 'none';
  const api = $('#source-tab-api'),
    sql = $('#source-tab-sql');
  if (api) {
    api.classList.toggle('on', mode === 'API');
    api.setAttribute('aria-selected', String(mode === 'API'));
  }
  if (sql) {
    sql.classList.toggle('on', mode === 'SQL');
    sql.setAttribute('aria-selected', String(mode === 'SQL'));
  }
}
function toggleIntegMode() {
  setIntegMode($('#integ-mode')?.value || 'API');
}
function setSqlPortDefault(force = false) {
  const dialect = $('#integ-sql-dialect').value;
  const field = $('#integ-sql-port');
  if (!force && field.value) return;
  field.value = dialect === 'MSSQL' ? '1433' : dialect === 'MYSQL' ? '3306' : '5432';
}
async function loadInteg() {
  try {
    const c = await fetch(`${API}/api/admin/integration`).then(r => r.json());
    setIntegMode((c.effectiveSourceMode || c.sourceMode || 'API').toUpperCase());
    $('#integ-url').value = c.baseUrl || '';
    $('#integ-hours').value = c.scheduleHours || 1;
    $('#integ-enabled').checked = !!c.enabled;
    if (c.hasToken) $('#integ-token').placeholder = c.apiTokenFromEnvironment ? '•••••• (provided by SOURCE_API_TOKEN)' : '•••••• (saved — leave blank to keep)';
    $('#integ-sql-dialect').value = (c.sqlDialect || 'POSTGRESQL').toUpperCase();
    $('#integ-sql-host').value = c.sqlHost || '';
    $('#integ-sql-port').value = c.sqlPort || '';
    if (!$('#integ-sql-port').value) setSqlPortDefault(true);
    $('#integ-sql-database').value = c.sqlDatabase || '';
    $('#integ-sql-schema').value = c.sqlSchema || '';
    $('#integ-sql-user').value = c.sqlUsername || '';
    $('#integ-sql-prefix').value = c.sqlViewPrefix || 'v_';
    $('#integ-sql-timeout').value = c.sqlQueryTimeoutMs || 60000;
    $('#integ-sql-maxrows').value = c.sqlMaxRowsPerReport || 250000;
    $('#integ-sql-ssl').checked = c.sqlSsl !== false;
    $('#integ-sql-trust').checked = !!c.sqlTrustServerCertificate;
    $('#integ-analytics-mode').value = c.analyticsMode || 'POSTGRES_READ_MODEL';
    $('#integ-source-analytics').checked = !!c.sourceAnalyticsEnabled;
    $('#integ-source-replica').checked = !!c.sourceAnalyticsUseReplica;
    $('#integ-replica-host').value = c.sourceAnalyticsReplicaHost || '';
    $('#integ-replica-port').value = c.sourceAnalyticsReplicaPort || (c.sqlDialect === 'MYSQL' ? 3306 : c.sqlPort || '');
    $('#integ-replica-database').value = c.sourceAnalyticsReplicaDatabase || '';
    $('#integ-replica-user').value = c.sourceAnalyticsReplicaUsername || '';
    $('#integ-replica-lag').value = c.sourceAnalyticsReplicaMaxLagSeconds ?? 60;
    $('#integ-replica-ssl').checked = c.sourceAnalyticsReplicaSsl !== false;
    $('#integ-replica-trust').checked = !!c.sourceAnalyticsReplicaTrustServerCertificate;
    if (c.hasSqlPassword) $('#integ-sql-password').placeholder = c.sqlPasswordFromEnvironment ? '•••••• (provided by SOURCE_SQL_PASSWORD)' : '•••••• (saved — leave blank to keep)';
    const envBox = $('#integ-env-override');
    if (envBox) {
      if (Array.isArray(c.envOverrides) && c.envOverrides.length) {
        envBox.style.display = 'block';
        renderMarkup(envBox, '⚠ These fields are locked by environment variables on the app service and will always win over whatever is set below, no matter what you save here: ' + c.envOverrides.map(o => `<b>${esc(o.label)}</b> = "${esc(o.value)}" (${esc(o.envName)})`).join(', ') + '.');
      } else {
        envBox.style.display = 'none';
        renderMarkup(envBox, '');
      }
    }
    const s = $('#integ-status');
    const changeMode = $('#integ-change-mode');
    if (changeMode) {
      changeMode.textContent = c.changeDetectionSupported ? `Live SQL change detection is active every ${Number(c.sourceChangePollSeconds || 30).toLocaleString('en-ZA')}s using indexed source_updated_at watermarks. Bulk writes process up to ${Number(c.syncBulkChunkSize || 20000).toLocaleString('en-ZA')} rows per database call. The hourly setting above remains a safety reconciliation.` : 'This source does not expose a portable SQL watermark, so the heartbeat schedule above controls automatic reconciliation.';
    }
    const configuredText = c.configured ? 'configured' : 'incomplete';
    if (c.lastSyncAt) {
      const when = new Date(c.lastSyncAt).toLocaleString('en-ZA');
      const lastGood = c.lastSuccessfulSyncAt ? new Date(c.lastSuccessfulSyncAt).toLocaleString('en-ZA') : 'none yet';
      const failureStates = ['FAILED', 'PARTIAL', 'FULL_REFRESH_FAILED', 'FULL_REFRESH_PRECHECK_FAILED'];
      const rebuilding = c.lastSyncStatus === 'REBUILDING';
      s.style.display = 'block';
      s.className = 'banner ' + (c.lastSyncStatus === 'OK' ? 'ok' : failureStates.includes(c.lastSyncStatus) ? 'err' : '');
      const reason = c.lastSyncNote || 'No refresh reason was recorded.';
      const watcher = c.changeDetectionEnabled ? ` · Change watch: every ${c.sourceChangePollSeconds || 30}s` : '';
      s.textContent = `${c.effectiveSourceMode || c.sourceMode || 'API'} source · ${configuredText}${watcher} · Last attempt: ${c.lastSyncStatus || 'UNKNOWN'} · ${when} · Last successful: ${lastGood} · ${rebuilding ? 'Refresh status' : 'Refresh reason'}: ${reason}`;
    } else {
      s.style.display = 'block';
      s.className = 'banner ' + (c.configured ? 'ok' : '');
      const watcher = c.changeDetectionEnabled ? ` Change watch runs every ${c.sourceChangePollSeconds || 30}s.` : '';
      s.textContent = `${c.effectiveSourceMode || c.sourceMode || 'API'} source · ${configuredText}. No sync has run yet.${watcher}`;
    }
    loadIntegLogs();
  } catch (e) {}
}
function integrationDraft() {
  const mode = ($('#integ-mode').value || 'API').toUpperCase();
  const body = {
    sourceMode: mode,
    baseUrl: $('#integ-url').value.trim(),
    scheduleHours: parseInt($('#integ-hours').value) || 1,
    enabled: $('#integ-enabled').checked,
    sqlDialect: $('#integ-sql-dialect').value,
    sqlHost: $('#integ-sql-host').value.trim(),
    sqlPort: parseInt($('#integ-sql-port').value) || null,
    sqlDatabase: $('#integ-sql-database').value.trim(),
    sqlSchema: $('#integ-sql-schema').value.trim(),
    sqlUsername: $('#integ-sql-user').value.trim(),
    sqlViewPrefix: $('#integ-sql-prefix').value.trim() || 'v_',
    sqlQueryTimeoutMs: parseInt($('#integ-sql-timeout').value) || 60000,
    sqlMaxRowsPerReport: parseInt($('#integ-sql-maxrows').value) || 250000,
    sqlSsl: $('#integ-sql-ssl').checked,
    sqlTrustServerCertificate: $('#integ-sql-trust').checked,
    analyticsMode: $('#integ-analytics-mode').value,
    sourceAnalyticsEnabled: $('#integ-source-analytics').checked,
    sourceAnalyticsReadOnly: true,
    sourceAnalyticsUseReplica: $('#integ-source-replica').checked,
    sourceAnalyticsReplicaEnabled: $('#integ-source-replica').checked,
    sourceAnalyticsReplicaHost: $('#integ-replica-host').value.trim(),
    sourceAnalyticsReplicaPort: parseInt($('#integ-replica-port').value) || null,
    sourceAnalyticsReplicaDatabase: $('#integ-replica-database').value.trim(),
    sourceAnalyticsReplicaUsername: $('#integ-replica-user').value.trim(),
    sourceAnalyticsReplicaMaxLagSeconds: parseInt($('#integ-replica-lag').value) || 60,
    sourceAnalyticsReplicaSsl: $('#integ-replica-ssl').checked,
    sourceAnalyticsReplicaTrustServerCertificate: $('#integ-replica-trust').checked
  };
  const tok = $('#integ-token').value.trim();
  if (tok) body.authToken = tok;
  const sqlPassword = $('#integ-sql-password').value.trim();
  if (sqlPassword) body.sqlPassword = sqlPassword;
  return body;
}
async function saveInteg() {
  const body = integrationDraft();
  const mode = body.sourceMode;
  renderMarkup($('#integ-result'), '<div class="banner ok">Saving…</div>');
  try {
    const r = await fetch(`${API}/api/admin/integration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'save failed');
    $('#integ-token').value = '';
    $('#integ-sql-password').value = '';
    renderMarkup($('#integ-result'), `<div class="banner ok">✓ ${mode === 'SQL' ? 'Database' : 'API'} integration settings saved.</div>`);
    loadInteg();
  } catch (e) {
    renderMarkup($('#integ-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
  }
}
async function testInteg() {
  const body = integrationDraft();
  const label = body.sourceMode === 'SQL' ? 'database' : 'API';
  renderMarkup($('#integ-result'), `<div class="banner ok">Testing ${label} connection and contract…</div>`);
  try {
    const r = await fetch(`${API}/api/admin/integration/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const d = await r.json();
    renderMarkup($('#integ-result'), d.ok ? `<div class="banner ok">✓ ${esc(d.note)}</div>` : `<div class="banner err">✕ ${esc(d.error)}</div>`);
  } catch (e) {
    renderMarkup($('#integ-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
  }
}
async function syncNow() {
  const mode = ($('#integ-mode').value || 'API').toUpperCase();
  renderMarkup($('#integ-result'), `<div class="banner ok">Saving settings…</div>`);
  try {
    const saveBody = integrationDraft();
    const saveResp = await fetch(`${API}/api/admin/integration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveBody)
    });
    const saved = await saveResp.json();
    if (!saveResp.ok) throw new Error(saved.error || 'Could not save settings before syncing');
    $('#integ-token').value = '';
    $('#integ-sql-password').value = '';
  } catch (e) {
    renderMarkup($('#integ-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
    return;
  }
  try {
    const r = await fetch(`${API}/api/admin/integration/sync`, {
      method: 'POST'
    });
    const d = await r.json();
    if (!r.ok || d.error) {
      renderMarkup($('#integ-result'), `<div class="banner err">✕ ${esc(d.error || 'sync failed to start')}</div>`);
      return;
    }
    const result = await pollJob(`${API}/api/admin/sync-jobs/${d.jobId}`, `Syncing all reports from ${mode}`, () => {
      loadHistory();
    }, '#integ-result');
    const rows = Object.entries(result.summary || {}).map(([k, v]) => {
      const txt = v.error ? `<span style="color:#b5391f">${esc(v.error)}</span>` : v.errorCount ? `<span style="color:#b5391f">${esc(v.errorCount)} validation error(s)</span>` : (() => {
        const h = Number(v.historyRows || 0),
          s = Number(v.staleSkipped || 0);
        return `${Number(v.committed || 0).toLocaleString('en-ZA')} processed · +${Number(v.inserted || 0).toLocaleString('en-ZA')} new · ~${Number(v.updated || 0).toLocaleString('en-ZA')} updated · -${Number(v.deleted || 0).toLocaleString('en-ZA')} deleted${h > 0 ? ` · ${h.toLocaleString('en-ZA')} dated history observation(s)` : s > 0 ? ` · ${s.toLocaleString('en-ZA')} stale skipped` : ''}${v.authoritativeOverwrite ? ' · authoritative overwrite' : ''}`;
      })();
      return `<tr><td style="font-weight:700">${esc(k)}</td><td>${txt}</td></tr>`;
    }).join('');
    const cls = result.status === 'OK' ? 'ok' : result.status === 'FAILED' ? 'err' : 'ok';
    renderMarkup($('#integ-result'), `<div class="banner ${cls}">${esc(result.status)}: ${esc(result.note)}</div><table class="hist" style="margin-top:8px"><tbody>${rows}</tbody></table>`);
    await Promise.allSettled([loadHistory(), loadInteg(), loadIntegLogs()]);
  } catch (e) {
    renderMarkup($('#integ-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
  }
}
async function refreshNow(btn) {
  if (!confirm('Run an authoritative full refresh now?\n\nThe connected source will be treated as truth. Previous cursors, MLOps decisions and stale-write comparisons will not gate this rebuild. All 10 feeds are read from the beginning, the source-derived model is rewritten, and a new dashboard is published only after the full rebuild succeeds.\n\nDashboard users continue seeing the last successful published dashboard while this runs.')) return;
  const original = btn?.textContent || 'Refresh now';
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Refreshing…';
  }
  renderMarkup($('#integ-result'), '<div class="banner ok">Saving settings and preflighting the source…</div>');
  try {
    const saveBody = integrationDraft();
    const saveResp = await fetch(`${API}/api/admin/integration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveBody)
    });
    const saved = await saveResp.json().catch(() => ({}));
    if (!saveResp.ok) throw new Error(saved.error || 'Could not save settings before refresh');
    $('#integ-token').value = '';
    $('#integ-sql-password').value = '';
    renderMarkup($('#integ-result'), '<div class="banner ok">Full refresh started. The last successful dashboard remains published while source data is rebuilt…</div>');
    const r = await fetch(`${API}/api/admin/integration/refresh`, {
      method: 'POST'
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.ok) throw new Error(d.error || d.note || 'Full refresh failed');
    if (d.status === 'ALREADY_RUNNING') {
      renderMarkup($('#integ-result'), '<div class="banner ok">A full refresh is already running on another application instance. The last successful dashboard remains visible until it publishes.</div>');
      return;
    }
    const detail = [d.purgedRows != null ? `${Number(d.purgedRows).toLocaleString('en-ZA')} source rows purged` : null, d.overwrittenRows != null ? `${Number(d.overwrittenRows).toLocaleString('en-ZA')} rows committed` : null, d.publishedDashboards != null ? `${Number(d.publishedDashboards).toLocaleString('en-ZA')} dashboard snapshot${Number(d.publishedDashboards) === 1 ? '' : 's'} published` : null].filter(Boolean).join(' · ');
    renderMarkup($('#integ-result'), `<div class="banner ok">✓ Full refresh completed and published.${detail ? ' ' + esc(detail) + '.' : ''}</div>`);
  } catch (e) {
    renderMarkup($('#integ-result'), `<div class="banner err">✕ Refresh did not publish a new dashboard. The last successful dashboard remains visible. Reason: ${esc(e.message)}</div>`);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = original;
    }
    loadInteg();
    loadIntegLogs();
  }
}
function syncLogFailureDetail(log) {
  const summary = log?.summary || {};
  const order = Array.isArray(MANIFEST?.loadOrder) ? MANIFEST.loadOrder : [];
  for (let i = 0; i < order.length; i++) {
    const key = order[i],
      item = summary?.[key];
    if (item?.error) {
      const rep = MANIFEST?.reports?.find(r => r.key === key);
      return `STEP ${i + 1} ${rep?.title || key}: ${item.error}`;
    }
  }
  if (summary?.source?.error) return `Source connection: ${summary.source.error}`;
  return '';
}
function syncLogBlockedDetail(log) {
  const summary = log?.summary || {};
  const order = Array.isArray(MANIFEST?.loadOrder) ? MANIFEST.loadOrder : [];
  return order.map((key, i) => {
    const item = summary?.[key];
    if (item?.status !== 'BLOCKED') return null;
    const rep = MANIFEST?.reports?.find(r => r.key === key);
    return `STEP ${i + 1} ${rep?.title || key}`;
  }).filter(Boolean).join(', ');
}
async function loadIntegLogs() {
  try {
    const logs = await fetch(`${API}/api/admin/integration/logs`).then(r => r.json());
    const tb = $('#integ-logs');
    if (!logs.length) {
      renderMarkup(tb, '<tr><td class="muted" style="padding:10px;">No syncs yet.</td></tr>');
      return;
    }
    renderMarkup(tb, logs.map(l => {
      const when = new Date(l.startedAt).toLocaleString('en-ZA');
      const badge = l.status === 'OK' ? '#1fa463' : l.status === 'FAILED' ? '#e0492f' : '#e8910c';
      const failure = syncLogFailureDetail(l);
      const blocked = syncLogBlockedDetail(l);
      const detail = [l.note || '', failure ? 'Failure: ' + failure : '', blocked ? 'Blocked downstream: ' + blocked : ''].filter(Boolean).join(' · ');
      return `<tr><td>${when}</td><td>${esc(l.trigger)}</td><td><span style="color:${badge};font-weight:700">${esc(l.status)}</span></td><td class="muted">${esc(detail)}</td></tr>`;
    }).join(''));
    const latest = logs[0];
    const latestFailure = syncLogFailureDetail(latest);
    if (latestFailure && ['PARTIAL', 'FAILED'].includes(String(latest?.status || ''))) {
      const s = $('#integ-status');
      if (s && !s.textContent.includes(latestFailure)) s.textContent += ` · Failed feed: ${latestFailure}`;
    }
  } catch (e) {}
}

// ── system email / SMTP and scheduled reports ──
function emailDraft() {
  const body = {
    emailProvider: $('#mail-provider').value,
    smtpHost: $('#mail-host').value.trim(),
    smtpPort: parseInt($('#mail-port').value) || 587,
    smtpSecure: $('#mail-secure').checked,
    smtpRequireTls: $('#mail-require-tls').checked,
    smtpRejectUnauthorized: $('#mail-reject-unauth').checked,
    smtpUsername: $('#mail-user').value.trim(),
    fromName: $('#mail-from-name').value.trim(),
    fromEmail: $('#mail-from-email').value.trim(),
    replyTo: $('#mail-reply-to').value.trim(),
    defaultTimezone: $('#mail-timezone').value.trim() || 'Africa/Johannesburg',
    portalBaseUrl: $('#mail-portal-url').value.trim(),
    resendFromEmail: $('#mail-resend-from').value.trim()
  };
  const password = $('#mail-password').value.trim();
  if (password) body.smtpPassword = password;
  const resendKey = $('#mail-resend-key').value.trim();
  if (resendKey) body.resendApiKey = resendKey;
  return body;
}
async function loadEmailSettings() {
  try {
    const r = await fetch(`${API}/api/admin/email-settings`);
    const c = await r.json();
    if (!r.ok) throw new Error(c.error || 'Could not load email settings');
    $('#mail-provider').value = c.emailProvider || 'smtp';
    $('#mail-host').value = c.smtpHost || '';
    $('#mail-port').value = c.smtpPort || 587;
    $('#mail-user').value = c.smtpUsername || '';
    $('#mail-from-name').value = c.fromName || 'empower-fin Dashboard Portal';
    $('#mail-from-email').value = c.fromEmail || '';
    $('#mail-reply-to').value = c.replyTo || '';
    $('#mail-timezone').value = c.defaultTimezone || 'Africa/Johannesburg';
    $('#mail-portal-url').value = c.portalBaseUrl || '';
    $('#mail-resend-from').value = c.resendFromEmail || '';
    $('#mail-secure').checked = !!c.smtpSecure;
    $('#mail-require-tls').checked = c.smtpRequireTls !== false;
    $('#mail-reject-unauth').checked = c.smtpRejectUnauthorized !== false;
    if (c.hasPassword) $('#mail-password').placeholder = c.passwordFromEnvironment ? '•••••• (provided by SMTP_PASSWORD)' : '•••••• (saved — leave blank to keep)';
    const st = $('#mail-status');
    st.style.display = 'block';
    st.className = 'banner ' + (c.configured ? 'ok' : '');
    const provider = c.emailProvider === 'resend' ? 'Resend API' : 'SMTP';
    st.textContent = c.configured ? `${provider} is configured for scheduled report delivery.` : `${provider} setup is incomplete. Scheduled reports cannot send until the required fields are configured.`;
    if (c.lastTestAt) st.textContent += ` Last test: ${c.lastTestStatus || '—'} · ${fmtDate(c.lastTestAt)}${c.lastTestNote ? ' — ' + c.lastTestNote : ''}`;
    $('#auto-alert-emails').value = c.alertEmails || '';
    $('#auto-slack-webhook').value = c.alertSlackWebhookUrl || '';
    $('#auto-stale-days').value = c.staleDeactivateDays || '';
    $('#auto-digest-enabled').checked = !!c.digestEnabled;
    $('#auto-score-enabled').checked = c.scoreChangeAlertsEnabled !== false;
    $('#synthetic-data-mode').checked = !!c.syntheticDataMode;
    const as = $('#auto-status');
    as.style.display = 'block';
    as.className = 'banner ok';
    let asText = `Automations use the ${provider} settings above to send.`;
    if (c.lastStaleCheckAt) asText += ` Last stale-account check: ${fmtDate(c.lastStaleCheckAt)}.`;
    if (c.lastDigestSentAt) asText += ` Last digest sent: ${fmtDate(c.lastDigestSentAt)}.`;
    as.textContent = asText;
    loadScheduledReportsAdmin();
    loadEmailDeliveries();
  } catch (e) {
    renderMarkup($('#mail-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
  }
}
async function saveEmailSettings() {
  renderMarkup($('#mail-result'), '<div class="banner ok">Saving email settings…</div>');
  try {
    const r = await fetch(`${API}/api/admin/email-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailDraft())
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Save failed');
    $('#mail-password').value = '';
    renderMarkup($('#mail-result'), '<div class="banner ok">✓ Email settings saved.</div>');
    loadEmailSettings();
  } catch (e) {
    renderMarkup($('#mail-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
  }
}
async function testEmailSettings() {
  const recipient = $('#mail-test-recipient').value.trim();
  renderMarkup($('#mail-result'), '<div class="banner ok">Testing email delivery and sending a test email…</div>');
  try {
    const body = {
      ...emailDraft(),
      recipient
    };
    const r = await fetch(`${API}/api/admin/email-settings/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Email test failed');
    renderMarkup($('#mail-result'), `<div class="banner ok">✓ Test email sent to ${esc(d.recipient)}.</div>`);
    loadEmailSettings();
  } catch (e) {
    renderMarkup($('#mail-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
  }
}

// ── automations ──
async function saveAutomations() {
  renderMarkup($('#auto-result'), '<div class="banner ok">Saving…</div>');
  try {
    const body = {
      alertEmails: $('#auto-alert-emails').value.trim(),
      alertSlackWebhookUrl: $('#auto-slack-webhook').value.trim(),
      staleDeactivateDays: $('#auto-stale-days').value ? parseInt($('#auto-stale-days').value) : null,
      digestEnabled: $('#auto-digest-enabled').checked,
      scoreChangeAlertsEnabled: $('#auto-score-enabled').checked,
      syntheticDataMode: $('#synthetic-data-mode').checked
    };
    const r = await fetch(`${API}/api/admin/email-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Save failed');
    renderMarkup($('#auto-result'), '<div class="banner ok">✓ Automation settings saved.</div>');
    loadEmailSettings();
  } catch (e) {
    renderMarkup($('#auto-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
  }
}
async function runAutomationNow(kind) {
  renderMarkup($('#auto-result'), '<div class="banner ok">Running…</div>');
  try {
    const r = await fetch(`${API}/api/admin/automations/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kind
      })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Could not run');
    renderMarkup($('#auto-result'), `<div class="banner ok">✓ ${esc(d.message || 'Done.')}</div>`);
    loadEmailSettings();
  } catch (e) {
    renderMarkup($('#auto-result'), `<div class="banner err">✕ ${esc(e.message)}</div>`);
  }
}
function scheduleFreqLabel(s) {
  if (s.frequency === 'ONCE') return 'Once';
  if (s.frequency === 'DAILY') return `Daily · ${s.sendTime}`;
  if (s.frequency === 'WEEKLY') return `Weekly · ${['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][s.dayOfWeek] || ''} ${s.sendTime}`;
  if (s.frequency === 'MONTHLY') return `Monthly · day ${s.dayOfMonth} · ${s.sendTime}`;
  return s.frequency;
}
async function loadScheduledReportsAdmin() {
  const tb = $('#mail-schedules');
  if (!tb) return;
  try {
    const r = await fetch(`${API}/api/admin/report-schedules`);
    const rows = await r.json();
    if (!r.ok) throw new Error(rows.error || 'Could not load schedules');
    if (!rows.length) {
      renderMarkup(tb, '<tr><td colspan="5" class="muted" style="padding:10px;">No schedules yet.</td></tr>');
      return;
    }
    renderMarkup(tb, rows.map(s => `<tr><td><strong>${esc(s.name)}</strong><div class="muted">${esc(s.employer?.name || '')}</div></td><td>${esc(s.user?.name || '')}<div class="muted">${esc(s.user?.email || '')}</div></td><td>${scheduleFreqLabel(s)}</td><td>${s.active ? fmtDate(s.nextRunAt) : 'Paused'}</td><td><span style="font-weight:800;color:${s.lastStatus === 'FAILED' ? '#b5391f' : '#137a47'}">${s.active ? 'ACTIVE' : 'PAUSED'}</span>${s.lastStatus ? `<div class="muted">last: ${esc(s.lastStatus)}</div>` : ''}</td></tr>`).join(''));
  } catch (e) {
    renderMarkup(tb, `<tr><td colspan="5" class="muted" style="padding:10px;color:#b5391f;">${esc(e.message)}</td></tr>`);
  }
}
async function loadEmailDeliveries() {
  const tb = $('#mail-deliveries');
  if (!tb) return;
  try {
    const r = await fetch(`${API}/api/admin/report-deliveries`);
    const rows = await r.json();
    if (!r.ok) throw new Error(rows.error || 'Could not load deliveries');
    if (!rows.length) {
      renderMarkup(tb, '<tr><td colspan="4" class="muted" style="padding:10px;">No deliveries yet.</td></tr>');
      return;
    }
    renderMarkup(tb, rows.map(x => `<tr><td>${fmtDate(x.sentAt)}</td><td>${x.schedule?.name || x.subject || 'Scheduled report'}<div class="muted">${esc(x.schedule?.employer?.name || '')}</div></td><td style="font-weight:800;color:${x.status === 'SENT' ? '#137a47' : '#b5391f'}">${esc(x.status)}</td><td class="muted">${Array.isArray(x.recipients) ? x.recipients.join(', ') : ''}${x.error ? `<div style="color:#b5391f">${esc(x.error)}</div>` : ''}</td></tr>`).join(''));
  } catch (e) {
    renderMarkup(tb, `<tr><td colspan="4" class="muted" style="padding:10px;color:#b5391f;">${esc(e.message)}</td></tr>`);
  }
}

// ── admin audit log ──
async function loadAuditLog() {
  const rows = $('#audit-rows');
  if (!rows) return;
  try {
    const log = await fetch(`${API}/api/admin/audit-log?limit=200`).then(r => r.json());
    const criticalRank = {
      "user.delete": 0,
      "user.revoke": 0,
      "user.update": 1,
      "user.create": 2,
      "partner.delete": 0,
      "partner.update": 1,
      "partner.create": 2,
      "security.alert.resolve": 1,
      "section.update": 2
    };
    const ranked = (Array.isArray(log) ? log : []).slice().sort((a, b) => {
      const ar = criticalRank[a.action] ?? 3,
        br = criticalRank[b.action] ?? 3;
      return ar - br || new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }).slice(0, 5);
    if (!ranked.length) {
      renderMarkup(rows, '<tr><td colspan="4" class="muted" style="padding:10px;">No admin changes recorded yet.</td></tr>');
      return;
    }
    renderMarkup(rows, ranked.map(l => `<tr>
      <td class="muted" style="white-space:nowrap;">${fmtDate(l.createdAt)}</td>
      <td><b>${esc(l.actorName)}</b><div class="muted">${esc(l.actorEmail)}</div></td>
      <td><span class="tag">${esc(l.action)}</span></td>
      <td>${esc(l.summary)}</td>
    </tr>`).join(''));
  } catch (e) {
    renderMarkup(rows, `<tr><td colspan="4" style="padding:10px;color:#b5391f;">Could not load the audit log.</td></tr>`);
  }
}

// ── client reach & engagement ──
async function loadEngagement() {
  const days = $('#eng-days')?.value || 30;
  const statsEl = $('#eng-stats'),
    trendEl = $('#eng-trend'),
    pagesEl = $('#eng-pages'),
    usersEl = $('#eng-users'),
    winEl = $('#eng-window');
  if (winEl) winEl.textContent = days;
  try {
    const s = await fetch(`${API}/api/admin/analytics/summary?days=${days}`).then(r => r.json());
    const stat = (label, value) => `<div style="background:#f7fafd;border:1px solid #e8e1f7;border-radius:12px;padding:12px 14px;"><div style="font-size:22px;font-weight:800;color:#32217c;">${value}</div><div style="font-size:11.5px;font-weight:700;color:#8497a7;margin-top:2px;">${label}</div></div>`;
    const fmtDuration = s => s == null ? '—' : s < 60 ? s + 's' : Math.round(s / 60) + 'm ' + s % 60 + 's';
    renderMarkup(statsEl, [stat('Active accounts', s.activeAccountCount), stat('Signed in this window', s.uniqueSignedInUsers), stat('Total logins', s.totalLogins), stat('Pageviews', s.totalPageviews), stat('Tracked interactions', s.totalInteractions), stat('Avg. scroll depth', s.avgScrollDepth + '%'), stat('Avg. time on page', fmtDuration(s.avgSessionSeconds))].join(''));
    const max = Math.max(1, ...s.trend.map(t => t.logins));
    renderMarkup(trendEl, s.trend.map(t => `<div title="${esc(t.date)}: ${esc(t.logins)} login(s)" style="flex:1;min-width:2px;background:#b15be8;border-radius:3px 3px 0 0;height:${Math.max(3, Math.round(t.logins / max * 100))}%;"></div>`).join(''));
    renderMarkup(pagesEl, s.topPages.length ? s.topPages.map(p => `<div style="display:flex;justify-content:space-between;font-size:12.5px;padding:5px 0;border-bottom:1px solid #f7f4ff;"><span class="muted">${esc(p.path)}</span><b style="color:#32217c;">${esc(p.views)}</b></div>`).join('') : '<div class="muted" style="font-size:12.5px;">No pageviews recorded yet.</div>');
    renderMarkup(usersEl, s.byUser.length ? s.byUser.map(u => `<tr><td><b>${esc(u.name)}</b><div class="muted">${esc(u.email)}</div></td><td>${esc(u.logins)}</td><td>${esc(u.pageviews)}</td><td>${u.avgScrollDepth !== null ? u.avgScrollDepth + '%' : '—'}</td></tr>`).join('') : '<tr><td colspan="4" class="muted" style="padding:10px;">No engagement recorded yet in this window.</td></tr>');
  } catch (e) {
    renderMarkup(statsEl, `<div class="muted">Could not load engagement data.</div>`);
  }
}

// ── channel partners (white-label) ──
let PARTNERS = [],
  ALL_USERS = [],
  ALL_EMP = [];
async function loadPartners() {
  try {
    PARTNERS = await fetch(`${API}/api/admin/partners`).then(r => r.json());
    ALL_USERS = await fetch(`${API}/api/users`, {
      credentials: 'include'
    }).then(r => r.json()).catch(() => []);
    const _me = await fetch(`${API}/api/auth/me`).then(r => r.json()).catch(() => ({
      employers: []
    }));
    ALL_EMP = _me.employers || [];
    renderPartners();
  } catch (e) {}
}
let PT_NEW_LOGO_DATAURL = null;
function onNewPartnerLogoPicked(input) {
  const f = input.files[0];
  if (!f) return;
  if (f.size > 500000) {
    showToast('Please use a logo under 500KB.', 'err');
    input.value = '';
    PT_NEW_LOGO_DATAURL = null;
    document.getElementById('pt-new-logo-label').textContent = '+ Logo (optional)';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    PT_NEW_LOGO_DATAURL = reader.result;
    document.getElementById('pt-new-logo-label').textContent = '✓ ' + f.name;
  };
  reader.readAsDataURL(f);
}
async function createPartner() {
  const name = $('#pt-new-name').value.trim();
  if (!name) return;
  const created = await apiOk(`${API}/api/admin/partners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  }).then(r => r.json());
  if (PT_NEW_LOGO_DATAURL && created?.id) {
    const detected = await extractColorsFromImage(PT_NEW_LOGO_DATAURL);
    const payload = detected ? {
      logoDataUrl: PT_NEW_LOGO_DATAURL,
      primaryColor: detected.primaryColor,
      accentColor: detected.accentColor,
      navyColor: detected.navyColor
    } : {
      logoDataUrl: PT_NEW_LOGO_DATAURL
    };
    await apiOk(`${API}/api/admin/partners/${created.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (detected) await observeBrandLearning(detected, (detected.confidence || 0) >= 0.70);
    showToast(detected ? `${name} added. ${brandSummary(detected)}` : `${name} added.`, 'ok');
  } else {
    showToast(`${name} added.`, 'ok');
  }
  $('#pt-new-name').value = '';
  $('#pt-new-logo').value = '';
  PT_NEW_LOGO_DATAURL = null;
  document.getElementById('pt-new-logo-label').textContent = '+ Logo (optional)';
  loadPartners();
}

// ── dummy test-client presets ──
// Generates a placeholder badge logo (initials on a colour swatch) rather than
// any real brand artwork — safe to use for testing white-label branding
// end-to-end (colours, name, logo swap) before a client supplies real assets.
// fetch wrapper for admin mutations: surfaces the server's message instead of pretending success
async function apiOk(url, opts) {
  const r = await fetch(url, opts);
  if (!r.ok) {
    let m = 'Request failed (' + r.status + ')';
    try {
      m = (await r.json()).error || m;
    } catch (_) {}
    showToast(m, 'err');
    throw new Error(m);
  }
  return r;
}
function dummyLogoDataUrl(initials, bg, fg) {
  fg = fg || '#ffffff';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" rx="32" fill="${bg}"/><text x="80" y="98" font-family="Manrope,Arial,sans-serif" font-size="58" font-weight="800" fill="${fg}" text-anchor="middle">${initials}</text></svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}
const PARTNER_PRESETS = [{
  name: 'FNB (test)',
  initials: 'FNB',
  primaryColor: '003C64',
  accentColor: '00A651',
  navyColor: '003C64',
  tagline: 'First National Bank — test client'
}, {
  name: 'ABSA (test)',
  initials: 'AB',
  primaryColor: 'A6192E',
  accentColor: 'DC1928',
  navyColor: '6E0E1B',
  tagline: 'Absa — test client'
}, {
  name: 'Capitec (test)',
  initials: 'CB',
  primaryColor: '004B87',
  accentColor: 'E4002B',
  navyColor: '002B4D',
  tagline: 'Capitec Bank — test client'
}, {
  name: 'Standard Bank (test)',
  initials: 'SB',
  primaryColor: '0033A0',
  accentColor: '1F63D6',
  navyColor: '001F5C',
  tagline: 'Standard Bank — test client'
}, {
  name: 'Nedbank (test)',
  initials: 'NB',
  primaryColor: '00703C',
  accentColor: '00A651',
  navyColor: '003D22',
  tagline: 'Nedbank — test client'
}];
function renderPresets() {
  const wrap = $('#pt-presets');
  if (!wrap) return;
  renderMarkup(wrap, PARTNER_PRESETS.map((p, i) => `<button type="button" class="btn btn-ghost" style="border-color:#${esc(p.accentColor)};color:#${esc(p.primaryColor)};font-size:12px;" data-react-click="${registerAction(event => {
    addPresetPartner(i);
  })}">+ ${esc(p.name)}</button>`).join(''));
}
async function addPresetPartner(i) {
  const preset = PARTNER_PRESETS[i];
  if (!preset) return;
  const created = await apiOk(`${API}/api/admin/partners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: preset.name
    })
  }).then(r => r.json());
  const logo = dummyLogoDataUrl(preset.initials, '#' + preset.accentColor);
  await apiOk(`${API}/api/admin/partners/${created.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      primaryColor: preset.primaryColor,
      accentColor: preset.accentColor,
      navyColor: preset.navyColor,
      tagline: preset.tagline,
      logoDataUrl: logo
    })
  });
  loadPartners();
}
function renderPartners() {
  const wrap = $('#pt-list');
  if (!PARTNERS.length) {
    renderMarkup(wrap, '<p class="muted">No partners yet. Add one above.</p>');
    return;
  }
  renderMarkup(wrap, PARTNERS.map(p => {
    const pc = p.primaryColor ? '#' + p.primaryColor : '#32217C',
      ac = p.accentColor ? '#' + p.accentColor : '#B15BE8',
      nv = p.navyColor ? '#' + p.navyColor : '#32217C';
    const logo = p.logoDataUrl ? `<img class="partner-preview-logo" src="${p.logoDataUrl}" alt="${esc(p.displayName || p.name)} logo">` : `<div class="partner-preview-logo partner-preview-fallback" style="background:${ac};">${(p.displayName || p.name || '?').slice(0, 2).toUpperCase()}</div>`;
    const pv = partnerPreviewTokens(p);
    return `<div class="card partner-card" style="margin-bottom:16px;padding:20px;border:1px solid #e8e1f7;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
        <div style="width:34px;height:34px;border-radius:8px;background:${pc};box-shadow:inset 0 0 0 1px rgba(255,255,255,.35);"></div>
        <div style="font-weight:800;font-size:15px;color:#32217c;flex:1;">${esc(p.name)}</div>
        <span class="muted" style="font-size:12px;">${esc(p._count.users)} users · ${esc(p._count.employers)} employers · /p/${esc(p.slug)}</span>
      </div>
      <div class="partner-preview" style="${pv.style}">
        ${logo}
        <div class="partner-preview-copy"><strong>${esc(p.displayName || p.name)}</strong><span>${esc(p.tagline || 'Your branded portal preview')}</span></div>
        <span class="partner-preview-badge">Live preview</span>
      </div>
      <button class="btn partner-preview-open" type="button" data-react-click="${registerAction(event => {
      openClientPreview(`${decodeAttribute(esc(p.id))}`);
    })}">View client dashboard</button>
      <div style="display:grid;grid-template-columns:repeat(3,1fr) 2fr;gap:12px;align-items:end;margin-top:16px;">
        <label style="font-size:11.5px;font-weight:700;color:#5b6b7a;">Primary<input type="color" value="${pc}" data-react-change="${registerAction(event => {
      editPartner(`${decodeAttribute(esc(p.id))}`, 'primaryColor', event.currentTarget.value);
    })}" style="display:block;width:100%;height:34px;border:1px solid #e8e1f7;border-radius:7px;margin-top:4px;"></label>
        <label style="font-size:11.5px;font-weight:700;color:#5b6b7a;">Accent<input type="color" value="${ac}" data-react-change="${registerAction(event => {
      editPartner(`${decodeAttribute(esc(p.id))}`, 'accentColor', event.currentTarget.value);
    })}" style="display:block;width:100%;height:34px;border:1px solid #e8e1f7;border-radius:7px;margin-top:4px;"></label>
        <label style="font-size:11.5px;font-weight:700;color:#5b6b7a;">Navy<input type="color" value="${nv}" data-react-change="${registerAction(event => {
      editPartner(`${decodeAttribute(esc(p.id))}`, 'navyColor', event.currentTarget.value);
    })}" style="display:block;width:100%;height:34px;border:1px solid #e8e1f7;border-radius:7px;margin-top:4px;"></label>
        <label style="font-size:11.5px;font-weight:700;color:#5b6b7a;">Display name<input value="${esc(p.displayName || '')}" data-react-change="${registerAction(event => {
      editPartner(`${decodeAttribute(esc(p.id))}`, 'displayName', event.currentTarget.value);
    })}" style="display:block;width:100%;padding:7px 10px;border:1px solid #e8e1f7;border-radius:7px;margin-top:4px;font:inherit;"></label>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;align-items:end;">
        <label style="font-size:11.5px;font-weight:700;color:#5b6b7a;">Tagline (optional)<input value="${esc(p.tagline || '')}" data-react-change="${registerAction(event => {
      editPartner(`${decodeAttribute(esc(p.id))}`, 'tagline', event.currentTarget.value);
    })}" style="display:block;width:100%;padding:7px 10px;border:1px solid #e8e1f7;border-radius:7px;margin-top:4px;font:inherit;"></label>
        <label style="font-size:11.5px;font-weight:700;color:#5b6b7a;">Logo (PNG)<input type="file" accept="image/png,image/jpeg" data-react-change="${registerAction(event => {
      uploadPartnerLogo(`${decodeAttribute(esc(p.id))}`, event.currentTarget);
    })}" style="display:block;margin-top:4px;font-size:12px;"></label>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;margin-top:12px;align-items:center;">
        <select id="pt-u-${esc(p.id)}" style="font:inherit;padding:7px 10px;border:1px solid #e8e1f7;border-radius:7px;"><option value="">Assign a user…</option>${ALL_USERS.map(u => `<option value="${esc(u.id)}">${u.name || u.email}</option>`).join('')}</select>
        <select id="pt-e-${esc(p.id)}" style="font:inherit;padding:7px 10px;border:1px solid #e8e1f7;border-radius:7px;"><option value="">Assign an employer…</option>${(ALL_EMP || []).map(e => `<option value="${e.id || e.employerId}">${e.name || e.employer}</option>`).join('')}</select>
        <button class="btn btn-ghost" data-react-click="${registerAction(event => {
      assignToPartner(`${decodeAttribute(esc(p.id))}`);
    })}">Assign</button>
      </div>
      <div style="margin-top:10px;text-align:right;"><button class="btn btn-ghost" style="color:#b5391f;font-size:12px;" data-react-click="${registerAction(event => {
      deletePartner(`${decodeAttribute(esc(p.id))}`, `${decodeAttribute(p.name.replace(/'/g, ""))}`);
    })}">Delete partner</button></div>
    </div>`;
  }).join(''));
}
function previewHex(value, fallback) {
  return '#' + String(value || fallback).replace(/^#/, '');
}
function partnerBrand(p) {
  return {
    accentColor: String(p?.accentColor || p?.primaryColor || 'B15BE8').replace(/^#/, ''),
    primaryColor: String(p?.primaryColor || p?.accentColor || '32217C').replace(/^#/, ''),
    navyColor: String(p?.navyColor || p?.primaryColor || '32217C').replace(/^#/, '')
  };
}
function readableOn(background, preferred) {
  if (!window.BrandEngine) return '#ffffff';
  const bg = String(background || '#17212b').replace(/^#/, '');
  const pref = String(preferred || 'FFFFFF').replace(/^#/, '');
  return '#' + BrandEngine.ensureContrast(pref, bg, 4.5);
}
function partnerPreviewTokens(p) {
  const brand = partnerBrand(p);
  if (!window.BrandEngine) {
    const surface = previewHex(brand.navyColor, '32217C');
    return {
      style: `--preview-surface:${surface};--preview-text:#fff;--preview-muted:#d7dee5;--preview-accent:${previewHex(brand.accentColor, 'B15BE8')};--preview-on-accent:#fff;--preview-line:rgba(255,255,255,.24);--preview-logo-bg:#fff;`
    };
  }
  const t = BrandEngine.themeTokens(brand, 'dark');
  const surface = t['--bar-bg'];
  const accent = readableOn(surface, brand.accentColor);
  const text = readableOn(surface, t['--brand-primary']);
  const muted = readableOn(surface, t['--grey']);
  const onAccent = BrandEngine.contrast('FFFFFF', accent.replace(/^#/, '')) >= 4.5 ? '#fff' : '#0b0f19';
  return {
    style: `--preview-surface:${surface};--preview-text:${text};--preview-muted:${muted};--preview-accent:${accent};--preview-on-accent:${onAccent};--preview-line:${t['--dm-line']};--preview-logo-bg:#fff;`
  };
}
function applyClientPreviewTheme(p) {
  const app = $('#client-preview-app');
  if (!app) return;
  const brand = partnerBrand(p);
  const dark = document.documentElement.classList.contains('portal-dark');
  const t = window.BrandEngine ? BrandEngine.themeTokens(brand, dark ? 'dark' : 'light') : null;
  const surface = t?.['--white'] || '#fff';
  const accent = t?.['--blue'] || previewHex(brand.accentColor, 'B15BE8');
  const onAccent = window.BrandEngine && BrandEngine.contrast('FFFFFF', accent.replace(/^#/, '')) < 4.5 ? '#0b0f19' : '#fff';
  app.style.setProperty('--preview-bg', t?.['--dm-bg'] || t?.['--ent-paper'] || '#f6f4fb');
  app.style.setProperty('--preview-surface', surface);
  app.style.setProperty('--preview-surface-2', t?.['--ice'] || '#f3efff');
  app.style.setProperty('--preview-navy', t?.['--brand-primary'] || previewHex(brand.navyColor, '32217C'));
  app.style.setProperty('--preview-blue', accent);
  app.style.setProperty('--preview-line', t?.['--line'] || '#e8e1f7');
  app.style.setProperty('--preview-ink', t?.['--ink'] || '#0f2438');
  app.style.setProperty('--preview-muted', t?.['--grey'] || '#5b6b7a');
  app.style.setProperty('--preview-on-accent', onAccent);
  app.style.setProperty('--preview-logo-bg', '#fff');
}
function previewLogo(p) {
  return p.logoDataUrl ? `<img class="cp-logo" src="${p.logoDataUrl}" alt="${esc(p.displayName || p.name)} logo">` : `<div class="cp-logo" style="display:grid;place-items:center;background:${previewHex(p.accentColor, 'B15BE8')};color:#fff;font-size:11px;font-weight:800;">${(p.displayName || p.name || '?').slice(0, 2).toUpperCase()}</div>`;
}
function openClientPreview(id) {
  const p = PARTNERS.find(x => String(x.id) === String(id));
  if (!p) return;
  const app = $('#client-preview-app');
  if (!app) return;
  const name = esc(p.displayName || p.name || 'Partner');
  const partnerLabel = esc(p.displayName || p.name || 'Partner');
  const logo = p.logoDataUrl ? `<img class="snap-partner-logo" src="${p.logoDataUrl}" alt="${partnerLabel} logo">` : `<span class="snap-partner-fallback">${partnerLabel.slice(0, 3).toUpperCase()}</span>`;
  const score = 72,
    enrolled = 1284,
    monthly = 'R 184k',
    debt = 'R 63k',
    challenged = 31,
    better = 486,
    satisfaction = '4.4/5';
  const drivers = [['Engagement', 68], ['Cashflow relief', 61], ['Debt risk', 54], ['Insurance efficiency', 73]];
  const funnel = [['Eligible workforce', 1284], ['Enrolled', 876], ['Activated', 644], ['Completed a fix', 486], ['Advocates', 219]];
  renderMarkup(app, `
    <div class="snap-shell">
      <div class="snap-topbar">
        ${logo}
        <span class="snap-spacer"></span>
        <div class="snap-nav"><span>Dashboard</span><span>Reports</span><span>Support</span></div>
        <span class="snap-avatar">AD</span>
      </div>

      <div class="snap-body">
        <div class="snap-head">
          <div>
            <div class="snap-eyebrow">Employer insights · financial wellbeing programme</div>
            <h3>${name} workforce dashboard</h3>
            <div class="snap-sub">${esc(p.tagline || 'How the financial wellbeing programme is landing across your workforce, who is using it, the outcomes achieved and how employees rate the service.')}</div>
          </div>
          <div class="snap-actions"><button class="snap-btn">Schedule report</button><button class="snap-btn primary">Export PDF</button></div>
        </div>

        <div class="snap-period"><span>October 2026 (month to date)</span><span>18 newly enrolled</span><span>12 fixes completed</span><span>R 184k/mo savings</span><span>38 wage advances</span></div>
        <div class="snap-banner"><b>Synthetic preview data.</b> This preview mirrors the live employer dashboard structure but uses safe dummy figures only.</div>

        <div class="snap-filterbar">
          <span class="snap-chip partner">${partnerLabel}</span>
          <span class="snap-chip">Latest available period</span>
          <span class="snap-chip">All regions</span>
          <span class="snap-chip">All income bands</span>
          <span class="snap-chip">${enrolled.toLocaleString()} enrolled</span>
        </div>

        <div class="snap-insight">
          <div class="snap-insight-copy"><b>EXECUTIVE INSIGHT</b><br>Financial wellbeing score is ${score}/100, up 4 points versus the previous period. Monthly cash freed up is ${monthly}. Debt interventions and completed fixes continue to trend positively.</div>
          <div class="snap-actions"><button class="snap-btn">Save view</button><button class="snap-btn">Quick actions</button></div>
        </div>

        <section class="snap-impact">
          <div class="snap-impact-head"><h4>Financial wellbeing impact summary</h4><span class="snap-btn" style="background:#fff;color:var(--preview-navy);border:0">At a glance</span></div>
          <div class="snap-impact-grid">
            <div class="snap-impact-cell"><strong>${enrolled.toLocaleString()}</strong><span>employees enrolled</span></div>
            <div class="snap-impact-cell"><strong>${monthly}</strong><span>monthly cashflow restored</span></div>
            <div class="snap-impact-cell"><strong>${debt}</strong><span>debt under intervention</span></div>
            <div class="snap-impact-cell"><strong>${challenged}</strong><span>prescribed debts challenged</span></div>
            <div class="snap-impact-cell"><strong>${better}</strong><span>employees better off</span></div>
            <div class="snap-impact-cell"><strong>${satisfaction}</strong><span>employee satisfaction</span></div>
          </div>
        </section>

        <div class="snap-grid">
          <section class="snap-card">
            <div class="snap-card-title">Workforce financial wellness score</div>
            <div class="snap-wellness">
              <div class="snap-score-ring"><strong>${score}</strong></div>
              <div class="snap-drivers">
                ${drivers.map(([label, val]) => `<div class="snap-driver"><span>${label}</span><div class="snap-track"><div class="snap-fill" style="width:${val}%"></div></div><b>${val}</b></div>`).join('')}
              </div>
            </div>
          </section>

          <section class="snap-card">
            <div class="snap-card-title">Engagement funnel</div>
            <div class="snap-funnel">
              ${funnel.map(([label, val], i) => `<div class="snap-funnel-row"><span>${label}</span><div class="snap-track"><div class="snap-fill" style="width:${Math.max(18, 100 - i * 18)}%"></div></div><b>${val}</b></div>`).join('')}
            </div>
          </section>
        </div>

        <div class="snap-kpis">
          <div class="snap-kpi"><strong>68%</strong><span>programme activation</span></div>
          <div class="snap-kpi"><strong>486</strong><span>employees better off</span></div>
          <div class="snap-kpi"><strong>R 63k</strong><span>debt under active intervention</span></div>
          <div class="snap-kpi"><strong>4.4/5</strong><span>employee satisfaction</span></div>
        </div>

        <div class="snap-grid">
          <section class="snap-card">
            <div class="snap-card-title">Debt pressure profile</div>
            <div class="snap-debtbar"><span class="snap-seg" style="width:32%"></span><span class="snap-seg" style="width:28%"></span><span class="snap-seg" style="width:23%"></span><span class="snap-seg" style="width:17%"></span></div>
            <div class="snap-outcomes">
              <div class="snap-outcome"><i class="snap-dot"></i>High-interest unsecured debt <b style="margin-left:auto">32%</b></div>
              <div class="snap-outcome"><i class="snap-dot"></i>Short-term credit exposure <b style="margin-left:auto">28%</b></div>
              <div class="snap-outcome"><i class="snap-dot"></i>Collections / arrears <b style="margin-left:auto">23%</b></div>
              <div class="snap-outcome"><i class="snap-dot"></i>Other observed pressure <b style="margin-left:auto">17%</b></div>
            </div>
          </section>

          <section class="snap-card">
            <div class="snap-card-title">Outcomes achieved</div>
            <div class="snap-outcomes">
              <div class="snap-outcome"><i class="snap-dot"></i>Debt pressure reduced <b style="margin-left:auto">486</b></div>
              <div class="snap-outcome"><i class="snap-dot"></i>Policies optimised <b style="margin-left:auto">219</b></div>
              <div class="snap-outcome"><i class="snap-dot"></i>Employees better off <b style="margin-left:auto">74%</b></div>
              <div class="snap-outcome"><i class="snap-dot"></i>Positive service rating <b style="margin-left:auto">88%</b></div>
            </div>
          </section>
        </div>

        <section class="snap-card" style="margin-top:12px">
          <div class="snap-card-title">Next best opportunities</div>
          <div class="snap-opps">
            <div class="snap-opp"><strong>R 28k</strong><span>debt restructuring opportunity</span></div>
            <div class="snap-opp"><strong>143</strong><span>employees to re-engage</span></div>
            <div class="snap-opp"><strong>R 17k</strong><span>insurance optimisation value</span></div>
            <div class="snap-opp"><strong>92</strong><span>employees ready for next action</span></div>
          </div>
        </section>

        <div class="snap-footnote">Synthetic dummy snapshot · structure mirrors the live employer dashboard</div>
      </div>
    </div>`);
  app.dataset.partnerId = String(p.id);
  applyClientPreviewTheme(p);
  $('#client-preview-title').textContent = `${name} · dashboard preview`;
  $('#client-preview-overlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeClientPreview(event) {
  if (event && event.target !== $('#client-preview-overlay')) return;
  $('#client-preview-overlay').classList.remove('is-open');
  const app = $('#client-preview-app');
  if (app) delete app.dataset.partnerId;
  document.body.style.overflow = '';
}
if (typeof MutationObserver !== 'undefined') {
  new MutationObserver(() => {
    const overlay = $('#client-preview-overlay'),
      app = $('#client-preview-app');
    if (!overlay?.classList.contains('is-open') || !app?.dataset.partnerId) return;
    const p = PARTNERS.find(x => x.id === app.dataset.partnerId);
    if (p) applyClientPreviewTheme(p);
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && $('#client-preview-overlay').classList.contains('is-open')) closeClientPreview();
});
async function editPartner(id, field, value) {
  if (field.endsWith('Color')) value = value.replace(/^#/, '');
  await apiOk('/api/admin/partners/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      [field]: value
    })
  });
  if (field.endsWith('Color')) {
    try {
      await fetch('/api/admin/brand-learning/correction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          engineVersion: window.BrandEngine?.VERSION || '1.1.0',
          palette: [{
            hex: value,
            share: 1,
            role: 'manual-correction'
          }]
        })
      });
    } catch (_) {}
  }
  loadPartners();
}

// ── colour extraction from an uploaded logo ──
// Samples the logo's pixels on an offscreen canvas, ignores near-white/near-black/
// low-saturation background pixels, and picks a brand palette from what's left:
//   accent  = the most vivid (highest-saturation) colour found
//   primary = the darkest genuinely-colourful tone (falls back to a darkened accent)
//   navy    = primary pushed further toward near-black, for the deep/navy slot
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = 60 * ((g - b) / d % 6);
        break;
      case g:
        h = 60 * ((b - r) / d + 2);
        break;
      default:
        h = 60 * ((r - g) / d + 4);
    }
  }
  if (h < 0) h += 360;
  return [h, s, l];
}
function hslToHex(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(h / 60 % 2 - 1)),
    m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  const toHex = v => Math.max(0, Math.min(255, Math.round((v + m) * 255)));
  return [toHex(r), toHex(g), toHex(b)].map(v => v.toString(16).padStart(2, '0')).join('');
}
/* Brand colour detection: real-pixel, perceptual (OKLab) hue-bucket analysis in brand-engine.js.
   Runs entirely in the browser, no network calls. Returns hex values in the shape the API stores. */
let BRAND_LEARNING_PROFILE = null;
async function loadBrandLearningProfile() {
  try {
    BRAND_LEARNING_PROFILE = await fetch('/api/admin/brand-learning/profile', {
      cache: 'no-store'
    }).then(r => r.ok ? r.json() : null);
  } catch (_) {
    BRAND_LEARNING_PROFILE = null;
  }
  return BRAND_LEARNING_PROFILE;
}
async function observeBrandLearning(detected, accepted) {
  if (!detected) return;
  try {
    await fetch('/api/admin/brand-learning/observe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        engineVersion: window.BrandEngine?.VERSION || '1.1.0',
        palette: Array.isArray(detected.palette) ? detected.palette : [],
        confidence: Number(detected.confidence || 0),
        accepted: Boolean(accepted)
      })
    });
  } catch (_) {}
}
async function extractColorsFromImage(dataUrl) {
  if (!window.BrandEngine) return null;
  if (!BRAND_LEARNING_PROFILE) await loadBrandLearningProfile();
  const r = await BrandEngine.extractFromImage(dataUrl, 256, BRAND_LEARNING_PROFILE);
  if (!r) return null;
  window.__lastBrandDetection = r;
  return r;
}
function brandSummary(r) {
  if (!r) return '';
  const pct = Math.round((r.confidence || 0) * 100);
  const head = `Detected accent #${r.accentColor}, secondary #${r.primaryColor}, brand bar #${r.navyColor} (${pct}% confidence).`;
  return r.warnings && r.warnings.length ? head + ' ' + r.warnings[0] : head;
}
function uploadPartnerLogo(id, input) {
  const f = input.files[0];
  if (!f) return;
  if (f.size > 500000) {
    showToast('Please use a logo under 500KB.', 'err');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = async () => {
    const logoDataUrl = reader.result;
    const detected = await extractColorsFromImage(logoDataUrl);
    const payload = detected ? {
      logoDataUrl,
      primaryColor: detected.primaryColor,
      accentColor: detected.accentColor,
      navyColor: detected.navyColor,
      brandEngineVersion: window.BrandEngine?.VERSION || '1.1.0',
      brandDetectionStatus: (detected.confidence || 0) >= 0.70 ? 'AUTO_ACCEPTED' : 'NEEDS_REVIEW',
      brandDetectionConfidence: Number(detected.confidence || 0),
      brandDetectionWarnings: Array.isArray(detected.warnings) ? detected.warnings : [],
      brandDetectionDiagnostics: detected.diagnostics || {},
      brandDetectedPalette: Array.isArray(detected.palette) ? detected.palette : []
    } : {
      logoDataUrl
    };
    await apiOk(`${API}/api/admin/partners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (detected) await observeBrandLearning(detected, (detected.confidence || 0) >= 0.70);
    showToast(detected ? 'Logo saved. ' + brandSummary(detected) + ' The recognizer has learned from this upload.' : 'Logo saved. No colours could be detected from this image.', 'ok');
    loadPartners();
  };
  reader.readAsDataURL(f);
}
// Lightweight, non-blocking replacement for alert() so an automatic colour
// detection doesn't interrupt the admin with a modal dialog.
function showToast(message, kind) {
  let el = document.getElementById('admin-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'admin-toast';
    el.style.cssText = 'position:fixed;bottom:22px;left:50%;transform:translateX(-50%) translateY(12px);z-index:9999;padding:12px 18px;border-radius:11px;font:600 13px/1.4 Manrope,system-ui,sans-serif;box-shadow:0 12px 28px rgba(20,10,50,.18);opacity:0;transition:opacity .18s,transform .18s;max-width:min(86vw,420px);text-align:center;';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.style.background = kind === 'err' ? '#fdecea' : '#eafaf1';
  el.style.color = kind === 'err' ? '#b5391f' : '#137a47';
  el.style.border = kind === 'err' ? '1px solid #f3c2ba' : '1px solid #b7e8cc';
  clearTimeout(el._hideTimer);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });
  el._hideTimer = setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-50%) translateY(12px)';
  }, 3600);
}
async function assignToPartner(id) {
  const uid = $('#pt-u-' + id).value,
    eid = $('#pt-e-' + id).value;
  if (uid) await fetch(`${API}/api/admin/partners/${id}/assign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: uid
    })
  });
  if (eid) await fetch(`${API}/api/admin/partners/${id}/assign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      employerId: eid
    })
  });
  loadPartners();
}
async function deletePartner(id, name) {
  if (!confirm(`Delete partner "${name}"? Its users and employers stay, but lose this branding.`)) return;
  await fetch(`${API}/api/admin/partners/${id}`, {
    method: 'DELETE'
  });
  loadPartners();
}

// ── dashboard section permissions ──
const ROLE_LABEL = {
  ADMIN: 'Admin',
  EMPLOYER_MANAGER: 'Employer Manager',
  PORTFOLIO_MANAGER: 'Portfolio Manager',
  VIEWER: 'Viewer'
};
let SECTIONS = [];
async function loadSections() {
  try {
    SECTIONS = await fetch(`${API}/api/admin/sections`).then(r => r.json());
    if (!ALL_USERS.length) ALL_USERS = await fetch(`${API}/api/users`, {
      credentials: 'include'
    }).then(r => r.json()).catch(() => []);
    renderSections();
  } catch (e) {}
}
function renderSections() {
  const wrap = $('#sec-list');
  if (!wrap) return;
  if (!SECTIONS.length) {
    renderMarkup(wrap, '<p class="muted">No dashboard sections found.</p>');
    return;
  }
  renderMarkup(wrap, SECTIONS.map(s => {
    const roleChecks = Object.keys(ROLE_LABEL).map(r => `<label style="font-size:12px;font-weight:700;color:#5b6b7a;display:inline-flex;align-items:center;gap:5px;margin-right:14px;">
        <input type="checkbox" ${s.allowedRoles.includes(r) ? 'checked' : ''} data-react-change="${registerAction(event => {
      toggleSectionRole(`${decodeAttribute(esc(s.key))}`, `${decodeAttribute(r)}`, event.currentTarget.checked);
    })}"> ${ROLE_LABEL[r]}
      </label>`).join('');
    const overrides = s.overrides.length ? s.overrides.map(o => `<span class="tag opt" style="margin:2px 4px 2px 0;">${o.name || o.email} <a href="#" data-react-click="${registerAction(event => {
      revokeSection(`${decodeAttribute(esc(s.key))}`, `${decodeAttribute(esc(o.userId))}`);
      return false;
    })}" style="color:#b5391f;text-decoration:none;margin-left:4px;">✕</a></span>`).join('') : '<span class="muted">None</span>';
    return `<div style="border:1px solid #e8e1f7;border-radius:11px;padding:14px 16px;margin-bottom:12px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
        <label style="display:inline-flex;align-items:center;gap:8px;font-weight:800;font-size:13.5px;color:#32217c;flex:1;">
          <input type="checkbox" ${s.enabled ? 'checked' : ''} data-react-change="${registerAction(event => {
      toggleSectionEnabled(`${decodeAttribute(esc(s.key))}`, event.currentTarget.checked);
    })}"> ${esc(s.label)}
        </label>
        <span class="muted" style="font-size:11.5px;">${s.enabled ? 'Visible' : 'Hidden from everyone (except admins and explicit grants below)'}</span>
      </div>
      <div style="margin:8px 0;">${roleChecks}</div>
      <div style="margin-top:10px;">
        <div style="font-size:11px;font-weight:800;color:#8497a7;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px;">Extra access for specific people</div>
        <div style="margin-bottom:8px;">${overrides}</div>
        <div style="display:flex;gap:8px;">
          <select id="sec-u-${esc(s.key)}" style="font:inherit;padding:7px 10px;border:1px solid #e8e1f7;border-radius:7px;flex:1;"><option value="">Grant access to…</option>${ALL_USERS.map(u => `<option value="${esc(u.id)}">${u.name || u.email}</option>`).join('')}</select>
          <button class="btn btn-ghost" data-react-click="${registerAction(event => {
      grantSection(`${decodeAttribute(esc(s.key))}`);
    })}">Grant</button>
        </div>
      </div>
    </div>`;
  }).join(''));
}
async function toggleSectionEnabled(key, enabled) {
  await fetch(`${API}/api/admin/sections/${key}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      enabled
    })
  });
  loadSections();
}
async function toggleSectionRole(key, role, checked) {
  const section = SECTIONS.find(s => s.key === key);
  if (!section) return;
  const roles = new Set(section.allowedRoles);
  if (checked) roles.add(role);else roles.delete(role);
  await fetch(`${API}/api/admin/sections/${key}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      allowedRoles: [...roles]
    })
  });
  loadSections();
}
async function grantSection(key) {
  const userId = $('#sec-u-' + key).value;
  if (!userId) return;
  await fetch(`${API}/api/admin/sections/${key}/grant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  });
  loadSections();
}
async function revokeSection(key, userId) {
  await fetch(`${API}/api/admin/sections/${key}/revoke`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  });
  loadSections();
}

// ── danger zone: full reset ──
function openReset() {
  const area = $('#reset-area');
  const input = $('#reset-confirm');
  const msg = $('#reset-msg');
  if (!area || !input || !msg) return;
  area.style.display = 'block';
  input.value = '';
  msg.style.display = 'none';
  msg.textContent = '';
  input.focus();
}
async function doReset() {
  const input = $('#reset-confirm');
  const msg = $('#reset-msg');
  if (!input || !msg) return;
  if (input.value.trim() !== 'RESET') {
    msg.className = 'banner err';
    msg.style.display = 'block';
    msg.textContent = 'Please type RESET exactly to confirm.';
    return;
  }
  if (!confirm('Reset the source-derived reporting model and rebuild it immediately from the connected source? The last successful dashboard remains published until all 10 feeds complete.')) return;
  msg.className = 'banner ok';
  msg.style.display = 'block';
  msg.textContent = 'Preflighting source, then resetting and rewriting all 10 feeds from the authoritative database…';
  try {
    const r = await fetch(`${API}/api/admin/reset-all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        confirm: 'RESET'
      })
    });
    let d = {};
    try {
      d = await r.json();
    } catch (_) {}
    if (!r.ok || !d.ok) throw new Error(d.error || d.note || `Reset & rebuild failed (HTTP ${r.status})`);
    const cleared = Object.values(d.cleared || {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
    const loaded = Number(d.overwrittenRows || 0);
    input.value = '';
    const resultArea = $('#result');
    if (resultArea) renderMarkup(resultArea, '');
    msg.className = 'banner ok';
    msg.textContent = `✓ Authoritative rebuild published. Cleared ${cleared.toLocaleString('en-ZA')} source-derived rows and accepted ${loaded.toLocaleString('en-ZA')} rows from the connected source. Previous cursors/MLOps/staleness did not gate this rebuild.`;
    await Promise.allSettled([loadHistory(), loadInteg(), loadIntegLogs(), loadMLOpsAlert()]);
  } catch (e) {
    msg.className = 'banner err';
    msg.textContent = `✕ Reset & rebuild did not publish. The last successful dashboard remains visible. Reason: ${e.message}`;
  }
}
async function boot() {
  installCompactCollapse();
  // Require an authenticated admin, then load the report contract independently
  // from the rest of the optional administration panels. A failure elsewhere
  // must never remove the report selector or its upload controls.
  let me = null;
  try {
    const r = await fetch('/api/auth/me', {
      cache: 'no-store'
    });
    if (!r.ok) {
      location.href = '/login';
      return;
    }
    me = await r.json();
  } catch (e) {
    location.href = '/login';
    return;
  }
  if (!me.modules.admin) {
    location.href = '/dashboard';
    return;
  }
  applyAdminBrandTheme();
  const isSuperAdmin = me.role === 'SUPERADMIN';
  const posture = document.getElementById('role-posture');
  if (posture) {
    document.getElementById('role-posture-title').textContent = isSuperAdmin ? 'Super Admin control plane' : 'Operational administration';
    document.getElementById('role-posture-copy').textContent = isSuperAdmin ? 'Full platform control: role governance, security operations, integrations, MLOps governance, dashboard permissions and high-impact system controls.' : 'Day-to-day administration: users, employers, partners, reporting, operational settings and live dashboard integrations. Privileged control-plane functions are intentionally hidden.';
    document.getElementById('role-posture-badge').textContent = isSuperAdmin ? 'Super Admin' : 'Admin';
    posture.querySelector('[data-role-avatar]').textContent = isSuperAdmin ? 'S' : 'A';
  }
  if (!isSuperAdmin) {
    const privilegedHeadings = new Set(['Security centre', 'MLOps data-quality alert', 'Dashboard Sections', 'Danger zone']);
    document.querySelectorAll('h2').forEach(h => {
      const title = h.textContent.trim();
      if (!privilegedHeadings.has(title)) return;
      const card = h.closest('.card');
      if (card) card.style.display = 'none';
    });
  }
  handleWelcomeSplash(me);
  addNav(me);
  try {
    const r = await fetch(`${API}/api/admin/reports`, {
      cache: 'no-store'
    });
    let data = {};
    try {
      data = await r.json();
    } catch (_) {}
    if (!r.ok) throw new Error(data.error || `Reports API returned HTTP ${r.status}`);
    if (!Array.isArray(data.loadOrder) || !Array.isArray(data.reports)) {
      throw new Error('Reports API returned an invalid report manifest');
    }
    MANIFEST = data;
    renderRepList();
  } catch (e) {
    console.error('Could not load report manifest:', e);
    renderMarkup($('#rep-list'), `<p class="muted">Could not load the report list: ${esc(e.message)}. Please refresh the page.</p>`);
    return;
  }
  const optionalLoads = [['history', loadHistory], ['integration', loadInteg], ['email', loadEmailSettings], ['partners', loadPartners], ['sections', loadSections], ['engagement', loadEngagement], ['presets', renderPresets], ['audit', loadAuditLog], ['security', loadAdminSecuritySummary], ['compliance', loadComplianceSummary], ['enterprise', loadEnterpriseOperations], ['mlops', loadMLOpsAlert]];
  await Promise.allSettled(optionalLoads.map(async ([name, fn]) => {
    try {
      await fn();
    } catch (e) {
      console.error(`Admin panel ${name} failed:`, e);
    }
  }));
}
function renderRepList() {
  const order = MANIFEST.loadOrder;
  renderMarkup($('#rep-list'), order.map((key, i) => {
    const rep = MANIFEST.reports.find(r => r.key === key);
    return `<div class="rep" data-key="${key}" data-react-click="${registerAction(event => {
      selectReport(`${decodeAttribute(key)}`);
    })}">
      <span class="step">STEP ${i + 1}</span><span class="t">${esc(rep.title)}</span></div>`;
  }).join(''));
}
function selectReport(key) {
  CURRENT = MANIFEST.reports.find(r => r.key === key);
  document.querySelectorAll('.rep').forEach(el => el.classList.toggle('on', el.dataset.key === key));
  $('#rep-title').textContent = CURRENT.title;
  $('#rep-note').textContent = CURRENT.description;
  const fields = CURRENT.fields.map(f => `<tr>
    <td><strong>${esc(f.name)}</strong>${f.unit ? ` <code>${esc(f.unit)}</code>` : ''}</td>
    <td>${esc(f.type)}</td>
    <td>${f.required ? '<span class="tag req">required</span>' : '<span class="tag opt">optional</span>'}</td>
    <td class="field-desc">${esc(f.description)}${f.allowed ? `<br><code>${f.allowed.join(' · ')}</code>` : ''}</td>
  </tr>`).join('');
  renderMarkup($('#work'), `
    <div class="row">
      <button class="btn" data-react-click="${registerAction(event => {
    dl('csv');
  })}">↓ CSV template</button>
      <button class="btn" data-react-click="${registerAction(event => {
    dl('xlsx');
  })}">↓ Excel template</button>
      <span class="muted">Natural key: <code>${CURRENT.naturalKey.join(' + ')}</code></span>
    </div>
    <div class="drop" id="drop" data-react-click="${registerAction(event => {
    $('#file').click();
  })}">
      <div class="big">Drop a file here or click to browse</div>
      <div class="sm">CSV, Excel (.xlsx or .xls) or JSON · up to 50 MB</div>
      <input id="file" type="file" class="hidden" accept=".csv,.xlsx,.xls,.json" data-react-change="${registerAction(event => {
    upload(event.currentTarget.files[0]);
  })}">
    </div>
    <div id="result"></div>
    <details class="section-gap"><summary class="muted" style="cursor:pointer;font-weight:700;">View format (${CURRENT.fields.length} columns)</summary>
      <table style="margin-top:10px;"><thead><tr><th>Column</th><th>Type</th><th>Req</th><th>Description</th></tr></thead><tbody>${fields}</tbody></table>
    </details>`);
  wireDrop();
}
function dl(fmt) {
  window.location = `${API}/api/admin/reports/${CURRENT.key}/template?fmt=${fmt}`;
}
function wireDrop() {
  const d = $('#drop');
  ['dragenter', 'dragover'].forEach(ev => d.addEventListener(ev, e => {
    e.preventDefault();
    d.classList.add('over');
  }));
  ['dragleave', 'drop'].forEach(ev => d.addEventListener(ev, e => {
    e.preventDefault();
    d.classList.remove('over');
  }));
  d.addEventListener('drop', e => {
    if (e.dataTransfer.files[0]) upload(e.dataTransfer.files[0]);
  });
}
async function pollJob(url, label, onProgress = null, target = '#result') {
  const started = Date.now();
  const jobId = url.split('/').pop();
  let settled = false;
  let source = null;
  let fallbackTimer = null;
  const showProgress = (payload = {}) => {
    const progress = payload.progress ?? 0;
    const phase = payload.phase ?? 'PROCESSING';
    const message = payload.message || label;
    const detail = payload.detail || {};
    const pct = Math.max(0, Math.min(100, Number(progress || 0)));
    const host = document.querySelector(target);
    if (!host) return;
    const pieces = [];
    if (detail.reportKey) pieces.push(`Feed ${esc(detail.reportKey)}${detail.feedIndex && detail.feedCount ? ` · ${esc(detail.feedIndex)}/${esc(detail.feedCount)}` : ''}`);
    if (detail.sourceTotalRows != null) pieces.push(`Source view: ${Number(detail.sourceTotalRows).toLocaleString('en-ZA')} rows`);
    if (detail.pulledRows != null) pieces.push(`Pulled: ${Number(detail.pulledRows).toLocaleString('en-ZA')}`);
    if (detail.validatedRows != null) pieces.push(`Validated: ${Number(detail.validatedRows).toLocaleString('en-ZA')}`);
    if (detail.committedRows != null) pieces.push(`Processed live: ${Number(detail.committedRows).toLocaleString('en-ZA')}`);
    if (detail.inserted != null || detail.updated != null || detail.deleted != null) {
      const mutations = `+${Number(detail.inserted || 0).toLocaleString('en-ZA')} new · ~${Number(detail.updated || 0).toLocaleString('en-ZA')} updated · -${Number(detail.deleted || 0).toLocaleString('en-ZA')} deleted`;
      const history = Number(detail.historyRows || 0);
      pieces.push(history > 0 ? `${mutations} · ${history.toLocaleString('en-ZA')} dated history observation(s)` : `${mutations}${Number(detail.skipped || 0) > 0 ? ` · ${Number(detail.skipped).toLocaleString('en-ZA')} stale skipped` : ''}`);
    }
    renderMarkup(host, `<div class="job-progress">
      <strong>${esc(message)}</strong>
      <div class="job-progress-track"><div class="job-progress-fill" style="width:${pct}%"></div></div>
      <div class="job-progress-meta"><span>${esc(phase)}</span><strong>${pct}%</strong></div>
      ${pieces.length ? `<div class="job-progress-detail">${pieces.map(esc).join(' · ')}</div>` : ''}
    </div>`);
  };
  const readState = async () => {
    const r = await fetch(url, {
      cache: 'no-store'
    });
    const d = await r.json().catch(() => null);
    if (!r.ok || !d) throw new Error(d?.error || `${label} status check failed: HTTP ${r.status}`);
    return d;
  };
  const finishState = async d => {
    if (d.status === 'DONE') return d.result || d;
    if (d.status === 'FAILED') throw new Error(d.error || `${label} failed`);
    showProgress(d);
    if (onProgress) onProgress(d);
    return null;
  };
  const fallbackPoll = async () => {
    while (Date.now() - started < 30 * 60 * 1000) {
      const state = await readState();
      const done = await finishState(state);
      if (done) return done;
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    throw new Error(`${label} is still running after 30 minutes. Import history continues to update automatically.`);
  };
  if (window.EventSource && jobId) {
    try {
      source = new EventSource(`${API}/api/admin/events?jobId=${encodeURIComponent(jobId)}`);
      const result = await new Promise((resolve, reject) => {
        const finish = (fn, value) => {
          if (settled) return;
          settled = true;
          try {
            source && source.close();
          } catch (_) {}
          fn(value);
        };
        source.addEventListener('job.progress', async event => {
          try {
            const p = JSON.parse(event.data || '{}');
            showProgress(p);
            if (onProgress) onProgress(p);
            if (p.status === 'DONE' || p.status === 'FAILED') {
              try {
                const finalState = await readState();
                const final = await finishState(finalState);
                if (final) finish(resolve, final);
              } catch (e) {
                finish(reject, e);
              }
            }
          } catch (e) {
            finish(reject, e);
          }
        });
        source.onerror = () => {
          if (settled) return;
          try {
            source.close();
          } catch (_) {}
          finish(reject, new Error('live progress stream unavailable'));
        };
        fallbackTimer = setTimeout(() => finish(reject, new Error('live progress stream timed out')), 8000);
      });
      clearTimeout(fallbackTimer);
      return result;
    } catch (_) {
      clearTimeout(fallbackTimer);
      if (!settled) try {
        source && source.close();
      } catch (_) {}
    }
  }
  return fallbackPoll();
}
async function upload(file) {
  if (!file) return;
  renderMarkup($('#result'), `<div class="job-progress">
    <strong>Uploading <span>${esc(file.name)}</span></strong>
    <div class="job-progress-track"><div id="upload-progress-fill" class="job-progress-fill"></div></div>
    <div class="job-progress-meta"><span id="upload-progress-label">Preparing upload…</span><strong id="upload-progress-value">0%</strong></div>
  </div>`);
  const fd = new FormData();
  fd.append('file', file);
  try {
    const res = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API}/api/admin/reports/${CURRENT.key}/upload`, true);
      xhr.withCredentials = true;
      xhr.timeout = 5 * 60 * 1000;
      xhr.upload.addEventListener('progress', event => {
        const pct = event.lengthComputable ? Math.round(event.loaded / event.total * 100) : 0;
        const fill = $('#upload-progress-fill'),
          value = $('#upload-progress-value'),
          label = $('#upload-progress-label');
        if (fill) fill.style.width = pct + '%';
        if (value) value.textContent = pct + '%';
        if (label) label.textContent = event.lengthComputable ? `Uploading ${Math.round(event.loaded / 1024 / 1024 * 10) / 10} MB of ${Math.round(event.total / 1024 / 1024 * 10) / 10} MB` : 'Uploading…';
      });
      xhr.addEventListener('load', () => {
        let body = null;
        try {
          body = JSON.parse(xhr.responseText || '{}');
        } catch (_) {}
        if (xhr.status >= 200 && xhr.status < 300) resolve({
          status: xhr.status,
          body
        });else reject(new Error(body?.error || `server error ${xhr.status}`));
      });
      xhr.addEventListener('error', () => reject(new Error('network error while uploading the file')));
      xhr.addEventListener('timeout', () => reject(new Error('upload timed out')));
      xhr.addEventListener('abort', () => reject(new Error('upload cancelled')));
      xhr.send(fd);
    });
    let result = res.body;
    if (res.status === 202 && result?.jobId) {
      result = await pollJob(`${API}/api/admin/upload-jobs/${result.jobId}`, 'Importing');
    }
    LAST_BATCH = result.batchId;
    renderResult(result);
    loadHistory();
  } catch (e) {
    renderMarkup($('#result'), `<div class="banner err">✕ Upload could not complete: ${esc(e.message)}</div>`);
  }
}
function renderCommittedResult(validation, commit) {
  renderMarkup($('#result'), `
    <div class="banner ok">✓ Imported <strong>${esc(validation.rowCount)}</strong> rows successfully. Dashboards are now up to date for <strong>${esc(commit.period || '')}</strong>.</div>
    ${previewTable(validation.preview)}
    <div class="row section-gap"><span class="muted">Inserted ${esc(commit.inserted || 0)} · Updated ${esc(commit.updated || 0)} · Deleted ${esc(commit.deleted || 0)} · Skipped ${esc(commit.skipped || 0)}</span></div>`);
}
function renderResult(res) {
  if (res.status === 'COMMITTED') {
    renderMarkup($('#result'), `
      <div class="banner ok">✓ Imported <strong>${esc(res.rowCount)}</strong> rows successfully. Dashboards are now up to date for <strong>${esc(res.period || '')}</strong>.</div>
      ${previewTable(res.preview)}
      <div class="row section-gap"><span class="muted">Inserted ${esc(res.inserted || 0)} · Updated ${esc(res.updated || 0)} · Deleted ${esc(res.deleted || 0)} · Skipped ${esc(res.skipped || 0)}</span></div>`);
  } else if (res.status === 'VALIDATED') {
    renderMarkup($('#result'), `
      <div class="banner ok">✓ Validated <strong>${esc(res.rowCount)}</strong> rows. The import is ready to commit.</div>
      ${previewTable(res.preview)}
      <div class="row section-gap">
        <button class="btn btn-green" data-react-click="${registerAction(event => {
      commit(`${decodeAttribute(esc(res.batchId))}`);
    })}">Commit & recompute scores</button>
      </div>`);
  } else {
    const rows = res.errors.map(e => `<tr><td>row ${esc(e.row)}</td><td>${esc(e.column)}</td><td><code>${esc(e.value ?? '')}</code></td><td>${esc(e.reason)}</td></tr>`).join('');
    const missing = res.missingColumns.length ? `<div class="muted" style="margin-top:8px;">Missing required columns: <code>${res.missingColumns.join(', ')}</code></div>` : '';
    renderMarkup($('#result'), `
      <div class="banner err">✕ ${esc(res.errorCount)} problem(s) found across ${esc(res.rowCount)} rows. Nothing was loaded. Fix the file and re-upload.</div>
      ${missing}
      <div class="err-list"><table><thead><tr><th>Row</th><th>Column</th><th>Value</th><th>Problem</th></tr></thead><tbody>${rows}</tbody></table></div>`);
  }
}
function previewTable(rows) {
  if (!rows || !rows.length) return '';
  const cols = Object.keys(rows[0]);
  return `<div class="err-list" style="margin-top:12px;"><table><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${cols.map(c => `<td>${r[c] ?? ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
async function commit(batchId) {
  renderMarkup($('#result'), `<div class="banner ok">Committing & recomputing scores…</div>`);
  try {
    const r = await fetch(`${API}/api/admin/batches/${batchId}/commit`, {
      method: 'POST'
    });
    let res = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(res.error || `server error ${r.status}`);

    // Server now returns 202 and commits in the background.
    if (r.status === 202 && res.jobId) {
      res = await pollJob(`${API}/api/admin/commit-jobs/${res.jobId}`, 'Committing');
    }
    renderMarkup($('#result'), `<div class="banner ok">✓ Committed. Recomputed ${res.touchedEmployers?.length || 0} employer dashboard(s) for period <strong>${esc(res.period || '')}</strong>.</div>`);
    loadHistory();
  } catch (e) {
    renderMarkup($('#result'), `<div class="banner err">✕ Commit failed: ${esc(e.message)}. Check Import history before retrying so you do not duplicate the import.</div>`);
  }
}
async function revert(batchId) {
  if (!confirm('Revert this import? Only rows that can be safely rolled back will be removed.')) return;
  try {
    const r = await fetch(`${API}/api/admin/batches/${batchId}/revert`, {
      method: 'POST'
    });
    let d = {};
    try {
      d = await r.json();
    } catch (_) {}
    if (!r.ok) throw new Error(d.error || `Revert failed (HTTP ${r.status})`);
    await loadHistory();
    alert('Import reverted successfully.');
  } catch (e) {
    alert(`Could not revert this import: ${e.message}`);
  }
}
let HISTORY_LOADING = false;
async function loadHistory() {
  if (HISTORY_LOADING) return;
  HISTORY_LOADING = true;
  const body = $('#hist-body');
  try {
    const r = await fetch(`${API}/api/admin/batches`, {
      cache: 'no-store'
    });
    let batches = [];
    try {
      batches = await r.json();
    } catch (_) {}
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    if (!batches.length) {
      renderMarkup(body, '<tr><td colspan="7" class="muted" style="padding:16px 10px;">No imports yet.</td></tr>');
      return;
    }
    renderMarkup(body, batches.map(b => {
      const total = Number(b.rowCount || 0);
      const inserted = Number(b.insertedCount || 0),
        updated = Number(b.updatedCount || 0),
        deleted = Number(b.deletedCount || 0);
      const applied = inserted + updated + deleted;
      const isLiveCommit = b.status === 'VALIDATED' && applied > 0;
      const statusClass = isLiveCommit ? 'COMMITTING' : b.status;
      const statusLabel = isLiveCommit ? 'COMMITTING' : b.status === 'VALIDATED' ? 'VALIDATED · NOT LIVE' : b.status;
      const historicalFeed = ['employees', 'debt_accounts', 'policies'].includes(b.reportKey);
      const authoritative = String(b.uploadedBy || '').includes('(full-refresh)');
      const remainder = b.status === 'COMMITTED' ? Math.max(0, total - applied) : 0;
      let detail = '';
      if (b.status === 'VALIDATED' && applied === 0) detail = `validated · 0 current-projection changes applied yet`;else if (isLiveCommit) detail = `${applied.toLocaleString('en-ZA')} current-projection change(s) applied so far`;else if (b.status === 'COMMITTED' && historicalFeed) detail = `processed from source · +${inserted.toLocaleString('en-ZA')} current new · ~${updated.toLocaleString('en-ZA')} current rewritten · -${deleted.toLocaleString('en-ZA')} deleted · ${remainder.toLocaleString('en-ZA')} dated observation(s) retained in history${authoritative ? ' · authoritative rebuild' : ''}`;else if (b.status === 'COMMITTED') detail = `processed from source · +${inserted.toLocaleString('en-ZA')} new · ~${updated.toLocaleString('en-ZA')} rewritten · -${deleted.toLocaleString('en-ZA')} deleted${remainder > 0 && !authoritative ? ` · ${remainder.toLocaleString('en-ZA')} stale skipped` : ''}${authoritative ? ' · authoritative rebuild' : ''}`;else detail = `rows`;
      return `<tr>
        <td>${(MANIFEST?.reports?.find(x => x.key === b.reportKey) || {}).title || esc(b.reportKey)}</td>
        <td class="muted">${esc(b.filename)}</td>
        <td><strong>${total.toLocaleString('en-ZA')}</strong><span class="history-row-detail ${isLiveCommit ? 'live' : ''}">${esc(detail)}</span></td>
        <td><span class="st ${esc(statusClass)}">${esc(statusLabel)}</span></td>
        <td class="muted">${fmtDate(b.committedAt || b.uploadedAt)}</td>
        <td><a class="btn btn-ghost" style="padding:5px 11px;font-size:12px;display:inline-block;" href="${API}/api/admin/batches/${esc(b.id)}/download" download>Download CSV</a></td>
        <td>${b.status === 'COMMITTED' && b.revertable ? `<button class="btn btn-ghost" style="padding:5px 11px;font-size:12px;" data-react-click="${registerAction(event => {
        revert(`${decodeAttribute(esc(b.id))}`);
      })}">Revert</button>` : b.status === 'COMMITTED' ? `<span class="muted" style="font-size:11px;" title="${esc(b.revertReason || 'This batch cannot be safely reverted.')}">Not reversible</span>` : ''}</td>
      </tr>`;
    }).join(''));
  } catch (e) {
    renderMarkup(body, `<tr><td colspan="7" class="muted" style="padding:16px 10px;color:#b5391f;">Could not load import history: ${esc(e.message)}</td></tr>`);
  } finally {
    HISTORY_LOADING = false;
  }
}
function installCompactCollapse() {
  const ids = ["enterprise-operations-card", "live-integration"];
  ids.forEach(function (id) {
    const card = document.getElementById(id);
    if (!card || card.dataset.collapsibleInstalled) return;
    const head = card.querySelector('.card-hd');
    if (!head) return;
    card.dataset.collapsibleInstalled = '1';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-sm compact-toggle';
    btn.textContent = 'Collapse';
    btn.setAttribute('aria-expanded', 'true');
    btn.onclick = function () {
      const collapsed = card.classList.toggle('compact-collapsed');
      btn.textContent = collapsed ? 'Expand' : 'Collapse';
      btn.setAttribute('aria-expanded', String(!collapsed));
    };
    head.appendChild(btn);
  });
}
onReady(() => boot());
window.setInterval(() => {
  if (document.visibilityState !== 'visible') return;
  loadHistory();
}, 1500);
window.setInterval(() => {
  if (document.visibilityState !== 'visible') return;
  Promise.allSettled([loadAdminSecuritySummary(), loadComplianceSummary()]);
}, 30000);
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
function openCompliancePanel() {
  const el = document.getElementById('compliance-panel');
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
  if (el.style.display === 'block') loadComplianceDetail();
}
function compEsc(v) {
  return esc(v == null ? '' : String(v));
}
async function loadComplianceSummary() {
  try {
    const r = await fetch('/api/admin/compliance/overview', {
      cache: 'no-store'
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    document.getElementById('comp-activities').textContent = String(d.processingActivities || 0);
    document.getElementById('comp-crossborder').textContent = String(d.crossBorderActivities || 0);
    document.getElementById('comp-requests').textContent = String(d.openDataSubjectRequests || 0);
    document.getElementById('comp-incidents').textContent = String(d.openSecurityIncidents || 0);
    document.getElementById('comp-gaps').textContent = String(d.governanceGaps || 0);
    const el = document.getElementById('comp-status');
    el.textContent = d.status === 'ACTION_REQUIRED' ? 'Action required: review governance gaps, overdue data-subject requests and/or open security incidents.' : 'Governance controls are being monitored. Keep the processing register, vendor register and retention schedule current.';
    el.style.color = d.status === 'ACTION_REQUIRED' ? '#b5391f' : '#617486';
  } catch (e) {
    const el = document.getElementById('admin-sec-copy');
    if (el) el.textContent = `Unable to load security posture: ${e.message}`;
  }
}
async function loadComplianceDetail() {
  try {
    const [a, v, r, i, p] = await Promise.all([fetch('/api/admin/compliance/processing-activities').then(x => x.json()), fetch('/api/admin/compliance/vendors').then(x => x.json()), fetch('/api/admin/compliance/requests').then(x => x.json()), fetch('/api/admin/compliance/incidents').then(x => x.json()), fetch('/api/admin/compliance/retention').then(x => x.json())]);
    renderMarkup(document.getElementById('comp-activities-list'), (a || []).slice(0, 8).map(x => `<div class="compliance-item"><strong>${compEsc(x.name)}</strong><small>${compEsc(x.partyRole)} · ${compEsc(x.lawfulBasis)} · PIA: ${compEsc(x.piaStatus)}${x.crossBorder ? ' · cross-border' : ''}</small></div>`).join('') || '<div class="compliance-item">No processing activities recorded yet.</div>');
    renderMarkup(document.getElementById('comp-vendors-list'), (v || []).slice(0, 8).map(x => `<div class="compliance-item"><strong>${compEsc(x.name)}</strong><small>${compEsc(x.country)} · ${x.crossBorder ? 'cross-border' : 'local'} · approved: ${x.approved ? 'yes' : 'no'} · operator agreement: ${x.operatorAgreement ? 'yes' : 'no'}</small></div>`).join('') || '<div class="compliance-item">No vendors recorded yet.</div>');
    renderMarkup(document.getElementById('comp-requests-list'), (r || []).slice(0, 8).map(x => `<div class="compliance-item"><strong>${compEsc(x.requestType)}</strong><small>${compEsc(x.requesterEmail)} · ${compEsc(x.status)} · due: ${x.dueAt ? compEsc(fmtDate(x.dueAt)) : 'not set'}</small></div>`).join('') || '<div class="compliance-item">No data-subject requests recorded.</div>');
    renderMarkup(document.getElementById('comp-retention-list'), (p || []).slice(0, 8).map(x => `<div class="compliance-item"><strong>${compEsc(x.dataClass)}</strong><small>${x.retentionDays ? compEsc(x.retentionDays + ' days') : 'event/purpose based'} · ${compEsc(x.deletionMethod)} · legal hold: ${x.legalHold ? 'yes' : 'no'}</small></div>`).join('') || '<div class="compliance-item">No retention policies recorded.</div>');
    renderMarkup(document.getElementById('comp-incidents-list'), (i || []).slice(0, 8).map(x => `<div class="compliance-item"><strong>${compEsc(x.title)}</strong><small>${compEsc(x.severity)} · ${compEsc(x.status)} · discovered: ${compEsc(fmtDate(x.discoveredAt))}</small></div>`).join('') || '<div class="compliance-item">No open security incidents.</div>');
  } catch (_) {}
}
async function loadEnterpriseOperations() {
  try {
    const [o, q, r, replica] = await Promise.all([fetch('/api/admin/enterprise/overview', {
      cache: 'no-store'
    }).then(x => x.json()), fetch('/api/admin/enterprise/data-quality', {
      cache: 'no-store'
    }).then(x => x.json()), fetch('/api/admin/integration/routes', {
      cache: 'no-store'
    }).then(x => x.json()), fetch('/api/admin/integration/replica-health', {
      cache: 'no-store'
    }).then(x => x.json())]);
    document.getElementById('ops-quality').textContent = (q.score ?? 0).toFixed(1) + '%';
    document.getElementById('ops-source').textContent = o.integration.sourceMode;
    document.getElementById('ops-store').textContent = o.integration.analyticsMode === 'POSTGRES_READ_MODEL' ? 'PostgreSQL' : o.integration.analyticsMode;
    const freshness = o.integration.freshnessState === 'FRESH' ? 'Fresh' : o.integration.freshnessState === 'STALE' ? 'Stale' : 'Unknown';
    document.getElementById('ops-freshness').textContent = freshness;
    document.getElementById('ops-imports').textContent = String(o.imports.open || 0);
    const replicaText = replica.configured ? replica.reachable ? replica.readOnly && replica.lagWithinThreshold !== false ? 'Healthy' : 'Attention' : 'Unreachable' : 'Not configured';
    document.getElementById('ops-architecture').dataset.replica = replicaText;
    const replicaMode = o.integration.sourceAnalyticsUseReplica ? 'read replica' : 'source database';
    renderMarkup(document.getElementById('ops-architecture'), '<strong style="color:var(--brand-primary);">Recommended placement:</strong> ' + esc(o.integration.sourceMode) + ' remains the source of truth. PostgreSQL serves the application read model and governed audit/history. Heavy analytics should run against approved source-side reporting views' + (o.integration.sourceAnalyticsUseReplica ? ' on a read replica' : '') + ' rather than the production source database. ' + (o.integration.sourceAnalyticsEnabled ? 'Source-side analytics is enabled.' : 'Source-side analytics is currently disabled.') + ' No raw SQL is exposed to administrators.');
    renderMarkup(document.getElementById('ops-routes'), (r || []).map(x => '<tr><td><code>' + esc(x.reportKey) + '</code></td><td>' + esc(x.workloadClass || 'POSTGRES_READ_MODEL') + '</td><td>' + esc(x.executionMode) + '</td><td>' + esc(x.sourceView || 'not configured') + '</td><td>' + (x.useReplica ? 'Required' : 'No') + '</td><td>' + (x.enabled ? 'Yes' : 'No') + '</td><td class="muted">' + esc(x.rationale || 'No rationale recorded') + '</td></tr>').join('') || '<tr><td colspan="7" class="muted">No per-feed routes configured. PostgreSQL is used by default.</td></tr>');
    const c = q.checks || {};
    renderMarkup(document.getElementById('ops-quality-detail'), '<div class="compliance-grid">' + '<div class="compliance-box"><h3>Completeness</h3><p>' + esc(c.employeeRecordsChecked || 0) + ' employee records checked. Missing income band: ' + esc(c.employeesMissingIncomeBand || 0) + '. Missing site: ' + esc(c.employeesMissingSite || 0) + '.</p></div>' + '<div class="compliance-box"><h3>Freshness</h3><p>Employees older than 7 days: ' + esc(c.staleEmployeesOver7Days || 0) + '. Salary advances older than 7 days: ' + esc(c.staleSalaryAdvancesOver7Days || 0) + '.</p></div>' + '</div>');
  } catch (e) {
    const el = document.getElementById('ops-architecture');
    if (el) el.textContent = 'Could not load enterprise operations: ' + e.message;
  }
}
function toggleMLOpsAlert() {
  const el = document.getElementById('mlops-alert-detail');
  if (el) el.classList.toggle('open');
}
async function loadMLOpsAlert() {
  const card = document.getElementById('admin-mlops-alert');
  if (!card) return;
  try {
    const r = await fetch('/api/admin/mlops/events?limit=50', {
      cache: 'no-store'
    });
    if (!r.ok) throw new Error('MLOps events unavailable');
    const events = await r.json();
    const latestByReport = new Map();
    for (const e of Array.isArray(events) ? events : []) {
      if (e.eventType !== 'DATA_QUALITY_GATE') continue;
      const reportKey = e.metadata?.reportKey || 'dataset';
      if (!latestByReport.has(reportKey)) latestByReport.set(reportKey, e);
    }
    const latest = [...latestByReport.values()].filter(e => e.status && e.status !== 'PASS');
    const issue = latest.find(e => e.status === 'QUARANTINE') || latest.find(e => e.status === 'REVIEW');
    if (!issue) {
      card.classList.remove('show');
      document.getElementById('mlops-alert-detail')?.classList.remove('open');
      return;
    }
    card.classList.add('show');
    const meta = issue.metadata || {};
    const findings = Array.isArray(meta.findings) ? meta.findings : [];
    const blocking = issue.status === 'QUARANTINE';
    const badge = document.getElementById('mlops-alert-badge');
    if (badge) {
      badge.textContent = blocking ? 'ACTION REQUIRED' : 'REVIEW ONLY';
      badge.style.color = blocking ? '#b5391f' : '#8a5a10';
      badge.style.background = blocking ? '#fdecea' : '#fff8e8';
      badge.style.borderColor = blocking ? '#f3c9c1' : '#efd49b';
    }
    document.getElementById('mlops-alert-summary').textContent = blocking ? `QUARANTINE: ${meta.reportKey || 'incoming dataset'} was blocked before live-table commit. ${meta.findingCount || findings.length || 0} issue(s) require action.` : `REVIEW: ${meta.reportKey || 'incoming dataset'} loaded successfully with ${meta.findingCount || findings.length || 0} advisory warning(s). No rows were blocked.`;
    const detail = document.getElementById('mlops-alert-detail');
    renderMarkup(detail, `<div class="mlops-summary"><strong>What is off:</strong> ${esc(issue.modelKey || 'data-quality')} detected abnormal incoming data.</div>` + (findings.slice(0, 8).map(f => `<div class="mlops-finding"><strong>${esc(f.code || 'DATA_QUALITY')}</strong> · ${esc(f.field || 'dataset')} — ${esc(f.message || 'Review this finding.')}<br><span class="muted"><strong>Fix:</strong> ${esc(f.action || 'Correct the source data and retry the load.')}</span></div>`).join('') || '<div class="mlops-finding">Review the MLOps event metadata for the full diagnostic record.</div>'));
  } catch (_) {}
}
async function loadAdminSecuritySummary() {
  try {
    const r = await fetch('/api/admin/security/overview', {
      cache: 'no-store'
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    document.getElementById('admin-sec-live').textContent = String(d.activeSessions ?? 0);
    document.getElementById('admin-sec-failed').textContent = String(d.failedLogins24h || 0);
    document.getElementById('admin-sec-alerts').textContent = String(d.openAlerts || 0);
    document.getElementById('admin-sec-success').textContent = String(d.successfulLogins24h || 0);
    const el = document.getElementById('admin-sec-copy');
    el.textContent = d.riskState === 'Good' ? 'Security posture is clear. Open the Security & identity centre for active sessions and recent sign-ins.' : 'Attention is required. Review open alerts and recent sign-ins before making further access changes.';
  } catch (_) {}
}
;
;
function toggleChannelPartners() {
  const card = document.getElementById('channel-partners-card');
  if (!card) return;
  const body = card.querySelector('.card-bd'),
    btn = card.querySelector('.card-hd button');
  const collapsed = body.style.display === 'none';
  body.style.display = collapsed ? '' : 'none';
  if (btn) btn.textContent = collapsed ? 'Collapse' : 'Expand';
}
}
