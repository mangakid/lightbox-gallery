import axios from "axios";
import {
  FETCH_PHOTOS,
  RECEIVE_PHOTOS,
  SET_LOADING,
  SET_LOADING_ERROR,
} from "./types";

const LOADING_PHOTOS_ERROR_MESSAGE =
  "There was a problem fetching the photos. Please try again later.";

export const fetchPhotos = (page = 1) => {
  return dispatch => {
    dispatch(setLoading(true));
    axios
      .get(`/api/images?page=${page}`)
      .then(response => {
        dispatch(setLoading(false));
        if (response.data.stat === "ok") {
          dispatch(setLoadingError(""));
          dispatch(receivePhotos(response.data.photos));
        } else {
          dispatch(setLoadingError(LOADING_PHOTOS_ERROR_MESSAGE));
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
        dispatch(setLoadingError(LOADING_PHOTOS_ERROR_MESSAGE));
      });
  };
};

const receivePhotos = photos => {
  return {
    type: RECEIVE_PHOTOS,
    photos,
  };
};

const setLoading = isLoading => ({ type: SET_LOADING, isLoading });
const setLoadingError = error => ({ type: SET_LOADING_ERROR, error });
