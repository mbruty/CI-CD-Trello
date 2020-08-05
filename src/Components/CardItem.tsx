import React, { Component } from 'react'
import { Card } from '../Types/List'

export default class CardItem extends Component<CardProps, CardState> {
    render() {

        return (
            <div className="card-item noselect">
                {/* Render the label color if it is present */
                this.props.card.label ? 
                <div className="card-label" style={{backgroundColor: this.props.card.label}}/> : null}
                <p>{this.props.card.name}</p>
                {renderDate(this.props.card.complete, this.props.card.due)}
            </div>
        )
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
    card: Card
}

interface CardState {
}