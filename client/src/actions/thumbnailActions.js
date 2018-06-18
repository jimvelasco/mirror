import axios from "axios";

import { GET_THUMBNAILS } from "./types";
import { GET_ALL_THUMBNAILS } from "./types";
import { GET_SEARCH_THUMBNAILS } from "./types";
import { GET_CATEGORY_THUMBNAILS } from "./types";
import { GET_WILDCARD_THUMBNAILS } from "./types";
import { GET_ERRORS } from "./types";

//import { GET_SEARCH_THUMBNAILS2 } from "./types";

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
        // payload: {data:res.data,category:category},
        payload: { data: res.data, category: category },
        category: category
      })
    )
    .catch(err =>
      dispatch({
        type: GET_THUMBNAILS,
        payload: null
      })
    );
};

export const performSearch = searchterm => dispatch => {
  console.log("we are getting search thumbnails from axios " + searchterm);
  //console.log(history);
  axios
    // .get("/api/thumbnails/thumbs")
    .get(`/api/thumbnails/thumbs/${searchterm}`)
    .then(
      res =>
        dispatch({
          type: GET_SEARCH_THUMBNAILS,
          // payload: {data:res.data,category:category},
          payload: { data: res.data, category: searchterm },
          category: searchterm
        })
      // {
      //   type: GET_SEARCH_THUMBNAILS,
      //   // payload: {data:res.data,category:category},
      //   payload: { data: res.data, category: searchterm },
      //   category: searchterm
      // }
    )
    // .then(res => history.push("/login"))

    .catch(err =>
      dispatch({
        type: GET_SEARCH_THUMBNAILS,
        payload: null
      })
    );
};

// export function performThumbSearch(term) {
export const performThumbCategorySearch = term => dispatch => {
  //const url = ROOT_URL + term; //&q=${city},us`;
  //let rdata = {};
  //console.log("we are in action getting data");
  axios.get(`/api/thumbnails/thumbs/${term}`).then(res =>
    dispatch({
      type: GET_CATEGORY_THUMBNAILS,
      // payload: {data:res.data,category:category},
      payload: res, //{ data: res },
      searchterm: term
    })
  );
  //console.log("------------");
};

export const performThumbWildcardSearch = term => dispatch => {
  //const url = ROOT_URL + term; //&q=${city},us`;
  //let rdata = {};
  //console.log("we are in action getting data");
  axios
    .get(`/api/thumbnails/search/${term}`)
    .then(res =>
      dispatch({
        type: GET_WILDCARD_THUMBNAILS,
        // payload: {data:res.data,category:category},
        payload: res, //{ data: res },
        searchterm: term
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  //console.log("------------");
};
