import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  description?: string;
  duration: number; // weeks
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    title: {
      type: String,
      required: [true, 'Program title is required'],
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
    image: {
      type: String,
      trim: true,
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
ProgramSchema.index({ createdBy: 1 });
ProgramSchema.index({ difficulty: 1 });
ProgramSchema.index({ createdAt: -1 });
ProgramSchema.index({ title: 'text', description: 'text' }); // Text search

export const Program = mongoose.model<IProgram>('Program', ProgramSchema);

