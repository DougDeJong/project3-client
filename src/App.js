import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar/>


      </div>
    );
  }
}

export default App;
