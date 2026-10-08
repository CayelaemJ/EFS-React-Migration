// Ported from New Changes cookies.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n")}
<div className={siteText("wrap")}>{siteText("\n  ")}<a className={siteText("back")} href={siteText("/login")}>{siteText("← Back to sign in")}</a>{siteText("\n  ")}<div className={siteText("logo")}>{siteText("empower-fin")}</div>{siteText("\n  ")}<h1>{siteText("Cookie Notice")}</h1>{siteText("\n  ")}<div className={siteText("meta")}>{siteText("Last updated: ")}<span style={{"background":"#fff3cd","color":"#8a6110","padding":"1px 6px","borderRadius":"4px","fontWeight":"700","fontSize":"13px"}} ref={node => { if(node) node.setAttribute("style", "background:#fff3cd;color:#8a6110;padding:1px 6px;border-radius:4px;font-weight:700;font-size:13px;"); }}>{siteText("28 September 2026")}</span></div>{siteText("\n  ")}<div className={siteText("card")}>{siteText("\n\n    ")}<h2>{siteText("What are cookies")}</h2>{siteText("\n    ")}<p>{siteText("Cookies are small text files stored on your device when you visit a website. The empower-fin Dashboard Portal uses cookies only to keep you securely signed in — we do not use cookies for advertising, tracking, or analytics purposes.")}</p>{siteText("\n\n    ")}<h2>{siteText("Cookies we use")}</h2>{siteText("\n    ")}<table>{siteText("\n      ")}<tbody><tr><th>{siteText("Cookie")}</th><th>{siteText("Purpose")}</th><th>{siteText("Duration")}</th></tr>{siteText("\n      ")}<tr><td>{siteText("Session token")}</td><td>{siteText("Keeps you signed in and identifies your account and role while you use the Portal.")}</td><td>{siteText("Expires when your session ends or after a period of inactivity")}</td></tr>{siteText("\n    ")}</tbody></table>{siteText("\n    ")}<p>{siteText("This cookie is ")}<strong>{siteText("strictly necessary")}</strong>{siteText(" for the Portal to function — without it, you would not be able to log in or stay signed in. Because it's strictly necessary, it does not require separate consent under applicable law, but we're disclosing it here for transparency.")}</p>{siteText("\n\n    ")}<h2>{siteText("Third-party cookies")}</h2>{siteText("\n    ")}<p>{siteText("We do not knowingly embed third-party advertising, social media, or analytics cookies in the Portal. If this changes in future, this notice will be updated accordingly.")}</p>{siteText("\n\n    ")}<h2>{siteText("Managing cookies")}</h2>{siteText("\n    ")}<p>{siteText("Most browsers let you view, delete, or block cookies through their settings. Please note that blocking the session cookie used by this Portal will prevent you from being able to log in.")}</p>{siteText("\n\n    ")}<h2>{siteText("Changes to this notice")}</h2>{siteText("\n    ")}<p>{siteText("We may update this notice if the cookies we use change. Please check back periodically.")}</p>{siteText("\n\n    ")}<h2>{siteText("Contact us")}</h2>{siteText("\n    ")}<p>{siteText("Questions about this notice can be sent to ")}<a href={siteText("mailto:{{PRIVACY_EMAIL}}")}>{siteText("{{PRIVACY_EMAIL}}")}</a>{siteText(". See also our ")}<a href={siteText("/privacy")}>{siteText("Privacy Policy")}</a>{siteText(".")}</p>{siteText("\n\n  ")}</div>{siteText("\n")}</div>
{siteText("\n")}
<div className={siteText("sticky-cta")}><a className={siteText("ent-cta")} href={siteText("/contact")}>{siteText("Request access")}</a></div>
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
}
