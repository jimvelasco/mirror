import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import ThumbnailDetail from "./ThumbnailDetail";
import { performIndividualSearch } from "../../actions/thumbnailActions";

import { UrlConfig } from "../../config/url_config";

import share from "../../img/icons/share-48.png";

//import classnames from "classnames";
//import { Link } from "react-router-dom";
//import axios from "axios";

// const renderImage = thumbnail => {
//   let imgstr =
//     "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/" + thumbnail.image;
//   console.log(imgstr);
//   return (
//     <div>
//       <img
//         className="rounded-circle xd-none xd-md-block"
//         src={imgstr}
//         alt=""
//         style={{
//           width: "200px",
//           height: "200px",
//           border: "3px solid white"
//         }}
//       />
//     </div>
//   );
// };

class ThumbnailItem extends Component {
  constructor() {
    super();
    this.state = {
      clickedthumbid: "",
      onethumbnail: []
    };

    //this.onThumbClick = this.onThumbClick.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onThumbClick = (e, val) => {
    e.preventDefault();
    // console.log("clicked thumbitem id " + e);

    //this.setState({ clickedthumbid: val });
    this.props.onThumbClick(e, val);

    // console.log("props after performIndividual");
    // console.log(this.props);
  };

  onMouseOver = (e, mime) => {
    e.preventDefault();
    //console.log(val._id);
    let divid = mime._id;
    let lyrics = mime.lyrics;
    //let str = '<img className="media_icon" src={share} alt="" />' + lyrics;
    let modiv = document.getElementById(divid);
    modiv.style.visibility = "visible";
    //modiv.innerHTML = lyrics;
  };
  onMouseOut = (e, val) => {
    e.preventDefault();
    //console.log(val._id);
    let divid = val._id;
    let modiv = document.getElementById(divid);
    modiv.style.visibility = "hidden";
    //modiv.innerHTML = "";
  };

  render() {
    const { thumb } = this.props;
    // const { id } = this.props;
    // const { onethumbnail } = this.props;
    // const { clickedthumbid } = this.props;
    // console.log(onethumbnail);

    // let imgstr =
    //   "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/" + thumb.image;

    let url = UrlConfig.url_image;
    // let imgstr = "https://mimesthumbnails.s3.amazonaws.com/" + thumb.image;
    let imgstr = url + thumb.image;
    let mime = thumb.mime;
    let width = thumb.width / 2; // + "px";
    let height = thumb.height / 2; // + "px";
    let widthpx = width + "px";
    let heightpx = height + "px";
    //console.log("width height", widthpx, heightpx);
    // <div
    //   className="image-float"
    //   style={{
    //     width: { widthpx },
    //     height: { heightpx },
    //     border: "1px solid white"
    //   }}
    // >
    // </div>
    let size = "contain";

    let important = {
      backgroundImage: `url("${imgstr}")`,
      backgroundSize: size,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat"
    };

    // height: height || 180,
    //   width: width || 320,

    let defaults = {
      // height: height || 120,
      // width: width || 220,
      height: height || 180,
      width: width || 320,
      backgroundColor: "gray",
      float: "left",
      margin: "5px"
    };

    let hodiv = {
      // height: height || 120,
      // width: width || 220,

      backgroundColor: "black",
      position: "relative",
      //backgroundColor: "#000",
      //maxWidth: width,
      padding: "3px",
      fontSize: "10pt",
      color: "#fff",
      visibility: "hidden"
    };

    // return (
    //   <div className="image-float">
    //     <img
    //       className="xrounded-circle xd-none d-md-block img-thumbnail rounded ximage-float img-fluid"
    //       src={imgstr}
    //       alt=""
    //       onClick={e => {
    //         this.onThumbClick(e, thumb);
    //       }}
    //     />
    //   </div>
    // );

    return (
      <div
        className="image-float rounded"
        style={{ ...defaults, ...important }}
        onClick={e => {
          this.onThumbClick(e, thumb);
        }}
        onMouseOver={e => {
          this.onMouseOver(e, thumb);
        }}
        onMouseOut={e => {
          this.onMouseOut(e, thumb);
        }}
      >
        <div
          id={thumb._id}
          style={{
            ...hodiv
          }}
        >
          <img className="media_icon" src={share} alt="" />
          {thumb.lyrics}
        </div>
      </div>
    );
  }
}

// ThumbnailItem.defaultProps = {
//   showActions: true
// };

// ThumbnailItem.propTypes = {
//   // deletePost: PropTypes.func.isRequired,
//   // addLike: PropTypes.func.isRequired,
//   // removeLike: PropTypes.func.isRequired,
//   thumb: PropTypes.object.isRequired
//   // auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   clickedthumbid: state.clickedthumbid
// });

// const mapStateToProps = state => {
//   return {
//     // thumbnails: state.thumbnailreducer.thumbnails,
//     onethumbnail: state.thumbnailreducer.onethumbnail,
//     clickedthumbid: state.thumbnailreducer.clickedthumbid,
//     draw: "what"
//   };
// };

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     // { performThumbCategorySearch, performThumbEmotionSearch },
//     { performIndividualSearch },
//     dispatch
//   );
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ThumbnailItem);

//export default connect(mapStateToProps)(ThumbnailItem);
export default ThumbnailItem;
