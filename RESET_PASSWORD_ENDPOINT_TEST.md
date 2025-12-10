# Reset Password Endpoint Testing Guide

## ✅ What's Been Implemented

The **Reset Password** endpoint is now implemented according to the API contract!

**Endpoint:** `POST http://localhost:5000/api/auth/reset-password`  
**Authentication:** Not required  
**Status:** ⚠️ Placeholder (Token verification not yet implemented)

### Changes Made:
1. ✅ Updated validation message to match API contract exactly
2. ✅ Improved code comments explaining production implementation
3. ✅ Added comprehensive TODO notes
4. ✅ Proper validation for token and password fields
5. ✅ Returns placeholder message as specified in contract

---

## 🧪 Manual Testing Instructions

### Test 1: Valid Request (Placeholder Response) ✅

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"a1b2c3d4e5f6g7h8i9j0","password":"newpass123"}'
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset functionality will be implemented soon"
}
```

**✅ Success Criteria:**
- Status code: 200
- Placeholder message present
- Exact message: "Password reset functionality will be implemented soon"
- No data field

---

### Test 2: Missing Token Field ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"password":"newpass123"}'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "token",
      "message": "Token is required",
      "code": "too_small",
      "minimum": 1
    }
  ]
}
```

**✅ Success Criteria:**
- Status code: 400
- Clear error about missing token
- Includes `code` and `minimum` fields

---

### Test 3: Missing Password Field ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"abc123"}'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "password",
      "message": "String must contain at least 6 character(s)",
      "code": "too_small",
      "minimum": 6
    }
  ]
}
```

**✅ Success Criteria:**
- Status code: 400
- Error about missing password
- Includes `minimum: 6` field

---

### Test 4: Password Too Short ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"abc123","password":"12345"}'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "password",
      "message": "String must contain at least 6 character(s)",
      "code": "too_small",
      "minimum": 6
    }
  ]
}
```

**✅ Success Criteria:**
- Status code: 400
- Exact message: "String must contain at least 6 character(s)"
- Includes `minimum: 6`
- Code: "too_small"

---

### Test 5: Password Too Long ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d "{\"token\":\"abc123\",\"password\":\"$(printf 'a%.0s' {1..101})\"}"
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "password",
      "message": "Password is too long",
      "code": "too_big",
      "maximum": 100
    }
  ]
}
```

**✅ Success Criteria:**
- Status code: 400
- Error about password being too long
- Includes `maximum: 100`
- Code: "too_big"

---

### Test 6: Empty Token String ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"","password":"newpass123"}'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "token",
      "message": "Token is required",
      "code": "too_small",
      "minimum": 1
    }
  ]
}
```

**✅ Success Criteria:**
- Status code: 400
- Validation catches empty string

---

### Test 7: Missing Both Fields ❌

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "token",
      "message": "Token is required",
      "code": "too_small",
      "minimum": 1
    },
    {
      "field": "password",
      "message": "String must contain at least 6 character(s)",
      "code": "too_small",
      "minimum": 6
    }
  ]
}
```

**✅ Success Criteria:**
- Status code: 400
- Returns errors for both missing fields
- Array contains 2 error objects

---

## 📋 Complete Test Flow

### Test Sequence:

```bash
echo "=== Test 1: Valid Request (Placeholder) ==="
curl -s -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"testtoken123","password":"newpass123"}' | jq

echo "\n=== Test 2: Missing Token ==="
curl -s -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"password":"newpass123"}' | jq

echo "\n=== Test 3: Missing Password ==="
curl -s -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"testtoken123"}' | jq

echo "\n=== Test 4: Password Too Short ==="
curl -s -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"testtoken123","password":"12345"}' | jq

echo "\n=== Test 5: Empty Token ==="
curl -s -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"","password":"newpass123"}' | jq

echo "\n=== Test 6: Missing Both Fields ==="
curl -s -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{}' | jq
```

**Expected:** All validation tests return proper 400 errors!

---

## 🔍 Thunder Client Testing

**Setup:**
- Method: POST
- URL: `http://localhost:5000/api/auth/reset-password`
- Headers: `Content-Type: application/json`

**Test Cases:**

1. **Valid Request:**
   - Body: `{"token":"abc123","password":"newpass123"}`
   - Expected: 200 with placeholder message

2. **Missing Token:**
   - Body: `{"password":"newpass123"}`
   - Expected: 400 with validation error

3. **Missing Password:**
   - Body: `{"token":"abc123"}`
   - Expected: 400 with validation error

4. **Short Password:**
   - Body: `{"token":"abc123","password":"12345"}`
   - Expected: 400 with validation error

5. **Empty Token:**
   - Body: `{"token":"","password":"newpass123"}`
   - Expected: 400 with validation error

---

## 📋 Testing Checklist

### Placeholder Response (200):
- [ ] Returns success for any valid token/password
- [ ] Status code: 200
- [ ] Message: "Password reset functionality will be implemented soon"
- [ ] No data field in response

### Validation Errors (400):
- [ ] Missing token field rejected
- [ ] Missing password field rejected
- [ ] Empty token string rejected
- [ ] Password < 6 characters rejected
- [ ] Password > 100 characters rejected
- [ ] Missing both fields returns both errors
- [ ] Proper error structure with `code` and `minimum`/`maximum`

