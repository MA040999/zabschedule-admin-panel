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
import Modal from "./components/Modal";
import app from "./axiosConfig";

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

  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

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

  const fetchData = () => {
    app.get("/time-table/faculty").then((res) => {
      setFaculty(res.data);
      setRelevantFaculty(res.data);
    });
    app.get("/time-table/courses").then((res) => {
      setCourses(res.data);
      setRelevantCourses(res.data);
    });
    app.get("/time-table/classes").then((res) => {
      setClasses(res.data);
      setRelevantClasses(res.data);
    });
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  if (isLoading === true) {
    return <Loader />;
  }

  return (
    <>
      {notificationMsg && <Notification />}
      <Navbar />
      <div className="body-container">
        {user ? (
          <Modal faculty={faculty} courses={courses} classes={classes} />
        ) : null}
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
                  faculty={faculty}
                  courses={courses}
                  classes={classes}
                />
              }
            />
          </Route>
          <Route element={<RequireAuth user={user} />}>
            <Route path="/Requests" element={<Request />} />
          </Route>
          <Route path="/login" element={<Login user={user} />} />
          <Route element={<RequireAuth user={user} />}>
            <Route path="/Lab" element={<LabSchedule />} />
          </Route>
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
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
      </div>
    </>
  );
}

export default App;
