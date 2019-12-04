import React, { Component } from 'react';
import Search from '../Search/Search';
import SidePanel from '../SidePanel/SidePanel';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import rootUrl from '../Config/Settings';
import swal from "sweetalert";
import { Redirect } from 'react-router';

const ListSchema = Yup.object().shape({
    listName: Yup.string()
        .required("Your list should have a name!")
});



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authFlag: null,
            listName: this.props.location.state.list.listName,
            description: this.props.location.state.list.description
        }
        this.submitList = this.submitList.bind(this)
    }

    submitList(details) {
        let data = {
            listId: this.props.location.state.list._id,
            listName: details.listName,
            description: details.description
        }
        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/editList', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        authFlag: true
                    })
                    swal("Successful", "List edited succesfully", "success");
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
        if (this.state.authFlag === true) {
            redirectVar = <Redirect to="/user/lists/owned" />
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
                    <div className='col-4 text-left' >
                        <h4 className='font-weight-bold'>Edit List</h4>
                        <h6 className='text-secondary'>@{this.props.location.state.list.userName}</h6>
                    </div>
                    <br />
                    <div className="col-md-10">
                        <div>
                            <Formik
                                initialValues={this.state}
                                validationSchema={ListSchema}
                                onSubmit={(values, actions) => {
                                    this.submitList(values)
                                    actions.setSubmitting(false);
                                }}
                            >
                                {({ touched, errors }) => (
                                    <Form>
                                        <div className="form-group text-left">
                                            <Field
                                                type="text"
                                                name="listName"
                                                placeholder="List Name"
                                                className={`form-control ${
                                                    touched.listName && errors.listName ? "is-invalid" : ""
                                                    }`}
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="listName"
                                                align="text-left"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group text-left">
                                            <Field
                                                type="text"
                                                name="description"
                                                placeholder="Description"
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

                                        <button
                                            type="submit"
                                            id="twitterbutton"
                                            className="btn btn-block text-white font-weight-bold"
                                        >
                                            Save
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
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