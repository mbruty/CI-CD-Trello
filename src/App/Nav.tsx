import React, { Component } from 'react';
import Loading from './Nav/Loading';
import UptoDate from './Nav/UptoDate';
import Error from './Nav/Error';

class componentName extends Component<NavProps, NavState> {
    private loadingRef: React.RefObject<any>;
    private upToDateRef: React.RefObject<any>;
    private errorRef: React.RefObject<any>;
    constructor(props: NavProps) {
        super(props);
        this.state = {

        }
        this.loadingRef = React.createRef();
        this.upToDateRef = React.createRef();
        this.errorRef = React.createRef();
    }
    
    renderLoading = () => {
        if(this.props.updateStatus === "loading"){
            return (
                <div className="in" ref={this.loadingRef}> <Loading/> </div>
            )
        }
        else if (this.loadingRef.current?.className === "in"){
            return (
                <div className="out" ref={this.loadingRef}> <Loading/> </div>
            )
        }
        else return null;
    }

    renderUptodate = () => {
        if(this.props.updateStatus === "uptodate"){
            return (
                <div className="in" ref={this.upToDateRef}> <UptoDate/> </div>
            )
        }
        else if (this.upToDateRef.current?.className === "in"){
            return (
                <div className="out" ref={this.upToDateRef}> <UptoDate/> </div>
            )
        }
        else return null;
    }

    renderError = () => {
        if(this.props.updateStatus === "error"){
            return (
                <div className="in" ref={this.errorRef}> <Error/> </div>
            )
        }
        else if (this.errorRef.current?.className === "in"){
            return (
                <div className="out" ref={this.errorRef}> <Error/> </div>
            )
        }
        else return null;
    }
    
    render() {
        return (
            <div className="nav">
                <div className="status-container">
                    {this.renderLoading()}
                    {this.renderUptodate()}
                    {this.renderError()}
                </div>
                
            </div>
        );
    }
}

interface NavProps{
    updateStatus: string
}

interface NavState{

}

export default componentName;