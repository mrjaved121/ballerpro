import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProgramEnrollment extends Document {
  userId: Types.ObjectId;
  programId: Types.ObjectId;
  enrolledAt: Date;
  completedAt?: Date;
  currentWeek: number;
  status: 'active' | 'completed' | 'abandoned';
  createdAt: Date;
  updatedAt: Date;
}

const ProgramEnrollmentSchema = new Schema<IProgramEnrollment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    programId: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    currentWeek: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProgramEnrollmentSchema.index({ userId: 1, status: 1 });
ProgramEnrollmentSchema.index({ programId: 1 });
ProgramEnrollmentSchema.index({ userId: 1, enrolledAt: -1 });
// Prevent duplicate enrollments
ProgramEnrollmentSchema.index({ userId: 1, programId: 1 }, { unique: true });

export const ProgramEnrollment = mongoose.model<IProgramEnrollment>(
  'ProgramEnrollment',
  ProgramEnrollmentSchema
);

