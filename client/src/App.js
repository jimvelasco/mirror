import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// we need these so app remembers if person is logged on
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
//import Landing from "./components/layout/Landing";
//import Home from "./components/layout/Home";
import Dashboard from "./components/dashboard/Dashboard";
//import Modal from "./components/dashboard/Modal";
import MagicMirror from "./components/layout/MagicMirror";

//import MainLinks from "./components/layout/MainLinks";
import MainResults from "./components/layout/MainResults";

import VideoDemo from "./components/layout/VideoDemo";

// import ModalDialog from "./components/shuttles/ModalDialog";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import MimeRecords from "./components/layout/MimeRecords";
import MimeJsonUpload from "./components/layout/MimeJsonUpload";

import About from "./components/static/about";
import Contact from "./components/static/contact";

import ApiTest from "./components/apitest/ApiTest";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  // we can call anything in store with dispatch
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    //store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}
// we need to wrap privateroutes in switch because pr has a redirect in it.

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div className="landing">
              <div className="xdark-overlay xlanding-inner xtext-light">
                <div className="App">
                  <Navbar />

                  <div className="main_container">
                    <Route exact path="/apitest" component={ApiTest} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />

                    {/* <Route exact path="/" component={MainResults} /> */}

                    {/* <Route
                      exact
                      path="/mainresults/:which/:term"
                      component={MainResults}
                    /> */}
                    {/* <Route
                      exact
                      path="/searchresults/:term"
                      component={MainResults}
                    /> */}
                    <Route exact path="/magicmirror" component={MagicMirror} />
                    <Route exact path="/videodemo" component={VideoDemo} />
                    {/* <Route exact path="/show_mimes" component={MimeRecords} /> */}
                    <Switch>
                      <PrivateRoute
                        exact
                        path="/mainresults/:which/:term"
                        component={MainResults}
                      />
                      <PrivateRoute exact path="/" component={MainResults} />
                      <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                      />
                      <PrivateRoute
                        exact
                        path="/show_mimes"
                        component={MimeRecords}
                      />
                      <PrivateRoute
                        exact
                        path="/upload_json"
                        component={MimeJsonUpload}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
