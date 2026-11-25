import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser, updatePassword, signOut, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, serverTimestamp, query, where, writeBatch, arrayUnion } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHRxj8hJwpPcwFBW8p-CCBvGzOlJpyfGc",
  authDomain: "klasora-school.firebaseapp.com",
  projectId: "klasora-school",
  storageBucket: "klasora-school.firebasestorage.app",
  messagingSenderId: "274741090812",
  appId: "1:274741090812:web:77ce9fdfb32f42d0383a79"
};
const app = initializeApp(firebaseConfig, "klasoraSchoolSystem");
const auth = getAuth(app);
// Second app instance: creates staff logins without signing the school administrator out.
const authProv = getAuth(initializeApp(firebaseConfig, "klasoraProvisioning"));
const db = getFirestore(app);
const norm = v => String(v || "").trim().toUpperCase();

// Loads the signed-in user's profile (role, school) and checks the school is active.
async function loadProfile(user) {
  const p = await getDoc(doc(db, "users", user.uid));
  if (!p.exists()) throw new Error("This account is not linked to a school. Contact your school administrator.");
  const profile = p.data();
  if (profile.disabled === true) throw new Error("This account has been deactivated. Please contact your school administrator.");
  const s = await getDoc(doc(db, "schools", profile.schoolId));
  if (!s.exists()) throw new Error("School record not found. Contact Klasora support.");
  const school = s.data();
  if (String(school.status || "").toLowerCase() !== "active") throw new Error("This school account is not active. Please contact Klasora support.");
  return { user, profile, school, schoolId: profile.schoolId };
}

async function signIn(email, password, schoolCode) {
  const cred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  try {
    const r = await loadProfile(cred.user);
    if (schoolCode && norm(schoolCode) !== norm(r.schoolId)) throw new Error("The school code does not match this account.");
    return r;
  } catch (e) {
    await signOut(auth);
    throw e;
  }
}

// Resolves to the signed-in session (or null) once Firebase has checked for a saved login.
function restore() {
  return new Promise(resolve => {
    const off = onAuthStateChanged(auth, async user => {
      off();
      if (!user) return resolve(null);
      try { resolve(await loadProfile(user)); }
      catch (e) { await signOut(auth); resolve(null); }
    });
  });
}

async function changePassword(currentPassword, newPassword) {
  const user = auth.currentUser;
  if (!user) throw new Error("Your session has expired. Sign in again.");
  if (currentPassword) {
    await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));
  }
  await updatePassword(user, newPassword);
  try { await updateDoc(doc(db, "users", user.uid), { mustChangePassword: false, lastLoginAt: serverTimestamp() }); } catch (e) {}
}

async function loadSchoolStudents(schoolId) {
  if (!auth.currentUser || !schoolId) throw new Error("Sign in to a school before loading student records.");
  const snap = await getDocs(collection(db, "schools", schoolId, "students"));
  return snap.docs.map(item => ({ id: item.id, ...item.data() }));
}

async function createSchoolStudent(schoolId, student) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  if (!student || !student.adm || !student.name) throw new Error("Student admission details are incomplete.");
  const documentId = String(student.adm).trim().replaceAll("/", "_");
  const record = {
    name: String(student.name).trim(),
    adm: String(student.adm).trim().toUpperCase(),
    cls: String(student.cls || ""),
    gender: String(student.gender || ""),
    dob: String(student.dob || ""),
    parent: String(student.parent || ""),
    relation: String(student.relation || "Guardian"),
    phone: String(student.phone || ""),
    status: "Active",
    createdAt: serverTimestamp(),
    createdBy: user.uid
  };
  await setDoc(doc(db, "schools", schoolId, "students", documentId), record);
  return { ...record, id: documentId, date: new Date().toISOString().slice(0, 10) };
}

