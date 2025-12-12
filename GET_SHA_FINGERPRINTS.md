# Get SHA Fingerprints - Alternative Method (No Expo Account Needed)

Since EAS login is having issues, use this method instead:

## Method: Using Keytool (Windows)

### Step 1: Check if Java is installed

```powershell
java -version
```

If you see a version number, Java is installed. If not, you'll need to install Java JDK first.

### Step 2: Get SHA Fingerprints

Run this command:

```powershell
keytool -list -v -keystore %USERPROFILE%\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android
```

### Step 3: Find the Fingerprints

Look for these lines in the output:
- **SHA1**: A long string of characters separated by colons (e.g., `AA:BB:CC:DD:...`)
- **SHA256**: Another long string of characters separated by colons

### Step 4: Copy Both Values

Copy the **entire** SHA1 and SHA256 strings (including all the colons).

---

## If Keytool Doesn't Work

### Option 1: Install Java JDK

1. Download from: https://adoptium.net/temurin/releases/
2. Install **JDK 17** (LTS) for Windows
3. Restart your terminal
4. Try the keytool command again

### Option 2: Generate Android Folder First

If the debug keystore doesn't exist yet, you need to generate the android folder:

```powershell
cd frontend
npx expo run:android
```

This will create the android folder and generate the keystore. Then you can use keytool.

---

## After Getting Fingerprints

1. Go to Firebase Console → **Project Settings** → **Your apps** → **Android app**
2. Scroll to **"SHA certificate fingerprints"**
3. Click **"Add fingerprint"**
4. Paste **SHA-1**, click **"Save"**
5. Click **"Add fingerprint"** again
6. Paste **SHA-256**, click **"Save"**

---

**Try the keytool command now!**
