import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth.jsx";
import { toast } from "react-toastify";

const AutoPlanAttractions = () => {
  const [auth, setAuth] = useAuth();

  const [planInfo, setPlanInfo] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const convertDatesInCities = (cities) => {
    return cities?.map((c) => ({
      ...c,
      date: new Date(c.date),
    }));
  };

  const getStoredPlan = () => {
    try {
      const storedPlan = localStorage.getItem("plan");
      if (storedPlan) {
        const plan = JSON.parse(storedPlan);
        plan.startDate = new Date(plan.startDate);
        plan.endDate = new Date(plan.endDate);
        plan.cities = convertDatesInCities(plan.cities);
        setId(plan?.userId);
        setPlanInfo(plan);
        console.warn(planInfo, 'this is the plan info');
        console.warn(id);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getStoredPlan();
  }, []);
  useEffect(() => {
    console.warn(planInfo);
  }, [planInfo]);
  const formattedCities = planInfo?.cities.map(({ cityName, cityid }) => ({
    cityName,

    cityid,
  }));
  console.warn(formattedCities);

  const updatePlanWithAttractions = (attractions) => {
    const updatedPlan = { ...planInfo };
    console.warn(formattedCities);
    attractions.forEach((attraction) => {
      const city = updatedPlan.cities.find(
        (city) => city.cityName === attraction.city
      );
      if (city) {
        city.attractions.push({ attraction: attraction._id });
      }
    });
    setPlanInfo(updatedPlan);
    localStorage.setItem("plan", JSON.stringify(updatedPlan));
  };

  //update plan with sellers
  const updatePlanWithSellers = (sellers) => {
    const updatedPlan = { ...planInfo };
    sellers.forEach((seller) => {
      const city = updatedPlan.cities.find(
        (city) => city.cityid === seller.city
      );
      if (city) {
        city.sellers.push({ seller: seller._id });
      }
    });
    setPlanInfo(updatedPlan);
    localStorage.setItem("plan", JSON.stringify(updatedPlan));
  };

  const getAttractionsOnBaseOfInterests = async () => {
    try {
      console.warn(formattedCities);
      const res = await axios.post(
        "http://localhost:8080/api/v1/attraction/user-interest-attractions",
        { userId: id, cities: formattedCities }
      );
      if (res?.data?.success) {
        setAttractions(res.data.attractions);

        updatePlanWithAttractions(res.data.attractions);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //get seller on base of cities
  const getSellersOnBaseOfCity = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/seller/get-sellers",
        {
          cities: formattedCities,
        }
      );
      if (res?.data?.success) {
        setSellers(res.data?.sellers);
        updatePlanWithSellers(res.data.sellers);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAttractionsOnBaseOfInterests();
    getSellersOnBaseOfCity();
  }, [id]);

  // Function to delete an attraction with confirmation
  const deleteAttractionWithConfirmation = (attraction) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attraction?"
    );
    if (confirmDelete) {
      deleteAttraction(attraction);
    }
  };

  // Function to delete a seller with confirmation
  const deleteSellerWithConfirmation = (seller) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this seller?"
    );
    if (confirmDelete) {
      deleteSeller(seller);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    attractions.forEach((attraction) => {
      totalPrice += attraction.price;
    });
    sellers.forEach((seller) => {
      totalPrice += seller.price;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [attractions, sellers]);
  const removeAttractionFromPlan = (attractionId) => {
    const updatedPlan = { ...planInfo };
    updatedPlan.cities.forEach((city) => {
      city.attractions = city.attractions.filter(
        (attraction) => attraction.attraction !== attractionId
      );
    });
    setPlanInfo(updatedPlan);
    localStorage.setItem("plan", JSON.stringify(updatedPlan));
  };
  //remove seller from plan
  const removeSellerFromPlan = (sellerId) => {
    const updatedPlan = { ...planInfo };
    updatedPlan.cities.forEach((city) => {
      city.sellers = city.sellers.filter(
        (seller) => seller.seller !== sellerId
      );
    });
    setPlanInfo(updatedPlan);
    localStorage.setItem("plan", JSON.stringify(updatedPlan));
  };
  //delete attraction
  const deleteAttraction = (attraction) => {
    removeAttractionFromPlan(attraction._id);
    setAttractions((prevAttractions) =>
      prevAttractions.filter((item) => item._id !== attraction._id)
    );
  };

  //delete seller
  const deleteSeller = (seller) => {
    removeSellerFromPlan(seller._id);
    setSellers((prevSellers) =>
      prevSellers.filter((item) => item._id !== seller._id)
    );
  };

  //handle create plan
  //handleCreatePlan
  const handleCreatePlan = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/plan/create", {
        userId: planInfo?.userId,
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
        localStorage.removeItem("plan");
        if (auth?.user?.role === "Admin") {
          navigate("/dashboard/admin/plans");
        } else {
          console.log(res, 'this is my response')
          navigate(`/single-plan/${res?.data?.plan?._id}`);
        }
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <Layout>
      <div className="container my-5">
        <div className="row gap-5">
          <div className="col-12 py-3" style={{ backgroundColor: "#6E66F6" }}>
            <div className="row text-white">
              <div className="col-4 text-center">
                <div className="d-flex flex-row text-white w-100 justify-content-center gap-2 align-items-center">
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
              <div className="col-4 text-center d-flex gap-2 align-items-center justify-content-center">
                <img
                  src="./images/location.png"
                  alt="pic not found"
                  style={{ width: "20px", height: "20px" }}
                />
                {`${planInfo?.cities.length} destinations`}
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <div className="container">
              <div className="mx-auto h4" style={{ width: "300px" }}>
                {attractions ? (
                  <>
                  <h2>{planInfo?.cities[0].cityName}</h2>
                  <div style={{ color: "#3A6A3B" }}>
                    {attractions?.length} attractions in cities
                  </div>
                  </>
                ) : (
                  <div>No attraction found</div>
                )}
              </div>
              <div className="my-5 d-flex flex-row flex-wrap gap-3">
                {attractions?.map((attraction, i) => (
                  <>
                    <div className="" >
                      {i == 0 ?
                        <span style={{fontWeight:"bold"}}>Day 1</span>
                        :
                        i == 4 ?
                          <span style={{fontWeight:"bold"}}>Day 2</span>
                          :
                          i == 8 ?
                            <span style={{fontWeight:"bold"}}>Day 3</span>
                            :
                            <span>&nbsp;</span>
                      }
                      <div
                        className="card mt-3"
                        style={{ width: 300 }}
                        key={attraction._id}
                      >
                        <img
                          className="card-img-top"
                          src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                          alt="Card image"
                          style={{ height: "250px" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{attraction.name}</h5>
                          <p className="card-text">
                            {attraction.description.substring(0, 30)}...
                          </p>
                          <div>
                            <span className="fw-bold" style={{ fontSize: "17px" }}>
                              {attraction?.price}
                            </span>{" "}
                            SAR
                          </div>
                          <button
                            className="btn bg-danger text-light my-3 w-100"
                            onClick={() =>
                              deleteAttractionWithConfirmation(attraction)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <div className="container">
              <div className="mx-auto h4" style={{ width: "230px" }}>
                {sellers ? (
                  <div style={{ color: "#3A6A3B" }}>
                    {sellers?.length} sellers in cities
                  </div>
                ) : (
                  <div>No Sellers found</div>
                )}
              </div>
              <div className="my-5 d-flex flex-row flex-wrap gap-5">
                {sellers?.map((seller) => (
                  <div
                    className="card mt-3"
                    style={{ width: 300 }}
                    key={seller._id}
                  >
                    <img
                      className="card-img-top"
                      src={`http://localhost:8080/api/v1/seller/get-photo/${seller?._id}`}
                      alt="Card image"
                      style={{ height: "250px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{seller.firstName}</h5>
                      <div className="my-1 text-danger">
                        {seller?.providedService}
                      </div>
                      <p className="card-text">
                        {seller?.description?.substring(0, 30)}...
                      </p>

                      <div>
                        <span className="fw-bold">{seller?.price}</span> perday
                      </div>
                      <button
                        className="btn bg-danger text-light  w-100 my-3"
                        onClick={() => deleteSellerWithConfirmation(seller)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 my-5 d-flex flex-column gap-2">
            <h3 style={{ color: " #3A6A3B" }}>Total Price</h3>
            <div style={{ fontSize: "18px", fontWeight: 500 }}>
              {totalPrice} SAR
            </div>
          </div>
          <div className="col-12 my-5 d-flex justify-content-center">
            {planInfo?.cities?.some((city) => city.attractions.length > 0) &&
              planInfo?.cities?.some((city) => city.sellers.length > 0) && (
                <button
                  className="btn text-light ml-1"
                  style={{ background: "#1dbf73" }}
                  onClick={() => navigate('/plan-payment')}
                >
                  Purchase Plan
                </button>
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AutoPlanAttractions;
