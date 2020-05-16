import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import CardContainer from "./CardContainer";

class Home extends Component {
  componentDidMount() {
    const { match, fetchSubreddit } = this.props;

    fetchSubreddit(match.params.id, match.params.type, match.params.time);
  }

  componentDidUpdate() {
    const { match, fetchSubreddit } = this.props;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    fetchSubreddit(match.params.id, match.params.type, match.params.time);
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