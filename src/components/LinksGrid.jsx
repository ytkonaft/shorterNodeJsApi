import React, { Component } from 'react';
import '../css/LinksGrid.css';
import Link from './Link.jsx';
class LinksGrid extends Component {
  render() {
    return (
    	<div>
    		<div className="ttl"><h2>Your links</h2></div>
    		<div id="linksGrid" className="row">
                {
                    this.props.lnks.reverse().map(lnk =>
                    <Link 
                        key={lnk.id}
                        id={lnk.id}
                        name={lnk.name} 
                        urlShort= {lnk.urlShort}
                        longUrl= {lnk.longUrl}
                    />
                    )
                }


    		</div>
    	</div>	
    	)
    }
  }  
export default LinksGrid;
