import React, { useEffect, useState } from "react";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";

import { useAuth } from "../../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "./SellerProfile.css";
import { Select } from "antd";

const SellerProfile = () => {
  const [auth, setAuth] = useAuth();

  const [id, setId] = useState();
  const [photo, setPhoto] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [providedService, setProvidedService] = useState("");
  const [phone, setPhone] = useState("");

  const [availability, setAvailability] = useState("");

  //get seller
  const getSeller = async () => {
    try {
      const id = auth?.user?._id;

      const res = await axios.get(
        `http://localhost:8080/api/v1/seller/get-seller/${id}`
      );

      console.warn(res?.data?.seller);
      if (res?.data?.success) {
        setId(res?.data?.seller?._id);
        setFirstName(res?.data?.seller.firstName);
        setLastName(res?.data?.seller.lastName);
        setEmail(res?.data?.seller.email);
        setPassword(res?.data?.seller.password);

        setPhone(res?.data?.seller.phone);

        setProvidedService(res?.data?.seller.providedService);
        setAvailability(res?.data?.seller.availability);
      }
    } catch (error) {}
  };

  //handleUpdate
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const sellerData = new FormData();
      sellerData.append("firstName", firstName),
        sellerData.append("lastName", lastName),
        sellerData.append("password", password),
        sellerData.append("phone", phone);
      sellerData.append("availability", availability);

      const res = await axios.put(
        `http://localhost:8080/api/v1/seller/update-seller/${auth?.user?._id}`,
        sellerData
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        getSeller();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getSeller();
  }, []);
  return (
    <>
      <div>
        <div className="container-fluid py-5 seller-dashboard-background">
          <div className="row ">
            <div className="col-3">
              <SellerMenu />
            </div>
            <div className="col-8  border rounded-4 px-5 py-5  bg-light">
              <div className="h2 mb-5 text-color ms-5">Update Profile</div>
              <div className=" d-flex flex-column gap-4 ms-5">
                <div className="d-flex flex-row gap-5 w-50 ">
                  <div className="w-50">
                    <label className="form-label">First Name</label>
                    <input
                      className="form-control "
                      type="text"
                      placeholder="Enter first Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="w-50">
                    <label className="form-label">Last Name</label>
                    <input
                      className="form-control "
                      type="text"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-50">
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
                <div className="w-50">
                  <label className="form-label">Password </label>
                  <input
                    className="form-control "
                    type="password"
                    placeholder="Enter Password Number"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="w-50">
                  <label className="form-label">Contact Number</label>
                  <input
                    className="form-control "
                    type="Number"
                    placeholder="Enter Contact Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-column">
                  <label className="form-label">Status</label>
                  <Select
                    className="w-50"
                    placeholder="Select a role"
                    size="large"
                    showSearch
                    value={availability}
                    onChange={(value) => setAvailability(value)}
                  >
                    <Option value={"available"}>Available</Option>
                    <Option value={"uponRequest"}>Upon-Request</Option>
                    <Option value={"busy"}>Busy</Option>
                  </Select>
                </div>
                <div className="w-50  mt-4">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
