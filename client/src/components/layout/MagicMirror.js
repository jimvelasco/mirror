import React, { Component } from "react";
// we need to get into git
import { Link } from "react-router-dom";

import mirror from "../../img/round-sphere-animated.gif";

class MagicMirror extends Component {
  render() {
    return (
      <div className="magicmirrormain">
        <h3 style={{ textAlign: "center" }}>Magic Mirror</h3>
        <Link className="nav-link" to="/">
          <img
            src={mirror}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        </Link>
        <h4>Turn on your camera and click the magic mirror</h4>
        <Link className="nav-link" to="/">
          back to main
        </Link>
      </div>
    );
  }
}
export default MagicMirror;
