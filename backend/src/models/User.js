import mongoose from 'mongoose';
import { comparePassword as bcryptCompare } from '../utils/password.js';

const { Schema } = mongoose;

const UserSchema = new Schema(
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
        gender: {
          type: String,
          enum: ['male', 'female', 'other'],
        },
      },
      step2: {
        experienceLevel: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced'],
        },
      },
      step3: {
        injuries: {
          type: [String],
          default: [],
        },
        otherDetails: {
          type: String,
          trim: true,
        },
      },
      step4: {
        goal: {
          type: String,
          enum: ['muscle-gain', 'fat-loss', 'maintenance'],
        },
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
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptCompare(candidatePassword, this.password);
};

// Index for faster queries
UserSchema.index({ email: 1 });

export const User = mongoose.model('User', UserSchema);

