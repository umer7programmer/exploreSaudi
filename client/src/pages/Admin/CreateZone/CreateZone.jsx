import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components//Layout/AdminMenu/AdminMenu.jsx";
import axios from "axios";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateZone.css";

import { toast } from "react-toastify";
const { Option } = Select;
const CreateZone = () => {
  const [cities, setCities] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState();

  const [description, setDescritpion] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [price, setPrice] = useState();

  const [photo, setPhoto] = useState("");

  //get cities
  const getCities = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/cities/get");
      if (res?.data?.success) {
        setCities(res?.data?.cities);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //create zone fucntion
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      console.warn(
        name,
        city,

        startDate,
        endDate,
        description,
        photo
      );

      const zoneData = new FormData();
      zoneData.append("name", name);
      zoneData.append("price", price);
      zoneData.append("city", city);
      zoneData.append("startDate", startDate);
      zoneData.append("endDate", endDate);

      zoneData.append("description", description);
      zoneData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/zone/create-zone",
        zoneData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid my-5">
          <div className="row ">
            <div className="col-3">
              <AdminMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-5 text-color">Create Zone</div>
              <div className="">
                <Select
                  className="w-50"
                  placeholder="Select a city"
                  size="large"
                  showSearch
                  onChange={(value) => setCity(value)}
                >
                  {cities.map((c) => {
                    return (
                      <Option key={c._id} value={c._id}>
                        {c.cityName}
                      </Option>
                    );
                  })}
                </Select>
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
                        alt="zone photo"
                        height={"200px"}
                        className="w-50"
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
                <div>
                  <input
                    className="form-control w-50 my-3"
                    type="text"
                    placeholder="Enter price"
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
                  <button
                    className="btn text-light"
                    style={{ background: "#1dbf73" }}
                    onClick={handleCreate}
                  >
                    Create Zone
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

export default CreateZone;
