import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Toast from "./Toast";

class ToastContainer extends Component {
  renderToasts = () => {
    return (
      this.props.toasts.map(toast => {
        return <Toast key={toast.timestamp} {...toast} />
      }) || null
    );
  }

  render() {
    return(
      <div className="toast-container">
        <ReactCSSTransitionGroup
          transitionName="toast"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this.renderToasts()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toasts: state.toasts
  };
}

export default connect(mapStateToProps)(ToastContainer);