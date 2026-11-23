KLASORA V4 ADDITION
See KLASORA_V4_README.txt for the new Central School Access workflow, Super Admin registration, first-login password change, accountant invitation, parent UPI activation and reset safeguards.

SHULE PROJECT V3 (app build 3.0)

WHAT CHANGED IN V3
- TEACHERS & STAFF > ADD NEW (administrator). Add New now asks: Teaching staff or
  Support staff.
  Teaching staff: teacher name, employment ID, role (the subjects taught, for example
  Mathematics, English), age and telephone number.
  Support staff: name, ID number, telephone number and the work (cook, cleaner, security
  and so on).
  The date and year joined are filled in automatically when the record is saved and
  shown in the list (JOINED column). Tap any row to see the full details. Staff you add
  can be removed from their details (tap twice to confirm). The staff totals and the
  dashboard Teaching Staff card count up as you add people.
- COMMUNICATION > ADD ANNOUNCEMENT (administrator). Fields: title, audience (Parents,
  Teachers or Whole School), date (automatic), created by and the message. Tap Done to
  send.
  Parents: every parent sees it under the message icon.
  Teachers: every teacher sees it under the message icon.
  Whole School: teachers and the accountant see it. Parents do not.
  The Communication page lists only the announcements meant for the signed-in person
  (parents see Parents, teachers see Teachers and Whole School, the accountant sees
  Whole School, the administrator sees everything). Tap a row to read the full message.
- Staff and announcements are saved in this browser and are included in Backup &
  Restore and in the Excel export.

SHULE PROJECT V2 (app build 2.9, based on EduTrack 360 Acode 2.8)

WHAT CHANGED IN V2
- CLASSES & SUBJECTS IS NOW TEACHERS & SUBJECTS. The administrator sees every class
  with its class teacher, learners, a TEACHERS count (this replaces the old Room
  column) and status. Tap any row (or the Teachers card) to open the class: number 1
  is always the class teacher, then come the other teachers who teach that class,
  each with the subjects they teach.
