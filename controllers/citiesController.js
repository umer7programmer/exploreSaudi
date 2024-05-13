import citiesModel from "../models/citiesModel.js";

export const addCititesController = async (req, resp) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      resp.send({
        success: false,
        message: "cityName is required",
      });
    }
    const city = await new citiesModel({
      cityName,
    }).save();

    resp.status(201).send({
      success: true,
      message: "City addedd succesfully",
      city,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while adding city",
      error,
    });
  }
};
//getCitiesController
export const getCititesController = async (req, resp) => {
  try {
    const cities = await citiesModel.find({});

    resp.status(200).send({
      success: true,
      message: "Cities get succesfully",
      cities,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting cities",
      error,
    });
  }
};
