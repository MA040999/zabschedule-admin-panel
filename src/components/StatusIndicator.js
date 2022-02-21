import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
function StatusIndicator({ status, isSelectOpen, setIsSelectOpen }) {
  let buttonRef = useRef();
  let menuRef = useRef();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let handler = (e) => {
      if (
        !menuRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => status === "Pending" && setIsSelectOpen(!isSelectOpen)}
        className={`status-container ${status}`}
      >
        <span>{status}</span>
      </div>
      {isSelectOpen && user.role === "Admin" && (
        <div ref={menuRef} className="select-status-container">
          <span className="status-container Approved">Approve</span>
          <span className="status-container Rejected">Reject</span>
        </div>
      )}
    </>
  );
}

export default StatusIndicator;
