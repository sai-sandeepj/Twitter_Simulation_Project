import React, { Component } from "react";
import twitterhomepage from "../../images/twitterhomepage.png";
import { Redirect } from 'react-router';
import axios from 'axios';
import rootUrl from '../Config/Settings';
import swal from "sweetalert";
import twitterlogo from "../../images/twitterlogo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
});


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authFlag: ""
        }
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin = (details) => {

        const authToken = "JWT " + localStorage.getItem("token");

        const jwt = localStorage.getItem("token");
        console.log();
        const data = {
            userEmail: details.email,
            userPassword: details.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/login', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    localStorage.setItem('token', response.data);
                    localStorage.setItem('authToken', `JWT ${response.data}`);
                    const decoded = jwtDecode(response.data);
                    localStorage.setItem("userName", decoded.userName)
                    localStorage.setItem("userEmail", decoded.userEmail)
                    localStorage.setItem("userImage", decoded.userImage)
                    localStorage.setItem("firstName", decoded.firstName)
                    localStorage.setItem("lastName", decoded.lastName)
                    localStorage.setItem("aboutMe", decoded.aboutMe)
                    localStorage.setItem("userName", response.data.userName)
                    localStorage.setItem("userEmail", response.data.userEmail)
                    localStorage.setItem("userImage", response.data.userImage)
                    localStorage.setItem("firstName", response.data.firstName)
                    localStorage.setItem("lastName", response.data.lastName)
                    localStorage.setItem("aboutMe", response.data.aboutMe)
                    this.setState({
                        authFlag: true
                    })
                }
                console.log(this.state.authFlag)
            })
            .catch(error => {
                console.log("In error");
                this.setState({
                    authFlag: false
                });
                console.log(error);
                swal("OOps...", "User credentials not valid.", "error");
            })

    }
    render() {
        let redirectVar = null;
        if (localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/user/home' />
        }
        return (
            <div className="container-fluid">
                {redirectVar}
                <div className="row align-items-center">
                    <div className="col-md-6-fluid">
                        <img className="img-responsive fit-image" alt="" src={twitterhomepage} />
                    </div>
                    <div className="col-md-4 mx-auto">
                        <div>
                            <Formik
                                initialValues={this.state}
                                validationSchema={LoginSchema}
                                onSubmit={(values, actions) => {
                                    this.submitLogin(values)
                                    actions.setSubmitting(false);
                                }}
                            >
                                {({ touched, errors }) => (
                                    <Form>
                                        <div className="form-group text-left">
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Email"
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
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                className={`form-control ${
                                                    touched.password && errors.password ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="password"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            id="twitterbutton"
                                            className="btn btn-block text-white font-weight-bold"
                                        >
                                            Sign in
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <br /> <h6>Don't have an account?</h6>
                        <div className="row align-items-left">
                            <img id="twitterlogo" alt="" src={twitterlogo} />
                        </div>
                        <div >
                            <h3 className="text-black text-left font-weight-bold">See what’s happening in<br /> the world right now </h3> <br />
                            <h5 className="text-black text-left font-weight-bold">Join Twitter today.</h5>
                        </div>
                        <div className="row align-items-left">
                            <a href="/signup" id="twitterbutton" className="btn btn-block text-white font-weight-bold">Sign Up</a>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
export default Login;