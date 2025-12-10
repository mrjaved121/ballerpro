# Signup Integration - Testing Checklist

## Pre-Testing Setup

### Backend Setup
- [ ] MongoDB is running
- [ ] Navigate to backend directory: `cd backend`
- [ ] Start backend server: `npm start`
- [ ] Verify in console: "Server running on port 5000"
- [ ] Verify in console: "MongoDB Connected"

### Frontend Setup  
- [ ] Navigate to frontend directory: `cd frontend`
- [ ] Start development server: `npm start`
- [ ] Choose platform (iOS/Android/Web)
- [ ] App loads successfully
- [ ] No initial errors in console

## Test Scenarios

### ✅ Test 1: Valid Registration
**Steps:**
1. [ ] Open app on device/simulator
2. [ ] Navigate to Register screen
3. [ ] Enter email: `test@example.com`
4. [ ] Enter password: `password123`
5. [ ] Enter confirm password: `password123`
6. [ ] Check "Terms & Conditions" checkbox
7. [ ] Tap "Register" button

**Expected Results:**
- [ ] Loading indicator appears
- [ ] No error messages shown
- [ ] Console shows: `[ApiService] 🚀 POST /auth/register`
- [ ] Console shows: `[ApiService] ✅ POST /auth/register - 201`
- [ ] Console shows: `[AuthService] ✅ Registration successful`
- [ ] User redirected to onboarding screen
- [ ] Backend logs show: `POST /api/auth/register 201`

**Verification:**
- [ ] Check MongoDB - user document created
- [ ] User email matches input
- [ ] User has `isEmailVerified: false`
- [ ] `createdAt` timestamp is recent

---

### ❌ Test 2: Duplicate Email
**Steps:**
1. [ ] Try to register with same email as Test 1
2. [ ] Fill in all fields correctly
3. [ ] Tap "Register"

**Expected Results:**
- [ ] Loading indicator appears briefly
- [ ] Error message displayed: "Email already registered"
- [ ] Alert shown with error message
- [ ] User remains on register screen
- [ ] Console shows: `[ApiService] ❌ POST /auth/register - 409`

---

### ❌ Test 3: Invalid Email Format
**Steps:**
1. [ ] Enter email: `notanemail`
2. [ ] Enter password: `password123`
3. [ ] Enter confirm password: `password123`
4. [ ] Check terms checkbox
5. [ ] Tap "Register"

**Expected Results:**
- [ ] Error message: "Invalid email" (from backend)
- [ ] OR local validation catches it first
- [ ] User remains on register screen

---

### ❌ Test 4: Password Too Short
**Steps:**
1. [ ] Enter email: `short@example.com`
2. [ ] Enter password: `12345` (5 characters)
3. [ ] Enter confirm password: `12345`
4. [ ] Check terms checkbox
5. [ ] Tap "Register"

**Expected Results:**
- [ ] Local validation error: "Password must be at least 6 characters"
- [ ] Error displayed before API call
- [ ] No network request made

---

### ❌ Test 5: Passwords Don't Match
**Steps:**
1. [ ] Enter email: `mismatch@example.com`
2. [ ] Enter password: `password123`
3. [ ] Enter confirm password: `password456`
4. [ ] Check terms checkbox
5. [ ] Tap "Register"

**Expected Results:**
- [ ] Local validation error: "Passwords do not match"
- [ ] Error displayed before API call
- [ ] No network request made

---

### ❌ Test 6: Missing Required Fields
**Steps:**
1. [ ] Leave email empty
2. [ ] Enter password: `password123`
3. [ ] Enter confirm password: `password123`
4. [ ] Check terms checkbox
5. [ ] Tap "Register"

**Expected Results:**
- [ ] Error message: "Please fill in all fields"
- [ ] No network request made

---

### ❌ Test 7: Terms Not Accepted
**Steps:**
1. [ ] Fill in all fields correctly
2. [ ] DO NOT check terms checkbox
3. [ ] Try to tap "Register"

