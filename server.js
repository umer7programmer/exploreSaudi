import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import attractionRoutes from "./routes/attractionRoutes.js";
import zoneRoutes from "./routes/zoneRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import planRoutes from "./routes/planRoutes.js";

import citiesRoutes from "./routes/citiesRoutes.js";

//config dotenv
dotenv.config();

//db config
dbConnection();

// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/attraction", attractionRoutes);
app.use("/api/v1/zone", zoneRoutes);
app.use("/api/v1/seller", sellerRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/plan", planRoutes);
app.use("/api/v1/cities", citiesRoutes);

//Port

const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.warn(
    `Server is running at ${process.env.DEV_MODE} mode at port ${PORT}`.bgGreen
      .white
  );
});
