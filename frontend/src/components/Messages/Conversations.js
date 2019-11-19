import React, { Component } from 'react';
import UserMessages from './UsersMessages'

class Conversations extends Component {
    constructor() {
        super()
        this.state = {
            messages: [{

            }]
        }
    }

    render() {
        return (
            <div>
                <div id='heading'>
                    <h4>Messages</h4>
                </div>
                <div className='row' id='messages-total'>
                    <div className='col-5 col-md-5 col-lg-4 col-xl-4'>
                        Conversations
                </div>
                    <div className='col-7 col-md-7 col-lg-8 col-xl-8'>
                        <UserMessages />
                    </div>

                </div>
            </div>
        );
    }
}

export default Conversations;