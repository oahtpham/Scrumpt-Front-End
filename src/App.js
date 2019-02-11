import React from 'react';
import { Grid, Modal } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import './App.css';
import SprintContainer from './Containers/SprintContainer'
import StageContainer from './Containers/StageContainer'
import FormContainer from './Containers/FormContainer'
import Nav from './Components/Nav'
import Login from './Login'



const USERURL = ("http://localhost:3000/users")
const COMMENTURL = ("http://localhost:3000/comments")
const SPRINTURL = ("http://localhost:3000/sprints")

class App extends React.Component {


  state = {
    user: "",
    sprints: [],
    comments: [],
    sprint_name: '',
    deadline: '',
    color: '',
    logged_in: false
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


  onChangeSprintInput = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createNewSprint = () => {
    fetch(SPRINTURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        sprint_name: this.state.sprint_name,
        deadline: this.state.deadline,
        color: this.state.color,
        display: false
      })
    })
    .then(r => r.json())
    .then(mySprint => {
      this.setState(prevState => {
        return {sprints: [...prevState.sprints, mySprint]}
      })
    })
  }


  render() {
    return (
      <div id="App">
        <Nav />
        <Grid id="dashboard" divided>
          <Grid.Column width={3}>
            <h1> Sprints </h1>
            <SprintContainer clicked={this.handleSprintClick} sprints={this.state.sprints} clickDetails={this.handleSprintDoubleClick}/>
            <Modal trigger={<h3 id="new-sprint"> + Add New Sprint </h3>}>
              <Modal.Content>
                <FormContainer onChangeSprintInput={this.onChangeSprintInput}submit={this.createNewSprint}
                />
              </Modal.Content>
            </Modal >
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
