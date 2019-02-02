import React, { Component } from "react";
import axios from "axios";
//import ApiTestImageObj from "./ApiTestImageObj";
import ApiAdObj from "./ApiAdObj";

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

    let link = "/api/apitest/apitest";
    //console.log("getData", link);
    // router.get("/mimes/:cat", (req, res) => {
    axios
      .get(link)
      // .then(res => console.log(res.data))
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  /*
  [ { _id: '5beb63b1a6db2d121f0ffbfd',
  [0]     name: 'steamboat fish company',
  [0]     email: 'fish@e.com',
  [0]     description: 'fish fish fish part of c@e.com',
  [0]     category: 'seafood',
  [0]     longitude: -106.83218547983171,
  [0]     latitude: 40.48630560247532,
  [0]     advertiser: [ [Object] ],
          "advertiser": [
            {
                "name": "cabo enterprises",
                "email": "c@e.com"
            }
  [0]     advertisements:
  [0]      { _id: '5bf092ffe0be101055274b5c',
  [0]        businessId: '5beb63b1a6db2d121f0ffbfd',
  [0]        name: 'daily skiing special',
  [0]        description: 'we have great fish tacos',
  [0]        discount: '20 percent off when you order 5',
  [0]        enddate: '2018-11-30',
  [0]        startdate: '2018-11-23' },
  [0]     imgs: [ [Object], [Object], [Object], [Object] ] },
  [0]   { _id: '5beb63b1a6db2d121f0ffbfd',
  [0]     name: 'steamboat fish company',
  [0]     email: 'fish@e.com',
  [0]     description: 'fish fish fish part of c@e.com',
  [0]     category: 'seafood',
  [0]     longitude: -106.83218547983171,
  [0]     latitude: 40.48630560247532,
  [0]     advertiser: [ [Object] ],
  [0]     advertisements:
  [0]      { _id: '5bf3785e6ed44f0891bc7185',
  [0]        businessId: '5beb63b1a6db2d121f0ffbfd',
  [0]        name: 'After hours special uu',
  [0]        description: 'for the early bird crowd',
  [0]        discount: 'buy one entree get another one free',
  [0]        startdate: '2018-11-23',
  [0]        enddate: '' },
  [0]     imgs: [ [Object], [Object], [Object], [Object] ] } ]
                "advertiserId": "5beb634da6db2d121f0ffbfb",
                "businessId": "5beb63b1a6db2d121f0ffbfd",
                "type": "logo",
                "imageBuffer"


  $project: {
        name: 1,
        email: 1,
        company: 1,
        category: 1,
        description: 1,
        latitude: 1,
        longitude: 1,
        "advertiser.name": 1,
        "advertiser.email": 1,
        "advertisements._id": 1,
        "advertisements.businessId": 1,
        "advertisements.name": 1,
        "advertisements.description": 1,
        "advertisements.discount": 1,
        "advertisements.startdate": 1,
        "advertisements.enddate": 1,
        "imgs.advertiserId": 1,
        "imgs.businessId": 1,
        "imgs.advertisementId": 1,
        "imgs.imageFilename": 1,
        "imgs.imageBuffer": 1,
        "imgs.type": 1

        // "vizers.name": 1,
        // "vizers.email": 1
      }
*/
  render() {
    let size = "contain";
    let dary = this.state.data;

    let bizidary = [];
    let adidary = [];
    dary.forEach(function(obj) {
      let bid = obj._id;
      let aid = obj.advertisements._id;
      if (bizidary.indexOf(bid) < 0) {
        bizidary.push(bid);
      }
      if (adidary.indexOf(aid) < 0) {
        adidary.push(aid);
      }
    });

    console.log("unique biz ids ", bizidary);
    console.log("unique ad ids ", adidary);

    let adobj = { bizid: "bizid", logo: "logo", photos: [], ads: [] };

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
        {dary.map((obj, index) => (
          <div
            key={index}
            style={{ border: "1px solid black", marginBottom: "3px" }}
          >
            <div>
              <ApiAdObj obj={obj} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ApiTest;
