import purchasedPlanModel from "../models/purchasedPlan.js";
import reportModel from "../models/reportModel.js";
import sellerModel from "../models/sellerModel.js";
import ticketModel from "../models/ticketModel.js";
import userModel from "../models/userModel.js";

//reportProblemController

export const reportProblemController = async (req, resp) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      description,
      type,
      comments,
    } = req.body;
    if (!firstName) {
      return resp.send({
        success: false,
        message: "First Name is required",
      });
    }
    if (!lastName) {
      return resp.send({
        success: false,
        message: "Last Name is required",
      });
    }
    if (!email) {
      return resp.send({
        success: false,
        message: "Email Name is required",
      });
    }
    if (!contactNumber) {
      return resp.send({
        success: false,
        message: "Contact Number is required",
      });
    }
    if (!description) {
      return resp.send({
        success: false,
        message: "Description is required",
      });
    }
    if (!type) {
      return resp.send({
        success: false,
        message: "Type is required",
      });
    }
    if (!comments) {
      return resp.send({
        success: false,
        message: "Comments are required",
      });
    }
    const report = await new reportModel({
      firstName,
      lastName,
      email,
      contactNumber,
      description,
      type,
      comments,
    }).save();
    resp.status(201).send({
      success: true,
      message: "Problem report",
      report,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while reporting a problem",
      error,
    });
  }
};

//getSingleUserController
export const getSingleUserController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);

    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    resp.status(200).send({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting a single user",
      error,
    });
  }
};
//updateUserController
export const updateUserController = async (req, resp) => {
  try {
    const { firstName, lastName, gender, birth, phone } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !firstName:
        return resp.send({
          success: false,
          message: "First Name is required",
        });
      case !lastName:
        return resp.send({
          success: false,
          message: "Last Name is required",
        });
      case !gender:
        return resp.send({
          success: false,
          message: "Gender is required",
        });
      case !birth:
        return resp.send({
          success: false,
          message: "Birth Date is required",
        });
      case !phone:
        return resp.send({
          success: false,
          message: "Contact Number is required",
        });
    }

    // Construct update object with non-empty fields
    const updateFields = {
      $set: {
        firstName,
        lastName,
        gender,
        birth,
        phone,
      },
    };

    // Find and update the user document
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    resp.status(201).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while updating user",
      error,
    });
  }
};

export const updateInterestController = async (req, resp) => {
  try {
    const { userId } = req.params;
    const { interest } = req.body;
    console.warn(interest);

    // Check user
    const user = await userModel.findById(userId);

    if (!user) {
      return resp.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user interest
    user.interest = interest;

    // Save the user
    await user.save();

    resp.status(201).json({
      success: true,
      message: "Interest Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updatePartnerController = async (req, resp) => {
  try {
    const { userId } = req.params;
    const { partners } = req.body;

    // Check user
    const user = await userModel.findById(userId);

    if (!user) {
      return resp.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user interest
    user.partners = partners;
    console.warn(partners);
    // Save the user
    await user.save();

    resp.status(201).json({
      success: true,
      message: "Partner Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//ratingController
export const ratingController = async (req, resp) => {
  try {
    const { sellerId, rating, reviews } = req.body;
    console.warn(req.body);

    // Check if user has already given a review for the seller
    const existingReview = await sellerModel.findOne({
      _id: sellerId,
      "reviews.user": req.user._id,
    });

    if (existingReview) {
      return resp.send({
        success: false,
        message: "You have already provided a review for this seller.",
      });
    }

    const newReview = {
      rating,
      reviews,
      user: req.user._id,
    };

    // Find seller and push the new review
    const seller = await sellerModel.findByIdAndUpdate(
      sellerId,
      {
        $push: {
          reviews: newReview,
        },
      },
      {
        new: true,
      }
    );

    resp.status(201).send({
      success: true,
      message: "Review added successfully",
      seller,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//getTicketsController
export const getTicketsController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);
    const tickets = await ticketModel
      .find({
        buyer: id,
      })
      .populate([
        {
          path: "attraction",
          model: "attraction",
        },
        {
          path: "buyer",
          model: "users",
        },
      ]);
    if (!tickets) {
      resp.status(404).send({
        success: false,
        message: "No ticket found",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: "Tickets get successfully",
        tickets,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//getPurchasedHistoryController
export const getPurchasedHistoryController = async (req, resp) => {
  try {
    const purchasedTicket = await ticketModel
      .find({ buyer: req?.user?._id })
      .populate("attraction", ["_id", "name", "description", "price", "slug"]);

    if (!purchasedTicket) {
      return resp.json({
        success: false,
        message: "No Purchased Ticket  found",
      });
    }

    resp.status(200).send({
      success: true,
      message: "All purchased tickets history",
      purchasedTicket,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//getPurchasedPlanController

export const getPurchasedPlanController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);
    const purchasedPlans = await purchasedPlanModel
      .find({
        buyer: id,
      })
      .populate([
        {
          path: "plan",
          model: "plan",
        },
        {
          path: "buyer",
          model: "users",
        },
      ]);
    if (!purchasedPlans) {
      resp.status(404).send({
        success: false,
        message: "No Purchased Plan found",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: "Purchased Plans get successfully",
        purchasedPlans,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get photo
export const getPhotoController = async (req, resp) => {
  try {
    const user = await userModel.findById(req.params.id).select("photo");

    if (user?.photo) {
      resp.set("Content-Type", user.photo.contentType);
      return resp.status(200).send(user?.photo?.data);
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
