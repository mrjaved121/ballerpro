import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IFollow extends Document {
  followerId: Types.ObjectId;
  followingId: Types.ObjectId;
  createdAt: Date;
}

const FollowSchema = new Schema<IFollow>(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    followingId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: function (this: IFollow, value: Types.ObjectId) {
          return !this.followerId.equals(value);
        },
        message: 'Cannot follow yourself',
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Indexes
FollowSchema.index({ followerId: 1 });
FollowSchema.index({ followingId: 1 });
// Prevent duplicate follows and self-follow
FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

export const Follow = mongoose.model<IFollow>('Follow', FollowSchema);

