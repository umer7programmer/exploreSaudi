import { createContext, useContext, useState } from "react";

// create search context
const SearchContext = createContext();

//auth provider

const SearchProvider = ({ children }) => {
  const [value, setValue] = useState({
    keyword: "",
    result: [],
  });

  return (
    <SearchContext.Provider value={[value, setValue]}>
      {children}
    </SearchContext.Provider>
  );
};
//custom hook
const useSearch = () => {
  return useContext(SearchContext);
};

export { useSearch, SearchProvider };
