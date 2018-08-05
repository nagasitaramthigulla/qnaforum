import React from 'react';
import PropTypes from 'prop-types';
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

        width: 200,
    },
    menu: {
        width: 200,
    },
    card: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 200,
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
    button: {
        margin: theme.spacing.unit,
    },
});

class Login extends React.Component{
    state={
        username:"",
        passsword:"",
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
            "password": this.state.password
        }

        axios.post(apiBaseUrl+'api-token-auth/',payload)
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
                        <Button variant="contained" color="secondary" className={classes.button} onClick={(event)=>this.handleClick(event)}>
                            Login
                        </Button>
            </MuiThemeProvider>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Login));