import React, { useEffect, useState } from "react";
import UserMenu from "../../../components/Layout/UserMenu/UserMenu.jsx";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPurchasedPlan = () => {
  const [auth, setAuth] = useAuth();
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const navigate = useNavigate();

  //get pirchasedPlan
  const getPurchasedPlans = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/user/get-purchasedPlans/${auth?.user?._id}`
      );
      if (res?.data?.success) {
        console.warn(purchasedPlans);
        setPurchasedPlans(res.data.purchasedPlans);
        console.warn(purchasedPlans);
      } else {
        console.warn(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getPurchasedPlans();
  }, []);
  return (
    <div>
      <div className="container-fluid py-5  seller-dashboard-background">
        <div className="row ">
          <div className="col-3">
            <UserMenu />
          </div>

          <div
            className="col-8 border rounded-4 px-5 py-5 bg-light"
            style={{ minHeight: "80vh" }}
          >
            <div className="h2 mb-5" style={{ color: "#3A6A3B" }}>
              Purchased Plans
            </div>
            {purchasedPlans.length === 0 ? (
              <div
                className=" w-25 mx-auto text-center"
                style={{ color: "#3A6A3B" }}
              >
                "No Purchased Plans found"
              </div>
            ) : (
              <table className="table table-striped table-hover w-100">
                <thead>
                  <tr>
                    <th>Reference Number</th>
                    <th>Plan Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Price</th>
                    <th>Buyer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasedPlans?.map((p) => (
                    <>
                      <tr key={p._id}>
                        <td>{p._id}</td>
                        <td>{p?.plan?.planName}</td>
                        <td>
                          {new Date(p?.plan?.startDate).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(p?.plan?.endDate).toLocaleDateString()}
                        </td>
                        <td>{p?.payment?.transaction?.amount}</td>
                        <td>{p?.buyer?.firstName}</td>
                        <td>
                          <button
                            className="btn text-light"
                            style={{ background: "#1dbf73" }}
                            onClick={() =>
                              navigate(`/single-purchased-plan/${p.plan._id}`)
                            }
                          >
                            View
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
  );
};

export default UserPurchasedPlan;
