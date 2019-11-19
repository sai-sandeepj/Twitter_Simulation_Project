import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from './Home/Home'
import Login from "./Login/Login"
import SignUp from "./Signup/Signup";
import Profile from "./Profile/Profile";
// import Lists from "./Lists/ListHome";
import Messages from './Messages/Messages';
import Bookmarks from './Bookmarks/BookmarkTweets';
import Analytics from './Analytics/Analytics';
import MemberLists from './Lists/MemberLists';
import SubscriptionLists from './Lists/SubscribedLists';
import OwnedLists from './Lists/OwnedLists';

class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path='/user/profile' component={Profile} />
        <Route path="/user/home" component={Home} />
        <Route path='/user/messages' component={Messages} />
        <Route path='/user/bookmarks' component={Bookmarks} />
        <Route path='/user/analytics' component={Analytics} />
        <Route path='/user/lists/owned' component={OwnedLists} />
        <Route path='/user/lists/subscriptions' component={SubscriptionLists} />
        <Route path='/user/lists/memberships' component={MemberLists} />
      </div>
    );
  }
}

export default MainRoutes;
