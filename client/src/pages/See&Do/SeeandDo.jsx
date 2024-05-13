import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import "./SeeandDo.css";

import axios from "axios";
import Carousel from "../../components/Carousel/Carousel";
import SaudiZones from "../../components/SaudiZones/SaudiZones";
import CityBaseZones from "../../components/CityBaseZones/CityBaseZones";
import RecentAttractions from "../../components/RecentAttractions/RecentAttractions";
import { useAuth } from "../../context/auth";
import Categories from "../Categories/Categories";
import { useTheme } from "../../context/ThemeContext";

const SeeandDo = () => {
  const [zones, setZones] = useState([]);
  const [auth, setAuth] = useAuth();
  console.warn(auth?.token);

  const [theme, setTheme] = useTheme();
  //handle theme
  const handleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  //get zones
  const getAllZones = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/zone/get-zone");
      if (res?.data?.success) {
        const firstSevenZones = res.data.zones.slice(0, 7);
        setZones(firstSevenZones);
      } else {
        console.warn(res.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getAllZones();
  }, []);
  return (
    <Layout>
      {/* carousel */}
      <div className="theme-btn" onClick={handleTheme}>
        {theme === "light" ? (
          <img src="/images/moon.png" width={"30px"} />
        ) : (
          <img src="/images/sun.png" width={"30px"} />
        )}
      </div>
      <Carousel zones={zones} />
      {/* Saudi zones */}
      <SaudiZones zones={zones} />
      {/* explore by categories */}
      <Categories />
      {/* riyadh zones */}
      <CityBaseZones name={"Riyadh"} />
      {/* recent attractions */}
      <RecentAttractions />
    </Layout>
  );
};

export default SeeandDo;
