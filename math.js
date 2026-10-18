(function(root){
const answer=p=>p.op==='+'?p.a+p.b:p.a-p.b;
function generate(max,operation,easy=false,strategy='count',rng=Math.random){
 const n=x=>Math.floor(rng()*x);const op=operation==='mixed'?(rng()<.5?'+':'−'):operation==='addition'?'+':'−';
 let a,b;
 if(easy){a=3;b=2;}
 else if(op==='−'&&strategy!=='count'&&max>=10){const options=[9,19,29,39,49,59,69,79,89].filter(x=>x<max);b=options[n(options.length)];a=b+n(max-b+1);}
 else if(op==='+'){a=1+n(max);b=n(max===100?max+1:max-a+1);}
 else {a=1+n(max);b=n(a+1);}
 return {a,b,op};
}
function steps(p,strategy){
 if(p.op==='+')return [{text:'Start with the ones column. Add its digits, then carry a ten if needed.',problem:{...p},value:answer(p)}];
 return [{text:`Start at ${p.a}. Take away ${p.b}. Where do you land?`,problem:{...p},value:answer(p)}];
}
// Only subtraction has a compensation transformation. Both signed changes must match.
function compensate(p,signs,amounts,limit=100){
 if(p.op!=='−')return {ok:false,message:'The Elevator is for subtraction.'};
 if(!Array.isArray(signs)||signs.length!==2||signs.some(s=>!['+','−'].includes(s))||!Array.isArray(amounts)||amounts.length!==2)return {ok:false,message:'Choose a direction and amount for both numbers.'};
 if(amounts.some(v=>!/^\d{1,3}$/.test(String(v))||Number(v)>limit))return {ok:false,message:`Choose an amount from 0 to ${limit} for each number.`};
 const changes=amounts.map((n,i)=>(signs[i]==='−'?-1:1)*Number(n));
 const a=p.a+changes[0],b=p.b+changes[1];
 if(a<0||b<0)return {ok:false,message:'That would go below zero. Try a smaller change, or add to both numbers.'};
 if(changes[0]!==changes[1])return {ok:false,problem:{a,b,op:'−'},message:'The difference stays the same when both numbers change by the same amount in the same direction. Let’s match the two changes.'};
 return {ok:true,problem:{a,b,op:'−'},change:changes[0]};
}
const width=p=>Math.max(String(p.a).length,String(p.b).length,String(answer(p)).length);
function column(p,i){const place=10**i,a=Math.floor(p.a/place)%10,b=Math.floor(p.b/place)%10;
 const carry=p.op==='+'&&i>0?Math.floor(((p.a%place)+(p.b%place))/place):0;
 const total=p.op==='+'?a+b+carry:a-b;
 return {a,b,carry,total,digit:Math.floor(answer(p)/place)%10};
}
function needsElevator(p){return p.op==='−'&&Array.from({length:width(p)},(_,i)=>column(p,i).total<0).some(Boolean);}
function friendlyChange(p,limit=100){if(p.op!=='−')return null;for(let n=1;n<=limit;n++)for(const k of [-n,n]){const q={a:p.a+k,b:p.b+k,op:'−'};if(q.a>=0&&q.b>=0&&q.b%10===0&&!needsElevator(q))return k;}return null;}

function enterDigit(p,digits,index,value){
 const out=Array.from({length:width(p)},(_,i)=>/^\d$/.test(digits[i]??'')?digits[i]:'');
 if(!Number.isInteger(index)||index<0||index>=out.length||!/^\d?$/.test(value))return {digits:out,ok:false,next:0,complete:false};
 out[index]=value;for(let i=index+1;i<out.length;i++)out[i]='';
 const ready=out.slice(0,index).every((d,i)=>d!==''&&Number(d)===column(p,i).digit);
 const ok=value!==''&&ready&&Number(value)===column(p,index).digit;
 return {digits:out,ok,next:ok?Math.min(index+1,out.length-1):index,complete:ok&&out.every((d,i)=>d!==''&&Number(d)===column(p,i).digit)};
}
const api={answer,generate,steps,compensate,width,column,needsElevator,friendlyChange,enterDigit};root.MathAdventure=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
