import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserImage from '../../images/user-icon.png'


class Tweet extends Component {
    state = {}
    render() {

        return (
            <div>
                <div className="card">
                    <Link to='/username/tweetid'>
                        <div className="card-body" id = 'visit-tweet-card'>
                            <div id = 'user-image' ><img src ={UserImage} alt = 'logo' /></div>
                            <span id = 'user-tweet-message'>
                                <Link to='/user/username'><p className="card-title font-weight-bold" id='tweet-username'>{this.props.tweetIndividual.userName}</p></Link>
                                <p className="card-title" id='tweet-username'>@{this.props.tweetIndividual.FullName}</p><br />
                                <p className="card-text" id='tweet-username'>{this.props.tweetIndividual.TweetMessage}</p>
                            </span>
                            
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Tweet;