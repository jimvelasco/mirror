import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { Link } from "react-router-dom";

//import Chart from "../components/chart";
//import {Sparklines,SparklinesLine} from 'react-sparklines';
//import {Sparklines} from 'react-sparklines';
//import GoogleMap from "../components/google_map";
import ThumbnailFeed from "../thumbnails/ThumbnailFeed";
import ThumbnailItem from "../thumbnails/ThumbnailItem";
//import Home from "./Home";
import { MirrorDictionary } from "../../utils/mirrordictionary";
import MediaLinks from "../common/MediaLinks";

import ImageDisplay from "../common/ImageDisplay";
import MimeDisplay from "../common/MimeDisplay";

import FilterMimesBar from "../common/FilterMimesBar";

//import { performThumbCategorySearch } from "../../actions/thumbnailActions";
//import { performThumbEmotionSearch } from "../../actions/thumbnailActions";
import { performThumbnailSearch } from "../../actions/thumbnailActions";
import {
  getMimes,
  logClick,
  getTrendingMimesAll
} from "../../actions/mimeActions";

import mirror from "../../img/round-sphere-animated.gif";

class MainResults extends Component {
  constructor(props) {
    super(props);
    // console.log("incoming props");
    // console.log(props);
    // console.log(props.match.params.which);
    this.state = {
      selectedMime: "",
      posx: 0,
      posy: 0,
      width: 0,
      height: 0
    };
    // console.log("searchbar results incoming state");
    // console.log(this.state);
    this.onThumbClick = this.onThumbClick.bind(this);
    // this.getTrending = this.getTrending.bind(this);
  }

  // componentDidMount() {
  //   console.log("sbr cdm props");
  //   console.log(this.props);
  // }

  componentDidMount() {
    // this will start the screen with all of the thumbs
    // console.log("mresults cdm");
    // console.log(this.props);
    // this.getTrending();
    this.props.getTrendingMimesAll();
  }
  componentWillReceiveProps = nextProps => {
    // if (nextProps.location.key !== this.props.location.key) {
    //   window.location.reload();
    // }
    // console.log(this.state);
    // let curwhich = this.props.match.params.which;
    // let curterm = this.props.match.params.term;
    // let nextwhich = nextProps.match.params.which;
    // let nextterm = nextProps.match.params.term;
    // if (curwhich !== nextwhich || curterm !== nextterm) {
    //    this.props.performThumbnailSearch(nextwhich, nextterm);
    // }
  };

  // getTrending = () => {
  //   let link = "";

  //   //let link = "/api/mimes/getMimes";

  //   link = "/api/mimes/trending";
  //   console.log("getTrending", link);
  //   // router.get("/mimes/:cat", (req, res) => {
  //   axios
  //     .get(link)
  //     // .then(res => console.log(res.data))
  //     .then(res => {
  //       let dobj = {};
  //       dobj.results = res.data;
  //       console.log(dobj);
  //       this.props.getTrendingMimes(dobj);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  onThumbClick = (e, val) => {
    // console.log(e);
    // console.log(e.clientX);
    // console.log(e.clientY);
    //console.log("pon thumb click", val);
    let xpos = e.clientX;
    let ypos = e.clientY + window.scrollY;
    let mwid = val.width || 640;
    let mhgt = val.height || 360;
    let wwid = window.innerWidth;
    if (xpos + mwid > wwid) {
      xpos = xpos - (xpos + mwid - wwid) - 40;
    }

    let mimeid = val._id;
    let cats = this.props.mimereducer.selectedCategories;
    let cat0 = "";
    let cat1 = "";
    let cat2 = "";
    if (cats.length == 1) {
      cat0 = cats[0];
    }
    if (cats.length == 2) {
      cat0 = cats[0];
      cat1 = cats[1];
    }
    if (cats.length == 3) {
      cat0 = cats[0];
      cat1 = cats[1];
      cat2 = cats[2];
    }
    let logdata = {
      mimeid: mimeid,
      cat0: cat0,
      cat1: cat1,
      cat2: cat2
    };

    //console.log(logdata2);

    this.props.logClick(logdata);

    this.setState({
      selectedMime: val.mime,
      width: mwid,
      height: mhgt,
      posx: xpos,
      posy: ypos
    });

