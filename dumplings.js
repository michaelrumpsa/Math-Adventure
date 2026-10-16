(function(root){
'use strict';
const C=root.JazzyDumplingCatalog||(typeof require==='function'?require('./dumpling-catalog.js'):null);
const safe=id=>typeof id==='string'&&/^[a-z0-9-]{1,100}$/.test(id),list=a=>Array.isArray(a)&&a.length<=100000&&a.every(safe),unique=a=>[...new Set(a)],integer=n=>Number.isSafeInteger(n)&&n>=0&&n<=1e7;
function valid(c){
 if(Array.isArray(c))return list(c); // Explicit legacy list format: keep the exact IDs.
 return !!(c&&c.version===1&&list(c.owned)&&list(c.favorites)&&list(c.decorations)&&list(c.rewardedSessions)&&integer(c.baskets)&&integer(c.nextBasket)&&integer(c.adventuresSinceBasket)&&integer(c.accessoryCount)&&integer(c.revision)&&c.settings&&[1,3,5].includes(c.settings.basketSize)&&[1,2,3,5].includes(c.settings.adventuresPerBasket)&&Array.isArray(c.shelf)&&c.shelf.length===6&&c.shelf.every(s=>s===null||(s&&['dumpling','decoration'].includes(s.kind)&&safe(s.id)))&&(!c.opening||validOpening(c.opening)));
}
function validOpening(o){return o&&safe(o.id)&&Number.isInteger(o.size)&&o.size>=1&&o.size<=5&&Array.isArray(o.contents)&&o.contents.length<=o.size&&new Set(o.contents.filter(s=>s?.kind==='dumpling').map(s=>s.id)).size===o.contents.filter(s=>s?.kind==='dumpling').length&&o.contents.every(s=>s&&['dumpling','decoration'].includes(s.kind)&&safe(s.id)&&safe(s.theme))&&Array.isArray(o.revealed)&&o.revealed.every(i=>Number.isInteger(i)&&i>=0&&i<o.contents.length)&&typeof o.opened==='boolean';}
function normalize(base){
 let c=base.dumplings;
 if(Array.isArray(c))c={owned:[...c]};
 if(!c)c={};
 const fresh=c.version===undefined;
 const saved={...c,version:1,owned:unique(c.owned||[]),favorites:unique(c.favorites||[]),decorations:unique(c.decorations||[]),rewardedSessions:unique(c.rewardedSessions||[]),baskets:integer(c.baskets)?c.baskets:0,nextBasket:integer(c.nextBasket)?c.nextBasket:1,adventuresSinceBasket:integer(c.adventuresSinceBasket)?c.adventuresSinceBasket:0,accessoryCount:integer(c.accessoryCount)?c.accessoryCount:0,revision:integer(c.revision)?c.revision:0,settings:{basketSize:C.config.basketSize,adventuresPerBasket:C.config.adventuresPerBasket,...c.settings},shelf:Array.isArray(c.shelf)?Array.from({length:6},(_,i)=>c.shelf[i]||null):Array(6).fill(null),opening:c.opening||null};
 saved.favorites=saved.favorites.filter(id=>saved.owned.includes(id));
 // Allocated contents are ownership, even when the wrapper has not been opened yet.
 if(saved.opening)for(const item of saved.opening.contents){const store=item.kind==='dumpling'?saved.owned:saved.decorations;if(!store.includes(item.id))store.push(item.id);}
 saved.migration=fresh?'dumplings-1':c.migration||'dumplings-1';
 saved.buddy=typeof c.buddy==='string'&&saved.owned.includes(c.buddy)&&C.byID.has(c.buddy)?c.buddy:null;
 base.dumplings=saved;completion(saved);return base;
}
function totals(c,theme=null){const ds=theme?C.dumplings.filter(d=>d.theme===theme):C.dumplings;return {owned:ds.filter(d=>c.owned.includes(d.id)).length,total:ds.length};}
function completion(c){const gifts=[];for(const t of C.themes){if(C.dumplings.some(d=>d.theme===t.id)&&C.dumplings.filter(d=>d.theme===t.id).every(d=>c.owned.includes(d.id))){const id='display-'+t.id;if(!c.decorations.includes(id)){c.decorations.push(id);gifts.push(id);}}}if(C.dumplings.every(d=>c.owned.includes(d.id))&&!c.decorations.includes('display-all')){c.decorations.push('display-all');gifts.push('display-all');}return gifts;}
function earn(base,sessionID){const c=base.dumplings;if(!safe(sessionID)||c.rewardedSessions.includes(sessionID))return {ok:false,baskets:0};c.rewardedSessions.push(sessionID);c.adventuresSinceBasket++;const baskets=Math.floor(c.adventuresSinceBasket/c.settings.adventuresPerBasket);c.adventuresSinceBasket%=c.settings.adventuresPerBasket;c.baskets+=baskets;c.revision++;return {ok:true,baskets,progress:c.adventuresSinceBasket,needed:c.settings.adventuresPerBasket};}
function remaining(c){return c.opening?c.opening.size-c.opening.contents.length:0;}
function finished(c){const o=c.opening;return !!(o&&remaining(c)===0&&o.contents.every((_,i)=>o.revealed.includes(i)));}
function addAccessories(c,slots){const o=c.opening;for(let i=0;i<slots;i++){const item=C.accessories[c.accessoryCount%C.accessories.length];c.accessoryCount++;if(!c.decorations.includes(item.id))c.decorations.push(item.id);o.contents.push({kind:'decoration',id:item.id,theme:'shelf'});}}
function allocate(c,theme,rng=Math.random){
 const o=c.opening;if(!o||!C.themes.some(t=>t.id===theme)||remaining(c)===0)return {ok:false};
 const pool=C.dumplings.filter(d=>d.theme===theme&&!c.owned.includes(d.id));const count=Math.min(pool.length,remaining(c));
 for(let n=0;n<count;n++){const j=Math.min(pool.length-1,Math.floor(Math.max(0,Math.min(.999999999,rng()))*pool.length));const d=pool.splice(j,1)[0];c.owned.push(d.id);o.contents.push({kind:'dumpling',id:d.id,theme:d.theme});}
 if(count)c.lastTheme=theme;const gifts=completion(c);
 if(C.dumplings.every(d=>c.owned.includes(d.id)))addAccessories(c,remaining(c));
 c.revision++;return {ok:count>0||remaining(c)===0,added:count,remaining:remaining(c),gifts};
}
function open(c,theme,rng=Math.random){
 if(c.opening)return {ok:false,resume:true};
 const all=totals(c).owned===C.dumplings.length;
 if(c.baskets<1||!all&&!C.dumplings.some(d=>d.theme===theme&&!c.owned.includes(d.id)))return {ok:false};
 c.baskets--;c.opening={id:'basket-'+c.nextBasket++,size:c.settings.basketSize,contents:[],revealed:[],opened:false};
 if(all){addAccessories(c,c.opening.size);c.revision++;return {ok:true,accessories:true};}
 return allocate(c,theme,rng);
}
function liftLid(c,id){if(c.opening?.id!==id||c.opening.opened)return false;c.opening.opened=true;c.revision++;return true;}
function reveal(c,id,index){const o=c.opening;if(!o||o.id!==id||!o.opened||!Number.isInteger(index)||index<0||index>=o.contents.length||o.revealed.includes(index))return false;o.revealed.push(index);c.revision++;return true;}
function revealAll(c,id){if(c.opening?.id!==id)return false;c.opening.opened=true;c.opening.revealed=c.opening.contents.map((_,i)=>i);c.revision++;return true;}
function close(c,id){if(c.opening?.id!==id||!finished(c))return false;c.opening=null;c.revision++;return true;}
function favorite(c,id){if(!c.owned.includes(id)||!C.byID.has(id))return false;c.favorites=c.favorites.includes(id)?c.favorites.filter(d=>d!==id):[...c.favorites,id];c.revision++;return true;}
function place(c,index,item){if(!Number.isInteger(index)||index<0||index>=6)return false;if(item&&(!['dumpling','decoration'].includes(item.kind)||!(item.kind==='dumpling'?c.owned:c.decorations).includes(item.id)))return false;c.shelf[index]=item?{...item}:null;c.revision++;return true;}
const api={valid,validOpening,normalize,totals,completion,earn,open,allocate,remaining,finished,liftLid,reveal,revealAll,close,favorite,place};root.JazzyDumplings=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
