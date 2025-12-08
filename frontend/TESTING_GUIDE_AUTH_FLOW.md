# 🧪 Authentication & Onboarding Flow Testing Guide

Complete guide for testing the login, logout, and onboarding flow in the BallerPro app.

---

## 📋 **What Was Set Up**

### ✅ **1. Screen Renames**
- `integrations.tsx` → `wearables.tsx` (Wearables & Integrations)
- `premium.tsx` → `subscription.tsx` (Subscription)

### ✅ **2. Mock Authentication System**
- **Storage Service** (`src/services/auth/storage.ts`): In-memory storage simulating persistent data
- **Auth Service** (`src/services/auth/authService.ts`): Mock API for login/register/logout
- **Auth Context** (`src/contexts/AuthContext.tsx`): Global state management for authentication

### ✅ **3. Navigation Flow**
- **`app/index.tsx`**: Smart routing based on auth state
  - Not authenticated → Login screen
  - Authenticated but no onboarding → Onboarding flow
  - Authenticated + onboarding complete → Main app

### ✅ **4. Demo Account**
Pre-configured test account:
- **Email:** `demo@ballerpro.com`
- **Password:** `demo123`
- **Status:** Onboarding already completed

---

## 🚀 **Testing Instructions**

### **Prerequisites**
```cmd
cd frontend
npm start
```

Scan QR code with Expo Go on your phone.

---

## 🧪 **Test Scenarios**

### **Scenario 1: Fresh Start (New User Registration)**

#### **Step 1: Initial Load**
1. App should automatically redirect to **Login Screen**
2. You should see:
   - "Welcome Back" title
   - Email and password inputs
   - "Login" button
   - "Don't have an account? Sign Up" link

#### **Step 2: Navigate to Register**
1. Tap **"Sign Up"** link at the bottom
2. You should see **Register Screen**:
   - Email input
   - Password input
   - Confirm password input
   - Terms & Conditions checkbox
   - "Create Account" button

#### **Step 3: Create New Account**
1. Enter:
   - Email: `test@example.com`
   - Password: `test123`
   - Confirm Password: `test123`
2. Check **"I accept the Terms & Conditions"**
3. Tap **"Create Account"**
4. Watch console logs: `[Auth] Registration successful`

#### **Step 4: Automatic Onboarding Redirect**
1. App should automatically navigate to **Onboarding Step 1**
2. You should see:
   - Progress bar (1/4)
   - "Select Your Gender" title
   - Three gender options: Male, Female, Other

#### **Step 5: Complete Onboarding**

**Step 1 - Gender:**
1. Select a gender
2. Tap **"Continue"**
3. Should navigate to Step 2

**Step 2 - Training Level:**
1. Select training level (Beginner/Intermediate/Advanced)
2. Tap **"Continue"**
3. Should navigate to Step 3

**Step 3 - Injuries:**
1. Select any injuries (optional)
2. Tap **"Continue"**
3. Should navigate to Step 4

**Step 4 - Goals:**
1. Select a goal (Build Muscle, Lose Weight, etc.)
2. Tap **"Continue"**
3. Watch console logs: `[Onboarding] Completed successfully`

#### **Step 6: Automatic Main App Redirect**
1. App should automatically navigate to **Main App (Habit Tracker)**
2. You should see the bottom tab navigation
3. Onboarding is complete! ✅

---

### **Scenario 2: Existing User Login (Demo Account)**

#### **Step 1: Login**
1. On **Login Screen**, enter:
   - Email: `demo@ballerpro.com`
   - Password: `demo123`
2. Tap **"Login"**
3. Watch console logs: `[Auth] Login successful`

#### **Step 2: Skip Onboarding**
1. Since demo account has `onboardingCompleted: true`
2. App should automatically navigate to **Main App**
3. You should see the Habit Tracker screen

---

### **Scenario 3: Logout Flow**

#### **Step 1: Navigate to Settings**
1. Tap **Settings** tab in bottom navigation
2. Scroll to bottom
3. Find **"Log Out"** button (red text)

#### **Step 2: Logout**
1. Tap **"Log Out"**
2. Watch console logs: `[Auth] Logout successful`
3. App should automatically redirect to **Login Screen**

#### **Step 3: Verify Logout**
1. Try logging in again with the same credentials
2. Should work normally

---

### **Scenario 4: Incomplete Onboarding Resume**

#### **Step 1: Register New User**
1. Create account: `incomplete@example.com` / `test123`
2. Start onboarding (Step 1)

