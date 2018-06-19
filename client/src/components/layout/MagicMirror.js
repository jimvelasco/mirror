import React, { Component } from "react";
// we need to get into git
//import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import mirror from "../../img/round-sphere-animated.gif";

class MagicMirror extends Component {
  onGoBack(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name);
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="magicmirrormain">
        <h3 style={{ textAlign: "center" }}>Magic Mirror</h3>

        <a href="" onClick={this.onGoBack.bind(this)} className="nav-link">
          <img
            src={mirror}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        </a>
        <h4>Turn on your camera and click the magic mirror</h4>

        <a href="" onClick={this.onGoBack.bind(this)} className="nav-link">
          Back
        </a>
      </div>
    );
  }
}
export default withRouter(MagicMirror);
