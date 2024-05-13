import React, { useEffect, useMemo, useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Select } from "antd";
import countryList from "react-select-country-list";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [providedService, setProvidedService] = useState("");
  const [nationality, setNationality] = useState("");
  const [photo, setPhoto] = useState("");
  //location object
  const location = useLocation();

  //extract countries
  const options = useMemo(() => countryList().getData(), []);

  const navigate = useNavigate();
  // form submit function

  //get cities
  const getCities = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/cities/get");
      console.warn(res);
      if (res?.data?.success) {
        setCities(res.data.cities);
        console.warn(cities);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSubmitExplorer = async (e) => {
    e.preventDefault();
    const explorerData = new FormData();

    explorerData.append("firstName", firstName);
    explorerData.append("lastName", lastName);
    explorerData.append("email", email);
    explorerData.append("password", password);

    explorerData.append("phone", phone);
    photo && explorerData.append("photo", photo);
    explorerData.append("answer", answer);
    explorerData.append("nationality", nationality);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        explorerData
      );
      if (res && res.data.success) {
        toast.success(res?.data?.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //handleSubmitSeller
  const handleSubmitSeller = async (e) => {
    e.preventDefault();
    const sellerData = new FormData();
    sellerData.append("firstName", firstName);
    sellerData.append("lastName", lastName);
    sellerData.append("email", email);
    sellerData.append("password", password);

    sellerData.append("phone", phone);
    photo && sellerData.append("photo", photo);
    sellerData.append("answer", answer);
    sellerData.append("providedService", providedService);
    sellerData.append("city", city);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/seller/become-seller",
        sellerData
      );
      if (res && res.data.success) {
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    if (location.state && location.state.role) {
      setRole(location.state.role);

      getCities();
    }
  }, [location.state]);
  return (
    <>
      <div className="container-fluid  " style={{ minHeight: "170vh" }}>
        <div className="row">
          <div
            className="col-6 w-50 sign_up__image"
            style={{ minHeight: "170vh" }}
          ></div>
          <div
            className="col-6 d-flex justify-content-center align-items-center"
            style={{ minHeight: "170vh" }}
          >
            {role === "Seller" ? (
              <div className="d-flex flex-column w-50">
                <div className="h3 my-1">Sign Up With Saudi Smart ID</div>
                <p className="my-1 lh-3 fw-400 ">
                  Enjoy Saudi Smart ID,your single account to access all Visit
                  Saudi offerings
                </p>
                <div className="d-flex flex-column  mt-3">
                  <label className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="eg.John"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <label className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="eg.John"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <label className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="email"
                    placeholder="eg.abc@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <label className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="tel"
                    placeholder="eg.03416557034"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <label className="form-label">
                    City <span className="text-danger">*</span>
                  </label>
                  <Select
                    className="w-50"
                    placeholder="Select a city"
                    size="large"
                    showSearch
                    onChange={(value) => setCity(value)}
                  >
                    {cities?.map((c) => {
                      return (
                        <Option key={c._id} value={c._id}>
                          {c.cityName}
                        </Option>
                      );
                    })}
                  </Select>
                  <label className="form-label">
                    Answer <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="What is your favourite sport"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                    }}
                  />

                  <label className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="password"
                    placeholder="eg.Choose your own password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Select
                    className="my-2"
                    placeholder="Select provided service"
                    size="large"
                    showSearch
                    onChange={(value) => setProvidedService(value)}
                  >
                    <Select.Option value="Driver">Driver</Select.Option>
                    <Select.Option value="Guider">Guider</Select.Option>
                    <Select.Option value="Translator">Translator</Select.Option>
                  </Select>
                  <div className="my-3">
                    <label className="form-label ">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        className="form-control my-2 "
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </label>
                  </div>

                  <div className="my-3  text-center">
                    {photo && (
                      <div>
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="attraction photo"
                          height={"200px"}
                          className="w-50 rounded-circle"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    className="btn text-light mt-2"
                    style={{ background: "#1dbf73" }}
                    onClick={handleSubmitSeller}
                  >
                    Sign up
                  </button>
                </div>

                <Link to="/login" className="text-primary mx-auto mt-2">
                  Or Sign in instead
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-column w-50">
                <div className="h3 my-1">Sign Up With Saudi Smart ID</div>
                <p className="my-1 lh-3 fw-400 ">
                  Enjoy Saudi Smart ID,your single account to access all Visit
                  Saudi offerings
                </p>
                <div className="d-flex flex-column  mt-3 ">
                  <label className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="eg.John"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <label className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="eg.John"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <label className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="email"
                    placeholder="eg.abc@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <label className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="tel"
                    placeholder="eg.03416557034"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <label className="form-label">
                    Answer <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="text"
                    placeholder="What is your favourite sport"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                    }}
                  />

                  <label className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control my-1"
                    type="password"
                    placeholder="eg.Choose your own password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Select
                    className="my-2"
                    placeholder="Select Country "
                    size="large"
                    showSearch
                    onChange={(value) => setNationality(value)}
                  >
                    {options?.map((o) => (
                      <Select.Option key={o.value} value={o.label}>
                        {options?.label}
                      </Select.Option>
                    ))}
                  </Select>
                  <div className="my-3">
                    <label className="form-label ">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        className="form-control my-2 "
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </label>
                  </div>

                  <div className="my-3  text-center">
                    {photo && (
                      <div>
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="attraction photo"
                          height={"200px"}
                          className="w-50 rounded-circle"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    className="btn text-light mt-2"
                    style={{ background: "#1dbf73" }}
                    onClick={handleSubmitExplorer}
                  >
                    Sign up
                  </button>
                </div>

                <Link
                  to="/login"
                  className="text-primary mx-auto mt-2 text-decoration-none"
                >
                  or Sign in instead
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
