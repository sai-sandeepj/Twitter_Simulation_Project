import React, { Component } from 'react';
import NewTweet from '../Tweet/NewTweet'
import Search from '../Search/Search'
import './Home.css'
import TweetHome from '../HomeTweets/TweetHome'

class Home extends Component {
    state = {}
    render() {
        return (
            <div data-spy="scroll">
                <div id='center'>
                    <NewTweet />
                    <TweetHome/>
                </div>
                <Search />
            </div>
        );
    }
}

export default Home;