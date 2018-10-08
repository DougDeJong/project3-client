import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Auth/auth-service';


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
        <nav className="navbar">
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li>
            <Link to="/posts" style={{ textDecoration: 'none' }}>Posts</Link>
            </li>
            <li>
              <button onClick={()=>this.logout()}>Log Out</button>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
        <nav className="navbar">
          <ul>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav>
        </div>
      )
    }
    }
  }
  export default Navbar;
