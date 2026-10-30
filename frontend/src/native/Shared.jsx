import React,{useEffect,useState} from 'react';
export function useCookieNotice(){
 const [visible,setVisible]=useState(()=>{try{return localStorage.getItem('cookieNoticeDismissed')!=='1';}catch{return true;}});
 return [visible,()=>{try{localStorage.setItem('cookieNoticeDismissed','1');}catch{}setVisible(false);}];
}
export function Shared({children,ownCookie=false}){
 const [visible,dismiss]=useCookieNotice();const [pending,setPending]=useState(0);const [width,setWidth]=useState(0);
 useEffect(()=>{
  const nativeFetch=window.fetch;
  const trackedFetch=async(...args)=>{
   const target=typeof args[0]==='string'?args[0]:args[0]?.url||'';
   const track=target.includes('/api/')&&!target.includes('/api/analytics/');
   if(track)setPending(n=>n+1);
   try{return await nativeFetch(...args);}finally{if(track)setPending(n=>Math.max(0,n-1));}
  };
  window.fetch=trackedFetch;
  return()=>{if(window.fetch===trackedFetch)window.fetch=nativeFetch;};
 },[]);
 useEffect(()=>{if(!pending){setWidth(100);const timer=setTimeout(()=>setWidth(0),250);return()=>clearTimeout(timer);}setWidth(8);const timer=setInterval(()=>setWidth(n=>n+(90-n)*.12),250);return()=>clearInterval(timer);},[pending>0]);
 useEffect(()=>{
  const start=Date.now(),seen=new Set();let timer;
  const send=(type,value=null)=>{const body=JSON.stringify({type,path:location.pathname,value});try{if(navigator.sendBeacon){navigator.sendBeacon('/api/analytics/event',new Blob([body],{type:'application/json'}));return;}fetch('/api/analytics/event',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true}).catch(()=>{});}catch{}};
  const click=event=>{const el=event.target.closest?.('button,[role="button"],a');if(el?.tagName==='A'&&el.hostname!==location.hostname)send('OUTBOUND_CLICK');else if(el&&(el.tagName==='BUTTON'||el.getAttribute('role')==='button'))send('CTA_CLICK');};
  const submit=()=>send('FORM_SUBMIT'),error=()=>send('CLIENT_ERROR'),end=()=>send('SESSION_END',Math.round((Date.now()-start)/1000));
  const visibility=()=>{if(document.visibilityState==='hidden')end();};
  const scroll=()=>{if(timer)return;timer=setTimeout(()=>{timer=null;const pct=100*window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight);for(const depth of [25,50,75,100])if(pct>=depth&&!seen.has(depth)){seen.add(depth);send('SCROLL_DEPTH',depth);}},400);};
  document.addEventListener('click',click,true);document.addEventListener('submit',submit,true);document.addEventListener('visibilitychange',visibility);window.addEventListener('error',error);window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('pagehide',end);send('PAGEVIEW');
  return()=>{clearTimeout(timer);document.removeEventListener('click',click,true);document.removeEventListener('submit',submit,true);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('error',error);window.removeEventListener('scroll',scroll);window.removeEventListener('pagehide',end);};
 },[]);
 return <>{children}<div id="ent-progress" role="progressbar" aria-hidden="true" className={width?'on':''} style={{width:width+'%'}}/>{visible&&!ownCookie&&<div id="ent-cookie" className="ent-cookie" role="region" aria-label="Cookie notice"><div className="inner"><p>We use one strictly necessary cookie to keep you signed in. There are no advertising or cross-site tracking cookies. See our <a href="/cookies">Cookie Notice</a>.</p><button type="button" onClick={dismiss}>Got it</button></div></div>}</>;
}
export async function postJSON(url,body){
 const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),credentials:'same-origin'});
 const data=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(data.error||'The request failed. Please try again.');
 return data;
}
