import '../native/utilities.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
export function mountPage(Page,start){
 const host=document.getElementById('root');
 if(!host)throw new Error('Missing application root');
 flushSync(()=>createRoot(host).render(<Page/>));
 // Full document navigation is intentional: the original routes, download
 // links, auth redirects and browser history all retain their semantics.
 start();
 document.documentElement.dataset.frontend='react';
}
