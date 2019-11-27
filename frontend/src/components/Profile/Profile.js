import React, { Component } from 'react';
import Search from '../Search/Search';
import SidePanel from '../SidePanel/SidePanel';
import ProfileNav from '../Profile/ProfileHead'
// import { Redirect } from 'react-router'
import TweetHome from '../HomeTweets/TweetHome'

class Home extends Component {
    render() {
        return (
            <div className='row'>
                <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                </div>
                <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                    <SidePanel />
                </div>
                <div className='col-10 col-sm-8 col-md-7 col-lg-5 col-xl-5' id='center'>
                    <ProfileNav />
                    <TweetHome />
                </div>
                <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                    <Search />
                </div>
            </div>
        )
    }
}
export default Home;