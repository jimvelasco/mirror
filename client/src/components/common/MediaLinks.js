import React from "react";
import { Link } from "react-router-dom";

import facebook from "../../img/icons/facebook-48.png";
import facebook_like from "../../img/icons/facebook-like-48.png";
import twitter from "../../img/icons/twitter-48.png";
import instagram from "../../img/icons/instagram-48.png";
import share from "../../img/icons/share-48.png";

const MediaLinks = ({ close, link, onclick }) => {
  //let link =  "<a href="#">close</a>";
  return (
    <div className="xcontainer linkswrapper">
      <Link to="/" className="media_icon ml-4">
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
      {onclick ? (
        <a
          style={{ float: "right", paddingRight: "10px", paddingTop: "5px" }}
          href="#"
          onClick={onclick}
        >
          X
        </a>
      ) : null}
    </div>
  );
};

// is-invalid depends if error.name exists.  see validation code

export default MediaLinks;
