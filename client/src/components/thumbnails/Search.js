//import React from 'react';
import React, { Component } from "react";
import axios from "axios";
import ThumbnailFeed from "./ThumbnailFeed";

import TextFieldGroup from "../common/TextFieldGroup";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchterm: "",
      thumbs: [],
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      searchterm: e.target.value,
      thumbs: []
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const searchData = {
      searchterm: this.state.searchterm
    };
    console.log(searchData);
    console.log(searchData.searchterm);

    //this.setState({ thumbs: ["one", "two"] });
    let searchterm = searchData.searchterm;
    axios
      .get(`/api/mythumbs/search/${searchterm}`)
      .then(response => {
        this.setState({
          thumbs: response.data,
          category: searchterm
        });
      })
      .catch(error => {
        console.log("error", error);
      });
    //this.props.performSearch(searchData.searchterm);
  }
  render() {
    //return <input onChange = {event => console.log(event.target.value)} />;
    const { errors } = this.state;
    const { thumbs } = this.state;
    const { searchterm } = this.state;
    let thumbContent;
    //console.log(thumbs);
    if (thumbs.length === 0 || searchterm === "") {
      thumbContent = "";
    } else {
      thumbContent = thumbContent = <ThumbnailFeed thumbnails={thumbs} />;
    }
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="form-group search-bar">
            <TextFieldGroup
              type="text"
              placeholder="Enter Search Term"
              name="email"
              value={this.state.searchterm}
              onChange={this.onChange}
              error={errors.searchterm}
            />
          </div>
        </form>
        <div className="feed">
          <div className="container">
            <div className="row">
              <div className="col-md-12 ximage-container">{thumbContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // onInputChange(term) {
  //   // this.setState({term});
  //   this.setState({ term: term });

  //   this.props.onSearchTermChange(term);
  // }
}
export default Search;
