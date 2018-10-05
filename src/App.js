import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import PostList from "./components/PostList/PostList";
import { EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./App.css";
import PostMaker from "./components/PostMaker/PostMaker";

import '../node_modules/bootstrap/dist/css/bootstrap.css';
class App extends Component {
  constructor(props){
  super(props)
  this.state ={ editorState: EditorState.createEmpty()  }}

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  };

  render() {
    return (
      <div className="App">

        <Navbar />
        <div class="container-fluid">
        <div class="row editor-row">
        <div class="col-8 text-writer">
   {/* <Editor
    onEditorStateChange={this.onEditorStateChange}/> */}
    <PostMaker onEditorStateChange={this.onEditorStateChange} />
        
        </div></div></div>

        <Switch>
          <Route exact path="/posts" component={PostList} />
        </Switch>
      </div>
    );
  }
}

export default App;
