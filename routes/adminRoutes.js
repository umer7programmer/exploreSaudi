import express from "express";
import {
  changeAccountStatus,
  getAllReportsController,
  getAllUsersController,
  getSellerController,
  getSingleReportController,
  makeAdminController,
  removeAdminController,
  resolveReportController,
  sendNotificationController,
} from "../controllers/adminController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();
//Make Admin || Method put
router.put("/make-admin/:id", requireSignIn, isAdmin, makeAdminController);
//Remove Admin || Method put
router.put("/remove-admin/:id", requireSignIn, isAdmin, removeAdminController);

//Get Sellers || Method Post
router.get("/get-seller", requireSignIn, getSellerController);
//Update Status || Method put
router.put("/update-status", requireSignIn, isAdmin, changeAccountStatus);

// Get all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);
//Get Reports || Method Get
router.get("/get-reports", requireSignIn, isAdmin, getAllReportsController);

//Get Single Report || Method Get
router.get(
  "/get-reports/:id",
  requireSignIn,
  isAdmin,
  getSingleReportController
);
// resolve Report || Method delete
router.delete(
  "/resolve-reports/:id",
  requireSignIn,
  isAdmin,
  resolveReportController
);

//send notifications
router.put(
  "/send-notification",
  requireSignIn,
  isAdmin,
  sendNotificationController
);

export default router;
