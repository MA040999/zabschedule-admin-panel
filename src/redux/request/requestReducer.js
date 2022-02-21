import { FETCH_REQUESTS } from "./requestTypes";

const intitalState = {
  requests: [],
};

const requestReducer = (state = intitalState, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    default:
      return state;
  }
};

export default requestReducer;
