import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import video from "../../img/TaylorSwiftGorgeous.mp4";

const MimeDisplay = ({ mime, title, width, height }) => {
  let vstr = "https://mimesvideos.s3.amazonaws.com/" + mime;
  // console.log(vstr);
  // console.log("wh", width, height);
  return (
    <div className="xthumbdetail3">
      <video
        style={{ border: "0px solid white" }}
        className="xvideoarea2"
        src={vstr}
        controls
        autoPlay
      />
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code
//width={width}
//        height={height}

export default MimeDisplay;
