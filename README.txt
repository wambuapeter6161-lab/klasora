KLASORA SUPER ADMIN — SPARK BUILD (STAGE 1)

This package is adapted from Super Admin v11 for Firebase Spark (free plan).
It retains the existing dashboard, school directory, subscriptions, profile, reports and backup screens.

SCHOOL REGISTRATION
- Only the configured Super Admin UID can create school records in Firestore.
- The administrator account is created in Firebase Authentication using a separate Firebase app instance, so the Super Admin remains signed in.
- The temporary password is sent to Firebase Authentication and is not written to Firestore, localStorage, JSON backup or CSV backup.
- The school record stores the administrator's Firebase Auth UID, email, school code and profile details.
- The temporary password is displayed once after successful registration. Share it privately with the administrator.
- The administrator must change the temporary password after signing in; the School System activation work is a separate next stage.

SPARK PLAN LIMITATIONS
Firebase Spark does not provide Cloud Functions. Therefore this build deliberately disables Super Admin password resets, school deletion and server-side legacy password migration. These operations require a trusted backend to safely manage another user's Firebase Authentication account. Do not attempt to imitate them with client-side Firestore writes.

FIRESTORE RULES
- firestore.rules is included for this project. Review it before deploying.
- It allows the Super Admin UID below to create and manage school/subscription records.
- A school administrator can read only the school record and school-code mapping linked to their Auth UID.
- Other school data collections remain denied until school-specific rules are designed and tested.
- Deploy rules from this folder with: firebase deploy --only firestore:rules

SUPER ADMIN UID
NiquOT8pm7hha8mM6nlsuYvN0tr1

FIREBASE PROJECT
klasora-2fc4a

IMPORTANT SECURITY NOTES
- Keep the Super Admin account secure and enable multi-factor authentication if available.
- Never put temporary or permanent passwords in Firestore, source files, screenshots or backups.
- Do not enter real learner records until the School System authentication, school isolation and role-specific Firestore rules have been completed and tested.
- Password reset and deletion will be restored only when a trusted backend is available (for example, after moving to Blaze and deploying Cloud Functions, or using another secure server).

UPLOAD
Upload superadmin.html, superadmin.css, superadmin.js and klasora-icon.svg to your existing hosting location.
