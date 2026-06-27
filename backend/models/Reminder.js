const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    reminderDate: {
      type: Date,
      required: true,
    },

    reminderTime: {
      type: String,
      default: "",
    },

    repeat: {
      type: String,
      enum: ["None", "Daily", "Weekly", "Monthly"],
      default: "None",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    category: {
      type: String,
      default: "",
    },

    aiCategory: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    voiceInput: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reminder", reminderSchema);