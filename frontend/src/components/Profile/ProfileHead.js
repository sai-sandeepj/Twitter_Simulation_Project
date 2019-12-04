import React, { Component } from "react";
import default_avatar from "../../images/default_avatar.png";
import twitterbanner from '../../images/twitterbanner.png';
import twitter_location from '../../images/twitter_location.png'
import { Redirect } from 'react-router'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import { Link } from "react-router-dom";
import ShowModal from './ShowModal'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            profileImage: "",
            profileImagePreview: "",
            followers: [],
            following: [],
            showModal: false,
            modalData: null
        }
        this.followUser = this.followUser.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);

    }

    componentDidMount() {
        console.log("this.props", this.props)
        let data
        if (this.props) {
            data = {
                // userName: localStorage.getItem('userName')
                userName: this.props.individual
            }
        }
        else {
            data = {
                userName: localStorage.getItem('userName')
                // userName: this.props.location.state.userName
            }
        }
        console.log("Inside get profile after component did mount", data);
        console.log('last name', localStorage.getItem('lastName'));
        
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/getProfile', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        firstName: response.data[0][0].firstName,
                        lastName: response.data[0][0].lastName,
                        email: response.data[0][0].userEmail,
                        gender: response.data[0][0].gender,
                        description: response.data[0][0].aboutMe,
                        userPhone: response.data[0][0].userPhone,
                        state: response.data[0][0].state,
                        city: response.data[0][0].city,
                        userZip: response.data[0][0].zipCode,
                        userName: response.data[0][0].userName,
                        followers: response.data[1].followers,
                        following: response.data[1].following,
                        profileImage: response.data[0][0].userImage
                    });
                    console.log("state updated", this.state)
                    console.log("Profile image name", response.data);
                    if (response.data[0][0].userImage) {
                        this.setState({
                            profileImagePreview: rootUrl + "/download-file/" + response.data[0][0].userImage
                        })
                    }
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");
            })
    }

    followUser() {
        let data;
        data = {
            userName: localStorage.getItem('userName'),
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            aboutMe: localStorage.getItem('aboutMe'),
            profileImage: localStorage.getItem('userImage'),
            followUserName: this.state.userName,
            followFirstName: this.state.firstName,
            followLastName: this.state.lastName,
            followAboutMe: this.state.aboutMe,
            followProfileImage: this.state.profileImage
        }
        console.log("Inside follow usert", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/followUser', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");
            })
    }

    unfollowUser() {
        let data;
        data = {
            userName: localStorage.getItem('userName'),
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            aboutMe: localStorage.getItem('aboutMe'),
            profileImage: localStorage.getItem('userImage'),
            unfollowUserName: this.state.userName,
            unfollowFirstName: this.state.firstName,
            unfollowLastName: this.state.lastName,
            unfollowAboutMe: this.state.aboutMe,
            unfollowProfileImage: this.state.profileImage
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
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");
            })
    }
    showFollowersModal = () => {
        this.setState({
            modalData: this.state.followers,
            showModal: !this.state.showModal,
        })
    }

    showFollowingModal = () => {
        this.setState({
            showModal: !this.state.showModal,
            modalData: this.state.following
        })
    }

    deleteAccount = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able login Again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const data = {
                        userName: localStorage.getItem('userName')
                    }
                    axios.post(rootUrl + '/deActivateAccount', data)
                        .then(response => {
                            if (response.status === 200) {
                                swal({
                                    title: "deleted",
                                    text: "Account deleted Successfully",
                                    icon: "Success",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            localStorage.clear()
                                            swal("Poof! Your Account has been deleted!", {
                                                icon: "success",
                                            });
                                        }
                                    })
                            }
                            else {
                                console.log("Didn't fetch bookmarked tweets data")
                            }
                        }).catch((err) => {
                            if (err) {
                                swal('erroer connecting to database')
                            }
                        });


                } else {
                    swal("Your Account is safe!");
                }
            });
    }

    render() {
        let redirectVar = null;
        let buttons;
        let follow;
        let deleteAccount;
        console.log("this.state", this.state.redirectFollowUser)
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        let profileImageData = <img src={default_avatar} alt="logo" />
        if (this.state.profileImagePreview) {
            profileImageData = <img src={this.state.profileImagePreview} alt="logo" />
        }

        console.log('userindividual', this.props.individual)
        if (localStorage.getItem('userName') === this.props.individual) {
            buttons = <a href='/user/editprofile' id="editprofile" className="float-right"><h6>Edit Profile</h6> </a>
            deleteAccount = <button className='btn btn-' id='delete-account' onClick={this.deleteAccount} ><h6>Delete Account</h6> </button>
        }
        else {
            console.log(this.state.followers.length, this.state.followUser)
            if (this.state.followers.length !== 0) {
                for (let i = 0; i < this.state.followers.length; i++) {
                    console.log(this.state.followers[i].userName)
                    if (this.state.followers[i].userName === localStorage.getItem('userName')) {
                        follow = <button className="btn btn-outline-danger float-right" onClick={() => this.unfollowUser()}>Unfollow</button>
                    }
                    else {
                        console.log("hello")
                        follow = <button className="btn btn-outline-primary float-right" onClick={() => this.followUser()}>Follow</button>
                    }
                }
            }
            else {
                console.log("hi")
                follow = <button className="btn btn-outline-primary float-right" onClick={() => this.followUser()}>Follow</button>
            }
            buttons = <div><br />
                <Link to={{
                    pathname: '/user/lists/owned',
                    state: {
                        userName: this.state.userName
                    }
                }} className='btn btn-outline-primary float-right' >View Lists</Link></div >
        }
        return (
            <div>
                {redirectVar}
                <div className='row '>
                    <div className='col-6 text-left' >
                        <h4 className='font-weight-bold'>{this.state.firstName} {this.state.lastName}</h4>
                    </div>
                </div>
                <div className='row'>
                    <img src={twitterbanner} className="img-fluid" id="theader" alt="" />
                    <div className="align-items-right profile-heading picContainer">
                        {profileImageData}
                    </div>
                    <div className='col-12'>
                        {buttons}
                        {deleteAccount}
                    </div>
                </div>
                <div className='row profile-row align-items-left"'>
                    <div className='col-8 text-left' >
                        <h5 className='font-weight-bold'>{this.state.firstName} {this.state.lastName}</h5>
                        <h6 className='text-secondary'>@{this.state.userName}</h6>
                        <p id="desc">{this.state.description}</p>
                        <p id="desc" ><img src={twitter_location} id='tloc' alt="" />{this.state.city}, {this.state.state}</p>
                        <button onClick={this.showFollowersModal} className='btn btn-' id='followers'>{this.state.followers.length} Followers</button>
                        <button onClick={this.showFollowingModal} className='btn btn-' id='followers'>{this.state.following.length} Following</button>
                    </div>
                    <div className='col-4 float-right'>
                        {follow}
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    <li className="col-6 nav-item text-center">
                        <a className="nav-link font-weight-bold text-secondary " href="/user/profile">Tweets</a>
                    </li>
                    <li className="col-6 nav-item text-center">
                        <a className="nav-link font-weight-bold text-secondary" href="/user/profile/likes" >Likes</a>
                    </li>
                </ul>
                <ShowModal
                    showFollowersModal={this.showFollowersModal.bind(this)}
                    modalData={this.state.modalData}
                    showModal={this.state.showModal}
                />

            </div>
        )
    }
}
export default Profile