import { combineReducers } from "redux";
import photosReducer from "./gallery";

const rootReducer = combineReducers({
  gallery: photosReducer,
});

export default rootReducer;
