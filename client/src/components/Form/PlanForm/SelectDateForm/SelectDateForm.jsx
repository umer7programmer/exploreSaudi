import React, { useState } from "react";
import { usePlan } from "../../../../context/plan";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectDateForm = ({ nextStep }) => {
  const [planInfo, setPlanInfo] = usePlan();
  console.warn(planInfo);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.warn(planInfo);

  const handleNext = (e) => {
    e.preventDefault();

    setPlanInfo((prevValues) => {
      return {
        ...prevValues,
        startDate,
        endDate,
      };
    });

    return nextStep();
  };

  return (
    <form onSubmit={handleNext} className="mx-auto " style={{ width: "374px" }}>
      <div className="d-flex flex-row gap-3 my-4">
        <DatePicker
          className="form-control w-100"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          scrollableYearDropdown
          scrollableMonthYearDropdown
          isClearable
          placeholderText="Enter Start Date"
          required
        />

        <DatePicker
          className="form-control  w-100"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          scrollableYearDropdown
          scrollableMonthYearDropdown
          isClearable
          placeholderText="Enter End Date"
          required
        />
      </div>
      <div className="w-100 mt-5 mx-auto">
        <button
          className="btn text-light w-100 "
          style={{ backgroundColor: "rgb(29, 191, 115)" }}
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
};

export default SelectDateForm;
