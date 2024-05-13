import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

const ViewPlan = () => {
  const [planInfo, setPlanInfo] = useState(null);
  const [auth, setAuth] = useAuth();

  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const getStoredPlan = () => {
    try {
      const storedPlan = localStorage.getItem("plan");

      if (storedPlan) {
        const plan = JSON.parse(storedPlan);

        plan.startDate = new Date(plan.startDate);
        plan.endDate = new Date(plan.endDate);

        setPlanInfo(plan);
        calculateTotalPrice(plan);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //

  //calcualte total price
  const calculateTotalPrice = (plan) => {
    let attractionsPrice = 0;
    let sellersPrice = 0;
    let zonePrice = 0;

    //calculate prices
    plan?.cities?.forEach((c) => {
      c.attractions?.forEach((a) => {
        attractionsPrice += a.price || 0;
      });

      c.zones?.forEach((z) => {
        zonePrice += z.price || 0;
      });

      c.sellers?.forEach((s) => {
        sellersPrice += s.price || 0;

        //check inactive seller
        if (s.status === "inactive") {
          setInactiveSeller(true);
        }
      });
    });
    const totalPrice = attractionsPrice + sellersPrice + zonePrice;
    setTotalPrice(totalPrice);
    console.warn(totalPrice);
  };
  //handleCreatePlan
  const handleCreatePlan = async () => {
    try {
      console.warn(planInfo.cities);
      const res = await axios.post("http://localhost:8080/api/v1/plan/create", {
        userId: auth?.user?._id,
        planName: planInfo.planName,
        planGenerationType: planInfo.planGenerationType,
        planType: planInfo.planType,
        capacity: planInfo.capacity,
        startDate: planInfo.startDate,
        endDate: planInfo.endDate,
        cities: planInfo.cities,
        price: totalPrice,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);

        //delete items from localstorage
        localStorage.removeItem("selectedAttractions");
        localStorage.removeItem("selected-sellers");
        localStorage.removeItem("selected-zones");
        localStorage.removeItem("plan");

        if (auth?.user?.role === "Admin") {
          navigate("/dashboard/admin/plans");
        } else {
          navigate("/dashboard/user/plans");
        }
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getStoredPlan();
  }, []);
  return (
    <Layout>
      <div className="container  my-5">
        <div className="row gap-5">
          <div className="col-12  py-3" style={{ backgroundColor: "#6E66F6" }}>
            <div className="row text-white">
              <div className="col-4 text-center">
                <div className="d-flex flex-row text-white  w-100 justify-content-center gap-2 align-items-center  ">
                  <img
                    src="/images/date.png"
                    alt="pic not found"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <div>{planInfo?.startDate.toLocaleDateString()}</div>
                  <div>/</div>
                  <div>{planInfo?.endDate.toLocaleDateString()}</div>
                </div>
              </div>
              <div className="col-4 text-center d-flex gap-2 align-items-center  justify-content-center">
                <img
                  src="./images/location.png"
                  alt="pic not found"
                  style={{ width: "20px", height: "20px" }}
                />
                {`${planInfo?.cities.length} destinations`}
              </div>
              {/* 
                <div className="col-4 text-center ">{planInfo?.planType}</div> */}
            </div>
          </div>
          <div className="col-12 d-flex  gap-5 flex-wrap">
            {planInfo?.cities?.map((c) => {
              const cityId = c.cityid;
              console.warn(cityId);
              return (
                <div className="w-100 d-flex flex-column gap-3 ">
                  <div className="h4">{c.cityName}</div>
                  <div className="border w-100"></div>
                  <div className="d-flex flex-column gap-4 my-3">
                    <div className="h5 ">List of attractions</div>
                    {c?.attractions?.map((a) => (
                      <div
                        className=" d-flex flex-column gap-3 ms-5 "
                        style={{
                          width: "90%",
                        }}
                      >
                        <img
                          src={`http://localhost:8080/api/v1/attraction/get-photo/${a.attraction}`}
                          style={{
                            height: "200px",
                          }}
                          alt="attraction image not found"
                        />
                        <div className="fw-bold">{a.name}</div>
                        <div>{a.description}</div>
                        <div className="h6">
                          {new Date(a.startDate).toLocaleDateString()}
                        </div>
                        <div className="d-flex flex-row justify-content-end">
                          <div>
                            <button
                              className="btn text-light"
                              style={{ background: "#1dbf73", width: "150px" }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                        <div className="border"></div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex flex-column gap-4 my-3">
                    <div className="h5 ">List of Zones</div>
                    {c?.zones?.map((z) => (
                      <div
                        className=" d-flex flex-column gap-3 ms-5 "
                        style={{
                          width: "90%",
                        }}
                      >
                        <img
                          src={`http://localhost:8080/api/v1/zone/get-photo/${z?.zone}`}
                          style={{
                            height: "200px",
                          }}
                          alt="attraction image not found"
                        />
                        <div className="fw-bold">{z?.name}</div>
                        <div>{z?.description}</div>
                        <div className="h6">
                          {new Date(z?.startDate).toLocaleDateString()}
                        </div>
                        <div className="d-flex flex-row justify-content-end">
                          <div>
                            <button
                              className="btn text-light"
                              style={{ background: "#1dbf73", width: "150px" }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                        <div className="border"></div>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex flex-column gap-4 my-3">
                    <div className="h5">List of sellers</div>
                    <div className="d-flex flex-row flex-wrap gap-3  ">
                      {c.sellers?.map((s) => (
                        <div>
                          <div className="card" style={{ width: 300 }}>
                            <img
                              className="card-img-top"
                              src={`http://localhost:8080/api/v1/seller/get-photo/${s.seller}`}
                              alt="Card image"
                              height={"300px"}
                            />
                            <div className="card-body">
                              <div className="card-title d-flex flex-row  justify-content-between align-items-center">
                                <h4>{s.firstName}</h4>
                                <div className="text-primary">
                                  {s.providedService}
                                </div>
                              </div>
                              <p className="card-text ">
                                Lorem ipsum, dolor sit amet ctetur adipisicing
                                elit. In, repellendus!
                              </p>
                              <div className="d-flex flex-row gap-3  align-items-end my-3">
                                <Link
                                  to="/message"
                                  className="link text-decoration-none"
                                >
                                  chat
                                </Link>
                                <img
                                  src="/images/chat.png"
                                  alt=""
                                  style={{ width: "20px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-12  d-flex flex -row align-items-top gap-3 justify-content-center">
            <h4 style={{ color: "#3A6A3B" }}>Total price</h4>

            <span style={{ fontSize: "20px" }}>: {totalPrice}</span>
          </div>

          <div className="col-12 my-5 d-flex justify-content-center">
            <button
              onClick={() => handleCreatePlan()}
              className="btn text-light"
              style={{ background: "#1dbf73", width: "250px" }}
            >
              Add Plan
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewPlan;
