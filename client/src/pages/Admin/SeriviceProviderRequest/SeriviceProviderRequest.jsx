import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

const SeriviceProviderRequest = () => {
  const [sellers, setSellers] = useState([]);

  // get sellers
  const getSellers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/get-seller"
      );
      if (res?.data?.success) {
        setSellers(res?.data?.sellers);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // handle account status
  const handleAccountStatus = async (Id, status) => {
    try {
      console.warn("hello");
      const res = await axios.put(
        "http://localhost:8080/api/v1/admin/update-status",
        { Id, status }
      );
      if (res?.data?.success) {
        setSellers((prevValues) => {
          return prevValues?.map((s) => {
            return s._id === Id
              ? {
                  ...s,
                  status: res?.data?.seller?.status,
                }
              : s;
          });
        });

        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-8 border rounded-4 px-5  py-5">
            <div className="h2 text-color mb-5">Service Providers Requests</div>
            <div className="d-flex  flex-wrap justify-content-start gap-3">
              {sellers?.map((s) => (
                <div
                  className="card mx-2 my-3"
                  style={{ width: 280 }}
                  key={s._id}
                >
                  <img
                    className="card-img-top"
                    src={`http://localhost:8080/api/v1/seller/get-photo/${s._id}`}
                    alt="Card image"
                    width={300}
                    height={200}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-3">{s.firstName}</h5>

                    {s.status === "pending" && (
                      <>
                        <button
                          className="btn btn-success mx-1 "
                          onClick={() => handleAccountStatus(s._id, "accept")}
                        >
                          Accept
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeriviceProviderRequest;
