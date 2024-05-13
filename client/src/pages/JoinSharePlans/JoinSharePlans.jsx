import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const JoinSharePlans = () => {
  const [sharePlans, setSharedPlans] = useState([]);
  const [addedPlans, setAddedPlans] = useState([]);
  //get shared plans
  const getSharedPlans = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/plan/get-type-base-plan"
      );
      if (res?.data?.success) {
        setSharedPlans(res.data.plans);
      } else {
        setSharedPlans([]);
        console.warn(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //handelJoin
  const handleJoin = async (id) => {
    try {
      console.warn("hello");
      const updateAddedPlan = [...addedPlans, id];
      setAddedPlans(updateAddedPlan);
      //store in localstorage
      localStorage.setItem("addedPlans", JSON.stringify(updateAddedPlan));
      const res = await axios.post(
        `http://localhost:8080/api/v1/plan/add-user/${id}`
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        getSharedPlans();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //handeldelete
  const handleDelete = async (id) => {
    try {
      const updateAddedPlan = addedPlans?.filter((id) => id !== id);
      setAddedPlans(updateAddedPlan);
      //store in localstorage
      localStorage.setItem("addedPlans", JSON.stringify(updateAddedPlan));
      const res = await axios.post(
        `http://localhost:8080/api/v1/plan/delete-user/${id}`
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        getSharedPlans();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getSharedPlans();
    const storedAddedPlans = localStorage.getItem("addedPlans");
    if (storedAddedPlans) {
      setAddedPlans(JSON.parse(storedAddedPlans));
    }
  }, []);
  return (
    <Layout>
      {" "}
      <div className="container-fluid my-5">
        <div className="container">
          <div className=" mx-auto h4" style={{ width: "250px" }}>
            {sharePlans ? (
              <>
                <div style={{ color: "#3A6A3B" }}>
                  {sharePlans?.length} shared plans present
                </div>
              </>
            ) : (
              <>
                <div>No shared plans found</div>
              </>
            )}
          </div>
          <div className=" my-5 d-flex flex-row flex-wrap gap-4">
            {sharePlans?.map((s) => {
              return (
                <div className="card mt-3" style={{ width: 300 }}>
                  <img
                    className="card-img-top"
                    src="https://cdn.pixabay.com/photo/2018/05/17/12/23/camel-train-3408458_640.jpg"
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{s.planName}</h4>
                    <p className="card-text">capacity: {s.capacity}</p>

                    {addedPlans.includes(s._id) &&
                    s.users.length === s.capacity ? (
                      <>
                        <div className="d-flex flex-row gap-2">
                          <button
                            className="btn text-light w-50 bg-danger "
                            onClick={() => handleDelete(s._id)}
                          >
                            Full
                          </button>
                          <button
                            className="btn text-light w-50 bg-danger "
                            onClick={() => handleDelete(s._id)}
                          >
                            Leave
                          </button>
                        </div>
                      </>
                    ) : addedPlans.includes(s._id) &&
                      s.users.length !== s.capacity ? (
                      <>
                        <button
                          className="btn text-light w-100 bg-danger"
                          onClick={() => handleDelete(s._id)}
                        >
                          Leave
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn text-light w-100"
                          style={{ background: "#1dbf73" }}
                          onClick={() => handleJoin(s._id)}
                        >
                          Join
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
  );
};

export default JoinSharePlans;
