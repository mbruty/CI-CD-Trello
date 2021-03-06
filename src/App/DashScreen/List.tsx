import React, { Component } from 'react'
import { ListType, CardType } from '../../shared/List';
import TextareaAutosize from 'react-textarea-autosize';
import Card from './List/Card';

export default class ListBoard extends Component<ListBoardProps, ListBoardState> {

    private titleRef: React.RefObject<any>;
    constructor(props: ListBoardProps){
        super(props);
        this.state = {
            showAddModal: false
        }

        this.showAddItem = this.showAddItem.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.submit = this.submit.bind(this);
        this.titleRef = React.createRef();
    }

    submit(){
        const text = this.titleRef.current.value;
        this.props.updateList(this.props.list.id, text);
        this.setState({...this.state, showAddModal: false})
    }

    closeAdd(){
        this.setState({...this.state, showAddModal: false});
    }
    
    showAddItem(){
        this.setState({...this.state, showAddModal: true});
    }

    renderBottom(){
        if(this.state.showAddModal){
            return(
                <div>
                    <TextareaAutosize autoFocus ref={this.titleRef } className="card-textarea" placeholder="Enter a title for this card..."></TextareaAutosize>
                    <div className="btn-container">
                        <button className="menu-button green" onClick={this.submit}>Add Card</button>
                        {/* Using a button rather than an icon with onClick to
                        be more compatible with accessibility tools like screen readers.*/}
                        <button className="menu-button red" onClick={this.closeAdd}>Cancel</button>
                    </div>
                </div>
            )
        }
        else{
            return(                    
            <a className="add-item-icon noselect" onClick={this.showAddItem}>+ Add a new item</a>
            )
        }
    }
    render() {
        return (
            <div className="board">
                <div className="card">
                    <TextareaAutosize>{this.props.list.name}</TextareaAutosize>
                    <a className="menu-icon noselect">...</a>
                    <div className="container">
                        {this.props.list.items!.map((item) => (
                            <Card colours={this.props.colours} showOptionsModal={this.props.showOptionsModal} updateCardInList={this.props.updateCardInList} card={item as CardType}/>
                        ))}
                    </div>
                    {this.renderBottom()}
                    <a className="menu-icon noselect">...</a>
                </div>
            </div>
        )
    }
}

interface ListBoardProps {
    list: ListType,
    colours: Array<string>,
    updateList(id: number, text: string): void,
    updateCardInList(id: number, newName: string): void,
    showOptionsModal(card: CardType): void
}

interface ListBoardState {
    showAddModal: boolean
}