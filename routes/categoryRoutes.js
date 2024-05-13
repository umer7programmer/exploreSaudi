import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getPhotoController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryControllers.js";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
const router = express.Router();

//Create category || Method Post
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);

//GET photo || GET METHOD
router.get("/get-photo/:id", getPhotoController);

//Update category || Method Put
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
//Get All category || Method get
router.get("/category", getAllCategoryController);
//Get Single category || Method get
router.get("/category/:slug", getSingleCategoryController);
//Delete category || Method delete
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