### Server Errors (500):
- [ ] Unexpected errors return proper message
- [ ] Message: "Failed to reset password"
- [ ] Error details in development mode only

---

## ⚠️ Note: Placeholder Implementation

**What's Working:**
- ✅ Input validation (token and password)
- ✅ Password length requirements (6-100 chars)
- ✅ Proper error handling
- ✅ API contract compliance

**What's NOT Implemented (TODOs):**
- ⚠️ Token verification
- ⚠️ Password hashing and update
- ⚠️ Token expiration check
- ⚠️ User lookup by token
- ⚠️ Session invalidation

This is **intentional** per API contract - placeholder until email/token system is implemented!

---

## 💡 Production Implementation Guide

### What Needs to Be Implemented:

```javascript
import crypto from 'crypto';
import { hashPassword } from '../utils/password.js';

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // 1. Hash the provided token (same way it was stored)
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // 2. Find user with matching token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() }
    }).select('+resetPasswordToken +resetPasswordExpires');

    // 3. Validate token exists and hasn't expired
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    // 4. Hash new password
    const hashedPassword = await hashPassword(password);

    // 5. Update user password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // 6. (Optional) Invalidate all user sessions
    // Implementation depends on your session management

    res.json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password',
    });
  }
};
```

### Database Schema Updates Needed:

```javascript
// Add to User model
resetPasswordToken: {
  type: String,
  select: false, // Don't include in queries by default
},
resetPasswordExpires: {
  type: Date,
  select: false,
},
```

---

## 🔄 Complete Password Reset Flow

### Current Flow (Placeholder):
```
1. User requests password reset
   → POST /forgot-password
   → Returns success (no email sent)

2. User submits new password
   → POST /reset-password
   → Returns placeholder message
```

### Production Flow (To Be Implemented):
```
1. User requests password reset
   → POST /forgot-password
   → Generate token, send email

2. User receives email
   → Click reset link with token

3. User submits new password with token
   → POST /reset-password
   → Verify token
   → Hash password
   → Update user
   → Clear token
   → Return success

4. User can login with new password
```

---

## 🔐 Security Features (To Implement)

### Token Security:
```javascript
// Generate cryptographically secure token
const resetToken = crypto.randomBytes(32).toString('hex');

// Store hashed version (never store plain token)
const resetTokenHash = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');
```

### Token Expiration:
```javascript
// Set 1 hour expiration
user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
```

### Single-Use Tokens:
```javascript
// Clear token after successful reset
user.resetPasswordToken = undefined;
user.resetPasswordExpires = undefined;
```

### Session Invalidation:
```javascript
// Force re-login after password change
// Option 1: Increment a version field
user.passwordChangedAt = Date.now();

// Option 2: Blacklist all tokens issued before this time
// Option 3: Clear session cookies
```

---

## 🐛 Troubleshooting

**All requests return placeholder message:**
- This is **expected behavior** (not implemented yet)
- Token verification needs to be implemented
- Check TODO notes for implementation steps

**Validation errors not showing:**
- Check Content-Type header is `application/json`
- Verify JSON syntax is valid
- Check validation schema is applied in routes

**Password length validation:**
- Minimum: 6 characters
- Maximum: 100 characters
- Exactly as specified in API contract

---

## 🚀 Quick Test Commands

**Test valid request:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"testtoken123","password":"newpass123"}'
```

**Test short password:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"testtoken123","password":"12345"}'
```

**Test missing token:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"password":"newpass123"}'
```

**Test missing password:**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"testtoken123"}'
```

---

## 📊 Summary

### Endpoint Details:
- **Method:** POST
- **Path:** `/api/auth/reset-password`
- **Auth:** Not required
- **Success:** 200 with placeholder message
- **Errors:** 400 (validation), 500 (server)

### Key Features:
- ✅ Validates token presence
- ✅ Validates password length (6-100 chars)
- ✅ Proper error messages
- ✅ API contract compliance
- ⚠️ Token verification not implemented (placeholder)

### Validation Rules:
- **Token:** Required, min 1 character
- **Password:** Required, 6-100 characters
- **Both:** Must be present in request body

---

## 📝 Relationship with Forgot Password

| Endpoint | Purpose | Token | Email |
|----------|---------|-------|-------|
| `/forgot-password` | Generate reset token | Creates token | Sends email (TODO) |
| `/reset-password` | Use token to reset | Uses token | No email |

**Flow:**
1. Forgot Password → Generates token → Sends email (TODO)
2. User clicks link → Opens reset form
3. Reset Password → Verifies token → Updates password (TODO)

---

## 🎯 Implementation Priority

For production readiness:

1. ✅ **Input validation** (Done)
2. ⚠️ **Token verification** (High priority)
3. ⚠️ **Password update** (High priority)
4. ⚠️ **Token expiration check** (High priority)
5. ⚠️ **Session invalidation** (Medium priority)
6. ⚠️ **Rate limiting** (Medium priority)
7. ⚠️ **Email notifications** (Low priority)

---

**Ready to test!** 🚀

The endpoint validates inputs correctly and returns the placeholder message as specified. Test all cases above!

Once confirmed working, say **"next"** for the next set of endpoints! 🎉

