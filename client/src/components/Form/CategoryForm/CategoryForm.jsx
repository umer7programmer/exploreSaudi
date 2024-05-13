import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="w-50">
        <input
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter category"
        />
        <button
          className="btn text-light mt-2"
          style={{ background: "#1dbf73" }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
