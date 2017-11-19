import React, { Component } from 'react';
// import '../css/Link.css';

class Link extends Component {
  render() {
    return (
    			<div className="col-md-3 col-sm-4">
    				<div className="link-itm" id={this.props.id}>
    					<div className="img-wrp">
                            <img src={'https://www.google.com/s2/favicons?domain='+this.props.longUrl}/>          
                        </div>
                        <h4>{this.props.name}</h4>

                        <input type="text" readOnly defaultValue={this.props.urlShort}/>
                        <input type="text" defaultValue={this.props.longUrl}/>

    					
    				</div>
    			</div>
    	) 
    }
  }  

export default Link;
