import React, { Component } from "react";
//import { connect } from "react-redux";
import axios from "axios";

// we need to get into git
//import { Link } from "react-router-dom";
//import { withRouter } from "react-router-dom";

//import mirror from "../../img/round-sphere-animated.gif";

// const getData = id => {
//   // return <div>now is the time {id}</div>;

//   let term = "happy";
//   let url = `/api/thumbnails/emotion/${term}`;
//   let data = "";
//   let aname = "qq";
//   // axios.get(url).then(res => console.log(res.data));
//   axios.get(url).then(function(res) {
//     data = res.data;
//     // console.log(data);
//     // console.log(data[0]["name"]);
//     aname = data[0]["name"];
//     console.log(aname);
//     console.log("returning " + aname);
//     this.setState({ data: aname });
//     return aname;
//   });
// };
// const getData = id => {
//   let term = "happy";
//   let url = `/api/thumbnails/emotion/${term}`;
//   axios.get(url).then(response => {
//     console.log(response);
//     // return {
//     //   thumb: response.data[0]["name"]
//     // };
//   });
// };

// const getData = id => {
//   let term = "happy";
//   let url = `/api/thumbnails/emotion/${term}`;
//   axios.get(url).then(response => {
//     this.setState(() => {
//       return {
//         thumb: response.data[0]["name"]
//       };
//     });
//   });
// };

const renderImage = thumb => {
  let imgstr =
    "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/" + thumb.image;
  console.log(imgstr);
  return (
    <div>
      <img
        className="rounded-circle xd-none xd-md-block"
        src={imgstr}
        alt=""
        style={{
          width: "200px",
          height: "200px",
          border: "3px solid white"
        }}
      />
    </div>
  );
};

class MirrorItem extends Component {
  constructor(props) {
    super(props);
    // console.log("props in item");
    // console.log(props);

    this.state = {
      thumb: {}
    };
  }

  // componentDidMount() {
  //   let term = "happy";
  //   let url = `/api/thumbnails/emotion/${term}`;
  //   let data = "";
  //   let aname = "qq";
  //   // axios.get(url).then(res => console.log(res.data));
  //   axios.get(url).then(function(res) {
  //     data = res.data;
  //     // console.log(data);
  //     // console.log(data[0]["name"]);
  //     aname = data[0]["name"];
  //     console.log(aname);
  //     console.log("returning " + aname);
  //     setState({ thumb: aname });
  //     // return aname;
  //   });
  // }

  // componentDidMount() {
  //   let term = "happy";
  //   let url = `/api/thumbnails/emotion/${term}`;
  //   let data = "";
  //   let aname = "qq";
  //   // axios.get(url).then(res => console.log(res.data));
  //   axios.get(url).then(res => {
  //     this.console.log(res));
  // }

  componentDidMount() {
    let term = "happy";
    let url = `/api/thumbnails/emotion/${term}`;
    axios.get(url).then(response => {
      // this.setState(() => {
      //   return {
      //     thumb: response.data[0]["name"]
      //   };
      //const thumb = response.data[0]["name"];
      const thumb = response.data[0];
      console.log(thumb);
      this.setState({ thumb });
    });
  }

  // return <div>{bname}</div>;

  // componentDidMount() {
  //   let d = getData();
  //   console.log(d);
  //   console.log("why");
  // }

  render() {
    console.log("render called");

    // let passedparms = this.props.passedparms;
    // let val = this.props.value;
    let r = this.state.thumb;
    if (r === {}) {
      console.log("returning because no data");
      return <div />;
    }
    let ri = renderImage(r);
    // console.log(r);
    return (
      <div>
        <div className="magicmirrormain">
          now is the time
          {ri}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     show: state.show,
//     passedparams: state.passedparams
//     //draw: state.draw
//   };
// };

// export default connect(mapStateToProps)(MirrorItem);

export default MirrorItem;
