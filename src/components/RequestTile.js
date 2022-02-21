import moment from "moment";
import React, { useState } from "react";
import StatusIndicator from "./StatusIndicator";

function RequestTile({ request }) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  return (
    <div className="request-table-row">
      <span>{request.teacher[0].faculty_name}</span>
      <span>
        <div className="request-table-row-subject">
          {request.subject.map((sub, i) => (
            <span key={`${sub._id}${i}${request._id}`}>{sub.course_name}</span>
          ))}
        </div>
      </span>
      <span>
        <div className="request-table-row-subject">
          {request.class.map((cls, i) => (
            <span
              key={`${cls._id}${i}${request._id}`}
            >{`${cls.program} ${cls.semester} ${cls.section}`}</span>
          ))}
        </div>
      </span>
      <span>
        <div className="request-table-row-subject">
          {request.Time.map((time, i) => (
            <span key={`${time}${i}${request._id}`}>{time}</span>
          ))}
        </div>
      </span>
      <span>{request.campus} </span>
      <span>{request.day}</span>
      <span>{request.room}</span>
      <span className="slot-span">{request.slot}</span>
      <span>{moment(request.created_at).fromNow()}</span>
      <span className="status-indicator-container">
        <StatusIndicator
          status={request.status}
          setIsSelectOpen={setIsSelectOpen}
          isSelectOpen={isSelectOpen}
        />
      </span>
    </div>
  );
}

export default RequestTile;
