# Frontend-API Integration Plan

## 📱 Current Frontend Screens Analysis

### ✅ Screens Using Mock Data (Need API Integration)

---

## 🔐 Authentication Screens

### 1. `/auth/login` - Login Screen
**Current Status:** Using mock authentication service  
**Required APIs:**
- ✅ `POST /api/auth/login` - *Already implemented*

**Integration Steps:**
1. Update `frontend/src/services/auth/authService.ts`
2. Replace mock login with API call
3. Store token and user data
4. Handle error responses

**API Call Example:**
```typescript
const response = await apiService.instance.post('/auth/login', {
  email: credentials.email,
  password: credentials.password
});
const { token, refreshToken, user } = response.data.data;
```

---

### 2. `/auth/register` - Registration Screen
**Current Status:** Using mock authentication service  
**Required APIs:**
- ✅ `POST /api/auth/register` - *Already implemented*

**Integration Steps:**
1. Update `frontend/src/services/auth/authService.ts`
2. Replace mock register with API call
3. Auto-login after registration
4. Redirect to onboarding

**API Call Example:**
```typescript
const response = await apiService.instance.post('/auth/register', {
  email: credentials.email,
  password: credentials.password,
  name: credentials.name
});
```

---

## 🎯 Onboarding Screens

### 3. `/onboarding/about` - Step 1 (Gender Selection)
**Current Status:** Using mock onboarding service  
**Required APIs:**
- ✅ `POST /api/onboarding/step1` - *Already implemented*

**API Call Example:**
```typescript
await apiService.instance.post('/onboarding/step1', {
  gender: 'male' // or 'female', 'other'
});
```

---

### 4. `/onboarding/journey` - Step 2 (Experience Level)
**Current Status:** Using mock onboarding service  
**Required APIs:**
- ✅ `POST /api/onboarding/step2` - *Already implemented*

**API Call Example:**
```typescript
await apiService.instance.post('/onboarding/step2', {
  experienceLevel: 'intermediate' // or 'beginner', 'advanced'
});
```

---

### 5. `/onboarding/trainingExperience` - Step 3 (Injuries)
**Current Status:** Using mock onboarding service  
**Required APIs:**
- ✅ `POST /api/onboarding/step3` - *Already implemented*

**API Call Example:**
```typescript
await apiService.instance.post('/onboarding/step3', {
  injuries: ['knee', 'shoulder'],
  otherDetails: 'Optional details here'
});
```

---

### 6. `/onboarding/mainGoal` - Step 4 (Goal Selection)
**Current Status:** Using mock onboarding service  
**Required APIs:**
- ✅ `POST /api/onboarding/step4` - *Already implemented*

**API Call Example:**
```typescript
await apiService.instance.post('/onboarding/step4', {
  goal: 'muscle-gain' // or 'fat-loss', 'maintenance'
});
```

---

## 🏠 Main App Screens

### 7. `/(tabs)/index` - Home Dashboard
**Current Status:** Static UI with mock data  
**Required APIs:**
- ✅ `GET /api/auth/me` - *Already implemented*
- ❌ `GET /api/tracking/stats` - *Need to implement*
- ❌ `GET /api/workouts/recommended` - *Need to implement*
- ❌ `GET /api/workouts/sessions` (recent history) - *Need to implement*

**Data Needed:**
- User info (name, avatar)
- Weekly stats (workouts completed, calories burned, avg score)
- Recommended workouts
- Recent workout sessions

**Mock Data Location:**
```typescript
// Currently hardcoded in app/(tabs)/index.tsx
const statsData = [
  { label: 'Workouts', value: '12', unit: 'this week' },
  { label: 'Calories', value: '3.2k', unit: 'burned' },
  { label: 'Avg Score', value: '85', unit: 'points' }
];
```

---

### 8. `/(tabs)/train` - Workout List
**Current Status:** Static workout cards  
**Required APIs:**
- ❌ `GET /api/workouts` - *Need to implement*
- ❌ `GET /api/exercises/search` - *Need to implement*

**Data Needed:**
- List of workouts with filters (category, difficulty)
- Exercise database for search
- Workout metadata (duration, difficulty, equipment)

**Mock Data Location:**
```typescript
// Currently hardcoded in app/(tabs)/train.tsx
const workoutData = [
  {
    id: '1',
    title: 'Upper Body Strength',
    duration: '45 min',
    difficulty: 'Intermediate',
    exercises: 8,
    image: 'https://...',
    category: 'strength'
  },
  // ... more workouts
];
```

---

