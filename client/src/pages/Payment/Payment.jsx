import React, { useEffect, useState } from "react";

import DropIn from "braintree-web-drop-in-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
const Payment = () => {
  const location = useLocation();
  const { attraction } = location.state || {};
  console.warn(attraction);
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
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
        "http://localhost:8080/api/v1/attraction/payment",
        {
          nonce,
          attraction,
        }
      );
      setLoading(false);

      navigate("/");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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

export default Payment;
