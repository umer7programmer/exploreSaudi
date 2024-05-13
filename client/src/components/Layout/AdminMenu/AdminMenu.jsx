import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div
        className="container-fluid    rounded-3 d-flex justify-content-center align-items-center py-4"
        style={{ minHeight: "80vh", backgroundColor: "#4E894F" }}
      >
        <ul className="text-center list-unstyled ">
          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/create-plan"
            >
              Add plan
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/plans"
              activeClassName="active"
            >
              Ready Plans
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/purchased-plans"
            >
              Purchased Plan
            </NavLink>
          </li>

          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/send-notification"
            >
              Send notifications
            </NavLink>
          </li>

          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/submitted-reports"
            >
              submitted reports
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/create-category"
            >
              Create Category
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/create-attraction"
            >
              Create Attraction
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/attractions"
            >
              Attractions
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/serviceProvidersRequest"
            >
              Service Proiders
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/create-zone"
            >
              Create Zone
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/zones"
            >
              Zones
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-white text-decoration-none"
              to="/dashboard/admin/user"
            >
              Users
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink className="text-white text-decoration-none" to="/See&Do">
              Explore saudi
            </NavLink>
          </li>
          <li className="py-3 d-flex flex-column gap-2  text-light">
            <div>{auth?.user?.email}</div>
            <NavLink className="text-white text-decoration-none " to="/login">
              <span>Logout</span>
              <img
                src="/images/Logout.png"
                alt="pic not found"
                className="mx-2"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
