import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useSeller } from "../../context/sellers";

const ListOfSellers = () => {
  const { id } = useParams();

  const [selectedSellers, setSelectedSellers] = useSeller();
  console.warn(selectedSellers);

  console.warn(id);
  const [sellers, setSellers] = useState([]);

  const [planInfo, setPlanInfo] = useState();

  const getStoredPlan = () => {
    try {
      const storedPlan = localStorage.getItem("plan");

      if (storedPlan) {
        const plan = JSON.parse(storedPlan);

        setPlanInfo(plan);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getSellers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/seller/get-sellers/${id}`
      );

      console.warn(res);
      if (res?.data?.success) {
        setSellers(res.data.sellers);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //add seller
  const addSeller = async (seller) => {
    try {
      console.warn(seller._id);
      const updatedSelectedSellers = [...selectedSellers, seller._id];
      setSelectedSellers(updatedSelectedSellers);
      //store in local storage
      localStorage.setItem(
        "selected-sellers",
        JSON.stringify(updatedSelectedSellers)
      );
      //request object
      const requestobject = {
        attractions: planInfo?.cities
          ?.map((city) => {
            if (city.cityid === id) {
              return {
                attractions: city?.attractions
                  ?.map((attraction) => attraction.attractionName)
                  .filter(Boolean),
                date: city.date,
              };
            }
            return null;
          })
          .filter(Boolean),
      };
      console.warn(requestobject);

      //hit api for sending request

      const res = await axios.post(
        `http://localhost:8080/api/v1/seller/send-seller-request/${seller._id}`,
        {
          requestobject: requestobject,
        }
      );
      if (res?.data?.success) {
        const updatePlanInfo = {
          ...planInfo,
          cities: planInfo?.cities?.map((city) => {
            if (city.cityid === id) {
              return {
                ...city,
                sellers: [
                  {
                    seller: seller._id,
                    price: seller.price,
                    firstName: seller.firstName,
                    providedService: seller.providedService,
                  },
                ],
              };
            }
            return city;
          }),
        };
        console.warn(updatePlanInfo);
        setPlanInfo(updatePlanInfo);
        console.warn(updatePlanInfo);
        localStorage.setItem("plan", JSON.stringify(updatePlanInfo));

        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //remove seller
  const removeSeller = (seller) => {
    try {
      const updatedSelectedSellers = selectedSellers.filter(
        (id) => id !== seller._id
      );
      setSelectedSellers(updatedSelectedSellers);
      //store in local storage
      localStorage.setItem(
        "selected-sellers",
        JSON.stringify(updatedSelectedSellers)
      );

      const updatePlanInfo = {
        ...planInfo,
        cities: planInfo?.cities?.map((city) => {
          if (city.cityid === id) {
            return {
              ...city,
              sellers: city?.sellers?.filter((seller) => {
                return seller.sellerId !== seller._id;
              }),
            };
          }
          return city;
        }),
      };
      setPlanInfo(updatePlanInfo);

      //update local storage
      localStorage.setItem("plan", JSON.stringify(updatePlanInfo));

      toast.warning("Deleted");
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getStoredPlan();
    getSellers();
    const storedSelectedSellers = localStorage.getItem("selected-sellers");
    if (storedSelectedSellers) {
      setSelectedSellers(JSON.parse(storedSelectedSellers));
    }
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid my-5">
          <div className="container">
            <div className=" mx-auto h4" style={{ width: "230px" }}>
              {sellers ? (
                <>
                  <div style={{ color: "#3A6A3B" }}>
                    {sellers?.length} seller in city
                  </div>
                </>
              ) : (
                <>
                  <div>No seller found</div>
                </>
              )}
            </div>
            <div className=" my-5 d-flex flex-row flex-wrap gap-5">
              {sellers?.map((seller) => {
                return (
                  <div className="card" style={{ width: 300 }}>
                    <img
                      className="card-img-top"
                      src={`http://localhost:8080/api/v1/seller/get-photo/${seller?._id}`}
                      alt="Card image"
                    />
                    <div className="card-body">
                      <div className="card-title d-flex flex-row  justify-content-between align-items-center">
                        <h4>{seller.firstName}</h4>
                        <div className="text-primary">
                          {seller.providedService}
                        </div>
                      </div>
                      <p className="card-text ">
                        {seller?.description?.substring(0, 30)}...
                      </p>

                      {selectedSellers &&
                      selectedSellers.length > 0 &&
                      selectedSellers.includes(seller?._id) ? (
                        <>
                          <button
                            className="btn text-light ms-1 bg-danger w-100 my-2"
                            onClick={() => removeSeller(seller)}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn text-light ml-1 w-100 my-2"
                            style={{ background: "#1dbf73" }}
                            onClick={() => addSeller(seller)}
                          >
                            Add
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ListOfSellers;
