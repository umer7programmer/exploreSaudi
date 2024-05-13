import React, { useEffect, useState } from "react";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";
import axios from "axios";

import { toast } from "react-toastify";
import Rating from "../../../components/Rating/Rating";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout/Layout/Layout";

const SellerRating = () => {
  const [rating, setRating] = useState([]);

  //getSellerRating
  const getSellerRating = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/seller/seller-rating"
      );
      if (res?.data?.success) {
        setRating(res.data.reviews);
        console.warn(rating);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getSellerRating();
  }, []);
  return (
    <>
      <div className="container-fluid py-5 seller-dashboard-background">
        <div className="row gap-3 ">
          <div className="col-3">
            <SellerMenu />
          </div>
          <div className="col-8 px-5  bg-white rounded-4 pb-3">
            <div className="container-fluid my-5">
              <div className="container">
                <div className=" mx-auto h4" style={{ width: "230px" }}>
                  {rating ? (
                    <>
                      <div style={{ color: "#3A6A3B" }}>
                        {rating?.length} reviews
                      </div>
                    </>
                  ) : (
                    <>
                      <div>No reviews</div>
                    </>
                  )}
                </div>
                <div className=" my-5 d-flex flex-row flex-wrap gap-4">
                  {rating?.map((r) => {
                    return (
                      <div className="card" style={{ width: 250 }}>
                        <img
                          className="card-img-top"
                          src={`http://localhost:8080/api/v1/user/get-photo/${r?.user?._id}`}
                          alt="Card image"
                        />
                        <div className="card-body">
                          <h4 className="card-title">{r.user.firstName}</h4>
                          <p className="card-text">
                            {r.reviews.substring(0, 50)}...
                          </p>
                          <div>
                            <Rating rating={r.rating} />
                          </div>
                          <Link
                            to="/dashboard/seller/single-review"
                            state={{ review: r }}
                          >
                            <button
                              className="btn text-light mt-3 w-100"
                              style={{ background: "#1dbf73" }}
                            >
                              View
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerRating;
