import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import PostList from "./components/PostList/PostList";
import { EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import "./App.css";
import AuthService from "./components/Auth/auth-service";
import PostMaker from "./components/PostMaker/PostMaker";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NewPost from "./components/NewPost/NewPost";

class App extends Component {
  constructor(props){
  super(props)
  this.state = { 
    loggedInUser: null,
    editorState: EditorState.createEmpty(),
   };
  this.service = new AuthService();
  }

  logMeIn= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  };

  render() {
    this.fetchUser();

    return (
      <div className="App">

        <Navbar setTheUserInTheAppComponent={this.logMeIn} userInSession={this.state.loggedInUser} />
       

        <Switch>
        <Route exact path="/" render={() => <Login  {...this.props} setTheUserInTheAppComponent={this.logMeIn}/>}/>
        <Route exact path='/signup' render={() => <Signup  {...this.props} setTheUserInTheAppComponent={this.logMeIn}/>}/>
          <Route exact path="/posts" component={PostList} />
          <Route exact path="/newpost" component={NewPost} />
        </Switch>
      </div>
    );
  }
}

export default App;
