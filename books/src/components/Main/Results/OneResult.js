import React from 'react';

class OneResult extends React.Component {

    render() {
        return <div className="OneResult">
            {(this.props.selected === "Book Title" || this.props.advSelected1 === "Book Title" || this.props.advSelected2 === "Book Title") && this.props.changeHighlights
            ?
            this.props.advancedMode 
            ?
            <h5><strong>{this.props.r.title}</strong></h5>
            :
            <h5><div dangerouslySetInnerHTML={{__html: this.props.r.highlight}} /></h5>
            :
            <h5>{this.props.r.title}</h5>
            }
            <p>[ <em>{this.props.r.location.substr(this.props.r.location.length - 3)}</em> ]</p>
            <hr/>
            <div className="row">
                <div className="col-2">
                    {(this.props.selected === "Genre" || this.props.advSelected1 === "Genre" || this.props.advSelected2 === "Genre") && this.props.changeHighlights  
                    ?
                    <p>Genre: <strong>{this.props.r.genre}</strong></p>
                    :
                    <p>Genre: {this.props.r.genre}</p>
                    }
                    {(this.props.selected === "Author First Name" || this.props.advSelected1 === "Author First Name" || this.props.advSelected2 === "Author First Name") && this.props.changeHighlights
                    ?
                    <p>Author: <strong>{this.props.r.authorFName}</strong> {this.props.r.authorLName}</p>
                    :
                    (this.props.selected === "Author Last Name" || this.props.advSelected1 === "Author Last Name" || this.props.advSelected2 === "Author Last Name") && this.props.changeHighlights
                    ?
                    <p>Author: {this.props.r.authorFName} <strong>{this.props.r.authorLName}</strong></p>
                    :
                    <p>Author: {this.props.r.authorFName} {this.props.r.authorLName}</p>
                    }
                    <p>Location: {this.props.r.latitude}, {this.props.r.longitude}</p>
                </div>
                <div className="col-6 highlight">
                    {this.props.selected === "Content" && this.props.changeHighlights && !this.props.advancedMode
                    ? 
                    <div dangerouslySetInnerHTML={{__html: '...' + this.props.r.highlight + '...'}} />
                    : 
                    <div>{this.props.r.text.slice(0,300)}</div>
                    }
                </div>
                <div className="col-4 highlight">
                    <p>Keywords:</p>
                    {(this.props.selected === "Keywords" || this.props.advSelected1 === "Keywords" || this.props.advSelected2 === "Keywords") && this.props.changeHighlights
                    ? 
                    this.props.advancedMode 
                    ?
                    <p><strong>{this.props.r.keywords}</strong></p>
                    :
                    <div dangerouslySetInnerHTML={{__html: this.props.r.highlight}} />
                    : 
                    <p>{this.props.r.keywords}</p>
                    }
                </div>
            </div>
        </div>
    }

}

export default OneResult;

// <small>{this.props.r.text.slice(0,300)}</small>