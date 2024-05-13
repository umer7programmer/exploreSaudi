import mongoose from "mongoose";

const purchasedPlanSchema = new mongoose.Schema(
  {
    plan: {
      type: mongoose.ObjectId,
      ref: "plan",
    },

    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default mongoose.model("purchasedPlan", purchasedPlanSchema);
