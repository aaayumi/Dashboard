import React, { Component } from 'react';
import Arrowup from './img/arrowup.png';
import Arrowdown from './img/arrowdown.png';
import Dotmenu from './img/dotmenu.png';
import Edit from './img/edit.png';
import Trashbin from './img/trashbin.png';
import Check from './img/check.png';
import Add from './img/add.png';
import Fail from './img/fail.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Pie} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';
import 'chart.piecelabel.js';
import 'chartjs-plugin-datalabels';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let piData = 4;
let piData2 = 5;
let piData3 = 3;
let piData4 = 3;
let piData5 = 3;

// import from questions

const questionItem = [ { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 1
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 2
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 3
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 4
}
]

class CreateItem extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modal : false,
            open: false
        };
     this.toggle = this.toggle.bind(this);
    }

    toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

    handleOpen = () => {
    this.setState({open: true});
  };

   handleClose = () => {
    this.setState({open: false});
  };


   handleCreate(e) {
        e.preventDefault();

        if(!this.refs.newItemInput.value) {
            alert('enter a question');
            return;
        } else if (this.props.questionItem.map(element=> element.item).indexOf(this.refs.newItemInput.value) != -1
        ) {
            alert('This question already exist');
            this.refs.newItemInput.value = '';
            return;
        }
        this.props.createItem(this.refs.newItemInput.value);
        this.refs.newItemInput.value = '';
    }

    render() {
        return(
            <div>
              <TableRow>
              <TableRowColumn style={{"width" : "1100px"}}>
              <div style={{"marginTop" : "20px"}} >Add new ?</div>
             <div className="addSample" style={{"marginTop" : "-20px"}} onClick={this.handleOpen}><img src={Add} className="add" alt="add"/></div>
             <Dialog
             title="Add a new question"
             modal={false}
             open={this.state.open}
             onRequestClose={this.handleClose}
             >
             <form onSubmit={this.handleCreate.bind(this)}   >
             <input type="text" placeholder="New Question" ref="newItemInput" />
             <button onClick={this.handleClose}>Submit</button>
             </form>
             </Dialog>
            </TableRowColumn>
            </TableRow>
            </div>
            );
    }
}


class QuestionItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
         editing: false,
         open: false,
         popOver:false
        };
    this.toggle = this.toggle.bind(this);
    }

    handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popOver: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      popOver: false,
    });
  };
  
    toggle() {
    this.setState({
      modal: !this.state.modal
     });
     }


    onEditClick(){
        this.setState({
            editing:true
        })
    }

    onCancelClick(){
        this.setState({
            editing: false
        })
    }

    onSaveClick(e){
        e.preventDefault();
        this.props.saveItem(this.props.item, this.refs.editInput.value);
        this.setState({ editing: false });
    }

    renderName() {
        const itemStyle = {
            'text-decoration' : this.props.completed ? 'line-through' : 'none',
             cursor : 'pointer'
        };

        if(this.state.editing) {
            return (
                <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
                </form>
                );
        }

        return(
        <span style={itemStyle}>
        {this.props.id} {this.props.item}</span>);
    }

    renderButtons() {
        if(this.state.editing) {
            return (
                <span>
                <div className="saveSample" onClick={this.onSaveClick.bind(this)}><img src={Check} className="edit" alt="edit"/></div>
                <div className="cancelSample" onClick={this.onCancelClick.bind(this)}><img src={Fail} className="edit" alt="edit"/></div>
                </span>
                );
        }
        return(
        <span>
                <div className="editSample" onClick={this.onEditClick.bind(this)} onClick={this.handleOpen}><img src={Edit} className="edit" alt="edit"/></div>
                <div className="trashbinSample" onClick={this.props.deleteItem.bind(this, this.props.item)}><img src={Trashbin} className="trashbin" alt="Trashbin"/></div>
                <div className="dotmenuquestionSample"><img src={Dotmenu} alt="Dotmenu" className="Dotmenu" onClick={this.handleTouchTap} /> </div>
        </span>
        )
    }
render() {
    return(
    <div>
    <TableRow className="tablerow">
    <TableRowColumn  className="name">
     {this.renderName()}
    </TableRowColumn>
    <TableRowColumn className="actions">
    {this.renderButtons()}
    </TableRowColumn>
    </TableRow>
        <Dialog
          title="Edit a question"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
          <button className="modalButton" onClick={this.handleClose}>Submit</button>
           </form>
        </Dialog>

         <Popover
          zDepth={5}
          open={this.state.popOver}
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


    </div>
    );
}
}

