import React, { Component } from 'react';

class SignForm extends Component { 
	constructor(props) {
	    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);  

	}
	handleSubmit(e){
		e.preventDefault();
		console.log(this.props.mode);
	}
	handletest(e){
		e.target.parentNode.classList.toggle('active')
	}
	render() {
    	return (

            	<form>
            	<div className="valid-wrp">
            	  <input type="text" 
            	 	 placeholder="Email" 
            	 	 name='email' 
            	  	onFocus={this.handletest} 
            	  	onBlur={this.handletest}/>
            	 </div>
            	 <div className="valid-wrp">
            	  <input type="password" 
            	 	 placeholder="Password" 
            	  	onFocus={this.handletest} 
            		onBlur={this.handletest}/>
            	 </div>

            	  {this.props.mode ==='up'?(
            		 <div className="valid-wrp">
            	  	 	<input type="password" 
            	  	 		placeholder="Confirm password" 
            	  	 		onFocus={this.handletest} 
            	  	 		onBlur={this.handletest}/>
            		</div>  
            	  	):('')}
            	  <input type="submit" onClick={this.handleSubmit} value={this.props.mode ==='up'? 'Sign Up': 'Sign In'}/>
            	 </form>
    		)
	}	
 }  

export default SignForm;
