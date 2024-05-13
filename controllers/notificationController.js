import userModel from "../models/userModel.js";

// getAllNotifications controller
export const getAllNotificationsController = async (req, resp) => {
  try {
    const authToken = req.headers.authorization;

    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;
    resp.status(200).send({
      success: true,
      message: "All notification marks as read",
      updatedUser,
      authToken,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting notifications",
      error,
    });
  }
};

//DeleteAllNotificationsController
export const DeleteAllNotificationsController = async (req, resp) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.seenNotification = [];
    user.notification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    resp.status(200).send({
      success: true,
      message: "All notifications deleted successfully",
      updatedUser,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while deleting notifications",
      error,
    });
  }
};
