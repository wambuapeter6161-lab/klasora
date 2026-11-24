# KLASORA V4 — GitHub package

## Publish the current web app with GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this folder (not the ZIP itself) to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Open the Pages URL GitHub provides. The app entry point is `index.html`.

Keep `index.html`, `app.js`, `style.css`, the icon files and `manifest.webmanifest` together in the repository root.

## Firestore rules

`firestore.rules` is the exact rules text supplied with this project. Publish it in Firebase Console → Firestore Database → Rules, or deploy it with the Firebase CLI after linking the correct Firebase project.

## Important current limitations — read before using real school data

This archive is the supplied KLASORA V4 browser prototype plus the supplied Firestore rules. It is **not yet a production-connected four-portal Firebase release**.

- The supplied `app.js` stores school records, role accounts, sessions and application data in browser `localStorage` (with an in-memory fallback).
- The supplied archive contains no Firebase client configuration or Firebase Authentication integration.
- The supplied Firestore rules currently permit the Super Admin and linked School Administrator to access school documents and student subdocuments. They do not yet define authenticated Teacher, Parent or Accountant profile permissions or the collections for their workflows.
- The README in the original project refers to `superadmin.html`, `superadmin.css` and `superadmin.js`, but those files were not present in the uploaded ZIP.
- GitHub Pages hosts static files; it does not provide secure server-side user provisioning. Do not place Firebase Admin SDK credentials or service-account keys in this repository or browser code.

Therefore, deploy this package only to preview the current prototype. Do not enter real learner, parent, staff, payment or other confidential school data until Firebase Authentication, the missing Super Admin page, role provisioning, Firestore data migration and role-specific security rules have been implemented and tested.
