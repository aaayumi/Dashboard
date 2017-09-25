import React from 'react';
import Arrowup from './img/arrowup.png';
import Arrowdown from './img/arrowdown.png';
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

    }

    clickHandle() {
    this.setState({ 
              priceBar : !this.state.priceBar,
              open: false
     })
    console.log(!this.state.priceBar)
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
    return(
    <div>
    <div id="PaymentPanel" className={PaymentPanel}>
    <div className="PaymentTitle">{!this.state.priceBar? "Spent Last 14 Days" : "Spent Last 30 Days"}<button className="PaymentToggle" onClick={this.handleTouchTap}>▼</button></div>
  
      <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
                <p className="popoverToggle" onClick={this.handleRequestClose}> ▼ </p>

          <Menu>
           <p className="menuItem" onClick={this.clickHandle}>{!this.state.priceBar? "Spent Last 14 Days" : "Spent Last 14 Days"}</p>
            <p className="menuItem"  onClick={this.clickHandle}>{this.state.priceBar? "Spent Last 30 Days" : "Spent Last 30 Days"}</p>
          </Menu>
        </Popover>
      <h2 className="paymentSum">{!this.state.priceBar? "$9,964.55" : "$19,929.1"}</h2>
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