KLASORA SUPER ADMIN - DASHBOARD REDESIGN

This build updates the dashboard presentation to closely match the supplied reference screenshot: charcoal sidebar, compact top navigation, four coloured KPI cards, quick actions, revenue chart panel, demographics, live protocol, and three school summary panels.

Firebase configuration, Firebase Authentication login, Super Admin UID authorization, Firestore school registration, school directory, subscription management, profile, and existing dialogs are retained.

DATA NOTES
- School count, active subscription count, and monthly recurring revenue are calculated from the Firestore schools collection.
- Student, staff, and total user counts show a dash because those totals are not currently available in the central schools collection.
- Historical revenue chart is a visual placeholder until dated payment transactions are stored.
- Expiring Soon uses renewalDate values when present; otherwise it explains that no renewal dates are recorded.
- The sidebar is styled to resemble the reference. Some labels are visual shortcuts into existing Klasora pages; this build does not add independent website, blog, AI, templates, team, or reporting modules.

SECURITY
This is a client-side dashboard using Firebase Authentication and Firestore. Firestore security rules and trusted backend enforcement remain essential. Do not treat client-side UI as a security boundary. The temporary administrator invitation workflow requires its separate deployed Cloud Functions backend.


UPDATE v8
- Back to Dashboard button on every inner page.
- Quick Actions: Schools lists every school with its full record; Add School is its own page with an administrator temporary password (auto-generated, editable).
- Plans: choose Starter / Professional / Enterprise, enter the amount, set the subscription and expiry dates (expiry defaults to 1 month and can be changed). Pause / Resume kept.
- Largest Schools, New Registrations and Expiring Soon panels are clickable (rows open the school record, View all opens the full list).
- Profile photo: transparent images no longer turn black, photo shows in the top bar, and the profile syncs to Firestore collection superAdminProfile (falls back to this device if rules block it).
- Fixed two script errors that stopped schools from loading after sign-in.


UPDATE v9
- Removed Team, Templates and the whole Website & AI section (Website, Blog, Knowledge Base, AI Management, Onboarding Templates) from the sidebar and Quick Actions.
- Sidebar has an X button that closes the menu and returns to the main dashboard.
- Custom icon set for the sidebar, KPI cards, Quick Actions and dashboard panels.
- New Backup Data page (sidebar and Quick Actions): full JSON backup and CSV spreadsheet of all schools, with last-backup time.


UPDATE v10
- Sidebar is a slide-out drawer on phones (portrait and landscape) and tablets; X closes it and the menu button reopens it. On wide screens X hides the sidebar and the menu button brings it back.
- Reports page: activity feed (registrations, subscription changes, pauses, expiries), period filter, plan breakdown and revenue.
- Layout tightened for phones, including landscape, and Android text inflation disabled.
- Login: email placeholder simplified, show/hide password eye added.


UPDATE v11
- New schools are saved with activated: true automatically (no manual change in Firestore).


UPDATE v13  (FREE PLAN - NO CLOUD FUNCTIONS NEEDED)
- Registering a school creates the administrator's login, the school record and the schoolCodes/{CODE} record from the browser. The temporary password is shown ONCE and never stored.
- "Send password reset email" replaces "reset password" (the administrator picks a new password from the emailed link).
- Pausing a school switches its code off; resuming switches it on.
- Deleting a school removes its record, code and students. Also delete the administrator's login in Firebase Console > Authentication > Users so the email can be reused.
- Revenue chart uses real payments (tick "Payment received" when saving a subscription). ONLINE counts people active in the last 2 minutes. Students/Staff/Users show totals reported by school apps.

Deploy
1. Upload superadmin.html, superadmin.css, superadmin.js, klasora-icon.svg to GitHub.
2. Firebase console > Firestore > Rules: paste firestore.rules and Publish.
3. Register a new school. Schools created by older versions have no administrator login; re-register them.

For the school app
- Code check: read schoolCodes/{CODE} (code in capitals) and require active == true.
- Presence: each signed-in user writes presence/{their uid} = { role, schoolId, lastSeenMs: Date.now() } about once a minute.
- Totals: the school administrator's app updates its school record with studentCount, staffCount, userCount and statsUpdatedAt (ISO date).
- After the administrator's first password change, set mustChangePassword to false on the school record.
