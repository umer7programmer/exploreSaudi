import { createContext, useContext, useEffect, useState } from "react";

// create seller context
const SellerContext = createContext();

//seller provider

const SellerProvider = ({ children }) => {
  const [selectedSellers, setSelectedSellers] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("selected-sellers");
    if (data) {
      const parseData = JSON.parse(data);
      console.warn(parseData);

      setSelectedSellers(parseData);
      console.warn(selectedSellers);
    }
  }, []);
  useEffect(() => {
    // Log the updated selectedAttractions
    console.warn(selectedSellers);
  }, [selectedSellers]);
  return (
    <SellerContext.Provider value={[selectedSellers, setSelectedSellers]}>
      {children}
    </SellerContext.Provider>
  );
};
//custom hook
const useSeller = () => {
  return useContext(SellerContext);
};

export { useSeller, SellerProvider };
