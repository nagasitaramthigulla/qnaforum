import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {theme} from "./index";
import { createMuiTheme ,MuiThemeProvider } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';
import createHistory from "history/createBrowserHistory"

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

};

class MenuAppBar extends React.Component{
    cookies=new Cookies();
    state = {
        value:"",
        auth: true,
        anchorEl: null,
        redirect:false,
        redirect_url:"",
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    logout=()=>{
        this.handleClose();
        this.cookies.remove('token');
        this.setState({
            redirect:true,
            redirect_url:"login",
        })
    }
    renderredirect=()=>{
        console.log(this.state.redirect_url);
        var cookies=new Cookies();
        cookies.set("redirect_url",this.state.redirect_url);
        if(this.state.redirect){
            return <Redirect exact from="/" to={{pathname:"/redirect"}}/>
            }
    }
    componentDidMount(){
        console.log(window.location.href);
        this.setState({
            redirect:false,
        })
        if(this.cookies.get("token")==undefined||this.cookies.get("token")==null)
        {
            this.logout();
            return;
        }
    }

    search() {
        //const {history}=this.props;
        var url = '/search/' + this.state.value;
        //history.push(url);
        this.setState({
            redirect:true,
            redirect_url:url,
        })
    }

    render(){
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
            <MuiThemeProvider theme={theme} >
                {this.renderredirect()}
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" arial-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex} align="left">
                            QnA Forum
                        </Typography>
                        <SearchBar
                            value={this.state.value}
                            onChange={(newValue) => this.setState({ value: newValue,redirect:false })}
                            onRequestSearch={()=>{this.search()}}
                        />
                        <div>
                            <IconButton
                                aria-owns={open?'menu-appbar':null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <div style={{height:"70px",width:"100%"}}></div>
            </MuiThemeProvider>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);