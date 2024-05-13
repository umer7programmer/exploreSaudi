import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components//Layout/AdminMenu/AdminMenu.jsx";
import axios from "axios";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;
const UpdateAttraction = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [attractions, setAttractions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescritpion] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");

  //get all category function
  const getAllCategoryFunction = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/category"
      );
      console.warn(res.data);
      if (res.data.success) {
        setCategories(res?.data?.categories);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //GET SINGLE PRODUCT
  const getSingleAttraction = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/attraction/get-attraction/${params.slug}`
      );
      if (data?.success) {
        console.warn(data?.attraction);
        setPhoto(data?.attraction?.photo);
        setName(data?.attraction?.name);
        setId(data?.attraction?._id);
        setCity(data?.attraction?.city);
        setStartDate(data?.attraction?.startDate);
        setEndDate(data?.attraction?.endDate);
        setPrice(data?.attraction?.price);

        setCategory(data?.attraction?.category?.name);
        setDescritpion(data?.attraction?.description);
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //create attraction fucntion
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const attractionData = new FormData();
      console.warn(photo);
      attractionData.append("name", name);
      attractionData.append("city", city);
      attractionData.append("startDate", startDate);
      attractionData.append("endDate", endDate);
      attractionData.append("category", category);
      attractionData.append("description", description);

      attractionData.append("price", price);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/attraction/update-attraction/${id}`,
        attractionData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/attractions");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //handle Delete
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/attraction/delete-attraction/${id}`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/dashboard/admin/attractions");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllCategoryFunction();
    getSingleAttraction();
  }, []);
  return (
    <>
      <div className="container-fluid py-5">
        <div className="row ">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-8 border rounded-4 px-5 py-5">
            <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
              Update Attraction
            </div>
            <div className="">
              <Select
                className="w-50"
                placeholder="Select type"
                value={category}
                size="large"
                showSearch
                onChange={(value) => setCategory(value)}
              >
                {categories.map((c) => {
                  return (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="my-3">
              {photo ? (
                <>
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="attraction photo"
                      height={"200px"}
                      className="w-50"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img
                      src={`http://localhost:8080/api/v1/attraction/get-photo/${id}`}
                      alt="attraction photo"
                      height={"200px"}
                      className="w-50"
                    />
                  </div>
                </>
              )}

              <div>
                <input
                  className="form-control w-50 my-3"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  className="form-control w-50 my-3"
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <DatePicker
                  className="form-control my-3" // Apply custom class
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  scrollableYearDropdown
                  scrollableMonthYearDropdown
                  isClearable
                  placeholderText="Enter a start date" // Placeholder text
                />
              </div>
              <div>
                <DatePicker
                  className="form-control my-3" // Apply custom class
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={new Date()}
                  scrollableYearDropdown
                  scrollableMonthYearDropdown
                  isClearable
                  placeholderText="Enter a end date" // Placeholder text
                />
              </div>
              <div className="my-3">
                <input
                  className="form-control w-50 my-3 "
                  placeholder="Enter price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="my-3">
                <textarea
                  className="form-control w-50 my-3 "
                  style={{ height: "20vh" }}
                  placeholder="Enter description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescritpion(e.target.value)}
                />
              </div>

              <div className="my-3">
                <button className="btn btn-warning" onClick={handleUpdate}>
                  Update Attraction
                </button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>
                  Delete Attraction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAttraction;
