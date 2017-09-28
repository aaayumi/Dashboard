import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Check from './img/check.png';
import Fail from './img/fail.png';
import Master from './img/Master.png';
import Visa from './img/Visa.png';
import Paypal from './img/Paypal.png';
import Dotmenu from './img/dotmenu.png';
import arrowUpDown from './img/arrowUpDown.png';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { MuiThemeProvider} from 'material-ui';

import Arrowup from './img/arrowup.png';
import Arrowdown from './img/arrowdown.png';

import {Pie} from 'react-chartjs-2';


// properties of TableHeader component
let headerProps = {
  enableSelectAll: false,
  displaySelectAll: false,
  adjustForCheckbox: false
};

// initial set of rows, simulating data from the database
let rows = [
  {date: "20:30 12.9.2017", payment: "MasterCard", narrative: "Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$16.51", uniqueId: 3 },
  {date: "13:30 12.9.2017", payment: "PayPal", narrative: "Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$12.51", uniqueId: 2 },
  {date: "12:30 12.9.2017", payment: "MasterCard", narrative: "Restige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$912.51" , uniqueId: 0 },
  {date: "11:30 12.9.2017", payment: "Visa", narrative: "Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$744.51", uniqueId: 1 }
];

let rows2 = [
 {date: "12:30 12.9.2017", payment: "MasterCard", narrative: "restige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$912.51", uniqueId: 4 },
  {date: "11:30 12.9.2017", payment: "Visa", narrative: "Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$744.51", uniqueId: 4 },
  {date: "13:30 12.9.2017", payment: "PayPal", narrative: "Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$12.51", uniqueId: 5},
  {date: "20:30 12.9.2017", payment: "MasterCard", narrative: "Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$16.51", uniqueId: 6 },
  {date: "12:30 12.9.2017", payment: "MasterCard", narrative: "restige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$912.51", uniqueId: 7 },
  {date: "11:30 12.9.2017", payment: "Visa", narrative: "Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$744.51", uniqueId: 8 },
  {date: "13:30 12.9.2017", payment: "PayPal", narrative: "Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$12.51", uniqueId: 9 },
  {date: "20:30 12.9.2017", payment: "MasterCard", narrative: "Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$16.51", uniqueId: 10 }
];

// our table hader information, key is the name of the 
// property to sort by when the header is clicked 
let headers = [
  {name: "", key: "checkbox"},
  {name: "Today", key: "date"},
  {name: "Payment", key: "payment"},
  {name: "Narrative", key: "narrative"},
  {name: "Amount", key: "amount"},
  {name :"" , key : "dotMenu"}
];

// our table component that can sort columns
class SortableTable extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {rows, 
                  sortBy: 'firstName',
                  tableOpen : false,
                  open: false,
                };
  }
  
  handleClick = (event) => {
    event.preventDefault();

    const newRows = [...rows2, ...rows];

    this.setState({
      tableOpen : !this.state.tableOpen,
      rows: newRows
    })
    console.log(!this.state.tableOpen)
  }
  

  renderHeaders(){
    let header= headers.map( (h) => {
      return <SortableHeader 
                key={h.key}
                name={h.name}
                onClicked={()=>this.updateSortBy(h.key)} 
                isSortColumn={this.state.sortBy == h.key}/>
    });
    return <TableRow>{header}</TableRow>;
  }
  
  renderRows() {
    return this.state.rows.map( (row, i) => <UserRow {...row} key={row.uniqueId}/> );
  }
                               
  updateSortBy(sortBy){
      // multiple clicks on the same column reverse the sort order
      if( sortBy == this.state.sortBy ){
        this.setState( {rows: [...this.state.rows.reverse()]} );
        return;
      }
      
      let rows = [...this.state.rows];
      rows.sort( (a,b) => {
        if (a[sortBy] < b[sortBy])
          return -1;
        if(a[sortBy] > b[sortBy])
          return 1;
        return 0;
      });
      
      this.setState({rows, sortBy});
    }

      
  render() {
    return (
      <div className="paymentTable">
        <MuiThemeProvider>
        <Table>
          <TableHeader {...headerProps}>
              {this.renderHeaders()}
          </TableHeader>
          <TableBody>
            {this.renderRows()}          
          </TableBody>
        </Table>   
      </MuiThemeProvider>
      <p className="openTable" onClick={this.handleClick} >{!this.state.tableOpen ? "LOAD MORE" : "ALL DATA IS LOADED"}</p>
      </div>
    );
  }
}

  
  
class SortableHeader extends React.Component {

   constructor(props){
    super(props);
    this.state = {
                 toggle : false
                };
  this.handleClick = this.handleClick.bind(this);
  this.click = this.click.bind(this);
  }

   handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      toggle : !this.state.toggle
    });
    console.log(!this.state.toggle)
  };

  click() {
     // click event for sorting table
     this.props.onClicked();
     // click event for toggling 
     this.setState({
      toggle : !this.state.toggle
    });
  }
  
  render(){
  let style = {
    cursor: "pointer",
    color: "#BBBBBB"
  }
  if(this.props.isSortColumn){
    style.fontWeight = "bold";
    style.color = "black";
  }
  return (
    <TableHeaderColumn>
      <div style={style} onClick={this.click} >{this.props.name}<div className="paymentToggle"  >{this.props.name == "" ? "" : (this.state.toggle ? "▲": "▼" )} </div></div>
    </TableHeaderColumn>
  );
}
}

class UserRow extends React.Component {

   constructor(props){
    super(props);
    this.state = {
                  open: false,
                };
  }
  
   handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
    console.log(this.state.open)
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render(){
   
  return (
   
    <TableRow className="tableRow">
      <TableRowColumn className="tableOne">{this.props.payment=="PayPal"? <div className="failSample"> <img src={Fail} alt="Fail" className="Fail"/></div> : <div className="checkSample"><img src={Check} alt="Check" className="Check"/></div> }</TableRowColumn>
      <TableRowColumn className="tableTwo">{this.props.date}</TableRowColumn>
      <TableRowColumn className="tableThree">{this.props.payment=="Visa" ? <img src={Visa} alt="Visa" className="Visa"/>:  (this.props.payment=="PayPal" ?  <img src={Paypal} alt="Paypal" className="Paypal"/> :  <img src={Master} alt="Master" className="Master"/>)}{this.props.payment}</TableRowColumn>
      <TableRowColumn className="tableFour">{this.props.narrative}</TableRowColumn>
      <TableRowColumn className="tableFive">{this.props.amount}</TableRowColumn>
      <TableRowColumn className="tableSix"><div className="dotmenuSample"><img src={Dotmenu} alt="Dotmenu" className="Dotmenu" onClick={this.handleTouchTap} /> </div></TableRowColumn>

         <Popover
          zDepth={5}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
        
         <Menu>
            <MenuItem primaryText="Item1" />
            <MenuItem primaryText="Item2" />
            <MenuItem primaryText="Item3" />
            <MenuItem primaryText="Item4" />
          </Menu>
        </Popover>

    </TableRow>
  );
}
}


export default class PaymentTable extends React.Component {
  render() {
    return(
    <div>
    <SortableTable />
    </div>
);
}
}



