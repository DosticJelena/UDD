import React from 'react';
import axios from 'axios';

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            title: "",
            genre: "",
            synopsis: "",
            fName: "",
            lName: "",
            latitude: 0,
            longitude: 0
        }
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
        console.log(event.target.files[0]);
    };

    onFileUpload = () => {
        const formData = new FormData();
      
        formData.append(
            "files",
            this.state.selectedFile
        );
        formData.append(
            "title",
            this.state.title
        );
        formData.append(
            "genre",
            this.state.genre
        );
        formData.append(
            "authorFName",
            this.state.fName
        );
        formData.append(
            "authorLName",
            this.state.lName
        );
        axios.post(this.props.BASE_URL + "index/add", formData)
        .then(res => {
            this.setState({title: "",genre: "", selectedFile: null, fName: "", lName: ""})
        });
      };

    render() {
        return <div className="Filters">
            <h4>Add new file</h4>
            <hr/>
            <div className="form-group">
                <label>Author - First Name</label>
                <input onChange={this.handleInputChange} value={this.state.fName} name="fName" type="text" className="form-control" placeholder="First Name"/>
            </div>
            <div className="form-group">
                <label>Author - Last Name</label>
                <input onChange={this.handleInputChange} value={this.state.lName} name="lName" type="text" className="form-control" placeholder="Last Name"/>
            </div>
            <div className="form-group">
                <label>Book - Title</label>
                <input onChange={this.handleInputChange} value={this.state.title} name="title" type="text" className="form-control" placeholder="Title"/>
            </div>
            <div className="form-group">
                <label>Book - Genre</label>
                <input onChange={this.handleInputChange} value={this.state.genre} name="genre" type="text" className="form-control" placeholder="Genre"/>
            </div>
            <div className="form-group row">
                <div className="col-6">
                    <label>Latitude</label>
                    <input onChange={this.handleInputChange} value={this.state.latitude} name="latitude" type="number" className="form-control" placeholder="Latitude"/>
                </div>
                <div className="col-6">
                    <label>Longitude</label>
                    <input onChange={this.handleInputChange} value={this.state.longitude} name="longitude" type="number" className="form-control" placeholder="Longitude"/>
                </div>
            </div>
            <input onChange={this.onFileChange} className="add-file" type="file" name="file"/>
            <br/>
            <button onClick={this.onFileUpload} className="btn btn-dark add-btn">Add</button>

        </div>
    }

}

export default Filters;