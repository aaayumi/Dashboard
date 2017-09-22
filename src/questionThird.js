import React from 'react';
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
import rd3 from 'rd3';

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

export default class ListThird extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItemThird,
            pieData : [{label: "question1", value: 4}, {label: "question2", value: 10}, {label: "question3", value: 25 },{label: "question4", value: 5 },{label: "question5", value: 12 }]
    }
    }

    createItem(item){
        this.state.questionItemThird.unshift({
            item : item,
        });
        
       

        let length2 = questionItemThird.length;
        
        var array = [
        {label : "question1" ,value : length2 },
        {label : "question2" , value : length2 },
        {label : "question3" , value : length2 },
        {label : "question4" , value : length2 }, 
        {label : "question5" , value : length2 } ]

        this.setState({
            questionItemThird : this.state.questionItemThird,
            pieData : array
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
        
        var array = [{label : "question1" ,value : length2 },
        {label : "question2" , value : length2 },
        {label : "question3" , value : length2 },
        {label : "question4" , value : length2 }, 
        {label : "question5" , value : length2 } ]

        this.setState({
            questionItemThird : this.state.questionItemThird,
            pieData : array
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
        return (
        <div>
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "red"}}>Update</div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionListThird questionItemThird={this.state.questionItemThird} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
        <CreateItemThird questionItemThird={this.state.questionItemThird} createItem={this.createItem.bind(this)} />
        </div>
         </div>
         <Chart length={ questionItemThird.length } />
         </div>);
    }
    }

    class Chart extends React.Component {
  render() {
    const { length } = this.props
    
    return (
      <div>Chart: {length}</div>
    )
  }
}


  