// Loads only the students this user's role is allowed to see (matches the Firestore rules).
async function loadStudents(r) {
  const col = collection(db, "schools", r.schoolId, "students");
  const role = r.profile.role;
  let docs = [];
  if (role === "admin" || role === "accountant") {
    docs = (await getDocs(col)).docs;
  } else if (role === "teacher") {
    const parts = await Promise.all((r.profile.classes || []).map(c => getDocs(query(col, where("cls", "==", c)))));
    docs = parts.flatMap(p => p.docs);
  } else if (role === "parent") {
    const snaps = await Promise.all((r.profile.children || []).map(id => getDoc(doc(col, id))));
    docs = snaps.filter(s => s.exists());
  }
  return docs.map(d => ({ id: d.id, ...d.data() }));
}

async function saveStudents(schoolId, list) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  for (let i = 0; i < list.length; i += 400) {
    const batch = writeBatch(db);
    list.slice(i, i + 400).forEach(s => {
      const adm = String(s.adm).trim().toUpperCase();
      batch.set(doc(db, "schools", schoolId, "students", adm.replaceAll("/", "_")), {
        name: String(s.name).trim(), adm, cls: String(s.cls || ""), gender: String(s.gender || ""),
        dob: String(s.dob || ""), parent: String(s.parent || ""), relation: String(s.relation || "Guardian"),
        phone: String(s.phone || ""), status: s.status || "Active", createdAt: serverTimestamp(), createdBy: user.uid
      });
    });
    await batch.commit();
  }
}

// School administrator creates a login (teacher, accountant or parent) for their own school.
async function createUserAccount(schoolId, u) {
  const admin = auth.currentUser;
  if (!admin || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  const email = String(u.email).trim().toLowerCase();
  const cred = await createUserWithEmailAndPassword(authProv, email, u.password);
  const uid = cred.user.uid;
  try {
    await setDoc(doc(db, "users", uid), {
      role: u.role, schoolId, name: u.name, email,
      classes: u.classes || [], children: u.children || [], linkPhone: u.linkPhone || "",
      mustChangePassword: true, createdAt: serverTimestamp(), createdBy: admin.uid
    });
  } catch (e) {
    try { await deleteUser(authProv.currentUser); } catch (_e) {}   // do not leave a login without a profile
    throw e;
  }
  await signOut(authProv);
  return uid;
}

// Adds learners to an existing parent's profile (e.g. a new brother or sister is admitted).
async function linkChildren(uid, ids) {
  await updateDoc(doc(db, "users", uid), { children: arrayUnion(...ids) });
}

async function setUserDisabled(uid, disabled) {
  await updateDoc(doc(db, "users", uid), { disabled: !!disabled });
}

async function listSchoolUsers(schoolId) {
  const snap = await getDocs(query(collection(db, "users"), where("schoolId", "==", schoolId)));
  return snap.docs.map(d => ({ uid: d.id, ...d.data() }));
}

// Attendance: one document per learner per month  ->  { studentId, adm, cls, month: "2026-11", marks: { "18": "P" } }
async function loadAttendance(r) {
  const col = collection(db, "schools", r.schoolId, "attendance");
  const role = r.profile.role, year = String(new Date().getFullYear());
  let docs = [];
  if (role === "admin") {
    docs = (await getDocs(query(col, where("month", ">=", year + "-01")))).docs;
  } else if (role === "teacher") {
    const parts = await Promise.all((r.profile.classes || []).map(c => getDocs(query(col, where("cls", "==", c)))));
    docs = parts.flatMap(p => p.docs);
  } else if (role === "parent") {
    const parts = await Promise.all((r.profile.children || []).map(id => getDocs(query(col, where("studentId", "==", id)))));
    docs = parts.flatMap(p => p.docs);
  }
  return docs.map(d => d.data()).filter(x => String(x.month || "") >= year + "-01");
}

async function saveAttendance(schoolId, entries) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  for (let i = 0; i < entries.length; i += 400) {
    const batch = writeBatch(db);
    entries.slice(i, i + 400).forEach(e => {
      const sid = String(e.adm).trim().toUpperCase().replaceAll("/", "_");
      batch.set(doc(db, "schools", schoolId, "attendance", sid + "_" + e.month), {
        studentId: sid, adm: String(e.adm).toUpperCase(), cls: String(e.cls || ""), month: e.month,
        marks: e.marks || {}, updatedAt: serverTimestamp(), updatedBy: user.uid
      });
    });
    await batch.commit();
  }
}

