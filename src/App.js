import React from 'react';
import { Grid, Header } from 'semantic-ui-react'
import './App.css';
import SprintContainer from './Containers/SprintContainer'
import StageContainer from './Containers/StageContainer'
import Nav from './Components/Nav'

const USERURL = ("http://localhost:3000/users")
const COMMENTURL = ("http://localhost:3000/comments")

class App extends React.Component {


  state = {
    users: [],
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
  }

  render() {
    return (
      <div>
        <Nav />
        <Grid id="dashboard" stackable columns={2}>
          <Grid.Column>
            <Header> Sprints </Header>
            <SprintContainer />
          </Grid.Column>
          <Grid.Column>
            <StageContainer />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
