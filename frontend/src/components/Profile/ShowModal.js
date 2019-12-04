import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import UserImage from '../../images/user-icon.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
// import './RetweetWithComment.css'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import ResultCard from '../Search/ResultCard'
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
        if (!this.props.showModal) {
            return null
        }

        const closeBtn = <button className="close" onClick={() => this.props.showFollowersModal()}>&times;</button>;
        console.log(this.props.modalData);
        let modalBody = this.props.modalData.map((user, index) => {
            return (
                <ResultCard
                    key={index}
                    indUser={user}
                />
            )
        })
        return (
            <div>
                <Modal isOpen={this.props.showModal} toggle={() => this.props.showFollowersModal()} className='modal-popup' scrollable>
                    <ModalHeader toggle={() => this.props.showFollowersModal()} close={closeBtn}></ModalHeader>
                    <ModalBody className="modal-body ">
                        {modalBody}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.props.showFollowersModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CommentOnTweet;