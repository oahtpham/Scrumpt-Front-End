import React, {Component} from 'react'
import Stage from '../Components/Stage'
import { Grid } from 'semantic-ui-react'

const STAGEURL = (`${process.env.REACT_APP_APIURL}/stages`)
const STORYURL = (`${process.env.REACT_APP_APIURL}/stories`)

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
