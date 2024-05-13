import React from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { useSearch } from "../../context/search";
import { Link } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useSearch();
  return (
    <>
      <Layout>
        <div className="container-fluid my-5">
          <div className="text-center h2">{`Search for ${value.keyword}`}</div>
          <div className="text-center my-3">
            {value?.result?.length < 1
              ? "No Zone found"
              : `${value?.result?.length} zones found`}
          </div>
          <div className="container d-flex flex-wrap my-5 gap-4  justify-content-center">
            {value.result?.map((z) => {
              return (
                <div
                  className="card mx-3"
                  key={z._id}
                  style={{ width: "350px" }}
                >
                  <img
                    className="card-img-top"
                    style={{ height: "280px" }}
                    src={`http://localhost:8080/api/v1/zone/get-photo/${z._id}`}
                    alt="Card image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{z.name}</h5>
                    <p className="card-text">
                      {z.description.substring(0, 30)}...
                    </p>
                    <Link to={`/zone/${z._id}`} state={{ zoneDetail: z }}>
                      <button
                        className="btn text-light w-100 "
                        style={{ background: "#1dbf73" }}
                      >
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
