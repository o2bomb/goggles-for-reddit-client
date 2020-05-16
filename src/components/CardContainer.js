import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Card from "./Card";
import CardText from "./CardText";
import CardLink from "./CardLink";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevY: 0
    };
    this.loadingRef = React.createRef();
  }

  componentDidMount() {
    // This observer is for infinite scrolling
    this.observer = new IntersectionObserver((entries, observer) => {
      const y = entries[0].boundingClientRect.y;
      // Only fetch more posts when the user is scrolling downwards
      if(this.state.prevY > y) {
        this.props.fetchSubreddit(this.props.subreddit, this.props.type, this.props.time);
      }
      this.setState({
        prevY: y
      });
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0
    })

    this.observer.observe(this.loadingRef.current);
  }

  renderPosts = () => {
    return (
      this.props.posts ? this.props.posts.map(element => {
        if(element.type === "reddit-self") {
          return (
            <CardText key={element.id} {...element} />
          );
        }
        if(element.type === "ext-other") {
          return (
            <CardLink key={element.id} {...element} />
          );
        }
        return (
          <Card key={element.id} {...element} />
        );
      }) : null
    );
  };

  render() {
    return(
      <div className="card-container">
        <div className="wrapper">
          {this.renderPosts()}
        </div>
        <div ref={this.loadingRef} className="progress-indicator">
          {this.props.after ? <div className="loader" /> : <h1>Unable to fetch anymore posts.</h1>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    subreddit: state.home.subreddit,
    type: state.home.type,
    time: state.home.time,
    after: state.home.after,
    posts: state.home.posts
  };
}

export default connect(mapStateToProps, actions)(CardContainer);