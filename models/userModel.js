import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
    },
    role: {
      type: String,
      default: "Explorer",
    },

    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    birth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    interest: {
      type: Array,
      default: [],
    },
    partners: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("users", userSchema);
