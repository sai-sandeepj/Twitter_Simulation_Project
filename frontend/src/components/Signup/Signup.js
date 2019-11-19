import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import twitterlogo from "../../images/twitterlogo.png";
import default_avatar from "../../images/default_avatar.png";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const zipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/
const UNRegEx = /^[a-zA-Z0-9_]{1,15}$/

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required"),
    lastName: Yup.string()
        .required("Last name is required"),
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required"),
    description: Yup.string()
        .required("Description is required"),
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

class SignUp extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid" id="signup">
                    <div className="row align-items-center h-100 ">
                        <div className="col-md-4 mx-auto">
                            <div className="card shadow p-3 mb-5 rounded">
                                <div className="card-body">
                                    <img id="twitterlogo" alt="" src={twitterlogo} /> &nbsp;
                                    <h4 className="text-black text-left font-weight-bold">Create your account!</h4>
                                    <br />
                                    <Formik
                                        initialValues={{
                                            firstName: "",
                                            lastName: "",
                                            password: "",
                                            email: "",
                                            description: "",
                                            state: "",
                                            city: "",
                                            userZip: "",
                                            userName: ""
                                        }}
                                        validationSchema={SignUpSchema}
                                        onSubmit={(values, actions) => {
                                            this.submitSignup(values)
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
                                                    <label htmlFor="password">Password (8 character minimum)</label>
                                                    <Field
                                                        type="password"
                                                        name="password"
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
                                                    <select
                                                        name="color"
                                                        value=""
                                                        style={{ display: 'block' }}
                                                    >
                                                        <option value="" label="Select a State" />
                                                        <option value="">N/A</option>
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
                                                    </select>
                                                    {errors.color &&
                                                        touched.color &&
                                                        <div className="input-feedback">
                                                            {errors.color}
                                                        </div>}
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
                                                    <img src={default_avatar} alt="logo" />
                                                </div>
                                                <br />
                                                <button
                                                    type="submit"
                                                    id="twitterbutton"
                                                    className="btn btn-block text-white font-weight-bold"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Please wait..." : "Sign Up"}
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>

                                    <br />
                                    Already have an account?&nbsp;<Link to="/login">Sign in!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default SignUp;


