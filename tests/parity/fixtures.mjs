import fs from 'node:fs';
import vm from 'node:vm';
import {parse} from '@babel/parser';
import {formatManifest} from '../../dist/services/templateGenerator.js';
import {REPORT_FORMATS,LOAD_ORDER} from '../../dist/services/reportFormats.js';
const source=fs.readFileSync('public/dashboard.html','utf8');
const code=[...source.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const ast=parse(code);
function object(name){for(const stmt of ast.program.body){if(stmt.type==='VariableDeclaration')for(const d of stmt.declarations)if(d.id.name===name)return vm.runInNewContext('('+code.slice(d.init.start,d.init.end)+')',{URLSearchParams,location:{search:'?demo=1'}});}}
export const dashboard=object('DATA');
export const portfolio=object('PORTFOLIO');
dashboard.dataAsOf='2026-10-01T00:00:00Z';
dashboard.filterOptions={sites:[{value:'all',label:'All sites'}],incomes:[{value:'all',label:'All incomes'}]};
export const me={id:'admin-1',name:'Test Administrator',email:'test@example.invalid',role:'SUPERADMIN',modules:{dashboard:true,portfolio:true,admin:true,users:true},sections:{},employers:[{id:'employer-1',name:dashboard.employer}],theme:null};
export const users=[{id:'user-1',name:'Example User',email:'user@example.invalid',role:'VIEWER',active:true,createdAt:'2026-10-01',employers:me.employers,employerIds:['employer-1'],accessDashboard:true,accessPortfolio:false}];
export const sections=[{key:'voiceOfEmployee',label:'Voice of the employee',enabled:true,allowedRoles:['ADMIN','SUPERADMIN','EMPLOYER_MANAGER','PORTFOLIO_MANAGER','VIEWER'],overrides:[{userId:'user-1',name:'Example User',email:'user@example.invalid'}]}];
export function fixture(url,method='GET'){
 const p=new URL(url).pathname;
 if(p==='/api/auth/me')return me;
 if(p.includes('/dashboard')&&!p.endsWith('version'))return dashboard;
 if(p==='/api/portfolio')return portfolio;
 if(p.endsWith('/periods'))return {periods:[{value:'2026-09',label:'September 2026'}],latest:'2026-09'};
 if(p==='/api/users')return method==='GET'?users:{ok:true};
 if(p==='/api/admin/sections')return sections;
 if(p==='/api/admin/email-settings')return {};
 if(p==='/api/admin/reports')return {loadOrder:LOAD_ORDER,reports:formatManifest(REPORT_FORMATS)};
 if(p.endsWith('/overview')||p.endsWith('/database')||p.endsWith('/integration')||p.endsWith('/email')||p.endsWith('/automations')||p.endsWith('/data-quality')||p.endsWith('/replica-health'))return {};
 if(p.includes('/engagement'))return {summary:{},daily:[],topUsers:[],topPages:[],events:[]};
 if(p.includes('/events')&&!p.includes('mlops'))return {};
 return [];
}
export async function mockApi(page,overrides={}){
 await page.route('**/api/**',async route=>{
  const request=route.request(),pathname=new URL(request.url()).pathname;
  const value=pathname in overrides?overrides[pathname]:fixture(request.url(),request.method());
  await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(value)});
 });
 await page.route('https://fonts.googleapis.com/**',route=>route.fulfill({body:'',contentType:'text/css'}));
}
