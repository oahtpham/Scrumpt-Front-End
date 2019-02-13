import React from 'react';
import { Grid, Modal } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import './App.css';
import SprintContainer from './Containers/SprintContainer'
import StageContainer from './Containers/StageContainer'
import FormContainer from './Containers/FormContainer'
import Nav from './Components/Nav'
import Login from './Login'


const COMMENTURL = ("http://localhost:3000/comments")
const SPRINTURL = ("http://localhost:3000/sprints")
const STORYURL = ("http://localhost:3000/stories")

class App extends React.Component {


  state = {
    sprints: [],
    comments: [],
    sprint_name: '',
    deadline: '',
    color: '',
    logged_in: false,
    showStory: false,
    showSprint: false,
    title: "",
    description: "",
    dragObject: null
  }


  componentDidMount() {
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

  createNewSprint = (event) => {
    event.preventDefault()
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


    createNewStory = (event) => {
      event.preventDefault()
      const stageInput = event.target.querySelector("#stage-input").value
      const sprintInput = event.target.querySelector("#sprint-input").value
      const sprintId = this.state.sprints.find(sprint => sprint.sprint_name === sprintInput).id
      fetch(STORYURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          story: {
            title: this.state.title,
            description: this.state.description,
            stage_id: parseInt(stageInput),
            sprint_id: sprintId,
            user_id: 1
          }
        })
      })
      .then(r => r.json())
      .then(myStory => {
        return this.state.sprints.map(sprint => {
          if (sprint.id === myStory.sprint.id) {
            return {...sprint, stories: [...sprint.stories, myStory]}
          }
          else {
            return sprint
          }
        })
      })
      .then(sprintCopy => {
        this.setState({ sprints: sprintCopy})
      })
    }

  handleNewStoryClick = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return {
        showSprint: false,
        showStory: true,
      }
    })
  }

  handleNewSprintClick = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return {
        showSprint: true,
        showStory: false,
      }
    })
  }

  onChangeStoryInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(this.state.title, this.state.description, this.state.stage))
  }

  deleteSprint = (sprintId) => {
    fetch(`${SPRINTURL}/${sprintId}`, { method: "DELETE" })
    .then(resp => {
      if (resp.ok) {
        this.setState(prevState => {
          return {sprints: [...prevState.sprints].filter(sprint => sprint.id !== sprintId)}
        })
      }
    })
  }

  deleteStory = (story) => {
    fetch(`${STORYURL}/${story.id}`, { method: "DELETE" })
    .then(resp => {
      if (resp.ok) {
        let foundSprint = this.state.sprints.find(sprint => sprint.id === story.sprint_id)
        let updatedSprintStories = foundSprint.stories.filter(s => s.id !== story.id)
        this.setState({
          sprints: this.state.sprints.map(sprint => {
            return sprint.id === foundSprint.id ? {...sprint, stories: updatedSprintStories} : sprint
          })
        }, () => console.log(this.state.sprints[0].stories))
      }
    })
  }

  onDragStart = (event, story) => {
    this.setState({
      dragObject: story
    })
  }

  onDragOver = (event, stage) => {
    event.preventDefault()
  }

  onDrop = (event, stage, sprint) => {
    const origSprintId = this.state.dragObject.sprint_id
    fetch(`${STORYURL}/${this.state.dragObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        stage_id: stage.id
      })
    })
    .then(resp => resp.json())
    .then(updatedStory => {
      const sprintToUpdate = this.state.sprints.find(sprint => sprint.id === origSprintId)
      console.log(this.state.dragObject)
      const storyIndex = sprintToUpdate.stories.findIndex(story => story.id === this.state.dragObject.id)
      sprintToUpdate.stories.splice(storyIndex, 1, updatedStory)
      console.log(sprintToUpdate)
      this.setState({
        sprints: this.state.sprints.map(sprint => {
          return sprint.id === updatedStory.sprint_id ? sprintToUpdate : sprint
        })
      })
    })
  }

  render() {
    return (
      <div id="App">
        <Nav
        sprints={this.state.sprints}
        showStory={this.handleNewStoryClick}
        onChangeStoryInput={this.onChangeStoryInput}
        submit={this.createNewStory}
        />
        <Grid id="dashboard" divided>
          <Grid.Column width={3}>
            <h1> Sprints </h1>
            <SprintContainer clicked={this.handleSprintClick} sprints={this.state.sprints} clickDetails={this.handleSprintDoubleClick} deleteSprint={this.deleteSprint}/>
            <Modal trigger={<h3 id="new-sprint" onClick={this.handleNewSprintClick}> + Add New Sprint </h3>}>
              <Modal.Content>
                <FormContainer
                onChangeSprintInput={this.onChangeSprintInput}
                submit={this.createNewSprint}
                renderSprint={this.state.showSprint}
                />
              </Modal.Content>
            </Modal >
          </Grid.Column>
          <Grid.Column width={13}>
            <StageContainer
            sprints={this.state.sprints}
            deleteStory={this.deleteStory}
            dragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
