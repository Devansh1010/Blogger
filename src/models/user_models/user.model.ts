
import { Schema, model, models } from 'mongoose'

export interface IBadge {
  id: string,
  name: string,
  description?: string,
  icon?: string,
  awardedAt?: Date,
}

export interface IUser {
  _id?: Schema.Types.ObjectId,
  username: string,
  email: string,
  bio: string,
  provider: "credentials" | "github";
  password?: string;
  avatar?: string ,
  coverImage? : string,
  resetToken?: string,
  resetTokenExpiry?: Date,
  isVerified: boolean,
  verifyCode?: string,
  verifyExpiry?: Date,
  followersCount: number,
  followingCount: number,
  featuredArticles: Schema.Types.ObjectId[],
  featuredSeries: Schema.Types.ObjectId[],
  badges?: IBadge[],
  selectedBadges?: string[],
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      minlength: [2, 'Minimum 2 Character required in Username'],
      maxlength: [30, 'Maximum 30 characters allowed'],
      required: [true, 'Username Required'],
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email Required'],
      lowercase: true,
      unique: true,
    },

    bio: {
      type: String,
      lowercase: true,
    },

    provider: {
      type: String,
      enum: ["credentials", "github"],
      default: "credentials",
    },

    password: {
      type: String,
      select: false,
      required: function (): boolean {
        return this.provider === "credentials";
      },
    },

    avatar: {
      type: String,
      default: '',
    },

    coverImage: {
      type: String,
      default: '',
    },

    resetToken: {
      type: String,
      select: false,
    },

    resetTokenExpiry: {
      type: Date,
      select: false,
    },

    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    verifyCode: {
      type: String,
      select: false,
    },

    verifyExpiry: {
      type: Date,
      select: false,
    },

    followersCount: {
      type: Number,
      default: 0
    },

    followingCount: {
      type: Number,
      default: 0
    },


    featuredArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],

    featuredSeries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Series'
      }
    ],

    badges: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
        icon: { type: String },
        awardedAt: { type: Date, default: Date.now },
      }
    ],

    // IDs of badges the user wants to show on profile (max 3)
    selectedBadges: [
      { type: String }
    ],

  },
  { timestamps: true }
)

const User = models.User || model<IUser>('User', userSchema)

export default User