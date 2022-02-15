import React from "react";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authActions";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname.split("/").includes("reset-password")
  ) {
    return null;
  } else {
    return (
      <>
        <div className="navbar-container">
          <img className="navbar-logo" src="logo-white.svg" alt="" />
          <div className="navbar-links">
            <NavLink
              to="/Home"
              className={({ isActive }) =>
                `navbar-link-container ${isActive ? "active" : ""}`
              }
            >
              <BsFillCalendar2WeekFill className="navbar-icon" size={22} />
              <p>Combined Schedule</p>
            </NavLink>
            <NavLink
              to="/Lab"
              className={({ isActive }) =>
                `navbar-link-container ${isActive ? "active" : ""}`
              }
            >
              <ImLab className="navbar-icon" size={22} />
              <p>Lab Schedule</p>
            </NavLink>
            <NavLink
              to="/Requests"
              className={({ isActive }) =>
                `navbar-link-container ${isActive ? "active" : ""}`
              }
            >
              <FaClipboardList className="navbar-icon" size={22} />
              <p>Requests</p>
            </NavLink>
            <div
              className="navbar-link-container logout modal-btn"
              onClick={() => {
                dispatch(logout(navigate));
              }}
            >
              <FiLogOut className="navbar-icon" size={22} />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
