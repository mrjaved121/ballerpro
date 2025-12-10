# 🚀 Signup Integration - Quick Start Guide

## ⚡ TL;DR

The signup screen now makes real API calls to your backend. Here's how to test it:

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm start

# Open app → Register → Fill form → Tap Register → ✅ User created!
```

---

## 🎯 What Changed?

| Before | After |
|--------|-------|
| Mock authentication | Real API calls |
| In-memory storage | SecureStore (encrypted) |
| Fake users | Real users in MongoDB |
| No tokens | JWT access + refresh tokens |
| Simple errors | Comprehensive error handling |

---

## 📁 Key Files

### You Need to Know About:
1. **`frontend/src/config/api.ts`** - Change API URL here
2. **`frontend/src/services/auth/authService.ts`** - All API calls
3. **`frontend/src/services/auth/storage.ts`** - Token storage

### You Don't Need to Touch:
- `frontend/app/auth/register.tsx` - Already using the right hooks
- `frontend/src/contexts/AuthContext.tsx` - Already structured correctly

---

## 🧪 Quick Test

### 1. Start Everything
```bash
# Backend (Terminal 1)
cd backend
npm start
# Wait for: "Server running on port 5000"

# Frontend (Terminal 2)
cd frontend  
npm start
# Choose: ios / android / web
```

### 2. Test Signup
1. Open app
2. Go to Register screen
3. Enter:
   - Email: `yourname@example.com`
   - Password: `password123`
   - Confirm: `password123`
   - ✓ Accept terms
4. Tap "Register"

### 3. Check Console
Should see:
```
[ApiService] 🚀 POST /auth/register
[ApiService] ✅ POST /auth/register - 201
[Storage] Access token saved
[Storage] User saved: yourname@example.com
[AuthService] ✅ Registration successful
```

### 4. Success!
- ✅ User created in MongoDB
- ✅ Tokens stored securely
- ✅ Redirected to onboarding

---

## ❌ Common Issues

### "Network Error"
**Problem**: Backend not running
**Fix**: `cd backend && npm start`

### "Unable to connect"
**Problem**: Wrong API URL
**Fix**: Check `frontend/src/config/api.ts`

### "Email already registered"
**Problem**: User exists
**Fix**: Use different email or check MongoDB

---

## 🔍 Where to Look

### Console Logs
- Frontend: Metro bundler console
- Backend: Terminal where you ran `npm start`

### Database
```bash
# MongoDB Compass
# Connect to: mongodb://localhost:27017
# Database: ballerpro
# Collection: users
```

---

## 📚 Full Documentation

- **Quick Reference**: `SIGNUP_INTEGRATION_QUICKREF.md`
- **Testing Checklist**: `SIGNUP_TESTING_CHECKLIST.md`
- **Architecture**: `SIGNUP_ARCHITECTURE.md`
- **Complete Guide**: `SIGNUP_INTEGRATION.md`
- **Summary**: `SIGNUP_COMPLETE.md`

---

## ✅ Verify It Works

```bash
# Test with cURL
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Expected: 201 response with user data
```

---

## 🎯 Next Steps

1. **Test signup** (you are here)
2. **Integrate login** (same pattern)
3. **Integrate logout** (already done)
4. **Test full auth flow**

---

## 🆘 Need Help?

1. Check console logs
2. Check backend logs
3. Review `SIGNUP_TESTING_CHECKLIST.md`
4. Check MongoDB for user creation
5. Review error messages

---

## 🔧 Configuration

### Development
✅ Already configured for `localhost:5000`

### Production
Update `frontend/src/config/api.ts`:
```typescript
BASE_URL: 'https://your-api.com/api'
```

---

## 📊 What's Integrated

| Feature | Status |
|---------|--------|
| Register | ✅ Complete |
| Login | 🔄 Ready (needs testing) |
| Logout | 🔄 Ready (needs testing) |
| Token Refresh | ✅ Complete |
| Secure Storage | ✅ Complete |
| Error Handling | ✅ Complete |

---

**Status**: 🟢 Ready to Test

**Time to Complete**: ~5 minutes to test

**Prerequisites**: Backend running, MongoDB connected

---

*Quick Start Guide - Signup Integration*
*Last Updated: December 10, 2025*

