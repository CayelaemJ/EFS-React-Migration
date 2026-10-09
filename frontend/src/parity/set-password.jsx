// Ported from New Changes set-password.html; keep source structure and CSS selectors intact.
import React from 'react';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n  ")}
<div className={siteText("card")}>{siteText("\n    ")}<div className={siteText("logo")}><img src={siteText("/static/the-fixer-logo.svg?v=6")} className={siteText("efs-brand-logo")} alt={siteText("The Fixer")} style={{"height":"48px","width":"auto"}} ref={node => { if(node) node.setAttribute("style", "height:48px;width:auto;"); }}/></div>{siteText("\n    ")}<h1>{siteText("Set your password")}</h1>{siteText("\n    ")}<div className={siteText("sub")}>{siteText("Choose a password to activate your account")}</div>{siteText("\n    ")}<label htmlFor={siteText("p1")}>{siteText("New password")}</label>{siteText("\n    ")}<input id={siteText("p1")} type={siteText("password")} placeholder={siteText("12+ characters, upper-case, lower-case and a number")}/>{siteText("\n    ")}<label htmlFor={siteText("p2")}>{siteText("Confirm password")}</label>{siteText("\n    ")}<input id={siteText("p2")} type={siteText("password")} placeholder={siteText("re-enter password")}/>{siteText("\n    ")}<button id={siteText("btn")} onClick={event => actions[0]?.(event)}>{siteText("Set password & continue")}</button>{siteText("\n    ")}<div className={siteText("msg")} id={siteText("msg")}/>{siteText("\n  ")}</div>
{siteText("\n")}

{siteText("\n")}

{siteText("\n\n\n")}</>;}
let started=false;
export function start(){if(started)return;started=true;
actions=[event => {
  submit();
}];
const $ = s => document.querySelector(s);
const token = new URLSearchParams(location.search).get('token');
if (!token) {
  const m = $('#msg');
  m.className = 'msg err';
  m.textContent = 'This link is missing its token. Ask your administrator to resend it.';
  m.style.display = 'block';
  $('#btn').disabled = true;
}
async function submit() {
  const m = $('#msg');
  m.style.display = 'none';
  const p1 = $('#p1').value,
    p2 = $('#p2').value;
  if (p1.length < 12 || !/[A-Z]/.test(p1) || !/[a-z]/.test(p1) || !/[0-9]/.test(p1)) {
    show('err', 'Use at least 12 characters with upper-case, lower-case and a number.');
    return;
  }
  if (p1 !== p2) {
    show('err', 'Passwords do not match.');
    return;
  }
  const r = await fetch('/api/auth/set-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token,
      password: p1
    })
  });
  const d = await r.json();
  if (!r.ok) {
    show('err', d.error || 'Could not set password.');
    return;
  }
  show('ok', 'Password set! Redirecting to sign in…');
  setTimeout(() => location.href = '/login', 1600);
}
function show(t, msg) {
  const m = $('#msg');
  m.className = 'msg ' + t;
  m.textContent = msg;
  m.style.display = 'block';
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
