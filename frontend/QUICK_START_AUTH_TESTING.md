# 🚀 Quick Start: Auth Flow Testing

**5-Minute Guide to Test Login, Logout, and Onboarding**

---

## ⚡ **Quick Commands**

```cmd
cd frontend
npm start
```

Scan QR code with Expo Go.

---

## 🎯 **3 Quick Tests**

### **Test 1: Demo Login (30 seconds)**
1. App opens → Login screen
2. Enter:
   - Email: `demo@ballerpro.com`
   - Password: `demo123`
3. Tap **Login**
4. ✅ Should go to **Main App (Habit Tracker)**

---

### **Test 2: New User Registration (2 minutes)**
1. On Login screen, tap **"Sign Up"**
2. Enter:
   - Email: `test@example.com`
   - Password: `test123`
   - Confirm: `test123`
3. Check **Terms & Conditions**
4. Tap **Create Account**
5. ✅ Should go to **Onboarding Step 1**
6. Complete all 4 steps:
   - **Step 1:** Select gender → Continue
   - **Step 2:** Select training level → Continue
   - **Step 3:** Select injuries (optional) → Continue
   - **Step 4:** Select goal → Continue
7. ✅ Should go to **Main App**

---

### **Test 3: Logout (15 seconds)**
1. Tap **Settings** tab (bottom right)
2. Scroll to bottom
3. Tap **"Log Out"** (red text)
4. ✅ Should return to **Login Screen**

---

## 📊 **Success Checklist**

- [ ] Demo login works
- [ ] New registration works
- [ ] Onboarding completes (4 steps)
- [ ] Logout returns to login
- [ ] Console shows correct logs

---

## 🔍 **Console Logs to Watch**

**Login Success:**
```
[Auth] Login successful: demo@ballerpro.com
[Index] → Redirecting to main app
```

**Register Success:**
```
[Auth] Registration successful: test@example.com
[Index] → Redirecting to onboarding
```

**Onboarding Complete:**
```
[Onboarding] Completed successfully
[Index] → Redirecting to main app
```

**Logout:**
```
[Auth] Logout successful
[Index] → Redirecting to login
```

---

## ⚠️ **Common Issues**

**"User already exists"**
→ Use different email: `test2@example.com`

**Stuck on loading**
→ Restart: `Ctrl+C` then `npm start`

**Navigation not working**
→ Press `r` in terminal to reload

---

## 📖 **Full Testing Guide**

For detailed testing scenarios, see: `TESTING_GUIDE_AUTH_FLOW.md`

---

## ✅ **Ready!**

Start with **Test 1** (Demo Login) to verify everything works! 🎉

