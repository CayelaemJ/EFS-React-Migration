// Local verification fixture server. Never used by production startup.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.ico':'image/x-icon','.svg':'image/svg+xml'};
for(const original of [false,true])http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');let file;
 if(url.pathname.startsWith('/static/'))file='public/'+url.pathname.slice(8);
 else if(url.pathname.startsWith('/react/assets/'))file='public/'+url.pathname.slice(1);
 else file=(original?'public/':'public/react/pages/')+(url.pathname==='/'?'home':url.pathname.slice(1))+'.html';
 try{let bytes=await fs.readFile(path.resolve(file));if(file.endsWith('.html'))bytes=Buffer.from(bytes.toString().replace(/\{\{PORTAL_CONFIG\}\}/g,'{}').replace(/\{\{BASE_URL\}\}/g,'http://localhost:'+ (original?4101:4100)));res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(bytes);}
 catch{res.statusCode=404;res.end('not found');}
}).listen(original?4101:4100,'127.0.0.1');
console.log('Fixture servers ready on 4100 (React) and 4101 (source)');
