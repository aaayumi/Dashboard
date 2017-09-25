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
             <div className="createNew">
             <p> Add new ? </p>
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
    console.log(this.state.modal)
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
    <div className="questionItem">
    <span className="name">
     {this.renderName()}
    </span>
    <span className="actions">
    {this.renderButtons()}
    </span>
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
    renderItems() {
        return this.props.questionItem.map((item, index) => <QuestionItem key={index} {...item} {...this.props} />);
    }
render() {
    return (
    <div className="item-list">
     {this.renderItems()}
    </div>
    );
}
}

class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItem
          }
    }

    createItem(item){
        this.state.questionItem.unshift({
            item : item,
        });

        let length1 = questionItem.length;
        
        this.setState({
            questionItem : this.state.questionItem
        });
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
     }

    deleteItem(item) {
        let index = this.state.questionItem.map(element => element.item).indexOf(item);
        this.state.questionItem.splice(index, 1);
         this.setState({
            questionItem : this.state.questionItem
        });

    }

    render() {
        const { questionItem } = this.state;
         const { length } = this.props
         piData = questionItem.length 
         console.log('question item piData' + piData)
        return (
        <div>
       
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "orange", "color": "white", "textAlign": "center"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Advice + FAQ  </div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}} length={ questionItem.length } />
        </div>

        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionList questionItem={this.state.questionItem} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
        <CreateItem questionItem={this.state.questionItem} createItem={this.createItem.bind(this)} />
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
             <div className="createNew">
             <p> Add new ? </p>
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
    console.log(this.state.modal)
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
    <div className="questionItem">
    <span className="name">
     {this.renderName()}
    </span>
    <span className="actions">
    {this.renderButtons()}
    </span>
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
    <div className="item-list">
     {this.renderItems()}
    </div>
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
    }

    createItem(item){
        this.state.questionItemSecond.unshift({
            item : item
        });

        let length2 = questionItemSecond.length;
        
        this.setState({
            questionItemSecond : this.state.questionItemSecond
        });
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
    }

    deleteItem(item) {
        let index = this.state.questionItemSecond.map(element => element.item).indexOf(item);
        this.state.questionItemSecond.splice(index, 1);
         
        let length2 = questionItemSecond.length;

        this.setState({
            questionItemSecond : this.state.questionItemSecond
        });
    }

    render() {
        const { questionItemSecond } = this.state
        piData2 = questionItemSecond.length 
      console.log('piData2' + piData2)
        return(
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement"  style={{"flex": "1", "backgroundColor" : "blue", "color": "white", "textAlign": "center"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Product Recs </div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}}length={ questionItemSecond.length } /></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListSecond questionItemSecond={this.state.questionItemSecond} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
        <CreateItemSecond questionItemSecond={this.state.questionItemSecond} createItem={this.createItem.bind(this)} />
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
             <div className="createNew">
             <p> Add new ? </p>
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
    console.log(this.state.modal)
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
    <div className="questionItem">
    <span className="name">
     {this.renderName()}
    </span>
    <span className="actions">
    {this.renderButtons()}
    </span>
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
    <div className="item-list">
     {this.renderItems()}
    </div>
    );
}
}

class ListThird extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItemThird
          }
    }

    createItem(item){
        this.state.questionItemThird.unshift({
            item : item
        });
  
        let length2 = questionItemThird.length;

        this.setState({
            questionItemThird : this.state.questionItemThird
        });
        console.log(this.state.questionItemThird.length)
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
        console.log(this.state.questionItemThird.length)
    }

    deleteItem(item) {
        let index = this.state.questionItemThird.map(element => element.item).indexOf(item);
        this.state.questionItemThird.splice(index, 1);
         
        this.setState({
            questionItemThird : this.state.questionItemThird
        });
        console.log(this.state.questionItemThird.length)
    }

    render() {
        const { questionItemThird } = this.state
         piData3 = questionItemThird.length 
         console.log('piData' + piData3)
        return (
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "red", "color": "white", "textAlign": "center"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Update</div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}} length={ questionItemThird.length } /></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListThird questionItemThird={this.state.questionItemThird} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
        <CreateItemThird questionItemThird={this.state.questionItemThird} createItem={this.createItem.bind(this)} />
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
             <div className="createNew">
             <p> Add new ? </p>
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
    console.log(this.state.modal)
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
      <div className="questionItem">
      <span className="name">
      {this.renderName()}
      </span>
      <span className="actions">
      {this.renderButtons()}
      </span>
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
    <div className="item-list">
     {this.renderItems()}
    </div>
    );
}
}

