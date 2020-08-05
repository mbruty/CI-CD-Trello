import React, { Component } from 'react'
import { List, Card } from '../Types/List';
import AddNewList from './AddNewList';
import ListCard from './ListCard';
import { reorder } from '../Helper-Functions/ReorderLists'
import axios from 'axios';

export default class DashScreen extends Component<DashProps, DashState> {

    constructor(props: DashProps){
        super(props);
        this.state = {
            lists: [],
            projectName: '',
            fetched: false
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
        let listCopy: Array<List> = this.state.lists;
        listCopy.push({id: 0, name: boardName, listPosition: listCopy.length, items: []});
        this.setState({...this.state, lists: reorder(listCopy)});
    }

    updateList(id: number, name: string){
        //Find the list in current state
        const list = this.state.lists.find(l => l.id === id);
        const newItem : Card = {
            name: name,
            complete: false,
            itemPosition: list!.items.length
        }
        list?.items.push(newItem);
    }
    render() {
        if(this.props.boardID && !this.state.fetched){
            this.fetchData();
        }
        return (
            <div className="dash-screen">
                <div className="card-container">
                    {this.state.lists.map(list => (
                        <ListCard updateList={this.updateList} list={list}/>
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
    lists: Array<List>,
    projectName: string,
    fetched: boolean
}