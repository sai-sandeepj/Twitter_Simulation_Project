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
import TweetPage from './TweetPage/TweetPage';
import ProfileLikesPage from './Profile/ProfileLikes'
import EditProfile from './Profile/EditProfile';
import CreateList from './Lists/CreateLists';
import ListPage from './Lists/ListPage';
import EditList from './Lists/EditList';
import AddMembers from './Lists/AddMembers';
import Members from './Lists/members';
import Subscribers from './Lists/subscribers';
import TwitterAnalytics from './TwitterAnalytics/TwitterAnalytics'

class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact path='/user/profile' component={Profile} />
        <Route path="/user/home" component={Home} />
        <Route path='/user/messages' component={Messages} />
        <Route path='/user/bookmarks' component={Bookmarks} />
        <Route path='/user/analytics' component={Analytics} />
        <Route path='/user/lists/owned' component={OwnedLists} />
        <Route path='/user/lists/subscriptions' component={SubscriptionLists} />
        <Route path='/user/lists/memberships' component={MemberLists} />
        <Route path='/user/tweet/:id' component={TweetPage} />
        <Route path='/user/profile/likes' component={ProfileLikesPage} />
        <Route path='/user/editprofile' component={EditProfile} />
        <Route path='/user/lists/create' component={CreateList} />
        <Route exact path='/user/lists/id' component={ListPage} />
        <Route path='/user/lists/listid/editlist' component={EditList} />
        <Route path='/user/lists/listid/addmembers' component={AddMembers} />
        <Route path='/user/lists/listid/members' component={Members} />
        <Route path='/user/lists/listid/subscribers' component={Subscribers} />
        <Route path='/twitteranalytics' component={TwitterAnalytics} />
      </div>
    );
  }
}

export default MainRoutes;
