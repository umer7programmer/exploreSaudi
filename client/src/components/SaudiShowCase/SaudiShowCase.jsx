import React from "react";
import "./SaudiShowCase.css";

const SaudiShowCase = () => {
  return (
    <>
      <div className="container-fluid  py-5">
        <div className="container  d-flex flex-column gap-4">
          <div className="h2 f2-bold">See Saudi in a Variety of Ways </div>
          <div className="d-flex flex-row gap-4">
            <div style={{ height: "550px" }} className="box">
              <img
                src="https://www.visitsaudi.com/content/dam/home-page/culture-and-heritage-desktop-full-image.jpg"
                alt="pic not found"
                style={{ width: "410px", height: "550px" }}
                className="rounded-4"
              />
              <div className="title h3 text-light f2-bold">
                Culture and Heritage
              </div>
              <button className="btn   rounded-5 text-light pt-1 ">
                Explore
              </button>
            </div>
            <div style={{ height: "550px" }} className="box">
              <img
                src="https://www.visitsaudi.com/content/dam/home-page/sun-and-sea-desktop-full-image.jpg"
                alt="pic not found"
                className="rounded-4"
                style={{ width: "410px", height: "550px" }}
              />
              <div className="title h3 text-light f2-bold">Sun and Sea</div>
              <button className="btn rounded-5 text-light pt-1">Explore</button>
            </div>
            <div style={{ height: "550px" }} className="box">
              <img
                src="https://www.visitsaudi.com/content/dam/home-page/nature-and-adventure-desktop-full-image.jpg"
                alt="pic not found"
                className="rounded-4"
                style={{ width: "410px", height: "550px" }}
              />
              <div className="title h3 text-light f2-bold">
                Nature and Adventure
              </div>
              <button className="btn rounded-5 text-light pt-1">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaudiShowCase;
