import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Notification from "./components/Notification";
import { verifyRefreshToken } from "./redux/auth/authActions";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Request from "./pages/Requests";
import ResetPassword from "./pages/ResetPassword";
import LabSchedule from "./pages/LabSchedule";
import {
  fetchCombinedSchedule,
  fetchSlots,
} from "./redux/schedule/scheduleAction";

function RequireAuth({ user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

function App() {
  const user = useSelector((state) => state.auth.user);
  const notificationMsg = useSelector((state) => state.auth.notificationMsg);
  const isLoading = useSelector((state) => state.auth?.isLoading);

  const [relevantCourses, setRelevantCourses] = useState([]);
  const [relevantClasses, setRelevantClasses] = useState([]);
  const [relevantFaculty, setRelevantFaculty] = useState([]);

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
  useEffect(() => {
    dispatch(fetchCombinedSchedule());
    dispatch(fetchSlots());
    // eslint-disable-next-line
  }, []);

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <>
      {notificationMsg && <Notification />}
      <Navbar />
      <Routes>
        <Route element={<RequireAuth user={user} />}>
          <Route
            path="/Home"
            element={
              <Home
                relevantCourses={relevantCourses}
                setRelevantFaculty={setRelevantFaculty}
                setRelevantCourses={setRelevantCourses}
                setRelevantClasses={setRelevantClasses}
                relevantClasses={relevantClasses}
                relevantFaculty={relevantFaculty}
              />
            }
          />
        </Route>
        <Route element={<RequireAuth user={user} />}>
          <Route path="/Requests" element={<Request />} />
        </Route>
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/Lab" element={<LabSchedule />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
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
