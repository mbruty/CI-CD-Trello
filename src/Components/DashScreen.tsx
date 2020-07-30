import React, { Component } from 'react'
import { Board } from '../Types/Board';
export default class DashScreen extends Component {
    constructor(props: any){
        super(props);
        this.state = {
            boards: [] as Array<Board>
        }
    }
    render() {
        return (
            <div className="dash-scree">

            </div>
        )
    }
}
