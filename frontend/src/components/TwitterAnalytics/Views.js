import React, { Component } from 'react'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import { Bar } from 'react-chartjs-2'

export class Analytics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getTop10ViewedTweets: null,
            profileViews: null
        }
    }
    componentDidMount = () => {
        axios.post(rootUrl + '/getTop10ViewedTweets')
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data);
                    let getTop10ViewedTweets = response.data

                    const data = {
                        userName: localStorage.getItem('userName')
                    }
                    axios.post(rootUrl + '/getProfileViews', data)
                        .then(response => {
                            if (response.status === 200) {
                                console.log(response.data);

                                let profileViews = response.data
                                this.setState({
                                    getTop10ViewedTweets: getTop10ViewedTweets,
                                    profileViews: profileViews
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
                    this.setState({
                        getTop10ViewedTweets: getTop10ViewedTweets
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

        let tweetViewsLabels = null
        let tweetViewsvalues = null

        if (this.state.getTop10ViewedTweets) {
            tweetViewsLabels = this.state.getTop10ViewedTweets.map((data) => {
                return (
                    data.userName
                )
            })
            tweetViewsvalues = this.state.getTop10ViewedTweets.map((data) => {
                if (data.tweetViews) {
                    return (
                        data.tweetViews.length
                    )
                }
            })
        }

        let tweetViwesData = {
            labels: tweetViewsLabels,
            datasets: [
                {
                    labels: 'No. of tweets.',
                    data: tweetViewsvalues,
                    backgroundColor: [
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                    ]
                }
            ]
        }

        let profileViewsLabels = null
        let profileViewsvalues = null

        if (this.state.profileViews) {
            profileViewsLabels = this.state.profileViews.map((data) => {
                return (
                    data.viewDate
                )
            })
            profileViewsvalues = this.state.profileViews.map((data) => {

                return (
                    data.viewCounter
                )

            })
        }

        let profileViewsData = {
            labels: profileViewsLabels,
            datasets: [
                {
                    labels: 'No. of tweets.',
                    data: profileViewsvalues,
                    backgroundColor: [
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',

                    ]
                }
            ]
        }

        return (
            <div className='chart col-5' >
                <div id='chart'>
                    <Bar
                        data={profileViewsData}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Profile views data'
                            }
                        }}
                    />
                </div>
                
                <div id='chart'>
                    <Bar
                        data={tweetViwesData}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Tweet views data'
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Analytics
