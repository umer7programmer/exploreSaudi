import React from "react";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";
import Reports from "../../../components/Reports/Reports";
import Layout from "../../../components/Layout/Layout/Layout";

const SellerReports = () => {
  return (
    <>
      <div>
        <div className="container-fluid py-5 seller-dashboard-background">
          <div className="row gap-3 ">
            <div className="col-3">
              <SellerMenu />
            </div>
            <div className="col-8 px-5  bg-white rounded-4 pb-3">
              <Reports />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerReports;