- ADD TEACHER (administrator only). The Add Teacher button (or the button inside a
  class) opens a form: choose the class, type the teacher's name and tick the subjects
  they teach (the list follows the class's grade and your Subjects page). Other
  subjects can be typed in, separated by commas. Adding the same teacher to the same
  class again simply adds the new subjects. To give the class teacher's own subjects,
  type the class teacher's name. Remove (tap twice to confirm) is in the class view.
- TEACHER PORTAL. A class teacher opens Teachers & Subjects and sees only the
  teachers of their own class and their subjects, in the same numbered order. Rows
  and cards open details. A teacher cannot add or remove anything.
- Teachers and subjects are saved in this browser and are included in Backup & Restore
  and in the Excel export.
- "Powered by EduTrack 360" now reads "Powered by Willbrod Labs" (sign-in screen and
  sidebar).

EDUTRACK 360 - Acode Demo Version 2.8

WHAT CHANGED IN 2.8
- SCHOOL PHONE NUMBERS FOR PARENTS. In Settings (administrator), under the school
  name, type and motto, there is a new "School phone numbers" section: up to 5
  numbers, each with a label such as School office, Headteacher or Accounts. When a
  parent taps Get Support they now see the school's own numbers, each with a Call
  button and a WhatsApp button (the WhatsApp message starts with the parent's name
  and child's name). The developer's numbers are no longer shown to parents. If the
  school has not added numbers yet, the parent is told to ask at the school office.
  Staff (administrator, teachers, accountant) still see the system support numbers.
- ATTENDANCE MANAGEMENT IS FILLED FROM THE CLASS REGISTERS. The "Add" button is gone
  for every role. The page lists each date and class with Present, Absent and the
  attendance rate, taken automatically from the class registers the class teachers
  mark. Tap the Absent number to see which learners were absent. The administrator
  sees all classes; a class teacher sees only their own class. The top cards show
  today's Present, Absent and how many classes have marked their register, and the
  Today's Attendance card on the administrator's dashboard now comes from the
  registers too. Old sample attendance rows are gone. Parents still see their own
  child's attendance.

EDUTRACK 360 - Acode Demo Version 2.7

WHAT CHANGED IN 2.7
- MESSAGES INBOX. The message icon now opens a real inbox. New messages arrive at
  the top with a red NEW tag and a time (Just now, 5 min ago, Yesterday). The count
  on the icon clears when the inbox is opened.
- PARENT PAYMENTS TO THE ACCOUNTANT. A parent can tap "Report a payment" on the
  Fees page (or "Report payment" on the child's fee card): child, term, amount,
  M-Pesa or bank, and the M-Pesa code or reference. The accountant gets a new
  message "New payment from ..." with a Review payment button. The accountant
  checks the reference and taps Record payment (the form is filled in) or Not
  received. The parent is told either way, and the balance changes only after the
  accountant records it. The same reference cannot be sent twice, and a payment
  cannot be more than what is still due. When the accountant records any payment,
  the parent also gets a "Payment received" message with the receipt number.
  (This is a prototype: it does not connect to M-Pesa or a bank.)
- GRADE 9 SUBJECTS TO THE ADMINISTRATOR. When the Grade 9 class teacher has chosen
  Grade 10 subjects for every learner in the class, the administrator gets a message
  with a See the list button: each learner's name, UPI No. and subjects.
- PROMOTION CATCH-UP. If a lower class has already promoted its learners (for example
  Grade 3 into Grade 4) but the Grade 4 class teacher has not yet promoted theirs,
  the Grade 4 teacher gets a message and a dashboard card: "Please promote your
  Grade 4 learners to Grade 5". The Students list shows two groups: "Waiting to be
  promoted" (the Grade 4 learners) and "New from Grade 3" (the arrivals), and the
  Examinations list and the promotion screen use only the waiting learners. If their
  Term 3 End Term results are not complete the button says Enter Term 3 results,
  otherwise Promote to Grade 5. When the teacher promotes, only the waiting learners
  move up and the arrivals stay in Grade 4. This works for every class.

EDUTRACK 360 - Acode Demo Version 2.6

WHAT CHANGED IN 2.6
- PROMOTION OPENS ONLY WHEN TERM 3 END TERM RESULTS ARE COMPLETE. The class teacher
  sees the Promote learners icon and button only after every learner in the class
  has Term 3 End Term results for all their subjects (the optional foreign language
  may stay empty). Until then the dashboard shows a waiting note, for example
  "2 of 4 learners done. Still missing: Joy Achieng, Kevin Mutua", and promotion
  cannot be opened. A learner with empty or partly entered results blocks it, even
  if that learner is going to transfer. Tapping Generate Results is no longer
  needed before promoting.
- Learners who have just been promoted into a class are not offered for promotion
  again in the same year, so a class is only ever promoted from its own results.
- NEW MESSAGE ICON for notifications: a chat-bubble icon in the top bar with a red
  count badge for new messages (9+ when more than nine). It gives a small wiggle
  when something new arrives. It shows on phones too.

EDUTRACK 360 - Acode Demo Version 2.5

WHAT CHANGED IN 2.5
- UPI NO. REPLACES ADMISSION NO. Everywhere the app said Admission No. it now says
  UPI No.: registering a learner (the administrator types the UPI No.; it must be
  unique), the Students list, the Fees list, registers, Excel exports and imports.
  Old Excel files that still have an "Admission No" column import as before; a row
  with no UPI No. is skipped with the reason "Missing UPI No". The sample learners
  keep their demo numbers, now shown as UPI No.
- SELECT SUBJECTS (Grade 9 class teacher only, side menu): lists the learners with
  UPI No., parent and whether the parent is linked. Tap a learner's name to tick
  their Grade 10 subjects. These start when the learner is promoted to Grade 10
  and carry on to Grade 11 and Grade 12 (the Grade 10 class teacher can still
  adjust them). The promotion screen reminds the teacher who has no subjects yet.
- SUBJECTS ARE KEPT PER GRADE: a learner's Grade 9 subjects stay on record when the
  Grade 10 subjects start, and every grade's list can be seen in the learner record.
- LEARNER RECORD: tap a learner's name on the Students page (administrator, class
  teacher for their own class) or the Fees page (accountant, administrator), or the
  child's card (parent), to see everything on file: UPI No., class, parent, class
  history, subjects for every grade, results for every term, attendance by year,
  fees and payments. The class teacher does not see fees.
- NOTHING IS LOST on promotion, transfer or completion: marks, registers, subjects
  and payments stay under the learner's UPI No. Learners who transferred or
  completed stay in the Students list with their status, parents can still open
  their child's record, and the accountant still sees their fees for the year they
  left (marked Transferred or Completed). They are not billed after that year.

EDUTRACK 360 - Acode Demo Version 2.4

WHAT CHANGED IN 2.4
- FEES & PAYMENTS (accountant and administrator): every active learner is now
  listed with Class, Invoice No., Term 1 Fees, Term 1 Paid, Term 2 Fees, Term 2 Paid,
  Term 3 Fees, Term 3 Paid, Amount (year total), Paid, Balance, Parent Phone and
  Portal. The learner column stays in place while you scroll sideways. The Export
  buttons give an Excel file with all columns.
- RECORD PAYMENT (accountant only): "Record Payment" on the Fees page. Choose the
  learner, term, amount, method (M-Pesa, Cash, Bank) and an optional reference. A
  receipt is shown. A payment cannot be more than that term's balance. "Payments"
  lists recent payments, and the accountant can reverse a mistake (tap twice).
- SETTINGS FOR THE ACCOUNTANT (sidebar): Fee Structure. The accountant sets the fee
  for every class, PP1 to Grade 12, for Term 1, Term 2 and Term 3, then taps Save.
  The same fees apply to every stream of a class. Until the first save, starting
  amounts are used.
- The fee structure is shown on the administrator's dashboard (all classes), on the
  accountant's dashboard, and on the parent's dashboard (the child's class, with
  fees, paid and balance for each term). The parent Fees page now shows each term.
- A learner registered part-way through the year is billed from the term they joined
  (Jan-Apr Term 1, May-Aug Term 2, Sep-Dec Term 3); earlier terms show a dash.
- Learners promoted at the end of the year keep that year's fees in their old
  class's amounts; the new class's amounts apply from the next year.
- Demo data: the sample learners' earlier-term payments are sample figures. An
  imported fee file's Paid column is matched to learners by name and applied to the
  oldest terms first. The administrator can view fees but cannot record payments.

EDUTRACK 360 - Acode Demo Version 2.3

WHAT CHANGED IN 2.3
- STREAMS (administrator > Settings > School Profile): under the school name and
  logo, choose how many streams each class has and type their names, for example
  Red and White, or North, West and East. Leave it on 1 stream if the school has
  only one stream per class: classes then show as Grade 4, Grade 5 and so on.
  With streams, classes show as Grade 4 Red, Grade 4 White. Streams appear when
  registering a learner, adding a class teacher, in the class register and in
  Classes & Subjects. Each class gets one class teacher. Subjects are shared by
  all streams of a grade. When learners are promoted they keep their stream
  (Grade 4 Red goes to Grade 5 Red).
  Set the streams before registering learners. Learners and teachers saved before
  streams were set (and any whose stream is later removed) are placed in the first
  stream. Switching back to 1 stream puts everyone back in the plain grade.
- ADMISSION NUMBER is now typed by the administrator when registering a learner.
  Letters, numbers and - / . _ are allowed (no spaces, up to 20 characters). A
  number that is already used is refused.
- PROMOTION NOTICE: parents see, for example, "Promoted from Grade 4 (2026) to
  Grade 5 (2027)" on the child's card and in the bell. It disappears after one day
  (24 hours); after that the card simply shows the child's new class. The
  promotion itself is kept in the records.
- CLASS REGISTER: the administrator can now only VIEW registers (any class, any
  month, Excel export). Marking, All present today and the Weekends switch are
  for the class teacher only.

EDUTRACK 360 - Acode Demo Version 2.2

WHAT CHANGED IN 2.2 (CHECKED AND FIXED)
- Every v2.1 feature was tested end to end in a phone-sized screen: Add Class
  Teacher, activation, Replace, WELCOME greeting (staff and parents), rolling
  date of birth picker with OK, Term 3 promotion, and parent progression view.
- FIX: the notification bell was hidden on phones (screens under 560px wide).
  Teachers could not open the promotion alert and parents could not see
  "Promoted Grade 4 to Grade 5" in the bell. The bell now shows on every screen.

EDUTRACK 360 - Acode Demo Version 2.1 (Login & User Roles)

HOW TO OPEN
1. Download and extract this ZIP on your Android phone.
2. Open Acode and choose Open Folder.
3. Select the extracted folder.
4. Open index.html and tap Preview / Run.

WHAT CHANGED IN 2.1
- ADD CLASS TEACHER (administrator sidebar): enter a username such as
  Mr. Thomas or Madam Jane, a password (or tap Generate) and the class. The
  teacher opens the app, taps "New class teacher? Activate your account" and
  enters the same username, password and class. They then choose their own
  password and their platform opens for that class (register, results,
  subjects, learners).
- REPLACE: under every class teacher is a Replace button. Enter the new
  teacher's details and tap Replace teacher. The previous teacher is signed
  out and can no longer sign in. A class always has one class teacher; the
  learners, register and results stay with the class.
- Top right now says WELCOME with the name in capitals underneath, for
  every role (MADAM JANE, MR. THOMAS, MR. STEVEN KATANA). Parents get Mr. or
  Mrs. from the relationship saved at enrolment.
- DATE OF BIRTH: tap the field in Register New Student to open a rolling
  picker. Roll the day, month and year columns, then tap OK (or Clear).
- PROMOTION: when the class teacher generates Term 3 End Term results, a
  notification appears (bell and dashboard). The teacher marks each learner
  Promote, Repeat or Transfer and confirms. Promoted learners move to the next
  class and are seen by that class teacher; repeaters stay; transferred
  learners leave the register. Grade 12 learners are marked Completed.
- Parents see the result on their child's card and in the bell, for example
  "Promoted Grade 4 to Grade 5". Old report cards still show the old grade.
- Matching ignores titles (Mr, Mrs, Madam) when a parent signs up.

WHAT CHANGED IN 2.0 (ADMINISTRATOR)
- Next to every "Linked" parent (Students, Parents and Fees pages) the
  administrator now sees a Details button. It shows the parent's sign-in
  username (phone number), account status, when the account was created, the
  last password reset, and the linked learners.
- Passwords are never shown. Parent passwords are now stored scrambled
  (salted and hashed), so nobody can read them, including in a backup file.
- Forgot password: Details > Reset password (tap twice to confirm) creates a
  temporary password, shown once, with Copy and Send on WhatsApp buttons.
  The old password stops working. The parent signs in with their phone number
  and the temporary password and must choose a new one straight away.
- Parents can also choose Change password in My Profile.
- Only the administrator sees the Details button. The accountant still sees
  the Linked status.
- Demo staff accounts (admin, teacher, accountant) keep their passwords in
  app.js for testing. Real accounts need a server.

WHAT CHANGED IN 1.9 (TEACHER AND PARENT)
- Teacher > Students and Attendance: tap the boxes (learners, present today,
  absent today, not marked) to see the names. Absent learners show the
  parent's phone number.
- SUBJECTS page (teacher): subjects for every grade, PP1 to Grade 12, from the
  CBC lists. Add or Remove subjects; added subjects appear when entering
  results. "Restore default subjects" undoes changes for that grade.
- EXAMINATIONS (teacher): choose Term and Opener / Mid Term / End Term. Boxes:
  Assessments, Results Entered, Generate Results. Tap a learner's name to see
  that learner's subjects and type scores as 78 or 23/50. Add comments and
  strengths, then Save, or Save and next.
- Grade 10 to 12: tap a learner and tick the subjects that learner takes
  (4 compulsory plus chosen). Only those subjects appear in results entry.
- GENERATE RESULTS: builds the class CBC RESULTS table with levels
  EE / ME / AE / BE, ranked 01 to last by average score. Tap a row to preview
  the report card. Excel and Print buttons included.
- PARENT > Examinations shows the CBC learner's report card (school name,
  learner, grade, term, year, achievement levels, key, comments, strengths,
  areas to improve, attendance from the register, signature lines) once the
  teacher has generated results. Print / Save PDF button included.
- Levels: EE 75-100, ME 41-74, AE 21-40, BE 0-20 (change CBC_BANDS in app.js
  if your school uses different bands).

WHAT CHANGED IN 1.8 (TEACHER)
- New CLASS REGISTER page (sidebar > School Management).
  * Big coloured banner with the MONTH and YEAR; arrows change the month.
  * All active learners of the class listed down the page.
  * Day headings MON TUE WED THU FRI SAT SUN, with the date inside each box.
  * Tap a box: 1st tap = present (tick), 2nd = absent (cross), 3rd = clear.
  * Weekends and future dates are locked (Weekends button unlocks weekends).
  * "All present today" marks everyone, then change the absentees.
  * Totals per learner (P, A, %) and per day (Present / Absent rows).
  * Excel button exports the month register.
- The teacher dashboard and Students page show live Present / Absent today.
- Marks appear in the parent portal for that learner.
- The administrator can open the register for any class.
- Registers are included in Backup & Restore.

WHAT CHANGED IN 1.7
- BACKUP & RESTORE page (sidebar, Administration):
  * Download Backup: saves school profile, students, parents, imported
    records and accounts into one .json file. "Copy as text" is a backup
    option if the phone blocks file downloads.
  * Restore: choose the .json file (or paste the text), check the summary,
    then tap Restore now.
- EXCEL / CSV IMPORT (administrator and accountant):
  * Import from Excel / CSV reads .xlsx and .csv files, finds the right
    columns even if headings differ (Grade, Sex, Guardian, Mobile...), and
    shows a preview with skipped rows and warnings before anything changes.
  * Datasets: Students (with parent name and phone), Staff, Fees, Expenses,
    Library, Inventory. The accountant can import Fees and Expenses.
  * Add to existing records, or Replace the sample records with your own.
  * Blank template: download an Excel file with the right headings.
  * Export to Excel: the whole system (administrator) or finance sheets
    (accountant). Export Report on every page now downloads that page.
- Imported students with parent phones link to parent accounts as before.
  Parents see no made-up attendance or results for imported learners.
- Dashboard cards use your real numbers once students, staff or fees are imported.
- Top bar: school name is clearly visible; the school logo now shows on its
  own (no coloured box) and larger. Dashboard background is brighter.
- Old .xls files must be saved as .xlsx or .csv first.

WHAT CHANGED IN 1.6
- New blue and gold top bar with the school logo and a larger school name.
  The logo and name come from Settings > School Profile (initials are used
  if no logo has been uploaded).
- Page title is now in CAPITAL LETTERS at the top, with the date below it.
- Back to Dashboard moved to the right side of every page.
- Quick Add button removed (use Add New on each page).

WHAT CHANGED IN 1.5
- Back to Dashboard button on every page (raised, tap to return).
- Get Support opens WhatsApp (+254 718 169 936) and Call (+254 140 899 384).
- Register New Student form (admin: Quick Add or Add on Students page) now
  records the parent/guardian name, relationship and phone number.
  Siblings are detected by the parent phone number.
- Parents can tap "New parent? Create your account" on the sign-in screen.
  They enter the SAME name and phone number given at enrolment. All their
  children (and later siblings) appear automatically with attendance,
  results and fees. They can sign in later with their phone number.
- New Parents page (admin and accountant) lists guardians, phone numbers,
  their children and whether the portal account is Linked.
  Students and Fees pages show parent name, phone and Linked status.
  Users & Roles lists parent accounts and their linked learners.
- Sample learners now have sample parent phone numbers (07 22... and 0711 000 004).
  Demo parent: parent / Parent@123 has two children.
- Note: data is saved in this phone's browser only. Parents on other phones
  will only see the school's records once a real server is added.

WHAT CHANGED IN 1.4 (ADMINISTRATOR)
- Every admin module (Students to Users & Roles) has colourful raised stat cards.
  Tap a card to see a breakdown of that number.
- Page buttons (1, 2, 3, next, back) now work, 5 records per page.
  Each module has extra sample records so there is more than one page.
- Status labels are colour coded (Active, Pending, Overdue and so on).
- My Profile: tap your name in the sidebar to change your name, job title,
  phone, email and photo. It works for every role.
- New Admissions now shows 32 so it matches the dashboard growth figure.

WHAT CHANGED IN 1.3 (ADMINISTRATOR)
- School name and logo: admin sets them in Settings > School Profile.
  They appear automatically in the sidebar for every user and on the sign-in screen.
- New navy and gold sidebar and a refreshed dashboard background.
- Dashboard cards are raised, colourful and clickable: tap one for details.
- Staff count on the dashboard now matches the Staff page (26 teaching, 32 total).

WHAT CHANGED IN 1.2
- Sign-in screen with 4 demo accounts (tap a card to fill it in).
- Role-based menus: each role only sees the sections it is allowed to use.
- Role-based dashboards for Teacher, Accountant and Parent.
- Permissions: Add/Export buttons are hidden when a role cannot use them.
- Teacher sees only Grade 4 data; Parent sees only their own child.
- New admin-only "Users & Roles" page.
- Sign out button, auto sign-out after 15 minutes of inactivity,
  and a 30-second lock after 5 wrong passwords.

DEMO ACCOUNTS
  admin       / Admin@123      Administrator (everything)
  teacher     / Teacher@123    Jane Achieng (Grade 4 North)
  accountant  / Accounts@123   David Kamau (fees, expenses, reports)
  parent      / Parent@123     Esther Kariuki (parent of Michael Kariuki)

IMPORTANT
This is still a front-end prototype. The accounts and passwords are stored in
app.js, so anyone who can open the files can read them. This is NOT real
security. Real login needs a server with hashed passwords and server-side
permission checks. All records are sample data. Do not enter real children's
personal information or financial records.


CURRENT BUILD: STAGE 3 — STUDENT FIRESTORE INTEGRATION
See KLASORA_SCHOOL_SYSTEM_STAGE3.txt before deployment. Only the Students module is migrated in this stage.
