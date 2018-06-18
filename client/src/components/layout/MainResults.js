import React, { Component } from "react";
import { connect } from "react-redux";
//import Chart from "../components/chart";
//import {Sparklines,SparklinesLine} from 'react-sparklines';
//import {Sparklines} from 'react-sparklines';
//import GoogleMap from "../components/google_map";
import ThumbnailFeed from "../thumbnails/ThumbnailFeed";
import Home from "./Home";
import { MirrorDictionary } from "../../utils/mirrordictionary";

class MainResults extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log("incoming props");
  //   console.log(props);
  //   this.state = {
  //     draw: "what" //props.draw
  //   };
  //   console.log("searchbar results incoming state");
  //   console.log(this.state);
  // }
  // renderThumbs(thumb) {
  //   const name = thumb.name;
  //   const category = thumb.category;
  //   const img = thumb.image;

  //   return (
  //     <tr key={name}>
  //       <td>{name}</td>
  //       <td>{category}</td>
  //       <td>{img}</td>
  //     </tr>
  //   );
  // }

  // componentDidMount() {
  //   console.log("sbr cdm props");
  //   console.log(this.props);
  // }
  componentWillReceiveProps = nextProps => {
    if (nextProps.location.key !== this.props.location.key) {
      window.location.reload();
    }
  };

  render() {
    // console.log("searchbarresults props");
    // console.log(this.props);
    if (this.props.thumbnails.length === 0) {
      return (
        <div>
          <Home draw="true" />
        </div>
      );
    }

    // return (
    //   <table className="table table-hover">
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Category</th>
    //         <th>Image</th>
    //       </tr>
    //     </thead>
    //     <tbody>{this.props.thumbnails.map(this.renderThumbs)}</tbody>
    //   </table>
    // );
    let thumbContent;
    // console.log("props in search bar results");
    // console.log(this.props);
    let thumbnails = this.props.thumbnails;
    let cat = this.props.category;
    thumbContent = <ThumbnailFeed thumbnails={thumbnails} />;
    return (
      <div className="feed">
        <div className="container mirrorborder">
          <div
            className="xbg-light"
            style={{
              //textAlign: "center",
              // margin: "0px auto",
              // float: "right",
              color: "white",
              marginRight: "40px",
              textAlignLast: "right",
              fontSize: "10pt"
              //backgroundColor: "black",
              // width: "200px"
            }}
          >
            {MirrorDictionary[cat]}
          </div>
          <div style={{ clear: "left" }} />
          <div className="row">
            <div className="col-md-12 ximage-container">{thumbContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

// function mapStateToProps({ state, thumbnails }) {
//   console.log("searchbarresultsmanage state to props called");
//   console.log(thumbnails);
//   console.log(state);
//   console.log("end searchbarresults manage state to props called");
//   return { thumbnails };
// }

const mapStateToProps = state => {
  return {
    thumbnails: state.thumbnailreducer.thumbnails,
    category: state.thumbnailreducer.category
    //draw: state.draw
  };
};

export default connect(mapStateToProps)(MainResults);
