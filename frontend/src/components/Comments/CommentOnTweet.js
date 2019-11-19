import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import UserImage from '../../images/user-icon.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import './RetweetWithComment.css'


library.add(
    faImage
)
class CommentOnTweet extends Component {

    render() {
        if (!this.props.commentModal) {
            return null
        }
        const closeBtn = <button className="close" onClick={() => this.props.commentToggle()}>&times;</button>;

        return (
            <div>
                <Modal isOpen={this.props.commentModal} toggle={() => this.props.commentToggle()} className='modal-popup' scrollable>
                    <ModalHeader toggle={() => this.props.commentToggle()} close={closeBtn}></ModalHeader>
                    <ModalBody className="modal-body row">
                        <div className="form-group" >
                            <form>
                                <div className="card row" id='commentingTweet'>
                                    <Link to='/username/tweetid'>
                                        <div id='visit-tweet-card'>
                                            <div className='col-2' id='user-image' ><img src={UserImage} alt='logo' /></div>
                                            <div className='col-10' id='user-tweet-message'>
                                                <Link to='/user/username'><p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetData.userName}</p></Link>
                                                <p id='tweet-username'>@{this.props.tweetData.FullName}</p><br />
                                                <p id='tweet-username'>{this.props.tweetData.TweetMessage}</p><br />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className='row'>
                                    <div className='col-2' id='user-image' ><img src={UserImage} alt='logo' /></div>
                                    <div className=" col-10">
                                        <textarea rows='3' id='textarea-newtweet' placeholder='comments' pattern="{1,280}"></textarea>
                                        <Link to='/user/home'><span id="images-upload" className='text-left'> <h3><FontAwesomeIcon icon={faImage} /></h3></span> </Link>
                                        <button className='btn btn-primary btn-md' id='tweet-button'>Comment</button>
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