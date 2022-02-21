import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import RequestTile from "../components/RequestTile";
import { fetchRequests } from "../redux/request/requestActions";

function Requests() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const requests = useSelector((state) => state.request.requests);

  useEffect(() => {
    dispatch(fetchRequests()).then(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="request-table">
      {requests.length > 0 ? (
        <>
          <div className="request-table-header">
            <span>Faculty</span>
            <span>Subject</span>
            <span>Class</span>
            <span>Time</span>
            <span>Campus</span>
            <span>Day</span>
            <span>Room</span>
            <span className="slot-heading-span">Slot</span>
            <span>Created At</span>
            <span>Status</span>
          </div>
          {requests.map((request) => (
            <RequestTile key={request._id} request={request} />
          ))}
        </>
      ) : (
        <div className="no-requests-container">
          <span>No Requests</span>
        </div>
      )}
    </div>
  );
}

export default Requests;
