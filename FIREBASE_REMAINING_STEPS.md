# Firebase Setup - Remaining Steps

## ✅ Completed

- ✅ Firestore Database created
- ✅ Firestore Security Rules configured and published

## 🎯 Next Steps

### Step 1: Enable Authentication (2 minutes) ⚠️ REQUIRED

1. In Firebase Console, click **"Build"** → **"Authentication"** (left sidebar)
2. If you see "Get started", click it
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"** provider
5. Toggle **"Enable"** to **ON**
6. Click **"Save"**

**Why this is needed:** Your app uses Firebase Auth for login/register. Without this enabled, authentication won't work.

---

### Step 2: Add Android App to Firebase (3 minutes) ⚠️ REQUIRED

1. In Firebase Console, click the **gear icon (⚙️)** → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click **"Add app"** → Select **Android** icon
4. Enter:
   - **Android package name**: `com.ballerpro.app`
   - **App nickname** (optional): `BallerPro Android`
   - **Debug signing certificate SHA-1**: Leave blank for now
5. Click **"Register app"**
6. **Skip** downloading `google-services.json` (not needed with Firebase JS SDK)

---

### Step 3: Get SHA Fingerprints (5 minutes) ⚠️ REQUIRED

You need SHA-1 and SHA-256 fingerprints for Android authentication to work.

#### Option A: Using EAS (Easiest - Recommended)

```powershell
cd frontend
npx eas-cli login  # Create free Expo account if needed
npx eas-cli credentials -p android
```

This will display SHA-1 and SHA-256. **Copy both values.**

#### Option B: Using Keytool (Windows)

```powershell
keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Look for **SHA1** and **SHA256** values in the output.

---

### Step 4: Add SHA Fingerprints to Firebase (2 minutes)

1. Go back to Firebase Console → **Project Settings** → **Your apps** → **Android app**
2. Click **"Add fingerprint"** button
3. Paste **SHA-1** value, click **"Save"**
4. Click **"Add fingerprint"** again
5. Paste **SHA-256** value, click **"Save"**

**Important:** Wait 2-3 minutes after adding fingerprints for Firebase to propagate changes.

---

### Step 5: Test Your App! 🚀

```powershell
cd frontend
npm start
# Press 'a' for Android emulator/device
```

**Test Flow:**
1. Try **registering** a new user
2. Check Firebase Console → **Authentication** → **Users** - you should see the new user
3. Check Firebase Console → **Firestore Database** → **Data** - you should see a `users` collection with user document
4. Try **logging in** with the registered user

---

## 🐛 Troubleshooting

### Error: "auth/configuration-not-found"
- ✅ Wait 2-3 minutes after adding SHA fingerprints
- ✅ Verify package name matches exactly: `com.ballerpro.app`
- ✅ Rebuild app: `npx expo run:android`

### Error: "Missing or insufficient permissions"
- ✅ Check Firestore security rules are published (you already did this!)
- ✅ Ensure user is authenticated before accessing Firestore

### No users appearing in Firebase Console
- ✅ Check Authentication → Sign-in method → Email/Password is enabled
- ✅ Check Firestore is created (you already did this!)
- ✅ Verify `USE_FIREBASE_AUTH = true` in `frontend/src/config/featureFlags.ts`

---

## ✅ Quick Checklist

- [x] Firestore Database created
- [x] Firestore Security Rules configured
- [ ] **Authentication → Email/Password enabled** ← DO THIS NEXT!
- [ ] **Android app added to Firebase**
- [ ] **SHA-1 fingerprint added**
- [ ] **SHA-256 fingerprint added**
- [ ] App tested - Registration works
- [ ] App tested - Login works

---

**Estimated Time Remaining:** 10-15 minutes

**Start with Step 1 (Enable Authentication) - it's the quickest and most important!**
