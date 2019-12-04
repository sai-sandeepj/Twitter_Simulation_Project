import React, { Component } from 'react'
import ResultCard from './ResultCard'
export class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Results: this.props.Results
        }
    }

    render() {
        console.log(this.props.Results);
        let parseresults = JSON.parse(this.props.Results)
        let results = null
        if (parseresults) {
            results = parseresults.map((user, index) => {
                return (
                    <ResultCard
                        key={index}
                        indUser={user}
                    />
                )
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
