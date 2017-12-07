import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Link extends Component {
constructor(props) {
    super(props);
    this.removeIt= this.removeIt.bind(this);
}
  removeIt(){
    this.props.onLinkRemove(this.props.user,this.props.id);
  }
  render() {
    return (
    			<div className="col-md-3 col-sm-4">
    				<div className="link-itm" id={this.props.id}>
    					<div className="img-wrp">
                            <img src={'https://www.google.com/s2/favicons?domain='+this.props.longUrl}/>          
                        </div>
                        <button className="remove-btn" onClick={this.removeIt}/>
                        <h4>{this.props.name}</h4>
                        <div className="input-wrp">
                        <input type="text" readOnly defaultValue={this.props.urlShort}/>
                            <CopyToClipboard text={this.props.urlShort}>
                                    <button/>
                             </CopyToClipboard>
                        </div>

    					
    				</div>
    			</div>
    	) 
    }
  }  

export default Link;
