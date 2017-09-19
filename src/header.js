import React from 'react'
import  { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MenuBar from './img/linemenu.png';
import Question from './img/question.png';
import Bell from './img/bell.png';
import Search from './img/search.png';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const Header = () => (
  <header>

 <h1><img src={MenuBar} alt="MenuBar" className="MenuBar"/> Ticket Purchase Conversational Mix </h1>
 
    <nav>
      <ul>
        <li className="navMenu"><Link to='/'>PAYMENT</Link></li>
        <li className="navMenu"><Link to='/categories'>ALL CATEGORIES</Link></li>
        <li className="navMenu"><Link to='/details'>DETAILS</Link></li>
      </ul>
    </nav>
          
  <ul className="menuIcons">
  <li><img src={Question} alt="Question" className="Question"/></li>
  <li><img src={Bell} alt="Bell" className="Bell"/></li>
  <li><img src={Search} alt="Search" className="Search"/></li>
  <li><List className="avatar">
    <ListItem
      disabled={true}
      leftAvatar={<Avatar>A</Avatar>}
    >
    </ListItem>
   </List></li>
  </ul>
  </header>
)

export default Header