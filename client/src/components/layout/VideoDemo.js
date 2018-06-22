import React, { Component } from "react";
import video from "../../img/MimeDemo3.mp4";

class VideoDemo extends Component {
  render() {
    return (
      <div className="centerdiv">
        <iframe className="embed-responsive-item videoarea" src={video} />
      </div>
    );
  }
}
export default VideoDemo;
