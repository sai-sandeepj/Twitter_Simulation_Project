import React, { Component } from 'react';
import Search from '../Search/Search'
import SidePanel from '../SidePanel/SidePanel'
import { Redirect } from 'react-router'
import default_avatar from "../../images/default_avatar.png";
import axios from 'axios';
import rootUrl from '../Config/Settings';
import swal from "sweetalert";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectBack: null
        }
        this.deleteMember = this.deleteMember.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('userName') === this.props.location.state.list.userName) {
            this.props.location.state.list.members.map((member, index) => {
                document.getElementById(member.userName).style.visibility = "visible"
            })
        }
        else {
            this.props.location.state.list.members.map((member, index) => {
                document.getElementById(member.userName).style.visibility = "hidden"
            })
        }
    }

    deleteMember(details) {
        let data = {
            memberUserName: details.userName,
            memberFirstName: details.firstName,
            memberLastName: details.lastName,
            memberProfileImage: details.profileImage,
            listId: this.props.location.state.list._id
        }
        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post(rootUrl + '/deleteMemberFromList', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        redirectBack: <Redirect to="/user/lists/owned" />
                    })
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("OOps...", "Something went wrong! Please try again.", "error");
            })
    }
    render() {
        let redirectVar = null;
        let members = null;
        let profileImagePreview = null;

        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }

        if (this.props.location.state.list.members.length > 0) {
            members = this.props.location.state.list.members.map((member, index) => {
                if (member.profileImage) {
                    profileImagePreview = { source: rootUrl + "/download-file/" + member.profileImage }
                }
                else {
                    profileImagePreview = { source: null }
                }
                let profileImageData = <img src={default_avatar} className="card-img-top" id="card-img-top" alt="logo" />
                if (profileImagePreview.source) {
                    profileImageData = <img src={profileImagePreview.source} className="card-img-top" id="card-img-top" alt="logo" />
                }
                return (<div className="card text-left">
                    {profileImageData}
                    <div className="card-body">
                        <p className="card-text font-weight-bold">{member.firstName} {member.lastName}</p>
                        <p className="card-text text-secondary">@{member.userName}</p>
                        <button className="btn btn-outline-danger" id={member.userName} onClick={() => this.deleteMember(member)}>Delete</button>
                    </div>
                </div>
                )
            })
        }
        else {
            members = <div className="col text-center ">
                <h5 className='font-weight-bold'>There isn't anyone in this List</h5>
                <p className="text-secondary">When people get added, they'll show up here.</p>
            </div>
        }
        return (
            <div className='row'>
                {redirectVar}
                {this.state.redirectBack}
                <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                </div>
                <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                    <SidePanel />
                </div>
                <div className='col-8 col-sm-8 col-md-7 col-lg-5 col-xl-5' id='center'>
                    <div className='row '>
                        <div className='col-10 text-left' >
                            <h4 className='font-weight-bold'>Members in {this.props.location.state.list.listName}</h4>
                            <h6 className='text-secondary'>@{this.props.location.state.list.userName}</h6>
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        {members}
                    </div>
                </div>
                <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                    <Search />
                </div>
            </div>
        );
    }
}

export default Home;