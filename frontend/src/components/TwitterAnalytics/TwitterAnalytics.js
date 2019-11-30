import React, { Component } from 'react'
import Analytics from './Analytics'
import './Analytics.css'


export class TwitterAnalytics extends Component {
    render() {
        return (
            <div className = 'row'>
                <div className='col-1 col-md-1 col-lg-1 col-xl-1'>
                </div>
                <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10' >
                    <Analytics/>
                </div>
                <div className='col-1 col-md-1 col-lg-1 col-xl-1'>
                </div>
            </div>
        )
    }
}

export default TwitterAnalytics
