import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeZones = () => {
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
    <Layout>
      <div className="container-fluid my-5">
        <h5 className="text-center my-3">
          {zones.length < 1 ? "No Zone found" : `${zones?.length} zones found`}
        </h5>
        <div className="container d-flex flex-wrap my-5 gap-4  justify-content-center">
          {zones?.map((z) => {
            return (
              <div
                className="card mx-3 pb-3"
                key={z._id}
                style={{ width: "350px" }}
              >
                <img
                  className="card-img-top"
                  style={{ height: "280px" }}
                  src={`http://localhost:8080/api/v1/zone/get-photo/${z._id}`}
                  alt="Card image"
                />
                <div className="card-body">
                  <h5 className="card-title">{z.name}</h5>
                  <p className="card-text">
                    {z.description.substring(0, 30)}...
                  </p>
                  <Link to={`/zone/${z._id}`} state={{ zoneDetail: z }}>
                    <button
                      className="btn text-light w-100 "
                      style={{ background: "#1dbf73" }}
                    >
                      View
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default HomeZones;
