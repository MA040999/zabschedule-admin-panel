import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/authReducer";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import scheduleReducer from "./schedule/scheduleReducer";

const reducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
