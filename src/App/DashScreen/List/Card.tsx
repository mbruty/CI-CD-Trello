import React, { Component } from 'react'
import { CardType } from '../../../shared/List'
import TextareaAutosize from 'react-textarea-autosize';


export default class CardItem extends Component<CardProps, CardState> {
    private textRef: React.RefObject<any>
    constructor(props: CardProps){
        super(props);
        this.state = { 
            showEditModal : false
        }
        this.onClick = this.onClick.bind(this);
        this.setStateAsync = this.setStateAsync.bind(this);
        this.submit = this.submit.bind(this);
        this.close = this.close.bind(this);
        this.options = this.options.bind(this);
        this.textRef = React.createRef();
    }

    async onClick(){
        // Needs to be awaited so that the ref can be selected after the re-render
        await this.setStateAsync({ showEditModal: true });
        this.textRef.current?.select();
    }

    setStateAsync(state: CardState){
        return new Promise((resolve) => {
            this.setState(state, resolve);
        })
    }
    options() {
        this.props.showOptionsModal(this.props.card);
        this.close();
    }
    submit(){
        const text = this.textRef.current.value;
        this.props.updateCardInList(this.props.card.id, text);
        this.close();
    }
    close(){
        this.setState({ showEditModal: false});
    }
    render() {
        if(this.state.showEditModal){
            return (
                <>
                    <div className="grey-out"/>
                    <div className="edit-modal">
                        <div className="padding"/>
                        <div className="flex">
                            {/* Render the label color if it is present */
                            this.props.card.label ? 
                            this.props.card.label.map((label) => (<div className="card-label" style={{backgroundColor: this.props.colours[label], zIndex: 6}}/>)) : null}
                        </div>
                        <div className="padding"/>
                        <TextareaAutosize ref={this.textRef}>{this.props.card.name}</TextareaAutosize>
                        <button className="menu-button green" onClick={this.submit}>Save</button>
                        <button className="menu-button green" onClick={this.options}>Options</button>
                        <button className="menu-button red" onClick={this.close}>Close</button>
                    </div>
                </>
            )
        }
        else{
            return (
                <div className="card-item noselect">
                    <div className="flex">
                        {/* Render the label color if it is present */
                            this.props.card.label ? 
                            this.props.card.label.map((label) => (<div className="card-label" style={{backgroundColor: this.props.colours[label]}}/>)) : null}
                    </div>
                    <p>{this.props.card.name}</p>
                    <i className="material-icons edit-icon" onClick={this.onClick}>create</i>
                    {renderDate(this.props.card.complete, this.props.card.due)}
                </div>
            )
        }
    }
}

function renderDate(complete: boolean, dueDate?: string){
    if(!dueDate){
        return <div className="footer"/>;
    }

    const date = new Date(dueDate);

    const y = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const m = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const d = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    let now = new Date();
    let className: string = "due";
    if(complete) className += " complete";
    else if( date < now) className += " over-due";
    else{ 
        now.setDate(now.getDate() + 2);
        if(date < now) className += " due-soon";
    }

    return (
    <div className={className}>
        <i className="material-icons">alarm</i>
        <p>{m} {d} {date?.getFullYear() !== new Date().getFullYear() ? `, ${y}`:''}</p>
    </div>
    )
}

interface CardProps {
    card: CardType,
    colours: Array<string>,
    updateCardInList(id: number, newName: string): void,
    showOptionsModal(card: CardType): void
}

interface CardState {
    showEditModal: boolean
}