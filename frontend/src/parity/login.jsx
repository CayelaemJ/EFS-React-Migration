// Ported from New Changes login.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n  ")}
<aside className={siteText("auth-side")}>{siteText("\n    ")}<div><img src={siteText("/static/logo-large.png")} alt={siteText("empower-fin logo")} id={siteText("side-logo")}/></div>{siteText("\n    ")}<div>{siteText("\n      ")}<h2>{siteText("Financial wellbeing, measured with rigour.")}</h2>{siteText("\n      ")}<p>{siteText("A secure analytics workspace giving employers and their partners a clear, auditable view of workforce financial health.")}</p>{siteText("\n      ")}<ul><li>{siteText("Role-based access with full administrative audit trail")}</li><li>{siteText("Encrypted sessions and an enforced password policy")}</li><li>{siteText("Every score calculated from your own source data")}</li></ul>{siteText("\n    ")}</div>{siteText("\n    ")}<a className={siteText("ent-cta ghost side-cta")} href={siteText("/contact")} style={{"alignSelf":"flex-start"}} ref={node => { if(node) node.setAttribute("style", "align-self:flex-start"); }}>{siteText("Request access")}</a>{siteText("\n    ")}<small>{siteText("© empower-fin  ·  Confidential  ·  ")}<a href={siteText("mailto:{{CONTACT_EMAIL}}")} style={{"color":"inherit"}} ref={node => { if(node) node.setAttribute("style", "color:inherit"); }}>{siteText("{{CONTACT_EMAIL}}")}</a></small>{siteText("\n  ")}</aside>
{siteText("\n  ")}
<main className={siteText("auth-main")}>{siteText("\n  ")}<div className={siteText("card")}>{siteText("\n    ")}<div className={siteText("logo")}><img src={siteText("/static/logo-large.png")} alt={siteText("empower-fin Dashboard Portal")} style={{"height":"54px","width":"auto"}} ref={node => { if(node) node.setAttribute("style", "height:54px;width:auto;"); }}/></div>{siteText("\n    ")}<h1>{siteText("Sign in to your workspace")}</h1>{siteText("\n    ")}<div className={siteText("sub")} id={siteText("brand-sub")}>{siteText("Employee financial wellbeing platform")}</div>{siteText("\n    ")}<label htmlFor={siteText("email")}>{siteText("Email")}</label>{siteText("\n    ")}<input id={siteText("email")} type={siteText("email")} autoComplete={siteText("username")} placeholder={siteText("you@company.com")} required={true} aria-describedby={siteText("err")}/>{siteText("\n    ")}<label htmlFor={siteText("password")}>{siteText("Password")}</label>{siteText("\n    ")}<input id={siteText("password")} type={siteText("password")} autoComplete={siteText("current-password")} placeholder={siteText("••••••••")}/>{siteText("\n    ")}<div style={{"textAlign":"right","marginTop":"8px"}} ref={node => { if(node) node.setAttribute("style", "text-align:right;margin-top:8px;"); }}>{siteText("\n      ")}<a href={siteText("#")} id={siteText("forgot-link")} onClick={event => actions[0]?.(event)} style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--blue-d)","textDecoration":"none"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:var(--blue-d);text-decoration:none;"); }}>{siteText("Forgot password?")}</a>{siteText("\n    ")}</div>{siteText("\n    ")}<label style={{"display":"flex","alignItems":"center","gap":"8px","margin":"16px 0 0","fontWeight":"600","fontSize":"13px","color":"var(--grey)","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "display:flex;align-items:center;gap:8px;margin:16px 0 0;font-weight:600;font-size:13px;color:var(--grey);cursor:pointer;"); }}>{siteText("\n      ")}<input id={siteText("remember")} type={siteText("checkbox")} style={{"width":"auto","margin":"0","accentColor":"var(--brand-primary)","cursor":"pointer"}} ref={node => { if(node) node.setAttribute("style", "width:auto;margin:0;accent-color:var(--brand-primary);cursor:pointer;"); }}/>{siteText("\n      Remember me\n    ")}</label>{siteText("\n    ")}<button id={siteText("btn")} onClick={event => actions[1]?.(event)}>{siteText("Sign in")}</button>{siteText("\n    ")}<div className={siteText("err")} id={siteText("err")}/>{siteText("\n    ")}<div className={siteText("err")} id={siteText("deactivated-msg")} style={{"display":"none","background":"#eef2ff","color":"#32217c"}} ref={node => { if(node) node.setAttribute("style", "display:none;background:#eef2ff;color:#32217c;"); }}>{siteText("Your account has been deactivated. Contact an administrator if you'd like access restored.")}</div>{siteText("\n  ")}</div>{siteText("\n\n  ")}<div className={siteText("card")} id={siteText("forgot-card")} style={{"display":"none"}} ref={node => { if(node) node.setAttribute("style", "display:none;"); }}>{siteText("\n    ")}<h1 style={{"marginTop":"0"}} ref={node => { if(node) node.setAttribute("style", "margin-top:0;"); }}>{siteText("Reset your password")}</h1>{siteText("\n    ")}<div className={siteText("sub")}>{siteText("Enter your email and we'll send you a reset link, if an account exists.")}</div>{siteText("\n    ")}<label htmlFor={siteText("forgot-email")}>{siteText("Email")}</label>{siteText("\n    ")}<input id={siteText("forgot-email")} type={siteText("email")} autoComplete={siteText("username")} placeholder={siteText("you@company.com")}/>{siteText("\n    ")}<button id={siteText("forgot-btn")} onClick={event => actions[2]?.(event)}>{siteText("Send reset link")}</button>{siteText("\n    ")}<div style={{"textAlign":"center","marginTop":"16px"}} ref={node => { if(node) node.setAttribute("style", "text-align:center;margin-top:16px;"); }}><a href={siteText("#")} onClick={event => actions[3]?.(event)} style={{"fontSize":"12.5px","fontWeight":"700","color":"var(--grey)","textDecoration":"none"}} ref={node => { if(node) node.setAttribute("style", "font-size:12.5px;font-weight:700;color:var(--grey);text-decoration:none;"); }}>{siteText("← Back to sign in")}</a></div>{siteText("\n    ")}<div className={siteText("err")} id={siteText("forgot-msg")} style={{"display":"none","background":"#e7f7ef","color":"#137a47"}} ref={node => { if(node) node.setAttribute("style", "display:none;background:#e7f7ef;color:#137a47;"); }}/>{siteText("\n  ")}</div>{siteText("\n  ")}<div style={{"textAlign":"center","marginTop":"18px","fontSize":"12px","color":"#8497a7"}} ref={node => { if(node) node.setAttribute("style", "text-align:center;margin-top:18px;font-size:12px;color:#8497a7;"); }}>{siteText("\n    ")}<a href={siteText("/privacy")} style={{"color":"#8497a7"}} ref={node => { if(node) node.setAttribute("style", "color:#8497a7;"); }}>{siteText("Privacy Policy")}</a>{siteText(" · ")}<a href={siteText("/terms")} style={{"color":"#8497a7"}} ref={node => { if(node) node.setAttribute("style", "color:#8497a7;"); }}>{siteText("Terms of Service")}</a>{siteText(" · ")}<a href={siteText("/cookies")} style={{"color":"#8497a7"}} ref={node => { if(node) node.setAttribute("style", "color:#8497a7;"); }}>{siteText("Cookie Notice")}</a>{siteText("\n  ")}</div>{siteText("\n\n    ")}</main>
{siteText("\n  ")}
<div className={siteText("sticky-cta")}><a className={siteText("ent-cta")} href={siteText("/contact")}>{siteText("Request access")}</a></div>
{siteText("\n  ")}
<div id={siteText("cookie-banner")}>{siteText("\n    ")}<div className={siteText("inner")}>{siteText("\n      ")}<p>{siteText("We use a strictly necessary cookie to keep you signed in — no advertising or tracking cookies. See our ")}<a href={siteText("/cookies")}>{siteText("Cookie Notice")}</a>{siteText(" for details.")}</p>{siteText("\n      ")}<div className={siteText("actions")}>{siteText("\n        ")}<button className={siteText("dismiss")} onClick={event => actions[4]?.(event)}>{siteText("Dismiss")}</button>{siteText("\n        ")}<button className={siteText("accept")} onClick={event => actions[5]?.(event)}>{siteText("Got it")}</button>{siteText("\n      ")}</div>{siteText("\n    ")}</div>{siteText("\n  ")}</div>
{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n\n\n")}</>;}
let started=false;
export function start(){if(started)return;started=true;
actions=[event => {
  showForgot(event);
},
event => {
  signIn();
},
event => {
  sendForgot();
},
event => {
  hideForgot(event);
},
event => {
  dismissCookieBanner();
},
event => {
  dismissCookieBanner();
}];
(function () {
  try {
    var saved = localStorage.getItem('ef_theme');
    var theme = saved === 'dark' || saved === 'light' ? saved : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (_) {}
})();
;
// ════════════════════════════════════════════════════════════════════
//  DARK MODE TOGGLE
//  Persists in localStorage (survives across tabs/sessions, unlike the
//  welcome-splash sessionStorage flag). Falls back to OS preference for a
//  first-time visitor who hasn't chosen explicitly.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  var KEY = 'ef_theme';
  function getPreferred() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}'; // sun to switch to light, moon to switch to dark
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  function toggle() {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(KEY, next);
    } catch (_) {}
    apply(next);
  }

  // apply immediately (before paint) to avoid a flash of the wrong theme
  apply(getPreferred());
  function injectButton() {
    if (document.getElementById('theme-toggle-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';
    btn.setAttribute('data-no-invert', '');
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);
    apply(document.documentElement.getAttribute('data-theme') || 'light');
  }
  if (document.readyState === 'loading') {
    onReady(injectButton);
  } else {
    injectButton();
  }
})();
;
const $ = s => document.querySelector(s);
async function loadPartnerTheme() {
  const slug = new URLSearchParams(location.search).get('partner');
  if (!slug) return;
  try {
    const r = await fetch('/api/partner-theme/' + encodeURIComponent(slug));
    if (!r.ok) return;
    const theme = await r.json();
    const root = document.documentElement.style;
    const hex = c => c ? '#' + String(c).replace(/^#/, '') : null;
    if (theme.accentColor) root.setProperty('--blue', hex(theme.accentColor));
    if (theme.navyColor) root.setProperty('--brand-primary', hex(theme.navyColor));
    if (theme.primaryColor) root.setProperty('--ice', hex(theme.primaryColor));
    if (theme.logoDataUrl) {
      const img = document.querySelector('.logo img');
      if (img) {
        img.src = theme.logoDataUrl;
        img.setAttribute('data-custom-logo', '1');
      }
    }
    if (theme.name) {
      document.title = theme.name + ' — Sign in';
      const sub = document.getElementById('brand-sub');
      if (sub) sub.textContent = theme.tagline || theme.name;
    }
  } catch {}
}
loadPartnerTheme();
if (new URLSearchParams(location.search).get('deactivated') === '1') {
  const m = document.getElementById('deactivated-msg');
  if (m) m.style.display = 'block';
}
async function signIn() {
  const btn = $('#btn'),
    err = $('#err');
  err.style.display = 'none';
  err.setAttribute('role', 'alert');
  const em = $('#email'),
    pw = $('#password');
  em.removeAttribute('aria-invalid');
  pw.removeAttribute('aria-invalid');
  if (!em.value.trim() || !pw.value) {
    const bad = !em.value.trim() ? em : pw;
    bad.setAttribute('aria-invalid', 'true');
    bad.focus();
    err.textContent = !em.value.trim() ? 'Enter your email address.' : 'Enter your password.';
    err.style.display = 'block';
    return;
  }
  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');
  btn.textContent = 'Signing in…';
  try {
    const r = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: $('#email').value,
        password: $('#password').value,
        remember: $('#remember').checked
      })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Sign-in failed');
    // route by role
    const me = await fetch('/api/auth/me').then(x => x.json());
    if (me.modules.dashboard) location.href = '/dashboard';else if (me.modules.admin) location.href = '/admin';else location.href = '/dashboard';
  } catch (e) {
    err.textContent = e.message;
    err.style.display = 'block';
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
    btn.textContent = 'Sign in';
    $('#password').setAttribute('aria-invalid', 'true');
  }
}
$('#password').addEventListener('keydown', e => {
  if (e.key === 'Enter') signIn();
});
function showForgot(ev) {
  if (ev) ev.preventDefault();
  document.querySelector('.card:not(#forgot-card)').style.display = 'none';
  $('#forgot-card').style.display = 'block';
  $('#forgot-email').value = $('#email').value || '';
  $('#forgot-msg').style.display = 'none';
}
function hideForgot(ev) {
  if (ev) ev.preventDefault();
  $('#forgot-card').style.display = 'none';
  document.querySelector('.card:not(#forgot-card)').style.display = 'block';
}
async function sendForgot() {
  const btn = $('#forgot-btn'),
    msg = $('#forgot-msg');
  const email = $('#forgot-email').value.trim();
  if (!email) {
    msg.style.display = 'block';
    msg.style.background = '#fdecea';
    msg.style.color = '#b5391f';
    msg.textContent = 'Enter your email first.';
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Sending…';
  try {
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });
  } catch (_) {/* still show the same message either way */}
  msg.style.display = 'block';
  msg.style.background = '#e7f7ef';
  msg.style.color = '#137a47';
  msg.textContent = 'If an account exists for that email, a reset link is on its way. Check your inbox (and spam folder).';
  btn.disabled = false;
  btn.textContent = 'Send reset link';
}

// cookie notice banner — shown once until dismissed
function dismissCookieBanner() {
  try {
    localStorage.setItem('cookieNoticeDismissed', '1');
  } catch {}
  const b = document.getElementById('cookie-banner');
  if (b) b.style.display = 'none';
}
(function initCookieBanner() {
  let dismissed = false;
  try {
    dismissed = localStorage.getItem('cookieNoticeDismissed') === '1';
  } catch {}
  if (!dismissed) {
    const b = document.getElementById('cookie-banner');
    if (b) b.style.display = 'block';
  }
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
