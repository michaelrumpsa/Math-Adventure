(function(root){
'use strict';
function createClock({now=()=>Date.now(),schedule=(f,t)=>typeof setTimeout==='function'?setTimeout(f,t):null,clear=t=>{if(typeof clearTimeout==='function')clearTimeout(t);},onHint=()=>{}}={}){
 let key=null,remaining=0,started=null,timer=null,shown=false,delay=10000,serial=0;
 function pause(){serial++;if(timer!==null)clear(timer);timer=null;if(started!==null){remaining=Math.max(0,remaining-(now()-started));started=null;}}
 function cancel(){pause();key=null;shown=false;remaining=0;}
 function update(s){if(!s.key){cancel();return;}if(s.key!==key){pause();key=s.key;delay=s.delay;remaining=delay;shown=false;}if(!s.ready||!s.enabled||s.shown||shown){pause();return;}if(s.paused){pause();return;}if(s.delay!==delay){pause();remaining=Math.max(0,remaining+s.delay-delay);delay=s.delay;}if(started!==null)return;started=now();const owner=key,token=++serial;timer=schedule(()=>{if(token!==serial||key!==owner||shown)return;timer=null;started=null;remaining=0;shown=true;onHint(owner);},remaining);}
 return {update,cancel,pause,get remaining(){return started===null?remaining:Math.max(0,remaining-(now()-started));},get shown(){return shown;}};
}
root.MathElevator={createClock};if(typeof module!=='undefined')module.exports=root.MathElevator;
})(globalThis);

