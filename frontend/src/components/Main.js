import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from './Home/Home'
import SidePanel from "./SidePanel/SidePanel";

class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={SidePanel} />
        <Route path="/user/home" component={Home} />

      </div>
    );
  }
}

export default MainRoutes;
