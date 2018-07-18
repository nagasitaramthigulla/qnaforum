import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RicTextEditorExample from './MyEditor.js';
import LoginScreen from './login';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Cookies} from 'react-cookie';
import {BrowserRouter as Router, Route,withRouter,Redirect} from 'react-router-dom';
import Home from './app/home';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import createHistory from "history/createBrowserHistory"
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class Apputil extends Component {

    constructor(props){
        super(props);
        this.cookies=new Cookies();
        this.state={token:this.cookies.get('token'),login:true}
    }

    componentDidMount(){
        console.log(window.location.href);
        var self = this;
        console.log(this.state.token);
        if(this.state.token!=null)
        {
            console.log("mount");
            axios.post("http://"+window.location.host+'/api/api-token-refresh/',{'token':this.state.token}).then(function (response) {
                if(response.status==200)
                {
                    self.setState({
                        token:self.cookies.get('token'),
                        login:true,
                    })
                }
                else{
                    self.setState({
                        token:null,
                        login:false,
                    })
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else{
            this.setState({
                token:null,
                login:false,
            })
        }
    }
    render() {
        const history=createHistory();
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Route exact path="/login" component={LoginScreen}/>
                        <Route exact path="/" component={Home}/>
                        <Route  path="/search/:tag" component={Home}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Apputil;
