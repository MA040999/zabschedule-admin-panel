import React, { useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authActions";
// import { validateEmail } from "../common/common";
import { addNotificationMsg } from "../redux/auth/authActions";

function Login({ user }) {
  const navigate = useNavigate();

  if (user) {
    navigate("/Home", { replace: true });
  }
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  let handleSubmit = function (e) {
    e.preventDefault();
    if (userId === "" || password === "") {
      dispatch(addNotificationMsg("Please fill both the fields"));
    } else {
      // if (validateEmail(userId)) {
      //   dispatch(login({ userId, password }, navigate, socket));
      // } else {
      //   dispatch(addNotificationMsg("Email address is invalid"));
      // }

      dispatch(login({ userId, password }, navigate));

      // navigate("/Home", { replace: true });
    }
  };

  return (
    <form className="login-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="login-fields-container">
        <h2>LOGIN</h2>
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
