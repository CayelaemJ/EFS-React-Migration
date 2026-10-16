// Ported from New Changes users.html; keep source structure and CSS selectors intact.
import React from 'react';
import {AddUser,UsersList,RevokedUsers} from '../native/UsersManagement.jsx';
import {SecurityCenter} from '../native/SecurityCenter.jsx';
import BrandEngine from '../lib/brand-engine.js';
import {renderMarkup,insertMarkup,registerAction,decodeAttribute,onReady,createMarkupElement} from './runtime.jsx';
import {siteText} from '../native/site-config.js';
let actions=[];
export function Page(){return <>{siteText("\n")}
<div className={siteText("topbar")}><div className={siteText("topbar-inner")}>{siteText("\n  ")}<img src={siteText("/static/the-fixer-logo.svg?v=6")} className={siteText("efs-brand-logo")} alt={siteText("The Fixer")} style={{"height":"30px","width":"auto"}} ref={node => { if(node) node.setAttribute("style", "height:30px;width:auto;"); }}/>{siteText("\n  ")}<span className={siteText("pill")}>{siteText("User Management")}</span>{siteText("\n  ")}<div id={siteText("portal-nav")} style={{"marginLeft":"auto"}} ref={node => { if(node) node.setAttribute("style", "margin-left:auto;"); }}/>{siteText("\n  ")}<div id={siteText("portal-account")}/>{siteText("\n")}</div></div>
{siteText("\n\n")}
<div className={siteText("wrap")}>{siteText("\n  ")}<div className={siteText("head")}><h1>{siteText("Users")}</h1><p>{siteText("Create users, set their role, and link them to the employers they may see.")}</p></div>{siteText("\n  ")}<SecurityCenter/>{siteText("\n\n  ")}<AddUser/>{siteText("\n\n  ")}<UsersList/>{siteText("\n\n  ")}<RevokedUsers/>{siteText("\n")}</div>
{siteText("\n\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n")}

{siteText("\n\n\n")}</>;}
let started=false;
export function start(){if(started)return;started=true;
actions=[];

}
