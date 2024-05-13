import React from "react";

import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";

const SellerDashboard = () => {
  return (
    <>
      <div className="row my-5" style={{ minHeight: "90vh" }}>
        <div className="col-3 ms-4">
          <SellerMenu />
        </div>
        <div className="col-8 ms-4 d-flex justify-content-center align-items-center ">
          <p className="text-danger">
            This page is currently under construction. We appreciate your
            patience!
          </p>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
