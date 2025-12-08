# 🔄 Cache Clear Instructions - Onboarding Routes Updated

## ⚠️ **Problem**
After renaming onboarding files, old routes (step1, step2, step3, step4) are showing "unmatched route" errors.

## ✅ **Solution: Clear All Caches**

### **Step 1: Stop Current Server**
```cmd
Ctrl+C
```

### **Step 2: Clear Expo Cache**
```cmd
cd frontend
npx expo start --clear
```

### **Step 3: On Your Phone (Expo Go)**

#### **Android:**
1. Open Expo Go app
2. Tap on your project
3. Shake device (or press Ctrl+M if emulator)
4. Tap **"Reload"**
5. If still showing errors, tap **"Go Home"**
6. Scan QR code again

#### **iOS:**
1. Open Expo Go app
2. Shake device (or Cmd+D if simulator)
3. Tap **"Reload"**
4. If still showing errors, close and reopen Expo Go
5. Scan QR code again

### **Step 4: Force Refresh (If Still Issues)**

#### **Option A: Clear Metro Cache**
```cmd
cd frontend
rm -rf node_modules/.cache
npx expo start --clear
```

#### **Option B: Clear Watchman (if installed)**
```cmd
watchman watch-del-all
```

#### **Option C: Nuclear Option**
```cmd
cd frontend
rm -rf node_modules
rm package-lock.json
npm install
npx expo start --clear
```

---

## 📋 **Updated Routes**

### **Old Routes (REMOVED):**
- ❌ `/onboarding/step1`
- ❌ `/onboarding/step2`
- ❌ `/onboarding/step3`
- ❌ `/onboarding/step4`

### **New Routes (ACTIVE):**
- ✅ `/onboarding/about` (Step 1/5)
- ✅ `/onboarding/journey` (Step 2/5) - NEW
- ✅ `/onboarding/trainingExperience` (Step 3/5)
- ✅ `/onboarding/injuries` (Step 4/5)
- ✅ `/onboarding/mainGoal` (Step 5/5)

---

## 🧪 **How to Test After Cache Clear**

### **1. Check Tester Tab**
1. Open Expo Go
2. Navigate to **Tester** tab (🧪)
3. Under "Onboarding" section, you should see:
   - 1. About (Gender)
   - 2. Journey (Goals)
   - 3. Training Experience
   - 4. Injuries
   - 5. Main Goal

### **2. Test Navigation**
1. Tap "1. About (Gender)"
2. Should load without "unmatched route" error
3. Complete and tap Continue
4. Should navigate to "2. Journey (Goals)"

### **3. Test Full Flow**
1. Logout (if logged in)
2. Register new account
3. Should redirect to About (Step 1/5)
4. Complete all 5 steps
5. Should reach Main App

---

## 🔍 **Verify Cache Cleared**

### **Check Terminal Output:**
After running `npx expo start --clear`, you should see:
```
Starting project at ...
Starting Metro Bundler
› Scan the QR code above with Expo Go
```

### **Check Console Logs:**
After scanning QR code, watch for:
```
[Index] 🔍 Navigation check: { ... }
[Index] 🎓 Redirecting to onboarding
```

Should NOT see:
```
ERROR: Unmatched route: /onboarding/step1
ERROR: Unmatched route: /onboarding/step2
```

---

## ⚠️ **Common Issues**

### **Issue 1: Still Seeing Old Routes**
**Symptom:** Tester tab shows step1, step2, etc.

**Solution:**
1. Force close Expo Go app completely
2. Reopen Expo Go
3. Scan QR code again

### **Issue 2: "Unmatched Route" Errors**
**Symptom:** Clicking onboarding links shows error

**Solution:**
1. Clear Metro cache: `npx expo start --clear`
2. Force reload in Expo Go (shake → reload)
3. If persists, delete app from phone and reinstall Expo Go

### **Issue 3: Changes Not Appearing**
**Symptom:** Code changes don't show up

**Solution:**
1. Check if Metro bundler is running
2. Press `r` in terminal to reload
3. Check for bundling errors in terminal

---

## 📱 **Quick Reload Commands**

### **In Terminal (Metro Bundler):**
- `r` - Reload app
- `m` - Toggle menu
- `j` - Open debugger
- `?` - Show all commands

### **In Expo Go (Shake Device):**
- **Reload** - Refresh JavaScript bundle
- **Go Home** - Return to Expo Go home
- **Debug Remote JS** - Open Chrome debugger

---

## ✅ **Success Checklist**

After clearing cache, verify:

- [ ] Metro bundler started with `--clear` flag
- [ ] No "unmatched route" errors in console
- [ ] Tester tab shows new route names (about, journey, etc.)
- [ ] Can navigate to each onboarding screen
- [ ] Signup redirects to "about" (not step1)
- [ ] All 5 steps complete successfully

---

## 🚀 **Ready!**

1. **Stop server:** `Ctrl+C`
2. **Clear cache:** `npx expo start --clear`
3. **Reload Expo Go:** Shake → Reload
4. **Test:** Navigate to Tester tab → Onboarding

**Cache should be cleared and new routes should work! 🎉**

