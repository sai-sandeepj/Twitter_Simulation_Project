import React, { Component } from "react";
import twitterlogo from "../images/twitterlogo.png";

class SidePanel extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <a href="/">
              <img id="twitterlogo" alt="" src={twitterlogo} />
            </a><br /><br /><br />
            <div className="list-group">
              <button type="button" className="btn btn-light font-weight-bold text-left">Home</button>
              <button type="button" className="btn btn-light font-weight-bold text-left">Messages</button>
              <button type="button" className="btn btn-light font-weight-bold text-left">Lists</button>
              <button type="button" className="btn btn-light font-weight-bold text-left">Bookmarks</button>
              <button type="button" className="btn btn-light font-weight-bold text-left">Profile</button>
              <button type="button" className="btn btn-light font-weight-bold text-left">Logout</button>
            </div>
          </div>
          <div className="col-6">Center</div>
          <div className="col">Left</div>
        </div>
      </div>
    );
  }
}

export default SidePanel;
