import React, { Component } from 'react';
import '../css/LinksGrid.css';
import Link from './Link.jsx';
class LinksGrid extends Component {
constructor(props) {
    super(props);
    this.handleLinkDelete= this.handleLinkDelete.bind(this);
}    
  handleLinkDelete(usr,id){
    this.props.onLnkDelete(usr,id);
  }
  render() {
    return (
    	<div>
    		<div className="ttl"><h2>Your links {this.props.lnks.length<1? 'will be here': ''}</h2></div>
    		<div id="linksGrid" className="row">
                {
                    this.props.lnks.reverse().map(lnk =>
                    <Link  
                        key={lnk.id}
                        id={lnk.id}
                        name={lnk.name} 
                        urlShort= {lnk.urlShort}
                        longUrl= {lnk.longUrl}
                        onLinkRemove = {this.handleLinkDelete}
                    />
                    )
                }


    		</div>
    	</div>	
    	)
    }
  }  
export default LinksGrid;
