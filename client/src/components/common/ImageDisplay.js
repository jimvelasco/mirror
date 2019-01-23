import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const ImageDisplay = ({ img, title }) => {
  // jjv awslet imgstr = "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/" + img;
  // let imgstr = "https://s3-us-east-2.amazonaws.com/mimesthumbnails/" + img;
  let imgstr = "https://mimesthumbnails.s3.amazonaws.com/" + img;
  //console.log(imgstr);

  let imgname = title;
  return (
    <div className="image-float" style={{ backgroundColor: "#000" }}>
      <img
        className="xrounded-circle xd-none xd-md-block"
        src={imgstr}
        alt=""
        style={{
          width: "200px",
          height: "200px",
          border: "3px solid black"
        }}
      />
      <div
        style={{
          color: "white",
          fontSize: "8pt",
          width: "100%",
          textAlign: "center",
          border: "0px solid white"
        }}
      >
        {/* {imgname} */}
      </div>
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code

export default ImageDisplay;
