# Firebase Android Setup - Getting SHA Fingerprints

## YOUR PROJECT SETUP
- **Expo Managed Workflow** (android/ folder generated ✅)
- **Package**: `com.ballerpro.app`
- **Windows OS**
- **Planning to use EAS Build** (from README)

## 🎯 BEST APPROACH FOR YOUR PROJECT

### ⭐ Method 1: EAS Build (RECOMMENDED - No Local Setup!)

Since you're using Expo and planning EAS Build, this is the **easiest and best approach**:

```bash
cd frontend
npx eas-cli build --platform android --profile preview
```

**OR if you want to set up credentials first:**

```bash
cd frontend
npx eas-cli credentials -p android
```

**Why this is best:**
- ✅ No Java/Android Studio installation needed
- ✅ Handles everything in the cloud
- ✅ Gets both debug AND release SHA fingerprints
- ✅ Future-proof for production builds
- ✅ Free for development builds

**Steps:**
1. Run `npx eas-cli login` (create free Expo account if needed)
2. Run `npx eas-cli credentials -p android`
3. It will show SHA-1 and SHA-256
4. Copy and add to Firebase Console

---

### ⚡ Method 2: Online Keystore Viewer (Quickest - No Installation!)

Since you already have `frontend/android/app/debug.keystore`, use an online tool:

1. **Go to:** https://keystore-explorer.org/ (or search "online keystore viewer")
2. **Upload:** `frontend/android/app/debug.keystore`
3. **Password:** `android`
4. **Alias:** `androiddebugkey`
5. **Password:** `android`
6. **View SHA-1 and SHA-256**

**OR use this command-line alternative (if you have Node.js):**
```bash
npm install -g keystore-info
keystore-info frontend/android/app/debug.keystore android androiddebugkey android
```

---

### 🔧 Method 3: Java JDK + Gradle (If you need local builds)

Only use this if you plan to build locally frequently:

## EXACT STEPS FOR YOUR PROJECT

### Step 1: Install Java JDK (Required)

