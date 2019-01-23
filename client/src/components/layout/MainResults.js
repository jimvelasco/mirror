import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

//import Chart from "../components/chart";
//import {Sparklines,SparklinesLine} from 'react-sparklines';
//import {Sparklines} from 'react-sparklines';
//import GoogleMap from "../components/google_map";
import ThumbnailFeed from "../thumbnails/ThumbnailFeed";
import ThumbnailItem from "../thumbnails/ThumbnailItem";
//import Home from "./Home";
import { MirrorDictionary } from "../../utils/mirrordictionary";

import ImageDisplay from "../common/ImageDisplay";
import MimeDisplay from "../common/MimeDisplay";

import FilterMimesBar from "../common/FilterMimesBar";

//import { performThumbCategorySearch } from "../../actions/thumbnailActions";
//import { performThumbEmotionSearch } from "../../actions/thumbnailActions";
import { performThumbnailSearch } from "../../actions/thumbnailActions";
import { getMimes } from "../../actions/mimeActions";

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
      posy: 0
    };
    // console.log("searchbar results incoming state");
    // console.log(this.state);
    this.onThumbClick = this.onThumbClick.bind(this);
  }

  // componentDidMount() {
  //   console.log("sbr cdm props");
  //   console.log(this.props);
  // }

  componentDidMount() {
    // this will start the screen with all of the thumbs
    // console.log("mresults cdm");
    // console.log(this.props);
    let which = this.props.match.params.which;
    let term = this.props.match.params.term;
    if (!which) {
      which = "category";
      term = "all";
    }
    // this.props.performThumbnailSearch(which, term);
    //this.props.getMimes({ param: "all" });
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

  onThumbClick = (e, val) => {
    console.log(e);
    console.log(e.clientX);
    console.log(e.clientY);
    console.log("pon thumb click", val);
    this.setState({ selectedMime: val, posx: e.clientX, posy: e.clientY });
    let m = document.getElementById("mimemain");
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
    const mimes = this.props.mimereducer.workmimes;
    let thumbnails = this.props.thumbnails;
    let cat = this.props.searchterm;
    if (MirrorDictionary[cat]) {
      cat = MirrorDictionary[cat];
    }
    if (mimes.length == 0) {
      return (
        <div>
          <FilterMimesBar />
          <h2 style={{ textAlign: "center", marginTop: "40px", color: "#fff" }}>
            Please select from the categories above
          </h2>
        </div>
      );
    }

    let selectedMime = this.state.selectedMime;
    let posx = this.state.posx + "px";
    let posy = this.state.posy + "px";

    // thumbContent = <ThumbnailFeed thumbnails={thumbnails} />;
    // thumbContent = <ThumbnailFeed thumbnails={mimes} />;
    return (
      <div className="feed">
        <FilterMimesBar />
        <div className="container mirrorborder">
          <div
            className="xbg-light"
            style={{
              color: "white",
              marginRight: "40px",
              textAlignLast: "right",
              fontSize: "10pt"
            }}
          >
            {cat}
          </div>

          <div style={{ clear: "left" }} />

          <div className="row">
            <div className="col-md-12 ximage-container">
              {/* <div style={{ float: "left" }}>
                <Link className="nav-link" to="/magicmirror">
                  <img
                    src={mirror}
                    style={{ width: "200px", height: "200px" }}
                    alt=""
                  />
                </Link>
              </div> */}
              {mimes.map(thumb => (
                <div key={thumb._id}>
                  {/* <ImageDisplay img={thumb.image} title={thumb.image} /> */}
                  <ThumbnailItem
                    key={thumb._id}
                    id={thumb._id}
                    thumb={thumb}
                    onThumbClick={this.onThumbClick}
                  />
                </div>
              ))}
              {/* ;{thumbContent} */}
            </div>
          </div>
          {selectedMime ? (
            <div
              className="mimemain"
              id="mimemain"
              style={{ top: posy, left: posx }}
            >
              <a
                href="#"
                className="btn btn-sm btn-primary btn-block"
                onClick={e => {
                  this.hideMime(e, selectedMime);
                }}
              >
                close
              </a>
              <MimeDisplay mime={selectedMime} title={selectedMime} />
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
    { getMimes },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainResults);
