import {
  RECEIVE_PHOTOS,
  SET_LOADING,
  SET_LOADING_ERROR,
  OPEN_LIGHTBOX,
  CLOSE_LIGHTBOX,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isLightboxOpen: false,
  selectedPhoto: "",
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
    case OPEN_LIGHTBOX:
      const { photoId } = action;
      if (state.isLightboxOpen === true && photoId === state.selectedPhoto)
        return state;
      return {
        ...state,
        isLightboxOpen: true,
        selectedPhoto: state.photo.find(p => p.id === photoId),
      };
    case CLOSE_LIGHTBOX:
      return { ...state, isLightboxOpen: false, selectedPhotoId: "" };
    default:
      return state;
  }
  return state;
};
