import React, { Component } from 'react';
import Tweet from '../HomeTweets/Tweet';
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import SidePanel from '../SidePanel/SidePanel'
import Search from '../Search/Search'
// import SearchByHashtag from './SearchByHashtag'
import { Redirect } from 'react-router'


class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tweets: this.props.location.state,
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
                                let data1 = {
                                    hashTag: localStorage.getItem('searchElement')
                                }
                                axios.post(rootUrl + '/searchByHashTag', data1)
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
                        data = {
                            userName: localStorage.getItem('userName')
                        }
                        axios.post(rootUrl + '/getUserRetweetIds', data)
                            .then(response => {
                                console.log('retweets data:', response.data)
                                if (response.status === 200) {

                                    let retweets = response.data
                                    let data1 = {
                                        hashTag: localStorage.getItem('searchElement')
                                    }
                                    axios.post(rootUrl + '/searchByHashTag', data1)
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
        let data1 = {
            hashTag: localStorage.getItem('searchElement')
        }
        axios.post(rootUrl + '/searchByHashTag', data1)
            .then(response => {
                console.log('tweets response data:', response.data)
                if (response.status === 200) {
                    let tweets = response.data
                    axios.post(rootUrl + '/getUserRetweetIds', data)
                        .then(response => {
                            console.log('retweets data:', response.data)
                            if (response.status === 200) {

                                let retweets = response.data
                                this.setState({
                                    tweets: tweets,
                                    retweets: retweets
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
        let redirectVar


        console.log('this.state.tweets search results', this.state.tweets);
        if (!localStorage.getItem('searchresults')) {
            redirectVar = <Redirect to='/' />
        }
        // console.log(typeof localStorage.getItem('searchresults'));
        if (localStorage.getItem('searchresults')) {
            // localStorage.removeItem('searchresults')
            tweet = this.state.tweets.map((tweet, index) => {
                return (
                    <Tweet
                        key={index}
                        tweetIndividual={tweet}
                        onDataLoaded={this.forceUpdate}
                        liked={this.state.liked}
                        retweets={this.state.retweets}
                        likeTweet={this.likeTweet.bind(this)}
                        retweetWithComment={this.retweetWithComment.bind(this)}
                        retweetWithoutComment={this.retweetWithoutComment.bind(this)}
                        userDetails={this.state.userDetails}
                    />
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <div className='row'>
                    <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                    </div>
                    <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                        <SidePanel />
                    </div>
                    <div className='col-8 col-sm-8 col-md-7 col-lg-5 col-xl-5' id='center'>

                        <h4 id='home-font-styling'>Search by #Hashtag</h4><br />
                        {/* <SearchByHashtag /> */}
                        {tweet}
                    </div>
                    <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                        <Search />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResults;