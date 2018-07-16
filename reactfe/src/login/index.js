import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonAppBar from '../AppBar';
import Login from './login';
import Register from './register';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
const styles = {
    card: {
        minWidth: 100,
        MaxWidth:300,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};
class Loginscreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            loginscreen:[],
            loginmessage:'',
            buttonLabel:'Register',
            isLogin:true,
            title:"Login",
        }
    }
    handleClick(event,parent){
        // console.log("event",event);
        console.log("hi");
        var loginmessage;
        if(parent.state.isLogin){
            var loginscreen=[];
            loginscreen.push(<Register parentContext={parent}/>);
            loginmessage = "Already registered.Go to Login";
            parent.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Login",
                isLogin:false,
                title:"Register"
            })
        }
        else{
            var loginscreen=[];
            loginscreen.push(<Login parentContext={parent}/>);
            loginmessage = "Not Registered yet.Go to registration";
            parent.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Register",
                isLogin:true,
                title:"Login"
            })
        }
    }
    componentWillMount(){
        var loginscreen=[];
        loginscreen.push(<Login parentContext={this}/>);
        var loginmessage = "Not registered yet, Register Now";
        this.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage
        })
    }
    render() {
        const {classes}=this.props;
        return (
           <div>
               <ButtonAppBar title={this.state.title} button={this.state.buttonLabel} clickfun={this.handleClick} parent={this}/>

               {this.state.loginscreen}

           </div>
        );
    }
}
const style = {
    margin: 15,
};
Loginscreen.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Loginscreen);