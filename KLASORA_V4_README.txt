KLASORA V4 — CENTRAL SCHOOL ACCESS PROTOTYPE
A Willbrod Labs product

FILES
- index.html / style.css / app.js: existing Klasora school system with updated login and account flows.
- superadmin.html / superadmin.css / superadmin.js: Willbrod Labs central school registration dashboard.
- README.txt: original V3 project notes.

START HERE (ANDROID / ACODE)
1. Extract the ZIP into one folder.
2. Open the extracted folder in Acode.
3. Use Acode Preview / its local web server to open superadmin.html first.
   Keep the files on the same local website origin so both pages can use the same browser registry.
4. Super Admin demo login:
   Username: superadmin
   Password: Willbrod@2026
5. Open School Management and register a school using the six requested fields:
   School code, School name, Administrator name, Administrator email,
   Temporary password and School P.O. Box.
6. Open index.html in the same Acode Preview origin.
7. School administrator login requires:
   School name + school code + administrator full name + registered email
   + the temporary password created during registration.
8. On first login the administrator must set a permanent password.
9. In the school Administrator portal, open Settings > Staff Account Access.
   Add the accountant's full name, email and temporary password. The accountant
   signs in using the school name/code, their name/email and temporary password,
   then must set a permanent password.
10. Parent account creation is on the login screen. Parent enters school code,
    the full name already registered by the school, and the child's UPI number.
    The UPI is checked against the learner and parent records, then used as the
    initial password. Parent must set a private password immediately.
11. Teacher class accounts continue to be created under Add Class Teacher.
    Their records now carry the current school's code in this prototype.
12. Administrator > Backup & Restore includes a separate full-school reset
    password and a destructive reset confirmation. Download a backup first.

LEGACY GREENFIELD DEMO LOGIN
Use the demo account chips on the login screen. They fill the school name and
code (Greenfield Academy / GFA001) automatically.

IMPORTANT PROTOTYPE LIMITATIONS
- This is a browser/localStorage prototype, not a production multi-school service.
- The Super Admin registry, temporary passwords, accounts and school records are
  stored in the browser. Do not use real school or learner data.
- Separate Firebase projects / Firestore databases have NOT been provisioned.
- The school code lookup and role routing demonstrate the workflow, but this
  version does NOT provide secure cross-device account provisioning, real tenant
  data isolation, cloud authentication, or server-enforced permissions.
- A parent on a different phone cannot see the school's local browser records
  until a secure shared backend is implemented.
- Super Admin demo credentials are visible in the source and must be replaced
  with server-side authentication before any public deployment.
- Full reset is only a local prototype operation. Production must use a secure
  backend, re-authentication, verified independent backup, audit trail and strict
  per-school database isolation.

NEXT PRODUCTION DEVELOPMENT
1. Central registry API and secure Super Admin authentication with MFA.
2. Provision one Firebase project (or approved isolated data store) per school
   through a trusted backend and Google Cloud IAM.
3. Cloud Authentication with first-login password reset and email verification.
4. Server-side tenant resolution by school code and strict school-level access
   rules for administrator, accountant, teacher and parent roles.
5. Parent UPI one-time activation with verified parent/guardian matching, then
   a permanent private password.
6. Secure backup, restore, reset approval, audit logs and subscription controls.

This package is a working UI/workflow prototype only. It is not ready for real
school deployment or public production use.


KLASORA BRANDING UPDATE
One consistent navy-and-gold K/book emblem is applied to the app/PWA icon, Windows shortcut/browser icon, favicon, login branding, opening screen and Super Admin dashboard.
Brand assets: klasora-icon.svg, klasora-192.png, klasora-512.png, klasora.ico and manifest.webmanifest. Keep all assets beside index.html and superadmin.html.
