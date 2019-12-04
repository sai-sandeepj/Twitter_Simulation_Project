import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Search.css'
import axios from 'axios';
import rootUrl from "../Config/Settings";
import swal from "sweetalert"
import SearchResults from './SearchResults'

library.add(faSearch)
class Search extends Component {
    constructor(){
        super()
        this.state = {
            searchElement : null,
            searchResults :null
        }
    }
    handleSearchChange = (e) => {
        this.setState({
            searchElement : e.target.value
        })
    }
    handleSearch = (e) => {
        e.preventDefault()
        const data = {
            findName : this.state.searchElement
        }
        axios.post(rootUrl + '/findUsers', data)
            .then(response => {
                console.log('liked data:', response.data)
                if (response.status === 200) {
                    this.setState({
                        searchResults: response.data
                    })
                    console.log(this.state.searchResults);
                }
                else {
                    console.log("Didn't fetch liked tweets data")
                }
            }).catch((err) => {
                if (err) {
                    swal('erroer connecting to database')
                }
            });
    }
    render() {
        let searchResults = null
        if(this.state.searchResults){
            searchResults = <SearchResults Results= {JSON.stringify(this.state.searchResults)} />
        }
        return (
            <div>
                <div id='right-component'>
                    <form className="form-inline">
                        <input onChange = {this.handleSearchChange.bind(this)} className='form-control col-8 col-md-10 col-lg-8' type='search' id='searchbar' placeholder='Search'></input>
                        <button onClick = {this.handleSearch.bind(this)}className="btn btn-primary col-2" id='search-button' type="submit"><FontAwesomeIcon icon={faSearch}/></button>
                    </form>
                    <div className = 'col-10' id = 'searchresults'>
                        {searchResults}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;