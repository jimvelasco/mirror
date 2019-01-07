import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

//import Chart from "../components/chart";
//import {Sparklines,SparklinesLine} from 'react-sparklines';
//import {Sparklines} from 'react-sparklines';
//import GoogleMap from "../components/google_map";
import ThumbnailFeed from "../thumbnails/ThumbnailFeed";
//import Home from "./Home";
import { MirrorDictionary } from "../../utils/mirrordictionary";

//import { performThumbCategorySearch } from "../../actions/thumbnailActions";
//import { performThumbEmotionSearch } from "../../actions/thumbnailActions";
import { performThumbnailSearch } from "../../actions/thumbnailActions";

import mirror from "../../img/round-sphere-animated.gif";

class MainResults extends Component {
  // constructor(props) {
  //   super(props);
  //   // console.log("incoming props");
  //   // console.log(props);
  //   // console.log(props.match.params.which);
  //   // this.state = {
  //   //   draw: "what" //props.draw
  //   // };
  //   // console.log("searchbar results incoming state");
  //   // console.log(this.state);
  // }

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
    this.props.performThumbnailSearch(which, term);
  }
  componentWillReceiveProps = nextProps => {
    // if (nextProps.location.key !== this.props.location.key) {
    //   window.location.reload();
    // }
    // console.log(this.state);
    let curwhich = this.props.match.params.which;
    let curterm = this.props.match.params.term;
    let nextwhich = nextProps.match.params.which;
    let nextterm = nextProps.match.params.term;
    if (curwhich !== nextwhich || curterm !== nextterm) {
      this.props.performThumbnailSearch(nextwhich, nextterm);
    }
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
    if (this.props.thumbnails.length === 0) {
      return (
        <div>
          {/* <Home draw="true" /> */}
          Loading...
        </div>
      );
    }

    let thumbContent;
    // console.log("props in search bar results");
    //console.log(this.props);
    let thumbnails = this.props.thumbnails;
    let cat = this.props.searchterm;
    if (MirrorDictionary[cat]) {
      cat = MirrorDictionary[cat];
    }

    thumbContent = <ThumbnailFeed thumbnails={thumbnails} />;
    return (
      <div className="feed">
        <div className="container mirrorborder">
          <div
            className="xbg-light"
            style={{
              //textAlign: "center",
              // margin: "0px auto",
              // float: "right",
              color: "white",
              marginRight: "40px",
              textAlignLast: "right",
              fontSize: "10pt"
              //backgroundColor: "black",
              // width: "200px"
            }}
          >
            {cat}
          </div>
          <div style={{ clear: "left" }} />
          <div className="row">
            <div className="col-md-12 ximage-container">
              <div style={{ float: "left" }}>
                <Link className="nav-link" to="/magicmirror">
                  <img
                    src={mirror}
                    style={{ width: "200px", height: "200px" }}
                    alt=""
                  />
                </Link>
              </div>
              {thumbContent}
            </div>
          </div>
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
    thumbnails: state.thumbnailreducer.thumbnails,
    which: state.thumbnailreducer.which,
    searchterm: state.thumbnailreducer.searchterm
    //draw: state.draw
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    // { performThumbCategorySearch, performThumbEmotionSearch },
    { performThumbnailSearch },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainResults);
