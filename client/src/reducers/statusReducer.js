import { SET_STATUS_MESSAGE, CLEAR_STATUS_MESSAGE } from "../actions/types";

const initialState = {
  message: ""
};

export default function(state = initialState, action) {
  //console.log("in status reducer payload is", action.payload);
  switch (action.type) {
    case SET_STATUS_MESSAGE:
      // console.log("in status reducer payload is", action);

      return {
        ...state,
        message: action.payload
      };

    //return { message: action.payload };

    case CLEAR_STATUS_MESSAGE:
      return {};
    default:
      return state;
  }
}
