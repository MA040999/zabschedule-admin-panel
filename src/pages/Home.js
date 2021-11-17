import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CombinedSchedule from "../components/CombinedSchedule";
import { fetchCombinedSchedule } from "../redux/schedule/scheduleAction";

function Home() {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState("Monday");

  useEffect(() => {
    dispatch(fetchCombinedSchedule());
  }, [dispatch]);
  return (
    <>
      <CombinedSchedule selectedDay={selectedDay} />
    </>
  );
}

export default Home;
