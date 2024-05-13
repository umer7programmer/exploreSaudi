import React from "react";
import Reports from "../../../components/Reports/Reports";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";
import Layout from "../../../components/Layout/Layout/Layout";

const UserReports = () => {
  return (
    <Layout>
      <div>
        <div className="container-fluid py-5 seller-dashboard-background">
          <div className="row gap-3 ">
            <div className="col-3">
              <UserMenu />
            </div>
            <div className="col-8 px-5  bg-white rounded-4 pb-3">
              <Reports />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserReports;
