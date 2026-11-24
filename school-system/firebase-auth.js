import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, updatePassword, signOut } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

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
const db = getFirestore(app);

async function signInSchoolAdmin({ email, password, schoolCode, schoolName, adminName }) {
  const credential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  try {
    const q = query(collection(db, "schools"), where("adminUid", "==", credential.user.uid));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error("This Firebase account is not linked to a registered Klasora school.");
    if (snap.size !== 1) throw new Error("This administrator account is linked to more than one school. Contact Klasora support.");
    const schoolDoc = snap.docs[0];
    const school = schoolDoc.data();
    const norm = value => String(value || "").trim().toLowerCase();
    if (norm(school.code) !== norm(schoolCode).toUpperCase().toLowerCase()) throw new Error("The school code does not match this administrator account.");
    if (norm(school.name) !== norm(schoolName)) throw new Error("The school name does not match this school code.");
    if (norm(school.adminName) !== norm(adminName)) throw new Error("The administrator name does not match the registered school administrator.");
    if (norm(school.adminEmail) !== norm(email)) throw new Error("The email does not match the registered school administrator.");
    if (String(school.status || "Active").toLowerCase() !== "active") throw new Error("This school account is not active. Please contact Klasora support.");
    return { user: credential.user, school, schoolId: schoolDoc.id };
  } catch (error) {
    await signOut(auth);
    throw error;
  }
}

async function completeFirstLoginPassword(newPassword, schoolId) {
  const user = auth.currentUser;
  if (!user) throw new Error("Your session has expired. Sign in again.");
  if (newPassword.length < 8) throw new Error("Use at least 8 characters for your new password.");
  await updatePassword(user, newPassword);
  await updateDoc(doc(db, "schools", schoolId), {
    mustChangePassword: false,
    activated: true,
    lastLoginAt: serverTimestamp()
  });
}

async function loadSchoolStudents(schoolId) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Sign in to a school before loading student records.");
  const snap = await getDocs(collection(db, "schools", schoolId, "students"));
  return snap.docs.map(item => ({ id: item.id, ...item.data() }));
}

async function createSchoolStudent(schoolId, student) {
  const user = auth.currentUser;
  if (!user || !schoolId) throw new Error("Your school session has expired. Sign in again.");
  if (!student || !student.adm || !student.name) throw new Error("Student admission details are incomplete.");
  // UPI values may contain '/', which Firestore does not allow in document IDs.
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

window.KlasoraFirebase = {
  signInSchoolAdmin,
  loadSchoolStudents,
  createSchoolStudent,
  completeFirstLoginPassword,
  signOut: () => signOut(auth)
};
        
