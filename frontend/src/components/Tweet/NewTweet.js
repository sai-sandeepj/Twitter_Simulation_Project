import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFeatherAlt } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import './NewTweet.css'
import swal from "sweetalert"


library.add(
    faHome,
    faImage,
    faFeatherAlt
)

class NewTweet extends Component {
    constructor() {
        super()
        this.state = {
            tweetMsg: null,
            tweetMedia: null,
        }
    }
    TweetMsgChange = (e) => {
        this.setState({
            tweetMsg: e.target.value
        })
        console.log(this.state.tweetMsg);

    }

    newTweet = () => {
        const data = {
            userName: localStorage.getItem('userName'),
            tweetMsg: this.state.tweetMsg,
            tweetMedia: this.state.tweetMedia,
            isRetweet: false
        }
        console.log(data);
        axios.post(rootUrl + '/addNewTweet', data)
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
                // alert("User credentials not valid. Please try again!");
            })
    }
    render() {
        return (
            <div className='card row new-tweet'>
                <form>
                    <div className="form-group" id='new-tweet-form-group' >
                        <textarea onChange={this.TweetMsgChange.bind(this)} className="form-control" rows='3' id='textarea-newtweet' placeholder='Whats Happening?' pattern="{1,280}"></textarea>
                        <Link to='/user/home'><span id="images-upload" className='text-left'> <h3><FontAwesomeIcon icon={faImage} /></h3></span> </Link>
                        <button onClick={this.newTweet.bind(this)} className='btn btn-primary btn-md float-right' id='tweet-button'><FontAwesomeIcon icon={faFeatherAlt} />Tweet</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewTweet;