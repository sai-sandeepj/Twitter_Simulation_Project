import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Search.css'

library.add(faSearch)
class Search extends Component {
    state = {}
    render() {
        return (
            <div id = 'right'>
                <div id='right-component'>
                    <form className="form-inline">
                        <input className='form-control' type='search' id='searchbar' placeholder='Search'></input>
                        <button className="btn btn-primary" id='search-button' type="submit"><FontAwesomeIcon icon={faSearch}/></button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Search;