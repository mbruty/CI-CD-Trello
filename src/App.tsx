import React, { Component } from 'react'
import DashScreen from './Components/DashScreen';
import './App.scss';
import axios from 'axios';
const userID = '5f2ad210c3c6dfb7fe773212';

export default class App extends Component <{}, AppState> {

	constructor(props: any){
		super(props);
		this.state = {
			userID: userID,
			boards: []
		}

		this.componentDidMount = this.componentDidMount.bind(this);
	}

	async componentDidMount() {
		axios.get('http://localhost:5000/users/' + userID)
			.then(response => {
				this.setState({...this.state, boards: response.data.boards});
			})
	}

	render() {
		return (
			<div className="main-container">
				<DashScreen boardID={this.state.boards[0]}/>
			</div>
		)
	}
}

interface AppState {
	userID: string,
	boards: Array<string>
}