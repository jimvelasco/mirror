import axios from "axios";

// import { GET_THUMBNAILS } from "./types";
// import { GET_ALL_THUMBNAILS } from "./types";
// import { GET_SEARCH_THUMBNAILS } from "./types";
//import { GET_CATEGORY_THUMBNAILS } from "./types";
//import { GET_WILDCARD_THUMBNAILS } from "./types";
//import { GET_EMOTION_THUMBNAILS } from "./types";
import { GET_SEARCH_THUMBNAILS } from "./types";

import { GET_ERRORS } from "./types";

//import { GET_SEARCH_THUMBNAILS2 } from "./types";

// Register User
// we passed in the history for Register component so now we can redirect
// export const getAllThumbnails = () => dispatch => {
//   console.log("we are getting all thumbnails from axios");
//   axios
//     .get("/api/thumbnails/allthumbs")
//     .then(res =>
//       dispatch({
//         type: GET_ALL_THUMBNAILS,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ALL_THUMBNAILS,
//         payload: null
//       })
//     );
// };
//.get(`/api/thumbnails/thumbs/${category}`)
//export const getThumbnails = category => dispatch => {
// export const getThumbnails = category => dispatch => {
//   //console.log("we are getting thumbnails from axios " + category);
//   axios
//     // .get("/api/thumbnails/thumbs")
//     .get(`/api/thumbnails/thumbs/${category}`)
//     .then(res =>
//       dispatch({
//         type: GET_THUMBNAILS,
//         // payload: {data:res.data,category:category},
//         payload: { data: res.data, category: category },
//         category: category
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_THUMBNAILS,
//         payload: null
//       })
//     );
// };

// export const performSearch = searchterm => dispatch => {
//   console.log("we are getting search thumbnails from axios " + searchterm);
//   //console.log(history);
//   axios
//     // .get("/api/thumbnails/thumbs")
//     .get(`/api/thumbnails/thumbs/${searchterm}`)
//     .then(
//       res =>
//         dispatch({
//           type: GET_SEARCH_THUMBNAILS,
//           // payload: {data:res.data,category:category},
//           payload: { data: res.data, category: searchterm },
//           category: searchterm
//         })
//       // {
//       //   type: GET_SEARCH_THUMBNAILS,
//       //   // payload: {data:res.data,category:category},
//       //   payload: { data: res.data, category: searchterm },
//       //   category: searchterm
//       // }
//     )
//     // .then(res => history.push("/login"))

//     .catch(err =>
//       dispatch({
//         type: GET_SEARCH_THUMBNAILS,
//         payload: null
//       })
//     );
// };

// export function performThumbSearch(term) {
// the api/thumbnails part comes from server.js
// so in the routes/api/thumbnails folder the router
// portion just contains the thumbs part .e.g
// export const performThumbCategorySearch = term => dispatch => {
//   //const url = ROOT_URL + term; //&q=${city},us`;
//   //let rdata = {};
//   // console.log("we are in action category getting data " + term);
//   axios.get(`/api/thumbnails/thumbs/${term}`).then(res =>
//     dispatch({
//       type: GET_CATEGORY_THUMBNAILS,
//       // payload: {data:res.data,category:category},
//       payload: res, //{ data: res },
//       searchterm: term
//     })
//   );
//   //console.log("------------");
// };

// export const performThumbWildcardSearch = term => dispatch => {
//   //const url = ROOT_URL + term; //&q=${city},us`;
//   //let rdata = {};
//   //console.log("we are in action getting data " + term);
//   axios
//     .get(`/api/thumbnails/search/${term}`)
//     .then(res =>
//       dispatch({
//         type: GET_WILDCARD_THUMBNAILS,
//         // payload: {data:res.data,category:category},
//         payload: res, //{ data: res },
//         searchterm: term
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
//   //console.log("------------");
// };

// export const performThumbEmotionSearch = term => dispatch => {
//   //const url = ROOT_URL + term; //&q=${city},us`;
//   //let rdata = {};
//   //console.log("we are in action getting data " + term);
//   let url = "";
//   url = `/api/thumbnails/emotion/${term}`;
//   axios
//     .get(url)
//     .then(res =>
//       dispatch({
//         type: GET_EMOTION_THUMBNAILS,
//         // payload: {data:res.data,category:category},
//         payload: res, //{ data: res },
//         searchterm: term
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
//   //console.log("------------");
// };

export const performThumbnailSearch = (which, term) => dispatch => {
  //const url = ROOT_URL + term; //&q=${city},us`;
  //let rdata = {};
  //console.log("we are in action getting data " + term);
  let url = "";
  if (which === "category") {
    url = `/api/thumbnails/thumbs/${term}`;
  }
  if (which === "wildcard") {
    url = `/api/thumbnails/search/${term}`;
  }
  if (which === "emotion") {
    url = `/api/thumbnails/emotion/${term}`;
  }

  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_SEARCH_THUMBNAILS,
        // payload: {data:res.data,category:category},
        payload: res, //{ data: res },
        which: which,
        searchterm: term
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
