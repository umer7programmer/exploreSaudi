import React, { useEffect, useState } from "react";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu";
import Layout from "../../../components/Layout/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const History = () => {
  const [purchased, setPurchased] = useState([]);

  //get purchased history
  const getPurchasedHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/get-purchased-history"
      );
      if (res?.data?.success) {
        setPurchased(res.data.purchasedTicket);
        console.warn(purchased);
      } else {
        setPurchased([]);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getPurchasedHistory();
  }, []);
  return (
    <Layout>
      <div>
        <div className="container-fluid py-5 seller-dashboard-background">
          <div className="row gap-3 ">
            <div className="col-3">
              <UserMenu />
            </div>
            <div className="col-8 px-5  bg-white rounded-4 pb-3">
              <div className="h2 my-4" style={{ color: "#3A6A3B" }}>
                History
              </div>

              {purchased.length === 0 ? (
                <>
                  <h4 className="text-center my-5" style={{ color: "#3A6A3B" }}>
                    No purchased history
                  </h4>
                </>
              ) : (
                <>
                  <div className="d-flex flex-row flex-wrap gap-5">
                    {purchased?.map((p) => (
                      <>
                        <div className="card   " style={{ width: 280 }}>
                          <img
                            className="card-img-top w-100 "
                            style={{ height: "250px" }}
                            src={`http://localhost:8080/api/v1/attraction/get-photo/${p.attraction._id}`}
                            alt="Card image"
                          />
                          <div className="card-body">
                            <p
                              className="card-title fw-bold"
                              style={{ fontSize: "17px" }}
                            >
                              {p.attraction.name}
                            </p>
                            <p className="card-text">
                              {p.attraction.description?.substring(0, 50)}...
                            </p>
                            <Link
                              className="text-decoration-none"
                              to={`/single-attraction/${p.attraction.slug}`}
                            >
                              <button
                                className="btn text-light px-5"
                                style={{ background: "#1dbf73" }}
                              >
                                View
                              </button>
                            </Link>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
