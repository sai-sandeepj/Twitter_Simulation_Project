import React, { Component } from 'react';
import NewTweet from '../Tweet/NewTweet'
import Search from '../Search/Search'
import './Home.css'
import TweetHome from '../HomeTweets/TweetHome'
import SidePanel from '../SidePanel/SidePanel'
import { Redirect } from 'react-router'

class Home extends Component {
    state = {}
    componentDidMount = () => {

    }
    render() {
        let redirectVar = null;
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        return (
            <div class='row'>
                {redirectVar}
                <div className='row'>
                    <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                    </div>
                    <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                        <SidePanel />
                    </div>
                    <div className='col-8 col-sm-8 col-md-7 col-lg-5 col-xl-5' id='center'>
                        <h4 id='home-font-styling'>Home</h4>
                        <NewTweet />
                        <TweetHome />
                    </div>
                    <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                        <Search />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;