// Exam results: one document per learner per exam -> { studentId, adm, cls, examKey: "2026-T3-END", marks, note, gen }
async function loadResults(r) {
  const col = collection(db, "schools", r.schoolId, "results");
  const role = r.profile.role;
  let docs = [];
  if (role === "admin") {
    docs = (await getDocs(col)).docs;
  } else if (role === "teacher") {
    const parts = await Promise.all((r.profile.classes || []).map(c => getDocs(query(col, where("cls", "==", c)))));
    docs = parts.flatMap(p => p.docs);
  } else if (role === "parent") {
    const parts = await Promise.all((r.profile.children || []).map(id => getDocs(query(col, where("studentId", "==", id)))));
    docs = parts.flatMap(p => p.docs);
  }
  return docs.map(d => d.data());
}

async function saveResults(schoolId, entries) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  for (let i = 0; i < entries.length; i += 400) {
    const batch = writeBatch(db);
    entries.slice(i, i + 400).forEach(e => {
      const sid = String(e.adm).trim().toUpperCase().replaceAll("/", "_");
      batch.set(doc(db, "schools", schoolId, "results", sid + "_" + e.examKey), {
        studentId: sid, adm: String(e.adm).toUpperCase(), cls: String(e.cls || ""), examKey: e.examKey,
        marks: e.marks || {}, note: e.note || null, gen: e.gen || "", updatedAt: serverTimestamp(), updatedBy: user.uid
      });
    });
    await batch.commit();
  }
}

// School-wide settings stored as small JSON documents (subjects, teacher subjects, learner subject choices)
async function loadMeta(schoolId, keys) {
  const out = {};
  for (const key of (keys || ["config", "stusubj", "feestr", "ann", "staff", "imports", "classteachers"])) {
    try {
      const s = await getDoc(doc(db, "schools", schoolId, "meta", key));
      if (s.exists()) out[key] = JSON.parse(s.data().json || "null");
    } catch (e) { if (e.code !== "permission-denied") throw e; }
  }
  return out;
}
async function saveMeta(schoolId, key, value) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  await setDoc(doc(db, "schools", schoolId, "meta", key), { json: JSON.stringify(value), updatedAt: serverTimestamp(), updatedBy: user.uid });
}

// Payments: one document per receipt. A payment is never deleted; a reversal is flagged and kept for audit.
async function loadPayments(r) {
  const col = collection(db, "schools", r.schoolId, "payments");
  const role = r.profile.role;
  let docs = [];
  if (role === "admin" || role === "accountant") {
    docs = (await getDocs(col)).docs;
  } else if (role === "parent") {
    const parts = await Promise.all((r.profile.children || []).map(id => getDocs(query(col, where("studentId", "==", id)))));
    docs = parts.flatMap(p => p.docs);
  }
  return docs.map(d => d.data());
}

async function savePayment(schoolId, rec) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  const sid = String(rec.adm).trim().toUpperCase().replaceAll("/", "_");
  await setDoc(doc(db, "schools", schoolId, "payments", rec.id), {
    id: rec.id, rcpt: rec.rcpt, studentId: sid, adm: String(rec.adm).toUpperCase(), year: rec.year, term: rec.term,
    amount: rec.amount, method: rec.method, ref: rec.ref || "", date: rec.date, by: rec.by || "",
    reversed: false, createdAt: serverTimestamp(), createdBy: user.uid
  });
}

async function reversePayment(schoolId, id) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  await updateDoc(doc(db, "schools", schoolId, "payments", id), { reversed: true, reversedAt: serverTimestamp(), reversedBy: user.uid });
}

