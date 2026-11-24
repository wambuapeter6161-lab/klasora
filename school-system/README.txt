KLASORA SCHOOL APP - LOGIN FIX
Replace app.js and index.html in your GitHub folder  klasora/school-system/  with these two files.

What changed
- The login now looks up the school code in Firebase (schoolCodes/{CODE}) instead of only the browser's own storage, so schools registered in the Super Admin are found on any device.
- The School Administrator signs in with: school name, school code, administrator full name, administrator email, and the temporary password shown once at registration. The password is checked by Firebase Authentication.
- After the administrator sets a new password in the app, it is also updated in Firebase, so the new password works on any device.
- Paused or inactive schools are refused.

Not changed
- Learners, teachers, parents, accountants and all other school data are still stored in the browser of the device where they were created. Staff and parents on other devices cannot sign in until that data is moved to Firebase.
