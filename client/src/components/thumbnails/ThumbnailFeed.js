import React, { Component } from "react";
import PropTypes from "prop-types";
import ThumbnailItem from "./ThumbnailItem";

class ThumbnailFeed extends Component {
  render() {
    // console.log("thumbnail feed");
    // console.log(this.props);
    const { thumbnails } = this.props;

    return thumbnails.map(thumb => (
      <ThumbnailItem key={thumb._id} thumb={thumb} />
    ));
  }
}

ThumbnailFeed.propTypes = {
  thumbnails: PropTypes.array.isRequired
};

export default ThumbnailFeed;
