import Layout from "../../../components/Layout/Layout/Layout.jsx";
import React, { useState } from "react";

import { Steps } from "antd";
import PlanInfoForm from "../../../components/Form/PlanForm/PlanInfoForm/PlanInfoForm.jsx";
import SelectDateForm from "../../../components/Form/PlanForm/SelectDateForm/SelectDateForm.jsx";
import SelectCity from "../../../components/Form/PlanForm/SelectCity/SelectCity.jsx";

const CreateUserPlan = () => {
  const [currentStep, setCurrentStep] = useState(0);
  //next step
  const nextStep = () => {
    return setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <Layout>
        <div
          className="container-fluid d-flex flex-column justify-content-center align-items-center gap-5  create-plan--background  text-white"
          style={{
            width: "100%",
            minHeight: "90vh",
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
      </Layout>
    </>
  );
};

export default CreateUserPlan;
