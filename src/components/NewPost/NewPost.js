import { EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import React, { Component } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PostMaker from '../PostMaker/PostMaker';


class NewPost extends Component{
  constructor(props){
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),

    }
  }
  
    onEditorStateChange = (editorState) => {
      this.setState({
        editorState,
      })
    };

    render() {
      return(
        <div class="container-fluid">
        <div class="row editor-row">
        <div class="col-8 text-writer">
    <PostMaker onEditorStateChange={this.onEditorStateChange} />
        
        </div></div></div>
      )
    }
}
export default NewPost;