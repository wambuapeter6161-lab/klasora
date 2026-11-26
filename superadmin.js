import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, deleteUser } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs, getDoc, setDoc, addDoc, doc, updateDoc, deleteDoc, query, where, writeBatch, deleteField } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJ26ARylloIA66941AsSkqIt1HCDjlmps",
  authDomain: "klasora-2fc4a.firebaseapp.com",
  projectId: "klasora-2fc4a",
  storageBucket: "klasora-2fc4a.firebasestorage.app",
  messagingSenderId: "356371857145",
  appId: "1:356371857145:web:e32688b4d85334cdbcac28"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
// Second app instance: creates administrator logins without signing the Super Admin out.
const secondaryApp = initializeApp(firebaseConfig, 'klasora-secondary');
const secondaryAuth = getAuth(secondaryApp);
const SUPER_ADMIN_UID = "NiquOT8pm7hha8mM6nlsuYvN0tr1";

/* ---------- Klasora School System (Firebase B) link ----------
   Schools registered here are also created in the School System project, so their
   administrators can sign in there. Only the Super Admin's own login is used: no secrets. */
const firebaseConfigB = {
  apiKey: "AIzaSyCHRxj8hJwpPcwFBW8p-CCBvGzOlJpyfGc",
  authDomain: "klasora-school.firebaseapp.com",
  projectId: "klasora-school",
  storageBucket: "klasora-school.firebasestorage.app",
  messagingSenderId: "274741090812",
  appId: "1:274741090812:web:77ce9fdfb32f42d0383a79"
};
const B_SUPER_UID = "PfUW9NmNApMam9e5COf6K9RDv8e2";
const appB = initializeApp(firebaseConfigB, 'klasora-school-system');
const authB = getAuth(appB), dbB = getFirestore(appB);
const authB2 = getAuth(initializeApp(firebaseConfigB, 'klasora-school-system-secondary'));
let bReady = false;
async function connectB(email, password) {
  try {
    const c = await signInWithEmailAndPassword(authB, email, password);
    if (c.user.uid !== B_SUPER_UID) { await signOut(authB); throw new Error('not the School System Super Admin'); }
    bReady = true;
  } catch (e) { bReady = false; console.warn('School System link off:', e); }
  return bReady;
}
async function deleteBAuth(email, pw) {
  try { const c = await signInWithEmailAndPassword(authB2, email, pw); await deleteUser(c.user); } catch (e) {}
  try { await signOut(authB2); } catch (e) {}
}
async function registerInB(x) {
  if (!bReady) throw new Error('not connected. Sign out, then sign in again with the same email and password as your School System (Firebase B) Super Admin account.');
  const ex = await getDoc(doc(dbB, 'schools', x.code));
  if (ex.exists() && ex.data().status !== 'Cancelled') throw new Error('that school code already exists in the School System.');
  let uid;
  try { const c = await createUserWithEmailAndPassword(authB2, x.email, x.tempPassword); uid = c.user.uid; await signOut(authB2); }
  catch (er) { throw new Error(er.code === 'auth/email-already-in-use' ? 'that email already has a School System login.' : (er.message || String(er))); }
  const now = new Date().toISOString();
  try {
    await setDoc(doc(dbB, 'schools', x.code), { code: x.code, name: x.name, poBox: x.poBox, status: 'Active', adminUid: uid, adminName: x.adminName, adminEmail: x.email, createdAt: now });
    await setDoc(doc(dbB, 'users', uid), { role: 'admin', schoolId: x.code, name: x.adminName, email: x.email, classes: [], children: [], mustChangePassword: true, createdAt: now });
  } catch (er) { await deleteBAuth(x.email, x.tempPassword); throw new Error(er.message || String(er)); }
  return { code: x.code, uid, email: x.email, tempPassword: x.tempPassword };
}
async function rollbackB(b) {
  if (!b) return;
  try { await updateDoc(doc(dbB, 'schools', b.code), { status: 'Cancelled' }); } catch (e) {}
  await deleteBAuth(b.email, b.tempPassword);
}
// Keeps the School System's school status (Active / Suspended / Cancelled) the same as this portal.
async function mirrorStatus(code, status) {
  if (!code) return;
  if (!bReady) { alert('The school was updated here, but the School System link is OFF, so its status was not changed there. Sign out, sign in again, then repeat.'); return; }
  try { await updateDoc(doc(dbB, 'schools', String(code).toUpperCase()), { status }); }
  catch (e) { if (e.code !== 'not-found') alert('Updated here, but could not update the School System: ' + (e.message || e)); }
}
async function syncStatusesToB(list, isLiveFn) {
  if (!bReady) return;
  for (const s of list) {
    const code = String(s.code || '').toUpperCase(); if (!code) continue;
    try {
      const d = await getDoc(doc(dbB, 'schools', code)); if (!d.exists()) continue;
      const cur = d.data().status, want = isLiveFn(s) ? 'Active' : 'Suspended';
      if (cur !== want && cur !== 'Cancelled') await updateDoc(doc(dbB, 'schools', code), { status: want });
    } catch (e) {}
  }
}

