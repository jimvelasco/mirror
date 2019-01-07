import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      <div style={{ width: "450px", margin: "30px auto", textAlign: "center" }}>
        <h3 style={{ textAlign: "center" }}>Mirror Dashboard</h3>
        <div
          className="shadow-sm"
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#000",
            backgroundColor: "#e0e0e0",
            padding: "20px"
          }}
        >
          This will be the area where functions only available to members will
          be displayed. <br />
          <br />
          There will be links to apps they can download, perhaps they will be
          able to upload their own mirror, etc.
          <br />
          <br />
          Admin functions will also be available here
        </div>

        <div style={{ marginTop: "10px" }}>
          <Link to="/show_mimes" className="btn btn-lg btn-block btn-info mr-2">
            Mime Records
          </Link>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Link
            to="/upload_json"
            className="btn btn-lg btn-block btn-info mr-2"
          >
            Upload Mime File
          </Link>
        </div>
        <button
          style={{ marginTop: "10px" }}
          onClick={this.onGoBack.bind(this)}
          className="btn btn-lg btn-block btn-default"
        >
          Back
        </button>
      </div>
    );
  }
}
export default withRouter(Dashboard);
