import { FETCH_COMBINED_SCHEDULE, FETCH_SLOTS } from "./scheduleTypes";

const intitalState = {
  schedule: [],
  slots: [],
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
    default:
      return state;
  }
};

export default scheduleReducer;
