import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import axios from "axios";
import Layout from "../../components/Layout/Layout/Layout";

const Zone = () => {
  const location = useLocation();

  const { zoneDetail } = location.state || {};
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const [attractions, setAttractions] = useState([]);
  const [zone, setZone] = useState({});

  //get single attraction
  const getSingleAttraction = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/zone/get-single-zone/${zoneDetail.slug}`
      );
      if (res?.data?.success) {
        setZone(res.data.zone);
        localStorage.setItem("zone", JSON.stringify(res.data.zone));
        console.warn(zone);
      } else {
        console.warn(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //get attractions on base of zone
  const getZoneBaseAttractions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/attraction/search-attractions/${id}`
      );
      if (res?.data?.success) {
        setAttractions(res.data.attractions);
        console.warn(attractions);
      } else {
        console.warn(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //get all category function
  const getAllCategoryFunction = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/category"
      );
      console.warn(res.data);
      if (res.data.success) {
        setCategories(res?.data?.categories);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getSingleAttraction();
    getZoneBaseAttractions();
    getAllCategoryFunction();
  }, []);
  useEffect(() => {
    const zone = localStorage.getItem("zone");
    if (zone) {
      const parseData = JSON.parse(zone);
      setZone(parseData);
    }
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid my-5">
          <div className="row d-flex flex row justify-content-center gap-3 ">
            <div
              className="col-3 border p-0 rounded-2 d-flex flex-column gap-4 align-items-center pb-5"
              style={{ minHeight: "80vh", backgroundColor: "#086348" }}
            >
              <img
                className="w-100 rounded-2"
                style={{ height: "350px" }}
                src={`http://localhost:8080/api/v1/zone/get-photo/${zone?._id}`}
                alt="zone image not found"
              />
              <div
                style={{ width: "90%" }}
                className="d-flex flex-column gap-4 align-items-center"
              >
                <div className="h4 text-light">{zone?.name}</div>

                <div className="text-light text-start">{zone?.description}</div>
                <div className="border w-100"></div>
                <div className="d-flex flex-column text-light align-items-start  w-100">
                  <div className="h4">Starting from</div>
                  <div>{new Date(zone?.startDate).toLocaleDateString()}</div>
                </div>
                <div className="border w-100"></div>
                <div className="d-flex flex-column text-light align-items-start  w-100">
                  <div className="h4">Location</div>
                  <div>{zone.name}</div>
                </div>
                <div className="border w-100"></div>
                <div className="d-flex flex-column text-light align-items-start  w-100">
                  <div className="h4">Terms & Conditions</div>
                  <div>
                    In purchasing this ticket, you agree to abide by all the
                    terms and conditions and adhere to any other
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 border py-5 rounded-2">
              <div className="h3 ps-3">{`Things to do in City`}</div>

              <ul className="list-unstyled d-flex flex-row gap-2 py-4 ps-3">
                {categories?.map((c) => (
                  <Link
                    className="text-decoration-none"
                    to={c?.slug}
                    state={{ type: c?.name, zoneId: id }}
                  >
                    <li
                      className="text-decoration-none px-3 py-1 text-light border rounded-4"
                      style={{
                        backgroundColor: "#1dbf73",
                      }}
                    >
                      {c.name}
                    </li>
                  </Link>
                ))}
              </ul>
              <div className="my-5  ps-3">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Zone;
