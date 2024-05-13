import React, { useEffect, useState } from "react";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";

import "./Profile.css";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../../context/auth";
import { DatePicker } from "antd";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout/Layout/Layout.jsx";
const Profile = () => {
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState(null);
  const [categoriess, setCategoriess] = useState([]);

  const [auth, setAuth] = useAuth();

  const [selectedCategoryy, setSelectedCategoryy] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState([]);

  //get user
  const getUser = async () => {
    try {
      const id = auth?.user?._id;
      const res = await axios.get(
        `http://localhost:8080/api/v1/user/single-user/${id}`
      );
      if (res?.data?.success) {
        setId(res?.data?.user?._id);
        setFirstName(res?.data?.user.firstName);
        setLastName(res?.data?.user.lastName);
        setEmail(res?.data?.user.email);
        setGender(res?.data?.user.gender);
        setBirth(res?.data?.user.birth ? moment(res?.data?.user.birth) : null);

        setPhone(res?.data?.user.phone);
      }
    } catch (error) {}
  };

  //get all category function
  const getAllCategoryFunction = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/category"
      );
      console.warn(res.data);
      if (res.data.success) {
        setCategoriess(res?.data?.categories);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //handleUpdate
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("firstName", firstName),
        userData.append("lastName", lastName),
        userData.append("gender", gender),
        userData.append("birth", birth),
        userData.append("phone", phone);

      const res = await axios.put(
        `http://localhost:8080/api/v1/user/update-user/${id}`,
        userData
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        getUser();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //toggle category
  const toggleCategory = (categoryName) => {
    try {
      setSelectedCategoryy((preVal) => {
        if (preVal.includes(categoryName)) {
          return preVal.filter((name) => name !== categoryName);
        } else {
          return [...preVal, categoryName];
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  //toggle partner
  const togglePartner = (partner) => {
    try {
      console.warn(partner);
      setSelectedPartner((preVal) => {
        if (preVal.includes(partner)) {
          return preVal.filter((name) => name !== partner);
        } else {
          return [...preVal, partner];
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };
  //handleSave
  const handleSave = async () => {
    try {
      if (selectedCategoryy.length === 0) {
        toast.info("Please select at least one interest");
        return;
      }
      const res = await axios.put(
        `http://localhost:8080/api/v1/user/update-interest/${id}`,
        { interest: selectedCategoryy }
      );
      if (res?.data?.success) {
        // Save selected categories to local storage
        localStorage.setItem(
          "selectedCategory",
          JSON.stringify(selectedCategoryy)
        );

        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //handleSavePartner
  const handleSavePartner = async () => {
    try {
      if (selectedPartner.length === 0) {
        toast.info("Please select at least one partner");
        return;
      }
      const res = await axios.put(
        `http://localhost:8080/api/v1/user/update-partner/${id}`,
        { partners: selectedPartner }
      );
      if (res?.data?.success) {
        // Save selected partner to local storage
        localStorage.setItem(
          "selectedPartner",
          JSON.stringify(selectedPartner)
        );

        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getUser();
    getAllCategoryFunction();
    const storedCategories = localStorage.getItem("selectedCategoryy");
    setSelectedCategoryy(JSON.parse(storedCategories) || []);
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid py-5 user-dashboard-background">
          <div className="row  justify-content-center align-items-center gap-3">
            <div className="col-3 ">
              <UserMenu />
            </div>
            <div
              className=" col-8 border rounded-4 bg-white d-flex flex-column gap-5 py-5 align-items-center justify-content-center    "
              style={{ minHeight: "100vh" }}
            >
              <h4 style={{ color: "#3A6A3B" }} className="text-center  w-50">
                Personal Information
              </h4>
              <div className=" d-flex flex-column gap-3  w-50  align-items-center">
                <div className="w-75 ">
                  <label className="form-label">First Name</label>
                  <input
                    className="form-control "
                    type="text"
                    placeholder="Enter first Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-75">
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-control "
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="w-75">
                  <label className="form-label">Email </label>
                  <input
                    className="form-control "
                    disabled
                    type="email"
                    placeholder="Enter Email "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-row   gap-5 my-3">
                  <div className="dropdown">
                    <button
                      className="btn  dropdown-toggle"
                      style={{ backgroundColor: "lightgray" }}
                      data-bs-toggle="dropdown"
                    >
                      {gender ? gender : "Select a gender"}
                    </button>
                    <ul className="dropdown-menu">
                      <li
                        className="dropdown-item"
                        onClick={() => setGender("Male")}
                      >
                        Male
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => setGender("Female")}
                      >
                        Female
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={() => setGender("Other")}
                      >
                        Other
                      </li>
                    </ul>
                  </div>
                  <div>
                    <DatePicker
                      style={{ backgroundColor: "lightgray" }}
                      className="form-control " // Apply custom class
                      value={birth}
                      onChange={(date) => setBirth(date)}
                      scrollableYearDropdown
                      scrollableMonthYearDropdown
                      isClearable
                      placeholderText="Date of birth"
                    />
                  </div>
                </div>
                <div className="w-75">
                  <label className="form-label">Contact Number</label>
                  <input
                    className="form-control "
                    type="Number"
                    placeholder="Enter Contact Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="w-75  mt-4">
                  <button
                    type="submit"
                    className="btn text-light w-100"
                    style={{ background: "#1dbf73" }}
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="row justify-content-center my-5">
              <div className="col-11 bg-white text-dark rounded-4">
                <div className="h4 p-5">Select your interest</div>
                <div className="d-flex flex-row flex-wrap gap-5 justify-content-center mt-2 mb-5">
                  {categoriess?.map((c) => {
                    return (
                      <>
                        <div
                          key={c._id}
                          onClick={() => toggleCategory(c.name)}
                          className=" shadow rounded-4 d-flex flex-column gap-3 justify-content-center justify-content-center align-items-center"
                          style={{
                            backgroundColor: selectedCategoryy.includes(c.name)
                              ? "darkgray"
                              : "lightgray",
                            height: "155px",
                            width: "275px",
                          }}
                        >
                          <img
                            className="rounded-circle "
                            style={{ width: "50px", height: "50px" }}
                            src={`http://localhost:8080/api/v1/category/get-photo/${c._id}`}
                            alt="pic not found"
                          />
                          {c.name}
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="w-100 text-center my-5">
                  <button
                    className="btn text-light px-5"
                    style={{ background: "#1dbf73" }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
