import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const ApiAdImageObj = ({ which, img }) => {
  //console.log("buf", buf);
  // let itype = "";
  // if (which == "business") {
  //   itype = "logo";
  // }
  // if (which == "advertisement") {
  //   itype = "ad";
  // }

  //let timg = imgary[0]; //null;

  // imgary.forEach(function(img) {
  //   if (img.type == itype) {
  //     timg = img;
  //   }
  // });

  let buffer = null;
  let binary = "";
  let binarybuf = null;
  let bytes = [];
  let imagestr = "";
  //buffer = obj.imageBuffer.data;
  buffer = img.imageBuffer.data;
  if (buffer) {
    // let buffer = obj.imageBuffer;
    bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    binarybuf = window.btoa(binary);
    imagestr = "data:image/jpeg;base64," + binarybuf;
  } else {
    buffer = img.imageBuffer;
    imagestr = "data:image/jpeg;base64," + buffer;
  }
  return (
    <div>
      <img
        style={{ width: img.width, height: img.height }}
        src={imagestr}
        className="App-image"
        alt="logo"
      />
      {/* <div className="smallfont">{timg.imageFilename}</div> */}
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code

// TextFieldGroup.propTypes = {
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   info: PropTypes.string,
//   error: PropTypes.string,
//   type: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   disabled: PropTypes.string
// };

// TextFieldGroup.defaultProps = {
//   type: "text"
// };

export default ApiAdImageObj;
