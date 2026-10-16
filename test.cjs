const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const M=require('./math.js');let generated=0,transformations=0;
for(const max of [10,20,100])for(const op of ['addition','subtraction','mixed'])for(const strategy of ['shift','round','count'])for(let i=0;i<2000;i++){
 const p=M.generate(max,op,false,strategy),answer=M.answer(p);
 assert(p.a>=0&&p.a<=max&&p.b>=0&&p.b<=max);assert(answer>=0&&answer<=(max===100&&p.op==='+'?200:max));
 assert.equal(answer,p.op==='+'?p.a+p.b:p.a-p.b);
 const steps=M.steps(p,strategy);assert.equal(steps.at(-1).value,answer);
 for(const step of steps)assert.equal(M.answer(step.problem),step.value);
 generated++;
}
for(let a=0;a<=100;a++)for(let b=0;b<=a;b++)for(let k=-100;k<=100;k++){
 const p={a,b,op:'−'},sign=k<0?'−':'+';
 const r=M.compensate(p,[sign,sign],[String(Math.abs(k)),String(Math.abs(k))]);
 if(b+k<0)assert.equal(r.ok,false);else{assert(r.ok);assert.equal(r.problem.a,a+k);assert.equal(r.problem.b,b+k);assert.equal(M.answer(r.problem),a-b);}
 transformations++;
}
assert.deepEqual(M.compensate({a:75,b:7,op:'−'},['+','+'],['3','3']).problem,{a:78,b:10,op:'−'});
assert.deepEqual(M.compensate({a:75,b:7,op:'−'},['−','−'],['2','2']).problem,{a:73,b:5,op:'−'});
for(const [signs,amounts] of [[['+','+'],['3','4']],[['+','−'],['3','3']],[['−','−'],['8','8']],[['+','+'],['','']],[['+','+'],['101','101']]])assert(!M.compensate({a:75,b:7,op:'−'},signs,amounts).ok);
assert(!M.compensate({a:33,b:34,op:'+'},['+','−'],['7','7']).ok);
let storage={};function boot(){const element={innerHTML:'',addEventListener(){}};const c={MathAdventure:M,localStorage:{getItem:k=>storage[k]??null,setItem:(k,v)=>storage[k]=v},document:{querySelector:s=>s==='#app'?element:null,body:{className:''},addEventListener(){}},navigator:{},location:{protocol:'file:'},console};vm.createContext(c);for(const f of ['catalog.js','collection.js','pictures.js','app.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),c);return c;}
let c=boot();const run=s=>vm.runInContext(s,c);
const legacy=run('defaults()');legacy.stars=42;legacy.owned.push('rug','scarf');legacy.decor=['rug','scarf'];legacy.completed=8;legacy.settings.strategy='round';legacy.history=[{op:'−',guided:true,mistakes:2}];storage['jazzy-adventure-v1']=JSON.stringify(legacy);c=boot();assert.equal(run('state.stars'),42);assert.equal(run('state.completed'),8);assert.equal(run("state.decor.join(',')"),'rug,scarf');assert.equal(run('state.settings.strategy'),'shift');assert.equal(run('state.history.length'),1);
run('save()');c=boot();assert.equal(run('state.stars'),42);assert.equal(run('state.settings.strategy'),'shift');
delete storage['jazzy-adventure-v1-previous'];storage['jazzy-adventure-v1']='broken';c=boot();assert.equal(run('state.stars'),0);assert(run('notice').includes('save'));assert.equal(run('valid({version:2})'),false);
const css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8');assert(css.includes('grid-template-columns:repeat(10,minmax(0,1fr))'));
console.log(`PASS: ${generated.toLocaleString()} generated problems; ${transformations.toLocaleString()} equal-change cases; negative/mismatched transformations; legacy-save migration, reload, damaged-save fallback, and ten-column CSS. Column interactions are checked in columns.test.cjs.`);
