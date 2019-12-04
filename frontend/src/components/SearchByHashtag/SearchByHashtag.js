import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import { Redirect } from 'react-router'

library.add(faSearch)

class SearchByHashtag extends Component {

    constructor() {
        super()
        this.state = {
            searchElement: null,
            searchResults: null,
            red: null
        }
    }
    handleSearchChange = (e) => {
        this.setState({
            searchElement: e.target.value
        })
    }
    handleSearch = (e) => {
        e.preventDefault()
        const data = {
            hashTag: this.state.searchElement
        }
        axios.post(rootUrl + '/searchByHashTag', data)
            .then(response => {
                console.log('searchByHashTag data:', response.data)
                if (response.status === 200) {
                    localStorage.setItem("searchElement", this.state.searchElement)

                    this.setState({
                        searchResults: response.data,
                        red: <Redirect to={{
                            pathname: '/searchbyhashtag',
                            state: response.data
                        }} />
                    })
                    console.log(this.state.searchResults);
                    // window.location.reload()
                    // this.props.history.push('/searchbyhashtag')
                }
                // else {
                //     console.log("Didn't fetch searchByHashTag tweets data")
                // }
            }).catch((err) => {
                if (err) {
                    swal('erroer connecting to database search by hashtag')
                }
            });
    }

    render() {
        let redirectVar
        // if (localStorage.getItem('searchresults')) {
        //     redirectVar = <Redirect to='/searchbyhashtag' />
        // }
        return (
            <div>
                {redirectVar}
                {this.state.red}
                <form className="form-inline">
                    <input onChange={this.handleSearchChange.bind(this)} className='form-control col-8 col-md-10 col-lg-8' type='search' id='searchbar' placeholder='Search'></input>
                    <button onClick={this.handleSearch.bind(this)} className="btn btn-primary col-2" id='search-button' type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </form>
            </div>
        )
    }
}

export default SearchByHashtag
