import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import UserImage from '../../images/user-icon.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import './RetweetWithComment.css'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import default_avatar from "../../images/default_avatar.png";

library.add(
    faImage
)
class CommentOnTweet extends Component {
    constructor() {
        super()
        this.state = {
            comment: null
        }
    }
    onCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }
    submitComment = (e) => {
        e.preventDefault()
        if (this.state.comment) {
            const data = {
                tweetId: this.props.tweetData._id,
                userName: localStorage.getItem('userName'),
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName'),
                userImage: localStorage.getItem('userImage'),
                comment: this.state.comment,
                commentMedia: 'something'
            }
            axios.post(rootUrl + '/addCommentOnTweet', data)
                .then(response => {
                    console.log('comment:', response.data)
                    if (response.status === 200) {
                        console.log('comment successful');
                    }
                    else {
                        console.log("comment failed")
                    }
                }).catch((err) => {
                    if (err) {
                        swal('erroer connecting to database')
                    }
                });
        }
        else {
            swal('please add comment before submitting')
        }
    }

    render() {
        if (!this.props.commentModal) {
            return null
        }
        let profileImageData = <img src={default_avatar} alt="logo" />
        if (this.props.tweetData.profileImage) {
            profileImageData = <img src={rootUrl + "/download-file/" + this.props.tweetData.profileImage} alt="logo" />
        }
        let loginImageData = <img src={default_avatar} alt="logo" />
        console.log('login ', localStorage.getItem('userImage'))
        if (localStorage.getItem('userImage')) {
            loginImageData = <img src={rootUrl + "/download-file/" + localStorage.getItem('userImage')} alt="logo" />
        }
        const closeBtn = <button className="close" onClick={() => this.props.commentToggle()}>&times;</button>;
        console.log(this.props.tweetData);

        return (
            <div>
                <Modal isOpen={this.props.commentModal} toggle={() => this.props.commentToggle()} className='modal-popup' scrollable>
                    <ModalHeader toggle={() => this.props.commentToggle()} close={closeBtn}></ModalHeader>
                    <ModalBody className="modal-body ">
                        <div className="form-group" >
                            <form>
                                <div className="card row" id='commentingTweet'>
                                    <Link to='/username/tweetid'>
                                        <div id='visit-tweet-card'>
                                            <div className='col-2' id='user-image' >{profileImageData}</div>
                                            <div className='col-10' id='user-tweet-message'>
                                                <Link to='/user/username' id='none'><p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetData.firstName}</p> <p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetData.lastName}</p></Link>
                                                <p id='tweet-username'> @{this.props.tweetData.userName}</p><br /><br />
                                                <p id='tweet-usermessage'>{this.props.tweetData.tweetMsg}</p><br />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='row'>
                                    <div className='col-2' id='user-image' >{loginImageData}</div>
                                    <div className=" col-10">
                                        <textarea onChange={this.onCommentChange.bind(this)} rows='3' id='textarea-newtweet' placeholder='comments' pattern="{1,280}"></textarea>
                                        <Link to='/user/home'><span id="images-upload" className='text-left'> <h3><FontAwesomeIcon icon={faImage} /></h3></span> </Link>
                                        <button onClick={this.submitComment.bind(this)} className='btn btn-primary btn-md' id='tweet-button'>Comment</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.props.commentToggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CommentOnTweet;