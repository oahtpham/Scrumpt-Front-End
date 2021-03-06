import React from 'react';
import { Grid, Modal, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom"
import './App.css';
import SprintContainer from './Containers/SprintContainer'
import StageContainer from './Containers/StageContainer'
import FormContainer from './Containers/FormContainer'
import Nav from './Components/Nav'
import {Redirect} from "react-router-dom"
import Homepage from './Homepage';


const COMMENTURL = (`${process.env.REACT_APP_APIURL}/comments`)
const SPRINTURL = (`${process.env.REACT_APP_APIURL}/sprints`)
const STORYURL = (`${process.env.REACT_APP_APIURL}/stories`)

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

  handleChange = (event) => {
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
        return {sprints: [...prevState.sprints, mySprint], showSprint: false, showStory: false}
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
        this.setState(prevState => {
          return {sprints: sprintCopy}
        })
      })
      .then(() => {
        this.setState({
          showStory: false,
          showSprint: false
        })
      })
    }

  handleNewStoryClick = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return Object.assign(prevState, {
        showStory: !this.state.showStory
      })
    })
  }

  handleNewSprintClick = (event) => {
    event.preventDefault()
    this.setState(prevState => {
      return {
        showSprint: !this.state.showSprint,
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


  editSprint = (event, sprint) => {
    event.preventDefault()
    const sprintName = document.querySelector("#sprint-name").value
    const sprintDescription = document.querySelector("#sprint-description").value
    const sprintColor = document.querySelector("#sprint-color").value
    fetch(`${SPRINTURL}/${sprint.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        sprint_name: sprintName,
        deadline: this.state.deadline,
        description: sprintDescription,
        color: sprintColor
      })
    })
    .then(r => r.json())
    .then(mySprint => {
      return this.state.sprints.map(sp => {
        if (sp.id === mySprint.id) {
          return {...mySprint}
        }
        else {
          return sp
        }
      })
    })
    .then(sprintCopy => {
      this.setState({
        sprints: sprintCopy
      })
    })
  }

  editStory = (event, story) => {
    event.preventDefault()
    const sprintInput = event.target.querySelector("#sprint-input").value
    const sprintId = this.state.sprints.find(sprint => sprint.sprint_name === sprintInput).id
    const storyTitle = event.target.querySelector("#story-title").value
    const storyDescription = event.target.querySelector("#story-description").value
    fetch(`${STORYURL}/${story.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        story: {
          title: storyTitle,
          description: storyDescription,
          sprint_id: sprintId,
          user_id: 1
      }
    })
    })
    .then(r => r.json())
    .then(myStory => {
      let editedSprints = this.state.sprints.map(sprint => {
        // if sprint.id === the story's old sprint_id, return a filtered array of stories with the edited story filtered out
        if (sprint.id === story.sprint_id) {
          sprint.stories = sprint.stories.filter(st => st.id != story.id)
        }
        if (sprint.id === myStory.sprint_id) {
          // if sprint.id === the story's new sprint_id, add sprint.stories via destructuring
          sprint.stories = [...sprint.stories, myStory]
        }
        return sprint
      })
      this.setState({
        sprints: editedSprints
      })
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
      const storyIndex = sprintToUpdate.stories.findIndex(story => story.id === this.state.dragObject.id)
      sprintToUpdate.stories.splice(storyIndex, 1, updatedStory)
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
        onChangeStoryInput={this.handleChange}
        submit={this.createNewStory}
        renderSprint={this.state.showSprint}
        renderStory={this.state.showStory}
        />
        <Grid id="dashboard" divided>
          <Grid.Column width={3}>
            <h1> Sprints </h1>
            <SprintContainer
            clicked={this.handleSprintClick}
            sprints={this.state.sprints}
            clickDetails={this.handleSprintDoubleClick}
            deleteSprint={this.deleteSprint}
            editSprint={this.editSprint}
            onChangeSprintInput={this.handleChange}
            />
            <h3 onClick={this.handleNewSprintClick}>+ Add New Sprint</h3>
            <Modal open={this.state.showSprint}>
            <Button
              className= 'ui right floated button' onClick={this.handleNewSprintClick}>X</Button>
              <Modal.Content>
                <FormContainer
                onChangeSprintInput={this.handleChange}
                submit={this.createNewSprint}
                renderSprint={this.state.showSprint}
                renderStory={this.state.showStory}
                />
              </Modal.Content>
            </Modal >
          </Grid.Column>
          <Grid.Column width={13}>
            <StageContainer
            sprints={this.state.sprints}
            deleteStory={this.deleteStory}
            onChangeStoryInput={this.handleChange}
            editStory = {this.editStory}
            dragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
