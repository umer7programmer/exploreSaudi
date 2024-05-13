import React, { useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { Modal } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res?.data?.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        toast.success(res?.data?.message);
        // Check if the logged-in user is an admin
        if (res?.data?.user?.role === "Admin") {
          navigate("/dashboard/admin/user");
        } else if (res?.data?.user?.role === "Seller") {
          navigate(location.state || "/dashboard/seller/profile");
        } else {
          navigate(location.state || "/");
        }
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
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
              <div className="h3 my-3">Sign In With Saudi Smart ID</div>
              <p className="my-3 lh-3 fw-400 ">
                Enjoy Saudi Smart ID,your single account to access all Visit
                Saudi offerings
              </p>
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
                  Password <span>*</span>
                </label>
                <input
                  className="form-control my-2"
                  type="password"
                  placeholder="eg.Choose your own password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <button
                  className="btn text-light mt-2"
                  style={{ background: "#1dbf73" }}
                  type="submit"
                >
                  Sign in
                </button>
                <button
                  className="btn text-light mt-2"
                  style={{ background: "#1dbf73" }}
                  type="submit"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot Password
                </button>
              </form>

              <Link
                className="text-primary mx-auto mt-2 text-decoration-none"
                onClick={() => setIsVisible(true)}
              >
                Or Sign up instead
              </Link>
              <Modal
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                footer={null}
              >
                <div
                  className="  mx-auto mt-5   text-center"
                  style={{ fontSize: "17px", width: "60%" }}
                >
                  Select if you want to register as a explorer or service
                  provider!
                </div>
                <div className="d-flex flex-row  justify-content-between w-75 mx-auto mt-5 mb-3 ">
                  <button
                    className="btn text-light "
                    onClick={() => {
                      navigate("/register", {
                        state: {
                          role: "Seller",
                        },
                      });
                    }}
                    style={{
                      width: "45%",
                      backgroundColor: "#2C6861",
                    }}
                  >
                    Service Provider
                  </button>
                  <button
                    className="btn text-light "
                    onClick={() => {
                      navigate("/register", {
                        state: {
                          role: "Explorer",
                        },
                      });
                    }}
                    style={{
                      width: "45%",
                      backgroundColor: "#2C6861",
                    }}
                  >
                    Explorer
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
