import React, { Component } from 'react';
import Search from '../Search/Search'
import SidePanel from '../SidePanel/SidePanel'
import { Redirect } from 'react-router';

class Home extends Component {
    state = {}
    render() {
        let redirectVar = null;
        if (!localStorage.getItem('userName')) {
            redirectVar = <Redirect to='/' />
        }
        return (
            <div className='row'>
                {redirectVar}
                <div className='col-sm-none col-md-1 col-lg-1 col-xl-1'>

                </div>
                <div className=' col-2 col-sm-2 col-md-1 col-lg-3 col-xl-2' >
                    <SidePanel />
                </div>
                <div className='col-8 col-sm-8 col-md-7 col-lg-5 col-xl-5' id='center'>
                    <div className='row '>
                        <div className='col-2 text-left' >
                            <h4 className='font-weight-bold'>Tweet</h4>
                        </div>
                    </div>
                    <br />
                    <div className='row float-left'>
                        Tweet and commments
                    </div>
                </div>
                <div className='d-none d-md-block d-print-block col-md-3 col-lg-3 col-xl-4'>
                    <Search />
                </div>
            </div>
        );
    }
}

export default Home;