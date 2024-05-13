import React from "react";
import Layout from "../../../components/Layout/Layout/Layout";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="row my-5" style={{ minHeight: "90vh" }}>
          <div className="col-3 ms-4">
            <UserMenu />
          </div>
          <div className="col-8 ms-4 " style={{ border: "2px solid black" }}>
            User
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
