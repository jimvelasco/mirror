import React, { Component } from "react";
import axios from "axios";

class ApiTest extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    //this.onGetData = this.onGetData.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  getData = (e, val) => {
    e.preventDefault();

    //let link = "/api/mimes/getMimes";

    let link = "https://dispatch-ads.herokuapp.com/api/advertise/bizdata_api";
    console.log("getData", link);
    // router.get("/mimes/:cat", (req, res) => {
    axios
      .get(link)
      // .then(res => console.log(res.data))
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let size = "contain";

    return (
      <div className="container staticpage">
        <a
          href="#"
          className="btn btn-sm btn-secondary xbtn-block"
          onClick={e => {
            this.getData(e, size);
          }}
        >
          Get Ads
        </a>
      </div>
    );
  }
}

export default ApiTest;
