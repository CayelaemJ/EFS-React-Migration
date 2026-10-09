let config;
export function siteText(value){
 if(!config){try{config=JSON.parse(document.querySelector('meta[name="portal-config"]')?.content||'{}');}catch{config={};}}
 return String(value).replace(/\{\{([A-Z_]+)\}\}/g,(match,key)=>config[key]??match);
}
