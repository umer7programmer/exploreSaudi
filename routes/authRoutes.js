import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/authControllers.js";
import {
  isAdmin,
  isSeller,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";
import formidable from "express-formidable";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", formidable(), registerController);

//LOGIN || METHOD POST
router.post("/login", loginController);

//Forgot Password || Method POST
router.post("/forgot-password", forgotPasswordController);

//Protected user route auth
router.get("/user-auth", requireSignIn, (req, resp) => {
  return resp.send({
    ok: true,
  });
});
//Protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, resp) => {
  return resp.send({
    ok: true,
  });
});
//Protected seller route auth
router.get("/seller-auth", requireSignIn, isSeller, (req, resp) => {
  return resp.send({
    ok: true,
  });
});

export default router;