let elevatorGateUntil=0,elevatorGateTimer=null,elevatorGateSerial=0;
const elevatorClock=MathElevator.createClock({onHint:()=>{if(elevatorReady()&&!elevatorPaused())showElevatorHint();}});
function elevatorKey(){return screen==='math'&&session?`${currentPlayerId}:${session.id}:${session.index}:${session.p.a}:${session.p.b}`:null;}
function elevatorReady(){return screen==='math'&&!!workspace&&!workspace.applied&&!locked;}
function adjustmentDigits(){return Math.max(session.p.a,session.p.b)>=100?2:1;}
function adjustmentLimit(){return adjustmentDigits()===1?9:Math.min(99,session.max);}
function elevatorPaused(){if(typeof document==='undefined')return false;if(document.hidden||document.querySelector('dialog[open]'))return true;const field=document.querySelector('.elevator [data-field="adjust1"]');if(field?.getBoundingClientRect&&typeof window!=='undefined'){const r=field.getBoundingClientRect(),height=window.visualViewport?.height||window.innerHeight;return r.bottom<=0||r.top>=height;}return false;}
function showElevatorHint(){if(!elevatorReady())return;workspace.hintShown=true;workspace.hintStage=1;hint=Math.max(1,hint);render();}
function elevatorHintData(){if(!workspace?.hintShown||screen!=='math'||locked)return null;const p=session.p,k=M.friendlyChange(p,session.max);if(k===null)return null;
 const bottom=Number(workspace.amounts[1]),hasBottom=workspace.amounts[1]!==''&&bottom>0&&bottom<=adjustmentLimit(),signed=hasBottom?(workspace.signs[1]==='−'?-bottom:bottom):k;
 const topStep=!!workspace.applied||hasBottom&&workspace.mode==='independent'&&(workspace.amounts[0]!==workspace.amounts[1]||workspace.signs[0]!==workspace.signs[1]);
 if(workspace.applied&&answerDigits.some(d=>d!==''&&d!==undefined))return null;
 const change=workspace.applied?.change||(topStep?signed:k),n=Math.abs(change),sign=change<0?'−':'+',from=topStep?p.a:p.b,to=from+change;if(to<0)return null;
 return {stage:topStep?2:1,change,text:topStep?(change<0?`Take ${n} away from the top number too!`:`Add ${n} to the top number too!`):`Let’s make ${p.b} a friendly ten!`,equation:`${from} ${sign} ${n} = ${to}`};
}
function elevatorHintMarkup(data){return `<span class="elevator-hint-text">${data.text}</span><span class="elevator-hint-equation" aria-label="${data.equation}">${data.equation}</span>`;}
function elevatorHintSpeech(data){if(!state.settings.sound||!state.settings.buddyReadAloud||typeof speechSynthesis==='undefined'||typeof SpeechSynthesisUtterance==='undefined')return;const voice=speechSynthesis.getVoices?.().find(v=>v.localService);if(!voice)return;stopCompanionSpeech();const speech=new SpeechSynthesisUtterance(data.text+' '+data.equation);speech.voice=voice;companionSpeech=true;speech.onend=()=>companionSpeech=false;speechSynthesis.speak(speech);}
function elevatorSync(){const key=elevatorKey(),ready=elevatorReady(),data=elevatorHintData();elevatorClock.update({key,ready,enabled:state.settings.autoElevatorHints&&!workspace?.everApplied,shown:!!workspace?.hintShown,paused:elevatorPaused(),delay:state.settings.elevatorHintDelay*1000});
 if(!document.querySelectorAll)return;
 const buddy=document.querySelector('.buddy-panel');if(buddy){let box=buddy.querySelector('.elevator-buddy-hint');if(data&&!box){box=document.createElement('div');box.className='elevator-buddy-hint';box.setAttribute('role','status');buddy.append(box);}if(box){const html=data?elevatorHintMarkup(data):'';if(box.innerHTML!==html)box.innerHTML=html;box.hidden=!data;}buddy.classList.toggle('has-elevator-hint',!!data);}
 const neutral=document.querySelector('[data-elevator-neutral]');if(neutral){const r=(buddy?.querySelector('.elevator-buddy-hint')||buddy)?.getBoundingClientRect?.(),outOfView=r&&(r.top<0||r.bottom>(window.visualViewport?.height||window.innerHeight));const local=!buddy||outOfView;const html=data&&local?elevatorHintMarkup(data):'';if(neutral.innerHTML!==html)neutral.innerHTML=html;neutral.hidden=!data||!local;}
 const elevator=document.querySelector('.elevator');if(elevator){elevator.classList.toggle('hint-bottom',data?.stage===1);elevator.classList.toggle('hint-top',data?.stage===2);}
 if(data&&workspace.lastSpokenHint!==`${data.stage}:${data.change}`){workspace.lastSpokenHint=`${data.stage}:${data.change}`;elevatorHintSpeech(data);}
 if(!key){elevatorGateUntil=0;if(elevatorGateTimer!==null)clearTimeout(elevatorGateTimer);elevatorGateTimer=null;}
 for(const button of document.querySelectorAll('.pad [data-key]'))button.disabled=locked||Date.now()<elevatorGateUntil;
}
function pauseAfterAutoApply(){if(typeof setTimeout!=='function')return;const token=++elevatorGateSerial;elevatorGateUntil=Date.now()+180;if(elevatorGateTimer!==null)clearTimeout(elevatorGateTimer);const owner=elevatorKey();elevatorGateTimer=setTimeout(()=>{elevatorGateTimer=null;if(token===elevatorGateSerial&&owner===elevatorKey()){elevatorGateUntil=0;elevatorSync();}},180);}
function finishAdjustment(){if(!workspace||locked||!activeField.startsWith('adjust'))return;const i=Number(activeField.at(-1));workspace.done=workspace.done||[false,false];workspace.done[i]=true;if(workspace.mode==='guided')workspace.done[1-i]=true;tryAutoAdjustment();if(!workspace.applied&&workspace.amounts[1-i]==='')activeField='adjust'+(1-i);render();}
function tryAutoAdjustment(){if(!workspace||locked)return;const w=workspace;if(w.amounts.some(v=>v===''))return;if(adjustmentDigits()>1&&!w.done?.every(Boolean))return;if(w.amounts.some(v=>Number(v)<1||Number(v)>adjustmentLimit())){w.error=`Choose a change from 1 to ${adjustmentLimit()}.`;return;}if(Number(w.amounts[0])!==Number(w.amounts[1])||w.signs[0]!==w.signs[1]){w.error='Use the same change for both.';return;}applyWorkspace(false);}
function elevatorAction(b){if(b.dataset.action==='elevator-hint'){showElevatorHint();return true;}if(b.dataset.action==='finish-adjustment'){finishAdjustment();return true;}return false;}
function installElevator(){if(typeof document.addEventListener==='function'){document.addEventListener('visibilitychange',elevatorSync);document.addEventListener('scroll',elevatorSync,{passive:true,capture:true});}if(typeof window!=='undefined'){const resize=()=>{document.documentElement.style.setProperty('--visible-height',(window.visualViewport?.height||window.innerHeight)+'px');elevatorSync();};window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);resize();}if(typeof MutationObserver!=='undefined')new MutationObserver(elevatorSync).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['open']});}
