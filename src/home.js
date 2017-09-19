import React from 'react';
import Arrowup from './img/arrowup.png';
import Arrowdown from './img/arrowdown.png';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideOpen : false,
            priceBar: false
        }

   this.handleClick = this.handleClick.bind(this);
   this.clickHandle = this.clickHandle.bind(this);
    }

    handleClick() {
        this.setState({
            slideOpen : !this.state.slideOpen
        })

    }

    clickHandle() {
    this.setState({ priceBar : !this.state.priceBar })
    console.log(!this.state.priceBar)
    }

    render(){
    const PaymentPanel = this.state.slideOpen? "slideOpen" : "";
    return(
    <div>
    <div id="PaymentPanel" className={PaymentPanel}>
    <p className="PaymentTitle"　onClick={this.clickHandle}>{!this.state.priceBar? "Spent Last 14 Days ▼" : "Spent Last 30 Days ▲"}</p>
    <h2>{!this.state.priceBar? "$9,964.55" : "$19929.1"}</h2>

    <ul className="paymentTool">
    <li>
    <div className="tool">Visa  <br />  {!this.state.priceBar? "$9504.13" : "$19008.26"}</div></li>
    <li><div className="tool">MasterCard <br />   {!this.state.priceBar? "$490.64" : "$981.28"}</div></li>
    <li><div className="tool">PayPal  <br /> {!this.state.priceBar? "$824.52" : "$1649.04"}</div></li>
    </ul>
    <div className="paymentSlide" onClick={this.handleClick}>{this.state.slideOpen? <img src={Arrowup} alt="arrowup" className="arrowup" /> : <img src={Arrowdown} alt="arrowdown" className="arrowdown"/>}</div>
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
