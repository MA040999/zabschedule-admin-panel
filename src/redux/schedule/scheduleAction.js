import app from "../../axiosConfig";
import {
  FETCH_COMBINED_SCHEDULE,
  FETCH_SLOTS,
  TOGGLE_MODAL,
} from "./scheduleTypes";

export const fetchCombinedSchedule = () => {
  return async (dispatch) => {
    try {
      const combinedSchedule = await app.get("/time-table/");
      dispatch({
        type: FETCH_COMBINED_SCHEDULE,
        payload: combinedSchedule?.data,
      });
    } catch (error) {
      console.log(`error`, error);
    }
  };
};

export const fetchSlots = () => {
  return async (dispatch) => {
    try {
      const slots = await app.get("/time-table/slots");
      dispatch({
        type: FETCH_SLOTS,
        payload: slots?.data,
      });
    } catch (error) {
      console.log(`error`, error);
    }
  };
};

export const toggleModal = (room, selectedDay, campus, slot, id) => {
  return {
    type: TOGGLE_MODAL,
    payload: { room, selectedDay, campus, slot, id },
  };
};
