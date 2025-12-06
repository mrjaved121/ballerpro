# BallerPro Development Plan

## Current Status

### ✅ Completed
- **Frontend UI Screens:**
  - Login screen
  - Register screen
  - Onboarding Step 1 (Define Your Journey)
  - Basic navigation structure
  - Theme system
  - Component library (Button, Input, Checkbox, etc.)

### ⚠️ Partially Complete
- **Backend:**
  - Express server setup
  - MongoDB connection
  - Basic middleware (CORS, Helmet, Morgan)
  - API service structure in frontend

### ❌ Missing
- **Backend APIs:** No routes, controllers, or models
- **Frontend-Backend Integration:** No API calls implemented
- **Authentication Flow:** No JWT/auth implementation
- **Data Models:** No database schemas

---

## Recommended Development Process

### **Phase 1: Foundation & Authentication (Priority 1) ⭐**

**Why First?** Authentication is the foundation - users need to register/login before accessing any features.

#### Backend Tasks:
1. **User Model & Schema**
   - Email, password (hashed), name, createdAt, updatedAt
   - User preferences (from onboarding)

2. **Authentication APIs:**
   ```
   POST /api/auth/register
   POST /api/auth/login
   POST /api/auth/logout
   POST /api/auth/refresh-token
   GET  /api/auth/me (get current user)
   POST /api/auth/forgot-password
   POST /api/auth/reset-password
   ```

3. **Middleware:**
   - JWT token generation/verification
   - Password hashing (bcrypt)
   - Auth middleware for protected routes

4. **Social Auth (Optional - Phase 2):**
   - Apple Sign In
   - Google Sign In

#### Frontend Tasks:
1. Connect login/register screens to APIs
2. Implement token storage (AsyncStorage/SecureStore)
3. Add auth context/state management
4. Protected route handling
5. Auto-login on app start

**Estimated Time:** 3-5 days

---

### **Phase 2: Onboarding & User Profile (Priority 2) ⭐**

**Why Second?** Users need to complete onboarding to personalize their experience.

#### Backend Tasks:
1. **Onboarding Model:**
   - Goal (build muscle, lose fat, etc.)
   - Training level (beginner, athlete, etc.)
   - Additional steps (Step 2, 3, 4)
   - User preferences

2. **Onboarding APIs:**
   ```
   POST /api/onboarding/step1
   POST /api/onboarding/step2
   POST /api/onboarding/step3
   POST /api/onboarding/step4
   GET  /api/onboarding/status
   ```

3. **User Profile APIs:**
   ```
   GET  /api/users/profile
   PUT  /api/users/profile
   POST /api/users/avatar
   ```

#### Frontend Tasks:
1. Complete onboarding screens (Step 2, 3, 4)
2. Connect onboarding to APIs
3. Save onboarding data
4. Profile screen implementation

**Estimated Time:** 2-3 days

---

### **Phase 3: Core Features - Workouts & Training (Priority 3) ⭐**

**Why Third?** This is the main value proposition of the app.

#### Backend Tasks:
1. **Workout Models:**
   - Workout plans
   - Exercises
   - Workout sessions
   - Progress tracking

2. **Workout APIs:**
   ```
   GET  /api/workouts (list workouts)
   GET  /api/workouts/:id
   POST /api/workouts (create custom)
   GET  /api/workouts/recommended
   GET  /api/exercises
   GET  /api/exercises/:id
   POST /api/workouts/sessions (start workout)
   PUT  /api/workouts/sessions/:id (update progress)
   POST /api/workouts/sessions/:id/complete
   ```

3. **Program APIs:**
   ```
   GET  /api/programs
   GET  /api/programs/:id
   POST /api/programs/:id/enroll
   ```

#### Frontend Tasks:
1. Train tab screen
2. Workout list/browse
3. Workout detail screen
4. Active workout screen
5. Exercise tracking

**Estimated Time:** 5-7 days

---

### **Phase 4: Tracking & Progress (Priority 4)**

#### Backend Tasks:
1. **Tracking Models:**
   - Workout history
   - Progress metrics (weight, reps, sets)
   - Body measurements
   - Photos

2. **Tracking APIs:**
   ```
   GET  /api/tracking/history
   GET  /api/tracking/stats
   POST /api/tracking/measurements
   GET  /api/tracking/progress
   POST /api/tracking/photos
   ```

#### Frontend Tasks:
1. Track tab screen
2. Progress charts/graphs
3. History view
4. Stats dashboard

**Estimated Time:** 4-5 days

---

### **Phase 5: Community Features (Priority 5)**

#### Backend Tasks:
1. **Community Models:**
   - Posts
   - Comments
   - Likes
   - Followers/Following

2. **Community APIs:**
   ```
   GET  /api/community/posts
   POST /api/community/posts
   GET  /api/community/posts/:id
   POST /api/community/posts/:id/like
   POST /api/community/posts/:id/comment
   GET  /api/community/users (search/follow)
   POST /api/community/follow/:userId
   ```

#### Frontend Tasks:
1. Community tab screen
2. Feed view
3. Post creation
4. User profiles
5. Social interactions

