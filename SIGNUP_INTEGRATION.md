# Frontend-Backend Integration: Signup Flow

## Overview

The signup flow has been successfully integrated with the backend API. The frontend now makes real API calls to register users instead of using mock data.

## Changes Made

### 1. API Configuration (`frontend/src/config/api.ts`)
Created a centralized configuration file for all API settings:
- Base URL: `http://localhost:5000/api` (development)
- Timeout: 10 seconds
- All API endpoints organized by category (auth, user, onboarding)

### 2. Updated Types (`frontend/src/types/auth.ts`)
Added backend API response types:
- `ApiResponse<T>`: Standard API response wrapper
- `ApiError`: Validation and error details
- `AuthResponse`: Registration/login response structure
- `RefreshTokenResponse`: Token refresh response
- Updated `User` interface to match backend schema (added `avatar`, `isEmailVerified`)

### 3. Enhanced Storage Service (`frontend/src/services/auth/storage.ts`)
- Upgraded from in-memory storage to **SecureStore** for production security
- Separate storage for access tokens and refresh tokens
- Fallback to memory storage for web platform
- All sensitive data (tokens) now stored securely

### 4. Real API Integration (`frontend/src/services/auth/authService.ts`)
Complete rewrite of auth service:
- **Register**: Makes real API call to `/api/auth/register`
  - Sends: email, password, name
  - Receives: user object, access token, refresh token
  - Stores tokens securely
  - Transforms backend user format to app format
  - Comprehensive error handling
  
- **Login**: Makes real API call to `/api/auth/login`
  - Similar flow to register
  
- **Logout**: Calls `/api/auth/logout` endpoint
  - Clears all local storage
  
- **Token Refresh**: Automatically refreshes expired tokens
  - Uses refresh token to get new access token

### 5. Enhanced API Client (`frontend/src/services/api/api.ts`)
- Request interceptor: Automatically adds Bearer token to all requests
- Response interceptor: Handles 401 errors and token refresh
- Automatic token refresh on expiration
- Comprehensive logging for debugging
- Network error handling

## API Flow: User Registration

```
┌──────────────┐
│ Register     │
│ Screen       │
└──────┬───────┘
       │
       │ User fills form & submits
       │
       ▼
┌──────────────────────┐
│ Validation           │
│ - Email format       │
│ - Password length    │
│ - Passwords match    │
│ - Terms accepted     │
└──────┬───────────────┘
       │
       │ Valid
       ▼
┌──────────────────────┐
│ AuthContext.register │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ authService.register │
└──────┬───────────────┘
       │
       │ POST /api/auth/register
       │ { email, password, name }
       ▼
┌──────────────────────┐
│ Backend API          │
│ - Validates data     │
│ - Creates user       │
│ - Generates tokens   │
└──────┬───────────────┘
       │
       │ Returns:
       │ {
       │   success: true,
       │   data: {
       │     user: {...},
       │     token: "...",
       │     refreshToken: "..."
       │   }
       │ }
       ▼
┌──────────────────────┐
│ authService          │
│ - Stores tokens      │
│ - Stores user data   │
│ - Returns user       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ AuthContext          │
│ - Updates state      │
│ - isAuthenticated    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Navigation           │
│ - To onboarding      │
│   (new user)         │
└──────────────────────┘
```

## Error Handling

### Validation Errors (400)
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
Displayed to user as: "Invalid email"

### Duplicate Email (409)
```json
{
  "success": false,
  "message": "Email already registered"
}
```
Displayed to user as: "Email already registered"

### Network Errors
Automatically detected and shown as: "Unable to connect to server. Please check your internet connection."

## Testing the Integration

### Prerequisites
1. **Backend must be running**:
   ```bash
   cd backend
   npm start
   ```
   Should see: `Server running on port 5000`

2. **MongoDB must be running**:
   - Backend will connect to MongoDB
   - Check backend logs for "MongoDB Connected"

3. **Frontend must be running**:
   ```bash
   cd frontend
   npm start
   ```

### Test Cases

#### Test 1: Successful Registration
1. Open the app
2. Navigate to Register screen
3. Fill in:
   - Email: `newuser@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - Check "Terms & Conditions"
4. Tap "Register"
5. **Expected**:
   - Loading indicator appears
   - Request sent to backend
   - User registered successfully
   - Redirected to onboarding

#### Test 2: Duplicate Email
1. Try to register with an existing email
2. **Expected**: Error message "Email already registered"

#### Test 3: Invalid Email
1. Enter invalid email (e.g., "notanemail")
2. **Expected**: Error message "Invalid email"

#### Test 4: Password Too Short
1. Enter password less than 6 characters
2. **Expected**: Local validation error "Password must be at least 6 characters"

#### Test 5: Passwords Don't Match
1. Enter different passwords in password fields
2. **Expected**: Error message "Passwords do not match"

#### Test 6: Network Error
1. Stop backend server
2. Try to register
3. **Expected**: Error message "Unable to connect to server. Please check your internet connection."

### Debugging

#### Check Console Logs
Frontend logs will show:
```
[AuthService] Register attempt: user@example.com
[ApiService] 🚀 POST /auth/register
[ApiService] ✅ POST /auth/register - 201
[Storage] Access token saved
[Storage] Refresh token saved
[Storage] User saved: user@example.com
[AuthService] ✅ Registration successful: user@example.com
[AuthContext] ✅ User registered: {...}
```

#### Check Network Tab (Expo DevTools)
1. Open Expo DevTools
2. Go to Network tab
3. Watch for POST requests to `/api/auth/register`
4. Check request/response data

#### Check Backend Logs
```
POST /api/auth/register 201 - User registered
```

## Security Features

1. **Secure Token Storage**: Tokens stored in SecureStore (encrypted on device)
2. **Bearer Token Authentication**: All authenticated requests include `Authorization: Bearer <token>`
3. **Automatic Token Refresh**: Expired tokens automatically refreshed using refresh token
4. **401 Handling**: Unauthorized requests trigger token refresh or logout
5. **Password Never Stored**: Only tokens and user data stored locally

## Next Steps

Now that signup is integrated, the next endpoints to integrate are:

1. **Login Flow** (`/api/auth/login`)
2. **Logout Flow** (`/api/auth/logout`)
3. **Token Refresh** (`/api/auth/refresh`) - Already implemented in API service
4. **Get User Profile** (`/api/user/me`)
5. **Onboarding** (`/api/user/onboarding`)

## Configuration for Production

When deploying to production:

1. Update `API_CONFIG.BASE_URL` in `frontend/src/config/api.ts`:
   ```typescript
   BASE_URL: isDevelopment 
     ? 'http://localhost:5000/api' 
     : 'https://api.ballerpro.com/api', // Update with production URL
   ```

2. Ensure backend CORS is configured for production domain

3. Use environment variables for sensitive configuration

## Troubleshooting

### Issue: "Network Error"
- **Cause**: Backend not running or wrong URL
- **Fix**: Check backend is running on `http://localhost:5000`

### Issue: "Unable to connect"
- **Cause**: Network issues or CORS
- **Fix**: Check network connection, verify CORS settings in backend

### Issue: Token not working
- **Cause**: Token expired or invalid
- **Fix**: Automatic token refresh should handle this; check logs

### Issue: SecureStore error on web
- **Cause**: SecureStore not available on web
- **Fix**: Already handled with fallback to memory storage

## API Contract Reference

For complete API documentation, see `API_CONTRACT.md`:
- Request/response formats
- Validation rules
- Error codes
- Status codes
- Example requests/responses

