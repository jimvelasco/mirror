import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";

import { uploadMimeJson } from "../../actions/mimeActions";

//import { registerAdvertiser } from "../../actions/authActions";
//import { modifyAdvertiser } from "../../actions/authActions";

//import axios from "axios";
//import classnames from "classnames";

import TextFieldGroup from "../common/TextFieldGroup";

class MimeJsonUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "JJV",
      name: "",
      errors: {},
      statusReducer: {},
      file: null,
      fname: null
    };

    this.onChange = this.onChange.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/dashboard");
    // }
  }

  // if we have errors this will run
  componentWillReceiveProps(nextProps) {
    //console.log("register componentWillReceiveProps");
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      // setState triggers a render
    }
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    // console.log(name + " " + value);

    // this.setState({ [e.target.name]: e.target.value });
    this.setState({ [name]: value });
  }

  onFileInputChange(e) {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      //let fileurlobj = URL.createObjectURL(e.target.files[0]);
      this.setState({
        file: e.target.files[0],
        //fileurl: fileurlobj,
        statusmsg: ""
      });
    }
  }

  // const anAdvertiser = {
  //   id: this.state.id,
  //   name: this.state.name,
  //   email: this.state.email,
  //   password: this.state.password,
  //   password2: this.state.password2,
  //   company: this.state.company,
  //   companyId: this.state.companyId,
  //   role: this.state.role,
  //   status: this.state.status,
  //   changePassword: this.state.changePassword
  // };

  // const id = this.props.match.params.id;
  // if (id) {
  //   this.props.modifyAdvertiser(anAdvertiser, this.props.history);
  // } else {
  //   this.props.registerAdvertiser(formdata, this.props.history);
  // }

  // };

  onSubmit = e => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("file", this.state.file);
    formdata.append("id", this.state.id);
    formdata.append("name", this.state.name);

    // for (var key of formdata.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }

    // const id = this.props.match.params.id;
    // if (id) {
    //   this.props.modifyAdvertiser(formdata, this.props.history);
    // } else {
    //   this.props.uploadMimeJson(formdata, this.props.history);
    // }

    this.props.uploadMimeJson(formdata);
  }; // end submit

  render() {
    const { errors } = this.state;
    // const perrors = this.props.errors;
    const { statusReducer } = this.props;
    // same as const errors = this.state.errors
    // console.log("errors are ", errors);
    //console.log("statusReducer are ", statusReducer);

    // this was used to show user from props
    // const { user } = this.props.auth; // const user = this.props.auth.user
    // this shows user {user ? user.name : null}

    return (
      <div className="mime_json_upload">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto shadow-lg p-4">
              <h3 className="text-center">Upload Mime Json File</h3>
              {errors.generic ? (
                <p className=" text-center">{errors.generic}</p>
              ) : null}
              {statusReducer.message ? (
                <p className="display-32 text-center">
                  {statusReducer.message}
                </p>
              ) : null}

              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        type="file"
                        name="file"
                        onChange={this.onFileInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                </div> */}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              {/* {perrors && (
                <div className="error-display">{perrors.message}</div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// this is good practice because it will help debugging
// it is not checked when in production mode.
MimeJsonUpload.propTypes = {
  // registerAdvertiser: PropTypes.func.isRequired,
  // modifyAdvertiser: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// map errors to this component
// then we can use this.props.auth.user etc
// since we mapped error, we can use componentWillReceiveProps method
const mapStateToProps = state => ({
  // auth: state.auth,
  errors: state.errors,
  statusReducer: state.statusReducer
  // advertise: state.advertise
});
// the state.auth above comes from rootReducer in index.js in reducers.

export default connect(
  mapStateToProps,
  { uploadMimeJson }
)(withRouter(MimeJsonUpload));
// wrap the Register with withRouter so the authAction can use history to redirect
