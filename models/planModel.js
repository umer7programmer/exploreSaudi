import mongoose, { mongo } from "mongoose";

const planScheam = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "users",
  },
  planName: {
    type: String,
    required: true,
  },
  planGenerationType: {
    type: String,
  },
  planType: {
    type: String,
  },
  capacity: {
    type: Number,
    default: 100,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  cities: [
    {
      cityId: {
        type: mongoose.ObjectId,
        ref: "cities",
      },
      cityName: {
        type: String,
      },
      date: {
        type: Date,
      },

      attractions: [
        {
          attraction: {
            type: mongoose.ObjectId,
            ref: "attraction",
          },
        },
      ],
      zones: [
        {
          zone: {
            type: mongoose.ObjectId,
            ref: "zone",
          },
        },
      ],
      sellers: [
        {
          seller: {
            type: mongoose.ObjectId,
            ref: "seller",
          },

          status: {
            type: String,
            default: "inactive",
          },
        },
        ,
      ],
    },
  ],
  users: [
    {
      userId: mongoose.ObjectId,
    },
  ],
  price: {
    type: Number,
  },
  purchased: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("plan", planScheam);
