import React from 'react';
import './Draft.css'
import { EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withRouter } from 'react-router-dom'
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
  componentWillReceiveProps(nextProps){
    this.setState({ loggedInUser: nextProps.userInSession})

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
    const transContentState = convertFromRaw(this.state.editorState);
    const content = stateToHTML(transContentState);
    axios.post(process.env.REACT_APP_BASE_URL+"/posts", {title, blerb, content }, {withCredentials: true})
    .then( () => {
      return (
        this.props.history.push('/posts')
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
<button type="button" className="btn btn-dark darkButton" onClick={this.handlePostSubmit}>Submit Post!</button>
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