    //let m = document.getElementById("mimemain");
  };

  hideMime = val => {
    //console.log(val);
    this.setState({ selectedMime: "" });
  };

  // componentDidUpdate() {
  //   let which = this.props.match.params.which;
  //   let term = this.props.match.params.term;
  //   if (!which) {
  //     which = "category";
  //     term = "all";
  //   }
  //   this.props.performThumbnailSearch(which, term);
  // }

  render() {
    // console.log("searchbarresults props");
    // console.log(this.props);
    // if (this.props.thumbnails.length === 0) {
    //   return (
    //     <div>
    //       {/* <Home draw="true" /> */}
    //       {/* Loading... */}

    //     </div>
    //   );
    // }

    let thumbContent;
    // console.log("props in search bar results");
    //console.log(this.props);
    const selectecCategories = this.props.mimereducer.selectedCategories;
    let catDisplay = selectecCategories.map((v, i) => (
      <span key={i} style={{ marginLeft: "10px" }}>
        {v}
      </span>
    ));

    let hideit = this.hideMime;

    const mimes = this.props.mimereducer.workmimes;
    let thumbnails = this.props.thumbnails;
    // let cat = this.props.searchterm;
    // if (MirrorDictionary[cat]) {
    //   cat = MirrorDictionary[cat];
    // }
    if (mimes.length == 0) {
      return (
        <div>
          {/* <FilterMimesBar /> */}
          <h5 style={{ textAlign: "center", margin: "40px", color: "#fff" }}>
            Please select from the categories above
          </h5>
        </div>
      );
    }

    let selectedMime = this.state.selectedMime;
    let posx = this.state.posx + "px";
    let posy = this.state.posy + "px";
    let width = this.state.width / 2 + 4;
    let height = this.state.height / 2 + 44;

    let widthpx = width + "px";
    let heightpx = height + "px";

    let sposy = window.scrollY;
    posx = "10px";
    posy = sposy + 200 + "px";

    // thumbContent = <ThumbnailFeed thumbnails={thumbnails} />;
    // thumbContent = <ThumbnailFeed thumbnails={mimes} />;
    // <div key={thumb._id}>
    // </div>

    let template = mimes.map(thumb => (
      <ThumbnailItem
        key={thumb._id}
        id={thumb._id}
        thumb={thumb}
        onThumbClick={this.onThumbClick}
      />
    ));
    return (
      <div className="mainresults">
        {/* <FilterMimesBar /> */}
        <div className="container xmirrorborder">
          <div
            style={{
              height: "30px",
              color: "white",
              textAlign: "center",
              marginTop: "15px"
            }}
          >
            {catDisplay}
          </div>
          {/* <div
            className="xbg-light"
            style={{
              color: "white",
              marginRight: "40px",
              textAlignLast: "right",
              fontSize: "10pt"
            }}
          >
            {cat}
          </div> */}

          <div style={{ clear: "left" }} />

          <div className="row">
            <div className="col-md-12 ximage-container">
              {template}
              {/* <div style={{ float: "left" }}>
                <Link className="nav-link" to="/magicmirror">
                  <img
                    src={mirror}
                    style={{ width: "200px", height: "200px" }}
                    alt=""
                  />
                </Link>
              </div> */}
            </div>
          </div>
          {selectedMime ? (
            <div
              className="mimemain"
              id="mimemain"
              style={{
                top: posy,
                left: posx,
                width: widthpx,
                height: heightpx
              }}
            >
              {/* <a
                href="#"
                className="btn btn-sm btn-primary btn-block"
                onClick={e => {
                  this.hideMime(e, selectedMime);
                }}
              >
                close
              </a> */}
              <MediaLinks onclick={hideit} />
              <MimeDisplay
                mime={selectedMime}
                width={width}
                height={height}
                title={selectedMime}
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

// function mapStateToProps({ state, thumbnails }) {
//   console.log("searchbarresultsmanage state to props called");
//   console.log(thumbnails);
//   console.log(state);
//   console.log("end searchbarresults manage state to props called");
//   return { thumbnails };
// }

const mapStateToProps = state => {
  return {
    // thumbnails: state.thumbnailreducer.thumbnails,
    // which: state.thumbnailreducer.which,
    // searchterm: state.thumbnailreducer.searchterm,
    mimereducer: state.mimereducer
    //draw: state.draw
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    // { performThumbCategorySearch, performThumbEmotionSearch },
    { getMimes, logClick, getTrendingMimesAll },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainResults);
