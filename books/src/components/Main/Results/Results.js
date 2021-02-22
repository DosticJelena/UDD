import React from 'react';
import OneResult from './OneResult';

class Results extends React.Component {

    render() {
        return <div className="Results">
            <h4>Search Results</h4>
            <hr/>
            {this.props.results.filter(r => r.location.substr(r.location.length - 4) === ".pdf")
            .map((r,index) => 
            <OneResult 
            selected={this.props.selected}
            advSelected1={this.props.advSelected1}
            advSelected2={this.props.advSelected2} 
            advancedMode={this.props.advancedMode} 
            key={index} 
            r={r} />)}
        </div>
    }

}

export default Results;