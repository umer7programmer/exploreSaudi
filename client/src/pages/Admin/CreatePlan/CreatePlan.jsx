import React, { useState } from "react";
import "./CreatePlan.css";
import { Steps } from "antd";
import PlanInfoForm from "../../../components/Form/PlanForm/PlanInfoForm/PlanInfoForm.jsx";
import SelectDateForm from "../../../components/Form/PlanForm/SelectDateForm/SelectDateForm.jsx";
import SelectCity from "../../../components/Form/PlanForm/SelectCity/SelectCity.jsx";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu.jsx";
const CreatePlan = () => {
  const [currentStep, setCurrentStep] = useState(0);
  //next step
  const nextStep = () => {
    return setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <div className="container-fluid py-5">
        <div className="row ">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-8  ">
            <div
              className="container-fluid d-flex flex-column justify-content-center align-items-center gap-5  rounded-4  create-plan--background  text-white"
              style={{
                width: "100%",
                height: "100%",
                paddingTop: "200px",
                paddingBottom: "100px",
              }}
            >
              <Steps className="w-50 " current={currentStep}>
                <Steps.Step
                  title={<span className="text-white">Plan Information</span>}
                />
                <Steps.Step
                  title={<span className="text-white">Date Selection</span>}
                />
                <Steps.Step
                  title={<span className="text-white">Select City</span>}
                />
              </Steps>
              <div className="w-75 ">
                {currentStep === 0 && <PlanInfoForm nextStep={nextStep} />}
                {currentStep === 1 && <SelectDateForm nextStep={nextStep} />}
                {currentStep === 2 && <SelectCity />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlan;
