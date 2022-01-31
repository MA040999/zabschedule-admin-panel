import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function DayFilter({ setSelectedDay }) {
  return (
    <div className="filter-container">
      <select
        onChange={(e) => setSelectedDay(e.target.value)}
        className="filter-select"
        name="days"
      >
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <MdKeyboardArrowDown className="filter-icon" />
    </div>
  );
}

export default DayFilter;
