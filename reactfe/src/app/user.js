import React from 'react';
import {Cookies} from 'react-cookie';
import {withStyles,MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../AppBar";
import MenuAppBar from '../AppBar/MenuAppBar';
import axios from 'axios';

class User extends React.Component {
    state = {
        user:null
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
        })
    }



    render() {
        if (this.state.user === null)
            return (<MuiThemeProvider theme={theme}>
                <MenuAppBar/>
                <div style={{fontSize:"40px"}}>User not found</div>
            </MuiThemeProvider>);
        else
            return (
                <MuiThemeProvider theme={theme}>
                    <MenuAppBar/>
                    <div align="center">
                        <div style={{minWidth: "400px", maxWidth: "800px", marginLeft: "100px", marginRight: "100px"}}>
                            <div align="center"
                                 style={{fontSize: "40px", height: "50px"}}>{this.state.user.user.username}</div>
                            <div align="left" style={{fontSize:"15px",height:"25px"}}>firstname:{this.state.user.user.first_name}</div>
                            <div align="left" style={{fontSize:"15px",height:"25px"}}>lastname:{this.state.user.user.last_name}</div>
                            <div align="left" style={{fontSize:"15px",height:"25px"}}>email:{this.state.user.user.email}</div>
                            <div align="left" style={{fontSize:"15px",height:"25px"}}>points:{this.state.user.points}</div>
                            <div align="left" style={{fontSize:"15px",height:"25px"}}>questions:{this.state.user.questions}</div>
                            <div align="left" style={{fontSize:"15px",height:"25px"}}>answers:{this.state.user.answers}</div>
                        </div>
                    </div>
                </MuiThemeProvider>
            );
    }
}

export default User;