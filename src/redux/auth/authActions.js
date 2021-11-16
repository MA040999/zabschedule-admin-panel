import {
  AUTH,
  LOGOUT,
  AUTH_ERROR,
  VERIFY_AUTH,
  ADD_NOTIFICATION_MSG,
  REMOVE_NOTIFICATION_MSG,
} from "./authTypes";
import app from "../../axiosConfig";

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

export const login = ({ userId, password }, navigate) => {
  return async (dispatch) => {
    try {
      const user = await app.post("/auth/login/", { userId, password });
      delete user?.data.refreshToken;

      dispatch({ type: AUTH, payload: user?.data });

      navigate("/Home", { replace: true });
    } catch (error) {
      console.log(`error`, error);
      dispatch(addNotificationMsg(error?.response?.data?.message));
    }
  };
};

export const verifyAuth = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/verify-auth");
      dispatch({ type: VERIFY_AUTH, payload: user?.data });
    } catch (error) {
      console.log(`error`, error);
      dispatch(addNotificationMsg(error.response.data.message));

      dispatch({ type: LOGOUT });
    }
  };
};

export const verifyRefreshToken = () => {
  return async (dispatch) => {
    try {
      const user = await app.get("/auth/refresh-token");
      dispatch({ type: AUTH, payload: user?.data });
    } catch (error) {
      console.log(`error`, error);
      dispatch({ type: LOGOUT });
    }
  };
};

export const signup = ({ fullname, userId, password }, navigate) => {
  return async (dispatch) => {
    try {
      const user = await app.post("/auth/signup", {
        fullname,
        userId,
        password,
      });
      delete user?.data.refreshToken;
      dispatch({ type: AUTH, payload: user?.data });

      navigate("/Home", { replace: true });
    } catch (error) {
      console.log(`error`, error);
      dispatch(addNotificationMsg(error?.response?.data?.message));
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      await app.get("/auth/logout/");
      dispatch({ type: LOGOUT });

      navigate("/Home", { replace: true });
    } catch (error) {
      console.log(`error`, error);
    }
  };
};

export const addNotificationMsg = (msg) => {
  return {
    type: ADD_NOTIFICATION_MSG,
    payload: msg,
  };
};

export const removeNotificationMsg = () => {
  return {
    type: REMOVE_NOTIFICATION_MSG,
  };
};
