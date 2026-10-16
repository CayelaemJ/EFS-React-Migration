import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {readdirSync} from 'node:fs';
import {resolve} from 'node:path';
export default defineConfig({
 base:'/react/', plugins:[react(),tailwindcss()],
 build:{outDir:'../public/react',emptyOutDir:true,
  rollupOptions:{input:Object.fromEntries(readdirSync(resolve(__dirname,'pages')).filter(x=>x.endsWith('.html')).map(x=>[x.slice(0,-5),resolve(__dirname,'pages',x)]))}},
 server:{port:5173,proxy:{'/api':'http://localhost:3000','/static':'http://localhost:3000'}}
});
