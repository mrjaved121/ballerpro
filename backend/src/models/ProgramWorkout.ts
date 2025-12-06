import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProgramWorkout extends Document {
  programId: Types.ObjectId;
  workoutId: Types.ObjectId;
  week: number;
  day: number; // Day of week (1-7)
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramWorkoutSchema = new Schema<IProgramWorkout>(
  {
    programId: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
      required: true,
    },
    week: {
      type: Number,
      required: true,
      min: 1,
    },
    day: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
    order: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProgramWorkoutSchema.index({ programId: 1, week: 1, day: 1 });
ProgramWorkoutSchema.index({ workoutId: 1 });
// Prevent duplicate program-workout assignments
ProgramWorkoutSchema.index(
  { programId: 1, workoutId: 1, week: 1, day: 1 },
  { unique: true }
);

export const ProgramWorkout = mongoose.model<IProgramWorkout>(
  'ProgramWorkout',
  ProgramWorkoutSchema
);

