import { hashPassword } from "../helpers/authHelper.js";
import sellerModel from "../models/sellerModel.js";
import userModel from "../models/userModel.js";
import planModel from "../models/planModel.js";
import braintree from "braintree";
import dotenv from "dotenv";
import fs from "fs";
import sellerRequestsModel from "../models/sellerRequests.js";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANTID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//become seller controller
export const becomeSellerController = async (req, resp) => {
  try {
    const {
      firstName,
      lastName,
      email,
      providedService,
      phone,
      password,
      answer,
      city,
    } = req.fields;
    const { photo } = req.files;

    if (!firstName) {
      return resp.send({
        success: false,
        message: "first Name is required",
      });
    }
    if (!lastName) {
      return resp.send({
        success: false,
        message: "last Name is required",
      });
    }
    if (!email) {
      return resp.send({
        success: false,
        message: "email  is required",
      });
    }
    if (!password) {
      return resp.send({
        success: false,
        message: "password is required",
      });
    }

    if (!phone) {
      return resp.send({
        success: false,
        message: "phone is required",
      });
    }
    if (!city) {
      return resp.send({
        success: false,
        message: "city Name is required",
      });
    }
    if (!answer) {
      return resp.send({
        success: false,
        message: "anwser is required",
      });
    }
    if (!providedService) {
      return resp.send({
        success: false,
        message: "providedService is required",
      });
    }
    //save
    const hashPass = await hashPassword(password);

    const seller = new sellerModel({
      ...req.fields,
      password: hashPass,
      status: "pending",
    });

    seller.photo = {
      data: fs.readFileSync(photo.path),
      contentType: photo.type,
    };
    seller.save();
    const adminUser = await userModel.findOne({ role: "Admin" });

    const notification = adminUser.notification;
    notification.push({
      type: "apply-seller-request",
      message: `${seller?.firstName} ${seller?.lastName} has applied for a seller account`,
      data: {
        sellerId: seller._id,
        name: seller?.firstName + "" + seller?.lastName,
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, {
      notification,
    });

    resp.status(201).send({
      success: true,
      message: "Request submitted to admin",
      seller,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while becoming seller",
      error: error.message,
    });
  }
};

//get photo
export const getPhotoController = async (req, resp) => {
  try {
    const seller = await sellerModel.findById(req.params.id).select("photo");
    if (seller?.photo) {
      resp.set("Content-Type", seller.photo.contentType);
      return resp.status(200).send(seller?.photo?.data);
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
//cityBaseSellersController
export const cityBaseSellersController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);
    const sellers = await sellerModel.find({
      city: id,
      status: "accept",
    });
    console.warn(sellers);
    if (sellers && sellers.length > 0) {
      return resp.status(200).send({
        success: true,
        message: "Sellers get successfully",
        sellers,
      });
    } else {
      return resp.status(200).send({
        success: false,
        message: "No seller found",
        sellers,
      });
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while fetching seller",
      error: error.message,
    });
  }
};

//citiesBaseSellersController
export const citiesBaseSellersController = async (req, resp) => {
  try {
    const { cities } = req.body;

    // Extract city names from the request body
    const cityids = cities.map((city) => city.cityid);

    // Find sellers based on the city names
    const sellers = await sellerModel.find({ city: { $in: cityids } });

    resp.status(200).send({
      success: true,
      message: "Sellers found based on cities",
      sellers,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while fetching sellers",
      error: error.message,
    });
  }
};
//sendSellerRequestController

export const sendSellerRequestController = async (req, resp) => {
  try {
    const { id } = req.params;

    const { requestobject } = req.body;

    //update seller with request data
    const updateSeller = await sellerModel.findByIdAndUpdate(id, {
      $push: {
        requests: {
          attractionNames: requestobject.attractions[0].attractions,

          Date: new Date(requestobject.attractions[0].date),
        },
      },
    });
    console.warn(updateSeller);

    if (!updateSeller) {
      return resp.status(404).send({
        success: false,
        message: "Seller not found",
      });
    }
    //save updatedSeller

    await updateSeller.save();
    resp.status(201).send({
      success: true,
      message: "Request send to seller",
      updateSeller,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while Sending request to seller",
      error: error.message,
    });
  }
};

//singleSellerController
export const singleSellerController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);

    const seller = await sellerModel.findOne({ _id: id }).populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "users",
        select: "firstName",
      },
    });
    if (!seller) {
      return resp.status(404).send({
        success: false,
        message: "Seller not found",
      });
    }
    let averageRating = 0;
    const reviewsCount = seller.reviews.length;

    if (reviewsCount > 0) {
      const totalRating = seller.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      // Calculate average rating
      averageRating = totalRating / reviewsCount;
    }

    console.warn(averageRating);
    seller.averageRating = averageRating;
    seller.save();
    resp.status(200).send({
      success: true,
      message: "Seller details",
      seller,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting a single seller",
      error,
    });
  }
};

