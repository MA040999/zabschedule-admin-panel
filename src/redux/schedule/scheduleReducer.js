import {
  FETCH_COMBINED_SCHEDULE,
  FETCH_SLOTS,
  TOGGLE_MODAL,
} from "./scheduleTypes";

const intitalState = {
  schedule: [],
  slots: [],
  isModalOpen: false,
  modalData: {},
};

const scheduleReducer = (state = intitalState, action) => {
  switch (action.type) {
    case FETCH_COMBINED_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case FETCH_SLOTS:
      return {
        ...state,
        slots: action.payload,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        modalData: !state.isModalOpen ? action.payload : {},
      };
    default:
      return state;
  }
};

export default scheduleReducer;
