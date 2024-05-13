import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const getSellersOnBaseOfStauts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/seller/available-sellers"
      );
      if (res?.data?.success) {
        setSellers(res.data.sellers);
      } else {
        console.warn(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getSellersOnBaseOfStauts();
  }, []);
  return (
    <Layout>
      <div className="container my-5">
        <h4 className=" my-5 w-100 text-center all-headings-textColor">
          {sellers && sellers?.length > 0 ? (
            <>{sellers?.length} seller in city</>
          ) : (
            <>No seller available</>
          )}
        </h4>
        <div className=" d-flex flex-row flex-wrap gap-5">
          {sellers?.map((seller) => {
            return (
              <div className="card mt-5" style={{ width: 350 }}>
                <img
                  className="card-img-top"
                  src={`http://localhost:8080/api/v1/seller/get-photo/${seller._id}`}
                  alt="Card image"
                  width={350}
                  height={300}
                />
                <div className="card-body">
                  <div className="card-title d-flex flex-row  justify-content-between align-items-center">
                    <h4>{seller.firstName}</h4>
                    <div className="text-primary">{seller.providedService}</div>
                  </div>
                  <div className="py-2">
                    Staus:
                    <span className="text-danger">{seller.availability}</span>
                  </div>
                  <p className="card-text ">
                    {seller?.description?.substring(0, 30)}...
                  </p>
                  <div className="d-flex flex-row gap-3  align-items-end my-3">
                    <Link to="/message" className="link text-decoration-none">
                      chat
                    </Link>
                    <img
                      src="/images/chat.png"
                      alt=""
                      style={{ width: "20px" }}
                    />
                  </div>
                  <Link to={`/single-seller/${seller?._id}`}>
                    <button
                      className="btn text-light w-100"
                      style={{ background: "#1dbf73" }}
                    >
                      Book
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Sellers;
