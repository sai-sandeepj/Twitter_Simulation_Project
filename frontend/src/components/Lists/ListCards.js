import React, { Component } from 'react';
import { Link } from "react-router-dom";
class ListCards extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let description = null;
        let list = this.props.list
        if (this.props.list.description) {
            description = (<div className="text-secondary">
                &nbsp;{this.props.list.description}
            </div>)
        }
        return (
            <div className="card text-left">
                <div className="card-body">
                    <p className="card-text font-weight-bold">{this.props.list.firstName} {this.props.list.lastName}</p>
                    <Link to={{
                        pathname: '/user/profile',
                        state: {
                            userName: this.props.list.userName
                        }
                    }}>@{this.props.list.userName}</Link>
                    <Link to={{
                        pathname: '/user/lists/id',
                        state: {
                            list
                        }
                    }}>{this.props.list.listName}</Link>
                    {description}
                </div>
            </div>
        )
    }
}

export default ListCards;