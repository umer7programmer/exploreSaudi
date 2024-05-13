import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAttraction } from "../../context/attractions";

import { toast } from "react-toastify";
import { useZone } from "../../context/zones";
import Rating from "../../components/Rating/Rating";

const AddZonesAndAttractions = ({ startDate, endDate, cityId, cityName }) => {
  console.warn(startDate, endDate, cityId, cityName);
  const [zone, setZone] = useState(null);
  const [allzones, setallzones] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useAttraction([]);
  const [selectedZones, setSelectedZones] = useZone([]);
  const [attractions, setAttractions] = useState(null);

  const [planInfo, setPlanInfo] = useState();

  const [error, setError] = useState(null); // Add error state

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

  useEffect(() => {
    getStoredPlan();
  }, []);

  const getZones = async () => {
    console.log("getZoneAPI");

    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/zone/get-zones-cityName/${cityName}`
      );

      console.log(res.data);

      if (res?.data?.success) {
        setallzones(res.data.filteredZones);
      } else {
        setError("An error occurred while fetching zones.");
      }
    } catch (error) {
      console.warn(error);
    }

    // try {
    //   const res = await axios.get(
    //     `http://localhost:8080/api/v1/zone/get-zones-city/${cityId}`,
    //     {
    //       params: { startDate, endDate },
    //     }
    //   );

    //   if (res?.data?.success) {
    //     setZone(res.data?.randomZone);
    //     console.warn(res.data?.randomZone);
    //   } else {
    //     setError("An error occurred while fetching zones.");
    //   }
    // } catch (error) {
    //   console.warn(error);
    // }
  };

  useEffect(() => {
    getZones();
  }, []);

  // const getAttractions = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:8080/api/v1/attraction/attractions-without-zone/${cityName}`,
  //       {
  //         params: { startDate, endDate },
  //       }
  //     );

  //     if (res?.data?.success) {
  //       setAttractions(res.data?.randomAttractions);
  //       console.warn(res.data?.randomAttractions);
  //     } else {
  //       setError("An error occurred while fetching attractions.");
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  const getAttractions = async (id) => {
    console.log("attractionAPI");

    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/attraction/search-attractions/${id}`
        // {
        //   params: { startDate, endDate },
        // }
      );

      console.log(res.data, "attractionData");

      if (res?.data?.success) {
        setAttractions(res.data?.attractions);
        console.log(res.data?.attractions, "attractionsssssssssssss");
      } else {
        setError("An error occurred while fetching attractions.");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // useEffect(() => {
  //   getAttractions();
  // }, []);
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

    // Update localStorage for planInfo
    localStorage.setItem("plan", JSON.stringify(updatePlanInfo));

    toast.error(`${attraction.name} deleted from plan successfully`);
  };

  // useEffect(() => {
  //   getAttractions();
  //   const storedSelectedAttractions = localStorage.getItem(
  //     "selectedAttractions"
  //   );
  //   if (storedSelectedAttractions) {
  //     setSelectedAttractions(JSON.parse(storedSelectedAttractions));
  //   }
  // }, [planInfo?.planGenerationType]);

  //addZones
  const addZone = (recievedZone) => {
    const thisZone = JSON.parse(recievedZone);
    setZone(thisZone);
    getAttractions(thisZone._id);

    const updatedSelected = [...selectedZones, thisZone._id];
    // const updatedSelected = [thisZone._id];
    setSelectedZones(updatedSelected);

    // Update localStorage
    localStorage.setItem("selected-zones", JSON.stringify(updatedSelected));

    console.warn(cityId);
    console.warn("hello");

    const updatedZone = {
      _id: thisZone._id,
      name: thisZone.name,
      description: thisZone.description,
      startDate: thisZone.startDate, // Assuming startDate is a property of attraction
      price: thisZone.price, // Assuming price is a property of attraction
    };

    const planInfo = getStoredPlan();
    const updatePlanInfo = {
      ...planInfo,

      cities: planInfo.cities.map((city) => {
        if (city.cityid === cityId) {
          return {
            ...city,
            zones: [...city.zones, updatedZone],
          };
        }
        return city;
      }),
    };
    setPlanInfo(updatePlanInfo);
    localStorage.setItem("plan", JSON.stringify(updatePlanInfo));
    toast.success(`${thisZone.name} added from plan successfully`);
  };
  const deleteZone = (zone) => {
    const updatedSelected = selectedZones.filter((id) => id !== zone._id);
    setSelectedZones(updatedSelected);

    // Update localStorage for selectedAttractions
    localStorage.setItem("selected-zones", JSON.stringify(updatedSelected));

    const planInfo = getStoredPlan();
    const updatePlanInfo = {
      ...planInfo,
      cities: planInfo.cities.map((city) => {
        if (city.cityid === cityId) {
          return {
            ...city,
            zone: city.zone.filter((a) => a.zone !== zone._id),
          };
        }
        return city;
      }),
    };
    setPlanInfo(updatePlanInfo);

    // Update localStorage for planInfo
    localStorage.setItem("plan", JSON.stringify(updatePlanInfo));

    toast.error(`${zone.name} deleted from plan successfully`);
  };

  useEffect(() => {
    getZones();
    const storedSelectedZones = localStorage.getItem("selected-zones");
    if (storedSelectedZones) {
      setSelectedAttractions(JSON.parse(storedSelectedZones));
    }
  }, [planInfo?.planGenerationType]);

  return (
    <div className="d-flex flex-row gap-4 ">
      <div style={{ height: "max-content" }}>
        <div className="card " style={{ width: 300 }}>
          {selectedZones && selectedZones.includes(zone?._id) ? (
            <>
              <img
                className="card-img-top"
                src={`http://localhost:8080/api/v1/zone/get-photo/${zone?._id}`}
                alt="Card image"
                height={"200px"}
              />
              <div className="card-body">
                <h5 className="card-title">{zone?.name}</h5>
                <p className="card-text">
                  {zone?.description.substring(0, 30)}...
                </p>
                <p className="">Price : {zone?.price}</p>
                <select
                  name=""
                  id=""
                  onChange={(e) => addZone(e.target.value)}
                  className="btn text-light ml-1 w-100 mb-2 bg-primary"
                >
                  <option value="" disabled selected>
                    Replace
                  </option>
                  {allzones.map((e, i) => {
                    return (
                      <option key={i} value={JSON.stringify(allzones[i])}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn bg-danger text-light w-100"
                  onClick={() => deleteZone(zone)}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="card-body">
              <select
                name=""
                id=""
                onChange={(e) => addZone(e.target.value)}
                className="btn text-light ml-1 w-100"
                style={{ background: "#1dbf73" }}
              >
                <option value="" disabled selected>
                  Select Zone
                </option>
                {allzones.map((e, i) => {
                  return (
                    <option key={i} value={JSON.stringify(allzones[i])}>
                      {e.name}
                    </option>
                  );
                })}
              </select>

              {/* <button
                className="btn text-light ml-1 w-100"
                style={{ background: "#1dbf73" }}
                onClick={() => addZone(zone)}
              >
                Add
              </button>  */}
            </div>
          )}
        </div>
      </div>
      <div className="d-flex flex-row gap-5 ">
        {console.log(attractions, "attractionshenbhai")}
        {attractions && attractions.length > 0 ? (
          <>
            {attractions.map((a) => (
              <div key={a._id}>
                <div className="card" style={{ width: 300 }}>
                  <img
                    className="card-img-top"
                    src={`http://localhost:8080/api/v1/attraction/get-photo/${a?._id}`}
                    alt="Card image"
                    height={200}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{a?.name}</h5>
                    <p className="card-text">
                      {a?.description.substring(0, 30)}...
                    </p>
                    <div>
                      {a?.averageRating == 0 ? (
                        <div>{<Rating rating={5} />}</div>
                      ) : (
                        <div>{<Rating rating={a.averageRating} />}</div>
                      )}
                    </div>
                    <div className="my-2 py-1">Price : {a?.price}</div>
                    {selectedAttractions &&
                    selectedAttractions.includes(a._id) ? (
                      <button
                        className="btn bg-danger text-light ms-1 w-100"
                        onClick={() => deleteAttraction(a)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        className="btn text-light ml-1 w-100"
                        style={{ background: "#1dbf73" }}
                        onClick={() => addAttraction(a)}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No attractions found</div>
        )}
      </div>
    </div>
  );
};

export default AddZonesAndAttractions;
