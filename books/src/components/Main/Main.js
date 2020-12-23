import React from 'react';
import Search from './Search/Search';
import Results from './Results/Results';
import './Main.css';
import Filters from './Filters/Filters';

class Main extends React.Component {

    render() {
        return <div className="Main">
            <div className="row">
                <div className="col-10">

                    <div className="row search">
                        <Search/>
                    </div>
                    <div className="row results">
                        <Results/>
                    </div>

                </div>
                <div className="col-2 filters">
                    <Filters/>
                </div>
            </div>
        </div>
    }

}

export default Main;