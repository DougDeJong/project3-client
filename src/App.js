import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import PostList from "./components/PostList/PostList";
import { EditorState, convertFromRaw, convertToRaw, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import AuthService from "./components/Auth/auth-service";
import PostMaker from "./components/PostMaker/PostMaker";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NewPost from "./components/NewPost/NewPost";
import Userview from "./components/Userview/Userview";
import EditPost from "./components/EditPost/EditPost";
import Post from "./components/Post/Post";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      editorState: EditorState.createEmpty()
    };
    this.service = new AuthService();
  }

  logMeIn = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    this.fetchUser();

    return (
      <div className="App">
        <Navbar
          setTheUserInTheAppComponent={this.logMeIn}
          userInSession={this.state.loggedInUser}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                {...this.props}
                setTheUserInTheAppComponent={this.logMeIn}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                {...this.props}
                setTheUserInTheAppComponent={this.logMeIn}
              />
            )}
          />
          <Route
            exact
            path="/userview"
            render={() => (
              <Userview
                {...this.props}
                userInSession={this.state.loggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/editpost/:id"
            render={() => (
              <EditPost
                {...this.props}
                userInSession={this.state.loggedInUser}
              />
            )}
          />
          <Route exact path="/posts" component={PostList} />
          <Route
            exact
            path="/newpost"
            render={() => (
              <PostMaker
                {...this.props}
                userInSession={this.state.loggedInUser}
              />
            )}
          />
          <Route exact path="/posts/:id" render={() => (
            <Post {...this.props}
            userInSession={this.state.loggedInUser}
            />
          )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
