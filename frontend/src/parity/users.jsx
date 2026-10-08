// Ported from New Changes users.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n")}
<div className={siteText("topbar")}><div className={siteText("topbar-inner")}>{siteText("\n  ")}<img src={siteText("/static/logo.png")} alt={siteText("empower-fin Dashboard Portal")} style={{"height":"30px","width":"auto"}} ref={node => { if(node) node.setAttribute("style", "height:30px;width:auto;"); }}/>{siteText("\n  ")}<span className={siteText("pill")}>{siteText("User Management")}</span>{siteText("\n  ")}<div id={siteText("portal-nav")} style={{"marginLeft":"auto"}} ref={node => { if(node) node.setAttribute("style", "margin-left:auto;"); }}/>{siteText("\n  ")}<div id={siteText("portal-account")}/>{siteText("\n")}</div></div>
{siteText("\n\n")}
<div className={siteText("wrap")}>{siteText("\n  ")}<div className={siteText("head")}><h1>{siteText("Users")}</h1><p>{siteText("Create users, set their role, and link them to the employers they may see.")}</p></div>{siteText("\n  ")}<section id={siteText("security-center")} className={siteText("card")} aria-labelledby={siteText("security-center-title")}>{siteText("\n    ")}<div className={siteText("card-hd")}><div><h2 id={siteText("security-center-title")}>{siteText("Security & identity centre")}</h2><div className={siteText("muted")} style={{"marginTop":"4px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:4px;"); }}>{siteText("Live sessions, sign-ins, device context and high-impact admin activity.")}</div></div><button className={siteText("btn btn-sm")} type={siteText("button")} onClick={event => actions[0]?.(event)}>{siteText("Refresh")}</button></div>{siteText("\n    ")}<div className={siteText("card-bd")}>{siteText("\n      ")}<div className={siteText("security-hero")}>{siteText("\n        ")}<div className={siteText("security-summary")}><h2 id={siteText("security-state-title")}>{siteText("Security posture")}</h2><p id={siteText("security-state-copy")}>{siteText("Loading security telemetry...")}</p></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Live sessions")}</div><div className={siteText("v")} id={siteText("sec-live")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Failed logins 24h")}</div><div className={siteText("v")} id={siteText("sec-failed")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Open alerts")}</div><div className={siteText("v")} id={siteText("sec-alerts")}>{siteText("-")}</div></div>{siteText("\n        ")}<div className={siteText("security-stat")}><div className={siteText("k")}>{siteText("Successful logins 24h")}</div><div className={siteText("v")} id={siteText("sec-success")}>{siteText("-")}</div></div>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("security-tools")}>{siteText("\n        ")}<input id={siteText("sec-search")} placeholder={siteText("Search users, email, IP or location")} onInput={event => actions[1]?.(event)}/>{siteText("\n        ")}<select id={siteText("sec-status")}><option value={siteText("active")}>{siteText("Live sessions")}</option><option value={siteText("")}>{siteText("All sessions")}</option><option value={siteText("ended")}>{siteText("Ended sessions")}</option></select>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("security-grid")}>{siteText("\n        ")}<div>{siteText("\n          ")}<h3 style={{"fontSize":"12px","color":"var(--brand-primary)","margin":"4px 0 8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;color:var(--brand-primary);margin:4px 0 8px;"); }}>{siteText("Live session monitor")}</h3>{siteText("\n          ")}<div className={siteText("security-table-wrap")}><table className={siteText("security-table")}><thead><tr><th>{siteText("User")}</th><th>{siteText("Device")}</th><th>{siteText("Location")}</th><th>{siteText("Last seen")}</th><th>{siteText("Session age")}</th><th/></tr></thead><tbody id={siteText("sec-session-rows")}><tr><td colSpan={siteText("6")} className={siteText("security-empty")}>{siteText("Loading...")}</td></tr></tbody></table></div>{siteText("\n        ")}</div>{siteText("\n        ")}<div>{siteText("\n          ")}<h3 style={{"fontSize":"12px","color":"var(--brand-primary)","margin":"4px 0 8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;color:var(--brand-primary);margin:4px 0 8px;"); }}>{siteText("Security alerts")}</h3>{siteText("\n          ")}<div className={siteText("security-table-wrap")}><table><thead><tr><th>{siteText("Severity")}</th><th>{siteText("Alert")}</th><th>{siteText("When")}</th><th/></tr></thead><tbody id={siteText("sec-alert-rows")}><tr><td colSpan={siteText("4")} className={siteText("security-empty")}>{siteText("Loading...")}</td></tr></tbody></table></div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<div style={{"marginTop":"16px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;"); }}>{siteText("\n        ")}<h3 style={{"fontSize":"12px","color":"var(--brand-primary)","margin":"4px 0 8px"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;color:var(--brand-primary);margin:4px 0 8px;"); }}>{siteText("Recent sign-ins")}</h3>{siteText("\n        ")}<div className={siteText("security-table-wrap")}><table className={siteText("security-table")}><thead><tr><th>{siteText("Time")}</th><th>{siteText("User")}</th><th>{siteText("Result")}</th><th>{siteText("Device")}</th><th>{siteText("Location")}</th><th>{siteText("IP")}</th></tr></thead><tbody id={siteText("sec-login-rows")}><tr><td colSpan={siteText("6")} className={siteText("security-empty")}>{siteText("Loading...")}</td></tr></tbody></table></div>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("security-panel")} style={{"marginTop":"18px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:18px;"); }}>{siteText("\n        ")}<div className={siteText("security-panel-head")}>{siteText("\n          ")}<div><h3>{siteText("Device intelligence")}</h3><div className={siteText("security-panel-note")}>{siteText("Grouped device history stays separate from the audit table so long locations and browser details cannot collide.")}</div></div>{siteText("\n        ")}</div>{siteText("\n        ")}<div className={siteText("security-table-wrap")} style={{"marginTop":"10px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:10px;"); }}><table className={siteText("security-table")}><thead><tr><th>{siteText("User")}</th><th>{siteText("Device")}</th><th>{siteText("Approx. location")}</th><th>{siteText("IP")}</th><th>{siteText("First seen")}</th><th>{siteText("Last seen")}</th></tr></thead><tbody id={siteText("sec-device-rows")}><tr><td colSpan={siteText("6")} className={siteText("security-empty")}>{siteText("Loading...")}</td></tr></tbody></table></div>{siteText("\n      ")}</div>{siteText("\n\n      ")}<div className={siteText("security-panel")} style={{"marginTop":"16px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;"); }}>{siteText("\n        ")}<div className={siteText("security-panel-head")}>{siteText("\n          ")}<div><h3>{siteText("Sensitive data access")}</h3><div className={siteText("security-panel-note")}>{siteText("Top 5 most critical protected-API access events. The full security audit export includes admin actions, data access, sign-ins and security alerts.")}</div></div>{siteText("\n          ")}<div className={siteText("security-panel-actions")}>{siteText("\n            ")}<span className={siteText("chip")}>{siteText("Top 5 critical events")}</span>{siteText("\n            ")}<button className={siteText("btn btn-sm")} type={siteText("button")} onClick={event => actions[2]?.(event)}>{siteText("Download full audit log")}</button>{siteText("\n          ")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<div className={siteText("security-table-wrap")} style={{"marginTop":"10px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:10px;"); }}><table className={siteText("security-table")}><thead><tr><th>{siteText("Time")}</th><th>{siteText("Actor")}</th><th>{siteText("Resource")}</th><th>{siteText("Route")}</th><th>{siteText("Status")}</th></tr></thead><tbody id={siteText("sec-access-rows")}><tr><td colSpan={siteText("5")} className={siteText("security-empty")}>{siteText("Loading...")}</td></tr></tbody></table></div>{siteText("\n      ")}</div>{siteText("\n\n      ")}<div className={siteText("security-governance-grid")} style={{"marginTop":"16px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;"); }}>{siteText("\n        ")}<div className={siteText("security-panel")}>{siteText("\n          ")}<div className={siteText("security-panel-head")}>{siteText("\n            ")}<div><h3>{siteText("Data governance")}</h3><div className={siteText("security-panel-note")}>{siteText("Controls shown here are application-level controls. Database, contract and regulatory requirements still need their own review.")}</div></div>{siteText("\n          ")}</div>{siteText("\n          ")}<div className={siteText("security-control-list")}>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("Protected API access")}</strong><span>{siteText("Audited without request bodies")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("Admin audit trail")}</strong><span>{siteText("Admin changes recorded with actor and target context")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("Audit export")}</strong><span>{siteText("Admin-only CSV download")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("Raw database SQL")}</strong><span>{siteText("Not exposed through the admin UI")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("IP geolocation")}</strong><span>{siteText("Approximate location, cached for 7 days")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("Payload minimisation")}</strong><span>{siteText("Access logging does not store request bodies")}</span></div>{siteText("\n          ")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<div className={siteText("security-panel")}>{siteText("\n          ")}<div className={siteText("security-panel-head")}>{siteText("\n            ")}<div><h3>{siteText("Cyber security operations")}</h3><div className={siteText("security-panel-note")}>{siteText("Detection and response controls currently active in the application.")}</div></div>{siteText("\n          ")}</div>{siteText("\n          ")}<div className={siteText("security-control-list")}>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("Session control")}</strong><span>{siteText("Individual and all-session revocation")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("New device detection")}</strong><span>{siteText("Alerts on previously unseen device context")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("New location detection")}</strong><span>{siteText("Alerts on changed IP-derived geography")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("Login burst detection")}</strong><span>{siteText("Repeated failures create security alerts")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("API rate limiting")}</strong><span>{siteText("Authentication and API requests are throttled")}</span></div>{siteText("\n            ")}<div className={siteText("security-control")}><strong>{siteText("Security headers")}</strong><span>{siteText("Browser isolation and transport protections enabled")}</span></div>{siteText("\n          ")}</div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}<div style={{"marginTop":"16px","padding":"14px","border":"1px solid #e8e1f7","borderRadius":"10px","background":"linear-gradient(135deg,#fbf9ff,#fff)"}} ref={node => { if(node) node.setAttribute("style", "margin-top:16px;padding:14px;border:1px solid #e8e1f7;border-radius:10px;background:linear-gradient(135deg,#fbf9ff,#fff);"); }}>{siteText("\n        ")}<div style={{"display":"flex","justifyContent":"space-between","gap":"12px","alignItems":"flex-start","flexWrap":"wrap"}} ref={node => { if(node) node.setAttribute("style", "display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap;"); }}>{siteText("\n          ")}<div><h3 style={{"fontSize":"12px","color":"var(--brand-primary)","margin":"0 0 5px"}} ref={node => { if(node) node.setAttribute("style", "font-size:12px;color:var(--brand-primary);margin:0 0 5px;"); }}>{siteText("Database security controls")}</h3><div id={siteText("sec-db-copy")} className={siteText("muted")}>{siteText("Checking application database controls...")}</div></div>{siteText("\n          ")}<div id={siteText("sec-db-status")} className={siteText("tag pend")}>{siteText("Checking")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<div id={siteText("sec-db-controls")} style={{"display":"flex","gap":"8px","flexWrap":"wrap","marginTop":"10px"}} ref={node => { if(node) node.setAttribute("style", "display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;"); }}/>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}<div className={siteText("card")}>{siteText("\n    ")}<div className={siteText("card-hd")}><h2>{siteText("Add a user")}</h2></div>{siteText("\n    ")}<div className={siteText("card-bd")}>{siteText("\n      ")}<div className={siteText("row2")}>{siteText("\n        ")}<div><label>{siteText("Full name")}</label><input id={siteText("n-name")} placeholder={siteText("Jane Smith")}/></div>{siteText("\n        ")}<div><label>{siteText("Email")}</label><input id={siteText("n-email")} type={siteText("email")} placeholder={siteText("jane@company.com")}/></div>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("row2")}>{siteText("\n        ")}<div>{siteText("\n          ")}<label>{siteText("Access")}</label>{siteText("\n          ")}<div className={siteText("radio-row")} style={{"display":"grid","gridTemplateColumns":"repeat(2,minmax(0,1fr))","gap":"8px"}} ref={node => { if(node) node.setAttribute("style", "display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;"); }}>{siteText("\n            ")}<label><input type={siteText("radio")} name={siteText("n-role-choice")} id={siteText("n-access-employer")} defaultValue={siteText("EMPLOYER_MANAGER")} defaultChecked={true} onChange={event => actions[3]?.(event)}/>{siteText(" Employer Manager")}</label>{siteText("\n            ")}<label><input type={siteText("radio")} name={siteText("n-role-choice")} id={siteText("n-access-portfolio")} defaultValue={siteText("PORTFOLIO_MANAGER")} onChange={event => actions[4]?.(event)}/>{siteText(" Portfolio Manager")}</label>{siteText("\n            ")}<label><input type={siteText("radio")} name={siteText("n-role-choice")} id={siteText("n-access-viewer")} defaultValue={siteText("VIEWER")} onChange={event => actions[5]?.(event)}/>{siteText(" Viewer")}</label>{siteText("\n            ")}<span id={siteText("n-admin-access")}/>{siteText("\n            ")}<span id={siteText("n-superadmin-access")}/>{siteText("\n          ")}</div>{siteText("\n          ")}<select id={siteText("n-role")} onChange={event => actions[6]?.(event)} style={{"display":"none"}} ref={node => { if(node) node.setAttribute("style", "display:none"); }} aria-hidden={siteText("true")}>{siteText("\n            ")}<option value={siteText("EMPLOYER_MANAGER")}>{siteText("Employer Manager")}</option>{siteText("\n            ")}<option value={siteText("PORTFOLIO_MANAGER")}>{siteText("Portfolio Manager")}</option>{siteText("\n            ")}<option value={siteText("VIEWER")}>{siteText("Viewer")}</option>{siteText("\n            ")}<option value={siteText("ADMIN")}>{siteText("Admin")}</option>{siteText("\n          ")}</select>{siteText("\n          ")}<div className={siteText("muted")} style={{"fontSize":"11px","marginTop":"6px"}} ref={node => { if(node) node.setAttribute("style", "font-size:11px;margin-top:6px;"); }}>{siteText("Admin includes the operational access above. Portfolio access includes employer dashboard access.")}</div>{siteText("\n        ")}</div>{siteText("\n        ")}<div>{siteText("\n          ")}<label>{siteText("How they get access")}</label>{siteText("\n          ")}<div className={siteText("radio-row")}>{siteText("\n            ")}<label><input type={siteText("radio")} name={siteText("access")} defaultValue={siteText("temp")} defaultChecked={true} onChange={event => actions[7]?.(event)}/>{siteText(" Set a temp password")}</label>{siteText("\n            ")}<label><input type={siteText("radio")} name={siteText("access")} defaultValue={siteText("link")} onChange={event => actions[8]?.(event)}/>{siteText(" Send a set-password link")}</label>{siteText("\n          ")}</div>{siteText("\n          ")}<input id={siteText("n-pass")} type={siteText("text")} placeholder={siteText("temporary password")} style={{"marginTop":"8px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:8px;"); }}/>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n      ")}<div id={siteText("emp-wrap")}>{siteText("\n        ")}<label>{siteText("Linked employers ")}<span className={siteText("muted")} id={siteText("emp-hint")}>{siteText("(which employers this user may see)")}</span></label>{siteText("\n        ")}<div className={siteText("emp-pick")} id={siteText("emp-pick")}><span className={siteText("muted")}>{siteText("Loading employers…")}</span></div>{siteText("\n      ")}</div>{siteText("\n      ")}<div style={{"marginTop":"14px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:14px;"); }}>{siteText("\n        ")}<label>{siteText("Channel partner ")}<span className={siteText("muted")}>{siteText("(applies their branding — optional)")}</span></label>{siteText("\n        ")}<select id={siteText("n-partner")}><option value={siteText("")}>{siteText("None (standard empower-fin branding)")}</option></select>{siteText("\n      ")}</div>{siteText("\n      ")}<button className={siteText("btn btn-primary")} style={{"marginTop":"18px"}} ref={node => { if(node) node.setAttribute("style", "margin-top:18px;"); }} onClick={event => actions[9]?.(event)}>{siteText("Create user")}</button>{siteText("\n      ")}<div className={siteText("msg")} id={siteText("add-msg")}/>{siteText("\n      ")}<div className={siteText("link-box")} id={siteText("link-box")}/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div id={siteText("user-list-card")} className={siteText("card")}>{siteText("\n    ")}<div className={siteText("card-hd")}><h2>{siteText("Existing users")}</h2></div>{siteText("\n    ")}<div className={siteText("card-bd")} style={{"padding":"6px 10px 12px"}} ref={node => { if(node) node.setAttribute("style", "padding:6px 10px 12px;"); }}>{siteText("\n      ")}<table><thead><tr><th>{siteText("Name")}</th><th>{siteText("Email")}</th><th>{siteText("Role")}</th><th>{siteText("Employers")}</th><th>{siteText("Partner")}</th><th>{siteText("Status")}</th><th/></tr></thead>{siteText("\n      ")}<tbody id={siteText("user-rows")}><tr><td colSpan={siteText("6")} className={siteText("muted")} style={{"padding":"16px"}} ref={node => { if(node) node.setAttribute("style", "padding:16px;"); }}>{siteText("Loading…")}</td></tr></tbody></table>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div id={siteText("revoked-users-card")} className={siteText("card")} style={{"borderColor":"#f3c9c0"}} ref={node => { if(node) node.setAttribute("style", "border-color:#f3c9c0;"); }}>{siteText("\n    ")}<div className={siteText("card-hd")} style={{"borderBottomColor":"#fbe4df"}} ref={node => { if(node) node.setAttribute("style", "border-bottom-color:#fbe4df;"); }}><h2 style={{"color":"#b5391f"}} ref={node => { if(node) node.setAttribute("style", "color:#b5391f;"); }}>{siteText("Past users")}</h2><div className={siteText("note")} style={{"marginLeft":"10px","color":"#8497a7","fontSize":"12px"}} ref={node => { if(node) node.setAttribute("style", "margin-left:10px;color:#8497a7;font-size:12px;"); }}>{siteText("Who once had access, and why it ended · admin-only")}</div></div>{siteText("\n    ")}<div className={siteText("card-bd")} style={{"padding":"6px 10px 12px"}} ref={node => { if(node) node.setAttribute("style", "padding:6px 10px 12px;"); }}>{siteText("\n      ")}<table><thead><tr><th>{siteText("User")}</th><th>{siteText("Role")}</th><th>{siteText("Reason")}</th><th>{siteText("Revoked by")}</th><th>{siteText("Date")}</th><th/></tr></thead>{siteText("\n      ")}<tbody id={siteText("revoked-rows")}><tr><td colSpan={siteText("6")} className={siteText("muted")} style={{"padding":"16px"}} ref={node => { if(node) node.setAttribute("style", "padding:16px;"); }}>{siteText("Loading…")}</td></tr></tbody></table>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n")}</div>
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
  loadSecurityCenter();
},
event => {
  renderSecuritySessions();
},
event => {
  downloadSecurityAuditLog();
},
event => {
  syncRoleSelection();
},
event => {
  syncRoleSelection();
},
event => {
  syncRoleSelection();
},
event => {
  onRoleChange();
},
event => {
  onAccessChange();
},
event => {
  onAccessChange();
},
event => {
  addUser();
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
(function () {
  "use strict";

  const $ = window.$ || function (s) {
    return document.querySelector(s);
  };
  const getJson = window.getJson || async function (url, options) {
    const r = await fetch(url, Object.assign({
      cache: "no-store"
    }, options || {}));
    const d = await r.json().catch(function () {
      return null;
    });
    if (r.status === 401) {
      location.href = "/login";
      throw new Error("Session expired");
    }
    if (!r.ok) throw new Error(d && d.error || "Request failed (" + r.status + ")");
    return d;
  };
  const esc = window.escHtml || function (v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[ch];
    });
  };
  window.SECURITY_SESSIONS = [];
  window.SECURITY_ALERTS = [];
  window.SECURITY_LOGINS = [];
  window.SESSION_SUMMARY = new Map();
  window.SECURITY_DEVICES = [];
  window.SECURITY_ACCESS = [];
  window.formatAge = function (seconds) {
    seconds = Math.max(0, Number(seconds) || 0);
    const d = Math.floor(seconds / 86400),
      h = Math.floor(seconds % 86400 / 3600),
      m = Math.floor(seconds % 3600 / 60);
    if (d) return d + "d " + h + "h";
    if (h) return h + "h " + m + "m";
    return m + "m";
  };
  window.timeAgo = function (value) {
    if (!value) return "No activity";
    const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
    if (seconds < 60) return "just now";
    if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
    if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
    return Math.floor(seconds / 86400) + "d ago";
  };
  function installUserTools() {
    const rows = document.querySelector("#user-rows");
    if (!rows || document.querySelector("#user-admin-search")) return;
    const table = rows.closest("table");
    if (!table) return;
    const bar = document.createElement("div");
    bar.className = "security-tools";
    bar.style.margin = "8px 0";
    renderMarkup(bar, '<input id="user-admin-search" placeholder="Search users by name, email or role"><select id="user-admin-status"><option value="">All status</option><option value="active">Active</option><option value="pending">Pending setup</option><option value="disabled">Disabled</option></select>');
    table.parentElement.insertBefore(bar, table);
    const filter = function () {
      const q = (document.querySelector("#user-admin-search")?.value || "").toLowerCase().trim();
      const status = document.querySelector("#user-admin-status")?.value || "";
      Array.from(rows.querySelectorAll("tr")).forEach(function (tr) {
        const text = tr.textContent.toLowerCase();
        let state = "";
        const tag = tr.querySelector(".tag");
        if (tag) state = tag.textContent.toLowerCase().includes("pending") ? "pending" : tag.textContent.toLowerCase().includes("disabled") ? "disabled" : "active";
        tr.style.display = (!q || text.includes(q)) && (!status || status === state) ? "" : "none";
      });
    };
    bar.querySelector("#user-admin-search").addEventListener("input", filter);
    bar.querySelector("#user-admin-status").addEventListener("change", filter);
  }
  function decorateUserRows() {
    const users = window.USERS || [];
    users.forEach(function (u) {
      const row = document.querySelector("#row-" + CSS.escape(u.id));
      if (!row) return;
      const actionCell = row.lastElementChild;
      if (!actionCell) return;
      // The main users renderer already owns the Security action. Do not
      // inject a second button when the security telemetry refreshes.
      const existing = Array.from(actionCell.querySelectorAll("button")).find(function (btn) {
        return (btn.textContent || "").trim().toLowerCase() === "security";
      });
      if (existing) return;
      const btn = document.createElement("button");
      btn.className = "btn btn-sm";
      btn.type = "button";
      btn.textContent = "Security";
      btn.setAttribute("data-security-user", u.id);
      btn.addEventListener("click", function () {
        window.viewUserSecurity(u.id);
      });
      actionCell.insertBefore(btn, actionCell.firstChild);
    });
  }
  async function loadSecurityCenter() {
    try {
      const status = $("#sec-status") && $("#sec-status").value || "active";
      const data = await Promise.all([getJson("/api/admin/security/overview"), getJson("/api/admin/security/sessions?status=" + encodeURIComponent(status) + "&limit=100"), getJson("/api/admin/security/alerts?status=OPEN&limit=50"), getJson("/api/admin/security/logins?limit=80"), getJson("/api/admin/security/devices?limit=300"), getJson("/api/admin/security/data-access?limit=50"), getJson("/api/admin/security/database")]);
      const overview = data[0] || {};
      window.SECURITY_SESSIONS = Array.isArray(data[1]) ? data[1] : [];
      window.SECURITY_ALERTS = Array.isArray(data[2]) ? data[2] : [];
      window.SECURITY_LOGINS = Array.isArray(data[3]) ? data[3] : [];
      window.SECURITY_DEVICES = Array.isArray(data[4]) ? data[4] : [];
      window.SECURITY_ACCESS = Array.isArray(data[5]) ? data[5] : [];
      window.SECURITY_ACCESS.sort(function (a, b) {
        const rank = {
          CRITICAL: 0,
          HIGH: 1,
          MEDIUM: 2,
          LOW: 3
        };
        return (rank[String(a.severity || a.risk || "LOW").toUpperCase()] ?? 4) - (rank[String(b.severity || b.risk || "LOW").toUpperCase()] ?? 4) || new Date(b.createdAt || b.at || 0) - new Date(a.createdAt || a.at || 0);
      });
      window.SECURITY_ACCESS = window.SECURITY_ACCESS.slice(0, 5);
      window.SESSION_SUMMARY = new Map();
      window.SECURITY_SESSIONS.forEach(function (s) {
        const prev = window.SESSION_SUMMARY.get(s.user.id) || {
          count: 0,
          lastSeenAt: null
        };
        prev.count += 1;
        if (!prev.lastSeenAt || new Date(s.lastSeenAt) > new Date(prev.lastSeenAt)) prev.lastSeenAt = s.lastSeenAt;
        window.SESSION_SUMMARY.set(s.user.id, prev);
      });
      if ($("#sec-live")) $("#sec-live").textContent = String(overview.activeSessions ?? window.SECURITY_SESSIONS.filter(function (s) {
        return s.active;
      }).length);
      if ($("#sec-failed")) $("#sec-failed").textContent = String(overview.failedLogins24h ?? 0);
      if ($("#sec-alerts")) $("#sec-alerts").textContent = String(overview.openAlerts ?? window.SECURITY_ALERTS.length);
      if ($("#sec-success")) $("#sec-success").textContent = String(overview.successfulLogins24h ?? 0);
      const state = overview.riskState || "Good";
      if ($("#security-state-title")) $("#security-state-title").textContent = "Security posture: " + state;
      if ($("#security-state-copy")) $("#security-state-copy").textContent = state === "Good" ? "No open security alerts and no unusual sign-in volume detected." : state === "Watch" ? "Sign-in activity needs review. Check failed logins and recent sessions." : "One or more security alerts need attention. Review before making access changes.";
      renderSecuritySessions();
      renderSecurityAlerts();
      renderSecurityLogins();
      renderSecurityDevices();
      renderSecurityAccess();
      renderDatabaseSecurity(data[6] || {});
      installUserTools();
      decorateUserRows();
    } catch (error) {
      console.error("[users] security load failed", error);
      const copy = $("#security-state-copy");
      if (copy) copy.textContent = error.message || "Security telemetry could not be loaded.";
    }
  }
  function renderSecuritySessions() {
    const rows = $("#sec-session-rows");
    if (!rows) return;
    const q = ($("#sec-search") && $("#sec-search").value || "").trim().toLowerCase();
    const filtered = window.SECURITY_SESSIONS.filter(function (s) {
      return [s.user?.name, s.user?.email, s.ipAddress, s.location, s.browser, s.operatingSystem].join(" ").toLowerCase().includes(q);
    });
    if (!filtered.length) {
      renderMarkup(rows, '<tr><td colspan="6" class="security-empty">No matching sessions.</td></tr>');
      return;
    }
    renderMarkup(rows, filtered.map(function (s) {
      return `<tr>
        <td><b>${esc(s.user?.name)}</b><div class="meta">${esc(s.user?.email)}</div></td>
        <td><span class="device">${esc(s.deviceType)}</span><div class="meta">${esc(s.browser)} · ${esc(s.operatingSystem)}</div></td>
        <td class="security-location">${esc(s.location)}<div class="meta">${esc(s.ipAddress || "IP unavailable")}</div></td>
        <td class="muted">${esc(window.timeAgo(s.lastSeenAt))}</td>
        <td class="muted">${esc(window.formatAge(s.durationSeconds))}</td>
        <td><button class="btn btn-sm" type="button" data-revoke-session="${esc(s.id)}" data-user-name="${esc(s.user?.name)}">Log out</button></td>
      </tr>`;
    }).join(""));
    rows.querySelectorAll("[data-revoke-session]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.revokeSession(btn.getAttribute("data-revoke-session"), btn.getAttribute("data-user-name"));
      });
    });
  }
  function renderSecurityAlerts() {
    const rows = $("#sec-alert-rows");
    if (!rows) return;
    if (!window.SECURITY_ALERTS.length) {
      renderMarkup(rows, '<tr><td colspan="4" class="security-empty">No open security alerts.</td></tr>');
      return;
    }
    renderMarkup(rows, window.SECURITY_ALERTS.map(function (a) {
      const cls = a.severity === "CRITICAL" || a.severity === "HIGH" ? "off" : "pend";
      return `<tr><td><span class="tag ${cls}">${esc(a.severity)}</span></td>
        <td><b>${esc(a.title)}</b><div class="meta">${esc(a.summary)}</div></td>
        <td class="muted">${esc(window.timeAgo(a.createdAt))}</td>
        <td><button class="btn btn-sm" type="button" data-resolve-alert="${esc(a.id)}">Resolve</button></td></tr>`;
    }).join(""));
    rows.querySelectorAll("[data-resolve-alert]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.resolveAlert(btn.getAttribute("data-resolve-alert"));
      });
    });
  }
  function renderSecurityDevices() {
    const rows = $("#sec-device-rows");
    if (!rows) return;
    if (!window.SECURITY_DEVICES.length) {
      renderMarkup(rows, '<tr><td colspan="6" class="security-empty">No grouped device history yet.</td></tr>');
      return;
    }
    renderMarkup(rows, window.SECURITY_DEVICES.slice(0, 100).map(function (d) {
      const loc = [d.city, d.region, d.country].filter(Boolean).join(", ") || "Location unavailable";
      return '<tr><td><b>' + esc(d.user?.name) + '</b><div class="meta">' + esc(d.user?.email) + '</div></td>' + '<td>' + esc(d.deviceType) + '<div class="meta">' + esc(d.browser) + ' · ' + esc(d.operatingSystem) + '</div></td>' + '<td>' + esc(loc) + '</td><td class="muted">' + esc(d.ipAddress || "Unavailable") + '</td>' + '<td class="muted">' + esc(new Date(d.firstSeenAt).toLocaleString()) + '</td><td class="muted">' + esc(window.timeAgo(d.lastSeenAt)) + '</td></tr>';
    }).join(""));
  }
  function renderSecurityAccess() {
    const rows = $("#sec-access-rows");
    if (!rows) return;
    if (!window.SECURITY_ACCESS.length) {
      renderMarkup(rows, '<tr><td colspan="5" class="security-empty">No sensitive data access events recorded yet.</td></tr>');
      return;
    }
    renderMarkup(rows, window.SECURITY_ACCESS.slice(0, 20).map(function (a) {
      return '<tr><td class="muted">' + esc(new Date(a.createdAt).toLocaleString()) + '</td>' + '<td><b>' + esc(a.actorEmail || "Unknown") + '</b></td><td>' + esc(a.resource || "Protected data") + '</td>' + '<td class="muted">' + esc(a.method + " " + a.route) + '</td><td>' + esc(String(a.statusCode || "")) + '</td></tr>';
    }).join(""));
  }
  function renderDatabaseSecurity(d) {
    const copy = $("#sec-db-copy"),
      status = $("#sec-db-status"),
      controls = $("#sec-db-controls");
    if (!copy || !status || !controls) return;
    if (d.status !== "healthy") {
      status.textContent = "Attention";
      status.className = "tag off";
      copy.textContent = d.error || "Database security telemetry is unavailable.";
      renderMarkup(controls, "");
      return;
    }
    status.textContent = "Healthy";
    status.className = "tag live";
    const mb = Math.round((Number(d.sizeBytes) || 0) / 1048576);
    copy.textContent = "PostgreSQL is responding. " + (Number(d.connections) || 0) + " total connection(s), " + (Number(d.activeConnections) || 0) + " active. Database size: " + mb + " MB.";
    renderMarkup(controls, [["✓", "Raw SQL from admin UI disabled"], ["✓", "Destructive database actions disabled"], ["✓", "Sensitive API access audited"], ["✓", "Session revocation enabled"], ["✓", "Security alerts enabled"]].map(function (x) {
      return '<span class="chip">' + x[0] + " " + x[1] + '</span>';
    }).join(""));
  }
  function renderSecurityLogins() {
    const rows = $("#sec-login-rows");
    if (!rows) return;
    renderMarkup(rows, window.SECURITY_LOGINS.map(function (l) {
      return `<tr>
        <td class="muted">${esc(new Date(l.createdAt).toLocaleString())}</td>
        <td><b>${esc(l.email)}</b></td>
        <td>${l.success ? '<span class="tag live">Success</span>' : '<span class="tag off">Failed</span>'}${l.failureReason ? '<div class="meta">' + esc(l.failureReason) + '</div>' : ""}</td>
        <td>${esc(l.deviceType || "Unknown")}<div class="meta">${esc(l.browser || "Unknown")} · ${esc(l.operatingSystem || "Unknown")}</div></td>
        <td>${esc([l.city, l.region, l.country].filter(Boolean).join(", ") || "Location unavailable")}</td>
        <td class="muted">${esc(l.ipAddress || "Unavailable")}</td>
      </tr>`;
    }).join("") || '<tr><td colspan="6" class="security-empty">No sign-in history yet.</td></tr>');
  }
  window.downloadSecurityAuditLog = function () {
    // The server performs the admin authorization check and creates the CSV
    // without exposing request bodies or authentication secrets.
    window.location.href = "/api/admin/security/audit-log.csv";
  };
  window.revokeAllUserSessions = async function (id, name) {
    if (!confirm("Log out " + name + " from every active session?")) return;
    const r = await fetch("/api/admin/users/" + encodeURIComponent(id) + "/revoke-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reason: "Revoked by admin from Security and Identity Centre"
      })
    });
    const d = await r.json().catch(function () {
      return {};
    });
    if (!r.ok) {
      alert(d.error || "Could not revoke the user sessions.");
      return;
    }
    await loadSecurityCenter();
    alert((d.revokedCount || 0) + " active session(s) logged out.");
  };
  window.revokeSession = async function (id, name) {
    if (!confirm("Log out " + name + " from this session?")) return;
    const r = await fetch("/api/admin/security/sessions/" + encodeURIComponent(id) + "/revoke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reason: "Revoked by admin from Security and Identity Centre"
      })
    });
    const d = await r.json().catch(function () {
      return {};
    });
    if (!r.ok) {
      alert(d.error || "Could not revoke the session.");
      return;
    }
    await loadSecurityCenter();
  };
  window.resolveAlert = async function (id) {
    const r = await fetch("/api/admin/security/alerts/" + encodeURIComponent(id) + "/resolve", {
      method: "POST"
    });
    if (!r.ok) {
      alert("Could not resolve the security alert.");
      return;
    }
    await loadSecurityCenter();
  };
  window.viewUserSecurity = async function (id) {
    try {
      const data = await Promise.all([getJson("/api/admin/security/sessions?userId=" + encodeURIComponent(id) + "&limit=100"), getJson("/api/admin/security/logins?userId=" + encodeURIComponent(id) + "&limit=100")]);
      const sessions = Array.isArray(data[0]) ? data[0] : [];
      const logins = Array.isArray(data[1]) ? data[1] : [];
      const user = (window.USERS || []).find(function (u) {
        return u.id === id;
      });
      if (!user) return;
      const back = document.createElement("div");
      back.className = "security-drawer-back";
      const liveCount = sessions.filter(function (s) {
        return s.active;
      }).length;
      const sessionRows = sessions.map(function (s) {
        return `<tr><td>${s.active ? '<span class="tag live">live</span>' : '<span class="tag off">ended</span>'}</td>
          <td>${esc(s.deviceType)}<div class="meta">${esc(s.browser)} · ${esc(s.operatingSystem)}</div></td>
          <td>${esc(s.location)}<div class="meta">${esc(s.ipAddress || "")}</div></td>
          <td>${esc(new Date(s.createdAt).toLocaleString())}</td>
          <td>${esc(window.timeAgo(s.lastSeenAt))}</td>
          <td>${s.active ? '<button class="btn btn-sm" type="button" data-drawer-revoke="' + esc(s.id) + '">Log out</button>' : ""}</td></tr>`;
      }).join("");
      const loginRows = logins.slice(0, 40).map(function (l) {
        return `<tr><td>${esc(new Date(l.createdAt).toLocaleString())}</td>
          <td>${l.success ? '<span class="tag live">Success</span>' : '<span class="tag off">Failed</span>'}</td>
          <td>${esc(l.deviceType || "Unknown")}<div class="meta">${esc(l.browser || "")} · ${esc(l.operatingSystem || "")}</div></td>
          <td>${esc([l.city, l.region, l.country].filter(Boolean).join(", ") || "Location unavailable")}</td>
          <td>${esc(l.ipAddress || "")}</td></tr>`;
      }).join("");
      renderMarkup(back, `<div class="security-drawer" role="dialog" aria-modal="true">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:18px">
          <div><div class="muted">Security profile</div><h2 style="font:600 24px Fraunces,serif;color:var(--brand-primary);margin:2px 0 4px">${esc(user.name)}</h2><div class="muted">${esc(user.email)}</div></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end"><button class="btn btn-sm" type="button" data-revoke-all>Log out all sessions</button><button class="btn btn-sm" type="button" data-close-security>Close</button></div>
        </div>
        <div class="security-detail-grid">
          <div class="security-detail"><div class="k">Role</div><div class="v">${esc(String(user.role || "").replace("_", " "))}</div></div>
          <div class="security-detail"><div class="k">Account</div><div class="v">${user.active ? "Active" : "Disabled"}</div></div>
          <div class="security-detail"><div class="k">Live sessions</div><div class="v">${liveCount}</div></div>
          <div class="security-detail"><div class="k">Last login</div><div class="v">${logins[0] ? esc(new Date(logins[0].createdAt).toLocaleString()) : "No login recorded"}</div></div>
        </div>
        <h3 style="margin:20px 0 8px;font-size:12px;color:var(--brand-primary)">Sessions</h3>
        <div class="security-table-wrap"><table class="security-table"><thead><tr><th>State</th><th>Device</th><th>Location</th><th>Started</th><th>Last seen</th><th></th></tr></thead><tbody>${sessionRows}</tbody></table></div>
        <h3 style="margin:20px 0 8px;font-size:12px;color:var(--brand-primary)">Recent sign-ins</h3>
        <div class="security-table-wrap"><table class="security-table"><thead><tr><th>Time</th><th>Result</th><th>Device</th><th>Location</th><th>IP</th></tr></thead><tbody>${loginRows}</tbody></table></div>
      </div>`);
      document.body.appendChild(back);
      back.querySelector("[data-close-security]").addEventListener("click", function () {
        back.remove();
      });
      back.querySelector("[data-revoke-all]").addEventListener("click", async function () {
        await window.revokeAllUserSessions(user.id, user.name);
        back.remove();
      });
      back.addEventListener("click", function (e) {
        if (e.target === back) back.remove();
      });
      back.querySelectorAll("[data-drawer-revoke]").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          await window.revokeSession(btn.getAttribute("data-drawer-revoke"), user.name);
          back.remove();
        });
      });
    } catch (error) {
      console.error("[users] security profile failed", error);
      alert(error.message || "Could not load security profile.");
    }
  };
  window.loadSecurityCenter = loadSecurityCenter;
  window.renderSecuritySessions = renderSecuritySessions;
  window.renderSecurityDevices = renderSecurityDevices;
  window.renderSecurityAccess = renderSecurityAccess;
  const sessionFilter = $("#sec-status");
  if (sessionFilter) sessionFilter.addEventListener("change", function () {
    loadSecurityCenter();
  });
  onReady(function () {
    setTimeout(function () {
      installUserTools();
      decorateUserRows();
    }, 300);
  });
})();
;
const $ = s => document.querySelector(s);
const escHtml = value => String(value ?? '').replace(/[&<>\"']/g, ch => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\"': '&quot;',
  "'": '&#39;'
})[ch]);
let EMPLOYERS = [],
  ME = null;
