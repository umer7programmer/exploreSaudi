import { useEffect, useState } from "react";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout/Layout/Layout";
const BookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);

  //get Booking request
  const getBookingRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/seller/get-booking-requests"
      );
      if (res?.data?.success) {
        setBookingRequests(res.data.planRequest);
        console.warn(bookingRequests);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //handleAcceptRequest
  const handleAcceptRequest = async (planId) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/seller/accept-request/${planId}`
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        getBookingRequests();
      }
    } catch (error) {
      console.warn(error);
    }
  };
  //handleCancelRequest
  const handleDeleteRequest = async (planId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/seller/cancel-request/${planId}`
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        getBookingRequests();
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getBookingRequests();
  }, []);
  return (
    <>
      <div>
        <div className="container-fluid py-5  seller-dashboard-background">
          <div className="row ">
            <div className="col-3">
              <SellerMenu />
            </div>

            <div className="col-8 border rounded-4 px-5 py-5 bg-light">
              <div className="h2 mb-5" style={{ color: "#3A6A3B" }}>
                Booking Requests
              </div>
              {bookingRequests.length === 0 ? (
                <div
                  className=" w-25 mx-auto text-center"
                  style={{ color: "#3A6A3B" }}
                >
                  No Booking request available
                </div>
              ) : (
                <table className="table table-striped table-hover w-100">
                  <thead>
                    <tr>
                      <th>Plan Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingRequests?.map((b) => (
                      <>
                        <tr key={b._id}>
                          <td>{b.planName}</td>
                          <td>{new Date(b.startDate).toLocaleDateString()}</td>
                          <td>{new Date(b.endDate).toLocaleDateString()}</td>

                          <td className="d-flex gap-3">
                            <button
                              className="btn btn-success"
                              onClick={() => handleAcceptRequest(b._id)}
                            >
                              Accept
                            </button>
                            {/* <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteRequest(b._id)}
                          >
                            Delete
                          </button> */}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingRequests;
