import React, { Component } from 'react';
// import '../css/Link.css';

class Link extends Component {
  render() {
    return (
    			<div className="col-md-3 col-sm-4">
    				<div className="link-itm">
    					<span className='lnk-del' onClick={this.props.onDelete}> × </span>
    					<div className="img-wrp">1</div>
                {
                    this.props.name
                    ?
                        <h4>{this.props.name}</h4>
                    :
                        null
                }

    					<input type="text" readOnly value="www.azazaz.za"/>
    					{this.props.children}
    				</div>
    			</div>
    	)
    }
  }  

export default Link;
