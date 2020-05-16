import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { LinkOutlined } from "@ant-design/icons";
import copy from "clipboard-copy";

const CopyButton = ({ showToast, url }) => {
  return (
    <button className="btn icon-btn icon-btn--link" onClick={() => {
      copy(url);
      showToast("Link copied ✂️")
    }}>
      <LinkOutlined />
    </button>
  );
};

export default connect(null, actions)(CopyButton);