**Estimated Time:** 5-6 days

---

### **Phase 6: Shop & Additional Features (Priority 6)**

#### Backend Tasks:
1. **Shop Models:**
   - Products
   - Orders
   - Cart

2. **Shop APIs:**
   ```
   GET  /api/shop/products
   GET  /api/shop/products/:id
   POST /api/shop/cart
   POST /api/shop/checkout
   ```

#### Frontend Tasks:
1. Shop screen
2. Product listings
3. Cart functionality
4. More/Settings screen

**Estimated Time:** 3-4 days

---

## Development Strategy Recommendation

### **Option A: API-First Approach (Recommended for Teams)**
1. ✅ Build all APIs first
2. ✅ Test with Postman/Thunder Client
3. ✅ Document APIs (Swagger/OpenAPI)
4. ✅ Then connect frontend

**Pros:**
- Clear contract between frontend/backend
- Parallel development possible
- Easier testing
- Better for teams

**Cons:**
- Slower initial progress
- Need to mock data in frontend initially

---

### **Option B: Feature-by-Feature (Recommended for Solo/Small Teams)**
1. ✅ Build API for one feature
2. ✅ Build frontend for that feature
3. ✅ Test end-to-end
4. ✅ Move to next feature

**Pros:**
- Faster feedback loop
- See working features quickly
- Easier to pivot
- Better for solo developers

**Cons:**
- May need to refactor later
- Harder to parallelize

---

### **Option C: Hybrid Approach (Recommended for This Project) ⭐**

**Phase 1-2: API-First (Foundation)**
- Build auth APIs first
- Build onboarding APIs
- Test thoroughly
- Then connect frontend

**Phase 3+: Feature-by-Feature**
- Build workout API → Connect workout UI
- Build tracking API → Connect tracking UI
- etc.

**Why?**
- Foundation (auth) needs to be solid
- Later features can iterate faster
- Best of both worlds

---

## Immediate Next Steps

### **This Week:**
1. ✅ Create User model (MongoDB schema)
2. ✅ Implement register/login APIs
3. ✅ Add JWT authentication
4. ✅ Connect frontend auth screens to APIs
5. ✅ Test authentication flow end-to-end

### **Next Week:**
1. ✅ Complete onboarding APIs
2. ✅ Connect onboarding screens
3. ✅ User profile management

---

## API Endpoints Summary

### Authentication (8 endpoints)
- Register, Login, Logout, Refresh Token
- Get Current User, Forgot Password, Reset Password
- Social Auth (Apple/Google)

### Onboarding (5 endpoints)
- Step 1-4 submission
- Get onboarding status

### Workouts (8 endpoints)
- List, Get, Create workouts
- Recommended workouts
- Exercises list/detail
- Workout sessions (start, update, complete)

### Tracking (5 endpoints)
- History, Stats, Measurements
- Progress, Photos

### Community (7 endpoints)
- Posts (list, create, get, like, comment)
- Users (search, follow)

### Shop (4 endpoints)
- Products (list, get)
- Cart, Checkout

### User Profile (3 endpoints)
- Get, Update, Avatar

**Total: ~40 API endpoints**

---

## Technology Stack

### Backend:
- ✅ Express.js
- ✅ MongoDB + Mongoose
- ✅ JWT (jsonwebtoken)
- ✅ bcryptjs
- ✅ Zod (validation)

### Frontend:
- ✅ React Native + Expo
- ✅ Expo Router
- ✅ Axios
- ⚠️ State Management (need to add: Context API or Zustand/Redux)
- ⚠️ Storage (AsyncStorage for tokens)

---

## Recommendations

1. **Start with Authentication** - Everything depends on it
2. **Use API-First for Foundation** - Auth & onboarding
3. **Switch to Feature-by-Feature** - For faster iteration
4. **Add API Documentation** - Swagger/Postman collection
5. **Implement Error Handling** - Consistent error responses
6. **Add Validation** - Use Zod on both frontend & backend
7. **Add Testing** - Unit tests for critical paths
8. **Environment Variables** - Proper config management

---

## Questions to Consider

1. **Social Auth:** Do you need Apple/Google sign-in now or later?
2. **Payment:** Will shop have real payments or just mock?
3. **Real-time:** Do you need real-time features (chat, live workouts)?
4. **Notifications:** Push notifications for workouts, achievements?
5. **Offline Support:** Should app work offline?

---

## Estimated Total Timeline

- **Phase 1 (Auth):** 3-5 days
- **Phase 2 (Onboarding):** 2-3 days
- **Phase 3 (Workouts):** 5-7 days
- **Phase 4 (Tracking):** 4-5 days
- **Phase 5 (Community):** 5-6 days
- **Phase 6 (Shop):** 3-4 days

**Total: ~22-30 days** (1 month of focused development)

---

## Next Action Items

1. ✅ Review this plan
2. ✅ Decide on development approach (Hybrid recommended)
3. ✅ Start with Phase 1: Authentication APIs
4. ✅ Set up API documentation tool
5. ✅ Create API endpoint checklist

