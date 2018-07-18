import React from 'react';
import PropTypes from 'prop-types';
import MenuAppBar from '../AppBar/MenuAppBar';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import Button from '@material-ui/core/Button';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from '../AppBar';

const styles = theme => ({
    button: {
        margin: 2,
    },
    leftIcon: {
        marginRight: 2,
    },
    rightIcon: {
        marginLeft: 2,
    },
    iconSmall: {
        fontSize: 20,
    },
    div:{
        minWidth: 200,
        marginTop:20,
        marginBottom:20,
        marginLeft:60,
        marginRight:60,
    }

});

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            next:null,
            previous:null,
            response:false,
            questions:[],
        }
    }

    fetch(url){
        var self=this;
        axios.get(url).then((response)=>{
            console.log(response);
            console.log(response.data);
            if(response.status===200) {
                self.setState({
                    questions: response.data.results,
                    next:response.data.next,
                    previous:response.data.previous,
                    response:true,
                })
            }
        }).catch((e)=>{})
    }

    componentDidMount(){
        var {tag}=this.props.match.params;
        var url=window.location.protocol+'//'+window.location.host+"/api/question/";
        console.log("Tag:"+tag);
        //return;
        if(tag!==undefined&&tag!==null)
            url=url+tag+'/';
        console.log("home");
        this.fetch(url);
    }

    listquestions(){
        let questions=[];
        for(var i=0;i<this.state.questions.length;i++)
        {
            questions.push(<QuestionCard data={this.state.questions[i]}/>);
        }
        console.log(questions);
        return <div>{questions}</div>;
    }

    buttons(props) {
        const {classes} = props;
        var btns = [];
        if (this.state.previous !== null) {
            btns.push(<div style={{width:"50%",float:"left", height:"55px"}} align="left"><Button variant="contained" color="primary" className={classes.button} onClick={() => {
                this.fetch(this.state.previous)
            }}>
                <NavigateBefore className={classNames(classes.leftIcon, classes.iconSmall)}/>
                prev
            </Button></div>)
        }
        else{
            btns.push(<div style={{width:"50%",float:"left", height:"55px"}} align="left"></div>)
        }
        if (this.state.next !== null) {
            btns.push(<div style={{width:"50%",float:"right", height:"55px"}} align="right"><Button align="right" variant="contained" color="primary" className={classes.button} onClick={() => {
                this.fetch(this.state.next)
            }}>
                next
                <NavigateNext className={classNames(classes.rightIcon, classes.iconSmall)}/>
            </Button></div>)
        }
        else{
            btns.push(<div style={{width:"50%",float:"right", height:"55px"}} align="right"></div>)
        }
        if(this.state.previous===this.state.next)
            return <div></div>;
        return <div className={classes.div}>{btns}</div>
    }

    render(){
        const {history}=this.props;
        return (
            <div>
                <MenuAppBar history={history}/>
                <MuiThemeProvider theme={theme}>
                    {this.buttons(this.props)}
                    <br/>
                    <div>
                    {this.listquestions()}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);