import axios from "axios";
import {
  GET_MIMES,
  CREATE_MIME,
  DELETE_MIME,
  GET_ERRORS,
  SET_CURRENT_MIME,
  MODIFY_MIME,
  CHANGE_MIME_STATUS,
  SET_STATUS_MESSAGE
} from "./types";
export const getMimes = obj => dispatch => {
  //console.log("obj is", obj);
  let parm = obj.param;
  //let link = "/api/mimes/getMimes";
  let link = "/api/mimes/mimes/" + parm;
  // router.get("/mimes/:cat", (req, res) => {
  axios
    .get(link)
    // .then(res => console.log(res.data))
    .then(res => {
      dispatch({
        type: GET_MIMES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const searchMimes = obj => dispatch => {
  //console.log("obj is", obj);
  let parm = obj.param;
  // search/:term
  //let link = "/api/mimes/getMimes";
  //let link = "/api/thumbnails/search/" + parm;
  let link = "/api/mimes/search/" + parm;
  if (parm === "*") {
    link = "/api/mimes/mimes/all";
  }
  // router.get("/mimes/:cat", (req, res) => {
  axios
    .get(link)
    // .then(res => console.log(res.data))
    .then(res => {
      dispatch({
        type: GET_MIMES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const statusMimes = obj => dispatch => {
  //console.log("obj is", obj);
  let parm = obj.param;
  // search/:term
  //let link = "/api/mimes/getMimes";
  //let link = "/api/thumbnails/search/" + parm;
  let link = "/api/mimes/status/" + parm;
  if (parm === "*") {
    link = "/api/mimes/mimes/all";
  }
  // router.get("/mimes/:cat", (req, res) => {
  axios
    .get(link)
    // .then(res => console.log(res.data))
    .then(res => {
      dispatch({
        type: GET_MIMES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const modifyMime = mimeData => dispatch => {
  // console.log(mimeData);
  axios
    .post("/api/mimes/modifyMime", mimeData)
    .then(res => {
      //console.log("action createAdvertisement", res.data);
      // dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: MODIFY_MIME, payload: res.data });
      // history.push("/dashboard");
    })
    // thunk lets us do a dispatch
    // .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteMime = mimeid => dispatch => {
  // console.log(mimeData);
  let link = "/api/mimes/deleteMime/" + mimeid;
  axios
    .get(link)
    .then(res => {
      //console.log("action createAdvertisement", res.data);
      // dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: DELETE_MIME, payload: mimeid });
      // history.push("/dashboard");
    })
    // thunk lets us do a dispatch
    // .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentMime = mimeid => dispatch => {
  //console.log("setCurrentAdvertisement advertisement in actions ", adid);
  //let link = `/api/advertise/change-advertisement-status/${adid}/${status}`;
  //console.log("adveractions changebusinesssttus", link);

  //dispatch({ type: CLEAR_ERRORS });

  dispatch({ type: SET_CURRENT_MIME, payload: mimeid });
};

export const changeMimeStatus = (mimeid, status) => dispatch => {
  //console.log("modify advertisement in actions ", advertisementData);
  let link = `/api/mimes/change-mime-status/${mimeid}/${status}`;
  //console.log("adveractions changebusinesssttus", link);
  let rdata = { mimeid: mimeid, status: status };
  axios
    .get(link)
    .then(res => {
      // dispatch({ type: CLEAR_ERRORS });
      // dispatch({
      //   type: SET_STATUS_MESSAGE,
      //   payload: { message: "Advertisement Status Update Successful" }
      // });
      //console.log("change status res", res);

      dispatch({ type: CHANGE_MIME_STATUS, payload: rdata });
    })
    // thunk lets us do a dispatch
    // .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createMime = mimeData => dispatch => {
  axios
    .post("/api/mimes/createMime", mimeData)
    .then(res => {
      console.log("we just created a mime", res.data);
      dispatch({ type: CREATE_MIME, payload: res.data });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const uploadMimeJson = mimeFile => dispatch => {
  // dispatch({ type: CLEAR_ERRORS });
  // console.log("we are in action about to upload file");
  // console.log(mimeFile);
  // console.log("end of we are in action about to upload file");
  // dispatch({
  //   type: SET_STATUS_MESSAGE,
  //   payload: { message: "we have successfully uploaded records" }
  // });
  dispatch({
    type: SET_STATUS_MESSAGE,
    payload: ""
  });

  axios
    .post("/api/mimes/uploadjson", mimeFile)
    // .then(res => history.push("/login"))
    // thunk lets us do a dispatch
    .then(res => {
      // console.log("we have the file");
      // console.log(res.data);
      dispatch({
        type: SET_STATUS_MESSAGE,
        payload: "we have successfully uploaded records"
      });
    })
    .catch(err => {
      console.log("about to dispatch error");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
