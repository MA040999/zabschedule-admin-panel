import app from "../../axiosConfig";
import { FETCH_ALL } from "./scheduleTypes";

export const fetchCombinedSchedule = () => {
  return async (dispatch) => {
    try {
      const combinedSchedule = await app.get("/time-table/");
      dispatch({ type: FETCH_ALL, payload: combinedSchedule?.data });
    } catch (error) {
      console.log(`error`, error);
    }
  };
};
