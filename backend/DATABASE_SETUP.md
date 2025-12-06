# MongoDB & Mongoose ORM Setup

## ✅ Setup Complete

BallerPro backend is fully configured with **MongoDB** as the database and **Mongoose ORM** for data modeling and interaction.

## 📦 Installed Packages

- **mongoose**: `^9.0.0` - MongoDB object modeling for Node.js
- All required TypeScript types are included

## 🔧 Configuration

### Database Connection

**File**: `backend/src/config/db.ts`

```typescript
import { connectDB } from './config/db';

// Connection features:
// - Connection pooling (5-10 connections)
// - Automatic reconnection
// - Connection event handlers
// - Graceful shutdown support
```

**Connection Options:**
- Max pool size: 10 connections
- Min pool size: 5 connections
- Socket timeout: 45 seconds
- Server selection timeout: 5 seconds
- Heartbeat frequency: 10 seconds

### Environment Variables

**File**: `backend/.env` (create from `.env.example`)

```env
MONGODB_URI=mongodb://localhost:27017/ballerpro
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ballerpro
```

## 📊 Models Created (12 Models)

All models are created using Mongoose with TypeScript interfaces:

### Core Models

1. ✅ **User** (`models/User.ts`)
   - Authentication and profile data
   - Embedded onboarding data
   - Password hashing support
   - Index: `email` (unique)

2. ✅ **Workout** (`models/Workout.ts`)
   - Workout templates/plans
   - Embedded WorkoutExercise array
   - Indexes: `createdBy`, `category`, `difficulty`, `createdAt`, text search

3. ✅ **Exercise** (`models/Exercise.ts`)
   - Master exercise library
   - Exercise instructions
   - Indexes: `name`, `muscleGroups`, `equipment`, text search

4. ✅ **WorkoutSession** (`models/WorkoutSession.ts`)
   - Tracks workout completions
   - Indexes: `(userId, startedAt)`, `workoutId`, `status`

5. ✅ **Meal** (`models/Meal.ts`)
   - Nutrition tracking
   - Indexes: `(userId, date)`, `date`

6. ✅ **Post** (`models/Post.ts`)
   - Community posts
   - Embedded likes and comments
   - Indexes: `(userId, createdAt)`, `workoutId`

### Program Models

7. ✅ **Program** (`models/Program.ts`)
   - Training programs
   - Indexes: `createdBy`, `difficulty`, `createdAt`, text search

8. ✅ **ProgramEnrollment** (`models/ProgramEnrollment.ts`)
   - User program enrollments
   - Unique index: `(userId, programId)`
   - Indexes: `(userId, status)`, `programId`

9. ✅ **ProgramWorkout** (`models/ProgramWorkout.ts`)
   - Program-workout mappings
   - Unique index: `(programId, workoutId, week, day)`
   - Indexes: `programId`, `workoutId`

### Tracking Models

10. ✅ **BodyMeasurement** (`models/BodyMeasurement.ts`)
    - Body measurements tracking
    - Indexes: `(userId, measuredAt)`, `measuredAt`

11. ✅ **ProgressPhoto** (`models/ProgressPhoto.ts`)
    - Progress photos
    - Indexes: `(userId, takenAt)`, `takenAt`

### Social Models

12. ✅ **Follow** (`models/Follow.ts`)
    - User follow relationships
    - Unique index: `(followerId, followingId)`
    - Prevents self-follow
    - Indexes: `followerId`, `followingId`

## 🔗 Relationships

### One-to-Many
- User → Workout (createdBy)
- User → WorkoutSession
- User → Meal
- User → Post
- User → BodyMeasurement
- User → ProgressPhoto
- User → ProgramEnrollment
- Workout → WorkoutSession
- Program → ProgramEnrollment
- Program → ProgramWorkout

### Many-to-Many
- User ↔ User (via Follow)
- Workout ↔ Exercise (via WorkoutExercise embedded)
- Program ↔ Workout (via ProgramWorkout)

### Embedded Documents
- **WorkoutExercise** (embedded in Workout)
- **PostLike** (embedded in Post)
- **PostComment** (embedded in Post)
- **Onboarding** (embedded in User)

## 📝 Features

### TypeScript Support
- All models have TypeScript interfaces
- Full type safety with `IUser`, `IWorkout`, etc.
- Exported from `models/index.ts` for easy imports

### Validation
- Field-level validation using Mongoose validators
- Enum constraints on specific fields
- Required field validation
- Custom validation (e.g., no self-follow in Follow model)

### Indexes
- Performance-optimized indexes on all foreign keys
- Compound indexes for common query patterns
- Text search indexes on searchable fields
- Unique constraints where needed

### Timestamps
- Automatic `createdAt` and `updatedAt` timestamps
- Configured via Mongoose schema options

### Methods
- User model: `comparePassword()` method
- Custom methods can be added to any model

## 🚀 Usage Example

```typescript
import { connectDB } from './config/db';
import { User, Workout, Exercise } from './models';

// Connect to database
await connectDB();

// Create a user
const user = new User({
  email: 'user@example.com',
  password: 'hashedPassword',
  name: 'John Doe',
});

await user.save();

// Find workouts with population
const workouts = await Workout.find({ difficulty: 'beginner' })
  .populate('createdBy', 'name email')
  .populate('exercises.exerciseId', 'name description');

// Create workout session
const session = new WorkoutSession({
  userId: user._id,
  workoutId: workout._id,
  status: 'in_progress',
});

await session.save();
```

## 🔍 Query Examples

### Find user's workouts
```typescript
const workouts = await Workout.find({ createdBy: userId })
  .sort({ createdAt: -1 })
  .limit(10);
```

### Find workout sessions with pagination
```typescript
const sessions = await WorkoutSession.find({ userId })
  .populate('workoutId', 'title duration')
  .sort({ startedAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit);
```

### Daily meals aggregation
```typescript
const today = new Date();
today.setHours(0, 0, 0, 0);

const meals = await Meal.find({
  userId,
  date: { $gte: today, $lt: new Date(today.getTime() + 86400000) }
}).sort({ date: -1 });
```

## 📚 Documentation

- **Models README**: `backend/src/models/README.md`
- **ERD**: `../ERD.md` (root directory)
- **Visual ERD**: `../ERD_VISUAL.txt`

## ✅ Testing Connection

```bash
# Start MongoDB (if local)
mongod

# Start backend server
cd backend
npm run dev

# You should see:
# ✅ MongoDB connected successfully
#    Database: ballerpro
#    Host: localhost
#    Port: 27017
```

## 🎯 Next Steps

1. ✅ Database connection configured
2. ✅ All models created
3. ✅ Indexes added
4. ✅ Relationships defined
5. ⏳ Seed database with initial data (optional)
6. ⏳ Add model methods as needed
7. ⏳ Implement model hooks (pre/post save) if needed

## 📖 Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [TypeScript with Mongoose](https://mongoosejs.com/docs/typescript.html)

---

**Status**: ✅ **MongoDB & Mongoose ORM fully configured and ready to use!**

