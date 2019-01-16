//import React from 'react';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// import { performThumbnailSearch } from "../../actions/thumbnailActions";

import TextFieldGroup from "./TextFieldGroup";

class FilterMimes extends Component {
  constructor(props) {
    super(props);
    //console.log("passed in props", props);
    this.state = {
      searchterm: "",
      selectValue: "",
      selectStatusValue: "*",
      thumbnails: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onSelectStatusChange = this.onSelectStatusChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ searchterm: e.target.value });
  }
  onSelectChange(e) {
    let cterm = e.target.value;
    this.setState({ selectValue: cterm });
    let fobj = { type: "category", param: cterm };
    this.props.passedFunction(fobj);
  }
  onSelectStatusChange(e) {
    let cterm = e.target.value;
    this.setState({ selectStatusValue: cterm });
    let fobj = { type: "status", param: cterm };
    this.props.passedFunction(fobj);
  }
  onSubmit(e) {
    e.preventDefault();
    //console.log("*" + t his.state.searchterm + "*");
    if (this.state.searchterm === "") {
      this.setState({ errors: { searchterm: "Search Term Required" } });
    } else {
      this.setState({ errors: {} });
      // const searchData = {
      //   searchterm: this.state.searchterm
      // };
      // console.log(searchData);
      // console.log("search term is " + searchData.searchterm);
      // this.props.performThumbWildcardSearch(searchData.searchterm);
      // his.props.performThumbnailSearch("wildcard", searchData.searchterm);
      //dispatch(push("/mainresults/wildcard/" + this.state.searchterm));
      //let url = "/mainresults/wildcard/" + this.state.searchterm;

      //this.props.history.push(url);
      let fobj = { type: "wildcard", param: this.state.searchterm };

      this.props.passedFunction(fobj);
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <div
        style={{
          color: "black",
          backgroundColor: "#e0e0e0",
          marginBottom: "10px"
        }}
      >
        <form noValidate onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <div>Wildcard Name Search (* for all)</div>
                <input
                  type="text"
                  placeholder="Search Term"
                  name="search"
                  value={this.state.searchterm}
                  onChange={this.onChange}
                  error={errors.searchterm}
                />
                {/* <input type="submit" className="xbtn xbtn-info xbtn-block xmt-4" /> */}
                {/* <i id="filtersubmit" className="fa fa-search fa-1x " /> */}
              </div>
            </div>
            {/* <div className="col-md-4">
              <div>Category</div>
              <select
                name="category"
                value={this.state.selectValue}
                onChange={this.onSelectChange}
              >
                
                <option value="all">All</option>
                <option value="wow">Wow</option>
                <option value="cool">Cool</option>
                <option value="amazing">Amazing</option>
              </select>
            </div> */}
            <div className="col-md-4">
              <div>Status</div>
              <select
                name="status"
                value={this.state.selectStatusValue}
                onChange={this.onSelectStatusChange}
              >
                {/* <option value="">Select</option> */}
                <option value="*">Any</option>
                <option value="0">0</option>
                <option value="1">1</option>
              </select>
            </div>
          </div>

          {/* <input type="submit" className="xbtn xbtn-info xbtn-block xmt-4" /> */}
        </form>
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

export default withRouter(FilterMimes);
