import React from 'react';
import {BrowserRouter as Router, Route,withRouter} from 'react-router-dom';
import Apputil from './Apputil';

export default class extends React.Component {
    render(){
        return(
            <div>
                <Router>
                    <Route component={Apputil}/>
                </Router>
            </div>
        )
    }
}