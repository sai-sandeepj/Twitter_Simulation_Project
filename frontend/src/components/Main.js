import React, { Component } from "react";
import { Route } from "react-router-dom";

import SidePanel from "../components/SidePanel";

class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={SidePanel} />
      </div>
    );
  }
}

export default MainRoutes;
