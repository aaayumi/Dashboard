import React from 'react';
import Dotmenu from './img/dotmenu.png';
import Edit from './img/edit.png';
import Trashbin from './img/trashbin.png';
import Check from './img/check.png';
import Add from './img/add.png';
import Fail from './img/fail.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


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
            modal : false
        };
         this.toggle = this.toggle.bind(this);
    }

    toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


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
            <p>Add New ? </p>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Add a new question</ModalHeader>
             <ModalBody>
            <form onSubmit={this.handleCreate.bind(this)}>
            <input type="text" placeholder="New Question" ref="newItemInput" />
            <button className="modalButton" onClick={this.toggle}>Submit</button>
            </form>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
            </Modal>
            <div className="addSample" onClick={this.toggle}><img src={Add} className="add" alt="add"/></div>
            </div>
            );
    }
}

class QuestionItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
         editing: false,
         modal : false
        };
    this.toggle = this.toggle.bind(this);
    }
    
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
                <div className="editSample" onClick={this.onEditClick.bind(this)} onClick={this.toggle}><img src={Edit} className="edit" alt="edit"/></div>
                <div className="trashbinSample" onClick={this.props.deleteItem.bind(this, this.props.item)}><img src={Trashbin} className="trashbin" alt="Trashbin"/></div>
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
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit a question</ModalHeader>
          <ModalBody>
          <form onSubmit={this.onSaveClick.bind(this)}>
                <input type="text" ref="editInput" defaultValue={this.props.item} />
          <button className="modalButton" onClick={this.toggle}>Submit</button>
           </form>
          </ModalBody>
        </Modal>
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

export default class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionItem
        };
    }

    createItem(item){
        this.state.questionItem.unshift({
            item : item,
        });
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
        this.setState({ questionItem : this.state.questionItem });
        console.log(this.state.questionItem)
    }

    deleteItem(item) {
        let index = this.state.questionItem.map(element => element.item).indexOf(item);
        this.state.questionItem.splice(index, 1);
        this.setState({ questionItem : this.state.questionItem });
    }

    render() {
        return (
        <div className="list" style={{"display" : "flex"}}>
        <div className="titleElement" style={{"flex": "1", "backgroundColor" : "red"}}></div>
        <div style={{"flex": "5", "display": "flex", "flex-direction": "column"}}>
        <QuestionList questionItem={this.state.questionItem} deleteItem={this.deleteItem.bind(this)}  saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
        <CreateItem questionItem={this.state.questionItem} createItem={this.createItem.bind(this)} />
        </div>
        </div>);
    }
    }