import React, { Component } from 'react';
import '../css/LinkAdder.css';

class LinkAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	ttl: '',
  		longUrl: '',
  		shortUrl: '',
  		img: ''
    	};
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleLinkAdd = this.handleLinkAdd.bind(this);
  }	

  handleLinkChange(e){
  	let imgUrl = 'www.google.com/s2/favicons?domain='+e.target.value;
  	this.setState({longUrl: e.target.value});
  	this.setState({img: imgUrl});
  }
  handleLinkAdd(){
//  	console.log(document.getElementById('urlInput').checkValidity());

  	const newLnk = {
  		name: this.state.ttl,
			img: this.state.img,
			longUrl: this.state.longUrl,
			urlShort: this.state.shortUrl
  	}
  	this.props.onLinkAdd(newLnk);
  	this.setState({
  		ttl: '',
  		longUrl: '',
  		shortUrl: '',
  		img: ''
  	});
  }
  render() {
    return (
    		<div id="add-wrp" className="row">
    			<div className="col-md-1">
    				<div className="link-img"></div>
    			</div>
    			<div className="col-md-4">
    				<input type="text" id="urlInput" placeholder="Enter URL here"  value={this.state.longUrl} onChange={this.handleLinkChange}/>
    			</div>
    			<div className="col-md-3">
    				<input type="text" className="shortUrl" readOnly="true" placeholder="Short URL will be here" value={this.state.shortUrl}/>
    			</div>
    			<div className="col-md-3">
    				<input type="text" value={this.state.ttl}/>
    			</div>
    			<div className="col-md-1">
    				<button className="green-btn" onClick={this.handleLinkAdd}></button>
    			</div>    			
    		</div>
    	)
    }
  }  

export default LinkAdder;
