import React, { Component } from 'react'
import { ListType, CardType } from '../shared/List';
import AddNewList from './DashScreen/AddNewList';
import List from './DashScreen/List';
import { reorder } from './DashScreen/ReorderLists'
import axios from 'axios';
import { updateBoard } from '../shared/UpdateBoards'
import OptionsModal from './DashScreen/OptionsModal'

export default class DashScreen extends Component<DashProps, DashState> {

    constructor(props: DashProps){
        super(props);
        this.state = {
            lists: [],
            colours: [],
            projectName: '',
            fetched: false,
            boardID: this.props.boardID,
            showOptionsModal: false,
            cardToShow: undefined,
        }
        this.updateBoards = this.updateBoards.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);
        this.addItemToList = this.addItemToList.bind(this); 
        this.setStateAsync = this.setStateAsync.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.updateCardInList = this.updateCardInList.bind(this);
        this.showOptionsModal = this.showOptionsModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    async fetchData(){
        axios.get('http://localhost:5000/board/' + this.props.boardID)
        .then(response => {
            this.setState({...this.state, lists: response.data.lists, colours: response.data.lables, fetched: true});
        })
    }

    updateBoards(boardName: string){
        let listCopy: Array<ListType> = this.state.lists;
        listCopy.push({id: this.state.lists.length, name: boardName, listPosition: listCopy.length, items: []});
        updateBoard(this.props.boardID, listCopy).then( r => console.log("r"))
        .catch(err => console.log(err))
        this.setState({...this.state, lists: reorder(listCopy)});
    }

    addItemToList(id: number, name: string){
        let listCopy: Array<ListType> = [...this.state.lists]
        axios.get('http://localhost:5000/board/' + this.props.boardID + '/max').then( max => {
            listCopy.forEach(element => {
                if(element.id === id){
                    const newItem : CardType = {
                        name: name,
                        id: max.data + 1,
                        complete: false,
                        itemPosition: element.items.length
                    }
                    element.items.push(newItem);
                }
            });
            this.setState({...this.state, lists: listCopy});
            // // Update the database with the new item in the list
            updateBoard(this.props.boardID, listCopy).then( r => console.log("r"))
            .catch(err => console.log(err))

        });
    }

    showOptionsModal(card: CardType) {
        this.setState({...this.state, showOptionsModal: true, cardToShow: card});
    }

    closeModal() {
        this.setState({...this.state, showOptionsModal: false, cardToShow: undefined});
    }

    updateCardInList(id: number, newName: string){
        let listCopy: Array<ListType> = [...this.state.lists]
        listCopy.forEach(list => {
            list.items.forEach(item =>{
                if(item.id === id){
                    item.name = newName;
                }
            })
        })
        this.setState({...this.state, lists: listCopy});
        updateBoard(this.props.boardID, listCopy).then( r => console.log("r"))
            .catch(err => console.log(err))
    }

    setStateAsync(state: DashState){
        return new Promise((resolve) => {
            this.setState(state, resolve);
        })
    }

    deleteLabel(label: number, id?:number){
        // Can't use truthy values here as id could be 0
        if(id === null) return;
        let listCopy = [...this.state.lists];
        listCopy.forEach(list => {
            list.items.forEach(item =>{
                    
            })
        })
        // Update the state and db with the new state
        this.setStateAsync({...this.state, lists: listCopy}).then( () => {
            //updateBoard(this.props.boardID, listCopy)
        })
    }

    render() {
        if(this.props.boardID && !this.state.fetched){
            this.fetchData();
        }
        return (
            <div className="dash-screen">
                <div className="card-container">
                    {this.state.lists.map(list => (
                        <List colours={this.state.colours} showOptionsModal={this.showOptionsModal} updateCardInList={this.updateCardInList} updateList={this.addItemToList} list={list}/>
                    ))}
                    <AddNewList callback={this.updateBoards}/>
                </div>
                {this.state.showOptionsModal ? <OptionsModal delete={this.deleteLabel} colours={this.state.colours} close={this.closeModal} card={this.state.cardToShow}/> : null}
            </div>
        )
    }
}

interface DashProps{
    boardID: string
}

interface DashState{
    lists: Array<ListType>,
    colours: Array<string>,
    projectName: string,
    fetched: boolean,
    boardID: string,
    showOptionsModal: boolean,
    cardToShow?: CardType
}