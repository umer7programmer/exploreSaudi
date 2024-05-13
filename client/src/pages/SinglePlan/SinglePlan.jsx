import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SinglePlan = () => {
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
        console.warn(res);

        console.warn(res);
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
  useEffect(() => {});
  return (
    <Layout>
      <div className="container my-5 py-5">
        <div className="d-flex flex-column gap-5">
          <div className="d-flex flex-column gap-3">
            <div className="h2 all-headings-textColor">Cities</div>
            <ul>
              {plan?.cities?.map((c) => (
                <li>{c.cityName}</li>
              ))}
            </ul>
          </div>
          {plan?.cities?.some((c) => c.zones.length > 0) && (
            <div className="d-flex flex-column gap-3">
              <div className="h2 all-headings-textColor">Zones</div>
              <div className="d-flex flex-row flex-wrap gap-3">
                {plan?.cities?.map((c) =>
                  c?.zones?.map((z) => (
                    <div
                      className="card border "
                      style={{ width: "400px" }}
                      key={z.zone._id}
                    >
                      <img
                        className="card-img-top"
                        src={`http://localhost:8080/api/v1/zone/get-photo/${z.zone._id}`}
                        alt="Card image"
                        height={"350px"}
                      />
                      <div className="card-body">
                        <h4 className="card-title" style={{ color: "black" }}>
                          {z.zone.name}
                        </h4>
                        <p className="card-text">
                          {z.zone.description.substring(0, 30)}...
                        </p>
                        <h5>Price : {z.zone.price}</h5>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="d-flex flex-column gap-3">
            <div className="h2 all-headings-textColor">Attractions</div>

            <div className="d-flex flex-row flex-wrap gap-3">
              {plan?.cities?.map((c) =>
                c?.attractions?.map((a) => (
                  <div
                    className="card border "
                    style={{ width: "400px" }}
                    key={a.attraction._id}
                  >
                    <img
                      className="card-img-top"
                      src={`http://localhost:8080/api/v1/attraction/get-photo/${a.attraction._id}`}
                      alt="Card image"
                      height={"350px"}
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
                ))
              )}
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="h2 all-headings-textColor">Sellers</div>

            <div className="d-flex flex-row flex-wrap gap-3">
              {plan?.cities?.map((c) =>
                c?.sellers?.map((s) => (
                  <div
                    className="card border "
                    style={{ width: "400px" }}
                    key={s._id}
                  >
                    {}
                    <img
                      className="card-img-top"
                      src={`http://localhost:8080/api/v1/seller/get-photo/${s.seller._id}`}
                      alt="Card image"
                      height={"300px"}
                    />
                    <div className="card-body">
                      <h4 className="card-title" style={{ color: "black" }}>
                        {s?.seller?.firstName}
                      </h4>
                      <p className="card-text">status : active</p>
                      <h5>Price : {s?.seller?.price}</h5>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="h2 all-headings-textColor">Total Price</div>
            <div className="h4">{plan?.price}</div>
          </div>
          <div className=" my-5">
            <div className="w-25  mx-auto text-center  ">
              <button
                className="btn text-light "
                style={{ background: "#1dbf73" }}
                onClick={() =>
                  navigate("/plan-payment", { state: { planId: plan?._id } })
                }
              >
                Purchase a plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SinglePlan;
