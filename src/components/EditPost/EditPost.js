import React from "react";
import ReactDOM from "react-dom";
import "./Draft.css";
import {
  EditorState,
  convertFromRaw,
  convertFromHTML,
  convertToRaw,
  RichUtils,
  ContentState
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Redirect, Link, Route, withRouter } from "react-router-dom";
import { stateToHTML } from "draft-js-export-html";
import axios from "axios";
import htmlToDraft from "html-to-draftjs";

class PostMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, title: "", blerb: "" };
    this.onChange = editorState => {
      this.setState({ editorState });
    };
    this.onEditorStatechange = editorState => {
      this.setState({ editorState });
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentWillMount() {
    this.setState({ loggedInUser: this.props.userInSession });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loggedInUser: nextProps.userInSession });
  }

  componentDidMount() {
    const { params } = this.props.match;
    console.log(params);
    axios
      .get(process.env.REACT_APP_BASE_URL + `/posts/${params.id}`)
      .then(response => {
        const blocksFromHTML = convertFromHTML(response.data.content);
        console.log(response.data.content);
        console.log(blocksFromHTML);
        const theState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        console.log(theState);

        this.setState({
          editorState: EditorState.createWithContent(theState),
          title: response.data.title,
          blerb: response.data.blerb
        });
        console.log(this.state.editorState);
      });
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleEditSubmit = event => {
    const { params } = this.props.match;
    const title = this.state.title;
    const blerb = this.state.blerb;
    const contentState = convertFromRaw(this.state.editorState);
    console.log(contentState);
    const content = stateToHTML(contentState);
    axios.put(process.env.REACT_APP_BASE_URL + `/posts/${params.id}`, { title, blerb, content, contentState }, {withCredentials: true})
    .then(() => {
      return this.props.history.push("/userview");
    })
    .catch(error => console.log(error));
    
    }
  

  handlePostSubmit = event => {
    console.log("clicked!");
    event.preventDefault();
    const title = this.state.title;
    const blerb = this.state.blerb;
    const contentState = convertFromRaw(this.state.editorState);
    console.log(contentState);
    const content = stateToHTML(contentState);
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/posts",
        { title, blerb, content, contentState },
        { withCredentials: true }
      )
      .then(() => {
        return this.props.history.push("/posts");
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row editor-row">
            <div className="col-4 text-writer">
            <h1>Edit Your Post</h1>
              <div className="input-group input-group-lg">
                <div className="input-group-prepend colAligner">
                  <span
                    className="input-group-text inputTag"
                    id="inputGroup-sizing-lg"
                  >
                    Title
                  </span>
                </div>
                <input
                  type="text"
                  name="title"
                  className="form-control colAligner"
                  value={this.state.title}
                  onChange={e => this.handleChange(e)}
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
                <div className="input-group colAligner">
                  <div className="input-group-prepend">
                    <span className="input-group-text inputTag">Blerb</span>
                  </div>
                  <textarea
                    className="form-control"
                    name="blerb"
                    value={this.state.blerb}
                    onChange={e => this.handleChange(e)}
                    aria-label="With textarea"
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-dark darkButton"
                onClick={this.handleEditSubmit}
              >
                Confirm Edit
              </button>
            </div>
            <div className="col-6 text-writer">
              <Editor
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onEditorStateChange={this.onChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(PostMaker);
