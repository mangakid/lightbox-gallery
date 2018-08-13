import { RECEIVE_PHOTOS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PHOTOS:
      return { ...state, photos: action.photos };
    default:
      return state;
  }
  return state;
};
