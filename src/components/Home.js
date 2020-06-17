import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import CardContainer from "./CardContainer";

class Home extends Component {
  componentDidMount() {
    this.updateContent();
  }

  componentDidUpdate() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    this.updateContent();
  }

  updateContent() {
    const { match, fetchSubreddit } = this.props;

    if (match.params.x === "r") {
      fetchSubreddit(match.params.y, match.params.z, match.params.v);
    } else {
      fetchSubreddit(null, match.params.x, match.params.y);
    }
  }

  render() {
    return (
    <div className="home">
      <CardContainer />
    </div>
    );
  }
}

export default withRouter(connect(null, actions)(Home));