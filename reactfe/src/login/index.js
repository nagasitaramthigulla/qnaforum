import React, { Component } from 'react';
import ButtonAppBar from '../AppBar';
import Login from './login';
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
        loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
        var loginmessage = "Not registered yet, Register Now";
        this.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage
        })
    }
    render() {
        return (
           <div>
               <ButtonAppBar title={this.state.title} button={this.state.buttonLabel} clickfun={this.handleClick} parent={this}/>
           </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Loginscreen;