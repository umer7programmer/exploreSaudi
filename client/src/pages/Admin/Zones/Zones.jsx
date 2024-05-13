import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Zones.css";
const Zones = () => {
  const [zones, setZones] = useState([]);

  //get all zones
  const getAllZones = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/zone/get-zone");
      if (res?.data?.success) {
        setZones(res?.data?.zones);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllZones();
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
              <div className="h2 mb-5 text-color">Zones</div>
              <div className="d-flex flex-row flex-wrap gap-3">
                {zones?.map((z) => (
                  <>
                    <div className="card   " style={{ width: 280 }}>
                      <img
                        className="card-img-top w-100 "
                        style={{ height: "250px" }}
                        src={`http://localhost:8080/api/v1/zone/get-photo/${z._id}`}
                        alt="Card image"
                      />
                      <div className="card-body">
                        <p
                          className="card-title fw-bold"
                          style={{ fontSize: "17px" }}
                        >
                          {z.name}
                        </p>
                        <p className="card-text">
                          {z.description?.substring(0, 30)}...
                        </p>
                        <Link
                          className="text-decoration-none"
                          to={`/dashboard/admin/zones/${z.slug}`}
                        >
                          <button
                            className="btn text-light px-5"
                            style={{ background: "#1dbf73" }}
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Zones;
