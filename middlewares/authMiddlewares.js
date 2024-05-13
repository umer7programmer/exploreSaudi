import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import sellerModel from "../models/sellerModel.js";
//Protected routes token base
export const requireSignIn = async (req, resp, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );

    req.user = decode;
    console.warn("warn",req.user._id);

    next();
  } catch (error) {
    resp.status(500).send({
      success: false,
      error,
    });
  }
};

export const isAdmin = async (req, resp, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== "Admin") {
      resp.status(401).send({
        success: false,
        message: "Unauthorize access",
      });
    } else {
      next();
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
//seller middleware
export const isSeller = async (req, resp, next) => {
  try {
    console.warn(req.user._id);
    const seller = await sellerModel.findById(req.user._id);
    if (!seller) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error in seller middleware",
      error,
    });
  }
};
