import React, { Component } from "react";
import Twitterlogo from "../../images/twitterlogo.png";
import './SidePanel.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBars, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faBookmark, faChartBar } from '@fortawesome/free-regular-svg-icons'

library.add(
  faHome,
  faBars,
  faEnvelope,
  faBookmark,
  faUserCircle,
  faSignOutAlt,
  faChartBar
)
class SidePanel extends Component {
  render() {
    return (
      <div className= 'sidepanel'>
        <div></div>
        <div className="list-group" id="left">
          <a href="/user/home"> <img id="twitterlogo" alt="" src={Twitterlogo} /> </a><br />
          <a href='/user/home' className="font-weight-bold text-left"> <h4><FontAwesomeIcon icon={faHome} /> &nbsp; &nbsp;Home</h4></a>
          <a href='/user/home' className=" font-weight-bold text-left"><h4><FontAwesomeIcon icon={faEnvelope} /> &nbsp; &nbsp;Messages</h4></a>
          <a href='/user/home' className=" font-weight-bold text-left"><h4><FontAwesomeIcon icon={faBars} /> &nbsp; &nbsp; Lists</h4></a>
          <a href='/user/home' className=" font-weight-bold text-left"><h4><FontAwesomeIcon icon={faBookmark} /> &nbsp; &nbsp; Bookmarks</h4></a>
          <a href='/user/home' className=" font-weight-bold text-left"><h4><FontAwesomeIcon icon={faUserCircle} /> &nbsp; &nbsp;Profile</h4></a>
          <a href='/user/home' className=" font-weight-bold text-left"><h4><FontAwesomeIcon icon={faChartBar} /> &nbsp; &nbsp;Analytics</h4></a>
          <a href='/user/home' className=" font-weight-bold text-left"><h4><FontAwesomeIcon icon={faSignOutAlt} /> &nbsp; &nbsp;Logout</h4></a>
        </div>
      </div>
    )
  }
}

export default SidePanel;
