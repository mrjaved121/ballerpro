# How to Add Firestore Security Rules

## 🎯 Quick Method: Firebase Console UI (Recommended)

### Step 1: Navigate to Rules Tab

1. In Firebase Console, go to **"Firestore Database"** (left sidebar)
2. Click on the **"Rules"** tab (next to "Data" tab)
3. You'll see the current rules in a code editor

### Step 2: Replace the Rules

1. **Delete** all the existing rules in the editor
2. **Copy and paste** these rules:

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

### Step 3: Publish the Rules

1. Click the **"Publish"** button (usually at the top right of the editor)
2. Confirm if prompted
3. Wait a few seconds for the rules to deploy

### Step 4: Verify

1. You should see a success message
2. The rules are now active!

## 📝 What These Rules Do

- ✅ **Authenticated users** can read/write their own document in the `users` collection
- ✅ **All other access is denied** by default (secure)
- ✅ Users can only access documents where `userId` matches their `auth.uid`

## 🎨 Visual Guide

```
Firebase Console
├── Firestore Database (left sidebar)
    ├── Data tab
    ├── Rules tab ← Click here!
    │   └── Code editor
    │       ├── [Paste rules here]
    │       └── [Publish button]
    ├── Indexes tab
    └── ...
```

## ⚠️ Important Notes

- Rules take effect **immediately** after publishing
- If you get errors, check the syntax (especially brackets and quotes)
- The rules editor has syntax highlighting to help you

## 🧪 Testing Your Rules

After publishing, test by:
1. Running your app
2. Registering a new user
3. Checking if data appears in Firestore Database → Data tab

If you see "Missing or insufficient permissions" errors, double-check:
- Rules are published
- User is authenticated
- The `userId` in the document path matches `auth.uid`

---

**That's it!** You don't need Cloud Shell or any command line tools. Just use the Firebase Console UI.
