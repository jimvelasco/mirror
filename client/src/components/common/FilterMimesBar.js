//import React from 'react';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import { performThumbnailSearch } from "../../actions/thumbnailActions";

import TextFieldGroup from "./TextFieldGroup";
import list_helper from "../app_data";
import { getMimes, filterMimes } from "../../actions/mimeActions";

class FilterMimesBar extends Component {
  constructor(props) {
    super(props);
    //console.log("passed in props", props);
    this.state = {
      searchterm: "",
      category: "",
      typelist: [],
      typelist2: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onCatSelect = this.onCatSelect.bind(this);
    this.onTypeSelect = this.onTypeSelect.bind(this);
  }

  onChange(e) {
    this.setState({ searchterm: e.target.value });
  }
  onCatSelect(e, cat) {
    e.preventDefault();
    let typelist = list_helper.getEmotions(cat);
    this.setState({ category: cat, typelist: typelist, typelist2: [] });
    console.log(cat);
  }

  onTypeSelect(e, type) {
    e.preventDefault();
    // let typelist = list_helper.getEmotions(cat);
    // this.setState({ typelist: typelist });
    //let link = "";
    if (type == "all") {
      // link = "/mainresults/category/" + this.state.category;
      let fobj = { type: "category", param: this.state.category };
      this.props.getMimes(fobj);
    }

    let typelist2 = list_helper.getEmotions2(type);
    if (typelist2) {
      this.setState({ typelist2: typelist2 });
    }

    //console.log(typelist2);
  }

  onSubmit(e) {
    e.preventDefault();
    //console.log("*" + this.state.searchterm + "*");
    if (this.state.searchterm === "") {
      this.setState({ errors: { searchterm: "Search Term Required" } });
    } else {
      this.setState({ errors: {} });

      //let fobj = { type: "wildcard", param: this.state.searchterm };
      //this.props.searchMimes(fobj);
      //let url = "/mainresults/wildcard/" + this.state.searchterm;

      //this.props.history.push(url);
      let st = this.state.searchterm;
      this.props.filterMimes(st);
    }
  }

  handleKeyUp(e) {
    e.preventDefault();
    console.log("on key up", this.state.searchterm);

    //let fobj = { type: "wildcard", param: this.state.searchterm };
    //this.props.searchMimes(fobj);
    //let url = "/mainresults/wildcard/" + this.state.searchterm;

    //this.props.history.push(url);
    let st = this.state.searchterm;
    if (st == "*") {
      let fobj = { type: "category", param: "all" };
      this.props.getMimes(fobj);
    } else {
      this.props.filterMimes(st);
    }
  }

  //let link = `/api/business/find-business/${bizid}`;
  render() {
    const { errors } = this.state;
    const catlist = list_helper.getCats();

    let catTemplate = catlist.map((v, i) => (
      <div key={i} style={{ marginLeft: "5px", float: "left" }}>
        <a
          href="#"
          className="xbtn xbtn-sm xbtn-secondary xbtn-block"
          onClick={e => {
            this.onCatSelect(e, v);
          }}
        >
          {v}
        </a>
      </div>
    ));

    let typelist = this.state.typelist;

    let typesTemplate = typelist.map((v, i) => (
      <a
        key={i}
        href="#"
        className="btn btn-sm btn-primary ml-2 mb-1 xbtn-block"
        onClick={e => {
          this.onTypeSelect(e, v);
        }}
      >
        {v}
      </a>
    ));

    let typelist2 = this.state.typelist2;

    let types2Template = typelist2.map((v, i) => (
      <a
        key={i}
        href="#"
        className="btn btn-sm btn-primary ml-2 mb-1 xbtn-block"
        onClick={e => {
          this.onTypeSelect(e, v);
        }}
      >
        {v}
      </a>
    ));

    return (
      <div className="bordertest">
        <div
          className="navbar navbar-dark navbackground"
          style={{
            // color: "black",
            // backgroundColor: "#e0e0e0",
            // marginBottom: "5px",
            // padding: "5px",
            marginTop: "0px"
          }}
        >
          {catTemplate}

          <div style={{ marginLeft: "5px", float: "left" }}>
            <form style={{ margin: "5px" }} noValidate onSubmit={this.onSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Search Term"
                  name="search"
                  value={this.state.searchterm}
                  onChange={this.onChange}
                  onKeyUp={this.handleKeyUp}
                  error={errors.searchterm}
                />
                <span style={{ fontSize: "8pt", marginLeft: "5px" }}>
                  {" "}
                  Keywords Search (* for all)
                </span>
              </div>
            </form>
          </div>
          {/* <div style={{ clear: "left" }}>123</div>
          <br /> */}

          {/* <div style={{ clear: "left" }} /> */}
        </div>
        <div className="xnavbar navbar-dark navbackground">{typesTemplate}</div>
        <div className="xnavbar navbar-dark navbackground">
          {types2Template}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     thumbnails: state.thumbnails
//   };
// };

// const mapStateToProps = state => {
//   return {
//     errors: state.errors
//   };
// };

// function mapStateToProps({ state,thumbnails }) {
//   console.log("searchbar manage state to props called");
//   console.log(thumbnails);
//   console.log("searchbar end manage state to props called");
//   return { state.thumbnails };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ performThumbnailSearch }, dispatch);
// }

// const mapDispatchToProps = (dispatch, ownProps) =>
//   bindActionCreators(dispatch(performThumbSearch, dispatch));

// call loginUser in actions file
// export default connect(
//   mapStateToProps,
//   { performSearch }
// )(SearchBar);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchBar);

//export default withRouter(Advertisements);
const mapStateToProps = state => ({
  // auth: state.auth,
  errors: state.errors,
  // advertise: state.advertise,
  // statusMsg: state.statusMsg
  mimereducer: state.mimereducer
});

export default connect(
  mapStateToProps,
  {
    getMimes,
    filterMimes
  }
)(withRouter(FilterMimesBar));
