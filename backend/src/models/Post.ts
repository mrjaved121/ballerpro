import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPostLike {
  userId: Types.ObjectId;
  createdAt: Date;
}

export interface IPostComment {
  userId: Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  userId: Types.ObjectId;
  content: string;
  images: string[];
  workoutId?: Types.ObjectId;
  likes: IPostLike[];
  comments: IPostComment[];
  createdAt: Date;
  updatedAt: Date;
}

const PostLikeSchema = new Schema<IPostLike>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const PostCommentSchema = new Schema<IPostComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const PostSchema = new Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
      maxlength: 5000,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (images: string[]) => images.length <= 10,
        message: 'Maximum 10 images allowed per post',
      },
    },
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
    },
    likes: {
      type: [PostLikeSchema],
      default: [],
    },
    comments: {
      type: [PostCommentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
PostSchema.index({ userId: 1, createdAt: -1 });
PostSchema.index({ createdAt: -1 });
PostSchema.index({ workoutId: 1 });
PostSchema.index({ 'likes.userId': 1 }); // For checking if user liked

export const Post = mongoose.model<IPost>('Post', PostSchema);

