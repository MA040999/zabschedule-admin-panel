import {
  AUTH,
  LOGOUT,
  ADD_NOTIFICATION_MSG,
  REMOVE_NOTIFICATION_MSG,
} from "./authTypes";
import app from "../../axiosConfig";

export const login = ({ userId, password }, navigate) => {
  return async (dispatch) => {
    try {
      const user = await app.post("/auth/login/", { userId, password });
      delete user?.data.refreshToken;

      dispatch({ type: AUTH, payload: user?.data });

      navigate("/Home", { replace: true });
    } catch (error) {
      console.log(`error`, error);
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
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
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      await app.get("/auth/logout/");
      dispatch({ type: LOGOUT });

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(`error`, error);
      dispatch(addNotificationMsg(error?.response?.data?.message, "error"));
    }
  };
};

export const addNotificationMsg = (msg, type) => {
  return {
    type: ADD_NOTIFICATION_MSG,
    payload: { msg, type },
  };
};

export const removeNotificationMsg = () => {
  return {
    type: REMOVE_NOTIFICATION_MSG,
  };
};
