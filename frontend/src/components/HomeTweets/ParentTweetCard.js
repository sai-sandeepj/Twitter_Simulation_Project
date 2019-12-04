import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserImage from '../../images/user-icon.png'
import default_avatar from "../../images/default_avatar.png";
import rootUrl from "../Config/Settings";

export class ParentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentProfileImagePreview: null
        }
    }
    reloadCom = () => {
        console.log("reload page")
        window.location.reload()
    }
    componentDidMount() {
        console.log("image retweet", this.props.parentTweet[0])
        if (this.props.parentTweet[0].parentProfileImage) {
            this.setState({
                parentProfileImagePreview: rootUrl + "/download-file/" + this.props.parentTweet[0].parentProfileImage
            })
        }
    }
    render() {
        let tweetImageData = null;
        console.log(this.props.parentTweet[0].parentFirstName);
        let parentProfileImageData = <img src={default_avatar} alt="logo" />
        if (this.state.parentProfileImagePreview) {
            parentProfileImageData = <img src={this.state.parentProfileImagePreview} alt="logo" />
        }
        if (this.props.parentTweet[0].parentTweetMedia) {
            tweetImageData = <div id='tweetimage'><img src={rootUrl + "/download-file/" + this.props.parentTweet[0].parentTweetMedia} alt="logo" /></div>
        }
        return (
            <div>
                <div className="card row">
                    <Link to='/tweet/tweetid'>
                        <div id='visit-tweet-card'>
                            <div className='col-2' id='user-image' >{parentProfileImageData}</div>
                            <div className='col-10' id='user-tweet-message'>
                                <Link to={{
                                    pathname: '/user/profile',
                                    state: {
                                        userName: this.props.parentTweet[0].parentUserName
                                    }
                                }} id='tweet-fullname' onClick={() => this.reloadCom()}><p className="font-weight-bold" id='tweet-fullname'>{this.props.parentTweet[0].parentFirstName}</p><p className="font-weight-bold" id='tweet-fullname'>{this.props.parentTweet[0].parentLastName}</p></Link>
                                <Link to={{
                                    pathname: '/user/profile',
                                    state: {
                                        userName: this.props.parentTweet[0].parentUserName
                                    }
                                }} ><p id='tweet-username'>@{this.props.parentTweet[0].parentUserName}</p></Link><br /> <br />

                                <p id='tweet-usermessage'>{this.props.parentTweet[0].parentTweetMsg}</p><br />
                                {tweetImageData}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ParentCard
