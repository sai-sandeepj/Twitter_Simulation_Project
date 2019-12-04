import React, { Component } from 'react';
import UserMessages from './UsersMessages'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import { Link } from 'react-router-dom';
import UserImage from '../../images/user-icon.png'
import NewConversation from './NewConversation'


class Conversations extends Component {
    constructor() {
        super()
        this.state = {
            conversations: null,
            otherUserName: null,
            otherFirstName: null,
            otherLastName: null,
            otherProfileImage: null,
            messages: null,
            message: null,
            showNewConversationModal: false
        }
    }

    componentDidMount = () => {
        const data = {
            userName: localStorage.getItem('userName')
        }
        axios.post(rootUrl + '/getConversations', data)
            .then(response => {
                console.log('conversations data:', response.data)
                if (response.status === 200) {
                    let conversations = response.data
                    this.setState({
                        conversations: conversations
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
    }
    checkUserMessages = (otherUserName, otherFirstName, otherLastName, otherProfileImage) => {
        console.log('in show messages');
        const data = {
            senderUserName: localStorage.getItem('userName'),
            receiverUserName: otherUserName
        }
        console.log('in usermessages component', data);

        axios.post(rootUrl + '/getMessages', data)
            .then(response => {
                console.log('messages data:', response.data)
                if (response.status === 200) {
                    console.log('response', response.data);

                    let messages = response.data
                    this.setState({
                        messages: messages,
                        otherUserName: otherUserName,
                        otherFirstName: otherFirstName,
                        otherLastName: otherLastName,
                        otherProfileImage: otherProfileImage
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
    }

    textChangeHandler = (e) => {
        // e.preventDefault()
        this.setState({
            message: e.target.value
        })
    }

    sendMessage = (receiverUserName, receiverFirstName, receiverLastName, receiverProfileImage) => {
        if (this.state.message != null && /\S/.test(this.state.message)) {
            let data = {
                message: this.state.message,
                receiverFirstName: receiverFirstName,
                receiverLastName: receiverLastName,
                receiverUserName: receiverUserName,
                receiverProfileImage: receiverProfileImage,

                senderFirstName: localStorage.getItem('firstName'),
                senderLastName: localStorage.getItem('lastName'),
                senderUserName: localStorage.getItem('userName'),
                senderProfileImage: localStorage.getItem('userName')
            }
            axios.post(rootUrl + '/setMessage', data)
                .then(response => {
                    console.log('messages data:', response.data)
                    if (response.status === 200) {
                        console.log('response', response.data);

                        axios.post(rootUrl + '/getMessages', data)
                            .then(response => {
                                console.log('messages data:', response.data)
                                if (response.status === 200) {
                                    console.log('response', response.data);

                                    let messages = response.data
                                    this.setState({
                                        messages: messages,
                                        message: ''

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
    }
    getConversationsfromModal = () => {
        const data = {
            userName: localStorage.getItem('userName')
        }
        axios.post(rootUrl + '/getConversations', data)
            .then(response => {
                console.log('conversations data:', response.data)
                if (response.status === 200) {
                    let conversations = response.data
                    this.startNewConversation()
                    this.setState({
                        conversations: conversations
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
    }

    startNewConversation = (e) => {
        this.setState({
            showNewConversationModal: !this.state.showNewConversationModal
        })

    }
    render() {
        let userConversations = null
        if (this.state.conversations) {

            userConversations = this.state.conversations.map((conversations, index) => {
                let otherUserName = null
                let otherFirstName = null
                let otherLastName = null
                let otherProfileImage = null
                if (conversations.sender.senderUserName !== localStorage.getItem('userName')) {
                    otherUserName = conversations.sender.senderUserName
                    otherFirstName = conversations.sender.senderFirstName
                    otherLastName = conversations.sender.senderlastName
                    otherProfileImage = conversations.sender.senderProfileImage
                }
                else {
                    otherUserName = conversations.receiver.receiverUserName
                    otherFirstName = conversations.receiver.receiverFirstName
                    otherLastName = conversations.receiver.receiverLastName
                    otherProfileImage = conversations.receiver.receiverProfileImage
                }
                return (
                    <div className="card row">

                        <button onClick={() => this.checkUserMessages(otherUserName, otherFirstName, otherLastName, otherProfileImage)} className='btn btn-' id='visit-tweet-card-messages'>
                            <div className='col-2' id='user-image' ><img src={UserImage} alt='logo' /></div>
                            <div className='col-10' id='user-tweet-message'>
                                <Link to='/user/username' id='tweet-fullname'><p className="font-weight-bold" id='tweet-fullname'>{otherFirstName}</p><p className="font-weight-bold" id='tweet-fullname'>{otherLastName}</p></Link>
                                <p id='tweet-username'>@{otherUserName}</p><br /><br />
                            </div>
                        </button>

                    </div>
                )
            })
        }

        return (
            <div>
                <div id='heading'>
                    <h4>Messages</h4>
                    <button onClick={this.startNewConversation} className='btn btn-' id='newconversation'>Start a new conversation</button>
                </div>
                <div className='row' id='messages-total'>
                    <div className='col-5 col-md-5 col-lg-4 col-xl-4'>
                        {userConversations}
                    </div>
                    <div className='col-7 col-md-7 col-lg-6 col-xl-6'>
                        <UserMessages
                            otherUserName={this.state.otherUserName}
                            otherFirstName={this.state.otherFirstName}
                            otherLastName={this.state.otherLastName}
                            otherProfileImage={this.state.otherProfileImage}
                            messages={this.state.messages}
                            message={this.props.message}
                            textChangeHandler={this.textChangeHandler.bind(this)}
                            sendMessage={this.sendMessage.bind(this)}
                        />
                    </div>
                </div>
                <NewConversation
                    showNewConversationModal={this.state.showNewConversationModal}
                    startNewConversation={this.startNewConversation.bind(this)}
                    getConversationsfromModal={this.getConversationsfromModal.bind(this)}
                    conversations={this.state.conversations}
                />
            </div>
        );
    }
}

export default Conversations;