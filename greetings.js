(function(root){
'use strict';
const library=[['bounce','Happy bounce'],['wave','Friendly wave'],['wiggle','Shy wiggle'],['bow','Little bow'],['twirl','Gentle twirl'],['kiss','Blown kiss'],['peekaboo','Peekaboo'],['dance','Happy dance'],['stretch','Sleepy stretch'],['hop','Excited hop'],['sway','Side-to-side sway'],['hug','Heart hug'],['star','Star celebration'],['wobble','Silly wobble'],['double-wave','Double wave'],['squish','Giggle and squish']].map(([id,name])=>({id,name}));
function choose(last,rng=Math.random,ids=library.map(g=>g.id)){const omit=Array.isArray(last)?last:[last],pool=ids.filter(id=>!omit.includes(id));return (pool.length?pool:ids)[Math.min((pool.length||ids.length)-1,Math.max(0,Math.floor(rng()*(pool.length||ids.length))))];}
function create({rng=Math.random,schedule=(f,n)=>setTimeout(f,n),clear=t=>clearTimeout(t),onChange=()=>{}}={}){
 let active=null,last=null,timer=null,serial=0;
 const cancel=()=>{if(timer!==null)clear(timer);timer=null;active=null;serial++;};
 const play=(id,kind='greeting',text='Hi, friend!',lead=0,avoid=[])=>{if(active&&kind==='greeting')return false;cancel();const animation=kind==='wrong'?'no':kind==='digit'?'nod':choose([last,...avoid],rng,kind==='correct'?['bounce','wave','wiggle','dance']:undefined);if(!['no','nod'].includes(animation))last=animation;const token=++serial,duration=kind==='greeting'?2600:kind==='wrong'?1000:kind==='digit'?650:1600;const total=duration+lead;active={id,kind,text,animation,token,duration,lead,started:Date.now()};timer=schedule(()=>{if(active?.token!==token)return;timer=null;active=null;onChange();},total);onChange();return active;};
 return {play,cancel,resetHistory:()=>{cancel();last=null;},remember:id=>{if(library.some(g=>g.id===id))last=id;},get active(){return active;},get last(){return last;}};
}
const api={library,choose,create};root.JazzyGreetings=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
