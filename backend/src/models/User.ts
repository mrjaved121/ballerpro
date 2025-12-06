import mongoose, { Document, Schema } from 'mongoose';
import { comparePassword as bcryptCompare } from '../utils/password';

export interface OnboardingData {
  step1?: {
    goal: 'build-muscle' | 'lose-fat' | 'improve-endurance' | 'increase-strength';
    trainingLevel: 'strength-athlete' | 'endurance-runner' | 'casual-gym-goer' | 'beginner';
  };
  step2?: Record<string, any>;
  step3?: Record<string, any>;
  step4?: Record<string, any>;
  completed: boolean;
  completedAt?: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  isEmailVerified: boolean;
  onboarding: OnboardingData;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
      onboarding: {
        step1: {
          goal: {
            type: String,
            enum: ['build-muscle', 'lose-fat', 'improve-endurance', 'increase-strength'],
          },
          trainingLevel: {
            type: String,
            enum: ['strength-athlete', 'endurance-runner', 'casual-gym-goer', 'beginner'],
          },
        },
        step2: {
          type: Schema.Types.Mixed,
        },
        step3: {
          type: Schema.Types.Mixed,
        },
        step4: {
          type: Schema.Types.Mixed,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        completedAt: {
          type: Date,
        },
      },
  },
  {
    timestamps: true,
  }
);

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcryptCompare(candidatePassword, this.password);
};

// Index for faster queries
UserSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
