import React from 'react'
import  { NavLink } from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MenuBar from './img/linemenu.png';
import Question from './img/question.png';
import Bell from './img/bell.png';
import Search from './img/search.png';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

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

export default class Header extends React.Component{

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

    render(){
        return(
            <header>

       <h1><div className="menubarSample"><img src={MenuBar} alt="MenuBar" onClick={this.handleTouchTap} className="MenuBar" /> </div>Ticket Purchase Conversational Mix </h1>
 
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
    <nav>
      <ul>
        <li className="navMenu firstHeaderItem"><NavLink  exact to='/' activeStyle={{
      fontWeight: 'bold', fontSize: '14px'}} >PAYMENT</NavLink></li>
        <li className="navMenu secondHeaderItem"><NavLink to='/categories' activeStyle={{
      fontWeight: 'bold', fontSize: '14px'}} >ALL CATEGORIES</NavLink></li>
        <li className="navMenu thirdHeaderItem"><NavLink to='/details' activeStyle={{
      fontWeight: 'bold', fontSize: '14px'}} >DETAILS</NavLink></li>
      </ul>
    </nav>

  <ul className="menuIcons clear">
  <li><div className="questionSample"><img src={Search} alt="Search" className="Search"/></div></li>
  <li><div className="bellSample"><img src={Bell} alt="Bell" className="Bell"/></div></li>
  <li><div className="searchSample"><img src={Question} alt="Question" className="Question"/></div></li>
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
    }
}