async function getJson(url, options) {
  const response = await fetch(url, {
    cache: 'no-store',
    ...options
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch (_) {
    payload = null;
  }
  if (response.status === 401) {
    location.href = '/login';
    throw new Error('Session expired');
  }
  if (!response.ok) throw new Error(payload?.error || `Request failed (${response.status})`);
  return payload;
}
function renderEmpPick() {
  const host = $('#emp-pick');
  if (!host) return;
  if (!Array.isArray(EMPLOYERS) || EMPLOYERS.length === 0) {
    renderMarkup(host, '<span class="muted">No employers are available yet.</span>');
    return;
  }
  renderMarkup(host, EMPLOYERS.map(e => `<label><input type="checkbox" value="${escHtml(e.id)}"><span>${escHtml(e.name)}</span></label>`).join(''));
}
function showUsersLoadError(message) {
  const rows = $('#user-rows');
  if (rows) {
    renderMarkup(rows, `<tr><td colspan="7" style="padding:16px;"><span style="color:#b5391f;font-weight:700;">Could not load users.</span> <span class="muted">${escHtml(message)}</span> <button class="btn btn-sm" style="margin-left:8px;" data-react-click="${registerAction(event => {
      loadUsers();
    })}">Retry</button></td></tr>`);
  }
}
async function boot() {
  try {
    ME = await getJson('/api/auth/me');
    if (!ME || ME.role !== 'ADMIN' && ME.role !== 'SUPERADMIN') {
      location.href = '/login';
      return;
    }
    renderNav();
    EMPLOYERS = Array.isArray(ME.employers) ? ME.employers : [];
    renderEmpPick();
    installPrivilegedAccess();
    onRoleChange();
    onAccessChange();
    await Promise.allSettled([loadPartnersDropdown(), loadUsers(), loadRevokedUsers(), loadSecurityCenter()]);
  } catch (error) {
    console.error('[users] startup failed', error);
    const host = $('#emp-pick');
    if (host) renderMarkup(host, `<span style="color:#b5391f;font-weight:700;">Could not load employers.</span> <span class="muted">${escHtml(error.message || error)}</span>`);
    showUsersLoadError(error.message || String(error));
  }
}
function renderNav() {
  if (window.EmpowerPortalNav) {
    window.EmpowerPortalNav.render({
      me: ME,
      navSelector: '#portal-nav',
      accountSelector: '#portal-account',
      active: 'users'
    });
  }
}
function installPrivilegedAccess() {
  const adminHost = document.getElementById('n-admin-access');
  const superHost = document.getElementById('n-superadmin-access');
  if (ME?.role === 'SUPERADMIN') {
    if (adminHost) renderMarkup(adminHost, `<label><input type="radio" name="n-role-choice" id="n-access-admin" value="ADMIN" data-react-change="${registerAction(event => {
      syncRoleSelection();
    })}"> Admin</label>`);
    if (superHost) renderMarkup(superHost, `<label><input type="radio" name="n-role-choice" id="n-access-superadmin" value="SUPERADMIN" data-react-change="${registerAction(event => {
      syncRoleSelection();
    })}"> Superadmin</label>`);
  } else {
    if (adminHost) renderMarkup(adminHost, '');
    if (superHost) renderMarkup(superHost, '');
  }
}
function syncRoleSelection() {
  const selected = document.querySelector('input[name="n-role-choice"]:checked')?.value || 'VIEWER';
  const select = document.getElementById('n-role');
  if (select) select.value = selected;
  onRoleChange();
}
function onRoleChange() {
  const role = $('#n-role').value;
  // admins see everything, so hide employer linking for admins
  $('#emp-wrap').style.display = role === 'ADMIN' || role === 'SUPERADMIN' ? 'none' : 'block';
}
function onAccessChange() {
  const mode = document.querySelector('input[name=access]:checked').value;
  $('#n-pass').style.display = mode === 'temp' ? 'block' : 'none';
}
async function addUser() {
  const msg = $('#add-msg'),
    box = $('#link-box');
  msg.style.display = 'none';
  box.style.display = 'none';
  const role = $('#n-role').value;
  const mode = document.querySelector('input[name=access]:checked').value;
  const employerIds = [...document.querySelectorAll('#emp-pick input:checked')].map(c => c.value);
  const body = {
    name: $('#n-name').value,
    email: $('#n-email').value,
    role,
    employerIds: role === 'ADMIN' || role === 'SUPERADMIN' ? [] : employerIds
  };
  const pid = $('#n-partner').value;
  if (pid) body.partnerId = pid;
  if (mode === 'temp') {
    body.tempPassword = $('#n-pass').value;
  } else {
    body.sendSetupLink = true;
  }
  const r = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const d = await r.json();
  if (!r.ok) {
    show(msg, 'err', d.error || 'Could not create user');
    return;
  }
  if (d.setupPath && d.emailSent) {
    show(msg, 'ok', 'User created — a set-password email was sent to ' + body.email + '.');
  } else if (d.setupPath) {
    show(msg, 'ok', 'User created, but the email could not be sent' + (d.emailError ? ' (' + d.emailError + ')' : '') + '. Share this link with them manually:');
    box.style.display = 'block';
    renderMarkup(box, '<b>Set-password link</b> (copy & send to the user):<br>' + location.origin + d.setupPath);
  } else {
    show(msg, 'ok', 'User created.');
  }
  $('#n-name').value = '';
  $('#n-email').value = '';
  $('#n-pass').value = '';
  $('#n-partner').value = '';
  document.querySelectorAll('#emp-pick input:checked').forEach(c => c.checked = false);
  loadUsers();
}
async function loadPartnersDropdown() {
  try {
    const partners = await getJson('/api/admin/partners');
    PARTNERS_LIST = Array.isArray(partners) ? partners : [];
    const sel = $('#n-partner');
    if (!sel) return;
    renderMarkup(sel, '<option value="">None (standard empower-fin branding)</option>' + PARTNERS_LIST.map(p => `<option value="${escHtml(p.id)}">${escHtml(p.displayName || p.name)}</option>`).join(''));
  } catch (error) {
    console.error('[users] partners load failed', error);
  }
}
let USERS = [],
  PARTNERS_LIST = [];
async function loadUsers() {
  const rows = $('#user-rows');
  if (rows) renderMarkup(rows, '<tr><td colspan="7" class="muted" style="padding:16px;">Loading users…</td></tr>');
  try {
    const users = await getJson('/api/users');
    USERS = Array.isArray(users) ? users : [];
    window.USERS = USERS;
    if (!PARTNERS_LIST.length) {
      try {
        const partners = await getJson('/api/admin/partners');
        PARTNERS_LIST = Array.isArray(partners) ? partners : [];
      } catch (error) {
        console.error('[users] partners load failed', error);
        PARTNERS_LIST = [];
      }
    }
    if (!USERS.length) {
      if (rows) renderMarkup(rows, '<tr><td colspan="7" class="muted" style="padding:16px;">No users yet.</td></tr>');
      return;
    }
    if (rows) renderMarkup(rows, USERS.map(u => {
      const userEmployers = Array.isArray(u.employers) ? u.employers : [];
      const emps = u.role === 'ADMIN' || u.role === 'SUPERADMIN' ? '<span class="muted">All</span>' : userEmployers.map(e => `<span class="chip">${escHtml(e.name)}</span>`).join('') || '<span class="muted">none</span>';
      const partner = u.partner ? `<span class="chip">${escHtml(u.partner.name)}</span>` : '<span class="muted">—</span>';
      const status = !u.active ? '<span class="tag off">disabled</span>' : u.pendingSetup ? '<span class="tag pend">pending setup</span>' : '<span class="tag live">active</span>';
      const id = escHtml(u.id);
      const role = escHtml(String(u.role || '').replace('_', ' '));
      return `<tr id="row-${id}">
        <td><b>${escHtml(u.name)}</b></td><td class="muted">${escHtml(u.email)}</td>
        <td><span class="role ${escHtml(u.role)}">${role}</span></td>
        <td>${emps}</td><td>${partner}</td><td>${status}</td>
        <td style="white-space:nowrap;">
          <button class="btn btn-sm" type="button" data-react-click="${registerAction(event => {
        viewUserSecurity(`${decodeAttribute(id)}`);
      })}">Security</button>
          <button class="btn btn-sm" type="button" data-react-click="${registerAction(event => {
        editUser(`${decodeAttribute(id)}`);
      })}">Edit</button>
          <button class="btn btn-sm" type="button" data-react-click="${registerAction(event => {
        toggleActive(`${decodeAttribute(id)}`, !u.active);
      })}">${u.active ? 'Disable' : 'Enable'}</button>
        </td>
      </tr>`;
    }).join(''));
  } catch (error) {
    console.error('[users] user list load failed', error);
    showUsersLoadError(error.message || String(error));
  }
}
function editUser(id) {
  const u = USERS.find(x => x.id === id);
  if (!u) return;
  // if an editor is already open, close it first
  document.getElementById('editor-' + id)?.remove();
  const empIds = new Set(u.employers.map(e => e.id));
  const empBoxes = EMPLOYERS.length ? EMPLOYERS.map(e => `<label style="display:inline-flex;align-items:center;gap:6px;margin:3px 12px 3px 0;font-weight:600;"><input type="checkbox" value="${esc(e.id)}" ${empIds.has(e.id) ? 'checked' : ''} style="width:auto;"> ${esc(e.name)}</label>`).join('') : '<span class="muted">No employers yet.</span>';
  const partnerOpts = '<option value="">None (standard branding)</option>' + PARTNERS_LIST.map(p => `<option value="${esc(p.id)}" ${u.partner && u.partner.id === p.id ? 'selected' : ''}>${p.displayName || p.name}</option>`).join('');
  const availableRoles = ME?.role === 'SUPERADMIN' ? ['EMPLOYER_MANAGER', 'PORTFOLIO_MANAGER', 'VIEWER', 'ADMIN', 'SUPERADMIN'] : ['EMPLOYER_MANAGER', 'PORTFOLIO_MANAGER', 'VIEWER'];
  const roleOpts = availableRoles.map(r => `<option value="${r}" ${u.role === r ? 'selected' : ''}>${r.replace('_', ' ')}</option>`).join('');
  const tr = document.createElement('tr');
  tr.id = 'editor-' + id;
  renderMarkup(tr, `<td colspan="7" style="background:#eef3f8;padding:16px 14px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:760px;">
      <label style="font-size:12px;font-weight:700;color:#5b6b7a;">Full name
        <input id="e-name-${id}" value="${u.name.replace(/"/g, '&quot;')}" style="display:block;width:100%;margin-top:4px;padding:8px 11px;border:1px solid #e8e1f7;border-radius:8px;font:inherit;">
      </label>
      <label style="font-size:12px;font-weight:700;color:#5b6b7a;">Role
        <select id="e-role-${id}" data-react-change="${registerAction(event => {
    document.getElementById(`e-emp-wrap-${decodeAttribute(id)}`).style.display = event.currentTarget.value === 'ADMIN' || event.currentTarget.value === 'SUPERADMIN' ? 'none' : 'block';
  })}" style="display:block;width:100%;margin-top:4px;padding:8px 11px;border:1px solid #e8e1f7;border-radius:8px;font:inherit;">${roleOpts}</select>
      </label>
      <label style="font-size:12px;font-weight:700;color:#5b6b7a;grid-column:span 2;">Channel partner
        <select id="e-partner-${id}" style="display:block;width:100%;margin-top:4px;padding:8px 11px;border:1px solid #e8e1f7;border-radius:8px;font:inherit;">${partnerOpts}</select>
      </label>
    </div>
    <div id="e-emp-wrap-${id}" style="margin-top:12px;${u.role === 'ADMIN' || u.role === 'SUPERADMIN' ? 'display:none;' : ''}">
      <div style="font-size:12px;font-weight:700;color:#5b6b7a;margin-bottom:5px;">Linked employers (which employers this user may see)</div>
      <div style="border:1px solid #e8e1f7;border-radius:9px;padding:10px;background:#fff;">${empBoxes}</div>
    </div>
    <div style="margin-top:14px;display:flex;gap:8px;align-items:center;">
      <button class="btn btn-primary btn-sm" data-react-click="${registerAction(event => {
    saveUser(`${decodeAttribute(id)}`);
  })}">Save changes</button>
      <button class="btn btn-sm" data-react-click="${registerAction(event => {
    document.getElementById(`editor-${decodeAttribute(id)}`).remove();
  })}">Cancel</button>
      <span id="e-msg-${id}" style="font-size:12.5px;"></span>
    </div>
  </td>`);
  document.getElementById('row-' + id).after(tr);
}
async function saveUser(id) {
  const role = $('#e-role-' + id).value;
  const employerIds = [...document.querySelectorAll('#e-emp-wrap-' + id + ' input:checked')].map(c => c.value);
  const body = {
    name: $('#e-name-' + id).value.trim(),
    role,
    partnerId: $('#e-partner-' + id).value || null,
    employerIds: role === 'ADMIN' || role === 'SUPERADMIN' ? [] : employerIds
  };
  const msg = $('#e-msg-' + id);
  msg.textContent = 'Saving…';
  msg.style.color = '#5b6b7a';
  try {
    const r = await fetch('/api/users/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      msg.textContent = '✕ ' + (d.error || 'save failed');
      msg.style.color = '#b5391f';
      return;
    }
    loadUsers();
  } catch (e) {
    msg.textContent = '✕ ' + e.message;
    msg.style.color = '#b5391f';
  }
}
async function toggleActive(id, active) {
  const body = {
    active
  };
  if (!active) {
    const reason = prompt('Reason for deactivating this account? (shown to other admins in Past users)', '');
    if (reason === null) return; // cancelled
    body.reason = reason.trim();
  }
  await fetch('/api/users/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  loadUsers();
  loadRevokedUsers();
}

// ── past users (admin-only): who once had access and why it was revoked ──
async function loadRevokedUsers() {
  const rows = $('#revoked-rows');
  if (!rows) return;
  try {
    const revoked = await getJson('/api/admin/users/revoked');
    if (!revoked.length) {
      renderMarkup(rows, '<tr><td colspan="6" class="muted" style="padding:16px;">No past users — nobody has been deactivated yet.</td></tr>');
      return;
    }
    renderMarkup(rows, revoked.map(u => {
      const id = escHtml(u.id);
      const role = escHtml(String(u.role || '').replace('_', ' '));
      const by = u.revokedBy === 'self' ? '<span class="chip">Self-deactivated</span>' : escHtml(u.revokedBy || '—');
      return `<tr>
        <td><b>${escHtml(u.name)}</b><div class="muted">${escHtml(u.email)}</div></td>
        <td><span class="role ${escHtml(u.role)}">${role}</span></td>
        <td>${escHtml(u.revokedReason || '—')}</td>
        <td>${by}</td>
        <td class="muted">${u.revokedAt ? new Date(u.revokedAt).toLocaleDateString() : '—'}</td>
        <td style="white-space:nowrap;">
          <button class="btn btn-sm" data-react-click="${registerAction(event => {
        toggleActive(`${decodeAttribute(id)}`, true);
      })}">Reactivate</button>
          <button class="btn btn-sm" style="color:#b5391f;" data-react-click="${registerAction(event => {
        deleteUserForever(`${decodeAttribute(id)}`, `${decodeAttribute(escHtml(u.name).replace(/'/g, ""))}`);
      })}">Delete permanently</button>
        </td>
      </tr>`;
    }).join(''));
  } catch (error) {
    renderMarkup(rows, `<tr><td colspan="6" style="padding:16px;color:#b5391f;">Could not load past users. ${escHtml(error.message || error)}</td></tr>`);
  }
}
async function deleteUserForever(id, name) {
  if (!confirm(`Permanently delete "${name}"? This removes their account entirely and cannot be undone.`)) return;
  const r = await fetch('/api/users/' + id, {
    method: 'DELETE'
  });
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    alert(d.error || 'Could not delete this user.');
    return;
  }
  loadRevokedUsers();
}
function installCompactCollapse() {
  ['security-center', 'user-list-card', 'revoked-users-card'].forEach(function (id) {
    const card = document.getElementById(id);
    if (!card || card.dataset.collapsibleInstalled) return;
    card.dataset.collapsibleInstalled = '1';
    if (id === 'user-list-card' || id === 'revoked-users-card') card.classList.add('compact-collapsed');
    const head = card.querySelector('.card-hd');
    if (!head) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-sm compact-toggle';
    const set = function () {
      const c = card.classList.contains('compact-collapsed');
      btn.textContent = c ? 'Expand' : 'Collapse';
      btn.setAttribute('aria-expanded', String(!c));
    };
    btn.onclick = function () {
      card.classList.toggle('compact-collapsed');
      set();
    };
    head.appendChild(btn);
    set();
  });
}
function show(el, t, m) {
  el.className = 'msg ' + t;
  el.textContent = m;
  el.style.display = 'block';
}
installCompactCollapse();
boot();
;

/* Dark mode for admin pages: same engine, default portal brand. Light mode stays on the page's original palette. */
if (window.BrandEngine) {
  BrandEngine.themeController().set({
    brand: {
      accentColor: '7D2FA3',
      primaryColor: 'B15BE8',
      navyColor: '2B1B68'
    },
    light: null
  });
}
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
