import React, { Component } from 'react';
import SidePanel from '../SidePanel/SidePanel'
<<<<<<< HEAD
import { Redirect } from 'react-router'
=======
import Conversations from './Conversations'
import './MessagesStyling.css'
>>>>>>> cb293a8e5eaf7f5ae131a4911c7270a6ed496151

class Home extends Component {
    state = {}
    render() {
        let redirectVar = null;
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        return (
<<<<<<< HEAD
            <div className='row'>
                {redirectVar}
=======
            <div className='row' id = 'font-styling'>
>>>>>>> cb293a8e5eaf7f5ae131a4911c7270a6ed496151
                <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                </div>
                <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                    <SidePanel />
                </div>
                <div className='col-10 col-sm-10 col-md-10 col-lg-8 col-xl-9' id='center'>
                    <Conversations/>
                </div>
            </div>
        );
    }
}

export default Home;