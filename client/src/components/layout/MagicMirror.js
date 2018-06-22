import React, { Component } from "react";
//import { connect } from "react-redux";

// we need to get into git
//import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//import axios from "axios";

// import MirrorItem from "./MirrorItem";

import mirror from "../../img/round-sphere-animated.gif";

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
//     return aname;
//   });

//   // return <div>{bname}</div>;
// };

class MagicMirror extends Component {
  constructor(props) {
    super(props);
    // console.log("magicmirror init props");
    // console.log(this.props);

    this.state = {
      show: false,
      passedparams: ""
    };
  }
  onGoBack(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name);
    // this.props.history.goBack();
    window.history.back();
  }
  // showDiv(e) {
  //   e.preventDefault();
  //   // jQuery.("#modaldiv").show();
  //   //console.log(this.state);
  //   //console.log("calling set state");
  //   if (this.state.show) {
  //     this.setState({ show: false, passedparams: "nope" });
  //   } else {
  //     this.setState({ show: true, passedparams: "yep" });
  //   }

  //   //console.log(this.state);
  // }

  render() {
    // console.log("calling render");
    // let show = this.state.show;
    //let passedin = "";
    //  passedin = { show } ? getData(this.state.passedparams) : "";
    //passedin = this.state.passedparams;
    // console.log("passed in" + passedin);

    // console.log("the state");
    // console.log(this.state);
    // console.log("the props");
    // console.log(this.props);
    //console.log(passedin);
    //console.log(show);
    // let mydiv = "";
    // if (show) {
    //   mydiv = '<div id="modaldiv" className="modaldiv">';
    //   mydiv += "This is a hidden</div>";
    // }
    //console.log(show);
    //let passed = "whoopie";

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
        <button onClick={this.onGoBack.bind(this)} className="btn btn-default">
          Back
        </button>
        {/* <br />
        <button onClick={this.showDiv.bind(this)} className="btn btn-default">
          Show
        </button>
        {show ? <MirrorItem value={passedin} /> : <div />} */}
      </div>
    );
  }
}
// value={passedin}
// const mapStateToProps = state => {
//   return {
//     show: state.show,
//     passedparams: state.passedparams
//     //draw: state.draw
//   };
// };

//export default connect(mapStateToProps)(withRouter(MagicMirror));
export default withRouter(MagicMirror);
