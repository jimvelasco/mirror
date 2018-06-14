import {
  // ADD_POST,
  GET_ALL_THUMBNAILS,
  GET_THUMBNAILS,
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
    // return {
    //   ...(state.category = category),
    //   thumbnails: action.payload,
    //   loading: false
    // };

    default:
      // console.log(state);
      return state;
  }
}
