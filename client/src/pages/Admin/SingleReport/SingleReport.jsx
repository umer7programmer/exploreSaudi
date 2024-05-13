import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

const SingleReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  //get single report
  const getSingleReport = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/admin/get-reports/${id}`
      );
      if (res?.data?.success) {
        setReport(res.data.report);
        console.warn(report);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  //resolveReport
  const resolveReport = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/admin/resolve-reports/${id}`
      );
      if (res?.data?.success) {
        toast.success(res.data?.message);
        navigate("/dashboard/admin/submitted-reports");
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getSingleReport();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid   py-5">
          <div className="row">
            <div className="col-3">
              <AdminMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-5 text-color">Report</div>
              <div className="d-flex flex-column gap-4 w-50 ">
                <div className="d-flex flex-row w-50  justify-content-between ">
                  <div className="d-flex flex-column gap-2">
                    <div style={{ fontSize: "18px ", fontWeight: 500 }}>
                      First Name
                    </div>
                    <div>{report?.firstName}</div>
                  </div>
                  <div className="d-flex flex-column gap-2 ">
                    <div style={{ fontSize: "18px ", fontWeight: 500 }}>
                      Last Name
                    </div>
                    <div>{report?.lastName}</div>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <div style={{ fontSize: "18px ", fontWeight: 500 }}>
                    Email
                  </div>
                  <div>{report?.email}</div>
                </div>
                <div className="d-flex flex-column gap-2 w-100 p">
                  <div style={{ fontSize: "18px ", fontWeight: 500 }}>
                    Description
                  </div>
                  <div>{report?.description}</div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <div style={{ fontSize: "18px ", fontWeight: 500 }}>Type</div>
                  <div>{report?.type}</div>
                </div>
                <div className="d-flex flex-column gap-2 w-100 p">
                  <div style={{ fontSize: "18px ", fontWeight: 500 }}>
                    Comments
                  </div>
                  <div>{report?.comments}</div>
                  <button
                    className="btn text-light my-3"
                    style={{ background: "#1dbf73" }}
                    onClick={() => resolveReport(report?._id)}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SingleReport;
