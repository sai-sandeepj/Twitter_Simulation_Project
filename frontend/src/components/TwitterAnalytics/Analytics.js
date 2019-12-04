import React, { Component } from 'react'

import { Bar } from 'react-chartjs-2'

export class Analytics extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    render() {
        let likedLabels = null
        let likedvalues = null
        console.log(this.props.topLikedTweets);
        
        if(this.props.topLikedTweets){
            likedLabels = this.props.topLikedTweets.map((data) => {
                return (
                    data.userName
                )
            })
            likedvalues = this.props.topLikedTweets.map((data) => {
                return (
                    data.likes.length
                )
            })
        }
        console.log(likedvalues);
        let chartData = {
            labels: likedLabels,
            datasets: [
                {
                    labels: 'No. of tweets.',
                    data: likedvalues,
                    backgroundColor: [
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                        'rgba(75,192,192,0.4)',
                    ]
                }
            ]
        }
        
        let retweetLabels = null
        let retweetValues = null

        if (this.props.topRetweetedTweets) {
            retweetLabels = this.props.topRetweetedTweets.map((data) => {
                return (
                    data.userName
                )
            })
            retweetValues = this.props.topRetweetedTweets.map((data) => {
                return (
                    data.retweetNoComment.length
                )
            })
        }
        console.log(retweetValues);
        let Data = {
            labels: retweetLabels,
            datasets: [
                {
                    labels: 'No. of tweets.',
                    data: retweetValues,
                    backgroundColor: [
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
                        data={chartData}
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
                                text: 'Most liked tweets'
                            }
                        }}
                    />
                </div>
                <div id='chart'>
                    <Bar
                        data={Data}
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
                                text: 'Most Rewteeted tweets'
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Analytics