**Download and Install:**
1. Go to: https://adoptium.net/temurin/releases/
2. Download **JDK 17** (LTS) for Windows x64
3. Install it (default location: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\`)
4. **Add to PATH:**
   - Open System Properties → Environment Variables
   - Under "System variables", find `JAVA_HOME`
   - If it doesn't exist, click "New" and add:
     - Variable name: `JAVA_HOME`
     - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot` (your actual path)
   - Edit `Path` variable → Add: `%JAVA_HOME%\bin`
   - **Restart your terminal/VS Code** after adding to PATH

**Verify Installation:**
```bash
java -version
keytool -help
```

Both commands should work without errors.

### Step 2: Get SHA Fingerprints

Now that Java is installed, run:

```bash
cd frontend/android
gradlew.bat signingReport
```

**Look for output like:**
```
Variant: debug
Config: debug
Store: E:\vs code\react.js\ballerpro\frontend\android\app\debug.keystore
Alias: AndroidDebugKey
SHA1: XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
SHA256: XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
```

**Copy both SHA1 and SHA256 values.**

### Step 3: Add to Firebase Console
1. Go to: https://console.firebase.google.com/project/baller-pro/settings/general
2. Scroll to "Your apps" section
3. Click on your Android app (`com.ballerpro.app`)
4. Click "Add fingerprint"
5. Paste SHA-1, click "Save"
6. Click "Add fingerprint" again
7. Paste SHA-256, click "Save"

### Step 4: Test Firebase Auth
```bash
cd frontend
npm start
# Press 'a' to open Android
```

---

## Alternative Method: Using Keytool Directly (After Java Installation)

If gradle doesn't work, use keytool directly:

```bash
keytool -list -v -keystore frontend/android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Look for:
- **SHA1:** (copy this)
- **SHA256:** (copy this)

---

## Method 1: Using Expo Run (Easiest - No EAS Account Needed)

This will generate the android folder and get SHA fingerprints automatically:

```bash
cd frontend
npx expo run:android
```

**What this does:**
1. Generates `android/` folder (if not exists)
2. Builds the app locally
3. Shows SHA-1 and SHA-256 in the build output

**Look for output like:**
```
Variant: debug
Config: debug
Store: C:\Users\YourName\.android\debug.keystore
Alias: AndroidDebugKey
SHA1: XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
SHA256: XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
```

**OR after build completes, run:**
```bash
cd android
./gradlew signingReport
```

This will show SHA-1 and SHA-256 fingerprints.

### Method 2: Using Gradle Signing Report (After Method 1)

Once you have the `android/` folder:

```bash
cd frontend/android
./gradlew signingReport
```

Scroll to find:
- **SHA1:** (copy this)
- **SHA256:** (copy this)

### Step 3: Add to Firebase Console
1. Go to: https://console.firebase.google.com/project/baller-pro/settings/general
2. Scroll to "Your apps" section
3. Click on your Android app (`com.ballerpro.app`)
4. Click "Add fingerprint"
5. Paste SHA-1, click "Save"
6. Click "Add fingerprint" again
7. Paste SHA-256, click "Save"

### Step 4: Test Firebase Auth
```bash
cd frontend
npm start
# Press 'a' to open Android
```

---

## Alternative: Using EAS (Requires Expo Account)

If `eas credentials` doesn't work, you need to build the app first:

```bash
cd frontend
npx expo run:android
```

This will create the android/ folder and you can then use:
```bash
cd android
./gradlew signingReport
```

---

## Overview
Firebase requires SHA-1 and SHA-256 fingerprints to authenticate your Android app. You need to add these to Firebase Console.

## Method 1: Using EAS Credentials (Recommended for Production)

If you're using **EAS Build** for production builds:

```bash
# Navigate to frontend directory
cd frontend

# Get credentials for Android
eas credentials -p android
```

This will show you:
- **Keystore path** (if you have one)
- **SHA-1 fingerprint**
- **SHA-256 fingerprint**

**Steps:**
1. Run the command above
2. Copy the SHA-1 and SHA-256 values
3. Go to [Firebase Console](https://console.firebase.google.com/)
4. Select your project → **Project Settings** → **Your apps** → **Android app**
5. Click **Add fingerprint**
6. Paste SHA-1 and SHA-256 separately

---

## Method 2: Using Keytool (For Debug/Development)

For **local development** with Expo Go or debug builds:

### Option A: Debug Keystore (Default Expo Debug)

```bash
# Navigate to frontend directory
cd frontend

# Get SHA-1
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Or get SHA-256 specifically
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android | grep SHA256
```

**Windows path:**
```bash
keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

### Option B: If Using Custom Keystore

```bash
keytool -list -v -keystore path/to/your/keystore.jks -alias your-alias-name
```

---

## Method 3: Using Gradle (If Using Bare React Native)

If you've ejected from Expo or using bare workflow:

```bash
cd frontend/android
./gradlew signingReport
```

This will output SHA-1 and SHA-256 for both debug and release variants.

---

## Method 4: Using Expo CLI (For Expo Managed Workflow)

```bash
cd frontend

# For development builds
npx expo run:android --variant debug

# Then check the build output or use keytool on the generated keystore
```

---

## Quick Steps Summary

1. **Get fingerprints** using one of the methods above
2. **Open Firebase Console**: https://console.firebase.google.com/
3. **Select your project** → **Project Settings** (gear icon)
4. **Scroll to "Your apps"** → Click on your **Android app**
5. **Click "Add fingerprint"**
6. **Add both SHA-1 and SHA-256** (one at a time)
7. **Download the updated `google-services.json`** (if needed)
8. **Restart your app** to apply changes

---

## Important Notes

- **Debug fingerprints**: Use for development/testing
- **Release fingerprints**: Use for production builds (from EAS or your release keystore)
- **Both are needed**: Add both SHA-1 and SHA-256 to Firebase
- **Multiple fingerprints**: You can add multiple fingerprints (debug + release)
- **No app restart needed**: Firebase checks fingerprints server-side, but you may need to rebuild if you're using native modules

---

## Verify Configuration

After adding fingerprints, test Firebase Auth:

```bash
# Start your app
cd frontend
npm start

# Then test login/register in your app
```

If you see `auth/configuration-not-found` error, double-check:
- ✅ Fingerprints are added correctly
- ✅ Package name matches (`com.ballerpro.app`)
- ✅ Email/Password auth is enabled in Firebase Console

---

## Troubleshooting

### "auth/configuration-not-found" Error
- Ensure fingerprints are added in Firebase Console
- Wait a few minutes for Firebase to propagate changes
- Verify package name matches exactly

### Can't Find Debug Keystore
- On Windows: `%USERPROFILE%\.android\debug.keystore`
- On Mac/Linux: `~/.android/debug.keystore`
- If missing, Android SDK will create it on first build

### EAS Credentials Not Showing Fingerprints
- Make sure you've built at least once: `eas build -p android`
- Or generate credentials: `eas credentials -p android --generate`

