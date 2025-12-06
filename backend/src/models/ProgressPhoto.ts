import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProgressPhoto extends Document {
  userId: Types.ObjectId;
  imageUrl: string;
  weight?: number; // kg
  notes?: string;
  takenAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressPhotoSchema = new Schema<IProgressPhoto>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    weight: {
      type: Number,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    takenAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProgressPhotoSchema.index({ userId: 1, takenAt: -1 });
ProgressPhotoSchema.index({ takenAt: -1 });

export const ProgressPhoto = mongoose.model<IProgressPhoto>(
  'ProgressPhoto',
  ProgressPhotoSchema
);

