import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, deleteUser } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs, getDoc, setDoc, addDoc, doc, updateDoc, deleteDoc, query, where, writeBatch, deleteField, Timestamp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";


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
const SUPER_ADMIN_UID = "PfUW9NmNApMam9e5COf6K9RDv8e2"; // Super Admin account in Firebase B (klasora-school)
const B_SUPER_UID = SUPER_ADMIN_UID;
const appB = initializeApp(firebaseConfigB, 'klasora-school-system');
const authB = getAuth(appB), dbB = getFirestore(appB);
const authB2 = getAuth(initializeApp(firebaseConfigB, 'klasora-school-system-secondary'));
// The whole portal now runs on Firebase B only: login, registry and data.
const auth = authB, db = dbB;
let bReady = false;
async function connectB(email, password) {
  try {
    if (authB.authStateReady) await authB.authStateReady();
    if (authB.currentUser && authB.currentUser.uid === B_SUPER_UID) { bReady = true; return true; }
  } catch (e) {}
  if (!email || !password) { bReady = false; return false; }
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
  if (!bReady) throw new Error('not connected. Use the Connect screen to sign in to the School System first.');
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
// Keeps the School System's copy of every school (status + subscription expiry) identical to this portal.
// The School System's firestore.rules read these fields with the SERVER clock, so a school cannot extend or
// re-activate itself by changing the date on its device or by editing the app's code. Only this portal
// (signed in as the Super Admin) can write them.
const expTs = d => d ? Timestamp.fromDate(new Date(d + 'T23:59:59')) : null;   // a subscription runs to the END of its expiry date
function subFields(s) {
  const e = expTs(s.renewalDate), a = s.subscriptionStart ? Timestamp.fromDate(new Date(s.subscriptionStart + 'T00:00:00')) : null;
  return {
    subscriptionExpiresAt: e || deleteField(),
    subscriptionStartedAt: a || deleteField(),
    subscriptionDuration: s.subscriptionDuration || deleteField(),
    subscriptionUpdatedAt: new Date().toISOString()
  };
}
async function mirrorStatus(code, status, sub) {
  if (!code) return;
  if (!bReady) { alert('The school was updated here, but the School System link is OFF, so its access was NOT changed there. Sign out, sign in again (this re-syncs every school automatically), then check the school again.'); return; }
  try { await updateDoc(doc(dbB, 'schools', String(code).toUpperCase()), Object.assign({ status }, sub || {})); }
  catch (e) { if (e.code !== 'not-found') alert('Updated here, but could not update the School System: ' + (e.message || e)); }
}
async function syncStatusesToB(list, isLiveFn) {
  if (!bReady) return;
  for (const s of list) {
    const code = String(s.code || '').toUpperCase(); if (!code) continue;
    try {
      const d = await getDoc(doc(dbB, 'schools', code)); if (!d.exists()) continue;
      const cur = d.data(); if (cur.status === 'Cancelled') continue;
      const want = isLiveFn(s) ? 'Active' : 'Suspended';
      const curMs = cur.subscriptionExpiresAt && cur.subscriptionExpiresAt.toMillis ? cur.subscriptionExpiresAt.toMillis() : null;
      const wantTs = expTs(s.renewalDate), wantMs = wantTs ? wantTs.toMillis() : null;
      if (cur.status !== want || curMs !== wantMs || (cur.subscriptionDuration || '') !== (s.subscriptionDuration || '')) await updateDoc(doc(dbB, 'schools', code), Object.assign({ status: want }, subFields(s)));
    } catch (e) {}
  }
}

(()=>{'use strict';
const PROFILE='klasora_superadmin_profile';
let schoolsCache=[];
const $=id=>document.getElementById(id);
const read=()=>schoolsCache;
async function loadSchools(){
  const snap=await getDocs(collection(db,'saSchools'));
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
// A school is ACTIVE only when it has an expiry date that has not passed and has not been deactivated.
// A school that was never activated has no expiry date, so it is INACTIVE until you click ACTIVATE.
const isLive=s=>(s.status||'Active')==='Active'&&s.subscriptionStatus!=='Paused'&&!!s.renewalDate&&daysLeft(s.renewalDate)>=0;
const subReason=s=>isLive(s)?'':(s.subscriptionStatus==='Paused'?'Deactivated':!s.renewalDate?'Not activated':'Expired');
const remainText=s=>{if(!s.renewalDate)return'—';const d=daysLeft(s.renewalDate);return d<0?'Expired '+(-d)+' day'+(d===-1?'':'s')+' ago':d===0?'Expires today':d+' day'+(d===1?'':'s')};
function expiryTag(s){const d=daysLeft(s.renewalDate);if(d===null)return'';return d<0?`<span class="tag expired">Expired ${-d}d ago</span>`:d<=7?`<span class="tag soon">${d===0?'Expires today':d+'d left'}</span>`:`<span class="tag">${d}d left</span>`}
const kv=(k,v)=>`<div class="kv"><small>${k}</small><b>${safe(v||'—')}</b></div>`;
const shortD=d=>d?new Date(d).toLocaleDateString('en-KE',{day:'2-digit',month:'short',year:'numeric'}):'';
const genPw=()=>{const c='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789',a=new Uint32Array(10);crypto.getRandomValues(a);return Array.from(a,n=>c[n%c.length]).join('')};
const greeting=()=>{const h=new Date().getHours();return(h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening')+', '+((profile().name||'').split(' ')[0]||'Superadmin')};
function schoolCard(s){return `<div class="school-card" data-details="${safe(s.id)}"><div class="sc-head"><div><b>${safe(s.name)}</b><small>${safe(s.code)}</small></div><div>${statusTag(s)}${expiryTag(s)}</div></div><div class="kv-grid">${kv('Administrator',s.adminName)}${kv('Admin email',s.adminEmail)}${kv('P.O. Box',s.poBox)}${kv('Registered',shortD(s.createdAt))}${kv('Plan',s.plan||'Starter')}${kv('Amount',money(s.monthlyFee||0))}${kv('Subscribed',fmtD(s.subscriptionStart))}${kv('Expires',fmtD(s.renewalDate))}${kv('Admin account',s.adminUid?'Created':'Not created')}<div class="kv"><button type="button" class="btn soft rst" data-reset="${safe(s.id)}">Send password reset email</button></div></div></div>`}
const PANELS={largest:['Largest schools','Ranked by student count when recorded, otherwise by subscription amount.',a=>a.slice().sort((x,y)=>(Number(y.studentCount||0)-Number(x.studentCount||0))||(Number(y.monthlyFee||0)-Number(x.monthlyFee||0)))],new:['New registrations','Most recently registered schools.',a=>a.slice().sort((x,y)=>String(y.createdAt||'').localeCompare(String(x.createdAt||'')))],expiring:['Expiring soon','Subscriptions closest to their expiry date, including expired ones. Paused schools are left out.',a=>a.filter(s=>s.renewalDate&&s.subscriptionStatus!=='Paused').sort((x,y)=>String(x.renewalDate).localeCompare(String(y.renewalDate)))]};
const emptyText=k=>k==='expiring'?'No expiry dates yet. Activate a school under School Subscriptions.':'No school records yet.';
function tagText(s,k){if(k==='expiring'){const d=daysLeft(s.renewalDate);return d<0?'Expired':d===0?'Today':d+'d left'}if(k==='new'){const t=s.createdAt?(Date.now()-new Date(s.createdAt))/864e5:99;return t<=7?'NEW':(s.createdAt?new Date(s.createdAt).toLocaleDateString('en-KE',{day:'2-digit',month:'short'}):'—')}return s.studentCount?s.studentCount+' students':Number(s.monthlyFee||0)?money(s.monthlyFee):(s.plan||'Starter')}
function panelList(kind){const T=PANELS[kind];if(!T)return;const list=T[2](read());const body='<p class="sheet-note">'+T[1]+' Tap a school for its full record.</p>'+(list.length?'<div class="school-list">'+list.map(s=>`<div class="school-row" data-details="${safe(s.id)}"><div class="school-info"><b>${safe(s.name)}</b><small>${safe(s.code)} · ${safe(s.plan||'Starter')} · ${money(s.monthlyFee||0)}</small><small>${kind==='expiring'?'Expires '+fmtD(s.renewalDate):'Registered '+(shortD(s.createdAt)||'—')} · ${statusTag(s)}</small></div><span class="compact-tag">${safe(tagText(s,kind))}</span></div>`).join('')+'</div>':'<div class="empty">'+emptyText(kind)+'</div>');openSheet('OVERVIEW',T[0],body,[{label:'Close',cls:'primary',fn:closeSheet}])}
function dl(name,type,txt){const b=new Blob([txt],{type}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},800)}
function parseCsv(t){
  const rows=[];let row=[],f='',q=false;t=String(t||'').replace(/^\ufeff/,'');
  for(let i=0;i<t.length;i++){const c=t[i];
    if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}
    else if(c==='"')q=true;
    else if(c===','){row.push(f);f=''}
    else if(c==='\n'||c==='\r'){if(c==='\r'&&t[i+1]==='\n')i++;row.push(f);f='';if(row.some(x=>x!==''))rows.push(row);row=[]}
    else f+=c}
  row.push(f);if(row.some(x=>x!==''))rows.push(row);
  if(rows.length<2)return[];
  const h=rows[0].map(x=>x.trim());
  return rows.slice(1).map(r=>{const o={};h.forEach((k,i)=>{let v=r[i]??'';if(/^'[=+\-@]/.test(v))v=v.slice(1);o[k]=v});return o});
}
const RESTORE_FIELDS=['code','name','adminName','adminEmail','poBox','adminUid','status','subscriptionStatus','plan','monthlyFee','subscriptionStart','renewalDate','createdAt','activated','mustChangePassword','studentCount','staffCount','userCount','statsUpdatedAt','subscriptionDuration','subscriptionUpdatedAt'];
function cleanRestoreRecord(r){
  if(!r||typeof r!=='object')return null;
  const code=String(r.code||'').trim().replace(/\s+/g,'').toUpperCase(),name=String(r.name||'').trim();
  if(!/^[A-Z0-9-]{1,24}$/.test(code)||!name||name.length>120)return null;
  const o={};
  RESTORE_FIELDS.forEach(k=>{if(r[k]===undefined||r[k]===null||r[k]==='')return;
    if(['monthlyFee','studentCount','staffCount','userCount'].includes(k)){const n=Number(r[k]);if(Number.isFinite(n))o[k]=n}
    else if(['activated','mustChangePassword'].includes(k))o[k]=(r[k]===true||r[k]==='true');
    else o[k]=String(r[k]).slice(0,200)});
  o.code=code;o.name=name;
  if(!o.status)o.status='Active';if(!o.subscriptionStatus)o.subscriptionStatus='Active';if(!o.plan)o.plan='Starter';if(o.monthlyFee===undefined)o.monthlyFee=0;
  return {data:o,id:/^[A-Za-z0-9]{15,30}$/.test(String(r.id||''))?String(r.id):''};
}
async function restoreFromFile(file){
  const msg=$('backupMsg');msg.textContent='';
  if(file.size>5*1024*1024){msg.textContent='That file is too large to be a Klasora backup.';return}
  let list;
  try{
    const text=await file.text();
    if(/\.csv$/i.test(file.name)||(!/^\s*[\[{]/.test(text)))list=parseCsv(text);
    else{const j=JSON.parse(text);list=Array.isArray(j)?j:(Array.isArray(j.schools)?j.schools:null);if(!list)throw new Error('no schools')}
  }catch(e){msg.textContent='That file is not a Klasora backup. Choose the JSON or CSV file made on the Backup page.';return}
  if(list.length>2000){msg.textContent='That file has too many schools.';return}
  const recs=list.map(cleanRestoreRecord).filter(Boolean),bad=list.length-recs.length;
  if(!recs.length){msg.textContent='No valid schools were found in that file.';return}
  const have=new Map(read().map(x=>[String(x.code||'').toUpperCase(),x])),fresh=recs.filter(r=>!have.has(r.data.code)),dup=recs.length-fresh.length;
  openSheet('RESTORE DATA','Restore from backup?',`<p class="sheet-note"><b>${safe(file.name)}</b><br>${recs.length} school${recs.length===1?'':'s'} found: <b>${fresh.length} new</b>, ${dup} already registered${bad?`, ${bad} skipped (incomplete)`:''}.</p><label class="chk"><input type="checkbox" id="rsOver"> Also overwrite the ${dup} school${dup===1?'':'s'} already registered</label><p class="sheet-note">This restores the school list and subscription records only. Students, results and fees inside the School System, and administrator logins, are not part of a backup file.</p><div class="error" id="sheetMsg"></div>`,
  [{label:'Cancel',cls:'soft',fn:closeSheet},{label:'Restore',cls:'primary',fn:async()=>{
    const over=$('rsOver').checked;let added=0,updated=0;
    try{
      let b=writeBatch(db),k=0;const flush=async()=>{if(k){await b.commit();b=writeBatch(db);k=0}};
      for(const r of recs){
        const old=have.get(r.data.code);if(old&&!over)continue;
        const id=old?old.id:(r.id||doc(collection(db,'saSchools')).id),d=r.data,live=isLive(d),now=new Date().toISOString();
        b.set(doc(db,'saSchools',id),d,{merge:!!old});
        b.set(doc(db,'saSchoolCodes',d.code),{code:d.code,schoolId:id,schoolName:d.name,adminUid:d.adminUid||null,active:live,isActive:live,activated:live,status:live?'Active':'Paused',updatedAt:now},{merge:true});
        k+=2;old?updated++:added++;if(k>=400)await flush();
      }
      await flush();await loadSchools();closeSheet();syncStatusesToB(schoolsCache,isLive);
      msg.textContent=`Restore finished: ${added} added, ${updated} updated.`;renderBackup();
    }catch(e){sheetMsg('Could not restore: '+(e.message||e))}
  }}]);
}
function renderBackup(){$('backupCount').textContent=read().length;const t=ls.get('klasora_last_backup');$('backupLast').textContent=t?new Date(t).toLocaleString('en-KE'):'Never'}
async function doBackup(kind){const m=$('backupMsg');m.textContent='Fetching the latest records…';try{await loadSchools()}catch(e){m.textContent='Could not reach Firestore: '+e.message;return}const a=read().map(({tempPassword,...r})=>r),stamp=new Date().toISOString().slice(0,10);if(kind==='json')dl('klasora-backup-'+stamp+'.json','application/json',JSON.stringify({app:'Klasora Super Admin',exportedAt:new Date().toISOString(),count:a.length,schools:a},null,2));else{const cols=['code','name','adminName','adminEmail','poBox','adminUid','status','subscriptionStatus','plan','monthlyFee','subscriptionStart','renewalDate','subscriptionDuration','createdAt'],q=v=>{let s=String(v??'');if(/^[=+\-@]/.test(s))s="'"+s;return'"'+s.replace(/"/g,'""')+'"'};dl('klasora-schools-'+stamp+'.csv','text/csv;charset=utf-8','\ufeff'+[cols.join(',')].concat(a.map(s=>cols.map(c=>q(s[c])).join(','))).join('\r\n'))}ls.set('klasora_last_backup',new Date().toISOString());renderBackup();m.textContent='Backup downloaded ('+a.length+' schools).'}
let rpDays=30;
function renderReports(){const a=read(),now=Date.now(),since=rpDays?now-rpDays*864e5:0,ev=[];paymentsCache.forEach(p=>ev.push({t:new Date(p.paidAt).getTime(),k:'pay',amt:Number(p.amount||0),title:'Payment received',sub:(p.schoolName||'')+' · '+money(p.amount)+' · '+(p.plan||'')}));a.forEach(s=>{const nm=s.name+' · '+s.code,p=s.subscriptionStatus==='Paused';if(s.createdAt)ev.push({t:new Date(s.createdAt).getTime(),k:'reg',title:'School registered',sub:nm});if(s.subscriptionUpdatedAt)ev.push({t:new Date(s.subscriptionUpdatedAt).getTime(),k:p?'pause':'sub',title:p?'Subscription paused':'Subscription updated',sub:nm+' · '+(s.plan||'Starter')+' · '+money(s.monthlyFee||0)});if(s.renewalDate&&!p&&daysLeft(s.renewalDate)<0)ev.push({t:new Date(s.renewalDate+'T00:00:00').getTime(),k:'exp',title:'Subscription expired',sub:nm})});
const list=ev.filter(e=>e.t>=since&&e.t<=now).sort((x,y)=>y.t-x.t),c=k=>list.filter(e=>e.k===k).length;document.querySelectorAll('[data-rp]').forEach(b=>b.classList.toggle('on',+b.dataset.rp===rpDays));
$('rpNew').textContent=c('reg');$('rpRev').textContent=money(list.filter(e=>e.k==='pay').reduce((n,e)=>n+e.amt,0));$('rpSub').textContent=c('sub')+c('pause');$('rpExp').textContent=c('exp');$('rpMrr').textContent=money(a.filter(isLive).reduce((n,s)=>n+Number(s.monthlyFee||0),0));
const tot=a.length||1;$('rpPlans').innerHTML=TIERS.map(p=>{const n=a.filter(s=>(s.plan||'Starter')===p).length;return `<div class="bar-row"><span>${p}</span><div class="bar"><i style="width:${Math.round(n/tot*100)}%"></i></div><b>${n}</b></div>`}).join('');
const col={pay:'t-green',reg:'t-teal',sub:'t-purple',pause:'t-amber',exp:'t-red'};$('reportFeed').innerHTML=list.length?list.slice(0,60).map(e=>`<div class="feed-row"><i class="feed-dot ${col[e.k]}"></i><div><b>${safe(e.title)}</b><small>${safe(e.sub)}</small></div><span>${new Date(e.t).toLocaleDateString('en-KE',{day:'2-digit',month:'short'})}</span></div>`).join(''):'<div class="empty">Nothing happened in this period.</div>'}
function showCreds(title,email,pw){openSheet('ONE-TIME PASSWORD',title,`<p class="sheet-note">Share this securely. It is not stored anywhere and cannot be shown again. The administrator should change it at first sign-in.</p><div class="kv pw"><small>Email</small><b>${safe(email)}</b></div><div class="kv pw" style="margin-top:8px"><small>Temporary password</small><b>${safe(pw)}</b><button type="button" class="copy-btn" data-copy="${safe(pw)}">Copy</button></div>`,[{label:'I have copied it',cls:'primary',fn:closeSheet}])}
function showConnectB(){
  openSheet('SCHOOL SYSTEM','Connect to the School System',`<p class="sheet-note">Sign in with your <b>School System (Firebase B)</b> Super Admin email and password. They are used only now and are never stored. Without this, new schools cannot be registered here.</p><label>Email</label><input id="bEmail" type="email" autocomplete="off" autocapitalize="none"><label>Password</label><input id="bPass" type="password" autocomplete="off"><div class="error" id="sheetMsg"></div>`,[{label:'Later',cls:'soft',fn:closeSheet},{label:'Connect',cls:'primary',fn:async()=>{const ok=await connectB($('bEmail').value.trim(),$('bPass').value);if(ok){closeSheet();alert('Connected to the School System.');syncStatusesToB(schoolsCache,isLive)}else sheetMsg('Could not connect. Check the email and password of your School System account.')}}]);
}
function resetPw(id){const s=getSchool(id);if(!s)return;openSheet('ADMIN ACCESS','Send password reset email?',`<p class="sheet-note">A reset link is emailed to <b>${safe(s.adminEmail)}</b> so the administrator can choose a new password. No password is shown or stored.</p><div class="error" id="sheetMsg"></div>`,[{label:'Cancel',cls:'soft',fn:closeSheet},{label:'Send email',cls:'primary',fn:async()=>{try{await sendPasswordResetEmail(auth,s.adminEmail);closeSheet();alert('Reset email sent to '+s.adminEmail)}catch(err){sheetMsg('Could not send: '+(err.message||err))}}}])}
const SCHOOL_SUBS=['classes','subjects','timetables','students','promotions','attendance','results','meta','messages','paynotes','fees','payments'];
async function wipeDocs(docs){let n=0,b=writeBatch(dbB),k=0;for(const d of docs){b.delete(d.ref);k++;n++;if(k===400){await b.commit();b=writeBatch(dbB);k=0}}if(k)await b.commit();return n}
// Permanently deletes a school's records from the School System (Firebase B) and its entry in this portal.
async function wipeSchool(s,say){
  const code=String(s.code||'').trim().toUpperCase();
  if(!code)throw new Error('This school has no code.');
  const out={records:0,profiles:0,emails:[]};
  for(const sub of SCHOOL_SUBS){say('Deleting '+sub+'…');out.records+=await wipeDocs((await getDocs(collection(dbB,'schools',code,sub))).docs)}
  say('Deleting user profiles…');
  const us=await getDocs(query(collection(dbB,'users'),where('schoolId','==',code)));
  const em=new Set();us.docs.forEach(d=>{const e=String(d.data().email||'').trim().toLowerCase();if(e)em.add(e)});
  if(s.adminEmail)em.add(String(s.adminEmail).trim().toLowerCase());
  out.profiles=await wipeDocs(us.docs);out.emails=[...em];
  say('Deleting the school…');
  await deleteDoc(doc(dbB,'schools',code));
  say('Cleaning the school registry…');
  try{const st=await getDocs(collection(db,'saSchools',s.id,'students'));for(const d of st.docs)await deleteDoc(d.ref)}catch(e){}
  await deleteDoc(doc(db,'saSchoolCodes',code)).catch(()=>{});
  await deleteDoc(doc(db,'saSchools',s.id));
  return out;
}
async function scrubLegacy(){for(const s of read().filter(x=>x.tempPassword!==undefined))await updateDoc(doc(db,'saSchools',s.id),{tempPassword:deleteField()})}
let paymentsCache=[];
async function loadPayments(){try{const from=new Date();from.setMonth(from.getMonth()-12);const s=await getDocs(query(collection(db,'saPayments'),where('paidAt','>=',from.toISOString())));paymentsCache=s.docs.map(d=>({id:d.id,...d.data()}))}catch(e){paymentsCache=[]}renderChart()}
function renderChart(){const now=new Date(),ms=[];for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);ms.push({k:d.getFullYear()+'-'+pad(d.getMonth()+1),l:d.toLocaleDateString('en-KE',{month:'short'}),v:0})}paymentsCache.forEach(p=>{const m=ms.find(x=>x.k===String(p.paidAt||'').slice(0,7));if(m)m.v+=Number(p.amount||0)});const mx=Math.max(...ms.map(m=>m.v)),pw=mx>0?Math.pow(10,Math.floor(Math.log10(mx))):1,top=mx>0?Math.ceil(mx/pw)*pw:1000,fk=n=>n>=1e6?(n/1e6).toFixed(1).replace(/\.0$/,'')+'M':n>=1e3?(n/1e3).toFixed(1).replace(/\.0$/,'')+'k':String(Math.round(n));$('chartY').innerHTML=[5,4,3,2,1,0].map(i=>'<span>'+fk(top*i/5)+'</span>').join('');const pts=ms.map((m,i)=>[8+i*120.4,192-(m.v/top)*180]);$('chartSvg').innerHTML='<g class="chart-grid"><path d="M0 12H620 M0 48H620 M0 84H620 M0 120H620 M0 156H620 M0 192H620"/></g><path class="chart-line" d="'+pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ')+'"/><g class="chart-dots">'+pts.map((p,i)=>'<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="4"><title>'+ms[i].l+': '+money(ms[i].v)+'</title></circle>').join('')+'</g>';$('chartX').innerHTML=ms.map(m=>'<span>'+m.l+'</span>').join('');const tot=ms.reduce((n,m)=>n+m.v,0);$('chartNote').textContent=paymentsCache.length?'Payments received in the last 6 months: '+money(tot):'No payments recorded yet. Tick "Payment received" when you set a subscription.'}
async function loadOnline(){try{const s=await getDocs(query(collection(db,'saPresence'),where('lastSeenMs','>',Date.now()-120000)));$('statOnline').textContent=s.size}catch(e){$('statOnline').textContent='—'}}
const beat=()=>auth.currentUser?setDoc(doc(db,'saPresence',auth.currentUser.uid),{role:'superAdmin',schoolId:null,lastSeenMs:Date.now()}).catch(()=>{}):Promise.resolve();
const profRef=()=>doc(db,'saProfile',SUPER_ADMIN_UID);
async function syncProfileDown(){try{const s=await getDoc(profRef());if(s.exists()){const d=s.data();if(d.profile)ls.set(PROFILE,JSON.stringify(d.profile));if('photo' in d){d.photo?ls.set(PHOTO,d.photo):ls.del(PHOTO);photo=d.photo||''}}}catch(e){}}
async function syncProfileUp(){try{await setDoc(profRef(),{profile:profile(),photo:photo||'',updatedAt:new Date().toISOString()});return true}catch(e){return false}}
let selectedId=null;
const defaultProfile={name:'Platform Owner',email:'owner@willbrodlabs.com',company:'Willbrod Labs',phone:''};
const profile=()=>{let s={};try{s=JSON.parse(ls.get(PROFILE)||'{}')}catch(e){}return{...defaultProfile,email:authEmail||defaultProfile.email,...s}};
function getSchool(id){return read().find(s=>s.id===id)}
async function saveSchool(updated){
  const {id,tempPassword,...data}=updated;
  await updateDoc(doc(db,'saSchools',id),data);
  const live=isLive(updated),cd=String(updated.code||'').toUpperCase();
  try{if(cd)await setDoc(doc(db,'saSchoolCodes',cd),{code:cd,schoolId:id,schoolName:updated.name,adminUid:updated.adminUid||null,active:live,isActive:live,activated:live,status:live?'Active':'Paused',updatedAt:new Date().toISOString()},{merge:true})}catch(e){}
  await mirrorStatus(cd,live?'Active':'Suspended',subFields(updated));
  const i=schoolsCache.findIndex(s=>s.id===id);
  if(i>=0) schoolsCache[i]=updated;
}
function initials(s){return String(s||'K').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()}
function statusTag(s){return isLive(s)?'<span class="tag">ACTIVE</span>':`<span class="tag ${subReason(s)==='Expired'?'expired':'paused'}">INACTIVE · ${safe(subReason(s))}</span>`}
const TITLES={schools:'Registered Schools',addschool:'Add School',subscriptions:'School Subscriptions',profile:'My Profile',backup:'Backup Data',reports:'Reports'};
function showPage(page,navEl){document.querySelectorAll('.page').forEach(x=>x.classList.add('hidden'));$('page-'+page).classList.remove('hidden');const navs=[...document.querySelectorAll('.nav[data-page]')];const hit=navEl&&navEl.dataset&&navEl.dataset.page===page?navEl:navs.find(x=>x.dataset.page===page);navs.forEach(x=>x.classList.toggle('active',x===hit));$('pageTitle').textContent=page==='overview'?greeting():(TITLES[page]||'Klasora');if(page==='profile')renderProfile();if(page==='backup')renderBackup();if(page==='reports')renderReports();window.scrollTo(0,0);renderAll()}
function renderAll(){const a=read(),live=a.filter(isLive);$('statTotal').textContent=a.length;$('statActive').textContent=live.length;$('statValue').textContent=money(live.reduce((n,s)=>n+Number(s.monthlyFee||0),0));$('directoryCount').textContent=a.length;renderSchoolRows(a.slice().reverse(),'schoolDirectory');renderSubscriptions(a);renderDashboardPanels(a);const lg=a.filter(s=>s.tempPassword).length;$('legacyBanner').classList.toggle('hidden',!lg);$('legacyCount').textContent=lg}
function renderDashboardPanels(a){const sm=k=>a.reduce((n,s)=>n+Number(s[k]||0),0),rp=a.filter(s=>s.statsUpdatedAt).length;$('demoStudents').textContent=rp?sm('studentCount').toLocaleString():'—';$('demoStaff').textContent=rp?sm('staffCount').toLocaleString():'—';$('demoUsers').textContent=rp?(sm('userCount')||sm('studentCount')+sm('staffCount')).toLocaleString():'—';$('demoNote').textContent=rp?rp+' of '+a.length+' schools have reported their totals.':'Totals appear once school apps report them.';$('demoSchools').textContent=a.length;$('protocolSchoolCount').textContent=a.length+' schools loaded';const row=(items,kind)=>items.length?items.slice(0,5).map((s,i)=>`<div class="compact-row" data-details="${safe(s.id)}"><b>${i+1}.</b><div><strong>${safe(s.name)}</strong><small>${safe(s.adminEmail||s.code||'School record')}</small></div><span class="compact-tag${kind==='expiring'&&daysLeft(s.renewalDate)<=7?' warn':''}">${safe(tagText(s,kind))}</span></div>`).join(''):'<div class="compact-empty">'+emptyText(kind)+'</div>';$('largestSchools').innerHTML=row(PANELS.largest[2](a),'largest');$('newRegistrations').innerHTML=row(PANELS.new[2](a),'new');$('expiringSchools').innerHTML=row(PANELS.expiring[2](a),'expiring')}
function renderSchoolRows(list,target){const q=$('schoolSearch').value.trim().toLowerCase();const f=list.filter(s=>!q||(s.name+' '+s.code+' '+s.adminName+' '+s.adminEmail).toLowerCase().includes(q));$(target).innerHTML=f.length?f.map(schoolCard).join(''):'<div class="empty">No schools found.</div>'}
function renderSubscriptions(a){$('subscriptionList').innerHTML=a.length?a.slice().reverse().map(s=>{const live=isLive(s);return `<div class="sub-card${live?'':' is-paused'}"><div class="sc-head"><div><b>${safe(s.name)}</b><small>${safe(s.code)}</small></div><div>${statusTag(s)}</div></div><div class="kv-grid">${kv('Status',live?'ACTIVE':'INACTIVE'+(subReason(s)?' · '+subReason(s):''))}${kv('Activated on',s.subscriptionStart?fmtD(s.subscriptionStart):'')}${kv('Expires on',s.renewalDate?fmtD(s.renewalDate):'')}${kv('Duration',s.subscriptionDuration)}${kv('Remaining days',live?remainText(s):'')}${kv('Plan',s.plan||'Starter')}</div><div class="sub-actions"><button type="button" class="btn primary" data-sub="${safe(s.id)}">${live?'RENEW / EXTEND':'ACTIVATE'}</button>${live?`<button type="button" class="btn danger" data-toggle-sub="${safe(s.id)}">DEACTIVATE</button>`:''}</div></div>`}).join(''):'<div class="empty">Register a school first, then activate its subscription here.</div>'}
let sheetActs=[];
function openSheet(eyebrow,title,body,acts){$('sheetEyebrow').textContent=eyebrow;$('sheetTitle').textContent=title;$('sheetBody').innerHTML=body;const box=$('sheetActions');box.innerHTML='';(acts||[]).forEach(a=>{const b=document.createElement('button');b.type='button';b.className='btn '+(a.cls||'soft');b.textContent=a.label;b.onclick=a.fn;box.appendChild(b)});$('sheetModal').classList.remove('hidden')}
function closeSheet(){$('sheetModal').classList.add('hidden')}
function sheetMsg(t){const m=$('sheetMsg');if(m)m.textContent=t}
function manageSub(id){
  const s=getSchool(id);if(!s)return;
  const live=isLive(s);
  let plan=TIERS.includes(s.plan)?s.plan:'Starter',months=1,manual=false,extend=live;
  const info=live?`ACTIVE until <b>${fmtD(s.renewalDate)}</b> (${remainText(s)} left)`:`INACTIVE · ${safe(subReason(s))}`;
  const body=`<p class="sheet-note"><b>${safe(s.name)}</b> · ${safe(s.code)}<br>Now: ${info}</p><label>Subscription duration</label><div class="chips" id="expChips">${[[1,'1 Month'],[3,'3 Months'],[6,'6 Months'],[12,'12 Months']].map(([n,l])=>`<button type="button" data-add="${n}">${l}</button>`).join('')}</div><div class="date-row"><div><label>Activation date</label><input id="subStart" type="date" class="date-in" value="${today()}"></div><div><label>Expiry date (change for a custom date)</label><input id="subRenew" type="date" class="date-in" value=""></div></div>${live?`<label class="chk"><input type="checkbox" id="subExtend" checked><span>Add this time on top of the current expiry date (${fmtD(s.renewalDate)})</span></label>`:''}<div class="date-sum" id="dateSum"></div><label>Plan (optional)</label><div class="plan-pick" id="planPick">${TIERS.map(p=>`<button type="button" class="plan-opt${p===plan?' on':''}" data-plan="${p}">${p}</button>`).join('')}</div><label>Amount received (optional)</label><div class="amt"><span>KSh</span><input id="subFee" inputmode="decimal" placeholder="e.g. 5000" value="${safe(s.monthlyFee||'')}"></div><label class="chk"><input type="checkbox" id="subPaid" checked><span>Payment received — add it to revenue</span></label><div class="error" id="sheetMsg"></div>`;
  const base=()=>extend&&live?s.renewalDate:($('subStart').value||today());
  const label=()=>{const st=$('subStart').value,ex=$('subRenew').value;let l;if(!manual)l=months+' Month'+(months>1?'s':'');else{const n=Math.round((new Date(ex+'T00:00:00')-new Date(base()+'T00:00:00'))/864e5);l='Custom ('+n+' days)'}return l+(extend&&live?' (extended)':'')};
  openSheet('ACTIVATE SCHOOL',live?'Renew or extend subscription':'Activate school',body,[{label:'Cancel',cls:'soft',fn:closeSheet},{label:'ACTIVATE',cls:'primary',fn:async()=>{
    const feeRaw=$('subFee').value.trim().replace(/,/g,'');
    if(feeRaw&&!/^\d+(\.\d{1,2})?$/.test(feeRaw)){sheetMsg('Enter the amount as a number, e.g. 5000, or leave it empty.');return}
    const st=$('subStart').value,ex=$('subRenew').value;
    if(!st||!ex){sheetMsg('Choose the duration or an expiry date.');return}
    if(ex<=st){sheetMsg('The expiry date must be after the activation date.');return}
    if(daysLeft(ex)<0){sheetMsg('That expiry date has already passed. Choose a later date.');return}
    const fee=feeRaw?Number(feeRaw):0,u=getSchool(id);
    u.plan=plan;if(feeRaw)u.monthlyFee=fee;u.subscriptionStart=st;u.renewalDate=ex;u.subscriptionStatus='Active';u.subscriptionDuration=label();u.subscriptionUpdatedAt=new Date().toISOString();
    try{await saveSchool(u)}catch(err){sheetMsg('Could not save: '+(err.message||err));return}
    if($('subPaid')&&$('subPaid').checked&&fee>0){try{const p={schoolId:id,schoolName:u.name,schoolCode:u.code,amount:fee,plan,periodStart:st,periodEnd:ex,paidAt:new Date().toISOString()};const r=await addDoc(collection(db,'saPayments'),p);paymentsCache.push({id:r.id,...p});renderChart()}catch(err){sheetMsg('The school is activated, but the payment was not recorded: '+(err.message||err));renderAll();return}}
    closeSheet();renderAll();if(!$('detailModal').classList.contains('hidden'))details(id)}}]);
  const calc=()=>{if(!manual)$('subRenew').value=addMonths(base(),months)};
  const sum=()=>{const st=$('subStart').value,e=$('subRenew').value;if(!e){$('dateSum').textContent='Pick an expiry date.';return}const d=daysLeft(e);$('dateSum').innerHTML='Activated <b>'+fmtD(st)+'</b><br>Expires <b>'+fmtD(e)+'</b> · '+(d<0?'already expired':d===0?'today':d+' days from today')};
  const chips=()=>document.querySelectorAll('#expChips button').forEach(b=>b.classList.toggle('on',!manual&&+b.dataset.add===months));
  $('planPick').onclick=e=>{const b=e.target.closest('[data-plan]');if(!b)return;plan=b.dataset.plan;document.querySelectorAll('#planPick .plan-opt').forEach(x=>x.classList.toggle('on',x===b))};
  $('subStart').onchange=()=>{if(!$('subStart').value)$('subStart').value=today();calc();sum();chips()};
  $('subRenew').onchange=()=>{manual=true;sum();chips()};
  $('expChips').onclick=e=>{const b=e.target.closest('[data-add]');if(!b)return;months=+b.dataset.add;manual=false;calc();sum();chips()};
  if($('subExtend'))$('subExtend').onchange=()=>{extend=$('subExtend').checked;calc();sum();chips()};
  calc();sum();chips();
}
function toggleSub(id){const s=getSchool(id);if(!s)return;openSheet('DEACTIVATE','Deactivate this school?',`<p class="sheet-note"><b>${safe(s.name)}</b> (${safe(s.code)}) will be blocked from Klasora right away. <b>Nothing is deleted</b>: students, teachers, attendance, exams, fees and payment history all stay safe. Click ACTIVATE later to give the school access again.</p><div class="error" id="sheetMsg"></div>`,[{label:'Cancel',cls:'soft',fn:closeSheet},{label:'DEACTIVATE',cls:'danger',fn:async()=>{const u=getSchool(id);u.subscriptionStatus='Paused';u.subscriptionUpdatedAt=new Date().toISOString();try{await saveSchool(u)}catch(err){sheetMsg('Could not deactivate: '+(err.message||err));return}closeSheet();renderAll();if(!$('detailModal').classList.contains('hidden'))details(id)}}])}
function deleteSchool(){
  const s=getSchool(selectedId);if(!s)return;const id=selectedId;
  openSheet('DANGER ZONE','Delete school and all its data?',`<p class="sheet-note">This permanently deletes <b>${safe(s.name)}</b> (${safe(s.code)}) from Firebase: its learners, staff and parent profiles, attendance, results, fees, payments, messages and its subscription record. <b>It cannot be undone</b>, and a backup file cannot bring this data back.</p><label>Type the school code <b>${safe(s.code)}</b> to confirm</label><input id="delCode" autocapitalize="characters" autocomplete="off"><div class="error" id="sheetMsg"></div>`,
  [{label:'Cancel',cls:'soft',fn:closeSheet},{label:'Delete everything',cls:'danger',fn:async()=>{
    if($('delCode').value.trim().toUpperCase()!==String(s.code).toUpperCase()){sheetMsg('School code did not match. Nothing was deleted.');return}
    openSheet('DELETING','Deleting '+s.name,'<p class="sheet-note" id="delProg">Starting…</p><p class="sheet-note">Please keep this screen open until it finishes.</p>',[]);
    const say=t=>{const e=$('delProg');if(e)e.textContent=t};
    try{
      const r=await wipeSchool(s,say);
      schoolsCache=schoolsCache.filter(x=>x.id!==id);$('detailModal').classList.add('hidden');selectedId=null;renderAll();
      const mails=r.emails.length?`<p class="sheet-note"><b>One more step.</b> Firebase does not let this portal delete sign-in logins. In the Firebase Console open <b>klasora-school → Authentication → Users</b> and delete ${r.emails.length===1?'this login':'these logins'}, so the email can be used again:<br>${r.emails.map(safe).join('<br>')}</p>`:'';
      openSheet('DONE','School deleted',`<p class="sheet-note">${r.records} records and ${r.profiles} user profile${r.profiles===1?'':'s'} were permanently deleted from Firebase.</p>${mails}`,[{label:'Close',cls:'primary',fn:closeSheet}]);
    }catch(err){
      openSheet('NOT FINISHED','Could not delete everything',`<p class="sheet-note">${safe(err.code==='permission-denied'?'Firebase refused the deletion. Publish the updated Firestore rules for the Super Admin, then try again.':(err.message||err))}</p><p class="sheet-note">The school is still listed. You can try again.</p>`,[{label:'Close',cls:'primary',fn:closeSheet}]);
      try{await loadSchools()}catch(e){}
    }
  }}]);
}
function statList(kind){const a=read().slice().reverse();const T={all:['Registered schools','Every school you have registered',()=>true],active:['Active schools','Schools currently active',isLive],paused:['Inactive schools','Schools without an active subscription',s=>!isLive(s)],value:['Subscription value','Active subscriptions and their monthly fees',isLive]}[kind];if(!T)return;const list=a.filter(T[2]);let body='<p class="sheet-note">'+T[1]+'. Tap a school to see its details.</p>';
if(kind==='value')body+=`<div class="sheet-total"><small>TOTAL MONTHLY VALUE</small><b>${money(list.reduce((n,s)=>n+Number(s.monthlyFee||0),0))}</b></div>`;
body+=list.length?'<div class="school-list">'+list.map(s=>`<div class="school-row" data-details="${safe(s.id)}"><div class="school-info"><b>${safe(s.name)}</b><small>${safe(s.code)} · ${safe(s.adminName)}</small><small>${kind==='value'?`${safe(s.plan||'Starter')} · ${money(s.monthlyFee||0)} / month · `:''}${statusTag(s)}</small></div><button type="button" class="btn soft" data-details="${safe(s.id)}">Details</button></div>`).join('')+'</div>':`<div class="empty">No schools here yet.${kind==='all'?'<br><br><button type="button" class="btn gold-btn" data-register="1">＋ Register a School</button>':''}</div>`;
openSheet('OVERVIEW',T[0],body,[{label:'Close',cls:'primary',fn:closeSheet}])}
const PHOTO='klasora_superadmin_photo';let photo=ls.get(PHOTO)||'';
function applyPhoto(name){['avatar','profileAvatar'].forEach(id=>{const el=$(id);if(!el)return;if(photo){el.style.backgroundImage='url("'+photo+'")';el.textContent=''}else{el.style.backgroundImage='';el.textContent=initials(name)}});const r=$('photoRemove');if(r)r.style.display=photo?'block':'none'}
function handlePhoto(file){const m=$('photoMsg');if(!file)return;if(!/^image\//.test(file.type)&&!/\.(jpe?g|png|webp|gif)$/i.test(file.name)){m.textContent='Choose a JPG, PNG or WebP image.';return}m.textContent='Processing photo…';const url=URL.createObjectURL(file),img=new Image();img.onload=()=>{const w=img.naturalWidth,h=img.naturalHeight,s=Math.min(w,h),S=320,cv=document.createElement('canvas');cv.width=cv.height=S;const c=cv.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,S,S);c.drawImage(img,(w-s)/2,(h-s)/2,s,s,0,0,S,S);URL.revokeObjectURL(url);photo=cv.toDataURL('image/jpeg',0.82);ls.set(PHOTO,photo);applyPhoto(profile().name);m.textContent='Saving…';syncProfileUp().then(ok=>{m.textContent=ok?'Photo saved to your account.':'Photo saved on this device only.'})};img.onerror=()=>{URL.revokeObjectURL(url);m.textContent='That image could not be read. Try a JPG or PNG.'};img.src=url}
function renderProfile(){const p=profile();$('profileName').value=p.name;$('profileEmail').value=p.email;$('profileCompany').value=p.company;$('profilePhone').value=p.phone;$('profilePreviewName').textContent=p.name;$('profilePreviewEmail').textContent=p.email;$('chipName').textContent=(p.name||'').split(' ')[0]||'Super Admin';applyPhoto(p.name);if(!$('page-overview').classList.contains('hidden'))$('pageTitle').textContent=greeting()}
function details(id){const s=getSchool(id);if(!s)return;selectedId=id;$('detailTitle').textContent=s.name;$('detailContent').innerHTML=`<div class="detail-grid">
${[['SCHOOL NAME',s.name],['SCHOOL CODE',s.code],['ADMINISTRATOR NAME',s.adminName],['ADMINISTRATOR EMAIL',s.adminEmail],['SCHOOL P.O. BOX',s.poBox],['REGISTRATION DATE',s.createdAt?new Date(s.createdAt).toLocaleString():'Not recorded'],['SCHOOL STATUS',s.status||'Active'],['SUBSCRIPTION STATUS',isLive(s)?'ACTIVE':'INACTIVE ('+subReason(s)+')'],['SUBSCRIPTION PLAN',s.plan||'Starter'],['MONTHLY FEE',money(s.monthlyFee||0)],['ACTIVATED ON',fmtD(s.subscriptionStart)],['EXPIRY DATE',fmtD(s.renewalDate)],['DURATION',s.subscriptionDuration],['REMAINING DAYS',isLive(s)?remainText(s):'—'],['ADMIN ACCOUNT',s.adminUid?'Created (password is not stored)':'Not created']].map(([k,v])=>`<div class="detail-item"><small>${safe(k)}</small><b>${safe(v||'Not provided')}</b></div>`).join('')}</div>`;$('detailModal').classList.remove('hidden')}



const SESSION_FLAG='klasora_sa_session';
let appStarted=false;
// Opens the dashboard for the signed-in Super Admin (used after sign-in and when a saved sign-in is restored).
async function enterApp(user){
  $('loginScreen').classList.add('hidden');
  $('app').classList.remove('hidden');
  authEmail=user.email||'';
  $('loginTime').textContent=new Date().toLocaleString();
  await connectB();
  renderProfile();
  await syncProfileDown();renderProfile();await loadSchools();if(!bReady)showConnectB();else syncStatusesToB(schoolsCache,isLive);loadPayments();
  if(!appStarted){appStarted=true;beat().then(loadOnline);setInterval(()=>{beat().then(loadOnline)},45000);}
}
$('loginForm').addEventListener('submit',async e=>{
  e.preventDefault();
  $('loginError').textContent='Signing in…';
  try{
    const credential=await signInWithEmailAndPassword(auth,$('username').value.trim(),$('password').value);
    if(credential.user.uid!==SUPER_ADMIN_UID){
      await signOut(auth);
      throw new Error('Wrong password.');
    }
    ls.set(SESSION_FLAG,'1');
    await enterApp(credential.user);
    $('loginError').textContent='';
  }catch(err){
    $('loginError').textContent=err.code==='auth/invalid-credential'||err.code==='auth/wrong-password'||err.code==='auth/user-not-found'||err.code==='auth/invalid-email'
      ?'Wrong password.'
      :err.message||'Sign-in failed. Please try again.';
  }
});
$('logout').onclick=async()=>{ls.del(SESSION_FLAG);await signOut(auth);location.reload()};
// Stay signed in until the Super Admin taps Sign out: restore the saved Firebase session on every start.
(async()=>{
  try{
    if(auth.authStateReady)await auth.authStateReady();
    const u=auth.currentUser;
    if(u&&u.uid===SUPER_ADMIN_UID){await enterApp(u)}
    else if(u){await signOut(auth)}
  }catch(e){console.warn('Could not restore the saved sign-in:',e)}
  finally{document.documentElement.classList.remove('sa-restoring')}
})();
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page,b));$('scrubBtn').onclick=async()=>{const b=$('scrubBtn');b.disabled=true;try{await scrubLegacy();await loadSchools()}catch(e){alert('Could not remove the stored passwords: '+(e.message||e))}b.disabled=false};$('bkRestore').onclick=()=>$('bkFile').click();$('bkFile').onchange=e=>{const f=e.target.files[0];e.target.value='';if(f)restoreFromFile(f)};$('bkJson').onclick=()=>doBackup('json');$('bkCsv').onclick=()=>doBackup('csv');$('sideClose').onclick=()=>{window.closeSide();showPage('overview')};document.addEventListener('click',e=>{const c=e.target.closest('[data-rp]');if(c){rpDays=+c.dataset.rp;renderReports()}});const EYE='<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',EYEOFF='<path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1M9.9 9.9a3 3 0 004.2 4.2"/>';$('togglePw').onclick=()=>{const p=$('password'),show=p.type==='password';p.type=show?'text':'password';$('togglePw').querySelector('svg').innerHTML=show?EYEOFF:EYE;$('togglePw').setAttribute('aria-label',show?'Hide password':'Show password')};
if($('sideSearch'))$('sideSearch').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll('#sidebar .nav[data-page]').forEach(b=>b.style.display=!q||b.textContent.toLowerCase().includes(q)?'flex':'none')});
document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>showPage(b.dataset.goto));
$('schoolForm').addEventListener('submit',async e=>{e.preventDefault();if(!bReady){showConnectB();return}const code=$('schoolCode').value.trim().replace(/\s+/g,'').toUpperCase(),email=$('adminEmail').value.trim().toLowerCase(),msg=$('formMessage');if(!/^[A-Z0-9-]{1,24}$/.test(code)){msg.textContent='School code must contain letters, numbers or hyphens.';return}if(read().some(s=>String(s.code||'').toUpperCase()===code)){msg.textContent='That school code is already registered.';return}if(read().some(s=>String(s.adminEmail||'').toLowerCase()===email)){msg.textContent='That administrator email is already registered.';return}const btn=$('schoolForm').querySelector('button:not([type])');if(btn)btn.disabled=true;msg.textContent='Creating the school and administrator account…';let cred=null;try{if((await getDoc(doc(db,'saSchoolCodes',code))).exists())throw new Error('That school code is already registered.');const tempPassword=genPw();let bRes=null;try{bRes=await registerInB({code,name:$('schoolName').value.trim(),poBox:$('schoolBox').value.trim(),adminName:$('adminName').value.trim(),email,tempPassword})}catch(er){throw new Error('School System: '+(er.message||er))}cred={user:{uid:bRes.uid}};const ref=doc(collection(db,'saSchools')),now=new Date().toISOString(),school={code,name:$('schoolName').value.trim(),adminName:$('adminName').value.trim(),adminEmail:email,poBox:$('schoolBox').value.trim(),adminUid:cred.user.uid,status:'Active',subscriptionStatus:'Active',plan:'Starter',monthlyFee:0,renewalDate:'',subscriptionStart:'',createdAt:now,activated:true,mustChangePassword:true,passwordIssuedAt:now};try{const b=writeBatch(db);b.set(ref,school);b.set(doc(db,'saSchoolCodes',code),{code,schoolId:ref.id,schoolName:school.name,adminUid:cred.user.uid,active:true,isActive:true,activated:true,status:'Active',createdAt:now});await b.commit()}catch(er){await rollbackB(bRes);throw new Error('Could not save the school: '+(er.message||er))}schoolsCache.push({id:ref.id,...school});$('schoolForm').reset();msg.textContent='School created. It stays INACTIVE until you open School Subscriptions and click ACTIVATE.';renderAll();showCreds('Administrator account created',email,tempPassword)}catch(err){msg.textContent=err.message||String(err)}finally{if(btn)btn.disabled=false}});

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
