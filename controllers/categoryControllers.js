import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

import fs from "fs";
//create category controller
export const createCategoryController = async (req, resp) => {
  try {
    console.warn(req.fields);
    console.warn(req.files);
    const { name } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return resp.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    console.warn(name);
    //existing category
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return resp.status(200).send({
        success: false,
        message: "Category Already exist",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    });
    if (photo) {
      // Check if 'photo' property exists before accessing its properties
      if (category.photo) {
        category.photo.data = fs.readFileSync(photo.path);
        category.photo.contentType = photo.type;
      } else {
        // If 'photo' property does not exist, create it
        category.photo = {
          data: fs.readFileSync(photo.path),
          contentType: photo.type,
        };
      }
    }
    await category.save();

    resp.status(201).send({
      success: true,
      message: "Category created",
      category,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting category",
      error,
    });
  }
};

//get photo
export const getPhotoController = async (req, resp) => {
  try {
    const category = await categoryModel
      .findById(req.params.id)
      .select("photo");
    if (category?.photo) {
      resp.set("Content-Type", category.photo.contentType);
      return resp.status(200).send(category?.photo?.data);
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//update category
export const updateCategoryController = async (req, resp) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    resp.status(201).send({
      success: true,
      message: "Category updated Successfully",
      category,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while updating category",
    });
  }
};
//get all category
export const getAllCategoryController = async (req, resp) => {
  try {
    const categories = await categoryModel.find({});
    resp.status(200).send({
      success: true,
      message: "All categories list",
      categories,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting all categories",
    });
  }
};

//single category
export const getSingleCategoryController = async (req, resp) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    resp.status(200).send({
      success: true,
      message: "Get single category successfully",
      category,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};
//delete category
export const deleteCategoryController = async (req, resp) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    resp.status(200).send({
      success: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Erorr while deleted category",
    });
  }
};
