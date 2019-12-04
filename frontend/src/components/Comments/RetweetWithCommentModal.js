import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import UserImage from '../../images/user-icon.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import './RetweetWithComment.css'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import default_avatar from "../../images/default_avatar.png";


library.add(
    faFeatherAlt, faImage
)
class RetweetWithCommentModal extends Component {
    constructor() {
        super()
        this.state = {
            tweetComment: null,
            retweetMedia: null,
            retweetMediaPreview: null
        }
    }

    onTweetCommentChange = (e) => {
        this.setState({
            tweetComment: e.target.value
        })
    }

    //handle change of retweet image
    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        if (name === "ProfileImage") {
            console.log(target.files);
            var retweetPhoto = target.files[0];
            var data = new FormData();
            data.append('photos', retweetPhoto);
            axios.defaults.withCredentials = true;
            if (retweetPhoto) {
                axios.post(rootUrl + '/upload-file', data)
                    .then(response => {
                        if (response.status === 200) {
                            console.log('Profile Photo Name: ', retweetPhoto.name);
                            this.setState({
                                retweetMedia: retweetPhoto.name,
                                retweetMediaPreview: rootUrl + "/download-file/" + retweetPhoto.name
                            })
                        }
                    })
            }
        }
    }

    retweetWithComment = (e) => {
        e.preventDefault()
        if (this.state.tweetComment) {
            const data = {
                parentId: this.props.tweetData._id,
                userName: localStorage.getItem('userName'),
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName'),
                userImage: localStorage.getItem('userImage'),
                tweetMsg: this.state.tweetComment,
                tweetMedia: this.state.retweetMedia,

                parentUserName: this.props.tweetData.userName,
                parentFirstName: this.props.tweetData.firstName,
                parentLastName: this.props.tweetData.lastName,
                parentProfileImage: this.props.tweetData.profileImage,
                parentTweetMsg: this.props.tweetData.tweetMsg,
                parentTweetMedia: this.props.tweetData.tweetMedia
            }
            axios.post(rootUrl + '/retweetWithComment', data)
                .then(response => {
                    console.log('comment:', response.data)
                    if (response.status === 200) {
                        console.log('comment successful');
                        this.props.toggle()
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
            swal('Please add comment before retweeting')
        }
    }


    render() {
        if (!this.props.modal) {
            return null
        }
        const closeBtn = <button className="close" onClick={() => this.props.toggle()}>&times;</button>;
        let retweetImageData = null;
        let tweetImageData = null;
        let tweetProfileImage = <img src={default_avatar} alt="logo" />;
        let loginUserImage = <img src={default_avatar} alt="logo" />;
        if (localStorage.getItem('userImage')) {
            loginUserImage = <img src={rootUrl + "/download-file/" + localStorage.getItem('userImage')} alt="logo" />
        }
        if (this.props.tweetData.profileImage) {
            tweetProfileImage = <img src={rootUrl + "/download-file/" + this.props.tweetData.profileImage} alt="logo" />
        }
        if (this.state.retweetMediaPreview) {
            retweetImageData = <img src={rootUrl + "/download-file/" + this.state.retweetMediaPreview} alt="logo" />
        }
        if (this.props.tweetData.tweetMedia) {
            tweetImageData = <div id='tweetimage'><img src={rootUrl + "/download-file/" + this.props.tweetData.tweetMedia} alt="logo" /></div>
        }
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={() => this.props.toggle()} className='modal-popup' scrollable>
                    <ModalHeader toggle={() => this.props.toggle()} close={closeBtn}></ModalHeader>
                    <ModalBody className="modal-body row">
                        <div className='col-1' id='user-image' >{loginUserImage}</div>
                        <div className="form-group col-10" >
                            <form>
                                <textarea onChange={this.onTweetCommentChange.bind(this)} className="form-control" rows='3' id='textarea-newtweet' placeholder='comments' pattern="{1,280}"></textarea>
                                <div className="card row" id='retweetingTweet'>
                                    <Link to='/username/tweetid'>
                                        <div id='visit-tweet-card'>
                                            <div className='col-2' id='user-image' >{tweetProfileImage}</div>
                                            <div className='col-10' id='user-tweet-message'>

                                                <Link to='/user/username' id='none'><p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetData.firstName}</p> <p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetData.lastName}</p></Link>
                                                <p id='tweet-username'> @{this.props.tweetData.userName}</p><br /><br />
                                                <p id='tweet-usermessage'>{this.props.tweetData.tweetMsg}</p><br />
                                                {tweetImageData}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <input type="file" name="ProfileImage" id="images-upload" className='text-left' onChange={this.handleChange} />
                                    <button onClick={this.retweetWithComment.bind(this)} className='btn btn-primary btn-md' id='tweet-button'><FontAwesomeIcon icon={faFeatherAlt} />retweet</button>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>

                        <Button color="secondary" onClick={() => this.props.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default RetweetWithCommentModal;
