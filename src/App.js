import React from 'react';
import { Grid } from 'semantic-ui-react'
import './App.css';
import SprintContainer from './Containers/SprintContainer'
import StageContainer from './Containers/StageContainer'
import Nav from './Components/Nav'

const USERURL = ("http://localhost:3000/users")
const COMMENTURL = ("http://localhost:3000/comments")
const SPRINTURL = ("http://localhost:3000/sprints")

class App extends React.Component {


  state = {
    users: [],
    sprints: [],
    comments: []
  }


  componentDidMount() {
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
    fetch(SPRINTURL)
    .then(r => r.json())
    .then(sprintJson => this.setState({
      sprints: sprintJson
    }))
  }

  handleSprintClick = (sprintId) => {
    const sprints = this.state.sprints.map(sprint => {
      return sprintId === sprint.id ? { ...sprint, display: !sprint.display } : sprint
    })
    this.setState({
      sprints
    })
  }

  render() {
    return (
      <div id="App">
        <Nav />
        <Grid id="dashboard" divided>
          <Grid.Column width={3}>
            <h1> Sprints </h1>
            <SprintContainer clicked={this.handleSprintClick} sprints={this.state.sprints}/>
          </Grid.Column>
          <Grid.Column width={13}>
            <StageContainer sprints={this.state.sprints}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
