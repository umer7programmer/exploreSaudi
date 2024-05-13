import mongoose from "mongoose";
import reviewSchema from "./reviewsModel.js";
const sellerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
    photo: {
      data: Buffer,
      contentType: String,
    },
    answer: {
      type: String,
      required: true,
    },
    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },

    providedService: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    city: {
      type: mongoose.ObjectId,
      ref: "cities",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    role: {
      type: String,
      default: "Seller",
    },
    description: {
      type: String,
    },

    planRequest: [
      {
        type: mongoose.ObjectId,
        ref: "plan",
      },
    ],
    price: {
      type: Number,
    },
    availability: {
      type: String,
      enum: ["available", "uponRequest", "busy"],
      default: "available",
    },

    reviews: [reviewSchema],
    averageRating: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);
export default mongoose.model("seller", sellerSchema);
