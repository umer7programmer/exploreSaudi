import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const SellerMenu = () => {
  const [auth, setAuth] = useAuth();

  const [seller, setSeller] = useState();
  const [id, setId] = useState(auth?.user?._id);
  console.warn(id);

  const getSingleSeller = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/seller/get-seller/${id}`
      );
      if (res?.data?.success) {
        setSeller(res.data.seller);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getSingleSeller();
  }, []);
  return (
    <>
      <div
        className="container-fluid   py-5    rounded-3 d-flex justify-content-center align-items-center bg-white  "
        style={{ minHeight: "80vh" }}
      >
        <ul className="text-center list-unstyled text-dark ">
          <img
            src={`http://localhost:8080/api/v1/seller/get-photo/${auth?.user?._id}`}
            alt="logo"
            className="rounded-circle"
            style={{ width: "35%", height: "35%" }}
          />
          <li className="py-2">{seller?.firstName}</li>
          <li className="py-2 ">
            Status : <span className="text-danger">{seller?.availability}</span>
          </li>
          <li className="pb-4 h5">{seller?.providedService}</li>

          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/seller/profile"
            >
              Profile
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/seller/booking-requests"
            >
              Booking requests
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/seller/explorer-requests"
            >
              Explorer requests
            </NavLink>
          </li>

          <li className="py-3 ">
            {" "}
            <NavLink className="text-dark text-decoration-none" to="/messages">
              Messsages
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/seller/reviews"
            >
              Reviews
            </NavLink>
          </li>

          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/seller/reports"
            >
              Report a problem
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/seller/qualification"
            >
              Qualifications
            </NavLink>
          </li>
          <li className="py-3 d-flex flex-column gap-2  text-dark">
            <div>{auth?.user?.email}</div>
            <NavLink className="text-dark text-decoration-none " to="/login">
              <span>Logout</span>
              <img
                src="/images/Logout_black.png"
                alt="pic not found"
                className="mx-2"
                style={{
                  width: "17px",
                  height: "17px",
                }}
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SellerMenu;
