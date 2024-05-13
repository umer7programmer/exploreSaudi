import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Allplans = () => {
  const [auth, setAuth] = useAuth();
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  //get plans
  const getPlans = async () => {
    try {
        console.log("<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>");
      const res = await axios.get(
        `http://localhost:8080/api/v1/plan/get-all-plan`
      );

      if (res?.data?.success) {
        // Filter out plans where purchase is true
        console.warn(res.data.plans);
        // const filteredPlans = res.data.plans.filter((plan) => !plan.purchase);
        setPlans(res.data.plans);
        console.warn(plans);
      } else {
        console.warn(res?.data?.message);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getPlans();
  }, []);
  console.log("pppppppppppp",plans);
  return (
    
    <div className="col-8 border rounded-4 px-5 py-5 bg-light">
      <div className="h2 mb-5" style={{ color: "#3A6A3B" }}>
        Plans
      </div>
      {console.log("cccccc",plans.length)}
      {console.log("tttttttttt",plans.length===0)}
      {plans.length === 0 ? (
        <h4 className=" w-25 mx-auto text-center" style={{ color: "#3A6A3B" }}>
          {`${plans.length} plans available `}
        </h4>
      ) : (
        <table className="table table-striped table-hover w-100">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Start Date</th>
              <th>End Date</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((p) => (
              <>
                <tr key={p._id}>
                  <td>{p.planName}</td>
                  <td>{new Date(p.startDate).toLocaleDateString()}</td>
                  <td>{new Date(p.endDate).toLocaleDateString()}</td>

                  <td className="d-flex gap-3">
                    <button
                      className="btn btn-success"
                      onClick={() => navigate(`/single-plan/${p._id}`)}
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
  );
};

export default Allplans;
