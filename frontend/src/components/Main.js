import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from './Home/Home'
<<<<<<< HEAD
// import SidePanel from "./SidePanel/SidePanel";
=======
import SidePanel from "./SidePanel/SidePanel";
import Login from "./Login/Login"
import SignUp from "./Signup/Signup";
import Profile from "./Profile/Profile";
>>>>>>> 5c9d9b3070b4cc5cf467c28e63b4760aac7dc54d

class MainRoutes extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        {/* <Route path="/" component={SidePanel} /> */}
=======
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/sidepanel" component={SidePanel} />
        <Route path="/profile" component={Profile} />
>>>>>>> 5c9d9b3070b4cc5cf467c28e63b4760aac7dc54d
        <Route path="/user/home" component={Home} />
      </div>
    );
  }
}

export default MainRoutes;
