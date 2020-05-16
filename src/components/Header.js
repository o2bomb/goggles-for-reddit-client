import React, { Component } from "react";
import { HomeOutlined, BankOutlined, SettingOutlined, HomeFilled, BankFilled, SettingFilled } from "@ant-design/icons";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Dropdown, { Sub } from "./Dropdown";
import SearchBar from "./SearchBar";
import Portal from "./Portal";

class Header extends Component {
  render() {
    const { location, subreddit } = this.props;
    const rootPath = location.pathname.split("/")[1];
    const path = subreddit ? `/r/${subreddit}` : "";

    return (
      <header id="header" className="header">
        <ul className="nav">
          <li className={`nav-item ${rootPath === "" || rootPath === "r" ? "current" : ""}`}>
            <Link tooltip="Home" className={`link-container tooltip-bottom`} to="/" tabIndex="1">
              {rootPath === "" || rootPath === "r" ? <HomeFilled className="icon" /> : <HomeOutlined className="icon" />}
            </Link>
          </li>
          <li className={`nav-item ${rootPath === "vault" ? "current" : ""}`}>
            <Link tooltip="Vault" className={`link-container tooltip-bottom`} to="/vault" tabIndex="2">
              {rootPath === "vault" ? <BankFilled className="icon" /> : <BankOutlined className="icon" />}
            </Link>
          </li>
          <li className={`nav-item ${rootPath === "settings" ? "current" : ""}`}>
            <Link tooltip="Settings" className={`link-container tooltip-bottom`} to="/settings" tabIndex="3">
              {rootPath === "settings" ? <SettingFilled className="icon" /> : <SettingOutlined className="icon" />}
            </Link>
          </li>
        </ul>
        <Portal>
          <SearchBar />
        </Portal>
        <Dropdown>
          <button className="filter-btn btn" tabIndex="6">
            Sort by: Hot
          </button>
          <Link to={`${path}/best`}>Best</Link>
          <Link to={`${path}/hot`}>Hot</Link>
          <Link to={`${path}/new`}>New</Link>
          <Link to={`${path}/rising`}>Rising</Link>
          <Sub label="Top">
            <Link to={`${path}/top/hour`}>Hour</Link>
            <Link to={`${path}/top/day`}>Day</Link>
            <Link to={`${path}/top/week`}>Week</Link>
            <Link to={`${path}/top/month`}>Month</Link>
            <Link to={`${path}/top/year`}>Year</Link>
            <Link to={`${path}/top/all`}>All time</Link>
          </Sub>
          <Sub label="Controversial">
            <Link to={`${path}/controversial/hour`}>Hour</Link>
            <Link to={`${path}/controversial/day`}>Day</Link>
            <Link to={`${path}/controversial/week`}>Week</Link>
            <Link to={`${path}/controversial/month`}>Month</Link>
            <Link to={`${path}/controversial/year`}>Year</Link>
            <Link to={`${path}/controversial/all`}>All time</Link>
          </Sub>
        </Dropdown>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    subreddit: state.home.subreddit
  };
}

export default withRouter(connect(mapStateToProps, actions)(Header));
