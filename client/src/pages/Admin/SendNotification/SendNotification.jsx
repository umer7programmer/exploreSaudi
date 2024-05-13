import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";

import { toast } from "react-toastify";

const SendNotification = () => {
  const [explorers, setExplorers] = useState([]);
  const [ServiceProviders, setServiceProviders] = useState([]);
  const [selectAllExplorers, setSelectAllExplorers] = useState(false);
  const [selectAllServiceProviders, setSelectAllServiceProviders] =
    useState(false);
  const [description, setDescritpion] = useState("");
  const [selectedExplorers, setSelectedExplorers] = useState([]);
  const [selectedServiceProviders, setSelectedServiceProviders] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/all-users"
      );
      console.warn(selectAllExplorers);

      if (res?.data?.success) {
        const explorerUsers = res.data.users.filter(
          (u) => u.role === "Explorer"
        );

        if (explorerUsers && explorerUsers.length > 0) {
          setExplorers(explorerUsers);
          console.warn(explorers);
        }
        const serviceProviderUsers = res.data.users.filter(
          (u) => u.role === "Seller"
        );
        if (serviceProviderUsers && serviceProviderUsers.length > 0) {
          setServiceProviders(serviceProviderUsers);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //get all sellers
  const getAllSellers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/seller/get-seller"
      );
      console.warn(selectAllServiceProviders);

      if (res?.data?.success) {
        setServiceProviders(res.data.sellers);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleUserSelect = (userId, role) => {
    try {
      if (role === "Explorer") {
        setSelectedExplorers((pre) => {
          if (pre.includes(userId)) {
            return pre.filter((id) => id !== userId);
          } else {
            return [...pre, userId];
          }
        });
      }
      if (role === "Seller") {
        setSelectedServiceProviders((pre) => {
          if (pre.includes(userId)) {
            return pre.filter((id) => id !== userId);
          } else {
            return [...pre, userId];
          }
        });
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //handleSelectAll
  const handleSelectAll = (role) => {
    try {
      if (role === "Explorer") {
        setSelectAllExplorers(!selectAllExplorers);

        setSelectedExplorers(
          selectAllExplorers ? [] : explorers.map((u) => u._id)
        );
      } else if (role === "Seller") {
        setSelectAllServiceProviders(!selectAllServiceProviders);
        setSelectedServiceProviders(
          selectAllServiceProviders ? [] : ServiceProviders.map((u) => u._id)
        );
      }
      console.warn(selectAllExplorers);
    } catch (error) {
      console.warn(error);
    }
  };

  //sendNotification
  const sendNotification = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/v1/admin/send-notification",
        {
          userIds: [...selectedExplorers, ...selectedServiceProviders],
          description,
        }
      );

      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllSellers();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-3">
              <AdminMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
                Announcement
              </div>
              <div>
                <label className="form-label">
                  Description <span className="text-danger"> *</span>
                </label>
                <textarea
                  className="form-control"
                  style={{ height: "200px" }}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescritpion(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-5 mb-3">
                <label className="form-check-label">Select All Explorers</label>
                <input
                  type="checkbox"
                  checked={selectAllExplorers}
                  onChange={() => handleSelectAll("Explorer")}
                  className="form-check-input ms-1"
                />
              </div>
              <table className="table table-striped table-hover w-100 ">
                <thead>
                  <tr>
                    <th>First Name</th>

                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {explorers?.map((u) => (
                    <>
                      <tr key={u._id}>
                        <td>{u.firstName}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{u.role}</td>

                        {/* to={`/dashboard/admin/attractions/${a.slug}`} */}
                        <td>
                          <input
                            type="checkbox"
                            className="ms-3 form-check-input"
                            checked={selectedExplorers.includes(u._id)}
                            onChange={() => handleUserSelect(u._id, "Explorer")}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-5">
                <button
                  className="btn text-light px-5"
                  style={{ background: "#1dbf73" }}
                  onClick={sendNotification}
                >
                  Send
                </button>
              </div>

              <div className="mt-5 mb-3">
                <label className="form-check-label">
                  Select All ServiceProviders
                </label>
                <input
                  type="checkbox"
                  checked={selectAllServiceProviders}
                  onChange={() => handleSelectAll("Seller")}
                  className="form-check-input ms-1"
                />
              </div>
              <table className="table table-striped table-hover w-100 ">
                <thead>
                  <tr>
                    <th>First Name</th>

                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ServiceProviders?.map((s) => (
                    <>
                      <tr key={s._id}>
                        <td>{s.firstName}</td>
                        <td>{s.email}</td>
                        <td>{s.phone}</td>
                        <td>{s.role}</td>

                        {/* to={`/dashboard/admin/attractions/${a.slug}`} */}
                        <td>
                          <input
                            type="checkbox"
                            className="ms-3 form-check-input"
                            checked={selectedServiceProviders.includes(s._id)}
                            onChange={() => handleUserSelect(s._id, "Seller")}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="text-center mt-5">
                <button
                  className="btn text-light px-5"
                  style={{ background: "#1dbf73" }}
                  onClick={sendNotification}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SendNotification;