class QuestionList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      piData : piData
    }
  }

    renderItems() {
        return this.props.questionItem.map((item, index) => <QuestionItem key={index} {...item} {...this.props} />);
    }
render() {
    return (
   <Table>
    <TableBody>
     {this.renderItems()}
      </TableBody>
    </Table>
    );
}
}

class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItem
          }
     this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
     this.counter = 0;
     this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
    }

    doParentToggleFromChild(){  
     this.props.parentToggle();
     this.props.update();
   }

    createItem(item){
        this.state.questionItem.push({
            item : item,
        });

        let length1 = questionItem.length;
        
        this.setState({
            questionItem : this.state.questionItem
        });
        this.props.parentToggle();
    }

    findItem(item) {
        return this.state.questionItem.filter((element) => element.item === item)[0];
    }

    toggleComplete(item){
        let selectedItem = this.findItem(item);
        selectedItem.completed = !selectedItem.completed;
        this.setState({ questionItem : this.state.questionItem });
    }

    saveItem(oldItem, newItem) {
        let selectedItem = this.findItem(oldItem);
        selectedItem.item = newItem;
       
        let length1 = questionItem.length;
        
        this.setState({ questionItem : this.state.questionItem });
        this.props.parentToggle();
     }

    deleteItem(item) {
        let index = this.state.questionItem.map(element => element.item).indexOf(item);
        this.state.questionItem.splice(index, 1);
         this.setState({
            questionItem : this.state.questionItem
        });
        piData = this.state.questionItem.length;
        this.setState({
            piData : piData
        })
         this.props.parentToggle();
    }

    render() {
        const { questionItem } = this.state;
         const { length } = this.props
         piData = questionItem.length 
        return (
        <div>
       
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "orange", "color": "white", "textAlign": "center"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Advice + FAQ  </div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}} length={ questionItem.length } />
        </div>

        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>

        <QuestionList questionItem={this.state.questionItem} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} onClick={ this.doParentToggleFromChild } />

        <CreateItem questionItem={this.state.questionItem} createItem={this.createItem.bind(this)} onClick={ this.doParentToggleFromChild }/>
        </div>
        </div>
        </div>);
    }
    }

  class Chart extends React.Component {
  render() {
    const { length } = this.props
    return (
      <div>View all: {length}</div>
    )
  }
}


// Category 2

const questionItemSecond = [ { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 1
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 2
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 3
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 4
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 5
}
]



class CreateItemSecond extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modal : false,
            open: false
        };
     this.toggle = this.toggle.bind(this);
    }

    toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

   handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


   handleCreate(e) {
        e.preventDefault();

        if(!this.refs.newItemInput.value) {
            alert('enter a question');
            return;
        } else if (this.props.questionItemSecond.map(element=> element.item).indexOf(this.refs.newItemInput.value) != -1
        ) {
            alert('This question already exist');
            this.refs.newItemInput.value = '';
            return;
        }
        this.props.createItem(this.refs.newItemInput.value);
        this.refs.newItemInput.value = '';
    }

    render() {
        return(
             <div>
              <TableRow>
              <TableRowColumn style={{"width" : "1100px"}}>
             <div style={{"marginTop" : "20px"}} > Add new ? </div>
            <div className="addSample" onClick={this.handleOpen}><img src={Add} className="add" alt="add"/></div>
            <Dialog
            title="Add a new question"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            <form onSubmit={this.handleCreate.bind(this)}   >
            <input type="text" placeholder="New Question" ref="newItemInput" />
            <button onClick={this.handleClose}>Submit</button>
            </form>
            </Dialog>
             </TableRowColumn>
            </TableRow>
            </div>
            );
    }
}


class QuestionItemSecond extends React.Component {
    constructor(props){
        super(props);
        this.state ={
         editing: false,
         open: false,
         popOver:false
        };
    this.toggle = this.toggle.bind(this);
    }

     handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popOver: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      popOver: false,
    });
  };
 
  toggle() {
    this.setState({
      modal: !this.state.modal
     });
     }


  onEditClick(){
        this.setState({
            editing:true
        })
    }

  onCancelClick(){
        this.setState({
            editing: false
        })
    }

  onSaveClick(e){
        e.preventDefault();
        this.props.saveItem(this.props.item, this.refs.editInput.value);
        this.setState({ editing: false });
    }

  renderName() {
        const itemStyle = {
            'text-decoration' : this.props.completed ? 'line-through' : 'none',
             cursor : 'pointer'
        };

        if(this.state.editing) {
            return (
                <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
                </form>
                );
        }

        return(
        <span style={itemStyle}>
        {this.props.id} {this.props.item}</span>);
    }

    renderButtons() {
        if(this.state.editing) {
            return (
                <span>
                <div className="saveSample" onClick={this.onSaveClick.bind(this)}><img src={Check} className="edit" alt="edit"/></div>
                <div className="cancelSample" onClick={this.onCancelClick.bind(this)}><img src={Fail} className="edit" alt="edit"/></div>
                </span>
                );
        }
        return(
        <span>
                <div className="editSample" onClick={this.onEditClick.bind(this)} onClick={this.handleOpen}><img src={Edit} className="edit" alt="edit"/></div>
                <div className="trashbinSample" onClick={this.props.deleteItem.bind(this, this.props.item)}><img src={Trashbin} className="trashbin" alt="Trashbin"/></div>
                <div className="dotmenuquestionSample"><img src={Dotmenu} alt="Dotmenu" className="Dotmenu" onClick={this.handleTouchTap} /> </div>
        </span>
        )
    }
render() {
    return(
    <div>
    <TableRow className="tablerow">
    <TableRowColumn  className="name">
     {this.renderName()}
    </TableRowColumn>
    <TableRowColumn className="actions">
    {this.renderButtons()}
    </TableRowColumn>
    </TableRow>
        <Dialog
          title="Edit a question"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
          <button className="modalButton" onClick={this.handleClose}>Submit</button>
           </form>
        </Dialog>

         <Popover
          zDepth={5}
          open={this.state.popOver}
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


    </div>

    );
}
}

class QuestionListSecond extends React.Component {
    renderItems() {
        return this.props.questionItemSecond.map((item, index) => <QuestionItemSecond key={index} {...item} {...this.props} />);
    }
render() {
    return (
    <Table>
    <TableBody>
     {this.renderItems()}
    </TableBody>
    </Table>
    );
}
}

class ListSecond extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItemSecond,
            itemSecond : questionItemSecond.length
          }
         this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
    }
    
   doParentToggleFromChild(){  
     this.props.parentToggle();
     this.props.update();
   }

    createItem(item){
        this.state.questionItemSecond.push({
            item : item
        });

        let length2 = questionItemSecond.length;
        
        this.setState({
            questionItemSecond : this.state.questionItemSecond
        });
        this.props.parentToggle();
    }

    findItem(item) {
        return this.state.questionItemSecond.filter((element) => element.item === item)[0];
    }

    toggleComplete(item){
        let selectedItem = this.findItem(item);
        selectedItem.completed = !selectedItem.completed;
        this.setState({ questionItem : this.state.questionItem });
    }

    saveItem(oldItem, newItem) {
        let selectedItem = this.findItem(oldItem);
        selectedItem.item = newItem;
       
         let length2 = questionItemSecond.length;

         this.setState({
            questionItemSecond : this.state.questionItemSecond
        });
        this.props.parentToggle();
    }

    deleteItem(item) {
        let index = this.state.questionItemSecond.map(element => element.item).indexOf(item);
        this.state.questionItemSecond.splice(index, 1);
         
        let length2 = questionItemSecond.length;

        this.setState({
            questionItemSecond : this.state.questionItemSecond
        });
        this.props.parentToggle();
    }

    render() {
        const { questionItemSecond } = this.state
        piData2 = questionItemSecond.length 
        return(
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement"  style={{"flex": "1", "backgroundColor" : "blue", "color": "white", "textAlign": "center"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Product Recs </div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}}length={ questionItemSecond.length } /></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListSecond questionItemSecond={this.state.questionItemSecond} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} onClick={ this.doParentToggleFromChild } />
        <CreateItemSecond questionItemSecond={this.state.questionItemSecond} createItem={this.createItem.bind(this)} onClick={ this.doParentToggleFromChild } />
        </div>
         </div>
         </div>);
    }
    }


