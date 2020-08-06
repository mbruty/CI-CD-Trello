import React, { Component } from 'react'
import { ListType, CardType } from '../Types/List';
import AddNewList from './AddNewList';
import List from './List';
import { reorder } from '../Helper-Functions/ReorderLists'
import axios from 'axios';
import { updateBoard } from '../Fetch-Functions/UpdateBoards'
export default class DashScreen extends Component<DashProps, DashState> {

    constructor(props: DashProps){
        super(props);
        this.state = {
            lists: [],
            projectName: '',
            fetched: false,
            boardID: this.props.boardID
        }

        this.updateBoards = this.updateBoards.bind(this);
        this.updateList = this.updateList.bind(this); 
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData(){
        axios.get('http://localhost:5000/board/' + this.props.boardID)
        .then(response => {
            this.setState({...this.state, lists: response.data.lists, fetched: true});
        })
    }

    updateBoards(boardName: string){
        let listCopy: Array<ListType> = this.state.lists;
        listCopy.push({id: this.state.lists.length, name: boardName, listPosition: listCopy.length, items: []});
        console.log(listCopy);
        this.setState({...this.state, lists: reorder(listCopy)});
    }

    async updateList(id: number, name: string){
        let listCopy: Array<ListType> = [...this.state.lists]
        listCopy.forEach(element => {
            if(element.id === id){
                const newItem : CardType = {
                    name: name,
                    complete: false,
                    itemPosition: element.items.length
                }
                element.items.push(newItem);
            }
        });
        this.setState({...this.state, lists: listCopy});
        // // Update the database with the new item in the list
        await updateBoard(this.props.boardID, listCopy).then( r => console.log("r"))
        .catch(err => console.log(err))
    }
    render() {
        if(this.props.boardID && !this.state.fetched){
            this.fetchData();
        }
        return (
            <div className="dash-screen">
                <div className="card-container">
                    {this.state.lists.map(list => (
                        <List updateList={this.updateList} list={list}/>
                    ))}
                    <AddNewList callback={this.updateBoards}/>
                </div>
            </div>
        )
    }
}

interface DashProps{
    boardID: string
}

interface DashState{
    lists: Array<ListType>,
    projectName: string,
    fetched: boolean,
    boardID: string
}