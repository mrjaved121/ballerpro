# Troubleshooting: Registration Not Working

## Common Issues & Solutions

### Issue 1: Authentication Not Enabled ⚠️ MOST COMMON

**Symptom:** Registration stuck on loading, no error shown

**Solution:**
1. Go to Firebase Console → **Build** → **Authentication**
2. Click **"Get started"** if first time
3. Go to **"Sign-in method"** tab
4. Click **"Email/Password"**
5. Toggle **"Enable"** to **ON**
6. Click **"Save"**

**Test:** Try registering again

---

### Issue 2: SHA Fingerprints Not Added ⚠️ REQUIRED FOR ANDROID

**Symptom:** Error: `auth/configuration-not-found`

**Solution:**
1. Go to Firebase Console → **Project Settings** → **Your apps** → **Android app**
2. Scroll to **"SHA certificate fingerprints"**
3. Add both SHA-1 and SHA-256:
   - SHA-1: `9B:7B:3E:C9:3C:35:33:70:94:67:A4:B6:D2:40:84:4B:56:F7:1A:93`
   - SHA-256: `4D:65:A7:0E:D6:3B:37:6A:8C:50:83:D1:78:8F:73:7C:26:09:33:7F:6D:20:7C:A3:8E:E3:35:B2:85:A0:F6:98`
4. Wait 2-3 minutes for changes to propagate
5. Rebuild app: `npx expo run:android`

---

### Issue 3: Firestore Security Rules Too Restrictive

**Symptom:** Error: `permission-denied` or `Missing or insufficient permissions`

**Solution:**
1. Go to Firebase Console → **Firestore Database** → **Rules**
2. Verify rules are:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
3. Click **"Publish"** if not already published

---

### Issue 4: Network Error

**Symptom:** Error: `auth/network-request-failed`

**Solution:**
- Check internet connection
- Check if Firebase project is active
- Try again after a few seconds

---

### Issue 5: Email Already Exists

**Symptom:** Error: `auth/email-already-in-use`

**Solution:**
- Use a different email address
- Or try logging in instead

---

## Quick Checklist

- [ ] Authentication → Email/Password is **ENABLED** in Firebase Console
- [ ] SHA-1 fingerprint added to Firebase Console
- [ ] SHA-256 fingerprint added to Firebase Console
- [ ] Firestore Security Rules are published
- [ ] Waited 2-3 minutes after adding fingerprints
- [ ] App rebuilt after adding fingerprints

---

## Debug Steps

1. **Check Console Logs:**
   - Open your terminal where `npm start` is running
   - Look for error messages starting with `[Register] Error:`

2. **Check Firebase Console:**
   - Go to **Authentication** → **Users** - should see new user
   - Go to **Firestore Database** → **Data** - should see `users` collection

3. **Test with Different Email:**
   - Try a completely new email address
   - Make sure password is at least 6 characters

---

## Most Likely Issue

**90% of the time, it's one of these:**
1. ✅ Authentication not enabled
2. ✅ SHA fingerprints not added
3. ✅ Need to wait 2-3 minutes after adding fingerprints

**Start by checking Authentication is enabled!**