// category 3

const questionItemThird = [ { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 1
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 2
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 3
}
]

  class CreateItemThird extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modal : false,
            open: false
        };
     this.toggle = this.toggle.bind(this);
    }

    toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

   handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


   handleCreate(e) {
        e.preventDefault();

        if(!this.refs.newItemInput.value) {
            alert('enter a question');
            return;
        } else if (this.props.questionItemThird.map(element=> element.item).indexOf(this.refs.newItemInput.value) != -1
        ) {
            alert('This question already exist');
            this.refs.newItemInput.value = '';
            return;
        }
        this.props.createItem(this.refs.newItemInput.value);
        this.refs.newItemInput.value = '';
    }

    render() {
        return(
             <div >
             <TableRow>
             <TableRowColumn style={{"width" : "1100px"}}>
            <div style={{"marginTop" : "20px"}} >Add new ?</div>
            <div className="addSample" onClick={this.handleOpen}><img src={Add} className="add" alt="add"/></div>
            <Dialog
            title="Add a new question"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            <form onSubmit={this.handleCreate.bind(this)}   >
            <input type="text" placeholder="New Question" ref="newItemInput" />
            <button onClick={this.handleClose}>Submit</button>
            </form>
            </Dialog>
            </TableRowColumn>
            </TableRow>
            </div>
            );
    }
}


class QuestionItemThird extends React.Component {
    constructor(props){
        super(props);
        this.state ={
         editing: false,
         open: false,
         popOver:false
        };
    this.toggle = this.toggle.bind(this);
    }

     handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popOver: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      popOver: false,
    });
  };

    
    toggle() {
    this.setState({
      modal: !this.state.modal
     });
     }


    onEditClick(){
        this.setState({
            editing:true
        })
    }

    onCancelClick(){
        this.setState({
            editing: false
        })
    }

    onSaveClick(e){
        e.preventDefault();
        this.props.saveItem(this.props.item, this.refs.editInput.value);
        this.setState({ editing: false });
    }

    renderName() {
        const itemStyle = {
            'text-decoration' : this.props.completed ? 'line-through' : 'none',
             cursor : 'pointer'
        };

        if(this.state.editing) {
            return (
                <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
                </form>
                );
        }

        return(
        <span style={itemStyle}>
        {this.props.id} {this.props.item}</span>);
    }

    renderButtons() {
        if(this.state.editing) {
            return (
                <span>
                <div className="saveSample" onClick={this.onSaveClick.bind(this)}><img src={Check} className="edit" alt="edit"/></div>
                <div className="cancelSample" onClick={this.onCancelClick.bind(this)}><img src={Fail} className="edit" alt="edit"/></div>
                </span>
                );
        }
        return(
        <span>
                <div className="editSample" onClick={this.onEditClick.bind(this)} onClick={this.handleOpen}><img src={Edit} className="edit" alt="edit"/></div>
                <div className="trashbinSample" onClick={this.props.deleteItem.bind(this, this.props.item)}><img src={Trashbin} className="trashbin" alt="Trashbin"/></div>
                <div className="dotmenuquestionSample"><img src={Dotmenu} alt="Dotmenu" className="Dotmenu" onClick={this.handleTouchTap} /> </div>
        </span>
        )
    }
render() {
    return(
    <div>
    <TableRow className="tablerow">
    <TableRowColumn  className="name">
     {this.renderName()}
    </TableRowColumn>
    <TableRowColumn className="actions">
    {this.renderButtons()}
    </TableRowColumn>
    </TableRow>
        <Dialog
          title="Edit a question"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
          <button className="modalButton" onClick={this.handleClose}>Submit</button>
           </form>
        </Dialog>

         <Popover
          zDepth={5}
          open={this.state.popOver}
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


    </div>
    );
}
}

class QuestionListThird extends React.Component {
    renderItems() {
        return this.props.questionItemThird.map((item, index) => <QuestionItemThird key={index} {...item} {...this.props} />);
    }
render() {
    return (
   <Table>
    <TableBody>
     {this.renderItems()}
    </TableBody>
    </Table>
    );
}
}

