import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import axios from 'axios';
import { theme } from "../AppBar";
import MenuAppBar from '../AppBar/MenuAppBar';
import { datediff, styles } from "./QuestionCard";
import Card from '@material-ui/core/Card';
import { withRouter, Link } from 'react-router-dom';
import { CardActions, CardContent, Typography } from '@material-ui/core';
import { ThumbUp, ThumbDown, Comment } from '@material-ui/icons';
import AnswerCard from './AnswerCard';
import Comments from './Comments';

class QuestionPage extends React.Component {
    state = {
        question: null,
        answers: null,
        user: null,
        next: null,
        prev: null
    };

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            question: null,
            answers: null,
            props: true
        };
    }

    componentDidMount() {
        this.getQuestion();
        this.getAnswers();
    }

    async getQuestion() {
        if (this.state.props == false)
            return;
        var id = this.state.id;
        var url = "http://" + window.location.host + "/api/getquestion/" + id + "/";
        axios.get(url).then((response) => {
            console.log(response);
            this.setState({
                question: response.data
            })
        }).catch((e) => {
        });
    }

    renderQuestion() {
        if (this.state.question == null)
            return <div></div>;
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="headline" component="h2" align="left">
                            {bull}{this.state.question.title}
                        </Typography>
                        <Typography component="p" align="left">
                            {this.state.question.description}
                        </Typography>
                        <Typography component="p" align="right">
                            asked {datediff(this.state.question.date)} ago by
                            <Link to={"/user/" + this.state.question.user.id}><span style={{ fontFamily: "Comic Sans MS" }}> {this.state.question.user.username}</span></Link>
                        </Typography>
                        <Comments forQuestion={true} id={this.state.question.id} />
                    </CardContent>
                    <CardActions>
                        <ThumbUp style={{ width: "40px" }} /><span>{this.state.question.upvotes}</span>
                        <ThumbDown style={{ width: "40px" }} /><span>{this.state.question.downvotes}</span>
                        <Comment style={{ width: "40px" }} /><span>{this.state.question.comments}</span>
                    </CardActions>
                </Card>
            </div>
        );
    }

    async getAnswers() {
        if (this.state.props == false)
            return;
        var id = this.state.id;
        var url = "http://" + window.location.host + "/api/answers-question/" + id + "/";
        axios.get(url).then((response) => {
            console.log(response);
            this.setState({
                answers: response.data.results,
                next: response.data.next,
                prev: response.data.prev,
            })
        }).catch((e) => {
        });
    }

    renderAnswers() {
        if (this.state.answers == null)
            return <div></div>;
        let answers = [];
        for (var i = 0; i < this.state.answers.length; i++) {
            answers.push(<AnswerCard key={i} data={this.state.answers[i]} />);
        }
        console.log(answers);
        return <div>{answers}</div>;
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MenuAppBar />
                {this.renderQuestion()}
                {this.renderAnswers()}
            </MuiThemeProvider>
        );
    }
}

QuestionPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(QuestionPage));