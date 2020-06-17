import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Home from "./Home";
import Vault from "./Vault";
import Settings from "./Settings";
import ToTop from "./ToTop";
import ToastContainer from "./ToastContainer";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <ToTop />
        <Switch>
          <Route exact path="/vault" component={Vault} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/" component={Home} />
          <Route exact path="/:x" component={Home} />
          <Route exact path="/:x/:y" component={Home} />
          <Route exact path="/:x/:y/:z" component={Home} />
          <Route exact path="/:x/:y/:z/:v" component={Home} />
        </Switch>
        <ToastContainer />
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App);