#### **Step 2: Force Close App**
1. Close Expo Go app completely
2. Reopen app

#### **Step 3: Resume Onboarding**
1. App should detect incomplete onboarding
2. Should redirect to **Onboarding Step 1**
3. Complete the flow normally

---

## 🔍 **What to Check in Console Logs**

### **Login:**
```
[Auth] Login attempt: demo@ballerpro.com
[Storage] Token saved
[Storage] User saved: demo@ballerpro.com
[Auth] Login successful: demo@ballerpro.com
[Index] Navigation check: { isAuthenticated: true, onboardingCompleted: true }
[Index] → Redirecting to main app
```

### **Register:**
```
[Auth] Register attempt: test@example.com
[Storage] Token saved
[Storage] User saved: test@example.com
[Auth] Registration successful: test@example.com
[Index] Navigation check: { isAuthenticated: true, onboardingCompleted: false }
[Index] → Redirecting to onboarding
```

### **Logout:**
```
[Auth] Logout initiated
[Storage] All data cleared
[Auth] Logout successful
[Index] Navigation check: { isAuthenticated: false }
[Index] → Redirecting to login
```

### **Onboarding Complete:**
```
[Onboarding] Completed successfully
[Auth] User updated: test@example.com
[Index] Navigation check: { isAuthenticated: true, onboardingCompleted: true }
[Index] → Redirecting to main app
```

---

## ⚠️ **Common Issues & Solutions**

### **Issue 1: Stuck on Loading Screen**
**Symptom:** White screen with loading spinner forever

**Solution:**
1. Check console for errors
2. Restart Metro bundler: `Ctrl+C` → `npm start`
3. Clear Expo cache: `npm start -- --clear`

### **Issue 2: Navigation Not Working**
**Symptom:** Tapping buttons doesn't navigate

**Solution:**
1. Check console logs for navigation errors
2. Verify auth state in logs
3. Try manual navigation: Press `r` in terminal to reload

### **Issue 3: "User Already Exists" Error**
**Symptom:** Can't register with same email twice

**Solution:**
1. This is expected behavior!
2. Use a different email: `test2@example.com`
3. Or use demo account: `demo@ballerpro.com` / `demo123`

### **Issue 4: Onboarding Skipped**
**Symptom:** Registered but went straight to main app

**Solution:**
1. Check if you used demo account (already has onboarding complete)
2. Create fresh account with new email
3. Check console: should show `onboardingCompleted: false`

---

## 🎯 **Success Criteria**

### ✅ **All Tests Pass If:**
1. **Login works** with demo account
2. **Register creates** new account
3. **Onboarding flow** completes all 4 steps
4. **Navigation redirects** automatically based on auth state
5. **Logout** returns to login screen
6. **Console logs** show correct auth state changes

---

## 📊 **Test Checklist**

Use this checklist to track your testing:

- [ ] **Fresh Start:** Register → Onboarding → Main App
- [ ] **Demo Login:** Login → Main App (skip onboarding)
- [ ] **Logout:** Settings → Logout → Login Screen
- [ ] **Resume Onboarding:** Register → Close App → Reopen → Resume
- [ ] **Invalid Login:** Wrong password shows error
- [ ] **Duplicate Email:** Register with existing email shows error
- [ ] **Password Mismatch:** Confirm password validation works
- [ ] **Terms Checkbox:** Can't register without accepting terms
- [ ] **Console Logs:** All auth state changes logged correctly
- [ ] **Navigation:** Automatic redirects work properly

---

## 🔧 **Developer Notes**

### **Mock Data Location:**
- **Users Database:** `src/services/auth/authService.ts` (line 9)
- **Storage:** `src/services/auth/storage.ts` (in-memory)

### **Adding More Test Users:**
Edit `mockUsers` in `authService.ts`:
```typescript
const mockUsers = {
  'demo@ballerpro.com': { password: 'demo123', user: {...} },
  'test@example.com': { password: 'test123', user: {...} },
  // Add more here
};
```

### **Changing Navigation Logic:**
Edit `app/index.tsx` to customize routing rules.

### **Debugging Auth State:**
Add this to any screen:
```typescript
import { useAuth } from '@/contexts/AuthContext';

const { user, isAuthenticated } = useAuth();
console.log('Auth State:', { user, isAuthenticated });
```

---

## 🎉 **Ready to Test!**

1. Start Metro: `npm start`
2. Open Expo Go
3. Follow **Scenario 1** for full flow test
4. Check off items in **Test Checklist**
5. Report any issues in console logs

**Happy Testing! 🚀**

