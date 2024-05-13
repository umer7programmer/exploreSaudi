import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout/Layout.jsx";
import AdminMenu from "../../../components//Layout/AdminMenu/AdminMenu.jsx";
import axios from "axios";
import { Select } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;
const UpdateZone = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [zones, setZones] = useState([]);
  const [cities, setCities] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescritpion] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const [photo, setPhoto] = useState("");

  const [id, setId] = useState("");

  //get all cities function
  const getAllCitiesFunction = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/cities/get");
      console.warn(res.data);
      if (res.data.success) {
        setCities(res?.data?.cities);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //GET SINGLE PRODUCT
  const getSingleZone = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/zone/get-single-zone/${params.slug}`
      );
      if (data?.success) {
        console.warn(data?.zone);
        setName(data?.zone?.name);
        setId(data?.zone?._id);
        setCity(data?.zone?.city);
        setStartDate(data?.zone?.startDate);
        setEndDate(data?.zone?.endDate);
        setPhoto(data?.res?.photo);

        setDescritpion(data?.zone?.description);
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
      console.warn(city);
      const zoneDate = new FormData();
      zoneDate.append("name", name);
      zoneDate.append("city", city._id);
      zoneDate.append("startDate", startDate);
      zoneDate.append("endDate", endDate);

      zoneDate.append("description", description);

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/zone/update-zone/${id}`,
        zoneDate
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/zones");
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
        `http://localhost:8080/api/v1/zone/delete-zone/${id}`
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/dashboard/admin/zones");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllCitiesFunction();
    getSingleZone();
  }, []);
  return (
    <>
      <div className="container-fluid py-5">
        <div className="row ">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-8 border rounded-4 px-5 py-5 ">
            <div className="h2 text-color mb-3 " style={{ color: "#3A6A3B" }}>
              Update Zones
            </div>
            <div className="">
              <Select
                className="w-50"
                placeholder="Select a city"
                value={city}
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
            <div className="my-3">
              {photo ? (
                <>
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="zone photo"
                      height={"200px"}
                      className="w-50"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <img
                      src={`http://localhost:8080/api/v1/zone/get-photo/${id}`}
                      alt="zone photo"
                      height={"200px"}
                      className="w-25"
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
                  Update Zone
                </button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>
                  Delete Zone
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateZone;
