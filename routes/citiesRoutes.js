import express from "express";
import {
  addCititesController,
  getCititesController,
} from "../controllers/citiesController.js";

const router = express.Router();

//Add city || Method post
router.post("/add", addCititesController);
//Get city || Method get
router.get("/get", getCititesController);
export default router;
