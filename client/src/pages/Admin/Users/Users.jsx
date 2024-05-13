import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);

  //get all users
  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/all-users"
      );
      if (res?.data?.success) {
        setUsers(res?.data?.users);
        console.warn(users);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //makeAdminHandler
  const makeAdminHandler = async (id) => {
    const res = await axios.put(
      `http://localhost:8080/api/v1/admin/make-admin/${id}`
    );
    if (res?.data?.user) {
      console.warn(res.data.user);
      toast.success(`${res.data.user.firstName} is now admin`);
      getAllUsers();
    }
  };
  //makeRemoveAdminHandler
  const makeRemoveAdminHandler = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/admin/remove-admin/${id}`
      );
      if (res?.data?.user) {
        console.warn(res.data.user);
        toast.success(`${res.data.user.firstName} is remove from admin`);
        getAllUsers();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid   py-5">
          <div className="row">
            <div className="col-3">
              <AdminMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-5 text-color">Users</div>
              <table className="table table-striped table-hover w-100">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>email</th>
                    <th>role</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((u) => (
                    <>
                      <tr key={u._id}>
                        <td>{u.firstName}</td>
                        <td>{u.email}</td>

                        <td>{u.role}</td>

                        <td>
                          {u?.role !== "Admin" ? (
                            <>
                              <button
                                className="border-0 rounded-2 px-2 py-1 text-light"
                                style={{
                                  background: "#1dbf73",
                                }}
                                onClick={() => makeAdminHandler(u._id)}
                              >
                                Make Admin
                              </button>
                            </>
                          ) : (
                            <button
                              className="border-0 rounded-2 px-2 py-1 text-light bg-danger"
                              style={{
                                background: "#1dbf73",
                              }}
                              onClick={() => makeRemoveAdminHandler(u._id)}
                            >
                              Remove Admin
                            </button>
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Users;
