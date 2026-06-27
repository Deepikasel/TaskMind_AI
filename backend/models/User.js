const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    profession: {
      type: String,
      default: "",
    },

    productivityScore: {
      type: Number,
      default: 0,
    },

    currentStreak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    completedTasks: {
      type: Number,
      default: 0,
    },

    pendingTasks: {
      type: Number,
      default: 0,
    },

    totalNotes: {
      type: Number,
      default: 0,
    },

    totalReminders: {
      type: Number,
      default: 0,
    },

    badges: [
      {
        type: String,
      },
    ],

    lastLogin: {
      type: Date,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);