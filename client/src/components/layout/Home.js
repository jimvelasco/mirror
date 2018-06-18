import React, { Component } from "react";
import { connect } from "react-redux";
//import SearchBarResults from "./SearchBarResults";
import { bindActionCreators } from "redux";

// import { Link } from "react-router-dom";
// import { PropTypes } from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
// import Search from "../thumbnails/Search";
//import SearchBarResults from "./SearchBarResults";
import { performThumbCategorySearch } from "../../actions/thumbnailActions";

//import Thumbs from "./Thumbs";

class Home extends Component {
  constructor(props) {
    super(props);
    // console.log("home incoming props");
    // console.log(props);
    this.state = {
      draw: props.draw //"true"
    };
    // console.log("home incoming state");
    // console.log(this.state);
  }
  // we had this in there to direct user to dashboard if they were logged in
  // Now we hancle this by showing logon or logout button instead of redirecting
  componentDidMount() {
    // this will start the screen with all of the thumbs
    this.props.performThumbCategorySearch("all");
  }

  render() {
    if (this.state.draw === "true") {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4" style={{ marginTop: "0px" }}>
                Mirror
              </h1>
              <p className="lead" style={{ marginTop: "5px" }}>
                Animate with Audio!
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

// const mapStateToProps = state => {
//   return {
//     draw: state.draw
//   };
// };
// export default connect(mapStateToProps)(Home);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ performThumbCategorySearch }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Home);

//export default Home;
