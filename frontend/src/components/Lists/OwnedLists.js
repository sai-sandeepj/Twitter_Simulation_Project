import React, { Component } from 'react';
import Search from '../Search/Search';
import SidePanel from '../SidePanel/SidePanel';
import ListNav from './ListNav';
import axios from 'axios';
import rootUrl from '../Config/Settings';
import swal from "sweetalert";
import { Redirect } from 'react-router';
import ListCards from './ListCards';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
    }

    componentDidMount() {
        let data
        if (this.props.location.state) {
            data = {
                // userName: localStorage.getItem('userName')
                userName: this.props.location.state.userName
            }
        }
        else {
            data = {
                userName: localStorage.getItem('userName')
                // userName: this.props.location.state.userName
            }
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/getListsbyUserName', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    this.setState({
                        lists: response.data
                    })
                }
                console.log("state in lists", this.state.lists)
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
        let listcards
        if (this.state.lists.length > 0) {
            listcards = this.state.lists.map((list, index) => {
                return (<ListCards
                    key={list._id}
                    list={list}
                />)
            })
        }
        else {
            listcards =
                <div className="col text-center ">
                    <h5 className='font-weight-bold'> You haven’t created any Lists yet</h5>
                    <p className="text-secondary"> When you do, it’ll show up here.</p>
                </div>
        }

        return (
            <div className='row'>
                <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                </div>
                <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                    <SidePanel />
                </div>
                <div className='col-8 col-sm-8 col-md-7 col-lg-5 col-xl-5' id='center'>
                    <ListNav />
                    <br />
                    {listcards}
                </div>
                <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                    <Search />
                </div>
            </div>
        );
    }
}

export default Home;