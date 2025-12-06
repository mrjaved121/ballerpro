import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISessionSet {
  reps: number;
  weight?: number;
  completed: boolean;
  restTime: number; // seconds
}

export interface ISessionExercise {
  exerciseId: Types.ObjectId;
  sets: ISessionSet[];
  completed: boolean;
}

export interface IWorkoutSession extends Document {
  userId: Types.ObjectId;
  workoutId: Types.ObjectId;
  startedAt: Date;
  completedAt?: Date;
  duration?: number; // seconds
  exercises: ISessionExercise[];
  status: 'in_progress' | 'completed' | 'abandoned';
  createdAt: Date;
  updatedAt: Date;
}

const SessionSetSchema = new Schema<ISessionSet>(
  {
    reps: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      min: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    restTime: {
      type: Number,
      default: 60,
      min: 0,
    },
  },
  { _id: false }
);

const SessionExerciseSchema = new Schema<ISessionExercise>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    sets: {
      type: [SessionSetSchema],
      default: [],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const WorkoutSessionSchema = new Schema<IWorkoutSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
      required: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    duration: {
      type: Number,
      min: 0,
    },
    exercises: {
      type: [SessionExerciseSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'abandoned'],
      default: 'in_progress',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
WorkoutSessionSchema.index({ userId: 1, startedAt: -1 });
WorkoutSessionSchema.index({ workoutId: 1 });
WorkoutSessionSchema.index({ status: 1 });
WorkoutSessionSchema.index({ startedAt: -1 });

export const WorkoutSession = mongoose.model<IWorkoutSession>(
  'WorkoutSession',
  WorkoutSessionSchema
);

