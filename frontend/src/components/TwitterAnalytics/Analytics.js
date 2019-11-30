import React, { Component } from 'react'

import { Bar } from 'react-chartjs-2'

export class Analytics extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                        data={this.state.Data}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Analytics
