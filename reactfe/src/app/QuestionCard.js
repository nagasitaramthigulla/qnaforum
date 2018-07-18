import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 200,
        marginTop:20,
        marginBottom:20,
        marginLeft:60,
        marginRight:60,
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
};

function datediff(data){
    var past=new Date(data);
    var today=new Date();
    var diff=parseInt((today-past)/1000);
    if(diff<60)
    {
        return ""+diff+" seconds";
    }
    diff=diff/60;
    diff=parseInt(diff);
    if(diff<60)
        return ""+diff+" minutes";
    diff=diff/60;
    diff=parseInt(diff);
    if(diff<24)
        return ""+diff+" hours";
    diff=diff/24;
    diff=parseInt(diff);
    if(diff<30)
        return ""+diff+" days";
    diff=diff/30;
    diff=parseInt(diff);
    if(diff<12)
        return ""+diff+" months";
    diff=diff/12;
    diff=parseInt(diff);
    return ""+diff+" years";
}

function  QuestionCard(props){
    const {classes}=props;
    const {data}=props;
    const bull = <span className={classes.bullet}>•</span>;
    return(
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="headline" component="h2" align="left">
                        {bull}{data.title}
                    </Typography>
                    <Typography component="p" align="left">
                        {data.description}
                    </Typography>
                    <Typography component="p" align="right">
                        asked {datediff(data.date)} ago
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="secondary">view</Button>
                </CardActions>
            </Card>
        </div>
    );
}

QuestionCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionCard);