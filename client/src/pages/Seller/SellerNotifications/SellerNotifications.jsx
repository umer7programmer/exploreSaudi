import React from "react";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";
import Notifications from "../../../components/Notifications/Notifications";
import Layout from "../../../components/Layout/Layout/Layout";

const SellerNotifications = () => {
  return (
    <Layout>
      <div>
        <div className="container-fluid py-5 seller-dashboard-background">
          <div className="row gap-3 ">
            <div className="col-3">
              <SellerMenu />
            </div>
            <div className="col-8 px-5 my-5 bg-white rounded-4 pb-3">
              <Notifications role={"Seller"} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerNotifications;
