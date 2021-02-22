import React from 'react';
import Search from './Search/Search';
import Results from './Results/Results';
import './Main.css';
import Filters from './Filters/Filters';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            BASE_URL: "http://127.0.0.1:8080/",
            results: [],
            advancedMode: false,
            selected: "Field",
            advSelected1: "Field",
            advSelected2: "Field",
        }
    }

    handleSelectedChange = (e, selectedType) => {
        if (selectedType === 0) {
            this.setState({selected: e.target.name})
        } else if (selectedType === 1) {
            this.setState({advSelected1: e.target.name})
        } else if (selectedType === 2) {
            this.setState({advSelected2: e.target.name})
        }
    }

    switchSearchMode = () => {
        this.setState({advancedMode: !this.state.advancedMode})
    }

    search = (_field,_value) => {
        if (_field === "") {
            NotificationManager.warning('Field is not selected.', 'Warning', 3000);
        }
        if (_value === "") {
            NotificationManager.warning('Value is not entered.', 'Warning', 3000);
        }
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
        if (_field === "") {
            NotificationManager.warning('Field is not selected.', 'Warning', 3000);
        }
        if (_value === "") {
            NotificationManager.warning('Value is not entered.', 'Warning', 3000);
        }
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
        if (_field === "") {
            NotificationManager.warning('Field is not selected.', 'Warning', 3000);
        }
        if (_value === "") {
            NotificationManager.warning('Value is not entered.', 'Warning', 3000);
        }
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

    phraseSearch = (_field,_value) => {
        if (_field === "") {
            NotificationManager.warning('Field is not selected.', 'Warning', 3000);
        }
        if (_value === "") {
            NotificationManager.warning('Value is not entered.', 'Warning', 3000);
        }
        axios.post(this.state.BASE_URL + "search/phrase",{
            field: _field,
            value: _value
        })
        .then(res => {
            this.setState({results: res.data});
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    advancedSearch = (_field1, _value1, _field2, _value2, _operator, _type) => {
        if (_field1 === "" || _field2 === "") {
            NotificationManager.warning('Field is not selected.', 'Warning', 3000);
        }
        if (_value1 === "" || _value2 === "") {
            NotificationManager.warning('Value is not entered.', 'Warning', 3000);
        }
        axios.post(this.state.BASE_URL + "search/boolean/" + _type,{
            field1: _field1,
            value1: _value1,
            field2: _field2,
            value2: _value2,
            operation: _operator
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
                        <Search switch={this.switchSearchMode} 
                        advancedMode={this.state.advancedMode} 
                        search={this.search} 
                        fuzzySearch={this.fuzzySearch} 
                        prefixSearch={this.prefixSearch}
                        phraseSearch={this.phraseSearch}
                        advancedSearch={this.advancedSearch}
                        handleSelectedChange={this.handleSelectedChange}
                        selected={this.state.selected}
                        advSelected1={this.state.advSelected1}
                        advSelected2={this.state.advSelected2}/>
                    </div>
                    <div className={this.state.advancedMode ? "row results" : "row results-2"}>
                        <Results 
                        results={this.state.results} 
                        advancedMode={this.state.advancedMode}
                        selected={this.state.selected}
                        advSelected1={this.state.advSelected1}
                        advSelected2={this.state.advSelected2}/>
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