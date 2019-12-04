import React, { Component } from 'react';
import Search from '../Search/Search'
import SidePanel from '../SidePanel/SidePanel'
import { Redirect } from 'react-router'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import rootUrl from '../Config/Settings';
import swal from "sweetalert";
import default_avatar from "../../images/default_avatar.png";

const ListSchema = Yup.object().shape({
    searchName: Yup.string()
        .required("Enter something to search!")
});

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: '',
            searchResults: [],
            redirectBack: null
        }
        this.submitSearch = this.submitSearch.bind(this)
        this.addMember = this.addMember.bind(this)
    }

    submitSearch(details) {
        let data = {
            findName: details.searchName
        }
        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/findUsers', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        searchResults: response.data,

                    })
                    console.log('search results', this.state.searchResults)
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("OOps...", "Something went wrong! Please try again.", "error");
            })
    }

    addMember(details) {
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
        axios.post(rootUrl + '/addMembersToList', data)
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
        let searchResults = null;
        let profileImagePreview
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        let list = this.props.location.state.list;
        console.log("list in list page", list)
        if (this.state.searchResults.length > 0) {
            searchResults = this.state.searchResults.map((result, index) => {
                if (result.profileImage) {
                    profileImagePreview = { source: rootUrl + "/download-file/" + result.profileImage }
                }
                else {
                    profileImagePreview = { source: null }
                }
                let profileImageData = <img src={default_avatar} class="card-img-top" id="card-img-top" alt="logo" />
                if (profileImagePreview.source) {
                    profileImageData = <img src={profileImagePreview.source} class="card-img-top" id="card-img-top" alt="logo" />
                }
                return (<div className="card text-left">
                    {profileImageData}
                    <div className="card-body">
                        <p className="card-text font-weight-bold">{result.firstName} {result.lastName}</p>
                        <p className="card-text text-secondary">@{result.userName}</p>
                        <button className="btn btn-outline-primary" onClick={() => this.addMember(result)}>Add</button>
                    </div>
                </div>
                )
            })
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
                            <h4 className='font-weight-bold'>Add Members to {list.listName}</h4>
                            <h6 className='text-secondary'>@{list.userName}</h6>
                        </div>
                    </div>
                    <br />
                    <div className='row '>
                        <Formik
                            initialValues={this.state}
                            validationSchema={ListSchema}
                            onSubmit={(values, actions) => {
                                this.submitSearch(values)
                                actions.setSubmitting(false);
                            }}
                        >
                            {({ touched, errors }) => (
                                <Form>
                                    <div className="form-group text-left">
                                        <Field
                                            type="text"
                                            name="searchName"
                                            placeholder="Search for People"
                                            className={`form-control ${
                                                touched.searchName && errors.searchName ? "is-invalid" : ""
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="searchName"
                                            align="text-left"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        id="twitterbutton"
                                        className="btn btn-block text-white font-weight-bold"
                                    >
                                        Search
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <br />
                    <div className="row">
                        {searchResults}
                    </div>
                </div>
                <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                    <Search />
                </div>
            </div >
        );
    }
}

export default Home;