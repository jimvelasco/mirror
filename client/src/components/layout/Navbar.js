import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SearchBar from "./SearchBar";

//import { performThumbCategorySearch } from "../../actions/thumbnailActions";
//import { performThumbWildcardSearch } from "../../actions/thumbnailActions";
import { performThumbnailSearch } from "../../actions/thumbnailActions";

//import logo from "../../img/image1.jpeg";
import logo from "../../img/Image36.JPG";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
    window.location.href = "/";
    // this.props.history.push("/");
  }

  onNavClick(e) {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.name);
    let sval = e.target.name;
    //console.log(this.props);
    this.props.performThumbnailSearch("category", sval);
  }
  render() {
    //const { isAuthenticated, user } = this.props.auth; // shorthand
    const { isAuthenticated } = this.props.auth; // shorthand

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {/* <li className="nav-item">
        <Link className="nav-link" to="/feed">
          Post Feed
        </Link>
      </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <div className="bordertest">
        <nav className="navbar  navbar-expand-sm navbar-dark navbackground xmb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img
                src={logo}
                style={{ width: "100px", height: "40px" }}
                alt=""
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                {/*<li className="nav-item">
                  <Link className="nav-link" to="/mainresults/category/all">
                    Home
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" to="/mainresults/category/all">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mainresults/category/all">
                    Contact
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/mainresults/category/wow">
                    Emotions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mainresults/category/cool">
                    Reacctions
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mainresults/category/amazing">
                    Status
                  </Link>
                </li>{" "} */}
                {/* 
                <li className="nav-item">
                  <Link className="nav-link" to="/mainresults/emotion/serious">
                    Movies
                  </Link>
                </li>{" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/mainresults/emotion/happy">
                    TV
                  </Link>
                </li> */}
                {/* <li className="nav-item " style={{ marginTop: "10px" }}>
                  <SearchBar />
                </li>
                <li className="nav-item" style={{ marginLeft: "50px" }}>
                  <Link className="nav-link" to="/videodemo">
                    video
                  </Link>
                </li> */}
              </ul>
              {isAuthenticated ? authLinks : guestLinks}{" "}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, performThumbnailSearch }
)(Navbar);
