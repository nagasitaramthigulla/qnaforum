import React from 'react';
import {withStyles,MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../AppBar";
import MenuAppBar from '../AppBar/MenuAppBar';
import axios from 'axios';

class User extends React.Component {
    state = {
        user:null,
        loadingmessage:"Loading.....",
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        var url = "http://" + window.location.host + "/api/user/" + id + "/";
        console.log(url);
        var self = this;
        axios.get(url).then((response) => {
            console.log(response);
            if (response.status === 200)
                self.setState({
                    user: response.data
                })
            else
                self.setState({
                    loadingmessage:"User not found"
                })
        })
    }



    render() {
        if (this.state.user === null)
            return (<MuiThemeProvider theme={theme}>
                <MenuAppBar/>
                <div style={{height:"200px"}}/>
                <div style={{fontSize:"40px"}}>{this.state.loadingmessage}</div>
            </MuiThemeProvider>);
        else
            return (
                <MuiThemeProvider theme={theme}>
                    <MenuAppBar/>
                    <div align="center">
                    <div style={{minHeight:"20px",maxHeight:"30px"}}></div>
                        <div style={{minWidth: "400px", maxWidth: "800px", marginLeft: "100px", marginRight: "100px"}}>
                            <div align="center"
                                 style={{fontSize: "40px", height: "50px"}}>{this.state.user.user.username}</div>
                            <table>
                            <tr align="left" style={{fontSize:"15px",height:"25px"}}><th>firstname:</th><td>{this.state.user.user.first_name}</td></tr>
                            <tr align="left" style={{fontSize:"15px",height:"25px"}}><th>lastname:</th><td>{this.state.user.user.last_name}</td></tr>
                            <tr align="left" style={{fontSize:"15px",height:"25px"}}><th>email:</th><td>{this.state.user.user.email}</td></tr>
                            <tr align="left" style={{fontSize:"15px",height:"25px"}}><th>points:</th><td>{this.state.user.points}</td></tr>
                            <tr align="left" style={{fontSize:"15px",height:"25px"}}><th>questions:</th><td>{this.state.user.questions}</td></tr>
                            <tr align="left" style={{fontSize:"15px",height:"25px"}}><th>answers:</th><td>{this.state.user.answers}</td></tr>
                            </table>
                        </div>
                    </div>
                </MuiThemeProvider>
            );
    }
}

export default User;