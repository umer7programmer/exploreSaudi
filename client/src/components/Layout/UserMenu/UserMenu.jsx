import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const UserMenu = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div
        className="container-fluid  rounded-4 bg-white justify-content-center d-flex  justify-content-center align-items-center "
        style={{ height: "90vh" }}
      >
        <ul className="text-center list-unstyled ">
          <img
            src={`http://localhost:8080/api/v1/user/get-photo/${auth?.user?._id}`}
            className=" my-3 rounded-circle  "
            alt="logo"
            style={{ width: "35%", height: "35%" }}
          />
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/profile"
            >
              Profile
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/tickets"
            >
              Tickets
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/notifications"
            >
              Notifications
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/reports"
            >
              Report a problem
            </NavLink>
          </li>

          <li className="py-3 ">
            {" "}
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/history"
            >
              History
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/plans"
            >
              Plans
            </NavLink>
          </li>
          <li className="py-3 ">
            <NavLink
              className="text-dark text-decoration-none"
              to="/dashboard/user/purchased-plans"
            >
              Purchased Plans
            </NavLink>
          </li>
          <li className="py-3 ">
            {" "}
            <NavLink className="text-dark text-decoration-none" to="/messages">
              Messsages
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
