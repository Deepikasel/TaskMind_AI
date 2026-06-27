const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    dueDate: {
      type: Date,
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

    aiSummary: {
      type: String,
      default: "",
    },

    voiceInput: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);