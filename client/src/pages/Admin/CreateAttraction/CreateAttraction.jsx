import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components//Layout/AdminMenu/AdminMenu.jsx";
import axios from "axios";

import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const { Option } = Select;
const CreateAttraction = () => {
  const [zones, setZones] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

  const [description, setDescritpion] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  //get all zone function
  const getAllZoneFunction = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/zone/get-zone");

      if (res.data.success) {
        setZones(res.data.zones);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //create attraction fucntion
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const attractionData = new FormData();
      // Append zone only if it's selected
      if (zone) {
        attractionData.append("zone", zone);
      }
      attractionData.append("name", name);
      attractionData.append("city", city);
      attractionData.append("startDate", startDate);
      attractionData.append("endDate", endDate);

      attractionData.append("description", description);
      photo && attractionData.append("photo", photo);
      attractionData.append("price", price);
      attractionData.append("type", category);
      console.warn(attractionData);
      const res = await axios.post(
        "http://localhost:8080/api/v1/attraction/create-attraction",
        attractionData
      );
      console.warn(res);
      if (res?.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //handleZoneSelect
  const handleZoneSelect = (value) => {
    setZone(value);

    const selectedZone = zones.find((z) => z._id === value);
    if (selectedZone) {
      setCity(selectedZone.city.cityName);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/category"
      );
      if (res?.data?.success) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getAllZoneFunction();
    getAllCategory();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid py-5">
          <div className="row ">
            <div className="col-3">
              <AdminMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
                Create Attraction
              </div>
              <div className="">
                <Select
                  className="w-50"
                  placeholder="Select a zone"
                  size="large"
                  showSearch
                  onChange={(value) => handleZoneSelect(value)}
                >
                  {zones.map((z) => {
                    return (
                      <Option key={z._id} value={z._id}>
                        {z.name}
                      </Option>
                    );
                  })}
                </Select>
                <div className="text-danger my-1">optional field*</div>
              </div>
              <div>
                <div className="my-3">
                  <label className="form-label ">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      className="form-control my-2"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>
                </div>

                <div className="my-3">
                  {photo && (
                    <div>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="attraction photo"
                        height={"200px"}
                        className="w-25"
                      />
                    </div>
                  )}
                </div>
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
                    value={city}
                    placeholder="Enter city"
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
                <div className="">
                  <Select
                    className="w-50"
                    placeholder="Type of attraction"
                    size="large"
                    showSearch
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => {
                      return (
                        <Option key={c._id} value={c.name}>
                          {c.name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>

                <div className="my-3">
                  <button
                    className="btn text-light mt-2"
                    style={{ background: "#1dbf73" }}
                    onClick={handleCreate}
                  >
                    Create Attraction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CreateAttraction;
