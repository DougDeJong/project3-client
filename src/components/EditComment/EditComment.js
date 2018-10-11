import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, commentContent: "", };
    this.onChange = editorState => {
      this.setState({ editorState });
    };
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
      .get(process.env.REACT_APP_BASE_URL + `/comments/${params.id}`)
      .then(response => {
         this.setState({
          commentContent: response.data.content,
        });
      });
  }


  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleEditSubmit = event => {
    const { params } = this.props.match;
    event.preventDefault();
    const content = this.state.commentContent;
    // const transContentState = convertFromRaw(this.state.editorState);
    axios.put(process.env.REACT_APP_BASE_URL + `/comments/${params.id}`, { content }, {withCredentials: true})
    .then(() => {
      return this.props.history.push("/userview");
    })
    .catch(error => console.log(error));
    
    }
  

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row editor-row">
            <div className="col-4 text-writer">
            <h1>Edit Your Comment</h1>
              <div className="input-group input-group-lg">
             
                <div className="input-group colAligner">
                  <div className="input-group-prepend">
                    <span className="input-group-text inputTag">Your Comment</span>
                  </div>
                  <textarea
                    className="form-control"
                    name="commentContent"
                    value={this.state.commentContent}
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
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(EditComment);
