import React from "react";
import Layout from "../../components/Layout/Layout/Layout";
import CityBaseZones from "../../components/CityBaseZones/CityBaseZones";

const Experiences = () => {
  return (
    <Layout>
      {/* riyadh zones */}
      <CityBaseZones name={"Riyadh"} />

      {/* Jaddah zones */}
      <CityBaseZones name={"Jaddah"} />
      {/* Makkah zones */}
      <CityBaseZones name={"Makkah"} />
      {/* Madina zones */}
      <CityBaseZones name={"Madina"} />
    </Layout>
  );
};

export default Experiences;
