import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import UserImage from '../../images/user-icon.png'
import default_avatar from "../../images/default_avatar.png";
import rootUrl from "../Config/Settings";

export class ResultCard extends Component {

    reloadCom = () => {
        console.log("reload page")
        window.location.reload()
    }

    render() {
        console.log(this.props.indUser);
        let profileImageData = <img src={default_avatar} alt="logo" />
        if (this.props.indUser.profileImage) {
            profileImageData = <img src={rootUrl + "/download-file/" + this.props.indUser.profileImage} alt="logo" />
        }
        console.log("search profile image", profileImageData)
        return (
            <div>
                <div className="card row">
                    <Link to='/user/userName'>
                        <div id='visit-tweet-card'>
                            <div className='col-2' id='user-image' >{profileImageData}</div>
                            <div className='col-10' id='user-tweet-message'>
                                <Link to={{
                                    pathname: '/user/profile',
                                    state: {
                                        userName: this.props.indUser.userName
                                    }
                                }} id='tweet-fullname' onClick={() => this.reloadCom()}><p className="font-weight-bold" id='tweet-fullname' >{this.props.indUser.firstName}</p><p className="font-weight-bold" id='tweet-fullname'>{this.props.indUser.lastName}</p></Link>
                                <Link to={{
                                    pathname: '/user/profile',
                                    state: {
                                        userName: this.props.indUser.userName
                                    }
                                }} ><p id='tweet-username'>@{this.props.indUser.userName}</p></Link>
                            </div>
                        </div>
                    </Link>
                </div>

            </div >
        )
    }
}

export default ResultCard
