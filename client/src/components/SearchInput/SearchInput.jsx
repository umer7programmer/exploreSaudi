import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate();

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/zone/search/${value.keyword}`
      );
      if (res?.data?.success) {
        setValue({ ...value, result: res?.data?.zones });
        console.log(value.result);
        navigate("/search");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <form className="d-flex flex-col ">
      <input
        className="form-control w-100 "
        placeholder="Search events,restaurants,artists..."
        value={value.keyword}
        onChange={(e) => setValue({ ...value, keyword: e.target.value })}
      />
      <button
        className="btn text-light ms-1"
        style={{ background: "#1dbf73" }}
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
