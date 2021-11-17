import { FETCH_ALL } from "./scheduleTypes";

const intitalState = {
  schedule: [],
};

const scheduleReducer = (state = intitalState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        schedule: action.payload,
      };
    default:
      return state;
  }
};

export default scheduleReducer;
