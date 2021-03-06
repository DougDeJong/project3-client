import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thePost: {},
      theComments: [],
      showDiv: false,
      newComment: "",
      loggedInUser: null
    };
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
    this.getAllComments();
  }

  getAllComments() {

    const { params } = this.props.match;
    axios
      .get(process.env.REACT_APP_BASE_URL + `/posts/${params.id}`)
      .then(responseFromApi => {
        this.setState({
          thePost: responseFromApi.data,
          theComments: responseFromApi.data.comments
        });
      });
  }

  toggleHidden() {
    this.setState({
      showDiv: !this.state.showDiv
    });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleCommentSubmit = event => {
    console.log("clicked!");
    event.preventDefault();
    const content = this.state.newComment;
    const post = this.state.thePost;
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/comments",
        { content, post },
        { withCredentials: true }
      )
      .then(() => {
        this.getAllComments();
      })
      .catch(error => console.log(error));
  };

  render() {
    const { showDiv } = this.state;
    return (
      <div>
        <div className="postContainer">
          <h1>{this.state.thePost.title}</h1>

          {ReactHtmlParser(this.state.thePost.content)}
        </div>
        <div>
          {this.state.theComments.map((comment, index) => {
            return (
              <div className="commentBox" key={comment._id}>
                <h3>{comment.author.username}</h3>
                <p style={{ maxWidth: "400px" }}>{comment.content} </p>
              </div>
            );
          })}
          <div>
            <button className="btn btn-dark btn-success displayButton" onClick={() => this.toggleHidden()}>
              {showDiv ? "Hide" : "Add Comment"}
            </button>
            {showDiv && (
              <div id="the div you want to show and hide">
                <div className="input-group colAligner">
                  <div className="input-group-prepend">
                    <span className="input-group-text inputTag">Comment:</span>
                  </div>
                  <textarea
                    className="form-control"
                    name="newComment"
                    value={this.state.newComment}
                    onChange={e => this.handleChange(e)}
                    aria-label="With textarea"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-dark darkButton"
                  onClick={e => this.handleCommentSubmit(e)}
                >
                  Submit Comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Post);
