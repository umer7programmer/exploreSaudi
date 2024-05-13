import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all products
  const getAllAttractions = async () => {
    try {
      console.warn("hello");
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/v1/attraction/attraction-list/${page}`
      );

      if (res?.data?.success) {
        setLoading(false);
        setAttractions(res?.data?.attractions);
      } else {
        setLoading(false);
        alert(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/attraction/attraction-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/attraction/attraction-list/${page}`
      );
      setLoading(false);
      setAttractions([...attractions, ...data?.attractions]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAttractions();
    getTotal();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-3">
              <AdminMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-3" style={{ color: "#3A6A3B" }}>
                Attractions
              </div>
              <div
                className="w-25 mx-auto  text-center my-5"
                style={{ color: "#3A6A3B", fontSize: "20px" }}
              >
                {attractions?.length} attractions present
              </div>
              <table className="table table-striped table-hover w-100">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attractions?.map((a) => (
                    <>
                      <tr key={a._id}>
                        <td>
                          {
                            <img
                              src={`http://localhost:8080/api/v1/attraction/get-photo/${a._id}`}
                              style={{ width: "100px", height: "100px" }}
                              className="rounded"
                            />
                          }
                        </td>
                        <td>{a.name}</td>
                        <td>{new Date(a.startDate).toLocaleDateString()}</td>
                        <td>{new Date(a.endDate).toLocaleDateString()}</td>
                        <td>{a.price}</td>

                        <td>
                          <Link
                            className="text-decoration-none"
                            to={`/dashboard/admin/attractions/${a.slug}`}
                          >
                            <button className="btn btn-warning"> Edit</button>
                          </Link>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="m-2 p-3   w-100 text-center">
                {attractions && attractions.length < total && (
                  <button
                    className="btn text-light"
                    style={{ background: "#1dbf73" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading ..." : <> Loadmore</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Attractions;
