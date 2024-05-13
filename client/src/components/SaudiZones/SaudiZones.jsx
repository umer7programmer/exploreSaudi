import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SaudiZones.css";
import { Link } from "react-router-dom";
const SaudiZones = ({ zones }) => {
  console.warn(zones);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container my-5 py-5">
        <h2 className="all-headings-textColor">See All Saudi Zones</h2>
        <Slider {...settings} className=" container my-5">
          {zones?.map((z) => (
            <Link
              className="text-decoration-none"
              to={`/zone/${z._id}`}
              state={{ zoneDetail: z }}
            >
              <div className="card border pb-2 " style={{ width: "400px" }}>
                <img
                  className="card-img-top"
                  style={{ width: "100%", height: "350px" }}
                  src={`http://localhost:8080/api/v1/zone/get-photo/${z._id}`}
                  alt="Card image"
                />
                <div className="card-body">
                  <h4 className="card-title">{z.name}</h4>
                  <p className="card-text">
                    {z.description.substring(0, 40)}...
                  </p>
                  <button
                    className="btn text-light  w-100"
                    style={{ background: "#1dbf73" }}
                  >
                    View
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SaudiZones;
