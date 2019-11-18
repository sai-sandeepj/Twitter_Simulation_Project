import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faChevronDown, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart, faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';


library.add(
    faRetweet, faChevronDown, faComment, faHeart, faBookmark, farBookmark
)

class UserActions extends Component {

    likeTweet = () => {
        console.log('in like tweet method');
    }

    retweetATweet = () => {
        console.log('in retweet a Tweet method');
    }

    BookmarkTweet = () => {
        console.log('in Bookmark a Tweet method');
    }

    render() {

        let { retweets, liked, bookmarked, following } = this.props.userData

        let likes = liked.includes(this.props.tweetData.id) ? '-danger' : ''
        let likeid = 'user-actions-icon-like' + likes

        let bookmarkedIcon = bookmarked.includes(this.props.tweetData.id) ? faBookmark : farBookmark

        let retweetId = ''
        for (let i = 0; i < retweets.length; i++) {
            if (retweetId === '') {
                retweetId = this.props.tweetData.id === retweets[i].id ? '-retweeted' : ''
            }
        }
        retweetId = 'user-actions-icon-retweet' + retweetId

        return (
            <div>
                <div id="tweet-icons"><button className='' id='user-actions-icon-comment'><FontAwesomeIcon icon={faComment} /></button></div>
                <div id="tweet-icons"><Link onClick={() => this.retweetATweet()}><button className='' id={retweetId}><FontAwesomeIcon icon={faRetweet} /></button></Link></div>
                <div id="tweet-icons"><Link onClick={() => this.likeTweet()}><button className='' id={likeid} ><FontAwesomeIcon icon={faHeart} /></button> </Link></div>
                <div id="tweet-icons"><Link onClick={() => this.BookmarkTweet()}><button className=' ' id='user-actions-icon-bookmark'><FontAwesomeIcon icon={bookmarkedIcon} /></button></Link></div>
            </div>
        );
    }
}


export default UserActions;