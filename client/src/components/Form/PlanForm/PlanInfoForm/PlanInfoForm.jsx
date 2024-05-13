import { Select, Slider } from "antd";
import React, { useState } from "react";
import { usePlan } from "../../../../context/plan";
import { useAuth } from "../../../../context/auth";
import { Link } from "react-router-dom";

const PlanInfoForm = ({ nextStep }) => {
  const [planInfo, setPlanInfo] = usePlan();
  const [auth, setAuth] = useAuth();
  const [planName, setPlanName] = useState("");
  const [planGenerationType, setPlanGenerationType] = useState("");
  const [planType, setPlanType] = useState("");
  const [capacity, setCapacity] = useState();

  //handleSliderChange
  const handleSliderChange = (value) => {
    setCapacity(value);
  };
  //handleNext
  const handleNext = (e) => {
    e.preventDefault();

    setPlanInfo((preValues) => {
      return {
        ...preValues,
        userId: auth?.user?._id,
        planName,
        planGenerationType,
        planType,
        capacity,
      };
    });
    return nextStep();
  };
  return (
    <>
      <form
        onSubmit={handleNext}
        className=" mx-auto "
        style={{ width: "374px" }}
      >
        <div className="my-5 ">
          <label className="form-label">Plan Name</label>
          <input
            className="form-control"
            placeholder="Enter Plan Name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </div>

        {auth?.user?.role === "Explorer" ? (
          <>
            <div className="d-flex flex-row my-5 gap-5">
              <div>
                <Select
                  placeholder="Plan Generation Type"
                  style={{ width: "162px" }}
                  size="large"
                  showSearch
                  onChange={(value) => setPlanGenerationType(value)}
                >
                  <Select.Option value="Manual">Manual</Select.Option>
                  <Select.Option value="Auto">Auto</Select.Option>
                </Select>
              </div>
              <div>
                <Select
                  placeholder="Plan Type"
                  style={{ width: "162px" }}
                  size="large"
                  showSearch
                  onChange={(value) => setPlanType(value)}
                  required
                >
                  <Option value="Private">Private</Option>
                  <Option value="Public">Public</Option>
                </Select>
              </div>
            </div>{" "}
          </>
        ) : (
          <input
            className="form-control my-5"
            placeholder="Enter capacity"
            type="Number"
            value={capacity}
            onChange={(e) => handleSliderChange(e.target.value)}
            required
          />
        )}
        <div className="w-75 mx-auto">
          <button
            className="btn text-light w-100  mx-auto"
            style={{ backgroundColor: "rgb(29, 191, 115)" }}
            nextStep={nextStep}
          >
            Save & Continue
          </button>
        </div>
      </form>
      {auth?.user?.role === "Explorer" && (
        <div className=" mx-auto mt-5" style={{ width: "366px" }}>
          <Link to="/dashboard/user/join-share-plans">
            <button
              className="btn text-light w-100  mx-auto"
              style={{ backgroundColor: "rgb(29, 191, 115)" }}
              nextStep={nextStep}
            >
              Join Share plan
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PlanInfoForm;
