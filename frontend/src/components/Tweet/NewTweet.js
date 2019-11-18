import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFeatherAlt } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import './NewTweet.css'


library.add(
    faHome,
    faImage,
    faFeatherAlt
)

class NewTweet extends Component {
    state = {}
    render() {
        return (
            <div className='card new-tweet'>
                <form>
                    <div className="form-group" id='new-tweet-form-group' >
                        <textarea className="form-control" rows='3' id='textarea-newtweet' placeholder='Whats Happening?' pattern="{1,280}"></textarea>
                        <Link to='/user/home'><span id="images-upload" className='text-left'> <h3><FontAwesomeIcon icon={faImage} /></h3></span> </Link>
                        <button className='btn btn-primary btn-md' id='tweet-button'><FontAwesomeIcon icon={faFeatherAlt} />Tweet</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewTweet;