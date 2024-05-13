import express from "express";

import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  createZoneController,
  deleteZoneController,
  getAllZoneController,
  getPhotoController,
  getSingleZoneController,
  getZoneWithCityController,
  getZoneWithCityNameController,
  searchZoneController,
  updateZoneController,
} from "../controllers/zoneController.js";

const router = express.Router();

//Add Zone || Method POST
router.post(
  "/create-zone",
  requireSignIn,
  isAdmin,
  formidable(),
  createZoneController
);

//Update Zone || Method PUT
router.put(
  "/update-zone/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateZoneController
);

//Get Zone || Method GET
router.get("/get-single-zone/:slug", getSingleZoneController);
//Get All Zone || Method GET
router.get("/get-zone", getAllZoneController);

//Delete  Zone || Method DELETE
router.delete(
  "/delete-Zone/:id",
  requireSignIn,
  isAdmin,

  deleteZoneController
);
//GET photo || GET METHOD
router.get("/get-photo/:id", getPhotoController);

//GET Zones on base of city || Get Method
router.get("/get-zones-city/:city", getZoneWithCityController);

//GET Zones on base of city name || Get Method
router.get("/get-zones-cityName/:cityName", getZoneWithCityNameController);

//search zones || GET METHOD
router.get("/search/:keyword", searchZoneController);

export default router;
