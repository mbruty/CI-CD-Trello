import React, { Component } from 'react'
import { Board } from '../Types/Board';

export default class DashScreen extends Component<DashProps, DashState> {

    public inputRef: React.RefObject<HTMLInputElement>;
    public addRef: React.RefObject<HTMLDivElement>;

    constructor(props: DashProps){
        super(props);
        this.state = {
            boards: [],
            projectName: '',
            addIdle: true
        }
        this.inputRef = React.createRef<HTMLInputElement>();
        this.createNew = this.createNew.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setStateAsync = this.setStateAsync.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.addRef = React.createRef<HTMLDivElement>();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(e: any) {
        if(!this.addRef?.current?.contains(e.target)){
            this.closeAdd();
        }
    }

    closeAdd(){
        this.setState({...this.state, addIdle: true});
    }

    async createNew(e: React.MouseEvent){
        // So that the page isn't re-rendered when a click inside the container is triggered
        if(this.state.addIdle){
            await this.setStateAsync({...this.state, addIdle: false});
            // This needs to be awaited so that the input can be focused after the re-render.
            this.inputRef?.current?.focus();
        }
    }

    setStateAsync(state: DashState){
        return new Promise((resolve) => {
            this.setState(state, resolve);
        })
    }

    render() {
        return (
            <div className="dash-screen">
                <div className="card-container">
                    {this.state.boards.map(board => (
                        null
                    ))}
                    <div ref={this.addRef} className={`add-card ${this.state.addIdle ? "idle" : ""} noselect`} onClick={ this.createNew }>
                        <i className="material-icons clickthrough">add</i>
                        <p className="clickthrough">Add another list</p>
                        <input ref={this.inputRef} placeholder="Enter list title..."/>
                        <div>
                            <button className="green">Add List</button>
                            {/* Using a button rather than an icon with onClick to
                            be more compatible with accessibility tools like screen readers.*/}
                            <button className="red" onClick={this.closeAdd}>Cancel</button>
                        </div>
                    </div>
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
    projectName: string, 
    addIdle: boolean
}