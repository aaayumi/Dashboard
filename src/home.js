import React from 'react';
import Arrowup from './img/arrowup.png';
import Arrowdown from './img/arrowdown.png';

class Home extends React.Component{
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
    const PaymentPanel = this.state.slideOpen? "slideOpen" : "";
        return(
    <div>
    <div id="PaymentPanel" className={PaymentPanel}>
    <p >Spent Last 14 days </p>
    <h1>$90,000.43</h1>
    <button onClick={this.handleClick}>{this.state.slideOpen? <img src={Arrowup} alt="arrowup" className="arrowup" /> : <img src={Arrowdown} alt="arrowdown" className="arrowdown"/>}</button>
    </div>

     <div>
    <ul>
    <li> List come here </li>
    <li> List come here </li>
    </ul>
    </div>
    </div>
        )
    }
}

export default Home
