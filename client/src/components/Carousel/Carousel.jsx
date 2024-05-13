import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
const Carousel = ({ zones }) => {
  console.warn(zones);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className=" container d-flex flex-column gap-3">
      <h2 style={{ color: "#3A6A3B" }}>Top Rated </h2>
      <Slider {...settings} className=" container mb-5">
        {zones?.map((z) => (
          <div className="d-flex flex-column">
            <img
              style={{ height: "600px" }}
              src={`http://localhost:8080/api/v1/zone/get-photo/${z._id}`}
              alt="img not found"
            />
            <div
              className="d-flex flex-row justify-content-between py-3 px-3"
              style={{ backgroundColor: "#086348" }}
            >
              <div className="h4 text-light">{z.name}</div>
              <Link to={`/zone/${z._id}`} state={{ zoneDetail: z }}>
                <button
                  className="btn text-light "
                  style={{ background: "#1dbf73", width: "150px" }}
                >
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
