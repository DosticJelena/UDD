import React from 'react';

class OneResult extends React.Component {

    render() {
        return <div className="OneResult">
            {this.props.selected === "Book Title" || this.props.advSelected1 === "Book Title" || this.props.advSelected2 === "Book Title"
            ?
            <h5><strong>{this.props.r.title}</strong></h5>
            :
            <h5>{this.props.r.title}</h5>
            }
            <p>[ <em>{this.props.r.location.substr(this.props.r.location.length - 3)}</em> ]</p>
            <hr/>
            <div className="row">
                <div className="col-2">
                    {this.props.selected === "Genre" || this.props.advSelected1 === "Genre" || this.props.advSelected2 === "Genre" 
                    ?
                    <p>Genre: <strong>{this.props.r.genre}</strong></p>
                    :
                    <p>Genre: {this.props.r.genre}</p>
                    }
                    {this.props.selected === "Author First Name" || this.props.advSelected1 === "Author First Name" || this.props.advSelected2 === "Author First Name"
                    ?
                    <p>Author: <strong>{this.props.r.authorFName}</strong> {this.props.r.authorLName}</p>
                    :
                    this.props.selected === "Author Last Name" || this.props.advSelected1 === "Author Last Name" || this.props.advSelected2 === "Author Last Name"
                    ?
                    <p>Author: {this.props.r.authorFName} <strong>{this.props.r.authorLName}</strong></p>
                    :
                    <p>Author: {this.props.r.authorFName} {this.props.r.authorLName}</p>
                    }
                    
                </div>
                <div className="col-6 highlight">
                    {!this.props.advancedMode && this.props.selected !== "Content"
                    ? 
                    <div>{this.props.r.text.slice(0,300)}</div>
                    : 
                    this.props.advancedMode
                    ?
                    <div>{this.props.r.text.slice(0,300)}</div>
                    :
                    <div dangerouslySetInnerHTML={{__html: '...' + this.props.r.highlight + '...'}} />
                    }
                </div>
            </div>
        </div>
    }

}

export default OneResult;

// <small>{this.props.r.text.slice(0,300)}</small>