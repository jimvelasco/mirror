//import React from 'react';
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { performThumbnailSearch } from "../../actions/thumbnailActions";

import TextFieldGroup from "../common/TextFieldGroup";

// functional component
// const SearchBar = () => {
// 	return <input />
// };

//class SearchBar extends React.Component {
// class component
// class SearchBar extends Component {
// 	render() {
// 		return <input onChange = {this.onInputChange}/>;
// 	}

// 	onInputChange(event) {
// 		console.log(event.target.value);
// 	}

// }

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchterm: "",
      thumbnails: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ searchterm: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    //console.log("*" + t his.state.searchterm + "*");
    if (this.state.searchterm === "") {
      this.setState({ errors: { searchterm: "Search Term Required" } });
    } else {
      this.setState({ errors: {} });
      const searchData = {
        searchterm: this.state.searchterm
      };
      // console.log(searchData);
      // console.log("search term is " + searchData.searchterm);
      // this.props.performThumbWildcardSearch(searchData.searchterm);
      this.props.performThumbnailSearch("wildcard", searchData.searchterm);
      // this.setState({ searchterm: "" });
      // console.log("here are the props");
      // console.log(this.props);
      // console.log("here are the state");
      // console.log(this.state);
      // console.log("here are the end of state");
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <div style={{ marginLeft: "100px" }}>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group">
            <TextFieldGroup
              type="text"
              placeholder="Enter Search Term"
              name="search"
              value={this.state.searchterm}
              onChange={this.onChange}
              error={errors.searchterm}
            />
            {/* <input type="submit" className="xbtn xbtn-info xbtn-block xmt-4" /> */}
            {/* <i id="filtersubmit" className="fa fa-search fa-1x " /> */}
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

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

// function mapStateToProps({ state,thumbnails }) {
//   console.log("searchbar manage state to props called");
//   console.log(thumbnails);
//   console.log("searchbar end manage state to props called");
//   return { state.thumbnails };
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ performThumbnailSearch }, dispatch);
}

// const mapDispatchToProps = (dispatch, ownProps) =>
//   bindActionCreators(dispatch(performThumbSearch, dispatch));

// call loginUser in actions file
// export default connect(
//   mapStateToProps,
//   { performSearch }
// )(SearchBar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

//export default SearchBar;
