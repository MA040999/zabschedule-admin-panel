import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Notification from "./components/Notification";
import { verifyRefreshToken } from "./redux/auth/authActions";
import Login from "./pages/Login";
import Home from "./pages/Home";

function RequireAuth({ user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

function App() {
  const user = useSelector((state) => state.auth.user);
  const notificationMsg = useSelector((state) => state.auth.notificationMsg);

  const dispatch = useDispatch();

  const refreshToken = () => {
    dispatch(verifyRefreshToken());
    setTimeout(() => {
      refreshToken();
    }, 600000 - 1000); //10 minutes - 1 second
  };

  useEffect(() => {
    refreshToken();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {notificationMsg && <Notification />}
      <Routes>
        <Route element={<RequireAuth user={user} />}>
          <Route path="/Home" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login user={user} />} />
        <Route
          path="*"
          element={
            !user ? (
              <Navigate replace to="/login" />
            ) : (
              <Navigate replace to="/Home" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
