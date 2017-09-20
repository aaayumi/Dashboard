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


// properties of TableHeader component
let headerProps = {
  enableSelectAll: false,
  displaySelectAll: false,
  adjustForCheckbox: false
};

// initial set of rows, simulating data from the database
let rows = [
  {date: "12:30 12.9.2017", payment: "MasterCard", narrative: "restige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$912.51", uniqueId: 0 },
  {date: "11:30 12.9.2017", payment: "Visa", narrative: "Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$744.51", uniqueId: 1 },
  {date: "13:30 12.9.2017", payment: "PayPal", narrative: "Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$12.51", uniqueId: 2 },
  {date: "20:30 12.9.2017", payment: "MasterCard", narrative: "Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$16.51", uniqueId: 3 }
];

let rows2 = [
 {date: "12:30 12.9.2017", payment: "MasterCard", narrative: "restige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$912.51", uniqueId: 0 },
  {date: "11:30 12.9.2017", payment: "Visa", narrative: "Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$744.51", uniqueId: 1 },
  {date: "13:30 12.9.2017", payment: "PayPal", narrative: "Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$12.51", uniqueId: 2 },
  {date: "20:30 12.9.2017", payment: "MasterCard", narrative: "Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$16.51", uniqueId: 3 },
  {date: "12:30 12.9.2017", payment: "MasterCard", narrative: "restige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$912.51", uniqueId: 0 },
  {date: "11:30 12.9.2017", payment: "Visa", narrative: "Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$744.51", uniqueId: 1 },
  {date: "13:30 12.9.2017", payment: "PayPal", narrative: "Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$12.51", uniqueId: 2 },
  {date: "20:30 12.9.2017", payment: "MasterCard", narrative: "Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)", amount: "$16.51", uniqueId: 3 }
];

// our table hader information, key is the name of the 
// property to sort by when the header is clicked 
let headers = [
  {name: "", key: "checkbox"},
  {name: "Today", key: "date"},
  {name: "Payment", key: "payment"},
  {name: "Narrative", key: "narrative"},
   {name: "Amount", key: "amount"}
];

// our table component that can sort columns
class SortableTable extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {rows, 
                  sortBy: 'firstName',
                  tableOpen : false
                };
  }

   handleClick = (event) => {
    event.preventDefault();
    this.setState({
      tableOpen : !this.state.tableOpen
    })
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
      <div>
        <MuiThemeProvider>
        <Table>
          <TableHeader {...headerProps}>
              {this.renderHeaders()}
          </TableHeader>
          <TableBody>
            {this.renderRows()}
            {!this.state.tableOpen ? this.renderRows() : "" }
          </TableBody>
        </Table>   
      </MuiThemeProvider>
      <p className="openTable" onClick={this.handleClick} >LOAD MORE</p>
      </div>
    );
  }
}

  
  
function SortableHeader(props){
  let style = {
    cursor: "pointer"
  }
  if(props.isSortColumn){
    style.fontWeight = "bold";
    style.color = "black";
  }
  
  return (
    <TableHeaderColumn>
      <div style={style} onClick={() => props.onClicked()}>{props.name}{props.name==""? "" :<img src={arrowUpDown} alt="arrowUpDown" className="arrowUpDown"/>}</div>
    </TableHeaderColumn>
  );
}
  

function UserRow(props){
  return (
    <TableRow>
      <TableRowColumn><img src={Check} alt="Check" className="Check"/></TableRowColumn>
      <TableRowColumn>{props.date}</TableRowColumn>
      <TableRowColumn>{props.payment=="Visa" ?  <img src={Visa} alt="Visa" className="Visa"/> :  (props.payment=="PayPal" ?  <img src={Paypal} alt="Paypal" className="Master"/> :  <img src={Master} alt="Master" className="Master"/>)}


     {props.payment}</TableRowColumn>
      <TableRowColumn>{props.narrative}</TableRowColumn>
      <TableRowColumn>{props.amount}</TableRowColumn>
    </TableRow>
  );
}


class PaymentTable extends React.Component {
  render() {
    return(
    <div>
    <SortableTable />
    </div>
);
}
}
export default PaymentTable;
