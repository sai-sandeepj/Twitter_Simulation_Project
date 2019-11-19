import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import UserImage from '../../images/user-icon.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import './RetweetWithComment.css'

library.add(
    faFeatherAlt, faImage
)
class RetweetWithCommentModal extends Component {

    render() {
        if (!this.props.modal) {
            return null
        }
        const closeBtn = <button className="close" onClick={() => this.props.toggle()}>&times;</button>;

        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={() => this.props.toggle()} className='modal-popup' scrollable>
                    <ModalHeader toggle={() => this.props.toggle()} close={closeBtn}></ModalHeader>
                    <ModalBody className="modal-body row">
                        <div className='col-1' id='user-image' ><img src={UserImage} alt='logo' /></div>
                        <div className="form-group col-10" >
                            <form>
                                <textarea className="form-control" rows='3' id='textarea-newtweet' placeholder='comments' pattern="{1,280}"></textarea>
                                <div className="card row" id='retweetingTweet'>
                                    <Link to='/username/tweetid'>
                                        <div id='visit-tweet-card'>
                                            <div className='col-2' id='user-image' ><img src={UserImage} alt='logo' /></div>
                                            <div className='col-10' id='user-tweet-message'>
                                                <Link to='/user/username'><p className="font-weight-bold" id='tweet-fullname'>{this.props.tweetData.fullName}</p></Link>
                                                <p id='tweet-username'>@{this.props.tweetData.userNmae}</p><br />
                                                <p id='tweet-username'>{this.props.tweetData.TweetMessage}</p><br />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/user/home'><span id="images-upload" className='text-left'> <h3><FontAwesomeIcon icon={faImage} /></h3></span> </Link>
                                    <button className='btn btn-primary btn-md' id='tweet-button'><FontAwesomeIcon icon={faFeatherAlt} />retweet</button>
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