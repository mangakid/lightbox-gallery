import {
  RECEIVE_PHOTOS,
  SET_LOADING,
  SET_LOADING_ERROR,
} from "../actions/types";

const initialState = {
  isLoading: false,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PHOTOS:
      const { photos } = action;
      return { ...state, ...action.photos };
    case SET_LOADING:
      const { isLoading } = action;
      if (isLoading === state.isLoading) return state;
      return { ...state, isLoading };
    case SET_LOADING_ERROR:
      const { error } = action;
      if (error === state.error) return state;
      return { ...state, error };
    default:
      return state;
  }
  return state;
};
