import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

// import AddProject from './AddProject';

class PostList extends Component {
  constructor(props){
      super(props);
      this.state = { listOfPosts: [] };
  }

  getAllPosts = () =>{
    axios.get(process.env.REACT_APP_BASE_URL+'/posts')
    .then(responseFromApi => {
      this.setState({
        listOfPosts: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllPosts();
  }

  render(){
    return(
      <div>
        <div className="postList" >
          { this.state.listOfPosts.map((post, index) => {
            return (
              <div className='postCard col-6' key={post._id}>
              <div className="row">
              <div className='postInfo col-4'>
                <Link to={`/posts/${post._id}` } style={{ textDecoration: 'none', color: 'white', float: "left"}}>
                  <h3 className="postTitle">{post.title}</h3>
                </Link>
                <h5 className="postUser"> by {post.author.username} </h5>
               </div>
                <p className="postBlerb col-4" >{post.blerb} </p>
              </div>
              </div>
            )})
          }
        </div>
        <div style={{width: '40%', float:"right"}}>
            {/* <AddProject getData={() => this.getAllProjects()}/> */}
        </div>
      </div>
    )
  }
}

export default PostList;