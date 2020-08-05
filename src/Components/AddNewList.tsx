import React, { Component } from 'react';
import { createBoard } from '../Fetch-Functions/UpdateBoards';

export default class AddNewList extends Component<AddListProps, AddListState> {

    public inputRef: React.RefObject<HTMLInputElement>;
    public addRef: React.RefObject<HTMLDivElement>;

    constructor(props: AddListProps){
        super(props);

        this.state = { addIdle: true};
        this.inputRef = React.createRef<HTMLInputElement>();
        this.createNew = this.createNew.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setStateAsync = this.setStateAsync.bind(this);
        this.closeAdd = this.closeAdd.bind(this);
        this.submit = this.submit.bind(this);
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

    setStateAsync(state: AddListState){
        return new Promise((resolve) => {
            this.setState(state, resolve);
        })
    }

    async submit(){
        const name = this.inputRef?.current?.value!;
        await createBoard(this.inputRef?.current?.value)
        .then((_) => { this.props.callback(name)})
        .catch((err) => console.log(err));
    }

    render() {
        return (
            <div ref={this.addRef} className={`add-card ${this.state.addIdle ? "idle" : ""} noselect`} onClick={ this.createNew }>
                <i className="material-icons clickthrough">add</i>
                <p className="clickthrough">Add another list</p>
                <input ref={this.inputRef} placeholder="Enter list title..."/>
                <div>
                    <button className="menu-button green" onClick={this.submit}>Add List</button>
                    {/* Using a button rather than an icon with onClick to
                    be more compatible with accessibility tools like screen readers.*/}
                    <button className="menu-button red" onClick={this.closeAdd}>Cancel</button>
                </div>
            </div>
        )
    }
}

interface AddListProps{
    callback(name: string): void
}

interface AddListState{
    addIdle: boolean
}