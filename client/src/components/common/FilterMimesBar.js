//import React from 'react';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import { performThumbnailSearch } from "../../actions/thumbnailActions";

import TextFieldGroup from "./TextFieldGroup";
import list_helper from "../app_data";
import {
  getMimes,
  filterMimes,
  getCategoryMimes,
  getTrendingMimesAll
} from "../../actions/mimeActions";

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
    this.onTrendingSelect = this.onTrendingSelect.bind(this);
  }

  onChange(e) {
    this.setState({ searchterm: e.target.value });
  }
  onCat0Select(e, cat) {
    e.preventDefault();
    let cat1list = list_helper.getCat1(cat);
    this.setState({ cat0: cat, cat1_list: cat1list, cat2_list: [] });
    let fobj = { cat0: cat, cat1: "all" };
    if (cat == "Trending") {
      this.props.getTrendingMimesAll();
    } else {
      this.props.getMimes(fobj);
    }
    // console.log(this.state);
  }

  onCat1Select(e, cat1) {
    e.preventDefault();
    let fobj = {};
    fobj = { cat0: this.state.cat0, cat1: cat1 };
    // let catlist2 = list_helper.getCat2(cat1);
    // if (catlist2.length > 0) {
    //   this.setState({ cat1: cat1, cat2_list: catlist2 });
    // } else {
    //console.log("we have no cat2 list so we run ", fobj);
    this.props.getCategoryMimes(fobj);
    // }
    //console.log(typelist2);
  }

  onCat2Select(e, cat2) {
    e.preventDefault();
    let fobj = {};
    fobj = { cat0: this.state.cat0, cat1: this.state.cat1, cat2: cat2 };
    // console.log("select cat2", fobj);

    this.props.getMimes(fobj);
  }

  onTrendingSelect(e, v) {
    e.preventDefault();
    let fobj = {};
    //fobj = { cat0: this.state.cat0, cat1: this.state.cat1, cat2: cat2 };
    // console.log("select cat2", fobj);

    this.props.getTrendingMimesAll();
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
    //console.log("on key up", this.state.searchterm);

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
    const cat0list = list_helper.getCat0();
    console.log("cat0list", cat0list);

    const mimes = this.props.mimereducer.mimes;
    let curcats = this.props.mimereducer.selectedCategories;
    let selcat0 = "";
    let selcat1 = "";
    if (curcats.length == 1) {
      selcat0 = curcats[0];
    }
    if (curcats.length == 2) {
      selcat0 = curcats[0];
      selcat1 = curcats[1];
    }

    let mimecat0list = [];
    let mimecat1list = [];
    let mimecat2list = [];
    mimes.forEach(function(m) {
      let tc0 = m.cat0;
      if (mimecat0list.indexOf(tc0) < 0) {
        mimecat0list.push(tc0);
      }
      let tc1 = m.cat1;

      if (tc1.length > 0 && mimecat1list.indexOf(tc1) < 0) {
        mimecat1list.push(tc1);
      }
      let tc2 = m.cat2;
      if (tc2.length > 0 && mimecat2list.indexOf(tc2) < 0) {
        mimecat2list.push(tc2);
      }
    });
    // console.log(mimecat0list);
    // console.log(mimecat1list);
    // console.log(mimecat2list);
    console.log("selcat0", selcat0);
    let cat0Template = cat0list.map(
      (v, i) => (
        // selcat0 == "" || selcat0 !== v ? (
        // if ({v} == selcat0) {(cls = "selected")}
        // v == selcat0 || selcat0 == "" ? (
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
      )
      // ) : null
      // <div key={i} style={{ marginLeft: "5px", float: "left" }}>
      //   <a
      //     href="#"
      //     className="btn btn-sm btn-secondary btn-block"
      //     onClick={e => {
      //       this.onCat0Select(e, v);
      //     }}
      //   >
      //     {v}
      //   </a>
      // </div>
    );

    let cat1list = this.state.cat1_list;

    let bclass = "btn btn-sm ml-2 mb-2 btn-primary";
    let cat1Template = cat1list.map(
      (v, i) =>
        mimecat1list.indexOf(v) > -1 || v == "All" ? (
          <a
            key={i}
            href="#"
            className={bclass}
            onClick={e => {
              this.onCat1Select(e, v);
            }}
          >
            {v}
          </a>
        ) : null
      // <span className="ml-2" style={{ color: "white" }}>
      //   {v}
      // </span>
    );

    // let cat2list = this.state.cat2_list;
    // let cat2Template = cat2list.map((v, i) => (
    //   <a
    //     key={i}
    //     href="#"
    //     className="btn btn-sm btn-primary ml-2 mb-1 xbtn-block"
    //     onClick={e => {
    //       this.onCat2Select(e, v);
    //     }}
    //   >
    //     {v}
    //   </a>
    // ));

    return (
      <div className="xbordertest">
        <div
          className="navbar navbar-dark xnavbackground"
          style={{
            marginTop: "0px"
          }}
        >
          {/* <div style={{ marginLeft: "5px", float: "left" }}>
            <a
              href="#"
              className="xbtn xbtn-sm xbtn-secondary xbtn-block"
              onClick={e => {
                this.onTrendingSelect(e, "Trending");
              }}
            >
              Trending
            </a>
          </div> */}

          {cat0Template}

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
                <span
                  style={{ fontSize: "9pt", marginLeft: "5px", color: "white" }}
                >
                  {" "}
                  (* for all)
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="xnavbar navbar-dark xnavbackground">{cat1Template}</div>
        {/* <div className="xnavbar navbar-dark navbackground">
          {types2Template}
        </div> */}
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
    filterMimes,
    getCategoryMimes,
    getTrendingMimesAll
  }
)(withRouter(FilterMimesBar));
