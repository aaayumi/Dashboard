import React from 'react'
import  { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const style = {margin: 5};

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
  <h1> Ticket Purchase Conversational Mix </h1>
    <nav>
      <ul>
        <li className="navMenu"><Link to='/'>PAYMENT</Link></li>
        <li className="navMenu"><Link to='/categories'>ALL CATEGORIES</Link></li>
        <li className="navMenu"><Link to='/details'>DETAILS</Link></li>
      </ul>
    </nav>

   <List className="avatar">
    <ListItem
      disabled={true}
      leftAvatar={<Avatar>A</Avatar>}
    >
    </ListItem>
   </List>
  </header>
)

export default Header