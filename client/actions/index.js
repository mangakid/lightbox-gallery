import axios from "axios";
import { FETCH_PHOTOS, RECEIVE_PHOTOS } from "./types";

export const fetchPhotos = page => {
  return dispatch => {
    axios
      .get(`/api/images?page=${page}`)
      .then(response => {
        dispatch(receivePhotos(response.data.photos));
      })
      .catch(error => {
        console.warn("error", error);
      });
  };
};

const receivePhotos = photos => {
  return {
    type: RECEIVE_PHOTOS,
    photos,
  };
};
