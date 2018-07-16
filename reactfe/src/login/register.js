import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from '../AppBar';
import axios from 'axios';
import {Redirect,withRouter} from 'react-router-dom';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    card: {
        minWidth: 100,
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
});

class Register extends React.Component{
    state={
        username:"",
        passsword:"",
        first_name:"",
        last_name:"",
        email:"",
        redirect:false
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });

    };
    handleClick(event) {
        var apiBaseUrl = "api/";
        var self = this;
        var payload = {
            "username": this.state.username,
            "password": this.state.password,
            "email":this.state.email,
            "last_name":this.state.last_name,
            "first_name":this.state.first_name
        }
        console.log(payload);
        axios.post(apiBaseUrl+'api-signup-view/',payload)
            .then(function (response) {
                console.log(response);
                if(response.status==200)
                {
                    self.setState({
                        redirect:true
                    })
                }
            })
    }
    redirect(){
        if(this.state.redirect)
            return <Redirect to={{pathname:"/"}}/>
    }
    render(){
        const {classes}=this.props;
        return(
            <MuiThemeProvider theme={theme}>
                {this.redirect()}
                <TextField
                    id="id_username"
                    label="Username"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                />
                <br/>
                <TextField
                    id="id_password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <br/>
                <TextField
                    id="id_email"
                    label="Email"
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <br/>
                <TextField
                    id="id_first_name"
                    label="Firstname"
                    className={classes.textField}
                    value={this.state.first_name}
                    onChange={this.handleChange('first_name')}
                    margin="normal"
                />
                <br/>
                <TextField
                    id="id_last_name"
                    label="Lastname"
                    className={classes.textField}
                    value={this.state.last_name}
                    onChange={this.handleChange('last_name')}
                    margin="normal"
                />
                <br/>
                <Button variant="contained" color="secondary" className={classes.button} onClick={(event)=>this.handleClick(event)}>
                    Register
                </Button>
            </MuiThemeProvider>
        );
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Register));