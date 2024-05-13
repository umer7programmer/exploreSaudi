import { createContext, useContext, useEffect, useState } from "react";

// create attraction context
const AttractionContext = createContext();

//attraction provider

const AttractionProvider = ({ children }) => {
  const [selectedAttractions, setSelectedAttractions] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("selectedAttractions");
    if (data) {
      const parseData = JSON.parse(data);
      console.warn(parseData);

      setSelectedAttractions(parseData);
      console.warn(selectedAttractions);
    }
  }, []);
  useEffect(() => {
    // Log the updated selectedAttractions
    console.warn(selectedAttractions);
  }, [selectedAttractions]);
  return (
    <AttractionContext.Provider
      value={[selectedAttractions, setSelectedAttractions]}
    >
      {children}
    </AttractionContext.Provider>
  );
};
//custom hook
const useAttraction = () => {
  return useContext(AttractionContext);
};

export { useAttraction, AttractionProvider };
