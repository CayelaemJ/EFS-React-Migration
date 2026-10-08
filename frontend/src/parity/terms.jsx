// Ported from New Changes terms.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n")}
<div className={siteText("wrap")}>{siteText("\n  ")}<a className={siteText("back")} href={siteText("/login")}>{siteText("← Back to sign in")}</a>{siteText("\n  ")}<div className={siteText("logo")}>{siteText("empower-fin")}</div>{siteText("\n  ")}<h1>{siteText("Terms of Service")}</h1>{siteText("\n  ")}<div className={siteText("meta")}>{siteText("Last updated: 28 September 2026 · Applies to the empower-fin Dashboard Portal")}</div>{siteText("\n  ")}<div className={siteText("card")}>{siteText("\n\n    ")}<h2>{siteText("1. Acceptance of these terms")}</h2>{siteText("\n    ")}<p>{siteText("By accessing or using the empower-fin Dashboard Portal (the \"Portal\"), you agree to be bound by these Terms of Service. If you are using the Portal on behalf of an employer or organisation, you confirm you have authority to accept these terms on its behalf.")}</p>{siteText("\n\n    ")}<h2>{siteText("2. Who operates the Portal")}</h2>{siteText("\n    ")}<p>{siteText("The Portal is provided by Empowerfin (Pty) Ltd (\"we\", \"us\"), of Deloitte Building, 5 Magwa Crescent, Midrand, 2090, Gauteng, South Africa.")}</p>{siteText("\n\n    ")}<h2>{siteText("3. The service")}</h2>{siteText("\n    ")}<p>{siteText("The Portal is a reporting and administration platform that allows employer clients and their authorised users to view workforce financial wellbeing data, manage user accounts, and access related reports. Access is role-based: what a user can see depends on the role and permissions assigned to their account by an administrator.")}</p>{siteText("\n\n    ")}<h2>{siteText("4. Accounts and access")}</h2>{siteText("\n    ")}<ul>{siteText("\n      ")}<li>{siteText("Accounts are created by an administrator; you may not share your login credentials with anyone else.")}</li>{siteText("\n      ")}<li>{siteText("You are responsible for all activity that occurs under your account.")}</li>{siteText("\n      ")}<li>{siteText("You must notify us promptly if you suspect unauthorised access to your account.")}</li>{siteText("\n      ")}<li>{siteText("We may suspend or terminate access at our discretion, including where these terms are breached or an employer relationship ends.")}</li>{siteText("\n    ")}</ul>{siteText("\n\n    ")}<h2>{siteText("5. Acceptable use")}</h2>{siteText("\n    ")}<p>{siteText("You agree not to:")}</p>{siteText("\n    ")}<ul>{siteText("\n      ")}<li>{siteText("Attempt to access data or sections of the Portal you are not authorised to view.")}</li>{siteText("\n      ")}<li>{siteText("Use the Portal to store or process personal information unlawfully, including special personal information not intended for the platform (e.g. ID numbers, banking details, medical information).")}</li>{siteText("\n      ")}<li>{siteText("Attempt to reverse engineer, scrape, or interfere with the Portal's normal operation.")}</li>{siteText("\n      ")}<li>{siteText("Use the Portal for any unlawful purpose.")}</li>{siteText("\n    ")}</ul>{siteText("\n\n    ")}<h2>{siteText("6. Employer client data responsibilities")}</h2>{siteText("\n    ")}<p>{siteText("Where an employer client uploads or imports workforce data into the Portal, the employer client remains responsible for ensuring it has the necessary rights and lawful basis to share that data with us, including obtaining any required employee consent or notice under POPIA.")}</p>{siteText("\n\n    ")}<h2>{siteText("7. Availability")}</h2>{siteText("\n    ")}<p>{siteText("We aim to keep the Portal available and performing reliably but do not guarantee uninterrupted access. We may carry out maintenance, updates, or changes to the Portal from time to time, including temporarily disabling features that are still in development.")}</p>{siteText("\n\n    ")}<h2>{siteText("8. Intellectual property")}</h2>{siteText("\n    ")}<p>{siteText("All software, design, branding, and content that make up the Portal remain the property of Empowerfin (Pty) Ltd or its licensors. These terms do not grant you any ownership rights in the Portal.")}</p>{siteText("\n\n    ")}<h2>{siteText("9. Limitation of liability")}</h2>{siteText("\n    ")}<p>{siteText("The Portal is provided \"as is.\" To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential loss arising from use of the Portal. Nothing in these terms limits liability that cannot be lawfully excluded under South African law.")}</p>{siteText("\n\n    ")}<h2>{siteText("10. Termination")}</h2>{siteText("\n    ")}<p>{siteText("We may suspend or terminate your access to the Portal at any time, with or without notice, particularly in cases of breach of these terms, security concerns, or termination of the underlying agreement with your employer.")}</p>{siteText("\n\n    ")}<h2>{siteText("11. Governing law")}</h2>{siteText("\n    ")}<p>{siteText("These terms are governed by the laws of the Republic of South Africa, and any disputes will be subject to the jurisdiction of the South African courts.")}</p>{siteText("\n\n    ")}<h2>{siteText("12. Changes to these terms")}</h2>{siteText("\n    ")}<p>{siteText("We may update these terms from time to time. Continued use of the Portal after changes take effect constitutes acceptance of the updated terms.")}</p>{siteText("\n\n    ")}<h2>{siteText("13. Contact us")}</h2>{siteText("\n    ")}<p>{siteText("Questions about these terms can be sent to ")}<a href={siteText("mailto:{{LEGAL_EMAIL}}")}>{siteText("{{LEGAL_EMAIL}}")}</a>{siteText(".")}</p>{siteText("\n\n  ")}</div>{siteText("\n")}</div>
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
