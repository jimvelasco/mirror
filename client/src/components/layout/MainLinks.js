import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//import { connect } from "react-redux";

//import { performThumbCategorySearch } from "../../actions/thumbnailActions";
//import { performThumbEmotionSearch } from "../../actions/thumbnailActions";
//import { performThumbnailSearch } from "../../actions/thumbnailActions";

class MainLinks extends Component {
  // onMainClick(e) {
  //   e.preventDefault();
  //   // console.log(e.target);
  //   // console.log(e.target.name);
  //   let sval = e.target.name;
  //   //sval = "wow";
  //   // console.log("main links " + sval);
  //   // console.log(this.props);
  //   // this.props.performThumbCategorySearch(sval);
  //   this.props.performThumbnailSearch("category", sval);
  // }

  onEmotionChange(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name);
    let sval = e.target.value;
    //sval = "wow";
    // console.log("select click " + sval);
    // console.log(this.props);
    //this.props.performThumbEmotionSearch(sval);
    //this.props.performThumbnailSearch("emotion", sval);
    let url = "/mainresults/emotion/" + sval;

    this.props.history.push(url);
  }

  render() {
    return (
      // <nav
      //   className="navbar navbar-expand-sm xnavbar-dark xbg-dark xmb-4"
      //   style={{ marginTop: "-20px" }}
      // >
      <div className="mainlinkswrapper">
        <nav className="navbar navbar-expand-sm xnavbar-dark xbg-dark xmb-4">
          <div
            className="container"
            style={{ borderWidth: "3px", borderColor: "white" }}
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/mainresults/category/wow">
                  Trending...
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mainresults/category/cool">
                  Most Popular...
                </Link>
              </li>
              {/* <li className="nav-item">
                <div
                  style={{
                    color: "#007bff",
                    display: "inline"
                    //fontSize: "10pt"
                  }}
                >
                  Emotion...
                </div>
              </li> */}
              {/* <li className="nav-item">
                <select onChange={this.onEmotionChange.bind(this)}>
                  <option value="happy">Happy</option>
                  <option value="serious">Serious</option>
                </select>
              </li> */}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Emotion
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a
                    className="dropdown-item"
                    href="/mainresults/category/cool"
                  >
                    Happy
                  </a>
                  <a className="dropdown-item" href="/mainresults/category/wow">
                    Serious
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   //{ performThumbCategorySearch, performThumbEmotionSearch }
//   { performThumbnailSearch }
// )(MainLinks);

export default withRouter(MainLinks);