class ListThird extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItemThird
          }
     this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
    }

      doParentToggleFromChild(){  
     this.props.parentToggle();
      this.props.update();
   }

    createItem(item){
        this.state.questionItemThird.push({
            item : item
        });
  
        let length2 = questionItemThird.length;

        this.setState({
            questionItemThird : this.state.questionItemThird
        });
        this.props.parentToggle();
    }

    findItem(item) {
        return this.state.questionItemThird.filter((element) => element.item === item)[0];
    }

    toggleComplete(item){
        let selectedItem = this.findItem(item);
        selectedItem.completed = !selectedItem.completed;
        this.setState({ questionItem : this.state.questionItem });
    }

    saveItem(oldItem, newItem) {
         let selectedItem = this.findItem(oldItem);
         selectedItem.item = newItem;
       
         let length2 = questionItemThird.length;

         this.setState({
            questionItemThird : this.state.questionItemThird
        });
        this.props.parentToggle();
    }

    deleteItem(item) {
        let index = this.state.questionItemThird.map(element => element.item).indexOf(item);
        this.state.questionItemThird.splice(index, 1);
         
        this.setState({
            questionItemThird : this.state.questionItemThird
        });
        this.props.parentToggle();
    }

    render() {
        const { questionItemThird } = this.state
         piData3 = questionItemThird.length 
        return (
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "red", "color": "white", "textAlign": "center"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Update</div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}} length={ questionItemThird.length } /></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListThird questionItemThird={this.state.questionItemThird} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} onClick={ this.doParentToggleFromChild }/>
        <CreateItemThird questionItemThird={this.state.questionItemThird} createItem={this.createItem.bind(this)} onClick={ this.doParentToggleFromChild } />
        </div>
        </div>
        </div>);
    }
    }

// Category 4

const questionItemFourth = [ { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 1
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 2
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 3
}
]

  class CreateItemFourth extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modal : false,
            open: false
        };
     this.toggle = this.toggle.bind(this);

    }

    toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

   handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


   handleCreate(e) {
        e.preventDefault();

        if(!this.refs.newItemInput.value) {
            alert('enter a question');
            return;
        } else if (this.props.questionItemFourth.map(element=> element.item).indexOf(this.refs.newItemInput.value) != -1
        ) {
            alert('This question already exist');
            this.refs.newItemInput.value = '';
            return;
        }
        this.props.createItem(this.refs.newItemInput.value);
        this.refs.newItemInput.value = '';
    }

    render() {
        return(
              <div>
              <TableRow>
              <TableRowColumn style={{"width" : "1100px"}}>
               <div style={{"marginTop" : "20px"}} >Add new ?</div>
             <div className="addSample" onClick={this.handleOpen}><img src={Add} className="add" alt="add"/></div>
             <Dialog
             title="Add a new question"
             modal={false}
             open={this.state.open}
             onRequestClose={this.handleClose}
             >
             <form onSubmit={this.handleCreate.bind(this)}   >
             <input type="text" placeholder="New Question" ref="newItemInput" />
             <button onClick={this.handleClose}>Submit</button>
             </form>
             </Dialog>
             </TableRowColumn>
             </TableRow>
             </div>
            );
    }
}


class QuestionItemFourth extends React.Component {
    constructor(props){
        super(props);
        this.state ={
         editing: false,
         open: false,
         popOver:false
        };
    this.toggle = this.toggle.bind(this);
    }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

