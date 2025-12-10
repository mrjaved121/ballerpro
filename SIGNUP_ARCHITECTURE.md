# Signup Integration Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React Native)                      │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Register Screen (UI)                       │  │
│  │  - Email input                                                │  │
│  │  - Password input                                             │  │
│  │  - Confirm Password input                                     │  │
│  │  - Terms checkbox                                             │  │
│  │  - Register button                                            │  │
│  │  - Error display                                              │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │ calls                                    │
│                           ▼                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              AuthContext (State Management)                   │  │
│  │  - user: User | null                                          │  │
│  │  - isAuthenticated: boolean                                   │  │
│  │  - register(credentials)                                      │  │
│  │  - login(credentials)                                         │  │
│  │  - logout()                                                   │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │ calls                                    │
│                           ▼                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                AuthService (Business Logic)                   │  │
│  │  - register() → POST /api/auth/register                      │  │
│  │  - login() → POST /api/auth/login                            │  │
│  │  - logout() → POST /api/auth/logout                          │  │
│  │  - refreshToken() → POST /api/auth/refresh                   │  │
│  │  - Error handling & transformation                            │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │ uses                                     │
│                           ▼                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              API Client (HTTP Layer)                          │  │
│  │  - Axios instance                                             │  │
│  │  - Request interceptor (add Bearer token)                     │  │
│  │  - Response interceptor (handle 401)                          │  │
│  │  - Automatic token refresh                                    │  │
│  │  - Logging & error handling                                   │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │ stores to                                │
│                           ▼                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │               Storage Service (Persistence)                   │  │
│  │  - SecureStore (encrypted)                                    │  │
│  │  - saveToken(token)                                           │  │
│  │  - saveRefreshToken(token)                                    │  │
│  │  - saveUser(user)                                             │  │
│  │  - Fallback to memory (web)                                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└───────────────────────────┬───────────────────────────────────────┘
                            │
                            │ HTTP Request
                            │ POST /api/auth/register
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Node.js/Express)                     │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Express Routes                             │  │
│  │  POST /api/auth/register → authController.register           │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                          │
│                           ▼                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                Auth Controller                                │  │
│  │  1. Validate input (zod)                                      │  │
│  │  2. Check if email exists                                     │  │
│  │  3. Hash password (bcrypt)                                    │  │
│  │  4. Create user in DB                                         │  │
│  │  5. Generate JWT tokens                                       │  │
│  │  6. Return response                                           │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
│                           │                                          │
│                           ▼                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   MongoDB Database                            │  │
│  │  - users collection                                           │  │
│  │  - User document created                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└───────────────────────────┬───────────────────────────────────────┘
                            │
                            │ HTTP Response 201
                            │ { success, data: { user, token, refreshToken } }
                            │
                            ▼
                     Frontend receives
                     & stores response

```

## Data Flow Sequence

```
┌────────┐     ┌────────────┐     ┌─────────────┐     ┌──────────┐     ┌─────────┐
│  User  │     │  Register  │     │    Auth     │     │   API    │     │ Backend │
│        │     │   Screen   │     │  Context    │     │  Client  │     │  Server │
└───┬────┘     └─────┬──────┘     └──────┬──────┘     └────┬─────┘     └────┬────┘
    │                │                    │                  │                │
    │ Fill form      │                    │                  │                │
    │ & tap Register │                    │                  │                │
    │───────────────>│                    │                  │                │
    │                │                    │                  │                │
    │                │ register()         │                  │                │
    │                │───────────────────>│                  │                │
    │                │                    │                  │                │
    │                │                    │ register()       │                │
    │                │                    │─────────────────>│                │
    │                │                    │                  │                │
    │                │                    │                  │ POST /register │
    │                │                    │                  │───────────────>│
    │                │                    │                  │                │
    │                │                    │                  │    Validate    │
    │                │                    │                  │    Hash pwd    │
    │                │                    │                  │    Create user │
    │                │                    │                  │    Gen tokens  │
    │                │                    │                  │                │
    │                │                    │                  │   201 Created  │
    │                │                    │                  │<───────────────│
    │                │                    │                  │                │
    │                │                    │    User object   │                │
    │                │                    │<─────────────────│                │
    │                │                    │                  │                │
    │                │                    │ Store tokens     │                │
    │                │                    │ Store user       │                │
    │                │                    │                  │                │
    │                │    Update state    │                  │                │
    │                │<───────────────────│                  │                │
    │                │                    │                  │                │
    │  Navigate to   │                    │                  │                │
    │  onboarding    │                    │                  │                │
    │<───────────────│                    │                  │                │
    │                │                    │                  │                │
```

## Token Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  Registration Complete - Tokens Stored                           │
│  ✓ Access Token (expires in 15 min)                             │
│  ✓ Refresh Token (expires in 30 days)                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  User Makes Authenticated Request                               │
│  (e.g., Get Profile, Update Settings)                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Request Interceptor                                             │
│  - Gets access token from SecureStore                           │
│  - Adds header: Authorization: Bearer <token>                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Request Sent to Backend                                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                    ┌────┴────┐
                    │ Status? │
                    └────┬────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌────────┐     ┌─────────┐    ┌──────────┐
    │  200   │     │   401   │    │  Other   │
    │   OK   │     │ Expired │    │  Error   │
    └───┬────┘     └────┬────┘    └────┬─────┘
        │               │              │
        ▼               ▼              ▼
    Return          Token         Handle
    Success        Refresh        Error
                   Flow
```

