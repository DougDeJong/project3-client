import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Auth/auth-service';
import './Navbar.css'
import Logo from './images/T1D3icon.svg'


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
        <nav className="navbar navbar-dark bg-dark">
        <img className="navbar-brand tideLogo" src={Logo} alt="logo"/>
          <ul className= "navbar-nav navlist">
            <li className="nav-item active greeter">Welcome, {this.state.loggedInUser.username}</li>
            </ul>
            <ul className="navbar-nav navlist ml-auto">
            <li className="nav-item active">
            <Link className="nav-item active mr-sm-2" to="/posts" style={{ textDecoration: 'none' }}><button className ="btn btn-info buttonRound">Posts</button></Link>
            </li>
            <li className="nav-item active">
            <Link className="nav-item active mr-sm-2" to="/newpost" style={{ textDecoration: 'none' }}><button className ="btn btn-info buttonRound">New Post</button></Link>
            </li>
            <li className="nav-item active">
              <button className="btn btn-info buttonRound" onClick={()=>this.logout()}>Log Out</button>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
        <nav className="navbar navbar-dark bg-dark">
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
