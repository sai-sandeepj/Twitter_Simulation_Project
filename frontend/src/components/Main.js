import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from './Home/Home'
// import SidePanel from "./SidePanel/SidePanel";
import Login from "./Login/Login"
import SignUp from "./Signup/Signup";
import Profile from "./Profile/Profile";

class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {/* <Route path="/sidepanel" component={SidePanel} /> */}
        <Route path="/profile" component={Profile} />
        <Route path="/user/home" component={Home} />
      </div>
    );
  }
}

export default MainRoutes;
