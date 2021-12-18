import app from "../../axiosConfig";
import {
  ADD_CLASS,
  FETCH_COMBINED_SCHEDULE,
  FETCH_SLOTS,
  TOGGLE_MODAL,
  UPDATE_CLASS,
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

export const addClass = (data) => {
  return async (dispatch) => {
    try {
      const newClass = await app.post("/time-table/add-class", data);

      if (data._id) {
        dispatch({
          type: UPDATE_CLASS,
          payload: newClass?.data,
        });
        dispatch(toggleModal());
      } else {
        dispatch({
          type: ADD_CLASS,
          payload: newClass?.data,
        });
        dispatch(toggleModal());
      }
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
