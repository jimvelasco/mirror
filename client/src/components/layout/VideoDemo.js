import React, { Component } from "react";
import video from "../../img/MimeDemo3.mp4";

class VideoDemo extends Component {
  render() {
    // let vstr =
    //   "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/MimeDemo3.mp4";

    // let vstr =
    //   "https://drive.google.com/open?id=1IYyP-TVCYGsxGACyjzAWsTMepoIoJiG_/view";
    return (
      <div className="centerdiv">
        {/* <iframe className="embed-responsive-item videoarea" src={video} /> */}
        <video src={video} controls />
      </div>
    );
  }
}
export default VideoDemo;
//https://drive.google.com/open?id=1IYyP-TVCYGsxGACyjzAWsTMepoIoJiG_
//radiant-plateau-48717
