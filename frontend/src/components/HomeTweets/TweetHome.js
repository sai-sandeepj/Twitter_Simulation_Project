import React, { Component } from 'react';
import Tweet from './Tweet';
import './TweetHome.css';
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"

class Tweets extends Component {

    constructor() {
        super()
        this.state = {
            tweets: null,
            liked: null,
            bookmarked: null
        }

        //     Tweets: [
        //         {
        //             id: '1',
        //             userName: 'User1',
        //             FullName: 'Userone',
        //             TweetMessage: 'This is tweet message. This is tweet message This is tweet message This is tweet message This is tweet message. This is tweet message. This is tweet message This is tweet message This is tweet message This is tweet message'
        //         },
        //         {
        //             id: '2',
        //             userName: 'User2',
        //             FullName: 'Usertwo',
        //             TweetMessage: 'this is tweet message'
        //         },
        //         {
        //             id: '3',
        //             userName: 'User3',
        //             FullName: 'Userthree',
        //             TweetMessage: 'this is tweet message'
        //         },
        //         {
        //             id: '4',
        //             userName: 'User4',
        //             FullName: 'Userfour',
        //             TweetMessage: 'this is tweet message'
        //         },
        //         {
        //             id: '5',
        //             userName: 'User5',
        //             FullName: 'Userfive',
        //             TweetMessage: 'this is tweet message'
        //         },
        //     ]
        // }
    }

    componentDidMount = () => {
        let userName = localStorage.getItem('userName')
        const data = {
            userName: userName
        }
        axios.post(rootUrl + '/getUserTweets', data)
            .then(response => {
                console.log('tweets response data:', response.data)
                if (response.status === 200) {
                    let tweets = response.data
                    let liked = null
                    let bookmarked = null
                    axios.post(rootUrl + '/getUserBookmarkedTweets', data)
                        .then(response => {
                            console.log('bookmarked data:', response.data)
                            if (response.status === 200) {

                                bookmarked = response.data

                                axios.post(rootUrl + '/getUserLikedTweets', data)
                                    .then(response => {
                                        console.log('liked data:', response.data)
                                        if (response.status === 200) {

                                            liked = response.data
                                            this.setState({
                                                tweets: tweets,
                                                liked: liked,
                                                bookmarked: bookmarked
                                            })
                                        }
                                        else {
                                            console.log("Didn't fetch liked tweets data")
                                        }
                                    }).catch((err) => {
                                        if (err) {
                                            swal('erroer connecting to database')
                                        }
                                    });
                            }
                            else {
                                console.log("Didn't fetch bookmarked tweets data")
                            }
                        }).catch((err) => {
                            if (err) {
                                swal('erroer connecting to database')
                            }
                        });
                    console.log("Tweets", this.state.Tweets)
                }
                else {
                    console.log("Didn't fetch tweets data")
                }
            }).catch((err) => {
                if (err) {
                    swal('erroer connecting to database')
                }

            });
    }


    render() {

        let tweet = ""
        if (this.state.tweets) {
            tweet = this.state.tweets.map((tweet, index) => {
                return (
                    <Tweet
                        key={index}
                        tweetIndividual={tweet}
                        liked = {this.state.liked}
                        bookmarked = {this.state.bookmarked}
                        userDetails={this.props.userDetails}
                    // visitTweet={this.visitTweeet.bind(this)}
                    />
                )
            })
        }
        return (
            <div>
                {tweet}
            </div>
        );
    }
}

export default Tweets;