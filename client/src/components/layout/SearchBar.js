//import React from 'react';
import React, { Component } from "react";

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
    this.state = { term: "" };
  }
  render() {
    //return <input onChange = {event => console.log(event.target.value)} />;
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          //onChange = {event => this.setState({term: event.target.value})} />
          // Value of input: {this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
        <i id="filtersubmit" className="fa fa-search fa-1x " />
      </div>
    );
  }

  onInputChange(term) {
    // this.setState({term});
    this.setState({ term: term });
    //	this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
