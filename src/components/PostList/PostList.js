import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import PostIcon from './images/doug-icon.png';
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
        <div className="postList container-fluid" >
          { this.state.listOfPosts.map((post, index) => {
            return (
              <div className="row">
              <div className='postCard col-6' key={post._id}>
              <div className="row">
              <div className='postInfo col-6'>
                <Link to={`/posts/${post._id}` } style={{ textDecoration: 'none', color: 'white', }}>
                  <h3 className="postTitle">{post.title}</h3>
                </Link>
  
                <h5 className="postUser"> by {post.author.username} </h5>
               </div>
               <div className="col-4">
                <p className="postBlerb" > {post.blerb} </p>
                </div>
                <div className="col-2">
                <img className="postIcon" alt="postIcon" src={PostIcon}/>
              </div>
              </div>
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