import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import scheduleReducer from "./schedule/scheduleReducer";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  const createLogger = require("redux-logger").createLogger;
  const logger = createLogger();
  middleware.push(logger);
}

const reducer = combineReducers({
  auth: authReducer,
  schedule: scheduleReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
