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
            retweets: null,
            userDetails: {
                userName: localStorage.getItem('userName'),
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName'),
                userImage: localStorage.getItem('userImage'),
                userEmail: localStorage.getItem('userEmail'),
                aboutMe: localStorage.getItem('aboutMe')
            },
            bookmarked: null
        }
    }

    componentWillMount = () => {
        let userName = localStorage.getItem('userName')
        const data = {
            userName: userName
        }
        axios.post(rootUrl + '/getAllTweetsFollowing', data)
            .then(response => {
                console.log('tweets response data:', response.data)
                if (response.status === 200) {
                    let tweets = response.data
<<<<<<< HEAD
                    axios.post(rootUrl + '/getUserLikedTweetIds', data)
                        .then(response => {
                            console.log('liked data:', response.data)
                            if (response.status === 200) {

                                let liked = response.data
                                axios.post(rootUrl + '/getUserRetweetIds', data)
                                    .then(response => {
                                        console.log('retweet data:', response.data)
                                        if (response.status === 200) {

                                            let retweets = response.data
                                            this.setState({
                                                liked: liked,
                                                tweets: tweets,
                                                retweets: retweets
                                            })
                                        }
                                        else {
                                            console.log("Didn't fetch retweets data")
=======
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
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
                                        }
                                    }).catch((err) => {
                                        if (err) {
                                            swal('erroer connecting to database')
                                        }
                                    });
                            }
                            else {
<<<<<<< HEAD
                                console.log("Didn't fetch liked tweets data")
=======
                                console.log("Didn't fetch bookmarked tweets data")
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
                            }
                        }).catch((err) => {
                            if (err) {
                                swal('erroer connecting to database')
                            }
                        });
<<<<<<< HEAD

                    console.log("Tweets", this.state.tweets)
=======
                    console.log("Tweets", this.state.Tweets)
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
                }
                else {
                    console.log("Didn't fetch tweets data")
                }
            }).catch((err) => {
                if (err) {
                    swal('erroer connecting to database')
<<<<<<< HEAD
                }
            });
    }

    likeTweet = (tweetId) => {
        console.log('in like tweet method');
        let data = {
            tweetId: tweetId,
            userName: localStorage.getItem('userName'),
            userEmail: localStorage.getItem("userEmail"),
            userImage: localStorage.getItem("userImage"),
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            aboutMe: localStorage.getItem("aboutMe")
        }
        console.log(data);
        axios.post(rootUrl + '/likeATweet', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data);
                    data = {
                        userName: localStorage.getItem('userName')
                    }
                    axios.post(rootUrl + '/getUserLikedTweetIds', data)
                        .then(response => {
                            console.log('liked data:', response.data)
                            if (response.status === 200) {

                                let liked = response.data
                                axios.post(rootUrl + '/getAllTweetsFollowing', data)
                                    .then(response => {
                                        console.log('tweets response data:', response.data)
                                        if (response.status === 200) {
                                            let tweets = response.data
                                            this.setState({
                                                liked: liked,
                                                tweets: tweets
                                            })
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
                            else {
                                console.log("Didn't fetch liked tweets data")
                            }
                        }).catch((err) => {
                            if (err) {
                                swal('erroer connecting to database')
                            }
                        });
=======
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");

            })
    }

    retweetWithoutComment = (tweetId) => {
        console.log('in retweet without comment method');
        if (localStorage.getItem('userName')) {
            let data = {
                tweetId: tweetId,
                userName: localStorage.getItem('userName'),
                userEmail: localStorage.getItem("userEmail"),
                userImage: localStorage.getItem("userImage"),
                firstName: localStorage.getItem("firstName"),
                lastName: localStorage.getItem("lastName"),
                aboutMe: localStorage.getItem("aboutMe")
            }
            console.log(data);
            axios.post(rootUrl + '/retweetWithoutComment', data)
                .then(response => {
                    console.log("inside success")
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data);
                        data = {
                            userName: localStorage.getItem('userName')
                        }
                        axios.post(rootUrl + '/getUserRetweetIds', data)
                            .then(response => {
                                console.log('retweets data:', response.data)
                                if (response.status === 200) {

                                    let retweets = response.data
                                    axios.post(rootUrl + '/getAllTweetsFollowing', data)
                                        .then(response => {
                                            console.log('tweets response data:', response.data)
                                            if (response.status === 200) {
                                                let tweets = response.data
                                                this.setState({
                                                    retweets: retweets,
                                                    tweets: tweets
                                                })
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
                                else {
                                    console.log("Didn't fetch retweets data")
                                }
                            }).catch((err) => {
                                if (err) {
                                    swal('erroer connecting to database')
                                }
                            });
                    }
                })
                .catch(error => {
                    console.log("In error");
                    swal("Oops...", "Something went wrong! Please try again later", "error");

                })
        }
    }
    retweetWithComment = () => {
        const data = {
            userName: localStorage.getItem('userName')
        }
        axios.post(rootUrl + '/getAllTweetsFollowing', data)
            .then(response => {
                console.log('tweets response data:', response.data)
                if (response.status === 200) {
                    let tweets = response.data
                    this.setState({
                        tweets: tweets
                    })
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
<<<<<<< HEAD
        console.log(this.state.tweets);

=======
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
        if (this.state.tweets) {
            tweet = this.state.tweets.map((tweet, index) => {
                return (
                    <Tweet
                        key={index}
                        tweetIndividual={tweet}
<<<<<<< HEAD
                        onDataLoaded={this.forceUpdate}
                        liked={this.state.liked}
                        retweets={this.state.retweets}
                        likeTweet={this.likeTweet.bind(this)}
                        retweetWithComment={this.retweetWithComment.bind(this)}
                        retweetWithoutComment={this.retweetWithoutComment.bind(this)}
                        userDetails={this.state.userDetails}
=======
                        liked = {this.state.liked}
                        bookmarked = {this.state.bookmarked}
                        userDetails={this.props.userDetails}
                    // visitTweet={this.visitTweeet.bind(this)}
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
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