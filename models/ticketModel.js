import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    attraction: {
      type: mongoose.ObjectId,
      ref: "attraction",
    },

    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default mongoose.model("tickets", ticketSchema);
