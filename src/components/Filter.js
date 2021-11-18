import React from "react";

function Filter({ setSelectedDay }) {
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
    </div>
  );
}

export default Filter;
