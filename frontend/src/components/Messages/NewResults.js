import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserImage from '../../images/user-icon.png'


export class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {

        console.log(this.props.Results);
        let parseresults = JSON.parse(this.props.Results)
        let results = null
        if (parseresults) {
            results = parseresults.map((user, index) => {
                if (user.userName !== localStorage.getItem('userName')) {
                    let profileImage = "default_avatar.png"
                    if (user.profileImage) {
                        profileImage = user.profileImage
                    }
                    return (
                        <div className="card row">
                            <button className='btn btn-' onClick={() => this.props.startConversaton(user.userName, user.firstName, user.LastName, profileImage)}>
                                <div id='visit-tweet-card'>
                                    <div className='col-2' id='user-image' ><img src={UserImage} alt='logo' /></div>
                                    <div className='col-10' id='user-tweet-message'>
                                        <Link to='/user/username' id='tweet-fullname'><p className="font-weight-bold" id='tweet-fullname'>{user.firstName}</p><p className="font-weight-bold" id='tweet-fullname'>{user.lastName}</p></Link>
                                        <p id='tweet-username'>@{user.userName}</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    )
                }
            })

        }


        return (
            <div>
                {results}
            </div>
        )
    }
}

export default SearchResults