## Token Refresh Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  Request Returns 401 Unauthorized                               │
│  (Access token expired)                                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  Response Interceptor Catches 401                               │
│  - Checks if not already retrying                               │
│  - Gets refresh token from SecureStore                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  POST /api/auth/refresh                                         │
│  { refreshToken: "..." }                                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                    ┌────┴────┐
                    │ Status? │
                    └────┬────┘
                         │
            ┌────────────┼────────────┐
            │                         │
            ▼                         ▼
    ┌────────────┐            ┌──────────────┐
    │  200 OK    │            │    Error     │
    │ New Token  │            │ (401, etc)   │
    └─────┬──────┘            └──────┬───────┘
          │                          │
          ▼                          ▼
┌──────────────────┐      ┌─────────────────┐
│ Save New Token   │      │  Clear Auth     │
│ in SecureStore   │      │  Redirect Login │
└─────┬────────────┘      └─────────────────┘
      │
      ▼
┌──────────────────────────────────────────┐
│  Retry Original Request                  │
│  with new token                          │
└────────────────────┬─────────────────────┘
                     │
                     ▼
              ┌──────────┐
              │ Success! │
              └──────────┘
```

## File Structure & Responsibilities

```
frontend/src/
├── config/
│   └── api.ts ························· API URLs & endpoints
│
├── types/
│   └── auth.ts ························ TypeScript interfaces
│
├── services/
│   ├── api/
│   │   └── api.ts ····················· Axios client + interceptors
│   │
│   └── auth/
│       ├── authService.ts ············· API calls (register, login, etc)
│       └── storage.ts ················· SecureStore wrapper
│
├── contexts/
│   └── AuthContext.tsx ················ Global auth state
│
└── app/
    └── auth/
        └── register.tsx ··············· UI component


Responsibilities:
─────────────────────────────────────────────────────────────────
register.tsx          → UI, validation, user interaction
AuthContext.tsx       → State management, coordination
authService.ts        → Business logic, API communication
api.ts                → HTTP client, interceptors, retry logic
storage.ts            → Data persistence, encryption
api.ts (config)       → Configuration, endpoints
auth.ts (types)       → Type definitions, contracts
```

## Error Handling Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                        Error Occurs                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
                 ┌───────┴────────┐
                 │  Error Type?    │
                 └───────┬─────────┘
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    ▼                    ▼                    ▼
┌──────────┐      ┌─────────────┐      ┌──────────┐
│ Network  │      │  API Error  │      │ Unknown  │
│  Error   │      │  Response   │      │  Error   │
└────┬─────┘      └──────┬──────┘      └────┬─────┘
     │                   │                   │
     ▼                   ▼                   ▼
┌──────────┐      ┌─────────────┐      ┌──────────┐
│"Unable   │      │ Parse       │      │"Please   │
│to        │      │ error.      │      │try       │
│connect"  │      │ response.   │      │again"    │
│          │      │ data        │      │          │
└────┬─────┘      └──────┬──────┘      └────┬─────┘
     │                   │                   │
     │                   ▼                   │
     │            ┌─────────────┐            │
     │            │Validation?  │            │
     │            └──────┬──────┘            │
     │                   │                   │
     │          ┌────────┴────────┐          │
     │          │                 │          │
     │          ▼                 ▼          │
     │     ┌────────┐       ┌────────┐      │
     │     │ Show   │       │ Show   │      │
     │     │ field  │       │generic │      │
     │     │ errors │       │message │      │
     │     └────────┘       └────────┘      │
     │                                       │
     └───────────────┬───────────────────────┘
                     │
                     ▼
           ┌──────────────────┐
           │  Display to User │
           │  - Error message │
           │  - Alert dialog  │
           └──────────────────┘
```

## Success Flow Visual

```
User Enters:                  Frontend Sends:
┌────────────────┐           ┌────────────────────────┐
│ email:         │           │ POST /api/auth/       │
│ test@ex.com    │────────>  │ {                      │
│                │           │   email: "test@ex.com" │
│ password:      │           │   password: "pass123"  │
│ pass123        │           │   name: "Test"         │
│                │           │ }                      │
│ name: Test     │           └────────────────────────┘
└────────────────┘                      │
                                        ▼
                            Backend Processes & Returns:
                            ┌────────────────────────┐
                            │ 201 Created            │
                            │ {                      │
                            │   success: true,       │
                            │   data: {              │
                            │     user: {...},       │
                            │     token: "...",      │
                            │     refreshToken: "..."│
                            │   }                    │
                            │ }                      │
                            └────────────────────────┘
                                        │
                                        ▼
                            Frontend Stores:
                            ┌────────────────────────┐
                            │ SecureStore            │
                            │ ✓ @ballerpro_token    │
                            │ ✓ @ballerpro_refresh   │
                            │ ✓ @ballerpro_user      │
                            └────────────────────────┘
                                        │
                                        ▼
                            ┌────────────────────────┐
                            │ Update AuthContext     │
                            │ isAuthenticated: true  │
                            │ user: {...}            │
                            └────────────────────────┘
                                        │
                                        ▼
                            ┌────────────────────────┐
                            │ Navigate to            │
                            │ /onboarding            │
                            └────────────────────────┘
```

---

*This architecture enables secure, maintainable, and scalable authentication.*

