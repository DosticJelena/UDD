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
            advSelected1: "Field",
            advSelected2: "Field",
            value: "",
            advValue1: "",
            advValue2: "",
            operator: ""
        }
    }

    handleInputChange = (e, selectedType) => {
        if (selectedType === 0) {
            this.setState({[e.target.name]: e.target.value, value: e.target.value})
        } else if (selectedType === 1) {
            this.setState({[e.target.name]: e.target.value, advValue1: e.target.value})
        } else if (selectedType === 2) {
            this.setState({[e.target.name]: e.target.value, advValue2: e.target.value})
        } 
    }

    changeOperator = (value) => {
        this.setState({operator: value});
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

    checkSelected = (stateValue) => {
        let renderValue = ""
        if (stateValue === "Book Title") {
            renderValue = "title";
        } else if (stateValue === "Author First Name") {
            renderValue = "authorFName";
        } else if (stateValue === "Author Last Name") {
            renderValue = "authorLName";
        } else if (stateValue === "Genre") {
            renderValue = "genre";
        } else if (stateValue === "Content") {
            renderValue = "text";
        } 

        return renderValue;
    }

    render() {

        let selectedName = this.checkSelected(this.props.selected);
        let advSelected1 = this.checkSelected(this.props.advSelected1);
        let advSelected2 = this.checkSelected(this.props.advSelected2);


        return <div className="Search">
            {this.props.advancedMode ? <small onClick={this.props.switch}>Switch to Simple Search Mode</small> : <small onClick={this.props.switch}>Switch to Advanced Search Mode</small>}
            <hr/>
            {this.props.advancedMode ? 
                <div>
                    <div className="row">
                        <div className="col-5">
                            <label>Search Field</label>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {this.props.advSelected1}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,1)} name="Book Title" href="#/action-1">Book Title</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,1)} name="Author First Name" href="#/action-2">Author First Name</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,1)} name="Author Last Name" href="#/action-3">Author Last Name</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,1)} name="Genre" href="#/action-3">Genre</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,1)} name="Content" href="#/action-3">Content</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-5">
                            <label>Search Field</label>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                    {this.props.advSelected2}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,2)} name="Book Title" href="#/action-1">Book Title</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,2)} name="Author First Name" href="#/action-2">Author First Name</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,2)} name="Author Last Name" href="#/action-3">Author Last Name</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,2)} name="Genre" href="#/action-3">Genre</Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,2)} name="Content" href="#/action-3">Content</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="form-group">
                                <label>.</label>
                                <input onChange={(e) => this.handleInputChange(e,1)} value={this.state.advValue1} name={advSelected1} type="text" className="form-control" placeholder="Value"/>
                            </div>
                        </div>
                        <div className="col-2">
                            <label>Operator</label>
                            <div>
                                <button 
                                    onClick={() => this.changeOperator("AND")} 
                                    className={this.state.operator === "AND" ? "btn btn-dark mr-1" : "btn operator-btn btn-dark mr-1"}>
                                        AND
                                </button>
                                <button 
                                    onClick={() => this.changeOperator("OR")} 
                                    className={this.state.operator === "OR" ? "btn btn-dark mr-1" : "btn operator-btn btn-dark mr-1"}>
                                        OR
                                </button>
                                <button 
                                    onClick={() => this.changeOperator("NOT")} 
                                    className={this.state.operator === "NOT" ? "btn btn-dark mr-1" : "btn operator-btn btn-dark mr-1"}>
                                        NOT
                                </button>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="form-group">
                                <label>.</label>
                                <input onChange={(e) => this.handleInputChange(e,2)} value={this.state.advValue2} name={advSelected2} type="text" className="form-control" placeholder="Value"/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <button onClick={() => this.props.advancedSearch(advSelected1, this.state.advValue1, advSelected2, this.state.advValue2,this.state.operator, "regular")} className="btn btn-dark mr-1">Regular Search</button>
                            <button onClick={() => this.props.advancedSearch(advSelected1, this.state.advValue1, advSelected2, this.state.advValue2,this.state.operator, "fuzzy")} className="btn btn-dark mr-1">Fuzzy Search</button>
                            <button onClick={() => this.props.advancedSearch(advSelected1, this.state.advValue1, advSelected2, this.state.advValue2,this.state.operator, "prefix")} className="btn btn-dark mr-1">Prefix Search</button>
                            <button onClick={() => this.props.advancedSearch(advSelected1, this.state.advValue1, advSelected2, this.state.advValue2,this.state.operator, "phrase")} className="btn btn-dark">Phrase Search</button>
                        </div>
                    </div>
                </div>
            :
                <div className="row">
                    <div className="col-2">
                        <label>Search Field</label>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {this.props.selected}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,0)} name="Book Title" href="#/action-1">Book Title</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,0)} name="Author First Name" href="#/action-2">Author First Name</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,0)} name="Author Last Name" href="#/action-3">Author Last Name</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,0)} name="Genre" href="#/action-3">Genre</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.props.handleSelectedChange(e,0)} name="Content" href="#/action-3">Content</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>.</label>
                            <input onChange={(e) => this.handleInputChange(e,0)} value={this.state.value} name={selectedName} type="text" className="form-control" placeholder="Value"/>
                        </div>
                    </div>
                    <div className="col-6">
                        <label>Search Options</label>
                        <br/>
                        <button onClick={() => this.props.search(selectedName, this.state.value)} className="btn btn-dark mr-1">Regular Search</button>
                        <button onClick={() => this.props.fuzzySearch(selectedName, this.state.value)} className="btn btn-dark mr-1">Fuzzy Search</button>
                        <button onClick={() => this.props.prefixSearch(selectedName, this.state.value)} className="btn btn-dark mr-1">Prefix Search</button>
                        <button onClick={() => this.props.phraseSearch(selectedName, this.state.value)} className="btn btn-dark">Phrase Search</button>
                    </div>
                </div>
            }
                
        </div>
    }

}

export default Search;