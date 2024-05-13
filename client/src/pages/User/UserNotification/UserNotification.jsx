import React from "react";

import UserMenu from "../../../components/Layout/UserMenu/UserMenu";
import Notifications from "../../../components/Notifications/Notifications";

const UserNotifications = () => {
  return (
    <div>
      <div
        className="container-fluid py-5 seller-dashboard-background"
        style={{ height: "100vh" }}
      >
        <div className="row gap-3 ">
          <div className="col-3">
            <UserMenu />
          </div>
          <div className="col-8 px-5 py-5 bg-white rounded-4 pb-3">
            <Notifications role={"Explorer"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
