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

      </div>
    )
  }
}

export default TopHook;