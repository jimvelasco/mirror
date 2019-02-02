import axios from "axios";
import {
  GET_MIMES,
  GET_ADMIN_MIMES,
  CREATE_MIME,
  DELETE_MIME,
  GET_ERRORS,
  SET_CURRENT_MIME,
  MODIFY_MIME,
  CHANGE_MIME_STATUS,
  SET_STATUS_MESSAGE,
  FILTER_MIMES,
  FILTER_CATEGORY_MIMES,
  GET_TRENDING
} from "./types";

export const getMimes = obj => dispatch => {
  // console.log("getMimes obj is", obj);
  let link = "";
  let cat0 = obj.cat0;
  let cat1 = obj.cat1;
  let cat2 = obj.cat2;

  //let link = "/api/mimes/getMimes";

  link = "/api/mimes/mimes/" + cat0 + "/" + cat1 + "/" + cat2;
  // router.get("/mimes/:cat", (req, res) => {
  axios
    .get(link)
    // .then(res => console.log(res.data))
    .then(res => {
      let dobj = {};
      dobj.category = cat0;
      dobj.results = res.data;
      dispatch({
        type: GET_MIMES,
        //payload: res.data
        payload: dobj
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getCategoryMimes = obj => dispatch => {
  // console.log("getMimes obj is", obj);
  let link = "";
  let cat0 = obj.cat0;
  let cat1 = obj.cat1;
  let cat2 = obj.cat2;

  //let link = "/api/mimes/getMimes";

  dispatch({ type: FILTER_CATEGORY_MIMES, payload: obj });
};

export const searchMimes = obj => dispatch => {
  //console.log("obj is", obj);
  let parm = obj.param;
  // search/:term
  //let link = "/api/mimes/getMimes";
  //let link = "/api/thumbnails/search/" + parm;
  let link = "/api/mimes/search/" + parm;
  // if (parm === "*") {
  //   link = "/api/mimes/mimes/all";
  // }
  // router.get("/mimes/:cat", (req, res) => {
  axios
    .get(link)
    // .then(res => console.log(res.data))
    .then(res => {
      dispatch({
        type: GET_ADMIN_MIMES,
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
  console.log("obj is", obj);
  let parm = obj.param;
  // search/:term
  //let link = "/api/mimes/getMimes";
  //let link = "/api/thumbnails/search/" + parm;
  let link = "/api/mimes/status/" + parm;
  // if (parm === "*") {
  //   link = "/api/mimes/mimes/all";
  // }
  // router.get("/mimes/:cat", (req, res) => {
  axios
    .get(link)
    // .then(res => console.log(res.data))
    .then(res => {
      //console.log(res.data);
      dispatch({
        type: GET_ADMIN_MIMES,
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
      console.log(res.data);
      dispatch({ type: MODIFY_MIME, payload: res.data });
      // dispatch({ type: MODIFY_MIME, payload: mimeData });
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

export const deleteMime = mimeData => dispatch => {
  axios
    // .get(link)
    .post("/api/mimes/deleteMime", mimeData)
    .then(res => {
      //console.log("action createAdvertisement", res.data);
      // dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: DELETE_MIME, payload: mimeData.recid });
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

export const filterMimes = str => dispatch => {
  //console.log("setCurrentAdvertisement advertisement in actions ", adid);
  //let link = `/api/advertise/change-advertisement-status/${adid}/${status}`;
  //console.log("adveractions changebusinesssttus", link);

  //dispatch({ type: CLEAR_ERRORS });

  dispatch({ type: FILTER_MIMES, payload: str });
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

export const logClick = logdata => dispatch => {
  // dispatch({ type: CLEAR_ERRORS });
  // console.log("we are in action about to upload file");
  // console.log(mimeFile);
  // console.log("end of we are in action about to upload file");
  // dispatch({
  //   type: SET_STATUS_MESSAGE,
  //   payload: { message: "we have successfully uploaded records" }
  // });

  axios
    .post("/api/mimes/logclick", logdata)
    .then(res => {
      console.log("this is the returned hit from action", res.data);
      dispatch({
        type: SET_STATUS_MESSAGE,
        payload: "we have successfully logged a click "
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log("about to dispatch error");
    });
};

// this is not used at the moment.
// the input is an input object that has an array of mimeids
// we getTrendingMimesAll which gets the object ids and then
// queries for the actual mimes
export const getTrendingMimes = obj => dispatch => {
  //console.log("getTrendingMimes obj is", obj.results);
  let objary = obj.results;
  let link = "";
  let idary = [];
  objary.forEach(function(rec) {
    idary.push(rec._id);
  });

  let pobj = { idary: idary };

  link = "/api/mimes/trendingmimes";
  axios
    .post(link, pobj)
    .then(res => {
      let dobj = {};
      dobj.results = res.data;
      dispatch({
        type: GET_TRENDING,
        payload: dobj
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getTrendingMimesAll = obj => dispatch => {
  //console.log("getTrendingMimes obj is", obj.results);

  let link = "/api/mimes/trending";
  //console.log("getTrending", link);
  axios
    .get(link)
    // .then(res => console.log(res.data))
    .then(res => {
      let objary = res.data;
      let idary = [];
      objary.forEach(function(rec) {
        // see the aggregation query.  we have to use _id which holds the
        // mimeids.  Artifact of group by and count etc
        idary.push(rec._id);
      });
      let pobj = { idary: idary };
      let link2 = "/api/mimes/trendingmimes";
      axios
        .post(link2, pobj)
        .then(res => {
          let dobj = {};
          dobj.results = res.data;
          dispatch({
            type: GET_TRENDING,
            payload: dobj
          });
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
    })
    .catch(err => {
      console.log(err);
    });
};
