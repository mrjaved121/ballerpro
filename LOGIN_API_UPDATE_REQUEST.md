# Login API Update Request

## Issue
The login endpoint (`POST /api/auth/login`) currently does not return the `onboardingCompleted` field in the user object, which is required by the frontend to determine navigation flow.

## Current Response Structure
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": null,
      "isEmailVerified": false,
      "createdAt": "2025-12-09T10:00:00.000Z",
      "updatedAt": "2025-12-09T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Required Update

### Updated Response Structure
Please add the `onboardingCompleted` field to the user object in the login response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": null,
      "isEmailVerified": false,
      "onboardingCompleted": true,  // ← ADD THIS FIELD
      "createdAt": "2025-12-09T10:00:00.000Z",
      "updatedAt": "2025-12-09T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Field Specification

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `onboardingCompleted` | boolean | Yes | Indicates whether the user has completed the onboarding process. Should be `true` if onboarding is complete, `false` otherwise. |

### Expected Values
- `true` - User has completed all onboarding steps
- `false` - User has not completed onboarding (should not happen in current system, but included for future-proofing)

### Database Field Mapping
The field should map to the `onboardingCompleted` column in the users table.

## Why This Is Needed

1. **Navigation Flow**: The frontend uses this field to determine whether to show onboarding screens or the main app
2. **User Experience**: Without this field, users who have completed onboarding are incorrectly redirected to onboarding screens
3. **Future-Proofing**: If you add users who haven't completed onboarding later, the system will handle them correctly

## Alternative (Temporary Workaround)

If this change cannot be implemented immediately, the frontend can default `onboardingCompleted` to `true` when the field is missing. However, this is not recommended as it:
- Hides potential data inconsistencies
- Makes future changes harder
- Doesn't reflect actual database state

## Priority
**High** - This is blocking proper user navigation flow.

## Testing
After implementation, please verify:
1. Login response includes `onboardingCompleted: true` for users who completed onboarding
2. Field is a boolean type (not string or number)
3. Field is always present in the response

---

**Requested By:** Frontend Team  
**Date:** December 9, 2025  
**Status:** Pending Backend Implementation

