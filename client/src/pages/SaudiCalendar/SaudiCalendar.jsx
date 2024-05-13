import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const SaudiCalendar = () => {
  const [attractions, setAttractions] = useState([]);
  const getAllAttractions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/attraction/get-attraction"
      );
      if (res?.data?.success) {
        setAttractions(res.data.attractions);
      }
      console.warn(attractions);
    } catch (error) {
      console.warn(error);
    }
  };

  //create new date object
  const currentDate = new Date();
  //different arrays for different dates
  const thisWeek = [];
  const nextWeek = [];
  const thisMonth = [];
  const nextMonth = [];
  const afterNextMonth = [];

  attractions.forEach((attraction) => {
    const startDate = new Date(attraction.startDate);
    const endDate = new Date(attraction.endDate);

    if (startDate <= currentDate && endDate >= currentDate) {
      thisWeek.push(attraction);
    } else if (
      startDate >= currentDate &&
      startDate <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    ) {
      nextWeek.push(attraction);
    } else if (
      startDate.getMonth() === currentDate.getMonth() &&
      startDate.getFullYear() === currentDate.getFullYear()
    ) {
      thisMonth.push(attraction);
    } else if (
      (startDate.getMonth() === currentDate.getMonth() + 1 &&
        startDate.getFullYear() === currentDate.getFullYear()) ||
      (startDate.getMonth() === 0 &&
        startDate.getFullYear() === currentDate.getFullYear() + 1)
    ) {
      nextMonth.push(attraction);
    } else {
      afterNextMonth.push(attraction);
    }
  });

  useEffect(() => {
    getAllAttractions();
  }, []);
  return (
    <>
      <Layout>
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            This week attractions
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {thisWeek?.map((attraction) => (
              <Link to={`/single-attraction/${attraction.slug}`}>
                <div key={attraction._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{attraction.name}</h4>
                    <p className="text-light">
                      {new Date(attraction.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{attraction.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* next week attractions */}
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            Next week attractions
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {nextWeek?.map((attraction) => (
              <Link to={`/single-attraction/${attraction.slug}`}>
                <div key={attraction._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{attraction.name}</h4>
                    <p className="text-light">
                      {new Date(attraction.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{attraction.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* this month attractions */}
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            This Month attractions
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {thisMonth?.map((attraction) => (
              <Link to={`/single-attraction/${attraction.slug}`}>
                <div key={attraction._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{attraction.name}</h4>
                    <p className="text-light">
                      {new Date(attraction.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{attraction.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* next month attractions */}
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            Next Month attractions
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {nextMonth?.map((attraction) => (
              <Link to={`/single-attraction/${attraction.slug}`}>
                <div key={attraction._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{attraction.name}</h4>
                    <p className="text-light">
                      {new Date(attraction.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{attraction.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* after next month attractions */}
        <div className="d-flex flex-column gap-3 ms-5 my-5 py-3">
          <div className="h2 ms-2 all-headings-textColor">
            After Next Month attractions
          </div>
          <div className="d-flex flex-row flex-wrap  mt-3 gap-4 justify-content-center">
            {afterNextMonth?.map((attraction) => (
              <Link to={`/single-attraction/${attraction.slug}`}>
                <div key={attraction._id} className="main my-2 mx-2   ">
                  <img
                    style={{ width: "360px", height: "360px" }}
                    src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                    alt="Card image"
                    className="rounded-4"
                  />
                  <div className="body">
                    <h4 className=" h3 text-light">{attraction.name}</h4>
                    <p className="text-light">
                      {new Date(attraction.startDate).toLocaleDateString()}
                    </p>
                    <div className="text-light h5">{attraction.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SaudiCalendar;
