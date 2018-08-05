import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { styles } from "./QuestionCard";
import { withRouter } from 'react-router-dom';
import {  Typography } from '@material-ui/core';
import {  ExpandMore } from '@material-ui/icons';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';

class Comments extends React.Component {
    state = {
        comments: null,
        next: null,
        prev: null,
        id: null,
        forQuestion: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            next: null,
            prev: null,
            id: this.props.id,
            forQuestion: this.props.forQuestion,
        };
    }

    setResponse(url) {
        console.log(url);
        axios.get(url).then((response) => {
            if (response.status == 200) {
                this.setState({
                    comments: response.data.results,
                    next: response.data.next,
                    prev: response.data.previous,
                })
                console.log(response);
            }
        }).catch((e) => { console.log(e); })
    }

    getComments() {
        if (arguments.length === 1) {
            this.setResponse(arguments[0]);
            return;
        }
        if (this.state.forQuestion) {
            this.setResponse("http://" + window.location.host + "/api/question-comments/" + this.state.id + "/");
        }
        else {
            this.setResponse("http://" + window.location.host + "/api/answer-comments/" + this.state.id + "/");
        }
    }

    componentDidMount() {
        this.setState({
            forQuestion: this.props.forQuestion,
            id: this.props.id,
        });
        this.getComments();
    }

    renderComments() {
        if (this.state.comments !== null && this.state.comments !== undefined) {
            var comments = [];
            for (var i = 0; i < this.state.comments.length; i++) {
                var comment = this.state.comments[i];
                var cmt =
                    <tr key={i} style={{ border: "0px", margin: "0px", background: "transparent" }}>
                        <th align="left" style={{ border: "0px", margin: "0px" }}>
                            {comment.user.username}
                        </th>
                        <td align="left" style={{ border: "0px", margin: "0px", minWidth: "800px" }}>
                            {comment.text}
                        </td>
                    </tr>
                comments.push(cmt);
            }
            return <table style={{ border: "0px", margin: "0px", background: "transparent" }}><tbody>{comments}</tbody></table>;
        }
        return <div></div>;
    }

    render() {
        return (
            <div style={{ background: "#f7ffff" }}>
                <ExpansionPanel style={{ border: "1px", background: "transparent" }} elevation={0}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <Typography style={{ fontFamily: "Comic Sans MS", fontSize: "20px" }} align="left">
                            Comments
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.renderComments()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Comments));