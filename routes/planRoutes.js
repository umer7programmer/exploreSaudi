import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  addUserToPlanController,
  brainTreePlanPaymentController,
  createPlanController,
  deleteUserFromPlanController,
  getAllPlansController,
  getPlanController,
  getSinglePlanController,
  getTypeBasePlanController,
} from "../controllers/planController.js";
const router = express();

//Create-plan || Mehthod post
router.post("/create", requireSignIn, createPlanController);

//Get-plan on base of user|| Mehthod Get
router.get("/get-plans/:id", requireSignIn, getPlanController);

//get single plan
router.get("/get-plan/:id", getSinglePlanController);

//get plans on base of type || Method get
router.get("/get-type-base-plan", requireSignIn, getTypeBasePlanController);

//add user to plan || Method post
router.post("/add-user/:id", requireSignIn, addUserToPlanController);

//delete user from plan || Method post
router.post("/delete-user/:id", requireSignIn, deleteUserFromPlanController);



// get all plan for admin 
router.get('/get-all-plan',requireSignIn,isAdmin,getAllPlansController)

//payment
//token
router.post(
  "/plan-payment/:planId",
  requireSignIn,
  brainTreePlanPaymentController
);

export default router;
