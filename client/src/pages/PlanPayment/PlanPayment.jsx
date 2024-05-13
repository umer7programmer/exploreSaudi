import React, { useEffect, useState } from "react";

import DropIn from "braintree-web-drop-in-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
const PlanPayment = () => {
  const location = useLocation();
  const { planId } = location.state || {};
  console.warn(planId);
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [planInfo, setPlanInfo] = useState(null);
  const [id, setId] = useState(null);


  const navigate = useNavigate();
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/attraction//token"
      );
      setClientToken(data?.clientToken);
      console.warn(clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      console.warn("hello");
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/plan/plan-payment/${planId}`,
        {
          nonce,
        }
      );

      const res = await axios.post("http://localhost:8080/api/v1/plan/create", {
        userId: planInfo?.userId,
        planName: planInfo.planName,
        planGenerationType: planInfo.planGenerationType,
        planType: planInfo.planType,
        capacity: planInfo.capacity,
        startDate: planInfo.startDate,
        endDate: planInfo.endDate,
        cities: planInfo.cities,
        price: totalPrice,
      });
      if (res?.data?.success) {
        localStorage.removeItem("plan");
        // toast.success(res?.data?.message);
      } else {
        // toast.error(res?.data?.message);
      }
      setLoading(false);
      toast.success("Payment Completed Successfully");

      setTimeout(() => {
        if (auth?.user?.role === "Admin") {
          navigate("/dashboard/admin/purchased-plans");
        } else {
          navigate("/dashboard/user/purchased-plans");
        }
      }, 2000);


    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const convertDatesInCities = (cities) => {
    return cities?.map((c) => ({
      ...c,
      date: new Date(c.date),
    }));
  };

  const getStoredPlan = () => {
    try {
      const storedPlan = localStorage.getItem("plan");
      if (storedPlan) {
        const plan = JSON.parse(storedPlan);
        plan.startDate = new Date(plan.startDate);
        plan.endDate = new Date(plan.endDate);
        plan.cities = convertDatesInCities(plan.cities);
        setId(plan?.userId);
        setPlanInfo(plan);
        console.warn(planInfo, 'this is the plan info');
        console.warn(id);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getStoredPlan();
  }, []);

  return (
    <Layout>
      <div className="container my-5 py-5 d-flex flex-column gap-3">
        <div>
          {!clientToken || !auth?.token ? (
            ""
          ) : (
            <>
              <div>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              </div>
            </>
          )}
        </div>
        <button
          onClick={handlePayment}
          disabled={loading || !instance}
          className="btn text-light"
          style={{ background: "#1dbf73" }}
        >
          {loading ? "Processing ...." : "Make Payment"}
        </button>
      </div>
    </Layout>
  );
};

export default PlanPayment;
