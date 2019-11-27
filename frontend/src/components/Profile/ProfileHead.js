import React, { Component } from "react";
import default_avatar from "../../images/default_avatar.png";
import twitter_header from '../../images/twitter_header.jpeg';
import twitter_location from '../../images/twitter_location.png'
import { Redirect } from 'react-router'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            profileImage: "",
            profileImagePreview: "",
        }
    }

    componentDidMount() {
        let data = {
            userName: localStorage.getItem("userName")
        }
        console.log("Inside get profile after component did mount", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/getProfile', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data[0])
                    this.setState({
                        firstName: response.data[0].firstName,
                        lastName: response.data[0].lastName,
                        email: response.data[0].userEmail,
                        gender: response.data[0].gender,
                        description: response.data[0].aboutMe,
                        userPhone: response.data[0].userPhone,
                        state: response.data[0].state,
                        city: response.data[0].city,
                        userZip: response.data[0].zipCode,
                        userName: response.data[0].userName
                    });
                    console.log("state updated", this.state)
                    console.log("Profile image name", response.data[0].userImage);
                    if (response.data[0].userImage) {
                        this.setState({
                            profileImagePreview: rootUrl + "/download-file/" + response.data[0].userImage
                        })
                    }
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");
                // alert("User credentials not valid. Please try again!");
            })
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        let profileImageData = <img src={default_avatar} alt="logo" />
        if (this.state.profileImagePreview) {
            profileImageData = <img src={this.state.profileImagePreview} alt="logo" />
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
                    <img src={twitter_header} className="img-fluid" id="theader" alt="" />
                    <div className="align-items-right profile-heading picContainer">
                        {profileImageData}
                    </div>
                    <div className='col-12 float-right'>
                        <a href='/user/editprofile' id="editprofile" className="float-right"><h6>Edit Profile</h6> </a>
                    </div>
                </div>
                <div className='row profile-row align-items-left"'>
                    <div className='col-8 text-left' >
                        <h5 className='font-weight-bold'>{this.state.firstName} {this.state.lastName}</h5>
                        <h6 className='text-secondary'>@{this.state.userName}</h6>
                        <p id="desc">{this.state.description}</p>
                        <p id="desc"><img src={twitter_location} id='tloc' alt="" />{this.state.city}, {this.state.state}</p>
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
            </div>
        )
    }
}
export default Profile
