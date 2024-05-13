import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout.jsx";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.jsx";
import AddZonesAndAttractions from "../AddZonesAndAttractions/AddZonesAndAttractions.jsx";
import AddSellers from "../AddSellers/AddSellers.jsx";

const ListOfCities = () => {
  const [planInfo, setPlanInfo] = useState();

  const navigate = useNavigate();

  // Function to convert dates in cities array
  const convertDatesInCities = (cities) => {
    return cities?.map((c) => ({
      ...c,
      startDate: new Date(c.startDate),
      endDate: new Date(c.endDate),
    }));
  };

  // Function to calculate total number of days for each city
  const calculateTotalDays = (city) => {
    const diffTime = Math.abs(city.endDate - city.startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Retrieve stored plan information
  const getStoredPlan = () => {
    try {
      const storedPlan = localStorage.getItem("plan");

      if (storedPlan) {
        const plan = JSON.parse(storedPlan);
        plan.startDate = new Date(plan.startDate);
        plan.endDate = new Date(plan.endDate);
        plan.cities = convertDatesInCities(plan.cities);

        // Calculate total number of days for each city
        plan.cities.forEach((city) => {
          city.totalDays = calculateTotalDays(city);
        });

        setPlanInfo(plan);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getStoredPlan();
  }, []);

  return (
    <>
      <Layout>
        <div className="container-fluid px-5 my-5">
          <div className="row gap-5">
            <div className="col-12 py-3" style={{ backgroundColor: "#6E66F6" }}>
              <div className="row text-white">
                <div className="col-4 text-center">
                  <div className="d-flex flex-row text-white w-100 justify-content-center gap-2 align-items-center">
                    <img
                      src="/images/date.png"
                      alt="pic not found"
                      style={{ width: "20px", height: "20px" }}
                    />
                    <div>{planInfo?.startDate.toLocaleDateString()}</div>
                    <div>/</div>
                    <div>{planInfo?.endDate.toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="col-4 text-center d-flex gap-2 align-items-center justify-content-center">
                  <img
                    src="./images/location.png"
                    alt="pic not found"
                    style={{ width: "20px", height: "20px" }}
                  />
                  {`${planInfo?.cities.length} destinations`}
                </div>
              </div>
            </div>
            <div className="col-12 d-flex gap-5 flex-wrap">
              {planInfo?.cities.map((city, index) => (
                <div key={index} className=" w-100 d-flex flex-column gap-5  ">
                  <h2
                    className="   text-center my-5"
                    style={{ color: "#3A6A3B" }}
                  >
                    {city.cityName}
                  </h2>
                  <div className="">
                    {Array.from({ length: city.totalDays }, (_, i) => (
                      <div
                        key={i}
                        className="d-flex flex-row gap-5  justify-content-center align-items-center"
                        style={{ height: "max-content", minHeight: "400px" }}
                      >
                        <div
                          className="left-details  my-auto"
                          style={{
                            color: "#3A6A3B",
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                        >{`Day ${i + 1}`}</div>
                        <div className="right-details">
                          <AddZonesAndAttractions
                            startDate={city.startDate}
                            endDate={city.endDate}
                            cityId={city.cityid}
                            cityName={city.cityName}
                          />
                        </div>
                      </div>
                    ))}
                    <div>
                      <AddSellers cityId={city.cityid} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12 my-5 d-flex justify-content-center">
              <button
                className="btn text-light ml-1"
                style={{ background: "#1dbf73" }}
                onClick={() => navigate("/view-plan")}
              >
                Add plan
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ListOfCities;
