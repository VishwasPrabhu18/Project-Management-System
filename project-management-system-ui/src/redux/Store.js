import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { projectReducer } from "./project/Reducer";
import { chatReducer } from "./chat/Reducer";
import { commentReducer } from "./comment/Reducer";
import { issueReducer } from "./issue/Reducer";
import { subscriptioneReducer } from "./subscription/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  chat: chatReducer,
  comment: commentReducer,
  issue: issueReducer,
  subscription: subscriptioneReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));