class ListFourth extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItemFourth
          }
    }

    createItem(item){
        this.state.questionItemFourth.unshift({
            item : item,
        });

        let length2 = questionItemFourth.length;

        this.setState({
            questionItemFourth : this.state.questionItemFourth
        });
        console.log(this.state.questionItemFourth.length)
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
        console.log(this.state.questionItemFourth.length)
    }


    deleteItem(item) {
        let index = this.state.questionItemFourth.map(element => element.item).indexOf(item);
        this.state.questionItemFourth.splice(index, 1);
         
        this.setState({
            questionItemFourth : this.state.questionItemFourth
        });
        console.log(this.state.questionItemFourth.length)
    }


    render() {
        const { questionItemFourth } = this.state
         piData4 = questionItemFourth.length 
         console.log('piData' + piData3)
        return (
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "purple","color": "white", "textAlign": "center", "width": "150px"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Complaint</div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}} length={ questionItemFourth.length } /></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListFourth questionItemFourth={this.state.questionItemFourth} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
        <CreateItemFourth questionItemFourth={this.state.questionItemFourth} createItem={this.createItem.bind(this)} />
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
             <div className="createNew">
             <p> Add new ? </p>
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
    console.log(this.state.modal)
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
    <div className="questionItem">
    <span className="name">
     {this.renderName()}
    </span>
    <span className="actions">
    {this.renderButtons()}
    </span>
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
    <div className="item-list">
     {this.renderItems()}
    </div>
    );
}
}

class ListFifth extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItemFifth
          }
    }

    createItem(item){
        this.state.questionItemFifth.unshift({
            item : item,
        });
    
        let length2 = questionItemFifth.length;

        this.setState({
            questionItemFifth : this.state.questionItemFifth
        });
        console.log(this.state.questionItemFifth.length)
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
        console.log(this.state.questionItemFifth.length)
    }

    deleteItem(item) {
        let index = this.state.questionItemFifth.map(element => element.item).indexOf(item);
        this.state.questionItemFifth.splice(index, 1);
         
        this.setState({
            questionItemFifth : this.state.questionItemFifth
        });
        console.log(this.state.questionItemFifth.length)
    }

    render() {
        const { questionItemFifth } = this.state
         piData5 = questionItemFifth.length 
         console.log('piData' + piData3)
        return (
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "green", "color": "white", "textAlign": "center"}}><div style={{"fontSize": "50px", "marginTop": "20px"}} > Others </div><Chart style={{"color": "white", "fontSize": "20px", "position": "absolute"}} length={ questionItemFifth.length } /></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListFifth questionItemFifth={this.state.questionItemFifth} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
        <CreateItemFifth questionItemFifth={this.state.questionItemFifth} createItem={this.createItem.bind(this)} />
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
    }

    handleClick(){
        this.setState({
            slideOpen : !this.state.slideOpen
        })
        console.log(!this.state.slideOpen)
    }
    
    update() {
      var piData;
      this.setState({
        piData : piData
      })
    console.log('data' + piData)
    }    
 
    render(){
     console.log('check' + piData)
     const CategoriesPanel = this.state.slideOpen? "slideOpen" : "";
     const { length } = this.props
     console.log( 'result' + piData )
     
      var totalData = piData + piData2 + piData3 + piData4 + piData5;

      let newpiData =  function() {
       return parseInt((piData /  totalData ) * 100 ) };

       let newpiData2 =  function() {
       return parseInt((piData2 /  totalData ) * 100) };

       let newpiData3 =  function() {
       return  parseInt((piData3 /  totalData ) * 100) };

       let newpiData4 =  function() {
       return  parseInt((piData4 /  totalData ) * 100) };

       let newpiData5 =  function() {
       return  parseInt((piData5 /  totalData ) * 100) };

       console.log('update data ' + newpiData())

      console.log('question item piData parent component' + piData)


      const data = {
      labels: [
        'question1',
        'question2',
        'question3',
        'question4',
        'question5'
       ],
      datasets: [{
        data: [ newpiData() , newpiData2(), newpiData3(), newpiData4(), newpiData5()],
        backgroundColor: [
        'orange',
        'blue',
        'red',
        'purple',
        'green'
        ],
        hoverBackgroundColor: [
        'orange',
        'blue',
        'red',
        'purple',
        'green'
        ]
      }]};
   return(
    <div>
    <div id="chart" className={CategoriesPanel}>
    <Pie style={{"fontSize" : "20px" }}data={data}/>
    <div className="categoriesSlide" onClick={this.handleClick}>{this.state.slideOpen? <img src={Arrowup} alt="arrowup" className="arrowup" /> : <img src={Arrowdown} alt="arrowdown" className="arrowdown"/>}</div>
    <button onClick={this.update} className="chartButton">Update Information</button></div>
     
     <div className="clear">
  
     <List  />
     <ListSecond />
     <ListThird />
     <ListFourth />
     <ListFifth />
     </div>
     </div>
        )
    }
}
