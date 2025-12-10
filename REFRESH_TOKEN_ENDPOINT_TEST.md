# Refresh Token Endpoint Testing Guide

## ✅ What's Been Implemented & Refactored

### Code Quality Improvements Made:

1. ✅ **Eliminated Redundant Token Generation** - Created `generateTokenPair()` helper
2. ✅ **Eliminated Redundant User Formatting** - Created `formatUserResponse()` helper
3. ✅ **Removed Unprofessional Dynamic Import** - Now imports `verifyToken` at top
4. ✅ **Fixed Inconsistent User Response** - Register and login now use same formatter
5. ✅ **Enhanced Error Handling** - Distinguishes between expired, invalid, and server errors
6. ✅ **Professional Code Structure** - Created `authHelpers.js` utility module

### Refresh Token Endpoint:

**Endpoint:** `POST http://localhost:5000/api/auth/refresh-token`  
**Authentication:** Not required (token is in body)

### Changes Made:
1. ✅ Removed unprofessional dynamic import
2. ✅ Added specific error message for expired refresh tokens
3. ✅ Distinguished between 401 (auth errors) and 500 (server errors)
4. ✅ Used helper function for token generation
5. ✅ Proper error handling matching API contract

---

## 🧪 Manual Testing Instructions

### ⚠️ Prerequisites

**You MUST have a valid refresh token!**

Get refresh token by logging in or registering:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Copy the `refreshToken` value from the response and use it in tests below.

---

### Test 1: Successful Token Refresh ✅

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN_HERE"}'
```

**Replace `YOUR_REFRESH_TOKEN_HERE` with actual refresh token from login**

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.newAccessToken...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.newRefreshToken..."
  }
}
```

**✅ Success Criteria:**
- Status code: 200
- Returns new access token
- Returns new refresh token
- Both tokens are different from the old ones (token rotation for security)
- No message field (only in errors)

---

### Test 2: Missing Refresh Token ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Refresh token is required"
}
```

**✅ Success Criteria:**
- Status code: 400
- Clear message about missing token
- Exact message: "Refresh token is required"

---

### Test 3: Invalid Refresh Token ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"invalid_token_12345"}'
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid refresh token"
}
```

**✅ Success Criteria:**
- Status code: 401
- Exact message: "Invalid refresh token"
- Doesn't reveal details about why

---

### Test 4: Expired Refresh Token ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"EXPIRED_REFRESH_TOKEN_HERE"}'
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Refresh token has expired"
}
```

**✅ Success Criteria:**
- Status code: 401
- Specific message about expiration
- Exact message: "Refresh token has expired"

**Note:** Refresh tokens expire after 30 days. To test:
- Use an old token from 30+ days ago
- Temporarily reduce refresh token expiration in config for testing

---

### Test 5: Malformed JSON ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{refreshToken: invalid json}'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid JSON in request body"
}
```

**✅ Success Criteria:**
- Status code: 400
- Error handled by middleware

---

## 📋 Complete Test Flow

### Full Token Lifecycle Test:

```bash
# Step 1: Register a new user
echo "=== STEP 1: Register ===" 
curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"tokentest@example.com","password":"password123","name":"Token Test"}' | jq

# Step 2: Login and save tokens
echo "\n=== STEP 2: Login ===" 
TOKENS=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tokentest@example.com","password":"password123"}')
  
echo $TOKENS | jq

# Extract refresh token
REFRESH_TOKEN=$(echo $TOKENS | jq -r '.data.refreshToken')
echo "\nRefresh Token: $REFRESH_TOKEN"

# Step 3: Use refresh token to get new tokens
echo "\n=== STEP 3: Refresh Token ===" 
curl -s -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\":\"$REFRESH_TOKEN\"}" | jq

# Step 4: Verify old refresh token is still valid (token rotation)
echo "\n=== STEP 4: Use Old Refresh Token Again ===" 
curl -s -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\":\"$REFRESH_TOKEN\"}" | jq
```

**Expected:** All steps succeed, showing complete token lifecycle!

---

## 🔍 Thunder Client Testing

1. **Get a refresh token first:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body: `{"email":"test@example.com","password":"password123"}`
   - Copy the `refreshToken` from response

