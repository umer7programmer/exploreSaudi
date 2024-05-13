import slugify from "slugify";
import attractionModel from "../models/attractionModel.js";
import fs from "fs";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import braintree from "braintree";
import ticketModel from "../models/ticketModel.js";
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANTID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createAttractionController = async (req, resp) => {
  try {
    const { name, city, startDate, endDate, description, zone, price, type } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case photo && photo > 1000000:
        return resp.send({
          success: false,
          message: "Photo is required and size must be less then 1mb",
        });
      case !name:
        return resp.send({
          success: false,
          message: "Name is required",
        });
      case !city:
        return resp.send({
          success: false,
          message: "City is required",
        });
      case !startDate:
        return resp.send({
          success: false,
          message: "StartDate is required",
        });
      case !endDate:
        return resp.send({
          success: false,
          message: "endDate is required",
        });
      case !price:
        return resp.send({
          success: false,
          message: "Price is required",
        });
      case !description:
        return resp.send({
          success: false,
          message: "Description is required",
        });

      case !type:
        return resp.send({
          success: false,
          message: "Type is required",
        });
    }
    const attraction = new attractionModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      // Check if 'photo' property exists before accessing its properties
      if (attraction.photo) {
        attraction.photo.data = fs.readFileSync(photo.path);
        attraction.photo.contentType = photo.type;
      } else {
        // If 'photo' property does not exist, create it
        attraction.photo = {
          data: fs.readFileSync(photo.path),
          contentType: photo.type,
        };
      }
    }
    await attraction.save();
    resp.status(201).send({
      success: true,
      message: "Attraction added successfully",
      attraction,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while creating attraction",
      error,
    });
  }
};

//GetAllAttractionController
export const getAllAttractionController = async (req, resp) => {
  try {
    const attractions = await attractionModel
      .find({})
      .select("-photo")

      .limit(12)
      .sort({ createdAt: -1 });

    resp.status(201).send({
      success: true,
      message: "All attractions",
      count: attractions.length,
      attractions,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting all attractions",
      error,
    });
  }
};
//GetSingleAttractionController
export const getSingleAttractionController = async (req, resp) => {
  try {
    const attraction = await attractionModel
      .findOne({ slug: req.params.slug })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "users",
          select: "firstName",
        },
      })
      .select("-photo");

    if (!attraction) {
      resp.status(404).send({
        success: false,
        message: "No attraction found",
      });
    }

    let averageRating = 0;
    const reviewsCount = attraction.reviews.length;

    if (reviewsCount > 0) {
      const totalRating = attraction.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      // Calculate average rating
      averageRating = totalRating / reviewsCount;
    }

    console.warn(averageRating); // Output the average rating
    attraction.averageRating = averageRating;
    attraction.save();

    resp.status(200).send({
      success: true,
      message: "Single attraction fetched",
      attraction,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting single attraction",
      error,
    });
  }
};

//UpdateAttractionController
export const updateAttractionController = async (req, resp) => {
  try {
    const { name, city, startDate, endDate, description, category, price } =
      req.fields;

    //validation
    switch (true) {
      case !name:
        return resp.send({
          success: false,
          message: "Name is required",
        });
      case !city:
        return resp.send({
          success: false,
          message: "Name is required",
        });
      case !startDate:
        return resp.send({
          success: false,
          message: "StartDate is required",
        });
      case !endDate:
        return resp.send({
          success: false,
          message: "endDate is required",
        });
      case !description:
        return resp.send({
          success: false,
          message: "Description is required",
        });
      case !price:
        return resp.send({
          success: false,
          message: "Price is required",
        });
      case !category:
        return resp.send({
          success: false,
          message: "Category is required",
        });
    }

    const attraction = await attractionModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    resp.status(201).send({
      success: true,
      message: "Attraction updated successfully",
      attraction,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while updating attraction",
      error,
    });
  }
};

//DeleteAttractioncontroller
export const deleteAttractionController = async (req, resp) => {
  try {
    await attractionModel.findByIdAndDelete(req.params.id).select("-photo");
    resp.status(200).send({
      success: true,
      message: "Attraction deleted successfully",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while deleting attraction",
      error,
    });
  }
};

//get photo
export const getPhotoController = async (req, resp) => {
  try {
    const attraction = await attractionModel
      .findById(req.params.id)
      .select("photo");
    if (attraction?.photo) {
      resp.set("Content-Type", attraction.photo.contentType);
      return resp.status(200).send(attraction?.photo?.data);
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

// searchZoneBasedAttractionController
export const searchZoneBasedAttractionController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);

    const attractions = await attractionModel.find({
      zone: id,
    });
    if (attractions.length === 0) {
      return resp.send({
        success: false,
        message: "There are no attractions available  in the designated zone",
      });
    }
    resp.status(200).send({
      success: true,
      message: `Attractions get successfully }`,
      attractions,
    });
  } catch (error) {
    console.warn(error),
      resp.status(500).send({
        success: false,
        message: "Error while searching attraction based on zone ",
        error,
      });
  }
};

