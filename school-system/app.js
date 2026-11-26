// Klasora branded opening screen
document.addEventListener('DOMContentLoaded', function(){var splash=document.getElementById('klasoraSplash');if(splash)window.setTimeout(function(){splash.classList.add('is-hidden');window.setTimeout(function(){splash.remove();},250);},400);});
const modules = {
 students:{title:'Student Management',subtitle:'Manage admissions, learner profiles and student records.',stats:[['Total Students','428'],['New Admissions','28'],['Active Students','416']],heads:['STUDENT','UPI NO.','CLASS','GENDER','STATUS'],rows:[['Angela Otieno','GFA-2026-0428','Grade 4','Female','Active'],['Michael Kariuki','GFA-2026-0427','Grade 2','Male','Active'],['Winnie Njeri','GFA-2026-0426','PP2','Female','Pending'],['Brian Kamau','GFA-2026-0425','Grade 6','Male','Active'],['Faith Wanjiku','GFA-2026-0424','Grade 1','Female','Active'],['Joy Achieng','GFA-2025-0311','Grade 4','Female','Active'],['Kevin Mutua','GFA-2025-0298','Grade 4','Male','Active'],['Ian Barasa','GFA-2024-0187','Grade 4','Male','Active']]},
 teachers:{title:'Teachers & Staff',subtitle:'Manage teaching and non-teaching staff information.',stats:[['Total Staff','32'],['Teaching Staff','26'],['Support Staff','6']],heads:['STAFF MEMBER','EMPLOYEE ID','ROLE','PHONE','STATUS'],rows:[['Mary Wambui','EMP-001','Headteacher','07XX XXX 101','Active'],['Peter Otieno','EMP-002','Class Teacher','07XX XXX 102','Active'],['Grace Njeri','EMP-003','Mathematics','07XX XXX 103','Active'],['David Kamau','EMP-004','Accountant','07XX XXX 104','Active']]},
 classes:{title:'Teachers & Subjects',subtitle:'The class teacher of each class, then the other teachers who teach it and their subjects.',stats:[['Classes','0'],['Teachers','0'],['Class Teachers','0']],heads:['CLASS / STREAM','CLASS TEACHER','LEARNERS','TEACHERS','STATUS'],rows:[]},
 attendance:{title:'Attendance Management',subtitle:'Record and monitor daily learner and staff attendance.',stats:[['Present Today','405'],['Absent Today','18'],['Late Arrivals','5']],heads:['DATE','CLASS','PRESENT','ABSENT','ATTENDANCE'],rows:[['18 Nov 2026','Grade 1','31','1','96.9%'],['18 Nov 2026','Grade 2','29','3','90.6%'],['18 Nov 2026','Grade 3','32','2','94.1%'],['18 Nov 2026','Grade 4','34','1','97.1%']]},
 exams:{title:'Examinations & Assessments',subtitle:'Manage assessments, learner progress and report cards.',stats:[['Assessments','12'],['Results Entered','86%'],['Pending Review','18']],heads:['ASSESSMENT','CLASS','TERM','SUBJECT','STATUS'],rows:[['End Term Assessment','Grade 4','Term 3','Mathematics','In Progress'],['CBC Assessment','Grade 2','Term 3','English','Completed'],['Mid Term Assessment','Grade 6','Term 3','Science','Completed']]},
 fees:{title:'Fees & Payments',subtitle:'Track school fees, payments, balances and receipts.',stats:[['Billed This Term','KSh 2.4M'],['Collected','KSh 1.24M'],['Outstanding','KSh 1.16M']],heads:['STUDENT','INVOICE NO.','AMOUNT','PAID','BALANCE'],rows:[['Angela Otieno','INV-2026-0428','KSh 18,000','KSh 18,000','KSh 0'],['Michael Kariuki','INV-2026-0427','KSh 15,000','KSh 10,000','KSh 5,000'],['Winnie Njeri','INV-2026-0426','KSh 12,000','KSh 6,000','KSh 6,000']]},
 expenses:{title:'Expenses & Accounting',subtitle:'Record expenditure and review school financial activity.',stats:[['Total Expenses','KSh 380K'],['Awaiting Approval','4'],['This Month','KSh 92K']],heads:['DATE','DESCRIPTION','CATEGORY','AMOUNT','STATUS'],rows:[['17 Nov 2026','Learning materials','Academic','KSh 24,000','Approved'],['15 Nov 2026','Water & utilities','Utilities','KSh 12,500','Approved'],['12 Nov 2026','Transport fuel','Transport','KSh 18,000','Pending']]},
 library:{title:'Library Management',subtitle:'Manage books, borrowing, returns and library members.',stats:[['Books','1,240'],['Books Issued','86'],['Overdue','7']],heads:['BOOK TITLE','BOOK CODE','CATEGORY','AVAILABLE','STATUS'],rows:[['The River and the Source','LIB-001','Fiction','4','Available'],['Primary Science 4','LIB-002','Textbook','12','Available'],['English Activities 3','LIB-003','Textbook','0','Issued']]},
 transport:{title:'Transport Management',subtitle:'Manage school vehicles, routes and learner transport.',stats:[['Vehicles','6'],['Active Routes','8'],['Learners Assigned','164']],heads:['VEHICLE','REGISTRATION','ROUTE','DRIVER','STATUS'],rows:[['School Bus 01','KDA 123A','Route A','John Maina','Active'],['School Van 02','KDB 456B','Route B','Peter Kibet','Active'],['School Bus 03','KDC 789C','Route C','James Otieno','Service']]},
 inventory:{title:'Inventory & Assets',subtitle:'Track school property, supplies and stock levels.',stats:[['Asset Items','342'],['Low Stock','8'],['Pending Requests','5']],heads:['ITEM','ASSET CODE','CATEGORY','QUANTITY','CONDITION'],rows:[['Student Desks','AST-001','Furniture','120','Good'],['Laptops','AST-002','ICT','18','Good'],['Exercise Books','STK-003','Stationery','45','Low Stock']]},
 communication:{title:'Communication & Calendar',subtitle:'Share announcements and organise school events.',stats:[['Announcements','18'],['Upcoming Events','3'],['Messages','24']],heads:['TITLE','AUDIENCE','DATE','CREATED BY','STATUS'],rows:[['End of Term Exams','All Parents','20 Nov 2026','Administrator','Published'],['Parents Meeting','Grade 1–6','25 Nov 2026','Headteacher','Scheduled'],['Closing Day','All School','02 Dec 2026','Administrator','Scheduled']]},
 reports:{title:'Reports & Analytics',subtitle:'Review school performance and export management reports.',stats:[['Available Reports','16'],['Generated This Month','42'],['Scheduled','3']],heads:['REPORT','CATEGORY','LAST GENERATED','FORMAT','ACTION'],rows:[['Student Enrolment','Students','18 Nov 2026','PDF','View'],['Fee Collection','Finance','17 Nov 2026','PDF','View'],['Attendance Summary','Attendance','18 Nov 2026','PDF','View']]},
 settings:{title:'School Settings',subtitle:'Configure school profile, academic year and system preferences.',stats:[['School Profile','Complete'],['Academic Year','2026'],['User Roles','5']],heads:['SETTING','CURRENT VALUE','DESCRIPTION','ACTION'],rows:[['School Name','Greenfield Academy','School profile','Edit'],['Academic Year','2026','Current academic year','Edit'],['Currency','KES (KSh)','Financial currency','Edit']]}
};

/* ================= EduTrack 360 v1.2: Login & Roles =================
   NOTE: This is a front-end prototype. Accounts and passwords live in this file,
   so this is NOT real security. Real login needs a server (see README). */
const SESSION_KEY='edutrack_session',LOCK_KEY='edutrack_lock',MAX_FAILS=5,LOCK_SECONDS=30,IDLE_MINUTES=15;
const mem={};
const store={get(k){try{return localStorage.getItem(k)}catch(e){return mem[k]??null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(e){mem[k]=v;return false}},del(k){try{localStorage.removeItem(k)}catch(e){delete mem[k]}}};

const ROLES={
 admin:{label:'Administrator',pages:'*',add:'*',export:true,summary:'Full access to every module and user accounts',
  dash:{title:'Dashboard Overview',sub:"Here's what's happening at your school today."}},
 teacher:{label:'Teacher',pages:['dashboard','students','classes','attendance','exams','library','communication'],add:['attendance','exams'],export:false,summary:'Own class only. Can record attendance and assessments',
  dash:{title:'My Dashboard',sub:'Your class and learners at a glance.'}},
 accountant:{label:'Accountant',pages:['dashboard','students','fees','expenses','reports','communication'],add:['fees','expenses'],export:true,summary:'Finance modules and reports. Students are read-only',
  dash:{title:'Finance Dashboard',sub:'Fees, payments and expenses at a glance.'}},
 parent:{label:'Parent / Guardian',pages:['dashboard','attendance','exams','fees','communication'],add:[],export:false,summary:'View own child only. Cannot edit anything',
  dash:{title:'Parent Portal',sub:"Follow your child's attendance, results and fees."}}
};
const ACCOUNTS_KEY='klasora_staff_accounts';
const USERS=[];   // real accounts now come from Firebase Authentication
modules.users={title:'Users & Roles',subtitle:'Manage who can sign in and what each role can access.',
 stats:[['User Accounts',String(USERS.length)],['Roles','4'],['Signed In Now','1']],
 heads:['USER','USERNAME','ROLE','ACCESS','STATUS'],
 rows:USERS.map(u=>[u.name,u.username,ROLES[u.role].label,ROLES[u.role].summary,u.status])};

/* Role-specific views of the data */

/* ---------- Extra sample records (so pagination works) ---------- */
modules.students.stats[1][1]='32';
modules.students.rows.push(
 ['Mercy Wairimu','GFA-2024-0150','Grade 5','Female','Active'],['Samuel Kiptoo','GFA-2023-0092','Grade 6','Male','Active'],
 ['Lilian Akinyi','GFA-2026-0423','PP1','Female','Pending'],['Dennis Omondi','GFA-2022-0041','Grade 7','Male','Active'],
 ['Esther Naliaka','GFA-2026-0422','Grade 3','Female','Active'],['Tom Mwangi','GFA-2026-0421','Grade 2','Male','Active'],
 ['Naomi Chepkoech','GFA-2025-0276','Grade 5','Female','Active'],['Victor Ochieng','GFA-2025-0254','Grade 3','Male','Active'],
 ['Sharon Wangari','GFA-2024-0203','Grade 7','Female','Active'],['Collins Rotich','GFA-2024-0176','Grade 2','Male','Active'],
 ['Zawadi Hassan','GFA-2023-0121','Grade 6','Female','Active'],['Felix Njoroge','GFA-2023-0105','Grade 1','Male','Active']);
modules.teachers.rows.push(
 ['Jane Achieng','EMP-005','Class Teacher','07XX XXX 105','Active'],['Ruth Chebet','EMP-006','Science','07XX XXX 106','Active'],
 ['Samuel Kimani','EMP-007','Social Studies','07XX XXX 107','Active'],['Lucy Muthoni','EMP-008','Class Teacher','07XX XXX 108','Active'],
 ['Hassan Abdi','EMP-009','Physical Education','07XX XXX 109','Active'],['Agnes Nyambura','EMP-010','Librarian','07XX XXX 110','Active'],
 ['Moses Odhiambo','EMP-011','Class Teacher','07XX XXX 111','Active'],['Faith Cherono','EMP-012','Creative Arts','07XX XXX 112','On Leave'],
 ['Daniel Wekesa','EMP-013','Kiswahili','07XX XXX 113','Active'],['Beatrice Achola','EMP-014','English','07XX XXX 114','Active'],
 ['Joseph Mutiso','EMP-015','Class Teacher','07XX XXX 115','Active'],['Mercy Atieno','EMP-016','Class Teacher','07XX XXX 116','Active']);
modules.classes.rows.push(
 ['PP1 West','Lucy Muthoni','26','Room 04','Active'],['PP2 East','Moses Odhiambo','27','Room 05','Active'],
 ['Grade 2 West','Beatrice Achola','32','Room 06','Active'],['Grade 3 North','Daniel Wekesa','34','Room 07','Active'],
 ['Grade 5 East','Ruth Chebet','33','Room 09','Active'],['Grade 5 West','Samuel Kimani','31','Room 10','Active'],
 ['Grade 6 East','Hassan Abdi','34','Room 11','Active'],['Grade 6 West','Faith Cherono','30','Room 12','Active'],
 ['Grade 7 North','Joseph Mutiso','29','Room 13','Active'],['Grade 7 South','Mercy Atieno','28','Room 14','Active']);
modules.attendance.rows.push(
 ['18 Nov 2026','Grade 5','31','2','93.9%'],['18 Nov 2026','Grade 6','32','2','94.1%'],['18 Nov 2026','Grade 7','27','2','93.1%'],
 ['18 Nov 2026','PP1','23','3','88.5%'],['18 Nov 2026','PP2','26','2','92.9%'],
 ['17 Nov 2026','Grade 1','31','1','96.9%'],['17 Nov 2026','Grade 2','30','2','93.8%'],['17 Nov 2026','Grade 3','31','3','91.2%'],['17 Nov 2026','Grade 4','33','2','94.3%']);
modules.exams.rows.push(
 ['End Term Assessment','Grade 4','Term 3','English','In Progress'],['End Term Assessment','Grade 5','Term 3','Mathematics','In Progress'],
 ['End Term Assessment','Grade 3','Term 3','Kiswahili','In Progress'],['Mid Term Assessment','Grade 4','Term 3','Science','Completed'],
 ['CBC Assessment','Grade 1','Term 3','Mathematics','Completed'],['CBC Assessment','Grade 3','Term 3','English','Completed'],
 ['Mid Term Assessment','Grade 5','Term 3','Social Studies','Completed'],['End Term Assessment','Grade 6','Term 3','English','Scheduled'],
 ['End Term Assessment','Grade 7','Term 3','Integrated Science','Scheduled']);
modules.fees.rows.push(
 ['Brian Kamau','INV-2026-0425','KSh 18,000','KSh 12,000','KSh 6,000'],['Faith Wanjiku','INV-2026-0424','KSh 15,000','KSh 15,000','KSh 0'],
 ['Joy Achieng','INV-2025-0311','KSh 18,000','KSh 18,000','KSh 0'],['Kevin Mutua','INV-2025-0298','KSh 18,000','KSh 9,000','KSh 9,000'],
 ['Ian Barasa','INV-2024-0187','KSh 18,000','KSh 18,000','KSh 0'],['Mercy Wairimu','INV-2024-0150','KSh 20,000','KSh 14,000','KSh 6,000'],
 ['Samuel Kiptoo','INV-2023-0092','KSh 20,000','KSh 20,000','KSh 0'],['Lilian Akinyi','INV-2026-0423','KSh 12,000','KSh 0','KSh 12,000'],
 ['Dennis Omondi','INV-2022-0041','KSh 22,000','KSh 11,000','KSh 11,000'],['Esther Naliaka','INV-2026-0422','KSh 15,000','KSh 15,000','KSh 0'],
 ['Tom Mwangi','INV-2026-0421','KSh 15,000','KSh 7,500','KSh 7,500']);
modules.expenses.rows.push(
 ['16 Nov 2026','Classroom repairs','Maintenance','KSh 22,000','Pending'],['14 Nov 2026','Stationery & printing','Academic','KSh 14,000','Approved'],
 ['13 Nov 2026','Electricity bill','Utilities','KSh 18,500','Approved'],['11 Nov 2026','Sports equipment','Academic','KSh 16,000','Pending'],
 ['10 Nov 2026','Bus maintenance','Transport','KSh 28,000','Approved'],['08 Nov 2026','Office supplies','Administration','KSh 9,500','Pending'],
 ['06 Nov 2026','Security services','Administration','KSh 25,000','Approved'],['05 Nov 2026','Science lab chemicals','Academic','KSh 11,000','Approved'],
 ['03 Nov 2026','Gardening & cleaning','Maintenance','KSh 7,500','Approved']);
modules.library.rows.push(
 ['Kiswahili Kwa Darasa 4','LIB-004','Textbook','10','Available'],['Mathematics Activities 5','LIB-005','Textbook','8','Available'],
 ['Social Studies 6','LIB-006','Textbook','0','Issued'],['Atlas of Kenya','LIB-007','Reference','3','Available'],
 ['Tales from the Savanna','LIB-008','Storybook','6','Available'],['Our Environment 2','LIB-009','Textbook','14','Available'],
 ['Primary Dictionary','LIB-010','Reference','5','Available'],['Creative Arts 3','LIB-011','Textbook','0','Overdue'],
 ['Integrated Science 7','LIB-012','Textbook','9','Available']);
modules.transport.rows.push(
 ['School Van 04','KDD 321D','Route D','Samuel Njuguna','Active'],['School Bus 05','KDE 654E','Route E','Hassan Ali','Active'],
 ['School Van 06','KDF 987F','Route F','Tom Kipkorir','Active']);
modules.inventory.rows.push(
 ['Whiteboards','AST-004','Furniture','24','Good'],['Projectors','AST-005','ICT','4','Fair'],['Footballs','STK-006','Sports','6','Low Stock'],
 ['Science Lab Kits','AST-007','Laboratory','10','Good'],['Chalk Boxes','STK-008','Stationery','8','Low Stock'],
 ['Teachers Tables','AST-009','Furniture','32','Good'],['First Aid Kits','STK-010','Health','3','Low Stock'],
 ['Library Shelves','AST-011','Furniture','18','Good'],['Printer Toner','STK-012','ICT','2','Low Stock'],
 ['Marker Pens','STK-013','Stationery','12','Low Stock'],['Cleaning Supplies','STK-014','Cleaning','7','Low Stock'],['Light Bulbs','STK-015','Maintenance','9','Low Stock']);
modules.communication.rows.push(
 ['Staff Meeting','Teaching Staff','19 Nov 2026','Headteacher','Scheduled'],['Fee Reminder Term 3','Parents with balances','21 Nov 2026','Accountant','Published'],
 ['Sports Day Notice','All Parents','22 Nov 2026','Administrator','Draft'],['Transport Route Changes','Transport users','23 Nov 2026','Administrator','Published'],
 ['Report Cards Release','All Parents','02 Dec 2026','Headteacher','Scheduled'],['Library Book Return','Grade 1–6','24 Nov 2026','Librarian','Published'],
 ['Staff Appreciation Lunch','All Staff','01 Dec 2026','Administrator','Draft'],['Term 1 2027 Opening','All Parents','05 Jan 2027','Administrator','Scheduled']);
modules.reports.rows.push(
 ['Staff Directory','Staff','16 Nov 2026','Excel','View'],['Examination Results','Academic','15 Nov 2026','PDF','View'],
 ['Expense Summary','Finance','15 Nov 2026','Excel','View'],['Transport Usage','Operations','14 Nov 2026','PDF','View'],
 ['Library Circulation','Operations','12 Nov 2026','PDF','View'],['Inventory Valuation','Operations','10 Nov 2026','Excel','View'],
 ['Fee Defaulters','Finance','18 Nov 2026','PDF','View'],['Term Performance Trend','Academic','08 Nov 2026','PDF','View']);
const TEACHER_SCOPE={students:[2,'Grade 4'],attendance:[1,'Grade 4'],exams:[1,'Grade 4'],classes:[0,'Grade 4 North']}; // [column, text to match]
const TEACHER_STATS={
 students:[['My Learners','35'],['Present Today','34'],['Absent Today','1']],
 attendance:[['Present Today','34'],['Absent Today','1'],['Late Arrivals','0']],
 exams:[['My Assessments','3'],['Results Entered','72%'],['Pending Marking','4']],
 classes:[['My Class','Grade 4 North'],['Learners','35'],['Room','Room 08']]};
const PARENT_DATA={
 attendance:{subtitle:"Michael's daily attendance this week.",stats:[['Present','3'],['Late','1'],['Absent','1']],heads:['DATE','DAY','STATUS','ARRIVAL','NOTE'],
  rows:[['18 Nov 2026','Wed','Present','7:48 AM','-'],['17 Nov 2026','Tue','Present','7:52 AM','-'],['16 Nov 2026','Mon','Absent','-','Sick (note received)'],['13 Nov 2026','Fri','Present','7:45 AM','-'],['12 Nov 2026','Thu','Late','8:12 AM','Bus delay']]},
 exams:{subtitle:"Michael's Term 3 assessment results.",stats:[['Assessments','3'],['Average','76%'],['Overall Level','ME']],heads:['ASSESSMENT','SUBJECT','TERM','SCORE','LEVEL'],
  rows:[['CBC Assessment','English','Term 3','78%','Meeting Expectations'],['Mid Term Assessment','Mathematics','Term 3','85%','Exceeding Expectations'],['Mid Term Assessment','Science','Term 3','64%','Meeting Expectations']]},
 fees:{subtitle:"Michael's fee statement for Term 3.",stats:[['Billed This Term','KSh 15,000'],['Paid','KSh 10,000'],['Balance','KSh 5,000']],
  rows:[['Michael Kariuki','INV-2026-0427','KSh 15,000','KSh 10,000','KSh 5,000']]}
};
const DASH_STATS={
 teacher:()=>[['My Class','Grade 4 North','Room 08','blue','▤'],['Learners','35','class size','purple','♙'],['Present Today','34','1 absent','green','✓'],['Pending Marking','4','assessments','orange','▣']],
 accountant:()=>[['Fees Collected','KSh 1.24M','this term','green','KSh'],['Outstanding','KSh 1.16M','to be collected','orange','▤'],['Expenses Pending','4','awaiting approval','purple','↗'],['Invoices Issued','428','Term 3','blue','▤']],
 parent:u=>[['My Child',u.child,u.childClass,'blue','♙'],['Attendance','93%','this term','green','✓'],['Latest Result','ME','Meeting Expectations','purple','▣'],['Fee Balance','KSh 5,000','outstanding','orange','KSh']]
};
const PAGE_NAMES={dashboard:'Dashboard',students:'Students',teachers:'Teachers & Staff',classes:'Teachers & Subjects',attendance:'Attendance',exams:'Examinations',fees:'Fees & Payments',expenses:'Expenses',library:'Library',transport:'Transport',inventory:'Inventory',communication:'Communication',reports:'Reports & Analytics',users:'Users & Roles',settings:'Settings'};

let currentUser=null,lastActive=Date.now(),lastSaved=0;
const $=id=>document.getElementById(id);
const navItems=[...document.querySelectorAll('.nav-item')];

function canView(page){if(page==='classteachers'||page==='backup')return false;if(page==='selsubjects')return currentUser.role==='teacher'&&gradeOf(TEACHER_CLASS)==='Grade 9';const p=ROLES[currentUser.role].pages;return p==='*'||p.includes(page)}
function canAdd(page){if(page==='attendance')return false;const a=ROLES[currentUser.role].add;return a==='*'||a.includes(page)}

function getModule(page){
 const base=modules[page];if(!base)return null;
 const role=currentUser.role;let m={...base};
 if(role==='teacher'&&page==='classes')return teacherClassesView(m);
 if(role==='parent'&&['attendance','exams','fees'].includes(page))m={...base,...parentView(page,currentUser)};
 if(role!=='parent')m=dynamicView(page,m);
 if(role==='admin'&&page==='teachers')m=staffView(m);
 if(role==='teacher'&&TEACHER_SCOPE[page]!==undefined){
  const sc=TEACHER_SCOPE[page];m.rows=m.rows.filter(r=>tMatch(r[sc[0]],page));m.stats=teacherStats(page)||TEACHER_STATS[page]||base.stats;}
 if(page==='communication')m=annView(m,role);
 return m;
}

/* ---------- Login screen ---------- */
function showLoginMsg(text,type){const el=$('loginMsg');if(!text){el.classList.add('hidden');return}el.textContent=text;el.className='login-msg'+(type==='info'?' info':'');}
function getLock(){try{return JSON.parse(store.get(LOCK_KEY))||{fails:0,until:0}}catch(e){return{fails:0,until:0}}}
$('forgotPw').onclick=async()=>{
 const email=$('loginEmail').value.trim().toLowerCase();
 if(!/^\S+@\S+\.\S+$/.test(email)){showLoginMsg('Type your email above first, then tap Forgot password.');return}
 if(!window.KlasoraFirebase){showLoginMsg('Still connecting. Try again in a moment.');return}
 try{await KlasoraFirebase.resetPassword(email);showLoginMsg('If that email has an account, a reset link has been sent. Check your inbox and spam folder.','info');}
 catch(e){showLoginMsg(e.code==='auth/too-many-requests'?'Too many requests. Wait a few minutes and try again.':'No internet connection. Try again.');}
};
$('pwToggle').onclick=()=>{const p=$('loginPass'),show=p.type==='password';p.type=show?'text':'password';$('pwToggle').textContent=show?'Hide':'Show';};
/* ---------- Students: saved to the school's Firestore records ---------- */
async function saveStudentsRemote(list){
 if(!list.length||!currentUser)return;
 try{
  await KlasoraFirebase.saveStudents(currentUser.schoolId,list);
  // a new learner of an existing guardian becomes visible to that parent's account
  const byParent={};list.forEach(r=>{const p=USERS.find(u=>u.role==='parent'&&u.linkPhone&&u.linkPhone===r.phone);if(p)(byParent[p.uid]=byParent[p.uid]||{p,ids:[]}).ids.push(stuDocId(r.adm));});
  for(const k of Object.keys(byParent)){const {p,ids}=byParent[k];try{await KlasoraFirebase.linkChildren(p.uid,ids);p.children=[...new Set([...(p.children||[]),...ids])];}catch(_e){}}
 }
 catch(e){
  EXTRA=EXTRA.filter(x=>!list.includes(x));rebuildStudents();try{rerenderPage()}catch(_e){}
  toast(e.code==='permission-denied'?'You do not have permission to add students.':'Could not save to the school database. Check your internet and try again.');
 }
}
async function loadStudentsRemote(r){
 try{
  const list=await KlasoraFirebase.loadStudents(r);
  EXTRA=list.map(x=>({name:x.name,adm:x.adm,cls:x.cls,gender:x.gender,dob:x.dob||'',parent:x.parent||'',relation:x.relation||'Guardian',phone:x.phone||'',status:x.status||'Active',date:''}));
 }catch(e){EXTRA=[];setTimeout(()=>toast('Could not load student records ('+(e.code||'error')+').'),700);}
 rebuildStudents();
}

function fbUserToLocal(p,schoolId){
 const titles={admin:'School Administrator',teacher:'Teacher',accountant:'School Accountant',parent:'Parent / Guardian'};
 return{id:'fb_'+p.uid,uid:p.uid,username:p.email,email:p.email,name:p.name||p.email,initials:schoolInitials(p.name||p.email),role:p.role,title:p.title||titles[p.role]||'',status:p.disabled===true?'Deactivated':'Active',schoolId,classes:p.classes||[],children:p.children||[],className:(p.classes&&p.classes[0])||'',linkPhone:p.linkPhone||'',phone:p.linkPhone?fmtPhone(p.linkPhone):'',disabled:p.disabled===true,mustChange:p.mustChangePassword===true};
}
async function loadAttendanceRemote(r){
 REG={};REG_DIRTY.clear();
 try{(await KlasoraFirebase.loadAttendance(r)).forEach(x=>{const adm=x.adm;REG[x.month]=REG[x.month]||{};REG[x.month][adm]=x.marks||{};});}
 catch(e){setTimeout(()=>toast('Could not load attendance ('+(e.code||'error')+').'),1100);}
 refreshAttendanceRows();
}
async function loadResultsRemote(r){
 RES={marks:{},notes:{},gen:{}};SUBJ={added:{},removed:{}};STUSUBJ={};TS=[];RES_DIRTY.clear();
 try{
  (await KlasoraFirebase.loadResults(r)).forEach(x=>{
   const k=x.examKey,p=k.split('-');
   if(x.marks&&Object.keys(x.marks).length){RES.marks[k]=RES.marks[k]||{};RES.marks[k][x.adm]=x.marks;}
   if(x.note){const nk=p[0]+'-'+p[1];RES.notes[nk]=RES.notes[nk]||{};RES.notes[nk][x.adm]=x.note;}
   if(x.gen)RES.gen[k+'|'+x.cls]=x.gen;
  });
  if(r.profile.role!=='parent'){
   const m=await KlasoraFirebase.loadMeta(r.schoolId,r.profile.role==='admin'?['config','stusubj']:r.profile.role==='teacher'?['config','stusubj']:['config']);
   if(m.config){if(m.config.subj)SUBJ={added:m.config.subj.added||{},removed:m.config.subj.removed||{}};if(Array.isArray(m.config.ts))TS=m.config.ts;}
   if(m.stusubj&&typeof m.stusubj==='object')STUSUBJ=m.stusubj;
  }
 }catch(e){setTimeout(()=>toast('Could not load exam results ('+(e.code||'error')+').'),1300);}
}
async function savePaymentRemote(rec){
 try{await KlasoraFirebase.savePayment(currentUser.schoolId,rec);}
 catch(e){PAYLOG=PAYLOG.filter(p=>p.id!==rec.id);try{showPage('fees')}catch(_e){}toast(e.code==='permission-denied'?'You do not have permission to record payments.':'Payment NOT saved. Check your internet and record it again.');}
}
async function reversePaymentRemote(rec){
 try{await KlasoraFirebase.reversePayment(currentUser.schoolId,rec.id);}
 catch(e){PAYLOG.push(rec);try{showPage('fees')}catch(_e){}toast('Reversal NOT saved. Check your internet and try again.');}
}
async function loadFeesRemote(r){
 PAYLOG=[];FEESTR={};_fsCache={};
 try{
  PAYLOG=(await KlasoraFirebase.loadPayments(r)).filter(p=>!p.reversed).map(p=>({id:p.id,rcpt:p.rcpt,adm:p.adm,year:p.year,term:p.term,amount:p.amount,method:p.method,ref:p.ref||'',date:p.date,by:p.by||''}));
  if(['admin','accountant','parent'].includes(r.profile.role)){
   const m=await KlasoraFirebase.loadMeta(r.schoolId,['feestr']);
   if(m.feestr&&typeof m.feestr==='object'&&!Array.isArray(m.feestr))FEESTR=m.feestr;
  }
 }catch(e){setTimeout(()=>toast('Could not load fees ('+(e.code||'error')+').'),1500);}
}
const curR=()=>({schoolId:currentUser.schoolId,user:{uid:currentUser.uid},profile:{role:currentUser.role,classes:currentUser.classes,children:currentUser.children,linkPhone:currentUser.linkPhone}});
async function loadPromosRemote(r){
 PROMO={log:[],overrides:{},done:{}};
 try{
  (await KlasoraFirebase.loadPromotions(r)).sort((a,b)=>String(a.date).localeCompare(String(b.date))).forEach(x=>{
   PROMO.log.push({adm:x.adm,name:x.name,from:x.cls,to:x.to,action:x.action,year:x.year,date:x.date});
   if(x.action==='promote')PROMO.overrides[x.adm]={cls:x.to,status:'Active'};
   else if(x.action==='complete')PROMO.overrides[x.adm]={cls:x.cls,status:'Completed'};
   else if(x.action==='transfer')PROMO.overrides[x.adm]={cls:x.cls,status:'Transferred'};
   if(!PROMO.done[x.year+'|'+x.cls])PROMO.done[x.year+'|'+x.cls]=x.date;
  });
 }catch(e){setTimeout(()=>toast('Could not load promotions ('+(e.code||'error')+').'),1000);}
 rebuildStudents();
}
async function savePromoRemote(added){
 if(!added.length||!currentUser)return;
 const entries=added.map(l=>({...l,studentId:stuDocId(l.adm)}));
 const updates=added.filter(l=>l.action!=='repeat').map(l=>{const o=PROMO.overrides[l.adm]||{};return{id:stuDocId(l.adm),cls:o.cls||l.from,status:o.status||'Active'}});
 try{await KlasoraFirebase.savePromotions(currentUser.schoolId,entries,updates);}
 catch(e){
  toast(e.code==='permission-denied'?'You do not have permission to promote this class. Reloading your records.':'Promotion NOT saved. Check your internet. Reloading your records.');
  const r=curR();await loadStudentsRemote(r);await loadPromosRemote(r);try{rerenderPage()}catch(_e){}
 }
}
async function loadUsersRemote(r){
 USERS.length=0;
 if(r.profile.role!=='admin'){refreshUsersModule();return}
 try{(await KlasoraFirebase.listSchoolUsers(r.schoolId)).forEach(p=>{if(ROLES[p.role])USERS.push(fbUserToLocal(p,r.schoolId));});}
 catch(e){setTimeout(()=>toast('Could not load staff accounts ('+(e.code||'error')+').'),900);}
 refreshUsersModule();
}

/* ---------- Sign in (Firebase Authentication) ---------- */
function userFromFirebase(r){
 const p=r.profile,name=p.name||r.user.email;
 if(!ROLES[p.role])throw new Error('This account has no valid role. Contact your school administrator.');
 const titles={admin:'School Administrator',teacher:'Teacher',accountant:'School Accountant',parent:'Parent / Guardian'};
 return{id:'fb_'+r.user.uid,uid:r.user.uid,username:r.user.email,email:r.user.email,name,initials:schoolInitials(name),role:p.role,title:p.title||titles[p.role],status:'Active',
  schoolId:r.schoolId,schoolCode:r.school.code||r.schoolId,schoolName:r.school.name,poBox:r.school.poBox||'',
  classes:p.classes||[],children:p.children||[],className:(p.classes&&p.classes[0])||'',linkPhone:p.linkPhone||'',phone:p.linkPhone?fmtPhone(p.linkPhone):'',disabled:p.disabled===true,mustChange:p.mustChangePassword===true};
}
async function beginFirebaseSession(r,fresh){
 const u=userFromFirebase(r);
 await Promise.all([loadStudentsRemote(r),loadPromosRemote(r),loadUsersRemote(r),loadAttendanceRemote(r),loadResultsRemote(r),loadFeesRemote(r),loadCommRemote(r),loadOtherMetaRemote(r)]);rebuildStudents();
 store.set(SCHOOL_KEY,JSON.stringify({name:r.school.name,type:'School',motto:'',logo:'',phones:[],poBox:r.school.poBox||'',schoolCode:u.schoolCode}));applySchool();
 startSession(u,fresh);
}
$('loginForm').addEventListener('submit',async e=>{
 e.preventDefault();
 const lock=getLock(),now=Date.now();
 if(lock.until>now){showLoginMsg(`Too many failed attempts. Try again in ${Math.ceil((lock.until-now)/1000)} seconds.`);return}
 const email=$('loginEmail').value.trim().toLowerCase(),pass=$('loginPass').value,code=($('loginSchoolCode').value||'').trim().toUpperCase();
 if(!email||!pass){showLoginMsg('Enter your email and password.');return}
 if(!window.KlasoraFirebase){showLoginMsg('Still connecting. Check your internet and try again.');return}
 const btn=e.submitter;if(btn)btn.disabled=true;
 try{
  const r=await KlasoraFirebase.signIn(email,pass,code);
  if(r.profile.role!==loginRole){const an=LOGIN_ROLES[r.profile.role]?LOGIN_ROLES[r.profile.role].label:'different';try{await KlasoraFirebase.signOut()}catch(_e){}showLoginMsg(`This sign-in belongs to a ${an} account. Select “${an}” above and try again.`);$('loginPass').value='';return}
  store.del(LOCK_KEY);
  await beginFirebaseSession(r,true);
 }catch(err){
  const bad=['auth/invalid-credential','auth/wrong-password','auth/user-not-found','auth/invalid-email'].includes(err.code);
  if(bad){
   lock.fails=(lock.fails||0)+1;
   if(lock.fails>=MAX_FAILS){lock.until=now+LOCK_SECONDS*1000;lock.fails=0;store.set(LOCK_KEY,JSON.stringify(lock));showLoginMsg(`Too many failed attempts. Sign-in is locked for ${LOCK_SECONDS} seconds.`);}
   else{store.set(LOCK_KEY,JSON.stringify(lock));showLoginMsg(`Incorrect email or password. ${MAX_FAILS-lock.fails} attempt${MAX_FAILS-lock.fails===1?'':'s'} left.`);}
  }else if(err.code==='auth/network-request-failed')showLoginMsg('No internet connection. Try again.');
  else if(err.code==='auth/too-many-requests')showLoginMsg('Too many attempts. Wait a few minutes and try again.');
  else showLoginMsg(err.message||'Sign-in failed.');
  $('loginPass').value='';
 }finally{if(btn)btn.disabled=false}
});

/* ---------- Session ---------- */
function startSession(u,fresh){
 currentUser=u;lastActive=Date.now();lastSaved=0;saveSession();
 if(u.role==='teacher'){TEACHER_CLASS=normKey(u.className||'Grade 4');subjGrade=gradeOf(TEACHER_CLASS);regClass=TEACHER_CLASS;exView='list';}
 showLoginMsg('');$('loginEmail').value='';$('loginPass').value='';$('loginSchoolCode').value='';$('loginPass').type='password';$('pwToggle').textContent='Show';
 $('loginScreen').classList.add('hidden');$('appShell').classList.remove('hidden');
 applyRole();showPage('dashboard');
 if(fresh)toast(`Signed in as ${u.name} (${ROLES[u.role].label})`);
 if(u.mustChange)openPwModal(true);
}
function saveSession(){lastSaved=Date.now();store.set(SESSION_KEY,JSON.stringify({id:currentUser.id,ts:lastSaved}));}
function signOut(message){
 currentUser=null;store.del(SESSION_KEY);try{if(window.KlasoraFirebase)KlasoraFirebase.signOut()}catch(e){}EXTRA=[];rebuildStudents();USERS.length=0;CT_DIR={};IMPORTS={teachers:[],fees:[],expenses:[],library:[],inventory:[]};HIDE={};try{applyImports()}catch(e){}PROMO={log:[],overrides:{},done:{}};INBOX=[];PAYNOTES=[];ANN=[];STAFF=[];PAYLOG=[];FEESTR={};_fsCache={};REG={};REG_DIRTY.clear();RES={marks:{},notes:{},gen:{}};SUBJ={added:{},removed:{}};STUSUBJ={};TS=[];RES_DIRTY.clear();try{store.del(SCHOOL_KEY);applySchool()}catch(e){}
 closeSidebar();closeModal();closeProfile();closeStudentForm();closeAcademic();closePw();closePd();$('supportBackdrop').classList.add('hidden');$('detailBackdrop').classList.add('hidden');$('userMenu').classList.add('hidden');
 $('appShell').classList.add('hidden');$('loginScreen').classList.remove('hidden');
 showLoginMsg(message||'You have been signed out.','info');window.scrollTo(0,0);
}
async function restoreSession(){
 // Stay signed in until the person taps Sign out. The login screen stays hidden while the saved session is checked, so it never flashes.
 const had=!!store.get(SESSION_KEY);
 if(had)$('loginScreen').classList.add('restoring');
 try{
  let tries=0;while(!window.KlasoraFirebase&&tries++<50)await new Promise(r=>setTimeout(r,100));
  if(!window.KlasoraFirebase)return;
  const r=await KlasoraFirebase.restore();
  if(!r)return;
  await beginFirebaseSession(r,false);lastActive=Date.now();
 }catch(e){}
 finally{$('loginScreen').classList.remove('restoring');}
}
function touch(){if(!currentUser)return;lastActive=Date.now();if(lastActive-lastSaved>10000)saveSession();}
['click','keydown','touchstart','scroll'].forEach(ev=>document.addEventListener(ev,touch,{passive:true}));
setInterval(()=>{if(currentUser&&currentUser.status!=='Active'){signOut('Your account is no longer active. Please contact the school administrator.');return}},15000);
$('signOutBtn').onclick=()=>signOut('You have been signed out.');
$('topUser').onclick=e=>{e.stopPropagation();$('userMenu').classList.toggle('hidden');};
document.addEventListener('click',e=>{const um=$('userMenu');if(!um.contains(e.target))um.classList.add('hidden');if(e.target.id==='menuSignOut')signOut('You have been signed out.');if(e.target.id==='menuProfile'){um.classList.add('hidden');openProfile();}});

/* ---------- Apply role to the interface ---------- */
function applyRole(){
 const u=currentUser,r=ROLES[u.role];
 navItems.forEach(n=>n.classList.toggle('hidden',!canView(n.dataset.page)));
 document.querySelectorAll('.nav .nav-label').forEach(l=>{let el=l.nextElementSibling,any=false;while(el&&!el.classList.contains('nav-label')){if(el.classList.contains('nav-item')&&!el.classList.contains('hidden'))any=true;el=el.nextElementSibling;}l.classList.toggle('hidden',!any);});
 const sc=document.querySelector('[data-page="students"] .nav-count');if(sc)sc.textContent=u.role==='teacher'?String(classStudents(TEACHER_CLASS).length):String(stuNums().total);
 document.querySelectorAll('#sidebar .user-avatar,.top-user .user-avatar').forEach(a=>paintAvatar(a,u));
 document.querySelector('.user-mini strong').textContent=u.name;document.querySelector('.top-user strong').textContent=welcomeName(u);
 document.querySelector('.user-mini small').textContent=u.title;updateBell();
  $('userMenu').innerHTML=`<strong>${escH(u.name)}</strong><small><span class="role-pill">${r.label}</span><br><span style="display:inline-block;margin-top:6px">@${u.username}</span></small><button class="btn btn-primary" id="menuProfile">My Profile</button><button class="btn btn-light" id="menuSignOut" style="margin-top:8px">Sign out</button>`;
}

/* ---------- Role dashboard (non-admin) ---------- */
function renderRoleDashboard(){
 const u=currentUser,r=ROLES[u.role],stats=DASH_STATS[u.role](u);
 const cards=stats.map(s=>`<article class="stat-card tone-${s[3]}"><div class="stat-top"><span>${s[0]}</span><span class="stat-icon ${s[3]}">${s[4]}</span></div><div class="stat-number" ${s[1].length>9?'style="font-size:21px;line-height:1.5"':''}>${s[1]}</div><div class="stat-foot"><span>${s[2]}</span></div></article>`).join('');
 const links=(r.pages==='*'?[]:r.pages).filter(p=>p!=='dashboard').map(p=>`<button class="btn btn-light" data-go="${p}">${PAGE_NAMES[p]} →</button>`).join('');
 const addList=r.add.length?r.add.map(p=>PAGE_NAMES[p]).join(', '):'None (view only)';
 const viewList=r.pages.filter(p=>p!=='dashboard').map(p=>PAGE_NAMES[p]).join(', ');
 $('roleDashboardPage').innerHTML=`${promoBannerHtml(u)}<div class="stats-grid">${cards}</div>${u.role==='parent'?childCardsHtml(u)+parentFeeCardsHtml(u):''}${u.role==='accountant'?feeStructureHtml({edit:true}):''}
 <div class="dashboard-grid lower-grid">
  <article class="panel"><div class="panel-heading"><div><h3>Quick Access</h3><p>Sections available to you</p></div></div><div class="quick-grid">${links}</div></article>
  <article class="panel"><div class="panel-heading"><div><h3>Your Access</h3><p>What this role can do</p></div><span class="role-pill">${r.label}</span></div>
   <div class="access-row"><span>Signed in as</span><span>${escH(u.name)}</span></div>
   <div class="access-row"><span>Can view</span><span>${viewList}</span></div>
   <div class="access-row"><span>Can add / edit</span><span>${addList}</span></div>
   <div class="access-row"><span>Export reports</span><span>${r.export?'Yes':'No'}</span></div>
  </article></div>`;
}

/* ---------- Pages ---------- */
function showPage(page){
 if(!currentUser)return;
 helpCardText();
 if(page==='classes')refreshClassRows();
 if(page==='communication')refreshAnnRows();
 if(!modules[page]&&page!=='dashboard')page='dashboard';
 if(!canView(page)){toast('You do not have access to that section.');page='dashboard';}
 const isDash=page==='dashboard',isAdmin=currentUser.role==='admin',r=ROLES[currentUser.role];
 $('dashboardPage').classList.toggle('hidden',!(isDash&&isAdmin));
 $('roleDashboardPage').classList.toggle('hidden',!(isDash&&!isAdmin));
 const customExams=page==='exams'&&(currentUser.role==='teacher'||currentUser.role==='parent');
 $('genericPage').classList.toggle('hidden',isDash||page==='settings'||page==='backup'||page==='register'||page==='subjects'||page==='classteachers'||customExams);
 $('examsPage').classList.toggle('hidden',!customExams);
 $('subjectsPage').classList.toggle('hidden',page!=='subjects');
 $('classTeachersPage').classList.toggle('hidden',page!=='classteachers');
 $('registerPage').classList.toggle('hidden',page!=='register');
 $('settingsPage').classList.toggle('hidden',page!=='settings');
 $('backupPage').classList.toggle('hidden',page!=='backup');
 navItems.forEach(n=>n.classList.toggle('active',n.dataset.page===page));
 if(isDash&&!isAdmin)renderRoleDashboard();
 const m=isDash?null:getModule(page);
 const title=isDash?r.dash.title:m.title;
 $('pageTitle').textContent=title;$('crumb').textContent=isDash?'Dashboard':m.title;
 $('pageSubtitle').textContent=isDash?r.dash.sub:m.subtitle;
 if(!isDash){
  $('moduleTitle').textContent=m.title+' Records';$('moduleDescription').textContent=m.subtitle;
  renderModuleStats(page,m);
  $('moduleHead').innerHTML='<tr>'+m.heads.map(h=>`<th>${h}</th>`).join('')+'</tr>';
  tableHeads=m.heads;renderTable(m.rows,true);
  $('moduleSearch').value='';
 }
 if(page==='settings')renderSettings();
 if(page==='backup')renderBackup();
 if(page==='register')renderRegister();
 if(customExams)renderExams();
 if(page==='subjects')renderSubjects();
 if(page==='classteachers')renderClassTeachers();
 const add=(canAdd(page)||(page==='fees'&&currentUser.role==='parent'))&&!(page==='fees'&&!['accountant','parent'].includes(currentUser.role));
 document.querySelectorAll('.heading-actions .btn-primary,.module-toolbar .btn-primary').forEach(b=>b.classList.toggle('hidden',!add));
 document.querySelectorAll('.module-toolbar .btn-primary').forEach(b=>{b.textContent=page==='fees'?(currentUser.role==='parent'?'💳 Report a payment':'＋ Record Payment'):page==='classes'?'＋ Add Teacher':page==='communication'?'＋ Add Announcement':'＋ Add New';});
 $('payHistBtn').classList.toggle('hidden',page!=='fees');$('genericPage').classList.toggle('fees-wide',page==='fees');
 document.querySelectorAll('.heading-actions .btn-light,.module-panel .panel-heading .btn-light').forEach(b=>b.classList.toggle('hidden',!r.export));
 $('backDash').classList.toggle('hidden',isDash);
 if(isDash&&isAdmin){const el=document.querySelector('[data-stat="students"] .stat-number');if(el)el.textContent=String(stuNums().total);refreshDashLive();$('adminFeeStructure').innerHTML=feeStructureHtml({});}
 closeSidebar();window.scrollTo(0,0);
}
let tableRows=[],tablePage=1,tableHeads=[];const pgSize=()=>activePage()==='fees'?10:5;
const PILLS={g:['Active','Approved','Available','Good','Published','Completed','Present'],o:['Pending','In Progress','Scheduled','Fair','Low Stock','Draft','On Leave','Service','Issued'],r:['Overdue','Rejected','Absent','Poor','Out of Stock','Suspended'],b:['View','Edit']};
function pillClass(v){for(const k in PILLS)if(PILLS[k].includes(v))return k;return'n';}
function cellHtml(c,j,r){const hd=tableHeads[j]||'';
 if(PILL_COLS.includes(hd)){const pill=`<span class="pill ${pillClass(c)}">${c}</span>`;
  if(hd==='PORTAL'&&c==='Linked'&&r&&currentUser&&currentUser.role==='admin'){const ph=normPhone(r[tableHeads.findIndex(x=>x==='PHONE'||x==='PARENT PHONE')]);if(ph)return pill+` <button type="button" class="det-btn" data-pdet="${ph}">Details</button>`;}
  return pill;}
 if(hd==='BALANCE')return c==='—'?c:`<strong class="${c==='KSh 0'?'amt-ok':'amt-due'}">${c}</strong>`;
 if(hd==='ABSENT'&&activePage()==='attendance'&&r&&currentUser&&currentUser.role!=='parent')return Number(c)>0?`<button type="button" class="name-link" data-absent="${escH(r[0]+'|'+r[1])}">${c}</button>`:c;
 if(hd==='GROUP')return c==='—'?c:`<span class="grp ${String(c).startsWith('New')?'in':'wait'}">${escH(c)}</span>`;
 if(j===0&&r&&activePage()==='selsubjects')return `<button type="button" class="name-link" data-selsub="${escH(String(r[1]))}">${c}</button>`;
 if(j===0&&r&&PROFILE_PAGES.includes(activePage())&&currentUser&&['admin','accountant','teacher'].includes(currentUser.role))return `<button type="button" class="name-link" data-prof="${escH(String(r[1]))}">${c}</button>`;
 if(j===0)return `<strong style="color:#40516a">${c}</strong>`;return c;}
function pageList(p,n){if(n<=5)return Array.from({length:n},(_,i)=>i+1);const a=[...new Set([1,2,n-1,n,p-1,p,p+1])].filter(x=>x>=1&&x<=n).sort((x,y)=>x-y),o=[];a.forEach((x,i)=>{if(i&&x-a[i-1]>1)o.push('…');o.push(x)});return o;}
function renderTable(rows,reset){
 tableRows=rows;if(reset)tablePage=1;
 const n=rows.length,pages=Math.max(1,Math.ceil(n/pgSize()));tablePage=Math.min(Math.max(1,tablePage),pages);
 const from=(tablePage-1)*pgSize(),slice=rows.slice(from,from+pgSize());
 $('moduleBody').innerHTML=slice.length?slice.map((r,i)=>'<tr'+(r.meta?` class="row-click" data-ri="${from+i}" tabindex="0"`:'')+'>'+r.map((c,j)=>`<td>${cellHtml(c,j,r)}</td>`).join('')+'</tr>').join(''):`<tr><td colspan="6" style="text-align:center;color:#8290a4;padding:22px">${activePage()==='attendance'&&!$('moduleSearch').value&&currentUser.role!=='parent'?'No register has been marked yet. This page fills in by itself once class teachers mark their registers.':'No records found.'}</td></tr>`;
 $('recordCount').textContent=n?`Showing ${from+1}–${from+slice.length} of ${n} record${n===1?'':'s'}`:'No records found';
 $('pager').innerHTML=pages<2?'':`<button class="page-btn" data-pg="prev" ${tablePage===1?'disabled':''}>‹</button>`+pageList(tablePage,pages).map(x=>x==='…'?'<span class="page-gap">…</span>':`<button class="page-btn${x===tablePage?' current':''}" data-pg="${x}">${x}</button>`).join('')+`<button class="page-btn" data-pg="next" ${tablePage===pages?'disabled':''}>›</button>`;
}
$('pager').addEventListener('click',e=>{const b=e.target.closest('.page-btn');if(!b||b.disabled)return;const v=b.dataset.pg;
 tablePage=v==='prev'?tablePage-1:v==='next'?tablePage+1:parseInt(v,10);renderTable(tableRows,false);
 $('moduleBody').closest('.panel').scrollIntoView({behavior:'smooth',block:'start'});});
navItems.forEach(n=>n.addEventListener('click',()=>showPage(n.dataset.page)));
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g)showPage(g.dataset.go);});
$('menuToggle').onclick=()=>{$('sidebar').classList.add('open');$('overlay').style.display='block';};
$('closeSidebar').onclick=closeSidebar;$('overlay').onclick=closeSidebar;
function closeSidebar(){$('sidebar').classList.remove('open');$('overlay').style.display='none';}
let toastTimer;function toast(message){const t=$('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2600);}
const modal=$('modalBackdrop');
const ADD_LABELS={dashboard:'Student',students:'Student',teachers:'Staff Member',classes:'Teacher',attendance:'Attendance Record',exams:'Assessment',fees:'Fee Payment',expenses:'Expense',library:'Book',transport:'Vehicle',inventory:'Inventory Item',communication:'Announcement',reports:'Report',users:'User Account',settings:'School Setting'};
function activePage(){return document.querySelector('.nav-item.active')?.dataset.page||'dashboard';}
function openQuickAdd(){
 if(!currentUser)return;const page=activePage();
 if(page==='fees'){if(currentUser.role==='parent'){openParentPay();return}if(currentUser.role!=='accountant'){toast('Only the accountant records payments.');return}openPayForm();return}
 if(!canAdd(page)){toast('Your role does not have permission to add records here.');return}
 if(page==='classes'){openTeacherForm('','');return}
 if(page==='teachers'){openStaffChooser();return}
 if(page==='communication'){openAnnouncementForm();return}
 if(currentUser.role==='admin'&&(page==='students'||page==='dashboard')){openStudentForm();return}
 $('modalTitle').textContent='Add '+(ADD_LABELS[page]||'Record');
 $('formFields').innerHTML=[['Name / Title','text'],['Reference Number','text'],['Class / Category','text'],['Additional Details','text']].map(f=>`<div class="field"><label>${f[0]}</label><input type="${f[1]}" placeholder="Enter ${f[0].toLowerCase()}"></div>`).join('');
 modal.classList.remove('hidden');
}
function closeModal(){modal.classList.add('hidden');}
$('modalClose').onclick=closeModal;$('cancelModal').onclick=closeModal;modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
$('quickForm').addEventListener('submit',e=>{e.preventDefault();if(!currentUser||!canAdd(activePage())){closeModal();toast('Permission denied.');return}closeModal();toast('Saving is not available for this section yet.');});
$('moduleSearch').addEventListener('input',e=>{if(!currentUser)return;const m=getModule(activePage());if(!m)return;const q=e.target.value.toLowerCase();renderTable(m.rows.filter(r=>r.join(' ').toLowerCase().includes(q)),true);});
$('globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'&&currentUser){const q=e.target.value.toLowerCase().trim();const match=Object.keys(modules).filter(k=>canView(k)).find(k=>modules[k].title.toLowerCase().includes(q));if(q&&match)showPage(match);else toast(q?'No matching section found.':'Type a section name to search.');}});
$('todayLabel').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'2-digit',month:'long',year:'numeric'}).toUpperCase();

/* ================= v1.3: School profile (name + logo) ================= */
const SCHOOL_KEY='edutrack_school',DEFAULT_SCHOOL={name:'Klasora School System',type:'School',motto:'',logo:'',phones:[]};
function getSchool(){try{return{...DEFAULT_SCHOOL,...(JSON.parse(store.get(SCHOOL_KEY))||{})}}catch(e){return{...DEFAULT_SCHOOL}}}
function schoolInitials(n){const w=n.trim().split(/\s+/).filter(Boolean);return((w[0]||'S')[0]+(w[1]?w[1][0]:(w[0]||'S')[1]||'')).toUpperCase();}
function paintLogo(el,s){el.textContent='';el.classList.toggle('has-img',!!s.logo);if(s.logo){const i=document.createElement('img');i.src=s.logo;i.alt='';el.appendChild(i);}else el.textContent=schoolInitials(s.name);}
function applySchool(){
 const s=getSchool();
 ['sidebarLogo','loginLogo','topLogo'].forEach(id=>paintLogo($(id),s));
 $('topSchoolName').textContent=s.name;
 $('sidebarSchoolName').textContent=s.name;$('sidebarSchoolType').textContent=s.type||'School';
 $('loginSchoolName').textContent=s.name;$('loginSub').textContent='Sign in to '+s.name;
 $('loginMotto').textContent=s.motto;$('loginMotto').classList.toggle('hidden',!s.motto);
 document.title=s.name+' | Klasora';
}
let pendingLogo='';
const stuDocId=adm=>String(adm).trim().toUpperCase().replaceAll('/','_');
function renderAccountantManager(){
 const box=$('accountantPanel');if(!box)return;
 const list=USERS.filter(u=>u.role==='accountant'||u.role==='teacher'||u.role==='parent');
 const clsOpts=classKeys().map(c=>`<option>${escH(c)}</option>`).join('');
 const gOpts=guardians().filter(g=>!accountFor(g.phone)).map(g=>`<option value="${escH(g.phone)}">${escH(g.names.join(' / '))} · ${escH(fmtPhone(g.phone))} · ${g.kids.map(k=>escH(k.name.split(' ')[0])).join(', ')}</option>`).join('');
 const roleTxt=u=>u.role==='teacher'?'Teacher'+(u.className?', '+escH(u.className):''):u.role==='parent'?'Parent'+((u.children||[]).length?', '+u.children.length+' learner'+(u.children.length===1?'':'s'):''):'Accountant';
 box.innerHTML=`<div class="panel-heading"><div><h3>Staff &amp; Parent Accounts</h3><p>Create sign-in accounts for teachers, accountants and parents. Everyone must replace the temporary password on first login.</p></div></div><div class="form-fields"><div class="field"><label>Account type</label><select id="newAccRole"><option value="accountant">Accountant</option><option value="teacher">Teacher</option><option value="parent">Parent / Guardian</option></select></div><div class="field hidden" id="newAccClassWrap"><label>Class taught</label><select id="newAccClass">${clsOpts}</select></div><div class="field hidden" id="newAccParentWrap"><label>Parent / guardian (from learner records)</label><select id="newAccParent">${gOpts||'<option value="">No guardian without an account</option>'}</select></div><div class="field"><label>Full name</label><input id="newAccName" placeholder="e.g. Mary Wanjiku"></div><div class="field"><label>Email</label><input id="newAccEmail" type="email" placeholder="name@example.com"></div><div class="field"><label>Temporary password</label><input id="newAccTemp" type="text" placeholder="At least 8 characters"></div></div><div class="modal-actions"><button type="button" class="btn btn-primary" id="createAccountant">＋ Create Account</button></div><div class="streams-box"><h4>Accounts in this school</h4>${list.length?list.map(u=>`<div class="access-row"><span>${escH(u.name)}<small style="display:block;color:#8290a4">${escH(u.email||u.username)} · ${roleTxt(u)}</small></span><span>${u.disabled?'Deactivated':(u.mustChange?'Temporary password':'Active')} <button type="button" class="reg-btn" data-acc="${escH(u.uid)}">${u.disabled?'Activate':'Deactivate'}</button></span></div>`).join(''):'<p class="su-hint">No accounts have been created yet.</p>'}</div>`;
 box.querySelectorAll('[data-acc]').forEach(b=>b.onclick=async()=>{
  const u=USERS.find(x=>x.uid===b.dataset.acc);if(!u)return;const off=!u.disabled;
  if(off&&!confirm('Deactivate '+u.name+'? They will not be able to sign in until you activate the account again.'))return;
  b.disabled=true;
  try{await KlasoraFirebase.setUserDisabled(u.uid,off);u.disabled=off;u.status=off?'Deactivated':'Active';saveClassTeacherDir();refreshUsersModule();renderAccountantManager();toast(off?'Account deactivated.':'Account activated.');}
  catch(e){toast('Could not change the account. Check your internet and try again.');b.disabled=false;}
 });
 const roleSel=$('newAccRole');
 roleSel.onchange=()=>{$('newAccClassWrap').classList.toggle('hidden',roleSel.value!=='teacher');$('newAccParentWrap').classList.toggle('hidden',roleSel.value!=='parent');};
 $('createAccountant').onclick=async()=>{
  const role=roleSel.value,email=$('newAccEmail').value.trim().toLowerCase(),temp=$('newAccTemp').value;
  let name=$('newAccName').value.trim().replace(/[<>]/g,''),cls='',phone='',kids=[];
  if(role==='teacher')cls=$('newAccClass').value;
  if(role==='parent'){
   phone=$('newAccParent').value;const g=guardians().find(x=>x.phone===phone);
   if(!g){toast('Add the learner first, then create the parent account.');return}
   kids=g.kids.map(k=>stuDocId(k.adm));if(!name)name=g.names[0]||'Parent';
  }
  if(!/^\S+@\S+\.\S+$/.test(email)||temp.length<8){toast('Enter a valid email and a temporary password of at least 8 characters.');return}
  if(role!=='parent'&&wordCount(name)<2){toast('Enter the full name (first and last name).');return}
  if(role==='teacher'&&!cls){toast('Choose the class this teacher teaches.');return}
  if(USERS.some(u=>String(u.email||'').toLowerCase()===email)){toast('An account already uses that email.');return}
  const btn=$('createAccountant');btn.disabled=true;
  try{
   const profile={role,name,email,classes:cls?[cls]:[],children:kids,linkPhone:phone};
   const uid=await KlasoraFirebase.createUserAccount(currentUser.schoolId,{...profile,password:temp});
   USERS.push(fbUserToLocal({uid,...profile,mustChangePassword:true},currentUser.schoolId));
   saveClassTeacherDir();refreshUsersModule();renderAccountantManager();toast('Account created. Share the temporary password securely.');
  }catch(e){
   toast(e.code==='auth/email-already-in-use'?'That email already has an account.':e.code==='permission-denied'?'You do not have permission to create accounts.':e.code==='auth/weak-password'?'Choose a stronger temporary password.':'Could not create the account. Check your internet and try again.');
   btn.disabled=false;
  }
 };
}
function renderSettings(){
 const role=currentUser?currentUser.role:'admin';$('schoolPanel').classList.toggle('hidden',role!=='admin');$('feeSetupPanel').classList.toggle('hidden',role!=='accountant');$('accountantPanel').classList.toggle('hidden',role!=='admin');if(role==='accountant')renderFeeSetup();if(role==='admin')renderAccountantManager();
 const s=getSchool();pendingLogo=s.logo;
 $('schoolName').value=s.name;$('schoolType').value=s.type;$('schoolMotto').value=s.motto;
 paintLogo($('settingsLogo'),{...s,logo:pendingLogo});
 initStreamUI(s.streams||[]);
 initContactUI(s.phones||[]);
}
$('logoFile').addEventListener('change',e=>{
 const f=e.target.files[0];e.target.value='';if(!f)return;
 if(!f.type.startsWith('image/')){toast('Please choose an image file.');return}
 const rd=new FileReader();
 rd.onload=()=>{const img=new Image();img.onload=()=>{
  const max=256,k=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');
  c.width=Math.max(1,Math.round(img.width*k));c.height=Math.max(1,Math.round(img.height*k));
  c.getContext('2d').drawImage(img,0,0,c.width,c.height);
  pendingLogo=c.toDataURL('image/png');paintLogo($('settingsLogo'),{name:$('schoolName').value||'School',logo:pendingLogo});
 };img.onerror=()=>toast('Could not read that image.');img.src=rd.result;};
 rd.readAsDataURL(f);
});
$('logoRemove').onclick=()=>{pendingLogo='';paintLogo($('settingsLogo'),{name:$('schoolName').value||'School',logo:''});};
$('schoolName').addEventListener('input',()=>{if(!pendingLogo)paintLogo($('settingsLogo'),{name:$('schoolName').value||'School',logo:''});});
$('schoolSave').onclick=()=>{
 if(!currentUser||currentUser.role!=='admin'){toast('Only the administrator can change school details.');return}
 const name=$('schoolName').value.trim();if(!name){toast('Please enter the school name.');return}
 const sr=readStreams();if(sr.error){toast(sr.error);return}
 const cr=readContacts();if(cr.error){toast(cr.error);return}
 const ok=store.set(SCHOOL_KEY,JSON.stringify({name,type:$('schoolType').value.trim(),motto:$('schoolMotto').value.trim(),logo:pendingLogo,streams:sr.list,phones:cr.list}));
 applySchool();const warn=onStreamsChanged(sr.list);toast((ok?'School profile saved. ':'Saved for this session only. ')+warn);
};
$('schoolReset').onclick=()=>{store.del(SCHOOL_KEY);applySchool();onStreamsChanged([]);renderSettings();toast('School profile reset to default.');};

/* ================= v1.3: Clickable dashboard cards ================= */
const sec=(heading,rows)=>`<div class="detail-section">${heading}</div>`+rows.map(r=>`<div class="access-row"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('');
const DETAILS={
 students:()=>({tone:'tone-blue',label:'Total Students',value:'428',title:'Student Details',sub:'Term 3, 2026 enrolment',go:'students',goLabel:'Open Students',
  body:sec('BY LEVEL',[['Lower Primary','156'],['Upper Primary','184'],['Junior School','88']])+sec('GROWTH',[['New this term','+32'],['Change vs last term','↗ 8.2%'],['Active students','416'],['Pending admissions','5']])+sec('RECENT ADMISSIONS',[['Angela Otieno','Grade 4'],['Michael Kariuki','Grade 2'],['Winnie Njeri','PP2 (Pending)']])}),
 staff:()=>({tone:'tone-purple',label:'Teaching Staff',value:'26',title:'Staff Details',sub:'32 staff members in total',go:'teachers',goLabel:'Open Staff',
  body:sec('STAFF',[['Teaching staff','26'],['Support staff','6'],['Total staff','32'],['New this term','2']])+sec('LEADERSHIP',[['Headteacher','Mary Wambui']])}),
 attendance:()=>({tone:'tone-green',label:"Today's Attendance",value:'94.6%',title:'Attendance Details',sub:'18 Nov 2026',go:'attendance',goLabel:'Open Attendance',
  body:sec('TODAY',[['Present','405'],['Absent','18'],['Late arrivals','5'],['Change vs yesterday','↗ 1.4%']])+sec('BY CLASS',modules.attendance.rows.filter(r=>r[0]==='18 Nov 2026').map(r=>[r[1],`${r[2]} present · ${r[3]} absent · ${r[4]}`]))}),
 fees:()=>({tone:'tone-orange',label:'Fee Collection',value:'KSh 1.24M',title:'Fee Collection Details',sub:'Term 3, 2026',go:'fees',goLabel:'Open Fees',
  body:sec('THIS TERM',[['Billed','KSh 2.4M'],['Collected','KSh 1.24M'],['Outstanding','KSh 1.16M'],['Collection rate','51.7%'],['Change vs last term','↗ 12.5%']])+sec('LATEST INVOICES',modules.fees.rows.slice(0,3).map(r=>[r[0],`${r[3]} of ${r[2]}`]))})
};
let detailGo='dashboard';
function showDetail(d){
 detailGo=d.go||null;
 $('detailTitle').textContent=d.title;$('detailSub').textContent=d.sub;
 const hero=d.grad?`<div class="detail-hero" style="background:linear-gradient(145deg,${d.grad[0]},${d.grad[1]});--glow:${d.grad[1]}59">`:`<div class="detail-hero ${d.tone}">`;
 $('detailBody').innerHTML=hero+`<small>${d.label}</small><strong>${d.value}</strong></div>`+d.body;
 $('detailGo').textContent=d.goLabel+' →';$('detailBackdrop').classList.remove('hidden');
}
function openDetail(key){
 if(!currentUser||currentUser.role!=='admin'||!DETAILS[key])return;
 showDetail(DETAILS[key]());
}
function openModuleDetail(page,i){
 if(!currentUser)return;const admin=currentUser.role==='admin',src=admin?MSD[page]:currentUser.role==='teacher'?TEACHER_MSD[page]:(currentUser.role==='accountant'&&page==='fees')?MSD[page]:null;
 if(!src||!src[i])return;
 const st=getModule(page).stats[i],d=(admin&&isLive(page)&&LIVE_SPEC[page]?LIVE_SPEC[page].details[i]:src[i])(),t=THEME[page]||['blue','teal','purple'],g=G[t[i%3]];
 showDetail({grad:[g[0],g[1]],label:st[0],value:st[1],title:st[0],sub:d.sub,body:d.sections.map(s=>sec(s[0],s[1])).join(''),go:d.go||null,goLabel:d.goLabel||'View Records'});
}
function closeDetail(){$('detailBackdrop').classList.add('hidden');}
document.addEventListener('click',e=>{const c=e.target.closest('.stat-card[data-stat]');if(c)openDetail(c.dataset.stat);const m=e.target.closest('.mini-stat[data-ms]');if(m)openModuleDetail(activePage(),+m.dataset.ms);});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){closeDetail();closeProfile();closeStudentForm();closeAcademic();$('supportBackdrop').classList.add('hidden');}
 if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('.stat-card[data-stat]')){e.preventDefault();openDetail(e.target.dataset.stat);}
});
$('detailClose').onclick=closeDetail;$('detailDone').onclick=closeDetail;
$('detailBackdrop').addEventListener('click',e=>{if(e.target.id==='detailBackdrop')closeDetail();});
$('detailGo').onclick=()=>{closeDetail();if(detailGo)showPage(detailGo);else $('moduleBody').closest('.panel').scrollIntoView({behavior:'smooth',block:'start'});};
applySchool();

/* ================= v1.4: Themed, clickable module cards ================= */
const G={blue:['#4b93ff','#1d4ed8','#2563eb'],sky:['#38bdf8','#0369a1','#0284c7'],teal:['#2dd4bf','#0f766e','#0d9488'],green:['#2fd3a0','#047857','#059669'],purple:['#a07bff','#6d28d9','#7c3aed'],pink:['#f472b6','#be185d','#db2777'],rose:['#fb7185','#be123c','#e11d48'],orange:['#ffb23f','#ea580c','#f97316'],amber:['#fcd34d','#b45309','#d97706'],indigo:['#818cf8','#3730a3','#4f46e5'],slate:['#94a3b8','#334155','#475569']};
const THEME={students:['blue','sky','teal'],teachers:['purple','indigo','pink'],classes:['teal','blue','amber'],attendance:['green','rose','amber'],exams:['indigo','purple','orange'],fees:['blue','green','orange'],expenses:['rose','amber','purple'],library:['purple','indigo','rose'],transport:['amber','sky','green'],inventory:['slate','teal','orange'],communication:['pink','purple','sky'],reports:['indigo','blue','teal'],users:['blue','purple','green'],settings:['blue','teal','purple']};
const MS_ICONS={students:['🎓','🆕','✅'],teachers:['👥','🍎','🛠️'],classes:['🏫','👥','👩‍🏫'],attendance:['✅','❌','⏰'],exams:['📝','📊','🔎'],fees:['🧾','💰','⏳'],expenses:['💸','🕐','📅'],library:['📖','🔖','⚠️'],transport:['🚌','🛣️','🧒'],inventory:['📦','📉','📥'],communication:['📣','📅','💬'],reports:['📈','🗂️','⏱️'],users:['🔐','🛡️','🟢']};
function renderModuleStats(page,m){
 const t=THEME[page]||['blue','teal','purple'],ic=MS_ICONS[page]||[],click=(currentUser.role==='admin'&&!!MSD[page])||(currentUser.role==='teacher'&&!!TEACHER_MSD[page])||(currentUser.role==='accountant'&&page==='fees');
 const gp=$('genericPage');gp.style.setProperty('--accent',G[t[0]][2]);gp.style.setProperty('--accent-soft',G[t[0]][2]+'14');
 $('moduleStats').innerHTML=m.stats.map((s,i)=>{const g=G[t[i%3]],tag=click?'button type="button"':'div',end=click?'button':'div';
  return `<${tag} class="mini-stat ms-card${click?'':' static'}" ${click?`data-ms="${i}"`:''} style="--g1:${g[0]};--g2:${g[1]};--glow:${g[1]}59"><span class="ms-icon">${ic[i]||'●'}</span><small>${s[0]}</small><strong>${s[1]}</strong>${click?'<span class="ms-tap">Details ›</span>':''}</${end}>`;}).join('');
}
const money=n=>'KSh '+n.toLocaleString('en-US');
const topBalances=()=>modules.fees.rows.map(r=>[r[0],parseInt(r[4].replace(/\D/g,''),10)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,4).map(x=>[x[0],money(x[1])]);
const LEVELS3=(a,b,c)=>[['Lower Primary',a],['Upper Primary',b],['Junior School',c]];
const MSD={
 students:[
  ()=>({sub:'All enrolled learners · Term 3, 2026',sections:[['BY LEVEL',LEVELS3('156','184','88')],['BY GENDER',[['Female','219'],['Male','209']]]]}),
  ()=>({sub:'Learners admitted this term',sections:[['BY LEVEL',LEVELS3('14','12','6')],['ADMISSION STATUS',[['Confirmed','27'],['Pending documents','5']]],['GROWTH',[['Change vs last term','↗ 8.2%']]]]}),
  ()=>({sub:'Learners currently attending',sections:[['STATUS',[['Active','416'],['Pending admission','5'],['Transferred out','4'],['Suspended','3']]],['ACTIVE RATE',[['Of total enrolment','97.2%']]]]})],
 teachers:[
  ()=>({sub:'All employees of the school',sections:[['STAFF GROUPS',[['Teaching staff','26'],['Support staff','6']]],['CONTRACT',[['Full-time','29'],['Part-time','3']]]]}),
  ()=>({sub:'Teachers by section',sections:[['BY SECTION',LEVELS3('9','10','7')],['ROLE',[['Class teachers','14'],['Subject teachers','12']]]]}),
  ()=>({sub:'Non-teaching employees',sections:[['SUPPORT ROLES',[['Accountant','1'],['Secretary','1'],['Librarian','1'],['Security','2'],['Groundskeeper','1']]]]})],
 classes:[
   ()=>{const ks=classKeys(),big=ks.map(k=>[k,classStudents(k).length]).sort((a,b)=>b[1]-a[1])[0]||['-',0];return{sub:STREAMS.length?'Streams per class: '+STREAMS.join(', '):'One stream per class',sections:[['CLASSES',[['Grades','PP1 to Grade 12'],['Streams per class',STREAMS.length?String(STREAMS.length):'1 (no stream names)'],['Total classes',String(ks.length)]]],['CLASS SIZE',[['Largest class',big[0]+' ('+big[1]+')']]]]};},
   ()=>{const T=tsTotals(),ks=classKeys(),by=ks.map(k=>[k,classTeam(k).count]).filter(x=>x[1]>0);return{sub:'Class teachers and the other teachers added for each class',sections:[['SUMMARY',[['Teachers in total',String(T.teachers)],['Class teachers',String(T.cts)],['Classes without a class teacher',String(ks.length-T.cts)]]],['TEACHERS PER CLASS',by.length?by.slice(0,12).map(x=>[x[0],x[1]+(x[1]===1?' teacher':' teachers')]):[['None yet','Use Add Teacher']]]]};},
   ()=>{const ks=classKeys(),w=ks.filter(k=>teacherOf(k)),wo=ks.length-w.length;return{sub:'One class teacher per class',sections:[['ASSIGNMENT',[['Classes with a class teacher',String(w.length)],['Classes without',String(wo)]]],['CLASS TEACHERS',w.length?w.slice(0,6).map(k=>[k,teacherOf(k).name]):[['None yet','Use Add Class Teacher']]]]};}],
 attendance:[
  ()=>({sub:'18 Nov 2026 · 94.6% of 428 learners',sections:[['PRESENT BY LEVEL',[['Lower Primary','147 of 156 (94.2%)'],['Upper Primary','175 of 184 (95.1%)'],['Junior School','83 of 88 (94.3%)']]]]}),
  ()=>({sub:'18 Nov 2026 · learners not in school',sections:[['ABSENT BY LEVEL',LEVELS3('7','8','3')],['REASON GIVEN',[['Sick','9'],['Unexplained','6'],['Family matters','3']]]]}),
  ()=>({sub:'18 Nov 2026 · arrived after the bell',sections:[['LATE BY LEVEL',LEVELS3('2','1','2')],['REASON',[['Transport delay','3'],['Other','2']]]]})],
 exams:[
  ()=>({sub:'Term 3 assessments',sections:[['BY STATUS',[['Completed','6'],['In progress','4'],['Scheduled','2']]],['IN PROGRESS',modules.exams.rows.filter(r=>r[4]==='In Progress').map(r=>[r[3]+' · '+r[1],'In progress'])]]}),
  ()=>({sub:'Marks captured so far',sections:[['PROGRESS',[['Results entered','86%'],['Still to enter','14%'],['Classes fully marked','12 of 14']]]]}),
  ()=>({sub:'Results waiting on someone',sections:[['WAITING FOR',[['Teacher marking','11'],['Moderation','7']]],['OLDEST',[['End Term · Grade 4 Mathematics','3 days']]]]})],
 fees:[
  ()=>({sub:'Total invoiced for Term 3',sections:[['BY LEVEL',[['Lower Primary','KSh 0.72M'],['Upper Primary','KSh 1.04M'],['Junior School','KSh 0.64M']]],['BY ITEM',[['Tuition','KSh 1.80M'],['Transport','KSh 0.36M'],['Meals','KSh 0.24M']]]]}),
  ()=>({sub:'Money received · 51.7% of billed',sections:[['PAYMENT METHOD',[['M-Pesa','KSh 0.74M'],['Bank','KSh 0.38M'],['Cash','KSh 0.12M']]],['TREND',[['Change vs last term','↗ 12.5%']]]]}),
  ()=>({sub:'Still to be collected',sections:[['AGE OF BALANCE',[['Due this month','KSh 0.64M'],['Overdue over 30 days','KSh 0.52M']]],['LEARNERS WITH BALANCE',[['Count','196']]],['LARGEST BALANCES',topBalances()]]})],
 expenses:[
  ()=>({sub:'Term 3 spending to date',sections:[['BY CATEGORY',[['Academic','KSh 130K'],['Maintenance','KSh 74K'],['Transport','KSh 70K'],['Utilities','KSh 62K'],['Administration','KSh 44K']]]]}),
  ()=>({sub:'Requests waiting for approval',sections:[['PENDING',modules.expenses.rows.filter(r=>r[4]==='Pending').map(r=>[r[1],r[3]])]]}),
  ()=>({sub:'November 2026',sections:[['BY CATEGORY',[['Academic','KSh 38K'],['Maintenance','KSh 22K'],['Transport','KSh 20K'],['Utilities','KSh 12K']]]]})],
 library:[
  ()=>({sub:'Titles and copies in the library',sections:[['BY TYPE',[['Textbooks','640'],['Fiction','310'],['Reference','150'],['Storybooks','140']]]]}),
  ()=>({sub:'Books currently out',sections:[['BORROWED BY',[['Learners','71'],['Teachers','15']]],['STILL OUT',modules.library.rows.filter(r=>r[4]==='Issued').map(r=>[r[0],'Issued'])]]}),
  ()=>({sub:'Past their return date',sections:[['HOW LATE',[['1 to 7 days','4'],['Over 7 days','3']]],['EXAMPLE',modules.library.rows.filter(r=>r[4]==='Overdue').map(r=>[r[0],'Overdue'])]]})],
 transport:[
  ()=>({sub:'School fleet',sections:[['BY TYPE',[['Buses','3'],['Vans','3']]],['STATUS',[['Active','5'],['In service','1']]],['FLEET',modules.transport.rows.map(r=>[r[0],r[1]])]]}),
  ()=>({sub:'Morning and evening runs',sections:[['RUNS',[['Morning','4'],['Evening','4']]],['VEHICLES',[['Serving routes','6'],['Routes','8']]]]}),
  ()=>({sub:'Learners using school transport',sections:[['PER ROUTE',[['Route A','28'],['Route B','24'],['Route C','22'],['Route D','20'],['Routes E–H','18, 18, 18, 16']]]]})],
 inventory:[
  ()=>({sub:'Items recorded in the register',sections:[['BY CATEGORY',[['Furniture','160'],['Sports','52'],['ICT','46'],['Stationery','46'],['Laboratory','38']]]]}),
  ()=>({sub:'Running out soon',sections:[['LOW STOCK',modules.inventory.rows.filter(r=>r[4]==='Low Stock').map(r=>[r[0],r[3]+' left'])]]}),
  ()=>({sub:'Requests waiting for approval',sections:[['REQUESTS',[['Science kit','Grade 5'],['Laptop charger','ICT lab'],['Desks × 10','Grade 2'],['Projector bulb','School hall'],['Sports bibs','PE department']]]]})],
 communication:[
  ()=>({sub:'Notices sent or planned',sections:[['BY STATUS',[['Published','0'],['Scheduled','0'],['Drafts','0']]]]}),
  ()=>({sub:'Next on the calendar',sections:[['EVENTS',[['None yet','-']]]]}),
  ()=>({sub:'Messages with parents and staff',sections:[['BY GROUP',[['Parents','0'],['Staff','0']]],['INBOX',[['Unread','0']]]]})],
 reports:[
  ()=>({sub:'Reports you can generate',sections:[['BY CATEGORY',[['Students','4'],['Finance','4'],['Academic','4'],['Operations','4']]]]}),
  ()=>({sub:'November 2026',sections:[['FORMAT',[['PDF','30'],['Excel','12']]]]}),
  ()=>({sub:'Reports that run automatically',sections:[['SCHEDULE',[['Attendance summary','Every Monday'],['Fee statement','1st of the month'],['Term results','End of term']]]]})],
 users:[
  ()=>({sub:'People who can sign in',sections:[['ACCOUNTS',USERS.map(u=>[u.name,ROLES[u.role].label])]]}),
  ()=>({sub:'What each role can do',sections:[['ROLES',Object.keys(ROLES).map(k=>[ROLES[k].label,ROLES[k].summary])]]}),
  ()=>({sub:'This session',sections:[['SIGNED IN',[['Name',currentUser.name],['Role',ROLES[currentUser.role].label],['Auto sign-out','After 15 minutes idle'],['Failed-attempt lock','30 seconds after 5 tries']]]]})]
};


/* ================= v1.5: Parents & guardians, student registration, support ================= */
modules.students.rows.push(['Grace Kariuki','GFA-2023-0140','Grade 5','Female','Active']);
modules.fees.rows.push(['Grace Kariuki','INV-2023-0140','KSh 20,000','KSh 20,000','KSh 0']);
modules.parents={title:'Parents & Guardians',subtitle:'Parents and guardians linked to learners, with contact numbers.',stats:[['Guardians','0'],['Portal Linked','0'],['Not Registered','0']],heads:['PARENT / GUARDIAN','PHONE','CHILDREN','CLASSES','PORTAL'],rows:[]};
THEME.parents=['pink','teal','amber'];MS_ICONS.parents=['👪','🔗','⏳'];PAGE_NAMES.parents='Parents';
ROLES.accountant.pages.push('parents');

const normPhone=s=>{let d=String(s||'').replace(/\D/g,'');if(d.startsWith('254'))d='0'+d.slice(3);else if(d.length===9&&/^[17]/.test(d))d='0'+d;return /^0[17]\d{8}$/.test(d)?d:'';};
const fmtPhone=p=>/^0\d{9}$/.test(p)?`${p.slice(0,4)} ${p.slice(4,7)} ${p.slice(7)}`:(p||'—');
const HONORIFIC_W=['mr','mrs','ms','miss','madam','mdm','dr','prof','sir','rev','pastor','mister'];
const normName=s=>String(s||'').toLowerCase().replace(/[^a-z\s]/g,' ').split(/\s+/).filter(w=>w&&!HONORIFIC_W.includes(w)).sort().join(' ');
const wordCount=s=>String(s||'').trim().split(/\s+/).filter(Boolean).length;
const LEVEL_OF=c0=>{const c=gradeOf(c0);return/^(PP1|PP2|Grade [123])$/.test(c)?'lower':/^Grade [456]$/.test(c)?'upper':'junior';};
const CLASS_LIST=['PP1','PP2','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'];
/* v2.3: streams. A "class" is a grade plus an optional stream, for example Grade 4 Red. */
let STREAMS=[];try{const _st=getSchool().streams;if(Array.isArray(_st)&&_st.filter(Boolean).length>1)STREAMS=_st.filter(Boolean);}catch(e){}
const gradeOf=c=>{c=String(c||'').trim();return CLASS_LIST.find(g=>c===g||c.startsWith(g+' '))||c;};
const classKeys=()=>CLASS_LIST.flatMap(g=>STREAMS.length?STREAMS.map(x=>g+' '+x):[g]);
const normKey=c=>{c=String(c||'').trim();if(!c)return c;const g=gradeOf(c);if(!CLASS_LIST.includes(g))return c;if(!STREAMS.length)return g;const rest=c.slice(g.length).trim(),hit=STREAMS.find(x=>x.toLowerCase()===rest.toLowerCase());return g+' '+(hit||STREAMS[0]);};

/* guardians on file for the original sample learners */
const BASE_STUDENTS=[];   // no built-in sample learners
const PARENT_FIRST=[['Peter','Father'],['Mary','Mother'],['John','Father'],['Grace','Mother'],['Joseph','Father'],['Lucy','Mother'],['Daniel','Father'],['Faith','Mother'],['Samuel','Father'],['Ann','Mother'],['David','Father'],['Ruth','Mother']];
const GUARDIAN_SEED={};
BASE_STUDENTS.forEach((r,i)=>{const last=r[0].split(' ').slice(-1)[0];
 if(last==='Kariuki')GUARDIAN_SEED[r[1]]={name:'Esther Kariuki',phone:'0711000004',relation:'Mother'};
 else{const p=PARENT_FIRST[i%PARENT_FIRST.length];GUARDIAN_SEED[r[1]]={name:p[0]+' '+last,phone:'0722'+String(310000+i*137).padStart(6,'0'),relation:p[1]};}});

/* students registered through the app (saved in this browser) */
const NEWSTU_KEY='edutrack_new_students',PACC_KEY='edutrack_parent_accounts';
let HIDE={};
const PROMO_KEY='edutrack_promotions';let PROMO={log:[],overrides:{},done:{}};
let EXTRA=[];   // learners of the signed-in school, loaded from Firestore after sign-in
function rebuildStudents(){const reg=EXTRA.filter(x=>!x.imp).reverse(),imp=EXTRA.filter(x=>x.imp);modules.students.rows=[...reg,...imp].map(x=>[x.name,x.adm,x.cls,x.gender,x.status||'Active']).concat(HIDE.students?[]:BASE_STUDENTS);modules.students.rows=modules.students.rows.map(r=>{const o=PROMO.overrides[r[1]];return o?[r[0],r[1],o.cls||r[2],r[3],o.status||r[4]]:r;}).map(r=>r.map((v,i)=>i===2?normKey(v):v));}
rebuildStudents();
function allStudents(){return modules.students.rows.map(r=>{const x=EXTRA.find(e=>e.adm===r[1]),g=x?{name:x.parent,phone:x.phone,relation:x.relation}:(GUARDIAN_SEED[r[1]]||{name:'—',phone:'',relation:''});
 return{name:r[0],adm:r[1],cls:r[2],gender:r[3],status:r[4],dob:x?x.dob:'',gname:g.name,gphone:g.phone,relation:g.relation};});}
function guardians(){const map={};allStudents().forEach(s=>{if(!s.gphone)return;const g=map[s.gphone]||(map[s.gphone]={phone:s.gphone,names:[],kids:[],relation:s.relation});if(!g.names.includes(s.gname))g.names.push(s.gname);g.kids.push(s);});return Object.values(map);}
const accountFor=phone=>USERS.find(u=>u.role==='parent'&&u.linkPhone===phone);
const childrenOf=u=>allStudents().filter(s=>s.gphone===u.linkPhone);

function stuNums(){
 if(isLive('students')){const all=allStudents(),b={lower:0,upper:0,junior:0},nw={lower:0,upper:0,junior:0};let f=0,m=0;all.forEach(s=>{b[LEVEL_OF(s.cls)]++;if(s.gender==='Female')f++;else if(s.gender==='Male')m++;});EXTRA.forEach(x=>nw[LEVEL_OF(x.cls)]++);return{total:all.length,newAdm:EXTRA.length,active:all.filter(s=>s.status==='Active').length,b,nw,female:f,male:m,n:EXTRA.length};}const b={lower:0,upper:0,junior:0},nw={lower:0,upper:0,junior:0};let f=0,m=0;
 EXTRA.forEach(x=>{b[LEVEL_OF(x.cls)]++;nw[LEVEL_OF(x.cls)]++;x.gender==='Female'?f++:m++;});const n=EXTRA.length;
 return{total:n,newAdm:n,active:n,b,nw,female:f,male:m,n};}

/* ----- per-child records for the parent portal ----- */
const hashOf=s=>{let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h;};
const LEVEL_FULL=sc=>LEVEL_NAME[levelCode(sc)];
const LEVEL_SHORT=sc=>levelCode(sc);
const FEE_BY_CLASS=c0=>{const c=gradeOf(c0);return 0;};
const numOf=s=>parseInt(String(s).replace(/\D/g,''),10)||0;
const isSample=s=>BASE_STUDENTS.some(b=>b[1]===s.adm);
function childRecordsBase(s){
 const fr=modules.fees.rows.find(r=>r[0]===s.name);
 if(!isSample(s)){return{att:[],exams:[],fee:feeBrief(s),rate:null,avg:null};}
 const MICHAEL=s.adm==='GFA-2026-0427',h=hashOf(s.adm),days=[['18 Nov 2026','Wed'],['17 Nov 2026','Tue'],['16 Nov 2026','Mon'],['13 Nov 2026','Fri'],['12 Nov 2026','Thu']];
 let att,exams;
 if(MICHAEL){att=PARENT_DATA.attendance.rows.map(r=>({date:r[0],day:r[1],status:r[2],arrival:r[3],note:r[4]}));exams=[['CBC Assessment','English',78],['Mid Term Assessment','Mathematics',85],['Mid Term Assessment','Science',64]];}
 else{att=days.map((d,i)=>{const r=(h>>(i*3))%10,mins=40+((h>>i)%15);
   return r===0?{date:d[0],day:d[1],status:'Absent',arrival:'-',note:'Not recorded'}:r===1?{date:d[0],day:d[1],status:'Late',arrival:'8:'+String(5+(h>>i)%20).padStart(2,'0')+' AM',note:'Arrived after the bell'}:{date:d[0],day:d[1],status:'Present',arrival:'7:'+mins+' AM',note:'-'};});
  exams=['English','Mathematics','Science'].map((sub,k)=>[k?'Mid Term Assessment':'CBC Assessment',sub,52+((h>>(k*5))%40)]);}
 const fee=feeBrief(s);
 return{att,exams,fee,rate:MICHAEL?93:100-2-((h>>3)%12),avg:Math.round(exams.reduce((a,e)=>a+e[2],0)/exams.length)};
}
function parentView(page,u){
 const kids=childrenOf(u),rec=kids.map(k=>({k,r:childRecords(k)})),names=kids.map(k=>k.name).join(', ')||'your child';
 if(page==='attendance'){const rows=[];rec.forEach(x=>x.r.att.forEach(a=>rows.push([x.k.name,a.date,a.status,a.arrival,a.note])));
  const c=t=>rows.filter(r=>r[2]===t).length;return{subtitle:rows.length?'Daily attendance this week for '+names+'.':'No attendance has been recorded yet for '+names+'.',stats:[['Present',String(c('Present'))],['Late',String(c('Late'))],['Absent',String(c('Absent'))]],heads:['CHILD','DATE','STATUS','ARRIVAL','NOTE'],rows};}
 if(page==='exams'){const rows=[];rec.forEach(x=>x.r.exams.forEach(e=>rows.push([x.k.name,e[0],e[1],e[2]+'%',LEVEL_FULL(e[2])])));
  const avg=rows.length?Math.round(rows.reduce((a,r)=>a+parseInt(r[3],10),0)/rows.length):null;
  return{subtitle:rows.length?'Term 3 assessment results for '+names+'.':'No results have been entered yet for '+names+'.',stats:[['Assessments',String(rows.length)],['Average',avg===null?'—':avg+'%'],['Overall Level',avg===null?'—':LEVEL_SHORT(avg)]],heads:['CHILD','ASSESSMENT','SUBJECT','SCORE','LEVEL'],rows};}
 const rows=[];rec.forEach(x=>x.r.fee.terms.forEach(t=>rows.push([x.k.name,'Term '+t.t,t.fee===null?'—':money(t.fee),t.fee===null?'—':money(t.paid),t.fee===null?'—':money(Math.max(0,t.fee-t.paid))])));
 const sum=f=>rec.reduce((a,x)=>a+x.r.fee[f],0),fy=feeYear();
 return{subtitle:'Fee statement for '+names+' ('+fy+'), Term 1 to Term 3.',stats:[['Billed '+fy,money(sum('billed'))],['Paid',money(sum('paid'))],['Balance',money(sum('bal'))]],heads:['CHILD','TERM','FEES','PAID','BALANCE'],rows};
}
DASH_STATS.parent=u=>{const kids=childrenOf(u),rec=kids.map(k=>childRecords(k)),rs=rec.filter(r=>r.rate!==null),as=rec.filter(r=>r.avg!==null),bal=rec.reduce((a,r)=>a+r.fee.bal,0);
 const rate=rs.length?Math.round(rs.reduce((a,r)=>a+r.rate,0)/rs.length):null,avg=as.length?Math.round(as.reduce((a,r)=>a+r.avg,0)/as.length):null;
 return[['My Children',String(kids.length),kids.map(k=>k.name.split(' ')[0]).join(', ')||'none linked yet','blue','♙'],['Attendance',rate===null?'—':rate+'%',rate===null?'no records yet':'average this term','green','✓'],['Average Score',avg===null?'—':avg+'%',avg===null?'no results yet':LEVEL_FULL(avg),'purple','▣'],['Fee Balance',money(bal),'across '+kids.length+' child'+(kids.length===1?'':'ren'),'orange','KSh']];};
function childCardsHtml(u){
 const kids=childrenOf(u),pal=['blue','teal','purple','orange'];
 if(!kids.length)return'<div class="panel"><div class="panel-heading"><div><h3>My Children</h3><p>No learners are linked to this account yet. Please contact the school office.</p></div></div></div>';
 return`<div class="section-title">MY CHILDREN</div><div class="child-grid">`+kids.map((k,i)=>{const g=G[pal[i%4]],r=childRecords(k);
  return`<button type="button" class="child-card" data-child="${k.adm}" style="--g1:${g[0]};--g2:${g[1]};--glow:${g[1]}59"><span class="child-avatar">${schoolInitials(k.name)}</span><strong>${escH(k.name)}</strong><small>${k.cls} · ${k.adm}</small>${promoBadge(k.adm)}<div class="child-stats"><span>Attendance<b>${r.rate===null?'—':r.rate+'%'}</b></span><span>Fee balance<b>${money(r.fee.bal)}</b></span></div><span class="ms-tap">View all details ›</span></button>`;}).join('')+'</div>';
}
function openChild(adm){openLearnerProfile(adm);}
document.addEventListener('click',e=>{const c=e.target.closest('.child-card[data-child]');if(c)openChild(c.dataset.child);});

/* ----- views that add parent columns for admin / accountant / teacher ----- */
function portalOf(phone){return accountFor(phone)?'Linked':'Not linked';}
function dynamicView(page,m){
 const raw=m.rows;
 if(page==='selsubjects')return selSubjectsView(m);
 if(page==='attendance')return attendanceView(m);
 if(page==='students'){const map=Object.fromEntries(allStudents().map(s=>[s.adm,s]));
  m.heads=[...m.heads,'PARENT / GUARDIAN','PHONE','PORTAL'];m.rows=m.rows.map(r=>{const s=map[r[1]];return[...r,s.gname,fmtPhone(s.gphone),portalOf(s.gphone)];});
  const n=stuNums();m.stats=[['Total Students',String(n.total)],['New Admissions',String(n.newAdm)],['Active Students',String(n.active)]];
  if(currentUser&&currentUser.role==='teacher'){const cu=catchUp(TEACHER_CLASS);if(cu){const arr=new Set(cu.arrivals.map(x=>x.adm));m.heads=[...m.heads,'GROUP'];m.rows=m.rows.map(r=>[...r,r[2]===TEACHER_CLASS?(arr.has(r[1])?'New from '+cu.lower:'Waiting to be promoted'):'—']);m.rows.sort((a,b)=>((a[2]===TEACHER_CLASS?0:2)+(String(a[a.length-1]).startsWith('New')?1:0))-((b[2]===TEACHER_CLASS?0:2)+(String(b[b.length-1]).startsWith('New')?1:0)));m.subtitle=cu.waiting.length+' waiting to be promoted · '+cu.arrivals.length+' new from '+cu.lower;}}}
 if(page==='fees'){const fy=feeYear(),act=allStudents().filter(s=>billedAny(s,fy)).sort((a,b)=>CLASS_LIST.indexOf(gradeOf(a.cls))-CLASS_LIST.indexOf(gradeOf(b.cls))||a.cls.localeCompare(b.cls)||a.name.localeCompare(b.name)),c=x=>x===null?'—':money(x);
   m.heads=['STUDENT','UPI NO.','CLASS','INVOICE NO.','TERM 1 FEES','TERM 1 PAID','TERM 2 FEES','TERM 2 PAID','TERM 3 FEES','TERM 3 PAID','AMOUNT','PAID','BALANCE','PARENT PHONE','PORTAL'];
   m.rows=act.map(s=>{const f=feeSummary(s,fy),t=f.terms;return[s.name,s.adm,s.cls+(s.status!=='Active'?' · '+s.status:''),f.inv,c(t[0].fee),c(t[0].fee===null?null:t[0].paid),c(t[1].fee),c(t[1].fee===null?null:t[1].paid),c(t[2].fee),c(t[2].fee===null?null:t[2].paid),money(f.fee),money(f.paid),money(f.bal),fmtPhone(s.gphone),portalOf(s.gphone)];});
   const T=feeTotals();m.stats=[['Billed '+fy,kshC(T.fee)],['Collected',kshC(T.paid)],['Outstanding',kshC(T.bal)]];m.subtitle='Fees and payments for every learner, Term 1 to Term 3 '+fy+'.';}
  if(page==='settings'&&currentUser&&currentUser.role==='accountant'){m.title='Settings';m.subtitle='Create the school fee structure for every class and term.';}
 if(page==='parents'){const g=guardians(),linked=g.filter(x=>accountFor(x.phone)).length;
  m.stats=[['Guardians',String(g.length)],['Portal Linked',String(linked)],['Not Registered',String(g.length-linked)]];
  m.rows=g.map(x=>[x.names.join(' / '),fmtPhone(x.phone),x.kids.map(k=>k.name).join(', '),[...new Set(x.kids.map(k=>k.cls))].join(', '),portalOf(x.phone)]);}
 if(LIVE_SPEC[page]&&isLive(page))m.stats=LIVE_SPEC[page].stats(raw);
 return m;
}
PILLS.g.push('Linked');PILLS.o.push('Not linked','Late');
const PILL_COLS=['STATUS','CONDITION','ACTION','PORTAL','PARENT LINKED'];

/* ----- dashboard + module detail sheets that depend on live student numbers ----- */
DETAILS.students=()=>{const n=stuNums();return{tone:'tone-blue',label:'Total Students',value:String(n.total),title:'Student Details',sub:'Term 3, 2026 enrolment',go:'students',goLabel:'Open Students',
 body:sec('BY LEVEL',LEVELS3(String(n.b.lower),String(n.b.upper),String(n.b.junior)))+sec('GROWTH',[['New this term','+'+n.newAdm],['Change vs last term','↗ 8.2%'],['Active students',String(n.active)],['Pending admissions','5']])+sec('RECENT ADMISSIONS',allStudents().slice(0,3).map(s=>[s.name,s.cls+(s.status==='Pending'?' (Pending)':'')]))};};
MSD.students=[
 ()=>{const n=stuNums();return{sub:'All enrolled learners · Term 3, 2026',sections:[['BY LEVEL',LEVELS3(String(n.b.lower),String(n.b.upper),String(n.b.junior))],['BY GENDER',[['Female',String(n.female)],['Male',String(n.male)]]]]};},
 ()=>{const n=stuNums();return{sub:'Learners admitted this term',sections:[['BY LEVEL',LEVELS3(String(n.nw.lower),String(n.nw.upper),String(n.nw.junior))],['ADMISSION STATUS',[['Confirmed',String(n.newAdm-5)],['Pending documents','5']]],['GROWTH',[['Change vs last term','↗ 8.2%']]]]};},
 ()=>{const n=stuNums();return{sub:'Learners currently attending',sections:[['STATUS',[['Active',String(n.active)],['Pending admission','5'],['Transferred out','4'],['Suspended','3']]],['ACTIVE RATE',[['Of total enrolment',(n.active/n.total*100).toFixed(1)+'%']]]]};}];
MSD.parents=[
 ()=>{const g=guardians(),c=k=>String(g.filter(x=>x.relation===k).length);return{sub:'Parents and guardians on file',sections:[['BY RELATIONSHIP',[['Mothers',c('Mother')],['Fathers',c('Father')],['Guardians',c('Guardian')]]],['FAMILIES',[['With more than one child',String(g.filter(x=>x.kids.length>1).length)],['Learners covered',String(allStudents().length)]]]]};},
 ()=>{const l=guardians().filter(x=>accountFor(x.phone));return{sub:'Parents who created a portal account',sections:[['LINKED',l.length?l.slice(0,8).map(x=>[x.names[0],fmtPhone(x.phone)+' · '+x.kids.map(k=>k.name.split(' ')[0]).join(', ')]):[['None yet','-']]]]};},
 ()=>{const l=guardians().filter(x=>!accountFor(x.phone));return{sub:'Share the sign-up steps with these parents',sections:[['NOT YET REGISTERED',l.slice(0,8).map(x=>[x.names[0],fmtPhone(x.phone)])],['HOW THEY SIGN UP',[['Step 1','Open Klasora and tap Create Parent Account'],['Step 2','Enter the school code, your registered name and your child’s UPI number']]]]};}];
MSD.users[1]=()=>{const p=USERS.filter(u=>u.role==='parent');return{sub:'Parents who created portal accounts',sections:[['PARENT ACCOUNTS',p.length?p.map(u=>[u.name,fmtPhone(u.linkPhone)+' · '+(childrenOf(u).map(c=>c.name.split(' ')[0]).join(', ')||'no children')]):[['None yet','-']]]]};};

/* ----- create a parent account (used by the sign-up form) ----- */
function createParentAccount(schoolCode,name,upi){
 const code=String(schoolCode||'').trim().toUpperCase(),uupi=String(upi||'').trim().toUpperCase();
 if(!code)return{error:'Enter the school code.'};
 let registry=[];try{registry=JSON.parse(localStorage.getItem('klasora_central_schools')||'[]')}catch(e){}
 if(code!=='GFA001'&&!registry.some(x=>String(x.code||'').toUpperCase()===code&&x.status==='Active'))return{error:'School code not found. Check with the school administrator.'};
 if(wordCount(name)<2)return{error:'Enter your full name exactly as registered by the school.'};
 if(!uupi)return{error:'Enter your child’s UPI number.'};
 const student=allStudents().find(x=>String(x.adm).toUpperCase()===uupi);
 if(!student||normName(student.gname)!==normName(name))return{error:'The parent name and child UPI number do not match the school records. Contact the school office.'};
 const g=guardians().find(x=>x.phone===student.gphone&&x.names.some(n=>normName(n)===normName(name)));
 if(!g)return{error:'Parent record not found. Ask the school administrator to register you first.'};
 if(accountFor(g.phone))return{error:'A parent account already exists for this family. Please sign in or contact the school.'};
 const nm=g.names.find(n=>normName(n)===normName(name));
 const user={id:'p'+Date.now().toString(36),username:nm,name:nm,initials:schoolInitials(nm),role:'parent',title:'Parent / Guardian',status:'Active',schoolCode:code,linkPhone:g.phone,phone:fmtPhone(g.phone),created:new Date().toISOString().slice(0,10)};
 USERS.push(user);setCreds(user,uupi,true);
 const saved=(()=>{try{return JSON.parse(store.get(PACC_KEY))||[]}catch(e){return[]}})();const cl={...user};delete cl.salt;delete cl.passHash;delete cl.mustChange;delete cl.pwReset;saved.push(cl);store.set(PACC_KEY,JSON.stringify(saved));
 refreshUsersModule();return{user,kids:g.kids.length};
}
/* ----- register a new student (used by the registration form) ----- */
function admPrefix(){return(currentUser&&currentUser.schoolCode)||'ADM'}
function nextAdm(){const y=new Date().getFullYear(),nums=allStudents().filter(s=>s.adm.startsWith(admPrefix()+'-'+y+'-')).map(s=>parseInt(s.adm.slice(-4),10));return admPrefix()+'-'+y+'-'+String((nums.length?Math.max(...nums):0)+1).padStart(4,'0');}
function registerStudent(d){
 const phone=normPhone(d.phone);
 if(wordCount(d.name)<2)return{error:"Enter the learner's full name (first and last name)."};
 if(!d.gender)return{error:'Select the learner’s gender.'};
 if(!d.cls||!classKeys().includes(d.cls))return{error:'Select the learner’s class.'};
 const adm=String(d.adm||'').trim().toUpperCase();
 if(!adm)return{error:'Type the learner’s UPI No.'};
 if(!/^[A-Z0-9][A-Z0-9\-\/._]{0,19}$/.test(adm))return{error:'UPI No.: letters, numbers and - / . _ only, no spaces, up to 20 characters.'};
 {const used=allStudents().find(x=>String(x.adm).toUpperCase()===adm);if(used)return{error:'UPI No. '+adm+' is already used by '+used.name+'.'};}
 if(wordCount(d.parent)<2)return{error:"Enter the parent or guardian's full name."};
 if(!phone)return{error:'Enter a valid parent phone number, for example 0712 345 678.'};
 if(allStudents().some(s=>normName(s.name)===normName(d.name)&&s.cls===d.cls&&s.gphone===phone))return{error:'This learner is already registered with that parent.'};
 const rec={name:d.name.replace(/[<>]/g,'').trim().replace(/\s+/g,' '),adm:adm,cls:d.cls,gender:d.gender,dob:d.dob||'',parent:d.parent.replace(/[<>]/g,'').trim().replace(/\s+/g,' '),relation:d.relation||'Guardian',phone,date:new Date().toISOString().slice(0,10)};
 EXTRA.push(rec);rebuildStudents();saveStudentsRemote([rec]);
 return{student:rec,saved:true,hasAccount:!!accountFor(phone),siblings:allStudents().filter(s=>s.gphone===phone&&s.adm!==rec.adm).map(s=>s.name)};
}
function openStudentForm(){
 $('stClass').innerHTML='<option value="">Select class</option>'+classKeys().map(c=>`<option>${c}</option>`).join('');
 ['stName','stDob','stParent','stPhone','stAdm'].forEach(i=>$(i).value='');$('stDob').dataset.iso='';$('stGender').value='';$('stRelation').value='Mother';
 $('stHint').textContent='';$('stHint').className='field-hint';$('studentBackdrop').classList.remove('hidden');
}
function closeStudentForm(){$('studentBackdrop').classList.add('hidden');}
$('stPhone').addEventListener('input',()=>{const p=normPhone($('stPhone').value),h=$('stHint');
 if(!p){h.textContent='';h.className='field-hint';return}
 const g=guardians().find(x=>x.phone===p);
 if(g){h.className='field-hint ok';h.textContent=`Already on file for ${g.names.join(' / ')}. This learner will be linked as a sibling of ${g.kids.map(k=>k.name).join(', ')}.`;}
 else{h.className='field-hint';h.textContent='New family. The parent can create a portal account with this name and phone number.';}});
$('stClose').onclick=closeStudentForm;$('stCancel').onclick=closeStudentForm;
$('studentBackdrop').addEventListener('click',e=>{if(e.target.id==='studentBackdrop')closeStudentForm();});
$('stSave').onclick=()=>{
 if(!currentUser||currentUser.role!=='admin'){toast('Only the administrator can register students.');return}
 const r=registerStudent({adm:$('stAdm').value,name:$('stName').value,gender:$('stGender').value,cls:$('stClass').value,dob:$('stDob').value,parent:$('stParent').value,relation:$('stRelation').value,phone:$('stPhone').value});
 if(r.error){toast(r.error);return}
 const s=r.student;closeStudentForm();applyRole();showPage('students');
 showDetail({grad:G.green,label:'UPI No.',value:s.adm,title:'Student Registered',sub:r.saved?'Saved to this browser':'Saved for this session only',go:'students',goLabel:'View Students',
  body:sec('LEARNER',[['Name',s.name],['Class',s.cls],['Gender',s.gender]])+sec('PARENT / GUARDIAN',[['Name',s.parent+' ('+s.relation+')'],['Phone',fmtPhone(s.phone)]])+
   sec('PARENT PORTAL',r.hasAccount?[['Status','Already linked'],['Note','This child now appears in the parent’s account']]:[['Status','Not linked yet'],['Parent signs up with','School code, registered parent name and child UPI number']])+(r.siblings.length?sec('SIBLINGS',[['Linked to',r.siblings.join(', ')]]):'')});
};

/* ----- parent sign-up on the login screen ----- */
function toggleSignup(on){showAuthPanel(on?'parent':'login');}
$('showSignup').onclick=()=>toggleSignup(true);$('backToLogin').onclick=()=>toggleSignup(false);
$('signupForm').addEventListener('submit',e=>{
 e.preventDefault();
 const r=createParentAccount($('suSchoolCode').value,$('suName').value,$('suUpi').value);
 if(r.error){$('suMsg').textContent=r.error;$('suMsg').classList.remove('hidden');return}
 ['suSchoolCode','suName','suUpi'].forEach(i=>$(i).value='');toggleSignup(false);
 startSession(r.user,false);toast(`Welcome ${r.user.name}! Set a private password to continue.`);
});

/* ----- support sheet + back button ----- */
$('supportBtn').onclick=()=>{if(currentUser&&currentUser.role==='parent')openSchoolContacts();else $('supportBackdrop').classList.remove('hidden');};
$('supportClose').onclick=()=>$('supportBackdrop').classList.add('hidden');
$('supportBackdrop').addEventListener('click',e=>{if(e.target.id==='supportBackdrop')$('supportBackdrop').classList.add('hidden');});
$('backDash').onclick=()=>showPage('dashboard');

/* ================= v1.4: Editable profile (name, title, phone, email, photo) ================= */
const PROFILE_KEY='edutrack_profiles';
function loadProfiles(){try{return JSON.parse(store.get(PROFILE_KEY))||{}}catch(e){return{}}}
function applyProfiles(){const p=loadProfiles();USERS.forEach(u=>{if(p[u.id])Object.assign(u,p[u.id]);u.initials=schoolInitials(u.name);});refreshUsersModule();}
function refreshUsersModule(){modules.users.heads=['USER','USERNAME','ROLE','PHONE','LINKED LEARNERS','STATUS'];modules.users.rows=USERS.map(u=>[u.name,u.username,ROLES[u.role].label,u.phone?fmtPhone(String(u.phone).replace(/\s/g,'')):'—',u.role==='parent'?(childrenOf(u).map(c=>c.name).join(', ')||'—'):u.role==='teacher'&&u.className?'Class '+u.className:'—',u.status]);modules.users.stats=[['User Accounts',String(USERS.length)],['Parent Accounts',String(USERS.filter(u=>u.role==='parent').length)],['Signed In Now','1']];}
function paintAvatar(el,u,photo){const ph=photo===undefined?u.photo:photo;
 if(ph){el.textContent='';el.style.backgroundImage=`url(${ph})`;el.style.backgroundSize='cover';el.style.backgroundPosition='center';}
 else{el.style.backgroundImage='';el.textContent=u.initials;}}
let pendingPhoto='';
function openProfile(){
 if(!currentUser)return;const u=currentUser;pendingPhoto=u.photo||'';closeSidebar();
 $('pfName').value=u.name;$('pfTitle').value=u.title||'';$('pfPhone').value=u.phone||'';$('pfEmail').value=u.email||'';
 $('profileRole').textContent=ROLES[u.role].label+' · @'+u.username;
 paintAvatar($('profileAvatar'),u,pendingPhoto);$('pfPwRow').classList.toggle('hidden',u.role!=='parent');$('profileBackdrop').classList.remove('hidden');
}
function closeProfile(){$('profileBackdrop').classList.add('hidden');}
$('photoFile').addEventListener('change',e=>{
 const f=e.target.files[0];e.target.value='';if(!f)return;
 if(!f.type.startsWith('image/')){toast('Please choose an image file.');return}
 const rd=new FileReader();rd.onload=()=>{const img=new Image();img.onload=()=>{
  const s=Math.min(img.width,img.height),c=document.createElement('canvas');c.width=c.height=200;
  c.getContext('2d').drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,200,200);
  pendingPhoto=c.toDataURL('image/jpeg',0.85);paintAvatar($('profileAvatar'),currentUser,pendingPhoto);
 };img.onerror=()=>toast('Could not read that image.');img.src=rd.result;};rd.readAsDataURL(f);
});
$('photoRemove').onclick=()=>{pendingPhoto='';paintAvatar($('profileAvatar'),{initials:schoolInitials($('pfName').value||currentUser.name)},'');};
$('pfName').addEventListener('input',()=>{if(!pendingPhoto)paintAvatar($('profileAvatar'),{initials:schoolInitials($('pfName').value||'?')},'');});
$('profileSave').onclick=()=>{
 const name=$('pfName').value.trim(),email=$('pfEmail').value.trim(),phone=$('pfPhone').value.trim();
 if(!name){toast('Please enter your full name.');return}
 if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){toast('That email address does not look right.');return}
 if(phone&&!/^[0-9+\s()-]{7,20}$/.test(phone)){toast('That phone number does not look right.');return}
 const u=currentUser;Object.assign(u,{name,title:$('pfTitle').value.trim(),phone,email,photo:pendingPhoto});u.initials=schoolInitials(name);
 const p=loadProfiles();p[u.id]={name:u.name,title:u.title,phone:u.phone,email:u.email,photo:u.photo};
 const ok=store.set(PROFILE_KEY,JSON.stringify(p));
 refreshUsersModule();applyRole();closeProfile();showPage(activePage());
 toast(ok?'Profile saved.':'Saved for this session only (browser storage is unavailable).');
};
$('profileClose').onclick=closeProfile;$('profileCancel').onclick=closeProfile;
$('profileBackdrop').addEventListener('click',e=>{if(e.target.id==='profileBackdrop')closeProfile();});
document.querySelector('.user-mini').addEventListener('click',openProfile);
applyProfiles();


/* ================= v1.8: Class Register (month view, tap to mark present / absent) ================= */
const REG_KEY='edutrack_register';
let REG={};   // attendance of the signed-in school, loaded from Firestore after sign-in
const REG_DIRTY=new Map();
modules.register={title:'Class Register',subtitle:'Mark every learner present or absent, day by day.',stats:[['Learners','0'],['Present Today','0'],['Absent Today','0']],heads:['ITEM'],rows:[]};
PAGE_NAMES.register='Class Register';
ROLES.teacher.pages.push('register');
const MONTH_FULL=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
const DOW=['SUN','MON','TUE','WED','THU','FRI','SAT'];
let TEACHER_CLASS='Grade 4';
let regY=new Date().getFullYear(),regM=new Date().getMonth(),regClass=TEACHER_CLASS,regWeekend=false,regScroll=true;
const regKey=(y,m)=>y+'-'+String(m+1).padStart(2,'0');
function regGet(y,m,adm,d){return((REG[regKey(y,m)]||{})[adm]||{})[d]||'';}
function regSave(){flushRegister();try{refreshAttendanceRows()}catch(e){}return true;}
async function flushRegister(){
 if(!REG_DIRTY.size||!currentUser)return;
 const items=[...REG_DIRTY.values()];REG_DIRTY.clear();
 const byAdm={};allStudents().forEach(s=>{byAdm[s.adm]=s});
 const entries=items.map(it=>{const st=byAdm[it.adm];return st?{adm:it.adm,cls:st.cls,month:it.month,marks:(REG[it.month]||{})[it.adm]||{}}:null}).filter(Boolean);
 try{await KlasoraFirebase.saveAttendance(currentUser.schoolId,entries);}
 catch(e){items.forEach(it=>REG_DIRTY.set(it.adm+'|'+it.month,it));toast(e.code==='permission-denied'?'You do not have permission to mark this class.':'Attendance not saved yet. Check your internet; it will retry on your next change.');}
}
function refreshAttendanceRows(){
 const byAdm={};allStudents().forEach(s=>{byAdm[s.adm]=s});const g={};
 Object.keys(REG).forEach(k=>{const y=+k.slice(0,4),m=+k.slice(5,7)-1;Object.entries(REG[k]||{}).forEach(([adm,days])=>{const st=byAdm[adm];if(!st)return;Object.entries(days).forEach(([d,v])=>{const key=new Date(y,m,+d).getTime()+'|'+st.cls;const x=g[key]=g[key]||{t:new Date(y,m,+d),cls:st.cls,p:0,a:0};if(v==='P')x.p++;else if(v==='A')x.a++;});});});
 const MS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 modules.attendance.rows=Object.values(g).sort((a,b)=>b.t-a.t||a.cls.localeCompare(b.cls)).slice(0,80).map(x=>[x.t.getDate()+' '+MS[x.t.getMonth()]+' '+x.t.getFullYear(),x.cls,String(x.p),String(x.a),(x.p+x.a?(x.p/(x.p+x.a)*100).toFixed(1):'0')+'%']);
 const n=new Date();let P=0,A=0;allStudents().forEach(s=>{const v=regGet(n.getFullYear(),n.getMonth(),s.adm,n.getDate());if(v==='P')P++;else if(v==='A')A++;});
 modules.attendance.stats=[['Present Today',String(P)],['Absent Today',String(A)],['Late Arrivals','0']];
}
function regPut(y,m,adm,d,v){const k=regKey(y,m);REG_DIRTY.set(adm+'|'+k,{adm,month:k});REG[k]=REG[k]||{};REG[k][adm]=REG[k][adm]||{};if(v)REG[k][adm][d]=v;else delete REG[k][adm][d];}
function classStudents(cls){return allStudents().filter(s=>s.cls===cls&&s.status==='Active').sort((a,b)=>a.name.localeCompare(b.name));}
function regCounts(y,m,d,list){let p=0,a=0;list.forEach(s=>{const v=regGet(y,m,s.adm,d);if(v==='P')p++;else if(v==='A')a++;});return{p,a,marked:p+a>0};}
function todayCounts(cls){const n=new Date(),l=classStudents(cls),c=regCounts(n.getFullYear(),n.getMonth(),n.getDate(),l);c.n=l.length;return c;}
function teacherStats(page){
 if(page==='classes'){const c=clsTeacher(TEACHER_CLASS);return[['My Class',c.name],['Learners',String(classStudents(TEACHER_CLASS).length)],['Room',c.room||'-']];}
 if(page!=='students'&&page!=='attendance')return null;const t=todayCounts(TEACHER_CLASS);
 return page==='students'?[['My Learners',String(t.n)],['Present Today',t.marked?String(t.p):'—'],['Absent Today',t.marked?String(t.a):'—']]:[['Present Today',t.marked?String(t.p):'—'],['Absent Today',t.marked?String(t.a):'—'],['Not Marked',String(t.n-t.p-t.a)]];}
DASH_STATS.teacher=()=>{const t=todayCounts(TEACHER_CLASS);const cn=clsTeacher(TEACHER_CLASS);return[['My Class',cn.name,cn.room||'-','blue','▤'],['Learners',String(t.n),'class size','purple','♙'],['Present Today',t.marked?String(t.p):'—',t.marked?t.a+' absent':'not marked yet','green','✓'],resultsCard()];};

/* marks feed the parent portal */
function registerRecords(adm){
 const out=[],cutoff=Date.now()-90*86400000;
 Object.keys(REG).forEach(k=>{const marks=(REG[k]||{})[adm];if(!marks)return;const y=+k.slice(0,4),m=+k.slice(5,7)-1;
  Object.keys(marks).forEach(d=>{const dt=new Date(y,m,+d);if(dt.getTime()<cutoff)return;out.push({ts:dt.getTime(),date:String(+d).padStart(2,'0')+' '+MONTHS[m]+' '+y,day:DOW[dt.getDay()].charAt(0)+DOW[dt.getDay()].slice(1).toLowerCase(),status:marks[d]==='P'?'Present':'Absent'});});});
 return out.sort((a,b)=>b.ts-a.ts);}
function childRecords(s){
 const r=childRecordsBase(s),rg=registerRecords(s.adm);
 if(rg.length){r.att=rg.slice(0,5).map(x=>({date:x.date,day:x.day,status:x.status,arrival:'-',note:'Marked by class teacher'}));r.rate=Math.round(rg.filter(x=>x.status==='Present').length/rg.length*100);}
 const rr=latestReport(s);if(rr){r.exams=rr.rows.map(x=>[rr.label,x.subject,Math.round(x.pct)]);r.avg=Math.round(rr.avg);}
 return r;}

/* ----- the register page ----- */
function renderRegister(){
 if(!currentUser)return;const teacher=currentUser.role==='teacher';regClass=teacher?TEACHER_CLASS:normKey(regClass);
 const now=new Date(),ty=now.getFullYear(),tm=now.getMonth(),td=now.getDate(),days=new Date(regY,regM+1,0).getDate(),list=classStudents(regClass);
 const future=d=>regY>ty||(regY===ty&&(regM>tm||(regM===tm&&d>td)));
 const _ct=clsTeacher(regClass),ct=[_ct.name,_ct.teacher];
 const tc=todayCounts(regClass),classes=[...new Set([...classKeys(),...allStudents().map(s=>s.cls)])];
 let head='',foot1='',foot2='';
 const dayInfo=[];for(let d=1;d<=days;d++){const dow=new Date(regY,regM,d).getDay();dayInfo.push({d,dow,wk:dow===0||dow===6,today:regY===ty&&regM===tm&&d===td,ws:dow===1&&d>1});}
 head=dayInfo.map(x=>`<th class="rh${x.wk?' wk':''}${x.today?' today':''}${x.ws?' wkstart':''}">${DOW[x.dow]}</th>`).join('');
 const rows=list.map((s,i)=>{let p=0,a=0;
  const cells=dayInfo.map(x=>{const v=regGet(regY,regM,s.adm,x.d);if(v==='P')p++;else if(v==='A')a++;const off=future(x.d)||(x.wk&&!regWeekend);
   return`<td class="rc${teacher?'':' ro'}${v==='P'?' p':v==='A'?' a':''}${off?' off':''}${x.wk?' wk':''}${x.today?' today':''}${x.ws?' wkstart':''}" data-adm="${s.adm}" data-d="${x.d}"><span class="rd">${x.d}</span><span class="rm">${v==='P'?'✅':v==='A'?'❌':''}</span></td>`;}).join('');
  return`<tr><td class="rnum">${i+1}</td><td class="rname">${escH(s.name)}</td>${cells}<td class="rt rtp">${p}</td><td class="rt rta">${a}</td><td class="rt">${p+a?Math.round(p/(p+a)*100)+'%':'—'}</td></tr>`;}).join('');
 const tot=(v)=>dayInfo.map(x=>{const c=regCounts(regY,regM,x.d,list);const n=v==='P'?c.p:c.a;return`<td class="rf${x.wk?' wk':''}">${c.marked?n:''}</td>`;}).join('');
 $('registerPage').innerHTML=`
 <div class="reg-banner"><button class="reg-nav" data-reg="prev" aria-label="Previous month">‹</button>
  <div class="reg-title"><span class="reg-month">${MONTH_FULL[regM]}</span><span class="reg-year">${regY}</span><small>${ct?ct[0]:regClass} · ${list.length} learner${list.length===1?'':'s'}${ct[1]?' · Class teacher: '+ct[1]:''}</small></div>
  <button class="reg-nav" data-reg="next" aria-label="Next month">›</button></div>
 <div class="reg-tools">
  <div class="reg-chips"><span class="reg-chip g">✅ ${tc.p} present today</span><span class="reg-chip r">❌ ${tc.a} absent today</span><span class="reg-chip n">⏳ ${tc.n-tc.p-tc.a} not marked</span></div>
  <div class="reg-btns">${teacher?'':`<select id="regClassSel" class="reg-select">${classes.map(c=>`<option${c===regClass?' selected':''}>${c}</option>`).join('')}</select>`}
   <button class="reg-btn gold" data-reg="today">Today</button>${teacher?`<button class="reg-btn green" data-reg="allpresent">✅ All present today</button>
   <button class="reg-btn${regWeekend?' on':''}" data-reg="weekend">Weekends: ${regWeekend?'On':'Off'}</button>`:''}<button class="reg-btn" data-reg="export">⬇ Excel</button></div></div>
 ${teacher?'':'<div class="bk-note ro-note">👁 <b>View only.</b> The class teacher marks the register. You can look at any class and month here, but you cannot change it.</div>'}
 ${list.length?`<div class="reg-wrap" id="regWrap"><table class="reg-table"><thead><tr><th class="rcorner rnum">#</th><th class="rcorner rname">LEARNER</th>${head}<th class="rh rthead">P</th><th class="rh rthead">A</th><th class="rh rthead">%</th></tr></thead><tbody>${rows}</tbody>
  <tfoot><tr><td class="rnum"></td><td class="rname rfl">PRESENT</td>${tot('P')}<td colspan="3"></td></tr><tr><td class="rnum"></td><td class="rname rfl">ABSENT</td>${tot('A')}<td colspan="3"></td></tr></tfoot></table></div>
  <p class="reg-help">${teacher?'Tap a box once for ✅ present, again for ❌ absent, a third time to clear. Weekends and future dates are locked.':'This register is marked by the class teacher. You are viewing it only.'}</p>`:`<div class="bk-note">There are no active learners in ${regClass} yet. Register or import students first.</div>`}`;
 if(regScroll){regScroll=false;const w=$('regWrap'),t=document.querySelector('#registerPage td.rc.today');if(w&&t)w.scrollLeft=Math.max(0,t.offsetLeft-190);}
}
function regRerender(){const w=$('regWrap'),sl=w?w.scrollLeft:0,st=w?w.scrollTop:0;renderRegister();const n=$('regWrap');if(n){n.scrollLeft=sl;n.scrollTop=st;}}
function exportRegister(){
 const days=new Date(regY,regM+1,0).getDate(),list=classStudents(regClass),ds=[];for(let d=1;d<=days;d++)ds.push(d+' '+DOW[new Date(regY,regM,d).getDay()]);
 const rows=list.map((s,i)=>{let p=0,a=0;const c=ds.map((x,k)=>{const v=regGet(regY,regM,s.adm,k+1);if(v==='P')p++;else if(v==='A')a++;return v;});return[i+1,s.name,s.adm,...c,p,a];});
 downloadXlsx([{name:(MONTH_FULL[regM]+' '+regY).slice(0,31),heads:['No.','Learner','UPI No',...ds,'Present','Absent'],rows}],`EduTrack_Register_${slug(regClass)}_${MONTH_FULL[regM]}_${regY}.xlsx`);
 toast('Register exported (P = present, A = absent).');}
$('registerPage').addEventListener('click',e=>{
 const b=e.target.closest('[data-reg]');
 if(b){const a=b.dataset.reg;
  if((a==='allpresent'||a==='weekend')&&(!currentUser||currentUser.role!=='teacher')){toast('Only the class teacher can mark the register.');return}
  if(a==='prev'||a==='next'){regM+=a==='next'?1:-1;if(regM<0){regM=11;regY--}if(regM>11){regM=0;regY++}regScroll=true;renderRegister();}
  else if(a==='today'){const n=new Date();regY=n.getFullYear();regM=n.getMonth();regScroll=true;renderRegister();}
  else if(a==='weekend'){regWeekend=!regWeekend;regRerender();}
  else if(a==='export')exportRegister();
  else if(a==='allpresent'){const n=new Date(),dow=n.getDay();if((dow===0||dow===6)&&!regWeekend){toast('Today is a weekend. Turn Weekends on first.');return}
   let c=0;classStudents(regClass).forEach(s=>{if(!regGet(n.getFullYear(),n.getMonth(),s.adm,n.getDate())){regPut(n.getFullYear(),n.getMonth(),s.adm,n.getDate(),'P');c++;}});
   regSave();if(regY!==n.getFullYear()||regM!==n.getMonth()){regY=n.getFullYear();regM=n.getMonth();regScroll=true;}regRerender();toast(c?c+' learner'+(c===1?'':'s')+' marked present. Tap any box to change.':'Everyone is already marked for today.');}
  return;}
 const td=e.target.closest('td.rc');if(!td)return;
 if(!currentUser||currentUser.role!=='teacher'){toast('View only. The class teacher marks the register.');return}
 if(td.classList.contains('off')){const n=new Date(),d=+td.dataset.d,fut=regY>n.getFullYear()||(regY===n.getFullYear()&&(regM>n.getMonth()||(regM===n.getMonth()&&d>n.getDate())));toast(fut?'You cannot mark a future date.':'Weekend is locked. Tap Weekends to allow marking.');return}
 const adm=td.dataset.adm,d=+td.dataset.d,cur=regGet(regY,regM,adm,d);regPut(regY,regM,adm,d,cur===''?'P':cur==='P'?'A':'');
 if(!regSave())toast('Saved for this session only (browser storage is unavailable).');regRerender();});
$('registerPage').addEventListener('change',e=>{if(e.target.id==='regClassSel'){regClass=e.target.value;regRerender();}});


/* ================= v1.9: Subjects, results entry, CBC results, report cards ================= */
const RES_KEY='edutrack_results',SUBJ_KEY='edutrack_subjects',STUSUBJ_KEY='edutrack_stusubj';
let RES={marks:{},notes:{},gen:{}},SUBJ={added:{},removed:{}},STUSUBJ={};
const RES_DIRTY=new Set();
const saveRes=()=>{flushResults();return true;},saveSubj=()=>{saveConfigRemote();return true;},saveStuSubj=()=>{saveMetaRemote('stusubj',STUSUBJ);return true;};
async function flushResults(){
 if(!RES_DIRTY.size||!currentUser)return;
 const items=[...RES_DIRTY];RES_DIRTY.clear();
 const byAdm={};allStudents().forEach(s=>{byAdm[s.adm]=s});
 const entries=items.map(it=>{const[adm,k]=it.split('|'),st=byAdm[adm];if(!st)return null;const p=k.split('-');
  return{adm,cls:st.cls,examKey:k,marks:(RES.marks[k]||{})[adm]||{},note:((RES.notes[p[0]+'-'+p[1]]||{})[adm])||null,gen:RES.gen[k+'|'+st.cls]||''};}).filter(Boolean);
 try{await KlasoraFirebase.saveResults(currentUser.schoolId,entries);}
 catch(e){items.forEach(i=>RES_DIRTY.add(i));toast(e.code==='permission-denied'?'You do not have permission to save these results.':'Results not saved yet. Check your internet; they will retry on your next change.');}
}
async function saveMetaRemote(key,val){
 if(!currentUser||currentUser.role==='parent')return;
 try{await KlasoraFirebase.saveMeta(currentUser.schoolId,key,val);}
 catch(e){toast(e.code==='permission-denied'?'Only the school administrator can change this setting.':'Setting not saved. Check your internet and try again.');}
}
function saveConfigRemote(){return saveMetaRemote('config',{subj:SUBJ,ts:TS});}
['Grade 10','Grade 11','Grade 12'].forEach(g=>{if(!CLASS_LIST.includes(g))CLASS_LIST.push(g)});
modules.subjects={title:'Subjects',subtitle:'Subjects taught in each grade. Add or remove subjects for your school.',stats:[['Grades','12'],['Subjects','0'],['Custom','0']],heads:['ITEM'],rows:[]};
PAGE_NAMES.subjects='Subjects';ROLES.teacher.pages.push('subjects');

/* ----- CBC levels (one place, used everywhere) ----- */
const CBC_BANDS=[[75,'EE'],[41,'ME'],[21,'AE'],[0,'BE']],LEVEL_NAME={EE:'Exceeding Expectations',ME:'Meeting Expectations',AE:'Approaching Expectations',BE:'Below Expectations'};
function levelCode(p){for(const b of CBC_BANDS)if(p>=b[0])return b[1];return'BE';}
function parseScore(v){const s=String(v==null?'':v).trim();if(!s)return{empty:true};
 let m=s.match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
 if(m){const a=+m[1],b=+m[2];if(!b||a>b)return{error:1};return{raw:s,pct:Math.round(a/b*1000)/10};}
 m=s.match(/^(\d+(?:\.\d+)?)\s*%?$/);if(m){const p=+m[1];if(p>100)return{error:1};return{raw:s,pct:p};}return{error:1};}

/* ----- subjects per grade (from the CBC lists) ----- */
const RE_FULL='Religious Education (CRE, IRE or HRE)',FOREIGN='Foreign / Additional Language (where offered)';
const DEF_PP=['Language Activities','Mathematical Activities','Environmental Activities','Psychomotor and Creative Activities','Religious Activities'];
const DEF_13=['English','Kiswahili (or Kenyan Sign Language)','Mathematics','Environmental Activities','Creative Activities',RE_FULL];
const DEF_46=['English','Kiswahili','Mathematics','Science and Technology','Social Studies','Agriculture','Creative Arts',RE_FULL,FOREIGN];
const DEF_79=['English','Kiswahili','Mathematics','Integrated Science','Social Studies','Agriculture','Pre-Technical Studies','Creative Arts and Sports',RE_FULL,FOREIGN];
const SENIOR_GROUPS=[
 ['Compulsory',['English','Kiswahili or Kenyan Sign Language (KSL)','Core Mathematics','Essential Mathematics','Community Service Learning (CSL)']],
 ['STEM: Pure Sciences',['Biology','Chemistry','Physics','General Science']],
 ['STEM: Applied Sciences',['Agriculture','Computer Studies','Home Science']],
 ['STEM: Technical Studies',['Aviation','Building Construction','Electricity','Metalwork','Power Mechanics','Woodwork','Media Technology','Marine and Fisheries Technology']],
 ['Social Sciences: Languages and Literature',['Literature in English','Indigenous Languages','Fasihi ya Kiswahili','Sign Language','Arabic','French','German','Mandarin Chinese']],
 ['Social Sciences: Humanities and Business',['Christian Religious Education (CRE)','Islamic Religious Education (IRE)','Hindu Religious Education (HRE)','Business Studies','History and Citizenship','Geography']],
 ['Arts and Sports Science',['Sports and Recreation','Music and Dance','Theatre and Film','Fine Arts']],
 ['Other learning components',['Physical Education (PE)','ICT skills','Pastoral or Religious Programme of Instruction (P/RPI)']]];
const SENIOR_DEFAULT=['English','Kiswahili or Kenyan Sign Language (KSL)','Core Mathematics','Community Service Learning (CSL)'];
const isSenior=g=>/^Grade (10|11|12)$/.test(gradeOf(g)||'');
function defaultsFor(g){g=gradeOf(g);return g==='PP1'||g==='PP2'?DEF_PP:/^Grade [123]$/.test(g)?DEF_13:/^Grade [456]$/.test(g)?DEF_46:isSenior(g)?SENIOR_GROUPS.flatMap(x=>x[1]):DEF_79;}
function subjectsFor(g){g=gradeOf(g);const rem=SUBJ.removed[g]||[],add=SUBJ.added[g]||[];return[...defaultsFor(g).filter(x=>!rem.includes(x)),...add.filter(x=>!defaultsFor(g).includes(x))];}
function seniorGroups(g){g=gradeOf(g);const rem=SUBJ.removed[g]||[],gr=SENIOR_GROUPS.map(x=>[x[0],x[1].filter(s=>!rem.includes(s))]).filter(x=>x[1].length),add=SUBJ.added[g]||[];if(add.length)gr.push(['Added by your school',add]);return gr;}
const ABBR={'English':'ENG','Kiswahili':'KIS','Mathematics':'MAT','Science and Technology':'SCI','Integrated Science':'SCI','Social Studies':'SST','Agriculture':'AGR','Creative Arts':'ART','Creative Activities':'CRA','Environmental Activities':'ENV','Pre-Technical Studies':'PTS','Creative Arts and Sports':'CAS',[RE_FULL]:'CRE',[FOREIGN]:'FOR','Kiswahili (or Kenyan Sign Language)':'KIS','Core Mathematics':'CMA','Essential Mathematics':'EMA','Kiswahili or Kenyan Sign Language (KSL)':'KIS'};
function abbr(n){if(ABBR[n])return ABBR[n];const w=n.replace(/\(.*?\)/g,'').replace(/[^A-Za-z ]/g,' ').split(/\s+/).filter(Boolean);return(w.length>1?w.map(x=>x[0]).join('').slice(0,3):(w[0]||n).slice(0,3)).toUpperCase();}
function learnerSubjects(s){return learnerSubjectsAt(s,s.cls);}
function addSubject(g,name){g=gradeOf(g);name=cleanTxt(name);if(!name)return'Type the subject name first.';
 if(subjectsFor(g).some(x=>x.toLowerCase()===name.toLowerCase()))return name+' is already in the list.';
 SUBJ.removed[g]=(SUBJ.removed[g]||[]).filter(x=>x.toLowerCase()!==name.toLowerCase());
 const d=defaultsFor(g).find(x=>x.toLowerCase()===name.toLowerCase());if(!d)SUBJ.added[g]=[...(SUBJ.added[g]||[]),name];saveSubj();return'';}
function removeSubject(g,name){g=gradeOf(g);if((SUBJ.added[g]||[]).includes(name))SUBJ.added[g]=SUBJ.added[g].filter(x=>x!==name);else SUBJ.removed[g]=[...(SUBJ.removed[g]||[]),name];saveSubj();}

/* ----- marks, notes, terms ----- */
const EXAMS=[['OP','Opener'],['MID','Mid Term'],['END','End Term']];
const examLabel=c=>(EXAMS.find(e=>e[0]===c)||[0,c])[1];
const currentTerm=()=>{const m=new Date().getMonth();return m<4?1:m<8?2:3;};
let exTerm=currentTerm(),exType='END',exYear=new Date().getFullYear(),exView='list';
const exKey=(y=exYear,t=exTerm,e=exType)=>y+'-T'+t+'-'+e;
const marksOf=(adm,k=exKey())=>((RES.marks[k]||{})[adm])||{};
const noteOf=(adm,k=exKey())=>{const p=k.split('-');return((RES.notes[p[0]+'-'+p[1]]||{})[adm])||{};};
function learnerProgress(s,k=exKey()){const subs=learnerSubjects(s),m=marksOf(s.adm,k),done=subs.filter(x=>m[x]&&m[x].pct!=null).length,v=subs.map(x=>m[x]).filter(Boolean).map(x=>x.pct);return{total:subs.length,done,avg:v.length?v.reduce((a,b)=>a+b,0)/v.length:null};}
function recordMarks(adm,k,map,note){
 const s=allStudents().find(x=>x.adm===adm);if(!s)return;const shown=Object.keys(map),prev=marksOf(adm,k),out={};
 Object.keys(prev).forEach(x=>{if(!shown.includes(x))out[x]=prev[x];});Object.keys(map).forEach(x=>{if(map[x])out[x]=map[x];});
 RES.marks[k]=RES.marks[k]||{};if(Object.keys(out).length)RES.marks[k][adm]=out;else delete RES.marks[k][adm];
 if(note){const p=k.split('-'),nk=p[0]+'-'+p[1];RES.notes[nk]=RES.notes[nk]||{};RES.notes[nk][adm]=note;}RES_DIRTY.add(adm+'|'+k);saveRes();}
function orderedSubjects(s,m){const base=learnerSubjects(s).filter(x=>m[x]);return[...base,...Object.keys(m).filter(x=>!base.includes(x))];}
function buildClassResults(k,cls){
 const list=examStudents(cls,k),rows=list.map(s=>{const m=marksOf(s.adm,k),subs=orderedSubjects(s,m),v=subs.map(x=>m[x].pct),avg=v.length?v.reduce((a,b)=>a+b,0)/v.length:null;return{s,m,subs,avg};});
 const cols=[];rows.forEach(r=>r.subs.forEach(x=>{if(!cols.includes(x))cols.push(x);}));
 const ref=list[0]?learnerSubjects(list[0]):[];cols.sort((a,b)=>{const i=ref.indexOf(a),j=ref.indexOf(b);return(i<0?99:i)-(j<0?99:j);});
 const ranked=rows.filter(r=>r.avg!==null).sort((a,b)=>b.avg-a.avg||a.s.name.localeCompare(b.s.name)),none=rows.filter(r=>r.avg===null);
 return{cols,ranked,none,n:list.length};}
function reportOrder(k){const p=k.split('-');return(+p[0])*100+(+p[1].slice(1))*10+EXAMS.findIndex(e=>e[0]===p[2])+1;}
function reportKeys(s){return Object.keys(RES.gen).map(x=>x.split('|')).filter(x=>classHistory(s).includes(x[1])&&RES.marks[x[0]]&&RES.marks[x[0]][s.adm]&&Object.keys(RES.marks[x[0]][s.adm]).length).map(x=>x[0]).sort((a,b)=>reportOrder(b)-reportOrder(a));}
function latestReport(s){const k=reportKeys(s)[0];if(!k)return null;const m=marksOf(s.adm,k),subs=orderedSubjects(s,m),v=subs.map(x=>m[x].pct);return{k,label:'Term '+k.split('-')[1].slice(1)+' '+examLabel(k.split('-')[2]),rows:subs.map(x=>({subject:x,pct:m[x].pct})),avg:v.reduce((a,b)=>a+b,0)/v.length};}
function termAttendance(adm,y,term){let p=0,a=0;const from=(term-1)*4,to=term===3?11:from+3;for(let m=from;m<=to;m++){const d=((REG[regKey(y,m)]||{})[adm])||{};Object.keys(d).forEach(x=>{if(d[x]==='P')p++;else if(d[x]==='A')a++;});}return{p,a};}
function resultsCard(){const l=classStudents(TEACHER_CLASS),k=exKey(),ent=l.filter(s=>{const p=learnerProgress(s,k);return p.total>0&&p.done===p.total;}).length;return['Results Entered',ent+'/'+l.length,'Term '+exTerm+' · '+examLabel(exType),'orange','▣'];}
const clsTeacher=c=>{const k=normKey(c),at=teacherOf(k);return{name:k,teacher:at?at.name:'',room:'-'};};

/* ----- CBC report card (parent view, teacher preview) ----- */
function reportCardHtml(s,k){
 const p=k.split('-'),term=+p[1].slice(1),m=marksOf(s.adm,k),subs=orderedSubjects(s,m),note=noteOf(s.adm,k),att=termAttendance(s.adm,+p[0],term),sch=getSchool(),ct=clsTeacher(reportClass(s,k)),ht=modules.teachers.rows.find(r=>/headteacher/i.test(r[2]));
 const li=a=>(a&&a.length?a:['-']).map(x=>`<li>${escH(x)}</li>`).join('');
 return`<div class="report-card"><div class="rc-head">${sch.logo?`<img src="${sch.logo}" alt="">`:''}<div><div class="rc-school">${escH(sch.name.toUpperCase())}</div><div class="rc-sub">LEARNER’S PROGRESS REPORT · CBC</div></div></div>
 <div class="rc-info"><div><b>LEARNER’S NAME:</b> ${escH(s.name.toUpperCase())}</div><div><b>GRADE:</b> ${escH(reportClass(s,k).replace('Grade ',''))}</div><div><b>TERM:</b> TERM ${term}</div><div><b>YEAR:</b> ${p[0]}</div><div><b>ASSESSMENT:</b> ${examLabel(p[2]).toUpperCase()}</div></div>
 <table class="rc-table"><thead><tr><th>LEARNING AREA</th><th>ACHIEVEMENT LEVEL</th></tr></thead><tbody>${subs.map(x=>{const l=levelCode(m[x].pct);return`<tr><td>${escH(x)}</td><td><span class="lv ${l}">${l}</span></td></tr>`;}).join('')}</tbody></table>
 <div class="rc-key"><b>ACHIEVEMENT LEVEL KEY:</b><br>${Object.keys(LEVEL_NAME).map(c=>`<span class="lv ${c}">${c}</span> – ${LEVEL_NAME[c]}`).join('<br>')}</div>
 <div class="rc-block"><b>TEACHER’S COMMENT:</b><p>${escH(note.comment||'-')}</p></div>
 <div class="rc-block"><b>AREAS OF STRENGTH:</b><ul>${li(note.strengths)}</ul></div>
 <div class="rc-block"><b>AREAS NEEDING IMPROVEMENT:</b><ul>${li(note.improve)}</ul></div>
 <div class="rc-block"><b>ATTENDANCE:</b><br>Days Present: ${att.p}<br>Days Absent: ${att.a}</div>
 <div class="rc-sign"><div><b>CLASS TEACHER:</b> ${escH(ct.teacher)} ______________________</div><div><b>HEADTEACHER:</b> ${ht?escH(ht[0]):''} _______________________</div></div>
 <div class="rc-block"><b>PARENT/GUARDIAN COMMENT:</b><br>____________________________________</div><div class="rc-block"><b>SIGNATURE:</b> ________________</div></div>`;}
function openCardModal(adm,k){const s=allStudents().find(x=>x.adm===adm);if(!s)return;
 $('cardModal').innerHTML=`<div class="modal-head"><div><h3>Report card</h3><p>${escH(s.name)}</p></div><button class="modal-close" data-card="close">×</button></div>${reportCardHtml(s,k)}<div class="modal-actions"><button type="button" class="btn btn-light" data-card="close">Close</button><button type="button" class="btn btn-primary" data-card="print">Print / Save PDF</button></div>`;
 $('cardBackdrop').classList.remove('hidden');}
$('cardBackdrop').addEventListener('click',e=>{if(e.target.id==='cardBackdrop'||(e.target.dataset&&e.target.dataset.card==='close'))$('cardBackdrop').classList.add('hidden');if(e.target.dataset&&e.target.dataset.card==='print'){document.body.classList.add('print-card');window.print();setTimeout(()=>document.body.classList.remove('print-card'),800);}});

/* ----- teacher: Examination page ----- */
function renderExams(){updateBell();currentUser.role==='parent'?renderParentReports():renderTeacherExams();}
function exBox(key,g,icon,label,value,sub){return`<button type="button" class="mini-stat ms-card" data-ex="${key}" style="--g1:${G[g][0]};--g2:${G[g][1]};--glow:${G[g][1]}59"><span class="ms-icon">${icon}</span><small>${label}</small><strong>${value}</strong><span class="ms-tap">${sub}</span></button>`;}
function renderTeacherExams(){
 if(exView==='results'){renderResultsView();return}
 const cls=TEACHER_CLASS,list=examStudents(cls,exKey()),k=exKey(),prog=list.map(s=>({s,p:learnerProgress(s,k)})),ent=prog.filter(x=>x.p.total>0&&x.p.done===x.p.total).length;
 const assessed=EXAMS.filter(e=>Object.keys(RES.marks[exKey(exYear,exTerm,e[0])]||{}).some(a=>list.some(s=>s.adm===a))).length;
 const gen=RES.gen[k+'|'+cls];
 $('examsPage').innerHTML=`<div class="reg-banner ex-banner"><div class="reg-title"><span class="reg-month">TERM ${exTerm}</span><span class="reg-year">${exYear}</span><small>${clsTeacher(cls).name} · ${examLabel(exType)} · ${list.length} learner${list.length===1?'':'s'}</small></div></div>
 <div class="reg-tools"><div class="reg-btns"><select id="exTermSel" class="reg-select">${[1,2,3].map(t=>`<option value="${t}"${t===exTerm?' selected':''}>Term ${t}</option>`).join('')}</select><select id="exTypeSel" class="reg-select">${EXAMS.map(e=>`<option value="${e[0]}"${e[0]===exType?' selected':''}>${e[1]}</option>`).join('')}</select>${exTerm===3&&list.length?'<button type="button" class="reg-btn gold" data-nt="promote">🎓 Promote learners</button>':''}</div></div>
 ${promoBannerHtml(currentUser)}
 <div class="module-stats ex-boxes">${exBox('assess','indigo','📝','Assessments',assessed+' of 3','this term')+exBox('entered','purple','✍️','Results Entered',ent+'/'+list.length,'tap to enter')+exBox('generate','green','🏆','Generate Results','CBC','tap to generate')}</div>
 ${gen?`<div class="bk-note ok">Results were generated on ${new Date(gen).toLocaleDateString('en-GB')}. Parents can now see report cards. Enter changes and generate again to update.</div>`:''}
 <div class="section-title">LEARNERS · TAP A NAME TO ENTER RESULTS</div>
 <div class="ex-list" id="exList">${list.length?prog.map((x,i)=>{const p=x.p,st=p.total===0?['Choose subjects','o']:p.done===0?['Not started','n']:p.done<p.total?['In progress','o']:['Complete','g'];
  return`<button type="button" class="ex-row" data-learner="${x.s.adm}"><span class="ex-num">${String(i+1).padStart(2,'0')}</span><span class="ex-name">${escH(x.s.name)}<small>${p.total?p.done+' of '+p.total+' subjects'+(p.avg!==null?' · avg '+Math.round(p.avg)+'%':''):'Subjects not chosen yet'}</small></span><span class="pill ${st[1]}">${st[0]}</span></button>`;}).join(''):'<div class="bk-note">There are no active learners in '+cls+' yet.</div>'}</div>`;}
function generateResults(){
 const k=exKey(),r=buildClassResults(k,TEACHER_CLASS);
 if(!r.ranked.length){toast('Enter results for at least one learner first.');return}
 RES.gen[k+'|'+TEACHER_CLASS]=new Date().toISOString();classStudents(TEACHER_CLASS).forEach(s=>{if((RES.marks[k]||{})[s.adm])RES_DIRTY.add(s.adm+'|'+k)});saveRes();exView='results';renderExams();window.scrollTo(0,0);}
function renderResultsView(){
 const k=exKey(),r=buildClassResults(k,TEACHER_CLASS),ct=clsTeacher(TEACHER_CLASS);
 const cell=x=>`<td><span class="lv ${levelCode(x)}">${levelCode(x)}</span></td>`;
 $('examsPage').innerHTML=`<div class="reg-banner ex-banner"><div class="reg-title"><span class="reg-month">CBC RESULTS</span><small>${escH(ct.name)} · Term ${exTerm} ${exYear} · ${examLabel(exType)}</small></div></div>
 <div class="reg-tools"><div class="reg-btns"><button class="reg-btn" data-ex="back">‹ Back to examinations</button><button class="reg-btn" data-ex="excel">⬇ Excel</button><button class="reg-btn" data-ex="print">Print</button></div></div>
 <div class="cbc-key"><div class="cbc-key-h"><span>Code</span><span>Meaning</span></div>${Object.keys(LEVEL_NAME).map(c=>`<div><span class="lv ${c}">${c}</span><span>${LEVEL_NAME[c]}</span></div>`).join('')}</div>
 <div class="section-title">CLASS RESULTS (${r.n} LEARNER${r.n===1?'':'S'})</div>
 <div class="reg-wrap"><table class="cbc-table"><thead><tr><th>NO.</th><th class="cn">LEARNER</th>${r.cols.map(c=>`<th title="${escH(c)}">${abbr(c)}</th>`).join('')}<th>AVG</th></tr></thead><tbody>
 ${r.ranked.map((x,i)=>`<tr data-card="${x.s.adm}"><td>${String(i+1).padStart(2,'0')}</td><td class="cn">${escH(x.s.name)}</td>${r.cols.map(c=>x.m[c]?cell(x.m[c].pct):'<td>-</td>').join('')}<td><b>${Math.round(x.avg)}%</b></td></tr>`).join('')}
 ${r.none.map(x=>`<tr class="nomarks"><td>-</td><td class="cn">${escH(x.s.name)}</td><td colspan="${r.cols.length+1}">No marks entered yet</td></tr>`).join('')}</tbody></table></div>
 <p class="reg-help">Learners are ranked by their average score. Tap a learner to preview the report card. Parents can see report cards once results are generated.</p>`;}
function exportCbcResults(){const k=exKey(),r=buildClassResults(k,TEACHER_CLASS);
 downloadXlsx([{name:'CBC Results',heads:['No.','Learner',...r.cols.map(c=>abbr(c)+' ('+c.slice(0,18)+')'),'Average %'],rows:r.ranked.map((x,i)=>[i+1,x.s.name,...r.cols.map(c=>x.m[c]?levelCode(x.m[c].pct)+' ('+x.m[c].pct+'%)':''),Math.round(x.avg*10)/10])}],`EduTrack_CBC_Results_${slug(TEACHER_CLASS)}_T${exTerm}_${exYear}.xlsx`);toast('CBC results exported.');}
$('examsPage').addEventListener('click',e=>{
 const b=e.target.closest('[data-ex]');
 if(b){const a=b.dataset.ex;
  if(a==='entered'){const el=$('exList');if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}
  else if(a==='generate')generateResults();
  else if(a==='assess'){const l=examStudents(TEACHER_CLASS);showDetail({grad:G.indigo,label:'Assessments this term',value:'Term '+exTerm,title:'Assessments',sub:clsTeacher(TEACHER_CLASS).name+' · '+exYear,go:null,goLabel:'Close',body:sec('RESULTS ENTERED',EXAMS.map(x=>{const kk=exKey(exYear,exTerm,x[0]),n=l.filter(s=>Object.keys(marksOf(s.adm,kk)).length).length;return[x[1],n+' of '+l.length+' learners'+(RES.gen[kk+'|'+TEACHER_CLASS]?' · generated':'')];}))});}
  else if(a==='back'){exView='list';renderExams();}
  else if(a==='excel')exportCbcResults();else if(a==='print')window.print();
  return;}
 const row=e.target.closest('[data-learner]');if(row){openResultEntry(row.dataset.learner);return}
 const tr=e.target.closest('tr[data-card]');if(tr)openCardModal(tr.dataset.card,exKey());});
$('examsPage').addEventListener('change',e=>{if(e.target.id==='exTermSel'){exTerm=+e.target.value;renderExams();}if(e.target.id==='exTypeSel'){exType=e.target.value;renderExams();}});

/* ----- teacher: enter one learner's results ----- */
let resAdm='';
function openResultEntry(adm){
 const s=allStudents().find(x=>x.adm===adm);if(!s)return;resAdm=adm;
 if(isSenior(s.cls)&&!learnerSubjects(s).length){openSubjPicker(adm);return}
 const subs=learnerSubjects(s),m=marksOf(adm),n=noteOf(adm);
 $('resModal').innerHTML=`<div class="modal-head"><div><h3 class="res-name">${escH(s.name)}</h3><p>${s.cls} · ${s.adm} · Term ${exTerm} ${exYear} · ${examLabel(exType)}</p></div><button class="modal-close" data-res="close">×</button></div>
 ${isSenior(s.cls)?'<button type="button" class="reg-btn" data-res="subjects">Change subjects</button>':''}
 <div class="section-title">LEARNING AREAS · ENTER A SCORE (78 OR 23/50)</div>
 <div class="res-list">${subs.map(x=>{const r=m[x],l=r?levelCode(r.pct):'';return`<div class="res-row"><label>${escH(x)}</label><input class="res-in" data-sub="${escH(x)}" inputmode="text" autocomplete="off" placeholder="e.g. 78 or 23/50" value="${r?escH(r.raw):''}"><span class="lv ${l}">${l||'-'}</span></div>`;}).join('')}</div>
 <div class="section-title">REPORT CARD COMMENTS</div>
 <div class="field"><label>Teacher’s comment</label><textarea id="resComment" rows="3">${escH(n.comment||'')}</textarea></div>
 <div class="field-row"><div class="field"><label>Areas of strength (one per line)</label><textarea id="resStr" rows="3">${escH((n.strengths||[]).join('\n'))}</textarea></div><div class="field"><label>Needs improvement (one per line)</label><textarea id="resImp" rows="3">${escH((n.improve||[]).join('\n'))}</textarea></div></div>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-res="suggest">Suggest comments</button><button type="button" class="btn btn-light" data-res="save">Save</button><button type="button" class="btn btn-primary" data-res="savenext">Save and next</button></div>`;
 $('resBackdrop').classList.remove('hidden');}
function collectEntry(){const map={};let bad=false;document.querySelectorAll('#resModal .res-in').forEach(i=>{const r=parseScore(i.value);i.classList.toggle('bad',!!r.error);if(r.error)bad=true;else map[i.dataset.sub]=r.empty?null:{raw:r.raw,pct:r.pct};});return{map,bad};}
function suggestComments(){
 const {map}=collectEntry(),got=Object.keys(map).filter(x=>map[x]);if(!got.length){toast('Enter some scores first.');return}
 const avg=got.reduce((a,x)=>a+map[x].pct,0)/got.length,lv=levelCode(avg);
 const strong=got.filter(x=>map[x].pct>=75).map(x=>x.replace(/\s*\(.*\)/,'')),weak=got.filter(x=>map[x].pct<41).map(x=>x.replace(/\s*\(.*\)/,''));
 $('resComment').value=lv==='EE'?'The learner is performing exceptionally and participates actively in class. Keep up the good work.':lv==='ME'?'The learner demonstrates good understanding of concepts and participates in class activities. Continued practice will improve results further.':lv==='AE'?'The learner is making progress but needs more support and practice in several learning areas.':'The learner needs close support and regular practice to improve. Parents are encouraged to work with the teacher.';
 $('resStr').value=strong.join('\n');$('resImp').value=weak.join('\n');}
function saveEntry(next){
 const {map,bad}=collectEntry();if(bad){toast('Check the red marks. Use a number up to 100, or a fraction like 23/50.');return}
 const lines=id=>$(id).value.split('\n').map(cleanTxt).filter(Boolean);
 recordMarks(resAdm,exKey(),map,{comment:cleanTxt($('resComment').value),strengths:lines('resStr'),improve:lines('resImp')});
 const list=examStudents(TEACHER_CLASS),i=list.findIndex(x=>x.adm===resAdm);$('resBackdrop').classList.add('hidden');renderExams();
 if(next&&i>=0&&i+1<list.length){openResultEntry(list[i+1].adm);toast('Saved. Next learner.');}else toast('Results saved.');}
$('resBackdrop').addEventListener('click',e=>{
 if(e.target.id==='resBackdrop'){$('resBackdrop').classList.add('hidden');return}
 const a=e.target.dataset&&e.target.dataset.res;if(!a)return;
 if(a==='close')$('resBackdrop').classList.add('hidden');else if(a==='save')saveEntry(false);else if(a==='savenext')saveEntry(true);
 else if(a==='suggest')suggestComments();else if(a==='subjects'){$('resBackdrop').classList.add('hidden');openSubjPicker(resAdm);}});
$('resBackdrop').addEventListener('input',e=>{if(!e.target.classList.contains('res-in'))return;const r=parseScore(e.target.value),c=e.target.nextElementSibling;e.target.classList.toggle('bad',!!r.error);
 const l=r.pct!=null?levelCode(r.pct):'';c.className='lv '+l;c.textContent=l||'-';});

/* ----- senior school: choose a learner's subjects ----- */
function openSubjPicker(adm){
 const s=allStudents().find(x=>x.adm===adm);if(!s)return;resAdm=adm;const cur=learnerSubjects(s),sel=cur.length?cur:SENIOR_DEFAULT;
 $('subjModal').innerHTML=`<div class="modal-head"><div><h3>${escH(s.name)}</h3><p>${s.cls} · choose the subjects this learner takes</p></div><button class="modal-close" data-sp="close">×</button></div>
 <p class="su-hint">Senior school learners take 7 subjects: 4 compulsory and 3 chosen. Only ticked subjects appear when you enter results.</p>
 ${seniorGroups(s.cls).map(g=>`<div class="section-title">${g[0].toUpperCase()}</div>`+g[1].map(x=>`<label class="sp-row"><input type="checkbox" value="${escH(x)}"${sel.includes(x)?' checked':''}> ${escH(x)}</label>`).join('')).join('')}
 <div class="modal-actions"><button type="button" class="btn btn-light" data-sp="close">Cancel</button><button type="button" class="btn btn-primary" data-sp="save">Save subjects</button></div>`;
 $('subjBackdrop').classList.remove('hidden');}
function setLearnerSubjects(adm,list){const s=allStudents().find(x=>x.adm===adm),e=enrollMap(adm,s);e[gradeOf(s?s.cls:'Grade 10')]=list;STUSUBJ[adm]=e;saveStuSubj();}
$('subjBackdrop').addEventListener('click',e=>{
 if(e.target.id==='subjBackdrop'){$('subjBackdrop').classList.add('hidden');return}
 const a=e.target.dataset&&e.target.dataset.sp;if(!a)return;
 if(a==='close')$('subjBackdrop').classList.add('hidden');
 else if(a==='save'){const v=[...document.querySelectorAll('#subjModal input:checked')].map(i=>i.value);if(!v.length){toast('Tick at least one subject.');return}
  setLearnerSubjects(resAdm,v);$('subjBackdrop').classList.add('hidden');toast(v.length+' subjects saved.');if(currentUser)renderExams();openResultEntry(resAdm);}});

/* ----- Subjects page ----- */
let subjGrade=gradeOf(TEACHER_CLASS);
function renderSubjects(){
 const g=subjGrade,senior=isSenior(g),list=subjectsFor(g);
 $('subjectsPage').innerHTML=`<div class="reg-banner ex-banner"><div class="reg-title"><span class="reg-month">SUBJECTS</span><span class="reg-year">${g.toUpperCase()}</span><small>${list.length} subject${list.length===1?'':'s'}${senior?' · learners choose their own':''}</small></div></div>
 <div class="sj-chips">${CLASS_LIST.map(c=>`<button type="button" class="sj-chip${c===g?' on':''}" data-sj="grade" data-g="${c}">${c.replace('Grade ','Gr ')}</button>`).join('')}</div>
 <div class="sj-add"><input id="sjName" placeholder="Add a subject, e.g. Music" maxlength="60"><button type="button" class="reg-btn green" data-sj="add">+ Add</button></div>
 ${senior?seniorGroups(g).map(gr=>`<div class="section-title">${gr[0].toUpperCase()}</div><div class="sj-list">${gr[1].map(x=>`<div class="sj-row"><span>${escH(x)}</span><button type="button" class="sj-del" data-sj="remove" data-name="${escH(x)}">Remove</button></div>`).join('')}</div>`).join(''):`<div class="sj-list">${list.map(x=>`<div class="sj-row"><span>${escH(x)}</span><button type="button" class="sj-del" data-sj="remove" data-name="${escH(x)}">Remove</button></div>`).join('')||'<div class="bk-note">No subjects yet. Add one above.</div>'}</div>`}
 <div class="bk-actions" style="margin:12px 3px"><button type="button" class="reg-btn" data-sj="restore">Restore default subjects</button></div>
 <p class="reg-help">Subjects added here appear when you enter results for ${g}. Removing a subject hides it from new results entry; marks already saved are kept.</p>`;}
$('subjectsPage').addEventListener('click',e=>{const b=e.target.closest('[data-sj]');if(!b)return;const a=b.dataset.sj;
 if(a==='grade'){subjGrade=b.dataset.g;renderSubjects();}
 else if(a==='add'){const err=addSubject(subjGrade,$('sjName').value);if(err){toast(err);return}toast('Subject added.');renderSubjects();}
 else if(a==='remove'){removeSubject(subjGrade,b.dataset.name);toast('Removed '+b.dataset.name+'.');renderSubjects();}
 else if(a==='restore'){delete SUBJ.added[subjGrade];delete SUBJ.removed[subjGrade];saveSubj();toast('Default subjects restored.');renderSubjects();}});

/* ----- parent: report cards ----- */
let rpChild='',rpKey='';
function renderParentReports(){
 const kids=childrenOf(currentUser),box=$('examsPage');
 if(!kids.length){box.innerHTML='<div class="bk-note">No learners are linked to this account yet.</div>';return}
 if(!kids.some(k=>k.adm===rpChild))rpChild=kids[0].adm;
 const s=kids.find(k=>k.adm===rpChild),keys=reportKeys(s);if(!keys.includes(rpKey))rpKey=keys[0]||'';
 box.innerHTML=`<div class="reg-banner ex-banner"><div class="reg-title"><span class="reg-month">REPORT CARD</span><small>${escH(s.name)} · ${s.cls}</small></div></div>
 ${kids.length>1?`<div class="sj-chips">${kids.map(k=>`<button type="button" class="sj-chip${k.adm===rpChild?' on':''}" data-rp="child" data-adm="${k.adm}">${escH(k.name.split(' ')[0])}</button>`).join('')}</div>`:''}
 ${keys.length>1?`<div class="reg-tools"><select id="rpSel" class="reg-select">${keys.map(k=>`<option value="${k}"${k===rpKey?' selected':''}>Term ${k.split('-')[1].slice(1)} · ${examLabel(k.split('-')[2])} · ${k.split('-')[0]}</option>`).join('')}</select></div>`:''}
 ${rpKey?reportCardHtml(s,rpKey)+'<div class="bk-actions" style="margin:12px 3px"><button type="button" class="reg-btn green" data-rp="print">Print / Save PDF</button></div>':`<div class="bk-note">${escH(s.name.split(' ')[0])}’s report card will appear here when the class teacher releases the results.</div>`}`;}
$('examsPage').addEventListener('click',e=>{const b=e.target.closest('[data-rp]');if(!b)return;if(b.dataset.rp==='child'){rpChild=b.dataset.adm;rpKey='';renderParentReports();}else if(b.dataset.rp==='print')window.print();});
$('examsPage').addEventListener('change',e=>{if(e.target.id==='rpSel'){rpKey=e.target.value;renderParentReports();}});
function closeAcademic(){['resBackdrop','subjBackdrop','cardBackdrop','promoBackdrop','dobBackdrop'].forEach(i=>$(i).classList.add('hidden'));}

/* ----- teacher: stat boxes open details (Students and Attendance pages) ----- */
function todayLists(cls){const n=new Date(),l=classStudents(cls),v=s=>regGet(n.getFullYear(),n.getMonth(),s.adm,n.getDate());return{all:l,present:l.filter(s=>v(s)==='P'),absent:l.filter(s=>v(s)==='A'),none:l.filter(s=>!v(s))};}
const names=(a,f)=>a.length?a.map(f):[['None','-']];
const T_PRESENT=()=>{const t=todayLists(TEACHER_CLASS),n=new Date();return{sub:'Marked present on '+n.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),go:'register',goLabel:'Open Class Register',sections:[['PRESENT TODAY',names(t.present,(s,i)=>[String(i+1).padStart(2,'0')+'  '+s.name,s.adm])],['NOT MARKED YET',names(t.none,s=>[s.name,s.adm])]]};};
const T_ABSENT=()=>{const t=todayLists(TEACHER_CLASS);return{sub:'Learners marked absent today',go:'register',goLabel:'Open Class Register',sections:[['ABSENT TODAY',names(t.absent,s=>[s.name,'Parent: '+fmtPhone(s.gphone)])],['TIP',[['Contact','Call or message the parent from the number shown']]]]};};
const T_NONE=()=>{const t=todayLists(TEACHER_CLASS);return{sub:'Learners not yet marked today',go:'register',goLabel:'Open Class Register',sections:[['NOT MARKED',names(t.none,s=>[s.name,s.adm])]]};};
const TEACHER_MSD={
 students:[()=>{const l=classStudents(TEACHER_CLASS),c=clsTeacher(TEACHER_CLASS);return{sub:'Learners in your class',go:'register',goLabel:'Open Class Register',sections:[['CLASS',[['Class',c.name],['Class teacher',c.teacher||'-'],['Learners',String(l.length)]]],['LEARNERS',names(l,(s,i)=>[String(i+1).padStart(2,'0')+'  '+s.name,s.adm])]]};},T_PRESENT,T_ABSENT],
 attendance:[T_PRESENT,T_ABSENT,T_NONE]};


/* ================= v2.0: Safer parent logins (hashed passwords, admin reset, details) ================= */
const CREDS_KEY='edutrack_creds';let CREDS={};
const saveCreds=()=>store.set(CREDS_KEY,JSON.stringify(CREDS));
const SHA_K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
function sha256(str){
 const b=new TextEncoder().encode(str),l=b.length,pl=((l+9+63)>>6)<<6,m=new Uint8Array(pl);m.set(b);m[l]=0x80;const dv=new DataView(m.buffer);
 dv.setUint32(pl-4,(l*8)>>>0);dv.setUint32(pl-8,Math.floor(l*8/4294967296));
 let h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];const w=new Uint32Array(64),rr=(x,n)=>(x>>>n)|(x<<(32-n));
 for(let i=0;i<pl;i+=64){for(let t=0;t<16;t++)w[t]=dv.getUint32(i+t*4);
  for(let t=16;t<64;t++){const s0=rr(w[t-15],7)^rr(w[t-15],18)^(w[t-15]>>>3),s1=rr(w[t-2],17)^rr(w[t-2],19)^(w[t-2]>>>10);w[t]=(w[t-16]+s0+w[t-7]+s1)>>>0;}
  let a=h[0],b2=h[1],c=h[2],d=h[3],e=h[4],f=h[5],g=h[6],hh=h[7];
  for(let t=0;t<64;t++){const S1=rr(e,6)^rr(e,11)^rr(e,25),ch=(e&f)^(~e&g),t1=(hh+S1+ch+SHA_K[t]+w[t])>>>0,S0=rr(a,2)^rr(a,13)^rr(a,22),mj=(a&b2)^(a&c)^(b2&c),t2=(S0+mj)>>>0;hh=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b2;b2=a;a=(t1+t2)>>>0;}
  h=[h[0]+a,h[1]+b2,h[2]+c,h[3]+d,h[4]+e,h[5]+f,h[6]+g,h[7]+hh].map(x=>x>>>0);}
 return h.map(x=>x.toString(16).padStart(8,'0')).join('');}
function randBytes(n){const a=new Uint8Array(n);try{crypto.getRandomValues(a)}catch(e){for(let i=0;i<n;i++)a[i]=Math.floor(Math.random()*256)}return a;}
const hashPass=(pass,salt)=>{let h=salt+':'+pass;for(let i=0;i<2000;i++)h=sha256(h+salt);return h;};
function setCreds(u,pass,must,stamp){const salt=[...randBytes(8)].map(x=>x.toString(16).padStart(2,'0')).join(''),hash=hashPass(pass,salt);
 CREDS[u.id]={salt,hash,must:!!must};if(stamp)CREDS[u.id].reset=new Date().toISOString();
 u.salt=salt;u.passHash=hash;u.mustChange=!!must;u.pwReset=CREDS[u.id].reset;delete u.password;saveCreds();}
function applyCreds(){USERS.forEach(u=>{const c=CREDS[u.id];if(c){u.salt=c.salt;u.passHash=c.hash;u.mustChange=!!c.must;u.pwReset=c.reset;delete u.password;}});}
applyCreds();
USERS.filter(u=>u.role==='parent'&&u.id!=='u4'&&u.password!==undefined).forEach(u=>setCreds(u,u.password,false));   // upgrade older plain-text accounts
(()=>{try{const s=JSON.parse(store.get(PACC_KEY));if(s&&s.some(a=>a.password!==undefined)){s.forEach(a=>{delete a.password;});store.set(PACC_KEY,JSON.stringify(s));}}catch(e){}})();
function passOk(u,pass){if(u.passHash)return hashPass(pass,u.salt)===u.passHash;return u.password!==undefined&&u.password===pass;}
function findLogin(name,pass){const nn=normLogin(name);return USERS.filter(x=>normLogin(x.username)===nn||(x.role==='parent'&&x.linkPhone&&normPhone(name)===x.linkPhone)).find(x=>passOk(x,pass))||null;}
function makeTemp(){const A='ABCDEFGHJKMNPQRSTUVWXYZ23456789';return[...randBytes(8)].map(x=>A[x%A.length]).join('');}
function resetParentPassword(phone){const u=accountFor(phone);if(!u)return'';const t=makeTemp();setCreds(u,t,true,true);return t;}

/* ----- change password (forced after a reset, or chosen by the parent) ----- */
let pwForced=false;
function openPwModal(forced){
 if(!currentUser)return;pwForced=!!forced;
 $('pwModal').innerHTML=`<div class="modal-head"><div><h3>${forced?'Set a new password':'Change password'}</h3><p>${forced?'You are using a temporary password or your child’s UPI number. Create a private password to continue.':'Choose a password you will remember.'}</p></div>${forced?'':'<button class="modal-close" data-pw="close">×</button>'}</div>
 ${forced?'':'<div class="field"><label>Current password</label><input id="pwCur" type="password" autocomplete="off"></div>'}
 <div class="field"><label>New password</label><input id="pwNew" type="password" placeholder="At least 8 characters" autocomplete="off"></div>
 <div class="field"><label>Confirm new password</label><input id="pwNew2" type="password" autocomplete="off"></div>
 <div class="modal-actions">${forced?'<button type="button" class="btn btn-light" data-pw="signout">Sign out</button>':'<button type="button" class="btn btn-light" data-pw="close">Cancel</button>'}<button type="button" class="btn btn-primary" data-pw="save">Save password</button></div>`;
 $('pwBackdrop').classList.remove('hidden');}
function closePw(){$('pwBackdrop').classList.add('hidden');}
function validatePw(cur,n1,n2,forced){
 if(!forced&&!cur)return'Enter your current password.';
 if(n1.length<8)return'Choose a password with at least 8 characters.';
 if(n1!==n2)return'The two passwords do not match.';
 if(!forced&&n1===cur)return'Choose a password different from the current one.';
 return'';}
$('pwBackdrop').addEventListener('click',e=>{
 if(e.target.id==='pwBackdrop'&&!pwForced){closePw();return}
 const a=e.target.dataset&&e.target.dataset.pw;if(!a)return;
 if(a==='close')closePw();else if(a==='signout'){closePw();signOut('You have been signed out.');}
 else if(a==='save'){(async()=>{
  const cur=pwForced?'':$('pwCur').value,n1=$('pwNew').value,n2=$('pwNew2').value,err=validatePw(cur,n1,n2,pwForced);
  if(err){toast(err);return}
  try{await KlasoraFirebase.changePassword(cur,n1);currentUser.mustChange=false;closePw();toast('Password saved.');}
  catch(ex){toast(['auth/wrong-password','auth/invalid-credential'].includes(ex.code)?'Your current password is not correct.':ex.code==='auth/requires-recent-login'?'Please sign in again, then change your password.':ex.code==='auth/weak-password'?'That password is too weak.':'Could not save the password. Try again.');}
 })();}});
$('pfChangePw').onclick=()=>{closeProfile();openPwModal(false);};

/* ----- administrator: parent login details + reset ----- */
let pdPhone='',pdTemp='',pdCopy='',pdArmed=0;
function openParentDetails(phone){if(!currentUser||currentUser.role!=='admin'||!accountFor(phone))return;pdPhone=phone;pdTemp='';pdArmed=0;renderPd();$('pdBackdrop').classList.remove('hidden');}
function closePd(){$('pdBackdrop').classList.add('hidden');pdTemp='';pdCopy='';}
function renderPd(){
 const u=accountFor(pdPhone);if(!u)return;const kids=childrenOf(u),stateTxt=u.mustChange?'Temporary password issued. Parent must set a new one':'Active';
 const wa='https://wa.me/254'+pdPhone.slice(1)+'?text='+encodeURIComponent(`Hello ${u.name}, your Klasora temporary password is ${pdTemp}. Sign in with your phone number ${pdPhone} and choose a new password.`);
 $('pdModal').innerHTML=`<div class="modal-head"><div><h3>${escH(u.name)}</h3><p>Parent portal login details</p></div><button class="modal-close" data-pd="close">×</button></div>
 ${sec('LOGIN DETAILS',[['Sign-in username',fmtPhone(u.linkPhone)],['Password','Hidden for security'],['Account status',stateTxt],['Account created',u.created||'—'],['Last password reset',u.pwReset?new Date(u.pwReset).toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):'Never']])}
 ${sec('LINKED LEARNERS',kids.length?kids.map(k=>[k.name,k.cls+' · '+k.adm]):[['None','-']])}
 ${pdTemp?`<div class="pd-temp"><small>TEMPORARY PASSWORD · SHOWN ONCE</small><strong>${pdTemp}</strong><div class="bk-actions"><button type="button" class="reg-btn" data-pd="copy">Copy</button><a class="reg-btn green" href="${wa}" target="_blank" rel="noopener">Send on WhatsApp</a></div></div><div class="bk-note warn">The old password no longer works. The parent signs in with the phone number and this temporary password, then chooses a new one.</div>`:
 `<div class="bk-note">Passwords are never shown, so they cannot be read by anyone. If a parent forgot theirs, reset it here and give them the temporary password.</div><div class="modal-actions"><button type="button" class="btn btn-light" data-pd="close">Close</button><button type="button" class="btn btn-primary" data-pd="reset" id="pdReset">Reset password</button></div>`}`;}
$('pdBackdrop').addEventListener('click',e=>{
 if(e.target.id==='pdBackdrop'){closePd();return}
 const a=e.target.dataset&&e.target.dataset.pd;if(!a)return;
 if(a==='close')closePd();
 else if(a==='copy'){const t=pdCopy||pdTemp;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Password copied.')).catch(()=>{const x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy');toast('Password copied.')}catch(er){toast('Copy failed. Write the password down.')}x.remove();});}
 else if(a==='reset'){if(Date.now()-pdArmed<5000){pdTemp=resetParentPassword(pdPhone);renderPd();toast('Password reset. Give the parent the temporary password.');}
  else{pdArmed=Date.now();e.target.textContent='Tap again to confirm reset';setTimeout(()=>{const b=$('pdReset');if(b)b.textContent='Reset password';},5000);}}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-pdet]');if(b)openParentDetails(b.dataset.pdet);});


/* ================= v2.1: Class teacher accounts, welcome greeting, promotion, date picker ================= */
const TEACH_KEY='edutrack_class_teachers',REPL_KEY='edutrack_replaced',SEEN_KEY='edutrack_noteseen';
let TEACHERS=[],REPLACED={},NOTE_SEEN={};
try{NOTE_SEEN=JSON.parse(store.get(SEEN_KEY))||{}}catch(e){NOTE_SEEN={}}
const saveTeachers=()=>store.set(TEACH_KEY,JSON.stringify(TEACHERS)),saveReplaced=()=>store.set(REPL_KEY,JSON.stringify(REPLACED)),savePromo=()=>true;
const normLogin=s=>String(s||'').toLowerCase().replace(/[\s.]+/g,'');
function teacherUser(t){return{id:t.id,username:t.username,name:t.name||t.username,initials:schoolInitials(t.name||t.username),role:'teacher',title:'Class Teacher, '+t.className,status:'Active',className:t.className,pending:!!t.pending,created:t.created,schoolCode:t.schoolCode||'GFA001'};}
TEACHERS.forEach(t=>{if(!USERS.find(u=>u.id===t.id))USERS.push(teacherUser(t));});
applyCreds();
USERS.forEach(u=>{if(REPLACED[u.id])u.status='Replaced';});
PILLS.r.push('Replaced');
modules.classteachers={title:'Add Class Teacher',subtitle:'Create class teacher accounts. Each class has one class teacher.',stats:[['Teachers','0'],['Classes','12'],['Replaced','0']],heads:['ITEM'],rows:[]};
PAGE_NAMES.classteachers='Add Class Teacher';
const tMatch=(v,page)=>page==='classes'?(String(v)===TEACHER_CLASS||String(v).startsWith(TEACHER_CLASS+' ')):String(v)===TEACHER_CLASS;
let CT_DIR={};
const teacherOf=cls=>{const k=normKey(cls),u=USERS.find(u=>u.role==='teacher'&&normKey(u.className)===k&&u.status==='Active');return u||(CT_DIR[k]?{id:'dir_'+k,name:CT_DIR[k],role:'teacher',className:k,status:'Active'}:undefined);};
function saveClassTeacherDir(){if(!currentUser||currentUser.role!=='admin')return;const d={};USERS.filter(u=>u.role==='teacher'&&u.className&&u.status==='Active').forEach(u=>{d[normKey(u.className)]=u.name});CT_DIR=d;saveMetaRemote('classteachers',d);}
const saveImportsRemote=()=>{saveMetaRemote('imports',{imports:IMPORTS,hide:HIDE});return true;};
async function loadOtherMetaRemote(r){
 CT_DIR={};
 try{
  const m=await KlasoraFirebase.loadMeta(r.schoolId,['classteachers'].concat(r.profile.role==='admin'?['imports']:[]));
  if(m.classteachers&&typeof m.classteachers==='object')CT_DIR=m.classteachers;
  if(m.imports){IMPORTS={teachers:[],fees:[],expenses:[],library:[],inventory:[],...(m.imports.imports||{})};HIDE=m.imports.hide||{};applyImports();rebuildStudents();}
 }catch(e){}
}

/* ----- welcome greeting (top right) ----- */
const HONORIFIC=/^(mr|mrs|ms|miss|madam|mdm|dr|prof|sir|rev|pastor|mister)\b/i;
function welcomeName(u){let n=String(u.name||'').trim();
 if(u.role==='parent'&&!HONORIFIC.test(n)){const g=guardians().find(x=>x.phone===u.linkPhone),rel=g?g.relation:'';n=(rel==='Mother'?'Mrs. ':rel==='Father'?'Mr. ':'')+n;}
 return n.toUpperCase();}

/* ----- create / replace / activate class teachers ----- */
const USERNAME_RX=/^[A-Za-z][A-Za-z .'\-]{2,39}$/;
function createClassTeacher(username,pass,cls,replaceId){
 username=String(username||'').replace(/\s+/g,' ').trim();cls=normKey(cls);
 if(!USERNAME_RX.test(username))return{error:'Use a name like Mr. Thomas or Madam Jane (letters only, at least 3 characters).'};
 if(!classKeys().includes(cls))return{error:'Choose the class.'};
 if(String(pass||'').length<6)return{error:'Choose a password with at least 6 characters.'};
 if(USERS.some(u=>normLogin(u.username)===normLogin(username)))return{error:'That username is already used. Add something to make it different, for example Mr. Thomas K.'};
 const cur=teacherOf(cls);
 if(cur&&!replaceId)return{error:cls+' already has a class teacher ('+cur.name+'). Use Replace under that teacher.'};
 if(replaceId&&(!cur||cur.id!==replaceId))return{error:'That teacher is no longer the class teacher.'};
 const rec={id:'t'+Date.now().toString(36)+Math.floor(Math.random()*99),username,name:username,className:cls,schoolCode:(getSchool().schoolCode||'GFA001'),created:new Date().toISOString().slice(0,10),pending:true};
 TEACHERS.push(rec);const u=teacherUser(rec);USERS.push(u);setCreds(u,pass,false);
 if(cur&&replaceId){REPLACED[cur.id]={date:new Date().toISOString(),by:currentUser?currentUser.name:'Administrator',replacedBy:rec.id,className:cls};cur.status='Replaced';saveReplaced();}
 saveTeachers();refreshUsersModule();return{user:u,old:cur&&replaceId?cur:null};}
function resetTeacherPassword(id){const u=USERS.find(x=>x.id===id&&x.role==='teacher');if(!u||u.id==='u2')return'';const t=makeTemp();setCreds(u,t,!u.pending,true);return t;}
function activateTeacher(username,pass,cls){
 const u=USERS.find(x=>x.role==='teacher'&&TEACHERS.some(t=>t.id===x.id)&&normLogin(x.username)===normLogin(username));
 if(!u||!passOk(u,pass)||normKey(u.className)!==normKey(cls))return{error:'We could not find a class teacher account with those details. Check the username, password and class given by the school.'};
 if(u.status!=='Active')return{error:'This account is no longer active. Please contact the school administrator.'};
 if(!u.pending)return{error:'This account is already activated. Please sign in.'};
 const t=TEACHERS.find(x=>x.id===u.id);t.pending=false;t.activated=new Date().toISOString();u.pending=false;saveTeachers();setCreds(u,pass,true);return{user:u};}
const gateLocked=()=>{const l=getLock(),n=Date.now();return l.until>n?Math.ceil((l.until-n)/1000):0;};
function gateFail(){const l=getLock();l.fails=(l.fails||0)+1;if(l.fails>=MAX_FAILS){l.until=Date.now()+LOCK_SECONDS*1000;l.fails=0;}store.set(LOCK_KEY,JSON.stringify(l));return l.until>Date.now();}

/* ----- login screen: account type ----- */
const LOGIN_ROLES={
 admin:{label:'Administrator',sub:'Sign in with the email and password issued when your school was registered.'},
 teacher:{label:'Teacher',sub:'Sign in with the email and password your school administrator created for you.'},
 accountant:{label:'Accountant',sub:'Sign in with the email and password your school administrator created for you.'},
 parent:{label:'Parent',sub:'Sign in with the email and password your child’s school created for you.'}
};
let loginRole=store.get('klasora_login_role');if(!LOGIN_ROLES[loginRole])loginRole='admin';
function setLoginRole(r){
 loginRole=r;store.set('klasora_login_role',r);
 document.querySelectorAll('#roleTabs .role-tab').forEach(b=>{const on=b.dataset.role===r;b.classList.toggle('on',on);b.setAttribute('aria-selected',on?'true':'false')});
 $('loginSub').textContent=LOGIN_ROLES[r].sub;showLoginMsg('');
}
$('roleTabs').addEventListener('click',e=>{const b=e.target.closest('.role-tab');if(b)setLoginRole(b.dataset.role)});
setLoginRole(loginRole);

/* ----- login screen: parent / teacher panels ----- */
function showAuthPanel(w){
 const m={login:['loginForm','showSignup','showTeacherSignup'],parent:['signupForm'],teacher:['teacherForm']};
 Object.keys(m).forEach(k=>m[k].forEach(id=>$(id).classList.toggle('hidden',k!==w)));$('suMsg').classList.add('hidden');$('tuMsg').classList.add('hidden');showLoginMsg('');}
function fillClassSelects(){const cur=$('tuClass').value;$('tuClass').innerHTML='<option value="">Select your class</option>'+classKeys().map(c=>`<option>${c}</option>`).join('');if(classKeys().includes(cur))$('tuClass').value=cur;}
fillClassSelects();
$('showTeacherSignup').onclick=()=>showAuthPanel('teacher');$('tuBack').onclick=()=>showAuthPanel('login');
const showTu=t=>{$('tuMsg').textContent=t;$('tuMsg').classList.remove('hidden');};
$('teacherForm').addEventListener('submit',e=>{
 e.preventDefault();const s=gateLocked();if(s){showTu('Too many attempts. Try again in '+s+' seconds.');return}
 const r=activateTeacher($('tuName').value,$('tuPass').value,$('tuClass').value);
 if(r.error){showTu(gateFail()?'Too many failed attempts. Locked for '+LOCK_SECONDS+' seconds.':r.error);$('tuPass').value='';return}
 store.del(LOCK_KEY);['tuName','tuPass'].forEach(i=>$(i).value='');$('tuClass').value='';showAuthPanel('login');
 startSession(r.user,false);toast('Welcome '+r.user.name+'! Your class is '+r.user.className+'.');});

/* ----- administrator: Add Class Teacher page ----- */
let ctReplaceId='';
function openIssued(o){pdTemp=o.pass;pdCopy=o.copy;
 $('pdModal').innerHTML=`<div class="modal-head"><div><h3>${escH(o.title)}</h3><p>${escH(o.sub)}</p></div><button class="modal-close" data-pd="close">×</button></div>${sec('GIVE THE TEACHER THESE DETAILS',o.rows)}<div class="pd-temp"><small>PASSWORD · SHOWN ONCE</small><strong>${escH(o.pass)}</strong><div class="bk-actions"><button type="button" class="reg-btn" data-pd="copy">Copy all details</button></div></div><div class="bk-note warn">${escH(o.note)}</div>`;
 $('pdBackdrop').classList.remove('hidden');}
function issuedFor(u,pass,title,note){return{title,sub:u.name,pass,copy:'Username: '+u.username+'\nPassword: '+pass+'\nClass: '+u.className,rows:[['Username',u.username],['Class',u.className],['Sign in at','New class teacher? Activate your account']],note};}
function renderClassTeachers(){
 const act=USERS.filter(u=>u.role==='teacher'&&u.className&&u.status==='Active'),old=USERS.filter(u=>u.role==='teacher'&&u.status==='Replaced'),firstFree=classKeys().find(c=>!teacherOf(c));
 const opt=(c,sel)=>`<option value="${c}"${teacherOf(c)?' disabled':''}${sel===c?' selected':''}>${c}${teacherOf(c)?' · has a teacher':''}</option>`;
 $('classTeachersPage').innerHTML=`<div class="reg-banner ex-banner"><div class="reg-title"><span class="reg-month">CLASS TEACHERS</span><small>${act.length} active · ${old.length} replaced</small></div></div>
 <div class="ct-form"><h3>Add a class teacher</h3>
  <div class="field"><label>Teacher username</label><input id="ctUser" maxlength="40" placeholder="e.g. Mr. Thomas or Madam Jane" autocomplete="off"></div>
  <div class="field"><label>Password</label><div class="pw-wrap"><input id="ctPass" type="text" maxlength="40" placeholder="At least 8 characters" autocomplete="off"><button type="button" class="pw-toggle" data-ct="gen" data-t="ctPass">Generate</button></div></div>
  <div class="field"><label>Class</label><select id="ctClass">${classKeys().map(c=>opt(c,firstFree)).join('')}</select></div>
  <p class="su-hint">The teacher opens the app, taps “New class teacher? Activate your account” and enters this username, password and class. Their platform then opens for that class.</p>
  <button type="button" class="btn btn-primary" data-ct="create">Create teacher account</button></div>
 <div class="section-title">CLASS TEACHERS</div>
 <div class="ct-list">${act.length?act.map(u=>`<div class="ct-row"><div class="ct-top"><div class="ct-av">${escH(u.initials)}</div><div class="ct-main"><strong>${escH(u.name)}</strong><small>${escH(normKey(u.className))} · ${u.pending?'Waiting to activate':'Activated'}</small></div><span class="pill ${u.pending?'o':'g'}">${u.pending?'Waiting':'Activated'}</span></div>
  <div class="ct-actions"><button type="button" class="ct-btn replace" data-ct="replace" data-id="${u.id}">⇄ Replace</button>${u.id==='u2'?'':`<button type="button" class="ct-btn" data-ct="reset" data-id="${u.id}">Reset password</button>`}</div>
  ${ctReplaceId===u.id?`<div class="ct-repl"><p class="su-hint"><b>${escH(u.name)}</b> will be signed out and can no longer sign in. ${escH(normKey(u.className))} keeps all its learners, register and results for the new teacher.</p>
   <div class="field"><label>New teacher username</label><input id="rpUser" maxlength="40" placeholder="e.g. Madam Jane" autocomplete="off"></div>
   <div class="field"><label>Password</label><div class="pw-wrap"><input id="rpPass" type="text" maxlength="40" placeholder="At least 8 characters" autocomplete="off"><button type="button" class="pw-toggle" data-ct="gen" data-t="rpPass">Generate</button></div></div>
   <div class="field"><label>Class</label><input value="${escH(normKey(u.className))}" readonly></div>
   <div class="modal-actions"><button type="button" class="btn btn-light" data-ct="cancel">Cancel</button><button type="button" class="btn btn-primary" data-ct="dorepl" data-id="${u.id}">Replace teacher</button></div></div>`:''}</div>`).join(''):'<div class="bk-note">No class teachers yet. Add the first one above.</div>'}</div>
 ${old.length?`<div class="section-title">REPLACED TEACHERS</div><div class="ct-list">${old.map(u=>{const r=REPLACED[u.id]||{};return`<div class="ct-row old"><div class="ct-top"><div class="ct-av">${escH(u.initials)}</div><div class="ct-main"><strong>${escH(u.name)}</strong><small>${escH(normKey(u.className))} · replaced ${r.date?new Date(r.date).toLocaleDateString('en-GB'):''}</small></div><span class="pill r">Replaced</span></div></div>`;}).join('')}</div>`:''}`;}
$('classTeachersPage').addEventListener('click',e=>{const b=e.target.closest('[data-ct]');if(!b||!currentUser||currentUser.role!=='admin')return;const a=b.dataset.ct;
 if(a==='gen'){$(b.dataset.t).value=makeTemp();}
 else if(a==='create'){const r=createClassTeacher($('ctUser').value,$('ctPass').value,$('ctClass').value);if(r.error){toast(r.error);return}
  openIssued(issuedFor(r.user,$('ctPass').value,'Class teacher created','The teacher must activate the account on the sign-in screen using these exact details.'));renderClassTeachers();}
 else if(a==='replace'){ctReplaceId=ctReplaceId===b.dataset.id?'':b.dataset.id;renderClassTeachers();}
 else if(a==='cancel'){ctReplaceId='';renderClassTeachers();}
 else if(a==='dorepl'){const pass=$('rpPass').value,r=createClassTeacher($('rpUser').value,pass,normKey((USERS.find(x=>x.id===b.dataset.id)||{}).className),b.dataset.id);if(r.error){toast(r.error);return}
  ctReplaceId='';openIssued(issuedFor(r.user,pass,'Class teacher replaced',r.old.name+' has been signed out and can no longer sign in. The new teacher must activate the account with these details.'));renderClassTeachers();}
 else if(a==='reset'){const u=USERS.find(x=>x.id===b.dataset.id),t=resetTeacherPassword(b.dataset.id);if(t)openIssued(issuedFor(u,t,'Password reset',u.pending?'The teacher still has to activate the account using this password.':'The old password no longer works. The teacher signs in with this temporary password and then chooses a new one.'));}});

/* ----- promotion at the end of Term 3 ----- */
const nextClass=c=>{const g=gradeOf(c),i=CLASS_LIST.indexOf(g);if(i<0)return null;if(i+1>=CLASS_LIST.length)return'Completed';return normKey(CLASS_LIST[i+1]+String(c).slice(g.length));};
function pendingPromotion(cls){const t=t3Check(cls);return t.ready&&!PROMO.done[t.year+'|'+cls]?t.year:0;}
const classHistory=s=>[s.cls,...PROMO.log.filter(l=>l.adm===s.adm).map(l=>l.from)];
function reportClass(s,k){const r=Object.keys(RES.gen).map(x=>x.split('|')).find(x=>x[0]===k&&classHistory(s).includes(x[1]));return r?r[1]:s.cls;}
const promoLatest=adm=>{const l=PROMO.log.filter(x=>x.adm===adm);return l.length?l[l.length-1]:null;};
/* the promotion notice is shown for one day only (24 hours), then it disappears */
const PROMO_NOTICE_MS=24*60*60*1000;
const promoRecent=adm=>{const p=promoLatest(adm);if(!p)return null;const age=Date.now()-new Date(p.date).getTime();return age>=-3600000&&age<PROMO_NOTICE_MS?p:null;};
const promoText=p=>p.action==='promote'?'Promoted from '+p.from+' ('+p.year+') to '+p.to+' ('+(+p.year+1)+')':p.action==='repeat'?'Repeating '+p.from+' in '+(+p.year+1):p.action==='transfer'?'Transferred from '+p.from:'Completed school ('+p.year+')';
function applyPromotion(cls,year,choices){
 const list=promoList(cls,year),nx=nextClass(cls),now=new Date().toISOString(),res={promote:0,repeat:0,transfer:0,complete:0};
 list.forEach(s=>{const a=choices[s.adm]||'promote';snapshotSubjects(s,cls,a);
  if(a==='promote'){if(nx==='Completed'){PROMO.overrides[s.adm]={cls,status:'Completed'};PROMO.log.push({adm:s.adm,name:s.name,from:cls,to:'Completed',action:'complete',year,date:now});res.complete++;}
   else{PROMO.overrides[s.adm]={cls:nx,status:'Active'};carrySubjects(s,cls,nx);PROMO.log.push({adm:s.adm,name:s.name,from:cls,to:nx,action:'promote',year,date:now});res.promote++;}}
  else if(a==='repeat'){PROMO.log.push({adm:s.adm,name:s.name,from:cls,to:cls,action:'repeat',year,date:now});res.repeat++;}
  else{PROMO.overrides[s.adm]={cls,status:'Transferred'};PROMO.log.push({adm:s.adm,name:s.name,from:cls,to:cls,action:'transfer',year,date:now});res.transfer++;}});
 if(!RES.gen[year+'-T3-END|'+cls]){RES.gen[year+'-T3-END|'+cls]=now;classStudents(cls).forEach(s=>{if((RES.marks[year+'-T3-END']||{})[s.adm])RES_DIRTY.add(s.adm+'|'+year+'-T3-END')});saveRes();}
 PROMO.done[year+'|'+cls]=now;saveStuSubj();savePromoRemote(PROMO.log.filter(l=>l.date===now&&+l.year===+year));rebuildStudents();return res;}
function promoBannerHtml(u){if(!u||u.role!=='teacher')return'';const cuH=catchUpHtml();if(cuH)return cuH;const y=pendingPromotion(TEACHER_CLASS);if(!y)return promoWaitHtml();const nx=nextClass(TEACHER_CLASS);
 return`<div class="promo-banner"><span class="pb-ico">🎓</span><div><strong>Term 3 ${y} is complete for ${escH(TEACHER_CLASS)}</strong><small>${nx==='Completed'?'Mark who has completed school, who repeats and who transfers.':'Choose who is promoted to '+escH(nx)+', who repeats and who transfers.'}</small></div><button type="button" class="reg-btn gold" data-nt="promote">Promote learners</button></div>`;}
let promoState=null,promoArmed=0;
function openPromotion(){
 if(!currentUser||currentUser.role!=='teacher')return;const cls=TEACHER_CLASS,t3=t3Check(cls),nx=nextClass(cls),year=t3.year||exYear,list=promoList(cls,year);
  if(!t3.ready){toast(t3.year?'Enter the Term 3 End Term results for every learner first. Still missing: '+missingText(t3)+'.':'Enter the Term 3 End Term results for every learner first.');return}
 if(!list.length){toast('There are no active learners in '+cls+'.');return}
 if(PROMO.done[year+'|'+cls]){toast(cls+' learners were already promoted for '+year+'.');return}
 promoState={cls,year,nx,choices:{}};list.forEach(s=>promoState.choices[s.adm]='promote');promoArmed=0;renderPromo();$('promoBackdrop').classList.remove('hidden');}
function renderPromo(){
 const st=promoState;if(!st)return;const list=promoList(st.cls,st.year),sc=$('promoList')?$('promoList').scrollTop:0,c={promote:0,repeat:0,transfer:0};list.forEach(s=>c[st.choices[s.adm]||'promote']++);
 const done=st.nx==='Completed',opt=(s,v,l)=>`<button type="button" class="pm-opt${(st.choices[s.adm]||'promote')===v?' on '+v:''}" data-pm="set" data-adm="${s.adm}" data-v="${v}">${l}</button>`;
 $('promoModal').innerHTML=`<div class="modal-head"><div><h3>${done?'Complete school':'Promote learners'}</h3><p>${escH(st.cls)} → ${escH(st.nx)} · ${st.year}</p></div><button class="modal-close" data-pm="close">×</button></div>
 <p class="su-hint">${done?'Learners marked “Complete” leave school.':'Learners you promote move to '+escH(st.nx)+' and will be seen by that class teacher.'} Learners marked Repeat stay in ${escH(st.cls)}. Parents see the result on their screen.</p>${gradeOf(st.cls)==='Grade 9'?g10Note(st):''}
 <div class="reg-btns" style="margin-bottom:8px"><button type="button" class="reg-btn green" data-pm="all" data-v="promote">${done?'Complete all':'Promote all'}</button><button type="button" class="reg-btn" data-pm="all" data-v="repeat">Repeat all</button></div>
 <div class="pm-list" id="promoList">${list.map((s,i)=>`<div class="pm-row"><div class="pm-name"><span class="ex-num">${String(i+1).padStart(2,'0')}</span><strong>${escH(s.name)}</strong></div><div class="pm-opts">${opt(s,'promote',done?'🎓 Complete':'⬆ Promote')}${opt(s,'repeat','↻ Repeat')}${opt(s,'transfer','↗ Transfer')}</div></div>`).join('')}</div>
 <div class="pm-sum"><span class="lv EE">${c.promote} ${done?'complete':'promoted'}</span><span class="lv AE">${c.repeat} repeat</span><span class="lv BE">${c.transfer} transfer</span></div>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-pm="close">Cancel</button><button type="button" class="btn btn-primary" data-pm="go" id="promoGo">${promoArmed&&Date.now()-promoArmed<6000?'Tap again to confirm':'Confirm'}</button></div>`;
 const l=$('promoList');if(l)l.scrollTop=sc;}
function closePromo(){$('promoBackdrop').classList.add('hidden');promoState=null;}
$('promoBackdrop').addEventListener('click',e=>{
 if(e.target.id==='promoBackdrop'){closePromo();return}
 const b=e.target.closest('[data-pm]');if(!b||!promoState)return;const a=b.dataset.pm;
 if(a==='close')closePromo();
 else if(a==='set'){promoState.choices[b.dataset.adm]=b.dataset.v;promoArmed=0;renderPromo();}
 else if(a==='all'){promoList(promoState.cls,promoState.year).forEach(s=>promoState.choices[s.adm]=b.dataset.v);promoArmed=0;renderPromo();}
 else if(a==='go'){if(!(promoArmed&&Date.now()-promoArmed<6000)){promoArmed=Date.now();renderPromo();return}
  const st=promoState,chk=t3Check(st.cls);if(!chk.ready||chk.year!==st.year){closePromo();toast('Enter the Term 3 End Term results for every learner before promoting.');return}const res=applyPromotion(st.cls,st.year,st.choices);closePromo();applyRole();updateBell();showPage(activePage());
  showDetail({grad:G.green,label:'Promotion complete',value:st.cls+' → '+st.nx,title:'Promotion Done',sub:'Year '+st.year,go:null,goLabel:'Close',body:sec('RESULT',[[st.nx==='Completed'?'Completed school':'Promoted to '+st.nx,String(res.promote+res.complete)],['Repeating '+st.cls,String(res.repeat)],['Transferred',String(res.transfer)]])+sec('WHAT HAPPENS NEXT',[['Next class teacher','Sees the promoted learners in '+st.nx],['Parents','See the result on their screen']])});}});
function promoBadge(adm){const p=promoRecent(adm);if(!p)return'';
 const t=(p.action==='promote'?'⬆ ':p.action==='repeat'?'↻ ':p.action==='transfer'?'↗ ':'🎓 ')+promoText(p);return`<span class="promo-chip ${p.action}">${escH(t)}</span>`;}
function promoSec(adm){const p=promoRecent(adm);if(!p)return'';return sec('PROMOTION NOTICE',[['Result',promoText(p)],['Shown until','Tomorrow (this notice lasts one day)']]);}

/* ----- notifications (bell) ----- */
function notifications(){const u=currentUser,out=[];if(!u)return out;
 const seen=NOTE_SEEN[u.id]||'',now=new Date().toISOString();
 INBOX.filter(m=>msgFor(m,u)).forEach(m=>out.push({id:m.id,icon:m.icon,title:m.title,text:m.text,date:m.date,act:m.act,actLabel:m.actLabel,ref:m.ref,unread:!seen||m.date>seen}));
 if(u.role==='teacher'){const cu=catchUp(TEACHER_CLASS),nx=nextClass(TEACHER_CLASS);
  if(cu)out.push({icon:'📣',title:'Please promote your '+TEACHER_CLASS+' learners to '+cu.nx,text:cu.lower+' has already promoted '+cu.arrivals.length+' learner'+(cu.arrivals.length===1?'':'s')+' into your class. Promote your '+cu.waiting.length+' '+TEACHER_CLASS+' learner'+(cu.waiting.length===1?'':'s')+' so the two groups stay separate.'+(cu.ready?'':' Enter their Term 3 End Term results first.'),act:cu.ready?'promote':'results',actLabel:cu.ready?'Promote to '+cu.nx:'Enter Term 3 results',date:now,unread:true});
  else{const y=pendingPromotion(TEACHER_CLASS);if(y)out.push({icon:'🎓',title:'Term 3 '+y+' is complete for '+TEACHER_CLASS,text:nx==='Completed'?'Mark who has completed school, who repeats and who transfers.':'Choose who is promoted to '+nx+', who repeats and who transfers.',act:'promote',actLabel:'Promote learners',date:now,unread:true});}}
 if(u.role==='parent')childrenOf(u).forEach(k=>{const p=promoRecent(k.adm);if(p)out.push({icon:p.action==='promote'?'⬆':p.action==='repeat'?'↻':p.action==='transfer'?'↗':'🎓',title:k.name.split(' ')[0]+(p.action==='promote'?' has been promoted':p.action==='repeat'?' will repeat '+p.from:p.action==='transfer'?' has transferred':' has completed school'),text:promoText(p)+'.',date:p.date,unread:!seen||p.date>seen});});
 out.sort((a,b)=>String(b.date).localeCompare(String(a.date)));return out;}
function updateBell(){const b=$('bellBtn');if(!b)return;const n=notifications().filter(x=>x.unread).length;b.classList.toggle('has-notes',n>0);const i=b.querySelector('i');if(i)i.textContent=n>9?'9+':(n?String(n):'');b.setAttribute('aria-label',n?'Messages: '+n+' new':'Messages');}
function openNotifications(){const n=notifications(),fresh=n.filter(x=>x.unread).length;
 $('pdModal').innerHTML=`<div class="modal-head"><div><h3>Messages</h3><p>${n.length?(fresh?fresh+' new · ':'')+n.length+' in total':'You are all caught up'}</p></div><button class="modal-close" data-pd="close">×</button></div>`+(n.length?n.map(x=>`<div class="nt-row${x.unread?' new':''}"><span class="nt-ico">${x.icon}</span><div class="nt-body"><div class="nt-top"><strong>${escH(x.title)}</strong>${x.unread?'<em class="nt-new">NEW</em>':''}</div><small>${escH(x.text)}</small><span class="nt-time">${ago(x.date)}</span>${x.act?`<button type="button" class="reg-btn gold" data-nt="${x.act}" data-ref="${escH(x.ref||'')}">${x.actLabel}</button>`:''}</div></div>`).join(''):'<div class="bk-note ok">No messages yet.</div>');
 $('pdBackdrop').classList.remove('hidden');if(currentUser){NOTE_SEEN[currentUser.id]=new Date().toISOString();store.set(SEEN_KEY,JSON.stringify(NOTE_SEEN));}updateBell();}
$('bellBtn').onclick=openNotifications;
document.addEventListener('click',e=>{const b=e.target.closest('[data-nt]');if(!b)return;const a=b.dataset.nt;
 if(a==='promote'){closePd();openPromotion();}
 else if(a==='results'){closePd();exTerm=3;exType='END';exView='list';showPage('exams');}
 else if(a==='reviewpay'){closePd();openPayReview(b.dataset.ref);}
 else if(a==='viewg9'){closePd();openG9Summary(b.dataset.ref);}});

/* ----- date of birth: rolling date picker ----- */
const DOB_MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DOB_ITEM=44;
const daysIn=(y,m)=>new Date(y,m+1,0).getDate();
const ageForClass=c0=>{const c=gradeOf(c0);return c==='PP1'?4:c==='PP2'?5:/^Grade \d+$/.test(c||'')?+c.slice(6)+5:9;};
const dobYears=()=>{const y=new Date().getFullYear(),a=[];for(let i=1;i<=30;i++)a.push(y-i);return a;};
let dobSel={d:15,m:5,y:2016};
const wheelItems=(arr,sel)=>arr.map((t,i)=>`<div class="wi${i===sel?' sel':''}" data-i="${i}">${t}</div>`).join('');
function dobLabel(){return String(dobSel.d).padStart(2,'0')+' '+DOB_MONTHS[dobSel.m]+' '+dobSel.y;}
function openDobPicker(){
 const iso=$('stDob').dataset.iso;let cur=null;
 if(iso){const p=iso.split('-').map(Number);cur={y:p[0],m:p[1]-1,d:p[2]};}
 if(!cur)cur={y:new Date().getFullYear()-ageForClass($('stClass').value),m:5,d:15};
 const ys=dobYears();if(!ys.includes(cur.y))cur.y=ys[Math.min(ys.length-1,Math.max(0,new Date().getFullYear()-cur.y-1))];
 dobSel=cur;const n=daysIn(cur.y,cur.m);if(dobSel.d>n)dobSel.d=n;
 $('dobModal').innerHTML=`<div class="modal-head"><div><h3>Date of birth</h3><p>Roll each column to choose the day, month and year</p></div><button class="modal-close" data-dob="cancel">×</button></div>
 <div class="dob-show" id="dobShow">${dobLabel()}</div>
 <div class="dob-wheels"><div class="dob-bar"></div>
  <div class="wheel" id="wDay">${wheelItems(Array.from({length:n},(_,i)=>i+1),dobSel.d-1)}</div>
  <div class="wheel" id="wMon">${wheelItems(DOB_MONTHS,dobSel.m)}</div>
  <div class="wheel" id="wYear">${wheelItems(ys,ys.indexOf(dobSel.y))}</div></div>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-dob="clear">Clear</button><button type="button" class="btn btn-light" data-dob="cancel">Cancel</button><button type="button" class="btn btn-primary" data-dob="ok">OK</button></div>`;
 $('dobBackdrop').classList.remove('hidden');
 setTimeout(()=>{$('wDay').scrollTop=(dobSel.d-1)*DOB_ITEM;$('wMon').scrollTop=dobSel.m*DOB_ITEM;$('wYear').scrollTop=ys.indexOf(dobSel.y)*DOB_ITEM;['wDay','wMon','wYear'].forEach(wireWheel);},30);}
function wireWheel(id){const w=$(id);let t=0;
 const idx=()=>Math.max(0,Math.min(w.children.length-1,Math.round(w.scrollTop/DOB_ITEM)));
 const paint=()=>{const c=idx();[...w.children].forEach((x,i)=>{const d=Math.abs(i-c);x.className='wi'+(d===0?' sel':d===1?' n1':d===2?' n2':'');});};
 w.addEventListener('scroll',()=>{paint();clearTimeout(t);t=setTimeout(()=>settleWheel(id,idx()),110);});
 w.addEventListener('click',e=>{const it=e.target.closest('.wi');if(it)w.scrollTo({top:(+it.dataset.i)*DOB_ITEM,behavior:'smooth'});});}
function settleWheel(id,i){
 if(id==='wDay')dobSel.d=i+1;else if(id==='wMon')dobSel.m=i;else dobSel.y=dobYears()[i];
 if(id!=='wDay'){const n=daysIn(dobSel.y,dobSel.m),w=$('wDay');if(w.children.length!==n){if(dobSel.d>n)dobSel.d=n;w.innerHTML=wheelItems(Array.from({length:n},(_,k)=>k+1),dobSel.d-1);w.scrollTop=(dobSel.d-1)*DOB_ITEM;}}
 $('dobShow').textContent=dobLabel();}
$('dobBackdrop').addEventListener('click',e=>{
 if(e.target.id==='dobBackdrop'){$('dobBackdrop').classList.add('hidden');return}
 const a=e.target.dataset&&e.target.dataset.dob;if(!a)return;
 if(a==='cancel')$('dobBackdrop').classList.add('hidden');
 else if(a==='clear'){$('stDob').value='';$('stDob').dataset.iso='';$('dobBackdrop').classList.add('hidden');}
 else if(a==='ok'){const n=daysIn(dobSel.y,dobSel.m);if(dobSel.d>n)dobSel.d=n;$('stDob').value=dobLabel();$('stDob').dataset.iso=dobSel.y+'-'+String(dobSel.m+1).padStart(2,'0')+'-'+String(dobSel.d).padStart(2,'0');$('dobBackdrop').classList.add('hidden');}});
$('stDob').addEventListener('click',openDobPicker);

/* ================= v1.7: Backup & Restore, Excel/CSV import and export ================= */
const IMP_KEY='edutrack_imports',FLAG_KEY='edutrack_flags',LASTBK_KEY='edutrack_lastbackup',RESET_PASS_KEY='klasora_school_reset_credential';
const FEESTR_KEY='edutrack_fee_structure',PAY_KEY='edutrack_payments',INBOX_KEY='edutrack_inbox',PAYNOTE_KEY='edutrack_paynotes';
const BACKUP_KEYS=[ACCOUNTS_KEY,INBOX_KEY,PAYNOTE_KEY,FEESTR_KEY,PAY_KEY,SCHOOL_KEY,PROFILE_KEY,NEWSTU_KEY,PACC_KEY,IMP_KEY,FLAG_KEY,REG_KEY,RES_KEY,SUBJ_KEY,STUSUBJ_KEY,CREDS_KEY,TEACH_KEY,REPL_KEY,PROMO_KEY];
const IMP_DATASETS=['teachers','fees','expenses','library','inventory'];
let IMPORTS={teachers:[],fees:[],expenses:[],library:[],inventory:[]};
const BASE_ROWS={};IMP_DATASETS.forEach(k=>BASE_ROWS[k]=modules[k].rows.slice());
function applyImports(){IMP_DATASETS.forEach(k=>{modules[k].rows=[...IMPORTS[k],...(HIDE[k]?[]:BASE_ROWS[k])];});}
applyImports();
modules.backup={title:'Backup & Restore',subtitle:'Back up everything, restore it later, or bring your Excel records into the system.',stats:[['Datasets','6'],['Formats','JSON / Excel'],['Works','Offline']],heads:['ITEM'],rows:[]};
PAGE_NAMES.backup='Backup & Restore';
ROLES.accountant.pages.push('backup','settings');

/* ----- small helpers ----- */
const nrm=s=>String(s==null?'':s).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const cleanTxt=v=>String(v==null?'':v).replace(/[<>]/g,'').replace(/\s+/g,' ').trim();
const escH=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toNum=v=>{const n=parseFloat(String(v==null?'':v).replace(/[^0-9.\-]/g,''));return isFinite(n)?Math.round(n):NaN;};
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(v){const s=cleanTxt(v);if(!s)return'';let d=null,m;
 if(/^\d{5}(\.\d+)?$/.test(s)){const n=parseFloat(s);if(n>20000&&n<80000)d=new Date(Math.round((n-25569)*86400000));}
 else if((m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)))d=new Date(Date.UTC(+m[1],m[2]-1,+m[3]));
 else if(/^\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}$/.test(s)){const p=s.split(/[\/\-.]/);let y=+p[2];if(y<100)y+=2000;d=new Date(Date.UTC(y,p[1]-1,+p[0]));}
 if(!d||isNaN(d))return s;return String(d.getUTCDate()).padStart(2,'0')+' '+MONTHS[d.getUTCMonth()]+' '+d.getUTCFullYear();}
function normClass(v){const s=cleanTxt(v);if(!s)return'';const l=s.toLowerCase();let m=l.match(/^pp\s*-?\s*([12])\b/);if(m)return'PP'+m[1];
 m=l.match(/^(?:grade|class|std|standard|g)?\s*-?\s*(\d{1,2})\b/);if(m&&+m[1]>=1&&+m[1]<=12)return'Grade '+(+m[1]);return s;}
const normGender=v=>/^f/i.test(cleanTxt(v))?'Female':/^m/i.test(cleanTxt(v))?'Male':'';
const normRel=v=>/mother|mum|mom|mama/i.test(v)?'Mother':/father|dad|baba/i.test(v)?'Father':'Guardian';
const normStuStatus=v=>{const s=cleanTxt(v).toLowerCase();return!s||/active|enrol|current/.test(s)?'Active':/pend/.test(s)?'Pending':/suspend/.test(s)?'Suspended':/transfer/.test(s)?'Transferred':'Inactive';};
const normExpStatus=v=>{const s=cleanTxt(v).toLowerCase();return/approv|paid/.test(s)?'Approved':/reject|declin/.test(s)?'Rejected':'Pending';};
const normCond=v=>{const s=cleanTxt(v).toLowerCase();return!s||/good|new|excellent/.test(s)?'Good':/fair|average/.test(s)?'Fair':/poor|bad|damag|broken/.test(s)?'Poor':/low/.test(s)?'Low Stock':cleanTxt(v);};
const normLibStatus=v=>{const s=cleanTxt(v).toLowerCase();return!s||/avail|in/.test(s)?'Available':/overdue|late/.test(s)?'Overdue':/issue|out|borrow/.test(s)?'Issued':cleanTxt(v);};

/* ===== Shule V3: staff and announcement records ===== */
const STAFF_KEY='edutrack_staff',ANN_KEY='edutrack_announcements',ANN_AUD=['Parents','Teachers','Whole School'];
let STAFF=[],ANN=[];
BACKUP_KEYS.push(STAFF_KEY,ANN_KEY);

/* ----- live (imported) figures ----- */
const isLive=k=>k==='students'?(!!HIDE.students||EXTRA.some(x=>x.imp)):(!!HIDE[k]||(IMPORTS[k]||[]).length>0);
const kshC=n=>n>=1e6?'KSh '+(n/1e6).toFixed(2)+'M':money(n);
const SUPPORT_RX=/librarian|accountant|secretary|security|driver|cook|clean|ground|nurse|caretaker|watchman|bursar|clerk|matron|support|admin|receptionist/i;
const cnt=(arr,fn,order)=>{const m={};arr.forEach(x=>{const k=fn(x)||'Not stated';m[k]=(m[k]||0)+1});let e=Object.entries(m);
 e=order?e.sort((a,b)=>{const i=order.indexOf(a[0]),j=order.indexOf(b[0]);return(i<0?99:i)-(j<0?99:j)||a[0].localeCompare(b[0]);}):e.sort((a,b)=>b[1]-a[1]);return e.slice(0,12).map(([k,v])=>[k,String(v)]);};
const sumBy=(rows,kf,vf)=>{const m={};rows.forEach(r=>{const k=kf(r)||'Other';m[k]=(m[k]||0)+vf(r)});return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([k,v])=>[k,money(v)]);};
const LIVE_SPEC={
 students:{stats:()=>{const a=allStudents();return[['Total Students',String(a.length)],['Active Students',String(a.filter(s=>s.status==='Active').length)],['Linked to Parents',String(a.filter(s=>s.gphone&&accountFor(s.gphone)).length)]];},
  details:[()=>{const a=allStudents();return{sub:'Learners on the register',sections:[['BY CLASS',cnt(a,s=>s.cls,CLASS_LIST)],['BY GENDER',cnt(a,s=>s.gender)]]};},
   ()=>({sub:'Status of every learner',sections:[['BY STATUS',cnt(allStudents(),s=>s.status)]]}),
   ()=>{const a=allStudents(),w=a.filter(s=>s.gphone).length;return{sub:'Parent contacts and portal accounts',sections:[['PARENT CONTACTS',[['Phone on file',String(w)],['No phone on file',String(a.length-w)],['Portal accounts linked',String(a.filter(s=>s.gphone&&accountFor(s.gphone)).length)]]]]};}]},
 teachers:{stats:r=>{const t=r.filter(x=>!SUPPORT_RX.test(x[2])).length;return[['Total Staff',String(r.length)],['Teaching Staff',String(t)],['Support Staff',String(r.length-t)]];},
  details:[()=>({sub:'All employees on the register',sections:[['BY STATUS',cnt(modules.teachers.rows,r=>r[4])]]}),
   ()=>({sub:'Teaching staff by role',sections:[['BY ROLE',cnt(modules.teachers.rows.filter(x=>!SUPPORT_RX.test(x[2])),r=>r[2])]]}),
   ()=>{const s=modules.teachers.rows.filter(x=>SUPPORT_RX.test(x[2]));return{sub:'Non-teaching employees',sections:[['SUPPORT STAFF',s.length?s.slice(0,10).map(x=>[x[0],x[2]]):[['None','-']]]]};}]},
 fees:{stats:r=>[['Billed',kshC(sumCol(r,2))],['Collected',kshC(sumCol(r,3))],['Outstanding',kshC(sumCol(r,4))]],
  details:[()=>{const r=modules.fees.rows,n=r.length;return{sub:'Total invoiced',sections:[['INVOICES',[['Invoices issued',String(n)],['Average invoice',money(n?Math.round(sumCol(r,2)/n):0)]]]]};},
   ()=>{const r=modules.fees.rows,b=sumCol(r,2);return{sub:'Money received',sections:[['COLLECTION',[['Collection rate',(b?sumCol(r,3)/b*100:0).toFixed(1)+'%'],['Fully paid',String(r.filter(x=>numOf(x[4])===0).length)]]]]};},
   ()=>{const r=modules.fees.rows.filter(x=>numOf(x[4])>0);return{sub:'Still to be collected',sections:[['LEARNERS WITH BALANCE',[['Count',String(r.length)]]],['LARGEST BALANCES',r.slice().sort((a,b)=>numOf(b[4])-numOf(a[4])).slice(0,5).map(x=>[x[0],x[4]])]]};}]},
 expenses:{stats:r=>[['Total Spend',kshC(sumCol(r,3))],['Awaiting Approval',String(r.filter(x=>x[4]==='Pending').length)],['Approved',kshC(sumCol(r.filter(x=>x[4]==='Approved'),3))]],
  details:[()=>({sub:'Spending by category',sections:[['BY CATEGORY',sumBy(modules.expenses.rows,r=>r[2],r=>numOf(r[3]))]]}),
   ()=>({sub:'Requests waiting for approval',sections:[['PENDING',modules.expenses.rows.filter(x=>x[4]==='Pending').slice(0,10).map(x=>[x[1],x[3]])]]}),
   ()=>({sub:'Approved spending by category',sections:[['APPROVED',sumBy(modules.expenses.rows.filter(x=>x[4]==='Approved'),r=>r[2],r=>numOf(r[3]))]]})]},
 library:{stats:r=>[['Titles',String(r.length)],['Total Copies',String(sumCol(r,3))],['Out of Stock',String(r.filter(x=>numOf(x[3])===0).length)]],
  details:[()=>({sub:'Titles by category',sections:[['BY CATEGORY',cnt(modules.library.rows,r=>r[2])]]}),
   ()=>({sub:'Copies by category',sections:[['COPIES',sumBy(modules.library.rows,r=>r[2],r=>numOf(r[3])).map(x=>[x[0],x[1].replace('KSh ','')])]]}),
   ()=>({sub:'Titles with no copies left',sections:[['OUT OF STOCK',modules.library.rows.filter(x=>numOf(x[3])===0).slice(0,10).map(x=>[x[0],x[4]])]]})]},
 inventory:{stats:r=>[['Items',String(r.length)],['Low Stock',String(r.filter(x=>x[4]==='Low Stock').length)],['Needs Attention',String(r.filter(x=>x[4]==='Fair'||x[4]==='Poor').length)]],
  details:[()=>({sub:'Items by category',sections:[['BY CATEGORY',cnt(modules.inventory.rows,r=>r[2])]]}),
   ()=>({sub:'Running out soon',sections:[['LOW STOCK',modules.inventory.rows.filter(x=>x[4]==='Low Stock').slice(0,10).map(x=>[x[0],x[3]+' left'])]]}),
   ()=>({sub:'Fair or poor condition',sections:[['NEEDS ATTENTION',modules.inventory.rows.filter(x=>x[4]==='Fair'||x[4]==='Poor').slice(0,10).map(x=>[x[0],x[4]])]]})]}
};
function sumCol(rows,c){return rows.reduce((a,r)=>a+numOf(r[c]),0);}
(()=>{const ds=DETAILS.staff,df=DETAILS.fees;
 DETAILS.staff=()=>{if(!isLive('teachers'))return ds();const d=LIVE_SPEC.teachers.details[1](),st=LIVE_SPEC.teachers.stats(modules.teachers.rows)[1];return{tone:'tone-purple',label:st[0],value:st[1],title:'Staff Details',sub:d.sub,go:'teachers',goLabel:'Open Staff',body:d.sections.map(s=>sec(s[0],s[1])).join('')};};
 DETAILS.fees=()=>{if(!isLive('fees'))return df();const d=LIVE_SPEC.fees.details[1](),st=LIVE_SPEC.fees.stats(modules.fees.rows)[1];return{tone:'tone-orange',label:'Fees Collected',value:st[1],title:'Fee Collection Details',sub:d.sub,go:'fees',goLabel:'Open Fees',body:d.sections.map(s=>sec(s[0],s[1])).join('')};};
 const dst=DETAILS.students;DETAILS.students=()=>{if(!isLive('students'))return dst();const d=LIVE_SPEC.students.details[0](),n=allStudents().length;return{tone:'tone-blue',label:'Total Students',value:String(n),title:'Student Details',sub:d.sub,go:'students',goLabel:'Open Students',body:d.sections.map(s=>sec(s[0],s[1])).join('')};};})();
function refreshDashLive(){
 {const _ad=attToday(),_c=document.querySelector('[data-stat="attendance"]');if(_c){const n=_c.querySelector('.stat-number'),t=_c.querySelector('.trend'),f=_c.querySelector('.stat-foot span:last-child');if(n)n.textContent=_ad.marked?_ad.rate+'%':'—';if(t)t.textContent=_ad.marked?_ad.classes+' class'+(_ad.classes===1?'':'es'):'none yet';if(f&&f!==t)f.textContent=_ad.marked?'marked today':'from registers';}}
 const set=(k,val,tr)=>{const c=document.querySelector('[data-stat="'+k+'"]');if(!c)return;const n=c.querySelector('.stat-number');if(n)n.textContent=val;const t=c.querySelector('.trend');if(t)t.textContent=tr||'Imported data';};
 if(isLive('teachers')||STAFF.length)set('staff',staffStats()[1][1],isLive('teachers')?'':'Your records');
 {const T=feeTotals(),n=document.querySelector('[data-stat="fees"] .stat-number'),t=document.querySelector('[data-stat="fees"] .trend');if(n)n.textContent=kshC(T.paid).replace('KSh ','');if(t)t.textContent=(T.fee?Math.round(T.paid/T.fee*100):0)+'%';const fs=document.querySelector('[data-stat="fees"] .stat-foot span:last-child');if(fs&&fs!==t)fs.textContent='of fees collected';}
 if(isLive('students')){const c=document.querySelector('[data-stat="students"] .trend');if(c)c.textContent='Imported data';}
}

/* ----- tiny zip + xlsx engine (works offline, no libraries) ----- */
const ENC=new TextEncoder(),DEC=new TextDecoder('utf-8');
const CRC_T=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(b){let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CRC_T[(c^b[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0;}
function zipStore(files){
 const now=new Date(),dt=((now.getFullYear()-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate(),tm=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1);
 const parts=[],central=[];let off=0;
 files.forEach(f=>{const name=ENC.encode(f.name),data=typeof f.data==='string'?ENC.encode(f.data):f.data,crc=crc32(data);
  const lh=new DataView(new ArrayBuffer(30));lh.setUint32(0,0x04034b50,true);lh.setUint16(4,20,true);lh.setUint16(6,0x0800,true);lh.setUint16(10,tm,true);lh.setUint16(12,dt,true);lh.setUint32(14,crc,true);lh.setUint32(18,data.length,true);lh.setUint32(22,data.length,true);lh.setUint16(26,name.length,true);
  parts.push(new Uint8Array(lh.buffer),name,data);
  const ch=new DataView(new ArrayBuffer(46));ch.setUint32(0,0x02014b50,true);ch.setUint16(4,20,true);ch.setUint16(6,20,true);ch.setUint16(8,0x0800,true);ch.setUint16(12,tm,true);ch.setUint16(14,dt,true);ch.setUint32(16,crc,true);ch.setUint32(20,data.length,true);ch.setUint32(24,data.length,true);ch.setUint16(28,name.length,true);ch.setUint32(42,off,true);
  central.push(new Uint8Array(ch.buffer),name);off+=30+name.length+data.length;});
 const cd=central.reduce((a,p)=>a+p.length,0),end=new DataView(new ArrayBuffer(22));end.setUint32(0,0x06054b50,true);end.setUint16(8,files.length,true);end.setUint16(10,files.length,true);end.setUint32(12,cd,true);end.setUint32(16,off,true);
 const out=new Uint8Array(off+cd+22);let p=0;[...parts,...central,new Uint8Array(end.buffer)].forEach(a=>{out.set(a,p);p+=a.length});return out;}
const xmlEsc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'');
const colName=i=>{let s='';i++;while(i>0){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s;};
const XML_HEAD='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const NS_R='http://schemas.openxmlformats.org/officeDocument/2006/relationships',NS_PKG='http://schemas.openxmlformats.org/package/2006/relationships',NS_SS='http://schemas.openxmlformats.org/spreadsheetml/2006/main';
const STYLES_XML=XML_HEAD+`<styleSheet xmlns="${NS_SS}"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF12338A"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
function sheetXml(heads,rows){
 const w=heads.map((h,i)=>Math.min(42,Math.max(String(h).length+3,10,...rows.slice(0,60).map(r=>String(r[i]==null?'':r[i]).length+2))));
 const cell=(v,r,c,hd)=>{const ref=colName(c)+r,s=hd?' s="1"':'';if(typeof v==='number'&&isFinite(v))return`<c r="${ref}"${s}><v>${v}</v></c>`;const t=v==null?'':String(v);return t===''?'':`<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${xmlEsc(t)}</t></is></c>`;};
 let x=XML_HEAD+`<worksheet xmlns="${NS_SS}"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>`+w.map((n,i)=>`<col min="${i+1}" max="${i+1}" width="${n}" customWidth="1"/>`).join('')+'</cols><sheetData>';
 x+='<row r="1">'+heads.map((h,c)=>cell(h,1,c,true)).join('')+'</row>';
 rows.forEach((row,i)=>{x+=`<row r="${i+2}">`+heads.map((h,c)=>cell(row[c],i+2,c,false)).join('')+'</row>';});
 return x+'</sheetData></worksheet>';}
function buildXlsx(sheets){
 const used=new Set(),names=sheets.map((s,i)=>{let n=s.name.replace(/[\[\]:*?\/\\]/g,' ').slice(0,31)||'Sheet'+(i+1),k=2;while(used.has(n.toLowerCase())){n=n.slice(0,28)+' '+k++;}used.add(n.toLowerCase());return n;});
 const WS='application/vnd.openxmlformats-officedocument.spreadsheetml.';
 return zipStore([
  {name:'[Content_Types].xml',data:XML_HEAD+`<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="${WS}sheet.main+xml"/>`+sheets.map((s,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="${WS}worksheet+xml"/>`).join('')+`<Override PartName="/xl/styles.xml" ContentType="${WS}styles+xml"/></Types>`},
  {name:'_rels/.rels',data:XML_HEAD+`<Relationships xmlns="${NS_PKG}"><Relationship Id="rId1" Type="${NS_R}/officeDocument" Target="xl/workbook.xml"/></Relationships>`},
  {name:'xl/workbook.xml',data:XML_HEAD+`<workbook xmlns="${NS_SS}" xmlns:r="${NS_R}"><sheets>`+names.map((n,i)=>`<sheet name="${xmlEsc(n)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')+'</sheets></workbook>'},
  {name:'xl/_rels/workbook.xml.rels',data:XML_HEAD+`<Relationships xmlns="${NS_PKG}">`+sheets.map((s,i)=>`<Relationship Id="rId${i+1}" Type="${NS_R}/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')+`<Relationship Id="rId${sheets.length+1}" Type="${NS_R}/styles" Target="styles.xml"/></Relationships>`},
  {name:'xl/styles.xml',data:STYLES_XML},
  ...sheets.map((s,i)=>({name:`xl/worksheets/sheet${i+1}.xml`,data:sheetXml(s.heads,s.rows)}))]);}
async function inflateRaw(u8){const ds=new DecompressionStream('deflate-raw');return new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(ds)).arrayBuffer());}
async function unzip(buf){
 const u8=new Uint8Array(buf),dv=new DataView(buf);let e=-1;
 for(let i=u8.length-22;i>=Math.max(0,u8.length-65557);i--){if(dv.getUint32(i,true)===0x06054b50){e=i;break}}
 if(e<0)throw new Error('notzip');
 const n=dv.getUint16(e+10,true);let p=dv.getUint32(e+16,true);const files={};
 for(let i=0;i<n;i++){if(dv.getUint32(p,true)!==0x02014b50)break;const method=dv.getUint16(p+10,true),cs=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),el=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true),lo=dv.getUint32(p+42,true);
  files[DEC.decode(u8.subarray(p+46,p+46+nl))]={method,cs,lo};p+=46+nl+el+cl;}
 return{read:async name=>{const f=files[name];if(!f)return null;const ln=dv.getUint16(f.lo+26,true),le=dv.getUint16(f.lo+28,true),s=f.lo+30+ln+le,d=u8.subarray(s,s+f.cs);return f.method===0?d:await inflateRaw(d);}};}
const unesc=s=>s.replace(/&#x([0-9a-f]+);/gi,(m,h)=>String.fromCodePoint(parseInt(h,16))).replace(/&#(\d+);/g,(m,d)=>String.fromCodePoint(+d)).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,'&');
const colIndex=ref=>{let n=0;for(const ch of /^[A-Z]+/.exec(ref)[0])n=n*26+ch.charCodeAt(0)-64;return n-1;};
async function readXlsx(buf){
 const z=await unzip(buf),txt=async n=>{const d=await z.read(n);return d?DEC.decode(d):''};
 const wb=await txt('xl/workbook.xml');if(!wb)throw new Error('badxlsx');
 const relMap={};for(const m of(await txt('xl/_rels/workbook.xml.rels')).matchAll(/<Relationship\b[^>]*>/g)){const id=/\bId="([^"]+)"/.exec(m[0]),tg=/\bTarget="([^"]+)"/.exec(m[0]);if(id&&tg)relMap[id[1]]=tg[1];}
 const ss=[];for(const m of(await txt('xl/sharedStrings.xml')).matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g))ss.push(unesc([...m[1].matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map(x=>x[1]).join('')));
 const sheets=[];
 for(const m of wb.matchAll(/<sheet\b[^>]*>/g)){const nm=/\bname="([^"]*)"/.exec(m[0]),rid=/\br:id="([^"]+)"/.exec(m[0]);if(!nm||!rid)continue;
  let tg=relMap[rid[1]]||'';tg=tg.startsWith('/')?tg.slice(1):'xl/'+tg.replace(/^\.\//,'');
  const xml=await txt(tg),rows=[];
  for(const rm of xml.matchAll(/<row\b[^>]*?(?:\/>|>([\s\S]*?)<\/row>)/g)){
   const ri=/\br="(\d+)"/.exec(rm[0]),cells=[];
   for(const cm of(rm[1]||'').matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)){
    const at=cm[1],body=cm[2]||'',ref=/\br="([A-Z]+\d+)"/.exec(at),t=/\bt="([^"]+)"/.exec(at);let v='';
    if(t&&t[1]==='s'){const x=/<v>([\s\S]*?)<\/v>/.exec(body);v=x?(ss[+x[1]]||''):'';}
    else if(t&&t[1]==='inlineStr')v=unesc([...body.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map(x=>x[1]).join(''));
    else{const x=/<v>([\s\S]*?)<\/v>/.exec(body);v=x?unesc(x[1]):'';if(t&&t[1]==='b')v=v==='1'?'TRUE':'FALSE';}
    if(ref)cells[colIndex(ref[1])]=v;}
   const idx=ri?+ri[1]-1:rows.length;rows[idx]=Array.from(cells,x=>x==null?'':x);}
  for(let i=0;i<rows.length;i++)if(!rows[i])rows[i]=[];
  sheets.push({name:unesc(nm[1]),rows});}
 if(!sheets.length)throw new Error('badxlsx');return sheets;}
function parseCsv(text){
 text=text.replace(/^\uFEFF/,'');const first=text.split(/\r?\n/)[0]||'',d=[',',';','\t'].map(c=>[c,first.split(c).length]).sort((a,b)=>b[1]-a[1])[0][0];
 const rows=[];let row=[],cur='',q=false;
 for(let i=0;i<text.length;i++){const c=text[i];
  if(q){if(c==='"'){if(text[i+1]==='"'){cur+='"';i++}else q=false}else cur+=c}
  else if(c==='"')q=true;else if(c===d){row.push(cur);cur=''}
  else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cur);cur='';rows.push(row);row=[]}else cur+=c;}
 if(cur!==''||row.length){row.push(cur);rows.push(row)}return rows.filter(r=>r.some(x=>String(x).trim()!==''));}

/* ----- what can be imported ----- */
const SPEC=(label,names,cols,conv)=>({label,names,cols:cols.map(c=>({key:c[0],label:c[1],req:!!c[2],aliases:[nrm(c[1]),...c[3].map(nrm)]})),conv});
const IMPORT_SPECS={
 students:SPEC('Students',['students','student','learners','learner','pupils','pupil','student list','class list','admissions'],[
  ['name','Name',1,['student','student name','full name','learner','learner name','pupil','pupil name','names']],
  ['adm','UPI No',0,['upi','upi no','upi number','upi no ','unique pupil identifier','unique pupil id','unique personal identifier','nemis','nemis no','nemis number','admission number','adm no','adm','admission','reg no','registration number','admno','adm number']],
  ['cls','Class',1,['grade','std','standard','form','level','stream','class grade']],
  ['gender','Gender',0,['sex']],['dob','Date of Birth',0,['dob','birth date','birthdate','d o b']],
  ['parent','Parent Name',0,['parent','guardian','guardian name','parent guardian','parents name','parent or guardian','name of parent','parent full name']],
  ['phone','Parent Phone',0,['phone','guardian phone','parent contact','contact','phone number','mobile','tel','parent mobile','parent phone number','guardian contact','telephone','parent s phone']],
  ['relation','Relationship',0,['relation']],['status','Status',0,[]]],
  o=>{const name=cleanTxt(o.name),cls=normClass(o.cls),upi=upiNo(o.adm);if(!name)return{skip:'Missing name'};if(!cls)return{skip:'Missing class'};if(!upi)return{skip:cleanTxt(o.adm)?'Invalid UPI No':'Missing UPI No'};
   const ph=normPhone(o.phone),warn=[];if(cleanTxt(o.phone)&&!ph)warn.push('invalid parent phone');if(ph&&!cleanTxt(o.parent))warn.push('parent name missing');
   return{rec:{name,adm:upi,cls,gender:normGender(o.gender),dob:fmtDate(o.dob),parent:cleanTxt(o.parent),relation:normRel(cleanTxt(o.relation)),phone:ph,status:normStuStatus(o.status),imp:1},warn};}),
 teachers:SPEC('Staff',['staff','teachers','teacher','employees','teaching staff','staff list','teachers staff'],[
  ['name','Name',1,['staff member','staff name','employee','employee name','teacher','full name','teacher name','staff']],
  ['id','Employee ID',0,['emp id','staff id','id','emp no','employee no','tsc no','payroll no','staff no']],
  ['role','Role',0,['position','job title','designation','title','subject']],['phone','Phone',0,['phone number','mobile','contact','tel']],['status','Status',0,[]]],
  o=>{const name=cleanTxt(o.name);if(!name)return{skip:'Missing name'};const ph=normPhone(o.phone);
   return{rec:[name,cleanTxt(o.id),cleanTxt(o.role)||'Teacher',ph?fmtPhone(ph):cleanTxt(o.phone),/leave/i.test(o.status)?'On Leave':/inactive|left|resign/i.test(o.status)?'Inactive':'Active']};}),
 fees:SPEC('Fees',['fees','fee','fee payments','payments','invoices','fee balances','fees payments','fee statement'],[
  ['student','Student',1,['student name','name','learner','pupil','learner name','full name']],
  ['inv','Invoice No',0,['invoice','invoice number','receipt no','receipt','inv no','ref','reference']],
  ['amount','Amount',1,['fee','fees','total','billed','amount due','total fees','fee amount','invoice amount','term fees']],
  ['paid','Paid',0,['amount paid','payments','paid amount','total paid','payment']],['balance','Balance',0,['outstanding','arrears','bal']]],
  o=>{const st=cleanTxt(o.student);if(!st)return{skip:'Missing student name'};const a=toNum(o.amount);if(isNaN(a))return{skip:'Amount is not a number'};
   const p=isNaN(toNum(o.paid))?0:toNum(o.paid),b=cleanTxt(o.balance)!==''&&!isNaN(toNum(o.balance))?toNum(o.balance):a-p;return{rec:[st,cleanTxt(o.inv),money(a),money(p),money(b)]};}),
 expenses:SPEC('Expenses',['expenses','expense','expenditure'],[
  ['date','Date',0,['expense date']],['desc','Description',1,['details','expense','item','particulars','narration','purpose']],
  ['category','Category',0,['type','expense category','vote head','votehead']],['amount','Amount',1,['cost','total','value','amount spent']],['status','Status',0,['approval']]],
  o=>{const d=cleanTxt(o.desc);if(!d)return{skip:'Missing description'};const a=toNum(o.amount);if(isNaN(a))return{skip:'Amount is not a number'};
   return{rec:[fmtDate(o.date)||fmtDate(new Date().toISOString()),d,cleanTxt(o.category)||'General',money(a),normExpStatus(o.status)]};}),
 library:SPEC('Library',['library','books','library books','book list'],[
  ['title','Title',1,['book title','book','name','book name']],['no','Book Code',0,['code','book no','accession no','book number','isbn','id']],
  ['category','Category',0,['type','subject','genre']],['copies','Copies',0,['available','quantity','qty','stock','number of copies']],['status','Status',0,[]]],
  o=>{const t=cleanTxt(o.title);if(!t)return{skip:'Missing title'};const c=toNum(o.copies);return{rec:[t,cleanTxt(o.no),cleanTxt(o.category)||'General',String(isNaN(c)?1:c),normLibStatus(o.status)]};}),
 inventory:SPEC('Inventory',['inventory','assets','stock','store','asset register'],[
  ['item','Item',1,['item name','asset','name','description','asset name','stock item']],['code','Asset Code',0,['item code','tag','tag no','id','serial','code']],
  ['category','Category',0,['type','group']],['qty','Quantity',0,['qty','number','units','count','stock']],['cond','Condition',0,['state']]],
  o=>{const i=cleanTxt(o.item);if(!i)return{skip:'Missing item name'};const q=toNum(o.qty);return{rec:[i,cleanTxt(o.code),cleanTxt(o.category)||'General',String(isNaN(q)?0:q),normCond(o.cond)]};})
};
const AUTO_CODE={teachers:'EMP-',fees:'INV-IMP-',library:'LIB-',inventory:'AST-'};
const allowedSets=()=>currentUser&&currentUser.role==='admin'?Object.keys(IMPORT_SPECS):['fees','expenses'];
function mapHeader(spec,rows){let best={hi:-1,map:{},score:0};
 rows.slice(0,15).forEach((r,hi)=>{const map={};let score=0;r.forEach((h,ci)=>{const n=nrm(h);if(!n)return;for(const c of spec.cols){if(map[c.key]===undefined&&c.aliases.includes(n)){map[c.key]=ci;score++;break;}}});if(score>best.score)best={hi,map,score};});return best;}
function analyzeSheets(sheets){
 const allowed=allowedSets(),out=[],unknown=[];
 sheets.forEach(sh=>{
  let ds=allowed.find(k=>IMPORT_SPECS[k].names.includes(nrm(sh.name)));
  if(!ds){let bs=0;allowed.forEach(k=>{const m=mapHeader(IMPORT_SPECS[k],sh.rows),req=IMPORT_SPECS[k].cols.filter(c=>c.req).every(c=>m.map[c.key]!==undefined);if(req&&m.score>bs){bs=m.score;ds=k;}});if(bs<(sheets.length===1?2:3))ds=null;}
  if(!ds){unknown.push(sh.name);return;}
  const spec=IMPORT_SPECS[ds],m=mapHeader(spec,sh.rows),missing=spec.cols.filter(c=>c.req&&m.map[c.key]===undefined).map(c=>c.label);
  const r={ds,sheet:sh.name,matched:spec.cols.filter(c=>m.map[c.key]!==undefined).map(c=>c.label),missing,recs:[],skipped:[],warns:[],total:0};
  if(!missing.length)sh.rows.slice(m.hi+1).forEach((row,i)=>{
   if(!row.some(x=>String(x).trim()!==''))return;r.total++;
   const o={};spec.cols.forEach(c=>{if(m.map[c.key]!==undefined)o[c.key]=row[m.map[c.key]];});
   const res=spec.conv(o);if(res.skip){r.skipped.push({row:m.hi+i+2,reason:res.skip});return}
   if(res.warn&&res.warn.length)r.warns.push('Row '+(m.hi+i+2)+': '+res.warn.join(', '));r.recs.push(res.rec);});
  out.push(r);});
 return{found:out,unknown};}
function applyDataset(ds,recs,mode){
 const res={added:0,dups:0};
 if(ds==='students'){
  const ex=mode==='replace'?[]:allStudents(),seenAdm=new Set(ex.map(s=>s.adm)),seenKey=new Set(ex.map(s=>normName(s.name)+'|'+s.cls+'|'+s.gphone)),out=[],y=new Date().getFullYear();
  let max=Math.max(0,...ex.filter(s=>s.adm.startsWith(admPrefix()+'-'+y+'-')).map(s=>parseInt(s.adm.slice(-4),10)||0));
  recs.forEach(r=>{const key=normName(r.name)+'|'+r.cls+'|'+r.phone;if((r.adm&&seenAdm.has(r.adm))||seenKey.has(key)){res.dups++;return}
   const x={...r,date:new Date().toISOString().slice(0,10)};if(!x.adm){max++;x.adm=admPrefix()+'-'+y+'-'+String(max).padStart(4,'0');}seenAdm.add(x.adm);seenKey.add(key);out.push(x);});
  if(mode==='replace'){HIDE.students=true;EXTRA=out;}else EXTRA=[...EXTRA,...out];res.added=out.length;
  rebuildStudents();saveStudentsRemote(out);
 }else{
  const ex=mode==='replace'?[]:modules[ds].rows,seen=new Set(ex.map(r=>String(r[1]).toLowerCase())),out=[];let n=ex.length;
  recs.forEach(r=>{const row=r.slice();
   if(ds!=='expenses'){let code=String(row[1]||'').trim();
    if(code&&seen.has(code.toLowerCase())){res.dups++;return}
    if(!code){do{n++;code=AUTO_CODE[ds]+String(n).padStart(3,'0');}while(seen.has(code.toLowerCase()));row[1]=code;}
    seen.add(code.toLowerCase());}
   out.push(row);});
  IMPORTS[ds]=mode==='replace'?out:[...IMPORTS[ds],...out];if(mode==='replace')HIDE[ds]=true;res.added=out.length;
  applyImports();
 }
 saveImportsRemote();return res;}

/* ----- export + templates ----- */
const cellVal=v=>/^KSh\s[\d,]+$/.test(String(v))?numOf(v):v;
const slug=s=>String(s).replace(/[^A-Za-z0-9]+/g,'_').replace(/^_|_$/g,'')||'School';
const today=()=>new Date().toISOString().slice(0,10);
function exportSheets(scope){
 const stu=allStudents(),S=[],phoneOf=n=>{const s=stu.find(x=>x.name===n);return s?fmtPhone(s.gphone):'';};
 if(scope==='all')S.push({name:'Students',heads:['Name','UPI No','Class','Gender','Date of Birth','Parent Name','Relationship','Parent Phone','Status'],rows:stu.map(s=>[s.name,s.adm,s.cls,s.gender,s.dob,s.gname,s.relation,fmtPhone(s.gphone),s.status])},
  {name:'Staff',heads:['Name','Employee ID','Role','Phone','Status'],rows:[...STAFF.map(x=>[x.name,x.empId,x.role,fmtPhone(x.phone),x.status||'Active']),...modules.teachers.rows]});
 S.push({name:'Fees',heads:['Student','Invoice No','Amount','Paid','Balance','Parent Phone'],rows:modules.fees.rows.map(r=>[r[0],r[1],numOf(r[2]),numOf(r[3]),numOf(r[4]),phoneOf(r[0])])},
  {name:'Expenses',heads:['Date','Description','Category','Amount','Status'],rows:modules.expenses.rows.map(r=>[r[0],r[1],r[2],numOf(r[3]),r[4]])});
 if(scope==='all')S.push({name:'Library',heads:['Title','Book Code','Category','Copies','Status'],rows:modules.library.rows.map(r=>[r[0],r[1],r[2],numOf(r[3]),r[4]])},
  {name:'Inventory',heads:['Item','Asset Code','Category','Quantity','Condition'],rows:modules.inventory.rows.map(r=>[r[0],r[1],r[2],numOf(r[3]),r[4]])},
  ...(refreshClassRows(),refreshAnnRows(),['classes','attendance','exams','transport','communication']).map(k=>({name:modules[k].title,heads:modules[k].heads,rows:modules[k].rows.map(r=>r.raw||r)})),
  {name:'Parents',heads:['Parent / Guardian','Phone','Children','Classes','Portal'],rows:guardians().map(g=>[g.names.join(' / '),fmtPhone(g.phone),g.kids.map(k=>k.name).join(', '),[...new Set(g.kids.map(k=>k.cls))].join(', '),portalOf(g.phone)])});
 return S;}
function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},5000);}
const XLSX_MIME='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
function downloadXlsx(sheets,name){downloadBlob(new Blob([buildXlsx(sheets)],{type:XLSX_MIME}),name);}
function exportWorkbook(){if(!currentUser)return;downloadXlsx(exportSheets(currentUser.role==='admin'?'all':'finance'),`EduTrack_${slug(getSchool().name)}_${today()}.xlsx`);toast('Excel workbook downloaded.');}
function exportPage(){
 if(!currentUser)return;const page=activePage();
 if(page==='dashboard'||page==='settings'||page==='backup'){exportWorkbook();return}
 const m=getModule(page);if(!m||!m.heads)return;
 downloadXlsx([{name:m.title,heads:m.heads,rows:m.rows.map(r=>(r.raw||r).map(cellVal))}],`EduTrack_${slug(m.title)}_${today()}.xlsx`);toast(m.title+' exported to Excel.');}
function downloadTemplate(){
 const sets=allowedSets(),S=[{name:'Instructions',heads:['How to use this template'],rows:[['1. Keep the first row (the headings) exactly as it is on each sheet.'],['2. Type or paste your records under the headings. You can delete sheets you do not need.'],['3. Required columns: Students need Name and Class. Fees need Student and Amount. Expenses need Description and Amount.'],['4. For Students, add Parent Name and Parent Phone so parents can link their accounts (phone format: 0712 345 678).'],['5. Save as .xlsx (or .csv), then open Klasora > Backup & Restore > Import from Excel.'],['Your existing Excel columns can have different names (Grade, Sex, Guardian, Mobile). The system recognises the common ones.']]}];
 sets.forEach(k=>S.push({name:IMPORT_SPECS[k].label,heads:IMPORT_SPECS[k].cols.map(c=>c.label),rows:[]}));
 downloadXlsx(S,'EduTrack_Import_Template.xlsx');toast('Template downloaded.');}

/* ----- backup + restore ----- */
function buildBackup(){const data={};BACKUP_KEYS.forEach(k=>{const v=store.get(k);if(v!=null)data[k]=v;});return{app:'EduTrack 360',format:1,version:'1.7',created:new Date().toISOString(),school:getSchool().name,data};}
function backupSummary(b){const j=k=>{try{return JSON.parse(b.data[k])}catch(e){return null}};const st=j(NEWSTU_KEY)||[],pa=j(PACC_KEY)||[],im=j(IMP_KEY)||{};
 return[['School',b.school||'-'],['Created',new Date(b.created).toLocaleString('en-GB')],['Registered / imported students',String(st.length)],['Parent accounts',String(pa.length)],['Imported records (staff, fees, expenses, library, inventory)',String(IMP_DATASETS.reduce((a,k)=>a+((im[k]||[]).length),0))]];}
function downloadBackup(){const b=buildBackup();downloadBlob(new Blob([JSON.stringify(b)],{type:'application/json'}),`EduTrack_Backup_${slug(b.school)}_${today()}.json`);store.set(LASTBK_KEY,b.created);toast('Backup downloaded. Keep the file safe.');renderBackup();}
async function copyBackup(){const t=JSON.stringify(buildBackup());let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(e){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{ok=document.execCommand('copy')}catch(x){}ta.remove();}
 if(ok){store.set(LASTBK_KEY,new Date().toISOString());toast('Backup copied. Paste it into a note or message to yourself.');}else toast('Copy was blocked by the browser. Use Download Backup instead.');}
let RESTORE=null,IMPORT_STATE=null,resetArmed=0;
function prepareRestore(text){
 const area=$('restoreArea');let b=null;try{b=JSON.parse(text)}catch(e){}
 if(!b||b.app!=='EduTrack 360'||!b.data){RESTORE=null;area.innerHTML='<div class="bk-note bad">That does not look like an EduTrack 360 backup file.</div>';return}
 RESTORE=b;area.innerHTML='<div class="bk-note ok">Backup found. Check the details, then restore.</div>'+backupSummary(b).map(r=>`<div class="access-row"><span>${escH(r[0])}</span><span>${escH(r[1])}</span></div>`).join('')+'<div class="bk-note warn">Restoring replaces the school data currently stored in this app.</div><div class="bk-actions"><button class="bk-btn" data-act="restore-apply">Restore now</button><button class="bk-btn ghost dark" data-act="restore-cancel">Cancel</button></div>';}
function applyRestore(){if(!RESTORE)return;BACKUP_KEYS.forEach(k=>{if(RESTORE.data[k]!=null)store.set(k,RESTORE.data[k]);else store.del(k);});toast('Backup restored. Reloading…');setTimeout(()=>location.reload(),700);}

/* ----- Backup & Restore page ----- */
function renderBackup(){
 if(!currentUser)return;const admin=currentUser.role==='admin',last=store.get(LASTBK_KEY);
 const lastTxt=last?new Date(last).toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):'Never';
 $('backupPage').innerHTML=`<div class="bk-grid">`+(admin?`
  <section class="bk-card bk-green"><div class="bk-icon">💾</div><h3>Back up everything</h3><p>Saves your school profile, students, parents, imported records and accounts into one file you can keep safely (phone storage, Google Drive, email).</p><div class="bk-meta">Last backup: <b>${lastTxt}</b></div><div class="bk-actions"><button class="bk-btn" data-act="backup">⬇ Download Backup</button><button class="bk-btn ghost" data-act="copy">Copy as text</button></div></section>
  <section class="bk-card bk-blue"><div class="bk-icon">♻️</div><h3>Restore from backup</h3><p>Choose a backup file you saved earlier, or paste backup text. Nothing changes until you tap Restore now.</p><div class="bk-actions"><label class="bk-btn" for="bkRestoreFile">Choose backup file</label><input type="file" id="bkRestoreFile" accept=".json,application/json,text/plain" class="hidden-file"></div><textarea id="bkPaste" class="bk-paste" rows="2" placeholder="…or paste backup text here"></textarea><div class="bk-actions"><button class="bk-btn ghost" data-act="restore-text">Check pasted text</button></div><div id="restoreArea"></div></section>`:'')+`
  <section class="bk-card bk-orange"><div class="bk-icon">📗</div><h3>Excel import and export</h3><p>${admin?'Bring in your existing Excel records (students with parent phones, staff, fees, expenses, library, inventory) or take your data out to Excel.':'Import fee and expense records from Excel, or export them to Excel.'} CSV files work too.</p>
   <div class="bk-actions"><label class="bk-btn" for="impFile">⬆ Import from Excel / CSV</label><input type="file" id="impFile" accept=".xlsx,.xlsm,.csv,.txt,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="hidden-file"><button class="bk-btn ghost" data-act="xlsx-all">⬇ Export to Excel</button><button class="bk-btn ghost" data-act="template">Blank template</button></div></section></div>
  <div id="importArea"></div>`+(admin?`<div class="bk-reset"><button class="bk-btn danger" data-act="reset" id="bkReset">Reset imported data</button><small>Removes imported and newly registered students and imported records. Parent accounts, profiles and school details stay.</small></div>
  <section class="bk-card" style="margin-top:18px;border:1px solid #f1c4c4"><div class="bk-icon">🔐</div><h3>Full School Data Reset</h3><p>This permanently removes this school's stored learners, parent accounts, staff accounts, attendance, results, fees, payments, messages and settings from this browser. The Willbrod Labs central school registry and school administrator login are not deleted.</p><div class="field"><label>Create / change separate reset password</label><input id="schoolResetPassword" type="password" placeholder="At least 10 characters"></div><div class="field"><label>Confirm reset password</label><input id="schoolResetPassword2" type="password" placeholder="Repeat reset password"></div><button class="bk-btn ghost" data-act="save-reset-key">Save reset password</button><div class="field" style="margin-top:14px"><label>Reset password</label><input id="schoolResetVerify" type="password" placeholder="Enter reset password"></div><div class="field"><label>Type school code to confirm</label><input id="schoolResetCode" placeholder="Type the exact school code"></div><button class="bk-btn danger" data-act="reset-full">Erase all school data</button><small>For safety, download a fresh backup first. This is a local prototype; production reset will require server-side authorisation and an independently verified backup.</small></section>`:'');
 IMPORT_STATE=null;RESTORE=null;}
function importErr(e){const m=String(e&&e.message||e);
 return m==='oldxls'?'Old .xls files are not supported. In Excel choose Save As, then Excel Workbook (.xlsx) or CSV, and try again.':
 typeof DecompressionStream==='undefined'?'This browser cannot open compressed Excel files. In Excel choose Save As, then CSV, and import the CSV file.':
 'This file could not be read. Make sure it is a normal .xlsx or .csv file (not password protected).';}
async function handleImportFile(file){
 const area=$('importArea');area.innerHTML='<div class="bk-note">Reading file…</div>';
 try{const n=file.name.toLowerCase();let sheets;
  if(/\.(csv|txt)$/.test(n))sheets=[{name:file.name.replace(/\.[^.]+$/,''),rows:parseCsv(await file.text())}];
  else if(/\.xls$/.test(n))throw new Error('oldxls');
  else sheets=await readXlsx(await file.arrayBuffer());
  IMPORT_STATE=analyzeSheets(sheets);renderImportPreview();
 }catch(e){area.innerHTML=`<div class="bk-note bad">${escH(importErr(e))}</div>`;}}
function renderImportPreview(){
 const area=$('importArea'),st=IMPORT_STATE;
 if(!st.found.length){area.innerHTML=`<div class="bk-note bad">No recognisable records were found. Download the blank template to see the column names we expect.${st.unknown.length?' Sheets skipped: '+escH(st.unknown.join(', '))+'.':''}</div>`;return}
 area.innerHTML='<div class="section-title">IMPORT PREVIEW</div>'+st.found.map((r,i)=>{const sp=IMPORT_SPECS[r.ds],bad=r.missing.length>0;
  return`<div class="imp-card${bad?' bad':''}"><label class="imp-check"><input type="checkbox" data-imp="${i}" ${bad||!r.recs.length?'disabled':'checked'}><b>${sp.label}</b><small>from sheet “${escH(r.sheet)}”</small></label>
  ${bad?`<div class="bk-note bad">Missing required column: ${escH(r.missing.join(', '))}. Add it to the first row of that sheet.</div>`:`<div class="imp-stats"><span class="pill g">${r.recs.length} ready</span>${r.skipped.length?`<span class="pill r">${r.skipped.length} skipped</span>`:''}${r.warns.length?`<span class="pill o">${r.warns.length} warnings</span>`:''}</div>
  <div class="imp-meta">Columns found: ${escH(r.matched.join(', '))}</div>
  ${r.skipped.length?`<div class="imp-meta">Skipped: ${r.skipped.slice(0,4).map(s=>`row ${s.row} (${escH(s.reason)})`).join('; ')}${r.skipped.length>4?'…':''}</div>`:''}
  ${r.warns.length?`<div class="imp-meta">Warnings: ${r.warns.slice(0,3).map(escH).join('; ')}${r.warns.length>3?'…':''}</div>`:''}
  <div class="imp-prev">${r.recs.slice(0,3).map(x=>escH(Array.isArray(x)?x.slice(0,4).join(' · '):[x.name,x.cls,x.parent,fmtPhone(x.phone)].filter(Boolean).join(' · '))).join('<br>')}</div>`}</div>`;}).join('')+
 (st.unknown.length?`<div class="bk-note">Sheets not recognised and skipped: ${escH(st.unknown.join(', '))}</div>`:'')+
 `<div class="imp-mode"><label><input type="radio" name="impMode" value="add" checked> <b>Add to existing records</b><small>Duplicates (same UPI No, code or learner) are skipped.</small></label><label><input type="radio" name="impMode" value="replace"> <b>Replace existing records</b><small>Removes the existing records for the chosen datasets and starts fresh from your file.</small></label></div>
 <div class="bk-actions"><button class="bk-btn" data-act="import-apply">Import selected</button><button class="bk-btn ghost dark" data-act="import-cancel">Cancel</button></div>`;}
function doImport(){
 const st=IMPORT_STATE;if(!st)return;const mode=(document.querySelector('input[name="impMode"]:checked')||{}).value||'add',secs=[];
 document.querySelectorAll('#importArea input[data-imp]').forEach(cb=>{if(!cb.checked)return;const r=st.found[+cb.dataset.imp],a=applyDataset(r.ds,r.recs,mode);
  secs.push([IMPORT_SPECS[r.ds].label.toUpperCase(),[['Added',String(a.added)],['Duplicates skipped',String(a.dups)],['Rows skipped (problems)',String(r.skipped.length)]]]);});
 if(!secs.length){toast('Tick at least one dataset to import.');return}
 applyRole();if(currentUser)refreshUsersModule();IMPORT_STATE=null;renderBackup();
 showDetail({grad:G.green,label:mode==='replace'?'Replaced with your records':'Added to the system',value:'Import done',title:'Import Complete',sub:'Your records are now in the system',go:'backup',goLabel:'Done',body:secs.map(s=>sec(s[0],s[1])).join('')});}
$('backupPage').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
 if(a==='backup')downloadBackup();else if(a==='copy')copyBackup();else if(a==='xlsx-all')exportWorkbook();else if(a==='template')downloadTemplate();
 else if(a==='restore-text'){const t=$('bkPaste').value.trim();if(!t){toast('Paste the backup text first.');return}prepareRestore(t);}
 else if(a==='restore-apply')applyRestore();else if(a==='restore-cancel'){RESTORE=null;$('restoreArea').innerHTML='';}
 else if(a==='import-apply')doImport();else if(a==='import-cancel'){IMPORT_STATE=null;$('importArea').innerHTML='';}
 else if(a==='save-reset-key'){const p1=$('schoolResetPassword').value,p2=$('schoolResetPassword2').value;if(p1.length<10||p1!==p2){toast('Use at least 10 characters and make sure both passwords match.');return}const salt=[...randBytes(12)].map(x=>x.toString(16).padStart(2,'0')).join('');store.set(RESET_PASS_KEY,JSON.stringify({salt,hash:hashPass(p1,salt),updated:new Date().toISOString()}));$('schoolResetPassword').value='';$('schoolResetPassword2').value='';toast('Separate school reset password saved.');}
 else if(a==='reset-full'){const saved=store.get(RESET_PASS_KEY);if(!saved){toast('Create the separate reset password first.');return}let cred;try{cred=JSON.parse(saved)}catch(e){}if(!cred||hashPass($('schoolResetVerify').value,cred.salt)!==cred.hash){toast('Incorrect reset password.');return}const expected=String(currentUser.schoolCode||'GFA001').toUpperCase();if($('schoolResetCode').value.trim().toUpperCase()!==expected){toast('The school code does not match.');return}if(!store.get(LASTBK_KEY)){toast('Download a fresh backup before erasing school data.');return}if(!confirm('FINAL WARNING: This will erase all school records in this browser. Continue?'))return;BACKUP_KEYS.filter(k=>k!==CREDS_KEY).forEach(k=>store.del(k));store.del(RESET_PASS_KEY);store.del(LASTBK_KEY);toast('School data reset. Signing out…');setTimeout(()=>{store.del(SESSION_KEY);location.reload()},700);}
 else if(a==='reset'){if(Date.now()-resetArmed<5000){store.del(NEWSTU_KEY);store.del(IMP_KEY);store.del(FLAG_KEY);toast('Reset done. Reloading…');setTimeout(()=>location.reload(),600);}
  else{resetArmed=Date.now();b.textContent='Tap again to confirm reset';setTimeout(()=>{const x=$('bkReset');if(x)x.textContent='Reset imported data';},5000);}}});
$('backupPage').addEventListener('change',async e=>{
 if(e.target.id==='bkRestoreFile'){const f=e.target.files[0];e.target.value='';if(f)prepareRestore(await f.text());}
 if(e.target.id==='impFile'){const f=e.target.files[0];e.target.value='';if(f)handleImportFile(f);}});

/* ================= Shule V2: Teachers & Subjects =================
   Admin adds teachers and the subjects they teach, class by class.
   Teachers (portal) only see the teachers of their own class. */
const TSUBJ_KEY='edutrack_teacher_subjects';
let TS=[],tsArm='',tsFrom='';
BACKUP_KEYS.push(TSUBJ_KEY);
function saveTS(){saveConfigRemote();return true;}
function tsUniq(a){const seen=new Set(),o=[];a.forEach(x=>{const t=String(x).trim(),k=t.toLowerCase();if(k&&!seen.has(k)){seen.add(k);o.push(t);}});return o;}
function tsNewId(){return 't'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);}

/* The team of one class: number 1 is always the class teacher, then the other teachers. */
function classTeam(cls){
 cls=normKey(cls);
 const ct=teacherOf(cls),all=TS.filter(e=>normKey(e.cls)===cls),ck=ct?normLogin(ct.name):'';
 const mine=ct?all.filter(e=>normLogin(e.name)===ck):[],others=ct?all.filter(e=>normLogin(e.name)!==ck):all;
 const team=[{role:'Class Teacher',name:ct?ct.name:'',vacant:!ct,isCT:true,subjects:tsUniq(mine.flatMap(e=>e.subjects)),ids:mine.map(e=>e.id)}];
 others.forEach(e=>team.push({role:'Subject Teacher',name:e.name,vacant:false,isCT:false,subjects:tsUniq(e.subjects),ids:[e.id]}));
 return{cls,ct,team,count:(ct?1:0)+others.length};
}
function tsTotals(){
 const keys=classKeys(),names=new Set();let cts=0;
 keys.forEach(k=>{const t=teacherOf(k);if(t){cts++;names.add(normLogin(t.name));}});
 TS.forEach(e=>names.add(normLogin(e.name)));
 return{classes:keys.length,teachers:names.size,cts};
}
const tsSubjText=p=>p.isCT?('Class teacher'+(p.subjects.length?' · '+p.subjects.join(', '):'')):(p.subjects.join(', ')||'-');

/* ----- teacher portal: read-only list for their own class ----- */
function teacherClassesView(m){
 const tm=classTeam(TEACHER_CLASS);
 m.title='Teachers & Subjects';
 m.subtitle='The teachers who teach '+tm.cls+' and the subjects each one teaches.';
 m.heads=['NO.','TEACHER','ROLE','SUBJECTS'];
 m.rows=tm.team.map((p,i)=>{const r=[String(i+1),p.vacant?'No class teacher yet':escH(p.name),p.role,p.subjects.length?escH(p.subjects.join(', ')):'—'];r.meta={t:'member',cls:tm.cls,i};return r;});
 m.stats=[['My Class',tm.cls],['Teachers',String(tm.count)],['Subjects',String(tsUniq(tm.team.flatMap(p=>p.subjects)).length)]];
 return m;
}
TEACHER_MSD.classes=[
 ()=>{const tm=classTeam(TEACHER_CLASS);return{sub:'Your class',sections:[['CLASS',[['Class',escH(tm.cls)],['Class teacher',tm.ct?escH(tm.ct.name):'-'],['Learners',String(classStudents(TEACHER_CLASS).length)]]]]};},
 ()=>{const tm=classTeam(TEACHER_CLASS),l=tm.team.filter(p=>!p.vacant);return{sub:'Teachers who teach '+tm.cls,sections:[['TEACHERS',l.length?l.map((p,i)=>[(i+1)+'. '+escH(p.name),escH(tsSubjText(p))]):[['None yet','']]]]};},
 ()=>{const tm=classTeam(TEACHER_CLASS),by={};tm.team.forEach(p=>{if(!p.vacant)p.subjects.forEach(s=>{const k=s.toLowerCase();(by[k]=by[k]||{s,n:[]}).n.push(p.name);});});const rows=Object.values(by).map(x=>[escH(x.s),escH(x.n.join(', '))]);return{sub:'Subjects that have a teacher in '+tm.cls,sections:[['SUBJECTS',rows.length?rows:[['None added yet','The administrator adds them']]]]};}
];

/* ----- details (tap a row) ----- */
function openClassDetail(cls){
 if(!currentUser||currentUser.role!=='admin')return;
 const tm=classTeam(cls),g=G.teal,n=classStudents(tm.cls).length;
 const rows=tm.team.map((p,i)=>{
  const ids=p.ids.join(','),armed=!!ids&&tsArm===ids;
  const del=p.ids.length?`<button type="button" class="ct-btn${armed?' replace':''}" data-tsdel="${ids}" data-cls="${escH(tm.cls)}">${armed?'Tap again to remove':(p.isCT?'Remove subjects':'Remove')}</button>`:'';
  const chips=p.subjects.length?p.subjects.map(x=>`<span>${escH(x)}</span>`).join(''):`<em>${p.vacant?'Create one on the Add Class Teacher page':'No subjects added yet'}</em>`;
  return`<div class="ts-row"><div class="ts-main"><strong>${i+1}. ${p.vacant?'No class teacher yet':escH(p.name)}</strong><small>${p.role}</small><div class="ts-chips">${chips}</div></div>${del}</div>`;}).join('');
 showDetail({grad:[g[0],g[1]],label:'Teachers',value:String(tm.count),title:tm.cls,sub:n+(n===1?' learner':' learners')+' · number 1 is the class teacher',
  body:`<div class="detail-section">TEACHERS IN THIS CLASS</div>${rows}<button type="button" class="btn btn-primary ts-add" data-tsadd="${escH(tm.cls)}">＋ Add teacher to this class</button>`,go:null,goLabel:'Back to list'});
}
function openMemberDetail(m){
 const tm=classTeam(m.cls),p=tm.team[m.i];if(!p)return;const g=G.teal;
 showDetail({grad:[g[0],g[1]],label:p.role,value:p.vacant?'—':escH(p.name),title:p.vacant?'No class teacher yet':p.name,sub:tm.cls,
  body:sec('DETAILS',[['Class',escH(tm.cls)],['Role',p.role],['Number in list',String(m.i+1)]])+sec('SUBJECTS',p.subjects.length?p.subjects.map((x,i)=>[String(i+1),escH(x)]):[['None added yet','']]),go:null,goLabel:'Back to list'});
}
function rerenderPage(){
 if(!currentUser)return;const pg=activePage();if(!['classes','teachers','communication'].includes(pg))return;
 if(pg==='classes')refreshClassRows();if(pg==='communication')refreshAnnRows();
 const m=getModule(pg),q=$('moduleSearch').value.toLowerCase();
 renderModuleStats(pg,m);renderTable(q?m.rows.filter(r=>r.join(' ').toLowerCase().includes(q)):m.rows,false);
}

/* ----- admin: add a teacher and the subjects they teach ----- */
function tsChecks(cls){return subjectsFor(gradeOf(cls)).map(s=>`<label><input type="checkbox" value="${escH(s)}"> <span>${escH(s)}</span></label>`).join('');}
function openTeacherForm(pre,from){
 if(!currentUser||currentUser.role!=='admin')return;
 tsFrom=from||'';
 const keys=classKeys(),want=pre?normKey(pre):'',sel=keys.includes(want)?want:keys[0];
 $('pdModal').innerHTML=`<div class="modal-head"><div><h3>Add teacher</h3><p>Add a teacher and the subjects they teach in a class.</p></div><button type="button" class="modal-close" data-pd="close">×</button></div>
 <div class="form-fields">
  <div class="field"><label>Class *</label><select id="tsClass">${keys.map(k=>`<option value="${escH(k)}"${k===sel?' selected':''}>${escH(k)}</option>`).join('')}</select></div>
  <div class="field"><label>Teacher name *</label><input id="tsName" maxlength="40" placeholder="e.g. Mr. Thomas Otieno" autocomplete="off"></div>
  <div class="field"><label>Subjects taught * <small>(tick all that apply)</small></label><div class="ts-checks" id="tsSubj" data-g="${escH(gradeOf(sel))}">${tsChecks(sel)}</div></div>
  <div class="field"><label>Other subject (optional)</label><input id="tsOther" maxlength="80" placeholder="Type it here. Separate several with commas" autocomplete="off"></div>
 </div>
 <p class="su-hint">The class teacher is always number 1 in the class list. Everyone you add here appears after the class teacher. To add the class teacher's own subjects, type the same name as the class teacher.</p>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-pd="close">Cancel</button><button type="button" class="btn btn-primary" data-ts="save">Save teacher</button></div>`;
 $('pdBackdrop').classList.remove('hidden');
}
$('pdModal').addEventListener('change',e=>{
 if(e.target.id!=='tsClass')return;
 const box=$('tsSubj'),g=gradeOf(e.target.value);
 if(box&&box.dataset.g!==g){box.dataset.g=g;box.innerHTML=tsChecks(e.target.value);}
});
$('pdModal').addEventListener('click',e=>{
 const b=e.target.closest('[data-ts]');if(!b||b.dataset.ts!=='save')return;
 if(!currentUser||currentUser.role!=='admin'){closePd();toast('Permission denied.');return}
 const cls=normKey($('tsClass').value),name=$('tsName').value.replace(/\s+/g,' ').trim();
 if(!classKeys().includes(cls)){toast('Choose a class.');return}
 if(name.length<2){toast("Enter the teacher's name.");$('tsName').focus();return}
 const picked=[...document.querySelectorAll('#tsSubj input:checked')].map(i=>i.value);
 const other=$('tsOther').value.split(',').map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
 if(other.some(x=>x.length>40)){toast('Each subject name must be 40 letters or fewer.');return}
 const subjects=tsUniq([...picked,...other]);
 if(!subjects.length){toast('Choose at least one subject.');return}
 const ct=teacherOf(cls),sameCT=!!ct&&normLogin(ct.name)===normLogin(name);
 const ex=TS.find(x=>normKey(x.cls)===cls&&normLogin(x.name)===normLogin(name));
 if(ex)ex.subjects=tsUniq([...ex.subjects,...subjects]);
 else TS.push({id:tsNewId(),cls,name:sameCT?ct.name:name,subjects,created:new Date().toISOString()});
 const ok=saveTS(),from=tsFrom;tsFrom='';
 closePd();rerenderPage();
 toast((ex?'Subjects updated for ':'Added ')+(ex?ex.name:(sameCT?ct.name:name))+' in '+cls+'.'+(ok?'':' Saved for this session only.'));
 if(from){tsArm='';openClassDetail(from);}
});

/* ----- clicks: tap a row, add from a class, remove ----- */
document.addEventListener('click',e=>{
 if(!currentUser)return;
 const add=e.target.closest('[data-tsadd]');
 if(add){if(currentUser.role!=='admin')return;const c=add.dataset.tsadd;closeDetail();openTeacherForm(c,c);return}
 const del=e.target.closest('[data-tsdel]');
 if(del){
  if(currentUser.role!=='admin')return;
  const ids=del.dataset.tsdel,c=del.dataset.cls;
  if(tsArm!==ids){tsArm=ids;openClassDetail(c);return}
  const set=new Set(ids.split(',')),before=TS.length;
  TS=TS.filter(x=>!set.has(x.id));tsArm='';
  const ok=before!==TS.length?saveTS():true;
  rerenderPage();openClassDetail(c);toast(before===TS.length?'Nothing to remove.':ok?'Removed.':'Removed for this session only.');
  return;
 }
 const tr=e.target.closest('tr.row-click');
 if(tr){
  const r=tableRows[+tr.dataset.ri],mt=r&&r.meta;if(!mt)return;const admin=currentUser.role==='admin';
  if(mt.t==='class'&&admin){tsArm='';openClassDetail(mt.cls);}
  else if(mt.t==='member'&&currentUser.role==='teacher')openMemberDetail(mt);
  else if(mt.t==='ann')openAnnDetail(mt);
  else if(mt.t==='staff'&&admin){stArm='';openStaffDetail(mt);}
 }
});
document.addEventListener('keydown',e=>{
 if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.matches&&e.target.matches('tr.row-click')){e.preventDefault();e.target.click();}
});


/* ================= Shule V3: Teachers & Staff, Announcements =================
   Add New on Teachers & Staff asks: teaching staff or support staff.
   Announcements go to the inbox (message icon) of the chosen audience only. */
let stArm='',stType='',annBusy=false;
const stClean=s=>String(s==null?'':s).replace(/\s+/g,' ').trim();
const saveStaff=()=>{saveMetaRemote('staff',STAFF);return true},saveAnn=()=>{saveMetaRemote('ann',ANN.slice(-200));return true};
function annDate(iso){return new Date(iso).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});}
const stZ=v=>v==null||String(v).trim()===''?'—':String(v);

/* ----- Teachers & Staff list (administrator) ----- */
function staffAll(){
 const base=(modules.teachers.rows||[]).map(r=>({name:String(r[0]||''),id:String(r[1]||''),type:SUPPORT_RX.test(r[2]||'')?'support':'teaching',role:String(r[2]||''),status:r[4]||'Active'}));
 const add=STAFF.map(s=>({name:s.name,id:s.empId,type:s.type,role:s.role,status:s.status||'Active'}));
 return[...add,...base];
}
const STAFF_DEMO=modules.teachers.stats.map(x=>parseInt(String(x[1]).replace(/\D/g,''),10)||0);
function staffCounts(){
 if(isLive('teachers')){const a=staffAll(),t=a.filter(x=>x.type==='teaching').length;return{total:a.length,teaching:t,support:a.length-t};}
 const at=STAFF.filter(x=>x.type==='teaching').length;
 return{total:STAFF_DEMO[0]+STAFF.length,teaching:STAFF_DEMO[1]+at,support:STAFF_DEMO[2]+STAFF.length-at};
}
function staffStats(){const c=staffCounts();return[['Total Staff',String(c.total)],['Teaching Staff',String(c.teaching)],['Support Staff',String(c.support)]];}
function staffView(m){
 const mk=(raw,meta)=>{raw=raw.map(stZ);const r=raw.map(escH);r.raw=raw;r.meta=meta;return r;};
 m.heads=['STAFF MEMBER','EMPLOYEE / ID NO.','TYPE','ROLE / WORK','AGE','PHONE','JOINED','STATUS'];
 const added=STAFF.slice().reverse().map(s=>mk([s.name,s.empId,s.type==='teaching'?'Teaching':'Support',s.role,s.age||'',fmtPhone(s.phone),annDate(s.joined),s.status||'Active'],{t:'staff',id:s.id}));
 const base=m.rows.map(r=>mk([r[0],r[1],SUPPORT_RX.test(r[2]||'')?'Support':'Teaching',r[2],'',r[3],'',r[4]||'Active'],{t:'staff',base:true,row:r.slice(0,5)}));
 m.rows=[...added,...base];
 if(STAFF.length||isLive('teachers'))m.stats=staffStats();
 return m;
}
const staffDetails=[
 ()=>{const c=staffCounts(),a=staffAll();return{sub:'All employees on the register',sections:[['STAFF GROUPS',[['Teaching staff',String(c.teaching)],['Support staff',String(c.support)]]],['BY STATUS',cnt(a,x=>x.status)]]};},
 ()=>{const l=staffAll().filter(x=>x.type==='teaching');return{sub:'Teaching staff and what they teach',sections:[['TEACHING STAFF',l.length?l.slice(0,12).map(x=>[escH(x.name),escH(x.role||'-')]):[['None yet','-']]]]};},
 ()=>{const l=staffAll().filter(x=>x.type==='support');return{sub:'Non-teaching employees and their work',sections:[['SUPPORT STAFF',l.length?l.slice(0,12).map(x=>[escH(x.name),escH(x.role||'-')]):[['None yet','-']]]]};}
];
MSD.teachers=MSD.teachers.map((f,i)=>()=>(STAFF.length||isLive('teachers'))?staffDetails[i]():f());
LIVE_SPEC.teachers.stats=()=>staffStats();
LIVE_SPEC.teachers.details=staffDetails;
(()=>{const d0=DETAILS.staff;DETAILS.staff=()=>{if(isLive('teachers')||!STAFF.length)return d0();const d=staffDetails[1](),st=staffStats()[1];return{tone:'tone-purple',label:st[0],value:st[1],title:'Staff Details',sub:d.sub,go:'teachers',goLabel:'Open Staff',body:d.sections.map(s=>sec(s[0],s[1])).join('')};};})();

function openStaffDetail(m){
 if(!currentUser||currentUser.role!=='admin')return;
 const g=G.purple;let s=null,rows,type,name,role;
 if(m.base){const r=m.row;name=String(r[0]||'');type=SUPPORT_RX.test(r[2]||'')?'support':'teaching';role=String(r[2]||'');
  rows=[[type==='teaching'?'Employee ID':'ID No.',escH(stZ(r[1]))],[type==='teaching'?'Role':'Work',escH(stZ(role))],['Phone',escH(stZ(r[3]))],['Status',escH(stZ(r[4]||'Active'))]];}
 else{s=STAFF.find(x=>x.id===m.id);if(!s)return;name=s.name;type=s.type;role=s.role;const jd=new Date(s.joined);
  rows=type==='teaching'
   ?[['Employment ID',escH(s.empId)],['Role (subjects)',escH(s.role)],['Age',String(s.age||'—')],['Telephone',escH(fmtPhone(s.phone))],['Date joined',annDate(s.joined)],['Year joined',String(jd.getFullYear())],['Status',escH(s.status||'Active')]]
   :[['ID No.',escH(s.empId)],['Work',escH(s.role)],['Telephone',escH(fmtPhone(s.phone))],['Date joined',annDate(s.joined)],['Year joined',String(jd.getFullYear())],['Status',escH(s.status||'Active')]];}
 const del=s?`<button type="button" class="btn btn-light ts-add" data-stdel="${s.id}">${stArm===s.id?'Tap again to remove':'Remove staff member'}</button>`:'';
 showDetail({grad:[g[0],g[1]],label:type==='teaching'?'Teaching staff':'Support staff',value:escH(name),title:name,sub:type==='teaching'?'Teaches: '+role:'Work: '+role,body:sec('DETAILS',rows)+del,go:null,goLabel:'Back to list'});
}
function openStaffChooser(){
 if(!currentUser||currentUser.role!=='admin')return;
 $('pdModal').innerHTML=`<div class="modal-head"><div><h3>Add new staff</h3><p>Who are you adding?</p></div><button type="button" class="modal-close" data-pd="close">×</button></div>
 <div class="st-choice"><button type="button" class="st-card teach" data-stf="teaching"><span>🍎</span><strong>Teaching staff</strong><small>Teachers and the subjects they teach</small></button>
 <button type="button" class="st-card supp" data-stf="support"><span>🛠️</span><strong>Support staff</strong><small>Cook, cleaner, security and others</small></button></div>`;
 $('pdBackdrop').classList.remove('hidden');
}
function openStaffForm(type){
 if(!currentUser||currentUser.role!=='admin')return;
 stType=type;const t=type==='teaching',today=annDate(new Date().toISOString());
 $('pdModal').innerHTML=`<div class="modal-head"><div><h3>${t?'Add teaching staff':'Add support staff'}</h3><p>${t?'Enter the teacher’s details.':'Enter the staff member’s details.'}</p></div><button type="button" class="modal-close" data-pd="close">×</button></div>
 <div class="form-fields">
  <div class="field"><label>${t?'Teacher name':'Name of staff'} *</label><input id="sfName" maxlength="60" placeholder="e.g. ${t?'Mrs. Grace Wanjiru':'John Mwangi'}" autocomplete="off"></div>
  <div class="field"><label>${t?'Employment ID':'ID No.'} *</label><input id="sfEmp" maxlength="20" placeholder="${t?'e.g. EMP-015':'e.g. 12345678'}" autocomplete="off"></div>
  <div class="field"><label>${t?'Role (subjects taught)':'Work'} *</label><input id="sfRole" maxlength="${t?80:40}" ${t?'':'list="sfWorkList"'} placeholder="${t?'e.g. Mathematics, English':'e.g. Cook, Cleaner'}" autocomplete="off">${t?'':'<datalist id="sfWorkList"><option>Cook</option><option>Cleaner</option><option>Security</option><option>Driver</option><option>Groundskeeper</option><option>Secretary</option><option>Librarian</option><option>Nurse</option></datalist>'}</div>
  ${t?'<div class="field"><label>Age *</label><input id="sfAge" type="number" inputmode="numeric" min="18" max="75" placeholder="e.g. 34"></div>':''}
  <div class="field"><label>Telephone number *</label><input id="sfPhone" type="tel" inputmode="tel" maxlength="20" placeholder="e.g. 0712 345 678" autocomplete="off"></div>
  <div class="field"><label>Date joined <small>(automatic)</small></label><input value="${today}" readonly></div>
 </div>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-stf="back">Back</button><button type="button" class="btn btn-primary" data-stf="save">Save</button></div>`;
 $('pdBackdrop').classList.remove('hidden');
}
$('pdModal').addEventListener('click',e=>{
 const b=e.target.closest('[data-stf]');if(!b)return;
 if(!currentUser||currentUser.role!=='admin'){closePd();toast('Permission denied.');return}
 const a=b.dataset.stf;
 if(a==='teaching'||a==='support'){openStaffForm(a);return}
 if(a==='back'){openStaffChooser();return}
 if(a!=='save')return;
 const t=stType==='teaching',name=stClean($('sfName').value),emp=stClean($('sfEmp').value),role=stClean($('sfRole').value),phone=normPhone($('sfPhone').value);
 if(name.length<2){toast('Enter the name.');$('sfName').focus();return}
 if(!/^[A-Za-z0-9][A-Za-z0-9 ./\-]{0,19}$/.test(emp)){toast(t?'Enter a valid employment ID (letters, numbers, - or /).':'Enter a valid ID number.');$('sfEmp').focus();return}
 const dup=staffAll().find(x=>x.id.toLowerCase()===emp.toLowerCase());
 if(dup){toast('That ID is already used by '+dup.name+'.');$('sfEmp').focus();return}
 if(!role){toast(t?'Enter the subjects this teacher teaches.':'Enter the work this person does.');$('sfRole').focus();return}
 let age=0;
 if(t){const raw=String($('sfAge').value).trim();age=Number(raw);if(!raw||!Number.isInteger(age)||age<18||age>75){toast('Enter an age between 18 and 75.');$('sfAge').focus();return}}
 if(!phone){toast('Enter a valid phone number, for example 0712 345 678.');$('sfPhone').focus();return}
 STAFF.push({id:tsNewId(),type:stType,name,empId:emp,role,age:t?age:0,phone,joined:new Date().toISOString(),status:'Active'});
 const ok=saveStaff();closePd();rerenderPage();
 toast(name+' added to '+(t?'teaching':'support')+' staff.'+(ok?'':' Saved for this session only.'));
});
document.addEventListener('click',e=>{
 const d=e.target.closest('[data-stdel]');if(!d||!currentUser||currentUser.role!=='admin')return;
 const id=d.dataset.stdel;
 if(stArm!==id){stArm=id;openStaffDetail({t:'staff',id});return}
 stArm='';const n=STAFF.length;STAFF=STAFF.filter(x=>x.id!==id);
 const ok=n!==STAFF.length?saveStaff():true;closeDetail();rerenderPage();toast(n===STAFF.length?'Nothing to remove.':ok?'Staff member removed.':'Removed for this session only.');
});

/* ----- Announcements ----- */
const SAMPLE_ANN=[];
function buildAnnRows(){
 const mk=o=>{const r=[escH(o.title),o.aud,o.date,escH(o.by),o.st];r.raw=[o.title,o.aud,o.date,o.by,o.st];r.meta={t:'ann',...o};return r;};
 return[...ANN.slice().reverse().map(a=>mk({title:a.title,aud:a.audience,date:annDate(a.created),by:a.by,msg:a.message,st:'Published',id:a.id})),...SAMPLE_ANN.map(mk)];
}
function refreshAnnRows(){modules.communication.rows=buildAnnRows();}
const annVisible=(aud,role)=>role==='admin'||(role==='parent'&&aud==='Parents')||(role==='teacher'&&(aud==='Teachers'||aud==='Whole School'))||(role==='accountant'&&aud==='Whole School');
function annView(m,role){
 m.rows=m.rows.filter(r=>r.meta&&annVisible(r.meta.aud,role));
 m.stats=[['Announcements',String(m.rows.length)],m.stats[1],m.stats[2]];
 return m;
}
MSD.communication[0]=()=>{const a=buildAnnRows();return{sub:'Announcements by audience',sections:[['BY AUDIENCE',ANN_AUD.map(x=>[x,String(a.filter(r=>r.meta.aud===x).length)])],['CREATED BY YOU',[['Announcements sent from this app',String(ANN.length)]]]]};};
const ANN_WHO={'Parents':'All parents (message icon)','Teachers':'All teachers (message icon)','Whole School':'Teachers and the accountant (message icon). Parents do not see it.'};
function openAnnDetail(m){
 const g=G.pink,admin=currentUser&&currentUser.role==='admin';
 showDetail({grad:[g[0],g[1]],label:'Audience',value:escH(m.aud),title:m.title,sub:m.date+' · by '+m.by,
  body:`<div class="detail-section">MESSAGE</div><div class="ann-msg">${escH(m.msg)}</div>`+sec('DETAILS',[['Audience',escH(m.aud)],['Date',escH(m.date)],['Created by',escH(m.by)],['Status',escH(m.st||'Published')]])+(admin?sec('WHO SEES IT',[[escH(m.aud),escH(ANN_WHO[m.aud]||'')]]):''),go:null,goLabel:'Close'});
}
function openAnnouncementForm(){
 if(!currentUser||currentUser.role!=='admin')return;
 annBusy=false;
 $('pdModal').innerHTML=`<div class="modal-head"><div><h3>Add announcement</h3><p>Write the message and choose who receives it.</p></div><button type="button" class="modal-close" data-pd="close">×</button></div>
 <div class="form-fields">
  <div class="field"><label>Title *</label><input id="anTitle" maxlength="80" placeholder="e.g. Parents meeting on Friday" autocomplete="off"></div>
  <div class="field"><label>Audience *</label><select id="anAud">${ANN_AUD.map(a=>`<option>${a}</option>`).join('')}</select></div>
  <p class="su-hint" id="anHint">${escH(ANN_WHO[ANN_AUD[0]])}</p>
  <div class="field"><label>Date <small>(automatic)</small></label><input value="${annDate(new Date().toISOString())}" readonly></div>
  <div class="field"><label>Created by *</label><input id="anBy" maxlength="40" value="${escH(currentUser.name)}" autocomplete="off"></div>
  <div class="field"><label>Message *</label><textarea id="anMsg" rows="5" maxlength="1000" placeholder="Type what you want to say…"></textarea></div>
 </div>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-pd="close">Cancel</button><button type="button" class="btn btn-primary" data-an="done">Done</button></div>`;
 $('pdBackdrop').classList.remove('hidden');
}
$('pdModal').addEventListener('change',e=>{if(e.target.id==='anAud'){const h=$('anHint');if(h)h.textContent=ANN_WHO[e.target.value]||'';}});
$('pdModal').addEventListener('click',e=>{
 const b=e.target.closest('[data-an]');if(!b||b.dataset.an!=='done')return;
 if(!currentUser||currentUser.role!=='admin'){closePd();toast('Permission denied.');return}
 if(annBusy)return;
 const title=stClean($('anTitle').value),aud=$('anAud').value,by=stClean($('anBy').value),message=$('anMsg').value.replace(/\r/g,'').replace(/\n{3,}/g,'\n\n').trim();
 if(title.length<2){toast('Enter a title.');$('anTitle').focus();return}
 if(!ANN_AUD.includes(aud)){toast('Choose who the announcement is for.');return}
 if(by.length<2){toast('Enter who created the announcement.');$('anBy').focus();return}
 if(message.length<2){toast('Write the message.');$('anMsg').focus();return}
 annBusy=true;
 ANN.push({id:tsNewId(),title,audience:aud,by,message,created:new Date().toISOString()});
 const ok=saveAnn(),note={icon:'📣',title,text:message+'\n— '+by};
 if(aud==='Parents')pushMsg({...note,role:'parent'});
 else if(aud==='Teachers')pushMsg({...note,role:'teacher'});
 else pushMsg({...note,roles:['teacher','accountant']});
 closePd();rerenderPage();
 toast('Announcement sent to '+(aud==='Whole School'?'the whole school (teachers and accountant)':aud.toLowerCase())+'.'+(ok?'':' Saved for this session only.'));
});

/* ---------- Every school starts with empty records (no sample data) ---------- */
(function clearSampleData(){
 const zero=v=>{v=String(v);return /^KSh/i.test(v)?'KSh 0':/%$/.test(v)?'0%':/^[\d,.]+$/.test(v)?'0':v;};
 Object.keys(modules).forEach(k=>{
  if(k==='settings'||k==='reports')return;
  const m=modules[k];if(m.rows)m.rows.length=0;if(m.stats)m.stats.forEach(x=>{x[1]=zero(x[1]);});
 });
})();
/* ---------- Details panels and drill-downs: live data only, zero for a new school ---------- */
(function clearSampleDetails(){
 const none=()=>({sub:'No records yet for this school',sections:[['SUMMARY',[['Records','0']]]]});
 Object.keys(MSD).forEach(k=>{if(k!=='classes')MSD[k]=MSD[k].map(()=>none);});
 const L=o=>[['Lower Primary',String(o.lower)],['Upper Primary',String(o.upper)],['Junior School',String(o.junior)]];
 MSD.students=[
  ()=>{const n=stuNums();return{sub:'All enrolled learners',sections:[['BY LEVEL',L(n.b)],['BY GENDER',[['Female',String(n.female)],['Male',String(n.male)]]]]}},
  ()=>{const n=stuNums();return{sub:'Learners admitted',sections:[['BY LEVEL',L(n.nw)]]}},
  ()=>{const n=stuNums();return{sub:'Learners currently attending',sections:[['STATUS',[['Active',String(n.active)]]]]}}];
 DETAILS.students=()=>{const n=stuNums();return{tone:'tone-blue',label:'Total Students',value:String(n.total),title:'Student Details',sub:'Current enrolment',go:'students',goLabel:'Open Students',body:sec('BY LEVEL',L(n.b))+sec('STATUS',[['Active students',String(n.active)]])}};
 DETAILS.staff=()=>{const t=USERS.filter(u=>u.role==='teacher').length;return{tone:'tone-purple',label:'Teaching Staff',value:String(t),title:'Staff Details',sub:'Teacher accounts in this school',go:'teachers',goLabel:'Open Staff',body:sec('STAFF',[['Teaching staff',String(t)]])}};
 DETAILS.attendance=()=>({tone:'tone-green',label:"Today's Attendance",value:'0%',title:'Attendance Details',sub:'No register marked yet',go:'attendance',goLabel:'Open Attendance',body:sec('TODAY',[['Present','0'],['Absent','0'],['Late arrivals','0']])});
 DETAILS.fees=()=>({tone:'tone-orange',label:'Fee Collection',value:'KSh 0',title:'Fee Collection Details',sub:'No payments recorded yet',go:'fees',goLabel:'Open Fees',body:sec('THIS TERM',[['Billed','KSh 0'],['Collected','KSh 0'],['Outstanding','KSh 0']])});
 modules.settings.rows[0][1]=(currentUser&&currentUser.schoolName)||'';
 modules.reports.rows.forEach(x=>{x[2]='Not generated yet'});
 Object.defineProperty(modules.reports,'stats',{configurable:true,get(){const ym=new Date().toISOString().slice(0,7);return[['Available Reports',String(allStudents().length?modules.reports.rows.length:0)],['Generated This Month',String(Object.values(RES.gen).filter(d=>String(d).slice(0,7)===ym).length)],['Scheduled','0']];}});
 Object.defineProperty(modules.settings,'stats',{configurable:true,get(){return[['School Profile','Complete'],['Academic Year',String(new Date().getFullYear())],['Accounts',String(USERS.filter(u=>u.role!=='admin').length)]];}});
})();
restoreSession();


/* ================= v2.3: streams per class, class list ================= */
function refreshClassRows(){
 const keys=classKeys(),rows=keys.map(k=>{const t=teacherOf(k),r=[k,t?t.name:'No class teacher yet',String(classStudents(k).length),String(classTeam(k).count),t?'Active':'Pending'];r.meta={t:'class',cls:k};return r;}),T=tsTotals();
 modules.classes.rows=rows;
 modules.classes.stats=[['Classes',String(rows.filter(r=>+r[2]>0).length)],['Teachers',String(T.teachers)],['Class Teachers',String(T.cts)]];
}
function streamInputsVals(){return[...document.querySelectorAll('#streamNames .stream-in')].map(i=>i.value);}
function updateStreamPreview(){
 const n=+$('streamCount').value,v=streamInputsVals().map(x=>x.trim()).filter(Boolean);
 $('streamPreview').textContent=n<2?'Every class has 1 stream, so classes show as Grade 4, Grade 5 and so on.':(v.length?'Classes will show as: '+v.map(x=>'Grade 4 '+x).join(', ')+' ...':'Type the stream names above, for example Red and White.');
}
function renderStreamInputs(n,names){
 const ex=['Red','White','North','West','East','South','Blue','Green','Yellow','Gold'];
 $('streamNames').innerHTML=n<2?'':Array.from({length:n},(_,i)=>`<div class="field"><label>Stream ${i+1} name</label><input class="stream-in" maxlength="20" autocomplete="off" placeholder="e.g. ${ex[i]||'Stream '+(i+1)}" value="${escH((names[i]||''))}"></div>`).join('');
 updateStreamPreview();
}
function initStreamUI(list){
 const sel=$('streamCount');if(!sel.options.length)sel.innerHTML=Array.from({length:10},(_,i)=>`<option value="${i+1}">${i+1} stream${i?'s':''} per class${i===0?' (no names needed)':''}</option>`).join('');
 const l=Array.isArray(list)&&list.length>1?list:[];sel.value=String(Math.max(1,l.length));renderStreamInputs(l.length||1,l);
}
function readStreams(){
 const n=+$('streamCount').value;if(!(n>1))return{list:[]};
 const v=streamInputsVals().map(x=>x.replace(/\s+/g,' ').trim());
 if(v.some(x=>!x))return{error:'Type a name for every stream, for example Red or North. Or choose 1 stream per class.'};
 if(v.some(x=>!/^[A-Za-z0-9][A-Za-z0-9 ]{0,19}$/.test(x)))return{error:'Stream names can use letters and numbers only.'};
 if(new Set(v.map(x=>x.toLowerCase())).size!==v.length)return{error:'Each stream needs a different name.'};
 return{list:v};
}
function onStreamsChanged(list){
 STREAMS=Array.isArray(list)&&list.length>1?list:[];
 rebuildStudents();fillClassSelects();refreshClassRows();
 if(currentUser&&currentUser.role==='admin')regClass=normKey(regClass);
 const cnt={};USERS.filter(u=>u.role==='teacher'&&u.className&&u.status==='Active').forEach(u=>{const k=normKey(u.className);cnt[k]=(cnt[k]||0)+1;});
 return Object.values(cnt).some(x=>x>1)?'Two class teachers now share one class. Use Replace in Add Class Teacher.':'';
}
$('streamCount').addEventListener('change',()=>renderStreamInputs(+$('streamCount').value,streamInputsVals()));
$('streamNames').addEventListener('input',updateStreamPreview);
refreshClassRows();


/* ================= v2.4: fee structure, per-term fees and payments ================= */
const FEE_TERMS=[1,2,3];
const feeYear=()=>new Date().getFullYear();
const termOfMonth=m=>m<4?1:m<8?2:3;
const fmtN=n=>Number(n||0).toLocaleString('en-US');
let FEESTR={};
if(!FEESTR||typeof FEESTR!=='object'||Array.isArray(FEESTR))FEESTR={};
let PAYLOG=[];
const saveFeeStr=()=>{saveMetaRemote('feestr',FEESTR);return true;};
if(!Array.isArray(PAYLOG))PAYLOG=[];
let _fsCache={};
const feeStructSaved=y=>!!FEESTR[y];
function feeStruct(y){
 if(_fsCache[y])return _fsCache[y];
 const ys=Object.keys(FEESTR).map(Number).filter(k=>k<=y).sort((a,b)=>b-a),src=FEESTR[y]||(ys.length?FEESTR[ys[0]]:null)||{},o={};
 CLASS_LIST.forEach(g=>{const a=src[g];o[g]=Array.isArray(a)&&a.length===3?a.map(n=>Math.max(0,parseInt(n,10)||0)):[FEE_BY_CLASS(g),FEE_BY_CLASS(g),FEE_BY_CLASS(g)];});
 return(_fsCache[y]=o);}
const termFee=(cls,t,y)=>(feeStruct(y)[gradeOf(cls)]||[0,0,0])[t-1]||0;
function feeClassOf(s,y){const l=PROMO.log.filter(x=>x.adm===s.adm&&+x.year===y);return gradeOf(l.length&&l[l.length-1].from?l[l.length-1].from:s.cls);}
function feeStartTerm(s,y){const x=EXTRA.find(e=>e.adm===s.adm);if(x&&!x.imp&&x.date){const d=new Date(x.date);if(d.getFullYear()>y)return 4;if(d.getFullYear()===y)return termOfMonth(d.getMonth());}return 1;}
function feeInvoice(s,y){const fr=modules.fees.rows.find(r=>r[0]===s.name);if(fr&&fr[1]&&fr[1]!=='-')return fr[1];return'INV-'+y+'-'+s.adm;}
function feeSeed(s,y,start){
 if(y!==feeYear())return[0,0,0];
 const cls=feeClassOf(s,y),b=t=>start>t?0:termFee(cls,t,y),fr=modules.fees.rows.find(r=>r[0]===s.name);
 if(fr){const paid=numOf(fr[3]);
  if(IMPORTS.fees.some(r=>r[0]===fr[0])){const out=[0,0,0];let left=paid;FEE_TERMS.forEach(t=>{const take=Math.min(left,b(t));out[t-1]=take;left-=take;});return out;}
  return[b(1),b(2),paid];}
 if(isSample(s)){const bb=b(3),h=hashOf(s.adm);return[b(1),b(2),[0,Math.round(bb/2),bb][h%3]];}
 return[0,0,0];}
function feeSummary(s,y){
 y=y||feeYear();const cls=feeClassOf(s,y),st=feeStartTerm(s,y),seed=feeSeed(s,y,st);
 const en=feeEndTerm(s,y),terms=FEE_TERMS.map(t=>{const fee=(st>t||t>en)?null:termFee(cls,t,y);const paid=fee===null?0:(seed[t-1]||0)+PAYLOG.filter(p=>p.adm===s.adm&&+p.year===y&&+p.term===t).reduce((a,p)=>a+p.amount,0);return{t,fee,paid};});
 const fee=terms.reduce((a,x)=>a+(x.fee||0),0),paid=terms.reduce((a,x)=>a+x.paid,0);
 return{adm:s.adm,name:s.name,cls:s.cls,feeCls:cls,inv:feeInvoice(s,y),terms,fee,paid,bal:Math.max(0,fee-paid)};}
const feeBrief=s=>{const f=feeSummary(s);return{inv:f.inv,billed:f.fee,paid:f.paid,bal:f.bal,terms:f.terms};};
function feeTotals(){
 const y=feeYear(),list=allStudents().map(s=>feeSummary(s,y)).filter(f=>f.terms.some(t=>t.fee!==null)),by=[0,1,2].map(i=>({fee:list.reduce((a,f)=>a+(f.terms[i].fee||0),0),paid:list.reduce((a,f)=>a+f.terms[i].paid,0)}));
 return{y,list,byTerm:by,fee:list.reduce((a,f)=>a+f.fee,0),paid:list.reduce((a,f)=>a+f.paid,0),bal:list.reduce((a,f)=>a+f.bal,0),withBal:list.filter(f=>f.bal>0).length};}

/* ---- dashboards, stat cards ---- */
DASH_STATS.accountant=()=>{const T=feeTotals(),pend=modules.expenses.rows.filter(x=>x[4]==='Pending').length;return[['Fees Collected',kshC(T.paid),'this year','green','KSh'],['Outstanding',kshC(T.bal),'to be collected','orange','▤'],['Expenses Pending',String(pend),'awaiting approval','purple','↗'],['Learners Billed',String(T.list.length),'Terms 1 to 3','blue','▤']];};
delete LIVE_SPEC.fees;
MSD.fees=[
 ()=>{const T=feeTotals(),lv={lower:0,upper:0,junior:0};T.list.forEach(f=>{lv[LEVEL_OF(f.feeCls)]+=f.fee;});return{sub:'Total fees for '+T.y,sections:[['BY TERM',T.byTerm.map((t,i)=>['Term '+(i+1),money(t.fee)])],['BY LEVEL',LEVELS3(money(lv.lower),money(lv.upper),money(lv.junior))]]};},
 ()=>{const T=feeTotals(),meth={};PAYLOG.filter(x=>+x.year===T.y).forEach(x=>{meth[x.method]=(meth[x.method]||0)+x.amount;});return{sub:'Money received · '+(T.fee?(T.paid/T.fee*100).toFixed(1):'0.0')+'% of billed',sections:[['BY TERM',T.byTerm.map((t,i)=>['Term '+(i+1),money(t.paid)])],['PAYMENTS RECORDED IN THIS SYSTEM',Object.keys(meth).length?Object.keys(meth).map(k=>[k,money(meth[k])]):[['None yet','-']]]]};},
 ()=>{const T=feeTotals(),top=T.list.filter(f=>f.bal>0).sort((a,b)=>b.bal-a.bal).slice(0,5);return{sub:'Still to be collected',sections:[['LEARNERS WITH BALANCE',[['Count',String(T.withBal)]]],['LARGEST BALANCES',top.length?top.map(f=>[f.name,money(f.bal)]):[['None','-']]]]};}];
DETAILS.fees=()=>{const d=MSD.fees[1](),T=feeTotals();return{tone:'tone-orange',label:'Fees Collected',value:kshC(T.paid),title:'Fee Collection Details',sub:d.sub,go:'fees',goLabel:'Open Fees',body:d.sections.map(x=>sec(x[0],x[1])).join('')};};

/* ---- fee structure cards (admin dashboard, accountant dashboard, parent dashboard) ---- */
function feeStructureHtml(o){
 o=o||{};const y=feeYear(),fs=feeStruct(y),saved=feeStructSaved(y);
 const rows=CLASS_LIST.map(g=>{const a=fs[g];return`<tr><td><strong>${g}</strong></td><td>${fmtN(a[0])}</td><td>${fmtN(a[1])}</td><td>${fmtN(a[2])}</td><td><b>${fmtN(a[0]+a[1]+a[2])}</b></td></tr>`;}).join('');
 return`<article class="panel fee-struct"><div class="panel-heading"><div><h3>Fee Structure · ${y}</h3><p>${saved?'Set by the accountant. Amounts in KSh. Same fees for every stream of a class.':'Starting amounts in KSh. The accountant has not saved a fee structure yet.'}</p></div>${o.edit?'<button class="text-link" data-go="settings">Edit →</button>':''}</div><div class="table-wrap"><table class="fs-table"><thead><tr><th>CLASS</th><th>TERM 1</th><th>TERM 2</th><th>TERM 3</th><th>YEAR</th></tr></thead><tbody>${rows}</tbody></table></div></article>`;}
function parentFeeCardsHtml(u){
 const kids=childrenOf(u);if(!kids.length)return'';const y=feeYear();
 return kids.map(k=>{const f=feeSummary(k,y),title=gradeOf(k.cls)===f.feeCls?k.cls:f.feeCls;
  const rows=f.terms.map(t=>t.fee===null?`<tr><td><strong>Term ${t.t}</strong></td><td colspan="3">Not billed</td></tr>`:`<tr><td><strong>Term ${t.t}</strong></td><td>${fmtN(t.fee)}</td><td>${fmtN(t.paid)}</td><td><b class="${t.fee-t.paid>0?'amt-due':'amt-ok'}">${fmtN(Math.max(0,t.fee-t.paid))}</b></td></tr>`).join('');
  return`<article class="panel fee-struct"><div class="panel-heading"><div><h3>Fee Structure · ${escH(title)}</h3><p>${escH(k.name)} · ${y} · amounts in KSh</p></div><span class="fs-links"><button class="text-link" data-parentpay="${escH(k.adm)}">Report payment</button><button class="text-link" data-go="fees">Statement →</button></span></div><div class="table-wrap"><table class="fs-table"><thead><tr><th>TERM</th><th>FEES</th><th>PAID</th><th>BALANCE</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><td><strong>Year</strong></td><td><b>${fmtN(f.fee)}</b></td><td><b>${fmtN(f.paid)}</b></td><td><b class="${f.bal>0?'amt-due':'amt-ok'}">${fmtN(f.bal)}</b></td></tr></tfoot></table></div></article>`;}).join('');}

/* ---- accountant: fee structure setup (Settings) ---- */
let feeDraft={},feeResetArmed=0;
const feeCap=10000000;
function feeYearSum(g){return feeDraft[g].reduce((a,n)=>a+(parseInt(n,10)||0),0);}
function renderFeeSetup(){
 const y=feeYear(),fs=feeStruct(y);feeDraft={};CLASS_LIST.forEach(g=>feeDraft[g]=fs[g].map(String));
 $('feeSetupPanel').innerHTML=`<div class="panel-heading"><div><h3>Fee Structure · ${y}</h3><p>Set the fees for every class, from PP1 to Grade 12, for each term. The administrator and parents see these amounts. The same fees apply to every stream of a class.</p></div></div>
 ${feeStructSaved(y)?'':'<div class="bk-note warn">No fee structure has been saved for '+y+' yet. These are starting amounts. Change them, then tap Save.</div>'}
 <div class="fee-list">${CLASS_LIST.map(g=>`<div class="fee-card"><div class="fee-card-head"><strong>${g}</strong><span class="fee-year" data-yr="${g}">Year: ${money(feeYearSum(g))}</span></div>
  <div class="fee-inputs">${FEE_TERMS.map(t=>`<label>Term ${t}<input type="text" inputmode="numeric" class="fee-in" data-g="${g}" data-t="${t}" value="${feeDraft[g][t-1]}" autocomplete="off" maxlength="8"></label>`).join('')}</div>
  <button type="button" class="fee-same" data-fee="same" data-g="${g}">Use Term 1 amount for all terms</button></div>`).join('')}</div>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-fee="reset">Reset</button><button type="button" class="btn btn-primary" data-fee="save">Save Fee Structure</button></div>`;
}
$('feeSetupPanel').addEventListener('input',e=>{
 const i=e.target.closest('.fee-in');if(!i)return;const v=i.value.replace(/\D/g,'').slice(0,8);if(v!==i.value)i.value=v;
 feeDraft[i.dataset.g][+i.dataset.t-1]=v;const y=document.querySelector('[data-yr="'+i.dataset.g+'"]');if(y)y.textContent='Year: '+money(feeYearSum(i.dataset.g));});
$('feeSetupPanel').addEventListener('click',e=>{
 const b=e.target.closest('[data-fee]');if(!b)return;const a=b.dataset.fee;
 if(!currentUser||currentUser.role!=='accountant'){toast('Only the accountant can change the fee structure.');return}
 if(a==='same'){const g=b.dataset.g,v=feeDraft[g][0];feeDraft[g]=[v,v,v];document.querySelectorAll('.fee-in[data-g="'+g+'"]').forEach(x=>x.value=v);const y=document.querySelector('[data-yr="'+g+'"]');if(y)y.textContent='Year: '+money(feeYearSum(g));return}
 if(a==='reset'){if(Date.now()-feeResetArmed<5000){delete FEESTR[feeYear()];_fsCache={};saveFeeStr();feeResetArmed=0;renderFeeSetup();toast('Fee structure reset to the starting amounts.');}else{feeResetArmed=Date.now();toast('Tap Reset again to restore the starting amounts.');}return}
 if(a==='save'){
  const out={};for(const g of CLASS_LIST){const arr=feeDraft[g].map(v=>parseInt(v,10));if(arr.some(n=>isNaN(n)||n<0||n>feeCap)){toast('Check '+g+': type an amount for every term (0 to 10,000,000).');return}out[g]=arr;}
  FEESTR[feeYear()]=out;_fsCache={};const ok=saveFeeStr();renderFeeSetup();
  toast(ok?'Fee structure saved. The administrator and parents can now see it.':'Saved for this session only (browser storage is unavailable).');}
});

/* ---- accountant: record a payment ---- */
let fpPick=null,fpArm={id:'',t:0},fpChanged=false;
const fpLabel=s=>s.name+' · '+s.cls+' · '+s.adm;
function fpResolve(v){v=String(v||'').trim().toLowerCase();if(!v)return null;const act=allStudents().filter(s=>billedAny(s,feeYear()));
 let hit=act.find(s=>fpLabel(s).toLowerCase()===v)||act.find(s=>s.adm.toLowerCase()===v);if(hit)return hit;
 const m=act.filter(s=>s.name.toLowerCase()===v);return m.length===1?m[0]:null;}
function openPayForm(pre){
 const act=allStudents().filter(s=>billedAny(s,feeYear()));
 $('fpModal').innerHTML=`<div class="modal-head"><div><h3>Record payment</h3><p>Fees received from a parent · ${feeYear()}</p></div><button class="modal-close" data-fp="close">×</button></div>
 <div class="field"><label>Learner</label><input id="fpStudent" list="fpList" placeholder="Type name or UPI No." autocomplete="off"><datalist id="fpList">${act.map(s=>`<option value="${escH(fpLabel(s))}">`).join('')}</datalist></div>
 <div id="fpInfo" class="field-hint"></div>
 <div class="field-row"><div class="field"><label>Term</label><select id="fpTerm"><option value="">Pick a learner first</option></select></div><div class="field"><label>Amount (KSh)</label><input id="fpAmt" inputmode="numeric" maxlength="8" autocomplete="off" placeholder="e.g. 5000"></div></div>
 <div class="field-row"><div class="field"><label>Method</label><select id="fpMethod"><option>M-Pesa</option><option>Cash</option><option>Bank</option></select></div><div class="field"><label>Reference (optional)</label><input id="fpRef" maxlength="20" autocomplete="off" placeholder="M-Pesa code"></div></div>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-fp="close">Cancel</button><button type="button" class="btn btn-primary" data-fp="save">Save payment</button></div>`;
 fpPick=null;fpNote=pre&&pre.note?pre.note:'';$('fpBackdrop').classList.remove('hidden');
 if(pre){const st=allStudents().find(x=>x.adm===pre.adm);if(st){$('fpStudent').value=fpLabel(st);fpUpdate();$('fpTerm').value=String(pre.term);$('fpAmt').value=String(pre.amount);$('fpMethod').value=pre.method;$('fpRef').value=pre.ref||'';}}}
function fpUpdate(){
 const s=fpResolve($('fpStudent').value);fpPick=s;const info=$('fpInfo'),sel=$('fpTerm');
 if(!s){info.textContent='';info.className='field-hint';sel.innerHTML='<option value="">Pick a learner first</option>';return}
 const f=feeSummary(s),first=f.terms.find(t=>t.fee!==null&&t.fee-t.paid>0)||f.terms.find(t=>t.fee!==null);
 sel.innerHTML=f.terms.filter(t=>t.fee!==null).map(t=>`<option value="${t.t}"${first&&first.t===t.t?' selected':''}>Term ${t.t} · balance ${money(Math.max(0,t.fee-t.paid))}</option>`).join('');
 info.className='field-hint ok';info.textContent=s.name+' · '+s.cls+' · fees '+money(f.fee)+', paid '+money(f.paid)+', balance '+money(f.bal)+'.';}
$('fpBackdrop').addEventListener('input',e=>{if(e.target.id==='fpStudent')fpUpdate();if(e.target.id==='fpAmt'){const v=e.target.value.replace(/\D/g,'').slice(0,8);if(v!==e.target.value)e.target.value=v;}});
$('fpBackdrop').addEventListener('change',e=>{if(e.target.id==='fpStudent')fpUpdate();});
function closeFp(){$('fpBackdrop').classList.add('hidden');if(fpChanged){fpChanged=false;if(activePage()==='fees')showPage('fees');}}
function nextReceipt(y){const n=PAYLOG.reduce((a,p)=>Math.max(a,parseInt(String(p.rcpt||'').slice(-4),10)||0),0)+1;return'RCT-'+y+'-'+String(n).padStart(4,'0');}
function savePayment(){
 if(!currentUser||currentUser.role!=='accountant'){toast('Only the accountant records payments.');return}
 const s=fpPick||fpResolve($('fpStudent').value);if(!s){toast('Choose the learner from the list.');return}
 const y=feeYear(),t=+$('fpTerm').value,amt=parseInt($('fpAmt').value.replace(/\D/g,''),10),f=feeSummary(s,y),tm=f.terms.find(x=>x.t===t);
 if(!tm||tm.fee===null){toast('Choose the term.');return}
 if(!(amt>0)){toast('Type the amount received.');return}
 const bal=Math.max(0,tm.fee-tm.paid);
 if(bal===0){toast('Term '+t+' is already fully paid.');return}
 if(amt>bal){toast('That is more than the Term '+t+' balance ('+money(bal)+'). Record the extra under the next term.');return}
 const rec={id:'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),rcpt:nextReceipt(y),adm:s.adm,year:y,term:t,amount:amt,method:$('fpMethod').value,ref:cleanTxt($('fpRef').value).slice(0,20),date:new Date().toISOString(),by:currentUser.name};
 PAYLOG.push(rec);const ok=true;savePaymentRemote(rec);fpChanged=false;closeFp();showPage('fees');
 if(fpNote){settlePayNote(fpNote,rec,s);fpNote='';}else notifyParentPayment(rec,s);
 const nf=feeSummary(s,y);
 showDetail({grad:G.green,label:'Receipt '+rec.rcpt,value:money(amt),title:'Payment recorded',sub:ok?'Saved in this browser':'Saved for this session only',go:'fees',goLabel:'Back to Fees',
  body:sec('RECEIPT',[['Learner',escH(s.name)],['Class',escH(s.cls)],['Term','Term '+t],['Method',rec.method],['Reference',rec.ref||'-'],['Received by',escH(currentUser.name)]])+sec('FEES · '+y,[...nf.terms.map(x=>['Term '+x.t,x.fee===null?'Not billed':money(x.paid)+' of '+money(x.fee)]),['Balance',money(nf.bal)]])});}
function openPayHistory(){
 const can=currentUser&&currentUser.role==='accountant',y=feeYear(),map=Object.fromEntries(allStudents().map(s=>[s.adm,s])),list=PAYLOG.slice().reverse().slice(0,12);
 $('fpModal').innerHTML=`<div class="modal-head"><div><h3>Recent payments</h3><p>${PAYLOG.length?'Last '+list.length+' recorded in this system':'No payments recorded yet'}</p></div><button class="modal-close" data-fp="close">×</button></div>`+
  (list.length?list.map(p=>{const s=map[p.adm];return`<div class="nt-row"><div><strong>${escH(s?s.name:p.adm)}</strong><small>${escH(p.rcpt)} · Term ${p.term} · ${escH(p.method)} · ${new Date(p.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short'})}</small></div><div class="fp-amt"><b>${money(p.amount)}</b>${can?`<button type="button" class="det-btn" data-fp="rev" data-id="${p.id}">${fpArm.id===p.id&&Date.now()-fpArm.t<5000?'Tap again':'Reverse'}</button>`:''}</div></div>`;}).join(''):'<div class="bk-note">When you record a payment it will appear here, and you can reverse a mistake.</div>')+
  '<div class="modal-actions"><button type="button" class="btn btn-light" data-fp="close">Close</button></div>';
 $('fpBackdrop').classList.remove('hidden');}
$('fpBackdrop').addEventListener('click',e=>{
 if(e.target.id==='fpBackdrop'){closeFp();return}
 const b=e.target.closest('[data-fp]');if(!b)return;const a=b.dataset.fp;
 if(a==='close')closeFp();else if(a==='save')savePayment();
 else if(a==='rev'){if(!currentUser||currentUser.role!=='accountant')return;
  if(fpArm.id===b.dataset.id&&Date.now()-fpArm.t<5000){{const gone=PAYLOG.find(p=>p.id===b.dataset.id);PAYLOG=PAYLOG.filter(p=>p.id!==b.dataset.id);if(gone)reversePaymentRemote(gone);}fpArm={id:'',t:0};fpChanged=true;toast('Payment reversed.');openPayHistory();}
  else{fpArm={id:b.dataset.id,t:Date.now()};openPayHistory();}}
});
$('payHistBtn').addEventListener('click',()=>{if(currentUser)openPayHistory();});


/* ================= v2.5: UPI No, Grade 10 subject selection, learner record ================= */
const PROFILE_PAGES=['students','fees'];
function upiNo(v){const a=String(v||'').trim().toUpperCase();return/^[A-Z0-9][A-Z0-9\-\/._]{0,19}$/.test(a)?a:'';}
PILLS.g.push('Selected');PILLS.o.push('Not yet');

/* ---- subjects kept per learner AND per grade ---- */
function enrollMap(adm,s){let e=STUSUBJ[adm];if(Array.isArray(e)){e={[gradeOf(s?s.cls:'Grade 10')]:e};STUSUBJ[adm]=e;saveStuSubj();}return e&&typeof e==='object'?e:{};}
function learnerSubjectsAt(s,grade){const g=gradeOf(grade),e=enrollMap(s.adm,s);if(e[g]&&e[g].length)return e[g];return isSenior(g)?[]:subjectsFor(g);}
function snapshotSubjects(s,from,action){if(action==='repeat')return;const g=gradeOf(from),e=enrollMap(s.adm,s);if(!(e[g]&&e[g].length)){const l=learnerSubjectsAt(s,g);if(l.length)e[g]=l.slice();}STUSUBJ[s.adm]=e;}
function carrySubjects(s,from,to){const gf=gradeOf(from),gt=gradeOf(to),e=enrollMap(s.adm,s);if(isSenior(gf)&&isSenior(gt)&&e[gf]&&e[gf].length&&!(e[gt]&&e[gt].length))e[gt]=e[gf].slice();STUSUBJ[s.adm]=e;}
function subjectHistorySec(s){const e=enrollMap(s.adm,s),cur=gradeOf(s.cls),rows=Object.keys(e).filter(g=>g!==cur&&e[g]&&e[g].length).sort((a,b)=>CLASS_LIST.indexOf(a)-CLASS_LIST.indexOf(b)).map(g=>[g+(g==='Grade 10'&&gradeOf(s.cls)==='Grade 9'?' (chosen, starts next year)':''),escH(e[g].join(', '))]);return rows.length?sec('OTHER GRADES',rows):'';}
const g10Chosen=s=>(enrollMap(s.adm,s)['Grade 10']||[]).length>0;
function g10Note(st){const n=promoList(st.cls,st.year).filter(s=>!g10Chosen(s)).length;return`<p class="su-hint">${n?n+' learner'+(n===1?' has':'s have')+' not been given Grade 10 subjects yet. Use Select Subjects in the side menu.':'Every learner has Grade 10 subjects selected.'}</p>`;}

/* ---- Select Subjects (Grade 9 class teacher) ---- */
modules.selsubjects={title:'Select Subjects',subtitle:'',stats:[['Learners','0'],['Subjects selected','0'],['Still to choose','0']],heads:['LEARNER'],rows:[]};
PAGE_NAMES.selsubjects='Select Subjects';THEME.selsubjects=['blue','green','orange'];MS_ICONS.selsubjects=['🎓','✅','✍️'];
function selSubjectsView(m){
 const g9=currentUser&&currentUser.role==='teacher'&&gradeOf(TEACHER_CLASS)==='Grade 9',list=g9?classStudents(TEACHER_CLASS):[];
 m.heads=['LEARNER','UPI NO.','CLASS','PARENT','PARENT LINKED','STATUS'];
 m.rows=list.map(s=>[s.name,s.adm,s.cls,s.gname||'—',portalOf(s.gphone),g10Chosen(s)?'Selected':'Not yet']);
 const n=list.filter(g10Chosen).length;
 m.stats=[['Learners',String(list.length)],['Subjects selected',String(n)],['Still to choose',String(list.length-n)]];
 m.subtitle='Tap a learner to choose their Grade 10 subjects. They stay the same until Grade 12.';return m;}
function openG10Picker(adm){
 const s=allStudents().find(x=>x.adm===adm),u=currentUser;
 if(!s||!u||u.role!=='teacher'||s.cls!==TEACHER_CLASS||gradeOf(s.cls)!=='Grade 9'){toast('Only the Grade 9 class teacher can choose these subjects.');return}
 const cur=(enrollMap(adm,s)['Grade 10']||[]),sel=cur.length?cur:SENIOR_DEFAULT;
 $('g10Modal').dataset.adm=adm;
 $('g10Modal').innerHTML=`<div class="modal-head"><div><h3>${escH(s.name)}</h3><p>UPI No. ${escH(s.adm)} · ${escH(s.cls)} · Grade 10 subjects</p></div><button class="modal-close" data-g10="close">×</button></div>
 <p class="su-hint">These subjects start when ${escH(s.name.split(' ')[0])} moves to Grade 10 and stay the same until Grade 12. Senior school learners take 7 subjects: 4 compulsory and 3 chosen.</p>
 <div class="bk-note ok" id="g10Count"></div>
 ${seniorGroups('Grade 10').map(g=>`<div class="section-title">${g[0].toUpperCase()}</div>`+g[1].map(x=>`<label class="sp-row"><input type="checkbox" value="${escH(x)}"${sel.includes(x)?' checked':''}> ${escH(x)}</label>`).join('')).join('')}
 <div class="modal-actions"><button type="button" class="btn btn-light" data-g10="close">Cancel</button><button type="button" class="btn btn-primary" data-g10="save">Save subjects</button></div>`;
 g10Count();$('g10Backdrop').classList.remove('hidden');}
function g10Count(){const n=document.querySelectorAll('#g10Modal input:checked').length,el=$('g10Count');if(el){el.textContent=n+' subject'+(n===1?'':'s')+' selected'+(n===7?' · a full senior school load':' · senior school learners usually take 7');el.className='bk-note '+(n===7?'ok':'warn');}}
$('g10Backdrop').addEventListener('change',e=>{if(e.target.type==='checkbox')g10Count();});
$('g10Backdrop').addEventListener('click',e=>{
 if(e.target.id==='g10Backdrop'){$('g10Backdrop').classList.add('hidden');return}
 const b=e.target.closest('[data-g10]');if(!b)return;
 if(b.dataset.g10==='close'){$('g10Backdrop').classList.add('hidden');return}
 if(b.dataset.g10==='save'){const adm=$('g10Modal').dataset.adm,s=allStudents().find(x=>x.adm===adm),v=[...document.querySelectorAll('#g10Modal input:checked')].map(i=>i.value);
  if(!s||!currentUser||currentUser.role!=='teacher'||s.cls!==TEACHER_CLASS)return;if(!v.length){toast('Tick at least one subject.');return}
  const e2=enrollMap(adm,s);e2['Grade 10']=v;STUSUBJ[adm]=e2;saveStuSubj();$('g10Backdrop').classList.add('hidden');toast(v.length+' subjects saved for '+s.name.split(' ')[0]+'.');notifyG9Done();showPage('selsubjects');}});

/* ---- every learner's full record, kept for the whole time at the school ---- */
const billedAny=(s,y)=>feeSummary(s,y).terms.some(t=>t.fee!==null);
function feeEndTerm(s,y){const l=PROMO.log.filter(x=>x.adm===s.adm&&(x.action==='transfer'||x.action==='complete'));if(!l.length)return 3;return +l[l.length-1].year<y?0:3;}
function resultRows(s){return Object.keys(RES.marks).filter(k=>RES.marks[k]&&RES.marks[k][s.adm]).sort().reverse().map(k=>{const v=Object.values(RES.marks[k][s.adm]).filter(x=>x&&x.pct!=null).map(x=>x.pct);if(!v.length)return null;const a=Math.round(v.reduce((x,y)=>x+y,0)/v.length),p=k.split('-');return[p[0]+' · Term '+p[1].slice(1)+' · '+examLabel(p[2]),a+'% · '+LEVEL_SHORT(a)+' ('+v.length+' subjects)'];}).filter(Boolean);}
function attendanceRows(s){const y={};Object.keys(REG).forEach(k=>{const m=(REG[k]||{})[s.adm];if(!m)return;const yr=k.slice(0,4);y[yr]=y[yr]||{p:0,a:0};Object.values(m).forEach(v=>{if(v==='P')y[yr].p++;else if(v==='A')y[yr].a++;});});
 const rows=Object.keys(y).sort().reverse().map(yr=>[yr,y[yr].p+' present, '+y[yr].a+' absent ('+Math.round(y[yr].p/Math.max(1,y[yr].p+y[yr].a)*100)+'%)']);
 if(!rows.length){const r=childRecords(s);if(r.rate!==null)rows.push(['This term',r.rate+'%']);}return rows.length?rows:[['Records','None yet']];}
function classHistoryRows(s){const log=PROMO.log.filter(l=>l.adm===s.adm).sort((a,b)=>String(a.date).localeCompare(String(b.date))),rows=[];
 if(log.length)rows.push(['First class on record',escH(log[0].from)]);
 log.forEach(l=>rows.push([String(l.year),escH(l.action==='promote'?l.from+' → '+l.to+' · Promoted':l.action==='repeat'?'Repeated '+l.from:l.action==='transfer'?'Transferred out of '+l.from:'Completed '+l.from)]));
 rows.push(['Now',escH(s.cls)+(s.status!=='Active'?' · '+s.status:'')]);return rows;}
function openLearnerProfile(adm){
 const u=currentUser;if(!u)return;const s=allStudents().find(x=>x.adm===adm);if(!s)return;
 const role=u.role,ok=role==='admin'||role==='accountant'||(role==='teacher'&&s.cls===TEACHER_CLASS)||(role==='parent'&&childrenOf(u).some(k=>k.adm===adm));
 if(!ok){toast('You can only open records you are allowed to see.');return}
 const x=EXTRA.find(e=>e.adm===adm)||{},ct=clsTeacher(s.cls),left=PROMO.log.filter(l=>l.adm===adm&&(l.action==='transfer'||l.action==='complete')).pop();
 const showFees=role==='admin'||role==='accountant'||role==='parent',y=feeYear();
 let body=sec('LEARNER',[['UPI No.',escH(s.adm)],['Class',escH(s.cls)],['Class teacher',escH(ct.teacher||'-')],['Gender',escH(s.gender||'-')],['Date of birth',escH(s.dob||'—')],['Joined',x.date?escH(x.date):'Before this system'],['Status',escH(s.status)]].concat(left?[['Left the school',escH(left.action==='transfer'?'Transferred in '+left.year:'Completed in '+left.year)]]:[]))
  +promoSec(adm)
  +sec('PARENT / GUARDIAN',[['Name',escH(s.gname||'—')],['Relationship',escH(s.relation||'—')],['Phone',escH(fmtPhone(s.gphone)||'—')],['Parent portal',portalOf(s.gphone)]])
  +sec('CLASS HISTORY',classHistoryRows(s))
  +sec('SUBJECTS · '+gradeOf(s.cls),[['Taking',escH(learnerSubjects(s).join(', ')||'Not chosen yet')]])+subjectHistorySec(s)
  +sec('EXAM RESULTS · ALL TERMS',resultRows(s).length?resultRows(s).map(r=>[escH(r[0]),escH(r[1])]):[['Results','None entered yet']])
  +sec('ATTENDANCE',attendanceRows(s));
 if(showFees){const f=feeSummary(s,y),pays=PAYLOG.filter(p=>p.adm===adm).sort((a,b)=>String(b.date).localeCompare(String(a.date))),older=[...new Set(pays.map(p=>+p.year))].filter(v=>v<y).sort((a,b)=>b-a);
  body+=sec('FEES · '+y,[['Invoice',escH(f.inv)],...f.terms.map(t=>['Term '+t.t,t.fee===null?'Not billed':money(t.paid)+' of '+money(t.fee)]),['Balance',money(f.bal)]])
   +(older.length?sec('EARLIER YEARS',older.map(yr=>{const g=feeSummary(s,yr);return[String(yr),money(g.paid)+' paid of '+money(g.fee)];})):'')
   +sec('PAYMENTS RECORDED',pays.length?pays.slice(0,12).map(p=>[escH(p.rcpt)+' · Term '+p.term,money(p.amount)]):[['None recorded in this system','-']])+payNotesSec(adm);}
 body+=sec('RECORD KEPT',[['Kept for','The whole time at the school, including after a transfer or Grade 12']]);
 showDetail({grad:G.blue,label:s.cls+' · UPI '+s.adm,value:s.name,title:'Learner Record',sub:'Everything the school has on file',go:role==='parent'?'fees':null,goLabel:role==='parent'?'View Fees':'Close',body});}
document.addEventListener('click',e=>{
 const p=e.target.closest('[data-prof]');if(p){openLearnerProfile(p.dataset.prof);return}
 const g=e.target.closest('[data-selsub]');if(g){openG10Picker(g.dataset.selsub);return}
});


/* ================= v2.6: promotion opens only when Term 3 End Term results are complete ================= */
function endTermComplete(s,k){const subs=learnerSubjects(s).filter(x=>x!==FOREIGN);if(!subs.length)return false;const m=marksOf(s.adm,k);return subs.every(x=>m[x]&&m[x].pct!=null);}
const promoList=(cls,y)=>classStudents(cls).filter(s=>!PROMO.log.some(l=>l.adm===s.adm&&+l.year===+y));
function t3Check(cls){
 const base=classStudents(cls),yrs=[];Object.keys(RES.marks).forEach(k=>{if(/-T3-END$/.test(k)&&base.some(s=>RES.marks[k]&&RES.marks[k][s.adm]))yrs.push(+k.slice(0,4));});
 const y=Math.max(0,...yrs);if(!y)return{year:0,total:base.length,done:0,missing:base.map(s=>s.name),ready:false,started:false};
 const list=promoList(cls,y),k=y+'-T3-END',miss=list.filter(s=>!endTermComplete(s,k));
 return{year:y,total:list.length,done:list.length-miss.length,missing:miss.map(s=>s.name),ready:list.length>0&&!miss.length,started:true};}
const missingText=t=>t.missing.slice(0,3).join(', ')+(t.missing.length>3?' and '+(t.missing.length-3)+' more':'');
function promoWaitHtml(){const u=currentUser;if(!u||u.role!=='teacher')return'';const t=t3Check(TEACHER_CLASS);
 if(!t.started||t.ready||!t.total||PROMO.done[t.year+'|'+TEACHER_CLASS])return'';
 return`<div class="promo-banner wait"><span class="pb-ico">⏳</span><div><strong>Promotion opens when every learner has Term 3 End Term results</strong><small>${t.done} of ${t.total} learners done. Still missing: ${escH(missingText(t))}.</small></div></div>`;}


/* ================= v2.7: inbox, payment messages, Grade 9 summary, promotion catch-up ================= */
let INBOX=[],PAYNOTES=[],fpNote='';
if(!Array.isArray(INBOX))INBOX=[];if(!Array.isArray(PAYNOTES))PAYNOTES=[];
const saveInbox=()=>true,savePayNotes=()=>{syncPayNotes();return true};
const PN_SNAP={};
async function syncPayNotes(){
 if(!currentUser)return;
 for(const n of PAYNOTES){const j=JSON.stringify(n);if(PN_SNAP[n.id]===j)continue;
  try{await KlasoraFirebase.savePayNote(currentUser.schoolId,n);PN_SNAP[n.id]=j;}
  catch(e){toast(e.code==='permission-denied'?'You do not have permission to change this payment report.':'Payment report not saved. Check your internet and try again.');break;}}
}
function msgTokens(m){const t=[];if(m.role)t.push('role:'+m.role);(m.roles||[]).forEach(r=>t.push('role:'+r));if(m.phone)t.push('phone:'+m.phone);if(m.uid)t.push('uid:'+String(m.uid).replace(/^fb_/,''));return t;}
async function sendMsgRemote(m){
 const to=msgTokens(m);if(!to.length||!currentUser)return;
 const docId=m.key?String(m.key).replace(/[^A-Za-z0-9_-]/g,'_'):m.id;
 try{await KlasoraFirebase.sendMessage(currentUser.schoolId,docId,{...m,to});}catch(e){/* a failed notification must never block the main action */}
}
let _inboxTimer=null,_inboxAt=0;
async function loadCommRemote(r){
 INBOX=[];PAYNOTES=[];Object.keys(PN_SNAP).forEach(k=>delete PN_SNAP[k]);ANN=[];STAFF=[];
 try{
  INBOX=(await KlasoraFirebase.loadMessages(r)).map(m=>({...m,role:r.profile.role}));
  PAYNOTES=await KlasoraFirebase.loadPayNotes(r);PAYNOTES.forEach(n=>{PN_SNAP[n.id]=JSON.stringify(n)});
  if(r.profile.role==='admin'){const m=await KlasoraFirebase.loadMeta(r.schoolId,['ann','staff']);if(Array.isArray(m.ann))ANN=m.ann;if(Array.isArray(m.staff))STAFF=m.staff;}
 }catch(e){setTimeout(()=>toast('Could not load messages ('+(e.code||'error')+').'),1700);}
 _inboxAt=Date.now();
}
async function refreshInbox(){
 if(!currentUser||Date.now()-_inboxAt<60000)return;
 _inboxAt=Date.now();
 try{const r={schoolId:currentUser.schoolId,user:{uid:currentUser.uid},profile:{role:currentUser.role,linkPhone:currentUser.linkPhone,children:currentUser.children}};
  INBOX=(await KlasoraFirebase.loadMessages(r)).map(m=>({...m,role:currentUser.role}));
  if(['admin','accountant','parent'].includes(currentUser.role)){const pn=await KlasoraFirebase.loadPayNotes(r);PAYNOTES=pn;pn.forEach(n=>{PN_SNAP[n.id]=JSON.stringify(n)});}
  updateBell();
 }catch(e){
  if(e&&e.code==='permission-denied'){const ok=await KlasoraFirebase.stillActive(currentUser.schoolId);if(!ok)signOut('Your account or school is no longer active. Please contact your school administrator or Klasora support.');}
 }
}
setInterval(refreshInbox,180000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshInbox();});
const msgFor=(m,u)=>(m.role&&m.role===u.role)||(Array.isArray(m.roles)&&m.roles.includes(u.role))||(m.phone&&u.role==='parent'&&u.linkPhone===m.phone)||(m.uid&&m.uid===u.id);
function pushMsg(m){m.id='m'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);m.date=new Date().toISOString();if(m.key)INBOX=INBOX.filter(x=>x.key!==m.key);INBOX.push(m);if(INBOX.length>200)INBOX=INBOX.slice(-200);saveInbox();sendMsgRemote(m);if(currentUser)updateBell();return m;}
function ago(iso){const sec=Math.max(0,(Date.now()-new Date(iso).getTime())/1000);if(sec<60)return'Just now';if(sec<3600)return Math.floor(sec/60)+' min ago';if(sec<86400)return Math.floor(sec/3600)+' h ago';if(sec<172800)return'Yesterday';return new Date(iso).toLocaleDateString('en-GB',{day:'2-digit',month:'short'});}
window.addEventListener('storage',e=>{if(e.key===INBOX_KEY){try{INBOX=JSON.parse(e.newValue)||[]}catch(x){}if(currentUser)updateBell();}if(e.key===PAYNOTE_KEY){try{PAYNOTES=JSON.parse(e.newValue)||[]}catch(x){}}});

/* ---- a parent reports a payment; the accountant gets a new message ---- */
function openParentPay(adm0){
 const u=currentUser;if(!u||u.role!=='parent')return;const kids=childrenOf(u);if(!kids.length){toast('No child is linked to your account.');return}
 const k=kids.find(x=>x.adm===adm0)||kids[0];
 $('fpModal').innerHTML=`<div class="modal-head"><div><h3>Report a payment</h3><p>Tell the school about a payment you have made · ${feeYear()}</p></div><button class="modal-close" data-fp="close">×</button></div>
 <div class="field"><label>Child</label><select id="ppChild">${kids.map(x=>`<option value="${escH(x.adm)}"${x.adm===k.adm?' selected':''}>${escH(x.name)} · ${escH(x.cls)}</option>`).join('')}</select></div>
 <div id="ppInfo" class="field-hint ok"></div>
 <div class="field-row"><div class="field"><label>Term</label><select id="ppTerm"></select></div><div class="field"><label>Amount paid (KSh)</label><input id="ppAmt" inputmode="numeric" maxlength="8" autocomplete="off" placeholder="e.g. 5000"></div></div>
 <div class="field-row"><div class="field"><label>Paid by</label><select id="ppMethod"><option>M-Pesa</option><option>Bank</option></select></div><div class="field"><label>M-Pesa code / bank reference</label><input id="ppRef" maxlength="20" autocomplete="off" autocapitalize="characters" placeholder="e.g. QWE123XYZ"></div></div>
 <p class="su-hint">The accountant will check the payment and record it. Your balance changes once it is recorded.</p>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-fp="close">Cancel</button><button type="button" class="btn btn-primary" data-fp="ppsave">Send to accountant</button></div>`;
 ppUpdate();$('fpBackdrop').classList.remove('hidden');}
function ppDue(adm,term){const st=allStudents().find(x=>x.adm===adm);if(!st)return 0;const tm=feeSummary(st).terms.find(t=>t.t===term);if(!tm||tm.fee===null)return 0;const wait=PAYNOTES.filter(n=>n.adm===adm&&+n.term===term&&n.status==='pending').reduce((a,n)=>a+n.amount,0);return Math.max(0,tm.fee-tm.paid-wait);}
function ppUpdate(){const adm=$('ppChild').value,st=allStudents().find(x=>x.adm===adm);if(!st)return;const f=feeSummary(st),terms=f.terms.filter(t=>t.fee!==null),first=terms.find(t=>ppDue(adm,t.t)>0)||terms[0];
 $('ppTerm').innerHTML=terms.map(t=>`<option value="${t.t}"${first&&first.t===t.t?' selected':''}>Term ${t.t} · due ${money(ppDue(adm,t.t))}</option>`).join('');
 $('ppInfo').textContent=st.name+' · fees '+money(f.fee)+', paid '+money(f.paid)+', balance '+money(f.bal)+'.';}
function sendPayReport(){
 const u=currentUser;if(!u||u.role!=='parent')return;const adm=$('ppChild').value,st=childrenOf(u).find(x=>x.adm===adm);if(!st){toast('Choose your child.');return}
 const term=+$('ppTerm').value,amt=parseInt($('ppAmt').value.replace(/\D/g,''),10),method=$('ppMethod').value,ref=cleanTxt($('ppRef').value).toUpperCase().replace(/\s+/g,'');
 if(!term){toast('Choose the term.');return}if(!(amt>0)){toast('Type the amount you paid.');return}
 const due=ppDue(adm,term);if(due<=0){toast('Term '+term+' is already fully paid, or a payment for it is waiting for the accountant.');return}
 if(amt>due){toast('That is more than the amount still due for Term '+term+' ('+money(due)+').');return}
 if(ref.length<4){toast('Type the M-Pesa code or bank reference.');return}
 if(PAYNOTES.some(n=>n.ref===ref&&n.status!=='declined')||PAYLOG.some(p=>String(p.ref||'').toUpperCase()===ref)){toast('That reference has already been used.');return}
 const note={id:'n'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),adm,term,amount:amt,method,ref,by:u.name,phone:u.linkPhone,date:new Date().toISOString(),status:'pending'};
 PAYNOTES.push(note);savePayNotes();
 pushMsg({role:'accountant',icon:'💰',title:'New payment from '+u.name,text:st.name+' · '+st.cls+' · Term '+term+' · '+money(amt)+' · '+method+' '+ref,act:'reviewpay',actLabel:'Review payment',ref:note.id,key:'pay|'+note.id});
 $('fpBackdrop').classList.add('hidden');toast('Payment sent. The accountant will check and record it.');if(activePage()==='fees'||activePage()==='dashboard')showPage(activePage());}
function payNotesSec(adm){const l=PAYNOTES.filter(n=>n.adm===adm).sort((a,b)=>String(b.date).localeCompare(String(a.date)));if(!l.length)return'';
 return sec('PAYMENTS YOU REPORTED',l.slice(0,8).map(n=>[escH(n.ref)+' · Term '+n.term,money(n.amount)+' · '+(n.status==='pending'?'Waiting for the accountant':n.status==='recorded'?'Recorded':'Not found')]));}
function openPayReview(id){
 const n=PAYNOTES.find(x=>x.id===id),u=currentUser;if(!n||!u||u.role!=='accountant'){toast('This message is for the accountant.');return}
 const st=allStudents().find(x=>x.adm===n.adm)||{name:n.adm,cls:'-'};
 $('fpModal').innerHTML=`<div class="modal-head"><div><h3>Payment to confirm</h3><p>Reported by ${escH(n.by)} · ${ago(n.date)}</p></div><button class="modal-close" data-fp="close">×</button></div>
 ${sec('PAYMENT',[['Learner',escH(st.name)],['Class',escH(st.cls)],['Term','Term '+n.term],['Amount',money(n.amount)],['Paid by',escH(n.method)],['Reference',escH(n.ref)],['Status',n.status==='pending'?'Waiting for you':n.status==='recorded'?'Recorded '+escH(n.rcpt||''):'Marked not found']])}
 <p class="su-hint">Check the reference in your M-Pesa or bank statement before you record it.</p>
 <div class="modal-actions"><button type="button" class="btn btn-light" data-fp="close">Close</button>${n.status==='pending'?`<button type="button" class="btn btn-light" data-fp="prdecline" data-id="${escH(n.id)}">Not received</button><button type="button" class="btn btn-primary" data-fp="prrecord" data-id="${escH(n.id)}">Record payment</button>`:''}</div>`;
 $('fpBackdrop').classList.remove('hidden');}
function settlePayNote(id,rec,st){const n=PAYNOTES.find(x=>x.id===id);if(!n)return;n.status='recorded';n.rcpt=rec.rcpt;savePayNotes();
 pushMsg({phone:n.phone,icon:'✅',title:'Payment recorded',text:money(rec.amount)+' for '+st.name+', Term '+rec.term+'. Receipt '+rec.rcpt+'.',key:'rec|'+rec.id});}
function notifyParentPayment(rec,st){if(!st||!st.gphone)return;pushMsg({phone:st.gphone,icon:'🧾',title:'Payment received',text:money(rec.amount)+' for '+st.name+', Term '+rec.term+'. Receipt '+rec.rcpt+'.',key:'rec|'+rec.id});}
$('fpBackdrop').addEventListener('click',e=>{const b=e.target.closest('[data-fp]');if(!b)return;const a=b.dataset.fp;
 if(a==='ppsave')sendPayReport();
 else if(a==='prrecord'){const n=PAYNOTES.find(x=>x.id===b.dataset.id);if(n&&n.status==='pending')openPayForm({adm:n.adm,term:n.term,amount:n.amount,method:n.method,ref:n.ref,note:n.id});}
 else if(a==='prdecline'){const n=PAYNOTES.find(x=>x.id===b.dataset.id);if(!n||n.status!=='pending')return;n.status='declined';savePayNotes();const st=allStudents().find(x=>x.adm===n.adm);
  pushMsg({phone:n.phone,icon:'⚠️',title:'Payment not found',text:'We could not find '+n.method+' payment '+n.ref+' for '+(st?st.name:'your child')+'. Please contact the school office.',key:'dec|'+n.id});$('fpBackdrop').classList.add('hidden');toast('Marked as not received. The parent has been told.');}});
$('fpBackdrop').addEventListener('input',e=>{if(e.target.id==='ppAmt'){const v=e.target.value.replace(/\D/g,'').slice(0,8);if(v!==e.target.value)e.target.value=v;}});
$('fpBackdrop').addEventListener('change',e=>{if(e.target.id==='ppChild')ppUpdate();});
document.addEventListener('click',e=>{const b=e.target.closest('[data-parentpay]');if(b)openParentPay(b.dataset.parentpay);});

/* ---- Grade 9 class finished choosing Grade 10 subjects -> administrator ---- */
function notifyG9Done(){const u=currentUser,list=classStudents(TEACHER_CLASS);if(!u||u.role!=='teacher'||!list.length||!list.every(g10Chosen))return;
 pushMsg({key:'g9subj|'+TEACHER_CLASS,role:'admin',icon:'🎓',title:'Grade 10 subjects chosen for '+TEACHER_CLASS,text:u.name+' has chosen Grade 10 subjects for all '+list.length+' learner'+(list.length===1?'':'s')+'.',act:'viewg9',actLabel:'See the list',ref:TEACHER_CLASS});
 toast('Every learner has subjects. The administrator has been told.');}
function openG9Summary(cls){
 const list=classStudents(cls),ct=clsTeacher(cls),done=list.filter(g10Chosen).length;
 showDetail({grad:G.indigo,label:cls+' · Grade 10 subjects',value:done+' of '+list.length,title:'Grade 10 subjects',sub:'Chosen by '+(ct.teacher||'the class teacher'),go:null,goLabel:'Close',
  body:sec('SUMMARY',[['Class',escH(cls)],['Class teacher',escH(ct.teacher||'-')],['Learners',String(list.length)],['Subjects chosen',done+' of '+list.length]])+sec('LEARNERS AND THEIR SUBJECTS',list.map(s=>[escH(s.name)+' · UPI '+escH(s.adm),escH((enrollMap(s.adm,s)['Grade 10']||[]).join(', ')||'Not chosen yet')]))});}

/* ---- a lower class was promoted first: keep the two groups apart ---- */
const lowerClasses=cls=>classKeys().filter(k=>nextClass(k)===cls);
function catchUp(cls){
 if(!cls)return null;let y=0,low='';
 lowerClasses(cls).forEach(k=>Object.keys(PROMO.done).forEach(d=>{const p=d.split('|');if(p[1]===k&&+p[0]>y){y=+p[0];low=k;}}));
 if(!y||PROMO.done[y+'|'+cls])return null;
 const arrivals=classStudents(cls).filter(s=>PROMO.log.some(l=>l.adm===s.adm&&+l.year===y&&l.action==='promote'&&normKey(l.to)===normKey(cls)));
 if(!arrivals.length)return null;const waiting=promoList(cls,y);if(!waiting.length)return null;
 const t=t3Check(cls);return{year:y,lower:low,arrivals,waiting,ready:t.ready&&t.year===y,nx:nextClass(cls)};}
function examStudents(cls,k){const cu=catchUp(cls),y=+String(k||'').slice(0,4)||+exYear;return cu&&cu.year===y?cu.waiting:classStudents(cls);}
function catchUpHtml(){const u=currentUser;if(!u||u.role!=='teacher')return'';const cu=catchUp(TEACHER_CLASS);if(!cu)return'';const a=cu.arrivals.length,w=cu.waiting.length;
 return`<div class="promo-banner catch"><span class="pb-ico">📣</span><div><strong>Please promote your ${escH(TEACHER_CLASS)} learners to ${escH(cu.nx)}</strong><small>${escH(cu.lower)} has already promoted ${a} learner${a===1?'':'s'} into ${escH(TEACHER_CLASS)}. Your ${w} ${escH(TEACHER_CLASS)} learner${w===1?' is':'s are'} still waiting, so the two groups are shown separately.${cu.ready?'':' Enter their Term 3 End Term results first.'}</small><button type="button" class="reg-btn gold" data-nt="${cu.ready?'promote':'results'}">${cu.ready?'Promote to '+escH(cu.nx):'Enter Term 3 results'}</button></div></div>`;}


/* ================= v2.8: school contact numbers for parents, attendance from registers ================= */
const MAX_CONTACTS=5;
function cleanPhoneRaw(v){return String(v||'').replace(/[\s\-().]/g,'');}
function phoneOk(v){return/^\+?\d{9,15}$/.test(cleanPhoneRaw(v));}
function phoneIntl(v){let d=cleanPhoneRaw(v).replace(/^\+/,'');if(/^0\d{9}$/.test(d))d='254'+d.slice(1);return d;}
function phonePretty(v){const d=phoneIntl(v);return/^254\d{9}$/.test(d)?'+254 '+d.slice(3,6)+' '+d.slice(6,9)+' '+d.slice(9):'+'+d;}
function contactRowHtml(c){return`<div class="sc-edit"><input class="sc-label" maxlength="30" placeholder="Label, e.g. School office" value="${escH(c.label||'')}"><input class="sc-num" inputmode="tel" maxlength="20" placeholder="e.g. 0712 345 678" value="${escH(c.number||'')}"><button type="button" class="sc-del" data-sc="del" aria-label="Remove number">×</button></div>`;}
function initContactUI(list){const l=Array.isArray(list)?list:[];$('contactRows').innerHTML=(l.length?l:[{label:'School office',number:''}]).map(contactRowHtml).join('');syncContactAdd();}
function syncContactAdd(){const n=document.querySelectorAll('#contactRows .sc-edit').length;$('contactAdd').classList.toggle('hidden',n>=MAX_CONTACTS);}
function readContacts(){
 const rows=[...document.querySelectorAll('#contactRows .sc-edit')].map(r=>({label:r.querySelector('.sc-label').value.replace(/\s+/g,' ').trim(),number:r.querySelector('.sc-num').value.trim()})).filter(r=>r.label||r.number),list=[],seen=new Set();
 for(const r of rows){if(!r.number){return{error:'Type the phone number for "'+r.label+'", or remove that line.'}}
  if(!phoneOk(r.number))return{error:'"'+r.number+'" is not a valid phone number. Use digits only, for example 0712345678.'};
  const key=phoneIntl(r.number).slice(-9);if(seen.has(key))return{error:'The number '+r.number+' is listed twice.'};seen.add(key);
  list.push({label:r.label||'School office',number:cleanPhoneRaw(r.number)});}
 return{list};}
$('contactAdd').addEventListener('click',()=>{if(document.querySelectorAll('#contactRows .sc-edit').length>=MAX_CONTACTS)return;$('contactRows').insertAdjacentHTML('beforeend',contactRowHtml({}));syncContactAdd();});
$('contactRows').addEventListener('click',e=>{const b=e.target.closest('[data-sc="del"]');if(!b)return;const rows=document.querySelectorAll('#contactRows .sc-edit');if(rows.length<=1){const r=b.closest('.sc-edit');r.querySelector('.sc-label').value='';r.querySelector('.sc-num').value='';}else b.closest('.sc-edit').remove();syncContactAdd();});

/* ---- Get Support for parents: the school's numbers, never the developer's ---- */
const SC_PHONE='<svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><path fill="#fff" d="M11.2 9.5c.3-.5.7-.6 1-.6h.7c.3 0 .5.1.7.6l1 2.4c.1.3.1.5-.1.8l-.7.9c-.2.2-.2.4-.1.6.6 1.1 1.7 2.4 3 3.1.3.1.5.1.7-.1l1-.9c.2-.2.5-.3.8-.1l2.3 1.1c.3.1.5.3.5.6 0 .7-.3 1.4-1 1.9-.7.5-1.6.6-2.5.3-3.7-1.2-6.6-3.7-7.9-6.5-.4-.9-.2-2 .4-3.1z"/></svg>';
const SC_WA='<svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><path fill="#fff" d="M16 6.2a9.7 9.7 0 0 0-8.3 14.7L6.4 25.6l4.8-1.3A9.7 9.7 0 1 0 16 6.2z"/><path fill="#25D366" d="M12.4 11.3c.2-.4.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.4.7 1.3 1.7 2.4 2.2.3.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.4 0 .5-.2 1.1-.8 1.5-.6.4-1.3.5-2 .3-3.1-.9-5.4-3-6.4-5.2-.3-.7-.1-1.6.3-2.4z"/></svg>';
function openSchoolContacts(){
 const sc=getSchool(),u=currentUser,kids=u&&u.role==='parent'?childrenOf(u).map(k=>k.name):[],list=(sc.phones||[]).filter(c=>c&&phoneOk(c.number));
 const msg=encodeURIComponent('Hello '+sc.name+', this is '+(u?u.name:'a parent')+(kids.length?', parent of '+kids.join(' and '):'')+'.');
 $('schoolContactModal').innerHTML=`<div class="modal-head"><div><h3>Contact ${escH(sc.name)}</h3><p>Call or message the school office.</p></div><button class="modal-close" data-scm="close">×</button></div>`+
  (list.length?list.map(c=>{const d=phoneIntl(c.number);return`<div class="sc-card"><div class="sc-text"><strong>${escH(c.label)}</strong><small>${escH(phonePretty(c.number))}</small></div><div class="sc-acts"><a class="sc-btn call" href="tel:+${d}" aria-label="Call ${escH(c.label)}">${SC_PHONE}</a><a class="sc-btn wa" href="https://wa.me/${d}?text=${msg}" target="_blank" rel="noopener" aria-label="WhatsApp ${escH(c.label)}"><svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><circle cx="16" cy="16" r="16" fill="#25D366"/>${SC_WA.replace(/<svg[^>]*>|<\/svg>/g,'')}</svg></a></div></div>`;}).join(''):'<div class="bk-note warn">The school has not added its phone numbers yet. Please ask at the school office or through your child\'s class teacher.</div>');
 $('schoolContactBackdrop').classList.remove('hidden');}
$('schoolContactBackdrop').addEventListener('click',e=>{if(e.target.id==='schoolContactBackdrop'||e.target.closest('[data-scm="close"]'))$('schoolContactBackdrop').classList.add('hidden');});
function helpCardText(){const c=document.querySelector('.help-card');if(!c||!currentUser)return;const par=currentUser.role==='parent';c.querySelector('strong').textContent=par?'Need the school?':'Need help?';c.querySelector('small').textContent=par?'Call or message the school office.':'Chat or call our support team.';}

/* ---- Attendance Management: filled automatically from the class registers ---- */
const fmtAttDate=iso=>new Date(iso+'T00:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
function classOn(s,y){const l=PROMO.log.filter(x=>x.adm===s.adm&&+x.year===+y);return l.length&&l[l.length-1].from?l[l.length-1].from:s.cls;}
function attendanceData(){
 const stu=Object.fromEntries(allStudents().map(x=>[x.adm,x])),map={};
 Object.keys(REG).forEach(k=>{const p=k.split('-'),y=+p[0],mo=+p[1];Object.entries(REG[k]||{}).forEach(([adm,days])=>{const st=stu[adm];if(!st)return;const cls=classOn(st,y);Object.entries(days||{}).forEach(([d,v])=>{if(v!=='P'&&v!=='A')return;const iso=y+'-'+String(mo).padStart(2,'0')+'-'+String(d).padStart(2,'0'),key=iso+'|'+cls,o=map[key]||(map[key]={iso,cls,p:0,a:0,absent:[]});if(v==='P')o.p++;else{o.a++;o.absent.push(st.name);}});});});
 return Object.values(map).sort((a,b)=>b.iso.localeCompare(a.iso)||CLASS_LIST.indexOf(gradeOf(a.cls))-CLASS_LIST.indexOf(gradeOf(b.cls))||a.cls.localeCompare(b.cls));}
function todayIso(){const n=new Date();return n.getFullYear()+'-'+String(n.getMonth()+1).padStart(2,'0')+'-'+String(n.getDate()).padStart(2,'0');}
function attToday(){const t=todayIso(),rows=attendanceData().filter(r=>r.iso===t),p=rows.reduce((a,r)=>a+r.p,0),a=rows.reduce((x,r)=>x+r.a,0),all=[...new Set(allStudents().filter(s=>s.status==='Active').map(s=>s.cls))];
 return{rows,p,a,marked:rows.length>0,rate:p+a?Math.round(p/(p+a)*100):0,classes:rows.length,totalClasses:all.length,notMarked:all.filter(c=>!rows.some(r=>r.cls===c))};}
function attendanceView(m){
 const rows=attendanceData(),T=attToday();
 m.heads=['DATE','CLASS','PRESENT','ABSENT','ATTENDANCE'];
 m.rows=rows.map(r=>[fmtAttDate(r.iso),r.cls,String(r.p),String(r.a),Math.round(r.p/Math.max(1,r.p+r.a)*100)+'%']);
 m.stats=[['Present Today',T.marked?String(T.p):'—'],['Absent Today',T.marked?String(T.a):'—'],['Classes Marked',T.marked||T.totalClasses?T.classes+' of '+T.totalClasses:'—']];
 m.subtitle='Filled automatically from the class registers. Class teachers mark them; nothing is typed here.';return m;}
$('moduleBody').addEventListener('click',e=>{const b=e.target.closest('[data-absent]');if(!b)return;const [dt,cls]=b.dataset.absent.split('|'),row=attendanceData().find(r=>fmtAttDate(r.iso)===dt&&r.cls===cls);if(!row)return;
 showDetail({grad:G.orange,label:cls+' · '+dt,value:row.a+' absent',title:'Absent learners',sub:row.p+' present · filled from the class register',go:null,goLabel:'Close',body:sec('ABSENT',row.absent.slice().sort().map((n,i)=>[String(i+1),escH(n)]))});});
DETAILS.attendance=()=>{const T=attToday();return{tone:'tone-green',label:"Today's Attendance",value:T.marked?T.rate+'%':'—',title:'Attendance Details',sub:T.marked?fmtAttDate(todayIso())+' · from class registers':'No register marked yet today',go:'attendance',goLabel:'Open Attendance',
 body:sec('TODAY',[['Present',T.marked?String(T.p):'—'],['Absent',T.marked?String(T.a):'—'],['Classes marked',T.classes+' of '+T.totalClasses]])+sec('BY CLASS',T.rows.length?T.rows.map(r=>[r.cls,r.p+' present · '+r.a+' absent · '+Math.round(r.p/Math.max(1,r.p+r.a)*100)+'%']):[['None marked yet','-']])+(T.notMarked.length?sec('NOT MARKED YET',T.notMarked.slice(0,12).map(c=>[c,'Register not marked'])):'')};};
MSD.attendance=[
 ()=>{const T=attToday(),lv={lower:0,upper:0,junior:0};T.rows.forEach(r=>{lv[LEVEL_OF(r.cls)]+=r.p;});return{sub:T.marked?fmtAttDate(todayIso())+' · '+T.rate+'% of learners marked':'No register marked yet today',sections:[['PRESENT BY LEVEL',LEVELS3(String(lv.lower),String(lv.upper),String(lv.junior))]]};},
 ()=>{const T=attToday(),lv={lower:0,upper:0,junior:0};T.rows.forEach(r=>{lv[LEVEL_OF(r.cls)]+=r.a;});return{sub:T.marked?fmtAttDate(todayIso())+' · learners not in school':'No register marked yet today',sections:[['ABSENT BY LEVEL',LEVELS3(String(lv.lower),String(lv.upper),String(lv.junior))],['ABSENT TODAY',T.rows.filter(r=>r.a).map(r=>[r.cls,r.a+' absent']).concat(T.rows.some(r=>r.a)?[]:[['None','-']])]]};},
 ()=>{const T=attToday();return{sub:'Class registers marked today',sections:[['MARKED',T.rows.length?T.rows.map(r=>[r.cls,r.p+' present · '+r.a+' absent']):[['None yet','-']]],['NOT MARKED YET',T.notMarked.length?T.notMarked.slice(0,12).map(c=>[c,'Waiting for the class teacher']):[['All classes marked','-']]]]};}];
