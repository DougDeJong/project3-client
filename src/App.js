import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import PostList from './components/PostList/PostList';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar/>
        <Switch>
          <Route exact path = "/posts" component = {PostList}/>
        </Switch>

      </div>
    );
  }
}

export default App;
