import { comaparePassword, hashPassword } from "../helpers/authHelper.js";
import attractionModel from "../models/attractionModel.js";
import sellerModel from "../models/sellerModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import fs from "fs";

export const registerController = async (req, resp) => {
  try {
    const { firstName, lastName, email, password, phone, nationality, answer } =
      req.fields;
    const { photo } = req.files;

    if (!firstName) {
      return resp.send({
        message: "First Name is required",
      });
    }
    if (!lastName) {
      return resp.send({
        message: "Last Name is required",
      });
    }
    if (!email) {
      return resp.send({
        message: "Email is required",
      });
    }

    if (!phone) {
      return resp.send({
        message: "Phone is required",
      });
    }
    if (!answer) {
      return resp.send({
        message: "Answer is required",
      });
    }

    if (!password) {
      return resp.send({
        message: "Password is required",
      });
    }

    if (!nationality) {
      return resp.send({
        message: "Nationality is required",
      });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    //check existing user
    if (existingUser) {
      return resp.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    //save
    const hashPass = await hashPassword(password);

    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashPass,
      nationality,
      phone,
      answer,
    });
    user.photo = {
      data: fs.readFileSync(photo.path),
      contentType: photo.type,
    };
    user.save();
    resp.status(201).send({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: `Error in registration ${error}`,
      error,
    });
  }
};

//login controller
export const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;
    //vaildation
    if (!email || !password) {
      return resp.send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });

    //check seller
    const seller = await sellerModel.findOne({ email });

    if (!user && !seller) {
      return resp.send({
        success: false,
        message: "Please  register",
      });
    }

    if (user) {
      //compare password

      const matchPassword = await comaparePassword(password, user.password);
      if (!matchPassword) {
        return resp.status(201).send({
          success: false,
          message: "Invalid password",
        });
      }
      // jwt token
      const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return resp.status(201).send({
        success: true,
        message: "Login successfully",
        user: {
          _id: user._id,
          firstName: user.firstName,
          email: user.email,
          phone: user.phone,

          role: user.role,

          notification: user.notification,
          seenNotification: user.seenNotification,
          photo: user.photo,
          birth: user.birth,
        },
        token,
      });
    }
    if (seller) {
      const matchPassword = await comaparePassword(password, seller.password);
      if (!matchPassword) {
        return resp.status(201).send({
          success: false,
          message: "Invalid password",
        });
      }
      // jwt token
      const token = await JWT.sign(
        { _id: seller._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );

      return resp.status(201).send({
        success: true,
        message: "Login successfully",
        user: {
          _id: seller._id,
          firstName: seller.firstName,
          email: seller.email,
          phone: seller.phone,

          city: seller.city,
          providedService: seller.providedService,
          role: seller.role,
        },
        token,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: `Error in login ${error}`,
      error,
    });
  }
};

//fogot password controller
export const forgotPasswordController = async (req, resp) => {
  try {
    const { email, answer, newPassword } = req.body;
    console.warn(email, answer, newPassword);
    if (!email) {
      return resp.send({
        message: "Email is required",
      });
    }
    if (!answer) {
      return resp.send({
        message: "Answer is required",
      });
    }
    if (!newPassword) {
      return resp.send({
        message: "NewPassword is required",
      });
    }
    //check user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return resp.send({
        success: false,
        message: "Invalid email or answer",
      });
    }
    //hash new password
    const hash = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hash });
    resp.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};
export const testController = (req, resp) => {
  resp.send("Protected Routes");
};

//searchAttractionController
export const searchAttractionController = async (req, resp) => {
  try {
    const { keyword } = req.params;
    const attractions = await attractionModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    resp.status(200).send({
      success: true,
      message: "Search attractions",
      attractions,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while searching",
      error,
    });
  }
};
