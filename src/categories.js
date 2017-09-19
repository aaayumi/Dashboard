import React, { Component } from 'react';
import Arrowup from './img/arrowup.png';
import Arrowdown from './img/arrowdown.png';

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideOpen : false
        }

   this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            slideOpen : !this.state.slideOpen
        })
        console.log(!this.state.slideOpen)
    }
    render(){
    const CategoriesPanel = this.state.slideOpen? "slideOpen" : "";
        return(
    <div id="Categories" >
    <div id="chart" className={CategoriesPanel}>
    <button onClick={this.handleClick}>{this.state.slideOpen? <img src={Arrowup} alt="arrowup" className="arrowup" /> : <img src={Arrowdown} alt="arrowdown" className="arrowdown"/>}</button>
   </div>
    <div className="clear">Question List come hre </div>
    </div>
        )
    }
}

export default Categories;
