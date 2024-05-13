import React from "react";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";
import YourPlans from "../../../components/YourPlans/YourPlans";
import Layout from "../../../components/Layout/Layout/Layout";

const UserPlans = () => {
  return (
    <Layout>
      <div>
        <div className="container-fluid py-5  seller-dashboard-background">
          <div className="row ">
            <div className="col-3">
              <UserMenu />
            </div>
            <YourPlans />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserPlans;
