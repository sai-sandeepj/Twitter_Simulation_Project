import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons'

class Home extends Component {
    render() {
        return (
            <div>
                <div className='row '>
                    <div className='col-2 text-left' >
                        <h4 className='font-weight-bold'>Lists</h4>
                        <h6 className='text-secondary'>@test_username</h6>
                    </div>
                    <div className='col-10 float-right'>
                        <a href='/lists/create'><h4 className="float-right"><FontAwesomeIcon icon={faCalendarPlus} /></h4> </a>
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    <li className="col-4 nav-item">
                        <a className="nav-link font-weight-bold text-secondary " href="/user/lists/owned">Owned</a>
                    </li>
                    <li className="col-4 nav-item">
                        <a className="nav-link font-weight-bold text-secondary" href="/user/lists/subscriptions" >Subscribed</a>
                    </li>
                    <li className="col-4 nav-item">
                        <a className="nav-link font-weight-bold text-secondary" href="/user/lists/memberships">Member</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;