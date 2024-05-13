import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AttractionType = () => {
  const location = useLocation();
  console.warn(location.state.type);
  const { type, zoneId } = location.state || {};
  console.warn(zoneId);

  const navigate = useNavigate();
  const [attractions, setAttractions] = useState([]);

  //type base attraction
  const typeBaseAttraction = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/attraction/attraction-type-zone/${type}`,
        {
          zoneId: zoneId, // Sending zoneId in the request body
        }
      );
      if (res?.data?.success) {
        setAttractions(res.data.attractions);
        console.warn(attractions);
      } else {
        setAttractions([]);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    typeBaseAttraction();
  }, [type]);
  return (
    <>
      <h4 className=" text-center mb-5 " style={{ color: "#3A6A3B" }}>
        {attractions ? (
          <>{`${attractions.length} attractions present`}</>
        ) : (
          <>No attraction found</>
        )}
      </h4>
      <div className="d-flex flex-row flex-wrap gap-3  ">
        {attractions?.map((a) => (
          <div className="card border " style={{ width: "300px" }}>
            <img
              className="card-img-top"
              style={{ width: "100%", height: "260px" }}
              src={`http://localhost:8080/api/v1/attraction/get-photo/${a._id}`}
              alt="Card image"
            />
            <div className="card-body">
              <h4 className="card-title">{a.name}</h4>
              <p className="card-text">{a.description.substring(0, 0)}...</p>
              <button
                onClick={() => navigate(`/single-attraction/${a.slug}`)}
                className="btn text-light  "
                style={{ background: "#1dbf73" }}
              >
                Book Tickets
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AttractionType;
