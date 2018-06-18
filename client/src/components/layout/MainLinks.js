import React, { Component } from "react";
//import { Link } from "react-router-dom";

import { connect } from "react-redux";

//import { performThumbCategorySearch } from "../../actions/thumbnailActions";
//import { performThumbEmotionSearch } from "../../actions/thumbnailActions";
import { performThumbnailSearch } from "../../actions/thumbnailActions";

class MainLinks extends Component {
  onMainClick(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name);
    let sval = e.target.name;
    //sval = "wow";
    // console.log("main links " + sval);
    // console.log(this.props);
    // this.props.performThumbCategorySearch(sval);
    this.props.performThumbnailSearch("category", sval);
  }

  onEmotionChange(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name);
    let sval = e.target.value;
    //sval = "wow";
    // console.log("select click " + sval);
    // console.log(this.props);
    //this.props.performThumbEmotionSearch(sval);
    this.props.performThumbnailSearch("emotion", sval);
  }
  render() {
    return (
      // <nav
      //   className="navbar navbar-expand-sm xnavbar-dark xbg-dark xmb-4"
      //   style={{ marginTop: "-20px" }}
      // >
      <div className="mainlinkswrapper">
        <div className="mirrorHeading1">Mirror</div>
        <div className="mirrorHeading2">Animate with Audio!</div>
        <div className="mirrorlinks">
          <a
            href=""
            name="wow"
            onClick={this.onMainClick.bind(this)}
            className="xnav-link"
            style={{
              display: "inline",
              // fontSize: "10pt",
              marginRight: "10px"
            }}
          >
            Trending...
          </a>
          <a
            href=""
            name="cool"
            onClick={this.onMainClick.bind(this)}
            className="xnav-link"
            style={{
              display: "inline",
              //fontSize: "10pt",
              marginRight: "10px"
            }}
          >
            Most Popular...
          </a>
          <div style={{ display: "inline" }}>
            <span
              style={{
                color: "#007bff"
                //fontSize: "10pt"
              }}
            >
              Emotion...
            </span>&nbsp;
            <select onChange={this.onEmotionChange.bind(this)}>
              <option value="happy">Happy</option>
              <option value="serious">Serious</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  //{ performThumbCategorySearch, performThumbEmotionSearch }
  { performThumbnailSearch }
)(MainLinks);

// export default MainLinks;
