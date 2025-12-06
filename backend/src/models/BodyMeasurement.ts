import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IBodyMeasurement extends Document {
  userId: Types.ObjectId;
  weight?: number; // kg
  chest?: number; // cm
  waist?: number; // cm
  hips?: number; // cm
  arms?: number; // cm
  thighs?: number; // cm
  measuredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BodyMeasurementSchema = new Schema<IBodyMeasurement>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    weight: {
      type: Number,
      min: 0,
    },
    chest: {
      type: Number,
      min: 0,
    },
    waist: {
      type: Number,
      min: 0,
    },
    hips: {
      type: Number,
      min: 0,
    },
    arms: {
      type: Number,
      min: 0,
    },
    thighs: {
      type: Number,
      min: 0,
    },
    measuredAt: {
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
BodyMeasurementSchema.index({ userId: 1, measuredAt: -1 });
BodyMeasurementSchema.index({ measuredAt: -1 });

export const BodyMeasurement = mongoose.model<IBodyMeasurement>(
  'BodyMeasurement',
  BodyMeasurementSchema
);

