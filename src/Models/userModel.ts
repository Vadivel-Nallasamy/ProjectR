import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ─────────────────────────────────────────────
    // IDENTITY
    // ─────────────────────────────────────────────
    name: {
      type: String,
      required: [true, "Name can't be empty"],
      trim: true,
      maxlength: 100,
    },

    username: {
      type: String,
      required: [true, "Username can't be empty"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: [true, "Email can't be empty"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password can't be empty"],
      minlength: 8,
      select: false,
    },

    // ─────────────────────────────────────────────
    // PROFILE
    // ─────────────────────────────────────────────
    photo: {
      type: String,
      default: "default.jpg",
    },

    bio: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    location: {
      type: String,
      maxlength: 100,
    },

    website: {
      type: String,
      trim: true,
    },

    // ─────────────────────────────────────────────
    // USER TYPE
    // ─────────────────────────────────────────────
    role: {
      type: String,
      enum: ["USER", "ANALYST", "ADMIN"],
      default: "USER",
    },

    // ─────────────────────────────────────────────
    // ANALYST / RESEARCHER
    // ─────────────────────────────────────────────
    analystProfile: {
      isVerified: {
        type: Boolean,
        default: false,
      },

      designation: {
        type: String,
        trim: true,
      },

      organization: {
        type: String,
        trim: true,
      },

      experience: {
        type: Number,
        min: 0,
      },

      specialization: [
        {
          type: String,
          trim: true,
        },
      ],

      registrationNumber: {
        type: String,
        trim: true,
      },
    },

    // ─────────────────────────────────────────────
    // SOCIAL STATS
    // ─────────────────────────────────────────────
    followersCount: {
      type: Number,
      default: 0,
    },

    followingCount: {
      type: Number,
      default: 0,
    },

    researchCallsCount: {
      type: Number,
      default: 0,
    },

    // ─────────────────────────────────────────────
    // PERFORMANCE
    // ─────────────────────────────────────────────
    performance: {
      totalCalls: {
        type: Number,
        default: 0,
      },

      successfulCalls: {
        type: Number,
        default: 0,
      },

      failedCalls: {
        type: Number,
        default: 0,
      },

      winRate: {
        type: Number,
        default: 0,
      },

      averageReturn: {
        type: Number,
        default: 0,
      },

      totalReturn: {
        type: Number,
        default: 0,
      },
    },

    // ─────────────────────────────────────────────
    // ACCOUNT STATUS
    // ─────────────────────────────────────────────
    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    // ─────────────────────────────────────────────
    // PASSWORD / AUTH
    // ─────────────────────────────────────────────
    passwordChangedAt: {
      type: Date,
      select: false,
    },

    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      select: false,
    },

    emailVerificationToken: {
      type: String,
      select: false,
    },

    // ─────────────────────────────────────────────
    // LAST ACTIVITY
    // ─────────────────────────────────────────────
    lastLoginAt: {
      type: Date,
    },
    confirmPassword : {
    type: String,
    required: [true, 'Please confirm your password'],
    trim: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Password should match',
    },
  },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
  }
);

export default mongoose.model("User", userSchema);