import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import video from "../../img/TaylorSwiftGorgeous.mp4";

const MimeDisplay = ({ mime, title }) => {
  let vstr = "https://mimesvideos.s3.amazonaws.com/" + mime;
  // console.log(vstr);
  return (
    <div className="thumbdetail3">
      {/* <a href="" onClick={this.onClose.bind(this)}>
        close
      </a> */}
      <video className="videoarea2" src={vstr} controls autoPlay />
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code

export default MimeDisplay;
