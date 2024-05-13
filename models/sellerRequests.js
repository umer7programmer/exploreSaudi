import mongoose from "mongoose";

const sellerRequestSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.ObjectId,
      ref: "seller",
    },
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default mongoose.model("sellerRequest", sellerRequestSchema);
