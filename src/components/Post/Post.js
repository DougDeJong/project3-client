import React, {Component} from 'react';
import axios from "axios";
import { Redirect, Link, Route, withRouter } from "react-router-dom";



class Post extends Component {
  constructor(props){
    super(props);
    this.state={
      thePost: {}
    }
      
    }

    componentWillMount() {
      this.setState({ loggedInUser: this.props.userInSession });
    }
    componentWillReceiveProps(nextProps) {
      this.setState({ loggedInUser: nextProps.userInSession });
    }
  
    componentDidMount() {
      console.log(this.props);
      const { params } = this.props.match;
      axios
      .get(process.env.REACT_APP_BASE_URL + `/posts/${params.id}`)
      .then(responseFromApi => {
        console.log(responseFromApi.data)
        this.setState({
          thePost: responseFromApi.data
        })
      })
    }

  render() {
    return(

    
        <h1>{ this.state.thePost.title }</h1>
        


    )

  }
}


export default withRouter(Post);