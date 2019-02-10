import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SprintContainer from './Containers/SprintContainer'
import StageContainer from './Containers/StageContainer'

const STORYURL = ("http://localhost:3000/stories")
const USERURL = ("http://localhost:3000/users")
const COMMENTURL = ("http://localhost:3000/comments")

class App extends Component {

  state = {
    users: [],
    stories: [],
    comments: []
  }

  componentDidMount() {
    fetch(STORYURL)
    .then(r => r.json())
    .then(storyJson => this.setState({
      stories: storyJson
    }))
    fetch(USERURL)
    .then(r => r.json())
    .then(userJson => this.setState({
      users: userJson
    }))
    fetch(COMMENTURL)
    .then(r => r.json())
    .then(commentJson => this.setState({
      comments: commentJson
    }))
  }

  render() {
    return (
      <div>
        <StageContainer />
        <SprintContainer />
      </div>
    );
  }
}

export default App;
