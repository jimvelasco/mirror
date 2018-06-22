import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import ThumbnailDetail from "./ThumbnailDetail";
import { performIndividualSearch } from "../../actions/thumbnailActions";

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

    this.onThumbClick = this.onThumbClick.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onThumbClick = val => e => {
    e.preventDefault();
    // console.log("clicked thumbitem id " + val);

    //this.setState({ clickedthumbid: val });
    this.props.performIndividualSearch(val);
    // console.log("props after performIndividual");
    // console.log(this.props);
  };

  render() {
    const { thumb } = this.props;
    const { id } = this.props;
    const { onethumbnail } = this.props;
    const { clickedthumbid } = this.props;
    //console.log("cti " + clickedthumbid);
    // console.log("in item render props are");
    // console.log(this.props);
    // console.log("this is the state thumbid");
    // console.log(this.state.thumbid);
    // let thumbid = this.state.;
    // console.log("thumbid in state " + thumbid);
    //console.log(id);
    //let thumbid = this.state.thumbid;

    // let divimg = renderImage(thumbnail);
    // let tid = this.state.clickedthumbid;
    // let onethumbnail = this.state.onethumbnail;
    // console.log("item render one thumb");
    // console.log(onethumbnail);
    let imgstr =
      "https://s3-us-west-2.amazonaws.com/mirror-thumbnails/" + thumb.image;
    return (
      <div>
        <div className="image-float">
          <img
            className="rounded-circle xd-none xd-md-block"
            src={imgstr}
            alt=""
            style={{
              width: "200px",
              height: "200px",
              border: "3px solid white"
            }}
            // onClick={this.onThumbClick.bind(this, id)}
            onClick={this.onThumbClick(id)}
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
            {thumb.name}
          </div>
          {clickedthumbid === thumb._id ? (
            <ThumbnailDetail onethumbnail={onethumbnail} />
          ) : (
            // <ThumbnailDetail clickedthumbid={tid} />
            <div />
          )}
        </div>
      </div>
    );
  }
}

ThumbnailItem.defaultProps = {
  showActions: true
};

ThumbnailItem.propTypes = {
  // deletePost: PropTypes.func.isRequired,
  // addLike: PropTypes.func.isRequired,
  // removeLike: PropTypes.func.isRequired,
  thumb: PropTypes.object.isRequired
  // auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth,
//   clickedthumbid: state.clickedthumbid
// });

const mapStateToProps = state => {
  return {
    thumbnails: state.thumbnailreducer.thumbnails,
    onethumbnail: state.thumbnailreducer.onethumbnail,
    clickedthumbid: state.thumbnailreducer.clickedthumbid,
    draw: "what"
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    // { performThumbCategorySearch, performThumbEmotionSearch },
    { performIndividualSearch },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThumbnailItem);

//export default connect(mapStateToProps)(ThumbnailItem);
//export default ThumbnailItem;
