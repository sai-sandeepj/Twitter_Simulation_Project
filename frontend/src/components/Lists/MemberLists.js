import React, { Component } from 'react';
import Search from '../Search/Search';
import SidePanel from '../SidePanel/SidePanel';
import ListNav from './ListNav';
import axios from 'axios';
import rootUrl from '../Config/Settings';
import swal from "sweetalert";
import ListCards from './ListCards';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lists: []
        }
    }
    componentDidMount() {
        let data = {
            userName: localStorage.getItem('userName')
        }
        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post(rootUrl + '/getUserMemberOfLists', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data);
                    this.setState({
                        lists: response.data
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
                    <h5 className='font-weight-bold'> You haven’t been added to any Lists yet</h5>
                    <p className="text-secondary"> When someone adds you to a List, it’ll show up here.</p>
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
                    <div className='row '>
                        {listcards}
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