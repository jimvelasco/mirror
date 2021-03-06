import React, { Component } from "react";
import video from "../../img/TaylorSwiftGorgeous.mp4";

class ThumbnailDetail extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    //console.log("constructed");
    this.state = {
      show: true
    };
  }

  onClose(e) {
    e.preventDefault();
    this.setState({ show: false });
  }

  render() {
    // console.log("we are rendering");
    if (!this.state.show) {
      return <div />;
    }

    if (this.props.onethumbnail.length === 0) {
      return (
        <div>
          {/* <Home draw="true" /> */}
          Loading...
        </div>
      );
    }

    let selectedthumb = this.props.onethumbnail[0];

    let imgstr =
      "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/" +
      selectedthumb.image;
    let showvid = false;
    let vid = selectedthumb._id;
    if (vid === "5c2fa82f6c318013f5463150") {
      showvid = true;
    }
    if (showvid) {
      return (
        <div className="thumbdetail2">
          <a href="" onClick={this.onClose.bind(this)}>
            close
          </a>
          <video className="videoarea2" src={video} controls autoPlay />
        </div>
      );
    } else {
      return (
        <div>
          <div className="thumbdetail">
            <a href="" onClick={this.onClose.bind(this)}>
              close
            </a>
            <img
              className="xrounded-circle "
              src={imgstr}
              alt=""
              style={{
                width: "200px",
                height: "200px",
                border: "3px solid white"
              }}
            />
            {/* <div>{selectedthumb._id}</div> */}
          </div>
        </div>
      );
    }
  }
}

export default ThumbnailDetail;
