// Ported from New Changes privacy.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n")}
<div className={siteText("wrap")}>{siteText("\n  ")}<a className={siteText("back")} href={siteText("/login")}>{siteText("← Back to sign in")}</a>{siteText("\n  ")}<div className={siteText("logo")}>{siteText("empower-fin")}</div>{siteText("\n  ")}<h1>{siteText("Privacy Policy")}</h1>{siteText("\n  ")}<div className={siteText("meta")}>{siteText("Last updated: 30 September 2026 · Applies to the empower-fin Dashboard Portal")}</div>{siteText("\n  ")}<div className={siteText("card")}>{siteText("\n\n    ")}<h2>{siteText("1. Who we are")}</h2>{siteText("\n    ")}<p>{siteText("Empowerfin (Pty) Ltd (\"we\", \"us\", \"our\") operates the empower-fin Dashboard Portal (the \"Portal\"), a workforce financial wellbeing reporting platform made available to employer clients and their authorised users. Our role under the Protection of Personal Information Act 4 of 2013 (\"POPIA\") depends on the processing activity and the applicable agreement. For some processing we may act as a responsible party or co-responsible party, and for employer-controlled workforce processing we may act as an operator. The applicable processing register and contract determine the role for each activity.")}</p>{siteText("\n    ")}<p>{siteText("Business address: Deloitte Building, 5 Magwa Crescent, Midrand, 2090, Gauteng, South Africa")}<br/>{siteText("\n    \n    Information Officer: ")}<span>{siteText("{{INFORMATION_OFFICER}}")}</span>{siteText(", ")}<a href={siteText("mailto:{{PRIVACY_EMAIL}}")}>{siteText("{{PRIVACY_EMAIL}}")}</a></p>{siteText("\n\n    ")}<h2>{siteText("2. What this policy covers")}</h2>{siteText("\n    ")}<p>{siteText("This policy explains how we collect, use, store, share, and protect personal information in connection with the Portal, including information about platform users who log in and workforce data supplied by employer clients for financial wellbeing reporting.")}</p>{siteText("\n\n    ")}<h2>{siteText("3. Personal information we process")}</h2>{siteText("\n    ")}<p>{siteText("Depending on how the Portal is used, we may process:")}</p>{siteText("\n    ")}<ul>{siteText("\n      ")}<li><strong>{siteText("Platform user accounts:")}</strong>{siteText(" name, email address, role, login activity, session data.")}</li>{siteText("\n      ")}<li><strong>{siteText("Workforce/employee data")}</strong>{siteText(" (supplied by employer clients): payroll reference (pseudonymised, not full ID numbers), site/location, income band, employment eligibility dates.")}</li>{siteText("\n      ")}<li><strong>{siteText("Financial wellbeing activity data:")}</strong>{siteText(" debt account status and creditor information, salary advance activity, policy (funeral/credit-life) information, journey/intervention status, referral activity.")}</li>{siteText("\n      ")}<li><strong>{siteText("Chat/support interactions")}</strong>{siteText(" (\"Voice of the employee\"): anonymised themes, sentiment, and satisfaction data from support conversations.")}</li>{siteText("\n    ")}</ul>{siteText("\n    ")}<p>{siteText("We do not knowingly collect South African ID numbers, banking account numbers, medical information, or other special personal information as defined by POPIA through the Portal. Employer clients must not upload such information into the Portal.")}</p>{siteText("\n\n    ")}<h2>{siteText("4. Why we process this information")}</h2>{siteText("\n    ")}<ul>{siteText("\n      ")}<li>{siteText("To provide employer clients with reporting and dashboards on the effectiveness of workforce financial wellbeing programmes.")}</li>{siteText("\n      ")}<li>{siteText("To create and manage platform user accounts and control access by role.")}</li>{siteText("\n      ")}<li>{siteText("To communicate with platform users (e.g. account setup, password reset, scheduled reports).")}</li>{siteText("\n      ")}<li>{siteText("To maintain the security, integrity, and proper functioning of the Portal.")}</li>{siteText("\n      ")}<li>{siteText("To comply with legal and contractual obligations.")}</li>{siteText("\n    ")}</ul>{siteText("\n\n    ")}<h2>{siteText("5. Lawful basis for processing")}</h2>{siteText("\n    ")}<p>{siteText("We process personal information on the basis of: performance of a contract with the employer client, our legitimate interests in operating and improving the Portal, consent (where applicable, e.g. for optional communications), and compliance with legal obligations.")}</p>{siteText("\n\n    ")}<h2>{siteText("6. Sharing of information")}</h2>{siteText("\n    ")}<p>{siteText("We do not sell personal information. We may share information with:")}</p>{siteText("\n    ")}<ul>{siteText("\n      ")}<li>{siteText("Employer clients, limited to the workforce data relevant to their own employees.")}</li>{siteText("\n      ")}<li>{siteText("Service providers who process data on our behalf under contract (e.g. our hosting provider, Railway and other contracted infrastructure providers, and email delivery provider), bound by confidentiality and security obligations.")}</li>{siteText("\n      ")}<li>{siteText("Regulators or law enforcement where required by law.")}</li>{siteText("\n    ")}</ul>{siteText("\n    ")}<p>{siteText("Where a service provider stores or processes personal information outside South Africa, we record the transfer in our governance register and require a documented basis under POPIA section 72, such as an adequate level of protection, appropriate agreement, consent where applicable, or another statutory basis that applies to the transfer.")}</p>{siteText("\n\n    ")}<h2>{siteText("7. Retention")}</h2>{siteText("\n    ")}<p>{siteText("We retain personal information only for as long as necessary for the purpose for which it was collected or as required or authorised by law, contract, legitimate recordkeeping requirements, or a documented legal hold. Retention periods are recorded in our data governance register and are reviewed before automated deletion is enabled. At the end of the applicable period, information is securely deleted, destroyed, anonymised or de-identified as appropriate.")}</p>{siteText("\n\n    ")}<h2>{siteText("8. Security measures and security compromises")}</h2>{siteText("\n    ")}<p>{siteText("We apply reasonable technical and organisational measures to protect personal information against loss, unauthorised access, alteration, destruction or unlawful processing, including encrypted password storage, role-based access control, session controls, access logging, security monitoring and incident response procedures.")}</p>{siteText("\n    ")}<p>{siteText("If there are reasonable grounds to believe that personal information has been accessed or acquired by an unauthorised person, we follow the applicable POPIA security-compromise process, including escalation to the Information Officer, investigation and containment, and notification to the Information Regulator and affected data subjects where required. Security incidents are recorded and tracked through an auditable incident workflow.")}</p>{siteText("\n\n    ")}<h2>{siteText("9. Your rights under POPIA")}</h2>{siteText("\n    ")}<p>{siteText("Subject to applicable law, you have the right to:")}</p>{siteText("\n    ")}<ul>{siteText("\n      ")}<li>{siteText("Request access to the personal information we hold about you.")}</li>{siteText("\n      ")}<li>{siteText("Request correction or deletion of inaccurate or outdated information.")}</li>{siteText("\n      ")}<li>{siteText("Object to processing of your information in certain circumstances.")}</li>{siteText("\n      ")}<li>{siteText("Withdraw consent where processing is based on consent.")}</li>{siteText("\n      ")}<li>{siteText("Lodge a complaint with the Information Regulator of South Africa (")}<a href={siteText("https://inforegulator.org.za")} target={siteText("_blank")}>{siteText("inforegulator.org.za")}</a>{siteText(") if you believe your information has been processed unlawfully.")}</li>{siteText("\n    ")}</ul>{siteText("\n    ")}<p>{siteText("To exercise any of these rights, contact our Information Officer at the details above. Requests relating to employee workforce data should generally be directed to your employer, who determines how that data is used on the Portal.")}</p>{siteText("\n\n    ")}<h2>{siteText("10. Data subject requests")}</h2>{siteText("\n    ")}<p>{siteText("Requests to access, correct, delete, object to processing, or withdraw consent where applicable can be submitted to the Information Officer using the contact details above. We may need to verify the requester’s identity before disclosing or changing personal information. Requests are logged, assigned and tracked to resolution. Where an employer is the responsible party for workforce information, the request may be referred to that employer as the party responsible for the relevant processing.")}</p>{siteText("\n\n    ")}<h2>{siteText("11. Automated decision-making and profiling")}</h2>{siteText("\n    ")}<p>{siteText("The Portal provides reporting and analytical outputs. We do not intend to use solely automated processing to make decisions that produce legal consequences for a person or affect them to a substantial degree. Where a processing activity could involve profiling or automated decision-making of that nature, it must be identified in the processing register and reviewed before being enabled.")}</p>{siteText("\n\n    ")}<h2>{siteText("12. Operators and service providers")}</h2>{siteText("\n    ")}<p>{siteText("Where we process personal information on behalf of an employer or another responsible party, we act only within the applicable mandate and confidentiality obligations. Operators and relevant service providers are subject to contractual and security requirements, and material processing relationships are recorded in our governance register.")}</p>{siteText("\n\n    ")}<h2>{siteText("13. Cookies")}</h2>{siteText("\n    ")}<p>{siteText("The Portal uses only the cookies necessary for it to function, see our ")}<a href={siteText("/cookies")}>{siteText("Cookie Notice")}</a>{siteText(" for details. We do not use third-party advertising or tracking cookies.")}</p>{siteText("\n\n    ")}<h2>{siteText("14. Changes to this policy")}</h2>{siteText("\n    ")}<p>{siteText("We may update this policy from time to time. Material changes will be communicated to platform users. The \"last updated\" date above reflects the most recent revision.")}</p>{siteText("\n\n    ")}<h2>{siteText("15. Contact us")}</h2>{siteText("\n    ")}<p>{siteText("Questions about this policy or how your information is handled can be sent to ")}<a href={siteText("mailto:{{PRIVACY_EMAIL}}")}>{siteText("{{PRIVACY_EMAIL}}")}</a>{siteText(".")}</p>{siteText("\n\n  ")}</div>{siteText("\n")}</div>
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
