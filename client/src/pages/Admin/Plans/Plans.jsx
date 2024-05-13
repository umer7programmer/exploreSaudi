import React from "react";

import YourPlans from "../../../components/YourPlans/YourPlans";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import Allplans from "../../../components/AllPlans/AllPlans";

const Plans = () => {
  return (
    <div>
      <div className="container-fluid py-5  seller-dashboard-background">
        <div className="row ">
          <div className="col-3">
            <AdminMenu />
          </div>
          {/* <YourPlans /> */}
          <Allplans/>
        </div>
      </div>
    </div>
  );
};

export default Plans;
