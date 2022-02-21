import app from "../../axiosConfig";
import { addNotificationMsg } from "../auth/authActions";
import { FETCH_REQUESTS } from "./requestTypes";

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
