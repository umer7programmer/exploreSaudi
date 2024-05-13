import express from "express";
import {
  DeleteAllNotificationsController,
  getAllNotificationsController,
} from "../controllers/notificationController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  getPhotoController,
  getPurchasedHistoryController,
  getPurchasedPlanController,
  getSingleUserController,
  getTicketsController,
  ratingController,
  reportProblemController,
  updateInterestController,
  updatePartnerController,
  updateUserController,
} from "../controllers/userController.js";
import formidable from "express-formidable";
const router = express.Router();

//Get All notifications || Method post
router.post(
  "/get-notifications",
  requireSignIn,

  getAllNotificationsController
);
//GET photo || GET METHOD
router.get("/get-photo/:id", getPhotoController);

//Delere All notifications || Method post
router.post(
  "/delete-notifications",
  requireSignIn,

  DeleteAllNotificationsController
);
//Post Reports || Methos Post
router.post("/report", requireSignIn, reportProblemController);

//Get single user || Method get
router.get("/single-user/:id", requireSignIn, getSingleUserController);

//Update user || Method put
router.put(
  "/update-user/:id",
  requireSignIn,
  formidable(),
  updateUserController
);
//update user interest || Method put
router.put("/update-interest/:userId", requireSignIn, updateInterestController);

//update partner || Method put
router.put("/update-partner/:userId", requireSignIn, updatePartnerController);
//rating ||Method-POST
router.post("/rating", requireSignIn, ratingController);
//get tickets ||Method-get
router.get("/get-tickets/:id", requireSignIn, getTicketsController);
//get purchasedPlans ||Method-get
router.get(
  "/get-purchasedPlans/:id",
  requireSignIn,
  getPurchasedPlanController
);

//get purchased history || Method-get
router.get(
  "/get-purchased-history",
  requireSignIn,
  getPurchasedHistoryController
);
export default router;
