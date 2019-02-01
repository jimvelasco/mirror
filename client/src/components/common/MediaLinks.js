import React from "react";
import { Link } from "react-router-dom";

import facebook from "../../img/icons/facebook-48.png";
import facebook_like from "../../img/icons/facebook-like-48.png";
import twitter from "../../img/icons/twitter-48.png";
import instagram from "../../img/icons/instagram-48.png";
import share from "../../img/icons/share-48.png";

const MediaLinks = ({ close, link }) => {
  return (
    <div className="xcontainer linkswrapper">
      <Link to="/" className="media_icon" style={{ marginLeft: "50px" }}>
        <img src={facebook} alt="" />
      </Link>
      <Link to="/" className="media_icon">
        <img src={facebook_like} alt="" />
      </Link>
      <Link to="/" className="media_icon">
        <img src={twitter} alt="" />
      </Link>
      <Link to="/" className="media_icon">
        <img src={instagram} alt="" />
      </Link>
      <Link to="/" className="media_icon">
        <img src={share} alt="" />
      </Link>
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code

export default MediaLinks;
