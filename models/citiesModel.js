import mongoose from "mongoose";
//city schema
const citiesSchema = new mongoose.Schema({
  cityName: {
    type: String,
  },
});
export default mongoose.model("cities", citiesSchema);
