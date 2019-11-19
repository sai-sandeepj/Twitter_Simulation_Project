import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserImage from '../../images/user-icon.png'
import UserActions from './UserActions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


library.add(
    faChevronDown
)
class Tweet extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                followers: [
                    {
                        username: '@user_1',
                        fullName: 'follow one',
                        aboutMe: 'This is about me',
                        profileImage: 'followone.jpg'
                    },
                    {
                        username: '@user_2',
                        fullName: 'follow two',
                        aboutMe: 'This is about me',
                        profileImage: 'followtwo.jpg'
                    },
                ],
                following: [
                    {
                        username: 'user1',
                        fullName: 'Userone',
                        aboutMe: 'This is about me',
                        profileImage: 'followone.jpg'
                    },
                    {
                        username: 'user4',
                        fullName: 'userfour',
                        aboutMe: 'This is about me',
                        profileImage: 'followone.jpg'
                    },
                ],
                bookmarked: ['1', '3', '4'],
                liked: ['2', '3', '5'],
                views: [
                    {
                        date: '2019:11:15',
                        viewCounter: 25
                    }
                ],
                retweets: [
                    {
                        id: '1',
                        timestamp: '2019:11:15:10:36:55'
                    },
                    {
                        id: '2',
                        timestamp: '2019:11:15:10:36:55'
                    },
                    {
                        id: '5',
                        timestamp: '2019:11:15:10:36:55'
                    }
                ]
            }
        }
    }

    render() {

        return (
            <div>
                <div className="card row">
                    <Link to='/username/tweetid'>
                        <div id='visit-tweet-card'>
                            <div className='col-2' id='user-image' ><img src={UserImage} alt='logo' /></div>
                            <div className='col-10' id='user-tweet-message'>
                                <Link to='/user/username'><p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetIndividual.userName}</p></Link>
                                <p id='tweet-username'>@{this.props.tweetIndividual.FullName}</p><br />
                                <p id='tweet-username'>{this.props.tweetIndividual.TweetMessage}</p><br />
                                <UserActions userData={this.state.user} tweetData={this.props.tweetIndividual} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Tweet;