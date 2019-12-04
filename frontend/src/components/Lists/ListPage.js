import React, { Component } from "react"
import Search from '../Search/Search'
import SidePanel from '../SidePanel/SidePanel'
import { Redirect } from 'react-router'
import listbanner from '../../images/listbanner.PNG'
import { Link } from "react-router-dom";
import axios from 'axios';
import rootUrl from '../Config/Settings';
import swal from "sweetalert";
import Tweet from '../HomeTweets/Tweet';


class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectBack: "",
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
        this.deleteList = this.deleteList.bind(this)
        this.subscribeList = this.subscribeList.bind(this)
        this.unsubscribeList = this.unsubscribeList.bind(this);
    }

    componentWillMount = () => {
        let data
        data = {
            listId: this.props.location.state.list._id
        }
        let data1;
        data1 = {
            userName: localStorage.getItem('userName')
        }
        console.log("Inside follow usert", data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(rootUrl + '/getTweetsOfMembersInList', data)
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



    likeTweet = (listId) => {
        console.log('in like tweet method');
        let data = {
            listId: listId,
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
                                axios.post(rootUrl + '/getTweetsOfMembersInList', data)
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

    retweetWithoutComment = (listId) => {
        console.log('in retweet without comment method');
        if (localStorage.getItem('userName')) {
            let data = {
                listId: listId,
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
                                    axios.post(rootUrl + '/getTweetsOfMembersInList', data)
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
                    console.log("In error", error);
                    swal("Oops...", "Something went wrong! Please try again later", "error");

                })
        }
    }
    retweetWithComment = () => {
        let data
        data = {
            listId: this.props.location.state.list._id
        }
        axios.post(rootUrl + '/getTweetsOfMembersInList', data)
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


    deleteList(details) {
        let data = {
            listId: details
        }
        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post(rootUrl + '/deletelist', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    swal("Deleted", "List Deleted Successfully", "success")
                    this.setState({
                        redirectBack: <Redirect to="/user/lists/owned" />
                    })
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("OOps...", "Something went wrong! Please try again.", "error");
            })
    }

    subscribeList(details) {
        let data = {
            listId: details,
            memberUserName: localStorage.getItem("userName"),
            memberFirstName: localStorage.getItem("firstName"),
            memberLastName: localStorage.getItem("lastName"),
            memberProfileImage: localStorage.getItem('userImage')
        }
        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post(rootUrl + '/subscribeToList', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    swal("Subscribed", "Subscribed to list Successfully", "success")
                    this.setState({
                        redirectBack: <Redirect to="/user/lists/subscriptions" />
                    })
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("OOps...", "Something went wrong! Please try again.", "error");
            })
    }

    unsubscribeList(details) {
        let data = {
            listId: details,
            memberUserName: localStorage.getItem("userName"),
            memberFirstName: localStorage.getItem("firstName"),
            memberLastName: localStorage.getItem("lastName"),
            memberProfileImage: localStorage.getItem('userImage')
        }
        console.log(data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post(rootUrl + '/subscribeToList', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    swal("Unsubscribed", "Unsubscribed from list Successfully", "error")
                    this.setState({
                        redirectBack: <Redirect to="/user/lists/subscriptions" />
                    })
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("OOps...", "Something went wrong! Please try again.", "error");
            })
    }

    render() {
        let redirectVar = null;
        let description = null;
        let list = this.props.location.state.list;
        let count = 0;
        let listbuttons = null;
        if (localStorage.getItem("userName") === this.props.location.state.list.userName) {
            listbuttons = <div className="row">
                <div className="col-4">
                    <Link to={{
                        pathname: '/user/lists/listid/editlist',
                        state: {
                            list
                        }
                    }} className='btn btn-outline-primary btn-md float-right' id='tweet-button'>Edit List</Link>
                </div>
                <div className="col-4">
                    <Link to={{
                        pathname: '/user/lists/listid/addmembers',
                        state: {
                            list
                        }
                    }} className='btn btn-outline-primary btn-md float-center' id='tweet-button'>Add Members</Link>
                </div>
                <div className="col-4">
                    <button className='btn btn-outline-danger btn-md float-left' id='tweet-button' onClick={() => this.deleteList(list._id)}>Delete List</button>
                </div>
            </div>
        }
        else {
            for (let i = 0; i < this.props.location.state.list.subscribers.length; i++) {
                if (this.props.location.state.list.subscribers[i].userName === localStorage.getItem('userName')) {
                    count++;
                    break;
                }
                else {
                    continue;
                }
            }
            if (count !== 0) {
                listbuttons =
                    <div className="row">
                        <div className='col-4'></div>
                        <div className="col-4">
                            <button className='btn btn-outline-danger btn-md' id='tweet-button' onClick={() => this.unsubscribeList(list._id)}>Unsubscribe</button>
                        </div>
                        <div className='col-4'></div>
                    </div>
            }
            else {
                listbuttons =
                    <div className="row">
                        <div className='col-4'></div>
                        <div className="col-4">
                            <button className='btn btn-outline-primary btn-md' id='tweet-button' onClick={() => this.subscribeList(list._id)}>Subscribe</button>
                        </div>
                        <div className='col-4'></div>
                    </div>
            }

        }
        console.log("list in list page", list)
        if (list.description) {
            description = (<div className="text-secondary">
                &nbsp;{list.description}
            </div>)
        }
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        let tweet = ""
        console.log(this.state.tweets);

        if (this.state.tweets) {
            console.log("hi tweets")
            this.state.tweets.map((tweets, index) => {
                tweet = <Tweet
                    key={index}
                    tweetIndividual={tweets}
                    onDataLoaded={this.forceUpdate}
                    liked={this.state.liked}
                    retweets={this.state.retweets}
                    likeTweet={this.likeTweet.bind(this)}
                    retweetWithComment={this.retweetWithComment.bind(this)}
                    retweetWithoutComment={this.retweetWithoutComment.bind(this)}
                    userDetails={this.state.userDetails}
                />
            })
        }
        return (
            <div className='row'>
                {redirectVar}
                {this.state.redirectBack}
                <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                </div>
                <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                    <SidePanel />
                </div>
                <div className='col-8 col-sm-8 col-md-7 col-lg-5 col-xl-5' id='center'>
                    <div className='row '>
                        <div className='col text-left' >
                            <h4 className='font-weight-bold'>{list.firstName} {list.lastName}</h4>
                            <h6 className='text-secondary'>@{list.userName}</h6>
                            <img src={listbanner} className="img-fluid" id="theader" alt="" />
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col '>
                            <h4 className='font-weight-bold text-center'>{list.listName}</h4>
                            {description}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right">
                            <p className="font-weight-bold">{list.firstName} {list.lastName}</p>
                        </div>
                        <div className="col-6 text-left">
                            <p className="text-secondary">@{list.userName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right">
                            <Link to={{
                                pathname: '/user/lists/listid/members',
                                state: {
                                    list
                                }
                            }}>{list.members.length} members</Link>
                        </div>
                        <div className="col-6 text-left">
                            <Link to={{
                                pathname: '/user/lists/listid/subscribers',
                                state: {
                                    list
                                }
                            }} >{list.subscribers.length} subscribers</Link>
                        </div>
                    </div>
                    <br />
                    {listbuttons}
                    {tweet}
                </div>

                <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                    <Search />

                </div>
            </div >
        )
    }
}

export default ListPage