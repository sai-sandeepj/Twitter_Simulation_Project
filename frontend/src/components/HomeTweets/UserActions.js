import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faChevronDown, faBookmark, faHeart, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart as farHeart, faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'
import RetweetWithCommentModal from '../Comments/RetweetWithCommentModal'
import CommentOnTweet from '../Comments/CommentOnTweet'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"

library.add(
    faRetweet, faChevronDown, faComment, faHeart, faBookmark, farBookmark, farHeart, faPencilAlt
)

class UserActions extends Component {

    constructor() {
        super()
        this.state = {
            modal: false,
            commentModal: false
        }
    }

    likeTweet = () => {
        console.log('in like tweet method');
        console.log(this.props.userDetails);

        const data = {
            tweetId: this.props.tweetData._id,
            userName: localStorage.getItem('userName'),
            userEmail: localStorage.getItem("userEmail"),
            userImage: localStorage.getItem("userImage"),
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            aboutMe: localStorage.getItem("aboutMe")
        }
        console.log(data);
        axios.post(rootUrl + '/likeATweet', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");

            })
    }

    retweetATweet = () => {
        console.log('in retweet a Tweet method');
    }

    BookmarkTweet = () => {
        console.log('in Bookmark a Tweet method');
    }

    showModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    showCommentModal = () => {
        this.setState({
            commentModal: !this.state.commentModal
        })
    }

    render() {

        let { retweets, liked, bookmarked } = this.props.userData

        let likes = liked.includes(this.props.tweetData.id) ? '-danger' : ''
        let likeIcon = liked.includes(this.props.tweetData.id) ? faHeart : farHeart
        let likeid = 'user-actions-icon-like' + likes
        console.log(this.props.userData);

        let bookmarkedIcon = bookmarked.includes(this.props.tweetData.id) ? faBookmark : farBookmark

        let retweetId = ''
        let retweetMsg = 'Retweet only'
        for (let i = 0; i < retweets.length; i++) {
            if (retweetId === '') {
                retweetId = this.props.tweetData.id === retweets[i].id ? '-retweeted' : ''
            }
            if (retweetId === '-retweeted') {
                retweetMsg = 'Undo retweet'
            }
        }
        retweetId = 'user-actions-icon-retweet' + retweetId

        return (
            <div className='row'>
                <div className='col-3'><Link onClick={() => this.showCommentModal()}><button id='user-actions-icon-comment'><FontAwesomeIcon icon={faComment} /></button></Link></div>
                <div className='col-3' id='user-retweet-option'>
                    <Dropdown>
                        <Link>
                            <Dropdown.Toggle id={retweetId} >
                                <button className='' id={retweetId}><FontAwesomeIcon icon={faRetweet} /></button>
                            </Dropdown.Toggle>
                        </Link>
                        <Dropdown.Menu>
                            <Dropdown.Item> <Link onClick={() => this.likeTweet()}><FontAwesomeIcon icon={faRetweet} /> {retweetMsg}</Link></Dropdown.Item>
                            <Dropdown.Item> <Link onClick={() => this.showModal()}><FontAwesomeIcon icon={faPencilAlt} /> Retweet with Comment</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='col-3'><Link onClick={() => this.likeTweet()}><button className='' id={likeid} ><FontAwesomeIcon icon={likeIcon} /></button> </Link></div>
                <div className='col-3'><Link onClick={() => this.BookmarkTweet()}><button className=' ' id='user-actions-icon-bookmark'><FontAwesomeIcon icon={bookmarkedIcon} /></button></Link></div>
                <RetweetWithCommentModal
                    toggle={this.showModal.bind(this)}
                    modal={this.state.modal}
                    tweetData={this.props.tweetData}
                />
                <CommentOnTweet
                    commentToggle={this.showCommentModal.bind(this)}
                    commentModal={this.state.commentModal}
                    tweetData={this.props.tweetData}
                />
            </div>
        );
    }
}


export default UserActions;