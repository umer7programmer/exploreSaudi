import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CatgeoryBaseAttraction = () => {
  const { name } = useParams();
  console.warn(name);
  const [attractions, setAttractions] = useState([]);

  const CatgeoryBaseAttraction = async () => {
    try {
      console.warn(name);
      const res = await axios.get(
        `http://localhost:8080/api/v1/attraction/attraction-type/${name}`
      );
      
      if (res?.data?.success) {
        setAttractions(res.data.attractions);
      } else {
        console.warn(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    CatgeoryBaseAttraction();
  }, []);
  return (
    <Layout>
      <div className="container py-5">
        {!attractions || attractions.length === 0 ? (
          <>
            <h4 className=" text-center">No attraction found</h4>
          </>
        ) : (
          <>
            <h4 className="text-center">
              {attractions.length} attraction found
            </h4>
            <div className="d-flex flex-row flex-wrap  mt-5 gap-5  justify-content-center">
              {attractions?.map((attraction) => (
                <Link to={`/single-attraction/${attraction.slug}`}>
                  <div key={attraction._id} className="main my-2 mx-2   ">
                    <img
                      style={{ width: "360px", height: "360px" }}
                      src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                      alt="Card image"
                      className="rounded-4"
                    />
                    <div className="body">
                      <h4 className=" h3 text-light">{attraction.name}</h4>
                      <p className="text-light">
                        {new Date(attraction.startDate).toLocaleDateString()}
                      </p>
                      <div className="text-light h5">{attraction.price}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CatgeoryBaseAttraction;
