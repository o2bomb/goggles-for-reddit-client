import React, { useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Popup from "./Popup";
import Portal from "./Portal";

const MediaEmbed = ({ type, url, embed_url, backup_embed_url, embed_type, title, toggle }) => {
  const [togglePopup, setTogglePopup] = useState(false);

  const renderPopup = () => {
    if(togglePopup) {
      disableBodyScroll();
      return (
        <Portal>
          <Popup source={url} embedSource={embed_url || backup_embed_url} caption={title} postType={"image"} togglePopup={setTogglePopup} />
        </Portal>
      );
    }
    enableBodyScroll();
    return null;
  }

  const renderMedia = () => {
    if(type === "imgur-image" || type === "reddit-image" || type === "ext-image") {
      return (
        <figure onClick={() => setTogglePopup(true)} className="media-embed___figure">
          <img className={`media-embed__figure__image`} src={embed_url} alt={`Post content`} />
        </figure>
      );
    }
    if(type === "reddit-video") {
      return (
        <video
          className="media-embed__video"
          src={embed_url}
          preload="metadata"
          autoPlay={false}
          muted
          controls
        />
      );
    }
    if(type === "twitch-video") {
      return (
        <iframe
          title={title}
          className="media-embed__iframe"
          src={embed_url}
          frameBorder="0"
          preload="metadata"
          scrolling="no"
          allowFullScreen
        />
      );
    }
    if(type === "youtube-video") {
      return (
        <iframe
          title={title}
          className="media-embed__iframe"
          src={embed_url}
          preload="metadata"
          frameBorder="0"
          allowFullScreen
        />
      );
    }
    if(type === "vimeo-video") {
      return (
        <iframe
          title={title}
          className="media-embed__iframe"
          src={embed_url}
          preload="metadata"
          frameBorder="0"
          allowFullScreen
        />
      );
    }
    if(type === "gfycat-video") {
      return (
        <video
          className="media-embed__video"
          preload="metadata"
          autoPlay={false}
          muted
          controls
        >
          <source src={backup_embed_url} type="video/webm" />
          <source src={embed_url} type="video/mp4" />
        </video>
      );
    }

    return null;
  };

  return (
    <div className={`media-embed ${embed_type ? `media-embed--${embed_type}` : ""} ${toggle ? "show" : "hide"}`}>
      {renderMedia()}
      <ReactCSSTransitionGroup
        transitionName="popup"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}        
      >
        {renderPopup()}
      </ReactCSSTransitionGroup>
    </div>
  );
};

export default MediaEmbed;