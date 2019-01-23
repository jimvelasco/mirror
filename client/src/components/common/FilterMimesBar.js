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
      cat0: "",
      cat1: "",
      cat2: "",
      cat1_list: [],
      cat2_list: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onCat0Select = this.onCat0Select.bind(this);
    this.onCat1Select = this.onCat1Select.bind(this);
    this.onCat2Select = this.onCat2Select.bind(this);
  }

  onChange(e) {
    this.setState({ searchterm: e.target.value });
  }
  onCat0Select(e, cat) {
    e.preventDefault();
    let cat1list = list_helper.getCat1(cat);
    this.setState({ cat0: cat, cat1_list: cat1list, cat2_list: [] });
    console.log(this.state);
  }

  onCat1Select(e, cat1) {
    e.preventDefault();
    let fobj = {};
    fobj = { cat0: this.state.cat0, cat1: cat1 };
    let catlist2 = list_helper.getCat2(cat1);
    if (catlist2.length > 0) {
      this.setState({ cat1: cat1, cat2_list: catlist2 });
    } else {
      console.log("we have no cat2 list so we run ", fobj);
      this.props.getMimes(fobj);
    }
    //console.log(typelist2);
  }

  onCat2Select(e, cat2) {
    e.preventDefault();
    let fobj = {};
    fobj = { cat0: this.state.cat0, cat1: this.state.cat1, cat2: cat2 };
    // console.log("select cat2", fobj);

    this.props.getMimes(fobj);
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
      let fobj = { cat0: "ALL" };
      this.props.getMimes(fobj);
    } else {
      this.props.filterMimes(st);
    }
  }

  //let link = `/api/business/find-business/${bizid}`;
  render() {
    const { errors } = this.state;
    const catlist = list_helper.getCat0();

    let catTemplate = catlist.map((v, i) => (
      <div key={i} style={{ marginLeft: "5px", float: "left" }}>
        <a
          href="#"
          className="xbtn xbtn-sm xbtn-secondary xbtn-block"
          onClick={e => {
            this.onCat0Select(e, v);
          }}
        >
          {v}
        </a>
      </div>
    ));

    let typelist = this.state.cat1_list;

    let typesTemplate = typelist.map((v, i) => (
      <a
        key={i}
        href="#"
        className="btn btn-sm btn-primary ml-2 mb-1 xbtn-block"
        onClick={e => {
          this.onCat1Select(e, v);
        }}
      >
        {v}
      </a>
    ));

    let typelist2 = this.state.cat2_list;

    let types2Template = typelist2.map((v, i) => (
      <a
        key={i}
        href="#"
        className="btn btn-sm btn-primary ml-2 mb-1 xbtn-block"
        onClick={e => {
          this.onCat2Select(e, v);
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
