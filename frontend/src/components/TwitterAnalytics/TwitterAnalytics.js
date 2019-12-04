import React, { Component } from 'react'
import Analytics from './Analytics'
import './Analytics.css'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import ShowHDM from "./ShowHDM"

export class TwitterAnalytics extends Component {
    constructor() {
        super()
        this.state = {
            topLikedTweets: null,
            topRetweetedTweets: null,
            getDailyTweets: null,
            getHourlyTweets: null,
            getMonthlyTweets: null
        }
    }
    componentDidMount = () => {
        axios.post(rootUrl + '/getTop10LikedTweets')
            .then(response => {
                if (response.status === 200) {
                    let topLikedTweets = response.data

                    axios.post(rootUrl + '/getTop5RetweetedTweets')
                        .then(response => {
                            if (response.status === 200) {
                                let topRetweetedTweets = response.data

                                axios.post(rootUrl + '/getDailyTweets')
                                    .then(response => {
                                        if (response.status === 200) {
                                            let getDailyTweets = response.data

                                            axios.post(rootUrl + '/getHourlyTweets')
                                                .then(response => {
                                                    if (response.status === 200) {
                                                        let getHourlyTweets = response.data

                                                        axios.post(rootUrl + '/getMonthlyTweets')
                                                            .then(response => {
                                                                if (response.status === 200) {
                                                                    let getMonthlyTweets = response.data
                                                                    this.setState({
                                                                        topLikedTweets: topLikedTweets,
                                                                        topRetweetedTweets: topRetweetedTweets,
                                                                        getDailyTweets: getDailyTweets,
                                                                        getHourlyTweets: getHourlyTweets,
                                                                        getMonthlyTweets: getMonthlyTweets
                                                                    })
                                                                }
                                                                else {
                                                                    console.log("Didn't fetch topLikedTweets tweets data")
                                                                }
                                                            }).catch((err) => {
                                                                if (err) {
                                                                    swal('erroer connecting to database')
                                                                }
                                                            });

                                                    }
                                                    else {
                                                        console.log("Didn't fetch topLikedTweets tweets data")
                                                    }
                                                }).catch((err) => {
                                                    if (err) {
                                                        swal('erroer connecting to database')
                                                    }
                                                });

                                        }
                                        else {
                                            console.log("Didn't fetch topLikedTweets tweets data")
                                        }
                                    }).catch((err) => {
                                        if (err) {
                                            swal('erroer connecting to database')
                                        }
                                    });

                            }
                            else {
                                console.log("Didn't fetch topLikedTweets tweets data")
                            }
                        }).catch((err) => {
                            if (err) {
                                swal('erroer connecting to database')
                            }
                        });
                    this.setState({
                        topLikedTweets: topLikedTweets
                    })
                }
                else {
                    console.log("Didn't fetch topLikedTweets tweets data")
                }
            }).catch((err) => {
                if (err) {
                    swal('erroer connecting to database')
                }
            });
    }
    render() {
        console.log(this.state);

        return (
            <div className='row'>
                <div className='col-1 col-md-1 col-lg-1 col-xl-1'>
                </div>
                <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10' >
                    <Analytics
                        topLikedTweets={this.state.topLikedTweets}
                        topRetweetedTweets={this.state.topRetweetedTweets}
                    />
                    <ShowHDM
                        getDailyTweets={this.state.getDailyTweets}
                        getHourlyTweets={this.state.getHourlyTweets}
                        getMonthlyTweets={this.state.getMonthlyTweets}
                    />
                </div>
                <div className='col-1 col-md-1 col-lg-1 col-xl-1'>
                </div>
            </div>
        )
    }
}

export default TwitterAnalytics
