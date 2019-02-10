import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Components/Nav'
import Sprint from './Components/Sprint'

const STORYURL = ("http://localhost:3000/stories")
const USERURL = ("http://localhost:3000/users")
const SPRINTURL = ("http://localhost:3000/sprints")
const STAGEURL = ("http://localhost:3000/stages")
const COMMENTURL = ("http://localhost:3000/comments")

class App extends Component {

  state = {
    users: [],
    stories: [],
    sprints: [],
    stages: [],
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
    fetch(SPRINTURL)
    .then(r => r.json())
    .then(sprintJson => this.setState({
      sprints: sprintJson
    }))
    fetch(STAGEURL)
    .then(r => r.json())
    .then(stageJson => this.setState({
      stages: stageJson
    }))
    fetch(COMMENTURL)
    .then(r => r.json())
    .then(commentJson => this.setState({
      comments: commentJson
    }))
  }

  render() {
    console.log(this.state.users)
    return (
      <div>
        <Nav />
        <Sprint sprints={this.state.sprints}/>
      </div>
    );
  }
}

export default App;
