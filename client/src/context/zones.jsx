import { createContext, useContext, useEffect, useState } from "react";

// zone context
const ZoneContext = createContext();

// zone provider
const ZoneProvider = ({ children }) => {
  const [selectedZones, setSelectedZones] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("selectedo-zones");
    if (data) {
      const parseData = JSON.parse(data);
      console.warn(parseData);

      setSelectedZones(parseData);
      console.warn(selectedZones);
    }
  }, []);

  useEffect(() => {
    // Log the updated selectedZones
    console.warn(selectedZones);
  }, [selectedZones]);

  return (
    <ZoneContext.Provider value={[selectedZones, setSelectedZones]}>
      {children}
    </ZoneContext.Provider>
  );
};

// custom hook for using ZoneContext
const useZone = () => {
  return useContext(ZoneContext);
};

export { useZone, ZoneProvider };
