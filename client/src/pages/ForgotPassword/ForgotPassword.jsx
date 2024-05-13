import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const navigate = useNavigate();

  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        {
          email,
          answer,
          newPassword,
        }
      );
      if (res && res.data.success) {
        toast.success(res?.data?.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
      console.warn(res);
    } catch (error) {}
  };

  return (
    <>
      <div className="container-fluid  " style={{ height: "100vh" }}>
        <div className="row">
          <div
            className="col-6 w-50  sign_in__image"
            style={{ height: "99.8vh" }}
          ></div>
          <div
            className="col-6 d-flex justify-content-center align-items-center"
            style={{ height: "99.8vh" }}
          >
            <div className="d-flex flex-column w-50">
              <div className="h3 my-3">Forgot Password</div>

              <form
                className="d-flex flex-column  my-1 "
                onSubmit={handleSubmit}
              >
                <label className="form-label">
                  Email Address <span>*</span>
                </label>
                <input
                  className="form-control my-2"
                  type="email"
                  placeholder="eg.abc@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label className="form-label">
                  Answer <span>*</span>
                </label>
                <input
                  className="form-control my-2"
                  type="text"
                  placeholder="eg.hockey"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />

                <label className="form-label">
                  New Password <span>*</span>
                </label>
                <input
                  className="form-control my-2"
                  type="password"
                  placeholder="eg.Choose your new password"
                  value={newPassword}
                  onChange={(e) => {
                    setnewPassword(e.target.value);
                  }}
                />
                <button
                  className="btn text-light mt-2"
                  style={{ background: "#1dbf73" }}
                  type="submit"
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
