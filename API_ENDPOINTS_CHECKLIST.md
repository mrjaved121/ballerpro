# API Endpoints Checklist

## 🔐 Authentication APIs

### User Registration & Login
- [ ] `POST /api/auth/register` - Register new user
- [ ] `POST /api/auth/login` - Login user
- [ ] `POST /api/auth/logout` - Logout user
- [ ] `POST /api/auth/refresh-token` - Refresh JWT token
- [ ] `GET /api/auth/me` - Get current user info
- [ ] `POST /api/auth/forgot-password` - Request password reset
- [ ] `POST /api/auth/reset-password` - Reset password with token

### Social Authentication (Optional)
- [ ] `POST /api/auth/apple` - Apple Sign In
- [ ] `POST /api/auth/google` - Google Sign In

---

## 👤 User Profile APIs

- [ ] `GET /api/users/profile` - Get user profile
- [ ] `PUT /api/users/profile` - Update user profile
- [ ] `POST /api/users/avatar` - Upload profile picture
- [ ] `DELETE /api/users/account` - Delete account

---

## 🎯 Onboarding APIs

- [ ] `POST /api/onboarding/step1` - Save goal & training level
- [ ] `POST /api/onboarding/step2` - Save step 2 data
- [ ] `POST /api/onboarding/step3` - Save step 3 data
- [ ] `POST /api/onboarding/step4` - Save step 4 data & complete
- [ ] `GET /api/onboarding/status` - Get onboarding completion status

---

## 💪 Workout APIs

### Workouts
- [ ] `GET /api/workouts` - List all workouts (with filters)
- [ ] `GET /api/workouts/:id` - Get workout details
- [ ] `POST /api/workouts` - Create custom workout
- [ ] `PUT /api/workouts/:id` - Update workout
- [ ] `DELETE /api/workouts/:id` - Delete workout
- [ ] `GET /api/workouts/recommended` - Get recommended workouts

### Exercises
- [ ] `GET /api/exercises` - List all exercises
- [ ] `GET /api/exercises/:id` - Get exercise details
- [ ] `GET /api/exercises/search` - Search exercises

### Workout Sessions
- [ ] `POST /api/workouts/sessions` - Start workout session
- [ ] `GET /api/workouts/sessions/:id` - Get session details
- [ ] `PUT /api/workouts/sessions/:id` - Update session progress
- [ ] `POST /api/workouts/sessions/:id/complete` - Complete session
- [ ] `GET /api/workouts/sessions` - Get user's workout history

---

## 📊 Tracking APIs

- [ ] `GET /api/tracking/history` - Get workout history
- [ ] `GET /api/tracking/stats` - Get user statistics
- [ ] `GET /api/tracking/progress` - Get progress over time
- [ ] `POST /api/tracking/measurements` - Log body measurements
- [ ] `GET /api/tracking/measurements` - Get measurement history
- [ ] `POST /api/tracking/photos` - Upload progress photo
- [ ] `GET /api/tracking/photos` - Get progress photos

---

## 📚 Program APIs

- [ ] `GET /api/programs` - List all programs
- [ ] `GET /api/programs/:id` - Get program details
- [ ] `POST /api/programs/:id/enroll` - Enroll in program
- [ ] `GET /api/programs/my-programs` - Get user's enrolled programs
- [ ] `POST /api/programs/:id/unenroll` - Unenroll from program

---

## 👥 Community APIs

### Posts
- [ ] `GET /api/community/posts` - Get community feed
- [ ] `POST /api/community/posts` - Create new post
- [ ] `GET /api/community/posts/:id` - Get post details
- [ ] `PUT /api/community/posts/:id` - Update post
- [ ] `DELETE /api/community/posts/:id` - Delete post
- [ ] `POST /api/community/posts/:id/like` - Like/unlike post
- [ ] `POST /api/community/posts/:id/comment` - Add comment
- [ ] `GET /api/community/posts/:id/comments` - Get post comments

### Users & Social
- [ ] `GET /api/community/users` - Search users
- [ ] `GET /api/community/users/:id` - Get user profile (public)
- [ ] `POST /api/community/follow/:userId` - Follow user
- [ ] `DELETE /api/community/follow/:userId` - Unfollow user
- [ ] `GET /api/community/followers` - Get followers
- [ ] `GET /api/community/following` - Get following list

---

## 🛒 Shop APIs

- [ ] `GET /api/shop/products` - List products
- [ ] `GET /api/shop/products/:id` - Get product details
- [ ] `GET /api/shop/categories` - Get product categories
- [ ] `GET /api/shop/cart` - Get cart items
- [ ] `POST /api/shop/cart` - Add item to cart
- [ ] `PUT /api/shop/cart/:itemId` - Update cart item
- [ ] `DELETE /api/shop/cart/:itemId` - Remove from cart
- [ ] `POST /api/shop/checkout` - Process checkout
- [ ] `GET /api/shop/orders` - Get order history
- [ ] `GET /api/shop/orders/:id` - Get order details

---

## 📱 General APIs

- [ ] `GET /health` - Health check ✅ (Already exists)
- [ ] `GET /api/config` - Get app configuration
- [ ] `POST /api/feedback` - Submit feedback
- [ ] `GET /api/notifications` - Get notifications
- [ ] `PUT /api/notifications/:id/read` - Mark notification as read

---

## Summary

**Total Endpoints: ~60**

### Priority Breakdown:
- **P0 (Critical):** 15 endpoints (Auth + Onboarding + Basic Workouts)
- **P1 (High):** 20 endpoints (Workouts + Tracking)
- **P2 (Medium):** 15 endpoints (Community)
- **P3 (Low):** 10 endpoints (Shop + Additional)

---

## Implementation Order

1. ✅ Health check (done)
2. 🔄 Authentication (8 endpoints) - **START HERE**
3. 🔄 Onboarding (5 endpoints)
4. ⏳ Workouts (12 endpoints)
5. ⏳ Tracking (7 endpoints)
6. ⏳ Community (13 endpoints)
7. ⏳ Shop (10 endpoints)
8. ⏳ General (5 endpoints)

