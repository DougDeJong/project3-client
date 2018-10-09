import React from 'react';
import ReactDOM from 'react-dom';
import './Draft.css'
import { EditorState, convertFromRaw, convertToRaw, RichUtils, getCurrentContent } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Redirect, Link, Route, withRouter } from 'react-router-dom'
import {stateToHTML} from 'draft-js-export-html';
import axios from 'axios'


class PostMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, title: "", blerb: "", editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {
      
      this.setState({editorState})

    };
      this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentWillMount() {
    this.setState({ loggedInUser: this.props.userInSession})
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }


  handleChange = (event) => {  
    const {name, value} = event.target;

    this.setState({[name]: value});
}

  handlePostSubmit = (event) => {
    console.log('clicked!')
    event.preventDefault();
    const title = this.state.title;
    const blerb = this.state.blerb;
    const user = this.state.loggedInUser;
    const contentState = convertFromRaw(this.state.editorState);
    console.log(contentState)
    const content = stateToHTML(contentState);
    axios.post("http://localhost:5000/api/posts", {title, blerb, content, contentState, user} )
    .then( () => {
      return (
        <Redirect to='/PostList' />
      ) 
  })
  .catch( error => console.log(error) )
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
  <input type="text" name="title" className="form-control colAligner" value={this.state.title} onChange={ e => this.handleChange(e)} aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
  <div className="input-group colAligner">
  <div className="input-group-prepend">
    <span className="input-group-text inputTag">Blerb</span>
  </div>
  <textarea className="form-control" name="blerb" value={this.state.blerb} onChange={ e => this.handleChange(e)} aria-label="With textarea"></textarea>
</div>
        </div>
<Link to={'/'} onClick={this.handlePostSubmit}><button type="button" className="btn btn-dark darkButton">Submit Post!</button></Link>
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
export default withRouter(PostMaker)