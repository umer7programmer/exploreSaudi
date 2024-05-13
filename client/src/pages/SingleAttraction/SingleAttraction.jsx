import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout/Layout";
import Rating from "../../components/Rating/Rating";

const SingleAttraction = () => {
  const { slug } = useParams();
  const [attraction, setAttraction] = useState([]);

  const navigate = useNavigate();
  const getSingleAttraction = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/attraction/get-attraction/${slug}`
      );
      if (res?.data?.success) {
        setAttraction(res.data.attraction);
        console.log(attraction, "attraction bro attraction");
      } else {
        console.warn(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getSingleAttraction();
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-7  px-5 pt-3 d-flex flex-column gap-4   ">
              <div className="h2 text-color-heading">{attraction.name}</div>
              <div>{`Validate between ${new Date(
                attraction.startDate
              ).toLocaleDateString()} and ${new Date(
                attraction.endDate
              ).toLocaleDateString()}`}</div>
              <div className="d-flex flex-column gap-2">
                <div className="h4">Average Rating</div>
                {attraction?.averageRating == 0 ? (
                  <div>{<Rating rating={5} />}</div>
                ) : (
                  <div>{<Rating rating={attraction.averageRating} />}</div>
                )}
              </div>

              {attraction?.averageRating !== 0 && (
                <>
                  <div className="d-flex flex-column gap-2 ">
                    <div className="h4"> Reviews</div>
                    <div className="d-flex flex-column gap-3">
                      {attraction?.reviews?.map((r) => (
                        <div className="d-flex flex-column gap-2">
                          <div className="fw-bold">{r?.ser?.firstName}</div>
                          <div>{r?.reviews}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="d-flex flex-column gap-2">
                <div className="h4">Price</div>
                <div>{attraction.price}SAR</div>
              </div>
              <button
                className="btn text-light   "
                style={{ background: "#1dbf73", width: "300px" }}
                onClick={() =>
                  navigate("/payment", { state: { attraction: attraction } })
                }
              >
                Book Tickets
              </button>
              <div className="d-flex flex-column gap-2">
                <div className="h4">About</div>
                <div>{attraction.description}SAR</div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="h4">Terms & Conditions</div>
                <ul className="">
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    You can use your tickets anytime at any day between 22
                    February 2024 and 3 March 2024
                  </li>
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    Due to limited capacity, admission to experience is subject
                    to availability and on a first come first served basis.
                  </li>
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    All sales are final. No refunds allowed.
                  </li>
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    Tickets included in the bundle are "Regular" type.
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-5 ">
              <img
                className="rounded-4"
                style={{ width: "100%", height: "700px" }}
                src={`http://localhost:8080/api/v1/attraction/get-photo/${attraction._id}`}
                alt="Card image"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleAttraction;
