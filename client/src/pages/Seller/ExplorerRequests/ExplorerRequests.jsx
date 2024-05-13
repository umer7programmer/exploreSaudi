import { useEffect, useState } from "react";
import SellerMenu from "../../../components/Layout/SellerMenu/SellerMenu";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout/Layout/Layout";
const ExplorerRequests = () => {
  const [explorerRequests, setExplorerRequests] = useState([]);

  //get Booking request
  const getExplorerRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/seller/get-explorer-requests"
      );
      if (res?.data?.success) {
        setExplorerRequests(res.data.requests);
        console.warn(explorerRequests);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //handleRequest;
  const handleRequest = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/seller/handle-explorer-request/${id}`,
        {
          status,
        }
      );
      console.warn(res.data.success);
      if (res?.data?.success) {
        toast.success(res.data.message);
        getExplorerRequests();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getExplorerRequests();
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
              {explorerRequests.length === 0 ? (
                <div
                  className=" w-25 mx-auto text-center"
                  style={{ color: "#3A6A3B" }}
                >
                  No booking request available
                </div>
              ) : (
                <table className="table table-striped table-hover w-100">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>email</th>
                      <th>price</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {explorerRequests?.map((e) => (
                      <>
                        <tr key={e._id}>
                          <td>{e.buyer.firstName}</td>
                          <td>{e.buyer.lastName}</td>
                          <td>{e.buyer.email}</td>
                          <td>{e.payment.transaction.amount}</td>

                          <td className="d-flex gap-3">
                            <button
                              className="btn btn-success"
                              onClick={() => handleRequest(e._id, "yes")}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleRequest(e._id, "no")}
                            >
                              Delete
                            </button>
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

export default ExplorerRequests;
