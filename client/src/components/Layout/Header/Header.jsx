import React from "react";
import { useAuth } from "../../../context/auth";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchInput from "../../SearchInput/SearchInput";
import { useTheme } from "../../../context/ThemeContext";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [theme, setTheme] = useTheme();

  const navigate = useNavigate();

  //handle logout function
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    console.warn(theme);
    setTheme((prevState) => {
      const newTheme = prevState === "dark" ? "light" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
    console.warn(theme);
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // //handle theme
  const handleTheme = () => {
    setTheme((prevState) => {
      const newTheme = prevState === "dark" ? "light" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <>
      {/* <div className='container-fluid' >
  <div className='row  ' style={{height:"60px",backgroundColor:"whitesmoke"}}>
    <div className='col-12 d-flex flex-row justify-content-between align-items-center text-black ' >
<div className='logo'>
<a>Explore Saudi</a>
</div>
<SearchInput/>
<ul className=' d-flex flex-row list-unstyled align-items-center my-auto '   >
<Link to="/">  <li className='px-2' >Home</li></Link>
  <li className='px-2'>Tour</li>
  <li className='px-2'>Blog</li>
  <li className='px-2'>Pages</li>
  <li className='px-2'>Contact</li>
 
</ul>

{
  !auth?.user ? (
    <>
    <div >
<button className='btn btn-primary mx-1 '>
  Sign In
</button>
<button className='btn btn-primary mx-1 '>
  Sign Up
</button>
</div>
    </>
  ) : (
    <>
    <div className='d-flex justify-content-center align-items-center'>
    <Badge count={auth?.user?.notification.length} className='me-3' onClick={()=>navigate(`/dashboard/${auth?.user?.isAdmin===true ? "admin" :"user" }/notifications`)}>
<img src="/images/bell.png" style={{height:"20px",width:"20px"}} alt="notifications" >
 
 </img>
</Badge>




   
    
<div className="dropdown ms-2">
  <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
 {   auth?.user?.firstName}
  </button>
  <ul className="dropdown-menu">

    <li><NavLink className="dropdown-item bg-transparent text-color-header" to={`/dashboard/${auth?.user?.isAdmin ? "admin" : "user"}`}>Dashboard</NavLink></li>
    <li onClick={handleLogout}><NavLink className="dropdown-item bg-transparent text-color-header" >Logout</NavLink></li>
  
  </ul>
</div>
    </div>

    </>
  )
}
    </div>
  </div>

</div> */}

      <div className="container-fluid   ">
        <div className="row  ">
          <div
            className="col-12  d-flex flex-row justify-content-between  mx-auto py-3   "
            style={{ width: "85%" }}
          >
            <div className="d-flex   gap-2   h-100">
              <Link to="/See&Do">
                <img
                  src="/images/logo.png "
                  className="  h-100  "
                  style={{ width: "100px" }}
                />
              </Link>
              <ul
                className=" list-unstyled d-flex gap-5  h-100  align-items-center ms-3"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                <NavLink
                  to="/See&Do"
                  className="text-decoration-none text-color-header"
                >
                  <li>Explore</li>
                </NavLink>
                <NavLink
                  to="/create-plan"
                  className="text-decoration-none text-color-header"
                >
                  <li>Plan your trip</li>
                </NavLink>
                <NavLink
                  to="/travel-essentials"
                  className="text-decoration-none text-color-header"
                >
                  <li>Travel essential</li>
                </NavLink>
                <NavLink
                  to="/saudi-calendar"
                  className="text-decoration-none text-color-header"
                >
                  <li>Saudi Calendar</li>
                </NavLink>

                <NavLink
                  to="/experiences"
                  className="text-decoration-none text-color-header"
                >
                  <li>Experiences</li>
                </NavLink>
                <NavLink
                  to="/sellers"
                  className="text-decoration-none text-color-header"
                >
                  <li>Service Providers</li>
                </NavLink>
                <NavLink
                  to="/home-zones"
                  className="text-decoration-none text-color-header"
                >
                  <li>Zones</li>
                </NavLink>
              </ul>
            </div>
            <div className=" d-flex align-items-center ">
              {!auth?.user ? (
                <>
                  <div>
                    <Link to="/login">
                      <button
                        className="btn text-light ms-1"
                        style={{ background: "#1dbf73" }}
                      >
                        Sign In
                      </button>
                    </Link>
                    <Link to="/register">
                      <button
                        className="btn text-light ms-1"
                        style={{ background: "#1dbf73" }}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div class="dropdown">
                    <img
                      className="dropdown-toggle rounded-circle border"
                      data-bs-toggle="dropdown"
                      src={`http://localhost:8080/api/v1/user/get-photo/${auth?.user?._id}`}
                      style={{ width: "30px", height: "30px" }}
                    />

                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          {auth?.user?.firstName}
                        </a>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item bg-transparent text-dark"
                          to={`/dashboard/${
                            auth?.user?.role === "Admin"
                              ? "admin/user"
                              : auth?.user?.role === "Explorer"
                              ? "user/profile"
                              : "seller/profile"
                          }`}
                          onClick={handleTheme}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li onClick={handleLogout}>
                        <NavLink className="dropdown-item bg-transparent text-dark">
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-12 w-75  mx-auto  d-flex flex-column justify-content-center align-items-center gap-2   py-5 ">
            <div className="h4 text-color-search">
              Book the Best Events, Experiences and Shows in Saudi
            </div>
            <div
              style={{
                width: "400px",
              }}
            >
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
