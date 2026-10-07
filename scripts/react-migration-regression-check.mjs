import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
const traverse=traverseModule.default;
const read=file=>fs.readFileSync(file,'utf8');
const manifest=JSON.parse(read('frontend/parity-manifest.json'));
assert.equal(manifest.length,12,'Every source page must have a React entry');
for(const {page}of manifest){
 const jsx=read(`frontend/src/parity/${page}.jsx`),built=read(`public/react/pages/${page}.html`);
 assert.match(jsx,/export function Page\(/,`${page}: missing component`);
 assert.match(built,/<script[^>]+type="module"/,`${page}: missing built module`);
 assert.doesNotMatch(built,/<script[^>]*src="\/static\//,`${page}: legacy script entry`);
 assert.doesNotMatch(jsx,/dangerouslySetInnerHTML|\beval\s*\(|new Function\s*\(/,`${page}: executable HTML wrapper`);
 const ast=parse(jsx,{sourceType:'module',plugins:['jsx']});
 traverse(ast,{AssignmentExpression(p){assert.notEqual(p.node.left?.property?.name,'innerHTML',`${page}: raw HTML write`);}});
 for(const [,asset]of built.matchAll(/(?:src|href)="(\/react\/assets\/[^"?]+)"/g))assert.ok(fs.existsSync('public'+asset),`${page}: missing ${asset}`);
 for(const [,asset]of built.matchAll(/(?:src|href)="(\/static\/[^"?]+)(?:\?[^\"]*)?"/g))assert.ok(fs.existsSync('public/'+asset.slice(8)),`${page}: missing ${asset}`);
}
const server=read('src/server.ts');
assert.ok(server.includes('join(PUBLIC_DIR, "react", "pages", file)'),'Canonical routes must serve built React pages');
assert.ok(server.includes('canAccessModule(user, "dashboard")'));
assert.ok(server.includes('canAccessModule(user, "admin")'));
assert.ok(server.includes('user.role !== "ADMIN" && user.role !== "SUPERADMIN"'));
assert.equal((server.match(/allowedPath: \(pathname\) => !pathname.endsWith\(".html"\)/g)||[]).length,2,'Static HTML must not bypass canonical page routing');
assert.equal(JSON.parse(read('railway.json')).deploy.healthcheckPath,'/health');
console.log('PASS: 12 React page entries, built assets, canonical routes and protected routing');
console.log('NOTE: parity controllers still use imperative DOM operations; this is not proof of a completed declarative React migration.');
