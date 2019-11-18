import React, { Component } from 'react';
import Tweet from './Tweet'
import './TweetHome.css'


class Tweets extends Component {

    constructor() {
        super()
        this.state = {
            
            Tweets: [
                {
                    id: '1',
                    userName: 'User1',
                    FullName: 'Userone',
                    TweetMessage: 'This is tweet message. This is tweet message This is tweet message This is tweet message This is tweet message. This is tweet message. This is tweet message This is tweet message This is tweet message This is tweet message'
                },
                {
                    id: '2',
                    userName: 'User2',
                    FullName: 'Usertwo',
                    TweetMessage: 'this is tweet message'
                },
                {
                    id: '3',
                    userName: 'User3',
                    FullName: 'Userthree',
                    TweetMessage: 'this is tweet message'
                },
                {
                    id: '4',
                    userName: 'User4',
                    FullName: 'Userfour',
                    TweetMessage: 'this is tweet message'
                },
                {
                    id: '5',
                    userName: 'User5',
                    FullName: 'Userfive',
                    TweetMessage: 'this is tweet message'
                },
            ]
        }
    }
    render() {

        let tweet = ""
        tweet = this.state.Tweets.map((tweet,index) => {
            return (
                <Tweet
                    key={index}
                    tweetIndividual={tweet}
                // visitTweet={this.visitTweeet.bind(this)}
                />
            )
        })
        return (
            <div>
                {tweet}
            </div>
        );
    }
}

export default Tweets;