import React from 'react';

class OneResult extends React.Component {

    render() {
        return <div className="OneResult">
            <h5>{this.props.r.title}</h5>
            <p>[ <em>{this.props.r.location.substr(this.props.r.location.length - 3)}</em> ]</p>
            <hr/>
            <div className="row">
                <div className="col-2">
                    <p>Genre: {this.props.r.genre}</p>
                    <p>Author: {this.props.r.authorFName} {this.props.r.authorLName}</p>
                </div>
                <div className="col-6 highlight">
                    <small>{this.props.r.text.slice(0,300)}</small>
                </div>
            </div>
        </div>
    }

}

export default OneResult;