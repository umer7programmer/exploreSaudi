import React, { useState } from "react";

import "./Reports.css";
import axios from "axios";

import { Select } from "antd";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const Reports = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [type, setType] = useState("");
  const [comments, setComments] = useState("");

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/report", {
        firstName,
        lastName,
        email,
        description,
        contactNumber,
        type,
        comments,
      });
      console.warn(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <div className="h2 my-4">Report Problem</div>
      <form onSubmit={handleSubmit}>
        <div className="w-50 ms-2">
          <div className="d-flex flex-row justify-content-between">
            <div>
              <label className="form-label">First Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="eg.Hamza"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Last Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="eg.Khan"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between mt-3">
            <div>
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="eg.Hamza@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Contact No</label>
              <input
                className="form-control"
                type="number"
                placeholder="eg.03416557034"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="my-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Write your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: "100px" }}
            />
          </div>
          <div className="my-3">
            <Select
              placeholder="Type of issue"
              size="large"
              showSearch
              onChange={(value) => setType(value)}
            >
              <Option value="Payment Issue">Payment Issue</Option>
              <Option value="Service Issue">Service Issue</Option>
              <Option value="Other">Others*</Option>
            </Select>
          </div>

          <div className="my-3">
            <label className="form-label">comments</label>
            <input
              className="form-control"
              type="text"
              placeholder="Write a comment"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>

          <div className="my-4">
            <button
              className="btn text-light w-50"
              style={{ background: "#1dbf73" }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Reports;
