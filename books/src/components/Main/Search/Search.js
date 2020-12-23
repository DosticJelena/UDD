import React from 'react';

class Search extends React.Component {

    render() {
        return <div className="Search">
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input type="text" className="form-control" placeholder="Genre"/>
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First Name"/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name"/>
                    </div>
                </div>
            </div>
        </div>
    }

}

export default Search;