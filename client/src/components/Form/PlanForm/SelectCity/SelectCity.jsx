import React, { useEffect, useState } from "react";
import { usePlan } from "../../../../context/plan";
import axios from "axios";
import { Button, Modal } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SelectCity = () => {
  const [planInfo, setPlanInfo] = usePlan();
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [cityId, selectCityId] = useState();
  const [cityName, selectCityName] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const getCities = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/cities/get");
      if (res?.data?.success) {
        setCities(res?.data?.cities);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleClick = (cid, cName) => {
    //checking that selected city is already present or not
    const isSelected = selectedCities.includes(cid);
    if (isSelected) {
      setSelectedCities(selectedCities.filter((id) => id !== cid));
      toast.error("City Unselected");
      return;
    } else {
      setVisible(true);
      //select city id

      selectCityId(cid);
      //select city Name
      selectCityName(cName), setSelectedCities([...selectedCities, cid]);
    }
  };
  //handleDate
  const handleDate = () => {
    if ((startDate, endDate)) {
      const citiesWithDate = {
        cityid: cityId,
        cityName: cityName,
        startDate: startDate,
        endDate: endDate,

        attractions: [],
        sellers: [],
        zones: [],
      };

      //update plan info
      setPlanInfo((prevPlanInfo) => ({
        ...prevPlanInfo,
        cities: [
          ...prevPlanInfo.cities.filter((city) => city.cityid !== null),
          citiesWithDate,
        ],
      }));
      console.warn(planInfo);

      setVisible(false);
    } else {
      toast.error("Please select both start and end dates.");
    }
  };

  //handleSavedCityWithDate
  const handleSavedCityWithDate = async () => {
    localStorage.setItem("plan", JSON.stringify(planInfo));
    if (planInfo?.planGenerationType === "Auto") {
      navigate("/auto-plan-attractions");
    } else {
      navigate("/list-of-cities");
    }
  };
  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      <div className="d-flex flex-row flex-wrap gap-5 justify-content-center mt-2 mb-5 pt-5 ">
        {cities?.map((c) => {
          return (
            <>
              <div
                key={c._id}
                className=" shadow rounded-4 d-flex justify-content-center justify-content-center align-items-center text-dark"
                style={{
                  backgroundColor: selectedCities.includes(c._id)
                    ? "darkgray"
                    : "lightgray",
                  height: "125px",
                  width: "250px",
                }}
                onClick={() => handleClick(c._id, c.cityName)}
              >
                {c.cityName}
              </div>
            </>
          );
        })}
      </div>
      <Modal
        visible={visible}
        footer={[
          <Button key="save" type="primary" onClick={handleDate}>
            Save
          </Button>,
        ]}
      >
        <div className="d-flex flex-row gap-3">
          <DatePicker
            className="form-control my-5 " // Apply custom class
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={planInfo.startDate}
            maxDate={planInfo.endDate}
            scrollableYearDropdown
            scrollableMonthYearDropdown
            isClearable
            placeholderText="Enter start Date"
            required
          />
          <DatePicker
            className="form-control my-5 " // Apply custom class
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={planInfo.startDate}
            maxDate={planInfo.endDate}
            scrollableYearDropdown
            scrollableMonthYearDropdown
            isClearable
            placeholderText="Enter End Date"
            required
          />
        </div>
      </Modal>
      <div className="w-100 text-center my-5">
        <button
          className="btn btn-primary px-5"
          onClick={handleSavedCityWithDate}
        >
          Save and Continue
        </button>
      </div>
    </>
  );
};

export default SelectCity;
