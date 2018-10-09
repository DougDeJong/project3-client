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
        <div className="container-fluid">
        <div className="row editor-row">
        <div className="col-4 text-writer">
        <div className="input-group input-group-lg">
  <div className="input-group-prepend colAligner">
    <span className="input-group-text inputTag" id="inputGroup-sizing-lg">Title</span>
  </div>
  <input type="text" className="form-control colAligner" aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
  <div className="input-group colAligner">
  <div className="input-group-prepend">
    <span className="input-group-text inputTag">Blerb</span>
  </div>
  <textarea className="form-control" aria-label="With textarea"></textarea>
</div>
        </div>
<button type="button" className="btn btn-dark darkButton">Submit Post!</button>
        </div>
        <div className="col-6 text-writer">
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