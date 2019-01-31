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
//import logo from "../../img/Image36.JPG";
import logo from "../../img/MimeLogo.jpeg";
import facebook from "../../img/icons/facebook-48.png";
import facebook_like from "../../img/icons/facebook-like-48.png";
import twitter from "../../img/icons/twitter-48.png";
import instagram from "../../img/icons/instagram-48.png";
import share from "../../img/icons/share-48.png";

// 426 × 224  .5258

// 130 x 68

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
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
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
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
        </li>
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
        <nav className="navbar  navbar-expand-sm navbar-dark xnavbackground xmb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img
                src={logo}
                style={{ width: "130px", height: "68px" }}
                alt=""
              />
            </Link>
            <Link to="/" className="media_icon" style={{ marginLeft: "50px" }}>
              <img src={facebook} alt="" />
            </Link>
            <Link to="/" className="media_icon">
              <img src={facebook_like} alt="" />
            </Link>
            <Link to="/" className="media_icon">
              <img src={twitter} alt="" />
            </Link>
            <Link to="/" className="media_icon">
              <img src={instagram} alt="" />
            </Link>
            <Link to="/" className="media_icon">
              <img src={share} alt="" />
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
