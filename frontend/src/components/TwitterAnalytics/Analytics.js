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
            chartData: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        labels: 'No. of tweets.',
                        data: [3080, 2900, 3535, 2542, 3126, 3041],
                        backgroundColor: ['rgba(125,99,132,0.6)',
                            'rgba(75,192,192,0.4)',
                            'rgba(75,192,192,0.4)',
                            'rgba(75,192,192,0.4)',
                            'rgba(75,192,192,0.4)',
                            'rgba(75,192,192,0.4)',
                        ]
                    }
                ]
            },

            Data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        labels: 'No. of tweets.',
                        data: [76, 29, 35, 42, 31, 49],
                        backgroundColor: ['rgba(125,99,132,0.6)',
                            'rgba(75,192,192,0.4)',
                            'rgba(175,92,12,0.6)',
                            'rgba(5,12,192,0.4)',
                            'rgba(80,54,74,0.4)',
                            'rgba(175,80,192,0.4)',
                        ]
                    }
                ]
            }
        }
    }
    render() {

        return (
            <div className='chart' >
                <div id='chart'>
                    <Bar
                        data={this.state.chartData}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                <div id='chart'>
                    <Bar
<<<<<<< HEAD
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
=======
                        data={this.state.Data}
                        options={{
                            maintainAspectRatio: false
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Analytics
