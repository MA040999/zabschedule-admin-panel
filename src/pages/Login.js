import React, { useState } from "react";

import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authActions";
import { validateEmail } from "../common/common";
import { addNotificationMsg } from "../redux/auth/authActions";
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";
import app from "../axiosConfig";

function Login({ user }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordDisplay, setPasswordDisplay] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (isResetPassword) {
      if (userId === "")
        return dispatch(
          addNotificationMsg("Please provide an email address", "error")
        );
      if (!validateEmail(userId))
        return dispatch(addNotificationMsg("Invalid email address", "error"));
      try {
        const { data } = await app.post("/auth/forgot-password", {
          userId,
        });
        setIsResetPassword(false);
        dispatch(addNotificationMsg(data?.message, "success"));

        return;
      } catch (error) {
        dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
      }
    } else {
      if (userId === "" || password === "")
        return dispatch(
          addNotificationMsg("Please fill both the fields", "error")
        );

      if (!validateEmail(userId))
        return dispatch(addNotificationMsg("Invalid email address", "error"));
      dispatch(login({ userId, password }, navigate));
    }
  };

  if (user) {
    return <Navigate to="/Home" replace />;
  }

  return (
    <form className="login-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="login-fields-container">
        <img className="logo" src="/logo-white.svg" alt="logo" />
        {isResetPassword ? (
          <div className="reset-password-container">
            <div className="reset-password-heading">
              <h2>Reset Password</h2>
              <p>
                Enter your email and we'll send you an email with the password
                reset link.
              </p>
            </div>
            <div className="input-container">
              <FiUser size={22} color="white" />
              <input
                className="login-input"
                label="User ID"
                placeholder="User ID"
                value={userId}
                autoComplete="username"
                type={"email"}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="login-input-container">
            <div className="input-container">
              <FiUser size={22} color="white" />
              <input
                className="login-input"
                label="User ID"
                placeholder="User ID"
                value={userId}
                autoComplete="username"
                type={"email"}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="input-container">
              <FiLock size={22} color="white" />

              <input
                className="login-input"
                label="Password"
                placeholder="Password"
                type={passwordDisplay ? "password" : "text"}
                autoComplete="current-password"
                id="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!passwordDisplay ? (
                <FiEyeOff
                  size={22}
                  color="white"
                  onClick={() => setPasswordDisplay(!passwordDisplay)}
                />
              ) : (
                <FiEye
                  size={22}
                  color="white"
                  onClick={() => setPasswordDisplay(!passwordDisplay)}
                />
              )}
            </div>
            <p
              className="forgot-password"
              onClick={() => setIsResetPassword(true)}
            >
              Forgot your password?
            </p>
          </div>
        )}
        <div className="btns-container">
          <div className="login-btn-container">
            <button type="submit" className="login-btn">
              {!isResetPassword ? `Login` : `Submit`}
            </button>
          </div>
          {isResetPassword && (
            <div className="login-btn-container">
              <button
                onClick={() => setIsResetPassword(false)}
                className="login-btn cancel-login-btn"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default Login;
