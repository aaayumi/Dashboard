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

class PaymentTable extends React.Component {
  render() {
    return(
      <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn>Today</TableHeaderColumn>
        <TableHeaderColumn>Payment Method</TableHeaderColumn>
        <TableHeaderColumn>Narrative</TableHeaderColumn>
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
);
}
}
export default PaymentTable;
  