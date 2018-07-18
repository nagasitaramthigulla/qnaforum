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
        minWidth: 400,
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

QuestionCard=(props)=>{
    const {classes}=props;
    const {data}=props;
    const bull = <span className={classes.bullet}>•</span>;
    return(
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {bull}{data.title}
                    </Typography>
                    <Typography component="p">
                        {data.description}
                    </Typography>
                    <Typography component="p" align="left">
                        asked on {data.date}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">view</Button>
                </CardActions>
            </Card>
        </div>
    );
}