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
<<<<<<< HEAD
import ShowModal from '../Profile/ShowModal'
=======
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d

library.add(
    faRetweet, faChevronDown, faComment, faHeart, faBookmark, farBookmark, farHeart, faPencilAlt
)

class UserActions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            commentModal: false,
            bookmarked: null,
            tweetData: this.props.tweetData,
            showModal: false,
            modalData : null
        }
    }
<<<<<<< HEAD
    componentDidMount = () => {
        let userName = localStorage.getItem('userName')
        const data = {
            userName: userName
        }
        axios.post(rootUrl + '/getUserBookmarkedTweetIds', data)
            .then(response => {
                if (response.status === 200) {
                    let bookmarked = response.data
                    this.setState({
                        bookmarked: bookmarked
                    })
                }
                else {
                    console.log("Didn't fetch bookmarked tweets data")
                }
            }).catch((err) => {
                if (err) {
                    swal('erroer connecting to database')
                }
            });
=======

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
>>>>>>> de0a95a31ee5eb7329ddf5f066035bff31a82c6d
    }

    BookmarkTweet = () => {
        console.log('in bookmark tweet method');

        const data = {
            tweetId: this.props.tweetData._id,
            userName: localStorage.getItem('userName'),
        }
        console.log(data);
        axios.post(rootUrl + '/bookmarkATweet', data)
            .then(response => {
                console.log("inside success")
                if (response.status === 200) {
                    console.log(response.data);
                    axios.post(rootUrl + '/getUserBookmarkedTweetIds', data)
                        .then(response => {
                            console.log('bookmarked data:', response.data)
                            if (response.status === 200) {

                                let bookmarked = response.data
                                this.setState({
                                    bookmarked: bookmarked
                                })
                                this.props.retweetWithComment()
                            }
                            else {
                                console.log("Didn't fetch bookmarked tweets data")
                            }
                        }).catch((err) => {
                            if (err) {
                                swal('erroer connecting to database')
                            }
                        });
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");

            })
    }

    showModal = () => {
        this.setState({
            modal: !this.state.modal
        })
        // this.props.retweetWithComment()
    }

    showCommentModal = () => {
        this.setState({
            commentModal: !this.state.commentModal
        })
    }


    showLikesModal = () => {
        this.setState({
            modalData: this.props.tweetData.likes,
            showModal: !this.state.showModal,
        })
    }
    render() {

        let { retweets, liked, bookmarked } = this.props.userData

        let likes = liked.includes(this.props.tweetData.id) ? '-danger' : ''
        let likeIcon = liked.includes(this.props.tweetData.id) ? faHeart : farHeart
        let likeid = 'user-actions-icon-like' + likes
        console.log(this.props.userData);

    render() {

        let retweets = this.props.retweets
        let liked = this.props.liked
        let bookmarked = this.state.bookmarked
        let likeid = null
        let likeIcon = farHeart
        let bookmarkedIcon = farBookmark
        if (liked) {
            let likes = liked.includes(this.props.tweetData._id) ? '-danger' : ''
            likeIcon = liked.includes(this.props.tweetData._id) ? faHeart : farHeart
            likeid = 'user-actions-icon-like' + likes
        }
        if (bookmarked) {
            bookmarkedIcon = bookmarked.includes(this.props.tweetData._id) ? faBookmark : farBookmark
        }
        let retweetId = ''
        let retweetMsg = 'Retweet only'
        if (retweets) {
            retweetId = retweets.includes(this.props.tweetData._id) ? '-retweeted' : ''
            retweetMsg = retweets.includes(this.props.tweetData._id) ? 'Undo retweet' : 'Retweet only'
        }
        retweetId = 'user-actions-icon-retweet' + retweetId

        return (
            <div className='row'>
                <div className='col-3'><Link onClick={() => this.showCommentModal()}><button id='user-actions-icon-comment'><FontAwesomeIcon icon={faComment} /></button></Link>{this.props.tweetData.comments.length}</div>
                <div className='col-3'><Link onClick={() => this.showCommentModal()}><button id='user-actions-icon-comment'><FontAwesomeIcon icon={faComment} /></button></Link></div>
                <div className='col-3' id='user-retweet-option'>
                    <Dropdown>
                        <Link>
                            <Dropdown.Toggle id={retweetId} >
                                <button className='' id={retweetId}><FontAwesomeIcon icon={faRetweet} /></button>{this.props.tweetData.retweetNoComment.length}
                            </Dropdown.Toggle>
                        </Link>
                        <Dropdown.Menu>
                            <Dropdown.Item> <Link onClick={() => this.props.retweetWithoutComment(this.props.tweetData._id)}><FontAwesomeIcon icon={faRetweet} /> {retweetMsg}</Link></Dropdown.Item>
                            <Dropdown.Item> <Link onClick={() => this.showModal()}><FontAwesomeIcon icon={faPencilAlt} /> Retweet with Comment</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='col-3'><Link onClick={() => this.props.likeTweet(this.props.tweetData._id)}><button className='' id={likeid} ><FontAwesomeIcon icon={likeIcon} /></button> </Link> <button onClick={this.showLikesModal} className='btn btn-' id='followers'>{this.props.tweetData.likes.length}</button></div>
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
                <ShowModal
                    showFollowersModal={this.showLikesModal.bind(this)}
                    modalData={this.state.modalData}
                    showModal={this.state.showModal}
                />
            </div>
        );
    }
}


export default UserActions;