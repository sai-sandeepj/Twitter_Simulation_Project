import React, { Component } from 'react';
import Search from '../Search/Search'
import SidePanel from '../SidePanel/SidePanel'
import { Redirect } from 'react-router'
import default_avatar from "../../images/default_avatar.png";
import rootUrl from '../Config/Settings';

class Home extends Component {
    state = {}
    render() {
        let redirectVar = null;
        let subscribers = null;
        let profileImagePreview = null;
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        if (this.props.location.state.list.subscribers.length > 0) {
            subscribers = this.props.location.state.list.subscribers.map((subscriber, index) => {
                if (subscriber.profileImage) {
                    profileImagePreview = { source: rootUrl + "/download-file/" + subscriber.profileImage }
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
                        <p className="card-text font-weight-bold">{subscriber.firstName} {subscriber.lastName}</p>
                        <p className="card-text text-secondary">@{subscriber.userName}</p>
                    </div>
                </div>
                )
            })
        }
        else {
            subscribers = <div className="col text-center ">
                <h5 className='font-weight-bold'>There aren’t any subscribers of this List</h5>
                <p className="text-secondary">When people subscribe, they'll show up here.</p>
            </div>
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
                        <div className='col-10 text-left' >
                            <h4 className='font-weight-bold'>Subscribers of {this.props.location.state.list.listName}</h4>
                            <h6 className='text-secondary'>@{this.props.location.state.list.userName}</h6>
                        </div>
                        {/* <div className='col-10 float-right'>
                            <a href='/lists/create'><h6 className="float-right">Clear all Bookmarks</h6> </a>
                        </div> */}
                    </div>
                    <br />
                    <div className='row '>
                        {subscribers}
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