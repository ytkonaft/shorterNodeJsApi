import React, { Component } from 'react';
class Notification extends Component { 
	constructor(props) {
		super(props);
	}	
	render(){
		return(
			<div className={'alert '+this.props.alertType}>
				<p>{this.props.alertText}</p>
				<button onClick={this.props.alertClose}/>	
			</div>
		)}
}
export default Notification;
