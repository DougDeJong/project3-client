import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import AddProject from './AddProject';

class Userview extends Component {
  constructor(props){
      super(props);
      this.state = { listOfPosts: [] , loggedInUser: null, listOfComments: [] };
  }

  getAllPosts = () =>{
    axios.get(process.env.REACT_APP_BASE_URL+'/posts', {withCredentials: true})
    .then(responseFromApi => {
      const userPosts = responseFromApi.data;
     const result = userPosts.filter(thePosts => (thePosts.author._id === this.state.loggedInUser._id));
      this.setState({
        listOfPosts: result
      })
    })
  }

  getAllComments = () =>{
    axios.get(process.env.REACT_APP_BASE_URL+'/comments', {withCredentials: true})
    .then(responseFromApi => {
      const userComments = responseFromApi.data;
      console.log("COMMENT COMMENTS COMMENTS")
      console.log(userComments)
      const commentResult = userComments.filter(theComments => (theComments.author._id === this.state.loggedInUser._id));
      console.log("filtered filtered filtered")
      console.log(commentResult)
      this.setState({
        listOfComments: commentResult
      })
    })
  }

  componentWillMount() {
    this.setState({ loggedInUser: this.props.userInSession})
  }

  componentWillReceiveProps(nextProps){
    this.setState({ loggedInUser: nextProps.userInSession})

  }

  deleteProject = (theId) => {
    axios.delete(process.env.REACT_APP_BASE_URL + `/posts/${theId}`)
    .then( responseFromApi =>{
        this.getAllPosts();        
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  deleteComment = (theCommentId) => {
    console.log('clicked')
    axios.delete(process.env.REACT_APP_BASE_URL + `/comments/${theCommentId}`)
    .then( responseFromApi =>{
      this.getAllComments();
    })
    .catch((err)=>{
      console.log(err)
    })
  }




  componentDidMount() {
    this.getAllPosts();
    this.getAllComments();
    console.log('______)))))______');
    console.log(this.state.listOfPosts);
  }

  render(){
    return(
      <div className="container-fluid">
      <div className="row">
        <div className="postCard col-4" >
        <h4>Your Posts</h4>
          { this.state.listOfPosts.map((post, index) => {
            return (
              <div key={post._id}>
                <Link to={`/posts/${post._id}`}>
                  <h3>{post.title}</h3>
                </Link>
                <button onClick={() => this.deleteProject(post._id)}>Delete Post</button>
                <Link to={`/editpost/${post._id}`}><button className ="btn btn-info buttonRound">Edit This Post</button></Link>

              </div>
            )})
          }
        </div>
        <div className="postCard col-4">
        <h4>Your comments</h4>
          { this.state.listOfComments.map((comment, index) => {
            return (
              <div key={comment._id}>
                  <p>{comment.content}</p>
                <button onClick={() => this.deleteComment(comment._id)}>Delete Comment</button>
                <Link to={`/editcomment/${comment._id}`}><button className ="btn btn-info buttonRound">Edit This Comment</button></Link>

              </div>
            )})
          }
        </div>
      </div>
      </div>
    )
  }
}

export default Userview;