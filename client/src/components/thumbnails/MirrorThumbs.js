import React, { Component } from "react";
import axios from "axios";
import ThumbnailFeed from "./ThumbnailFeed";
import Spinner from "../common/Spinner";

class MyThumbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbs: [],
      category: null
    };
  }

  //componentDidMount() {
  // let category = this.props.match.params.category; //"sports";
  // console.log("passed in category " + category);
  // axios
  //   .get(`/api/mythumbs/thumbs/${category}`)
  //   .then(response => {
  //     this.setState({
  //       thumbs: response.data
  //     });
  //   })
  //   .catch(error => {
  //     console.log("error", error);
  //   });
  //this.runQuery();
  //}
  // componentWillUpdate() {
  //   console.log("component will update");
  //   console.log(this.props.match.params.category);
  //   console.log("");
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log("component will componentWillReceiveProps");

  //   console.log(nextProps);
  //   console.log("");
  // }

  runQuery = () => {
    let category = this.props.match.params.category; //"sports";
    //console.log("passed in category " + category);
    axios
      .get(`/api/mythumbs/thumbs/${category}`)
      .then(response => {
        this.setState({
          thumbs: response.data,
          category: category
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  render() {
    //console.log("we are rendering");
    let category = this.props.match.params.category;

    if (category === this.state.category) {
      //console.log("parms are equal");
    } else {
      //console.log("parms are not equal");
      this.runQuery();
    }

    let thumbContent;
    let thumbs = this.state.thumbs;
    if (this.state.thumbs.length === 0) {
      //if (typeof thumbnails === "undefined") {
      //console.log("thumb is undefined");
      thumbContent = <Spinner />;
    } else {
      //console.log("thumb is NOT undefined");
      //console.log(thumbnails);
      //thumbContent = <Spinner />;
      thumbContent = <ThumbnailFeed thumbnails={thumbs} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12 image-container">{thumbContent}</div>
          </div>
        </div>
      </div>
    );

    // return (
    //   <div className="container">
    //     <div className="jumbotron">
    //       <h1>Thumbs Page</h1>
    //     </div>
    //     <div className="well">
    //       {this.state.thumbs.map(thumb => {
    //         return (
    //           <div>
    //             <p>{thumb.url}</p>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // );
  }
}

export default MyThumbs;
