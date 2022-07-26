import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Frame from './components/Frame';
import React, { Component } from 'react';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header/>
        <Frame/>
      </div>
    );
  }
}

export default App;
