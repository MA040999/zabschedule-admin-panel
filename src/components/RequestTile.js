import React from "react";
import StatusIndicator from "./StatusIndicator";

function RequestTile({ status }) {
  return (
    <div className="request-table-row">
      <th>Asim Riaz</th>
      <th>
        <div className="request-table-row-subject">
          <span>
            Parallel and Distributed Computing Parallel and Distributed
          </span>
          <span>
            Parallel and Distributed Computing Parallel and Distributed
          </span>
        </div>
      </th>
      <th>
        <div className="request-table-row-subject">
          <span>BCS/BS 7 D</span>
          <span>BCS/BS 7 E</span>
          <span>BCS/BS 7 F</span>
        </div>
      </th>
      <th>
        <div className="request-table-row-subject">
          <span>11:00AM - 12:15PM</span>
          <span>12:15PM - 1:30PM</span>
        </div>
      </th>
      <th>100 CAMPUS</th>
      <th>Wednesday</th>
      <th>C-Lab 3(R-207)</th>
      <th>2</th>
      <th>30 minutes ago</th>
      <th className="status-indicator-container">
        <StatusIndicator status={status} />
      </th>
    </div>
  );
}

export default RequestTile;
