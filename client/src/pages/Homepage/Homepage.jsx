import React from "react";

import "./Homepage.css";

import Slider from "../../components/Slider/Slider";
import SaudiShowCase from "../../components/SaudiShowCase/SaudiShowCase";
import WhatToExperience from "../../components/WhatToExperience/WhatToExperience";
import InformationalLinks from "../../components/InformationalLinks/InformationalLinks";
import Layout from "../../components/Layout/Layout/Layout";
import { useAuth } from "../../context/auth";

const Homepage = () => {

  return (
    <Layout>
      {/* <div
        className="container-fluid home-page--background py-5"
        style={{ width: "100%", height: "90vh" }}
      >
        <div className="row ms-5 py-5 ">
          <div className="col-12 fw-bold text-white h1">
            Welcome To The World
            <br />
            Of Explore Saudi
          </div>

          <div className="col-6 text-white">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo magni
            pariatur deserunt obcaecati ipsam neque aliquid quibusdam debitis.
            Nulla, repellat tempore! Delectus nulla assumenda amet fugit rem
            quas ex reprehenderit.
          </div>
        </div>

        <div className="row gap-4  mt-5 ">
          <div className="col-12 h3 text-white text-center">
            Personalize Your Trip
          </div>
          <div className="col-12 h3  text-center ">
            <button
              className="btn btn-primary w-25"
              onClick={() => navigate("/create-plan")}
            >
              Create Plan
            </button>
          </div>
          <div className="col-12 h3  text-center ">
            <button className="btn btn-primary w-25">Join Share Plan</button>
          </div>
        </div>
      </div>
     */}
      {/* slider */}
      <Slider />
      {/* SaudiShowCase */}
      <SaudiShowCase />
      {/* WhatToExperience */}
      <WhatToExperience />
      {/* InformationalLinks */}
      <InformationalLinks />
    </Layout>
  );
};

export default Homepage;
