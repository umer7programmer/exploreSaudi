import React from "react";
import { useLocation } from "react-router-dom";

import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";
import Rating from "../../../components/Rating/Rating";

const SingleReview = () => {
  const location = useLocation();
  const { review } = location.state || {};
  console.warn(review);
  return (
    <>
      <div className="container-fluid   py-5 seller-dashboard-background h-100">
        <div className="row">
          <div className="col-3">
            <SellerMenu />
          </div>
          <div className="col-8 border rounded-4 px-5 py-5 bg-light">
            <div className="h2 mb-5 text-color">Review</div>
            <div className="d-flex flex-column gap-4 w-50 ">
              <div className="d-flex flex-row w-50  justify-content-between ">
                <div className="d-flex flex-column gap-2">
                  <div style={{ fontSize: "18px ", fontWeight: 500 }}>
                    First Name
                  </div>
                  <div>{review?.user?.firstName}</div>
                </div>
                <div className="d-flex flex-column gap-2 ">
                  <div style={{ fontSize: "18px ", fontWeight: 500 }}>
                    Last Name
                  </div>
                  <div>{review?.user?.lastName}</div>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div style={{ fontSize: "18px ", fontWeight: 500 }}>Email</div>
                <div>{review?.user?.email}</div>
              </div>
              <div className="d-flex flex-column gap-2 w-100 p">
                <div style={{ fontSize: "18px ", fontWeight: 500 }}>
                  Description
                </div>
                <div>{review?.reviews}</div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div style={{ fontSize: "18px ", fontWeight: 500 }}>Stars</div>
                <div>
                  <Rating rating={review?.rating} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleReview;
