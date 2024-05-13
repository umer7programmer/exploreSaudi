import { createContext, useContext, useEffect, useState } from "react";

// create search context
const PlanContext = createContext();

//plan provider

const PlanProvider = ({ children }) => {
  const [planInfo, setPlanInfo] = useState({
    userId: null,
    planName: "",
    planGenerationType: "",
    planType: "",
    capacity: null,
    startDate: null,
    endDate: null,
    cities: [
      {
        cityid: null,
        cityName: "",
        startDate: null,
        endDate: null,
      },
    ],
  });

  return (
    <PlanContext.Provider value={[planInfo, setPlanInfo]}>
      {children}
    </PlanContext.Provider>
  );
};
//custom hook
const usePlan = () => {
  return useContext(PlanContext);
};

export { usePlan, PlanProvider };
