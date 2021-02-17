import React from 'react';
import Search from './Search/Search';
import Results from './Results/Results';
import './Main.css';
import Filters from './Filters/Filters';
import axios from 'axios';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            BASE_URL: "http://127.0.0.1:8080/",
            results: [],
            advancedMode: false
        }
    }

    switchSearchMode = () => {
        this.setState({advancedMode: !this.state.advancedMode})
    }

    search = (_field,_value) => {
        axios.post(this.state.BASE_URL + "search/term/",{
            field: _field,
            value: _value
        })
        .then(res => {
            this.setState({results: res.data});
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    fuzzySearch = (_field,_value) => {
        axios.post(this.state.BASE_URL + "search/fuzzy/",{
            field: _field,
            value: _value
        })
        .then(res => {
            this.setState({results: res.data});
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    prefixSearch = (_field,_value) => {
        axios.post(this.state.BASE_URL + "search/prefix/",{
            field: _field,
            value: _value
        })
        .then(res => {
            this.setState({results: res.data});
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    render() {
        return <div className="Main">
            <div className="row">
                <div className="col-9">

                    <div className={this.state.advancedMode ? "row search" : "row search-2"}>
                        <Search switch={this.switchSearchMode} advancedMode={this.state.advancedMode} search={this.search} fuzzySearch={this.fuzzySearch} prefixSearch={this.prefixSearch}/>
                    </div>
                    <div className={this.state.advancedMode ? "row results" : "row results-2"}>
                        <Results results={this.state.results}/>
                    </div>

                </div>
                <div className="col-3 filters">
                    <Filters BASE_URL={this.state.BASE_URL}/>
                </div>
            </div>
        </div>
    }

}

export default Main;