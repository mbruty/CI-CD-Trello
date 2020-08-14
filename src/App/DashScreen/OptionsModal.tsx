import React, { Component } from 'react'
import { CardType } from '../../shared/List'
import TextareaAutosize from 'react-textarea-autosize';

export default class OptionsModal extends Component<OptionsModalProps, OptionsModalState> {

    render() {
        return (
            <>
                <div className="grey-out"/>
                <div className="options-modal noselect">
                    <TextareaAutosize>{this.props.card?.name}</TextareaAutosize> 
                    <i className="material-icons close noselect" onClick={this.props.close}>close</i>
                    <i className="material-icons remove noselect" onClick={this.props.close}>delete_outline</i>
                    <p>Labels</p>
                    <div className="flex">
                        {this.props.card?.label?.map(label => (
                            <>
                                <div className="material-icons close " onClick={() => this.props.delete(label, this.props.card?.id)}>close</div>
                                <div className="label" style={{backgroundColor: this.props.colours[label]}}/>
                            </>))}
                        <i className="material-icons">add</i>
                    </div>
                </div>

            </>
        )
    }
}

interface OptionsModalProps{
    card?: CardType,
    colours: Array<string>,
    close(): void,
    delete(label:number, id?:number): void
}

interface OptionsModalState{

}