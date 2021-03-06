import React, { Component } from 'react';
import '../css/App.css';
import LnksActions from '../actions/LnksActions';
import LnksStore from '../stores/LnksStore';
import LinkAdder from './LinkAdder.jsx';
import LinksGrid from './LinksGrid.jsx';
import SignForm from './SignForm.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



function getFluxState(){
  return{
    isLoading: LnksStore.isLoading(),
    lnks: LnksStore.getLnks()
  }
}



class App extends Component {
  constructor(props){
    super(props);
    this.state = getFluxState();    
    Object.assign(this.state,{
          isLogined: false
    }) 

    this._onChange = this._onChange.bind(this);  
    this.logInComplete = this.logInComplete.bind(this);  

  }
 
  componentWillMount(){
    // LnksActions.loadLnks(); 
  }  
  componentDidMount(){
    LnksStore.addChangeListener(this._onChange);
  }
  componentWillUnmount(){
    LnksStore.removeChangeListener(this._onChange); 
  }  
  handleLinkAdd(data){
    LnksActions.createLnks(data); 
  }

  logInComplete(res){
    this.setState({isLogined : true})
    this.setState({user: res.data});
    LnksActions.loadLnks(res.data); 

  }
  errorAuth(){
    let header = document.getElementsByTagName('header')[0];
    header.classList.add('wobble');
    setTimeout(()=>{
      header.classList.remove('wobble')
    },1000)
  }
  render() {
    return (
      <section className="App">
        <header className={this.state.isLogined ? 'entered': 'notenter'}>
          <div className="container">
            <div className="col">
              <a id="logo" alt="logo"></a>
              <h1 className="App-title">the cutter <a><i>by</i> ufo-engineering</a></h1>
            </div>
          </div>
          {!this.state.isLogined? <SignForm authError={this.errorAuth} submited={this.logInComplete}/>:''}
          
            
            
        </header>
    {this.state.isLogined && true ? (
        <ReactCSSTransitionGroup
            transitionName="ololo"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
          <div id="content" className="container">
            <LinkAdder onLinkAdd={this.handleLinkAdd} userId={this.state.user}/>
            <LinksGrid lnks={this.state.lnks} />
          </div>
        </ReactCSSTransitionGroup>
    ):''}   
      </section>
    );
  }
  _onChange(){
    this.setState(getFluxState());
  }
}

export default App;
