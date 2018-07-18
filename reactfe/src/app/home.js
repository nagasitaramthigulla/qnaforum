import React from 'react';
import MenuAppBar from '../AppBar/MenuAppBar';
import axios from 'axios';

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            questions:[],
        }
    }

    componentDidMount(){
        var {tag}=this.props;
        var url="question/";
        if(tag!==undefined&&tag!==null)
            url=url+tag+'/';
        var self=this;
        axios.get(url).then((response)=>{
            questions=response.data;
        })
    }
    render(){
        return (
            <div>
                <MenuAppBar/>
            </div>
        );
    }
}