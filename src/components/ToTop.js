import React from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

const ToTop = () => {
  const scrollPageToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });
  };

  return (
    <button className="scroll-btn btn"  onClick={() => scrollPageToTop()}>
      <ArrowUpOutlined />
    </button>
  );
};

export default ToTop;