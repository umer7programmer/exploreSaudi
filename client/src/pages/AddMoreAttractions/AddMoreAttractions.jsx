import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { useAttraction } from "../../context/attractions";

const AddMoreAttractions = () => {
  const { id } = useParams();
  console.warn(id);

  const location = useLocation();
  console.warn("Location state:", location.state);
  const cityId = location.state ? location.state.cityId : null;
  console.warn(cityId);
  const [moreAttractions, setMoreAttractions] = useState(null);
  const [selectedAttractions, setSelectedAttractions] = useAttraction();
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

  const getMoreAttractions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/attraction/add-more-attractions/${id}`
      );
      if (res?.data?.success) {
        setMoreAttractions(res.data.updatezoneBaseAttracions);
        toast.success(res.data.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //addAttraction
  const addAttraction = (attraction) => {
    const updatedSelected = [...selectedAttractions, attraction._id];
    setSelectedAttractions(updatedSelected);

    // Update localStorage
    localStorage.setItem(
      "selectedAttractions",
      JSON.stringify(updatedSelected)
    );
    const updatedAttraction = {
      attraction: attraction._id,
      name: attraction.name,
      description: attraction.description,
      startDate: attraction.startDate, // Assuming startDate is a property of attraction
      price: attraction.price, // Assuming price is a property of attraction
    };
    const planInfo = getStoredPlan();
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

    const planInfo = getStoredPlan();
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
    localStorage.setItem("plan", JSON.stringify(updatePlanInfo));

    toast.error(`${attraction.name} deleted from plan successfully`);
  };

  useEffect(() => {
    getMoreAttractions();
    getStoredPlan();
  }, []);
  return (
    <Layout>
      <div className="container d-flex flex-column gap-3 my-5">
        {(!moreAttractions || moreAttractions.length === 0) && (
          <h5 className="w-100 mx-auto text-center my-5">
            No more attractions available
          </h5>
        )}
        {moreAttractions && moreAttractions.length > 0 && (
          <div className="d-flex flex-row flex-wrap gap-3">
            {moreAttractions.map((attraction) => (
              <div
                className="card mt-3"
                style={{ width: 300 }}
                key={attraction._id}
              >
                <img
                  className="card-img-top"
                  src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                  alt="Card image"
                />
                <div className="card-body">
                  <h5 className="card-title">{attraction.name}</h5>
                  <p className="card-text">
                    {attraction.description.substring(0, 30)}...
                  </p>
                  {selectedAttractions &&
                  selectedAttractions.includes(attraction._id) ? (
                    <button
                      className="btn bg-danger text-light ms-1 w-100"
                      onClick={() => deleteAttraction(attraction)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="btn text-light ml-1 w-100"
                      style={{ background: "#1dbf73" }}
                      onClick={() => addAttraction(attraction)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddMoreAttractions;
