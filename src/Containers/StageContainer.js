import React, {Component} from 'react'
import Stage from '../Components/Stage'
import { Grid } from 'semantic-ui-react'

const STAGEURL = ("http://localhost:3000/stages")
const STORYURL = ("http://localhost:3000/stories")

export default class StageContainer extends Component {
  state = {
    stages: []
  }

  componentDidMount() {
    fetch(STAGEURL)
    .then(r => r.json())
    .then(stageJson => this.setState({
      stages: stageJson
    }))
  }

  storyMapper = () => {
    if (this.props.sprints.length > 1) {
      const filteredSprints = this.props.sprints.filter(sprint => sprint.display === true)
    return filteredSprints.map(sprint => {
      return sprint.stories.map(story => {
        return {...story, color: sprint.color}
      })
    }).flat()}
    else {
      return this.props.sprints.stories.map(story => {
        return {...story, color: this.props.sprints.color}
      })
    }
  }


  filteredSprints = () => {
    if (!this.props.sprints) {
      return null
    }
    else if (this.props.sprints.length > 1 ) {
      return this.props.sprints.filter(sprint => sprint.display === true)
    }
    else {
      return this.props.sprints.stories
    }
  }

  stageMapper = () => {
    return this.state.stages.map(stage => {
      return (
          <Grid.Column key={stage.id} width={3}>
            <Stage
            key={stage.id}
            stage={stage}
            stories={!this.filteredSprints() ? null : this.storyMapper()}
            deleteStory={this.props.deleteStory}
            onChange={this.props.onChangeStoryInput}
            sprints={this.props.sprints}
            editStory={this.props.editStory}
            dragStart={this.props.dragStart}
            onDragOver={this.props.onDragOver}
            onDrop={this.props.onDrop}
            deleteStory={this.props.deleteStory}
            />
          </Grid.Column>
      )
    })
  }

  // onDragStart = (event, story) => {
  //   this.setState({
  //     dragObject: story
  //   })
  // }
  //
  // onDragOver = (event, stage) => {
  //   event.preventDefault()
  // }
  //
  // onDrop = (event, stage) => {
  //   const origStageId = this.state.dragObject.stage_id
  //   console.log(this.state.stages)
  //   fetch(`${STORYURL}/${this.state.dragObject.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       stage_id: stage.id
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(updatedStory => {
  //     console.log(updatedStory)
  //     this.setState({
  //       stages: this.state.stages.map(s => {
  //         return s.id === stage.id ? {...s, stories: [...s.stories, updatedStory]} : s
  //       })
  //     }, () => console.log(this.state.stages))
  //   })
  //   .then(resp => {
  //     this.setState({
  //       stages: this.state.stages.map(s => {
  //         return s.id === origStageId ? {...s, stories: s.stories.filter(story => story.id !== this.state.dragObject.id)} : s
  //       })
  //     })
  //   })
  // }

  render() {
    return (
      <div>
        <div>
          <Grid id='stages'>
            {this.stageMapper()}
          </Grid>
        </div>
      </div>
    )
  }

}
