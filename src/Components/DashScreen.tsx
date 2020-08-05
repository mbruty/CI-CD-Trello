import React, { Component } from 'react'
import { List, Card } from '../Types/List';
import AddNewList from './AddNewList';
import ListCard from './ListCard';
import { reorder } from '../Helper-Functions/ReorderLists'
import testLists from '../list.json'
import { json } from 'express';
export default class DashScreen extends Component<DashProps, DashState> {

    constructor(props: DashProps){
        super(props);
        let data: Array<List> = JSON.parse(JSON.stringify(testLists));
        this.state = {
            lists: data,
            projectName: ''
        }

        this.updateBoards = this.updateBoards.bind(this);
        this.updateList = this.updateList.bind(this); 
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
    // TODO Set props
}

interface DashState{
    lists: Array<List>,
    projectName: string
}