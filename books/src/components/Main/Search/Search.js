import React from 'react';
import { Dropdown } from 'react-bootstrap';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            genre: "",
            firstName: "",
            lastName: "",
            content: "",
            selected: "Field",
            value: ""
        }
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value, value: e.target.value})
    }

    handleSelectedChange = (e) => {
        this.setState({selected: e.target.name})
    }

    render() {

        let selectedName = "";
        if (this.state.selected === "Book Title") {
            selectedName = "title";
        } else if (this.state.selected === "Author First Name") {
            selectedName = "authorFName";
        } else if (this.state.selected === "Author Last Name") {
            selectedName = "authorLName";
        } else if (this.state.selected === "Genre") {
            selectedName = "genre";
        } else if (this.state.selected === "Content") {
            selectedName = "text";
        } 

        return <div className="Search">
            {this.props.advancedMode ? <small onClick={this.props.switch}>Switch to Simple Search Mode</small> : <small onClick={this.props.switch}>Switch to Advanced Search Mode</small>}
            <hr/>
            {this.props.advancedMode ? 
                <div className="row">
                    <div className="col-5">
                        <div className="form-group">
                            <label>Title</label>
                            <input onChange={this.handleInputChange} name="title" type="text" className="form-control" placeholder="Title"/>
                        </div>
                    </div>
                    <div className="col-2">
                        <label>Operator</label>
                        <div>
                            <button className="btn btn-dark mr-1">AND</button>
                            <button className="btn btn-dark mr-1">OR</button>
                            <button className="btn btn-dark">NOT</button>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group">
                            <label>Genre</label>
                            <input onChange={this.handleInputChange} name="genre" type="text" className="form-control" placeholder="Genre"/>
                        </div>
                    </div>
                </div>
            :
                <div className="row">
                    <div className="col-2">
                        <label>Search Field</label>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Select Field
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.handleSelectedChange} name="Book Title" href="#/action-1">Book Title</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleSelectedChange} name="Author First Name" href="#/action-2">Author First Name</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleSelectedChange} name="Author Last Name" href="#/action-3">Author Last Name</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleSelectedChange} name="Genre" href="#/action-3">Genre</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleSelectedChange} name="Content" href="#/action-3">Content</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-5">
                        <div className="form-group">
                            <label>{this.state.selected}</label>
                            <input onChange={this.handleInputChange} value={this.state.value} name={selectedName} type="text" className="form-control" placeholder="Value"/>
                        </div>
                    </div>
                    <div className="col-5">
                        <label>Search Options</label>
                        <br/>
                        <button onClick={() => this.props.search(selectedName, this.state.value)} className="btn btn-dark mr-1">Regular Search</button>
                        <button onClick={() => this.props.fuzzySearch(selectedName, this.state.value)} className="btn btn-dark mr-1">Fuzzy Search</button>
                        <button onClick={() => this.props.prefixSearch(selectedName, this.state.value)} className="btn btn-dark">Prefix Search</button>
                    </div>
                </div>
            }
                
        </div>
    }

}

export default Search;