  this.setState({
      popOver: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      popOver: false,
    });
  };
 
  toggle() {
    this.setState({
      modal: !this.state.modal
     });
     }

  onEditClick(){
        this.setState({
            editing:true
        })
    }

  onCancelClick(){
        this.setState({
            editing: false
        })
    }

    onSaveClick(e){
        e.preventDefault();
        this.props.saveItem(this.props.item, this.refs.editInput.value);
        this.setState({ editing: false });
    }

    renderName() {
        const itemStyle = {
            'text-decoration' : this.props.completed ? 'line-through' : 'none',
             cursor : 'pointer'
        };

        if(this.state.editing) {
            return (
                <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
                </form>
                );
        }

        return(
        <span style={itemStyle}>
        {this.props.id} {this.props.item}</span>);
    }

    renderButtons() {
        if(this.state.editing) {
            return (
                <span>
                <div className="saveSample" onClick={this.onSaveClick.bind(this)}><img src={Check} className="edit" alt="edit"/></div>
                <div className="cancelSample" onClick={this.onCancelClick.bind(this)}><img src={Fail} className="edit" alt="edit"/></div>
                </span>
                );
        }
        return(
        <span>
                <div className="editSample" onClick={this.onEditClick.bind(this)} onClick={this.handleOpen}><img src={Edit} className="edit" alt="edit"/></div>
                <div className="trashbinSample" onClick={this.props.deleteItem.bind(this, this.props.item)}><img src={Trashbin} className="trashbin" alt="Trashbin"/></div>
                <div className="dotmenuquestionSample"><img src={Dotmenu} alt="Dotmenu" className="Dotmenu" onClick={this.handleTouchTap} /> </div>
        </span>
        )
       }
    render() {
      return(
         <div>
      <TableRow className="tablerow">
      <TableRowColumn  className="name">
      {this.renderName()}
      </TableRowColumn>
      <TableRowColumn className="actions">
      {this.renderButtons()}
      </TableRowColumn>
      </TableRow>
        <Dialog
          title="Edit a question"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
          <button className="modalButton" onClick={this.handleClose}>Submit</button>
           </form>
        </Dialog>

         <Popover
          zDepth={5}
          open={this.state.popOver}
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
    </div>
    );
}
}

class QuestionListFourth extends React.Component {
    renderItems() {
        return this.props.questionItemFourth.map((item, index) => <QuestionItemFourth key={index} {...item} {...this.props} />);
    }
render() {
    return (
    <Table>
    <TableBody>
     {this.renderItems()}
      </TableBody>
    </Table>
    );
}
}

class ListFourth extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItemFourth
          }
     this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
    }

      doParentToggleFromChild(){  
     this.props.parentToggle();
   }

    createItem(item){
        this.state.questionItemFourth.push({
            item : item,
        });

        let length2 = questionItemFourth.length;

        this.setState({
            questionItemFourth : this.state.questionItemFourth
        });
        this.props.parentToggle();
    }

    findItem(item) {
        return this.state.questionItemFourth.filter((element) => element.item === item)[0];
    }

    toggleComplete(item){
        let selectedItem = this.findItem(item);
        selectedItem.completed = !selectedItem.completed;
        this.setState({ questionItem : this.state.questionItem });
    }

    saveItem(oldItem, newItem) {
        let selectedItem = this.findItem(oldItem);
        selectedItem.item = newItem;
       
         let length2 = questionItemFourth.length;

        this.setState({
            questionItemFourth : this.state.questionItemFourth
        });
        this.props.parentToggle();
    }


    deleteItem(item) {
        let index = this.state.questionItemFourth.map(element => element.item).indexOf(item);
        this.state.questionItemFourth.splice(index, 1);
         
        this.setState({
            questionItemFourth : this.state.questionItemFourth
        });
        this.props.parentToggle();
    }


    render() {
        const { questionItemFourth } = this.state
         piData4 = questionItemFourth.length 
        return (
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "purple","color": "white", "textAlign": "center", "width": "150px"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Complaint</div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}} length={ questionItemFourth.length } /></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListFourth questionItemFourth={this.state.questionItemFourth} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} onClick={ this.doParentToggleFromChild } />
        <CreateItemFourth questionItemFourth={this.state.questionItemFourth} createItem={this.createItem.bind(this)} onClick={ this.doParentToggleFromChild } />
        </div>
         </div>
         </div>);
    }
    }

// Category 5

const questionItemFifth = [ { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 1
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 2
}, { item : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?', id : 3
}
]

  class CreateItemFifth extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modal : false,
            open: false
        };
     this.toggle = this.toggle.bind(this);
    }

    toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

   handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


   handleCreate(e) {
        e.preventDefault();

        if(!this.refs.newItemInput.value) {
            alert('enter a question');
            return;
        } else if (this.props.questionItemFifth.map(element=> element.item).indexOf(this.refs.newItemInput.value) != -1
        ) {
            alert('This question already exist');
            this.refs.newItemInput.value = '';
            return;
        }
        this.props.createItem(this.refs.newItemInput.value);
        this.refs.newItemInput.value = '';
    }

    render() {
        return(
             <div>
              <TableRow>
              <TableRowColumn style={{"width" : "1100px"}}>
             <div style={{"marginTop" : "20px"}} >Add new ? </div>
            <div className="addSample" onClick={this.handleOpen}><img src={Add} className="add" alt="add"/></div>
            <Dialog
            title="Add a new question"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >
            <form onSubmit={this.handleCreate.bind(this)}   >
            <input type="text" placeholder="New Question" ref="newItemInput" />
            <button onClick={this.handleClose}>Submit</button>
            </form>
            </Dialog>
            </TableRowColumn>
            </TableRow>
            </div>
            );
    }
}


