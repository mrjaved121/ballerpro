import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMealMacros {
  protein: number;
  carbs: number;
  fats: number;
}

export interface IMeal extends Document {
  userId: Types.ObjectId;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description?: string;
  calories: number;
  macros: IMealMacros;
  date: Date;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MealMacrosSchema = new Schema<IMealMacros>(
  {
    protein: {
      type: Number,
      default: 0,
      min: 0,
    },
    carbs: {
      type: Number,
      default: 0,
      min: 0,
    },
    fats: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const MealSchema = new Schema<IMeal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Meal name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    macros: {
      type: MealMacrosSchema,
      default: () => ({ protein: 0, carbs: 0, fats: 0 }),
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
MealSchema.index({ userId: 1, date: -1 });
MealSchema.index({ userId: 1, date: 1 }); // For daily queries
MealSchema.index({ date: -1 });

export const Meal = mongoose.model<IMeal>('Meal', MealSchema);

