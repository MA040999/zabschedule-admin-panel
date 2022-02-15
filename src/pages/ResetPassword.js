import React, { useEffect, useState } from "react";
import { FiEyeOff, FiLock, FiEye } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import app from "../axiosConfig";
import Loader from "../components/Loader";
import { addNotificationMsg } from "../redux/auth/authActions";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordDisplay, setPasswordDisplay] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "")
      return dispatch(
        addNotificationMsg("Please fill both the fields", "error")
      );
    if (password !== confirmPassword) {
      return dispatch(addNotificationMsg("Passwords do not match", "error"));
    }
    try {
      const { data } = await app.post("/auth/reset-password", {
        password,
        id: params.id,
      });
      navigate("/login");
      dispatch(addNotificationMsg(data?.message, "success"));
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };

  useEffect(() => {
    async function verifyToken() {
      try {
        await app.post("/auth/verify-token", {
          token: params.token,
          id: params.id,
        });
        setIsLoading(false);
      } catch (error) {
        navigate("/login");
        dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
      }
    }
    verifyToken();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Loader />;

  return (
    <form className="login-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="login-fields-container">
        <img className="logo" src="/logo-white.svg" alt="logo" />

        <div className="login-input-container">
          <input
            label="User ID"
            autoComplete="username"
            placeholder="User ID"
            hidden
            aria-hidden
          />

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
          <div className="input-container">
            <FiLock size={22} color="white" />

            <input
              className="login-input"
              label="Confirm Password"
              placeholder="Confirm Password"
              type={passwordDisplay ? "password" : "text"}
              autoComplete="new-password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="login-btn-container">
          <button type="submit" className="login-btn">
            Reset Password
          </button>
        </div>
      </div>
    </form>
  );
}

export default ResetPassword;
