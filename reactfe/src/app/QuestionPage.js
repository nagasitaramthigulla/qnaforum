import React from 'react';
import PropTypes from 'prop-types';
import {withStyles,MuiThemeProvider} from "@material-ui/core/styles";
import axios from 'axios';
import {theme} from "../AppBar";
import MenuAppBar from '../AppBar/MenuAppBar';
import {datediff,styles} from "./QuestionCard";
import Card from '@material-ui/core/Card';
import {withRouter,Link} from 'react-router-dom';
import {CardActions,CardContent,Typography,Button} from '@material-ui/core';
import {ThumbUp,ThumbDown,Comment} from '@material-ui/icons';

class QuestionPage extends React.Component {
    state = {
        question: null,
        answers: null,
        user: null,
    };

    constructor(props){
        super(props);
        this.state={
            question: null,
            answers: null,
        };
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        var url = "http://" + window.location.host + "/api/getquestion/" + id + "/";
        axios.get(url).then((response) => {
            console.log(response);
            this.setState({
                question: response.data
            })
        }).catch((e) => {
        });
        url = "http://" + window.location.host + "/api/answers-question/" + id + "/";
        axios.get(url).then((response) => {
            this.setState({
                answers: response.data
            })
        }).catch((e) => {
        });
    }

    render() {
        const {classes} = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        if (this.state.question == null)
            return (<MuiThemeProvider theme={theme}>
                <MenuAppBar/></MuiThemeProvider>);
        return (
            <MuiThemeProvider theme={theme}>
                <MenuAppBar/>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="headline" component="h2" align="left">
                            {bull}{this.state.question.title}
                        </Typography>
                        <Typography component="p" align="left">
                            {this.state.question.description}
                        </Typography>
                        <Typography component="p" align="right">
                            asked {datediff(this.state.question.date)} ago<br/>
                            <Link to={"/user/" + this.state.question.user.id}>{this.state.question.user.username}</Link>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <ThumbUp style={{width: "40px"}}/><span>{this.state.question.upvotes}</span>
                        <ThumbDown style={{width: "40px"}}/><span>{this.state.question.downvotes}</span>
                        <Comment style={{width: "40px"}}/><span>{this.state.question.comments}</span>
                    </CardActions>
                </Card>
            </MuiThemeProvider>
        );
    }

}

QuestionPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(QuestionPage));