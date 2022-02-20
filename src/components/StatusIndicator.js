import React from "react";

function StatusIndicator({ status }) {
  return (
    <div className={`status-container ${status}`}>
      <span>{status}</span>
    </div>
  );
}

export default StatusIndicator;
