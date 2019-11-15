import React, { Component } from 'react';
import NewTweet from '../Tweet/NewTweet'
import Search from '../Search/Search'
import './Home.css'
import TweetHome from '../HomeTweets/TweetHome'

class Home extends Component {
    state = {}
    render() {
        return (
            <div className='container' data-spy="scroll">
                <div id='center'>
                    <NewTweet /><br />
                    <TweetHome/>
                </div>
                <Search />
            </div>
        );
    }
}

export default Home;