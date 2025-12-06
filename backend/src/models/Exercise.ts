import mongoose, { Document, Schema } from 'mongoose';

export interface IExerciseInstruction {
  number: number;
  title: string;
  description: string;
}

export interface IExercise extends Document {
  name: string;
  description?: string;
  instructions: IExerciseInstruction[];
  videoUrl?: string;
  imageUrl?: string;
  muscleGroups: string[];
  equipment: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseInstructionSchema = new Schema<IExerciseInstruction>(
  {
    number: {
      type: Number,
      required: true,
      min: 1,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const ExerciseSchema = new Schema<IExercise>(
  {
    name: {
      type: String,
      required: [true, 'Exercise name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    instructions: {
      type: [ExerciseInstructionSchema],
      default: [],
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    muscleGroups: {
      type: [String],
      default: [],
    },
    equipment: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ExerciseSchema.index({ name: 1 });
ExerciseSchema.index({ muscleGroups: 1 });
ExerciseSchema.index({ equipment: 1 });
ExerciseSchema.index({ name: 'text', description: 'text' }); // Text search

export const Exercise = mongoose.model<IExercise>('Exercise', ExerciseSchema);

