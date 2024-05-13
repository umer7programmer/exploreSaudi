import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout/Layout";
import Rating from "../../components/Rating/Rating";
import { Select } from "antd";
const SingleSeller = () => {
  const { id } = useParams();
  console.warn(id);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [seller, setSeller] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const option = [];
  for (let i = 1; i < 100; i++) {
    option.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }
  console.warn(option);

  const getSingleSeller = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/seller/get-seller/${id}`
      );
      if (res?.data?.success) {
        setSeller(res.data.seller);
        console.warn(seller);
      } else {
        console.warn(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  const handleNumberOfDaysChange = (value) => {
    setNumberOfDays(value);

    calculateUpdatedPrice(value);
  };

  // Function to calculate updated price
  const calculateUpdatedPrice = (value) => {
    let updatedPrice = seller.price * value;
    setPrice(updatedPrice);
  };
  useEffect(() => {
    getSingleSeller();
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-12  px-5 pt-3 d-flex flex-column gap-4 ">
              <h2
                className="w-100 text-center my-3"
                style={{ color: "#3A6A3B" }}
              >
                Seller Information
              </h2>
              <div className="h3 text-color-heading">
                {seller?.firstName} {seller?.lastName}
              </div>
              {seller?.averageRating !== 0 && (
                <>
                  <div className="d-flex flex-column gap-2">
                    <div className="h4">Average Rating</div>
                    <div>{<Rating rating={seller.averageRating} />}</div>
                  </div>

                  <div className="d-flex flex-column gap-2 ">
                    <div className="h4"> Reviews</div>
                    <div className="d-flex flex-column gap-3">
                      {seller?.reviews?.map((s) => (
                        <div className="d-flex flex-column gap-2">
                          <div className="fw-bold">{s.user.firstName}</div>
                          <div>{s.reviews}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div
                className="d-flex flex-column gap-2 "
                style={{ width: "180px" }}
              >
                <div className="h4">Number of Days</div>
                <Select
                  defaultValue={numberOfDays}
                  onChange={handleNumberOfDaysChange}
                >
                  {option}
                </Select>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="h4">Price</div>
                <div className="text-color-search text-decoration-none py-2">
                  {seller?.price && (
                    <>
                      {price === 0 ? (
                        <>
                          {seller?.price} SAR for {numberOfDays} days
                        </>
                      ) : (
                        <>
                          {price} SAR for {numberOfDays} days
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <button
                className="btn text-light   "
                style={{ background: "#1dbf73", width: "300px" }}
                onClick={() =>
                  navigate("/seller-payment", {
                    state: { sellerId: seller?._id, price: price },
                  })
                }
              >
                Book Seller
              </button>
              <div className="d-flex flex-column gap-2 w-75">
                <div className="h4">About</div>
                <div
                  className="text-color-search text-decoration-none py-2"
                  style={{ fontSize: 17 }}
                >
                  {seller.description}
                </div>
              </div>
              <div className="d-flex flex-column gap-2 w-75">
                <div className="h4">Terms & Conditions</div>
                <ul className="">
                  <li
                    className="text-color-search text-decoration-none py-2"
                    style={{ fontSize: 18 }}
                  >
                    Prior reservation is required for ticket redemption. Please
                    book your experience in advance to secure your preferred
                    date and time slot
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
                    Participation in the experience is at your own risk. The
                    seller and venue management are not liable for any injuries,
                    damages, or loss of property incurred during the course of
                    the experience
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleSeller;