//getAllSellerController
export const getAllSellerController = async (req, resp) => {
  try {
    const sellers = await sellerModel.find();
    if (!sellers) {
      return resp.status(404).send({
        success: false,
        message: "Seller not found",
      });
    }
    resp.status(200).send({
      success: true,
      message: "Seller details",
      sellers,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting a single seller",
      error,
    });
  }
};

//updateSellerController
export const updateSellerController = async (req, resp) => {
  try {
    console.warn(req.params.id);
    const {
      firstName,
      lastName,
      password,
      providedService,
      phone,

      description,
      price,
      availability,
    } = req.fields;
    console.warn(req.fields);

    // Construct update object with non-empty fields
    const updateFields = {
      $set: {
        firstName,
        lastName,
        password,

        phone,
        providedService,
        description,
        price,
        availability,
      },
    };

    // Find and update the seller document
    const seller = await sellerModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    resp.status(201).send({
      success: true,
      message: "seller updated successfully",
      seller,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while updating  seller",
      error,
    });
  }
};

//getSellerRatingController
export const getSellerRatingController = async (req, resp) => {
  try {
    //find seller
    const sellerRating = await sellerModel
      .findById(req.user._id)
      .populate("reviews.user", "photo firstName lastName email  ");
    const reviews = sellerRating.reviews;
    if (reviews.length > 0) {
      resp.status(200).send({
        success: true,
        message: "All reviews",
        reviews,
      });
    } else {
      resp.status(200).send({
        success: false,
        message: "No reviews",
      });
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while get seller rating",
      error,
    });
  }
};
//sellerController
export const getBookingRequests = async (req, resp) => {
  try {
    const seller = await sellerModel.findById(req.user._id).populate({
      path: "planRequest",
      model: "plan",
    });
    console.warn(seller);
    const planRequest = seller.planRequest;

    if (!planRequest) {
      return resp.send({
        success: false,
        message: "No booking request",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: "Booking requests",
        planRequest,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while get booking requests",
      error,
    });
  }
};

export const getExplorerRequests = async (req, resp) => {
  try {
    console.warn(req.user._id);
    const requests = await sellerRequestsModel
      .find({
        seller: req.user._id,
      })
      .populate({
        path: "seller",
        model: "seller",
        select: "_id firstName",
      })
      .populate({
        path: "buyer",
        model: "users",
        select: "_id firstName lastName email",
      });
    console.warn(requests);

    if (!requests) {
      return resp.send({
        success: false,
        message: "No explorer request",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: "explorer requests",
        requests,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while get booking requests",
      error,
    });
  }
};

//acceptBookingRequestController
export const acceptBookingRequestController = async (req, resp) => {
  try {
    const { planId } = req.params;

    //find plan
    const plan = await planModel.findById(planId);
    if (!plan) {
      return resp.status(404).send({
        success: false,
        message: "Plan is not available",
      });
    }

    const seller = plan?.cities?.map((c) =>
      c?.sellers?.find((s) => s.seller.toString() === req.user._id.toString())
    )[0];
    console.warn(seller);
    if (!seller) {
      return resp.status(404).send({
        success: false,
        message: "Seller not found in the plan",
      });
    }

    //update seller status

    seller.status = "active";
    //delete plan request

    const sell = await sellerModel.findById(req.user._id);
    sell.planRequest = sell?.planRequest?.filter(
      (p) => p.toString() !== planId
    );
    await sell.save();

    await plan.save();

    resp.status(201).send({
      success: true,
      message: "request updated successfully",
      seller,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while accept booking requests",
      error,
    });
  }
};

//handleExplorerRequestController
export const handleExplorerRequestController = async (req, resp) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.warn(status);

    //find request
    const request = await sellerRequestsModel.findById(id);
    if (!request) {
      return resp.status(404).send({
        success: false,
        message: "Request  is not available",
      });
    }
    //send notification to explorer
    const userId = request.buyer;
    console.warn(userId);
    //find explorer
    const explorer = await userModel.findById(userId);
    const notification = explorer.notification;
    if (status === "yes") {
      notification.push({
        type: "Your booking request is accepted",
        message: `Booking request is accepted`,
      });
    } else {
      notification.push({
        type: "Your booking request is declined",
        message: `Booking request is declined`,
      });
    }
    await explorer.save();

    // delete request
    await sellerRequestsModel.findByIdAndDelete(id);

    return resp.status(201).send({
      success: true,
      message: "request handle successfully",
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while accept explorer requests",
      error,
    });
  }
};

