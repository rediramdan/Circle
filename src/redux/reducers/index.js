import { combineReducers } from "redux";
import auth from "./AuthReducer";
// import chat from "./ChatReducer";
import users from "./UsersReducer";

const rootReducer = combineReducers({
  auth,
  // chat,
  users,
});

export default rootReducer;