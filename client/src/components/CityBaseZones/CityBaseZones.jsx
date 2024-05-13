import axios from "axios";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./CityBaseZones.css";
import { Link } from "react-router-dom";
const CityBaseZones = ({ name }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const [zones, setZones] = useState([]);
  const getcityBaseZone = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/zone/get-zones-cityName/${name}`
      );
      console.warn(res);
      if (res?.data?.success) {
        setZones(res.data.filteredZones);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getcityBaseZone();
  }, []);
  return (
    <>
      <div className="container-fluid my-5 py-2 ms-5">
        <h2 className="ms-3 all-headings-textColor"> {`Zones in ${name}`}</h2>
        <Slider {...settings} className="  my-5 ">
          {zones?.map((z) => (
            <Link to={`/zone/${z._id}`} state={{ zoneDetail: z }}>
              <div className=" main  ">
                <img
                  style={{ width: "360px", height: "360px" }}
                  src={`http://localhost:8080/api/v1/zone/get-photo/${z._id}`}
                  alt="Card image"
                  className="rounded-4"
                />
                <div className="body">
                  <h4 className=" h3 text-light">{z.name}</h4>
                  <p className="text-light">
                    {new Date(z.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CityBaseZones;
