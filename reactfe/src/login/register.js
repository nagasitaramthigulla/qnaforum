import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import axios from 'axios';
import Login from './login';
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
    }
    handleClick(event){
        var apiBaseUrl = "http://localhost/api/";
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload={
            "username":this.state.username,
            "first_name": this.state.first_name,
            "last_name":this.state.last_name,
            "email":this.state.email,
            "password":this.state.password
        }
        axios.post(apiBaseUrl+'api-signup-view/', payload)
            .then(function (response) {
                console.log(response);
                if(response.status == 200){
                    //  console.log("registration successfull");
                    var loginscreen=[];
                    loginscreen.push(<Login parentContext={this}/>);
                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Typography variant="title" color="inherit">
                                    Login
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <TextField
                            hintText="Enter your User Name"
                            floatingLabelText="User Name"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({first_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({last_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Register;