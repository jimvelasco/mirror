import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import classnames from "classnames";
//import { Link } from "react-router-dom";

class ThumbnailItem extends Component {
  // onDeleteClick(id) {
  //   this.props.deletePost(id);
  // }

  // onLikeClick(id) {
  //   this.props.addLike(id);
  // }

  // onUnlikeClick(id) {
  //   this.props.removeLike(id);
  // }

  // findUserLike(likes) {
  //   const { auth } = this.props;
  //   if (likes.filter(like => like.user === auth.user.id).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { thumb } = this.props;
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
          {/* <p className="text-center">{thumb.url}</p>
            <br />
            <p className="text-center">{thumb._id}</p> */}
          {/* </div>
        </div> */}
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ThumbnailItem);
