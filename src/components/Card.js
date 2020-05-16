import React, { useState } from "react";
import { CloudDownloadOutlined } from "@ant-design/icons";
import MediaEmbed from "./MediaEmbed";
import getTimeSince from "../helpers/getTimeSince";
import CopyButton from "./CopyButton";

const Card = ({ id, distinguished, selftext_html, title, subreddit_name_prefixed, ups, created_utc, over_18, image_resolutions, spoiler, num_comments, url, author, type, permalink, embed_url, backup_embed_url, embed_type }) => {
  const [toggleBlock, setToggleBlock] = useState(over_18 || spoiler ? true : false);
  const [toggleContent, setToggleContent] = useState(over_18 || spoiler ? false : true);
  const createdDate = new Date(created_utc * 1000);
  
  let distinguishedType = null;
  if(distinguished === "admin")
    distinguishedType = "admin";
  else if(distinguished === "moderator")
    distinguishedType = "moderator";

  let toggleText = "";
  if(over_18 && spoiler)
    toggleText += "NSFW and spoiler "
  else if(spoiler)
    toggleText += "spoiler ";
  else if(over_18)
    toggleText += "NSFW ";

  const toggleElement = (
    <div className={`toggle-label ${ toggleBlock ? "show" : "hide" }`} onClick={() => {setToggleBlock(false); setToggleContent(true)}}>
      <div className="toggle-text">
        Click to show {toggleText}content
      </div>
    </div>
  );

  const renderContent = () => {
    return (
      <MediaEmbed title={title} url={url} embed_url={embed_url || url} backup_embed_url={backup_embed_url} embed_type={embed_type} type={type} toggle={toggleContent} />
    );
  }

  const nsfwTag = (<div className="tag tag--nsfw">NSFW</div>);
  const spoilerTag = (<div className="tag tag--spoiler">Spoiler</div>);

  return (
    <div className="card">
      <div className="card__header">
        <div className="info-group">
          <a className="subreddit-link" href={`https://reddit.com/${subreddit_name_prefixed}`}>{subreddit_name_prefixed}</a>
        </div>
        <div className="details">by {author} &middot; {getTimeSince(createdDate)} ago</div>
      </div>
      <div className="card__content">
        {toggleElement}
        {renderContent()}
      </div>
      <div className="card__footer">
        <a className={`card__title-wrapper`} href={url}>
          <h1 className={`card__title ${distinguishedType}`}>
            {title}
          </h1>
        </a>
        <div className="card__footer--links">
          <div className="tag-group">
            {over_18 ? nsfwTag : null}
            {spoiler ? spoilerTag : null}
            <a className="comments-link" href={permalink}>comments ({num_comments || 0})</a>
          </div>
          <div className="btn-group">
            <CopyButton url={url} />
            <a className="btn icon-btn icon-btn--save" href="#0">
              <CloudDownloadOutlined />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;