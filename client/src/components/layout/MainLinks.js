import React, { Component } from "react";
//import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { performThumbCategorySearch } from "../../actions/thumbnailActions";
//import { performThumbWildcardSearch } from "../../actions/thumbnailActions";

class MainLinks extends Component {
  onMainClick(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name);
    let sval = e.target.name;
    //sval = "wow";
    // console.log("main links " + sval);
    // console.log(this.props);
    this.props.performThumbCategorySearch(sval);
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
            className="nav-link"
            style={{ display: "inline" }}
          >
            Trending...
          </a>
          <a
            href=""
            name="cool"
            onClick={this.onMainClick.bind(this)}
            className="nav-link"
            style={{ display: "inline" }}
          >
            Most Popular...
          </a>
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
  { performThumbCategorySearch }
)(MainLinks);

// export default MainLinks;
