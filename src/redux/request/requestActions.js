import app from "../../axiosConfig";
import { addNotificationMsg } from "../auth/authActions";
import {
  APPROVE_REQUEST,
  EXPIRE_REQUEST,
  FETCH_REQUESTS,
  REJECT_REQUEST,
} from "./requestTypes";

export const fetchRequests = () => {
  return async (dispatch) => {
    try {
      const { data } = await app.get("/time-table/requests");

      dispatch({ type: FETCH_REQUESTS, payload: data });
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const approveRequest = (id, setIsLoading, setIsSelectOpen) => {
  return async (dispatch) => {
    try {
      await app.put(`/time-table/approve-request/${id}`);

      dispatch({ type: APPROVE_REQUEST, payload: id });
      setIsLoading(false);
      setIsSelectOpen(false);
    } catch (error) {
      if (error?.response?.status === 406) {
        dispatch({ type: EXPIRE_REQUEST, payload: id });
      }
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
      setIsLoading(false);
      setIsSelectOpen(false);
    }
  };
};

export const rejectRequest = (id, setIsLoading, setIsSelectOpen) => {
  return async (dispatch) => {
    try {
      await app.put(`/time-table/reject-request/${id}`);

      dispatch({ type: REJECT_REQUEST, payload: id });
      setIsLoading(false);
      setIsSelectOpen(false);
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
      setIsLoading(false);
      setIsSelectOpen(false);
    }
  };
};
