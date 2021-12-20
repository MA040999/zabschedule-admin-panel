import React, { useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authActions";
// import { validateEmail } from "../common/common";
import { addNotificationMsg } from "../redux/auth/authActions";

function Login({ user }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  let handleSubmit = function (e) {
    e.preventDefault();
    if (userId === "" || password === "") {
      dispatch(addNotificationMsg("Please fill both the fields", "error"));
    } else {
      // if (validateEmail(userId)) {
      //   dispatch(login({ userId, password }, navigate, socket));
      // } else {
      //   dispatch(addNotificationMsg("Email address is invalid", 'error'));
      // }

      dispatch(login({ userId, password }, navigate));

      // navigate("/Home", { replace: true });
    }
  };

  if (user) {
    return <Navigate to="/Home" replace />;
  }

  return (
    <form className="login-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="login-fields-container">
        <img className="logo" src="/logo-white.svg" alt="logo" />
        <div className="login-input-container">
          <input
            className="login-input"
            label="Registration Number"
            placeholder="Registration Number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            className="login-input"
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-btn-container">
          <button type="submit" className="login-btn">
            Login
          </button>
          {/* <div className="login-link-container">
            <p>Don't have an account?</p>
            <button className="btn" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div> */}
        </div>
      </div>
    </form>
  );
}

export default Login;
