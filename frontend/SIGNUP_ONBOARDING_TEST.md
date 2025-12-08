# 🧪 Signup → Onboarding Redirect Test

## ✅ **What Should Happen**

When you create a new account:
1. Fill in registration form
2. Tap "Create Account"
3. ✅ Should automatically redirect to **Onboarding Step 1**
4. Complete 4 onboarding steps
5. ✅ Should redirect to **Main App**

---

## 🧪 **How to Test**

### **Step 1: Create New Account**
1. On Register screen, enter:
   - Email: `newuser@test.com`
   - Password: `test123`
   - Confirm Password: `test123`
2. Check **Terms & Conditions**
3. Tap **"Create Account"**

### **Step 2: Watch Console Logs**
You should see in terminal:
```
[AuthContext] Register...
[Auth] Register attempt: newuser@test.com
[Storage] Token saved
[Storage] User saved: newuser@test.com
[Auth] Registration successful: newuser@test.com
[AuthContext] ✅ User registered: { email: 'newuser@test.com', onboardingCompleted: false }
[Index] 🔍 Navigation check: { isAuthenticated: true, onboardingCompleted: false, ... }
[Index] 🎓 Redirecting to onboarding (user needs onboarding)
```

### **Step 3: Should See Onboarding**
✅ Automatically navigates to **Onboarding Step 1**
- Should see "Select Your Gender" screen
- Progress bar shows 1/4

---

## 🔍 **Console Log Meanings**

| Log | Meaning |
|-----|---------|
| `[AuthContext] Register...` | Registration started |
| `[Auth] Registration successful` | User created in database |
| `[AuthContext] ✅ User registered` | User state updated in context |
| `[Index] 🔍 Navigation check` | index.tsx checking where to navigate |
| `[Index] 🎓 Redirecting to onboarding` | **This is what you want to see!** |

---

## ⚠️ **If Not Redirecting**

### **Check Console:**
Look for this line:
```
[Index] 🎓 Redirecting to onboarding (user needs onboarding)
```

**If you DON'T see it:**
1. Check if you see: `[Index] 🔍 Navigation check`
2. Look at the values: `onboardingCompleted` should be `false`
3. Check if `inOnboardingGroup` is `false` (should be redirecting)

### **Force Reload:**
```cmd
Press 'r' in terminal
```

### **Clear Cache:**
```cmd
Ctrl+C
npm start -- --clear
```

---

## 🎯 **Test with Different Users**

### **Test 1: Brand New User**
- Email: `user1@test.com`
- ✅ Should go to onboarding

### **Test 2: Another New User**
- Email: `user2@test.com`
- ✅ Should go to onboarding

### **Test 3: Demo User (Already Complete)**
- Email: `demo@ballerpro.com`
- Password: `demo123`
- ✅ Should go directly to main app (skips onboarding)

---

## 📊 **Navigation Flow**

```
Register Screen
    ↓
[Create Account Tapped]
    ↓
AuthContext.register()
    ↓
User Created (onboardingCompleted: false)
    ↓
State Updated
    ↓
index.tsx useEffect Triggered
    ↓
Checks: isAuthenticated ✅, onboardingCompleted ❌
    ↓
🎓 Redirects to /onboarding/step1
    ↓
Onboarding Step 1 Screen
```

---

## ✅ **Success Criteria**

- ✅ After signup, automatically on Onboarding Step 1
- ✅ Can complete all 4 onboarding steps
- ✅ After step 4, automatically redirects to main app
- ✅ Console logs show correct navigation flow

---

## 🐛 **Debug with Tester Tab**

If automatic redirect isn't working:

1. Open **Tester** tab (flask icon 🧪)
2. Manually navigate to "Onboarding Step 1"
3. Complete onboarding manually
4. Check if main app redirect works

This helps isolate if the issue is:
- Navigation logic (index.tsx)
- OR Auth state management (AuthContext)

---

## 📝 **Notes**

- **New users:** `onboardingCompleted: false`
- **Demo user:** `onboardingCompleted: true`
- **After completing onboarding:** `onboardingCompleted` changes to `true`

---

**Test now! Create a new account and watch the console logs. 🚀**

