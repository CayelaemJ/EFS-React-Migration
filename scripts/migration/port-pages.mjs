/** One-time, reviewable conversion of the supplied New Changes pages to React.
 * The source HTML remains a reference fixture; production renders the JSX pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse as htmlParse } from 'parse5';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generateModule from '@babel/generator';
import * as t from '@babel/types';
const traverse = traverseModule.default, generate = generateModule.default;
const out = 'frontend/src/parity';
fs.mkdirSync(out, {recursive:true}); fs.mkdirSync('frontend/pages',{recursive:true});
const eventNames={click:'Click',change:'Change',input:'Input',submit:'Submit',keydown:'KeyDown',keyup:'KeyUp',keypress:'KeyPress',blur:'Blur',focus:'Focus',mouseover:'MouseOver',mouseout:'MouseOut',mouseenter:'MouseEnter',mouseleave:'MouseLeave',error:'Error',load:'Load'};
const props={class:'className',for:'htmlFor',tabindex:'tabIndex',readonly:'readOnly',maxlength:'maxLength',autofocus:'autoFocus',autocomplete:'autoComplete',colspan:'colSpan',rowspan:'rowSpan',viewbox:'viewBox',srcset:'srcSet',crossorigin:'crossOrigin'};
const bools=new Set('checked selected disabled hidden required multiple readOnly autoFocus noValidate'.split(' '));
const json=JSON.stringify;
function attrName(name){return props[name] || (name.startsWith('data-')||name.startsWith('aria-') ? name : name.replace(/-([a-z])/g,(_,x)=>x.toUpperCase()));}
function style(value){return Object.fromEntries(value.split(';').filter(x=>x.includes(':')).map(x=>{const i=x.indexOf(':');const k=x.slice(0,i).trim();return [k.startsWith('--')?k:k.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),x.slice(i+1).trim().replace(/\s*!important\s*$/,'')]}));}
function callback(code, expressions=[]){
 const ast=parse(`function callback(event){${code}}`);
 traverse(ast,{
  ThisExpression(p){p.replaceWith(t.memberExpression(t.identifier('event'),t.identifier('currentTarget')))},
  StringLiteral(p){
   if(!/PORT_EXPR_\d+_END/.test(p.node.value))return;
   const parts=p.node.value.split(/(PORT_EXPR_\d+_END)/); const quasis=[],ex=[]; let text='';
   for(const part of parts){const m=part.match(/^PORT_EXPR_(\d+)_END$/);if(m){quasis.push(t.templateElement({raw:text.replace(/`/g,'\\`'),cooked:text}));text='';ex.push(t.callExpression(t.identifier('decodeAttribute'),[t.cloneNode(expressions[Number(m[1])],true)]));}else text+=part;}
   quasis.push(t.templateElement({raw:text.replace(/`/g,'\\`'),cooked:text},true));p.replaceWith(t.templateLiteral(quasis,ex));p.skip();
  },
  Identifier(p){const m=p.node.name.match(/^PORT_EXPR_(\d+)_END$/);if(m){p.replaceWith(t.cloneNode(expressions[Number(m[1])],true));p.skip();}}
 });
 const fn=ast.program.body[0];return t.arrowFunctionExpression(fn.params,fn.body);
}
function transform(code){
 const ast=parse(code,{sourceType:'script'});
 traverse(ast,{FunctionDeclaration(p){if(p.node.id?.name==='el' && generate(p.node).code.includes('firstElementChild'))p.node.body=t.blockStatement([t.returnStatement(t.callExpression(t.identifier('createMarkupElement'),[t.identifier('html')]))]);}});
 // Compile inline template events to actual closures. Never eval HTML attributes.
 traverse(ast,{
  'TemplateLiteral|StringLiteral'(p){
   if(p.node.__ported)return;
   const original=p.node;
   const expressions=t.isTemplateLiteral(original)?original.expressions:[];
   const text=t.isTemplateLiteral(original)?original.quasis.map((q,i)=>q.value.cooked+(i<expressions.length?`PORT_EXPR_${i}_END`:'')).join(''):original.value;
   if(!/\bon[a-z]+="/.test(text))return;
   const handlers=[];
   const changed=text.replace(/\bon([a-z]+)="([^"]*)"/g,(_,ev,body)=>{
    if(!eventNames[ev])throw new Error('Unknown event '+ev);
    const index=expressions.length+handlers.length;
    handlers.push(t.callExpression(t.identifier('registerAction'),[callback(body,expressions)]));
    return `data-react-${ev}="PORT_EXPR_${index}_END"`;
   });
   const values=[...expressions,...handlers], pieces=changed.split(/(PORT_EXPR_\d+_END)/),quasis=[],ex=[];let raw='';
   for(const piece of pieces){const m=piece.match(/^PORT_EXPR_(\d+)_END$/);if(m){quasis.push(t.templateElement({raw:raw.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$\{/g,'\\${'),cooked:raw}));raw='';ex.push(t.cloneNode(values[Number(m[1])],true));}else raw+=piece;}
   quasis.push(t.templateElement({raw:raw.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$\{/g,'\\${'),cooked:raw},true));
   const node=t.templateLiteral(quasis,ex);node.__ported=true;p.replaceWith(node);p.skip();
  }
 });
 traverse(ast,{
  AssignmentExpression(p){const {left,right,operator}=p.node;if(t.isMemberExpression(left)&&t.isIdentifier(left.property,{name:'innerHTML'})){
   if(operator!=='=')throw new Error('Unsupported HTML assignment');p.replaceWith(t.callExpression(t.identifier('renderMarkup'),[left.object,right]));
  }},
  CallExpression(p){const c=p.node.callee;if(t.isMemberExpression(c)&&t.isIdentifier(c.property,{name:'insertAdjacentHTML'}))p.replaceWith(t.callExpression(t.identifier('insertMarkup'),[c.object,...p.node.arguments]));
   if(t.isMemberExpression(c)&&t.isIdentifier(c.property,{name:'addEventListener'})&&t.isStringLiteral(p.node.arguments[0])&&['DOMContentLoaded','load'].includes(p.node.arguments[0].value)&&t.isIdentifier(c.object)&&['document','window'].includes(c.object.name))p.replaceWith(t.callExpression(t.identifier('onReady'),[p.node.arguments[1]]));
  }
 });
 return generate(ast,{comments:true}).code;
}
// Keep the shared Brand Engine as ESM. A nested UMD module.exports branch can
// be consumed by Vite instead of attaching the engine to the browser window.
const brandSource=fs.readFileSync('public/brand-engine.js','utf8');
const brandBody=brandSource.slice(brandSource.indexOf("function () {\n  'use strict';")+13,brandSource.lastIndexOf('});'));
fs.writeFileSync('frontend/src/lib/brand-engine.js',`// Colour maths preserved from New Changes Brand Engine 1.4.0.\nconst BrandEngine=(()=>{${brandBody}\n})();\nexport default BrandEngine;\n`);
const manifest=[];
for(const file of fs.readdirSync('public').filter(x=>x.endsWith('.html'))){
 const name=file.slice(0,-5),source=fs.readFileSync('public/'+file,'utf8'),doc=htmlParse(source);
 const html=doc.childNodes.find(n=>n.tagName==='html'),head=html.childNodes.find(n=>n.tagName==='head'),body=html.childNodes.find(n=>n.tagName==='body');
 const handlers=[],scripts=[];
 let securityLayout=false;
 function collect(n){if(n.tagName==='script'){if(name==='users')return;const src=n.attrs.find(a=>a.name==='src')?.value; const inline=n.childNodes.map(n=>n.value||'').join(''); if(name==='users'&&!src&&inline.includes('async function addUser()'))return; scripts.push((src?.includes('portal-nav-v080.js')||src?.includes('admin-source-status.js'))?'':src?.includes('brand-engine.js')?'window.BrandEngine=BrandEngine;':src?fs.readFileSync('public/'+src.split('/').pop().split('?')[0],'utf8'):inline);}else n.childNodes?.forEach(collect)} collect(head);collect(body);
 function jsx(n){
  if(n.nodeName==='#comment'||n.tagName==='script')return '';
  if(n.nodeName==='#text')return n.value?`{siteText(${json(n.value)})}`:'';
  if(!n.tagName)return '';
  if(name==='admin'){
   const id=n.attrs?.find(a=>a.name==='id')?.value;
   if(id==='rep-list')return '<ReportPicker/>';
   if(id==='hist-body')return '<ImportHistoryRows/>';
   if(n.tagName==='div'&&n.attrs?.some(a=>a.name==='class'&&a.value==='card')&&n.childNodes?.some(child=>child.childNodes?.some(title=>title.attrs?.some(a=>a.name==='id'&&a.value==='rep-title'))))return '<ReportWorkspace/>';
  }
  if(name==='users'){
   const id=n.attrs?.find(a=>a.name==='id')?.value;
   if(id==='security-center'&&!securityLayout)return '<SecurityCenter/>';
   if(id==='user-list-card')return '<UsersList/>';
   if(id==='revoked-users-card')return '<RevokedUsers/>';
   if(n.tagName==='div'&&n.attrs?.some(a=>a.name==='class'&&a.value==='card')&&n.childNodes?.some(child=>child.childNodes?.some(title=>title.tagName==='h2'&&title.childNodes?.some(text=>text.value==='Add a user'))))return '<AddUser/>';
  }
  let attrs='';
  const nodeId=n.attrs?.find(a=>a.name==='id')?.value;
  for(const a of n.attrs||[]){let key=attrName(a.name);if(a.name.startsWith('on')){const ev=a.name.slice(2); if(securityLayout){const action={'loadSecurityCenter()':'refresh','renderSecuritySessions()':'search','downloadSecurityAuditLog()':'download'}[a.value];if(!action)throw new Error('Unknown security handler '+a.value);attrs+=` on${eventNames[ev]}={actions.${action}}`;continue;} const id=handlers.length;handlers.push(generate(callback(a.value)).code);attrs+=` on${eventNames[ev]}={event => actions[${id}]?.(event)}`;continue;}
   if(securityLayout&&key==='className'&&nodeId==='security-center'){attrs+=' className={"card"+(state.collapsed?" compact-collapsed":"")}';continue;}
   if(securityLayout&&key==='className'&&nodeId==='sec-db-status'){attrs+=' className={state.databaseClass}';continue;}
   if(key==='style'){attrs+=` style={${json(style(a.value))}} ref={node => { if(node) node.setAttribute("style", ${json(a.value)}); }}`;continue;}
   if(key==='value'&&['input','textarea','select'].includes(n.tagName))key='defaultValue';if(key==='checked')key='defaultChecked';
   if(key==='selected'){continue;}
   attrs+=bools.has(key)||key==='defaultChecked'?` ${key}={true}`:` ${key}={siteText(${json(a.value)})}`;
  }
  if(n.tagName==='select'){const option=n.childNodes?.find(x=>x.tagName==='option'&&x.attrs?.some(a=>a.name==='selected'));if(option)attrs+=` defaultValue={${json(option.attrs.find(a=>a.name==='value')?.value||'')}}`;}
  let children=(n.childNodes||[]).map(jsx).join('');
  if(securityLayout){
   const fields={'sec-live':'live','sec-failed':'failed','sec-alerts':'alertsCount','sec-success':'success','security-state-title':'title','security-state-copy':'copy','sec-session-rows':'sessions','sec-alert-rows':'alerts','sec-login-rows':'logins','sec-device-rows':'devices','sec-access-rows':'access','sec-db-copy':'databaseCopy','sec-db-status':'databaseStatus','sec-db-controls':'databaseControls'};
   if(fields[nodeId])children=`{state.${fields[nodeId]}}`;
   if(nodeId==='sec-search')attrs+=' value={state.search}';
   if(nodeId==='sec-status')attrs+=' value={state.status} onChange={actions.status}';
   if(n.attrs?.some(a=>a.name==='class'&&a.value==='card-hd')&&n.parentNode?.attrs?.some(a=>a.name==='id'&&a.value==='security-center'))children+='<button type="button" className="btn btn-sm compact-toggle" aria-expanded={!state.collapsed} onClick={actions.toggle}>{state.collapsed?"Expand":"Collapse"}</button>';
  }
  if(n.tagName==='textarea'){return `<textarea${attrs} defaultValue={${json((n.childNodes||[]).map(x=>x.value||'').join(''))}}/>`;}
  return children?`<${n.tagName}${attrs}>${children}</${n.tagName}>`:`<${n.tagName}${attrs}/>`;
 }
 if(name==='users'){
  function findSecurity(n){if(n.attrs?.some(a=>a.name==='id'&&a.value==='security-center'))return n;for(const child of n.childNodes||[]){const found=findSecurity(child);if(found)return found;}}
  securityLayout=true;const securityMarkup=jsx(findSecurity(body));securityLayout=false;
  fs.writeFileSync(`${out}/users-security-layout.jsx`,`// NewChanges security layout; all data and actions are owned by React.\nimport React from 'react';\nimport {siteText} from '../native/site-config.js';\nexport function SecurityLayout({state,actions}){return (${securityMarkup});}\n`);
 }
 const markup=body.childNodes.map(jsx).join('\n');
 let controllerSource=scripts.join('\n;\n');
 if(name==='admin'){
  const manifestStart=controllerSource.indexOf("  try{\n    const r=await fetch(`${API}/api/admin/reports`");
  const manifestEnd=controllerSource.indexOf('  const optionalLoads=[',manifestStart);
  if(manifestStart<0||manifestEnd<0)throw new Error('Missing report manifest migration boundary');
  controllerSource=controllerSource.slice(0,manifestStart)+'  try{ MANIFEST=await initializeReports(value=>{MANIFEST=value;}); }catch(e){ return; }\n\n'+controllerSource.slice(manifestEnd);
  const pickerStart=controllerSource.indexOf('function renderRepList(){');
  const pickerEnd=controllerSource.indexOf('async function pollJob(',pickerStart);
  if(pickerStart<0||pickerEnd<0)throw new Error('Missing report picker migration boundary');
  controllerSource=controllerSource.slice(0,pickerStart)+controllerSource.slice(pickerEnd);
  const uploadStart=controllerSource.indexOf('async function upload(file){');
  const uploadEnd=controllerSource.indexOf('function installCompactCollapse(){',uploadStart);
  if(uploadStart<0||uploadEnd<0)throw new Error('Missing import migration boundary');
  controllerSource=controllerSource.slice(0,uploadStart)+'function loadHistory(){return refreshImportHistory();}\n\n'+controllerSource.slice(uploadEnd);
  controllerSource=controllerSource.replace(/window\.setInterval\(\(\) => \{\n  if\(document\.visibilityState !== 'visible'\) return;\n  loadHistory\(\);\n\}, 1500\);/,'');
 }
 if(name==='dashboard'){
  const quickStart=controllerSource.indexOf('function openQuickActions(){');
  const quickEnd=controllerSource.indexOf('/* rebuild DATA',quickStart);
  if(quickStart<0||quickEnd<0)throw new Error('Missing quick-actions migration boundary');
  controllerSource=controllerSource.slice(0,quickStart)+'function openQuickActions(){showQuickActions();}\n'+controllerSource.slice(quickEnd);
  const scheduleStart=controllerSource.indexOf('/* ─────── scheduled reports');
  const scheduleEnd=controllerSource.indexOf('/* ─────── drill-down drawer',scheduleStart);
  if(scheduleStart<0||scheduleEnd<0)throw new Error('Missing schedule migration boundary');
  controllerSource=controllerSource.slice(0,scheduleStart)+'function openScheduleReport(){showScheduleReport({me:window.__ME__||{},data:DATA,employerId:employerIdFromUrl(),period:periodFromUrl()});}\n'+controllerSource.slice(scheduleEnd);
 }
 const control=transform(controllerSource);
 const code=`// Ported from New Changes ${file}; keep source structure and CSS selectors intact.\nimport React from 'react';\n${name==='users'?"import {AddUser,UsersList,RevokedUsers} from '../native/UsersManagement.jsx';\nimport {SecurityCenter} from '../native/SecurityCenter.jsx';\n":''}${name==='dashboard'?"import {showQuickActions,showScheduleReport} from '../native/DashboardDialogs.jsx';\n":''}import BrandEngine from '../lib/brand-engine.js';\nimport {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';\nimport {siteText} from '../native/site-config.js';\nlet actions=[];\nexport function Page(){return <>${markup}</>;}\nlet started=false;\nexport function start(){if(started)return;started=true;\nactions=[${handlers.join(',\n')}];\n${control}\n}\n`;
 fs.writeFileSync(`${out}/${name}.jsx`,code);
 if(name==='admin')fs.writeFileSync(`${out}/${name}.jsx`,code.replace("import React from 'react';", "import React from 'react';\nimport {ReportPicker,ReportWorkspace,ImportHistoryRows,initializeReports,refreshImportHistory} from '../native/AdminReports.jsx';"));
 const native=fs.existsSync(`frontend/src/native/${name}.jsx`);
 const staticPage=['home','404','privacy','terms','cookies','thank-you'].includes(name);
 let entry=native
  ? `import {mountPage} from './mount.jsx';\nimport {Page} from '../native/${name}.jsx';\nmountPage(Page,()=>{});\n`
  : staticPage
  ? `import React from 'react';\nimport {mountPage} from './mount.jsx';\nimport {Page} from './${name}.jsx';\nimport {Shared} from '../native/Shared.jsx';\nmountPage(()=> <Shared><Page/></Shared>,()=>{});\n`
  : `import React from 'react';\nimport {mountPage} from './mount.jsx';\nimport {Page,start} from './${name}.jsx';\nimport {PortalNavigation,installPortalNavigation} from '../native/PortalNavigation.jsx';\ninstallPortalNavigation();\nmountPage(()=> <><Page/><PortalNavigation/></>,start);\n`;
 if(['dashboard','admin','users'].includes(name))entry="import {SourceStatus} from '../native/SourceStatus.jsx';\n"+entry.replace('<PortalNavigation/>','<PortalNavigation/><SourceStatus/>');
 if(name==='dashboard')entry="import {DashboardDialogs} from '../native/DashboardDialogs.jsx';\n"+entry.replace('<PortalNavigation/>','<PortalNavigation/><DashboardDialogs/>');
 if(name==='users')entry="import {UsersProvider} from '../native/UsersManagement.jsx';\n"+entry.replace('<><Page/><PortalNavigation/><SourceStatus/></>','<UsersProvider><Page/><PortalNavigation/><SourceStatus/></UsersProvider>');
 if(name==='admin')entry="import {AdminReportsProvider} from '../native/AdminReports.jsx';\n"+entry.replace('<><Page/><PortalNavigation/><SourceStatus/></>','<AdminReportsProvider><Page/><PortalNavigation/><SourceStatus/></AdminReportsProvider>');
 fs.writeFileSync(`${out}/${name}.entry.jsx`,entry);
 let skeleton=source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 skeleton=skeleton.replace(/<body([^>]*)>[\s\S]*<\/body>/i,`<body$1><div id="root" style="display:contents"></div><script type="module" src="/src/parity/${name}.entry.jsx"></script></body>`);
 skeleton=skeleton.replace('</head>','<meta name="portal-config" content="{{PORTAL_CONFIG}}"></head>');
 fs.writeFileSync(`frontend/pages/${file}`,skeleton);
 manifest.push({page:name,source:file,implementation:native||staticPage?'declarative-react':'transitional-controller',navigation:['dashboard','admin','users'].includes(name)?'declarative-react':null,staticHandlers:handlers.length,scripts:scripts.length});
}
fs.writeFileSync('frontend/parity-manifest.json',json(manifest,null,2)+'\n');
console.log('Converted',manifest.length,'pages to React JSX.');
