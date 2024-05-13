import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentAttractions = () => {
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
  useEffect(() => {
    getAllAttractions();
  }, []);
  return (
    <div className="contanier-fluid my-5 py-5 ms-5">
      <h2 className="h2 ms-3 all-headings-textColor">
        Most Recent Attractions
      </h2>
      <div className="d-flex flex-row flex-wrap  mt-5 gap-5  justify-content-center">
        {attractions?.map((attraction) => (
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
  );
};

export default RecentAttractions;
