import React, { Component } from 'react'

import { Bar } from 'react-chartjs-2'

export class ShowHDM extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    render() {
                
        let chartData = {
            labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            datasets: [
                {
                    labels: 'No. of tweets.',
                    data: this.props.getHourlyTweets
                }
            ]
        }
        
        let dailyTweets = []
        if (this.props.getDailyTweets) {
            for (var key in this.props.getDailyTweets) {

                // console.log(key); 
                dailyTweets.push(this.props.getDailyTweets[key]); 
              }
        }
        let dailyChatData = {
            labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
            datasets: [
                {
                    labels: 'No. of tweets.',
                    data: dailyTweets
                }
            ]
        }


        let retweetLabels = null
        let retweetValues = []

        if (this.props.getMonthlyTweets) {
            var keys = Object.keys(this.props.getMonthlyTweets);
            retweetLabels = keys
            console.log("retweetLabels", retweetLabels);
            
            for (var key in this.props.getMonthlyTweets) {

                // console.log(key); 
                retweetValues.push(this.props.getMonthlyTweets[key]); 
              }
        }
        
        let Data = {
            labels: retweetLabels,
            datasets: [
                {
                    labels: 'No. of tweets.',
                    data: retweetValues
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
                                text: 'No of tweets in last 24 hours'
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
                                text: 'No of tweets in last 12 months'
                            }
                        }}
                    />
                </div>
                <div id='chart'>
                    <Bar
                        data={dailyChatData}
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
                                text: 'No of tweets in last 30 days'
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default ShowHDM
