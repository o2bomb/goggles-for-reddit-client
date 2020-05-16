import React, { Component } from "react";
import axios from "axios";
import getValueFromObject from "../helpers/getValueFromObject";
import { kFormatter } from "../helpers/numberFormatter";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      loading: false
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.query === "" & prevProps.query !== "") {
      this.setState({
        results: null
      });
    } else if(prevProps.query !== this.props.query) {
      this.setState({
        loading: true
      });
      this.performSearch();
    }
  }

  performSearch = async () => {
    try {
      const uri = `/api/subreddits/search?query=${this.props.query}&include_over_18=${true}`;
      const res = await axios.get(uri);
  
      this.setState({
        results: res.data,
        loading: false
      });  
    } catch (err) {
      this.setState({
        loading: false
      });
    }
  }

  renderResults = () => {
    return (
      this.state.results ? this.state.results.map((item, index) => {
        const result = {
          id: getValueFromObject(['id'], item),
          display_name_prefixed: getValueFromObject(['display_name_prefixed'], item),
          icon_img: getValueFromObject(['icon_img'], item),
          over18: getValueFromObject(['over18'], item),
          subscribers: getValueFromObject(['subscribers'], item)
        }

        return (
          <Link key={result.id} to={`/${result.display_name_prefixed}`} onClick={() => this.props.closeResults()} style={{ textDecoration: "none", color: "unset" }}>
            <div className="result-entry">
              <figure className="result-entry__subreddit-icon">
                <img 
                  className="result-entry__subreddit-icon__img" 
                  src={result.icon_img} 
                  alt={`Subreddit icon for ${result.display_name_prefixed}`}
                />
              </figure>
              <div className="result-entry__detail-group">
                <div className="result-entry__detail-group--1">
                  <div className="subreddit-name">{result.display_name_prefixed}</div>
                  <div className="subscriber-count">{result.subscribers ? `${kFormatter(result.subscribers)} subscribers` : ""}</div>
                </div>
                <div className="result-entry__detail-group--2">
                  <div className={`nsfw-tag ${result.over18 ? "show" : ""}`}>NSFW</div>
                </div>
              </div>
            </div>
          </Link>
        );
      }) : null
    );
  }

  render() {
    return (
      <div className={`search-results ${this.state.results ? "show" : ""}`}>
        {this.state.loading ? <div className="result-entry">Loading...</div> : this.renderResults()}
      </div>
    );
  }
}

export default SearchResults;