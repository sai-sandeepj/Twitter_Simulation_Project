import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons'
import { Redirect } from 'react-router'

class Home extends Component {
    render() {
        let redirectVar = null;
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        return (
            <div>
                {redirectVar}
                <div className='row '>
                    <div className='col-2 text-left' >
                        <h4 className='font-weight-bold'>Lists</h4>
                        <h6 className='text-secondary'>@{localStorage.getItem("userName")}</h6>
                    </div>
                    <div className='col-10 float-right'>
                        <a href='/user/lists/create'><h4 className="float-right"><FontAwesomeIcon icon={faCalendarPlus} /></h4> </a>
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