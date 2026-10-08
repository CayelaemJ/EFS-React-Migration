import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import parse, {attributesToProps, domToReact} from 'html-react-parser';

// The existing calculation/API controllers are retained, while their template
// output is rendered as React elements. HTML event attributes are compiled to
// closures by port-pages.mjs; no eval, Function constructor or script injection.
const actions = new Map();
const roots = new Map();
let nextAction = 0;
const events = {click:'onClick',change:'onChange',input:'onInput',submit:'onSubmit',keydown:'onKeyDown',keyup:'onKeyUp',keypress:'onKeyPress',blur:'onBlur',focus:'onFocus',mouseover:'onMouseOver',mouseout:'onMouseOut',mouseenter:'onMouseEnter',mouseleave:'onMouseLeave',error:'onError',load:'onLoad'};
export function registerAction(fn) {const id=String(++nextAction);actions.set(id,fn);return id;}
export function decodeAttribute(value) {
 const textarea=document.createElement('textarea');
 // Parse entities only; the textarea context cannot execute markup.
 textarea.innerHTML=String(value??'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 return textarea.value;
}
export const onReady = fn => queueMicrotask(()=>fn(new Event('DOMContentLoaded')));
function elements(markup, ids){
 const options={replace(node){
  if(node.type==='script'||node.name==='script')return <></>;
  if(!node.attribs)return;
  const props=attributesToProps(node.attribs);
  if(node.attribs.style)props.ref=element=>{if(element)element.setAttribute("style",node.attribs.style);};
  for(const [key,value] of Object.entries(node.attribs)){
   if(/^on/i.test(key)){delete props[key];continue;}
   if(key.startsWith('data-react-')){
    const event=events[key.slice(11)],fn=actions.get(value);
    if(event&&fn){ids.add(value);props[event]=e=>{if(fn(e)===false){e.preventDefault();e.stopPropagation();}};}
   }
  }
  // Keep form controls uncontrolled: controllers read/write their current value
  // and React never resets an in-progress edit on a data refresh.
  if(['input','textarea','select'].includes(node.name)){
   if('value'in props){props.defaultValue=props.value;delete props.value;}
   if('checked'in props){props.defaultChecked=props.checked;delete props.checked;}
  }
  if(node.name==='select'){
   const selected=[];
   const collect=child=>{if(child.name==='option'&&Object.hasOwn(child.attribs||{},'selected'))selected.push(child.attribs.value??child.children?.map(x=>x.data||'').join(''));child.children?.forEach(collect);};
   node.children?.forEach(collect);
   if(selected.length)props.defaultValue=props.multiple?selected:selected[0];
  }
  if(node.name==='option'&&'selected'in props){delete props.selected;}
  const children=domToReact(node.children||[],options);
  const voidTag=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(node.name);
  return React.createElement(node.name,props,voidTag?undefined:children);
 }};
 return parse(String(markup??''),options);
}
function release(host, record){
 flushSync(()=>record.root.unmount());
 for(const id of record.ids)actions.delete(id);
 roots.delete(host);
}
export function renderMarkup(host, markup){
 ensureObserver();
 if(!host)throw new Error('Missing React content host');
 // Controllers can replace a whole section after an API error. Dispose its
 // descendant React roots before removing their containers.
 for(const [child,record]of [...roots])if(child===host||host.contains(child))release(child,record);
 const ids=new Set(),content=elements(markup,ids);
 const root=createRoot(host);
 roots.set(host,{root,ids});
 flushSync(()=>root.render(content));
 // Browser HTML selects honour selected attributes. Apply that initial choice
 // after commit without making React control the live selection.
 if(host.tagName==='SELECT'){
  const template=document.createElement('template');template.innerHTML=String(markup??'');
  const selected=template.content.querySelector('option[selected]');
  if(selected)host.value=selected.value;
 }
 return markup;
}
export function insertMarkup(host, position, markup){
 if(position!=='beforeend')throw new Error('Unsupported insertion position');
 return renderMarkup(host,host.innerHTML+String(markup));
}
// Detached overlays and rebuilt charts must release their React roots/actions.
let queued=false,observing=false;
function ensureObserver(){if(observing)return;observing=true;
new MutationObserver(()=>{
 if(queued)return;queued=true;
 queueMicrotask(()=>{queued=false;for(const [host,record]of [...roots])if(!host.isConnected)release(host,record);});
}).observe(document.documentElement,{subtree:true,childList:true});
}
export function createMarkupElement(markup){
 const template=document.createElement('template');template.innerHTML=String(markup).trim();
 const source=template.content.firstElementChild;
 if(!source)throw new Error('Expected one content element');
 const host=document.createElement(source.tagName);
 for(const attr of source.attributes){
  if(/^on/i.test(attr.name))continue;
  host.setAttribute(attr.name,attr.value);
  if(attr.name.startsWith('data-react-')){
   const type=attr.name.slice(11),fn=actions.get(attr.value);
   if(fn){host.addEventListener(type,event=>{if(fn(event)===false){event.preventDefault();event.stopPropagation();}});actions.delete(attr.value);}
  }
 }
 renderMarkup(host,source.innerHTML);
 return host;
}
