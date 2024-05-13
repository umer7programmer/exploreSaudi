import axios from "axios";
import React, { useEffect, useState } from "react";

const WhatToExperience = () => {
  const [cities, setCities] = useState([]);

  //getCities
  const getCities = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/cities/get");
      if (res?.data?.success) {
        setCities(res.data.cities);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      <div className="container-fluid py-5 my-5">
        <div className="container d-flex flex-column gap-4">
          <div className="h2">What to Experience</div>
          <div className="d-flex flex-row gap-5   ">
            {cities?.map((c, index) => (
              <div
                className="card pb-3 "
                key={index}
                style={{ width: "300px" }}
              >
                <img
                  className="card-img-top "
                  src={c?.image}
                  alt="Card image"
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <h4 className="card-title">{c?.cityName}</h4>
                  <p className="card-text">
                    {c.description.substring(0, 83)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatToExperience;