//cancelBookingRequestController
export const cancelBookingRequestController = async (req, resp) => {
  try {
    const { planId } = req.params;

    //find plan
    const plan = await planModel.findById(planId);
    if (!plan) {
      return resp.status(404).send({
        success: false,
        message: "Plan is not available",
      });
    }
    console.warn(plan.cities);
    //remove seller from plan
    plan.cities = plan?.cities?.map((c) => {
      c.sellers = c?.sellers?.filter(
        (s) => s.seller.toString() !== req.user._id.toString()
      );
      return c;
    });

    //save update plan
    await plan.save();

    //delete plan request
    const seller = await sellerModel.findById(req.user._id);

    seller.planRequest = seller?.planRequest?.filter(
      (p) => p._id.toString() !== planId
    );
    console.warn(seller);
    resp.status(201).send({
      success: true,
      message: "booking deleted successfully",
    });
    //save update seller
    await seller.save();
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while cancel booking requests",
      error,
    });
  }
};

//getAvailableSellersController
export const getAvailableSellersController = async (req, resp) => {
  try {
    //find sellers with status available

    const sellers = await sellerModel.find({
      availability: { $in: ["available", "uponRequest"] },
    });
    if (!sellers) {
      return resp.send({
        success: false,
        message: "No available sellers",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "Available sellers",
      sellers,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while accessing available sellers",
      error,
    });
  }
};

export const brainTreeSellerPaymentController = async (req, res) => {
  try {
    const { nonce, price } = req.body;
    const { sellerId } = req.params;
    console.warn(sellerId);
    const seller = await sellerModel.findById(sellerId);
    console.warn(seller);

    gateway.transaction.sale(
      {
        amount: price,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const sellerRequest = new sellerRequestsModel({
            seller: seller?._id,
            payment: result,
            buyer: req.user._id,
          }).save();

          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getFirstThreeSellersByCity = async (req, resp) => {
  try {
    const cityId = req.params.cityId;
    console.warn(cityId);

    // Find the first seller with role 'Driver' in the specified city
    const driverSeller = await sellerModel
      .findOne({ city: cityId, providedService: "Driver" })
      .limit(1)
      .select("-photo");

    // Find the first seller with role 'Guider' in the specified city
    const guiderSeller = await sellerModel
      .findOne({ city: cityId, providedService: "Guider" })
      .limit(1)
      .select("-photo");

    // Find the first seller with role 'Translator' in the specified city
    const translatorSeller = await sellerModel
      .findOne({ city: cityId, providedService: "Translator" })
      .limit(1)
      .select("-photo");

    // Combine the results
    const sellers = [driverSeller, guiderSeller, translatorSeller];
    console.warn(sellers);
    resp.status(200).send({
      success: true,
      message:
        "First sellers for each role in the specified city retrieved successfully",
      sellers: sellers,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send({
      success: false,
      message: "Error while retrieving sellers",
      error: error.message,
    });
  }
};
