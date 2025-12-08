# 🎯 START HERE - Auth Flow Testing

**Everything is ready! Follow these steps to test login, logout, and onboarding.**

---

## ⚡ **Quick Start (30 seconds)**

### **1. Start the App**
```cmd
cd frontend
npm start
```

### **2. Open Expo Go**
- Scan the QR code with your phone
- App will open on **Login Screen**

### **3. Login with Demo Account**
```
Email: demo@ballerpro.com
Password: demo123
```

### **4. Success!**
✅ You should see the **Main App (Habit Tracker)**

---

## 🧪 **What to Test**

### **Test 1: Demo Login** ✅
- Use demo account (above)
- Should go straight to main app

### **Test 2: New Registration** ✅
- Tap "Sign Up" on login screen
- Create account: `test@example.com` / `test123`
- Complete 4 onboarding steps
- Should reach main app

### **Test 3: Logout** ✅
- Go to Settings tab
- Scroll to bottom
- Tap "Log Out"
- Should return to login screen

---

## 📚 **Documentation**

### **Quick Reference:**
- **`QUICK_START_AUTH_TESTING.md`** - 5-minute testing guide
- **`TESTING_GUIDE_AUTH_FLOW.md`** - Detailed testing scenarios
- **`AUTH_SETUP_SUMMARY.md`** - Technical overview

---

## ✅ **What Was Set Up**

1. ✅ **Screen Renames:**
   - Integrations → Wearables & Integrations
   - Premium → Subscription

2. ✅ **Authentication System:**
   - Mock login/register/logout
   - User state management
   - Persistent sessions (simulated)

3. ✅ **Navigation Flow:**
   - Login → Onboarding (if new) → Main App
   - Automatic routing based on auth state

4. ✅ **Demo Account:**
   - Email: `demo@ballerpro.com`
   - Password: `demo123`

---

## 🔍 **Console Logs to Watch**

Open your terminal and watch for these logs:

**Login:**
```
[Auth] Login successful: demo@ballerpro.com
[Index] → Redirecting to main app
```

**Register:**
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

## ⚠️ **Troubleshooting**

**App stuck on loading?**
→ Press `r` in terminal to reload

**"User already exists" error?**
→ Use different email: `test2@example.com`

**Navigation not working?**
→ Restart: `Ctrl+C` then `npm start`

---

## 🎯 **Success Criteria**

Your testing is successful if:

- ✅ Demo login works
- ✅ New registration works
- ✅ Onboarding completes (4 steps)
- ✅ Logout returns to login
- ✅ Console shows correct logs
- ✅ Navigation is automatic

---

## 🚀 **Ready!**

1. Run `npm start`
2. Scan QR code
3. Login with demo account
4. Explore the app!

**Everything is configured and ready for testing! 🎉**

---

**Need more details?** See `QUICK_START_AUTH_TESTING.md`

