import React, { Component } from 'react';
import Search from '../Search/Search'
import SidePanel from '../SidePanel/SidePanel'
import { Redirect } from 'react-router';
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert";
import Tweet from '../HomeTweets/Tweet';


class Home extends Component {

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
            }
        }
    }

    componentWillMount = () => {
        let data
        data = {
            tweetId: this.props.match.params.id
        }
        let data1;
        data1 = {
            userName: localStorage.getItem('userName')
        }
        console.log("Inside follow usert", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/getTweet', data)
            .then(response => {
                console.log('tweets response data:', response.data)
                if (response.status === 200) {
                    let tweets = response.data
                    axios.post(rootUrl + '/getUserLikedTweetIds', data1)
                        .then(response => {
                            console.log('liked data:', response.data)
                            if (response.status === 200) {

                                let liked = response.data
                                axios.post(rootUrl + '/getUserRetweetIds', data1)
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

                    console.log("Tweets", this.state.tweets)
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
                    let data1 = {
                        userName: localStorage.getItem('userName')
                    }
                    axios.post(rootUrl + '/getUserLikedTweetIds', data1)
                        .then(response => {
                            console.log('liked data:', response.data)
                            if (response.status === 200) {

                                let liked = response.data
                                console.log("data in like tweet ", data)
                                axios.post(rootUrl + '/getTweet', data)
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
                        let data1 = {
                            userName: localStorage.getItem('userName')
                        }
                        axios.post(rootUrl + '/getUserRetweetIds', data1)
                            .then(response => {
                                console.log('retweets data:', response.data)
                                if (response.status === 200) {

                                    let retweets = response.data
                                    axios.post(rootUrl + '/getTweet', data)
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
        let data
        data = {
            tweetId: this.props.match.params.id
        }
        axios.post(rootUrl + '/getTweet', data)
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
        let redirectVar = null;
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        let tweet = ""
        console.log(this.state.tweets);

        if (this.state.tweets) {
            // tweet = this.state.tweets.map((tweet, index) => {
            tweet =
                <Tweet
                    // key={index}
                    tweetIndividual={this.state.tweets}
                    onDataLoaded={this.forceUpdate}
                    liked={this.state.liked}
                    retweets={this.state.retweets}
                    likeTweet={this.likeTweet.bind(this)}
                    retweetWithComment={this.retweetWithComment.bind(this)}
                    retweetWithoutComment={this.retweetWithoutComment.bind(this)}
                    userDetails={this.state.userDetails}
                />


            // })
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
                        <div className='col-2 text-left' >
                            <h4 className='font-weight-bold'>Tweet</h4>
                        </div>
                    </div>
                    <br />
                    <div className='row float-left'>
                        Tweet and commments
                       {tweet}
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