import React from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { Link } from "react-router-dom";

const TravelEssentials = () => {
  return (
    <Layout>
      <div className="container-fluid my-5">
        <div className="row " style={{ height: "80vh" }}>
          <div
            className="col-4 d-flex justify-content-center align-items-center rounded-end-2"
            style={{ background: "#3A6A3B" }}
          >
            <ul class="list-unstyled">
              <li className="p-3">
                <Link to="/exploreAll" class="text-decoration-none text-white ">
                  Explore All
                </Link>
              </li>
              <li className="p-3">
                <Link to="/aboutSaudi" class="text-decoration-none text-white ">
                  About Saudi
                </Link>
              </li>
              <li className="p-3">
                <Link
                  to="/safetyTravelTips"
                  class="text-decoration-none text-white "
                >
                  Safety Travel Tips
                </Link>
              </li>

              <li className="p-3">
                <Link
                  to="/travelRegulations"
                  class="text-decoration-none text-white"
                >
                  Travel Regulations
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-8 d-flex flex-column justify-content-center align-items-center gap-5">
            <div className="d-flex flex-row gap-5 " style={{ width: "650px" }}>
              <div className="border rounded-2 p-4">
                <div className="text-color-search my-1">
                  Words to know before you go
                </div>
                <div className="h4 my-2 mb-3">Arabic 101: Common phr...</div>
                <div className="border my-1 h-0"></div>
                <Link to="/common-phrases" className=" text-decoration-none">
                  <div
                    className=" mt-3 "
                    style={{ fontSize: "20px", color: "#3A6A3B" }}
                  >
                    Learn More
                  </div>
                </Link>
              </div>
              <div className="border rounded-2 p-4">
                <div className="text-color-search my-1">
                  What to expect,how to pack
                </div>
                <div className="h4 my-2 mb-3">Saudi wheather: What...</div>
                <div className="border my-1 h-0"></div>
                <Link to="/saudi-wheather" className=" text-decoration-none">
                  <div
                    className=" mt-3 "
                    style={{ fontSize: "20px", color: "#3A6A3B" }}
                  >
                    Learn More
                  </div>
                </Link>
              </div>
            </div>
            <div
              style={{ width: "650px" }}
              className="border rounded-2 d-flex flex-column gap-4"
            >
              <div
                className="d-flex flex-row gap-2 py-2 ps-3 align-items-center rounded-top-2"
                style={{ background: "#3A6A3B" }}
              >
                <img
                  src="./images/call.png"
                  alt="image not found"
                  style={{ width: "20px" }}
                />
                <div className="text-light">Important numbers</div>
              </div>

              <div className="d-flex flex-row justify-content-between mx-4 mb-3">
                <div
                  className="d-flex flex-column gap-1 justify-content-center align-items-center border rounded-4 p-4"
                  style={{ background: "whitesmoke" }}
                >
                  <div className="h4 text-dark">999</div>
                  <div className="text-muted">Dail code</div>
                </div>
                <div
                  className="d-flex flex-column gap-1 justify-content-center align-items-center border rounded-4 p-4"
                  style={{ background: "whitesmoke" }}
                >
                  <div className="h4 text-dark">998</div>
                  <div className="text-muted">Dail code</div>
                </div>
                <div
                  className="d-flex flex-column gap-1 justify-content-center align-items-center border rounded-4 p-4"
                  style={{ background: "whitesmoke" }}
                >
                  <div className="h4 text-dark">997</div>
                  <div className="text-muted">Dail code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TravelEssentials;
