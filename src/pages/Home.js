import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CombinedSchedule from "../components/CombinedSchedule";
import Filter from "../components/Filter";
import {
  fetchCombinedSchedule,
  fetchSlots,
} from "../redux/schedule/scheduleAction";
import Modal from "../components/Modal";
import app from "../axiosConfig";

function Home() {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  const fetchData = () => {
    app.get("/time-table/faculty").then((res) => {
      setFaculty(res.data);
    });
    app.get("/time-table/courses").then((res) => {
      setCourses(res.data);
    });
    app.get("/time-table/classes").then((res) => {
      setClasses(res.data);
    });
  };

  useEffect(() => {
    dispatch(fetchCombinedSchedule());
    dispatch(fetchSlots());
    fetchData();
  }, [dispatch]);
  return (
    <>
      <Modal faculty={faculty} courses={courses} classes={classes} />
      <Filter setSelectedDay={setSelectedDay} />
      <CombinedSchedule selectedDay={selectedDay} />
    </>
  );
}

export default Home;
