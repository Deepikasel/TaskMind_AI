const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
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

    content: {
      type: String,
      required: true,
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

    summary: {
      type: String,
      default: "",
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: "#ffffff",
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

module.exports = mongoose.model("Note", noteSchema);