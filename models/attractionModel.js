import mongoose from "mongoose";
import reviewSchema from "./reviewsModel.js";
const attractionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    zone: {
      type: mongoose.ObjectId,
      ref: "zone",
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    type: {
      type: String,
      required: true,
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
export default mongoose.model("attraction", attractionSchema);
