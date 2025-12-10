# Get Current User (/api/auth/me) Testing Guide

## ✅ What's Been Implemented

The **Get Current User** endpoint is now fully implemented according to the API contract!

**Endpoint:** `GET http://localhost:5000/api/auth/me`  
**Authentication:** Required (Bearer Token)

### Changes Made:
1. ✅ Fixed error message to "Failed to fetch user data" for 500 errors
2. ✅ Enhanced token verification to distinguish between expired and invalid tokens
3. ✅ Proper handling of missing Authorization header
4. ✅ Returns all required user fields including `createdAt` and `updatedAt`

---

## 🧪 Manual Testing Instructions

### ⚠️ Prerequisites

**You MUST have a valid access token!** 

Get a token by logging in first:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Copy the `token` value from the response and use it in the tests below.

---

### Test 1: Successful Request with Valid Token ✅

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Replace `YOUR_TOKEN_HERE` with actual token from login response**

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "675694b2e33d2e1c48d9f8a1",
      "email": "test@example.com",
      "name": "Test User",
      "avatar": null,
      "isEmailVerified": false,
      "createdAt": "2025-12-09T10:00:00.000Z",
      "updatedAt": "2025-12-09T10:00:00.000Z"
    }
  }
}
```

**✅ Success Criteria:**
- Status code: 200
- Returns complete user object
- Includes `createdAt` and `updatedAt` fields
- No `password` field in response (security)
- Message field not present (only in errors)

---

### Test 2: No Token Provided ❌

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**✅ Success Criteria:**
- Status code: 401
- Clear message about missing token
- Exact message: "No token provided"

---

### Test 3: Invalid Token Format ❌

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer invalid_token_12345"
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**✅ Success Criteria:**
- Status code: 401
- Generic message for security
- Doesn't reveal details about why token is invalid

---

### Test 4: Expired Token ❌

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer EXPIRED_TOKEN_HERE"
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Token has expired"
}
```

**✅ Success Criteria:**
- Status code: 401
- Specific message about expiration
- Exact message: "Token has expired"

**Note:** To test this, either:
- Wait 15 minutes after getting a token (tokens expire after 15min)
- Use an old token from a previous session
- Temporarily reduce JWT expiration time in .env for testing

---

### Test 5: Missing "Bearer" Prefix ❌

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: YOUR_TOKEN_HERE"
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**✅ Success Criteria:**
- Status code: 401
- Treats missing "Bearer" prefix as no token

---

### Test 6: Malformed Authorization Header ❌

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: InvalidFormat"
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**✅ Success Criteria:**
- Status code: 401
- Handles malformed headers gracefully

---

## 📋 Step-by-Step Testing Flow

### Complete Test Sequence:

```bash
# Step 1: Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"testme@example.com","password":"password123","name":"Test Me User"}'

# Step 2: Login to get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testme@example.com","password":"password123"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# Step 3: Use token to get current user
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:** All three commands succeed and return proper JSON responses!

---

## 🔍 Thunder Client Testing

1. **First, get a token:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body: `{"email":"test@example.com","password":"password123"}`
   - Copy the `token` from response

2. **Test the /me endpoint:**
   - Method: GET
   - URL: `http://localhost:5000/api/auth/me`
   - Headers Tab:
     - Key: `Authorization`
     - Value: `Bearer YOUR_TOKEN_HERE`
   - Click Send

3. **Verify response:**
   - Should return 200 with user data
   - All fields present
   - No password in response

---

## 📋 Testing Checklist

### Successful Request (200):
- [ ] Returns complete user object
- [ ] Includes all fields: id, email, name, avatar, isEmailVerified
- [ ] Includes timestamps: createdAt, updatedAt
- [ ] No password field present
- [ ] Wrapped in `data.user` structure

### Authentication Errors (401):
- [ ] No token returns "No token provided"
- [ ] Invalid token returns "Invalid or expired token"
- [ ] Expired token returns "Token has expired"
- [ ] Missing Bearer prefix returns "No token provided"
- [ ] All return 401 status code

### Edge Cases:
- [ ] Works immediately after login
- [ ] Works with freshly registered user
- [ ] Fails after token expiration (15 minutes)
- [ ] Token verification is case-sensitive

---

## 🔐 Security Validations

✅ **Password Never Returned:**
- User model has `select: false` on password field
- Password is excluded from response
- Even if database query includes it, it won't be sent

✅ **Token Validation:**
- JWT signature verified with secret
- Expiration time checked
- Payload integrity validated

✅ **Error Messages:**
- Don't reveal internal details
- Generic messages for invalid tokens
- Specific only when needed (expired vs missing)

---

## 💡 Common Use Cases

### Use Case 1: Session Restoration (App Launch)
```javascript
// When app starts, check if user still logged in
const token = await SecureStorage.getItem('token');
if (token) {
  try {
    const response = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      // User is still logged in
      const { data } = await response.json();
      setCurrentUser(data.user);
    } else {
      // Token invalid/expired - redirect to login
      redirectToLogin();
    }
  } catch (error) {
    redirectToLogin();
  }
}
```

### Use Case 2: Profile Display
```javascript
// Get fresh user data for profile screen
const { data } = await api.get('/auth/me');
setUserProfile(data.user);
```

### Use Case 3: Token Validation
```javascript
// Check if token is still valid before important action
const isValid = await checkTokenValidity();
if (!isValid) {
  await refreshToken();
}
```

---

## 🐛 Troubleshooting

**401 Error with valid-looking token:**
- Check token hasn't expired (15 min lifetime)
- Verify "Bearer " prefix is included
- Ensure no extra spaces in header
- Check JWT_SECRET matches between login and validation

**User not found error:**
- User might have been deleted from database
- Token contains wrong user ID
- Database connection issue

**Token keeps expiring:**
- Access tokens expire in 15 minutes (by design)
- Use refresh token endpoint to get new tokens
- Don't store tokens in code/repos

---

## 🔄 Token Lifecycle

```
1. Login → Receive access token (15min) + refresh token (30 days)
2. Use access token for API requests
3. After 15 minutes → Access token expires
4. Use refresh token to get new access token
5. Continue using new access token
6. After 30 days → Both tokens expire, user must login again
```

---

## 📝 Quick Reference

### Valid Request Format:
```
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response Structure:
```json
{
  "success": true,
  "data": {
    "user": { ...userFields }
  }
}
```

### Error Structure:
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## ✅ Implementation Details

**Middleware Chain:**
1. Request → `authenticate` middleware
2. Extract token from Authorization header
3. Verify token signature and expiration
4. Decode payload and attach to `req.user`
5. Pass to `getMe` controller
6. Query user from database
7. Return user data (password excluded)

**Token Contains:**
- `userId`: MongoDB ObjectId as string
- `email`: User's email
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

---

## 🚀 Quick Test Command

**One-liner to test everything:**
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}' | grep -o '"token":"[^"]*"' | cut -d'"' -f4) && curl -X GET http://localhost:5000/api/auth/me -H "Authorization: Bearer $TOKEN"
```

This will:
1. Login and extract token
2. Use token to call /me endpoint
3. Display your user data

---

**Ready to test!** 🚀

Test all the cases above and verify the responses match. Once confirmed, say **"next"** for the next endpoint!

