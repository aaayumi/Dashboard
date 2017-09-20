import React from 'react';
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
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class PaymentTable extends React.Component {
    constructor(props) {
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
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return(
    <div>
    <Table style={{ width: 1200 }}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn>Today</TableHeaderColumn>
        <TableHeaderColumn>Payment Method</TableHeaderColumn>
        <TableHeaderColumn className="Narrative">Narrative</TableHeaderColumn>
        <TableHeaderColumn>Amount</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn><img src={Check} alt="Check" className="Check"/></TableRowColumn>
        <TableRowColumn>12N35, 22 March 2017</TableRowColumn>
        <TableRowColumn><img src={Master} alt="Master" className="Master"/>MasterCard...4483</TableRowColumn>
        <TableRowColumn>Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)</TableRowColumn>
        <TableRowColumn>$912.51</TableRowColumn>
        <TableRowColumn><img src={Dotmenu} alt="Dotmenu" className="Dotmenu" onClick={this.handleTouchTap} /></TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn><img src={Check} alt="Check" className="Check"/></TableRowColumn>
        <TableRowColumn>12N35, 22 March 2017</TableRowColumn>
        <TableRowColumn><img src={Paypal} alt="Paypal" className="Paypal"/>PayPal</TableRowColumn>
        <TableRowColumn>Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)</TableRowColumn>
        <TableRowColumn>$912.51</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn><img src={Check} alt="Check" className="Check"/></TableRowColumn>
        <TableRowColumn>12N35, 22 March 2017</TableRowColumn>
        <TableRowColumn><img src={Visa} alt="Visa" className="Visa"/>VISA...1532</TableRowColumn>
        <TableRowColumn>Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)</TableRowColumn>
        <TableRowColumn>$912.51</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn><img src={Fail} alt="Fail" className="Fail"/></TableRowColumn>
        <TableRowColumn>12N35, 22 March 2017</TableRowColumn>
        <TableRowColumn><img src={Visa} alt="Visa" className="Visa"/>VISA...1532</TableRowColumn>
        <TableRowColumn>Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)</TableRowColumn>
        <TableRowColumn>$912.51</TableRowColumn>
      </TableRow>
      <TableRow>
         <TableRowColumn><img src={Check} alt="Check" className="Check"/></TableRowColumn>
        <TableRowColumn>12N35, 22 March 2017</TableRowColumn>
        <TableRowColumn><img src={Master} alt="Master" className="Master"/>MasterCard...4483</TableRowColumn>
        <TableRowColumn>Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (.04 oz)</TableRowColumn>
        <TableRowColumn>$912.51</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
        
<Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
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
 </div>
);
}
}
export default PaymentTable;
