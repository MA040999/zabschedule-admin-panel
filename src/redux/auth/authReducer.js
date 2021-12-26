import {
  ADD_NOTIFICATION_MSG,
  AUTH,
  LOGOUT,
  REMOVE_NOTIFICATION_MSG,
} from "./authTypes";

const intitalState = {
  token: null,
  user: null,
  notificationMsg: null,
  notificationMsgType: null,
  isLoading: true,
};

const authReducer = (state = intitalState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.userData,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
      };
    case REMOVE_NOTIFICATION_MSG:
      return {
        ...state,
        notificationMsg: null,
        notificationMsgType: null,
        isLoading: false,
      };
    case ADD_NOTIFICATION_MSG:
      return {
        ...state,
        notificationMsg: action.payload.msg,
        notificationMsgType: action.payload.type,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
