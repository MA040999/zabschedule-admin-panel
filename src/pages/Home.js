import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CombinedSchedule from "../components/CombinedSchedule";
import Filter from "../components/Filter";
import {
  fetchCombinedSchedule,
  fetchSlots,
} from "../redux/schedule/scheduleAction";
import Modal from "../components/Modal";

function Home() {
  const dispatch = useDispatch();
  const [selectedDay, setSelectedDay] = useState("Monday");

  useEffect(() => {
    dispatch(fetchCombinedSchedule());
    dispatch(fetchSlots());
  }, [dispatch]);
  return (
    <>
      <Modal />
      <Filter setSelectedDay={setSelectedDay} />
      <CombinedSchedule selectedDay={selectedDay} />
    </>
  );
}

export default Home;
