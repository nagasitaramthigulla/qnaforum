import React from 'react';
import MenuAppBar from '../AppBar/MenuAppBar';

export default class Home extends React.Component{
    render(){
        return (<div>
            <h1>
                <MenuAppBar/>
            </h1>
        </div>)
    };
}