import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// we need to get into git

// import Trips from "../shuttles/Trips";
// import Shuttles from "../shuttles/Shuttles";

class Dashboard extends Component {
  onGoBack(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name);
    // this.props.history.goBack();
    window.history.back();
  }

  render() {
    return (
      <div style={{ width: "600px", margin: "30px auto", textAlign: "center" }}>
        <h3 style={{ textAlign: "center" }}>Mirror Dashboard</h3>
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          This will be the area where functions only available to members will
          be displayed. There will be links to apps they can download, perhaps
          they will be able to upload their own mirror, etc.
        </p>
        <button onClick={this.onGoBack.bind(this)} className="btn btn-default">
          Back
        </button>
      </div>
    );
  }
}
export default withRouter(Dashboard);