(()=>{'use strict';
const PROFILE='klasora_superadmin_profile';
let schoolsCache=[];
const $=id=>document.getElementById(id);
const read=()=>schoolsCache;
async function loadSchools(){
  const snap=await getDocs(collection(db,'schools'));
  schoolsCache=snap.docs.map(d=>({id:d.id,...d.data()}));
  renderAll();
}
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>'KSh '+Number(n||0).toLocaleString('en-KE');
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};
let authEmail='';
const TIERS=['Starter','Professional','Enterprise'];
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const today=()=>iso(new Date());
function addMonths(s,n){const [y,m,d]=s.split('-').map(Number);const t=new Date(y,m-1+n,1);const last=new Date(t.getFullYear(),t.getMonth()+1,0).getDate();t.setDate(Math.min(d,last));return iso(t)}
const fmtD=s=>s?new Date(s+'T00:00:00').toLocaleDateString('en-KE',{weekday:'short',day:'2-digit',month:'short',year:'numeric'}):'Not set';
const daysLeft=s=>s?Math.round((new Date(s+'T00:00:00')-new Date(today()+'T00:00:00'))/864e5):null;
const isLive=s=>(s.status||'Active')==='Active'&&s.subscriptionStatus!=='Paused'&&!(s.renewalDate&&daysLeft(s.renewalDate)<0);
function expiryTag(s){const d=daysLeft(s.renewalDate);if(d===null)return'';return d<0?`<span class="tag expired">Expired ${-d}d ago</span>`:d<=7?`<span class="tag soon">${d===0?'Expires today':d+'d left'}</span>`:`<span class="tag">${d}d left</span>`}
const kv=(k,v)=>`<div class="kv"><small>${k}</small><b>${safe(v||'—')}</b></div>`;
const shortD=d=>d?new Date(d).toLocaleDateString('en-KE',{day:'2-digit',month:'short',year:'numeric'}):'';
const genPw=()=>{const c='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789',a=new Uint32Array(10);crypto.getRandomValues(a);return Array.from(a,n=>c[n%c.length]).join('')};
const greeting=()=>{const h=new Date().getHours();return(h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening')+', '+((profile().name||'').split(' ')[0]||'Superadmin')};
function schoolCard(s){return `<div class="school-card" data-details="${safe(s.id)}"><div class="sc-head"><div><b>${safe(s.name)}</b><small>${safe(s.code)}</small></div><div>${statusTag(s)}${expiryTag(s)}</div></div><div class="kv-grid">${kv('Administrator',s.adminName)}${kv('Admin email',s.adminEmail)}${kv('P.O. Box',s.poBox)}${kv('Registered',shortD(s.createdAt))}${kv('Plan',s.plan||'Starter')}${kv('Amount',money(s.monthlyFee||0))}${kv('Subscribed',fmtD(s.subscriptionStart))}${kv('Expires',fmtD(s.renewalDate))}${kv('Admin account',s.adminUid?'Created':'Not created')}<div class="kv"><button type="button" class="btn soft rst" data-reset="${safe(s.id)}">Send password reset email</button></div></div></div>`}
const PANELS={largest:['Largest schools','Ranked by student count when recorded, otherwise by subscription amount.',a=>a.slice().sort((x,y)=>(Number(y.studentCount||0)-Number(x.studentCount||0))||(Number(y.monthlyFee||0)-Number(x.monthlyFee||0)))],new:['New registrations','Most recently registered schools.',a=>a.slice().sort((x,y)=>String(y.createdAt||'').localeCompare(String(x.createdAt||'')))],expiring:['Expiring soon','Subscriptions closest to their expiry date, including expired ones. Paused schools are left out.',a=>a.filter(s=>s.renewalDate&&s.subscriptionStatus!=='Paused').sort((x,y)=>String(x.renewalDate).localeCompare(String(y.renewalDate)))]};
const emptyText=k=>k==='expiring'?'No expiry dates yet. Set a subscription under Plans.':'No school records yet.';
function tagText(s,k){if(k==='expiring'){const d=daysLeft(s.renewalDate);return d<0?'Expired':d===0?'Today':d+'d left'}if(k==='new'){const t=s.createdAt?(Date.now()-new Date(s.createdAt))/864e5:99;return t<=7?'NEW':(s.createdAt?new Date(s.createdAt).toLocaleDateString('en-KE',{day:'2-digit',month:'short'}):'—')}return s.studentCount?s.studentCount+' students':Number(s.monthlyFee||0)?money(s.monthlyFee):(s.plan||'Starter')}
function panelList(kind){const T=PANELS[kind];if(!T)return;const list=T[2](read());const body='<p class="sheet-note">'+T[1]+' Tap a school for its full record.</p>'+(list.length?'<div class="school-list">'+list.map(s=>`<div class="school-row" data-details="${safe(s.id)}"><div class="school-info"><b>${safe(s.name)}</b><small>${safe(s.code)} · ${safe(s.plan||'Starter')} · ${money(s.monthlyFee||0)}</small><small>${kind==='expiring'?'Expires '+fmtD(s.renewalDate):'Registered '+(shortD(s.createdAt)||'—')} · ${statusTag(s)}</small></div><span class="compact-tag">${safe(tagText(s,kind))}</span></div>`).join('')+'</div>':'<div class="empty">'+emptyText(kind)+'</div>');openSheet('OVERVIEW',T[0],body,[{label:'Close',cls:'primary',fn:closeSheet}])}
function dl(name,type,txt){const b=new Blob([txt],{type}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},800)}
function renderBackup(){$('backupCount').textContent=read().length;const t=ls.get('klasora_last_backup');$('backupLast').textContent=t?new Date(t).toLocaleString('en-KE'):'Never'}
async function doBackup(kind){const m=$('backupMsg');m.textContent='Fetching the latest records…';try{await loadSchools()}catch(e){m.textContent='Could not reach Firestore: '+e.message;return}const a=read().map(({tempPassword,...r})=>r),stamp=new Date().toISOString().slice(0,10);if(kind==='json')dl('klasora-backup-'+stamp+'.json','application/json',JSON.stringify({app:'Klasora Super Admin',exportedAt:new Date().toISOString(),count:a.length,schools:a},null,2));else{const cols=['code','name','adminName','adminEmail','poBox','adminUid','status','subscriptionStatus','plan','monthlyFee','subscriptionStart','renewalDate','createdAt'],q=v=>{let s=String(v??'');if(/^[=+\-@]/.test(s))s="'"+s;return'"'+s.replace(/"/g,'""')+'"'};dl('klasora-schools-'+stamp+'.csv','text/csv;charset=utf-8','\ufeff'+[cols.join(',')].concat(a.map(s=>cols.map(c=>q(s[c])).join(','))).join('\r\n'))}ls.set('klasora_last_backup',new Date().toISOString());renderBackup();m.textContent='Backup downloaded ('+a.length+' schools).'}
let rpDays=30;
function renderReports(){const a=read(),now=Date.now(),since=rpDays?now-rpDays*864e5:0,ev=[];paymentsCache.forEach(p=>ev.push({t:new Date(p.paidAt).getTime(),k:'pay',amt:Number(p.amount||0),title:'Payment received',sub:(p.schoolName||'')+' · '+money(p.amount)+' · '+(p.plan||'')}));a.forEach(s=>{const nm=s.name+' · '+s.code,p=s.subscriptionStatus==='Paused';if(s.createdAt)ev.push({t:new Date(s.createdAt).getTime(),k:'reg',title:'School registered',sub:nm});if(s.subscriptionUpdatedAt)ev.push({t:new Date(s.subscriptionUpdatedAt).getTime(),k:p?'pause':'sub',title:p?'Subscription paused':'Subscription updated',sub:nm+' · '+(s.plan||'Starter')+' · '+money(s.monthlyFee||0)});if(s.renewalDate&&!p&&daysLeft(s.renewalDate)<0)ev.push({t:new Date(s.renewalDate+'T00:00:00').getTime(),k:'exp',title:'Subscription expired',sub:nm})});
const list=ev.filter(e=>e.t>=since&&e.t<=now).sort((x,y)=>y.t-x.t),c=k=>list.filter(e=>e.k===k).length;document.querySelectorAll('[data-rp]').forEach(b=>b.classList.toggle('on',+b.dataset.rp===rpDays));
$('rpNew').textContent=c('reg');$('rpRev').textContent=money(list.filter(e=>e.k==='pay').reduce((n,e)=>n+e.amt,0));$('rpSub').textContent=c('sub')+c('pause');$('rpExp').textContent=c('exp');$('rpMrr').textContent=money(a.filter(isLive).reduce((n,s)=>n+Number(s.monthlyFee||0),0));
const tot=a.length||1;$('rpPlans').innerHTML=TIERS.map(p=>{const n=a.filter(s=>(s.plan||'Starter')===p).length;return `<div class="bar-row"><span>${p}</span><div class="bar"><i style="width:${Math.round(n/tot*100)}%"></i></div><b>${n}</b></div>`}).join('');
const col={pay:'t-green',reg:'t-teal',sub:'t-purple',pause:'t-amber',exp:'t-red'};$('reportFeed').innerHTML=list.length?list.slice(0,60).map(e=>`<div class="feed-row"><i class="feed-dot ${col[e.k]}"></i><div><b>${safe(e.title)}</b><small>${safe(e.sub)}</small></div><span>${new Date(e.t).toLocaleDateString('en-KE',{day:'2-digit',month:'short'})}</span></div>`).join(''):'<div class="empty">Nothing happened in this period.</div>'}
function showCreds(title,email,pw){openSheet('ONE-TIME PASSWORD',title,`<p class="sheet-note">Share this securely. It is not stored anywhere and cannot be shown again. The administrator should change it at first sign-in.</p><div class="kv pw"><small>Email</small><b>${safe(email)}</b></div><div class="kv pw" style="margin-top:8px"><small>Temporary password</small><b>${safe(pw)}</b><button type="button" class="copy-btn" data-copy="${safe(pw)}">Copy</button></div>`,[{label:'I have copied it',cls:'primary',fn:closeSheet}])}
function resetPw(id){const s=getSchool(id);if(!s)return;openSheet('ADMIN ACCESS','Send password reset email?',`<p class="sheet-note">A reset link is emailed to <b>${safe(s.adminEmail)}</b> so the administrator can choose a new password. No password is shown or stored.</p><div class="error" id="sheetMsg"></div>`,[{label:'Cancel',cls:'soft',fn:closeSheet},{label:'Send email',cls:'primary',fn:async()=>{try{await sendPasswordResetEmail(auth,s.adminEmail);try{await sendPasswordResetEmail(authB,s.adminEmail)}catch(e){}closeSheet();alert('Reset email sent to '+s.adminEmail)}catch(err){sheetMsg('Could not send: '+(err.message||err))}}}])}
async function removeSchool(id){const s=getSchool(id);try{const st=await getDocs(collection(db,'schools',id,'students'));for(const d of st.docs)await deleteDoc(d.ref)}catch(e){}if(s&&s.code)await deleteDoc(doc(db,'schoolCodes',String(s.code).toUpperCase())).catch(()=>{});if(s&&s.code)await mirrorStatus(s.code,'Cancelled');await deleteDoc(doc(db,'schools',id));if(s&&s.adminEmail)setTimeout(()=>alert('School deleted. Also delete the login '+s.adminEmail+' in Firebase Console > Authentication > Users (both projects: klasora-2fc4a and klasora-school), or that email cannot be reused.'),300)}
async function scrubLegacy(){for(const s of read().filter(x=>x.tempPassword!==undefined))await updateDoc(doc(db,'schools',s.id),{tempPassword:deleteField()})}
let paymentsCache=[];
async function loadPayments(){try{const from=new Date();from.setMonth(from.getMonth()-12);const s=await getDocs(query(collection(db,'payments'),where('paidAt','>=',from.toISOString())));paymentsCache=s.docs.map(d=>({id:d.id,...d.data()}))}catch(e){paymentsCache=[]}renderChart()}
function renderChart(){const now=new Date(),ms=[];for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);ms.push({k:d.getFullYear()+'-'+pad(d.getMonth()+1),l:d.toLocaleDateString('en-KE',{month:'short'}),v:0})}paymentsCache.forEach(p=>{const m=ms.find(x=>x.k===String(p.paidAt||'').slice(0,7));if(m)m.v+=Number(p.amount||0)});const mx=Math.max(...ms.map(m=>m.v)),pw=mx>0?Math.pow(10,Math.floor(Math.log10(mx))):1,top=mx>0?Math.ceil(mx/pw)*pw:1000,fk=n=>n>=1e6?(n/1e6).toFixed(1).replace(/\.0$/,'')+'M':n>=1e3?(n/1e3).toFixed(1).replace(/\.0$/,'')+'k':String(Math.round(n));$('chartY').innerHTML=[5,4,3,2,1,0].map(i=>'<span>'+fk(top*i/5)+'</span>').join('');const pts=ms.map((m,i)=>[8+i*120.4,192-(m.v/top)*180]);$('chartSvg').innerHTML='<g class="chart-grid"><path d="M0 12H620 M0 48H620 M0 84H620 M0 120H620 M0 156H620 M0 192H620"/></g><path class="chart-line" d="'+pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ')+'"/><g class="chart-dots">'+pts.map((p,i)=>'<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="4"><title>'+ms[i].l+': '+money(ms[i].v)+'</title></circle>').join('')+'</g>';$('chartX').innerHTML=ms.map(m=>'<span>'+m.l+'</span>').join('');const tot=ms.reduce((n,m)=>n+m.v,0);$('chartNote').textContent=paymentsCache.length?'Payments received in the last 6 months: '+money(tot):'No payments recorded yet. Tick "Payment received" when you set a subscription.'}
async function loadOnline(){try{const s=await getDocs(query(collection(db,'presence'),where('lastSeenMs','>',Date.now()-120000)));$('statOnline').textContent=s.size}catch(e){$('statOnline').textContent='—'}}
const beat=()=>auth.currentUser?setDoc(doc(db,'presence',auth.currentUser.uid),{role:'superAdmin',schoolId:null,lastSeenMs:Date.now()}).catch(()=>{}):Promise.resolve();
const profRef=()=>doc(db,'superAdminProfile',SUPER_ADMIN_UID);
async function syncProfileDown(){try{const s=await getDoc(profRef());if(s.exists()){const d=s.data();if(d.profile)ls.set(PROFILE,JSON.stringify(d.profile));if('photo' in d){d.photo?ls.set(PHOTO,d.photo):ls.del(PHOTO);photo=d.photo||''}}}catch(e){}}
async function syncProfileUp(){try{await setDoc(profRef(),{profile:profile(),photo:photo||'',updatedAt:new Date().toISOString()});return true}catch(e){return false}}
let selectedId=null;
const defaultProfile={name:'Platform Owner',email:'owner@willbrodlabs.com',company:'Willbrod Labs',phone:''};
const profile=()=>{let s={};try{s=JSON.parse(ls.get(PROFILE)||'{}')}catch(e){}return{...defaultProfile,email:authEmail||defaultProfile.email,...s}};
function getSchool(id){return read().find(s=>s.id===id)}
async function saveSchool(updated){
  const {id,tempPassword,...data}=updated;
  await updateDoc(doc(db,'schools',id),data);
  const live=(updated.status||'Active')==='Active'&&updated.subscriptionStatus!=='Paused',cd=String(updated.code||'').toUpperCase();
  try{if(cd)await setDoc(doc(db,'schoolCodes',cd),{code:cd,schoolId:id,schoolName:updated.name,adminUid:updated.adminUid||null,active:live,isActive:live,activated:live,status:live?'Active':'Paused',updatedAt:new Date().toISOString()},{merge:true})}catch(e){}
  await mirrorStatus(cd,isLive(updated)?'Active':'Suspended');
  const i=schoolsCache.findIndex(s=>s.id===id);
  if(i>=0) schoolsCache[i]=updated;
}
function initials(s){return String(s||'K').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()}
function statusTag(s){return s.subscriptionStatus==='Paused'?'<span class="tag paused">Subscription paused</span>':`<span class="tag">${safe(s.status||'Active')}</span>`}
const TITLES={schools:'Registered Schools',addschool:'Add School',subscriptions:'Plans & Subscriptions',profile:'My Profile',backup:'Backup Data',reports:'Reports'};
function showPage(page,navEl){document.querySelectorAll('.page').forEach(x=>x.classList.add('hidden'));$('page-'+page).classList.remove('hidden');const navs=[...document.querySelectorAll('.nav[data-page]')];const hit=navEl&&navEl.dataset&&navEl.dataset.page===page?navEl:navs.find(x=>x.dataset.page===page);navs.forEach(x=>x.classList.toggle('active',x===hit));$('pageTitle').textContent=page==='overview'?greeting():(TITLES[page]||'Klasora');if(page==='profile')renderProfile();if(page==='backup')renderBackup();if(page==='reports')renderReports();window.scrollTo(0,0);renderAll()}
function renderAll(){const a=read(),live=a.filter(isLive);$('statTotal').textContent=a.length;$('statActive').textContent=live.length;$('statValue').textContent=money(live.reduce((n,s)=>n+Number(s.monthlyFee||0),0));$('directoryCount').textContent=a.length;renderSchoolRows(a.slice().reverse(),'schoolDirectory');renderSubscriptions(a);renderDashboardPanels(a);const lg=a.filter(s=>s.tempPassword).length;$('legacyBanner').classList.toggle('hidden',!lg);$('legacyCount').textContent=lg}
function renderDashboardPanels(a){const sm=k=>a.reduce((n,s)=>n+Number(s[k]||0),0),rp=a.filter(s=>s.statsUpdatedAt).length;$('demoStudents').textContent=rp?sm('studentCount').toLocaleString():'—';$('demoStaff').textContent=rp?sm('staffCount').toLocaleString():'—';$('demoUsers').textContent=rp?(sm('userCount')||sm('studentCount')+sm('staffCount')).toLocaleString():'—';$('demoNote').textContent=rp?rp+' of '+a.length+' schools have reported their totals.':'Totals appear once school apps report them.';$('demoSchools').textContent=a.length;$('protocolSchoolCount').textContent=a.length+' schools loaded';const row=(items,kind)=>items.length?items.slice(0,5).map((s,i)=>`<div class="compact-row" data-details="${safe(s.id)}"><b>${i+1}.</b><div><strong>${safe(s.name)}</strong><small>${safe(s.adminEmail||s.code||'School record')}</small></div><span class="compact-tag${kind==='expiring'&&daysLeft(s.renewalDate)<=7?' warn':''}">${safe(tagText(s,kind))}</span></div>`).join(''):'<div class="compact-empty">'+emptyText(kind)+'</div>';$('largestSchools').innerHTML=row(PANELS.largest[2](a),'largest');$('newRegistrations').innerHTML=row(PANELS.new[2](a),'new');$('expiringSchools').innerHTML=row(PANELS.expiring[2](a),'expiring')}
function renderSchoolRows(list,target){const q=$('schoolSearch').value.trim().toLowerCase();const f=list.filter(s=>!q||(s.name+' '+s.code+' '+s.adminName+' '+s.adminEmail).toLowerCase().includes(q));$(target).innerHTML=f.length?f.map(schoolCard).join(''):'<div class="empty">No schools found.</div>'}
function renderSubscriptions(a){$('subscriptionList').innerHTML=a.length?a.slice().reverse().map(s=>{const p=s.subscriptionStatus==='Paused';return `<div class="sub-card${p?' is-paused':''}"><div class="sc-head"><div><b>${safe(s.name)}</b><small>${safe(s.code)}</small></div><div>${statusTag(s)}${p?'':expiryTag(s)}</div></div><div class="kv-grid">${kv('Plan',s.plan||'Starter')}${kv('Amount',money(s.monthlyFee||0))}${kv('Subscribed',fmtD(s.subscriptionStart))}${kv('Expires',fmtD(s.renewalDate))}</div><div class="sub-actions"><button type="button" class="btn primary" data-sub="${safe(s.id)}">${s.renewalDate?'Change subscription':'Set subscription'}</button><button type="button" class="btn ${p?'gold-btn':'danger'}" data-toggle-sub="${safe(s.id)}">${p?'Resume':'Pause'} subscription</button></div></div>`}).join(''):'<div class="empty">Register a school first, then set its subscription here.</div>'}
let sheetActs=[];
function openSheet(eyebrow,title,body,acts){$('sheetEyebrow').textContent=eyebrow;$('sheetTitle').textContent=title;$('sheetBody').innerHTML=body;const box=$('sheetActions');box.innerHTML='';(acts||[]).forEach(a=>{const b=document.createElement('button');b.type='button';b.className='btn '+(a.cls||'soft');b.textContent=a.label;b.onclick=a.fn;box.appendChild(b)});$('sheetModal').classList.remove('hidden')}
function closeSheet(){$('sheetModal').classList.add('hidden')}
function sheetMsg(t){const m=$('sheetMsg');if(m)m.textContent=t}
function manageSub(id){const s=getSchool(id);if(!s)return;let plan=TIERS.includes(s.plan)?s.plan:'Starter',months=1,manual=false;const start=s.subscriptionStart||today(),exp=s.renewalDate||addMonths(start,1);if(s.renewalDate&&s.renewalDate!==addMonths(start,1))manual=true;
const body=`<p class="sheet-note"><b>${safe(s.name)}</b> · ${safe(s.code)}</p><label>Plan</label><div class="plan-pick" id="planPick">${TIERS.map(p=>`<button type="button" class="plan-opt${p===plan?' on':''}" data-plan="${p}">${p}</button>`).join('')}</div><label>Amount</label><div class="amt"><span>KSh</span><input id="subFee" inputmode="decimal" placeholder="e.g. 5000" value="${safe(s.monthlyFee||'')}"></div><div class="date-row"><div><label>Subscribed on</label><input id="subStart" type="date" class="date-in" value="${start}"></div><div><label>Expires on</label><input id="subRenew" type="date" class="date-in" value="${exp}"></div></div><div class="chips" id="expChips">${[[1,'1 month'],[3,'3 months'],[6,'6 months'],[12,'1 year']].map(([n,l])=>`<button type="button" data-add="${n}">${l}</button>`).join('')}</div><div class="date-sum" id="dateSum"></div><label class="chk"><input type="checkbox" id="subPaid" checked><span>Payment received — add it to revenue</span></label><div class="error" id="sheetMsg"></div>`;
openSheet('SUBSCRIPTION',s.renewalDate?'Change subscription':'Set subscription',body,[{label:'Cancel',cls:'soft',fn:closeSheet},{label:'Save subscription',cls:'primary',fn:async()=>{const fee=$('subFee').value.trim().replace(/,/g,'');if(!/^\d+(\.\d{1,2})?$/.test(fee)){sheetMsg('Enter the amount as a number, e.g. 5000.');return}const st=$('subStart').value,ex=$('subRenew').value;if(!st||!ex){sheetMsg('Choose both dates.');return}if(ex<=st){sheetMsg('The expiry date must be after the subscription date.');return}const u=getSchool(id);u.plan=plan;u.monthlyFee=Number(fee);u.subscriptionStart=st;u.renewalDate=ex;u.subscriptionStatus=u.subscriptionStatus||'Active';u.subscriptionUpdatedAt=new Date().toISOString();try{await saveSchool(u)}catch(err){sheetMsg('Could not save: '+err.message);return}if($('subPaid')&&$('subPaid').checked&&Number(fee)>0){try{const p={schoolId:id,schoolName:u.name,schoolCode:u.code,amount:Number(fee),plan,periodStart:st,periodEnd:ex,paidAt:new Date().toISOString()};const r=await addDoc(collection(db,'payments'),p);paymentsCache.push({id:r.id,...p});renderChart()}catch(err){sheetMsg('Subscription saved, but the payment was not recorded: '+err.message);return}}closeSheet();renderAll();if(!$('detailModal').classList.contains('hidden'))details(id)}}]);
const sum=()=>{const st=$('subStart').value,e=$('subRenew').value;if(!e){$('dateSum').textContent='Pick an expiry date.';return}const d=daysLeft(e);$('dateSum').innerHTML='Subscribed <b>'+fmtD(st)+'</b><br>Expires <b>'+fmtD(e)+'</b> · '+(d<0?'already expired':d===0?'today':d+' days from today')},chips=()=>document.querySelectorAll('#expChips button').forEach(b=>b.classList.toggle('on',!manual&&+b.dataset.add===months));
$('planPick').onclick=e=>{const b=e.target.closest('[data-plan]');if(!b)return;plan=b.dataset.plan;document.querySelectorAll('#planPick .plan-opt').forEach(x=>x.classList.toggle('on',x===b))};
$('subStart').onchange=()=>{if(!$('subStart').value)$('subStart').value=today();if(!manual)$('subRenew').value=addMonths($('subStart').value,months);sum();chips()};
$('subRenew').onchange=()=>{manual=true;sum();chips()};
$('expChips').onclick=e=>{const b=e.target.closest('[data-add]');if(!b)return;months=+b.dataset.add;manual=false;$('subRenew').value=addMonths($('subStart').value||today(),months);sum();chips()};
sum();chips()}
function toggleSub(id){const s=getSchool(id);if(!s)return;const pause=s.subscriptionStatus!=='Paused';openSheet(pause?'PAUSE ACCESS':'RESUME ACCESS',pause?'Pause subscription?':'Resume subscription?',`<p class="sheet-note">${pause?'Pause the subscription for':'Resume the subscription for'} <b>${safe(s.name)}</b>? This updates the school's Firestore subscription record.</p>`,[{label:'Cancel',cls:'soft',fn:closeSheet},{label:pause?'Pause subscription':'Resume subscription',cls:pause?'danger':'primary',fn:async()=>{const u=getSchool(id);u.subscriptionStatus=pause?'Paused':'Active';u.subscriptionUpdatedAt=new Date().toISOString();await saveSchool(u);closeSheet();renderAll();if(!$('detailModal').classList.contains('hidden'))details(id)}}])}
function deleteSchool(){const s=getSchool(selectedId);if(!s)return;const id=selectedId;openSheet('DANGER ZONE','Delete school?',`<p class="sheet-note">This will permanently delete <b>${safe(s.name)}</b> (${safe(s.code)}) from the Firestore school registry. It cannot be undone.</p><label>Type the school code <b>${safe(s.code)}</b> to confirm</label><input id="delCode" autocapitalize="characters" autocomplete="off"><div class="error" id="sheetMsg"></div>`,[{label:'Cancel',cls:'soft',fn:closeSheet},{label:'Delete school',cls:'danger',fn:()=>{if($('delCode').value.trim().toUpperCase()!==String(s.code).toUpperCase()){sheetMsg('School code did not match. Nothing was deleted.');return}removeSchool(id).then(()=>{schoolsCache=schoolsCache.filter(x=>x.id!==id);renderAll()}).catch(err=>alert('Could not delete school: '+err.message));closeSheet();$('detailModal').classList.add('hidden');selectedId=null;renderAll()}}])}
function statList(kind){const a=read().slice().reverse();const T={all:['Registered schools','Every school you have registered',()=>true],active:['Active schools','Schools currently active',isLive],paused:['Paused subscriptions','Schools whose access is paused',s=>s.subscriptionStatus==='Paused'],value:['Subscription value','Active subscriptions and their monthly fees',isLive]}[kind];if(!T)return;const list=a.filter(T[2]);let body='<p class="sheet-note">'+T[1]+'. Tap a school to see its details.</p>';
if(kind==='value')body+=`<div class="sheet-total"><small>TOTAL MONTHLY VALUE</small><b>${money(list.reduce((n,s)=>n+Number(s.monthlyFee||0),0))}</b></div>`;
body+=list.length?'<div class="school-list">'+list.map(s=>`<div class="school-row" data-details="${safe(s.id)}"><div class="school-info"><b>${safe(s.name)}</b><small>${safe(s.code)} · ${safe(s.adminName)}</small><small>${kind==='value'?`${safe(s.plan||'Starter')} · ${money(s.monthlyFee||0)} / month · `:''}${statusTag(s)}</small></div><button type="button" class="btn soft" data-details="${safe(s.id)}">Details</button></div>`).join('')+'</div>':`<div class="empty">No schools here yet.${kind==='all'?'<br><br><button type="button" class="btn gold-btn" data-register="1">＋ Register a School</button>':''}</div>`;
openSheet('OVERVIEW',T[0],body,[{label:'Close',cls:'primary',fn:closeSheet}])}
const PHOTO='klasora_superadmin_photo';let photo=ls.get(PHOTO)||'';
function applyPhoto(name){['avatar','profileAvatar'].forEach(id=>{const el=$(id);if(!el)return;if(photo){el.style.backgroundImage='url("'+photo+'")';el.textContent=''}else{el.style.backgroundImage='';el.textContent=initials(name)}});const r=$('photoRemove');if(r)r.style.display=photo?'block':'none'}
function handlePhoto(file){const m=$('photoMsg');if(!file)return;if(!/^image\//.test(file.type)&&!/\.(jpe?g|png|webp|gif)$/i.test(file.name)){m.textContent='Choose a JPG, PNG or WebP image.';return}m.textContent='Processing photo…';const url=URL.createObjectURL(file),img=new Image();img.onload=()=>{const w=img.naturalWidth,h=img.naturalHeight,s=Math.min(w,h),S=320,cv=document.createElement('canvas');cv.width=cv.height=S;const c=cv.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,S,S);c.drawImage(img,(w-s)/2,(h-s)/2,s,s,0,0,S,S);URL.revokeObjectURL(url);photo=cv.toDataURL('image/jpeg',0.82);ls.set(PHOTO,photo);applyPhoto(profile().name);m.textContent='Saving…';syncProfileUp().then(ok=>{m.textContent=ok?'Photo saved to your account.':'Photo saved on this device only.'})};img.onerror=()=>{URL.revokeObjectURL(url);m.textContent='That image could not be read. Try a JPG or PNG.'};img.src=url}
function renderProfile(){const p=profile();$('profileName').value=p.name;$('profileEmail').value=p.email;$('profileCompany').value=p.company;$('profilePhone').value=p.phone;$('profilePreviewName').textContent=p.name;$('profilePreviewEmail').textContent=p.email;$('chipName').textContent=(p.name||'').split(' ')[0]||'Super Admin';applyPhoto(p.name);if(!$('page-overview').classList.contains('hidden'))$('pageTitle').textContent=greeting()}
function details(id){const s=getSchool(id);if(!s)return;selectedId=id;$('detailTitle').textContent=s.name;$('detailContent').innerHTML=`<div class="detail-grid">
${[['SCHOOL NAME',s.name],['SCHOOL CODE',s.code],['ADMINISTRATOR NAME',s.adminName],['ADMINISTRATOR EMAIL',s.adminEmail],['SCHOOL P.O. BOX',s.poBox],['REGISTRATION DATE',s.createdAt?new Date(s.createdAt).toLocaleString():'Not recorded'],['SCHOOL STATUS',s.status||'Active'],['SUBSCRIPTION STATUS',s.subscriptionStatus||'Active'],['SUBSCRIPTION PLAN',s.plan||'Starter'],['MONTHLY FEE',money(s.monthlyFee||0)],['SUBSCRIBED ON',fmtD(s.subscriptionStart)],['EXPIRY DATE',fmtD(s.renewalDate)],['ADMIN ACCOUNT',s.adminUid?'Created (password is not stored)':'Not created']].map(([k,v])=>`<div class="detail-item"><small>${safe(k)}</small><b>${safe(v||'Not provided')}</b></div>`).join('')}</div>`;$('detailModal').classList.remove('hidden')}



$('loginForm').addEventListener('submit',async e=>{
  e.preventDefault();
  $('loginError').textContent='Signing in…';
  try{
    const credential=await signInWithEmailAndPassword(auth,$('username').value.trim(),$('password').value);
    if(credential.user.uid!==SUPER_ADMIN_UID){
      await signOut(auth);
      throw new Error('This Firebase account is not authorized as the Klasora Super Admin.');
    }
    $('loginScreen').classList.add('hidden');
    $('app').classList.remove('hidden');
    authEmail=credential.user.email||'';
    $('loginTime').textContent=new Date().toLocaleString();
    await connectB($('username').value.trim(),$('password').value);
    renderProfile();
    await syncProfileDown();renderProfile();await loadSchools();if(!bReady)alert('School System link is OFF. Your email and password must match your School System (Firebase B) Super Admin account. Until then, new schools cannot be registered here. Sign out and sign in again after fixing it.');else syncStatusesToB(schoolsCache,isLive);loadPayments();beat().then(loadOnline);setInterval(()=>{beat().then(loadOnline)},45000);
    $('loginError').textContent='';
  }catch(err){
    $('loginError').textContent=err.code==='auth/invalid-credential'||err.code==='auth/wrong-password'||err.code==='auth/user-not-found'
      ?'Incorrect Super Admin email or password.'
      :err.message||'Sign-in failed. Please try again.';
  }
});
$('logout').onclick=async()=>{await signOut(auth);location.reload()};
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page,b));$('scrubBtn').onclick=async()=>{const b=$('scrubBtn');b.disabled=true;try{await scrubLegacy();await loadSchools()}catch(e){alert('Could not remove the stored passwords: '+(e.message||e))}b.disabled=false};$('bkJson').onclick=()=>doBackup('json');$('bkCsv').onclick=()=>doBackup('csv');$('sideClose').onclick=()=>{window.closeSide();showPage('overview')};document.addEventListener('click',e=>{const c=e.target.closest('[data-rp]');if(c){rpDays=+c.dataset.rp;renderReports()}});const EYE='<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',EYEOFF='<path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1M9.9 9.9a3 3 0 004.2 4.2"/>';$('togglePw').onclick=()=>{const p=$('password'),show=p.type==='password';p.type=show?'text':'password';$('togglePw').querySelector('svg').innerHTML=show?EYEOFF:EYE;$('togglePw').setAttribute('aria-label',show?'Hide password':'Show password')};
if($('sideSearch'))$('sideSearch').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll('#sidebar .nav[data-page]').forEach(b=>b.style.display=!q||b.textContent.toLowerCase().includes(q)?'flex':'none')});
document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>showPage(b.dataset.goto));
$('schoolForm').addEventListener('submit',async e=>{e.preventDefault();const code=$('schoolCode').value.trim().replace(/\s+/g,'').toUpperCase(),email=$('adminEmail').value.trim().toLowerCase(),msg=$('formMessage');if(!/^[A-Z0-9-]{1,24}$/.test(code)){msg.textContent='School code must contain letters, numbers or hyphens.';return}if(read().some(s=>String(s.code||'').toUpperCase()===code)){msg.textContent='That school code is already registered.';return}if(read().some(s=>String(s.adminEmail||'').toLowerCase()===email)){msg.textContent='That administrator email is already registered.';return}const btn=$('schoolForm').querySelector('button:not([type])');if(btn)btn.disabled=true;msg.textContent='Creating the school and administrator account…';let cred=null;try{if((await getDoc(doc(db,'schoolCodes',code))).exists())throw new Error('That school code is already registered.');const tempPassword=genPw();let bRes=null;try{bRes=await registerInB({code,name:$('schoolName').value.trim(),poBox:$('schoolBox').value.trim(),adminName:$('adminName').value.trim(),email,tempPassword})}catch(er){throw new Error('School System: '+(er.message||er))}try{cred=await createUserWithEmailAndPassword(secondaryAuth,email,tempPassword)}catch(er){await rollbackB(bRes);throw new Error(er.code==='auth/email-already-in-use'?'A login with that email already exists. If it is left over from a deleted school, delete it in Firebase Console > Authentication, then try again.':(er.message||'Could not create the login.'))}const ref=doc(collection(db,'schools')),now=new Date().toISOString(),school={code,name:$('schoolName').value.trim(),adminName:$('adminName').value.trim(),adminEmail:email,poBox:$('schoolBox').value.trim(),adminUid:cred.user.uid,status:'Active',subscriptionStatus:'Active',plan:'Starter',monthlyFee:0,renewalDate:'',subscriptionStart:'',createdAt:now,activated:true,mustChangePassword:true,passwordIssuedAt:now};try{const b=writeBatch(db);b.set(ref,school);b.set(doc(db,'schoolCodes',code),{code,schoolId:ref.id,schoolName:school.name,adminUid:cred.user.uid,active:true,isActive:true,activated:true,status:'Active',createdAt:now});await b.commit()}catch(er){await deleteUser(cred.user).catch(()=>{});await rollbackB(bRes);throw new Error('Could not save the school: '+(er.message||er))}schoolsCache.push({id:ref.id,...school});$('schoolForm').reset();msg.textContent='School created.';renderAll();showCreds('Administrator account created',email,tempPassword)}catch(err){msg.textContent=err.message||String(err)}finally{try{await signOut(secondaryAuth)}catch(x){}if(btn)btn.disabled=false}});

$('schoolSearch').addEventListener('input',()=>renderSchoolRows(read().slice().reverse(),'schoolDirectory'));
document.addEventListener('click',e=>{const cp=e.target.closest('[data-copy]');if(cp){if(navigator.clipboard)navigator.clipboard.writeText(cp.dataset.copy).then(()=>{cp.textContent='Copied';setTimeout(()=>cp.textContent='Copy',1500)}).catch(()=>{});return}if(e.target.closest('[data-register]')){closeSheet();showPage('addschool');return}const rs=e.target.closest('[data-reset]');if(rs){resetPw(rs.dataset.reset);return}const po=e.target.closest('[data-panel-open]');if(po){panelList(po.dataset.panelOpen);return}const st=e.target.closest('[data-stat]');if(st){statList(st.dataset.stat);return}const m=e.target.closest('[data-sub]'),t=e.target.closest('[data-toggle-sub]');if(m){closeSheet();manageSub(m.dataset.sub);return}if(t){closeSheet();toggleSub(t.dataset.toggleSub);return}const d=e.target.closest('[data-details]');if(d){closeSheet();details(d.dataset.details)}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'){const st=e.target.closest&&e.target.closest('[data-stat]');if(st)statList(st.dataset.stat)}if(e.key==='Escape')closeSheet()});
$('sheetClose').onclick=closeSheet;$('sheetModal').addEventListener('click',e=>{if(e.target===$('sheetModal'))closeSheet()});
$('closeModal').onclick=$('closeDetail').onclick=()=>$('detailModal').classList.add('hidden');
$('deleteSchool').onclick=deleteSchool;
$('detailSubscription').onclick=()=>{const id=selectedId;manageSub(id)};
$('profileForm').addEventListener('submit',async e=>{e.preventDefault();ls.set(PROFILE,JSON.stringify({name:$('profileName').value.trim(),email:$('profileEmail').value.trim(),company:$('profileCompany').value.trim(),phone:$('profilePhone').value.trim()}));renderProfile();$('profileMessage').textContent='Saving…';const ok=await syncProfileUp();$('profileMessage').textContent=ok?'Profile saved to your account.':'Profile saved on this device. Allow the superAdminProfile collection in Firestore rules to sync it across devices.'});
$('detailModal').addEventListener('click',e=>{if(e.target===$('detailModal'))$('detailModal').classList.add('hidden')});

['photoPick','photoChoose'].forEach(id=>{$(id).addEventListener('click',()=>{$('photoInput').value='';$('photoInput').click()})});
$('photoInput').addEventListener('change',e=>handlePhoto(e.target.files[0]));
$('photoRemove').addEventListener('click',()=>{photo='';ls.del(PHOTO);applyPhoto(profile().name);$('photoMsg').textContent='Removing…';syncProfileUp().then(ok=>{$('photoMsg').textContent=ok?'Photo removed.':'Photo removed on this device.'})});
})();
