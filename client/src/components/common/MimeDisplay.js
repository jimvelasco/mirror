import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import video from "../../img/TaylorSwiftGorgeous.mp4";

const MimeDisplay = ({ img, title }) => {
  return (
    <div className="thumbdetail3">
      {/* <a href="" onClick={this.onClose.bind(this)}>
        close
      </a> */}
      <video className="videoarea2" src={video} controls autoPlay />
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code

export default MimeDisplay;
