// Ported from New Changes admin.html; keep source structure and CSS selectors intact.
import React from 'react';
import {AuditRows,Engagement} from '../native/AdminInsights.jsx';
import {AdminSecurity,Compliance,MLOpsAlert,refreshGovernance} from '../native/AdminGovernance.jsx';
import {AdminPartners} from '../native/AdminPartners.jsx';
import {AdminIntegration,setIntegrationMode as setIntegMode,refreshIntegration} from '../native/AdminIntegration.jsx';
import {AdminReset,configureResetRefresh} from '../native/AdminReset.jsx';
import {EnterpriseOperations} from '../native/EnterpriseOperations.jsx';
import {AdminEmailPanel,AdminAutomationPanel} from '../native/AdminSettings.jsx';
import {AdminSections} from '../native/AdminSections.jsx';
import {ReportPicker,ReportWorkspace,ImportHistoryRows,initializeReports,refreshImportHistory} from '../native/AdminReports.jsx';
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
<div className={siteText("wrap")}>{siteText("\n  ")}<div className={siteText("head")}>{siteText("\n    ")}<div className={siteText("eyebrow")}>{siteText("Feed the system")}</div>{siteText("\n    ")}<h1>{siteText("Data Centre")}</h1>{siteText("\n    ")}<p>{siteText("Bring approved data into EFS Optimise from files, APIs or SQL. File uploads support CSV, Excel and JSON. Every import is validated against a governed feed contract before it reaches the live reporting model.")}</p>{siteText("\n  ")}</div>{siteText("\n\n  ")}<AdminSecurity/>{siteText("\n  ")}<Compliance/>{siteText("\n  ")}<MLOpsAlert/>{siteText("\n  ")}<section id={siteText("data-centre")} className={siteText("card section-gap")}>{siteText("\n    ")}<div className={siteText("card-hd")}>{siteText("\n      ")}<div><h2>{siteText("Data ingestion")}</h2><div className={siteText("note")}>{siteText("Choose how you want to bring data into EFS Optimise. These are complementary options, not fallbacks.")}</div></div>{siteText("\n    ")}</div>{siteText("\n    ")}<div className={siteText("card-bd")}>{siteText("\n      ")}<div className={siteText("ingestion-method-grid")}>{siteText("\n        ")}<button className={siteText("ingestion-method on")} type={siteText("button")} onClick={event => actions[0]?.(event)}>{siteText("\n          ")}<span className={siteText("ingestion-method-icon")}>{siteText("FILE")}</span>{siteText("\n          ")}<span><strong>{siteText("Upload a file")}</strong><small>{siteText("CSV, Excel (.xlsx/.xls) or JSON, up to 50 MB. Preview, validate and import.")}</small></span>{siteText("\n        ")}</button>{siteText("\n        ")}<button className={siteText("ingestion-method")} type={siteText("button")} onClick={event => actions[1]?.(event)}>{siteText("\n          ")}<span className={siteText("ingestion-method-icon")}>{siteText("API")}</span>{siteText("\n          ")}<span><strong>{siteText("Connect an API")}</strong><small>{siteText("Pull the governed feeds from HTTPS endpoints using private bearer-token authentication.")}</small></span>{siteText("\n        ")}</button>{siteText("\n        ")}<button className={siteText("ingestion-method")} type={siteText("button")} onClick={event => actions[2]?.(event)}>{siteText("\n          ")}<span className={siteText("ingestion-method-icon")}>{siteText("SQL")}</span>{siteText("\n          ")}<span><strong>{siteText("Connect a database")}</strong><small>{siteText("Use approved read-only PostgreSQL, SQL Server, MySQL or MariaDB views.")}</small></span>{siteText("\n        ")}</button>{siteText("\n      ")}</div>{siteText("\n      ")}<div className={siteText("ingestion-note")}><strong>{siteText("Governed by design:")}</strong>{siteText(" files, API records and SQL feeds enter the same validation and import pipeline. Heavy analytics can remain on an approved read replica without moving arbitrary source data into PostgreSQL.")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</section>{siteText("\n\n  ")}<div className={siteText("grid")}>{siteText("\n    ")}{siteText("\n    ")}<div className={siteText("card")}>{siteText("\n      ")}<div className={siteText("card-hd")}><h2>{siteText("Reports")}</h2><div className={siteText("note")}>{siteText("In load order")}</div></div>{siteText("\n      ")}<ReportPicker/>{siteText("\n    ")}</div>{siteText("\n\n    ")}{siteText("\n    ")}<div id={siteText("file-ingestion")}>{siteText("\n\n    ")}{siteText("\n      ")}<ReportWorkspace/>{siteText("\n\n      ")}<EnterpriseOperations/>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Import history")}</h2><div className={siteText("note")}>{siteText("Live updates every 1.5s · Rows show validated totals and how many changes have actually reached live tables")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")} style={{"padding":"6px 8px 12px"}} ref={node => { if(node) node.setAttribute("style", "padding:6px 8px 12px;"); }}>{siteText("\n          ")}<table className={siteText("hist")}><thead><tr><th>{siteText("Report")}</th><th>{siteText("File")}</th><th>{siteText("Rows")}</th><th>{siteText("Status")}</th><th>{siteText("When")}</th><th>{siteText("Download")}</th><th/></tr></thead>{siteText("\n          ")}<ImportHistoryRows/></table>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<AdminIntegration/>{siteText("\n\n      ")}{siteText("\n      ")}<AdminEmailPanel/>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Admin Audit Log")}</h2><div className={siteText("note")}>{siteText("Top 5 most critical admin changes · full history remains available in the CSV export")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<div style={{"overflow":"auto"}} ref={node => { if(node) node.setAttribute("style", "overflow:auto;"); }}><table className={siteText("hist")}><thead><tr><th>{siteText("When")}</th><th>{siteText("Admin")}</th><th>{siteText("Action")}</th><th>{siteText("Details")}</th></tr></thead><AuditRows/></table></div>{siteText("\n          ")}<div className={siteText("row")} style={{"justifyContent":"space-between","marginTop":"14px"}} ref={node => { if(node) node.setAttribute("style", "justify-content:space-between;margin-top:14px;"); }}>{siteText("\n            ")}<span className={siteText("muted")}>{siteText("Audit events continue recording without display limits.")}</span>{siteText("\n            ")}<a className={siteText("btn btn-primary")} href={siteText("/api/admin/audit-log.csv")} download={siteText("")}>{siteText("Download all logs (CSV)")}</a>{siteText("\n          ")}</div>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<AdminAutomationPanel/>{siteText("\n\n      ")}{siteText("\n      ")}<Engagement/>{siteText("\n      ")}<style>{siteText("@media(max-width:820px){.eng-grid{grid-template-columns:1fr!important;}}")}</style>{siteText("\n\n      ")}{siteText("\n      ")}<AdminPartners/>{siteText("\n\n      ")}{siteText("\n      ")}<div className={siteText("card section-gap")}>{siteText("\n        ")}<div className={siteText("card-hd")}><h2>{siteText("Dashboard Sections")}</h2><div className={siteText("note")}>{siteText("Hide sections that aren't ready yet, and control which roles (or specific people) can see each one")}</div></div>{siteText("\n        ")}<div className={siteText("card-bd")}>{siteText("\n          ")}<AdminSections/>{siteText("\n        ")}</div>{siteText("\n      ")}</div>{siteText("\n\n      ")}{siteText("\n      ")}<AdminReset/>{siteText("\n    ")}</div>{siteText("\n  ")}</div>{siteText("\n")}</div>
{siteText("\n\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n\n\n")}

{siteText("\n")}</>;}
let started=false;
export function start(){if(started)return;started=true;
actions=[event => {
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
// ── system email / SMTP and scheduled reports ──
// ── admin audit log (React)
// ── dashboard section permissions ──
configureResetRefresh(refreshIntegration);
async function boot() {
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
    MANIFEST = await initializeReports(value => {
      MANIFEST = value;
    });
  } catch (e) {
    return;
  }
  const optionalLoads = [['history', loadHistory]];
  await Promise.allSettled(optionalLoads.map(async ([name, fn]) => {
    try {
      await fn();
    } catch (e) {
      console.error(`Admin panel ${name} failed:`, e);
    }
  }));
}
function loadHistory() {
  return refreshImportHistory();
}
onReady(() => boot());
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
;
;
}
