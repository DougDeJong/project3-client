import React, { Component } from 'react';
import AuthService from '../Auth/auth-service';
import {Link} from 'react-router-dom';

class TopHook extends Component {
  constructor(props){
    super(props);
    this.state = '';
    this.service = new AuthService();
  }

  render(){
    return(
      <div>
        <div className = "container-fluid">
        <div className = "row">
        <div className = "col-12">
        This is the Landing Page Top Header</div></div></div>

      </div>
    )
  }
}

export default TopHook;