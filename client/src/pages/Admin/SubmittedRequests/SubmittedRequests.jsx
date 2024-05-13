import React, { useEffect, useState } from "react";

import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SubmittedRequests = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const getAllReports = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/admin/get-reports"
      );
      if (res?.data?.success) {
        setReports(res?.data?.reports);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getAllReports();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-3">
              <AdminMenu />
            </div>
            <div className="col-8 border rounded-4 px-5 py-5">
              <div className="h2 mb-3">List of reports</div>

              <table className="table table-striped table-hover w-100">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Report Type</th>
                    <th>Contact Number</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports?.map((r) => (
                    <>
                      <tr key={r._id}>
                        <td>{r.firstName}</td>
                        <td>{r.lastName}</td>
                        <td>{r.type}</td>
                        <td>{r.contactNumber}</td>

                        {/* to={`/dashboard/admin/attractions/${a.slug}`} */}
                        <td>
                          <Link
                            className="text-decoration-none"
                            to={`/dashboard/admin/single-report/${r._id}`}
                          >
                            <button className="btn btn-success">View</button>
                          </Link>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SubmittedRequests;
