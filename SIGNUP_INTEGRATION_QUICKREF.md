# Signup API Integration - Quick Reference

## 🔄 Data Flow

```
User Input (Register Screen)
    ↓
    email: "user@example.com"
    password: "password123"
    name: "John Doe"
    ↓
AuthContext.register()
    ↓
authService.register()
    ↓
API Client (axios)
    ↓ POST http://localhost:5000/api/auth/register
    ↓ Headers: { Content-Type: application/json }
    ↓ Body: { email, password, name }
    ↓
Backend Server
    ↓ Validates input
    ↓ Checks if email exists
    ↓ Hashes password
    ↓ Creates user in MongoDB
    ↓ Generates JWT access token
    ↓ Generates JWT refresh token
    ↓
Response 201 Created
    {
      "success": true,
      "message": "User registered successfully",
      "data": {
        "user": {
          "id": "...",
          "email": "user@example.com",
          "name": "John Doe",
          "avatar": null,
          "isEmailVerified": false,
          "createdAt": "2025-12-10T..."
        },
        "token": "eyJhbGc...",
        "refreshToken": "eyJhbGc..."
      }
    }
    ↓
authService.register()
    ↓ Transforms backend user to app User type
    ↓ storage.saveToken(token)
    ↓ storage.saveRefreshToken(refreshToken)
    ↓ storage.saveUser(user)
    ↓ Returns User object
    ↓
AuthContext
    ↓ Updates state: { user, isAuthenticated: true }
    ↓
App Navigation
    ↓ Redirects to /onboarding (new user)
```

## 📱 Register Screen → Backend

### Request
```http
POST /api/auth/register HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Success Response (201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": null,
      "isEmailVerified": false,
      "createdAt": "2025-12-10T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Error Response (400 - Validation)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email",
      "code": "invalid_string"
    }
  ]
}
```

### Error Response (409 - Duplicate)
```json
{
  "success": false,
  "message": "Email already registered"
}
```

## 🔐 Stored Data After Signup

### SecureStore (Encrypted)
- `@ballerpro_token`: Access token (JWT)
- `@ballerpro_refresh_token`: Refresh token (JWT)
- `@ballerpro_user`: User object (JSON)

### User Object Stored Locally
```typescript
{
  id: "64f5a1b2c3d4e5f6a7b8c9d0",
  email: "user@example.com",
  name: "John Doe",
  avatar: null,
  isEmailVerified: false,
  isPremium: false,
  onboardingCompleted: false,
  createdAt: "2025-12-10T10:00:00.000Z"
}
```

## 🧪 Testing Commands

### Start Backend
```bash
cd backend
npm start
# Expected: Server running on port 5000
```

### Start Frontend
```bash
cd frontend
npm start
# Choose platform: ios, android, web
```

### Test with cURL
```bash
# Test backend directly
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Expected Backend Log
```
POST /api/auth/register 201 148.392 ms - 512
```

### Expected Frontend Console
```
[AuthService] Register attempt: test@example.com
[ApiService] 🚀 POST /auth/register
[ApiService] ✅ POST /auth/register - 201
[Storage] Access token saved
[Storage] Refresh token saved  
[Storage] User saved: test@example.com
[AuthService] ✅ Registration successful: test@example.com
[AuthContext] ✅ User registered: { email: 'test@example.com', ... }
```

## 🔍 Debugging Checklist

### Backend Not Responding
```
❌ [ApiService] ❌ Network error - No response received
```
**Fix**: Ensure backend is running on port 5000

### Connection Refused
```
❌ Error: connect ECONNREFUSED 127.0.0.1:5000
```
**Fix**: Start backend server

### CORS Error
```
❌ Access to XMLHttpRequest blocked by CORS policy
```
**Fix**: Check backend CORS configuration

### Validation Error
```
❌ [ApiService] ❌ POST /auth/register - 400
```
**Check**: Request body format and validation rules

### Duplicate Email
```
❌ [ApiService] ❌ POST /auth/register - 409
```
**Expected**: User already exists, try different email

## 📊 File Structure

```
ballerpro/
├── frontend/
│   └── src/
│       ├── config/
│       │   └── api.ts                 ← API configuration
│       ├── types/
│       │   └── auth.ts                ← Type definitions
│       ├── services/
│       │   ├── api/
│       │   │   └── api.ts             ← HTTP client
│       │   └── auth/
│       │       ├── authService.ts     ← Auth API calls
│       │       └── storage.ts         ← Secure storage
│       └── contexts/
│           └── AuthContext.tsx        ← Auth state management
│
├── backend/
│   └── src/
│       └── controllers/
│           └── authController.js      ← Register endpoint
│
├── SIGNUP_INTEGRATION.md              ← Full documentation
├── SIGNUP_INTEGRATION_SUMMARY.md      ← Summary
└── SIGNUP_INTEGRATION_QUICKREF.md     ← This file
```

## ✅ Verification Steps

1. **Backend Running**: `http://localhost:5000/api/health` returns 200
2. **Register Screen**: Visible in app
3. **Form Submission**: No console errors
4. **API Call**: POST request visible in network tab
5. **Response**: 201 status code
6. **Storage**: Token stored in SecureStore
7. **Navigation**: Redirects to onboarding
8. **MongoDB**: User document created

## 🎯 Success Indicators

✅ Console shows: `[AuthService] ✅ Registration successful`
✅ User stored in MongoDB
✅ Tokens stored in SecureStore
✅ AuthContext updated with user
✅ App navigates to onboarding screen
✅ Backend logs show 201 response

## 📖 Related Documentation

- **API Contract**: `API_CONTRACT.md` - Full API specification
- **Integration Guide**: `SIGNUP_INTEGRATION.md` - Detailed implementation
- **Summary**: `SIGNUP_INTEGRATION_SUMMARY.md` - Overview and checklist

