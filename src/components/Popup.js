import React from "react";
import { CloseOutlined } from "@ant-design/icons";

const Popup = ({ source, embedSource, caption, postType, togglePopup }) => {
  function renderContent() {
    if(postType === "image") {
      return (
        <a href={source}>
          <img className={`popup__content`} src={embedSource} alt={caption} />
        </a>
      );
    }
    return (<div>The content has failed to load</div>);
  }

  return (
    <div className={`popup`} onClick={() => togglePopup(false)}>
      <div className="popup__header">
        <button className="btn exit-btn" onClick={() => togglePopup(false)}>
          <CloseOutlined className="icon" />
        </button>
        {/* <h4 className="title">{caption}</h4> */}
      </div>
      <figure className="popup__frame">
        {renderContent()}
        <figcaption className="popup__caption">{caption}</figcaption>
      </figure>
      <div className="popup__footer">
        {/* maybe some buttons here */}
      </div>
    </div>
  );
}

export default Popup;