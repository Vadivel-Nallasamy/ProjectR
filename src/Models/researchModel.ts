import mongoose from "mongoose";

const researchCallSchema = new mongoose.Schema(
  {
    // ─────────────────────────────────────────────
    // SECURITY
    // ─────────────────────────────────────────────
    scripName: {
      type: String,
      required: [true, "Scrip name can't be empty"],
      trim: true,
    },

    token: {
      type: Number,
      required: [true, "Token can't be empty"],
    },

    exchange: {
      type: String,
      enum: ["NSE", "BSE", "NFO", "BFO", "MCX"],
      required: [true, "Exchange can't be empty"],
    },

    // ─────────────────────────────────────────────
    // CALL
    // ─────────────────────────────────────────────
    callType: {
      type: String,
      enum: ["BUY", "SELL"],
      required: [true, "Call type can't be empty"],
    },

    entryPrice: {
      type: Number,
      required: [true, "Entry price can't be empty"],
    },

    targetPrice: {
      type: Number,
      required: [true, "Target price can't be empty"],
    },

    stopLoss: {
      type: Number,
      required: [true, "Stop loss can't be empty"],
    },

    // Expected duration of the call
    holdingPeriod: {
      type: String,
      enum: [
        "INTRADAY",
        "SHORT_TERM",
        "MEDIUM_TERM",
        "LONG_TERM",
      ],
      required: [true, "Holding period can't be empty"],
    },

    // ─────────────────────────────────────────────
    // RESEARCH
    // ─────────────────────────────────────────────
    title: {
      type: String,
      required: [true, "Research call title can't be empty"],
      trim: true,
      maxlength: 200,
    },

    rationale: {
      type: String,
      required: [true, "Research rationale can't be empty"],
      trim: true,
    },

    // Optional technical/fundamental tags
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // ─────────────────────────────────────────────
    // CALL STATUS
    // ─────────────────────────────────────────────
    status: {
      type: String,
      enum: [
        "ACTIVE",
        "TARGET_HIT",
        "STOP_LOSS_HIT",
        "EXPIRED",
        "CLOSED",
        "CANCELLED",
      ],
      default: "ACTIVE",
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
    },

    closedAt: {
      type: Date,
    },

    // Actual exit price when the call is closed
    exitPrice: {
      type: Number,
    },

    // ─────────────────────────────────────────────
    // PERFORMANCE
    // ─────────────────────────────────────────────
    profitLoss: {
      type: Number,
    },

    profitLossPercentage: {
      type: Number,
    },

    // ─────────────────────────────────────────────
    // SOCIAL
    // ─────────────────────────────────────────────
    likesCount: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    bookmarksCount: {
      type: Number,
      default: 0,
    },

    // ─────────────────────────────────────────────
    // AUTHOR
    // ─────────────────────────────────────────────
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Research call must belong to a user"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("ResearchCall", researchCallSchema);