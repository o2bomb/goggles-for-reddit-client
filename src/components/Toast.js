import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const Toast = ({ hideToast, message, timestamp }) => {
  return (
    <div className="toast" onClick={() => hideToast({ message, timestamp })}>
      {message}
    </div>
  );
};

export default connect(null, actions)(Toast);