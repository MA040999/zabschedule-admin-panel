import {
  APPROVE_REQUEST,
  FETCH_REQUESTS,
  REJECT_REQUEST,
} from "./requestTypes";

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
    case REJECT_REQUEST:
      return {
        ...state,
        requests: state.requests.filter((request) =>
          request._id === action.payload
            ? (request.status = "Rejected")
            : request
        ),
      };
    case APPROVE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter((request) =>
          request._id === action.payload
            ? (request.status = "Approved")
            : request
        ),
      };
    default:
      return state;
  }
};

export default requestReducer;
