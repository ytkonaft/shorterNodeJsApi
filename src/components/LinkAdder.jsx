import React, { Component } from 'react';
import '../css/LinkAdder.css';
import validUrl from 'valid-url';
import axios from 'axios';

var timerId,
    gglKey ='AIzaSyC1hWR-KdjZtVkYp6jBggRmWLHVxPphWks';
class LinkAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: '',
  		longUrl: '',
  		urlShort: '',
      img: '',
  		hasEror: false
    	};
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleLinkAdd = this.handleLinkAdd.bind(this);
    this.checkValid = this.checkValid.bind(this);
    this.isValid = this.isValid.bind(this);
    this.checkBlur = this.checkBlur.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.createShortUrl = this.createShortUrl.bind(this);


  }	
  checkValid(elm){
  	let res = validUrl.isUri(elm.value),
  			imgWrp = document.getElementById('link-img');
  	if(!res) {
  		elm.parentNode.classList.add('hasError'); 
  		this.setState({hasEror: true})
  		imgWrp.innerHTML = '';
  		imgWrp.classList.remove('has-img')
	  	if(elm.value==='')	elm.parentNode.classList.remove('hasError');
  		return;
  	}
  	this.isValid(elm);
  }


  isValid(elm){	
  	elm.parentNode.classList.remove('inFocus','hasError');
  	let imgWrp = document.getElementById('link-img'),
  			favIcon = document.createElement('img'),
  			imgSrc = 'https:/'+'/'+ 'www.google.com/s2/favicons?domain='+elm.value;
  	this.setState({img: imgSrc});
  	this.setState({hasEror: false})
  			imgWrp.innerHTML = '';
  			favIcon.src = imgSrc;
  			imgWrp.appendChild(favIcon);
  			imgWrp.classList.add('has-img');
  
  this.createShortUrl(elm.value);
    
  }
  handleNameChange(e){
    this.setState({name: e.target.value});
  }
  handleLinkChange(e){
  	clearTimeout(timerId);
  	e.target.parentNode.classList.remove('hasError');
  	this.setState({longUrl: e.target.value});
  	var elm = e.target || e.srcElement || this; 
  	timerId = setTimeout(()=>this.checkValid(elm),1000);
  }
  createShortUrl(url){
    let that = this;
     axios.post(`https:/`+`/www.googleapis.com/urlshortener/v1/url?key=${gglKey}`, 
     {
      "longUrl": url
      },
      {
        headers: {
              'Content-Type': 'application/json',
          }
      }   
    )
    .then(function (response) {
      that.loadShortLnk({urlShort: response.data.id});
    })
    .catch((error)=>console.log(error))
  }
  loadShortLnk(prps){
    this.setState(prps);
    console.log(this.state);
  }
  checkFocus(e){
  	e.target.parentNode.classList.add('inFocus');
  }
  checkBlur(e){
  	e.target.parentNode.classList.remove('inFocus');
  	this.checkValid(e.target);
  }  
  handleLinkAdd(){
    console.log(this.state.longUrl);
  	const newLnk = {
  		name: this.state.name,
			longUrl: this.state.longUrl,
			urlShort: this.state.urlShort
  	}
  	this.props.onLinkAdd(newLnk);
  	this.setState({
  		name: '',
  		longUrl: '',
  		urlShort: '',
      img: '',
  		hasEror: false
  	});
  }
  render() {
    return (
    		<div id="add-wrp" className="row">
    			<div className="col-md-1">
    				<div id="link-img"></div>
    			</div>
    			<div className="col-md-4">
    				<div className="valid-wrp">
	    				<input type="text" id="urlInput" 
	    								placeholder="Enter URL here"  
	    								value={this.state.longUrl} 
	    								onChange={this.handleLinkChange}  
	    								onFocus={this.checkFocus}
	    								onBlur={this.checkBlur}/>
	    				<div className="alert">Please check your url
	    					<small>protocols <b> http://</b> and <b> https://</b> are mandatory</small>
	    				</div>				
    				</div>
    			</div>
    			<div className="col-md-3">
            <div className="copy-wrp">
    				  <input type="text" 
    				  				className="shortUrl" 
    				  				readOnly="true" 
    				  				placeholder="Short URL will be here" 
                      value={this.state.urlShort}/>
              <button></button>        
            </div>        
    			</div>
    			<div className="col-md-3">
    				<input type="text"
                    id="shortInput"
    								placeholder="ttl of url" 
                    onChange={this.handleNameChange}
                    value={this.state.name}/>
    			</div>
    			<div className="col-md-1">
    				<button className="green-btn" onClick={this.handleLinkAdd}></button>
    			</div>    			
    		</div>
    	)
    }
  }  

export default LinkAdder;
