import React, { Component } from 'react';
import '../css/LinksGrid.css';
import Link from './Link.jsx';
class LinksGrid extends Component {
constructor(props) {
    super(props);
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
                        user= {lnk.user}
                    />
                    )
                }


    		</div>
    	</div>	
    	)
    }
  }  
export default LinksGrid;
