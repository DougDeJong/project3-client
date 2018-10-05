import React from 'react';
import ReactDOM from 'react-dom';
import './Draft.css'
import { EditorState, convertFromRaw, convertToRaw, RichUtils, getCurrentContent } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {stateToHTML} from 'draft-js-export-html';


class PostMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      
      this.setState({editorState})
      const contentState = convertFromRaw(this.state.editorState)
      // console.log(contentState)
      console.log(stateToHTML(contentState));

    };
      this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  _onBoldClick (e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState, 'BOLD'))
  }



  render() {
    return (
      <div>
        <div class="container-fluid">
        <div class="row editor-row">
        <div class="col-6">
        <Editor
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          />
          </div>
        
        </div>
        </div>
      </div>
    );
  }
}
export default PostMaker