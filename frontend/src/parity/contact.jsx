// Ported from New Changes contact.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n")}
<a className={siteText("skip-link")} href={siteText("#main")}>{siteText("Skip to content")}</a>
{siteText("\n")}
<header className={siteText("pub-header")}><div className={siteText("in")}>{siteText("\n  ")}<a href={siteText("/login")} aria-label={siteText("The Fixer portal home")}><img src={siteText("/static/the-fixer-logo.svg?v=6")} className={siteText("efs-brand-logo")} alt={siteText("The Fixer logo")}/></a>{siteText("\n  ")}<nav aria-label={siteText("Primary")}><a href={siteText("/privacy")}>{siteText("Privacy")}</a><a href={siteText("/terms")}>{siteText("Terms")}</a><a href={siteText("/contact")}>{siteText("Contact")}</a><a className={siteText("keep")} href={siteText("/login")}>{siteText("Sign in")}</a></nav>{siteText("\n")}</div></header>
{siteText("\n")}
<main id={siteText("main")} className={siteText("pub-main")}><div className={siteText("panel")}>{siteText("\n  ")}<p className={siteText("eyebrow")}>{siteText("Contact")}</p>{siteText("\n  ")}<h1>{siteText("Request access or ask a question")}</h1>{siteText("\n  ")}<p className={siteText("lead")}>{siteText("Tell us about your organisation and what you need. We reply within two business days. You can also write to ")}<a href={siteText("mailto:{{CONTACT_EMAIL}}")}><strong>{siteText("{{CONTACT_EMAIL}}")}</strong></a>{siteText(".")}</p>{siteText("\n  ")}<div id={siteText("form-alert")} className={siteText("form-alert")} role={siteText("alert")}/>{siteText("\n  ")}<form id={siteText("contact-form")} novalidate={siteText("")}>{siteText("\n    ")}<div className={siteText("field")}><label htmlFor={siteText("c-name")}>{siteText("Full name")}</label><input id={siteText("c-name")} name={siteText("name")} autoComplete={siteText("name")} required={true} maxLength={siteText("120")}/><div className={siteText("field-error")} id={siteText("e-name")}>{siteText("Please enter your name.")}</div></div>{siteText("\n    ")}<div className={siteText("field")}><label htmlFor={siteText("c-email")}>{siteText("Work email")}</label><input id={siteText("c-email")} name={siteText("email")} type={siteText("email")} autoComplete={siteText("email")} required={true} maxLength={siteText("254")}/><div className={siteText("field-error")} id={siteText("e-email")}>{siteText("Please enter a valid email address.")}</div></div>{siteText("\n    ")}<div className={siteText("field")}><label htmlFor={siteText("c-org")}>{siteText("Organisation ")}<span style={{"textTransform":"none","letterSpacing":"0","fontWeight":"500"}} ref={node => { if(node) node.setAttribute("style", "text-transform:none;letter-spacing:0;font-weight:500"); }}>{siteText("(optional)")}</span></label><input id={siteText("c-org")} name={siteText("organisation")} autoComplete={siteText("organization")} maxLength={siteText("120")}/></div>{siteText("\n    ")}<div className={siteText("field")}><label htmlFor={siteText("c-msg")}>{siteText("How can we help?")}</label><textarea id={siteText("c-msg")} name={siteText("message")} required={true} minlength={siteText("10")} maxLength={siteText("2000")} defaultValue={""}/><div className={siteText("hint")}><span id={siteText("c-count")}>{siteText("0")}</span>{siteText(" / 2000")}</div><div className={siteText("field-error")} id={siteText("e-message")}>{siteText("Please write at least 10 characters.")}</div></div>{siteText("\n    ")}<div className={siteText("hp")} aria-hidden={siteText("true")}><label>{siteText("Leave blank")}<input id={siteText("c-web")} name={siteText("website")} tabIndex={siteText("-1")} autoComplete={siteText("off")}/></label></div>{siteText("\n    ")}<button className={siteText("ent-cta primary")} id={siteText("c-btn")} type={siteText("submit")} style={{"width":"100%"}} ref={node => { if(node) node.setAttribute("style", "width:100%"); }}>{siteText("Send message")}</button>{siteText("\n  ")}</form>{siteText("\n")}</div></main>
{siteText("\n")}
<footer className={siteText("pub-footer")}><span>{siteText("© empower-fin · {{CONTACT_ADDRESS}}")}</span>{siteText("\n")}<span><a href={siteText("/privacy")}>{siteText("Privacy Policy")}</a>{siteText(" · ")}<a href={siteText("/terms")}>{siteText("Terms")}</a>{siteText(" · ")}<a href={siteText("/cookies")}>{siteText("Cookies")}</a>{siteText(" · ")}<a href={siteText("mailto:{{CONTACT_EMAIL}}")}>{siteText("{{CONTACT_EMAIL}}")}</a></span></footer>
{siteText("\n")}
<div className={siteText("sticky-cta")}><a className={siteText("ent-cta")} href={siteText("/contact")}>{siteText("Request access")}</a></div>
{siteText("\n")}

{siteText("\n")}

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
;
(function () {
  'use strict';

  var f = document.getElementById('contact-form');
  if (!f) return;
  var btn = document.getElementById('c-btn'),
    alertBox = document.getElementById('form-alert');
  var msg = document.getElementById('c-msg'),
    count = document.getElementById('c-count');
  msg.addEventListener('input', function () {
    count.textContent = msg.value.length;
  });
  function setErr(id, field, on) {
    var box = document.getElementById(id);
    box.parentNode.classList.toggle('has-error', on);
    field.setAttribute('aria-invalid', on ? 'true' : 'false');
    if (on) field.setAttribute('aria-describedby', id);
  }
  function validate() {
    var n = f.elements.name,
      e = f.elements.email,
      m = f.elements.message,
      ok = true,
      first = null;
    var bad = [['e-name', n, !n.value.trim()], ['e-email', e, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.value.trim())], ['e-message', m, m.value.trim().length < 10]];
    bad.forEach(function (b) {
      setErr(b[0], b[1], b[2]);
      if (b[2]) {
        ok = false;
        first = first || b[1];
      }
    });
    if (first) first.focus();
    return ok;
  }
  f.addEventListener('input', function (ev) {
    var p = ev.target.closest('.field');
    if (p && p.classList.contains('has-error')) {
      validate();
    }
  });
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    alertBox.classList.remove('show');
    if (!validate()) return;
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    renderMarkup(btn, '<span class="spin"></span>Sending…');
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: f.elements.name.value.trim(),
        email: f.elements.email.value.trim(),
        organisation: f.elements.organisation.value.trim(),
        message: f.elements.message.value.trim(),
        website: f.elements.website.value
      })
    }).then(function (r) {
      return r.json().catch(function () {
        return {};
      }).then(function (d) {
        return {
          ok: r.ok,
          d: d
        };
      });
    }).then(function (x) {
      if (!x.ok) throw new Error(x.d && x.d.error || 'Something went wrong. Please try again.');
      location.href = '/thank-you';
    }).catch(function (e) {
      alertBox.textContent = e.message;
      alertBox.classList.add('show');
      alertBox.scrollIntoView({
        block: 'nearest'
      });
      btn.disabled = false;
      btn.removeAttribute('aria-busy');
      btn.textContent = 'Send message';
    });
  });
})();
}
