import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../../components/Reviews/Reviews";
import AttractionReviews from "../../components/AttractionReviews/AttractionReviews";

const SinglePurchasedPlan = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState([]);

  const navigate = useNavigate();

  const getSinglePlan = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/plan/get-plan/${id}`
      );
      if (res?.data?.success) {
        setPlan(res.data.plan);

        console.warn(plan);
      } else {
        console.warn(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getSinglePlan();
  }, []);
  const handleSharePlan = () => {
    const linkToCopy = `http://localhost:5173/dashboard/user/join-share-plans`;

    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        alert("Link copied successfully: " + linkToCopy);
      })
      .catch((error) => {
        console.error("Error copying link to clipboard: ", error);
      });
  };
  return (
    <Layout>
      <div className="container my-5 py-5">
        <div className="d-flex flex-column gap-5 ">
          <div className="d-flex justify-content-end">
            <button
              className=" btn text-light d-flex flex-row  gap-3 justify-content-center align-items-center"
              style={{ background: "#1dbf73", width: "230px" }}
              onClick={handleSharePlan}
            >
              <div>Share a plan via link</div>
              <img
                src="/images/share.png"
                alt="link"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>
          <div className="d-flex flex-column gap-3">
            <div
              className="h2"
              style={{
                color: "#3A6A3B",
              }}
            >
              Cities
            </div>
            <ul>
              {plan?.cities?.map((c) => (
                <li>{c.cityName}</li>
              ))}
            </ul>
          </div>
          <div className="d-flex flex-column gap-3">
            <div
              className="h2"
              style={{
                color: "#3A6A3B",
              }}
            >
              Attractions
            </div>

            <div className="d-flex flex-row flex-wrap gap-3">
              {plan?.cities?.map((c) =>
                c?.attractions?.map((a) => (
                  <div className="d-flex flex-column gap-3">
                    <div
                      className="card border "
                      style={{ width: "300px" }}
                      key={a.attraction._id}
                    >
                      <img
                        className="card-img-top"
                        src={`http://localhost:8080/api/v1/attraction/get-photo/${a.attraction._id}`}
                        alt="Card image"
                        height={"300px"}
                      />
                      <div className="card-body">
                        <h4 className="card-title" style={{ color: "black" }}>
                          {a.attraction.name}
                        </h4>
                        <p className="card-text">
                          {a.attraction.description.substring(0, 30)}...
                        </p>
                        <h5>{a.attraction.price}</h5>
                      </div>
                    </div>
                    <div>
                      <AttractionReviews attractionId={a.attraction._id} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div
              className="h2"
              style={{
                color: "#3A6A3B",
              }}
            >
              Sellers
            </div>

            <div className="d-flex flex-row flex-wrap gap-3">
              {plan?.cities?.map((c) =>
                c?.sellers?.map((s) => (
                  <div className="d-flex flex-column gap-3 ">
                    <div
                      className="card border "
                      style={{ width: "300px" }}
                      key={s._id}
                    >
                      <img
                        className="card-img-top"
                        src={`http://localhost:8080/api/v1/seller/get-photo/${s.seller._id}`}
                        alt="Card image"
                        height={"300px"}
                      />
                      <div className="card-body">
                        <h4 className="card-title" style={{ color: "black" }}>
                          {s.seller.firstName}
                        </h4>
                        <p className="card-text">{s.status}</p>
                        <h5>{s.seller.price}</h5>
                      </div>
                    </div>
                    <div>
                      <Reviews sellerId={s.seller._id} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div
              className="h2"
              style={{
                color: "#3A6A3B",
              }}
            >
              Total Price
            </div>
            <div className="h4">{plan?.price}</div>
          </div>
          <div className="d-flex flex-column gap-4">
            <div
              className="h2"
              style={{
                color: "#3A6A3B",
              }}
            >
              Users
            </div>
            {plan?.users && plan?.users.length > 0 ? (
              <>
                <div className="d-flex flex-row flex-wrap gap-3">
                  {plan?.users?.map((u) => (
                    <div className="d-flex flex-column gap-3 align-items-center">
                      <img
                        className="rounded-circle"
                        style={{ width: "100px" }}
                        src={`http://localhost:8080/api/v1/user/get-photo/${u.userId._id}`}
                        alt="user image not found"
                      />
                      <div style={{ fontSize: "18px" }}>
                        {u.userId.firstName}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>No User joined the plan</div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SinglePurchasedPlan;
