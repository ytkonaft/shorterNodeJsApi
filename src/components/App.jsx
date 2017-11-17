import React, { Component } from 'react';
import '../css/App.css';


import LinkAdder from './LinkAdder.jsx';
import LinksGrid from './LinksGrid.jsx';


class App extends Component {
  handleLinkAdd(data){
    console.log(data);
  }
  render() {
    return (
      <section className="App">
        <header>
          <div className="container">
            <div className="col-md-4">
              <a id="logo" alt="logo"></a>
              <h1 className="App-title">the cutter <a>by ufo-engineering</a></h1>
            </div>
            <div className="col-md-4">
              пока пусто
            </div>
          </div>
        </header>
        <div id="content" className="container">
          <LinkAdder onLinkAdd={this.handleLinkAdd}/>
          <LinksGrid/>
        </div>
      </section>
    );
  }
}

export default App;
