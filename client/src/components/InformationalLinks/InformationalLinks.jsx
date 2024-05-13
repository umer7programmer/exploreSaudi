import React from "react";

const InformationalLinks = () => {
  return (
    <>
      <div className="container-fluid py-5 my-5">
        <div className="container">
          <div className="row">
            <div
              className="col-3  d-flex  flex-column gap-2   "
              style={{ height: "200px" }}
            >
              <img
                src="./images/logo.png"
                style={{ width: "200px", height: "100px" }}
                className="ms-5"
              />
              <div className="text-muted" style={{ fontSize: "14px" }}>
                Copyright © 2024 Explore Saudi. All rights are sreserved
              </div>
            </div>
            <div className="col-3  border-start d-flex flex-column gap-4 ps-5 pt-2">
              <div style={{ fontWeight: 500, fontSize: "18px" }}>
                Seasons & Events
              </div>
              <ul
                className="list-unstyled d-flex flex-column gap-2 fw-normal"
                style={{ fontSize: "15px" }}
              >
                <li>Riyadh Season</li>
                <li>Jeddah Events Calendar</li>
                <li>Diriyah Events Calendar</li>
              </ul>
            </div>
            <div className="col-3  border-start d-flex flex-column gap-4 ps-5 pt-2">
              <div style={{ fontWeight: 500, fontSize: "18px" }}>
                Discover Saudi{" "}
              </div>
              <ul
                className="list-unstyled d-flex flex-column gap-2 fw-normal"
                style={{ fontSize: "15px" }}
              >
                <li>See & Do</li>
                <li>Plan Your Trip</li>
                <li>Travel Essentials</li>
                <li>Saudi Rewards</li>
              </ul>
            </div>
            <div className="col-3 border-start d-flex flex-column gap-4 ps-5 pt-2">
              <div style={{ fontWeight: 500, fontSize: "18px" }}>
                Useful Information
              </div>
              <ul
                className="list-unstyled d-flex
                
                flex-column gap-2 fw-normal"
                style={{ fontSize: "15px" }}
              >
                <li>About Saudi</li>
                <li>Safety Travel Tips</li>
                <li>Useful Contacts</li>
                <li>Useful Contacts</li>
                <li>Travel Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationalLinks;
