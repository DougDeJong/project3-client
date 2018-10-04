import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import AddProject from './AddProject';

class PostList extends Component {
  constructor(props){
      super(props);
      this.state = { listOfPosts: [] };
  }

  getAllPosts = () =>{
    axios.get(`http://localhost:5000/api/posts`)
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
        <div style={{width: '60%', float:"left"}}>
          { this.state.listOfPosts.map((post, index) => {
            return (
              <div key={post._id}>
                <Link to={`/posts/${post._id}`}>
                  <h3>{post.title}</h3>
                </Link>
                <p style={{maxWidth: '400px'}} >{post.content} </p>
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