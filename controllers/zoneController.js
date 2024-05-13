import slugify from "slugify";
import zoneModel from "../models/zoneModel.js";
import fs from "fs";

export const createZoneController = async (req, resp) => {
  try {
    const { name, city, startDate, endDate, description, price } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !city:
        return resp.send({
          success: false,
          message: "city is required",
        });
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
      case !price:
        return resp.send({
          success: false,
          message: "Price is required",
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
    }
    const zone = new zoneModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      // Check if 'photo' property exists before accessing its properties
      if (zone.photo) {
        zone.photo.data = fs.readFileSync(photo.path);
        zone.photo.contentType = photo.type;
      } else {
        // If 'photo' property does not exist, create it
        zone.photo = {
          data: fs.readFileSync(photo.path),
          contentType: photo.type,
        };
      }
    }
    await zone.save();
    resp.status(201).send({
      success: false,
      message: "zone added successfully",
      zone,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while creating zone",
      error,
    });
  }
};

//GetAllAttractionController
export const getAllZoneController = async (req, resp) => {
  try {
    const zones = await zoneModel
      .find({})
      .select("-photo")
      .populate("city")

      .sort({ createdAt: -1 });
    resp.status(201).send({
      success: true,
      message: "All zone",
      count: zones.length,
      zones,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting all zones",
      error,
    });
  }
};
//GetSingleZoneController
export const getSingleZoneController = async (req, resp) => {
  try {
    const zone = await zoneModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("city");
    if (!zone) {
      resp.status(404).send({
        success: false,
        message: "No zone found",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: "Single zone fetched",
        zone,
      });
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting single zone",
      error,
    });
  }
};

//UpdateZoneController
export const updateZoneController = async (req, resp) => {
  try {
    const { name, city, startDate, endDate, description } = req.fields;

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
      case !description:
        return resp.send({
          success: false,
          message: "Description is required",
        });
    }

    const zone = await zoneModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    resp.status(201).send({
      success: true,
      message: "Zone updated successfully",
      zone,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while updating zone",
      error,
    });
  }
};

//DeleteAttractioncontroller
export const deleteZoneController = async (req, resp) => {
  try {
    await zoneModel.findByIdAndDelete(req.params.id).select("-photo");
    resp.status(200).send({
      success: true,
      message: "Zone deleted successfully",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while deleting Zone",
      error,
    });
  }
};

//get photo
export const getPhotoController = async (req, resp) => {
  try {
    const zone = await zoneModel.findById(req.params.id).select("photo");
    if (zone?.photo) {
      resp.set("Content-Type", zone.photo.contentType);
      return resp.status(200).send(zone?.photo?.data);
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
//getZoneWithCityController

export const getZoneWithCityController = async (req, resp) => {
  try {
    const cityId = req.params.city;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    // Find zones based on the city ID
    const zones = await zoneModel.find({ city: cityId }).select("-photo");

    // Filter zones based on the date range
    const filteredZones = zones.filter((zone) => {
      return startDate >= zone.startDate && endDate <= zone.endDate;
    });

    console.warn(filteredZones.length);
    let randomZone = null;

    if (filteredZones.length > 0) {
      // Get a random zone from the filtered zones
      const randomIndex = Math.floor(Math.random() * filteredZones.length);
      randomZone = filteredZones[randomIndex];
    }

    resp.status(200).send({
      success: true,
      message: "Zones based on city retrieved successfully",
      randomZone: randomZone,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).send({
      success: false,
      message: "Error while retrieving zones based on city",
      error: error.message,
    });
  }
};

//getZoneWithCityNameController

export const getZoneWithCityNameController = async (req, resp) => {
  try {
    const { cityName } = req.params;

    // Fetch all zones, populate associated cities
    const zones = await zoneModel.find().populate("city", "cityName"); // Populate city and select only 'cityName' field

    // Filter zones based on the city name
    const filteredZones = zones.filter((zone) => {
      console.warn("Current Zone City:", zone.city.cityName);
      return zone.city.cityName === cityName;
    });

    resp.status(200).send({
      success: true,
      message: `${cityName} zones`,
      filteredZones,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting zone on base of cityName",
      error,
    });
  }
};

//searchZoneController
export const searchZoneController = async (req, resp) => {
  try {
    const { keyword } = req.params;
    const zones = await zoneModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    resp.status(200).send({
      success: true,
      message: "Search Zones",
      zones,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while searching",
      error,
    });
  }
};
