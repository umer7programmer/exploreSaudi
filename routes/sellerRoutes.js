import express from "express";
import {
  acceptBookingRequestController,
  becomeSellerController,
  brainTreeSellerPaymentController,
  cancelBookingRequestController,
  citiesBaseSellersController,
  cityBaseSellersController,
  getAllSellerController,
  getAvailableSellersController,
  getBookingRequests,
  getExplorerRequests,
  getFirstThreeSellersByCity,
  getPhotoController,
  getSellerRatingController,
  handleExplorerRequestController,
  sendSellerRequestController,
  singleSellerController,
  updateSellerController,
} from "../controllers/sellerController.js";
import { isSeller, requireSignIn } from "../middlewares/authMiddlewares.js";
import formidable from "express-formidable";

const router = express.Router();

router.post("/become-seller", formidable(), becomeSellerController);
//get single seller || Method get
router.get("/get-seller/:id", singleSellerController);

//GET photo || GET METHOD
router.get("/get-photo/:id", getPhotoController);
//get all seller || Method get
router.get("/get-seller", getAllSellerController);
//update  seller || Method put
router.put(
  "/update-seller/:id",
  requireSignIn,
  formidable(),
  updateSellerController
);
//cityBaseSellersController || Method get
router.get("/get-sellers/:id", cityBaseSellersController);

//citiesBaseSellersController || Method get
router.post("/get-sellers", citiesBaseSellersController);

//sendSellerRequest || Method post
router.post("/send-seller-request/:id", sendSellerRequestController);

//available sellers || Method get
router.get("/available-sellers", getAvailableSellersController);

//getSellerRating || Method Get
router.get(
  "/seller-rating",
  requireSignIn,
  isSeller,
  getSellerRatingController
);

//get bootking requests || Method get
router.get(
  "/get-booking-requests",
  requireSignIn,
  isSeller,
  getBookingRequests
);
//get explorer requests || Method get
router.get(
  "/get-explorer-requests",
  requireSignIn,
  isSeller,
  getExplorerRequests
);
// accepst booking request || METHOD put
router.put(
  "/accept-request/:planId",
  requireSignIn,
  isSeller,
  acceptBookingRequestController
);
// handle explorer request || METHOD put
router.put(
  "/handle-explorer-request/:id",
  requireSignIn,
  isSeller,
  handleExplorerRequestController
);
// cancel booking request || METHOD put
router.delete(
  "/cancel-request/:planId",
  requireSignIn,
  isSeller,
  cancelBookingRequestController
);

//payment
//token
router.post(
  "/seller-payment/:sellerId",
  requireSignIn,
  brainTreeSellerPaymentController
);

//getFirstThreeSellersByCity
router.get("/get-FirstThreeSellersByCity/:cityId", getFirstThreeSellersByCity);
export default router;
