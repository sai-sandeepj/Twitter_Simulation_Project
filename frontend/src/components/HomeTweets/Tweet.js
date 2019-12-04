import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserImage from '../../images/user-icon.png'
import UserActions from './UserActions'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import ParentTweetCard from './ParentTweetCard'
import default_avatar from "../../images/default_avatar.png";


library.add(
    faChevronDown
)
class Tweet extends Component {
    constructor() {
        super()
        this.state = {
            profileImagePreview: null,
            parentProfileImagePreview: null
        }
    }

    reloadCom = () => {
        console.log("reload page")
        window.location.reload()
    }

    deleteTweet = () => {
        const data = {
            tweetId: this.props.tweetIndividual._id
        }
        axios.post(rootUrl + '/deleteTweet', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.props.retweetWithComment()
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");
            })
    }

    unFollowUser = (e) => {
        e.preventDefault()
        console.log('unfollow');
        let data;
        data = {
            userName: localStorage.getItem('userName'),
            unfollowUserName: this.props.userDetails.userName,
            unfollowFirstName: this.props.userDetails.firstName,
            unfollowLastName: this.props.userDetails.lastName,
            unfollowAboutMe: this.props.userDetails.abountMe,
            unfollowProfileImage: this.props.userDetails.userImage
        }
        console.log("Inside follow usert", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/unfollowUser', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.props.retweetWithComment()
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");
            })
    }

    componentDidMount() {
        if (this.props.tweetIndividual.profileImage) {
            this.setState({
                profileImagePreview: rootUrl + "/download-file/" + this.props.tweetIndividual.profileImage
            })
        }
    }

    render() {
        let parentTweetDetails = null;
        let profileImageData = <img src={default_avatar} alt="logo" />
        let tweetImageData = null;
        if (this.state.profileImagePreview) {
            profileImageData = <img src={this.state.profileImagePreview} alt="logo" />
        }
        console.log('this.props.tweetMedia', this.props.tweetIndividual)
        if (this.props.tweetIndividual.tweetMedia) {
            tweetImageData = <div id='tweetimage'><img src={rootUrl + "/download-file/" + this.props.tweetIndividual.tweetMedia} alt="logo" /></div>
        }

        console.log('tweetindividual', this.props.userDetails)
        if (this.props.tweetIndividual.parentTweetDetails.length > 0) {
            parentTweetDetails = <ParentTweetCard parentTweet={this.props.tweetIndividual.parentTweetDetails} />
        }
        let chevrondown = <Link onClick={this.deleteTweet.bind(this)}>Delete tweet</Link>
        if (this.props.tweetIndividual.userName !== localStorage.getItem('userName')) {
            chevrondown = <Link onClick={this.unFollowUser.bind(this)}> Unfollow user</Link>
        }


    }

    render() {
        console.log('props', this.props.tweetIndividual);
        let chevronUnfollow = null;
        if (this.props.tweetIndividual.userName !== localStorage.getItem('userName')) {
            chevronUnfollow = <Dropdown>
                <Link>
                    <Dropdown.Toggle id='chevrondown' >
                        <h4><button className='btn btn-' id='chevrondown'></button></h4>
                    </Dropdown.Toggle>
                </Link>
                <Dropdown.Menu>
                    <Dropdown.Item> <Link onClick={() => this.showModal()}> Unfollow user</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        }
        return (
            <div>
                <div className="card row">
                    <Link to={'/user/tweet/' + this.props.tweetIndividual._id} id='padding-set'>
                        <div id='visit-tweet-card'>
                            <div className='col-2' id='user-image' >{profileImageData}</div>
                            <div className='col-10' id='user-tweet-message'>
<<<<<<< HEAD
                                <Link to={{
                                    pathname: '/user/profile',
                                    state: {
                                        userName: this.props.tweetIndividual.userName
                                    }
                                }} id='none' onClick={() => this.reloadCom()}><p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetIndividual.firstName}</p> <p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetIndividual.lastName}</p></Link>
                                <Link to={{
                                    pathname: '/user/profile',
                                    state: {
                                        userName: this.props.tweetIndividual.userName
                                    }
                                }} ><p id='tweet-username'> @{this.props.tweetIndividual.userName}</p></Link>

                                <Dropdown >
=======
                                <Link to='/user/username' id='tweet-fullname'><p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetIndividual.userName}</p></Link>
                                {/* <p id='tweet-username'>@{this.props.tweetIndividual.userName}</p> */}
                                <div id='chevrondown'>{chevronUnfollow}</div>
                                <Dropdown>
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
                                    <Link>
                                        <Dropdown.Toggle id='chevrondown-toggle' >
                                        </Dropdown.Toggle>
                                    </Link>
                                    <Dropdown.Menu>
                                        <Dropdown.Item> {chevrondown}</Dropdown.Item>
                                    </Dropdown.Menu>
<<<<<<< HEAD
                                </Dropdown><br />
                                <p id='tweet-usermessage'>{this.props.tweetIndividual.tweetMsg}</p><br />
                                {tweetImageData}
                                {parentTweetDetails}
                                <UserActions
                                    userData={this.state.user}
                                    liked={this.props.liked}
                                    retweets={this.props.retweets}
                                    userDetails={this.props.userDetails}
                                    tweetData={this.props.tweetIndividual}
                                    likeTweet={this.props.likeTweet}
                                    retweetWithoutComment={this.props.retweetWithoutComment}
                                    retweetWithComment={this.props.retweetWithComment}
                                />
=======
                                </Dropdown> <br />
                                <p id='tweet-usermessage'>{this.props.tweetIndividual.tweetMsg}</p><br />
                                <UserActions userData={this.state.user} userDetails={this.props.userDetails} tweetData={this.props.tweetIndividual} />
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Tweet;