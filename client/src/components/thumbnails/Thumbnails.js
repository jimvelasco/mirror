import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import PostForm from "./PostForm";
import ThumbnailFeed from "./ThumbnailFeed";
import Spinner from "../common/Spinner";
import { getAllThumbnails } from "../../actions/thumbnailActions";
import { getThumbnails } from "../../actions/thumbnailActions";

class Thumbnails extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = props;
    this.state = { category: params.category };
    //console.log(this.state);
  }
  componentDidMount() {
    // //console.log("thumbnails did mount " + this.state.category);
    // const {
    //   match: { params }
    // } = this.props;
    // //console.log("params category is " + params.category);
    // //this.props.getAllThumbnails();
    // // console.log("cdm props");
    // // console.log(this.props.match.params.value);
    // let cat = params.category;
    // console.log("component did mount the cat is " + cat);
    // console.log("component did mount state cat is " + this.state.category);
    // // if (this.state.category === "All") {
    // if (cat == null) {
    //   console.log("getting all thumbnails");
    //   this.props.getAllThumbnails();
    // } else {
    //   // this.setState({ category: cat });
    //   this.props.getThumbnails(cat);
    // }
    // this.setState({ category: cat });
    this.props.getThumbnails(this.state.category);
  }

  runQuery = category => {
    //let category = this.props.match.params.category; //"sports";
    //console.log("passed in category " + category);
    // axios
    //   .get(`/api/mythumbs/thumbs/${category}`)
    //   .then(response => {
    //     this.setState({
    //       thumbs: response.data,
    //       category: category
    //     });
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });
    // this.setState({
    //   thumbs: [],
    //   category: category
    // });
    //this.props.getThumbnails(category);
  };

  componentWillReceiveProps(nextProps) {
    // console.log("login component will receive props");
    // console.log("these are the next props");
    // console.log(nextProps);
    //console.log(nextProps.match.params.category);
    let cat = nextProps.match.params.category;
    let cat2 = this.props.match.params.category;
    // console.log(cat + " - " + cat2);
    // console.log("---------");
    // console.log(this.state.category);
    // if (cat == null) {
    //   this.props.getAllThumbnails();
    // } else {
    //   this.props.getThumbnails(cat);
    // }

    if (cat !== cat2) {
      // this.setState({ category: cat });
      //this.props.match.params.category = cat;
      //this.props.cat = cat;
      //console.log(this.props.match.params.category);
      this.props.getThumbnails(cat);
    }
  }

  render() {
    // console.log("here we are rendering");
    // console.log(this.state);
    // console.log(this.props);
    //console.log(this.props.match.path);

    // console.log(this.props.match.params.category);
    // console.log("**************");
    //console.log(this.state.category);
    // if (this.props.match.params.category === this.state.category) {
    // } else {
    //   this.runQuery(this.props.match.params.category);
    // }

    //this.setState({ category: this.props.match.params.category });
    //this.store.dispatch(getThumbnails("sports"));

    //console.log("category from state " + this.state.category);

    const { thumbnails, loading, category } = this.props.thumbnailreducer;
    //const cat = this.state.category;
    //console.log("category from reducer " + category);
    //let category = this.props.match.params.category;
    let thumbContent;

    if (thumbnails === null || loading) {
      //if (typeof thumbnails === "undefined") {
      //console.log("thumb is undefined");
      thumbContent = <Spinner />;
    } else {
      //console.log("thumb is NOT undefined");
      //console.log(thumbnails);
      //thumbContent = <Spinner />;
      thumbContent = <ThumbnailFeed thumbnails={thumbnails} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <h3 className="xbg-info" style={{ textAlign: "center" }}>
            {category}
          </h3>
          <div className="row">
            <div className="col-md-12 ximage-container">{thumbContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Thumbnails.propTypes = {
  getAllThumbnails: PropTypes.func.isRequired,
  thumbnailreducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  thumbnailreducer: state.thumbnailreducer,
  category: state.thumbnailreducer.category
});

export default connect(
  mapStateToProps,
  { getAllThumbnails, getThumbnails }
)(Thumbnails);