//type-zone-BaseAttractionController
export const typezoneBaseAttractionController = async (req, resp) => {
  const { type } = req.params;
  const { zoneId } = req.body;

  console.warn(zoneId);

  try {
    const attractions = await attractionModel
      .find({ type: type, zone: zoneId })
      .select("-photo");

    if (!attractions || attractions.length === 0) {
      return resp.send({
        success: false,
        message: "No attractions found for the given category",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: `${type} attractions get successfully`,
        attractions,
      });
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while searching attraction based on type ",
      error,
    });
  }
};

//typeBaseAttractionController
export const typeBaseAttractionController = async (req, resp) => {
  const { type } = req.params;
  console.warn(type);
  console.warn(type);

  try {
    const attractions = await attractionModel
      .find({ type: type })
      .select("-photo");

    if (!attractions || attractions.length === 0) {
      return resp.send({
        success: false,
        message: "No attractions found for the given category",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: `${type} attractions get successfully`,
        attractions,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while searching attraction based on type ",
      error,
    });
  }
};

//getAttractionsByUserInterest
export const getAttractionsByUserInterest = async (req, resp) => {
  try {
    const { userId, cities } = req.body;
    console.warn(cities);
    console.warn(userId);
    const user = await userModel.findById(userId);

    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const userInterests = user.interest;

    if (!userInterests || userInterests.length === 0) {
      return resp.send({
        success: false,
        message: "User interests not found",
      });
    }
    console.warn(userInterests);
    const cityNames = cities.map((city) => city.cityName); // Extract city names from formattedCities
    console.warn(cityNames);
    // Find attractions based on user interests and city names
    const attractions = await attractionModel.find({
      type: { $in: userInterests }, // Match attractions with user interests
      city: { $in: cityNames }, // Match attractions with city names
    });
    if (!attractions || attractions.length === 0) {
      return resp.send({
        success: false,
        message: "No Attractions found",
      });
    }
    console.warn(attractions);
    resp.status(200).send({
      success: true,
      message: "Attractions found based on user interests and city names",
      attractions,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send({
      success: false,
      message: "Error while fetching attractions based on user interests",
      error,
    });
  }
};
//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, attraction } = req.body;
    console.warn(attraction);

    let newTransaction = gateway.transaction.sale(
      {
        amount: attraction?.price,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const ticket = new ticketModel({
            attraction: attraction?._id,
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
  }
};

//AddMoreAttractionsController
export const AddMoreAttractionsController = async (req, resp) => {
  try {
    const { id } = req.params;

    //find attraction
    const attraction = await attractionModel.findById(id);

    //find zone
    const zoneBaseAttracions = await attractionModel.find({
      zone: attraction.zone,
    });

    // remove current attraction from zone
    const updatezoneBaseAttracions = zoneBaseAttracions.filter(
      (attraction) => attraction._id.toString() !== id
    );
    if (updatezoneBaseAttracions.length === 0) {
      return resp.send({
        success: false,
        message: "No attractions found",
      });
    }
    resp.status(200).send({
      success: true,
      message: "Please add more attractions",
      updatezoneBaseAttracions,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while fetching more attractions ",
      error,
    });
  }
};

//attractionratingController
export const attractionRatingController = async (req, resp) => {
  try {
    const { id, rating, reviews } = req.body;

    // Check if user has already given a review for the attraction
    const existingReview = await attractionModel.findOne({
      _id: id,
      "reviews.user": req.user._id,
    });

    if (existingReview) {
      return resp.send({
        success: false,
        message: "You have already provided a review for this attraction.",
      });
    }

    const newReview = {
      rating,
      reviews,
      user: req.user._id,
    };

    // Find attraction and push the new review
    const attraction = await attractionModel.findByIdAndUpdate(
      id,
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
      attraction,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// attraction count
export const attractionCountController = async (req, resp) => {
  try {
    const total = await attractionModel.find({}).estimatedDocumentCount();
    resp.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      message: "Error in attraction count",
      error,
      success: false,
    });
  }
};

export const attractionListController = async (req, resp) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const attractions = await attractionModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    resp.status(200).send({
      success: true,
      attractions,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      message: "error in per page ctrl",
      error,
      success: false,
    });
  }
};

//getAttractionsWithoutZones
export const getAttractionsWithoutZones = async (req, resp) => {
  try {
    const cityName = req.params.city;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    console.warn(cityName);

    // Find attractions where zone field is empty and matches the city
    const attractions = await attractionModel
      .find({
        city: cityName,
        zone: null,
      })
      .select("-photo");

    // Filter attractions based on the date range
    const filteredAttractions = attractions.filter((attraction) => {
      return startDate >= attraction.startDate && endDate <= attraction.endDate;
    });

    let randomAttractions = [];
    console.warn(filteredAttractions.length);

    if (filteredAttractions.length > 0) {
      if (filteredAttractions.length <= 3) {
        // Return all available attractions if less than or equal to 3
        randomAttractions = filteredAttractions;
      } else {
        // Get three random attractions from the filtered attractions
        const randomIndices = getRandomIndices(filteredAttractions.length, 3);
        randomIndices.forEach((index) => {
          randomAttractions.push(filteredAttractions[index]);
        });
      }
    }

    resp.status(200).send({
      success: true,
      message: "Attractions based on city retrieved successfully",
      randomAttractions: randomAttractions,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send({
      success: false,
      message: "Error while retrieving attractions based on city",
      error: error.message,
    });
  }
};

// Function to generate random indices
function getRandomIndices(maxIndex, count) {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * maxIndex);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
}
