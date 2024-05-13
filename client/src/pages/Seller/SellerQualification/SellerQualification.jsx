import React, { useEffect, useState } from "react";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";

import { Select } from "antd";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "./SellerQualification.css";

const SellerQualification = () => {
  const [auth, setAuth] = useAuth();

  const [id, setId] = useState();

  const [description, setDescritpion] = useState("");
  const [providedService, setProvidedService] = useState("");
  const [price, setPrice] = useState("");

  //get seller
  const getSeller = async () => {
    try {
      const id = auth?.user?._id;

      const res = await axios.get(
        `http://localhost:8080/api/v1/seller/get-seller/${id}`
      );

      if (res?.data?.success) {
        setId(res.data?.seller?._id);
        setPrice(res?.data?.seller?.price);
        setDescritpion(res.data?.seller?.description);
        setProvidedService(res.data?.seller?.providedService);
      }
    } catch (error) {}
  };

  //handleUpdate
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.warn(id);

    try {
      const sellerData = new FormData();

      sellerData.append("description", description);
      sellerData.append("providedService", providedService);
      sellerData.append("price", price);

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
      <div className="container-fluid py-5  seller-dashboard-background">
        <div className="row ">
          <div className="col-3">
            <SellerMenu />
          </div>
          <div className="col-8   px-5 py-5 border rounded-4   bg-light">
            <div className="h2 mb-5 text-color ms-5">Qualifications</div>
            <div className=" d-flex flex-column gap-4 ms-5">
              <div className="w-50">
                <label className="form-label">Description </label>
                <textarea
                  className="form-control  p-3"
                  rows={5}
                  type="text"
                  placeholder="Enter description "
                  value={description}
                  onChange={(e) => setDescritpion(e.target.value)}
                />
              </div>
              <div className="w-50 d-flex flex-column">
                <label className="form-label">Price</label>
                <input
                  className="form-control "
                  type="Number"
                  placeholder="Enter Price "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="d-flex flex-column">
                <label className="form-label">Role</label>
                <Select
                  className="w-50"
                  placeholder="Select a role"
                  size="large"
                  showSearch
                  value={providedService}
                  onChange={(value) => setProvidedService(value)}
                >
                  <Option value={"Driver"}>Driver</Option>
                  <Option value={"Guider"}>Guider</Option>
                  <Option value={"Translator"}>Translator</Option>
                </Select>
              </div>

              <div className="w-50  mt-4">
                <button
                  type="submit"
                  className="btn text-light w-100"
                  style={{ background: "#1dbf73" }}
                  onClick={handleUpdate}
                >
                  Update Qualification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerQualification;
