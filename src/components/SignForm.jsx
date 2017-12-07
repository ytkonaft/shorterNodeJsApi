import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {UnmountClosed} from 'react-collapse';
import Notification from './Notification.jsx';
import axios from 'axios';
import { apiPrefix } from '../etc/config.json';

var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	rePass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
	validTimer;

class SignForm extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			enterMode: '',
			showAuth: false,
			email: '',
			pswrd: '',
			confPswrd: '',
			showAlert: false,
			alertText: '',
			alertType: ''
	}
	this.handleSign = this.handleSign.bind(this);  
	this.signUp = this.signUp.bind(this);  
	this.signIn = this.signIn.bind(this);  
	this.handleEmail = this.handleEmail.bind(this);  
	this.handlePswrd = this.handlePswrd.bind(this);  
	this.handePswrdConfirm = this.handePswrdConfirm.bind(this);  
	this.handleBlur = this.handleBlur.bind(this);  
	this.handleCloseAlert = this.handleCloseAlert.bind(this);  
	}
	handleSign(e){
		e.preventDefault();
  		const User = {
  			mail: this.state.email,
			pass: this.state.pswrd,
  		}		
  		const that = this;
  		if(this.state.enterMode==='up'){
    		axios.post(`${apiPrefix}/signup/`, User)
			.then(function (response) {
				that.setState({alertText:'Registration completed successfully, you can to sign in',
								alertType: 'success',
								showAlert: true

				});
				that.setState({enterMode:'in'});
				that.resetForm('in');
			})
			.catch(function (error) {
			  switch(error.response.status){
			  	case 422: 
			  		that.setState({alertText:'This email is exist'});
			  		break;
			  }
			  that.setState({alertType: 'error',showAlert: true})
			});			
  		}else{
  			axios.post(`${apiPrefix}/signin/`, User)
			.then(function (response) {
				that.props.submited(response);
			})
			.catch(function (error) {
			  switch(error.response.status){
			  	case 420: 
			  		that.setState({alertText:'Please enter email'});
			  		break;
			  	case 421: 
			  		that.setState({alertText:'Please, enter the password'}); 
			  		break;
			  	case 404: 
			  		that.setState({alertText:'This email is not found'}); 
			  		break;
			  	case 401: 
			  		that.setState({alertText:'The password is not correct'}); 
			  		break;		
			  	case 422: 
			  		that.setState({alertText:'Please, fill the form'}); 
			  		break;					  		
			  }
			  that.setState({alertType: 'error',showAlert: true})
			});  			
  		}
	}

	handletest(e){
		e.target.parentNode.classList.toggle('active')
		if(e.target.value === ''){
			e.target.parentElement.classList.remove('has-error', 'valid')
		}
	}
	resetForm(mode = ''){
	  this.setState({
			email: '',
			showAuth: true,
			enterMode: mode,
			pswrd: '',
			confPswrd: ''
	  })
	  var formWrp = document.getElementById('enterForm');
	  if(formWrp){
	  	let arrWrp = formWrp.querySelectorAll('.valid-wrp');
	  		for(var i = 0; i < arrWrp.length;i++){
	  			arrWrp[i].classList.remove('has-error','valid');
	  		}
	  	}
	}
	signIn(e){
	  this.resetForm('in');
	}
	signUp(e){
  		this.resetForm('up')
	}  

	validator(elm,type){
		switch (type) {
		  case 'email':
		   return re.test(elm.value)?  true: false
		    break;
		  case 'pass':
		   return rePass.test(elm.value)?  true: false
		    break;		    
		  case 'conf':
		   return (elm.value === this.state.pswrd && rePass.test(elm.value))?  true: false
		    break;			    
		}
	}
	checkValid(type,elm){
		let that = this,
			prnt = elm.parentNode;
		clearTimeout(validTimer);
		prnt.classList.remove('has-error','valid')
		if(elm.value === '') return
		if(!this.validator(elm,type)){
			validTimer = setTimeout(function(){
				prnt.classList.add('has-error')
			}, 1000);
		}else{
			prnt.classList.remove('has-error');
			prnt.classList.add('valid')
		}
	}

	handleEmail(e){
		this.setState({email: e.target.value});
		this.checkValid('email', e.target)
    }

	handlePswrd(e){
		this.setState({pswrd: e.target.value})
		this.checkValid('pass',e.target)
	}	
	handePswrdConfirm(e){
		this.setState({confPswrd: e.target.value})
		this.checkValid('conf',e.target)
	}
	handleBlur(e){
		e.target.parentNode.classList.remove('active')
		if(e.target.value === '') return
		if(!this.validator(e.target,e.target.name)){
			e.target.parentNode.classList.add('has-error')
		}
	}
	handleCloseAlert(e){
		this.setState({showAlert: false})
	}
	render() {
		return (
		<div>
				<div className={"btns "+this.state.enterMode}>
				  <button className={"green-btn _main "+ (this.state.enterMode ==='in'?'active':'') }
				  			onClick={this.signIn}>Sign in</button>
				  <button className={"blue-btn _main "+ (this.state.enterMode ==='up'?'active':'') }
				  			onClick={this.signUp}>Sign up</button>
				</div>
			<div className="allert-wrp">
				<UnmountClosed isOpened={this.state.showAlert} >	
					<div className="ReactCollapse--content">
				 	<Notification alertText={this.state.alertText}
									alertClose={this.handleCloseAlert}
									alertType={this.state.alertType}/>
					</div>								
				</UnmountClosed >
			</div>	
			<UnmountClosed isOpened={this.state.showAuth} >	
				<div className="ReactCollapse--content">
					<form id="enterForm">
					<div className="valid-wrp">
					  <input type="text" 
						 placeholder="Email" 
						 name='email' 
						 value={this.state.email}
						 onChange={this.handleEmail}
						onFocus={this.handletest} 
						onBlur={this.handleBlur}/>
						<div className="info">
							<i className="alert-ico"/>
							<div>Please check your email</div>
						</div>
					 </div>
					 <div className="valid-wrp">
					  <input type="password" 
						 placeholder="Password" 
						 name='pass' 
						 value={this.state.pswrd}
						 onChange={this.handlePswrd}
						onFocus={this.handletest} 
						onBlur={this.handleBlur}/>
						<div className="info">
							<i className="alert-ico"/>
							<div>
								<ul>
									<li>Minimum eight in length</li>
									<li>At least one upper case</li>
									<li>At least one digit</li>
								</ul>
							</div>
						</div>
					 </div>
	
					  {this.state.enterMode ==='up'?(
							<ReactCSSTransitionGroup
							  transitionName="example"
							  transitionAppear={true}
							  transitionAppearTimeout={500}
							  transitionEnter={false}
							  transitionLeave={false}>
	
								<div className="valid-wrp">
									<input type="password" 
										placeholder="Confirm password" 
										name='conf' 
										value={this.state.confPswrd}
										onChange={this.handePswrdConfirm}
										onFocus={this.handletest} 
										onBlur={this.handleBlur}/>
									<div className="info">
										<i className="alert-ico"/>
										<div>Passwords Don`t Match or is not valid</div>
									</div>									
								</div>  
	
							</ReactCSSTransitionGroup>
						):('')}
	
					  <input type="submit" 
					  		onClick={this.handleSign} 
					  		value={'Sign '+this.state.enterMode}/>
					 </form>
				 </div> 
			</UnmountClosed >
		</div>
		)
	}	
 }  

export default SignForm;
