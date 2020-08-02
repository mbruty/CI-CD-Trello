import React, { Component } from 'react'
import { Board } from '../Types/Board';
import AddNewList from './AddNewList';

export default class DashScreen extends Component<DashProps, DashState> {

    constructor(props: DashProps){
        super(props);
        this.state = {
            boards: [],
            projectName: ''
        }

        this.updateBoards = this.updateBoards.bind(this);
    }

    updateBoards(boardName: string){
        let boardsCoppy: Array<Board> = this.state.boards;
        boardsCoppy.push({name: boardName, listPosition: boardsCoppy.length});
        this.setState({...this.state, boards: boardsCoppy})
    }
    render() {
        return (
            <div className="dash-screen">
                <div className="card-container">
                    {this.state.boards.map(board => (
                        null
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
    boards: Array<Board>,
    projectName: string
}