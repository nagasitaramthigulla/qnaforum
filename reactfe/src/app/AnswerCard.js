import {Link, Redirect, withRouter} from 'react-router-dom';
import { datediff, styles } from "./QuestionCard";
import { ThumbUp, ThumbDown, Comment,Check} from '@material-ui/icons';
import {Card,CardActions,CardContent} from '@material-ui/core';
import Comments from './Comments';
import {Cookies} from 'react-cookie';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

class AnswerCard extends React.Component {
    state = {
        redirect: false
    };

    renderredirect() {
        if (this.state.redirect === true) {
            var cookies = new Cookies();
            cookies.set("redirect_url", "/question/" + this.props.data.id);
            return <Redirect exact from="/" to={{ pathname: "/redirect" }} />
        }
    }

    isAccepted(accepted){
        if(accepted)
            return <Check style={{color:'green',height:'30px',display:"flex"}}/>;
        return <Check style={{color:'#aa00ff','&:hover':{color:'green'}}}/>;
    }

    render() {
        const { classes } = this.props;
        const { data } = this.props;
        //const bull = <span className={classes.bullet}>•</span>;
        return (
            <div>
                {this.renderredirect()}
                <Card className={classes.card}>
                    <CardContent>
                        <Typography component="p" align="left">
                            {data.answer}
                        </Typography>
                        <Typography component="p" align="right">
                            asked {datediff(data.updated)} ago<br />
                            <Link to={"/user/" + data.user.id}>{data.user.username}</Link>
                        </Typography>
                        <Comments forQuestion={false} id={data.id} />
                    </CardContent>
                    <CardActions>
                        {this.isAccepted(data.accepted)}
                        <ThumbUp style={{ width: "40px" }} className={{'&:hover':{color:'green'}}} /><span>{data.upvotes}</span>
                        <ThumbDown style={{ width: "40px" }} /><span>{data.downvotes}</span>
                        <Comment style={{ width: "40px" }} /><span>{data.comments}</span>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

AnswerCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AnswerCard));