// Messages / notifications: addressed with tokens such as "role:teacher", "phone:0712345678", "uid:<id>"
function myTokens(r) {
  const t = ["role:" + r.profile.role, "uid:" + r.user.uid];
  if (r.profile.role === "parent" && r.profile.linkPhone) t.push("phone:" + r.profile.linkPhone);
  return t;
}
async function loadMessages(r) {
  const col = collection(db, "schools", r.schoolId, "messages");
  const parts = await Promise.all(myTokens(r).map(tok => getDocs(query(col, where("to", "array-contains", tok)))));
  const byId = {};
  parts.forEach(p => p.docs.forEach(d => { byId[d.id] = d.data(); }));
  return Object.values(byId).sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(-200);
}
async function sendMessage(schoolId, docId, m) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  await setDoc(doc(db, "schools", schoolId, "messages", docId), {
    id: m.id, to: m.to, title: m.title || "", text: m.text || "", icon: m.icon || "", date: m.date,
    act: m.act || "", actLabel: m.actLabel || "", ref: m.ref || "", key: m.key || "", from: user.uid
  });
}

// Payments reported by parents ("I have paid") for the accountant to check
async function loadPayNotes(r) {
  const col = collection(db, "schools", r.schoolId, "paynotes");
  const role = r.profile.role;
  let docs = [];
  if (role === "admin" || role === "accountant") docs = (await getDocs(col)).docs;
  else if (role === "parent") {
    const parts = await Promise.all((r.profile.children || []).map(id => getDocs(query(col, where("studentId", "==", id)))));
    docs = parts.flatMap(p => p.docs);
  }
  return docs.map(d => d.data());
}
async function savePayNote(schoolId, note) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  const sid = String(note.adm).trim().toUpperCase().replaceAll("/", "_");
  await setDoc(doc(db, "schools", schoolId, "paynotes", note.id), { ...note, studentId: sid, updatedBy: user.uid });
}

// Promotions: one document per learner per year -> { studentId, adm, name, cls (from), to, action, year, date }
async function loadPromotions(r) {
  const col = collection(db, "schools", r.schoolId, "promotions");
  const role = r.profile.role;
  let docs = [];
  if (role === "admin" || role === "accountant") {
    docs = (await getDocs(col)).docs;
  } else if (role === "teacher") {
    const qs = [];
    (r.profile.classes || []).forEach(c => { qs.push(getDocs(query(col, where("cls", "==", c)))); qs.push(getDocs(query(col, where("to", "==", c)))); });
    docs = (await Promise.all(qs)).flatMap(p => p.docs);
  } else if (role === "parent") {
    const parts = await Promise.all((r.profile.children || []).map(id => getDocs(query(col, where("studentId", "==", id)))));
    docs = parts.flatMap(p => p.docs);
  }
  const byId = {};
  docs.forEach(d => { byId[d.id] = d.data(); });
  return Object.values(byId);
}

// Saves the promotion log and moves the learners to their new class / status in one atomic batch.
async function savePromotions(schoolId, entries, updates) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  const ops = [];
  entries.forEach(e => ops.push(b => b.set(doc(db, "schools", schoolId, "promotions", e.studentId + "_" + e.year), {
    studentId: e.studentId, adm: String(e.adm).toUpperCase(), name: e.name || "", cls: e.from, to: e.to, action: e.action,
    year: e.year, date: e.date, by: user.uid
  })));
  updates.forEach(u => ops.push(b => b.update(doc(db, "schools", schoolId, "students", u.id), { cls: u.cls, status: u.status })));
  for (let i = 0; i < ops.length; i += 400) {
    const batch = writeBatch(db);
    ops.slice(i, i + 400).forEach(op => op(batch));
    await batch.commit();
  }
}

window.KlasoraFirebase = { signIn, restore, changePassword, loadPromotions, savePromotions, loadMessages, sendMessage, loadPayNotes, savePayNote, loadPayments, savePayment, reversePayment, loadResults, saveResults, loadMeta, saveMeta, loadAttendance, saveAttendance, createUserAccount, setUserDisabled, linkChildren, listSchoolUsers, loadStudents, saveStudents, loadSchoolStudents, createSchoolStudent, signOut: () => signOut(auth) };
