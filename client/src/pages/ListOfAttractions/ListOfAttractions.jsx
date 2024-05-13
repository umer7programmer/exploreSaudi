import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout/Layout";
import { usePlan } from "../../context/plan";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const ListOfAttractions = () => {
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  //Access the id
  const { id } = useParams();

  const { date, cityId } = location.state || {};
  console.warn(cityId);

  const [attractions, setAttractions] = useState([]);
  const [planInfo, setPlanInfo] = useState();
  const getStoredPlan = () => {
    try {
      const storedPlan = localStorage.getItem("plan");

      if (storedPlan) {
        const plan = JSON.parse(storedPlan);

        setPlanInfo(plan);
        console.warn(planInfo);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getStoredPlan();
  }, []);

  //getAttractions
  const getAttractions = async () => {
    try {
      if (auth?.user?.role === "Admin") {
        const res = await axios.get(
          `http://localhost:8080/api/v1/attraction/search-attractions/${id}`,
          {
            params: { date },
          }
        );

        if (res?.data?.success) {
          setAttractions(res.data.attractions);
        }
      } else {
        let apiEndpoint;

        switch (planInfo?.planGenerationType) {
          case "Manual":
            apiEndpoint = `http://localhost:8080/api/v1/attraction/search-attractions/${id}`;
            break;
          case "Auto":
            apiEndpoint = `http://localhost:8080/api/v1/attraction/user-interest-attractions/${id}`;
            break;
        }

        const res = await axios.get(apiEndpoint, {
          params: { date },
        });
        console.warn(res.data.success);

        if (res?.data?.success) {
          setAttractions(res.data.attractions);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //addAttraction
  const addAttraction = (attraction) => {
    const updatedSelected = [...selectedAttractions, attraction._id];
    setSelectedAttractions(updatedSelected);
    console.warn(attraction);
    // Update localStorage
    localStorage.setItem(
      "selectedAttractions",
      JSON.stringify(updatedSelected)
    );

    console.warn(cityId);
    console.warn("hello");

    const updatedAttraction = {
      attraction: attraction._id,
      name: attraction.name,
      description: attraction.description,
      startDate: attraction.startDate, // Assuming startDate is a property of attraction
      price: attraction.price, // Assuming price is a property of attraction
    };

    const updatePlanInfo = {
      ...planInfo,

      cities: planInfo.cities.map((city) => {
        if (city.cityid === cityId) {
          return {
            ...city,
            attractions: [...city.attractions, updatedAttraction],
          };
        }
        return city;
      }),
    };
    console.warn(updatePlanInfo);
    setPlanInfo(updatePlanInfo);

    localStorage.setItem("plan", JSON.stringify(updatePlanInfo));
    toast.success(`${attraction.name} added from plan successfully`);
  };
  const deleteAttraction = (attraction) => {
    const updatedSelected = selectedAttractions.filter(
      (id) => id !== attraction._id
    );
    setSelectedAttractions(updatedSelected);

    // Update localStorage for selectedAttractions
    localStorage.setItem(
      "selectedAttractions",
      JSON.stringify(updatedSelected)
    );

    const updatePlanInfo = {
      ...planInfo,
      cities: planInfo.cities.map((city) => {
        if (city.cityid === cityId) {
          return {
            ...city,
            attractions: city.attractions.filter(
              (a) => a.attraction !== attraction._id
            ),
          };
        }
        return city;
      }),
    };
    setPlanInfo(updatePlanInfo);

    // Update localStorage for planInfo
    localStorage.setItem("plan", JSON.stringify(updatePlanInfo));

    toast.error(`${attraction.name} deleted from plan successfully`);
  };

  useEffect(() => {
    getAttractions();
    const storedSelectedAttractions = localStorage.getItem(
      "selectedAttractions"
    );
    if (storedSelectedAttractions) {
      setSelectedAttractions(JSON.parse(storedSelectedAttractions));
    }
  }, [planInfo?.planGenerationType]);

  return (
    <>
      <Layout>
        <div className="container-fluid my-5">
          <div className="container">
            <div
              className=" mx-auto h4 text-center"
              style={{ color: "#3A6A3B" }}
            >
              {attractions && attractions?.length > 0 ? (
                <>{attractions?.length} attractions in city</>
              ) : (
                <>No Attractions available</>
              )}
            </div>
            <div className=" my-5 d-flex flex-row flex-wrap gap-4">
              {attractions?.map((attraction) => {
                return (
                  <div className="card mt-3" style={{ width: 300 }}>
                    <img
                      className="card-img-top"
                      src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                      alt="Card image"
                      height={"300px"}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{attraction.name}</h5>
                      <p className="card-text">
                        {attraction.description.substring(0, 30)}...
                      </p>
                      {selectedAttractions &&
                      selectedAttractions.includes(attraction._id) ? (
                        <>
                          <button
                            className="btn bg-danger text-light ms-1 w-100"
                            onClick={() => deleteAttraction(attraction)}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn text-light ml-1 w-100"
                            style={{ background: "#1dbf73" }}
                            onClick={() => addAttraction(attraction)}
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

export default ListOfAttractions;
