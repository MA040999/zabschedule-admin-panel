import React from "react";
import RequestTile from "../components/RequestTile";

function Requests() {
  return (
    <div className="request-table">
      <div className="request-table-header">
        <th>Faculty</th>
        <th>Subject</th>
        <th>Class</th>
        <th>Time</th>
        <th>Campus</th>
        <th>Day</th>
        <th>Room</th>
        <th>Slot</th>
        <th>Created At</th>
        <th>Status</th>
      </div>
      <RequestTile status={"Pending"} />
      <RequestTile status={"Approved"} />
      <RequestTile status={"Rejected"} />
      <RequestTile status={"Approved"} />
    </div>
  );
}

export default Requests;
