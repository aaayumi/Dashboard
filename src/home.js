import React from 'react';
import Arrowup from './img/arrowup.png';
import Arrowdown from './img/arrowdown.png';
import PaymentArrow from './img/paymentarrow.png';
import PaymentTable from './payment.js'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            slideOpen : false,
            priceBar: false,
            open: false
        }
   this.handleClick = this.handleClick.bind(this);
   this.clickHandle = this.clickHandle.bind(this);
    }

    handleClick() {
        this.setState({
            slideOpen : !this.state.slideOpen
        })
    console.log("slideOpen" + !this.state.slideOpen)
    }

    clickHandle() {
        
    this.setState({ 
              priceBar : !this.state.priceBar,
              open: false
     })
    console.log('clickhandle' + !this.state.priceBar)
    }
    
    handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

    render(){
      const PaymentPanel = this.state.slideOpen? "slideOpen" : "";
      const Dropdown = this.state.open? "show" : "";
    
    return(
    <div>
    <div id="PaymentPanel" className={PaymentPanel} >
    <div id="PaymentTitle" >{!this.state.priceBar? "Spent Last 14 Days" : "Spent Last 30 Days"}<img src={PaymentArrow} className="PaymentArrow PaymentToggle" onClick={this.handleTouchTap}/></div>
    <div id="Dropdown" className={Dropdown}  open={this.state.open}>
    <p className="popoverToggle" onClick={this.handleRequestClose}> </p>
    <p id="menuItem" onClick={this.state.priceBar ? this.clickHandle  :  null}  style={!this.state.priceBar? { color:'white', } : {color : '#BBBBBB'} }>{!this.state.priceBar? "Spent Last 14 Days" : "Spent Last 14 Days"}</p>
    <p id="menuItem" onClick={this.state.priceBar ? null : this.clickHandle} style={this.state.priceBar? { color:'white'} : {color : '#BBBBBB'} }>{this.state.priceBar? "Spent Last 30 Days" : "Spent Last 30 Days"}</p>
    </div>

     
    <h2 id="paymentSum" className={!this.state.open? "" : "close"}>{!this.state.priceBar? "$9,964.55" : "$19,929.1"}</h2>
    

    <ul className="paymentTool">
    <li>
    <div onClick={this.handleTouchTap} className="tool">VISA <br />  {!this.state.priceBar? "$9,504.13" : "$19,008.26"}</div></li>
    <li><div className="tool">MasterCard <br />   {!this.state.priceBar? "$490.64" : "$981.28"}</div></li>
    <li><div className="tool">PayPal  <br /> {!this.state.priceBar? "$824.52" : "$1,649.04"}</div></li>
    </ul>
    <div className="paymentSlide" onClick={this.handleClick}>{this.state.slideOpen? <img src={Arrowup} alt="arrowup" className="arrowup" /> : <img src={Arrowdown} alt="arrowdown" className="arrowdown"/>}</div>
    </div>

     <div className="PaymentTable" >
     <PaymentTable />
    <ul>
    </ul>
    </div>
    </div>
        )
    }
}

export default Home