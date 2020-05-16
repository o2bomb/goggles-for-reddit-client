import React, { Component } from "react";
import SearchResults from "./SearchResults";
import Portal from "./Portal";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      sentQuery: "",
    };
  }

  clearQuery = (event) => {
    this.setState({
      sentQuery: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });

    if (event.target.value) this.updateQuery();
    else this.setState({ sentQuery: "" });
  };

  handleSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.setState({
        sentQuery: this.state.input,
      });
    }
  };

  updateQuery = () => {
    let timeout = null;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      this.setState({
        sentQuery: this.state.input,
      });
    }, 1500);
  };

  render() {
    return (
      <div className="search-group">
        <form className="search-group__form" role="search">
          <input
            tabIndex="4"
            id="search"
            className="search-group__form__input"
            type="search"
            placeholder="Search for a subreddit..."
            aria-label="Search for a subreddit"
            autoComplete="subreddit-search"
            onKeyDown={this.handleSubmit}
            onChange={this.handleChange}
            value={this.state.input}
          />
        </form>
        <SearchResults
          query={this.state.sentQuery}
          closeResults={this.clearQuery}
        />
        <Portal>
          <div
            className={`blocker ${this.state.sentQuery ? "show" : ""}`}
            onClick={() => this.clearQuery()}
          />
        </Portal>
      </div>
    );
  }
}

export default SearchBar;
