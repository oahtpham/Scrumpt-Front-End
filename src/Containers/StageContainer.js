import React, {Component} from 'react'
import Stage from '../Components/Stage'
import { Grid } from 'semantic-ui-react'

const STAGEURL = ("http://localhost:3000/stages")
const STORYURL = ("http://localhost:3000/stories")

export default class StageContainer extends Component {
  state = {
    stages: [],
    stories: []
  }

  componentDidMount() {
    fetch(STAGEURL)
    .then(r => r.json())
    .then(stageJson => this.setState({
      stages: stageJson
    }))
    fetch(STORYURL)
    .then(r => r.json())
    .then(storyJson => this.setState({
      stories: storyJson
    }))
  }

  filteredSprints = () => {
    return this.props.sprints.filter(sprint => sprint.display === true)
  }

  stageMapper = () => {
    return this.state.stages.map(stage => {
      return (
          <Grid.Column key={stage.id} width={3}>
            <Stage key={stage.id} stage={stage} stories={this.filteredSprints().length === 0 ? null : this.filteredSprints().map(sprint =>
              this.state.stories.filter(story => story.sprint.id === sprint.id)
            ).flat()}/>
          </Grid.Column>
      )
    })
  }



  render() {
    console.log(this.stageMapper())
    return (
      <div>
        <div >
          <Grid id='stages'>
            {this.stageMapper()}
          </Grid>
        </div>
      </div>
    )
  }

}