class QuestionItemFifth extends React.Component {
    constructor(props){
        super(props);
        this.state ={
         editing: false,
         open: false,
         popOver:false
        };
    this.toggle = this.toggle.bind(this);
    }

     handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

  this.setState({
      popOver: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      popOver: false,
    });
  };

    
    toggle() {
    this.setState({
      modal: !this.state.modal
     });
     }


    onEditClick(){
        this.setState({
            editing:true
        })
    }

    onCancelClick(){
        this.setState({
            editing: false
        })
    }

    onSaveClick(e){
        e.preventDefault();
        this.props.saveItem(this.props.item, this.refs.editInput.value);
        this.setState({ editing: false });
    }

    renderName() {
        const itemStyle = {
            'text-decoration' : this.props.completed ? 'line-through' : 'none',
             cursor : 'pointer'
        };

        if(this.state.editing) {
            return (
                <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
                </form>
                );
        }

        return(
        <span style={itemStyle}>
        {this.props.id} {this.props.item}</span>);
    }

    renderButtons() {
        if(this.state.editing) {
            return (
                <span>
                <div className="saveSample" onClick={this.onSaveClick.bind(this)}><img src={Check} className="edit" alt="edit"/></div>
                <div className="cancelSample" onClick={this.onCancelClick.bind(this)}><img src={Fail} className="edit" alt="edit"/></div>
                </span>
                );
        }
        return(
        <span>
                <div className="editSample" onClick={this.onEditClick.bind(this)} onClick={this.handleOpen}><img src={Edit} className="edit" alt="edit"/></div>
                <div className="trashbinSample" onClick={this.props.deleteItem.bind(this, this.props.item)}><img src={Trashbin} className="trashbin" alt="Trashbin"/></div>
                <div className="dotmenuquestionSample"><img src={Dotmenu} alt="Dotmenu" className="Dotmenu" onClick={this.handleTouchTap} /> </div>
        </span>
        )
    }
render() {
    return(
    <div>
    <TableRow className="tablerow">
    <TableRowColumn  className="name">
     {this.renderName()}
    </TableRowColumn>
    <TableRowColumn className="actions">
    {this.renderButtons()}
    </TableRowColumn>
    </TableRow>
        <Dialog
          title="Edit a question"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
          <button className="modalButton" onClick={this.handleClose}>Submit</button>
           </form>
        </Dialog>

         <Popover
          zDepth={5}
          open={this.state.popOver}
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


    </div>
    );
}
}

class QuestionListFifth extends React.Component {
    renderItems() {
        return this.props.questionItemFifth.map((item, index) => <QuestionItemFifth key={index} {...item} {...this.props} />);
    }
render() {
    return (
     <Table>
    <TableBody>
     {this.renderItems()}
     </TableBody>
    </Table>
    );
}
}

class ListFifth extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItemFifth
          }
     this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
    }

  doParentToggleFromChild(){  
     this.props.parentToggle();
   }

    createItem(item){
        this.state.questionItemFifth.push({
            item : item,
        });
    
        let length2 = questionItemFifth.length;

        this.setState({
            questionItemFifth : this.state.questionItemFifth
        });
        this.props.parentToggle();
    }

    findItem(item) {
        return this.state.questionItemFifth.filter((element) => element.item === item)[0];
    }

    toggleComplete(item){
        let selectedItem = this.findItem(item);
        selectedItem.completed = !selectedItem.completed;
        this.setState({ questionItem : this.state.questionItem });
    }

    saveItem(oldItem, newItem) {
        let selectedItem = this.findItem(oldItem);
        selectedItem.item = newItem;
       
         let length2 = questionItemFifth.length;

        this.setState({
            questionItemFifth : this.state.questionItemFifth
        });
        this.props.parentToggle();
    }

    deleteItem(item) {
        let index = this.state.questionItemFifth.map(element => element.item).indexOf(item);
        this.state.questionItemFifth.splice(index, 1);
         
        this.setState({
            questionItemFifth : this.state.questionItemFifth
        });
        this.props.parentToggle();
    }

    render() {
        const { questionItemFifth } = this.state
         piData5 = questionItemFifth.length;
        return (
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "green", "color": "white", "textAlign": "center"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Others </div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}} length={ questionItemFifth.length } /></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListFifth questionItemFifth={this.state.questionItemFifth} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} onClick={ this.doParentToggleFromChild }/>
        <CreateItemFifth questionItemFifth={this.state.questionItemFifth} createItem={this.createItem.bind(this)} onClick={ this.doParentToggleFromChild }/>
        </div>
         </div>
         </div>);
    }
    }