**Expected Results:**
- [ ] Register button is disabled
- [ ] OR error message: "Please accept the Terms & Conditions"
- [ ] No network request made

---

### ❌ Test 8: Backend Offline
**Steps:**
1. [ ] Stop backend server
2. [ ] Fill in all fields correctly
3. [ ] Check terms checkbox
4. [ ] Tap "Register"

**Expected Results:**
- [ ] Loading indicator appears
- [ ] Error message: "Unable to connect to server. Please check your internet connection."
- [ ] Console shows: Network Error
- [ ] User remains on register screen

**Cleanup:**
- [ ] Restart backend server for remaining tests

---

### 🔄 Test 9: Loading State
**Steps:**
1. [ ] Fill in valid registration data
2. [ ] Tap "Register"
3. [ ] Observe UI during loading

**Expected Results:**
- [ ] "Register" button shows "Registering..."
- [ ] Register button is disabled during loading
- [ ] Loading indicator/spinner visible
- [ ] Cannot tap button multiple times

---

### 🔐 Test 10: Token Storage
**After successful registration (Test 1):**

**Console Checks:**
- [ ] Console shows: `[Storage] Access token saved`
- [ ] Console shows: `[Storage] Refresh token saved`
- [ ] Console shows: `[Storage] User saved: test@example.com`

**Developer Tools:**
- [ ] Open React Native Debugger (if available)
- [ ] Check SecureStore/AsyncStorage
- [ ] Verify `@ballerpro_token` exists
- [ ] Verify `@ballerpro_refresh_token` exists
- [ ] Verify `@ballerpro_user` exists

---

## Post-Testing Verification

### Console Logs Review
- [ ] No unexpected errors in console
- [ ] All API calls logged properly
- [ ] Storage operations logged properly
- [ ] Auth context state updates logged

### Backend Logs Review
- [ ] POST requests logged with status codes
- [ ] No 500 internal server errors
- [ ] MongoDB queries successful

### Database Verification
- [ ] Open MongoDB (Compass or CLI)
- [ ] Check `users` collection
- [ ] Verify test users created
- [ ] Verify password is hashed (not plain text)
- [ ] Verify email addresses are correct

### Cleanup
- [ ] Delete test users from database (optional)
- [ ] Clear app storage (optional)
- [ ] Document any issues found
- [ ] Take screenshots of errors (if any)

---

## Debugging Guide

### If Test Fails

**Network Error:**
```
Check:
- [ ] Backend is running (npm start in backend directory)
- [ ] Backend URL is correct (http://localhost:5000)
- [ ] No firewall blocking port 5000
- [ ] Device/simulator can reach localhost
```

**Validation Error:**
```
Check:
- [ ] Input matches expected format
- [ ] Backend validation rules in API_CONTRACT.md
- [ ] Request body is correct JSON
```

**CORS Error:**
```
Check:
- [ ] Backend CORS middleware configured
- [ ] Frontend origin allowed in backend
- [ ] Headers include Content-Type: application/json
```

**Token Not Stored:**
```
Check:
- [ ] SecureStore permissions
- [ ] Storage.ts methods working
- [ ] Console logs for storage operations
- [ ] Platform-specific SecureStore availability
```

---

## Success Criteria

### All Tests Should:
- [ ] At least 1 successful registration (Test 1)
- [ ] All error scenarios handled gracefully
- [ ] No app crashes
- [ ] Tokens stored securely
- [ ] User data stored correctly
- [ ] Navigation works properly
- [ ] Backend responds correctly
- [ ] Database updated correctly

### Ready for Next Phase When:
- [ ] All test scenarios passed
- [ ] Error handling verified
- [ ] Token management working
- [ ] No critical bugs found
- [ ] Documentation matches behavior

---

## Notes Section
*(Use this space to document any issues, observations, or improvements)*

**Issues Found:**


**Observations:**


**Improvements Needed:**


**Test Date:** ___________
**Tested By:** ___________
**Status:** ⬜ Passed | ⬜ Failed | ⬜ Needs Retry

