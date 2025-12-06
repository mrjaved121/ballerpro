# Mongoose Models

This directory contains all Mongoose ORM models for the BallerPro application.

## Models Overview

### Core Models

1. **User** (`User.ts`)
   - User accounts and authentication
   - Embedded onboarding data
   - Methods: `comparePassword()`

2. **Workout** (`Workout.ts`)
   - Workout templates/plans
   - Contains embedded WorkoutExercise array
   - References: User (createdBy), Exercise (via exercises)

3. **Exercise** (`Exercise.ts`)
   - Master exercise library
   - Contains exercise instructions
   - Used by Workout through WorkoutExercise

4. **WorkoutSession** (`WorkoutSession.ts`)
   - Tracks individual workout completions
   - References: User, Workout
   - Status: in_progress | completed | abandoned

5. **Meal** (`Meal.ts`)
   - Nutrition tracking
   - Embedded macros (protein, carbs, fats)
   - References: User

6. **Post** (`Post.ts`)
   - Community posts/feed
   - Embedded likes and comments
   - References: User, Workout (optional)

### Program Models

7. **Program** (`Program.ts`)
   - Training programs
   - References: User (createdBy)

8. **ProgramEnrollment** (`ProgramEnrollment.ts`)
   - User enrollments in programs
   - References: User, Program
   - Status: active | completed | abandoned

9. **ProgramWorkout** (`ProgramWorkout.ts`)
   - Links workouts to programs with scheduling
   - References: Program, Workout

### Tracking Models

10. **BodyMeasurement** (`BodyMeasurement.ts`)
    - Body measurements tracking
    - References: User

11. **ProgressPhoto** (`ProgressPhoto.ts`)
    - Progress photos
    - References: User

### Social Models

12. **Follow** (`Follow.ts`)
    - User follow relationships
    - Self-reference: User (followerId, followingId)

## Usage

Import models from the index file:

```typescript
import { User, Workout, Exercise, WorkoutSession } from './models';

// Create a new user
const user = new User({
  email: 'user@example.com',
  password: 'hashedPassword',
});

// Find workouts
const workouts = await Workout.find({ difficulty: 'beginner' })
  .populate('createdBy', 'name email');

// Create workout session
const session = new WorkoutSession({
  userId: user._id,
  workoutId: workout._id,
  status: 'in_progress',
});
```

## Model Relationships

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
- WorkoutExercise (in Workout)
- PostLike (in Post)
- PostComment (in Post)
- Onboarding (in User)

## Indexes

All models include appropriate indexes for optimal query performance:
- Foreign key indexes
- Compound indexes for common queries
- Text search indexes where applicable
- Unique constraints where needed

See individual model files for specific indexes.

## TypeScript Interfaces

Each model exports TypeScript interfaces:
- `IUser`, `IWorkout`, `IExercise`, etc.
- Use these for type safety in your code

Example:
```typescript
import { IUser, IWorkout } from './models';

function processUser(user: IUser): void {
  // Type-safe user operations
}
```

## Best Practices

1. **Always use TypeScript interfaces** when working with models
2. **Use populate()** for related documents instead of manual joins
3. **Validate data** before saving using model validators
4. **Use transactions** for multi-document operations
5. **Index frequently queried fields** (already done)
6. **Use lean()** for read-only queries to improve performance

## Model Methods

### User Model
- `comparePassword(candidatePassword: string): Promise<boolean>`

### Custom Methods
Add custom methods to models as needed in their respective files.