// parent component

  export default class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            slideOpen : false,
            piData : piData
          }
 
    this.handleClick = this.handleClick.bind(this);
    this.update = this.update.bind(this);
    this.doParentToggle = this.doParentToggle.bind(this);
    }

    doParentToggle(){
    

    this.setState({
        piData : piData
      })
      console.log('-------')
      console.log('parentToggle' + piData )
      console.log('parentToggle' + piData2 )
      console.log('parentToggle' + piData3 )
      console.log('-------')
      this.update();
   }

    handleClick(){
        this.setState({
            slideOpen : !this.state.slideOpen
        })
    }
    
    update() {
      var piData;
      this.setState({
        piData : piData
      })
      console.log('-------')
      console.log('parentToggle' + piData )
      console.log('parentToggle' + piData2 )
      console.log('parentToggle' + piData3 )
      console.log('-------')
    }    
  
    render(){
    

     const CategoriesPanel = this.state.slideOpen? "slideOpen" : "";
     const { length } = this.props

     
      var totalData = piData + piData2 + piData3 + piData4 + piData5;

       let newpiData =  function() {
       return parseFloat((piData /  totalData ) * 100 ).toFixed(2) };

       let newpiData2 =  function() {
       return parseFloat((piData2 /  totalData ) * 100).toFixed(2) };

       let newpiData3 =  function() {
       return  parseFloat((piData3 /  totalData ) * 100).toFixed(2) };

       let newpiData4 =  function() {
       return parseFloat((piData4 /  totalData ) * 100).toFixed(2) };

       let newpiData5 =  function() {
       return parseFloat((piData5 /  totalData ) * 100).toFixed(2) };

      
      const data = {
      datasets: [{
        data: [ newpiData() , newpiData2(), newpiData3(), newpiData4(), newpiData5()],
        backgroundColor: [
        'orange',
        'blue',
        'red',
        'purple',
        'green'
        ],
        borderColor: [ 
        'orange',
        'blue',
        'red',
        'purple',
        'green'
        ]
      }]};

      var pieOptions = {
          pieceLabel: {
         render: function (args) {
                  return args.value + '%';
                },
         fontSize: 30,
         fontColor: '#fff'
       }
      };

      const bardata = {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
       {
      backgroundColor: [
        'orange',
        'blue',
        'red',
        'purple',
        'green'
        ],
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [ newpiData(), newpiData2() , newpiData3()  , newpiData4()  , newpiData5()  ]
      }
      ]
      };
   
      let options = {
        plugins: {
        datalabels: {
        display: true,
        color: 'white',
       },
       font: {
              weight: 'bold'
            }
      }
      }
      
      return(
    <div>
    <div id="chart" className={CategoriesPanel}>
    <div style={{"display" : "flex"}}>
    <Pie style={{"fontSize" : "20px" }} data={data} options={pieOptions}/>
    <HorizontalBar
          ref='chart'
          data={bardata}
          width={100}
          height={50}
           options={{
            maintainAspectRatio: false
            
          }}
        />
    </div>
     </div>
    <div className="categoriesSlide" onClick={this.handleClick}>{this.state.slideOpen? <img src={Arrowup} alt="arrowup" className="arrowup" /> : <img src={Arrowdown} alt="arrowdown" className="arrowdown"/>}</div>
     <div className="clear">
     <List parentToggle={this.doParentToggle} />
     <ListSecond parentToggle={this.doParentToggle} />
     <ListThird parentToggle={this.doParentToggle} />
     <ListFourth parentToggle={this.doParentToggle} />
     <ListFifth parentToggle={this.doParentToggle} />
     
     </div>
     </div>
        )
    }
}
