import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import AddProject from './AddProject';

class Userview extends Component {
  constructor(props){
      super(props);
      this.state = { listOfPosts: [] , loggedInUser: null };
  }

  getAllPosts = () =>{
    axios.get(process.env.REACT_APP_BASE_URL+'/posts', {withCredentials: true})
    .then(responseFromApi => {
      const userPosts = responseFromApi.data;
     const result = userPosts.filter(thePosts => (thePosts.author._id == this.state.loggedInUser._id));
      this.setState({
        listOfPosts: result
      })
    })
  }

  getAllComments = () =>{
    axios.get(process.env.REACT_APP_BASE_URL+'/posts')
    .then(responseFromApi => {
      this.setState({
        listOfPosts: responseFromApi.data
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
    axios.delete(`http://localhost:5000/api/posts/${theId}`)
    .then( responseFromApi =>{
        this.getAllPosts();        
    })
    .catch((err)=>{
        console.log(err)
    })
  }




  componentDidMount() {
    this.getAllPosts();
    console.log('______)))))______');
    console.log(this.state.listOfPosts);
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
                <button onClick={() => this.deleteProject(post._id)}>Delete Post</button>
                <Link to={`/editpost/${post._id}`}><button className ="btn btn-info buttonRound">Edit This Post</button></Link>

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

export default Userview;