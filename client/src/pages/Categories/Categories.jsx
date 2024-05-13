import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  //get all category function
  const getAllCategoryFunction = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/category"
      );
      console.warn(res.data);
      if (res.data.success) {
        setCategories(res?.data?.categories);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getAllCategoryFunction();
  }, []);

  return (
    <div className="container my-5 pb-5">
      <h2 className="my-5 all-headings-textColor">Explore by categories</h2>
      <div className="d-flex flex-row flex-wrap gap-5 justify-content-center ">
        {categories?.map((c) => {
          return (
            <>
              <Link
                to={`/category/${c.name}`}
                className="text-decoration-none text-dark"
              >
                <div
                  key={c._id}
                  className=" shadow rounded-4 d-flex flex-column gap-3 justify-content-center justify-content-center align-items-center"
                  style={{
                    backgroundColor: "lightgray",
                    height: "155px",
                    width: "275px",
                  }}
                >
                  <img
                    className="rounded-circle "
                    style={{ width: "50px", height: "50px" }}
                    src={`http://localhost:8080/api/v1/category/get-photo/${c._id}`}
                    alt="pic not found"
                  />
                  {c.name}
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
