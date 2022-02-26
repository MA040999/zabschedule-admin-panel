import app from "../../axiosConfig";
import { addNotificationMsg } from "../auth/authActions";
import {
  ADD_CLASS,
  DELETE_CLASS,
  CANCEL_CLASS,
  FETCH_COMBINED_SCHEDULE,
  FETCH_SLOTS,
  REMOVE_MODAL_DATA,
  REMOVE_MODAL_DATA_TIME,
  REMOVE_TIME_TABLE_DATA,
  SET_LAB_SCHEDULE,
  TOGGLE_CONFIRMATION_MODAL,
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
      dispatch(setLabSchedule());
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const setLabSchedule = () => {
  return {
    type: SET_LAB_SCHEDULE,
  };
};

export const removeTimeTableData = () => {
  return {
    type: REMOVE_TIME_TABLE_DATA,
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
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
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
        dispatch(addNotificationMsg("Class updated successfully"));
      } else {
        dispatch({
          type: ADD_CLASS,
          payload: newClass?.data,
        });
        dispatch(toggleModal());
        dispatch(addNotificationMsg("Class added successfully"));
      }
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const addMakeUpClass = (data) => {
  return async (dispatch) => {
    try {
      const newClass = await app.post("/time-table/add-makeup-class", data);

      if (data._id) {
        dispatch({
          type: UPDATE_CLASS,
          payload: newClass?.data,
        });
      } else {
        dispatch({
          type: ADD_CLASS,
          payload: newClass?.data,
        });
      }
      dispatch(toggleModal());
      dispatch(addNotificationMsg("Makeup class added successfully"));
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const requestForClass = (data) => {
  return async (dispatch) => {
    try {
      const requestData = await app.post("/time-table/request-class", data);
      dispatch(toggleModal());
      dispatch(addNotificationMsg(requestData.data.message));
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    try {
      await app.patch(`/time-table/delete-class/${id}`);
      dispatch({
        type: DELETE_CLASS,
        payload: id,
      });
      dispatch(toggleModal());
      dispatch(toggleConfirmationModal());
      dispatch(addNotificationMsg("Class deleted successfully"));
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const cancelClass = (id, index) => {
  return async (dispatch) => {
    try {
      await app.patch(`/time-table/cancel-class/${id}/${index}`);
      dispatch({
        type: CANCEL_CLASS,
        payload: { id, index },
      });
      dispatch(toggleModal());
      dispatch(toggleConfirmationModal());
      dispatch(addNotificationMsg("Class cancelled successfully"));
    } catch (error) {
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const toggleModal = (
  room,
  selectedDay,
  campus,
  slot,
  id,
  teacher,
  subject,
  cls,
  time,
  slotAssigned,
  isRequestModal
) => {
  return {
    type: TOGGLE_MODAL,
    payload: {
      room,
      selectedDay,
      campus,
      slot,
      id,
      teacher,
      subject,
      cls,
      time,
      slotAssigned,
      isRequestModal,
    },
  };
};

export const toggleConfirmationModal = (index) => {
  return {
    type: TOGGLE_CONFIRMATION_MODAL,
    payload: index,
  };
};

export const removeModalData = (index) => {
  return {
    type: REMOVE_MODAL_DATA,
    payload: index,
  };
};
export const removeModalDataTime = (index) => {
  return {
    type: REMOVE_MODAL_DATA_TIME,
    payload: index,
  };
};
