import React from "react";
import { useSelector } from "react-redux";
import CampusSchedule from "./CampusSchedule";

function CombinedSchedule({ selectedDay }) {
  // const campusArray = ["100 CAMPUS"];
  const campusArray = ["100 CAMPUS", "154 CAMPUS", "153 CAMPUS", "99 CAMPUS"];
  const schedule = useSelector((state) =>
    state.schedule.schedule.filter((item) => item.day === selectedDay)
  );
  return (
    <>
      {schedule.length > 0 && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th colSpan={50}>ZabSchedule</th>
            </tr>
            <tr>
              <th colSpan={50}>{selectedDay}</th>
            </tr>
          </thead>
          <tbody>
            {campusArray?.map((campus) => (
              <CampusSchedule
                key={campus}
                schedule={schedule}
                campus={campus}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default CombinedSchedule;
