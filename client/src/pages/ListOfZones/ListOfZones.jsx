import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout/Layout";
import { usePlan } from "../../context/plan";
import { useAuth } from "../../context/auth";

const ListOfZones = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.warn(auth?.token);

  //Access the id
  const { id } = useParams();
  console.warn(id);

  const { date } = location.state || {};

  const [zones, setZones] = useState([]);

  //getZones
  const getZones = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/zone/get-zones-city/${id}`,
        {
          params: { date },
        }
      );

      if (res?.data?.success) {
        setZones(res.data.filteredZones);
      } else {
        setError("An error occurred while fetching zones.");
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getZones();
  }, []);

  return (
    <>
      <Layout>
        <div className="container-fluid py-5  ">
          <div className="container ">
            <div
              className=" mx-auto h4 text-center"
              style={{ color: "#3A6A3B" }}
            >
              {zones && zones?.length > 0 ? (
                <>{zones?.length} zones in city</>
              ) : (
                <>No Zone available</>
              )}
            </div>
            <div className=" my-5 d-flex flex-row flex-wrap gap-5">
              {zones?.map((zone) => {
                return (
                  <div className="card" style={{ width: 300 }}>
                    <img
                      className="card-img-top"
                      src={`http://localhost:8080/api/v1/zone/get-photo/${zone._id}`}
                      alt="Card image"
                      height={200}
                      width={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{zone.name}</h5>
                      <p className="card-text">
                        {zone.description.substring(0, 30)}...
                      </p>
                      <button
                        className="btn text-light"
                        style={{ background: "#1dbf73" }}
                        onClick={() =>
                          navigate(`/list-of-attractions/${zone._id}`, {
                            state: {
                              date: date,
                              cityId: id,
                            },
                          })
                        }
                      >
                        Add Attractions
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ListOfZones;
