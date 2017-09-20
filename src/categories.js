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
    <div>
    <div id="chart" className={CategoriesPanel}>
   <p>Data comes here</p>

    <div className="categoriesSlide" onClick={this.handleClick}>{this.state.slideOpen? <img src={Arrowup} alt="arrowup" className="arrowup" /> : <img src={Arrowdown} alt="arrowdown" className="arrowdown"/>}</div>
    </div>
     <div className="clear"> </div>
    </div>
        )
    }
}

export default Categories;
