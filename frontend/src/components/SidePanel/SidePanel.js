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
      <div>
        <div></div>
        <div className="list-group" id="left">
          <a href="/user/home"> <img id="twitterlogo" alt="" src={Twitterlogo} /> </a>

          <a href='/user/home'> <h5 id="stayleft"><FontAwesomeIcon icon={faHome} /> &nbsp; &nbsp;</h5><h5 className='d-none d-lg-block d-print-block' id="stayleftall">Home</h5></a>

          <a href='/user/messages'><h5 id="stayleft"><FontAwesomeIcon icon={faEnvelope} /> &nbsp; &nbsp;</h5><h5 className='d-none d-lg-block d-print-block' id="stayleftall">Messages</h5></a>

          <a href='/user/lists/owned'><h5 id="stayleft"><FontAwesomeIcon icon={faBars} /> &nbsp;&nbsp; &nbsp;</h5> <h5 className='d-none d-lg-block d-print-block' id="stayleftall">Lists</h5></a>

          <a href='/user/bookmarks'><h5 id="stayleft"><FontAwesomeIcon icon={faBookmark} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5><h5 className='d-none d-lg-block d-print-block' id="stayleftall">Bookmarks</h5></a>

          <a href='/user/profile'><h5 id="stayleft"><FontAwesomeIcon icon={faUserCircle} /> &nbsp; &nbsp; </h5><h5 className='d-none d-lg-block d-print-block' id="stayleftall">Profile</h5></a>

          <a href='/user/analytics'><h5 id="stayleft"><FontAwesomeIcon icon={faChartBar} /> &nbsp; &nbsp; </h5> <h5 className='d-none d-lg-block d-print-block' id="stayleftall">Analytics</h5></a>

          <a href='/logout'><h5 id="stayleft" ><FontAwesomeIcon icon={faSignOutAlt} /> &nbsp; &nbsp;</h5><h5 className='d-none d-lg-block d-print-block' id="stayleftall">Logout</h5></a>
        </div>
      </div>
    )
  }
}

export default SidePanel;
