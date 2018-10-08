import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Auth/auth-service';
import './Navbar.css'


class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ loggedInUser: nextProps["userInSession"]})
  }


  logout = () =>{
    this.service.logout()
    .then(()=>{
      this.props.setTheUserInTheAppComponent(null)
    })
  }
    
  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="navbar theNav">
          <ul className= "navbar-nav navlist">
            <li className="nav-item active">Welcome, {this.state.loggedInUser.username}</li>
            <li className="nav-item active">
            <Link className="nav-link" to="/posts" style={{ textDecoration: 'none' }}>Posts</Link>
            </li>
            <li className="nav-item active">
              <button onClick={()=>this.logout()}>Log Out</button>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
        <nav className="navbar theNav">
        <ul className= "navbar-nav">
            <li className="nav-item active"><Link className="nav-link" to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav>
        </div>
      )
    }
    }
  }
  export default Navbar;
