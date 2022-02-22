import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { approveRequest, rejectRequest } from "../redux/request/requestActions";
function StatusIndicator({ id, status, isSelectOpen, setIsSelectOpen }) {
  let buttonRef = useRef();
  let menuRef = useRef();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleApproveBtnClick = () => {
    setIsLoading(true);
    dispatch(approveRequest(id, setIsLoading, setIsSelectOpen));
  };

  const handleRejectBtnClick = () => {
    setIsLoading(true);
    dispatch(rejectRequest(id, setIsLoading, setIsSelectOpen));
  };

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
      {user.role === "Admin" && (
        <div
          ref={menuRef}
          className={`select-status-container ${
            isSelectOpen && "select-status-container-open"
          }`}
        >
          {!isLoading ? (
            <>
              <span
                onClick={handleApproveBtnClick}
                className="status-container Approved"
              >
                Approve
              </span>
              <span
                onClick={handleRejectBtnClick}
                className="status-container Rejected"
              >
                Reject
              </span>
            </>
          ) : (
            <Loader smallLoader={true} />
          )}
        </div>
      )}
    </>
  );
}

export default StatusIndicator;
