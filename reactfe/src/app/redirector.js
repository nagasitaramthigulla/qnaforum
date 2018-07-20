import React from 'react';
import {Redirect,withRouter} from 'react-router-dom';
import {Cookies} from 'react-cookie';

class Redirector extends React.Component {
    state = {
        redirect: false,
        redirect_url: ""
    };

    componentDidMount() {
        var cookies = new Cookies();
        var url = cookies.get("redirect_url");
        cookies.remove("redirect_url");
        console.log(url);
        this.setState({
            redirect: true,
            redirect_url: url
        })
    }

    render() {
        if (this.state.redirect===true)
            return (
                <Redirect exact to={{pathname: this.state.redirect_url}}/>
            );
        else
            return <div></div>;
    }
}

export default withRouter(Redirector);