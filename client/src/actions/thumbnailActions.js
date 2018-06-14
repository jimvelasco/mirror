import axios from "axios";

import { GET_THUMBNAILS } from "./types";
import { GET_ALL_THUMBNAILS } from "./types";

// Register User
// we passed in the history for Register component so now we can redirect
export const getAllThumbnails = () => dispatch => {
  console.log("we are getting all thumbnails from axios");
  axios
    .get("/api/thumbnails/allthumbs")
    .then(res =>
      dispatch({
        type: GET_ALL_THUMBNAILS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_THUMBNAILS,
        payload: null
      })
    );
};
//.get(`/api/thumbnails/thumbs/${category}`)
//export const getThumbnails = category => dispatch => {
export const getThumbnails = category => dispatch => {
  //console.log("we are getting thumbnails from axios " + category);
  axios
    // .get("/api/thumbnails/thumbs")
    .get(`/api/thumbnails/thumbs/${category}`)
    .then(res =>
      dispatch({
        type: GET_THUMBNAILS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_THUMBNAILS,
        payload: null
      })
    );
};
