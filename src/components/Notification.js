import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { removeNotificationMsg } from "../redux/auth/authActions";

function Notification() {
  const dispatch = useDispatch();
  const location = useLocation();
  const notificationMsg = useSelector((state) => state.auth.notificationMsg);
  const notificationMsgType = useSelector(
    (state) => state.auth.notificationMsgType
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotificationMsg());
    }, 4000);
    // eslint-disable-next-line
  }, [notificationMsg]);

  return (
    <div
      className={`notification-container ${
        location.pathname === "/Lab" && "lab-notification-container"
      } ${notificationMsgType === "error" && "error-notification"}`}
    >
      <p>{notificationMsg}</p>
    </div>
  );
}

export default Notification;
