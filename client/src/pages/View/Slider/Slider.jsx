import React from "react";

const Slider = () => {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active ">
            <img
              src="https://wallpaperaccess.com/full/493249.jpg"
              className="d-block w-100  "
              alt="pic not found"
              style={{ height: "100vh" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://wallpaperaccess.com/full/5304297.jpg"
              className="d-block w-100"
              alt="pic not found"
              style={{ height: "100vh" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://wallpaperaccess.com/full/5304228.jpg"
              className="d-block w-100"
              alt="pic not found"
              style={{ height: "100vh" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Slider;