### 9. `/workouts/[id]` - Workout Detail
**Current Status:** Static workout detail page  
**Required APIs:**
- ❌ `GET /api/workouts/:id` - *Need to implement*
- ❌ `POST /api/workouts/sessions` (start workout) - *Need to implement*
- ❌ `GET /api/exercises/:id` (for each exercise) - *Need to implement*

**Data Needed:**
- Workout details (title, description, duration)
- List of exercises with sets/reps/rest
- Exercise instructions and videos
- Equipment needed

**Mock Data Location:**
```typescript
// Currently hardcoded in app/workouts/[id].tsx
const workoutData = {
  title: 'Barbell Squat',
  sets: '4',
  reps: '8-10',
  rest: '90s',
  // ... more fields
};
```

---

### 10. `/(tabs)/track` - Progress Tracking
**Current Status:** Empty/placeholder  
**Required APIs:**
- ❌ `GET /api/tracking/history` - *Need to implement*
- ❌ `GET /api/tracking/stats` - *Need to implement*
- ❌ `GET /api/tracking/measurements` - *Need to implement*
- ❌ `POST /api/tracking/measurements` - *Need to implement*
- ❌ `GET /api/tracking/photos` - *Need to implement*
- ❌ `POST /api/tracking/photos` - *Need to implement*

**Data Needed:**
- Workout history (dates, exercises, sets, reps, weight)
- Body measurements over time
- Progress photos
- Charts and graphs

---

### 11. `/(tabs)/community` - Community Feed
**Current Status:** Empty/placeholder  
**Required APIs:**
- ❌ `GET /api/community/posts` - *Need to implement*
- ❌ `POST /api/community/posts` - *Need to implement*
- ❌ `POST /api/community/posts/:id/like` - *Need to implement*
- ❌ `POST /api/community/posts/:id/comment` - *Need to implement*
- ❌ `POST /api/community/follow/:userId` - *Need to implement*

**Data Needed:**
- Feed of posts from followed users
- User profiles (public)
- Post likes and comments
- Following/followers lists

---

### 12. `/(tabs)/shop` - Shop
**Current Status:** Empty/placeholder  
**Required APIs:**
- ❌ `GET /api/shop/products` - *Need to implement*
- ❌ `GET /api/shop/categories` - *Need to implement*
- ❌ `GET /api/shop/cart` - *Need to implement*
- ❌ `POST /api/shop/cart` - *Need to implement*
- ❌ `DELETE /api/shop/cart/:itemId` - *Need to implement*

**Data Needed:**
- Product catalog
- Product categories
- Shopping cart
- Order history

---

### 13. `/(tabs)/settings` - Settings
**Current Status:** Using mock auth service  
**Required APIs:**
- ✅ `GET /api/users/profile` - *Already implemented*
- ✅ `PUT /api/users/profile` - *Already implemented*
- ✅ `POST /api/auth/logout` - *Already implemented*

**Data Needed:**
- User profile (name, email, avatar)
- App settings/preferences
- Account management

---

## 🔄 Integration Priority

### Phase 1: Authentication & Onboarding ✅ (READY TO CONNECT)
**APIs Available:**
- [x] Register
- [x] Login
- [x] Get Me
- [x] Logout
- [x] Refresh Token
- [x] Onboarding Steps 1-4
- [x] Onboarding Status
- [x] Get/Update Profile

**Frontend Files to Update:**
1. `frontend/src/services/auth/authService.ts`
2. `frontend/src/services/onboarding/onboardingService.ts`

**Estimated Time:** 2-3 hours

---

### Phase 2: Workouts & Exercises ⏳ (APIs NEED TO BE BUILT)
**APIs Needed:**
- [ ] `GET /api/workouts`
- [ ] `GET /api/workouts/:id`
- [ ] `POST /api/workouts` (create custom)
- [ ] `GET /api/exercises`
- [ ] `GET /api/exercises/:id`
- [ ] `GET /api/exercises/search`

**Frontend Files to Update:**
1. `frontend/app/(tabs)/train.tsx`
2. `frontend/app/workouts/[id].tsx`
3. Create `frontend/src/services/workout/workoutService.ts`

**Estimated Time:** 1 week

---

### Phase 3: Workout Sessions & Tracking ⏳ (APIs NEED TO BE BUILT)
**APIs Needed:**
- [ ] `POST /api/workouts/sessions` (start session)
- [ ] `GET /api/workouts/sessions/:id`
- [ ] `PUT /api/workouts/sessions/:id` (update progress)
- [ ] `POST /api/workouts/sessions/:id/complete`
- [ ] `GET /api/tracking/stats`
- [ ] `GET /api/tracking/history`
- [ ] `POST /api/tracking/measurements`

