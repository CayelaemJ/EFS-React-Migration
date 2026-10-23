// Ported from New Changes home.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n")}
<a className={siteText("skip-link")} href={siteText("#main")}>{siteText("Skip to content")}</a>
{siteText("\n")}
<header className={siteText("home-nav")}><div className={siteText("in")}>{siteText("\n  ")}<a href={siteText("/")} aria-label={siteText("empower-fin home")}><img src={siteText("/static/logo-large.png")} alt={siteText("empower-fin")}/></a>{siteText("\n  ")}<nav className={siteText("home-nav-links")} aria-label={siteText("Primary navigation")}><a href={siteText("/privacy")}>{siteText("Privacy")}</a><a href={siteText("/terms")}>{siteText("Terms")}</a><a href={siteText("/contact")} className={siteText("nav-cta")}>{siteText("Request access")}</a><a href={siteText("/login")}>{siteText("Sign in")}</a></nav>{siteText("\n")}</div></header>
{siteText("\n")}
<main id={siteText("main")}>{siteText("\n")}<section className={siteText("home-hero")}>{siteText("\n  ")}<div>{siteText("\n    ")}<div className={siteText("home-kicker")}>{siteText("Enterprise financial wellbeing intelligence")}</div>{siteText("\n    ")}<h1>{siteText("Turn workforce financial data into decisions leaders can trust.")}</h1>{siteText("\n    ")}<p className={siteText("lede")}>{siteText("Measure financial wellbeing, understand the drivers behind change, and give employers a clear, auditable view of programme impact across their workforce.")}</p>{siteText("\n    ")}<div className={siteText("home-actions")}><a className={siteText("ent-cta primary")} href={siteText("/contact")}>{siteText("Request enterprise access")}</a><a className={siteText("ent-cta ghost")} href={siteText("/login")} style={{"color":"var(--suite-primary)","borderColor":"#cfd5df"}} ref={node => { if(node) node.setAttribute("style", "color:var(--suite-primary);border-color:#cfd5df"); }}>{siteText("Sign in to workspace")}</a></div>{siteText("\n    ")}<div className={siteText("home-proof")} aria-label={siteText("Platform capabilities")}><div className={siteText("item")}><strong>{siteText("Governed access")}</strong><span>{siteText("Role-based permissions and audit history")}</span></div><div className={siteText("item")}><strong>{siteText("Source-aware analytics")}</strong><span>{siteText("API, SQL and managed imports")}</span></div><div className={siteText("item")}><strong>{siteText("Executive reporting")}</strong><span>{siteText("Clear measures, trends and outcomes")}</span></div><div className={siteText("item")}><strong>{siteText("White-label ready")}</strong><span>{siteText("Client themes without changing the core")}</span></div></div>{siteText("\n  ")}</div>{siteText("\n  ")}<div className={siteText("home-console")} aria-label={siteText("Illustration of the analytics workspace")}>{siteText("\n    ")}<div className={siteText("console-top")}><span>{siteText("Workforce intelligence ")}<span style={{"fontWeight":"500","opacity":".75"}} ref={node => { if(node) node.setAttribute("style", "font-weight:500;opacity:.75"); }}>{siteText("· Illustrative sample, not real data")}</span></span><span className={siteText("console-dots")} aria-hidden={siteText("true")}><i/><i/><i/></span></div>{siteText("\n    ")}<div className={siteText("console-body")}><div className={siteText("console-kpis")}><div className={siteText("console-kpi")}><small>{siteText("Wellbeing score")}</small><strong>{siteText("72")}</strong></div><div className={siteText("console-kpi")}><small>{siteText("Engagement")}</small><strong>{siteText("68%")}</strong></div><div className={siteText("console-kpi")}><small>{siteText("Cash flow relief")}</small><strong>{siteText("R 4.9m")}</strong></div></div><div className={siteText("console-chart")} aria-hidden={siteText("true")}><i className={siteText("console-bar")} style={{"height":"42%"}} ref={node => { if(node) node.setAttribute("style", "height:42%"); }}/><i className={siteText("console-bar")} style={{"height":"55%"}} ref={node => { if(node) node.setAttribute("style", "height:55%"); }}/><i className={siteText("console-bar")} style={{"height":"48%"}} ref={node => { if(node) node.setAttribute("style", "height:48%"); }}/><i className={siteText("console-bar")} style={{"height":"67%"}} ref={node => { if(node) node.setAttribute("style", "height:67%"); }}/><i className={siteText("console-bar")} style={{"height":"73%"}} ref={node => { if(node) node.setAttribute("style", "height:73%"); }}/><i className={siteText("console-bar")} style={{"height":"82%"}} ref={node => { if(node) node.setAttribute("style", "height:82%"); }}/><i className={siteText("console-bar")} style={{"height":"91%"}} ref={node => { if(node) node.setAttribute("style", "height:91%"); }}/></div></div>{siteText("\n  ")}</div>{siteText("\n")}</section>{siteText("\n")}<section className={siteText("home-section")}><div className={siteText("home-section-grid")}>{siteText("\n  ")}<article className={siteText("home-feature")}><div className={siteText("num")}>{siteText("01 / GOVERN")}</div><h2>{siteText("Control who sees what")}</h2><p>{siteText("Employer-level access, administrative roles, session controls and an auditable trail for operational changes.")}</p></article>{siteText("\n  ")}<article className={siteText("home-feature")}><div className={siteText("num")}>{siteText("02 / UNDERSTAND")}</div><h2>{siteText("Explain the movement")}</h2><p>{siteText("Bring together scores, engagement, cash flow, debt risk and programme activity into a consistent analytical model.")}</p></article>{siteText("\n  ")}<article className={siteText("home-feature")}><div className={siteText("num")}>{siteText("03 / ACT")}</div><h2>{siteText("Report with confidence")}</h2><p>{siteText("Give executives and programme teams a concise view of performance while preserving the underlying detail for analysis.")}</p></article>{siteText("\n")}</div></section>{siteText("\n")}</main>
{siteText("\n")}
<footer className={siteText("pub-footer")}><span>{siteText("© empower-fin · {{CONTACT_ADDRESS}}")}</span><span><a href={siteText("/privacy")}>{siteText("Privacy")}</a>{siteText(" · ")}<a href={siteText("/terms")}>{siteText("Terms")}</a>{siteText(" · ")}<a href={siteText("/cookies")}>{siteText("Cookies")}</a>{siteText(" · ")}<a href={siteText("/contact")}>{siteText("Contact")}</a></span></footer>
{siteText("\n")}
<div className={siteText("sticky-cta")}><a className={siteText("ent-cta")} href={siteText("/contact")}>{siteText("Request enterprise access")}</a></div>
{siteText("\n")}


{siteText("\n\n\n")}</>;}
let started=false;
export function start(){if(started)return;started=true;
actions=[];
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
}
