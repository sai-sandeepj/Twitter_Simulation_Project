import React, { Component } from 'react';
import Search from '../Search/Search'
import SidePanel from '../SidePanel/SidePanel'
import { Redirect } from 'react-router'
import { Formik, Form, Field, ErrorMessage } from "formik";
import default_avatar from "../../images/default_avatar.png";
import * as Yup from "yup";
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"

const zipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/
const UNRegEx = /^[a-zA-Z0-9_]{1,15}$/
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const ProfileSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required"),
    lastName: Yup.string()
        .required("Last name is required"),
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    gender: Yup.string()
        .required("Gender is required"),
    description: Yup.string()
        .required("Description is required"),
    userPhone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required("Phone number is required")
        .nullable(),
    state: Yup.string()
        .required("State is required"),
    city: Yup.string()
        .required("City is required"),
    userZip: Yup.string()
        .matches(zipRegEx, "Zip code is not valid")
        .required("ZIP code is required"),
    userName: Yup.string()
        .matches(UNRegEx, "User name is not valid")
        .required("User name is required")
});


class Home extends Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            description: "",
            userPhone: "",
            state: "",
            city: "",
            userZip: "",
            userName: ""
        }
        this.handleChange = this.handleChange.bind(this)
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
                    console.log("response", response.data[0][0])
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
                        profileImage: response.data[0][0].userImage
                    });
                    console.log("state updated", this.state)
                    console.log("Profile image name", response.data[0][0].userImage);
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
                // alert("User credentials not valid. Please try again!");
            })
    }

    //handle change of profile image
    handleChange = (e) => {
        const target = e.target;
        const name = target.name;

        if (name === "ProfileImage") {
            console.log(target.files);
            var profilePhoto = target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            axios.post(rootUrl + '/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);
                        if (profilePhoto.name) {
                            this.setState({
                                profileImage: profilePhoto.name,
                                profileImagePreview: rootUrl + "/download-file/" + profilePhoto.name
                            })
                        }

                    }
                });
        }
    }

    submitProfile = (details) => {
        console.log("Inside profile update", details);
        const data = {
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.userEmail,
            gender: details.gender,
            description: details.aboutMe,
            userPhone: details.userPhone,
            state: details.state,
            city: details.city,
            userZip: details.zipCode,
            userName: details.userName,
            userImage: this.state.profileImage

        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/updateProfile', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("success", response)
                    localStorage.setItem("userName", data.userName)
                    swal("Success", "Profile update succesfully", "success");
                    // alert("success")
                    // console.log(response)
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                // alert("Update failed! Please try again")
                swal("Oops...", "Something went wrong! Please try again later", "error");
            })
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        console.log("profile image preview", this.state.profileImagePreview)
        let profileImageData = <img src={default_avatar} alt="logo" />
        if (this.state.profileImagePreview) {
            profileImageData = <img src={this.state.profileImagePreview} alt="logo" />
        }
        return (
            <div className='row'>
                {redirectVar}
                <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                </div>
                <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                    <SidePanel />
                </div>
                <div className='col-8 col-sm-8 col-md-7 col-lg-5 col-xl-5' id='center'>
                    <div className='row '>
                        <div className='col-6 text-left' >
                            <h4 className='font-weight-bold'>Edit Your Profile</h4>
                            <h5 className='text-secondary'>@{this.state.userName}</h5>
                        </div>
                    </div>
                    <br />
                    <Formik
                        enableReinitialize
                        initialValues={{
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            email: this.state.email,
                            gender: this.state.gender,
                            description: this.state.description,
                            userPhone: this.state.userPhone,
                            state: this.state.state,
                            city: this.state.city,
                            userZip: this.state.userZip,
                            userName: this.state.userName
                        }}
                        validationSchema={ProfileSchema}
                        onSubmit={(values, actions) => {
                            this.submitProfile(values)
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ touched, errors, isSubmitting }) => (
                            <Form>
                                <div className="form-group text-left">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        className={`form-control ${
                                            touched.firstName && errors.firstName ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="firstName"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        className={`form-control ${
                                            touched.lastName && errors.lastName ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="lastName"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className={`form-control ${
                                            touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="email"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="gender">Gender</label> &nbsp;
                                                    <Field
                                        name="gender"
                                        component="select"
                                        placeholder="Your Gender"
                                        className={`form-control ${
                                            touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                    >
                                        <option value="" label="Select your Gender" />
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>

                                    </Field>
                                    <ErrorMessage
                                        component="div"
                                        name="gender"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="userPhone">Phone number</label>
                                    <Field
                                        type="text"
                                        name="userPhone"
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.userPhone && errors.userPhone ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="userPhone"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="description">Describe yourself!</label>
                                    <Field
                                        type="text"
                                        name="description"
                                        className={`form-control ${
                                            touched.description && errors.description ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="description"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="state">State</label> &nbsp;
                                                    <Field
                                        name="state"
                                        component="select"
                                        className={`form-control ${
                                            touched.state && errors.state ? "is-invalid" : ""
                                            }`}
                                    >
                                        <option value="" label="Select a State" />
                                        <option value="AK">Alaska</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DC">District of Columbia</option>
                                        <option value="DE">Delaware</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="IA">Iowa</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MD">Maryland</option>
                                        <option value="ME">Maine</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MT">Montana</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NY">New York</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VA">Virginia</option>
                                        <option value="VT">Vermont</option>
                                        <option value="WA">Washington</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WY">Wyoming</option>
                                    </Field>
                                    <ErrorMessage
                                        component="div"
                                        name="state"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="city">City</label>
                                    <Field
                                        type="text"
                                        name="city"
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.city && errors.city ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="city"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="userZip">ZIP Code</label>
                                    <Field
                                        type="text"
                                        name="userZip"
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.userZip && errors.userZip ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="userZip"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left">
                                    <label htmlFor="userName">User Name</label>
                                    <Field
                                        type="userName"
                                        name="userName"
                                        className={`form-control ${
                                            touched.userName && errors.userName ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="userName"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left" id="profileImage">
                                    <label htmlFor="ProfileImage" >Profile Image :</label><br />
                                    <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-sm photo-upload-btn" onChange={this.handleChange} />
                                </div>
                                <div className="align-items-right profile-heading">
                                    {profileImageData}
                                </div>
                                <br />
                                <button
                                    type="submit"
                                    id="twitterbutton"
                                    className="btn btn-block text-white font-weight-bold"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Please wait..." : "Update Profile"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                    <Search />
                </div>
            </div>
        );
    }
}

export default Home;