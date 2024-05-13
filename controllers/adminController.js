import reportModel from "../models/reportModel.js";
import sellerModel from "../models/sellerModel.js";
import userModel from "../models/userModel.js";

//makeAdminController
export const makeAdminController = async (req, resp) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, {
      role: "Admin",
    });
    resp.status(201).send({
      success: true,
      message: "User role updated to Admin successfully",
      user,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while making user admin",
      error,
    });
  }
};

//removeAdminController
export const removeAdminController = async (req, resp) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, {
      role: "Explorer",
    });
    resp.status(201).send({
      success: true,
      message: "User role updated to Explorer successfully",
      user,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while making user admin",
      error,
    });
  }
};

//getSellerController
export const getSellerController = async (req, resp) => {
  try {
    const sellers = await sellerModel.find({});
    resp.status(200).send({
      success: true,
      message: "Sellers list",
      sellers,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting seller",
      error,
    });
  }
};

//changeAccountStatus
export const changeAccountStatus = async (req, resp) => {
  try {
    const { Id, status } = req.body;

    console.warn(Id, status);
    const seller = await sellerModel.findByIdAndUpdate(
      Id,
      { status },
      { new: true }
    );

    const notification = seller.notification;
    notification.push({
      type: "seller-account-request-updated",
      message: `Your Seller account request has ${status}`,
    });

    await seller.save();
    resp.status(201).send({
      success: true,
      message: "Account Status updated",
      seller,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting seller",
      error: error.message,
    });
  }
};

//getAllUsersController
export const getAllUsersController = async (req, resp) => {
  try {
    const users = await userModel.find();
    resp.status(200).send({
      success: true,
      message: "All users list",
      users,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting users",
      error: error.message,
    });
  }
};

//sendNotificationController
export const sendNotificationController = async (req, resp) => {
  try {
    const { userIds, description } = req.body;
    if (!userIds || userIds.length === 0) {
      return resp.send({
        success: false,
        message: "Please select users",
      });
    }
    if (!description) {
      return resp.send({
        success: false,
        message: "Description is required",
      });
    }
    await userModel.updateMany(
      {
        _id: {
          $in: userIds,
        },
      },
      {
        $push: {
          notification: {
            description,
          },
        },
      }
    );
    await sellerModel.updateMany(
      {
        _id: {
          $in: userIds,
        },
      },
      {
        $push: {
          notification: {
            description,
          },
        },
      }
    );
    resp.status(201).send({
      success: true,
      message: "Notification send Successfully",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while sending notifications",
      error: error.message,
    });
  }
};

//getAllReportsController
export const getAllReportsController = async (req, resp) => {
  try {
    const reports = await reportModel.find({});
    resp.status(200).send({
      success: true,
      message: "All reports",
      reports,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting a reports",
      error,
    });
  }
};
//get single report
export const getSingleReportController = async (req, resp) => {
  try {
    const report = await reportModel.findOne({ _id: req.params.id });
    resp.status(200).send({
      success: true,
      message: "Report",
      report,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting a single report",
      error,
    });
  }
};

//  resolveReportController
export const resolveReportController = async (req, resp) => {
  try {
    const { id } = req.params;
    //find report by id
    const report = await reportModel.findByIdAndDelete(id);
    resp.status(200).send({
      success: true,
      message: "Report resolved successfully",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while resolving a single report",
      error,
    });
  }
};
