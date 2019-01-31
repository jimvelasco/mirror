import React from "react";
import ReactPlayer from "react-player";
// import classnames from "classnames";
// import PropTypes from "prop-types";
// import video from "../../img/TaylorSwiftGorgeous.mp4";
import { UrlConfig } from "../../config/url_config";

const MimeDisplay = ({ mime, title, width, height }) => {
  //let vstr = "https://mimesvideos.s3.amazonaws.com/" + mime;
  let vstr = UrlConfig.url_video + mime;
  // console.log(vstr);
  // console.log("wh", width, height);
  // return (
  //   <div className="xthumbdetail3">
  //     <video
  //       style={{ border: "0px solid white", width: width, height: height }}
  //       className="xvideoarea2"
  //       src={vstr}
  //       controls
  //       autoPlay
  //     />
  //   </div>
  // );

  //  loop

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={vstr}
        className="react-player"
        playing
        width="100%"
        height="100%"
        controls
      />
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code
//width={width}
//        height={height}

export default MimeDisplay;
