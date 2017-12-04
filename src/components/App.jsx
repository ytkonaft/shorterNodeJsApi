import React, { Component } from 'react';
import '../css/App.css';
import LnksActions from '../actions/LnksActions';
import LnksStore from '../stores/LnksStore';
import LinkAdder from './LinkAdder.jsx';
import LinksGrid from './LinksGrid.jsx';
import SignForm from './SignForm.jsx';
import {UnmountClosed} from 'react-collapse';



function getFluxState(){
  console.log(LnksStore.getLnks());
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
      isLogined: false,
      enterMode: '',
      showAuth: false
    }) 

    this._onChange = this._onChange.bind(this);  
    this.logInComplete = this.logInComplete.bind(this);  
    this.handleAuthOpen = this.handleAuthOpen.bind(this);  
    this.signUp = this.signUp.bind(this);  
    this.signIn = this.signIn.bind(this);  

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
  handleLinkDelete(id){
    LnksActions.deleteLnk(id); 
  }
  logInComplete(){
    this.setState({isLogined : true})
  }
  signIn(e){
    e.target.classList.add('active');
    this.handleAuthOpen('in', e.target)
  }
  signUp(e){
    var that = this;
    this.setState({
        showAuth: false
    })
    this.handleAuthOpen('up', e.target)
  }  
  handleAuthOpen(mode,elm){
    this.setState({
      enterMode: mode,
        showAuth: true
    });
    (elm.previousElementSibling ||elm.nextElementSibling).classList.remove('active');

    elm.classList.add('active')
  }
  render() {
    return (
      <section className="App">
        <header className={this.state.isLogined ? 'entered': 'notenter'}>
          <div className="container">
            <div className="col-sm-5">
              <a id="logo" alt="logo"></a>
              <h1 className="App-title">the cutter <a><i>by</i> ufo-engineering</a></h1>
            </div>
            <div className="col-sm-7 text-right">
              <button className="green-btn _main" onClick={this.signIn}>Sign in</button>
              <button className="blue-btn _main" onClick={this.signUp}>Sign up</button>
            </div>
          </div>
            <UnmountClosed isOpened={this.state.showAuth} >
              <SignForm mode={this.state.enterMode}/>
            </UnmountClosed >
            
        </header>
    {this.state.isLogined ? (
        <div id="content" className="container">
          <LinkAdder onLinkAdd={this.handleLinkAdd}/>
          <LinksGrid lnks={this.state.lnks} onLnkDelete={this.handleLinkDelete}/>
        </div>
    ):''}   
      </section>
    );
  }
  _onChange(){
    this.setState(getFluxState());
  }
}

export default App;
