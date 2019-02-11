import React from 'react';
import { Grid, Header } from 'semantic-ui-react'
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
      <div>
        <Nav />
        <Grid id="dashboard" stackable columns={2}>
          <Grid.Column>
            <Header> Sprints </Header>
            <SprintContainer clicked={this.handleSprintClick} sprints={this.state.sprints}/>
          </Grid.Column>
          <Grid.Column>
            <StageContainer sprints={this.state.sprints}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
