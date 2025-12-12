# Adding Android App to Firebase - Step by Step

## Current Step: Register App

You're on the right page! Here's what to do:

### Step 1: Click "Register app" ✅

1. Verify the information is correct:
   - **Android package name**: `com.ballerpro.app` ✅
   - **App nickname**: `BallerPro` ✅
2. Click the blue **"Register app"** button

### Step 2: Skip Config File Download

After clicking "Register app", you'll see:
- **Step 2: Download and then add config file**
- A download button for `google-services.json`

**⚠️ IMPORTANT:** Since you're using **Firebase JS SDK** (not native Firebase), you can **SKIP** downloading `google-services.json`. 

Just click **"Next"** or **"Continue to console"** to proceed.

### Step 3: Add SHA Fingerprints (Next Critical Step)

After registering the app, you need to add SHA fingerprints:

1. Go to **Project Settings** → **Your apps** → **Android app**
2. Scroll to **"SHA certificate fingerprints"** section
3. Click **"Add fingerprint"**

You'll need to get your SHA-1 and SHA-256 fingerprints first (see next section).

---

## Getting SHA Fingerprints

### Option A: Using EAS (Easiest)

```powershell
cd frontend
npx eas-cli login  # Create free Expo account if needed
npx eas-cli credentials -p android
```

This will show SHA-1 and SHA-256. Copy both values.

### Option B: Using Keytool (Windows)

```powershell
keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Look for **SHA1** and **SHA256** values in the output.

---

## After Adding Fingerprints

1. Add both SHA-1 and SHA-256 to Firebase Console
2. Wait 2-3 minutes for changes to propagate
3. Test your app!

---

**Next Action:** Click "Register app" button now! 🚀
