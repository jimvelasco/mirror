import isEmpty from "../validation/is-empty";

import {
  GET_MIMES,
  GET_ADMIN_MIMES,
  CREATE_MIME,
  DELETE_MIME,
  SET_CURRENT_MIME,
  MODIFY_MIME,
  CHANGE_MIME_STATUS,
  FILTER_MIMES,
  FILTER_CATEGORY_MIMES,
  GET_TRENDING
} from "../actions/types";

// import { TEST_DISPATCH } from "../actions/types";

const initialState = {
  mimes: [],
  workmimes: [],
  selectedCategories: [],
  mime: {}
};

// payload is the decoded user.  if it is empty means we are not authenticated
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MIMES:
      //console.log("getting mimes payload is ", action.payload);
      let results = action.payload.results;
      let category = action.payload.category;
      let catary = []; //state.selectedCategories;
      catary.push(category);
      return {
        ...state,
        mimes: results,
        workmimes: results,
        selectedCategories: catary
      };

    case GET_ADMIN_MIMES:
      return {
        ...state,
        mimes: action.payload,
        workmimes: action.payload,
        selectedCategories: []
      };

    case GET_TRENDING:
      //console.log("getting mimes payload is ", action.payload);
      let tresults = action.payload.results;
      let tcategory = "Trending";
      let tcatary = []; //state.selectedCategories;
      tcatary.push(tcategory);
      return {
        ...state,
        mimes: tresults,
        workmimes: tresults,
        selectedCategories: tcatary
      };

    case CREATE_MIME:
      let curmimes = state.mimes;
      curmimes.push(action.payload);
      return {
        ...state,
        mimes: curmimes
      };

    case DELETE_MIME:
      let workid = action.payload;
      return {
        ...state,
        workmimes: state.workmimes.filter(item => item._id !== workid)
      };

    case SET_CURRENT_MIME:
      let mid = action.payload;
      // console.log("SET_CURRENT_ADVERTISEMENT workid", workid);
      let workary = state.mimes;
      let target = null;
      workary.map((ad, index) => {
        if (ad._id == mid) {
          target = ad;
        }
      });
      // console.log("setting current mime ", target);
      return {
        ...state,
        mime: target
      };

    case MODIFY_MIME:
      // console.log("MODIFY_MIME incoming payload", action.payload);
      //let mimeary = state.mimes;
      let mimeary = state.workmimes;
      let modobj = action.payload;

      let mimeid = modobj._id;

      // console.log("we have image is ", wehaveimage);
      // console.log("workarybefore", workary);

      mimeary.map((biz, index) => {
        if (biz._id === mimeid) {
          mimeary[index] = modobj;
        }
      });
      return {
        ...state,
        workmimes: mimeary

        // images: imgary
      };

    case FILTER_MIMES:
      // console.log("MODIFY_MIME incoming payload", action.payload);
      let allmimeary = state.mimes;
      let str = action.payload;
      let fary = [];

      // console.log("we have image is ", wehaveimage);
      // console.log("workarybefore", workary);

      allmimeary.map((mime, index) => {
        let mkeywords = mime.search_data.toLowerCase();
        let tstr = str.toLowerCase();
        if (mkeywords.indexOf(tstr) > -1) {
          fary.push(mime);
        }
        // if (mime.keywords.indexOf(str) > -1) {
        //   fary.push(mime);
        // }
      });

      // console.log("workaryafter", workary);
      let curcatary = state.selectedCategories;
      curcatary[1] = str;

      return {
        ...state,
        workmimes: fary,
        selectedCategories: curcatary
        // images: imgary
      };

    case FILTER_CATEGORY_MIMES:
      // console.log("MODIFY_MIME incoming payload", action.payload);
      let allary = state.mimes;
      let obj = action.payload;
      let cat1 = obj.cat1;
      let cfary = [];

      let curcatsary = state.selectedCategories;
      curcatsary[1] = cat1;

      if (cat1 === "All") {
        cfary = allary;
      } else {
        allary.map((mime, index) => {
          let cm1 = mime.cat1;
          if (cm1 == cat1) {
            cfary.push(mime);
          }
        });
      }

      return {
        ...state,
        workmimes: cfary,
        selectedCategories: curcatsary
        // images: imgary
      };

    case CHANGE_MIME_STATUS:
      workary = state.mimes;
      workid = action.payload.mimeid;
      let status = action.payload.status;
      let updatestatus = 0;
      if (status == 0) {
        updatestatus = 1;
      }
      workary.map((biz, index) => {
        if (biz._id == workid) {
          biz.status = updatestatus;
        }
      });
      return {
        ...state,
        mimes: workary
      };

    // case TEST_DISPATCH:
    //   console.log("we are in authreducer " + action.type);
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    default:
      return state;
  }
}
