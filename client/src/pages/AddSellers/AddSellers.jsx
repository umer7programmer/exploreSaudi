import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSeller } from "../../context/sellers";
import { toast } from "react-toastify";

const AddSellers = ({ cityId }) => {
  console.warn(cityId);
  const [sellers, setSellers] = useState(null);

  const [selectedSellers, setSelectedSellers] = useSeller();
  console.warn(selectedSellers);

  const [planInfo, setPlanInfo] = useState();

  const getStoredPlan = () => {
    try {
      const storedPlan = localStorage.getItem("plan");

      if (storedPlan) {
        const plan = JSON.parse(storedPlan);
        setPlanInfo(plan);
        return plan;
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //get Sellers
  const getSellers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/seller/get-FirstThreeSellersByCity/${cityId}`
      );

      if (res?.data?.success) {
        setSellers(res.data?.sellers);
        console.warn(sellers);
      } else {
        setError("An error occurred while fetching sellers.");
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getSellers();
  }, []);

  const addSeller = async (seller) => {
    try {
      const updatedSelectedSellers = [...selectedSellers, seller._id];
      setSelectedSellers(updatedSelectedSellers);
      //store in local storage
      localStorage.setItem(
        "selected-sellers",
        JSON.stringify(updatedSelectedSellers)
      );
      //request object
      const planInfo = getStoredPlan();
      const requestobject = {
        attractions: planInfo?.cities
          ?.map((city) => {
            if (city.cityid === cityId) {
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
      console.warn("hello");

      //hit api for sending request

      const res = await axios.post(
        `http://localhost:8080/api/v1/seller/send-seller-request/${seller._id}`,
        {
          requestobject: requestobject,
        }
      );
      if (res?.data?.success) {
        const updatedCities = planInfo?.cities?.map((city) => {
          if (city.cityid === cityId) {
            const updatedSellers = [
              ...city.sellers,
              {
                seller: seller._id,
                price: seller.price,
                firstName: seller.firstName,
                providedService: seller.providedService,
              },
            ];
            return {
              ...city,
              sellers: updatedSellers,
            };
          }
          return city;
        });

        console.log(planInfo);

        const updatePlanInfo = {
          ...planInfo,
          cities: updatedCities,
        };

        console.log(updatePlanInfo);
        setPlanInfo(updatePlanInfo);
        localStorage.setItem("plan", JSON.stringify(updatePlanInfo));
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

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

      const planInfo = getStoredPlan();

      const updatedCities = planInfo?.cities?.map((city) => {
        if (city.cityid === cityId) {
          const updatedSellers = city?.sellers?.filter(
            (sellerItem) => sellerItem.seller !== seller._id // Filter out the seller based on its ID
          );
          return {
            ...city,
            sellers: updatedSellers,
          };
        }
        return city;
      });

      const updatePlanInfo = {
        ...planInfo,
        cities: updatedCities,
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

    const storedSelectedSellers = localStorage.getItem("selected-sellers");
    if (storedSelectedSellers) {
      setSelectedSellers(JSON.parse(storedSelectedSellers));
    }
  }, []);
  return (
    <div>
      <h2 className="text-center mb-4" style={{ color: " #3A6A3B" }}>
        Sellers
      </h2>
      <div
        className="d-flex flex-row gap-5  justify-content-center     "
        style={{ minHeight: "560px" }}
      >
        {sellers && sellers?.length > 0 ? (
          <>
            {sellers.map((s) => (
              <div
                className="card pb-3"
                style={{ width: "300px", height: "530px" }}
              >
                <img
                  className="card-img-top"
                  src={`http://localhost:8080/api/v1/seller/get-photo/${s?._id}`}
                  style={{ height: "250px" }}
                  alt="Card image"
                />
                <div className="card-body">
                  <h5 className="card-title">{s?.firstName}</h5>
                  <div className="my-2">{s?.providedService}</div>
                  <p className="card-text">
                    {s?.description.substring(0, 30)}...
                  </p>
                  <p className="card-text" style={{ fontSize: "18px" }}>
                    Price: ${s?.price}
                  </p>
                  {selectedSellers &&
                  selectedSellers.length > 0 &&
                  selectedSellers.includes(s?._id) ? (
                    <>
                      <button
                        className="btn text-light ms-1 bg-danger w-100 my-2"
                        onClick={() => removeSeller(s)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn text-light ml-1 w-100 my-2"
                        style={{ background: "#1dbf73" }}
                        onClick={() => addSeller(s)}
                      >
                        Add
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div>No sellers found</div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddSellers;
