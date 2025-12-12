# Firebase Setup - Next Steps

## ✅ What's Already Done

- ✅ Firebase package installed (`firebase@^12.6.0`)
- ✅ Firebase initialized in `frontend/src/services/firebase.ts`
- ✅ Auth & Firestore services implemented
- ✅ Feature flag enabled (`USE_FIREBASE_AUTH = true`)
- ✅ Login/Register screens connected to Firebase

## 🎯 Next Steps in Firebase Console

### Step 1: Enable Authentication (2 minutes)

1. In Firebase Console, click **"Build"** → **"Authentication"** (or use the left sidebar)
2. Click **"Get started"** (if first time)
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** to ON
6. Click **"Save"**

### Step 2: Create Firestore Database (3 minutes)

1. In Firebase Console, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a **location** (choose closest to your users, e.g., `us-central1`)
5. Click **"Enable"**

### Step 3: Set Firestore Security Rules (Important!)

1. In Firestore Database, go to **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **"Publish"**

### Step 4: Add Android App to Firebase (5 minutes)

1. In Firebase Console, click the **gear icon** (⚙️) → **"Project settings"**
2. Scroll to **"Your apps"** section
3. Click **"Add app"** → Select **Android** icon
4. Enter:
   - **Android package name**: `com.ballerpro.app`
   - **App nickname** (optional): `BallerPro Android`
   - **Debug signing certificate SHA-1**: Leave blank for now
5. Click **"Register app"**
6. **Skip** downloading `google-services.json` for now (not needed with JS SDK)

### Step 5: Get SHA Fingerprints (Required for Android Auth)

You need to add SHA-1 and SHA-256 fingerprints to Firebase Console.

#### Option A: Using EAS (Easiest - Recommended)

```powershell
cd frontend
npx eas-cli login  # Create free Expo account if needed
npx eas-cli credentials -p android
```

This will show SHA-1 and SHA-256. Copy both values.

#### Option B: Using Keytool (Windows)

```powershell
keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Look for **SHA1** and **SHA256** values in the output.

### Step 6: Add SHA Fingerprints to Firebase

1. Go back to Firebase Console → **Project Settings** → **Your apps** → **Android app**
2. Click **"Add fingerprint"**
3. Paste **SHA-1**, click **"Save"**
4. Click **"Add fingerprint"** again
5. Paste **SHA-256**, click **"Save"**

### Step 7: Test Your App! 🚀

```powershell
cd frontend
npm start
# Press 'a' for Android emulator/device
```

**Test Flow:**
1. Try registering a new user
2. Check Firebase Console → **Authentication** → **Users** - you should see the new user
3. Check Firebase Console → **Firestore Database** - you should see a `users` collection with user document
4. Try logging in with the registered user

## 🐛 Troubleshooting

### Error: "auth/configuration-not-found"
- ✅ Wait 2-3 minutes after adding SHA fingerprints
- ✅ Verify package name matches: `com.ballerpro.app`
- ✅ Rebuild app: `npx expo run:android`

### Error: "Missing or insufficient permissions"
- ✅ Check Firestore security rules are published
- ✅ Ensure user is authenticated before accessing Firestore

### No users appearing in Firebase Console
- ✅ Check Authentication is enabled
- ✅ Check Firestore is created
- ✅ Verify `USE_FIREBASE_AUTH = true` in `featureFlags.ts`

## ✅ Quick Checklist

- [ ] Authentication → Email/Password enabled
- [ ] Firestore Database created
- [ ] Firestore Security Rules configured
- [ ] Android app added to Firebase
- [ ] SHA-1 fingerprint added
- [ ] SHA-256 fingerprint added
- [ ] App tested - Registration works
- [ ] App tested - Login works
- [ ] Users visible in Firebase Console

## 📚 Need More Help?

- See `docs/firebase-android-setup.md` for detailed SHA fingerprint guide
- See `docs/firebase-migration.md` for migration context

---

**Estimated Time:** 15-20 minutes total
