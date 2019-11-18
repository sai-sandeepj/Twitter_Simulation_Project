import React, { Component } from "react";
import twitterhomepage from "../../images/twitterhomepage.png";
// import { Redirect } from 'react-router';
import twitterlogo from "../../images/twitterlogo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
            password: ""
        }
    }
    render() {
        return (
            <div className="container-fluid">
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