**Frontend Files to Update:**
1. `frontend/app/(tabs)/track.tsx`
2. `frontend/app/(tabs)/index.tsx` (dashboard stats)
3. Create `frontend/src/services/tracking/trackingService.ts`

**Estimated Time:** 1 week

---

### Phase 4: Community ⏳ (APIs NEED TO BE BUILT)
**APIs Needed:**
- [ ] `GET /api/community/posts`
- [ ] `POST /api/community/posts`
- [ ] `POST /api/community/posts/:id/like`
- [ ] `POST /api/community/posts/:id/comment`
- [ ] `POST /api/community/follow/:userId`
- [ ] `GET /api/community/users/:id`

**Frontend Files to Update:**
1. `frontend/app/(tabs)/community.tsx`
2. Create `frontend/src/services/community/communityService.ts`

**Estimated Time:** 1 week

---

### Phase 5: Shop & E-commerce ⏳ (APIs NEED TO BE BUILT)
**APIs Needed:**
- [ ] `GET /api/shop/products`
- [ ] `GET /api/shop/products/:id`
- [ ] `POST /api/shop/cart`
- [ ] `GET /api/shop/cart`
- [ ] `POST /api/shop/checkout`
- [ ] `GET /api/shop/orders`

**Frontend Files to Update:**
1. `frontend/app/(tabs)/shop.tsx`
2. `frontend/app/(tabs)/cart.tsx`
3. `frontend/app/(tabs)/checkout.tsx`
4. Create `frontend/src/services/shop/shopService.ts`

**Estimated Time:** 1.5 weeks

---

## 📝 Code Templates

### Template 1: Update Auth Service
```typescript
// frontend/src/services/auth/authService.ts
import apiService from '../api/api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiService.instance.post('/auth/login', credentials);
    
    const { token, refreshToken, user } = response.data.data;
    
    // Save to storage
    await storage.saveToken(token);
    await storage.saveRefreshToken(refreshToken);
    await storage.saveUser(user);
    
    return user;
  },
  
  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await apiService.instance.post('/auth/register', credentials);
    
    const { token, refreshToken, user } = response.data.data;
    
    await storage.saveToken(token);
    await storage.saveRefreshToken(refreshToken);
    await storage.saveUser(user);
    
    return user;
  },
  
  // ... other methods
};
```

---

### Template 2: Update Onboarding Service
```typescript
// frontend/src/services/onboarding/onboardingService.ts
import apiService from '../api/api';

class OnboardingService {
  async saveStep1(data: Step1Data): Promise<OnboardingData> {
    const response = await apiService.instance.post('/onboarding/step1', data);
    return response.data.data.onboarding;
  }
  
  async saveStep2(data: Step2Data): Promise<OnboardingData> {
    const response = await apiService.instance.post('/onboarding/step2', data);
    return response.data.data.onboarding;
  }
  
  async getStatus(): Promise<OnboardingData> {
    const response = await apiService.instance.get('/onboarding/status');
    return response.data.data.onboarding;
  }
}

export const onboardingService = new OnboardingService();
```

---

### Template 3: Error Handling
```typescript
// In any service method
try {
  const response = await apiService.instance.post('/endpoint', data);
  return response.data.data;
} catch (error: any) {
  if (error.response) {
    // Server responded with error
    const message = error.response.data.message || 'Something went wrong';
    throw new Error(message);
  } else if (error.request) {
    // Network error
    throw new Error('Network error. Please check your connection.');
  } else {
    throw new Error('An unexpected error occurred');
  }
}
```

---

## ✅ Testing Checklist

### Before Connecting Frontend to API:
- [ ] Test all API endpoints in Thunder Client
- [ ] Verify MongoDB is running
- [ ] Verify backend server is running
- [ ] Test authentication flow (register → login → get me)
- [ ] Test onboarding flow (steps 1-4)
- [ ] Test token refresh mechanism

### After Connecting Frontend:
- [ ] Test login from mobile app
- [ ] Test registration from mobile app
- [ ] Test onboarding flow from mobile app
- [ ] Verify tokens are stored correctly
- [ ] Test logout functionality
- [ ] Test auto token refresh on 401

---

## 🎯 Next Steps

1. **Start Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Test All Endpoints in Thunder Client**
   - Use the provided collection: `thunder-client-collection.json`
   - Follow the testing guide: `TESTING_GUIDE.md`

3. **Once APIs are verified working:**
   - Update `authService.ts` to use real API
   - Update `onboardingService.ts` to use real API
   - Test from Expo app

4. **Build remaining APIs (Phases 2-5)**
   - Prioritize based on MVP requirements
   - Follow same pattern as auth/onboarding APIs

---

**Created:** December 9, 2025  
**Status:** Phase 1 APIs Ready ✅

