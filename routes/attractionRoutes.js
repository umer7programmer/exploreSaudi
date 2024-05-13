import express from "express";
import {
  AddMoreAttractionsController,
  attractionCountController,
  attractionListController,
  attractionRatingController,
  brainTreePaymentController,
  braintreeTokenController,
  createAttractionController,
  deleteAttractionController,
  getAllAttractionController,
  getAttractionsByUserInterest,
  getAttractionsWithoutZones,
  getPhotoController,
  getSingleAttractionController,
  searchZoneBasedAttractionController,
  typeBaseAttractionController,
  typezoneBaseAttractionController,
  updateAttractionController,
} from "../controllers/attractionController.js";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { searchAttractionController } from "../controllers/authControllers.js";
const router = express.Router();

//Add Attraction || Method POST
router.post(
  "/create-attraction",
  requireSignIn,
  isAdmin,
  formidable(),
  createAttractionController
);

//Update Attraction || Method PUT
router.put(
  "/update-attraction/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateAttractionController
);

//Get Attraction || Method GET
router.get("/get-attraction/:slug", getSingleAttractionController);
//Get All Attraction || Method GET
router.get("/get-attraction", getAllAttractionController);

//Delete  Attraction || Method DELETE
router.delete(
  "/delete-attraction/:id",
  requireSignIn,
  isAdmin,

  deleteAttractionController
);

//GET photo || GET METHOD
router.get("/get-photo/:id", getPhotoController);

//search attractions || GET METHOD
router.get("/search/:keyword", searchAttractionController);

//search Attraction based on zone || GET METHOD

router.get(
  "/search-attractions/:id",

  searchZoneBasedAttractionController
);

//Attractions based on type and zone
router.post("/attraction-type-zone/:type", typezoneBaseAttractionController);
//Attractions based on type
router.get("/attraction-type/:type", typeBaseAttractionController);
//interest base attractions
router.post(
  "/user-interest-attractions",

  getAttractionsByUserInterest
);
//PAYMENT
//token
router.get("/token", braintreeTokenController);

//payment
//token
router.post("/payment", requireSignIn, brainTreePaymentController);

//Add more attractions || METHOD GET
router.get(
  "/add-more-attractions/:id",

  AddMoreAttractionsController
);

//rating ||Method-POST
router.post("/attraction-rating", requireSignIn, attractionRatingController);

//attraction count
router.get("/attraction-count", attractionCountController);

//attraction per page
router.get("/attraction-list/:page", attractionListController);
//get Attractions Without Zones || method get

router.get("/attractions-without-zone/:city", getAttractionsWithoutZones);

export default router;