2. **Test refresh-token endpoint:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/refresh-token`
   - Headers: `Content-Type: application/json`
   - Body:
   ```json
   {
     "refreshToken": "YOUR_REFRESH_TOKEN_HERE"
   }
   ```
   - Click Send

3. **Verify response:**
   - Should return 200 with NEW tokens
   - Both token and refreshToken should be present
   - Tokens should be different from original

---

## 📋 Testing Checklist

### Successful Refresh (200):
- [ ] Returns new access token
- [ ] Returns new refresh token
- [ ] Both tokens are different from old ones
- [ ] Status code is 200
- [ ] Response wrapped in `data` object
- [ ] No message field in success response

### Validation Errors (400):
- [ ] Missing refreshToken field returns proper error
- [ ] Empty string returns proper error
- [ ] Message: "Refresh token is required"

### Authentication Errors (401):
- [ ] Invalid token format returns "Invalid refresh token"
- [ ] Expired token returns "Refresh token has expired"
- [ ] Malformed JWT returns "Invalid refresh token"
- [ ] All return 401 status code

### Server Errors (500):
- [ ] Database connection issues return 500
- [ ] Message: "Failed to refresh token"
- [ ] Error details in development mode only

---

## 🔐 Security Features

### Token Rotation:
✅ **Both tokens are rotated on refresh**
- Old refresh token can still be used (current implementation)
- New access token has new expiration (15 min)
- New refresh token has new expiration (30 days)

**Note:** For maximum security, implement refresh token blacklisting to invalidate old tokens after use.

### Token Validation:
✅ **Comprehensive validation:**
- JWT signature verification
- Expiration time checking
- Payload integrity validation
- Distinguishes between expired vs invalid

---

## 💡 Common Use Cases

### Use Case 1: Automatic Token Refresh (Frontend)
```javascript
// Intercept 401 errors and refresh token automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      
      const refreshToken = await getRefreshToken();
      const { data } = await api.post('/auth/refresh-token', { refreshToken });
      
      // Save new tokens
      await saveTokens(data.token, data.refreshToken);
      
      // Retry original request with new token
      error.config.headers['Authorization'] = `Bearer ${data.token}`;
      return api(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Use Case 2: Proactive Token Refresh
```javascript
// Refresh before access token expires
const checkAndRefreshToken = async () => {
  const token = await getAccessToken();
  const decoded = jwtDecode(token);
  const expiresIn = decoded.exp * 1000 - Date.now();
  
  // Refresh if less than 5 minutes remaining
  if (expiresIn < 5 * 60 * 1000) {
    const refreshToken = await getRefreshToken();
    const { data } = await api.post('/auth/refresh-token', { refreshToken });
    await saveTokens(data.token, data.refreshToken);
  }
};
```

### Use Case 3: App Launch Token Validation
```javascript
// On app start, validate and refresh if needed
const initializeAuth = async () => {
  const token = await getAccessToken();
  const refreshToken = await getRefreshToken();
  
  if (!token || !refreshToken) {
    redirectToLogin();
    return;
  }
  
  try {
    // Try to use current token
    await api.get('/auth/me');
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      try {
        const { data } = await api.post('/auth/refresh-token', { refreshToken });
        await saveTokens(data.token, data.refreshToken);
        return 'refreshed';
      } catch {
        redirectToLogin();
      }
    }
  }
};
```

---

## 🔄 Token Lifecycle

```
Day 0:  Login → Access Token (15min) + Refresh Token (30 days)
        ↓
Min 1-14: Use access token for API calls
        ↓
Min 15: Access token expires
        ↓
        Call /refresh-token with refresh token
        ↓
        Receive NEW access token (15min) + NEW refresh token (30 days)
        ↓
        Continue using new access token
        ↓
Day 1-30: Repeat refresh cycle as access tokens expire
        ↓
Day 30: Refresh token expires → User must login again
```

---

## 🐛 Troubleshooting

**"Invalid refresh token" but token looks valid:**
- Check JWT_SECRET matches across environment
- Verify token isn't corrupted during storage
- Ensure no extra whitespace in token string
- Check token was generated by same server

**Token refresh works but access denied on next request:**
- Make sure you're using the NEW access token
- Update Authorization header with new token
- Don't mix old and new tokens

**Both tokens expire too quickly:**
- Check JWT_EXPIRES_IN and REFRESH_TOKEN_EXPIRES_IN in .env
- Default: 15min for access, 30 days for refresh
- Verify environment variables are loaded correctly

---

## 📝 Implementation Details

### What Happens During Refresh:

1. **Extract refresh token** from request body
2. **Verify refresh token** (signature + expiration)
3. **Decode payload** (userId, email)
4. **Generate new token pair** with same user info
5. **Return new tokens** to client
6. **Old tokens remain valid** (until their expiration)

### Refresh Token Contains:
- `userId`: User's MongoDB ObjectId
- `email`: User's email address
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp (30 days from issue)

---

## 🚀 Quick Test Command

**One-liner to test token refresh:**
```bash
REFRESH_TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}' | jq -r '.data.refreshToken') && curl -X POST http://localhost:5000/api/auth/refresh-token -H "Content-Type: application/json" -d "{\"refreshToken\":\"$REFRESH_TOKEN\"}"
```

This will:
1. Login and extract refresh token
2. Use refresh token to get new tokens
3. Display new token pair

---

## 📊 Code Quality Improvements Summary

### Before Refactoring:
```javascript
// ❌ Redundant code - repeated 3 times
const token = generateToken({
  userId: user._id.toString(),
  email: user.email,
});
const refreshToken = generateRefreshToken({...});

// ❌ Unprofessional dynamic import
const { verifyToken } = await import('../utils/jwt.js');

// ❌ Duplicate user formatting - repeated 3 times
user: {
  id: user._id,
  email: user.email,
  // ... 5+ fields repeated
}
```

### After Refactoring:
```javascript
// ✅ Clean, reusable helper
const tokens = generateTokenPair(user);

// ✅ Professional imports at top
import { verifyToken } from '../utils/jwt.js';

// ✅ Consistent user formatting
user: formatUserResponse(user)
```

---

**Ready to test!** 🚀

Test all the cases above. The code is now cleaner, more professional, and fully matches the API contract!

Once confirmed working, say **"next"** for the next endpoint!


