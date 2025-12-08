# 🔧 Fix "Unmatched Route" Errors

## ⚠️ **Problem**
After renaming onboarding files, you're seeing "unmatched route" errors for old routes (step1, step2, step3, step4).

## ✅ **Solution**

### **Files Already Updated:**
- ✅ Onboarding files renamed (about, journey, trainingExperience, injuries, mainGoal)
- ✅ Navigation routes updated in all files
- ✅ Debug screens updated with new routes
- ✅ index.tsx redirects to `/onboarding/about`

### **What You Need to Do:**

---

## 🚀 **STEP-BY-STEP FIX**

### **Step 1: Stop Current Server**
In your terminal where Metro is running:
```cmd
Ctrl+C
```

### **Step 2: Clear Metro Cache**
```cmd
cd frontend
npx expo start --clear
```

Wait for Metro bundler to start (you'll see QR code).

### **Step 3: Force Reload on Phone**

#### **On Android (Expo Go):**
1. Shake your phone (or press Ctrl+M if emulator)
2. Tap **"Reload"**
3. If still showing errors:
   - Tap **"Go Home"**
   - Scan QR code again

#### **On iOS (Expo Go):**
1. Shake your phone (or Cmd+D if simulator)
2. Tap **"Reload"**
3. If still showing errors:
   - Close Expo Go completely
   - Reopen and scan QR code

### **Step 4: Verify Routes**
1. Open **Tester** tab (🧪 flask icon)
2. Under "Onboarding" section, you should see:
   - ✅ 1. About (Gender)
   - ✅ 2. Journey (Goals)
   - ✅ 3. Training Experience
   - ✅ 4. Injuries
   - ✅ 5. Main Goal
3. Tap each one to verify they work

---

## 🔍 **What to Look For**

### **✅ Success Indicators:**
```
[Metro] Starting project at ...
[Metro] Starting Metro Bundler
[Bundle] Android Bundled 2000ms ...
[Index] 🔍 Navigation check: { ... }
```

### **❌ Should NOT See:**
```
ERROR: Unmatched route: /onboarding/step1
ERROR: Unmatched route: /onboarding/step2
WARN: Route "step1" is extraneous
```

---

## 🧪 **Test the New Flow**

### **Option 1: Full Registration Flow**
1. Logout (if logged in)
2. Register new account: `test3@example.com` / `test123`
3. Should redirect to **About** (Step 1/5)
4. Complete and tap Continue
5. Should see **Journey** (Step 2/5) ✨ NEW SCREEN
6. Complete all 5 steps
7. Should reach Main App

### **Option 2: Use Tester Tab**
1. Open **Tester** tab
2. Navigate to "1. About (Gender)"
3. Complete step → Continue
4. Should navigate to "2. Journey (Goals)"
5. Test each step individually

---

## 📱 **Expo Go App Cache**

Sometimes Expo Go caches old routes. If clearing Metro cache doesn't work:

### **Android:**
1. Go to phone Settings
2. Apps → Expo Go
3. Storage → Clear Cache
4. Reopen Expo Go
5. Scan QR code

### **iOS:**
1. Delete Expo Go app
2. Reinstall from App Store
3. Scan QR code

---

## 🎯 **Updated Route Map**

### **Onboarding Routes:**
```
/onboarding/about              ← Step 1/5 (Gender)
/onboarding/journey            ← Step 2/5 (Goals) ✨ NEW
/onboarding/trainingExperience ← Step 3/5 (Training)
/onboarding/injuries           ← Step 4/5 (Injuries)
/onboarding/mainGoal           ← Step 5/5 (Main Goal)
```

### **Navigation Flow:**
```
Signup → about → journey → trainingExperience → injuries → mainGoal → Main App
```

---

## ⚠️ **If Still Not Working**

### **Nuclear Option: Complete Clean**
```cmd
cd frontend

# Stop server
Ctrl+C

# Clean everything
rm -rf node_modules/.cache
rm -rf .expo

# Restart with clear
npx expo start --clear
```

Then on phone:
1. Close Expo Go completely
2. Clear Expo Go cache (Settings → Apps → Expo Go → Clear Cache)
3. Reopen Expo Go
4. Scan QR code

---

## 📋 **Files Updated**

All these files now use the new route names:

- ✅ `app/index.tsx` - Redirects to `/onboarding/about`
- ✅ `app/onboarding/about.tsx` - Navigates to `/onboarding/journey`
- ✅ `app/onboarding/journey.tsx` - Navigates to `/onboarding/trainingExperience`
- ✅ `app/onboarding/trainingExperience.tsx` - Navigates to `/onboarding/injuries`
- ✅ `app/onboarding/injuries.tsx` - Navigates to `/onboarding/mainGoal`
- ✅ `app/onboarding/mainGoal.tsx` - Completes onboarding
- ✅ `app/(tabs)/debug.tsx` - Updated all route references
- ✅ `app/(tabs)/debug_tester.tsx` - Updated all route references

---

## ✅ **Success Checklist**

After clearing cache, verify:

- [ ] Metro bundler started with `--clear` flag
- [ ] No "unmatched route" errors in terminal
- [ ] Tester tab shows 5 onboarding screens (not 4)
- [ ] Can navigate to "1. About (Gender)"
- [ ] Can navigate to "2. Journey (Goals)" ✨
- [ ] All 5 steps accessible
- [ ] Signup redirects to "about" (not step1)

---

## 🚀 **Quick Commands**

```cmd
# Stop server
Ctrl+C

# Clear and restart
cd frontend
npx expo start --clear

# In Expo Go: Shake → Reload
```

---

**Clear Metro cache with `npx expo start --clear` and force reload in Expo Go! 🎉**

