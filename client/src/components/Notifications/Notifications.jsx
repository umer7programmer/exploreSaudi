import React, { useEffect } from "react";

import { Tabs } from "antd";

import axios from "axios";

import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const Notifications = ({ role }) => {
  console.warn(role);
  const [auth, setAuth] = useAuth();

  //get all notifications
  const handleMarkAllRead = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/get-notifications",
        {
          userId: auth?.user?._id,
          role: role,
        }
      );
      console.warn(res.data.success);
      if (res?.data?.success) {
        toast.success(res?.data?.message);

        setAuth((preValues) => {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              ...preValues,
              user: res?.data?.updatedUser,
            })
          );
          return {
            ...preValues,
            user: res?.data?.updatedUser,
          };
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //handleDeleteAllRead
  const handleDeleteAllRead = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/delete-notifications",
        {
          userId: auth?.user?._id,
        }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);

        setAuth((prevAuth) => {
          // Update local storage and return the updated state directly
          localStorage.setItem(
            "auth",
            JSON.stringify({
              ...prevAuth,
              user: res?.data?.updatedUser,
            })
          );

          return {
            ...prevAuth,
            user: res?.data?.updatedUser,
          };
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column gap-3 align-items-center">
        <div className="h2 ">Notifications</div>
        <div className="my-3 d-flex flex-row gap-3 ">
          <span
            className=" me-2"
            onClick={handleMarkAllRead}
            style={{ cursor: "pointer" }}
          >
            Mark All Read
          </span>
          <span
            className=""
            onClick={handleDeleteAllRead}
            style={{ cursor: "pointer" }}
          >
            Delete All Read
          </span>
        </div>
        <Tabs className="w-75 border p-3 rounded-3">
          <Tabs.TabPane tab="unRead" key={0}>
            <div className="w-100 d-flex flex-column gap-4">
              {" "}
              {auth?.user?.notification?.map((n) => {
                return (
                  <div className="card border  " key={n._id}>
                    <div className="card-body">
                      <div className="card-text text-dark">{n.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="w-100 d-flex flex-column gap-4">
              {auth?.user?.seenNotification?.map((n) => {
                return (
                  <div className="card border-0 border-bottom" key={n._id}>
                    <div className="card-body">
                      <div className="card-text">{n.message}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Notifications;
