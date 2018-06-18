import {
  // ADD_POST,
  GET_ALL_THUMBNAILS,
  GET_THUMBNAILS,
  GET_WILDCARD_THUMBNAILS,
  GET_CATEGORY_THUMBNAILS,
  // GET_POST,
  // DELETE_POST,
  POST_LOADING
} from "../actions/types";

const initialState = {
  thumbnails: [],
  category: "all",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_THUMBNAILS:
      // console.log("we have a all thumbnails payload");
      // console.log(action.payload);
      return {
        ...state,
        thumbnails: action.payload,
        loading: false
      };
    case GET_THUMBNAILS:
      // console.log("we have a thumbnails payload");
      // console.log(action.payload);
      //console.log("in reducer here is the state " + category);
      // console.log("++++++++++++");
      // console.log(state);
      // //console.log(category);
      // console.log("++++++++++++");
      // console.log(action.payload.data);
      // console.log(action.payload.cat);

      return {
        ...state,
        thumbnails: action.payload.data,
        category: action.payload.category, //state.category, //action.payload.category,
        loading: false
      };

    // case GET_SEARCH_THUMBNAILS2:
    //   console.log("we have a thumbnails payload");
    //   console.log(state);
    //   console.log(action.payload.data);
    //   //console.log("in reducer here is the state " + category);
    //   // console.log("++++++++++++");
    //   // console.log(state);
    //   // //console.log(category);
    //   // console.log("++++++++++++");
    //   // console.log(action.payload.data);
    //   // console.log(action.payload.cat);
    //   let obj = { ...state, thumbnails: action.payload.data };
    //   //let ma = [action.payload.data, ...state];
    //   console.log("merged state");
    //   console.log(obj);
    //   return obj;

    // // return {
    // //   ...(state.category = category),
    // //   thumbnails: action.payload,
    // //   loading: false
    // // };

    case GET_WILDCARD_THUMBNAILS:
      return {
        ...state,
        thumbnails: action.payload.data,
        category: action.searchterm, //state.category, //action.payload.category,
        loading: false
      };
    case GET_CATEGORY_THUMBNAILS:
      return {
        ...state,
        thumbnails: action.payload.data,
        category: action.searchterm, //state.category, //action.payload.category,
        loading: false
      };

    default:
      // console.log(state);
      return state;
  }
}
