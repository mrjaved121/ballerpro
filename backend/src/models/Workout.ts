import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IWorkoutExercise {
  exerciseId: Types.ObjectId;
  sets: number;
  reps: number | string;
  restTime: number; // seconds
  order: number;
}

export interface IWorkout extends Document {
  title: string;
  description?: string;
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  exercises: IWorkoutExercise[];
  image?: string;
  tags: string[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutExerciseSchema = new Schema<IWorkoutExercise>(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    sets: {
      type: Number,
      required: true,
      min: 1,
    },
    reps: {
      type: Schema.Types.Mixed, // Can be number or string like "10-12"
      required: true,
    },
    restTime: {
      type: Number,
      default: 60, // 60 seconds default
      min: 0,
    },
    order: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const WorkoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: [true, 'Workout title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    exercises: {
      type: [WorkoutExerciseSchema],
      default: [],
    },
    image: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
WorkoutSchema.index({ createdBy: 1 });
WorkoutSchema.index({ category: 1 });
WorkoutSchema.index({ difficulty: 1 });
WorkoutSchema.index({ createdAt: -1 });
WorkoutSchema.index({ title: 'text', description: 'text' }); // Text search

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);

